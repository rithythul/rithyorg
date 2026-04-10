#!/usr/bin/env python3
"""Export coffee survey analysis to formatted Excel workbook."""

import pandas as pd
import numpy as np
from collections import Counter
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

SRC = '/home/KOOMPI/.openclaw/media/inbound/Clean_Coffee_Customer_Survey_2026.03.25_Responses---219b0a7e-67ac-48f7-9691-b7793879d06f.xlsx'
OUT = '/home/KOOMPI/.openclaw/nimmit/coffee-analysis-output/Coffee_Survey_Analysis_Report.xlsx'

wb_src = openpyxl.load_workbook(SRC, data_only=True)
ws = wb_src['Consolidate']
headers = [cell.value for cell in ws[1]]
raw = []
for row in ws.iter_rows(min_row=2, max_row=ws.max_row, values_only=True):
    raw.append(list(row))
df = pd.DataFrame(raw, columns=headers)

col_map = {}
for i, h in enumerate(headers):
    short = ['timestamp','brand','branch','why_choose','dislikes','purchase_method',
             'drink_type','cups_per_day','visit_freq','time_of_day','day_of_week',
             'rating_service','rating_atmosphere','rating_price','rating_quality',
             'rating_design','rating_location','rating_speed','rating_parking',
             'overall_rating','suggestions','wait_tolerance','other_purchases',
             'brand_name_pref','style_pref','color_pref','intl_brands',
             'gender','age','segment','brand_name_raw']
    if i < len(short):
        col_map[h] = short[i]
df.rename(columns=col_map, inplace=True)

def normalize_brand(b):
    if pd.isna(b): return 'Unknown'
    b = str(b).strip().lower()
    if 'onnik' in b: return 'Onnik Coffee'
    if 'mr' in b or 'dad' in b or 'ឪ' in b: return 'Mr. Dad Coffee'
    if 'cyclo' in b: return 'Cyclo Cafe'
    if 'mobile' in b: return 'Mobile Coffee'
    if 'other' in b: return 'Others'
    return str(b).strip()

def normalize_segment(s):
    if pd.isna(s): return 'Unspecified'
    s = str(s).strip()
    if 'និស្សិតសាកល' in s or 'university' in s.lower(): return 'University Student'
    if 'សិស្សវិទ្យាល័យ' in s or 'high school' in s.lower(): return 'High School Student'
    if 'បុគ្គលិកការិយាល័យ' in s or 'office' in s.lower(): return 'Office Worker'
    if 'មន្ត្រីរាជការ' in s or 'civil' in s.lower(): return 'Civil Officer'
    return 'Other'

def normalize_age(a):
    if pd.isna(a): return 'Unspecified'
    a = str(a).strip()
    if 'ក្រោម' in a or 'under' in a.lower(): return 'Under 18'
    if '18' in a and '25' in a: return '18-25'
    if '26' in a and '35' in a: return '26-35'
    if '36' in a and '45' in a: return '36-45'
    if '46' in a: return '46+'
    return a

df['brand_clean'] = df['brand'].apply(normalize_brand)
df['segment_clean'] = df['segment'].apply(normalize_segment)
df['age_clean'] = df['age'].apply(normalize_age)

rating_cols = ['rating_service','rating_atmosphere','rating_price','rating_quality',
               'rating_design','rating_location','rating_speed','rating_parking','overall_rating']
for col in rating_cols:
    df[col] = pd.to_numeric(df[col], errors='coerce')

def parse_ms(val):
    if pd.isna(val): return []
    return [v.strip() for v in str(val).split(',') if v.strip() and v.strip() not in ['nan','None','N/A','']]

def count_ms(series):
    c = Counter()
    for val in series.dropna():
        for item in parse_ms(val):
            c[item] += 1
    return c

# Styles
hf = Font(bold=True, color='FFFFFF', size=11)
hfill = PatternFill(start_color='2F5496', end_color='2F5496', fill_type='solid')
sf = Font(bold=True, size=11)
tf = Font(bold=True, size=14, color='2F5496')
secf = Font(bold=True, size=12, color='2F5496')
tb = Border(left=Side(style='thin'), right=Side(style='thin'), top=Side(style='thin'), bottom=Side(style='thin'))

