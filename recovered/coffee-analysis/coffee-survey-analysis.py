#!/usr/bin/env python3
"""
Multi-Kiosk Coffee Feasibility Study — Primary Survey Data Analysis
Data: 273 respondents (Consolidate sheet), Phnom Penh, March 2026
Analyzes: Onnik (15), Mr. Dad (22), Cyclo (15), Mobile (50), Others (171)
"""

import openpyxl
import pandas as pd
import numpy as np
from collections import Counter
import json
import re
import os

# ─── LOAD DATA ───────────────────────────────────────────────
SRC = '/home/KOOMPI/.openclaw/media/inbound/Clean_Coffee_Customer_Survey_2026.03.25_Responses---219b0a7e-67ac-48f7-9691-b7793879d06f.xlsx'
OUT_DIR = '/home/KOOMPI/.openclaw/nimmit/coffee-analysis-output'
os.makedirs(OUT_DIR, exist_ok=True)

wb = openpyxl.load_workbook(SRC, data_only=True)
ws = wb['Consolidate']

# Extract headers and data
headers = [cell.value for cell in ws[1]]
raw = []
for row in ws.iter_rows(min_row=2, max_row=ws.max_row, values_only=True):
    raw.append(list(row))

df = pd.DataFrame(raw, columns=headers)

# ─── SHORT COLUMN NAMES ──────────────────────────────────────
col_map = {
    headers[0]:  'timestamp',
    headers[1]:  'brand',
    headers[2]:  'branch',
    headers[3]:  'why_choose',
    headers[4]:  'dislikes',
    headers[5]:  'purchase_method',
    headers[6]:  'drink_type',
    headers[7]:  'cups_per_day',
    headers[8]:  'visit_freq',
    headers[9]:  'time_of_day',
    headers[10]: 'day_of_week',
    headers[11]: 'rating_service',
    headers[12]: 'rating_atmosphere',
    headers[13]: 'rating_price',
    headers[14]: 'rating_quality',
    headers[15]: 'rating_design',
    headers[16]: 'rating_location',
    headers[17]: 'rating_speed',
    headers[18]: 'rating_parking',
    headers[19]: 'overall_rating',
    headers[20]: 'suggestions',
    headers[21]: 'wait_tolerance',
    headers[22]: 'other_purchases',
    headers[23]: 'brand_name_pref',
    headers[24]: 'style_pref',
    headers[25]: 'color_pref',
    headers[26]: 'intl_brands',
    headers[27]: 'gender',
    headers[28]: 'age',
    headers[29]: 'segment',
    headers[30]: 'brand_name_raw',
}
df.rename(columns=col_map, inplace=True)

# ─── SECTION 0: DATA CLEANING ────────────────────────────────
print("=" * 70)
print("SECTION 0: DATA CLEANING & QUALITY REPORT")
print("=" * 70)

initial_count = len(df)
print(f"\nInitial records: {initial_count}")

# 0a. Remove completely blank rows
blank_mask = df.drop(columns=['timestamp']).isnull().all(axis=1)
blank_count = blank_mask.sum()
df = df[~blank_mask]
print(f"Removed {blank_count} fully blank rows → {len(df)} records")

# 0b. Duplicate detection (by timestamp + brand + segment)
dup_mask = df.duplicated(subset=['timestamp', 'brand', 'segment'], keep='first')
dup_count = dup_mask.sum()
df = df[~dup_mask]
print(f"Removed {dup_count} exact duplicates → {len(df)} records")

# 0c. Timestamp consistency check
valid_ts = pd.to_numeric(df['timestamp'], errors='coerce').notna()
invalid_ts = valid_ts.sum() == len(df)
print(f"Timestamps valid (Excel serial): {invalid_ts} ({(~valid_ts).sum()} invalid)")

# 0d. Normalize brand names
def normalize_brand(b):
    if pd.isna(b):
        return 'Unknown'
    b = str(b).strip()
    if 'onnik' in b.lower():
        return 'Onnik Coffee'
    elif 'mr' in b.lower() or 'dad' in b.lower() or 'ឪ' in b:
        return 'Mr. Dad Coffee'
    elif 'cyclo' in b.lower():
        return 'Cyclo Café'
    elif 'mobile' in b.lower():
        return 'Mobile Coffee'
    elif 'other' in b.lower():
        return 'Others'
    return b

