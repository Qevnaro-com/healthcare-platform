import os
import base64
from PIL import Image
import numpy as np

src_path = r'C:\Users\xshan\.gemini\antigravity-cli\brain\f90f868d-0f41-461f-8b6d-ffca3a349313\.user_uploaded\uploaded_media_1789976804279.png'
pub_dir = r'C:\Users\xshan\Desktop\healthcare-platform\public\assets\brand\pulse-n-care'
dist_dir = r'C:\Users\xshan\Desktop\healthcare-platform\dist\assets\brand\pulse-n-care'

os.makedirs(pub_dir, exist_ok=True)
os.makedirs(dist_dir, exist_ok=True)

im = Image.open(src_path).convert('RGBA')
arr = np.array(im, dtype=np.float32)

r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]
dist = np.sqrt((255-r)**2 + (255-g)**2 + (255-b)**2)

# Anti-aliased alpha transparency calculation
alpha = np.clip((dist - 8) / (28 - 8) * 255, 0, 255)
alpha_norm = alpha / 255.0
fg_r = np.where(alpha_norm > 0, np.clip((r - 255 * (1 - alpha_norm)) / np.maximum(alpha_norm, 0.001), 0, 255), 0)
fg_g = np.where(alpha_norm > 0, np.clip((g - 255 * (1 - alpha_norm)) / np.maximum(alpha_norm, 0.001), 0, 255), 0)
fg_b = np.where(alpha_norm > 0, np.clip((b - 255 * (1 - alpha_norm)) / np.maximum(alpha_norm, 0.001), 0, 255), 0)

clean_im = Image.fromarray(np.dstack([fg_r, fg_g, fg_b, alpha]).astype(np.uint8))

mark_im = clean_im.crop((250, 205, 1005, 810))
text_im = clean_im.crop((65, 805, 1195, 1025))
stacked_im = clean_im.crop((65, 205, 1195, 1025))

# Dark mode variant
dark_arr = np.array(clean_im, dtype=np.float32)
dr, dg, db, da = dark_arr[:,:,0], dark_arr[:,:,1], dark_arr[:,:,2], dark_arr[:,:,3]

# Identify blue pixels (high blue relative to red/green)
is_blue = (db > dr + 15) & (da > 50)
# Shift blue pixels towards bright cyan/white for dark mode
dr[is_blue] = np.minimum(dr[is_blue] + 160, 255)
dg[is_blue] = np.minimum(dg[is_blue] + 160, 255)
db[is_blue] = np.minimum(db[is_blue] + 180, 255)

dark_clean_im = Image.fromarray(np.dstack([dr, dg, db, da]).astype(np.uint8))

mark_dark = dark_clean_im.crop((250, 205, 1005, 810))
text_dark = dark_clean_im.crop((65, 805, 1195, 1025))

# Build horizontal layout
mark_h = 300
mark_w = int(mark_im.width * (mark_h / mark_im.height))
mark_resized = mark_im.resize((mark_w, mark_h), Image.Resampling.LANCZOS)
mark_dark_resized = mark_dark.resize((mark_w, mark_h), Image.Resampling.LANCZOS)

text_h = 210
text_w = int(text_im.width * (text_h / text_im.height))
text_resized = text_im.resize((text_w, text_h), Image.Resampling.LANCZOS)
text_dark_resized = text_dark.resize((text_w, text_h), Image.Resampling.LANCZOS)

gap = 40
horiz_w = mark_w + gap + text_w
horiz_h = max(mark_h, text_h) + 20

def create_horiz(m_img, t_img):
    img = Image.new('RGBA', (horiz_w, horiz_h), (0, 0, 0, 0))
    img.paste(m_img, (0, (horiz_h - mark_h) // 2), m_img)
    img.paste(t_img, (mark_w + gap, (horiz_h - text_h) // 2), t_img)
    arr_h = np.array(img)
    coords = np.argwhere(arr_h[:,:,3] > 5)
    y1, x1 = coords.min(axis=0)
    y2, x2 = coords.max(axis=0)
    return img.crop((x1, y1, x2+1, y2+1))

light_horiz = create_horiz(mark_resized, text_resized)
dark_horiz = create_horiz(mark_dark_resized, text_dark_resized)

# Create 1200x630 Social Preview Card
social_im = Image.new('RGBA', (1200, 630), (248, 250, 252, 255)) # Soft slate bg
scaled_logo_h = 320
scaled_logo_w = int(light_horiz.width * (scaled_logo_h / light_horiz.height))
social_logo = light_horiz.resize((scaled_logo_w, scaled_logo_h), Image.Resampling.LANCZOS)
social_im.paste(social_logo, ((1200 - scaled_logo_w) // 2, (630 - scaled_logo_h) // 2), social_logo)

# Favicon: Square mark with padding
fav_im = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
fav_mark_h = 440
fav_mark_w = int(mark_im.width * (fav_mark_h / mark_im.height))
fav_mark_resized = mark_im.resize((fav_mark_w, fav_mark_h), Image.Resampling.LANCZOS)
fav_im.paste(fav_mark_resized, ((512 - fav_mark_w) // 2, (512 - fav_mark_h) // 2), fav_mark_resized)

def save_svg(img, target_path):
    import io
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    b64 = base64.b64encode(buf.getvalue()).decode('ascii')
    w, h = img.size
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%">
  <image href="data:image/png;base64,{b64}" width="{w}" height="{h}" />
</svg>'''
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)

for d in [pub_dir, dist_dir]:
    light_horiz.save(os.path.join(d, 'pulse-n-care-logo.png'))
    light_horiz.save(os.path.join(d, 'pulse-n-care-logo-horizontal.png'))
    stacked_im.save(os.path.join(d, 'pulse-n-care-logo-stacked.png'))
    dark_horiz.save(os.path.join(d, 'pulse-n-care-logo-dark.png'))
    mark_im.save(os.path.join(d, 'pulse-n-care-mark.png'))
    text_im.save(os.path.join(d, 'pulse-n-care-wordmark.png'))
    social_im.save(os.path.join(d, 'pulse-n-care-social-preview.png'))
    fav_im.save(os.path.join(d, 'pulse-n-care-favicon.png'))

    save_svg(light_horiz, os.path.join(d, 'pulse-n-care-logo.svg'))
    save_svg(dark_horiz, os.path.join(d, 'pulse-n-care-logo-dark.svg'))
    save_svg(mark_im, os.path.join(d, 'pulse-n-care-mark.svg'))
    save_svg(fav_im, os.path.join(d, 'pulse-n-care-favicon.svg'))

print("All brand assets generated successfully!")
