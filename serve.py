"""Build and serve Sherlock: python3 serve.py [port]."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from functools import partial
import runpy
import sys

root = Path(__file__).resolve().parent
runpy.run_path(str(root / 'build.py'))
port = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
server = ThreadingHTTPServer(('127.0.0.1', port), partial(SimpleHTTPRequestHandler, directory=str(root / 'dist')))
print(f'Sherlock website: http://127.0.0.1:{port}', flush=True)
try:
    server.serve_forever()
except KeyboardInterrupt:
    server.server_close()