df['brand_clean'] = df['brand'].apply(normalize_brand)

# 0e. Normalize segment (target group)
def normalize_segment(s):
    if pd.isna(s):
        return 'Unspecified'
    s = str(s).strip()
    if 'និស្សិតសាកល' in s or 'university' in s.lower():
        return 'University Student'
    elif 'សិស្សវិទ្យាល័យ' in s or 'high school' in s.lower():
        return 'High School Student'
    elif 'បុគ្គលិកការិយាល័យ' in s or 'office' in s.lower():
        return 'Office Worker'
    elif 'មន្ត្រីរាជការ' in s or 'civil' in s.lower():
        return 'Civil Officer'
    elif 'ម្ចាស់' in s or 'owner' in s.lower() or 'បុគ្គលិកសង្គម' in s:
        return 'Business Owner'
    elif 'អ្នក' in s and 'ស្រុក' in s:
        return 'Freelancer'
    elif 'គ្រូ' in s or 'teacher' in s.lower():
        return 'Teacher'
    elif 'ក្រោម ១៨' in s or 'under 18' in s.lower():
        return 'Under 18'
    return s

df['segment_clean'] = df['segment'].apply(normalize_segment)

# 0f. Normalize age
def normalize_age(a):
    if pd.isna(a):
        return 'Unspecified'
    a = str(a).strip()
    if 'ក្រោម' in a or 'under' in a.lower():
        return 'Under 18'
    elif '18' in a and '25' in a:
        return '18-25'
    elif '26' in a and '35' in a:
        return '26-35'
    elif '36' in a and '45' in a:
        return '36-45'
    elif '46' in a:
        return '46+'
    return a

df['age_clean'] = df['age'].apply(normalize_age)

# 0g. Validate rating columns (should be 1-5)
rating_cols = ['rating_service', 'rating_atmosphere', 'rating_price', 'rating_quality',
               'rating_design', 'rating_location', 'rating_speed', 'rating_parking', 'overall_rating']
for col in rating_cols:
    if col in df.columns:
        before = len(df)
        df[col] = pd.to_numeric(df[col], errors='coerce')
        invalid = df[col].notna() & ((df[col] < 1) | (df[col] > 5))
        print(f"  {col}: {invalid.sum()} out-of-range values → set to NaN")
        df.loc[invalid, col] = np.nan

# 0h. Check missing values
print(f"\n--- Missing Value Summary ---")
for col in ['brand_clean', 'segment_clean', 'age_clean', 'gender', 'cups_per_day', 'visit_freq', 'overall_rating']:
    missing = df[col].isna().sum()
    pct = missing / len(df) * 100
    print(f"  {col}: {missing} ({pct:.1f}%)")

# 0i. Cross-validation: brand vs brand_name_raw
mismatch = 0
for _, row in df.iterrows():
    raw_name = str(row.get('brand_name_raw', '')).strip()
    if raw_name and raw_name not in ['N/A', 'nan', 'None', '']:
        brand = row['brand_clean']
        if brand == 'Others' and raw_name:
            pass  # Others have various names — expected
        elif brand != 'Others' and raw_name:
            if brand.lower().replace(' ', '') not in raw_name.lower().replace(' ', '') and raw_name.lower().replace(' ', '') not in brand.lower().replace(' ', ''):
                mismatch += 1

print(f"\nBrand ↔ brand_name_raw mismatches: {mismatch}")

final_count = len(df)
print(f"\n{'='*50}")
print(f"CLEANING SUMMARY: {initial_count} → {final_count} records (removed {initial_count - final_count})")
print(f"{'='*50}")

# ─── HELPER: Parse multi-select fields (comma-separated) ────
def parse_multiselect(val):
    """Split comma-separated multi-select responses and return list of trimmed items."""
    if pd.isna(val):
        return []
    items = [v.strip() for v in str(val).split(',')]
    return [i for i in items if i and i not in ['nan', 'None', 'N/A', '']]

def count_multiselect(series):
    """Count frequency of each option across all multi-select responses."""
    counter = Counter()
    for val in series.dropna():
        for item in parse_multiselect(val):
            counter[item] += 1
    return counter