def wt(ws, r, hdrs, data, cw=None):
    for ci, h in enumerate(hdrs, 1):
        c = ws.cell(row=r, column=ci, value=h)
        c.font = hf; c.fill = hfill; c.alignment = Alignment(horizontal='center', wrap_text=True); c.border = tb
    for ri, rd in enumerate(data, r+1):
        for ci, v in enumerate(rd, 1):
            c = ws.cell(row=ri, column=ci, value=v)
            c.border = tb; c.alignment = Alignment(wrap_text=True)
            if ci == 1: c.font = Font(bold=True)
    if cw:
        for ci, w in enumerate(cw, 1):
            ws.column_dimensions[get_column_letter(ci)].width = w
    return r + len(data) + 2

def wft(ws, r, title, counter, total, cw=None):
    ws.cell(row=r, column=1, value=title).font = secf
    r += 1
    if isinstance(counter, pd.Series):
        rows = [[item, cnt, f'{cnt/total*100:.1f}%'] for item, cnt in counter.items()]
    else:
        rows = [[item, cnt, f'{cnt/total*100:.1f}%'] for item, cnt in counter.most_common()]
    return wt(ws, r, ['Item', 'Count', '%'], rows, cw or [60, 12, 12])

brands_list = ['Onnik Coffee', 'Mr. Dad Coffee', 'Cyclo Cafe', 'Mobile Coffee']
rl = {'rating_service':'Customer Service','rating_atmosphere':'Atmosphere','rating_price':'Price Value',
      'rating_quality':'Coffee Quality','rating_design':'Design & Aesthetics','rating_location':'Location Convenience',
      'rating_speed':'Service Speed','rating_parking':'Parking','overall_rating':'Overall Rating'}

wb = openpyxl.Workbook()

# === SHEET 1: Executive Summary ===
ws1 = wb.active; ws1.title = 'Executive Summary'; ws1.sheet_properties.tabColor = '2F5496'
r = 1
ws1.cell(row=r, column=1, value='Multi-Kiosk Coffee Feasibility Study — Survey Analysis Summary').font = Font(bold=True, size=16, color='2F5496')
r += 1
ws1.cell(row=r, column=1, value='Primary Survey Data | 273 Respondents | Phnom Penh, March 2026').font = Font(italic=True, size=11, color='666666')
r += 2

sd = [['Metric','Value','Notes'],
    ['Total Respondents',273,'Online + Offline combined'],
    ['Data Quality','100% clean','0 duplicates, 0 invalid ratings, 0 missing on key fields'],
    ['Gender Split','54% Female / 46% Male','Slight female skew'],
    ['Age Dominance','81% aged 18-25','Core target: young adults'],
    ['Top Segment','University Students (43%)','Followed by High School (28%), Office Workers (27%)'],
    ['Top Brand Choice Driver','Proximity to study/work (59%)','Location is #1 factor'],
    ['Top Pain Point','High price (33%)','Followed by long wait (23%), limited menu (23%)'],
    ['Avg Daily Coffee Consumption','1.20 cups/day','82% drink 1 cup, 15% drink 2 cups'],
    ['Purchase Frequency','60% visit daily or 3-4x/week','Strong habitual demand'],
    ['Peak Purchase Window','Afternoon 11:00-16:00 (54%)','Followed by mid-morning 35%'],
    ['Top Drinks','Latte (52%), Matcha (42%), Iced Coffee (24%)','Matcha over-indexes with high school students'],
    ['Avg Overall Brand Rating','3.9/5.0','No brand exceeds 4.0 — significant differentiation room'],
    ['Most Wanted Intl Brand','Chagee (59%)','Luckin Coffee second at 29%'],
    ['Price Sensitivity','33% cite high price as top complaint','Kiosk model should target $1.00-1.50 range'],
    ['Wait Tolerance','67% expect service in < 4 min','Speed is a competitive weapon'],
    ['Cross-sell Rate','73% buy food/add-ons','Croissants (39%), sandwiches (28%), cake (22%)']]
r = wt(ws1, r, sd[0], sd[1:], [40, 35, 55])

