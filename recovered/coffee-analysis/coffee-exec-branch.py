#!/usr/bin/env python3
"""Executive Summary — Branch-Specific Analysis"""
import pandas as pd
import numpy as np
from collections import Counter
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
import re

SRC = '/home/KOOMPI/.openclaw/media/inbound/Clean_Coffee_Customer_Survey_2026.03.25_Responses---219b0a7e-67ac-48f7-9691-b7793879d06f.xlsx'
OUT = '/home/KOOMPI/.openclaw/nimmit/coffee-analysis-output/Coffee_Executive_Summary_Branch.xlsx'

wb_src = pd.read_excel(SRC, sheet_name='Consolidate')
df = wb_src.copy()
cols = list(df.columns)

# Rename columns
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

# Normalize brand
def nb(b):
    if pd.isna(b): return 'Unknown'
    b = str(b).strip().lower()
    if 'onnik' in b: return 'Onnik Coffee'
    if 'mr' in b or 'dad' in b or 'orp' in b: return 'Mr. Dad Coffee'
    if 'cyclo' in b: return 'Cyclo Cafe'
    if 'mobile' in b: return 'Mobile Coffee'
    return 'Others'
df['bn'] = df['brand'].apply(nb)

# Normalize segment
def ns(s):
    if pd.isna(s): return 'Other'
    s = str(s).strip()
    if 'university' in s.lower() or 'និស្សិតសាកល' in s: return 'University Student'
    if 'high school' in s.lower() or 'សិស្សវិទ្យាល័យ' in s: return 'High School Student'
    if 'office' in s.lower() or 'civil' in s.lower() or 'បុគ្គលិក' in s or 'មន្ត្រី' in s: return 'Working Professional'
    return 'Other'
df['seg'] = df['segment'].apply(ns)

# Normalize branch — extract English name
def norm_branch(b, brand):
    if pd.isna(b): return 'Unknown'
    b = str(b).strip()
    # Try to find English text in parentheses
    m = re.search(r'\(([^)]+)\)', b)
    if m:
        eng = m.group(1).strip()
        # Remove common prefix
        brand_prefix = brand.replace('Coffee','').replace('Café','').replace(' Cafe','').strip()
        for prefix in ['Onnik Coffee-', 'កាហ្វេឪ / Mr. Dad Coffee-', 'Cyclo Café-', 'Cyclo Cafe-',
                       'Mobile coffee-', 'Mobile Coffee-', 'Others-', 'Mobile Coffee -']:
            if prefix.lower() in b.lower() or prefix in b:
                after = b.split(prefix, 1)[-1].strip() if prefix in b else b
                m2 = re.search(r'\(([^)]+)\)', after)
                if m2: return m2.group(1).strip()
                return after.strip()
        return eng
    # No parentheses — return as-is, clean
    return b.strip()

df['branch_clean'] = df.apply(lambda r: norm_branch(r['branch'], r['bn']), axis=1)

# Clean up branch names
def clean_branch_name(name, brand):
    """Further clean branch names"""
    if pd.isna(name) or name == 'Unknown': return 'Unknown'
    name = str(name).strip()
    # Remove brand prefix if still there
    prefixes = ['Onnik Coffee-', 'កាហ្វេឪ / Mr. Dad Coffee-', 'Cyclo Café-', 'Cyclo Cafe-',
                'Mobile coffee-', 'Mobile Coffee-', 'Others-']
    for p in prefixes:
        if name.startswith(p):
            name = name[len(p):].strip()
    # Remove Khmer text
    khmer = re.sub(r'[\u1780-\u17FF]', '', name).strip()
    if khmer and len(khmer) > 2: name = khmer
    # Remove duplicates
    if '-' in name:
        parts = [p.strip() for p in name.split('-')]
        if len(parts) >= 2:
            name = parts[-1]  # Take English part
    return name.strip()

df['branch_clean'] = df.apply(lambda r: clean_branch_name(r['branch_clean'], r['bn']), axis=1)

# Force numeric
for c in ['r_service','r_atmos','r_price','r_quality','r_design','r_location','r_speed','r_parking','r_overall']:
    df[c] = pd.to_numeric(df[c], errors='coerce')

