# MathSkills

## Numeracy Diagnostic Probe (Form A)

A self-contained, browser-only instrument that administers an informal,
criterion-referenced probe of the cognitive domains implicated in dyscalculia and math
learning differences, then compiles a printable qualitative diagnostic profile.

**Live site:** https://krystalguzman.github.io/MathSkills/

### Layout

| Path | Role |
|------|------|
| `numeracy-probe.html` | Source of record. Authored as an Artifact body fragment — opens with `<title>`, a font `<link>` and one `<style>` block, no document scaffolding, because the Artifact host supplies `<!doctype>`, `<head>` and `<body>` at publish time. |
| `build.mjs` | Wraps that fragment in a real HTML document. `node build.mjs` writes `index.html`; `node build.mjs site` stages `site/` for CI. |
| `index.html` | Generated. Do not hand-edit — change `numeracy-probe.html` and rebuild. |
| `.github/workflows/pages.yml` | CI. Rebuilds from source and fails if `index.html` is stale; does not deploy. |

One source file therefore serves both targets. The only run-time difference is how the
report is saved: inside the Artifact viewer the sandbox blocks page-initiated downloads,
so the host's `downloads` capability performs the save; served as an ordinary web page the
same buttons use an object-URL download directly. The page detects which is available and
hides the buttons if neither is. Print-to-PDF and copy-as-text work everywhere.

### Deploying

Pages is set to **Deploy from a branch**, so GitHub's own `pages-build-deployment` run
publishes the committed `index.html` at the repository root on every push to the default
branch — no deploy step of our own, and no second deployer racing it. CI verifies rather
than deploys: it rebuilds from source and fails if the committed `index.html` is stale, so
rebuild and commit it alongside any change to `numeracy-probe.html`. Switching the Pages
source to *GitHub Actions* would require adding a deploy job; the workflow file says what
that needs.

### What it does

**Designed to be taken alone.** There is no examiner, proctor, or observer role anywhere in
it — a child opens it and works through it unsupervised. The start screen asks three things:
what to call you, your birthday, and your year or grade. Nothing clinical, nothing an adult
has to fill in first.

Note the honest limit: independent use assumes the questions can be read. Below roughly
age 8, or where reading is itself a difficulty, someone will still need to read them aloud,
and the briefing says so.

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

**Timing.** Each question runs in two stages, and only the first is timed:

| Stage | Timed? | What happens |
|-------|--------|--------------|
| 1 | **Yes** | The question appears, an answer is typed (or an option clicked, which commits immediately). The clock stops the instant the answer is committed. |
| 2 | No | How it was worked out, what else applied, and any written work. Untimed, and clearly labelled as such. |

Two clocks are kept per question: `latency` (question appears → answer committed) and
`think` (question appears → first keystroke or click), which excludes typing, since typing
speed is motor output rather than arithmetic. Fact automaticity is judged on `think`. Time
with the browser tab hidden is subtracted from both, and the question is flagged as
interrupted so its timing can be treated as soft.

This matters more than it sounds. Before this split the clock ran until the whole question
form was submitted, so it swept in strategy selection and note-taking — several seconds
against a fact-automaticity threshold of three. Records carry a `timing` schema version, and
the comparison view refuses to read latency across the two, rather than reporting a
difference that is an artefact of the change.

**Self-report.** After answering, the learner says how they worked it out and ticks anything
else that applies — read it more than once, lost my place, hard to hold the numbers, wasn't
sure it was right, that felt easy, felt worried or rushed, or picked the wrong one by
accident. Each flag is tied to a construct the probe already measures, so it feeds the
report rather than decorating it: re-reading points at comprehension load, losing your place
and juggling numbers at working memory, unwarranted confidence at a missing estimate, and
worry at the anxiety that consumes the same working memory the arithmetic needs.

**Administration.** Twelve questions, one per screen, no feedback of any kind until the end.

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

### Practice mode

A separate tab, deliberately unlike the assessment: untimed, unscored, unlimited items, with
immediate feedback and an optional worked solution on every question. Domains can be chosen
by hand or auto-selected from what the last report flagged.

Walk-throughs teach the derivation for the numbers actually generated rather than revealing
an answer — a multiplication fact is derived from an anchor the learner already owns (nine as
ten-groups-minus-one, eight as double-double-double), subtraction across zeros is shown by
the counting-up route that sidesteps the borrow chain entirely, multi-digit multiplication
uses the box model so neither partial product can go missing, and word problems begin by
naming the number that is not needed.

**Practice and assessment are kept apart on purpose.** Practising the underlying skills
between probes is instruction working as intended. Two domains are different: the balance
scales and the word problems measure how an *unfamiliar* structure is handled, so format
familiarity can lower the load without the underlying capacity changing. Practice volume is
logged per domain and surfaced in any comparison so a gain can be read in that light.

### History and comparison

Completed administrations are kept in the browser and any two can be compared. Because each
domain carries only two or three items, one item changing hand swings that domain by 33–50
percentage points — so the comparison deliberately leads on the signals that do not move by
chance, and demotes accuracy:

1. **Strategy migration.** An answer that used to be counted and is now recalled is real
   progress and cannot be produced by luck.
2. **Response latency.** The same accuracy reached faster is consolidation an accuracy score
   cannot see.
3. **Error signatures** resolved, persisting, or newly appearing.
4. **Accuracy by domain**, explicitly labelled high-noise, with any delta traceable to a
   single item marked as such.

Differing bands between the two administrations, and practice logged in between, are both
called out as interpretation limits rather than left for the reader to notice.

### Error classification

Wrong answers are classified by the mechanism that produced them, not by the operation
involved. Each generator carries misconception signatures, so the probe distinguishes
between, among others: ones-digit dominance and decimal-length bias in magnitude
judgements; whole-number bias in fractions; midpoint reported as distance rather than
position; neighbouring-fact retrieval interference; smaller-from-larger subtraction;
regrouping not carried across a zero; partial products left incomplete or unshifted;
quotient zeros omitted; the intermediate value reported as final; extraneous
quantities harvested from word-problem text; and answers landing far outside any plausible
range, which indicates a missing estimate rather than a slip inside a sound procedure.
Scaffolds in the report are matched to the signatures actually observed.

Every classifier is verified reachable by a sweep over all generators; a branch that can
never fire would mean the report could never name that misconception.

### Limitations

Not a normed test and not a diagnosis. It yields no standard scores, percentiles, or
age/grade equivalents and cannot establish eligibility for services. It reproduces no
published item; item construction draws on principles from the Feifer Assessment of
Mathematics, WIAT-4 Numerical Operations and Math Problem Solving, WJ-IV Math Facts
Fluency, the Butterworth Dyscalculia Screener, and the WISC-V Figure Weights paradigm.

### Privacy

Everything runs in the browser. Examinee data is never transmitted; an in-progress
administration is held in `localStorage` on that device only — along with completed
administrations and the practice log — and leaves it solely when the examiner prints,
downloads, or copies a report. Clearing history removes both, and cannot be undone.