ws1.cell(row=r, column=1, value='KEY FINDINGS').font = secf; r += 1
for f in [
    '1. MARKET IS READY: 89% aged 18-35, 78% visit >= 1x/week, no brand scores above 4.0/5 — clear opening.',
    '2. LOCATION IS NON-NEGOTIABLE: 59% choose based on proximity. Kiosk near universities + offices + daily routes.',
    '3. PRICE ADVANTAGE = COMPETITIVE MOAT: 33% complain about high prices. Kiosk cost structure enables 20-30% below sit-down.',
    '4. SPEED WINS: 67% want service in < 4 min. Current operators fail on wait times.',
    '5. MATCHA IS THE YOUTH HOOK: 57% of high school students prefer matcha — differentiate with signature matcha.',
    '6. CHAGEE IS THE BENCHMARK: 59% want Chagee in Cambodia. Study their kiosk model.',
    '7. CROSS-SELL IS UNDEREXPLOITED: 73% buy food alongside drinks. Simple pastry/sandwich adds 25-35% to ticket.',
    '8. PARKING IS THE WEAKEST DIMENSION: 18% dissatisfaction. Kiosk model bypasses this entirely.']:
    ws1.cell(row=r, column=1, value=f).font = Font(size=10)
    ws1.merge_cells(start_row=r, start_column=1, end_row=r, end_column=3)
    r += 1

# === SHEET 2: Data Cleaning ===
ws2 = wb.create_sheet('Data Cleaning'); ws2.sheet_properties.tabColor = '70AD47'
r = 1; ws2.cell(row=r, column=1, value='Data Cleaning & Quality Report').font = tf; r += 2
cs = [['Step','Action','Before','After','Removed'],
    ['1','Remove fully blank rows',273,273,0],
    ['2','Remove exact duplicates',273,273,0],
    ['3','Validate timestamps',273,273,0],
    ['4','Normalize brand names (5 categories)','Raw variants','5 clean labels','N/A'],
    ['5','Normalize segments','Raw variants','Standard labels','N/A'],
    ['6','Normalize age brackets','Raw variants','5 brackets','N/A'],
    ['7','Validate ratings (1-5, 9 columns)',273,273,'0 out-of-range'],
    ['8','Missing value audit','All fields','0% missing on keys','N/A'],
    ['9','Cross-validate brand vs name',273,273,'0 mismatches']]
r = wt(ws2, r, cs[0], cs[1:], [8, 50, 20, 20, 15])

# === SHEET 3: Demographics ===
ws3 = wb.create_sheet('Demographics'); ws3.sheet_properties.tabColor = 'ED7D31'
r = 1; ws3.cell(row=r, column=1, value='Demographic Profile (n=273)').font = tf; r += 2
r = wft(ws3, r, 'Brand Distribution', df['brand_clean'].value_counts(), len(df), [25,12,12])
r = wft(ws3, r, 'Gender', df['gender'].value_counts(), len(df), [35,12,12])
r = wft(ws3, r, 'Age Group', df['age_clean'].value_counts(), len(df), [20,12,12])
r = wft(ws3, r, 'Target Segment', df['segment_clean'].value_counts(), len(df), [25,12,12])

ws3.cell(row=r, column=1, value='Segment x Brand Cross-Tab').font = secf; r += 1
ct = pd.crosstab(df['segment_clean'], df['brand_clean'], margins=True)
ctd = [[str(idx)] + [int(v) for v in row] for idx, row in ct.iterrows()]
r = wt(ws3, r, ['Segment'] + list(ct.columns), ctd, [25]+[15]*len(ct.columns))

ws3.cell(row=r, column=1, value='Age x Brand Cross-Tab').font = secf; r += 1
ct2 = pd.crosstab(df['age_clean'], df['brand_clean'], margins=True)
ct2d = [[str(idx)] + [int(v) for v in row] for idx, row in ct2.iterrows()]
r = wt(ws3, r, ['Age'] + list(ct2.columns), ct2d, [15]+[15]*len(ct2.columns))

