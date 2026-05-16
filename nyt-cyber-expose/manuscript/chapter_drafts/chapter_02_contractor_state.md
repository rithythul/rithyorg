# Chapter Two: The Contractor State

Muneeb and Sohaib Akhter deleted ninety-six U.S. government databases in fifty-six minutes. They used credentials that should have been revoked upon termination. To understand how this happened, we must first grasp the political economy that shaped their access: the federal contractor state. This is not a story of individual malfeasance alone. Outsourcing federal information technology created structural blind spots where accountability evaporates at the exact moment it is most needed.

The Akhter brothers succeeded because they were brilliant hackers. More importantly, they exploited a system engineered to prioritize continuous operations over immediate security responses. In this system, the party holding access had no incentive to revoke it quickly. The party paying for that access had no practical way to verify whether it had been revoked.

The roots of this architecture trace back to the Clinger-Cohen Act of 1996. Formally known as the Information Technology Management Reform Act, it passed amid Y2K anxieties. A growing consensus held that federal information technology was bloated, inefficient, and technologically obsolete. The Act sought to bring private-sector discipline to government technology management.

Its central innovation was the designation of Chief Information Officers at major agencies. It also mandated measuring information technology performance using quantitative metrics derived from the private sector. Clinger-Cohen did not merely suggest that agencies consider outsourcing. It created a bureaucratic framework that made outsourcing not just attractive but often obligatory for agencies seeking to demonstrate reform compliance.

According to a Government Accountability Office report on Federal IT Acquisition and Management, by the early 2000s outsourcing had shifted from an experimental cost-saving tactic to the dominant model for federal IT service delivery. Agencies no longer maintained large in-house teams of developers and system administrators. Instead, they awarded multi-year, often multi-hundred-million-dollar contracts to private firms. Companies like Leidos, SAIC, CGI Federal, and Accenture won these contracts.

These contractors designed, built, operated, and secured the networks, databases, and applications that underpin everything from veterans’ benefits to tax processing to national security intelligence. The logic was straightforward: private companies could deliver IT services more efficiently and at lower cost than the federal workforce. This advantage was especially clear when scaling expertise up or down with mission demands.

What received less attention in policy discourse was what happened to accountability when the wires connecting service delivery to consequence were cut. According to a Freedom of Information Act report on USASpending.gov contractor records, the critical shift occurred in how performance was measured and rewarded.

Under the legacy federal workforce model, accountability for a security failure was relatively direct. The system administrator who failed to patch a vulnerability could face disciplinary action. The supervisor who ignored an escalation path could also face action, up to and including termination. Their employment was tied to the agency, and their performance evaluations included adherence to security protocols.

Under the contractor model, especially those based on firm-fixed-price or time-and-materials agreements, the incentive structure inverted. Contractors were paid to keep systems running, to close tickets, and to meet service-level agreements that measured uptime, response time, and user satisfaction. These agreements did not measure the speed of intrusion detection or the rigor of access revocation.

A contractor whose monitoring system flagged a potential insider threat faced a dilemma. Escalating the alert risked triggering a costly incident review that could breach service-level agreement uptime guarantees. Downplaying the anomaly kept the metrics green. The structure rewarded the latter choice.

According to an Office of Inspector General report on contractor oversight gap findings, this dynamic was codified in the very contracts governing relationships like the one between Opexus and its federal agency clients. Any event causing service degradation beyond a certain threshold triggered a response. A typical federal IT service-level agreement might guarantee “99.9% monthly uptime” and define a “critical incident”.

Buried in the fine print, however, were often weaker provisions for security monitoring. Perhaps a requirement to “maintain antivirus signatures” or “conduct quarterly vulnerability scans”. Rarely did contracts mandate real-time user behavior analytics or automated privileged access termination. 

The financial penalties for missing uptime targets were immediate and quantifiable. The consequences of a missed security service-level agreement were speculative, long-term, and difficult to attribute to a specific contractor failure. Even when such clauses existed, they were frequently unenforced.

