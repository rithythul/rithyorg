# Seed Integration

Move/copy seed file into manuscript/research/;
Update source_log.md with case citations keyed to PACER docket
Ground the entire project in public record

# Report

Ex-Con Hacker Twins Fired - Proceed To Wipe Out 96 Government Databases In Minutes
Note to employers: When you discover your twin brother employees are ex-cons who did time for hacking into the US State Department, and go to fire them, make sure you fully disable their access.

February 2025, twin brothers Muneeb and Sohaib Akhter turned a routine job termination into one of the most brazen insider sabotage incidents in recent U.S. government history. Just minutes after being fired from Opexus - a Washington, D.C.-area contractor that provides critical case-management software to more than 45 federal agencies - the brothers allegedly launched a rapid digital assault that deleted approximately 96 government databases containing sensitive FOIA records, investigative files, and taxpayer data.

Muneeb and Sohaib Akhter

What made the case especially shocking was the brothers' prior history: both had served prison time for hacking federal systems a decade earlier.

A Decade-Old Criminal Record

The Akhter brothers, both 34 and from Alexandria, Virginia, had a criminal past that Opexus completely missed - which, given what they do, is not great. In 2015, while working as contractors, they pleaded guilty to conspiracy to commit wire fraud, conspiracy to access protected computers without authorization, and related charges. Their crimes involved hacking into U.S. State Department systems and a private company, stealing personal data on coworkers, acquaintances, and even a federal investigator.

Muneeb received a 39-month prison sentence; Sohaib received 24 months. Both served their time and were released.

By 2023-2024, the brothers had landed engineering roles at Opexus (formerly known as AINS), a firm specializing in FedRAMP-certified case-management platforms. Its flagship products - FOIAXpress and the eCASE suite - help agencies process Freedom of Information Act requests, audits, investigations, EEO complaints, and congressional correspondence. Opexus systems host sensitive government data on servers in Ashburn, Virginia.

The company conducted standard background checks covering roughly seven years - which missed the 2015 convictions. Opexus later admitted that "additional diligence should have been applied" and that the individuals responsible for hiring the twins are no longer with the company.

Unbeknownst to Opexus at the time of termination, the brothers had been abusing their access for weeks. Muneeb had collected approximately 5,400 usernames and passwords from the company's network and built custom scripts to test them against external sites (including Marriott and DocuSign). He successfully logged into accounts and, in some cases, used victims' airline miles.

On February 1, 2025 - more than two weeks before their firing - Muneeb asked Sohaib for the plaintext password of an individual who had filed a complaint through the EEOC Public Portal. Sohaib ran a database query and provided it; Muneeb then used the credentials to access the complainant's email without authorization. This incident later became central to Sohaib's password-trafficking charge.

The Firing and the 56-Minute Rampage

On February 18, 2025, the FDIC flagged Sohaib's prior conviction during a background check for a potential new role at the FDIC Office of Inspector General. Opexus fired both brothers during a remote Microsoft Teams/HR meeting that ended around 4:50-4:55 p.m.

The offboarding was flawed: Muneeb's account remained active. ARS Technica has the timeline:

At 4:56 pm, Muneeb accessed a US government database that his company maintained. He "issued commands to prevent other users from connecting or making changes to the database, and then issued a command to delete the database," the government said.

At 4:58 pm, he wiped out a Department of Homeland Security database using the command "DROP DATABASE dhsproddb."

At 4:59 pm, he asked an AI tool, "How do i clear system logs from SQL servers after deleting databases?" He later asked, "How do you clear all event and application logs from Microsoft windows server 2012?"

In the space of a single hour, Muneeb deleted around 96 databases with US government information. He downloaded 1,805 files belonging to the EEOC and stashed them on a USB drive, then grabbed federal tax information for at least 450 people.

The brothers discussed the attack in real time. Sohaib observed Muneeb "cleaning out their database backups." They even queried an AI tool on how to clear SQL server logs and Windows event logs. They later reinstalled the operating systems on their company laptops to destroy evidence.

