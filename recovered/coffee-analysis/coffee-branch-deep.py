#!/usr/bin/env python3
"""Deep Branch-Level Analysis — Coffee Kiosk Feasibility"""
import pandas as pd
import numpy as np
from collections import Counter
import re
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

SRC = '/home/KOOMPI/.openclaw/media/inbound/Clean_Coffee_Customer_Survey_2026.03.25_Responses---219b0a7e-67ac-48f7-9691-b7793879d06f.xlsx'
OUT = '/home/KOOMPI/.openclaw/nimmit/coffee-analysis-output/Coffee_Branch_Deep_Analysis.xlsx'

wb_src = pd.read_excel(SRC, sheet_name='Consolidate')
df = wb_src.copy()
cols = list(df.columns)

col_map = {}
short = ['timestamp','brand','branch','why_choose','dislikes','purchase_method',
         'drink_type','cups_per_day','visit_freq','time_of_day','day_of_week',
         'r_service','r_atmos','r_price','r_quality','r_design','r_location',
         'r_speed','r_parking','r_overall','suggestions','wait_tolerance',
         'other_purchases','pref_lang','pref_style','pref_color','intl_brands',
         'gender','age','segment','brand_raw']
for i in range(min(len(cols), len(short))):
    col_map[cols[i]] = short[i]
df.rename(columns=col_map, inplace=True)

def nb(b):
    if pd.isna(b): return 'Unknown'
    b = str(b).strip().lower()
    if 'onnik' in b: return 'Onnik Coffee'
    if 'mr' in b or 'dad' in b or 'orp' in b: return 'Mr. Dad Coffee'
    if 'cyclo' in b: return 'Cyclo Cafe'
    if 'mobile' in b: return 'Mobile Coffee'
    return 'Others'
df['bn'] = df['brand'].apply(nb)

def ns(s):
    if pd.isna(s): return 'Other'
    s = str(s).strip()
    if 'university' in s.lower() or 'និស្សិតសាកល' in s: return 'University Student'
    if 'high school' in s.lower() or 'សិស្សវិទ្យាល័យ' in s: return 'High School Student'
    if 'office' in s.lower() or 'civil' in s.lower() or 'បុគ្គលិក' in s or 'មន្ត្រី' in s: return 'Working Professional'
    return 'Other'
df['seg'] = df['segment'].apply(ns)

def extract_branch(row):
    b = str(row['branch']) if not pd.isna(row['branch']) else ''
    m = re.search(r'\(([^)]+)\)', b)
    if m: return m.group(1).strip()
    prefixes = ['Onnik Coffee-','កាហ្វេឪ / Mr. Dad Coffee-','Cyclo Café-','Cyclo Cafe-',
                'Mobile coffee-','Mobile Coffee-','Others-']
    for p in prefixes:
        if p in b:
            after = b.split(p, 1)[-1].strip()
            m2 = re.search(r'\(([^)]+)\)', after)
            if m2: return m2.group(1).strip()
            clean = re.sub(r'[\u1780-\u17FF]', '', after).strip('- ').strip()
            if clean and len(clean) > 1: return clean
            return after.strip()
    return b.strip()
df['br'] = df.apply(extract_branch, axis=1)

for c in ['r_service','r_atmos','r_price','r_quality','r_design','r_location','r_speed','r_parking','r_overall']:
    df[c] = pd.to_numeric(df[c], errors='coerce')

def nps_cat(r):
    if pd.isna(r): return 'Unknown'
    if r >= 4: return 'Promoter'
    if r == 3: return 'Passive'
    return 'Detractor'
df['nps'] = df['r_overall'].apply(nps_cat)

def parse_ms(val):
    if pd.isna(val): return []
    return [v.strip() for v in str(val).split(',') if v.strip() and v.strip() not in ['nan','None','N/A','']]
def count_ms(series):
    c = Counter()
    for val in series.dropna():
        for item in parse_ms(val):
            c[item] += 1
    return c

N = len(df)
RC = ['r_service','r_atmos','r_price','r_quality','r_design','r_location','r_speed','r_parking']
RL = ['Customer Service','Atmosphere','Price Value','Coffee Quality','Design','Location','Speed','Parking']

