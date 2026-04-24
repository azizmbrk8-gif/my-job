# Installed Claude Code Skills

Summary of skills installed under `~/.claude/skills/` (and 10 agents under `~/.claude/agents/`).

Two skill packs were installed:

1. **claude-ads** (AgriciDaniel/claude-ads) — 20 skills + 10 agents for paid advertising audits and creative generation
2. **marketingskills** (coreyhaines31/marketingskills) — 40 skills for general marketing, CRO, SEO, copywriting, and growth

---

## 1. claude-ads — Paid Advertising Suite

Orchestrator + platform deep-dives + creative pipeline. Run via `/ads <command>`.

### Orchestrator

| Skill | Purpose |
|-------|---------|
| `ads` | Multi-platform paid advertising orchestrator. Routes to sub-skills and runs 250+ checks with health scoring. |

### Platform deep-dives

| Skill | Platform | Checks |
|-------|----------|--------|
| `ads-google` | Google Ads (Search, PMax, Display, YouTube, Demand Gen) | 80 |
| `ads-meta` | Meta (Facebook/Instagram, Advantage+) | 50 |
| `ads-linkedin` | LinkedIn (B2B, Lead Gen, TLA, ABM) | 27 |
| `ads-tiktok` | TikTok (Creative, Shop, Smart+) | 28 |
| `ads-microsoft` | Microsoft/Bing (Copilot, Import validation) | 24 |
| `ads-apple` | Apple Search Ads (CPPs, TAP, MMP) | 35+ |
| `ads-youtube` | YouTube (Skippable, Shorts, Demand Gen, CTV) | — |

### Audit & strategy

| Skill | Purpose |
|-------|---------|
| `ads-audit` | Full multi-platform audit with parallel subagents. Aggregate health score. |
| `ads-creative` | Cross-platform creative quality audit, fatigue detection. |
| `ads-landing` | Landing page quality for ad campaigns (message match, speed, trust). |
| `ads-budget` | Budget allocation and bidding strategy review. |
| `ads-competitor` | Competitor ad intelligence across all platforms. |
| `ads-plan` | Strategic planning with industry templates (saas, ecommerce, b2b, etc.). |
| `ads-math` | PPC financial calculator (CPA, ROAS, break-even, LTV:CAC, MER). |
| `ads-test` | A/B test design (hypothesis, significance, sample size, duration). |

### Creative pipeline (requires banana-claude for image generation)

| Skill | Purpose |
|-------|---------|
| `ads-dna` | Extract brand DNA from a URL → `brand-profile.json`. |
| `ads-create` | Campaign concepts + copy briefs → `campaign-brief.md`. |
| `ads-generate` | AI image generation for ad creatives (requires banana-claude). |
| `ads-photoshoot` | Product photography enhancement (Studio, Floating, Ingredient, In Use, Lifestyle). |

### Agents installed to `~/.claude/agents/`

- `audit-google`, `audit-meta`, `audit-creative`, `audit-tracking`, `audit-budget`, `audit-compliance` — parallel audit specialists
- `creative-strategist`, `copy-writer`, `visual-designer`, `format-adapter` — creative pipeline specialists

> Note: `/ads generate` and `/ads photoshoot` require the separate `banana-claude` skill, which is **not** installed.

---

## 2. marketingskills — General Marketing Suite

40 skills covering the full marketing stack. All other skills first read `product-marketing-context`, so **run it first** in a new project.

### Foundation

| Skill | Purpose |
|-------|---------|
| `product-marketing-context` | Creates `.agents/product-marketing-context.md` with product, audience, and positioning. Every other skill reads this first. |

### SEO & content

| Skill | Purpose |
|-------|---------|
| `seo-audit` | Technical + on-page SEO audit; diagnose ranking drops. |
| `ai-seo` | Optimize for AI search / LLM citations (AEO, GEO, LLMO). |
| `schema-markup` | JSON-LD, structured data, rich results. |
| `site-architecture` | Page hierarchy, navigation, URL structure, internal linking. |
| `programmatic-seo` | Template pages at scale (location/integration/comparison). |
| `content-strategy` | Editorial planning, topic clusters, content pillars. |
| `aso-audit` | App Store / Google Play listing optimization. |