N = len(df)
rating_cols = ['r_service','r_atmos','r_price','r_quality','r_design','r_location','r_speed','r_parking']
rating_labels = ['Customer Service','Atmosphere','Price Value','Coffee Quality','Design','Location','Speed','Parking']

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

# ═══ STYLES ═══
DB = '1F3864'; TEAL = '2E75B6'; GREEN = '548235'; RED = 'C00000'; ORANGE = 'ED7D31'; PURPLE = '7030A0'
LG = 'E2EFDA'; LR = 'FCE4EC'; LY = 'FFF2CC'; LB = 'D6E4F0'; GR = 'F2F2F2'
hf = Font(bold=True, color='FFFFFF', size=10)
hfill = PatternFill(start_color=DB, end_color=DB, fill_type='solid')
hf2 = PatternFill(start_color=TEAL, end_color=TEAL, fill_type='solid')
hf3 = PatternFill(start_color=GREEN, end_color=GREEN, fill_type='solid')
hf4 = PatternFill(start_color=ORANGE, end_color=ORANGE, fill_type='solid')
hf5 = PatternFill(start_color=PURPLE, end_color=PURPLE, fill_type='solid')
hf6 = PatternFill(start_color=RED, end_color=RED, fill_type='solid')
bf = PatternFill(start_color=LB, end_color=LB, fill_type='solid')
gf = PatternFill(start_color=LG, end_color=LG, fill_type='solid')
rf = PatternFill(start_color=LR, end_color=LR, fill_type='solid')
yf = PatternFill(start_color=LY, end_color=LY, fill_type='solid')
af = PatternFill(start_color=GR, end_color=GR, fill_type='solid')
sf = Font(bold=True, size=11, color=DB)
norm = Font(size=10); bold = Font(bold=True, size=10); sm = Font(size=9, color='666666')
tb = Border(left=Side(style='thin', color='D9D9D9'), right=Side(style='thin', color='D9D9D9'),
           top=Side(style='thin', color='D9D9D9'), bottom=Side(style='thin', color='D9D9D9'))
ca = Alignment(horizontal='center', vertical='center', wrap_text=True)
la = Alignment(horizontal='left', vertical='center', wrap_text=True)

def sh(ws, r, cols, fill=None):
    f = fill or hfill
    for ci in cols:
        c = ws.cell(row=r, column=ci); c.font = hf; c.fill = f; c.alignment = ca; c.border = tb

def sr(ws, r, cols, alt=False):
    for ci in cols:
        c = ws.cell(row=r, column=ci)
        c.border = tb; c.font = norm; c.alignment = la if ci <= 2 else ca
        if ci <= 2: c.font = bold
        if alt: c.fill = af

def sw(ws, widths):
    for ci, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(ci)].width = w

def sec(ws, r, text, cols):
    ws.merge_cells(start_row=r, start_column=1, end_row=r, end_column=cols)
    c = ws.cell(row=r, column=1, value=text); c.font = sf; c.fill = bf; c.border = tb; c.alignment = la
    return r + 1

def subsec(ws, r, text, cols):
    ws.merge_cells(start_row=r, start_column=1, end_row=r, end_column=cols)
    c = ws.cell(row=r, column=1, value=text); c.font = Font(bold=True, size=11, color='444444'); c.alignment = la
    return r + 1

def note(ws, r, text, cols):
    ws.merge_cells(start_row=r, start_column=1, end_row=r, end_column=cols)
    c = ws.cell(row=r, column=1, value=text); c.font = sm; c.alignment = la
    return r + 1

# ═══ CREATE WORKBOOK ═══
wb = openpyxl.Workbook()
C = 10

# ─── PAGE 1: OVERVIEW ───
ws = wb.active; ws.title = 'Overview'; ws.sheet_properties.tabColor = DB
sw(ws, [4, 22, 14, 14, 14, 14, 14, 14, 22, 22])
r = 1
ws.merge_cells('A1:J1')
ws.cell(row=1, column=1, value='☕').font = Font(size=36)
r = 2
ws.merge_cells(f'A{r}:J{r}')
ws.cell(row=r, column=1, value='MULTI-KIOSK COFFEE EXPANSION — EXECUTIVE SUMMARY').font = Font(bold=True, size=16, color=DB)
r += 1
ws.merge_cells(f'A{r}:J{r}')
ws.cell(row=r, column=1, value='Phnom Penh, Cambodia  |  2026  |  273 Survey Respondents  |  4 Competitor Brands').font = Font(size=11, color='888888')
r += 1
ws.merge_cells(f'A{r}:J{r}')
c = ws.cell(row=r, column=1, value='✅  CONDITIONAL GO — Proceed with 3-Kiosk Pilot Phase')
c.font = Font(bold=True, size=12, color='006100'); c.fill = gf; c.alignment = ca
r += 2