# ═══ STYLES ═══
DB='1F3864'; TEAL='2E75B6'; GRN='548235'; RED='C00000'; ORG='ED7D31'; PUR='7030A0'
LG='E2EFDA'; LR='FCE4EC'; LY='FFF2CC'; LB='D6E4F0'; GR='F2F2F2'
hf=Font(bold=True,color='FFFFFF',size=10)
hfill=PatternFill(start_color=DB,end_color=DB,fill_type='solid')
hf2=PatternFill(start_color=TEAL,end_color=TEAL,fill_type='solid')
hf3=PatternFill(start_color=GRN,end_color=GRN,fill_type='solid')
hf4=PatternFill(start_color=ORG,end_color=ORG,fill_type='solid')
hf5=PatternFill(start_color=PUR,end_color=PUR,fill_type='solid')
bf=PatternFill(start_color=LB,end_color=LB,fill_type='solid')
gf=PatternFill(start_color=LG,end_color=LG,fill_type='solid')
rf=PatternFill(start_color=LR,end_color=LR,fill_type='solid')
yf=PatternFill(start_color=LY,end_color=LY,fill_type='solid')
af=PatternFill(start_color=GR,end_color=GR,fill_type='solid')
sf=Font(bold=True,size=11,color=DB)
nm=Font(size=10);bd=Font(bold=True,size=10);sm=Font(size=9,color='666666')
tb=Border(left=Side(style='thin',color='D9D9D9'),right=Side(style='thin',color='D9D9D9'),
         top=Side(style='thin',color='D9D9D9'),bottom=Side(style='thin',color='D9D9D9'))
ca=Alignment(horizontal='center',vertical='center',wrap_text=True)
la=Alignment(horizontal='left',vertical='center',wrap_text=True)

def hdr(ws,r,cols,fill=None):
    f=fill or hfill
    for ci in cols:
        c=ws.cell(row=r,column=ci);c.font=hf;c.fill=f;c.alignment=ca;c.border=tb

def srow(ws,r,cols,alt=False):
    for ci in cols:
        c=ws.cell(row=r,column=ci);c.border=tb;c.font=nm;c.alignment=la if ci<=2 else ca
        if ci<=2: c.font=bd
        if alt: c.fill=af

def sec(ws,r,text,cols):
    ws.merge_cells(start_row=r,start_column=1,end_row=r,end_column=cols)
    c=ws.cell(row=r,column=1,value=text);c.font=sf;c.fill=bf;c.border=tb;c.alignment=la
    return r+1

def ssec(ws,r,text,cols):
    ws.merge_cells(start_row=r,start_column=1,end_row=r,end_column=cols)
    c=ws.cell(row=r,column=1,value=text);c.font=Font(bold=True,size=11,color='444444');c.alignment=la
    return r+1

def nt(ws,r,text,cols):
    ws.merge_cells(start_row=r,start_column=1,end_row=r,end_column=cols)
    c=ws.cell(row=r,column=1,value=text);c.font=sm;c.alignment=la
    return r+1

def sws(ws,widths):
    for ci,w in enumerate(widths,1):
        ws.column_dimensions[get_column_letter(ci)].width=w

