import openpyxl
from openpyxl.styles import Font, Alignment, Border, Side

wb = openpyxl.Workbook()

# Sheet 1: Costing Price Breakdown
ws1 = wb.active
ws1.title = "Costing Price Breakdown"

data = [
    ["Project:", "CDP-LMS Tenant System"],
    ["Total Budget:", 20000],
    [],
    ["Entity", "Scope of Work", "Amount (USD)", "% of Total"],
    ["KOOMPI Co., Ltd.", "Full System Development, Configuration, Dashboard Programming, Technical Documentation", 15000, 0.75],
    ["DIT Team", "Training Workshops, Pilot Coaching, User Guidelines Development", 3000, 0.15],
    ["Contingency/Admin", "Project Management, Miscellaneous Admin Costs", 2000, 0.10],
    ["Total", "", 20000, 1.00]
]

for row in data:
    ws1.append(row)

# Styling Sheet 1
ws1['B2'].number_format = '"$"#,##0.00'
ws1['C5:C8'].number_format = '"$"#,##0.00'
ws1['D5:D8'].number_format = '0%'
for col in ['A', 'B', 'C', 'D']:
    ws1.column_dimensions[col].width = 25

# Sheet 2: Internal Scope of Work (SOW)
ws2 = wb.create_sheet(title="Internal SOW - KOOMPI vs DIT")
sow_headers = ["Task Area", "Description", "Responsible Entity", "Deliverable Reference"]
ws2.append(sow_headers)

sow_data = [
    ["System Architecture", "Design architecture, work plan, and tenant config approach", "KOOMPI", "Deliverable 1"],
    ["Tenant Configuration", "Configure 3 sub-domains, admin rights, and access control", "KOOMPI", "Deliverable 2"],
    ["Dashboard Dev", "TEI-level and Central Dashboards programming and validation", "KOOMPI", "Deliverable 3"],
    ["Testing & Docs", "System optimization, SOPs, and technical documentation", "KOOMPI", "Deliverable 4"],
    ["Capacity Building", "Hands-on training workshop for TEI administrators", "DIT Team", "Deliverable 5"],
    ["Coaching", "Remote technical coaching during pilot phase", "DIT Team", "Deliverable 5"],
    ["User Guidelines", "Produce tenant admin and dashboard user guides", "DIT Team", "Deliverable 5"],
    ["Handover", "Final report and system handover to MoEYS", "Joint", "Deliverable 5"]
]

for row in sow_data:
    ws2.append(row)

for col in ['A', 'B', 'C', 'D']:
    ws2.column_dimensions[col].width = 30

wb.save("/home/KOOMPI/.openclaw/nimmit/CDP-LMS_Costing_and_SOW.xlsx")
