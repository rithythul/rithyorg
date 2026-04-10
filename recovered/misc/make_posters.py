#!/usr/bin/env python3
"""Generate 9 Khmer-language promotional product posters."""

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import math, os, random

MEDIA = "/home/KOOMPI/.openclaw/media"
OUT = MEDIA

FONT_BOLD   = "/usr/share/fonts/noto/NotoSansKhmer-Bold.ttf"
FONT_MED    = "/usr/share/fonts/noto/NotoSansKhmer-Medium.ttf"
FONT_LIGHT  = "/usr/share/fonts/noto/NotoSansKhmer-Light.ttf"

SIZE = (1080, 1080)

def load_product(filename, target_w, target_h):
    img = Image.open(os.path.join(MEDIA, filename)).convert("RGBA")
    img.thumbnail((target_w, target_h), Image.LANCZOS)
    return img

def paste_centered(canvas, img, cx, cy):
    x = cx - img.width // 2
    y = cy - img.height // 2
    canvas.paste(img, (x, y), img)

def gradient_bg(w, h, c1, c2, vertical=True):
    base = Image.new("RGB", (w, h))
    draw = ImageDraw.Draw(base)
    steps = h if vertical else w
    for i in range(steps):
        t = i / steps
        r = int(c1[0] + (c2[0] - c1[0]) * t)
        g = int(c1[1] + (c2[1] - c1[1]) * t)
        b = int(c1[2] + (c2[2] - c1[2]) * t)
        if vertical:
            draw.line([(0, i), (w, i)], fill=(r, g, b))
        else:
            draw.line([(i, 0), (i, h)], fill=(r, g, b))
    return base