def write_branch_deep(ws, sub, br_name, brand_name, r, C=10):
    """Write deep analysis for one branch. Returns new row."""
    n_b = len(sub)
    ov = sub.r_overall.mean()
    nps_v = ((sub.nps=='Promoter').sum()-(sub.nps=='Detractor').sum())/n_b*100 if n_b>0 else 0
    promo = (sub.nps=='Promoter').sum()
    detr = (sub.nps=='Detractor').sum()
    passv = (sub.nps=='Passive').sum()

    # ── Branch Header ──
    ws.merge_cells(start_row=r,start_column=1,end_row=r,end_column=C)
    c = ws.cell(row=r,column=1,value=f'{brand_name} — {br_name}')
    c.font=Font(bold=True,size=13,color='FFFFFF');c.fill=PatternFill(start_color=TEAL,end_color=TEAL,fill_type='solid')
    c.alignment=ca;c.border=tb
    ws.row_dimensions[r].height = 25
    r += 1
    ws.merge_cells(start_row=r,start_column=1,end_row=r,end_column=C)
    c = ws.cell(row=r,column=1,value=f'n = {n_b} respondents | Overall Rating: {ov:.2f}/5 | NPS: {nps_v:.0f} (Promoters: {promo}, Passive: {passv}, Detractors: {detr})')
    c.font=Font(size=10,color='444444');c.alignment=la
    r += 2

    # ── 1. DIMENSION-BY-DIMENSION RATINGS ──
    r = ssec(ws, r, '1. RATING BREAKDOWN BY DIMENSION', C)
    r += 1
    dim_h = ['Dimension', 'Mean', 'Std Dev', 'Min', 'Max', 'Gap→5.0', 'Weak?']
    for ci,h in enumerate(dim_h,2):
        c=ws.cell(row=r,column=ci,value=h);c.font=hf;c.fill=hf2;c.alignment=ca;c.border=tb
    r += 1

    dim_data = []
    for col, lab in zip(RC, RL):
        m = sub[col].mean()
        s = sub[col].std() if n_b > 1 else 0
        mn = sub[col].min()
        mx = sub[col].max()
        gap = 5 - m
        weak = '⚠ YES' if gap >= 1.3 else ('✕ No' if gap < 1.0 else '~ Watch')
        dim_data.append((gap, lab, m, s, mn, mx, gap, weak))

    dim_data.sort(key=lambda x: -x[0])
    for _, lab, m, s, mn, mx, gap, weak in dim_data:
        row = [lab, f'{m:.2f}', f'{s:.2f}' if s == s else 'N/A', f'{mn:.0f}', f'{mx:.0f}', f'{gap:.2f}', weak]
        for ci,v in enumerate(row,2):
            c=ws.cell(row=r,column=ci,value=v);c.border=tb;c.font=nm;c.alignment=ca
            if ci==2: c.font=bd
        if gap >= 1.3: ws.cell(row=r,column=7).fill=rf
        elif gap >= 1.0: ws.cell(row=r,column=7).fill=yf
        r += 1

    # Overall row
    row = ['OVERALL', f'{ov:.2f}', f'{sub.r_overall.std():.2f}' if n_b>1 else 'N/A',
           f'{sub.r_overall.min():.0f}', f'{sub.r_overall.max():.0f}', f'{5-ov:.2f}', '']
    for ci,v in enumerate(row,2):
        c=ws.cell(row=r,column=ci,value=v);c.border=tb;c.font=bd;c.alignment=ca;c.fill=bf
    r += 2

    # ── 2. CUSTOMER SEGMENT PROFILE ──
    r = ssec(ws, r, '2. CUSTOMER SEGMENT PROFILE', C)
    r += 1
    seg_dist = sub['seg'].value_counts()
    seg_h = ['Segment', 'Count', '%', 'Avg Rating', 'Key Behavior']
    for ci,h in enumerate(seg_h,2):
        c=ws.cell(row=r,column=ci,value=h);c.font=hf;c.fill=hf3;c.alignment=ca;c.border=tb
    r += 1

    seg_behaviors = {
        'University Student': 'Sit-in preferred. Social buyer. Latte + Matcha.',
        'High School Student': 'Price-sensitive. Takeaway. Matcha over-indexes.',
        'Working Professional': 'Takeaway dominant. Daily buyer. Loyalty potential.',
    }
    for seg_name, seg_cnt in list(seg_dist.items()):
        seg_sub = sub[sub.seg == seg_name]
        seg_ov = seg_sub.r_overall.mean()
        beh = seg_behaviors.get(seg_name, 'Mixed behavior.')
        row = [seg_name, seg_cnt, f'{seg_cnt/n_b*100:.0f}%', f'{seg_ov:.2f}', beh]
        for ci,v in enumerate(row,2):
            c=ws.cell(row=r,column=ci,value=v);c.border=tb;c.font=nm;c.alignment=la if ci in [2,6] else ca
            if ci==2: c.font=bd
        r += 1

    # Gender split
    if 'gender' in sub.columns:
        g = sub['gender'].value_counts()
        r += 1
        ws.cell(row=r,column=2,value='Gender split:').font=bd
        for gi, gc in list(g.items()):
            ws.cell(row=r,column=3,value=f'{gi}: {gc} ({gc/n_b*100:.0f}%)').font=nm
            r += 1
    r += 1

    # ── 3. DRINK PREFERENCES ──
    r = ssec(ws, r, '3. DRINK PREFERENCES', C)
    r += 1
    drk = count_ms(sub['drink_type'])
    drk_h = ['Drink', 'Count', '%', 'Menu Priority']
    for ci,h in enumerate(drk_h,2):
        c=ws.cell(row=r,column=ci,value=h);c.font=hf;c.fill=hf4;c.alignment=ca;c.border=tb
    r += 1

    priorities = {
        'latte': 'Core SKU — must have', 'cappuccino': 'Core SKU — must have',
        'iced coffee': 'Core SKU', 'americano': 'Core SKU',
        'matcha': 'Core SKU — high demand', 'chocolate': 'Extended SKU',
        'green tea': 'Extended SKU', 'espresso': 'Core SKU',
        'milk tea': 'Extended SKU', 'red tea': 'Extended SKU',
    }
    for item, cnt in drk.most_common():
        pct = cnt/n_b*100
        pri = 'Monitor'
        item_lower = item.lower()
        for k, v in list(priorities.items()):
            if k in item_lower: pri = v; break
        row = [item, cnt, f'{pct:.0f}%', pri]
        for ci,v in enumerate(row,2):
            c=ws.cell(row=r,column=ci,value=v);c.border=tb;c.font=nm;c.alignment=la if ci in [2,5] else ca
            if ci==2: c.font=bd
        r += 1

    # Cross-sell
    food = count_ms(sub['other_purchases'])
    if food:
        r += 1
        ws.cell(row=r,column=2,value='Cross-sell items purchased:').font=bd
        r += 1
        food_no_nothing = {k:v for k,v in list(food.items()) if 'nothing' not in k.lower()}
        for item, cnt in sorted(list(food_no_nothing.items()), key=lambda x:-x[1])[:5]:
            ws.cell(row=r,column=2,value=f'  • {item}').font=nm
            ws.cell(row=r,column=3,value=f'{cnt} ({cnt/n_b*100:.0f}%)').font=nm
            r += 1
        nothing_cnt = sum(v for k,v in list(food.items()) if 'nothing' in k.lower())
        if nothing_cnt > 0:
            r += 1
            ws.cell(row=r,column=2,value=f'  No cross-sell: {nothing_cnt} ({nothing_cnt/n_b*100:.0f}%) → upsell opportunity').font=sm
            r += 1
    r += 1

    # ── 4. WHY THEY CHOOSE THIS BRANCH ──
    r = ssec(ws, r, '4. WHY CUSTOMERS CHOOSE THIS BRANCH', C)
    r += 1
    why = count_ms(sub['why_choose'])
    why_h = ['Reason', 'Count', '%', 'Kiosk Strategy']
    for ci,h in enumerate(why_h,2):
        c=ws.cell(row=r,column=ci,value=h);c.font=hf;c.fill=hf5;c.alignment=ca;c.border=tb
    r += 1

    why_strats = {
        'close': 'Place kiosk even closer to capture these customers',
        'passing': 'High-traffic zone — kiosk captures impulse traffic',
        'fast': 'Offer ≤3 min service — direct speed advantage',
        'taste': 'Standardized recipes + trained baristas',
        'price': '$1.50-2.50 menu — undercut their prices',
        'queue': 'Express lane eliminates queue frustration',
        'consist': 'Consistent quality = brand trust',
        'promot': 'Loyalty stamp card from Day 1',
    }
    for item, cnt in why.most_common():
        pct = cnt/n_b*100
        strat = 'Monitor'
        item_lower = item.lower()
        for k, v in list(why_strats.items()):
            if k in item_lower: strat = v; break
        row = [item, cnt, f'{pct:.0f}%', strat]
        for ci,v in enumerate(row,2):
            c=ws.cell(row=r,column=ci,value=v);c.border=tb;c.font=nm;c.alignment=la if ci in [2,5] else ca
            if ci==2: c.font=bd
        r += 1
    r += 1

    # ── 5. WHAT THEY DISLIKE ──
    r = ssec(ws, r, '5. WHAT CUSTOMERS DISLIKE (Pain Points)', C)
    r += 1
    dis = count_ms(sub['dislikes'])
    dis_h = ['Complaint', 'Count', '%', 'Our Kiosk Fix']
    for ci,h in enumerate(dis_h,2):
        c=ws.cell(row=r,column=ci,value=h);c.font=hf;c.fill=PatternFill(start_color=RED,end_color=RED,fill_type='solid');c.alignment=ca;c.border=tb
    r += 1

    dis_fixes = {
        'high price': '$1-3 menu. Kiosk overhead = 20-30% cheaper.',
        'long wait': '≤3 min target. Express lane. Pre-order QR.',
        'limited menu': 'Focused 8-SKU menu + rotating specials.',
        'quality': 'Standardized recipes. Daily quality checks.',
        'unclean': 'Visible cleanliness. Open-air kiosk design.',
        'inconvenient': 'Better location selection based on foot traffic data.',
        'service': 'Barista training program. Mystery shopper audits.',
        'parking': 'Kiosk at foot-traffic zone = no parking needed.',
        'no ': 'Already satisfied — hard to win over.',
    }
    for item, cnt in dis.most_common():
        pct = cnt/n_b*100
        fix = 'Monitor'
        item_lower = item.lower()
        for k, v in list(dis_fixes.items()):
            if k in item_lower: fix = v; break
        row = [item, cnt, f'{pct:.0f}%', fix]
        for ci,v in enumerate(row,2):
            c=ws.cell(row=r,column=ci,value=v);c.border=tb;c.font=nm;c.alignment=la if ci in [2,5] else ca
            if ci==2: c.font=bd
        r += 1
    r += 1

    # ── 6. CONSUMPTION PATTERNS ──
    r = ssec(ws, r, '6. CONSUMPTION PATTERNS', C)
    r += 1
    pat_h = ['Behavior', 'Finding', 'Implication']
    for ci,h in enumerate(pat_h,2):
        c=ws.cell(row=r,column=ci,value=h);c.font=hf;c.fill=hfill;c.alignment=ca;c.border=tb
    r += 1

    # Cups per day
    cups = sub['cups_per_day'].value_counts()
    cups_str = ', '.join([f'{k}: {v}' for k,v in list(cups.head(3).items())])

    # Visit frequency
    freq = sub['visit_freq'].value_counts()
    freq_str = ', '.join([f'{k}: {v}' for k,v in list(freq.head(3).items())])

    # Purchase method
    pm = count_ms(sub['purchase_method'])
    pm_str = ', '.join([f'{k} ({v})' for k,v in list(pm.most_common(3))])

    # Time of day
    tod = count_ms(sub['time_of_day'])
    tod_str = ', '.join([f'{k} ({v})' for k,v in list(tod.most_common(3))])

    # Wait tolerance
    wt = sub['wait_tolerance'].value_counts()
    wt_str = ', '.join([f'{k}: {v}' for k,v in list(wt.head(3).items())])

    patterns = [
        ['Cups per day', cups_str, 'Single-cup buyers = need high throughput'],
        ['Visit frequency', freq_str, 'Regulars = loyalty program captures them'],
        ['Purchase method', pm_str, 'Takeaway % = kiosk format fit'],
        ['Peak time', tod_str, 'Staffing schedule for peak hours'],
        ['Wait tolerance', wt_str, 'Speed target for this location'],
    ]
    for row_data in patterns:
        for ci,v in enumerate(row_data,2):
            c=ws.cell(row=r,column=ci,value=v);c.border=tb;c.font=nm;c.alignment=la
            if ci==2: c.font=bd
        r += 1
    r += 1

    # ── 7. BRANCH VERDICT ──
    r = ssec(ws, r, '7. KIOSK OPPORTUNITY ASSESSMENT', C)
    r += 1

    # Find weakest and strongest
    worst_dim = ''; worst_score = 99
    best_dim = ''; best_score = 0
    for col, lab in zip(RC, RL):
        m = sub[col].mean()
        if m < worst_score: worst_score = m; worst_dim = lab
        if m > best_score: best_score = m; best_dim = lab

    # Find top segment
    top_seg = seg_dist.index[0] if len(seg_dist) > 0 else 'Mixed'
    top_seg_pct = seg_dist.iloc[0]/n_b*100 if len(seg_dist) > 0 else 0

    # Find top complaint
    top_complaint = dis.most_common(1)[0][0] if dis else 'None'
    top_complaint_pct = dis.most_common(1)[0][1]/n_b*100 if dis else 0

    # Find top drink
    top_drink = drk.most_common(1)[0][0] if drk else 'N/A'

    verdict_color = gf if ov >= 4.0 else (yf if ov >= 3.5 else rf)
    verdict_text = 'STRONG opportunity' if ov >= 4.0 else ('MODERATE opportunity' if ov >= 3.5 else 'CHALLENGING — high bar')

    ws.merge_cells(start_row=r,start_column=1,end_row=r,end_column=C)
    c = ws.cell(row=r,column=1,value=f'Verdict: {verdict_text}')
    c.font=Font(bold=True,size=11);c.fill=verdict_color;c.alignment=ca;c.border=tb
    r += 2

    insights = [
        f'• Primary segment: {top_seg} ({top_seg_pct:.0f}%) — kiosk design should target them',
        f'• Biggest weakness: {worst_dim} ({worst_score:.2f}/5) — this is where we differentiate',
        f'• Biggest strength: {best_dim} ({best_score:.2f}/5) — we must match or exceed this',
        f'• Top complaint: {top_complaint} ({top_complaint_pct:.0f}%) — solve this to win customers',
        f'• Top drink: {top_drink} — must be on our menu',
        f'• Overall rating {ov:.2f}/5 — {"room to win" if ov < 4.0 else "need to match quality"}',
    ]

    for insight in insights:
        ws.merge_cells(start_row=r,start_column=1,end_row=r,end_column=C)
        ws.cell(row=r,column=1,value=insight).font=Font(size=10); ws.cell(row=r,column=1).alignment=la
        r += 1

    return r + 1