# ─── SECTION 1: MARKET ASSESSMENT ────────────────────────────
print("\n" + "=" * 70)
print("SECTION 1: CUSTOMER & MARKET ASSESSMENT")
print("=" * 70)

# 1.1 Brand Distribution
print("\n--- 1.1 Brand Distribution ---")
brand_counts = df['brand_clean'].value_counts()
for brand, count in brand_counts.items():
    pct = count / len(df) * 100
    print(f"  {brand}: {count} ({pct:.1f}%)")

# 1.2 Demographics
print("\n--- 1.2 Demographics ---")
print("\nGender:")
gender_counts = df['gender'].value_counts()
for g, c in gender_counts.items():
    print(f"  {g}: {c} ({c/len(df)*100:.1f}%)")

print("\nAge Group:")
age_counts = df['age_clean'].value_counts()
for a, c in age_counts.items():
    print(f"  {a}: {c} ({c/len(df)*100:.1f}%)")

print("\nTarget Segment:")
seg_counts = df['segment_clean'].value_counts()
for s, c in seg_counts.items():
    print(f"  {s}: {c} ({c/len(df)*100:.1f}%)")

# 1.3 Cross-tab: Segment × Brand
print("\n--- 1.3 Segment × Brand Cross-Tab ---")
ct_seg_brand = pd.crosstab(df['segment_clean'], df['brand_clean'], margins=True)
print(ct_seg_brand.to_string())

# 1.4 Cross-tab: Age × Brand
print("\n--- 1.4 Age × Brand Cross-Tab ---")
ct_age_brand = pd.crosstab(df['age_clean'], df['brand_clean'], margins=True)
print(ct_age_brand.to_string())

# 1.5 Why Choose (Location & Brand Drivers)
print("\n--- 1.5 Why Choose This Brand/Location (Top 15) ---")
why_counts = count_multiselect(df['why_choose'])
for item, count in why_counts.most_common(15):
    print(f"  {item}: {count} ({count/len(df)*100:.1f}%)")

# 1.6 Why Choose by Segment
print("\n--- 1.6 Why Choose by Target Segment ---")
for seg in ['University Student', 'High School Student', 'Office Worker', 'Civil Officer']:
    subset = df[df['segment_clean'] == seg]
    if len(subset) > 5:
        print(f"\n  [{seg}] (n={len(subset)}):")
        why_seg = count_multiselect(subset['why_choose'])
        for item, count in why_seg.most_common(5):
            print(f"    {item}: {count} ({count/len(subset)*100:.1f}%)")

# 1.7 Dislikes / Pain Points
print("\n--- 1.7 What Customers DISLIKE (Pain Points) ---")
dislike_counts = count_multiselect(df['dislikes'])
for item, count in dislike_counts.most_common(15):
    print(f"  {item}: {count} ({count/len(df)*100:.1f}%)")

# 1.8 Dislikes by Brand
print("\n--- 1.8 Dislikes by Brand ---")
for brand in ['Onnik Coffee', 'Mr. Dad Coffee', 'Cyclo Café', 'Mobile Coffee']:
    subset = df[df['brand_clean'] == brand]
    if len(subset) > 0:
        print(f"\n  [{brand}] (n={len(subset)}):")
        d = count_multiselect(subset['dislikes'])
        for item, count in d.most_common(5):
            print(f"    {item}: {count} ({count/len(subset)*100:.1f}%)")

# 1.9 Purchase Method
print("\n--- 1.9 Purchase Method ---")
pm_counts = count_multiselect(df['purchase_method'])
for item, count in pm_counts.most_common(10):
    print(f"  {item}: {count} ({count/len(df)*100:.1f}%)")

# 1.10 Purchase Method by Segment
print("\n--- 1.10 Purchase Method by Segment ---")
for seg in ['University Student', 'High School Student', 'Office Worker']:
    subset = df[df['segment_clean'] == seg]
    if len(subset) > 5:
        print(f"\n  [{seg}] (n={len(subset)}):")
        pm = count_multiselect(subset['purchase_method'])
        for item, count in pm.most_common(5):
            print(f"    {item}: {count} ({count/len(subset)*100:.1f}%)")