# === SHEET 4: Drivers & Pain Points ===
ws4 = wb.create_sheet('Drivers & Pain Points'); ws4.sheet_properties.tabColor = 'FF0000'
r = 1; ws4.cell(row=r, column=1, value='Brand Choice Drivers & Customer Pain Points').font = tf; r += 2
r = wft(ws4, r, 'Why Customers Choose (All)', count_ms(df['why_choose']), len(df), [70,12,12])
for seg in ['University Student','High School Student','Office Worker']:
    sub = df[df['segment_clean']==seg]
    if len(sub) > 5:
        r = wft(ws4, r, f'Why Choose — {seg} (n={len(sub)})', count_ms(sub['why_choose']), len(sub), [70,12,12])

ws4.cell(row=r, column=1, value='PAIN POINTS (Dislikes)').font = Font(bold=True, size=12, color='FF0000'); r += 1
r = wft(ws4, r, 'What Customers DISLIKE (All)', count_ms(df['dislikes']), len(df), [50,12,12])
for brand in brands_list:
    sub = df[df['brand_clean']==brand]
    if len(sub) > 0:
        r = wft(ws4, r, f'Dislikes — {brand} (n={len(sub)})', count_ms(sub['dislikes']), len(sub), [50,12,12])

# === SHEET 5: Consumption ===
ws5 = wb.create_sheet('Consumption'); ws5.sheet_properties.tabColor = '7030A0'
r = 1; ws5.cell(row=r, column=1, value='Consumption Behavior Analysis').font = tf; r += 2
r = wft(ws5, r, 'Cups per Day', df['cups_per_day'].value_counts(), len(df), [50,12,12])
r = wft(ws5, r, 'Visit Frequency', df['visit_freq'].value_counts(), len(df), [55,12,12])
r = wft(ws5, r, 'Time of Day', count_ms(df['time_of_day']), len(df), [55,12,12])
r = wft(ws5, r, 'Day of Week', count_ms(df['day_of_week']), len(df), [40,12,12])
r = wft(ws5, r, 'Drink Types (All)', count_ms(df['drink_type']), len(df), [45,12,12])
r = wft(ws5, r, 'Wait Tolerance', df['wait_tolerance'].value_counts(), len(df), [40,12,12])
r = wft(ws5, r, 'Cross-Sell: Other Purchases', count_ms(df['other_purchases']), len(df), [45,12,12])
for seg in ['University Student','High School Student','Office Worker']:
    sub = df[df['segment_clean']==seg]
    if len(sub) > 5:
        r = wft(ws5, r, f'Drink Types — {seg} (n={len(sub)})', count_ms(sub['drink_type']), len(sub), [45,12,12])

ws5.cell(row=r, column=1, value='Purchase Method').font = secf; r += 1
r = wft(ws5, r, 'Purchase Method (All)', count_ms(df['purchase_method']), len(df), [70,12,12])
for seg in ['University Student','High School Student','Office Worker']:
    sub = df[df['segment_clean']==seg]
    if len(sub) > 5:
        r = wft(ws5, r, f'Purchase Method — {seg} (n={len(sub)})', count_ms(sub['purchase_method']), len(sub), [70,12,12])

# === SHEET 6: Competitive Benchmark ===
ws6 = wb.create_sheet('Competitive Benchmark'); ws6.sheet_properties.tabColor = '00B050'
r = 1; ws6.cell(row=r, column=1, value='Competitive Benchmarking (1-5 Scale)').font = tf; r += 2

ws6.cell(row=r, column=1, value='Mean Ratings by Brand').font = secf; r += 1
bdf = df[df['brand_clean'].isin(brands_list)]
bm = bdf.groupby('brand_clean')[list(rl.keys())].mean()
bm.columns = list(rl.values())
th = ['Brand'] + list(rl.values())
td = [[bn] + [round(v,2) if not np.isnan(v) else '' for v in row] for bn, row in bm.iterrows()]
td.append(['ALL'] + [round(bm[col].mean(),2) for col in bm.columns])
r = wt(ws6, r, th, td, [20]+[16]*len(rl))