# ═══ CREATE WORKBOOK ═══
wb = openpyxl.Workbook()
C = 10

# ─── OVERVIEW SHEET ───
ws = wb.active; ws.title = 'All Branches Overview'; ws.sheet_properties.tabColor = DB
sws(ws, [4, 22, 12, 10, 10, 10, 10, 10, 10, 30])

r = 1
ws.merge_cells('A1:J1')
ws.cell(row=1,column=1,value='☕ DEEP BRANCH ANALYSIS — Every Branch, Every Dimension').font=Font(bold=True,size=16,color=DB)
r += 1
ws.merge_cells(f'A{r}:J{r}')
ws.cell(row=r,column=1,value='273 respondents | 4 brands | 30+ branches | Phnom Penh, 2026').font=Font(size=11,color='888888')
r += 2

# Full branch comparison table
r = sec(ws, r, 'ALL BRANCHES RANKED BY OVERALL RATING', C)
r += 1
cmp_h = ['Brand', 'Branch', 'n', 'Overall', 'Service', 'Atmos', 'Price', 'Quality', 'Design', 'Location', 'Speed', 'Parking', 'NPS', 'Top Segment']
for ci,h in enumerate(cmp_h,2):
    c=ws.cell(row=r,column=ci,value=h);c.font=hf;c.fill=hfill;c.alignment=ca;c.border=tb