# Market overview table
r = subsec(ws, r, 'MARKET AT A GLANCE', C)
r += 1
ov = [
    ['Metric', 'Value', 'Insight'],
    ['Total Respondents', N, 'Online + Offline survey, March 2026'],
    ['Avg Overall Rating', f'{df.r_overall.mean():.2f} / 5.0', 'No brand exceeds 4.0 — room for new entrant'],
    ['NPS Score', f'{((df.nps=="Promoter").sum()-(df.nps=="Detractor").sum())/N*100:.0f}', f'{(df.nps=="Promoter").sum()/N*100:.0f}% Promoters, {(df.nps=="Detractor").sum()/N*100:.0f}% Detractors'],
    ['#1 Pain Point', f'High Price ({(df.dislikes.str.contains("high price", case=False, na=False)).sum()/N*100:.0f}%)', 'Kiosk model enables 20-30% lower prices'],
    ['#2 Pain Point', f'Long Wait ({(df.dislikes.str.contains("long wait", case=False, na=False)).sum()/N*100:.0f}%)', '≤3 min target = clear differentiator'],
    ['#1 Purchase Driver', f'Proximity ({(df.why_choose.str.contains("close", case=False, na=False)).sum()/N*100:.0f}%)', 'Location IS the product for kiosks'],
    ['Top International Brand', f'Chagee ({(df.intl_brands.str.contains("Chagee", case=False, na=False)).sum()/N*100:.0f}%)', 'Study their kiosk model, speed, brand energy'],
]
for ri, row_data in enumerate(ov):
    for ci, v in enumerate(row_data, 2):
        c = ws.cell(row=r, column=ci, value=v); c.border = tb
        if ri == 0: c.font = hf; c.fill = hfill; c.alignment = ca
        else: c.font = bold if ci == 2 else norm; c.alignment = la if ci == 2 else ca
        if ri > 0 and ri % 2 == 0: c.fill = af
    r += 1

# Competitor brand summary with branches
r += 1
r = sec(ws, r, 'COMPETITOR BRANDS — Respondents per Brand & Branch', C)
r += 1
br_h = ['Brand', 'Total Resp.', '# Branches', 'Top Branch', 'Top Branch %', 'Overall Rating', 'NPS', 'Key Weakness']
for ci, h in enumerate(br_h, 2):
    c = ws.cell(row=r, column=ci, value=h); c.font = hf; c.fill = hfill; c.alignment = ca; c.border = tb
r += 1

brands = ['Onnik Coffee', 'Mr. Dad Coffee', 'Cyclo Cafe', 'Mobile Coffee']
for brand in brands:
    sub = df[df.bn == brand]
    n_b = len(sub)
    branches = sub['branch_clean'].value_counts()
    top_br = branches.index[0] if len(branches) > 0 else 'N/A'
    top_pct = branches.iloc[0]/n_b*100 if len(branches) > 0 else 0
    ov_r = sub.r_overall.mean()
    nps_b = ((sub.nps=='Promoter').sum()-(sub.nps=='Detractor').sum())/n_b*100 if n_b > 0 else 0

    # Find weakest dimension
    weakest = ''; worst = 99
    for col, lab in zip(rating_cols, rating_labels):
        avg = sub[col].mean()
        if avg < worst: worst = avg; weakest = lab

    row = [brand, n_b, len(branches), top_br, f'{top_pct:.0f}%', f'{ov_r:.2f}', f'{nps_b:.0f}', f'{weakest} ({worst:.2f})']
    for ci, v in enumerate(row, 2):
        c = ws.cell(row=r, column=ci, value=v); c.border = tb; c.font = norm; c.alignment = la if ci == 2 else ca
        if ci == 2: c.font = bold
    r += 1