# ─── SECTION 2: CONSUMPTION BEHAVIOR ─────────────────────────
print("\n" + "=" * 70)
print("SECTION 2: CONSUMPTION BEHAVIOR & VALUE PROP INSIGHTS")
print("=" * 70)

# 2.1 Cups per day
print("\n--- 2.1 Cups per Day ---")
cup_counts = df['cups_per_day'].value_counts()
for cup, count in cup_counts.items():
    print(f"  {cup}: {count} ({count/len(df)*100:.1f}%)")

# 2.2 Cups per day by segment
print("\n--- 2.2 Cups per Day by Segment ---")
ct_cups_seg = pd.crosstab(df['segment_clean'], df['cups_per_day'], margins=True)
print(ct_cups_seg.to_string())

# 2.3 Visit frequency
print("\n--- 2.3 Visit Frequency ---")
freq_counts = df['visit_freq'].value_counts()
for f, count in freq_counts.items():
    print(f"  {f}: {count} ({count/len(df)*100:.1f}%)")

# 2.4 Visit frequency by segment
print("\n--- 2.4 Visit Frequency by Segment ---")
ct_freq_seg = pd.crosstab(df['segment_clean'], df['visit_freq'], margins=True)
print(ct_freq_seg.to_string())

# 2.5 Time of day
print("\n--- 2.5 Time of Day ---")
tod_counts = count_multiselect(df['time_of_day'])
for item, count in tod_counts.most_common(10):
    print(f"  {item}: {count} ({count/len(df)*100:.1f}%)")

# 2.6 Day of week
print("\n--- 2.6 Day of Week ---")
dow_counts = count_multiselect(df['day_of_week'])
for item, count in dow_counts.most_common(10):
    print(f"  {item}: {count} ({count/len(df)*100:.1f}%)")

# 2.7 Drink types
print("\n--- 2.7 Drink Types Purchased ---")
drink_counts = count_multiselect(df['drink_type'])
for item, count in drink_counts.most_common(15):
    print(f"  {item}: {count} ({count/len(df)*100:.1f}%)")

# 2.8 Drink types by segment
print("\n--- 2.8 Drink Types by Segment ---")
for seg in ['University Student', 'High School Student', 'Office Worker']:
    subset = df[df['segment_clean'] == seg]
    if len(subset) > 5:
        print(f"\n  [{seg}] (n={len(subset)}):")
        d = count_multiselect(subset['drink_type'])
        for item, count in d.most_common(5):
            print(f"    {item}: {count} ({count/len(subset)*100:.1f}%)")

# 2.9 Wait tolerance
print("\n--- 2.9 Wait Tolerance ---")
wait_counts = df['wait_tolerance'].value_counts()
for w, count in wait_counts.items():
    print(f"  {w}: {count} ({count/len(df)*100:.1f}%)")

# 2.10 Other purchases
print("\n--- 2.10 Cross-Sell: Other Purchases ---")
other_counts = count_multiselect(df['other_purchases'])
for item, count in other_counts.most_common(10):
    print(f"  {item}: {count} ({count/len(df)*100:.1f}%)")

# ─── SECTION 3: COMPETITIVE BENCHMARKING ─────────────────────
print("\n" + "=" * 70)
print("SECTION 3: COMPETITIVE BENCHMARKING (Ratings 1-5)")
print("=" * 70)

brands = ['Onnik Coffee', 'Mr. Dad Coffee', 'Cyclo Café', 'Mobile Coffee']
rating_labels = {
    'rating_service': 'Customer Service',
    'rating_atmosphere': 'Atmosphere',
    'rating_price': 'Price Value',
    'rating_quality': 'Coffee Quality',
    'rating_design': 'Design & Aesthetics',
    'rating_location': 'Location Convenience',
    'rating_speed': 'Service Speed',
    'rating_parking': 'Parking',
    'overall_rating': 'Overall Rating'
}

# 3.1 Mean ratings by brand
print("\n--- 3.1 Mean Performance Ratings by Brand ---")
brand_ratings = df[df['brand_clean'].isin(brands)].groupby('brand_clean')[list(rating_labels.keys())].mean()
brand_ratings.columns = list(rating_labels.values())
print(brand_ratings.round(2).to_string())