r += 1

all_branches = []
for brand in ['Onnik Coffee', 'Mr. Dad Coffee', 'Cyclo Cafe', 'Mobile Coffee']:
    brand_sub = df[df.bn == brand]
    for br_name, br_count in list(brand_sub["br"].value_counts().items()):
        br_sub = brand_sub[brand_sub.br == br_name]
        if len(br_sub) < 1: continue
        ov = br_sub.r_overall.mean()
        nps_v = ((br_sub.nps=='Promoter').sum()-(br_sub.nps=='Detractor').sum())/len(br_sub)*100 if len(br_sub)>0 else 0
        top_seg = br_sub['seg'].value_counts().index[0] if len(br_sub['seg'].value_counts())>0 else 'N/A'
        row = [brand, br_name, len(br_sub), ov, nps_v, top_seg]
        for col in RC:
            row.append(br_sub[col].mean())
        all_branches.append((ov, row))

all_branches.sort(key=lambda x: -x[0])
for _, row in all_branches:
    brand, br_name, nb_r, ov, nps_v, top_seg = row[0], row[1], row[2], row[3], row[4], row[5]
    ratings = row[6:]
    vals = [brand, br_name, nb_r, f'{ov:.2f}', f'{nps_v:.0f}', top_seg]
    for rv in ratings:
        vals.append(f'{rv:.2f}' if rv == rv else 'N/A')

    for ci,v in enumerate(vals,2):
        c=ws.cell(row=r,column=ci,value=v);c.border=tb;c.font=Font(size=9);c.alignment=la if ci in [2,3] else ca
        if ci==2: c.font=bd
    r += 1

