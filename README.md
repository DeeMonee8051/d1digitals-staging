# D1 Digitals — staging site

A static staging build of the D1 Digitals site. The legal and business name remains **D1 Digitals LLC**. “Daniel's Corner by D1 Digitals” is a memorial label under the homepage heading only.

This folder is meant to be published on a public staging URL (GitHub Pages). It must not be pointed at d1digitals.com until Daniel approves a domain switch. Do not change production DNS or the live Manus project from this work.

## Photo credits and named slots

All photographs currently on the site are royalty-free stock (Pexels License), downloaded and compressed as WebP. They are calm memorial scenes. None of them depict, or should be read as depicting, Daniel or his son. Unsplash HTML downloads were blocked by a bot-check on this machine, so Pexels CDN originals were used instead.

Daniel can replace any file in `assets/img/` with a chosen photograph of the same name (or update the `src` on the matching `data-slot` figure). Keep alt text descriptive and do not imply the subject is family.

| Slot (`data-slot`) | Current file | Photographer | Source | Alt / scene |
| --- | --- | --- | --- | --- |
| `slot-hero` (homepage hero, right) | `assets/img/slot-hero-stock.webp` | hissetmehurriyeti | https://www.pexels.com/photo/close-up-of-a-lantern-with-a-burning-candle-inside-8519193/ | Lit candle in an open metal lantern on a windowsill |
| `slot-shop` | `assets/img/slot-shop-stock.webp` | Brett Sayles | https://www.pexels.com/photo/candle-burning-in-glass-lamp-8339540/ | Glass lantern with a single flame on a dark ground |
| `slot-guides` | `assets/img/slot-guides-stock.webp` | Mike Murray | https://www.pexels.com/photo/notebook-with-empty-pages-lying-on-table-5594348/ | Open blank notebook with a ribbon bookmark |
| `slot-path` (Our story block on the homepage) | `assets/img/slot-path-stock.webp` | Agnes Pellion | https://www.pexels.com/photo/empty-bench-in-green-forest-in-nature-5661873/ | Empty wooden bench on a leaf-covered forest path |
| `slot-story` (Our story page) | `assets/img/slot-story-stock.webp` | Tim Dusenberry | https://www.pexels.com/photo/wooden-bench-on-a-path-in-forest-20876234/ | Empty bench at a bend in a quiet wooded path |

License: [Pexels License](https://www.pexels.com/license/) (free to use; photographer and source URL are credited here as requested).

## Shop checkout URLs

Buttons use the live Stripe Payment Links extracted from the current d1digitals.com shop bundle and verified HTTP 200 on 27 November 2026 (America/Los_Angeles):

- Memory Well ($12): https://buy.stripe.com/7sY5kDgC162Z6Ikbkp4c80b
- I'm Still His Father… ($14): https://buy.stripe.com/cNi5kD3PfgHDgiUgEJ4c80h
- I'm Still His Dad: The Complete Book ($19): https://buy.stripe.com/4gM14n1H7dvr6IkgEJ4c80n
- Father's Pair ($24): https://buy.stripe.com/00wfZh4Tjajf4AcewB4c80o
- Complete Set ($34): https://buy.stripe.com/cNifZh1H7ajf2s41JP4c80i

The live site’s “Buy now” buttons currently navigate to `/null`. These Payment Links are the working checkout URLs.

## Email list (MailerLite)

Homepage and footer forms POST to the existing MailerLite embedded form “D1 Website Signups”:

- Form ID: `205075135578768908`
- Group ID: `205075130603275294`
- Public endpoint: `https://assets.mailerlite.com/jsonp/2786436/forms/205075135578768908/subscribe`

The form accepted validation requests from this machine. In the MailerLite dashboard the form still shows as inactive, without designed content, and **double opt-in is off**. Before treating the list as production-ready, Daniel should:

1. Open https://dashboard.mailerlite.com/forms/205075135578768908/overview
2. Add a simple form layout if the dashboard requires one
3. Turn the form on
4. Enable **double opt-in** in the form or account settings

No campaigns should be sent from this work. A subscriber test could not be completed here because the agent inbox is off and no test address was provided; do not invent one.

## Contact form

The contact page posts to [FormSubmit](https://formsubmit.co) at `https://formsubmit.co/hello@d1digitals.com` (AJAX, with a `mailto:hello@d1digitals.com` fallback).

**Activation step:** FormSubmit sends a one-time confirmation email to hello@d1digitals.com the first time the form is used. Open that message and click the confirmation link. Until that happens, submissions may not be delivered, and the page will point people to the mailto address.

## What this staging site already does

- Tagline, palette, typography, 988 crisis block (footer of every page, plus a line near the contact form; not in the header)
- Inline SVG line icons in money green `#85BB65`
- Working mobile menu, client-side search, visible labels, required markers, and validation
- Shop buttons to live Stripe Checkout
- MailerLite and FormSubmit wiring as described above

## Domain-switch steps (do not do these until Daniel approves)

This repo must not receive a `CNAME` for d1digitals.com, and production DNS / Manus must not be changed from this staging work.

When Daniel is ready to point the domain at this build (or an approved copy of it):

1. Read through the privacy policy and confirm MailerLite double opt-in, the FormSubmit activation, and any analytics.
2. Decide the host: GitHub Pages, or copy these files into the existing Manus project.
3. If using GitHub Pages: in the repo’s Pages settings, add the custom domain `d1digitals.com` (and `www` if used). GitHub will ask for DNS records, typically:
   - Apex `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (and the current GitHub Pages AAAA records if IPv6 is used)
   - `www` `CNAME` to `deemonee8051.github.io` (or the Pages hostname shown in the repo settings)
   - A `CNAME` file in the repo with `d1digitals.com`, only at cutover
4. After DNS is updated, confirm HTTPS in the Pages settings.
5. Keep or retire the Manus project once the new host is verified (do not delete it before the new site is confirmed).
6. Remove the staging banner and the `noindex` robots meta if this build becomes the public site.

## Local preview

Serve the folder as a static site (for example `python3 -m http.server`) and open `index.html`.
