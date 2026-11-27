#!/usr/bin/env python3
"""يحدّث قائمة ملفات العمل بدون إنترنت داخل sw.js.
شغّليه بعد إضافة أي ملف جديد إلى المكتبة:  python3 tools/build_offline.py
"""
import hashlib, json, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {'.git', 'tools', '.github', 'tj'}  # tj/: تُحفظ السورة عند أول فحص لها
SKIP_FILES = {'sw.js', 'README.md', 'index (1).html', 'juz1.html part one.html'}
EXT = {'.html', '.js', '.json', '.css', '.png', '.svg', '.webmanifest', '.woff2'}
files = {}
for d, dirs, fs in os.walk(ROOT):
    dirs[:] = sorted(x for x in dirs if x not in SKIP_DIRS)
    for f in sorted(fs):
        rel = os.path.relpath(os.path.join(d, f), ROOT).replace(os.sep, '/')
        if f in SKIP_FILES or os.path.splitext(f)[1] not in EXT:
            continue
        with open(os.path.join(d, f), 'rb') as fh:
            files[rel] = hashlib.sha1(fh.read()).hexdigest()[:10]
# الصفحة الرئيسية والملفات المشتركة أولًا
first = ['index.html', 'offline.js', 'kitab-plus.js', 'tajweed-engine.js', 'anim/lib.js', 'manifest.webmanifest']
order = [f for f in first if f in files] + [f for f in files if f not in first]
listing = ',\n'.join(f'  {json.dumps(f, ensure_ascii=False)}:{json.dumps(files[f])}' for f in order)
sw = os.path.join(ROOT, 'sw.js')
src = open(sw, encoding='utf-8').read()
src = re.sub(r'/\*FILES\*/\{[\s\S]*?\}/\*END\*/', '/*FILES*/{\n' + listing + '\n}/*END*/', src)
open(sw, 'w', encoding='utf-8').write(src)
print(len(files), 'ملفًا في قائمة العمل بدون إنترنت')