def draw_text_centered(draw, text, font, x, y, color, max_width=None):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    draw.text((x - tw // 2, y), text, font=font, fill=color)

def font(path, size):
    return ImageFont.truetype(path, size)

def wrap_text(draw, text, fnt, max_width):
    """Simple word wrap for Khmer (split by spaces)."""
    words = text.split(" ")
    lines = []
    current = ""
    for w in words:
        test = (current + " " + w).strip()
        bbox = draw.textbbox((0, 0), test, font=fnt)
        if bbox[2] - bbox[0] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = w
    if current:
        lines.append(current)
    return lines

# ─────────────────────────────────────────────────────────────
# POSTER 1: Grass Straws — Earthy minimalist, deep forest green
# ─────────────────────────────────────────────────────────────
def poster_grass_straws():
    bg = gradient_bg(1080, 1080, (18, 68, 38), (34, 100, 54))
    canvas = bg.convert("RGBA")
    draw = ImageDraw.Draw(canvas)

    # Subtle circular botanical ring
    for r in range(360, 370):
        draw.ellipse([(540-r, 540-r), (540+r, 540+r)], outline=(255,255,255,25), width=1)
    draw.ellipse([(540-355, 540-355), (540+355, 540+355)], outline=(200,230,200,60), width=2)
    draw.ellipse([(540-380, 540-380), (540+380, 540+380)], outline=(200,230,200,30), width=1)

    # Decorative leaf lines (simple strokes)
    for angle in range(0, 360, 45):
        rad = math.radians(angle)
        x1 = 540 + 370 * math.cos(rad)
        y1 = 540 + 370 * math.sin(rad)
        x2 = 540 + 420 * math.cos(rad)
        y2 = 540 + 420 * math.sin(rad)
        draw.line([(x1, y1), (x2, y2)], fill=(180,230,180,120), width=2)

    # Product image — centered, large
    prod = load_product("img5017_sm.jpg", 520, 580)
    # Add soft glow shadow
    shadow = Image.new("RGBA", (prod.width+40, prod.height+40), (0,0,0,0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.ellipse([(10, prod.height-30), (prod.width+30, prod.height+20)], fill=(0,0,0,80))
    shadow = shadow.filter(ImageFilter.GaussianBlur(15))
    canvas.paste(shadow, (540 - prod.width//2 - 20, 540 - prod.height//2 + 20), shadow)
    paste_centered(canvas, prod, 540, 510)

    draw = ImageDraw.Draw(canvas)

    # Brand
    f_brand = font(FONT_LIGHT, 28)
    draw.text((540 - draw.textbbox((0,0), "Samang Angkor Cambodia", font=f_brand)[2]//2,
               140), "Samang Angkor Cambodia", font=f_brand, fill=(180,230,180,200))

    # Headline
    f_head = font(FONT_BOLD, 72)
    headline = "ចម្រៀងបំពង់ស្មៅ"
    bbox = draw.textbbox((0,0), headline, font=f_head)
    draw.text((540 - (bbox[2]-bbox[0])//2, 185), headline, font=f_head, fill=(255,255,255))

    # Divider
    draw.line([(390, 285), (690, 285)], fill=(180,230,180,150), width=1)

    # Tagline
    f_tag = font(FONT_MED, 34)
    tag = "១០០% ធម្មជាតិ • ការពារបរិស្ថាន"
    bbox = draw.textbbox((0,0), tag, font=f_tag)
    draw.text((540 - (bbox[2]-bbox[0])//2, 298), tag, font=f_tag, fill=(200,240,200))

    # Bottom features pills
    f_feat = font(FONT_MED, 28)
    features = ["ធម្មជាតិ ១០០%", "រលាយបាន", "២០ បំពង់"]
    pill_y = 870
    pill_x = [200, 540, 880]
    for i, feat in enumerate(features):
        bx = draw.textbbox((0,0), feat, font=f_feat)
        tw = bx[2] - bx[0]
        px = pill_x[i] - tw//2 - 20
        draw.rounded_rectangle([(px, pill_y-10), (px+tw+40, pill_y+44)],
                                radius=22, outline=(180,230,180,150), width=1, fill=(255,255,255,15))
        draw.text((pill_x[i] - tw//2, pill_y), feat, font=f_feat, fill=(220,255,220))

    # Bottom tagline
    f_bot = font(FONT_LIGHT, 26)
    bot = "🌿 ការពារផែនដីរបស់យើង"
    bx = draw.textbbox((0,0), bot, font=f_bot)
    draw.text((540-(bx[2]-bx[0])//2, 940), bot, font=f_bot, fill=(150,210,160,200))

    canvas.convert("RGB").save(os.path.join(OUT, "poster_grass_straws.png"))
    print("✓ poster_grass_straws.png")


# ─────────────────────────────────────────────────────────────
# POSTER 2: Mixed Fruit Chips — Tropical burst, white bg
# ─────────────────────────────────────────────────────────────
def poster_fruit_chips():
    canvas = Image.new("RGBA", SIZE, (252, 250, 245, 255))
    draw = ImageDraw.Draw(canvas)

    # Watercolor blobs
    blobs = [
        ((100, 80), 180, (255, 200, 60, 60)),
        ((950, 150), 160, (180, 100, 220, 50)),
        ((150, 900), 200, (255, 140, 60, 55)),
        ((900, 880), 170, (100, 200, 120, 50)),
        ((540, 100), 140, (255, 170, 80, 40)),
        ((200, 500), 120, (220, 100, 180, 35)),
        ((900, 500), 130, (80, 180, 255, 35)),
    ]
    for (cx, cy), r, color in blobs:
        blob = Image.new("RGBA", SIZE, (0,0,0,0))
        bd = ImageDraw.Draw(blob)
        bd.ellipse([(cx-r, cy-r), (cx+r, cy+r)], fill=color)
        blob = blob.filter(ImageFilter.GaussianBlur(50))
        canvas = Image.alpha_composite(canvas, blob)

    draw = ImageDraw.Draw(canvas)

    # Brand pill top
    f_brand = font(FONT_MED, 30)
    brand_txt = "Eysan Farms"
    bx = draw.textbbox((0,0), brand_txt, font=f_brand)
    bw = bx[2]-bx[0]
    draw.rounded_rectangle([(540-bw//2-20, 95), (540+bw//2+20, 148)],
                            radius=26, fill=(130, 60, 200, 220))
    draw.text((540-bw//2, 100), brand_txt, font=f_brand, fill=(255,255,255))

    # Product image — large center
    prod = load_product("img5018_sm.jpg", 580, 640)
    paste_centered(canvas, prod, 540, 560)

    draw = ImageDraw.Draw(canvas)

    # Headline bold
    f_head = font(FONT_BOLD, 76)
    headline = "ចិបផ្លែឈើចម្រុះ"
    bx = draw.textbbox((0,0), headline, font=f_head)
    draw.text((540-(bx[2]-bx[0])//2, 155), headline, font=f_head, fill=(50, 20, 80))

    # Tagline
    f_tag = font(FONT_MED, 36)
    tag = "គ្មានជាតិស្ករ • គ្មានថ្នាំពណ៌ • ហាឡាល់"
    bx = draw.textbbox((0,0), tag, font=f_tag)
    draw.text((540-(bx[2]-bx[0])//2, 248), tag, font=f_tag, fill=(130, 60, 200))

    # Bottom strip
    draw.rectangle([(0, 940), (1080, 1080)], fill=(130, 60, 200, 230))
    f_feat = font(FONT_MED, 32)
    feats = ["ហាឡាល់", "១៥០ ក្រាម", "គ្មានថ្នាំ"]
    for i, feat in enumerate(feats):
        bx = draw.textbbox((0,0), feat, font=f_feat)
        draw.text((180 + i*360 - (bx[2]-bx[0])//2, 986), feat, font=f_feat, fill=(255,255,255))
    # dividers
    draw.line([(360, 955), (360, 1065)], fill=(255,255,255,80), width=1)
    draw.line([(720, 955), (720, 1065)], fill=(255,255,255,80), width=1)

    canvas.convert("RGB").save(os.path.join(OUT, "poster_fruit_chips.png"))
    print("✓ poster_fruit_chips.png")


# ─────────────────────────────────────────────────────────────
# POSTER 3: Cashew Nuts v1 — Warm luxury, amber gradient
# ─────────────────────────────────────────────────────────────
def poster_cashew_v1():
    bg = gradient_bg(1080, 1080, (80, 40, 10), (160, 90, 30), vertical=False)
    bg2 = gradient_bg(1080, 1080, (140, 80, 20), (60, 30, 5))
    # Blend
    bg = Image.blend(bg, bg2, 0.5)
    canvas = bg.convert("RGBA")
    draw = ImageDraw.Draw(canvas)

    # Gold accent lines left side
    for i in range(5):
        y = 200 + i * 30
        draw.line([(60, y), (200, y)], fill=(220, 180, 80, 180 - i*30), width=1)

    # Decorative gold frame corners
    corners = [(80,80), (1000,80), (80,1000), (1000,1000)]
    dirs = [(1,1), (-1,1), (1,-1), (-1,-1)]
    for (cx,cy),(dx,dy) in zip(corners, dirs):
        draw.line([(cx, cy), (cx+dx*60, cy)], fill=(220,180,80,200), width=2)
        draw.line([(cx, cy), (cx, cy+dy*60)], fill=(220,180,80,200), width=2)

    # Product image — off-center right
    prod = load_product("img5019_sm.jpg", 520, 580)
    paste_centered(canvas, prod, 680, 560)

    draw = ImageDraw.Draw(canvas)

    # Large headline left
    f_head = font(FONT_BOLD, 80)
    headline_lines = ["គ្រាប់", "ស្វាយ", "ចន្ទី"]
    y = 230
    for line in headline_lines:
        draw.text((80, y), line, font=f_head, fill=(255,240,200))
        y += 95

    # Gold underline
    draw.line([(80, y), (280, y)], fill=(220,180,80,220), width=3)
    y += 20

    # Brand
    f_brand = font(FONT_BOLD, 40)
    draw.text((80, y+10), "Eysan", font=f_brand, fill=(220,180,80))

    # Tagline
    f_tag = font(FONT_LIGHT, 32)
    tags = ["ផលិតនៅកម្ពុជា", "ហាឡាល់  •  ១៥០ក្រាម"]
    draw.text((80, y+70), tags[0], font=f_tag, fill=(220,200,150))
    draw.text((80, y+112), tags[1], font=f_tag, fill=(220,200,150))

    # Bottom gold bar
    draw.rectangle([(0, 980), (1080, 1080)], fill=(180,120,30,200))
    f_bot = font(FONT_MED, 32)
    bot = "ស្រស់  •  ឆ្ងាញ់  •  ពីកម្ពុជា"
    bx = draw.textbbox((0,0), bot, font=f_bot)
    draw.text((540-(bx[2]-bx[0])//2, 1010), bot, font=f_bot, fill=(255,240,190))

    canvas.convert("RGB").save(os.path.join(OUT, "poster_cashew_v1.png"))
    print("✓ poster_cashew_v1.png")


# ─────────────────────────────────────────────────────────────
# POSTER 4: Cashew Nuts v2 — Dark editorial, spotlight
# ─────────────────────────────────────────────────────────────
def poster_cashew_v2():
    canvas = Image.new("RGBA", SIZE, (12, 10, 10, 255))
    draw = ImageDraw.Draw(canvas)

    # Dramatic spotlight vignette (radial gradient approximation)
    spotlight = Image.new("RGBA", SIZE, (0,0,0,0))
    for r in range(500, 0, -5):
        alpha = int(120 * (1 - r/500))
        color = (255, 240, 200, alpha)
        spotlight_draw = ImageDraw.Draw(spotlight)
        spotlight_draw.ellipse([(540-r, 540-r), (540+r, 540+r)], fill=color)
    spotlight = spotlight.filter(ImageFilter.GaussianBlur(80))
    canvas = Image.alpha_composite(canvas, spotlight)

    # Product image centered
    prod = load_product("img5020_sm.jpg", 500, 560)
    paste_centered(canvas, prod, 540, 520)

    # Dark vignette overlay edges
    vignette = Image.new("RGBA", SIZE, (0,0,0,0))
    vd = ImageDraw.Draw(vignette)
    for i in range(300):
        alpha = int(200 * (i/300)**2)
        vd.rectangle([(i, i), (1080-i, 1080-i)], outline=(0,0,0,0))
    # simple edge darkening via gradient
    for i in range(200):
        a = int(180 * (1 - i/200))
        vd.rectangle([(0,0),(1080,i)], fill=(0,0,0,a//4))
        vd.rectangle([(0,1080-i),(1080,1080)], fill=(0,0,0,a//4))
        vd.rectangle([(0,0),(i,1080)], fill=(0,0,0,a//4))
        vd.rectangle([(1080-i,0),(1080,1080)], fill=(0,0,0,a//4))
    canvas = Image.alpha_composite(canvas, vignette)

    draw = ImageDraw.Draw(canvas)

    # Top minimal brand
    f_brand = font(FONT_LIGHT, 32)
    brand = "E Y S A N"
    bx = draw.textbbox((0,0), brand, font=f_brand)
    draw.text((540-(bx[2]-bx[0])//2, 90), brand, font=f_brand, fill=(200,190,160,180))

    # Thin line
    draw.line([(440,140),(640,140)], fill=(200,190,160,100), width=1)

    # Headline bottom area
    f_head = font(FONT_BOLD, 74)
    headline = "គ្រាប់ស្វាយចន្ទី"
    bx = draw.textbbox((0,0), headline, font=f_head)
    draw.text((540-(bx[2]-bx[0])//2, 840), headline, font=f_head, fill=(255,250,240))

    # Tagline
    f_tag = font(FONT_LIGHT, 34)
    tag = "សុទ្ធ  •  ឆ្ងាញ់  •  ផលិតនៅកម្ពុជា"
    bx = draw.textbbox((0,0), tag, font=f_tag)
    draw.text((540-(bx[2]-bx[0])//2, 930), tag, font=f_tag, fill=(200,185,150,220))

    canvas.convert("RGB").save(os.path.join(OUT, "poster_cashew_v2.png"))
    print("✓ poster_cashew_v2.png")


# ─────────────────────────────────────────────────────────────
# POSTER 5: Fingerroot & Honey — Clean wellness, sage + cream
# ─────────────────────────────────────────────────────────────
def poster_fingerroot():
    bg = gradient_bg(1080, 1080, (230, 235, 220), (210, 215, 195))
    canvas = bg.convert("RGBA")
    draw = ImageDraw.Draw(canvas)

    # Thin circular botanical frame
    cx, cy = 540, 510
    for r, alpha, width in [(320, 120, 1), (330, 80, 1), (350, 60, 1)]:
        draw.ellipse([(cx-r, cy-r), (cx+r, cy+r)], outline=(90,120,80,alpha), width=width)

    # Small dashes on circle
    for angle in range(0, 360, 15):
        rad = math.radians(angle)
        r_inner, r_outer = 338, 348
        x1 = cx + r_inner * math.cos(rad)
        y1 = cy + r_inner * math.sin(rad)
        x2 = cx + r_outer * math.cos(rad)
        y2 = cy + r_outer * math.sin(rad)
        draw.line([(x1,y1),(x2,y2)], fill=(90,120,80,100), width=1)

    # Soft sage circle bg behind product
    circle_bg = Image.new("RGBA", SIZE, (0,0,0,0))
    cbd = ImageDraw.Draw(circle_bg)
    cbd.ellipse([(cx-300,cy-300),(cx+300,cy+300)], fill=(140,170,120,40))
    circle_bg = circle_bg.filter(ImageFilter.GaussianBlur(30))
    canvas = Image.alpha_composite(canvas, circle_bg)

    # Product
    prod = load_product("IMG_5014_sm.jpg", 480, 540)
    paste_centered(canvas, prod, 540, 510)

    draw = ImageDraw.Draw(canvas)

    # Brand (script-like with light font)
    f_brand = font(FONT_LIGHT, 36)
    brand = "b h y s"
    bx = draw.textbbox((0,0), brand, font=f_brand)
    draw.text((540-(bx[2]-bx[0])//2, 105), brand, font=f_brand, fill=(70,90,60,200))

    # Thin divider
    draw.line([(400,155),(680,155)], fill=(100,130,80,120), width=1)

    # Headline
    f_head = font(FONT_BOLD, 62)
    line1 = "ម្សៅក្រចៅ & គ្រាប់"
    line2 = "ទឹកឃ្មុំ"
    bx = draw.textbbox((0,0), line1, font=f_head)
    draw.text((540-(bx[2]-bx[0])//2, 168), line1, font=f_head, fill=(40,60,35))
    bx = draw.textbbox((0,0), line2, font=f_head)
    draw.text((540-(bx[2]-bx[0])//2, 240), line2, font=f_head, fill=(40,60,35))

    # Tagline
    f_tag = font(FONT_MED, 34)
    tag = "១០០% ធម្មជាតិ  •  ៤០០ក្រាម"
    bx = draw.textbbox((0,0), tag, font=f_tag)
    draw.text((540-(bx[2]-bx[0])//2, 315), tag, font=f_tag, fill=(80,110,70))

    # Bottom features on sage strip
    draw.rectangle([(0, 940), (1080, 1080)], fill=(100,130,80,200))
    f_feat = font(FONT_MED, 30)
    feats = ["ក្រចៅ ១០០%", "ទឹកឃ្មុំបរិសុទ្ធ", "ដុំ ៤០០ក្រាម"]
    for i, feat in enumerate(feats):
        bx = draw.textbbox((0,0), feat, font=f_feat)
        draw.text((180+i*360-(bx[2]-bx[0])//2, 988), feat, font=f_feat, fill=(240,245,230))
    draw.line([(360,955),(360,1065)], fill=(255,255,255,60), width=1)
    draw.line([(720,955),(720,1065)], fill=(255,255,255,60), width=1)

    canvas.convert("RGB").save(os.path.join(OUT, "poster_fingerroot.png"))
    print("✓ poster_fingerroot.png")


# ─────────────────────────────────────────────────────────────
# POSTER 6: Banana Powder — Sunshine energy, bright yellow
# ─────────────────────────────────────────────────────────────
def poster_banana_powder():
    bg = gradient_bg(1080, 1080, (255, 220, 30), (255, 195, 0))
    canvas = bg.convert("RGBA")
    draw = ImageDraw.Draw(canvas)

    # Bold geometric shapes
    # Large green triangle top-right
    tri = Image.new("RGBA", SIZE, (0,0,0,0))
    td = ImageDraw.Draw(tri)
    td.polygon([(700,0),(1080,0),(1080,450)], fill=(40,160,60,200))
    canvas = Image.alpha_composite(canvas, tri)

    # White triangle bottom-left
    tri2 = Image.new("RGBA", SIZE, (0,0,0,0))
    td2 = ImageDraw.Draw(tri2)
    td2.polygon([(0,700),(380,1080),(0,1080)], fill=(255,255,255,180))
    canvas = Image.alpha_composite(canvas, tri2)

    # Green circle accent
    circ = Image.new("RGBA", SIZE, (0,0,0,0))
    cd = ImageDraw.Draw(circ)
    cd.ellipse([(820,750),(1020,950)], fill=(40,160,60,120))
    canvas = Image.alpha_composite(canvas, circ)

    # Product tilted slightly
    prod = load_product("IMG_5012_sm.jpg", 520, 580)
    # Rotate slightly
    prod_rot = prod.rotate(-8, expand=True, resample=Image.BICUBIC)
    cx = 540 - prod_rot.width//2
    cy = 500 - prod_rot.height//2
    canvas.paste(prod_rot, (cx, cy), prod_rot)

    draw = ImageDraw.Draw(canvas)

    # Brand badge
    f_brand = font(FONT_BOLD, 38)
    brand = "Golden Egg"
    bx = draw.textbbox((0,0), brand, font=f_brand)
    bw = bx[2]-bx[0]
    draw.rounded_rectangle([(540-bw//2-16, 88), (540+bw//2+16, 148)],
                            radius=8, fill=(40,160,60,230))
    draw.text((540-bw//2, 94), brand, font=f_brand, fill=(255,255,255))

    # Headline
    f_head = font(FONT_BOLD, 80)
    line1 = "ម្សៅចេក"
    bx = draw.textbbox((0,0), line1, font=f_head)
    draw.text((540-(bx[2]-bx[0])//2, 158), line1, font=f_head, fill=(20,70,20))

    # Tagline
    f_tag = font(FONT_MED, 36)
    tag = "១០០% ធម្មជាតិ  •  ២០គ្រាប់"
    bx = draw.textbbox((0,0), tag, font=f_tag)
    draw.text((540-(bx[2]-bx[0])//2, 258), tag, font=f_tag, fill=(20,80,20))

    # Bottom white panel
    draw.rectangle([(0,940),(1080,1080)], fill=(255,255,255,230))
    f_feat = font(FONT_MED, 30)
    feats = ["ធម្មជាតិ", "២០ ស្រោម", "Golden Egg"]
    for i, feat in enumerate(feats):
        bx = draw.textbbox((0,0), feat, font=f_feat)
        draw.text((180+i*360-(bx[2]-bx[0])//2, 988), feat, font=f_feat, fill=(20,100,20))
    draw.line([(360,950),(360,1070)], fill=(200,200,200,150), width=1)
    draw.line([(720,950),(720,1070)], fill=(200,200,200,150), width=1)

    canvas.convert("RGB").save(os.path.join(OUT, "poster_banana_powder.png"))
    print("✓ poster_banana_powder.png")


# ─────────────────────────────────────────────────────────────
# POSTER 7: Ghee — Premium artisan, off-white linen texture
# ─────────────────────────────────────────────────────────────
def poster_ghee():
    # Linen-like off-white
    canvas = Image.new("RGBA", SIZE, (245, 240, 228, 255))
    draw = ImageDraw.Draw(canvas)

    # Subtle linen texture — thin horizontal lines
    for y in range(0, 1080, 4):
        alpha = random.randint(5, 18)
        draw.line([(0,y),(1080,y)], fill=(180,165,140,alpha), width=1)
    for x in range(0, 1080, 6):
        alpha = random.randint(3, 10)
        draw.line([(x,0),(x,1080)], fill=(180,165,140,alpha), width=1)

    # Gold border frame
    margin = 45
    for i, (col, w) in enumerate([(( 190,155,80,200), 2), ((190,155,80,100), 1)]):
        off = margin + i*8
        draw.rectangle([(off,off),(1080-off,1080-off)], outline=col, width=w)

    # Corner ornaments
    gold = (190, 155, 80, 220)
    corners = [(margin,margin),(1080-margin,margin),(margin,1080-margin),(1080-margin,1080-margin)]
    for cx,cy in corners:
        draw.ellipse([(cx-5,cy-5),(cx+5,cy+5)], fill=gold)

    # Product centered — with subtle drop shadow
    prod = load_product("IMG_5013_sm.jpg", 480, 540)
    shadow = Image.new("RGBA", (prod.width+60, prod.height+60), (0,0,0,0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse([(15,prod.height-10),(prod.width+45,prod.height+40)], fill=(0,0,0,50))
    shadow = shadow.filter(ImageFilter.GaussianBlur(20))
    canvas.paste(shadow, (540-prod.width//2-30, 510-prod.height//2+10), shadow)
    paste_centered(canvas, prod, 540, 510)

    draw = ImageDraw.Draw(canvas)

    # Headline
    f_head = font(FONT_BOLD, 72)
    headline = "ប្រេងក្រែម"
    bx = draw.textbbox((0,0), headline, font=f_head)
    draw.text((540-(bx[2]-bx[0])//2, 115), headline, font=f_head, fill=(60,45,20))

    headline2 = "ស្ងូតខ្ទិះ"
    bx = draw.textbbox((0,0), headline2, font=f_head)
    draw.text((540-(bx[2]-bx[0])//2, 198), headline2, font=f_head, fill=(190,155,80))

    # Thin gold rule
    draw.line([(380,285),(700,285)], fill=(190,155,80,200), width=1)

    # Tagline
    f_tag = font(FONT_LIGHT, 30)
    tag = "សត្វចឹញ្ចឹមនៅវាលស្មៅ  •  ២៥៥ក្រាម"
    bx = draw.textbbox((0,0), tag, font=f_tag)
    draw.text((540-(bx[2]-bx[0])//2, 298), tag, font=f_tag, fill=(90,70,35))

    # Bottom features
    f_feat = font(FONT_MED, 26)
    feats = ["គ្មានឡាក់តូស", "Keto Friendly", "Gluten Free", "២៥៥ក្រាម"]
    feat_y = 880
    col_w = 1080 // len(feats)
    for i, feat in enumerate(feats):
        bx = draw.textbbox((0,0), feat, font=f_feat)
        tw = bx[2]-bx[0]
        cx = col_w//2 + i*col_w
        draw.rounded_rectangle([(cx-tw//2-12, feat_y), (cx+tw//2+12, feat_y+40)],
                                radius=20, outline=(190,155,80,150), width=1)
        draw.text((cx-tw//2, feat_y+4), feat, font=f_feat, fill=(80,60,25))

    # Bottom thin line & brand
    draw.line([(margin+20, 950),(1080-margin-20, 950)], fill=(190,155,80,100), width=1)
    f_brand = font(FONT_LIGHT, 28)
    bot = "ប្រណិត  •  ក្រែមមានគុណភាព  •  Grass-Fed"
    bx = draw.textbbox((0,0), bot, font=f_brand)
    draw.text((540-(bx[2]-bx[0])//2, 965), bot, font=f_brand, fill=(120,95,50,200))

    canvas.convert("RGB").save(os.path.join(OUT, "poster_ghee.png"))
    print("✓ poster_ghee.png")


# ─────────────────────────────────────────────────────────────
# POSTER 8: Fried Food Sauce — Street food energy, deep red
# ─────────────────────────────────────────────────────────────
def poster_fried_sauce():
    bg = gradient_bg(1080, 1080, (140, 10, 15), (80, 5, 8))
    canvas = bg.convert("RGBA")
    draw = ImageDraw.Draw(canvas)

    # Khmer-inspired geometric border — diamond grid pattern
    border_layer = Image.new("RGBA", SIZE, (0,0,0,0))
    bd = ImageDraw.Draw(border_layer)

    # Outer geometric frame with repeated diamond motif
    for i in range(0, 1080, 40):
        # top border diamonds
        if i + 20 < 1080:
            bd.polygon([(i, 40), (i+20, 0), (i+40, 40), (i+20, 80)],
                       outline=(220,160,50,120), width=1)
        # bottom
        bd.polygon([(i, 1040), (i+20, 1000), (i+40, 1040), (i+20, 1080)],
                   outline=(220,160,50,120), width=1)
    for i in range(0, 1080, 40):
        # left
        bd.polygon([(40,i),(0,i+20),(40,i+40),(80,i+20)],
                   outline=(220,160,50,80), width=1)
        # right
        bd.polygon([(1040,i),(1000,i+20),(1040,i+40),(1080,i+20)],
                   outline=(220,160,50,80), width=1)

    # Corner accents
    for cx,cy in [(80,80),(1000,80),(80,1000),(1000,1000)]:
        bd.ellipse([(cx-12,cy-12),(cx+12,cy+12)], outline=(220,160,50,200), width=2)
        bd.ellipse([(cx-6,cy-6),(cx+6,cy+6)], fill=(220,160,50,150))

    canvas = Image.alpha_composite(canvas, border_layer)

    # Product angled
    prod = load_product("IMG_5008_sm.jpg", 460, 580)
    prod_rot = prod.rotate(6, expand=True, resample=Image.BICUBIC)
    canvas.paste(prod_rot, (540-prod_rot.width//2, 430-prod_rot.height//2), prod_rot)

    draw = ImageDraw.Draw(canvas)

    # Headline
    f_head = font(FONT_BOLD, 76)
    headline = "ទឹកជ្រលក់"
    bx = draw.textbbox((0,0), headline, font=f_head)
    draw.text((540-(bx[2]-bx[0])//2, 100), headline, font=f_head, fill=(255,230,100))

    headline2 = "អាហារចៀន"
    bx = draw.textbbox((0,0), headline2, font=f_head)
    draw.text((540-(bx[2]-bx[0])//2, 185), headline2, font=f_head, fill=(255,255,255))

    # Gold divider
    draw.line([(340,285),(740,285)], fill=(220,160,50,200), width=2)

    # Tagline
    f_tag = font(FONT_MED, 36)
    tag = "រូបមន្តខ្មែរ  •  រសជាតិឆ្ងាញ់"
    bx = draw.textbbox((0,0), tag, font=f_tag)
    draw.text((540-(bx[2]-bx[0])//2, 298), tag, font=f_tag, fill=(255,200,120))

    # Bottom gold ribbon
    draw.rectangle([(0, 930), (1080, 1080)], fill=(180, 100, 20, 220))
    draw.line([(0,930),(1080,930)], fill=(220,160,50,200), width=3)
    f_feat = font(FONT_BOLD, 34)
    feat = "ឆ្ងាញ់  •  ខ្មែរ  •  ផ្ទះខ្មែរ"
    bx = draw.textbbox((0,0), feat, font=f_feat)
    draw.text((540-(bx[2]-bx[0])//2, 985), feat, font=f_feat, fill=(255,240,190))

    canvas.convert("RGB").save(os.path.join(OUT, "poster_fried_sauce.png"))
    print("✓ poster_fried_sauce.png")


# ─────────────────────────────────────────────────────────────
# POSTER 9: Stir Fry Sauce — Heritage, dark brown + terracotta
# ─────────────────────────────────────────────────────────────
def poster_stirfry_sauce():
    bg = gradient_bg(1080, 1080, (45, 25, 12), (70, 38, 18))
    canvas = bg.convert("RGBA")
    draw = ImageDraw.Draw(canvas)

    # Subtle Angkor Wat silhouette behind product
    # Draw simplified tower shapes
    angkor = Image.new("RGBA", SIZE, (0,0,0,0))
    ad = ImageDraw.Draw(angkor)

    # Central tower
    towers = [
        # (center_x, base_y, base_w, height)
        (540, 780, 90, 280),
        (400, 780, 60, 200),
        (680, 780, 60, 200),
        (290, 780, 45, 150),
        (790, 780, 45, 150),
    ]
    tower_color = (180, 100, 40, 50)
    for (tx, ty, tw, th) in towers:
        # Base block
        ad.rectangle([(tx-tw//2, ty-th), (tx+tw//2, ty)], fill=tower_color)
        # Stepped tiers
        for tier in range(1, 4):
            tier_w = tw - tier*12
            tier_h = th//5
            tier_y = ty - th - tier*tier_h//2
            if tier_w > 5:
                ad.rectangle([(tx-tier_w//2, tier_y), (tx+tier_w//2, tier_y+tier_h)],
                             fill=tower_color)
        # Spire
        ad.polygon([(tx-12, ty-th-25),(tx,ty-th-60),(tx+12,ty-th-25)], fill=tower_color)

    # Terracotta arches/colonnade base
    for i in range(8):
        ax = 100 + i * 120
        ad.arc([(ax, 720),(ax+100, 820)], 0, 180, fill=(180,100,40,40), width=3)

    angkor = angkor.filter(ImageFilter.GaussianBlur(3))
    canvas = Image.alpha_composite(canvas, angkor)

    # Terracotta accent stripe
    stripe = Image.new("RGBA", SIZE, (0,0,0,0))
    sd = ImageDraw.Draw(stripe)
    sd.rectangle([(0,0),(8,1080)], fill=(180,80,40,180))
    sd.rectangle([(1072,0),(1080,1080)], fill=(180,80,40,180))
    canvas = Image.alpha_composite(canvas, stripe)

    # Product centered
    prod = load_product("IMG_5010_sm.jpg", 460, 580)
    paste_centered(canvas, prod, 540, 510)

    draw = ImageDraw.Draw(canvas)

    # Gold top text
    f_brand = font(FONT_LIGHT, 32)
    brand = "ទឹកបា • ប្រពៃណីខ្មែរ"
    bx = draw.textbbox((0,0), brand, font=f_brand)
    draw.text((540-(bx[2]-bx[0])//2, 100), brand, font=f_brand, fill=(220,170,80,200))

    # Gold rule
    draw.line([(350,152),(730,152)], fill=(200,150,60,180), width=1)

    # Headline
    f_head = font(FONT_BOLD, 80)
    headline = "ទឹកបា"
    bx = draw.textbbox((0,0), headline, font=f_head)
    draw.text((540-(bx[2]-bx[0])//2, 165), headline, font=f_head, fill=(255,220,120))

    headline2 = "ចម្អិនបន្លែ"
    f_head2 = font(FONT_MED, 52)
    bx = draw.textbbox((0,0), headline2, font=f_head2)
    draw.text((540-(bx[2]-bx[0])//2, 262), headline2, font=f_head2, fill=(220,190,130))

    # Tagline
    f_tag = font(FONT_MED, 34)
    tag = "រស់ជាតិកម្ពុជា  •  ប្រពៃណីខ្មែរ"
    bx = draw.textbbox((0,0), tag, font=f_tag)
    draw.text((540-(bx[2]-bx[0])//2, 330), tag, font=f_tag, fill=(200,160,80))

    # Bottom terracotta panel
    draw.rectangle([(0,920),(1080,1080)], fill=(120,50,20,230))
    draw.line([(0,920),(1080,920)], fill=(200,140,50,180), width=2)

    f_feat = font(FONT_MED, 30)
    feats = ["រស់ជាតិកម្ពុជា", "ប្រពៃណីខ្មែរ", "ឆ្ងាញ់ ១០០%"]
    for i, feat in enumerate(feats):
        bx = draw.textbbox((0,0), feat, font=f_feat)
        draw.text((180+i*360-(bx[2]-bx[0])//2, 978), feat, font=f_feat, fill=(255,220,140))
    draw.line([(360,930),(360,1075)], fill=(180,120,50,100), width=1)
    draw.line([(720,930),(720,1075)], fill=(180,120,50,100), width=1)

    canvas.convert("RGB").save(os.path.join(OUT, "poster_stirfry_sauce.png"))
    print("✓ poster_stirfry_sauce.png")


if __name__ == "__main__":
    random.seed(42)
    print("Generating 9 Khmer promotional posters...")
    poster_grass_straws()
    poster_fruit_chips()
    poster_cashew_v1()
    poster_cashew_v2()
    poster_fingerroot()
    poster_banana_powder()
    poster_ghee()
    poster_fried_sauce()
    poster_stirfry_sauce()
    print("\nAll done! Files:")
    for f in sorted(os.listdir(OUT)):
        if f.startswith("poster_") and f.endswith(".png"):
            size = os.path.getsize(os.path.join(OUT, f))
            print(f"  {f}  ({size//1024}KB)")
