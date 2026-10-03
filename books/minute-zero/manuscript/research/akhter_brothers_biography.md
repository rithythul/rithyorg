# Twins Research Findings: Muneeb and Sohaib Akhter

## Biographical Background
- **Age**: Both 34 years old at time of February 2025 breach
- **Residence**: Lived together in Virginia
- **Education**: Graduated from George Mason University (class of ~2014, based on 2014 NBC article describing them as 19 at time)
- **Criminal History**:
  - 2015: Pleaded guilty in Virginia to wire fraud and conspiring to hack into the State Department
  - Offenses committed while they were contractors for federal agencies
  - Sentences: Muneeb - 3 years prison, Sohaib - 2 years prison
  - After release, worked their way back into tech sector
- **Employment History**:
  - 2023: Muneeb hired by Opexus (Washington, DC firm serving 45+ federal clients)
  - ~2024: Sohaib hired by same company (Opexus) one year after brother
  - Opexus provides services and hosts data for >45 federal agencies
  - Background checks conducted but allegedly missed criminal history red flags
  - Employer reportedly learned of brothers' past crimes in February 2025
- **Termination**:
  - February 18, 2025: Both called into Microsoft Teams meeting and fired
  - Meeting concluded at approximately 4:50 PM
  - Lived together, likely commuted/worked together daily

## The Breach Timeline (February 18, 2025)
- **4:50 PM**: Termination via Teams meeting concludes
- **4:55 PM**: Sohaib attempts to access former employer network - finds VPN and Windows account terminated
- **4:50-4:55 PM window**: Muneeb's account oversight discovered (credentials remained active)
- **4:56 PM**: Muneeb accesses US government database maintained by Opexus
- **4:58 PM**: Executes "DROP DATABASE dhsproddb" - deletes DHS production database
- **4:59 PM**: Submits AI query: "How do i clear system logs from SQL servers after deleting databases?"
  - Followed by: "How do you clear all event and application logs from Microsoft windows server 2012?"
- **4:50-5:52 PM (62-minute window)**: 
  - Deletes ~96 federal government databases
  - Downloads 1,805 EEOC complaint files to USB drive
  - Exfiltrates federal tax information for ≥450 individuals
- **5:52 PM**: Deletion sequence concludes

## Brother Dynamics During Breach
- Maintained running communication (text/IM/in person) during attack
- **Sohaib's remarks** (per court indictment/recordings):
  - "I see you cleaning out their database backups"
  - "Alright—if you have good plausible deniability" (as casualty list grew)
  - "they’re gonna probably raid this place"
  - "We also gotta clean stuff up from the other house, man"
  - "Delete their filesystem as well?"
- **Muneeb's remarks**:
  - "Til clean this shit up" (response to raid comment)
  - "Eh, they can recover from yesterday" (referring to daily backups)
  - "Smart idea" (response to filesystem deletion suggestion)
  - Noted an acquaintance would "have some work to do" when destruction revealed

## Motivations & Human Drama
- **Retaliation Theory**: Opexus claims breach occurred "in retaliation" for termination
  - Fired minutes before allegedly launching digital assault
- **Technical Pride/Challenge**: 
  - Muneeb's history of building credential-checking scripts (marriott_checker.py etc.)
  - History of successful unauthorized logins to commercial sites (DocuSign, airlines)
  - Pattern of testing boundaries and exploiting oversights
- **Frustration with System**:
  - Prior 2015 conviction shows history of challenging federal systems
  - Possible resentment from legal consequences despite technical skill
- **Twin Bond Amplification**:
  - Lived together, worked together, shared criminal history
  - Mutual encouragement and shared dark humor during act
  - Sohaib's active participation despite his own account being terminated
  - Collaboration suggests shared decision-making, not unilateral action
- **Psychological Factors**:
  - Muneeb's apparent cavalier attitude ("they can recover")
  - Focus on "plausible deniability" and cleanup suggests awareness of wrongdoing
  - Reference to "other house" implies domestic/life impact considerations
- **Employer Failures**:
  - Opexus admits multiple mistakes in hiring and termination
  - Failed to learn of criminal history despite background checks
  - Termination process failed to immediately deactivate Muneeb's credentials
  - Post-breach: Enhanced screening to 10-year checks, additional safeguards

## Employer Context: Opexus
- Washington, DC-based contractor
- Services/data hosting for >45 federal agencies
- Background checks described as "consistent with prevailing government and industry standards"
- Post-incident enhancements: 
  - Expanded background checks to 10 years
  - Additional safeguards embedded in hiring process
  - Accountability: Individuals responsible for hiring twins no longer employed
  - Supported customers in data restoration and internal reviews

## Legal Proceedings
- Arrested December 3, 2025 in Alexandria, VA
- Charges include: conspiracy to commit computer fraud, destruction of records, theft of government records, aggravated identity theft
- Indictment dated November 13, 2025
- Alleged motive: harm to US government and former employer

## Key Themes for Narrative
1. **The Oversight**: How one active credential enabled catastrophe
2. **The Bond**: Twin collaboration as force multiplier
3. **The History**: Pattern of challenging systems dating to 2015
4. **The Conversation**: Dark humor and mutual encouragement during act
5. **The Aftermath**: Cleanup suggestions, concern for colleagues, domestic implications
6. **The System**: Contractor-state vulnerabilities enabling insider threat
7. **The Motive**: Blend of retaliation, technical challenge, and systemic frustration