# ─── ONE SHEET PER BRAND WITH ALL BRANCHES ───
brand_info = {
    'Onnik Coffee': ('4472C4', 'Onnik Coffee'),
    'Mr. Dad Coffee': ('ED7D31', 'Mr. Dad Coffee'),
    'Cyclo Cafe': ('548235', 'Cyclo Cafe'),
    'Mobile Coffee': ('7030A0', 'Mobile Coffee'),
}

for brand, (color, sheet_name) in list(brand_info.items()):
    ws_b = wb.create_sheet(sheet_name); ws_b.sheet_properties.tabColor = color
    sws(ws_b, [4, 24, 12, 12, 12, 12, 12, 12, 12, 30])

    brand_sub = df[df.bn == brand]
    n_brand = len(brand_sub)
    brand_ov = brand_sub.r_overall.mean()
    brand_nps = ((brand_sub.nps=='Promoter').sum()-(brand_sub.nps=='Detractor').sum())/n_brand*100

    r = 1
    fill = PatternFill(start_color=color,end_color=color,fill_type='solid')
    ws.merge_cells(f'A{r}:J{r}')
    ws.cell(row=r,column=1,value=f'{brand} — Full Branch Analysis').font=Font(bold=True,size=14,color='FFFFFF')
    ws.cell(row=r,column=1).fill=fill; ws.cell(row=r,column=1).alignment=ca
    r += 1
    ws.merge_cells(f'A{r}:J{r}')
    ws.cell(row=r,column=1,value=f'{n_brand} respondents across {len(brand_sub.br.value_counts())} branches | Brand Overall: {brand_ov:.2f}/5 | NPS: {brand_nps:.0f}').font=Font(size=10,color='666666')
    ws.cell(row=r,column=1).alignment=la
    r += 2

    # Brand-level rating summary
    r = ssec(ws_b, r, 'BRAND-LEVEL RATING SUMMARY', C)
    r += 1
    for ci,h in enumerate(['Dimension','Brand Mean','Market Mean','Gap vs Market','Assessment'],2):
        c=ws_b.cell(row=r,column=ci,value=h);c.font=hf;c.fill=fill;c.alignment=ca;c.border=tb
    r += 1

    for col, lab in zip(RC, RL):
        bm = brand_sub[col].mean()
        mm = df[col].mean()
        gap = bm - mm
        assess = '✅ Above market' if gap > 0.1 else ('⚠ Below market' if gap < -0.1 else '= At market')
        row = [lab, f'{bm:.2f}', f'{mm:.2f}', f'{gap:+.2f}', assess]
        for ci,v in enumerate(row,2):
            c=ws_b.cell(row=r,column=ci,value=v);c.border=tb;c.font=nm;c.alignment=ca
            if ci==2: c.font=bd
            if 'Above' in str(v): c.fill=gf
            elif 'Below' in str(v): c.fill=rf
        r += 1
    r += 2

    # Deep dive per branch
    branches = brand_sub['br'].value_counts()
    for br_name, br_count in list(branches.items()):
        br_sub = brand_sub[brand_sub.br == br_name]
        r = write_branch_deep(ws_b, br_sub, br_name, brand, r, C)

# ─── SAVE ───
wb.save(OUT)
print(f'Done: {OUT}')
print(f'Sheets: {wb.sheetnames}')
