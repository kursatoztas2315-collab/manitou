#!/usr/bin/env python3
"""Produce static GitHub Pages output with its actual base URL. Standard library only."""
from pathlib import Path
from urllib.parse import urlparse
from html import escape
import json
import re
import shutil
import sys

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / '_site'
if len(sys.argv) != 2:
    raise SystemExit('Usage: python3 scripts/configure-pages.py https://owner.github.io/repository')
BASE = sys.argv[1].rstrip('/')
parsed = urlparse(BASE)
if parsed.scheme != 'https' or not parsed.hostname or parsed.query or parsed.fragment or parsed.username or parsed.password:
    raise SystemExit('GitHub Pages must provide an absolute HTTPS base URL.')
if any(x in BASE for x in ['<', '>', '"', "'", '\\', ' ', '\n', '\r']) or '..' in parsed.path.split('/'):
    raise SystemExit('Invalid base URL.')
metadata = json.loads((ROOT / '.github/seo-data.json').read_text())
if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir()
shutil.copytree(ROOT / 'assets', OUT / 'assets')

def resolve(value):
    if isinstance(value, str):
        return value.replace('__SITE_BASE_URL__', BASE)
    if isinstance(value, list):
        return [resolve(x) for x in value]
    if isinstance(value, dict):
        return {k: resolve(v) for k, v in value.items()}
    return value

urls = []
for item in metadata:
    rel = Path(item['file'])
    if rel.is_absolute() or '..' in rel.parts:
        raise SystemExit('Invalid page path.')
    source = (ROOT / rel).read_text()
    source = re.sub(r'<link\b[^>]*\brel="canonical"[^>]*>', '', source)
    source = re.sub(r'<meta\b[^>]*\bproperty="og:url"[^>]*>', '', source)
    source = re.sub(r'<script\b[^>]*type="application/ld\+json"[^>]*>.*?</script>', '', source, flags=re.S)
    canonical = BASE + item['route']
    graph = json.dumps(resolve(item['schema']), ensure_ascii=False).replace('</', '<\\/')
    head = '<link rel="canonical" href="' + escape(canonical, quote=True) + '">'
    head += '<meta property="og:url" content="' + escape(canonical, quote=True) + '">'
    head += '<script type="application/ld+json">' + graph + '</script>'
    if rel.name == '404.html':
        # Custom 404 documents can be served at any nested URL.
        source = source.replace('<head>', '<head><base href="' + escape(BASE + '/', quote=True) + '">', 1)
    source = source.replace('</head>', head + '</head>', 1)
    destination = OUT / rel
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(source)
    if item['indexable']:
        urls.append(canonical)

(OUT / '.nojekyll').touch()
(OUT / 'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: ' + BASE + '/sitemap.xml\n')
(OUT / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join('  <url><loc>' + escape(u) + '</loc></url>\n' for u in urls) + '</urlset>\n')
print('Ready: ' + str(len(metadata)) + ' pages. Base URL: ' + BASE)