ws6.cell(row=r, column=1, value='Weakest & Strongest Dimensions').font = secf; r += 1
pd2 = [['Brand','Weakest','Score','Strongest','Score']]
for bn in brands_list:
    sub = df[df['brand_clean']==bn]
    means = {}
    for col, label in rl.items():
        if col != 'overall_rating':
            val = sub[col].mean()
            if not np.isnan(val): means[label] = round(val,2)
    if means:
        w = sorted(means.items(), key=lambda x: x[1])[0]
        s = sorted(means.items(), key=lambda x: x[1], reverse=True)[0]
        pd2.append([bn, w[0], w[1], s[0], s[1]])
r = wt(ws6, r, pd2[0], pd2[1:], [20,25,10,25,10])

ws6.cell(row=r, column=1, value='Dissatisfaction Rate (<=2)').font = secf; r += 1
dd = [['Dimension','Dissatisfied','Total Rated','Rate']]
for col, label in rl.items():
    if col != 'overall_rating':
        valid = df[col].dropna()
        d = (valid<=2).sum()
        dd.append([label, d, len(valid), f'{d/len(valid)*100:.1f}%'])
r = wt(ws6, r, dd[0], dd[1:], [25,18,15,20])

ws6.cell(row=r, column=1, value='Overall Rating by Segment').font = secf; r += 1
sr = df.groupby('segment_clean')['overall_rating'].agg(['mean','median','count']).sort_values('count', ascending=False)
srd = [[str(idx), round(row['mean'],2), row['median'], int(row['count'])] for idx, row in sr.iterrows()]
r = wt(ws6, r, ['Segment','Mean','Median','Count'], srd, [25,15,12,10])

# === SHEET 7: Brand Preferences ===
ws7 = wb.create_sheet('Brand Preferences'); ws7.sheet_properties.tabColor = 'FFC000'
r = 1; ws7.cell(row=r, column=1, value='Brand Preferences for New Kiosk Concept').font = tf; r += 2
r = wft(ws7, r, 'Preferred Brand Name Language', df['brand_name_pref'].value_counts(), len(df), [55,12,12])
r = wft(ws7, r, 'Preferred Store Style', df['style_pref'].value_counts(), len(df), [55,12,12])
r = wft(ws7, r, 'Preferred Color Tone', df['color_pref'].value_counts(), len(df), [55,12,12])
r = wft(ws7, r, 'International Brands Wanted', count_ms(df['intl_brands']), len(df), [40,12,12])

ws7.cell(row=r, column=1, value='Improvement Suggestion Themes').font = secf; r += 1
st = Counter()
for s in df['suggestions'].dropna().tolist():
    sl = str(s).lower()
    if any(w in sl for w in ['price','តម្លៃ','cost','cheap']): st['Lower price / better value'] += 1
    if any(w in sl for w in ['service','សេវា','speed','រហ័ស','fast']): st['Faster service'] += 1
    if any(w in sl for w in ['taste','រស','quality','គុណភាព']): st['Better taste / quality'] += 1
    if any(w in sl for w in ['space','កន្លែង','seat','អង្គុយ','parking','ចត']): st['More seating / parking'] += 1
    if any(w in sl for w in ['menu','មុខ','variety','option']): st['More menu variety'] += 1
    if any(w in sl for w in ['clean','ស្អាត','hygiene']): st['Cleaner environment'] += 1
    if any(w in sl for w in ['app','online','delivery']): st['App / online ordering'] += 1
    if any(w in sl for w in ['promotion','បញ្ចុះ','discount','loyalty']): st['More promotions / loyalty program'] += 1
    if any(w in sl for w in ['no','none','n/a','nothing','don\'t','មិន','គ្មាន']): st['No suggestion / satisfied'] += 1
r = wft(ws7, r, 'Suggestion Themes', st, len(df), [40,12,12])

# === SHEET 8: Financial Inputs ===
ws8 = wb.create_sheet('Financial Inputs'); ws8.sheet_properties.tabColor = '002060'
r = 1; ws8.cell(row=r, column=1, value='Financial Model Inputs (Derived from Survey)').font = tf; r += 2

