#!/usr/bin/env python3
import os
from datetime import datetime

# Configuration
BASE_DIR = "/home/KOOMPI/.openclaw/nimmit"
TOPICS_DIR = os.path.join(BASE_DIR, "topics")
TODAY = datetime.now().strftime("%Y-%m-%d")
OUTPUT_FILE = os.path.join(BASE_DIR, "MEMORY.md")

def summarize():
    report = f"\n## {TODAY} - Cross-Department Summary\n\n"
    found_any = False
    
    # 10 departments
    departments = [
        "general", "ops", "growth", "engineering", "devops", 
        "product", "design", "research", "biz", "community"
    ]
    
    for dept in departments:
        memory_path = os.path.join(TOPICS_DIR, dept, "memory", f"{TODAY}.md")
        if os.path.exists(memory_path):
            with open(memory_path, 'r') as f:
                content = f.read().strip()
                if content:
                    report += f"### #{dept}\n{content}\n\n"
                    found_any = True
    
    if found_any:
        with open(OUTPUT_FILE, 'a') as f:
            f.write(report)
        print(f"Summary for {TODAY} appended to {OUTPUT_FILE}")
    else:
        print(f"No memory found for {TODAY}")

if __name__ == "__main__":
    summarize()