# 3.2 Overall rating by brand
print("\n--- 3.2 Overall Rating Distribution by Brand ---")
for brand in brands:
    subset = df[df['brand_clean'] == brand]['overall_rating'].dropna()
    if len(subset) > 0:
        print(f"  {brand}: mean={subset.mean():.2f}, median={subset.median():.1f}, n={len(subset)}")

# 3.3 Rating by segment
print("\n--- 3.3 Overall Rating by Segment ---")
seg_ratings = df.groupby('segment_clean')['overall_rating'].agg(['mean', 'median', 'count']).sort_values('count', ascending=False)
print(seg_ratings.round(2).to_string())

# 3.4 Weaknesses per brand (lowest-rated dimensions)
print("\n--- 3.4 Weakest Dimensions per Brand ---")
for brand in brands:
    subset = df[df['brand_clean'] == brand]
    means = {}
    for col, label in rating_labels.items():
        if col != 'overall_rating':
            val = subset[col].mean()
            if not np.isnan(val):
                means[label] = val
    if means:
        weakest = sorted(means.items(), key=lambda x: x[1])[:3]
        strongest = sorted(means.items(), key=lambda x: x[1], reverse=True)[:3]
        print(f"\n  {brand}:")
        print(f"    Weakest: {', '.join([f'{l} ({v:.2f})' for l, v in weakest])}")
        print(f"    Strongest: {', '.join([f'{l} ({v:.2f})' for l, v in strongest])}")

# ─── SECTION 4: BRAND PREFERENCES (for new kiosk concept) ───
print("\n" + "=" * 70)
print("SECTION 4: BRAND PREFERENCES (Value Proposition Inputs)")
print("=" * 70)

# 4.1 Brand name language
print("\n--- 4.1 Preferred Brand Name Language ---")
bn_counts = df['brand_name_pref'].value_counts()
for b, c in bn_counts.items():
    print(f"  {b}: {c} ({c/len(df)*100:.1f}%)")

# 4.2 Style preference
print("\n--- 4.2 Preferred Store Style ---")
style_counts = df['style_pref'].value_counts()
for s, c in style_counts.items():
    print(f"  {s}: {c} ({c/len(df)*100:.1f}%)")

# 4.3 Color preference
print("\n--- 4.3 Preferred Color Tone ---")
color_counts = df['color_pref'].value_counts()
for c_name, count in color_counts.items():
    print(f"  {c_name}: {count} ({count/len(df)*100:.1f}%)")

# 4.4 International brand aspirations
print("\n--- 4.4 International Brands Consumers Want in Cambodia ---")
intl_counts = count_multiselect(df['intl_brands'])
for item, count in intl_counts.most_common(10):
    print(f"  {item}: {count} ({count/len(df)*100:.1f}%)")

# 4.5 Qualitative suggestions
print("\n--- 4.5 Qualitative Improvement Suggestions (Top Themes) ---")
suggestions_raw = df['suggestions'].dropna().tolist()
# Categorize suggestions
suggestion_themes = Counter()
for s in suggestions_raw:
    s_lower = str(s).lower()
    if any(w in s_lower for w in ['price', 'តម្លៃ', 'cost', 'cheap', 'affordable']):
        suggestion_themes['Lower price / better value'] += 1
    if any(w in s_lower for w in ['service', 'សេវា', 'speed', 'រហ័ស', 'fast', 'quick']):
        suggestion_themes['Faster service'] += 1
    if any(w in s_lower for w in ['taste', 'រស', 'quality', 'គុណភាព', 'flavor']):
        suggestion_themes['Better taste / quality'] += 1
    if any(w in s_lower for w in ['space', 'កន្លែង', 'seat', 'អង្គុយ', 'sit', 'parking', 'ចត']):
        suggestion_themes['More seating / parking'] += 1
    if any(w in s_lower for w in ['menu', 'មុខ', 'variety', 'option', 'more']):
        suggestion_themes['More menu variety'] += 1
    if any(w in s_lower for w in ['clean', 'ស្អាត', 'hygiene', 'environment']):
        suggestion_themes['Cleaner environment'] += 1
    if any(w in s_lower for w in ['app', 'application', 'online', 'delivery']):
        suggestion_themes['App / online ordering'] += 1
    if any(w in s_lower for w in ['promotion', 'បញ្ចុះ', 'discount', 'loyalty']):
        suggestion_themes['More promotions / loyalty program'] += 1
    if any(w in s_lower for w in ['no', 'none', 'n/a', 'nothing', 'don\'t', 'មិន', 'គ្មាន']):
        suggestion_themes['No suggestion / satisfied'] += 1