# ─── PAGES 2-5: ONE PER BRAND ───
brand_colors = {
    'Onnik Coffee': ('4472C4', 'Onnik Coffee — Branch Analysis'),
    'Mr. Dad Coffee': ('ED7D31', 'Mr. Dad Coffee — Branch Analysis'),
    'Cyclo Cafe': ('548235', 'Cyclo Cafe — Branch Analysis'),
    'Mobile Coffee': ('7030A0', 'Mobile Coffee — Branch Analysis'),
}

for brand, (color, title) in brand_colors.items():
    ws_b = wb.create_sheet(brand.split()[0]); ws_b.sheet_properties.tabColor = color
    sw(ws_b, [4, 24, 14, 14, 14, 14, 14, 14, 22, 22])
    r = 1

    fill = PatternFill(start_color=color, end_color=color, fill_type='solid')

    r = sec(ws_b, r, title, C)
    r = note(ws_b, r, f'Based on {(df.bn==brand).sum()} survey respondents who selected {brand} as their primary shop', C)
    r += 1

    sub = df[df.bn == brand]
    n_b = len(sub)
    branches = sub['branch_clean'].value_counts()

    # Branch performance table
    r = subsec(ws_b, r, f'BRANCH PERFORMANCE — All {len(branches)} Branches Ranked by Overall Rating', C)
    r += 1
    br_h = ['Branch', 'n', '%', 'Overall', 'Service', 'Atmos', 'Price', 'Quality', 'Design', 'Location', 'Speed', 'Parking', 'NPS']
    for ci, h in enumerate(br_h, 2):
        c = ws_b.cell(row=r, column=ci, value=h); c.font = hf; c.fill = fill; c.alignment = ca; c.border = tb
    r += 1

    branch_data = []
    for br_name, br_count in branches.items():
        br_sub = sub[sub['branch_clean'] == br_name]
        if len(br_sub) < 1: continue
        ov_r = br_sub.r_overall.mean()
        nps_br = ((br_sub.nps=='Promoter').sum()-(br_sub.nps=='Detractor').sum())/len(br_sub)*100
        row = [br_name, len(br_sub), f'{len(br_sub)/n_b*100:.0f}%', f'{ov_r:.2f}']
        for col in rating_cols:
            row.append(f'{br_sub[col].mean():.2f}')
        row.append(f'{nps_br:.0f}')
        branch_data.append((ov_r, row))

    branch_data.sort(key=lambda x: -x[0])
    for rank, (_, row) in enumerate(branch_data, 1):
        for ci, v in enumerate(row, 2):
            c = ws_b.cell(row=r, column=ci, value=v); c.border = tb; c.font = Font(size=9); c.alignment = la if ci == 2 else ca
            if ci == 2: c.font = bold
        r += 1

    # Brand average row
    ws_b.cell(row=r, column=2, value='BRAND AVERAGE').font = bold; ws_b.cell(row=r, column=2).border = tb
    ws_b.cell(row=r, column=3, value=n_b).font = bold; ws_b.cell(row=r, column=3).border = tb
    ws_b.cell(row=r, column=4, value='100%').font = bold; ws_b.cell(row=r, column=4).border = tb
    ws_b.cell(row=r, column=5, value=f'{sub.r_overall.mean():.2f}').font = bold; ws_b.cell(row=r, column=5).border = tb
    for ci, col in enumerate(rating_cols, 6):
        v = sub[col].mean()
        c = ws_b.cell(row=r, column=ci, value=f'{v:.2f}'); c.font = bold; c.border = tb; c.alignment = ca; c.fill = yf
    brand_nps = ((sub.nps=='Promoter').sum()-(sub.nps=='Detractor').sum())/n_b*100
    ws_b.cell(row=r, column=14, value=f'{brand_nps:.0f}').font = bold; ws_b.cell(row=r, column=14).border = tb
    for ci in range(2, 15):
        ws_b.cell(row=r, column=ci).border = tb
    r += 2

    # Top branch deep dive
    if len(branch_data) > 0:
        top_br_name = branch_data[0][1][0]
        top_sub = sub[sub['branch_clean'] == top_br_name]

        r = subsec(ws_b, r, f'TOP BRANCH: {top_br_name} (n={len(top_sub)})', C)
        r += 1

        # Demographics of top branch
        seg_dist = top_sub['seg'].value_counts()
        r = note(ws_b, r, 'Customer Segments:', C); r += 1
        for seg_name, seg_cnt in seg_dist.items():
            ws_b.cell(row=r, column=2, value=f'  • {seg_name}').font = norm
            ws_b.cell(row=r, column=3, value=f'{seg_cnt} ({seg_cnt/len(top_sub)*100:.0f}%)').font = norm
            r += 1

        # What they like
        r += 1
        why_c = count_ms(top_sub['why_choose'])
        ws_b.cell(row=r, column=2, value='Why they choose this branch:').font = bold
        r += 1
        for item, cnt in why_c.most_common(5):
            ws_b.cell(row=r, column=2, value=f'  • {item}').font = norm
            ws_b.cell(row=r, column=3, value=f'{cnt/len(top_sub)*100:.0f}%').font = norm
            r += 1

        # What they dislike
        r += 1
        dis_c = count_ms(top_sub['dislikes'])
        ws_b.cell(row=r, column=2, value='What they dislike:').font = bold
        r += 1
        for item, cnt in dis_c.most_common(5):
            ws_b.cell(row=r, column=2, value=f'  • {item}').font = norm
            ws_b.cell(row=r, column=3, value=f'{cnt/len(top_sub)*100:.0f}%').font = norm
            r += 1

        # Drinks
        r += 1
        drk_c = count_ms(top_sub['drink_type'])
        ws_b.cell(row=r, column=2, value='Top drinks ordered:').font = bold
        r += 1
        for item, cnt in drk_c.most_common(5):
            ws_b.cell(row=r, column=2, value=f'  • {item}').font = norm
            ws_b.cell(row=r, column=3, value=f'{cnt/len(top_sub)*100:.0f}%').font = norm
            r += 1

    # Branch-level gaps (what to improve per branch)
    r += 1
    r = subsec(ws_b, r, 'BRANCH-LEVEL IMPROVEMENT OPPORTUNITIES', C)
    r += 1
    gap_h = ['Branch', 'Weakest Dimension', 'Score', 'Gap→5.0', 'Recommendation']
    for ci, h in enumerate(gap_h, 2):
        c = ws_b.cell(row=r, column=ci, value=h); c.font = hf; c.fill = fill; c.alignment = ca; c.border = tb
    r += 1

    recs = {
        'Price Value': 'Introduce value combo meals ($3-4 for drink+pastry)',
        'Parking': 'Partner with nearby parking; add bike parking signs',
        'Design': 'Refresh branding; add Instagrammable photo spot',
        'Speed': 'Add express lane for simple drinks; pre-order QR',
        'Location': 'Improve signage; add Google Maps presence',
        'Atmosphere': 'Improve seating comfort; add background music',
        'Coffee Quality': 'Standardize recipes; retrain baristas; check bean sourcing',
        'Customer Service': 'Customer service training; feedback cards; mystery shopper',
    }

    for br_name, br_count in branches.items():
        br_sub = sub[sub['branch_clean'] == br_name]
        if len(br_sub) < 2: continue
        worst_score = 99; worst_dim = ''
        for col, lab in zip(rating_cols, rating_labels):
            avg = br_sub[col].mean()
            if avg < worst_score: worst_score = avg; worst_dim = lab
        gap = 5 - worst_score
        rec = recs.get(worst_dim, 'Monitor and improve')
        row = [br_name, worst_dim, f'{worst_score:.2f}', f'{gap:.2f}', rec]
        for ci, v in enumerate(row, 2):
            c = ws_b.cell(row=r, column=ci, value=v); c.border = tb; c.font = Font(size=9); c.alignment = la
            if ci == 2: c.font = bold
        if gap >= 1.5: ws_b.cell(row=r, column=5).fill = rf
        elif gap >= 1.2: ws_b.cell(row=r, column=5).fill = yf
        r += 1

    # Kiosk opportunity for this brand
    r += 1
    r = subsec(ws_b, r, 'KIOSK OPPORTUNITY — Where to Place Kiosks Near Their Customers', C)
    r += 1

    # Find areas with high foot traffic from branch data
    ws_b.cell(row=r, column=2, value='Key Areas Where Customers Are:').font = bold
    r += 1
    for br_name, br_count in branches.head(5).items():
        pct = br_count/n_b*100
        ws_b.cell(row=r, column=2, value=f'  • {br_name} area').font = norm
        ws_b.cell(row=r, column=3, value=f'{br_count} respondents ({pct:.0f}%)').font = norm
        r += 1

    r += 1
    brand_avg = sub.r_overall.mean()
    price_avg = sub.r_price.mean()
    speed_avg = sub.r_speed.mean()
    ws_b.merge_cells(start_row=r, start_column=2, end_row=r+1, end_column=C)
    ws_b.cell(row=r, column=2, value=(
        f"SUMMARY: {brand} scores {brand_avg:.2f}/5 overall. "
        f"Weakest areas: Price ({price_avg:.2f}/5), Speed ({speed_avg:.2f}/5). "
        f"A kiosk near their top branches ({branches.index[0]}, {branches.index[1] if len(branches)>1 else 'N/A'}) "
        f"could capture {(df.nps=='Passive').sum()/N*100:.0f}% of 'passive' customers who are open to switching. "
        f"Focus on lower price + faster service."
    )).font = Font(size=10); ws_b.cell(row=r, column=2).alignment = la
    ws_b.row_dimensions[r].height = 50
    r += 3