And What Else Did They Do?

Based on the court documents (Superseding Indictment + Muneeb Akhter’s detailed Statement of Facts from his April 2026 plea deal), the brothers were up to quite a lot of malarkey.

Massive extra data haul (1.2 million lines): Muneeb didn’t just steal ~5,400 usernames/passwords from Opexus. He also possessed a separate file containing ~1.2 million lines of full names, email addresses, phone numbers, physical addresses, and password hashes. This was stored across his personal laptop, Android phone, external hard drive, and cloud accounts.

The credential abuse went on for 10 months after they were fired: The database deletions happened on Feb 18, 2025, but Muneeb kept actively using the stolen credentials from May 2025 all the way until his arrest on December 3, 2025. He wrote custom Python scripts (one literally named marriott_checker.py), ran credential-stuffing attacks on hotels, airlines, and banks, and successfully logged into hundreds of victims’ accounts.

Sophisticated account takeovers with his own domains: He didn’t just log in - he changed victims’ recovery email addresses on airline, hotel, and bank accounts to addresses he controlled, such as [VictimName]@wardensys.com or @wardensystems.com (domains he owned). This let him lock the real owners out and keep using the accounts.

Real-time blackmail brainstorming during the deletion rampage: At ~5:12 p.m. on Feb 18 - while Muneeb was still deleting databases - the brothers literally discussed blackmailing Opexus. Sohaib said something to the effect of: “you shoulda had a kill script, like, blackmailing them for some money…” Muneeb shot it down, replying that it would be obvious proof of guilt. They also argued about whether to contact customers.

“Clean stuff up from the other house”: During the same conversation, Sohaib said: “We also gotta clean stuff up from the other house, man.” This strongly implies they had evidence or stolen data at a second location.

Muneeb fled with a government-issued PIV card: When Muneeb drove to Texas on Feb 24, 2025, he took his personal laptop, phone, and a Personal Identity Verification (PIV) card issued by a U.S. government agency. (PIV cards are the high-security smart cards federal employees/contractors use for system access.)

Other smaller but wild nuggets

A “co-conspirator” (identity not specified in the public docs) wiped both company laptops by reinstalling the OS on Feb 21–22.
Muneeb used stolen American Airlines miles twice: 29,000 miles for a real flight he actually took (SLC → DC on Nov 29, 2025) and 14,500 miles for another ticket he booked but didn’t use.

Muneeb had a separate aggravated identity theft count from August 2022 (pre-Opexus) involving someone’s passport and personal info.
Guns too!

A federal search warrant executed at Sohaib's Alexandria home on March 12, 2025, uncovered seven firearms (including M1 and M1A rifles, a Glenfield Model 60 .22 rifle, a Ruger .22 pistol, and a Colt .38 Special revolver) plus roughly 378 rounds of .30-caliber ammunition. Under Virginia law at the time, these guns and the ammunition were fully legal for a non-prohibited person to own - no assault-weapon ban, no magazine limits, no restrictions on the specific models. The only prohibition was Sohaib's status as a convicted felon, which made possession illegal under federal law (18 U.S.C. § 922(g)).

The brothers were arrested on December 3, 2025. Muneeb ultimately pleaded guilty to major charges, including computer fraud and destruction of records. Sohaib went to trial.

On May 7, 2026, a federal jury in Alexandria convicted Sohaib Akhter on three counts: conspiracy to commit computer fraud, password trafficking, and possession of a firearm by a prohibited person. He faces a maximum of 21 years in prison and is scheduled for sentencing on September 9, 2026. Muneeb faces additional charges and potential penalties up to 45 years.

Remember when House Democrats let the Awan Brothers go hog wild in their network for 13 years, were fired for suspected unauthorized server access, procurement irregularities, and possible data exfiltration, and were one of them was able to plead guilty to one count of making a false statement on a loan application and sentenced to time served - only to then receive an $850,000 wrongful termination settlement by the five Pakistani-American tech workers involved in the saga?
