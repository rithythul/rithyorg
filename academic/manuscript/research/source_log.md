# Source Log — Minutes to Zero
## Primary Source Registry | Akhter Brothers Case
**Maintained by:** GYLC Spokesperson / Author
**Last updated:** 2026-05-15
**Status:** Active — case proceedings ongoing (Sohaib sentencing: 2026-09-09)
**Fidelity Status:** Per outline v2.2: Ch 1, 3, 6, 7, 8, 11 → DOCUMENTARY-PACER; Ch 9 → PARTIAL-COMPOSITE; all other chapters DOCUMENTARY. Composite limited to interiority and internal NOC workflow detail only.

---

## CASE IDENTIFICATION

| Field | Detail |
|---|---|
| **Case Name** | United States v. Muneeb Akhter and Sohaib Akhter |
| **Jurisdiction** | U.S. District Court, Eastern District of Virginia (Alexandria Division) |
| **PACER Docket** | [RETRIEVE via PACER.gov — EDVA Alexandria — search defendant name] |
| **Presiding Judge** | [TBD — confirm via PACER] |
| **Charges (Muneeb)** | Computer fraud, destruction of computer records, access device fraud, aggravated identity theft; plea April 2026 |
| **Charges (Sohaib)** | Conspiracy to commit computer fraud, password trafficking, possession of firearm by prohibited person |
| **Muneeb Status** | Guilty plea, April 2026. Maximum exposure: 45 years. Sentencing pending. |
| **Sohaib Status** | Convicted by jury, May 7, 2026. Maximum: 21 years. Sentencing: September 9, 2026. |

---

## PRIMARY DOCUMENTS — RETRIEVE VIA PACER

### Tier 1 — Essential (retrieve before drafting)

| Document | PACER Label | Chapter Relevance |
|---|---|---|
| Muneeb Akhter — Statement of Facts (April 2026 plea) | SOF / Plea Agreement Exhibit | Ch 1, 3, 6, 7, 8, 11 — minute-by-minute operational timeline |
| Superseding Indictment | Superseding Indictment | Ch 2, 3, 4, 5, 10 — structural charges and contractor context |
| Sohaib Akhter — Jury Verdict (May 7, 2026) | Verdict Form | Ch 3, 14, 16 |
| Search Warrant Return — Sohaib Alexandria residence (March 12, 2025) | SW Return | Ch 11, 16 — firearms, evidence inventory |
| Sohaib — Sentencing documents (file date: before 2026-09-09) | Sentencing Memo | Ch 15, 16 — government sentencing argument, scope of harm |

### Tier 2 — Supporting (retrieve for specific chapters)

| Document | PACER Label | Chapter Relevance |
|---|---|---|
| Muneeb — Bail/detention hearing record | Detention Hearing Transcript | Ch 11 — Texas flight context, flight risk designation |
| Muneeb — Aggravated identity theft count (Aug 2022 pre-Opexus) | Indictment Count | Ch 3 — prior pattern beyond 2015 conviction |
| Co-conspirator laptop wipe (Feb 21–22) | SOF reference / additional charges | Ch 8 — evidence destruction |
| Opexus offboarding records (subpoena return) | Subpoena Return | Ch 6, 9 — account deactivation failure timeline |

---

## OPERATIONAL TIMELINE (from Statement of Facts)

All times are Eastern. Source: Muneeb Akhter SOF, April 2026. `[AKHTER-SOF]`

| Time | Event | Chapter |
|---|---|---|
| 2015 | Muneeb and Sohaib plead guilty to hacking US State Department systems | Ch 3, 10 |
| 2015 | Muneeb sentenced 39 months; Sohaib sentenced 24 months federal prison | Ch 3 |
| 2022 (Aug) | Muneeb — separate aggravated identity theft incident (pre-Opexus) | Ch 3 |
| 2023–2024 | Both brothers hired at Opexus (formerly AINS) as engineering staff | Ch 2, 10 |
| 2025-02-01 | Muneeb asks Sohaib for plaintext password of EEOC complainant. Sohaib provides it via DB query. | Ch 4, 14 |
| 2025-02-18 | FDIC background check flags Sohaib's 2015 conviction during vetting for FDIC-OIG role | Ch 14 |
| 2025-02-18 ~16:50–16:55 | Termination meeting via Microsoft Teams ends | Ch 6, 9 |
| 2025-02-18 16:56 | Muneeb accesses first government database (account never disabled) | Ch 1, 6 |
| 2025-02-18 16:58 | `DROP DATABASE dhsproddb` — DHS database deleted | Ch 1, 7 |
| 2025-02-18 16:59 | Muneeb queries AI: "How do i clear system logs from SQL servers after deleting databases?" | Ch 8 |
| 2025-02-18 ~17:12 | Sohaib and Muneeb discuss blackmailing Opexus. Muneeb declines on evidentiary grounds. | Ch 5 |
| 2025-02-18 ~17:52 | Rampage complete. ~96 databases deleted. 1,805 EEOC files on USB drive. 450 taxpayer records exfiltrated. PIV card retained. | Ch 7, 11 |
| 2025-02-21–22 | Co-conspirator reinstalls OS on both company laptops | Ch 8 |
| 2025-02-24 | Muneeb drives to Texas with personal laptop, phone, and PIV card | Ch 11 |
| 2025-03-12 | Search warrant executed at Sohaib's Alexandria home. 7 firearms recovered. | Ch 11 |
| 2025-05 | Muneeb begins active credential-stuffing campaign using stolen credentials | Ch 4 |
| 2025-12-03 | Both brothers arrested | Ch 15 |
| 2026-04 | Muneeb guilty plea. Statement of Facts filed. | — |
| 2026-05-07 | Sohaib convicted on 3 counts by federal jury | — |
| 2026-09-09 | Sohaib sentencing scheduled | — |