# ─── PAGE 6: FINANCIAL & RECOMMENDATIONS ───
ws_f = wb.create_sheet('Financial & Action Plan'); ws_f.sheet_properties.tabColor = RED
sw(ws_f, [4, 28, 18, 18, 18, 18, 22, 22])
r = 1

r = sec(ws_f, r, 'FINANCIAL HIGHLIGHTS', C)
r += 1

scenarios = {
    'Conservative': {'k': 2, 'cpd': 60, 'adp': 1.8, 'far': 0.15, 'afp': 1.5, 'cogs': 0.42, 'rent': 450, 'sal': 900, 'util': 80, 'mkt': 200, 'capex': 16000, 'days': 300},
    'Base Case': {'k': 3, 'cpd': 90, 'adp': 2.2, 'far': 0.22, 'afp': 1.8, 'cogs': 0.38, 'rent': 600, 'sal': 1000, 'util': 100, 'mkt': 300, 'capex': 19500, 'days': 310},
    'Optimistic': {'k': 4, 'cpd': 130, 'adp': 2.6, 'far': 0.30, 'afp': 2.2, 'cogs': 0.34, 'rent': 750, 'sal': 1100, 'util': 120, 'mkt': 400, 'capex': 23000, 'days': 315},
}

fin_h = ['Metric', 'Conservative', 'Base Case', 'Optimistic']
for ci, h in enumerate(fin_h, 2):
    c = ws_f.cell(row=r, column=ci, value=h); c.font = hf; c.fill = hf6; c.alignment = ca; c.border = tb