for theme, count in suggestion_themes.most_common(10):
    print(f"  {theme}: {count}")

# ─── SECTION 5: MARKET GAPS & DEMAND DRIVERS ────────────────
print("\n" + "=" * 70)
print("SECTION 5: MARKET GAPS & DEMAND DRIVER ANALYSIS")
print("=" * 70)

# 5.1 Gap Analysis: What's missing in the market?
print("\n--- 5.1 Market Gap Indicators ---")

# Calculate dissatisfaction rate per dimension
print("\nDissatisfaction Rate (Rating ≤ 2) by Dimension:")
for col, label in rating_labels.items():
    if col != 'overall_rating':
        valid = df[col].dropna()
        dissatisfied = (valid <= 2).sum()
        rate = dissatisfied / len(valid) * 100
        print(f"  {label}: {dissatisfied}/{len(valid)} = {rate:.1f}% dissatisfied")

# 5.2 Key demand drivers by segment
print("\n--- 5.2 Top Demand Drivers by Segment ---")
for seg in ['University Student', 'High School Student', 'Office Worker', 'Civil Officer']:
    subset = df[df['segment_clean'] == seg]
    if len(subset) > 5:
        drivers = count_multiselect(subset['why_choose'])
        print(f"\n  [{seg}] (n={len(subset)}):")
        for item, count in drivers.most_common(5):
            print(f"    {item}: {count} ({count/len(subset)*100:.1f}%)")

# 5.3 Price sensitivity indicator (how many cite price as dislike)
price_dislike = 0
total_with_dislikes = 0
for val in df['dislikes'].dropna():
    items = parse_multiselect(val)
    if items:
        total_with_dislikes += 1
        if any('តម្លៃខ្ពស់' in i or 'high price' in i.lower() or 'តម្លៃ' in i for i in items):
            price_dislike += 1

print(f"\n--- 5.3 Price Sensitivity ---")
print(f"  Citing high price as dislike: {price_dislike}/{total_with_dislikes} ({price_dislike/total_with_dislikes*100:.1f}%)")

# 5.4 Convenience demand (takeaway vs sit-in)
takeaway = 0
sit_in = 0
both = 0
for val in df['purchase_method'].dropna():
    items = str(val).lower()
    if 'takeaway only' in items or 'ខ្ចប់យកទៅក្រៅតែប៉ុណ្ណោះ' in items:
        takeaway += 1
    elif 'mostly sit' in items or 'ភាគច្រើនអង្គុយ' in items:
        sit_in += 1
    elif 'mostly takeaway' in items or 'ភាគច្រើនខ្ចប់' in items:
        both += 1
    elif 'delivery' in items or 'កម្ម៉ង់តាមកម្មវិធី' in items:
        pass  # separate channel

print(f"\n--- 5.4 Purchase Mode ---")
print(f"  Takeaway only: {takeaway} ({takeaway/len(df)*100:.1f}%)")
print(f"  Sit-in mostly: {sit_in} ({sit_in/len(df)*100:.1f}%)")
print(f"  Mostly takeaway (sometimes sit): {both} ({both/len(df)*100:.1f}%)")

# ─── SECTION 6: FINANCIAL INPUTS FROM DATA ───────────────────
print("\n" + "=" * 70)
print("SECTION 6: FINANCIAL MODEL INPUTS (Derived from Survey)")
print("=" * 70)

# 6.1 Estimated daily cups per customer
print("\n--- 6.1 Consumption Frequency (Revenue Proxy) ---")
cup_mapping = {}
for val in df['cups_per_day'].dropna():
    v = str(val).strip()
    if '១' in v and 'កែវ' in v:
        cup_mapping.setdefault('1 cup', 0)
        cup_mapping['1 cup'] += 1
    elif '២' in v and 'កែវ' in v:
        cup_mapping.setdefault('2 cups', 0)
        cup_mapping['2 cups'] += 1
    elif '៣' in v:
        cup_mapping.setdefault('3+ cups', 0)
        cup_mapping['3+ cups'] += 1