In essence, the contract paid for the illusion of security while measuring only the reality of availability. According to a Congressional report on relevant IT oversight hearings, the problem was compounded by the subcontractor cascade endemic to federal IT contracting. 

A prime contractor awarded a five-hundred-million-dollar agency-wide IT operations contract might subcontract thirty percent of that work to regional specialists. Those specialists might in turn outsource niche functions like help desk tiering or database administration to local firms. 

By the time the work reached the individual turning wrenches—or, in the Akhters’ case, running Structured Query Language queries—four or five layers of contractual separation could exist between the federal agency paying the bill and the employee with actual keyboard access.

Each layer added its own markup, its own reporting requirements, and its own incentive to obscure problems that might reflect poorly on its performance. Audits of subcontractor performance by the prime were rare. Agency-level audits of the entire chain were rarer still.

The result was a system where no single entity had full visibility into who had access to what. No entity had a strong financial incentive to find out. According to a Government Accountability Office report on Federal IT Acquisition and Management, consider the statistics that make this structural blindness not just possible but probable.

According to Government Accountability Office reports from the mid-2010s, approximately seventy-five percent of federal IT spending went to contracts for services, operations, and maintenance. This meant that three out of every four dollars spent on keeping federal networks running flowed to private companies rather than federal employees. 

In specific high-impact areas like database administration and network engineering, the contractor share often exceeded eighty-five percent. Consequently, the individuals with the highest levels of privileged access—database administrators who could issue DROP DATABASE commands, network engineers who could reconfigure firewalls, system administrators who could manage Active Directory—were far more likely to be contractor badge holders than federal civil servants.

Yet the personnel vetting, monitoring, and offboarding protocols that governed those contractor employees were not federal rules. They were the private policies of the companies employing them, subject only to the limited oversight written into their contracts.

According to a Freedom of Information Act report on Internal Revenue Service IT modernization contracts, nowhere was this misalignment more starkly illustrated than in the case of background checks. This point becomes crucial when examining how the Akhters slipped through Opexus’s hiring filters despite prior federal convictions.

For many federal contractor positions, particularly those involving IT systems, the standard background investigation looks back only seven years. This limit is not arbitrary. It stems from a combination of Fair Credit Reporting Act restrictions on reporting older negative information and the practical reality that state criminal repositories often purge or seal records after a certain period. 

For a contractor employee whose role requires access to federal databases, a seven-year lookback means that any conviction older than that window is effectively invisible to the employer unless the employee volunteers the information. Few do.

In the Akhters’ case, their 2015 guilty pleas to hacking State Department systems and stealing personal data fell just outside this window when they were hired by Opexus in 2023. A contractor conducting a seven-year check in early 2024 would see a clean record. 

The federal convictions that should have raised red flags were, by design, not part of the calculation. According to a Public Access to Court Electronic Records report on 2015 guilty plea records from the Eastern District of Virginia, this gap between what the federal government assumes about its contractors and what contractors actually know about their employees is not a loophole. It is a feature of the outsourced model.

Agencies rely on contractors to perform due diligence, but contractors balance that duty against the cost and delay of extensive investigations. The deeper the check, the longer the hiring process, the higher the expense, and the less competitive the bid. 

In a procurement environment where contracts are often awarded to the lowest technically acceptable offer, there is strong pressure to minimize vetting to the bare legal minimum. The result is a system where agencies contract out not just labor but also the responsibility for knowing who that labor is, yet retain ultimate liability for what that labor does with the access granted.

According to an Office of Inspector General report on contractor oversight gap findings, the offboarding process reveals the same inversion of incentives. When a federal employee is terminated, their access is typically revoked within minutes through automated systems tied to human resources workflows. This is a direct consequence of the employer being the agency itself.