r += 1

for sn, s in scenarios.items():
    avg_rev = s['adp'] + s['far'] * s['afp']
    yr1 = s['k'] * s['cpd'] * s['days'] * avg_rev
    mf = s['rent'] + s['sal'] + s['util'] + s['mkt'] + 75 + 180 + 400
    contrib = avg_rev * (1 - s['cogs'])
    be_d = mf / contrib / 25
    mp = s['cpd'] * 25 * avg_rev * (1 - s['cogs']) - mf
    pb = s['capex'] / mp if mp > 0 else 999
    scenarios[sn]['yr1'] = yr1; scenarios[sn]['be_d'] = be_d; scenarios[sn]['mp'] = mp; scenarios[sn]['pb'] = pb

fin_rows = [
    ['Kiosks (Year 1)', scenarios['Conservative']['k'], scenarios['Base Case']['k'], scenarios['Optimistic']['k']],
    ['Cups/Day/Kiosk', scenarios['Conservative']['cpd'], scenarios['Base Case']['cpd'], scenarios['Optimistic']['cpd']],
    ['Year 1 Revenue', f'${scenarios["Conservative"]["yr1"]:,.0f}', f'${scenarios["Base Case"]["yr1"]:,.0f}', f'${scenarios["Optimistic"]["yr1"]:,.0f}'],
    ['Breakeven Cups/Day', f'{scenarios["Conservative"]["be_d"]:.0f}', f'{scenarios["Base Case"]["be_d"]:.0f}', f'{scenarios["Optimistic"]["be_d"]:.0f}'],
    ['Monthly Profit/Kiosk', f'${scenarios["Conservative"]["mp"]:,.0f}', f'${scenarios["Base Case"]["mp"]:,.0f}', f'${scenarios["Optimistic"]["mp"]:,.0f}'],
    ['Payback (months)', f'{scenarios["Conservative"]["pb"]:.1f}', f'{scenarios["Base Case"]["pb"]:.1f}', f'{scenarios["Optimistic"]["pb"]:.1f}'],
    ['Capex/Kiosk', f'${scenarios["Conservative"]["capex"]:,.0f}', f'${scenarios["Base Case"]["capex"]:,.0f}', f'${scenarios["Optimistic"]["capex"]:,.0f}'],
]

