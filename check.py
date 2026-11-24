"""Check page structure, local asset integrity, links and animation clips."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import re

root = Path(__file__).resolve().parent / 'dist'
refs, anchors, ids = [], [], set()
sections = 0
class Audit(HTMLParser):
    def handle_starttag(self, tag, attributes):
        global sections
        a = dict(attributes)
        if tag == 'section': sections += 1
        if 'id' in a: ids.add(a['id'])
        if tag == 'a' and a.get('href', '').startswith('#'): anchors.append(a['href'][1:])
        for key in ['src', 'poster']:
            if key in a: refs.append((a[key], '/index.html'))
        if tag == 'link' and 'href' in a and a.get('rel') in ['stylesheet', 'preload']: refs.append((a['href'], '/index.html'))
        for url in re.findall(r'url\(["\']?([^"\')]+)', a.get('style', '')): refs.append((url, '/index.html'))

html = (root / 'index.html').read_text()
Audit().feed(html)
for css in root.rglob('*.css'):
    for url in re.findall(r'url\(["\']?([^"\')]+)', css.read_text()): refs.append((url, '/' + str(css.relative_to(root))))
for i in range(1, 5): refs.append((f'/images/valuation/how-it-works/htw-{i}.mp4', '/'))
for i in range(1, 4): refs.append((f'/images/deidentification/De-Identification - {i}.mp4', '/'))
for group,count in [('process',4),('protection',3)]:
    for i in range(1,count+1): refs.append((f'/images/posters/{group}-{i}.jpg','/'))
errors = []
for url, context in refs:
    if url.startswith('data:'): continue
    if url.startswith(('http:', 'https:', '//')):
        errors.append('External runtime asset: ' + url)
        continue
    local = unquote(urlsplit(urljoin(context, url)).path).lstrip('/')
    if not local: continue
    path = root / local
    if not path.is_file() or not path.stat().st_size: errors.append('Missing asset: ' + local)
for anchor in anchors:
    if anchor and anchor not in ids: errors.append('Broken anchor: ' + anchor)
assert sections == 8, sections
assert 'what-you-earn' not in ids
assert 'Value takes' not in html
assert 'Illustrative workflow' not in (root/'app.js').read_text()
assert len(re.findall(r'<h1\b', html)) == 1
assert not re.search(r'NVIDIA|\$\s*8M|Indicated total', html, re.I)
assert 'TURBOPACK' not in html and '__next_f' not in html
assert not errors, '\n'.join(sorted(set(errors)))
print(f'PASS: 8 sections, 1 H1, {len(refs)} asset references, 7 video clips, all local anchors valid.')