### Conversion rate optimization (CRO)

| Skill | Focus |
|-------|-------|
| `page-cro` | Any marketing page (home, landing, pricing, features). |
| `signup-flow-cro` | Signup / registration / trial activation. |
| `onboarding-cro` | Post-signup activation, first-run experience. |
| `form-cro` | Non-signup forms (lead, contact, demo, application). |
| `popup-cro` | Popups, modals, overlays, slide-ins, banners. |
| `paywall-upgrade-cro` | In-app paywalls, upgrade screens, feature gates. |

### Copy & content

| Skill | Purpose |
|-------|---------|
| `copywriting` | Write / rewrite marketing copy for any page. |
| `copy-editing` | Edit, polish, refresh existing copy. |
| `cold-email` | B2B cold outreach and follow-up sequences. |
| `email-sequence` | Drip campaigns, lifecycle, welcome, re-engagement. |
| `social-content` | LinkedIn, X, Instagram, TikTok, Shorts/Reels scripts. |
| `video` | AI video production (Remotion, HeyGen, Veo, Runway, Kling). |
| `image` | Marketing image generation and optimization. |

### Paid & measurement

| Skill | Purpose |
|-------|---------|
| `paid-ads` | Campaign strategy, audience targeting, bidding. |
| `ad-creative` | Bulk ad copy generation and iteration. |
| `ab-test-setup` | Experiment design and growth experimentation programs. |
| `analytics-tracking` | GA4, GTM, event tracking, attribution. |

### Growth & retention

| Skill | Purpose |
|-------|---------|
| `referral-program` | Referral, affiliate, word-of-mouth, viral loops. |
| `free-tool-strategy` | Engineering-as-marketing, calculators, graders. |
| `churn-prevention` | Cancellation flows, save offers, dunning, win-back. |
| `community-marketing` | Discord/Slack communities, brand advocates, ambassadors. |
| `lead-magnets` | Gated content, ebooks, checklists, templates. |

### Sales & GTM

| Skill | Purpose |
|-------|---------|
| `revops` | Revenue ops, lead scoring, MQL/SQL handoff, CRM automation. |
| `sales-enablement` | Pitch decks, one-pagers, objection handling, demo scripts. |
| `launch-strategy` | Product/feature launches, Product Hunt, GTM plans. |
| `pricing-strategy` | Pricing, packaging, freemium, Van Westendorp. |
| `competitor-alternatives` | `[Product] vs X`, alternative pages, battle cards. |
| `competitor-profiling` | Research and profile competitors from URLs. |
| `directory-submissions` | Product Hunt, BetaList, G2, AI/MCP directories. |

### Strategy & research

| Skill | Purpose |
|-------|---------|
| `marketing-ideas` | Brainstorm growth ideas for SaaS/software. |
| `marketing-psychology` | Behavioral science, cognitive biases, persuasion. |
| `customer-research` | ICP, interviews, JTBD, review mining, VOC analysis. |

---

## Typical workflows

**Paid ads, new account:**
1. `/ads audit` — full multi-platform audit with health score
2. `/ads plan <business-type>` — strategic plan
3. `/ads dna` → `/ads create` → `/ads generate` — creative pipeline

**New marketing project:**
1. `product-marketing-context` — foundational context
2. `customer-research` — understand the ICP
3. `copywriting` / `page-cro` — build and optimize pages
4. `analytics-tracking` + `ab-test-setup` — measure and iterate

**Launch:**
1. `launch-strategy` — plan the launch
2. `directory-submissions` — backlinks and discovery
3. `social-content` + `email-sequence` — announcement and nurture

---

## Locations

- Skills: `~/.claude/skills/`
- Agents: `~/.claude/agents/`
- Python scripts (ads): `~/.claude/skills/ads/scripts/`
- Reference files (ads): `~/.claude/skills/ads/references/` (25 files)

## Uninstall

- **claude-ads**: `curl -fsSL https://raw.githubusercontent.com/AgriciDaniel/claude-ads/main/uninstall.sh | bash`
- **marketingskills**: manually `rm -rf` each directory under `~/.claude/skills/` (40 skills, no shared uninstaller)
