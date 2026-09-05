# MathSkills

## Numeracy Diagnostic Probe (Form A)

`numeracy-probe.html` — a self-contained, browser-only instrument that administers an
informal, criterion-referenced probe of the cognitive domains implicated in dyscalculia
and math learning differences, then compiles a printable qualitative diagnostic profile.

Published as an Artifact; the file is the source of record.

### What it does

**Intake.** Captures examinee name/ID, date of birth (age at testing is computed to the
month), grade placement from Pre-K through adult/not-enrolled, examiner, setting,
language, current math placement, reason for referral, relevant history, state at time of
testing, and administration conditions (scratch paper, read-aloud, visible timer, habitual
calculator use).

**Banding.** Difficulty is banded from grade placement, falling back to chronological age:

| Band | Reference |
|------|-----------|
| 1 | Early primary, K–2 |
| 2 | Upper primary, grades 3–5 |
| 3 | Middle grades, 6–8 |
| 4 | Secondary and adult, grade 9+ |

Where grade and age imply different bands, the discrepancy is carried into the report.
Difficulty also adapts up or down within a domain as the examinee performs. Fact-retrieval
items stay at single-digit difficulty in every band by design: automaticity is expected at
all ages, so slow retrieval is the finding rather than an artifact of item difficulty.

**Administration.** Twelve items, one per screen, no feedback of any kind during testing.

| Domain | Items | Tasks |
|--------|-------|-------|
| 1. Core number sense & magnitude | 3 | Symbolic comparison, fraction/decimal magnitude, number-line midpoint |
| 2. Fact retrieval & fluency | 3 | Single-digit multiplication, subtraction across the ten, missing addend |
| 3. Procedural calculation | 2 | Regrouping across zeros, plus multi-digit multiplication or division with remainder |
| 4. Working memory & equivalence | 2 | Two- and three-relation balance-scale substitution chains |
| 5. Applied reasoning | 2 | Multi-step word problems carrying extraneous quantities |

Every item is generated algorithmically at presentation time — no static item bank, so
nothing can be memorised or coached between administrations. Response latency is captured
automatically; the examiner records the observed method (instant recall, mental reasoning,
counting, paper/device, guess, no response), free-text observations, and — on the
procedural items — a transcription of the written work.

**Report.** Executive summary, performance at a glance, domain-by-domain analysis, full
item record, error analysis, and targeted instructional scaffolds, all generated from the
recorded data. It can be printed or saved as PDF, downloaded as a standalone HTML file or
a structured JSON record, or copied as plain text.

### Error classification

Wrong answers are classified by the mechanism that produced them, not by the operation
involved. Each generator carries misconception signatures, so the probe distinguishes
between, among others: ones-digit dominance and decimal-length bias in magnitude
judgements; whole-number bias in fractions; midpoint reported as distance rather than
position; neighbouring-fact retrieval interference; smaller-from-larger subtraction;
regrouping not carried across a zero; partial products left incomplete or unshifted;
quotient zeros omitted; the intermediate value reported as final; and extraneous
quantities harvested from word-problem text. Scaffolds in the report are matched to the
signatures actually observed.

### Limitations

Not a normed test and not a diagnosis. It yields no standard scores, percentiles, or
age/grade equivalents and cannot establish eligibility for services. It reproduces no
published item; item construction draws on principles from the Feifer Assessment of
Mathematics, WIAT-4 Numerical Operations and Math Problem Solving, WJ-IV Math Facts
Fluency, the Butterworth Dyscalculia Screener, and the WISC-V Figure Weights paradigm.

### Privacy

Everything runs in the browser. Examinee data is never transmitted; an in-progress
administration is held in `localStorage` on that device only, and leaves it solely when
the examiner prints, downloads, or copies the report.