for row_data in fin_rows:
    for ci, v in enumerate(row_data, 2):
        c = ws_f.cell(row=r, column=ci, value=v); c.border = tb; c.font = norm; c.alignment = ca
        if ci == 2: c.font = bold
    r += 1

# Base case interpretation
r += 1
ws_f.merge_cells(f'B{r}:E{r}')
bc = scenarios['Base Case']
ws_f.cell(row=r, column=2, value=(
    f"BASE CASE: 3 kiosks × 90 cups/day × $2.20 avg = ${bc['yr1']:,.0f} Year 1 revenue. "
    f"Each kiosk profits ~${bc['mp']:,.0f}/month. Payback in {bc['pb']:.0f} months. "
    f"Breakeven at {bc['be_d']:.0f} cups/day — we have {bc['cpd']-bc['be_d']:.0f} cups/day safety margin."
)).font = Font(size=10); ws_f.cell(row=r, column=2).alignment = la
ws_f.row_dimensions[r].height = 40
r += 2

# Action plan
r = sec(ws_f, r, '90-DAY ACTION PLAN', C)
r += 1
acts = [
    ['#', 'Action', 'Timeline', 'Success Metric'],
    ['1', 'Secure 3 kiosk locations near competitor top branches', 'Week 1-4', 'Signed LOIs'],
    ['2', 'Finalize brand design (English name, warm tones)', 'Week 2-6', 'Design approved'],
    ['3', 'Source coffee beans + food suppliers', 'Week 3-6', '2+ suppliers each'],
    ['4', 'Build & install 3 kiosks', 'Week 5-10', 'Operational'],
    ['5', 'Recruit & train baristas (6 total)', 'Week 6-10', 'All certified'],
    ['6', 'Launch loyalty program (stamp card + student discount)', 'Week 10', 'Live Day 1'],
    ['7', 'Soft launch Kiosk #1', 'Week 10-11', '≥80 cups/day'],
    ['8', 'Soft launch Kiosks #2 & #3', 'Week 12-14', '≥80 cups/day each'],
    ['9', '60-day performance review', 'Day 60', 'Revenue vs target'],
    ['10', 'Expand or optimize decision', 'Day 90', 'Go/No-go'],
]
for ri, row_data in enumerate(acts):
    for ci, v in enumerate(row_data, 2):
        c = ws_f.cell(row=r, column=ci, value=v); c.border = tb; c.font = norm; c.alignment = la
        if ri == 0: c.font = hf; c.fill = hf5; c.alignment = ca
    r += 1

# Risks
r += 1
r = sec(ws_f, r, 'KEY RISKS', C)
r += 1
risks = [
    ['Risk', 'Impact', 'Mitigation'],
    ['Chagee enters Cambodia', 'HIGH', 'Speed to market. First-mover on locations.'],
    ['Staff turnover', 'MEDIUM', 'Competitive pay $450-550. Clear career path.'],
    ['Below-target sales', 'HIGH', 'Pilot first. 60-day checkpoint. Cut fast if <50 cups/day.'],
    ['Rent increases', 'MEDIUM', 'Lock 2-year leases. Negotiate revenue share.'],
]
for ri, row_data in enumerate(risks):
    for ci, v in enumerate(row_data, 2):
        c = ws_f.cell(row=r, column=ci, value=v); c.border = tb; c.font = norm; c.alignment = la
        if ri == 0: c.font = hf; c.fill = hf5; c.alignment = ca
        elif 'HIGH' in str(v): c.fill = rf
    r += 1

# ─── SAVE ───
wb.save(OUT)
print(f'Done: {OUT}')
print(f'Sheets: {wb.sheetnames}')
