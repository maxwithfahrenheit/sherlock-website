"""Build the standalone frontend. Python 3; no third-party dependencies."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / 'src'
OUTPUT = ROOT / 'dist'
OUTPUT.mkdir(exist_ok=True)
sections = '\n'.join(path.read_text() for path in sorted(SOURCE.glob('[0-9][0-9]-*.html')))
layout = (SOURCE / 'layout.html').read_text()
assert layout.count('<!-- SECTIONS -->') == 1
(OUTPUT / 'index.html').write_text(layout.replace('<!-- SECTIONS -->', sections))
for path in SOURCE.iterdir():
    if path.suffix in {'.css', '.js'}:
        shutil.copyfile(path, OUTPUT / path.name)
shutil.copytree(ROOT / 'public', OUTPUT, dirs_exist_ok=True)
print('Built dist/index.html with 8 sections and local assets.')