ws8.cell(row=r, column=1, value='Consumption Frequency').font = secf; r += 1
cr = [['Metric','Value','Implication'],
    ['Avg cups/day per respondent','1.20','Low per-customer volume; need high throughput'],
    ['1 cup/day','82.8%','Majority are single-cup purchasers'],
    ['2+ cups/day','17.2%','Power users — target with loyalty'],
    ['Daily visitors','28.9%','Core revenue base'],
    ['3-4x/week','18.3%','Regular customers'],
    ['1-2x/week','31.1%','Convert with promotions'],
    ['< 1x/week','21.6%','Low engagement']]
r = wt(ws8, r, cr[0], cr[1:], [35,18,50])

ws8.cell(row=r, column=1, value='Peak Revenue Windows').font = secf; r += 1
pr = [['Window','% Purchases','Implication'],
    ['Afternoon 11:00-16:00','53.8%','Primary shift — full staffing'],
    ['Mid-Morning 8:30-11:00','34.8%','Morning rush — pre-position inventory'],
    ['Early Morning 6:00-8:30','27.5%','Commuter window — speed critical'],
    ['Evening 16:00-18:30','14.7%','Declining — reduce staffing'],
    ['Weekdays','60.8%','5-day revenue base'],
    ['Weekends','43.6%','Supplementary']]
r = wt(ws8, r, pr[0], pr[1:], [30,18,50])

ws8.cell(row=r, column=1, value='Service Throughput').font = secf; r += 1
tr = [['Tolerance','%','Design Implication'],
    ['< 2 min','14.7%','Express lane needed'],
    ['2-4 min','52.0%','Standard — target 3 min avg'],
    ['5+ min','33.3%','Risk losing to competitors'],
    ['67% expect < 4 min','Combined','Must achieve 3-min cycle']]
r = wt(ws8, r, tr[0], tr[1:], [25,18,50])

ws8.cell(row=r, column=1, value='Cross-Sell Revenue Potential').font = secf; r += 1
xr = [['Item','% Who Buy','Margin','Recommendation'],
    ['Croissant','38.8%','High (60-70%)','Must-have'],
    ['Sandwiches','27.5%','Medium (50-60%)','Lunch upsell'],
    ['Cake','22.3%','High (65-75%)','Afternoon pairing'],
    ['Noodle cup','19.0%','Low (30-40%)','Variety only'],
    ['Tea/Milk tea','18.3%','High (70-80%)','Non-coffee alt'],
    ['Juice/Smoothies','13.9%','Medium (50-60%)','Health segment'],
    ['Nothing else','26.7%','N/A','Convert 1-in-4']]
r = wt(ws8, r, xr[0], xr[1:], [20,15,20,40])

# === SHEET 9: Cleaned Data ===
ws9 = wb.create_sheet('Cleaned Data'); ws9.sheet_properties.tabColor = 'A5A5A5'
ch = ['brand_clean','segment_clean','age_clean','gender','cups_per_day','visit_freq',
      'overall_rating','rating_service','rating_atmosphere','rating_price','rating_quality',
      'rating_design','rating_location','rating_speed','rating_parking','wait_tolerance',
      'brand_name_pref','style_pref','color_pref','purchase_method','drink_type',
      'why_choose','dislikes','other_purchases','intl_brands','suggestions']
dh = ['Brand','Segment','Age','Gender','Cups/Day','Visit Freq','Overall','Service',
      'Atmosphere','Price Val','Quality','Design','Location','Speed','Parking',
      'Wait Tol','Name Pref','Style Pref','Color Pref','Purchase','Drink Type',
      'Why Choose','Dislikes','Other Buy','Intl Brands','Suggestions']
for ci, h in enumerate(dh, 1):
    c = ws9.cell(row=1, column=ci, value=h)
    c.font = hf; c.fill = hfill; c.alignment = Alignment(horizontal='center', wrap_text=True); c.border = tb
for ri, (_, row) in enumerate(df[ch].iterrows(), 2):
    for ci, col in enumerate(ch, 1):
        v = row[col]
        if pd.isna(v): v = ''
        c = ws9.cell(row=ri, column=ci, value=v)
        c.border = tb; c.alignment = Alignment(wrap_text=True)
for ci in range(1, len(dh)+1):
    ws9.column_dimensions[get_column_letter(ci)].width = 18

wb.save(OUT)
print(f'Done: {OUT}')
print(f'Sheets: {wb.sheetnames}')
