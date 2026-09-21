import os, shutil

pub_textures_dir = r'C:\Users\xshan\Desktop\healthcare-platform\public\assets\textures'
dist_textures_dir = r'C:\Users\xshan\Desktop\healthcare-platform\dist\assets\textures'
os.makedirs(pub_textures_dir, exist_ok=True)
os.makedirs(dist_textures_dir, exist_ok=True)

# 1. SVG Texture definitions tuned to Logo Colors (#0060A8 Pulse Blue & #C81E27 Care Red)
textures_svg = {
    'anatomical-geometry.svg': '''<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 50 Q 50 10, 90 50 T 170 50" fill="none" stroke="#C81E27" stroke-width="0.8" stroke-opacity="0.08" />
  <path d="M10 50 Q 50 90, 90 50 T 170 50" fill="none" stroke="#0060A8" stroke-width="0.8" stroke-opacity="0.08" />
</svg>''',
    'care-pathway.svg': '''<svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 40 C 30 10, 60 70, 90 40 S 150 10, 180 40" fill="none" stroke="#C81E27" stroke-width="1" stroke-opacity="0.08" stroke-dasharray="4 4"/>
  <circle cx="30" cy="25" r="3" fill="#C81E27" fill-opacity="0.10"/>
  <circle cx="90" cy="40" r="3" fill="#0060A8" fill-opacity="0.10"/>
</svg>''',
    'clinical-wave.svg': '''<svg width="200" height="40" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 20 L40 20 L48 5 L56 35 L64 12 L72 25 L80 20 L200 20" fill="none" stroke="#0060A8" stroke-width="1.2" stroke-opacity="0.12"/>
</svg>''',
    'cross-grid.svg': '''<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 14V26M14 20H26" stroke="#0060A8" stroke-width="1" stroke-opacity="0.10"/>
</svg>''',
    'location-mesh.svg': '''<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="20" x2="80" y2="20" stroke="#0060A8" stroke-width="0.5" stroke-opacity="0.06"/>
  <line x1="0" y1="60" x2="80" y2="60" stroke="#0060A8" stroke-width="0.5" stroke-opacity="0.06"/>
  <line x1="20" y1="0" x2="20" y2="80" stroke="#C81E27" stroke-width="0.5" stroke-opacity="0.06"/>
  <line x1="60" y1="0" x2="60" y2="80" stroke="#C81E27" stroke-width="0.5" stroke-opacity="0.06"/>
  <circle cx="20" cy="20" r="2" fill="#0060A8" fill-opacity="0.12"/>
  <circle cx="60" cy="60" r="2" fill="#C81E27" fill-opacity="0.12"/>
</svg>''',
    'material-grain.svg': '''<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.03 0"/>
  </filter>
  <rect width="100" height="100" filter="url(#noise)"/>
</svg>''',
    'medical-grid.svg': '''<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <path d="M60 0H0V60H60V0ZM1 1H59V59H1V1Z" fill="#0060A8" fill-opacity="0.05"/>
  <circle cx="30" cy="30" r="1.5" fill="#C81E27" fill-opacity="0.10"/>
  <path d="M30 15V45M15 30H45" stroke="#0060A8" stroke-width="0.5" stroke-opacity="0.08"/>
</svg>''',
    'medical-halo.svg': '''<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="80" fill="none" stroke="#C81E27" stroke-width="1" stroke-opacity="0.06" stroke-dasharray="2 6"/>
  <circle cx="100" cy="100" r="50" fill="none" stroke="#0060A8" stroke-width="1" stroke-opacity="0.08"/>
  <circle cx="100" cy="100" r="20" fill="#C81E27" fill-opacity="0.04"/>
</svg>''',
    'micro-dot-mesh.svg': '''<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="1" fill="#0060A8" fill-opacity="0.10"/>
</svg>''',
    'soft-cell.svg': '''<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 20 C50 10, 70 30, 60 50 C50 70, 20 60, 30 20Z" fill="none" stroke="#C81E27" stroke-width="0.8" stroke-opacity="0.08"/>
  <path d="M80 60 C100 50, 110 80, 90 100 C70 110, 60 80, 80 60Z" fill="none" stroke="#0060A8" stroke-width="0.8" stroke-opacity="0.08"/>
</svg>'''
}

for filename, content in textures_svg.items():
    with open(os.path.join(pub_textures_dir, filename), 'w', encoding='utf-8') as f:
        f.write(content)
    with open(os.path.join(dist_textures_dir, filename), 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated 10 SVG textures in public and dist to Red & Blue!")
