# D1 Digitals staging — pass/fail checklist

Reviewed 27 November 2026, America/Los_Angeles. Layout draft only; not published.

## Trust

| Item | Result | Notes |
|---|---|---|
| Testimonials are real and verified, or omitted | **Pass** | No testimonials section. Live site says reflections are still being collected; no customer quotes on d1digitals.com. Gumroad connector returned one unpublished product (“I'm Still His Father...”), 0 sales, and no reviews/ratings. Nothing was invented. |
| About-the-founder uses only live published text | **Pass** | Our Story uses wording from the live homepage “Why D1 exists” block, the live Privacy Policy opening, the Bakersfield eyebrow on the live homepage, and the live Terms “I'm a grieving father, not a therapist...” sentence. Live `/our-story` returns 404; the homepage `#about` block was used instead. No new facts about Daniel’s son. No crime/case/court/lawsuit content. |
| Credentials/affiliations only if found | **Pass** | None found on the live site except the published statement that he is not a therapist, doctor, or counselor. No clinical credentials are claimed. A plain “not therapy or emergency care” note is kept. |
| Privacy policy in the footer of every page | **Pass** | `privacy-policy.html` is linked from every footer. It covers MailerLite signup, the contact form handler, Stripe/Gumroad checkout, and analytics/logs, and names D1 Digitals LLC and hello@d1digitals.com. **Needs Daniel’s read-through** before any domain swap (analytics tool is not yet confirmed). |
| 988 large bottom block on every page; out of the header | **Pass** | Exact text: “If you're in crisis, call or text 988 (US).” Large band is the last block after the footer on every page. Removed from the top utility/header. Contact page also has that line beside the form. Homepage mid-page 988 lines were removed so the homepage block appears only at the bottom. |

## Ease of use

| Item | Result | Notes |
|---|---|---|
| Main menu three items max; Contact is the header button | **Pass** | Nav is Start here, Shop, Our story. Contact is the persistent primary button in the header on every page, including mobile. |
| One clear primary CTA per page, above the fold | **Pass** | Home: “Visit the shop.” Shop: “See Memory Well.” Our story and contact: “Write to Daniel” / “Send message.” Start here and Free guides (trimmed aliases) point to the merged guides section, with shop as the secondary action. |
| Forms: labels, required markers, instant validation, success/error | **Pass** | Visible labels, “(required)” markers, blur/input validation, invalid field styles, and a success/error note. Forms remain non-functional placeholders and do not send data. |
| Each page has one clear purpose; overlapping pages merged/trimmed | **Pass** | Free guides were merged onto the Start here homepage (`index.html#free-guides`). `free-guides.html` and `start-here.html` are short pointers, not a second full beginning. Shop, Our story, Contact, and Privacy each have a single purpose. |

## Palette and contrast

| Item | Result | Notes |
|---|---|---|
| Approved palette via CSS variables | **Pass** | Background `#FAF7F0`, surfaces `#FFFFFF`, sage `#EEF4EA`, ink `#1F2A24`, secondary `#5B6660`, primary `#2E6E68` (hover `#265F5A`), accent `#85BB65` for icons/borders/focus only, gold `#8C6A2E` for highlights, footer `#1F2A24` with cream text. |
| Dark green slabs/tiles replaced with light cards | **Pass** | Shortcut tiles, info cards, and path cards are white/cream/sage with money-green borders or rules — no dark-green fills for those blocks. Footer remains dark charcoal by design. |
| Forest green `#2F6B3F` fully replaced by teal-sage `#2E6E68` | **Pass** | Primary buttons and links use `#2E6E68`; hover/active `#265F5A`. Money green `#85BB65` is not used as text on light backgrounds. |
| Text contrast AA for body text | **Pass** | See ratios below. Money green as body text would fail (2.13:1) and is not used that way. Gold `#8C6A2E` on cream is 4.71:1, which meets AA for large/italic highlights; it is used only for the short “with care, Daniel” line and italic highlights, not long body copy. |

## Contrast ratios (computed)

| Pair | Foreground | Background | Ratio | AA normal | AA large |
|---|---|---|---:|:---:|:---:|
| Body/headings on cream | `#1F2A24` | `#FAF7F0` | 13.87:1 | Pass | Pass |
| Secondary text on cream | `#5B6660` | `#FAF7F0` | 5.59:1 | Pass | Pass |
| Teal-sage on cream (links) | `#2E6E68` | `#FAF7F0` | 5.53:1 | Pass | Pass |
| White on teal-sage (buttons) | `#FFFFFF` | `#2E6E68` | 5.92:1 | Pass | Pass |
| White on hover #265F5A | `#FFFFFF` | `#265F5A` | 7.32:1 | Pass | Pass |
| Ink on money green fill | `#1F2A24` | `#85BB65` | 6.57:1 | Pass | Pass |
| Money green as text on cream (do not use) | `#85BB65` | `#FAF7F0` | 2.11:1 | Fail | Fail |
| Gold tagline on cream | `#8C6A2E` | `#FAF7F0` | 4.66:1 | Pass | Pass |
| Cream text on footer ink | `#FAF7F0` | `#1F2A24` | 13.87:1 | Pass | Pass |
| Slate on sage sections | `#5B6660` | `#EEF4EA` | 5.34:1 | Pass | Pass |
| Ink on white cards | `#1F2A24` | `#FFFFFF` | 14.84:1 | Pass | Pass |
| Ink on sage | `#1F2A24` | `#EEF4EA` | 13.26:1 | Pass | Pass |
| Error #8B2E2E on cream | `#8B2E2E` | `#FAF7F0` | 7.76:1 | Pass | Pass |