When a contractor employee is terminated, the process depends entirely on the contractor’s internal policies and the speed with which their human resources or security team processes the termination notice. 

Even if the contractor’s service-level agreement with the federal agency promises “immediate” account deactivation—a term often left undefined—the financial consequence of missing that target is frequently negligible compared to the penalty for failing uptime guarantees. 

A contractor might lose a few service credits for a delayed deactivation. They risk far more if their monitoring system flags an anomaly that leads to a network-wide outage during peak hours. 

As an administrative afterthought, not a security imperative, the structure encourages a mindset where access revocation is seen as low priority. According to a Freedom of Information Act report on Opexus offboarding SLA account deactivation requirements, this was precisely the failure that enabled the Akhter operation.

On February 18, 2025, Muneeb Akhter attended a remote termination meeting via Microsoft Teams. At its conclusion, around 4:50 to 4:55 p.m., his employment with Opexus ended. 

According to standard federal contracting norms and the National Institute of Standards and Technology Special Publication 800-53 control Access Control 2-3, which requires “automatic disabling” of accounts when employment terminates, his access to federal systems should have been revoked within fifteen minutes. 

Instead, his credentials remained active for nearly an hour. This was long enough to delete ninety-six databases, exfiltrate thousands of sensitive files, and initiate a cover-up that would delay detection for months. 

As urgent as the situation was, the party paying for the service—the federal agency—had no practical way to verify in real time whether the revocation had been done. 

The breakdown was not a momentary lapse in vigilance. It was the predictable outcome of a system where the party responsible for access revocation—the contractor—had no financial reason to treat it as urgent.

According to a National Institute of Standards and Technology report on SP 800-53 AC-2(3) automated account management, the structural implications extend far beyond a single terminated account. 

Treating offboarding as a discretionary process rather than an automated security function means that every contractor employee who leaves a federal IT position—whether voluntarily, for cause, or at the end of a contract—represents a potential window of unauthorized access. 

The scale is staggering because the threat originates from within the trusted session itself. With tens of thousands of contractor personnel cycling through federal IT roles each year, the aggregate exposure represents a persistent low-grade risk of insider threat. No amount of perimeter hardening or multi-factor authentication can fully mitigate this risk. 

The Akhters did not need to steal credentials or exploit a zero-day vulnerability. They simply used the ones they were given at a moment when the system assumed they should no longer have them and no one was checking to verify that assumption. 

According to a Government Accountability Office report on federal contractor monitoring adequacy, closing this gap requires re-engineering the incentives that govern federal IT outsourcing. 

One approach would be to tie contractor payments more directly to security outcomes. For example, withhold a portion of fees until independent auditors confirm that access revocation timelines meet federal standards. Another would be to impose liquidated damages for delayed deactivation that match the financial weight of uptime service-level agreements. 

A second approach would be to mandate real-time sharing of access logs between contractors and agencies, enabling continuous verification that only active employees retain privileges. 

A third approach would be to bring certain high-risk functions like privileged access management and security monitoring back in-house or under hybrid models where federal employees retain oversight authority even. 

None of these solutions are free or simple. Each would require rewriting contracts, retraining personnel, and accepting trade-offs between cost, speed, and security. 

As the Akhter case demonstrates, the current model already carries a cost. This cost is measured in deleted databases, exfiltrated personal records, and the erosion of public trust in the government’s ability to protect its most sensitive information. 

But, according to a Congressional report on Chief Information Officer council testimony on IT modernization, the contractor state was not built to fail. It was built to succeed at a different problem: delivering IT services at scale and at predictable cost. 

In doing so, it created a set of secondary effects: liability externalization, accountability diffusion, and incentive misalignment. When combined with human malfeasance, these effects produce vulnerabilities like the one exploited in February 2025. 

Recognizing that the architecture itself is the root cause is the first step toward designing a system where the door does not remain open long enough for a determined actor to walk through it. And, if they do, the alarm sounds before they reach the database.