total_cups = cup_mapping.get('1 cup', 0) * 1 + cup_mapping.get('2 cups', 0) * 2 + cup_mapping.get('3+ cups', 0) * 3.5
print(f"  Cups per day distribution: {dict(cup_mapping)}")
print(f"  Average cups/day per respondent: {total_cups/len(df):.2f}")

# 6.2 Visit frequency → weekly revenue potential
print("\n--- 6.2 Visit Frequency (Weekly Transactions) ---")
freq_mapping = {}
for val in df['visit_freq'].dropna():
    v = str(val).strip()
    if 'រាល់ថ្ងៃ' in v or 'everyday' in v.lower():
        freq_mapping.setdefault('Daily (~7x/week)', 0)
        freq_mapping['Daily (~7x/week)'] += 1
    elif '៥ ទៅ ៦' in v or '5-6' in v:
        freq_mapping.setdefault('5-6x/week', 0)
        freq_mapping['5-6x/week'] += 1
    elif '៣ ទៅ ៤' in v or '3-4' in v:
        freq_mapping.setdefault('3-4x/week', 0)
        freq_mapping['3-4x/week'] += 1
    elif '១ ទៅ ២' in v or '1-2' in v:
        freq_mapping.setdefault('1-2x/week', 0)
        freq_mapping['1-2x/week'] += 1
    elif 'តិចជាង' in v or 'less' in v:
        freq_mapping.setdefault('<1x/week', 0)
        freq_mapping['<1x/week'] += 1

for freq, count in sorted(freq_mapping.items(), key=lambda x: -x[1]):
    print(f"  {freq}: {count} ({count/len(df)*100:.1f}%)")

# 6.3 Willingness to wait → throughput capacity
print("\n--- 6.3 Wait Tolerance → Service Throughput ---")
wait_mapping = {}
for val in df['wait_tolerance'].dropna():
    v = str(val).strip()
    if 'តិចជាង ២' in v or 'less than 2' in v.lower():
        wait_mapping.setdefault('< 2 min', 0)
        wait_mapping['< 2 min'] += 1
    elif '២ ទៅ ៤' in v or '2-4' in v:
        wait_mapping.setdefault('2-4 min', 0)
        wait_mapping['2-4 min'] += 1
    elif '៥ នាទី' in v or '5 min' in v.lower():
        wait_mapping.setdefault('5+ min', 0)
        wait_mapping['5+ min'] += 1

for w, count in sorted(wait_mapping.items()):
    print(f"  {w}: {count} ({count/len(df)*100:.1f}%)")

# ─── SAVE CLEANED DATA ───────────────────────────────────────
print("\n" + "=" * 70)
print("EXPORTING CLEANED DATA")
print("=" * 70)

# Save cleaned CSV
csv_path = os.path.join(OUT_DIR, 'cleaned_survey_data.csv')
df.to_csv(csv_path, index=False)
print(f"Cleaned data → {csv_path}")

# Save summary statistics as JSON
summary = {
    'total_respondents': len(df),
    'cleaning_removed': initial_count - final_count,
    'brand_distribution': {k: int(v) for k, v in brand_counts.items()},
    'segment_distribution': {k: int(v) for k, v in seg_counts.items()},
    'age_distribution': {k: int(v) for k, v in age_counts.items()},
    'average_overall_rating': float(df['overall_rating'].mean()) if df['overall_rating'].notna().any() else None,
    'price_sensitivity_rate': float(price_dislike / total_with_dislikes * 100) if total_with_dislikes > 0 else None,
    'takeaway_only_rate': float(takeaway / len(df) * 100),
}

json_path = os.path.join(OUT_DIR, 'summary_statistics.json')
with open(json_path, 'w') as f:
    json.dump(summary, f, indent=2, ensure_ascii=False)
print(f"Summary stats → {json_path}")

print("\n✅ Analysis complete. All outputs saved to:", OUT_DIR)