---

## CONTRACTOR RECORD — OPEXUS (formerly AINS)

| Field | Detail | Source |
|---|---|---|
| Full name | Opexus (formerly AINS — Advanced Information Network Systems) | Public record |
| Location | Washington D.C. area; servers in Ashburn, Virginia | `[AKHTER-SOF]` |
| Certification | FedRAMP-certified | Company public filings |
| Client agencies | 45+ federal agencies | `[AKHTER-IND]` |
| Flagship products | FOIAXpress, eCASE suite | Company website / public record |
| Background check window | ~7 years — missed 2015 convictions | Opexus public statement |
| Opexus admission | "Additional diligence should have been applied." Hiring staff no longer employed. | Opexus public statement — verify exact quote source |
| FOIA requests to file | Opexus contract records (SAM.gov, USASpending.gov), offboarding SLA documentation | See FOIA tracking below |

---

## SECONDARY CASE PARALLEL — AWAN BROTHERS

For Chapter 16 (*The Next Pair*). Documentary standard. Source: public congressional record and court record.

| Field | Detail |
|---|---|
| Principals | Imran Awan, Abid Awan, Jamal Awan + associates (5 Pakistani-American IT workers) |
| Access duration | ~13 years of House IT network access |
| Termination trigger | Suspected unauthorized server access, procurement irregularities, possible data exfiltration |
| Criminal outcome | Imran Awan: guilty plea to one count of making false statement on loan application. Time served. |
| Civil outcome | $850,000 wrongful termination settlement to the five workers |
| Structural parallel | Contractor background check failure; extended insider access; institutional failure to audit scope of access |
| Source | Congressional record, court record, public reporting (Politico, Daily Caller) — verify primary docs |

---

## FOIA REQUEST TRACKING

| Request | Target Agency | Submitted | Status | Chapter |
|---|---|---|---|---|
| Opexus contract terms and SLA documentation | GSA / relevant contracting agency | NOT FILED | PENDING | Ch 2, 6, 9 |
| Opexus background check procedures and offboarding SLA | DHS / FDIC-OIG / agency contracting officer | NOT FILED | PENDING | Ch 10, 14 |
| FDIC-OIG background check that flagged Sohaib | FDIC via FOIA | NOT FILED | PENDING | Ch 14 |
| OIG reports on Opexus contract performance | Relevant agency OIGs | NOT FILED | PENDING | Ch 2, 9 |
| IRS TIGTA reports on IDRS contractor access controls (background) | TIGTA | NOT FILED | PENDING | Ch 4 |

---

## INTERVIEW TARGETS

| Role | Relevance | Status |
|---|---|---|
| Federal prosecutor (EDVA) | Scope of prosecution strategy, sentencing argument | NOT CONTACTED |
| Opexus former employee | Internal offboarding procedure, culture of access control | NOT CONTACTED |
| Digital forensics investigator (case-adjacent) | Technical reconstruction of database deletion sequence | NOT CONTACTED |
| Federal IT contractor (background) | Contractor NOC workflow, alert classification norms | NOT CONTACTED |
| Media attorney | Legal review of composite scenes, character identification in Ch 3 | NOT CONTACTED |
| Threat intelligence analyst | Structural prediction for Ch 16 (Next Pair) | NOT CONTACTED |

---

*Source log maintained alongside manuscript drafts. Update at each chapter draft milestone.*
*PACER documents must be retrieved and filed in `research/pacer_docs/` subdirectory as obtained.*
