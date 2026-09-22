<img width="100" height="100" alt="unnamed (7 1)" src="https://github.com/user-attachments/assets/48113539-8454-4047-80ad-e0ea604adbff" />

<img width="100" height="100" alt="unnamed (13)" src="https://github.com/user-attachments/assets/53114be2-7b6d-47f0-92a7-af3985a028d0" />

<h1>
   Prostate Care | Aotearoa
</h1>

![Astro](https://img.shields.io/badge/AstroJS-%232C2052.svg?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Azure AI Foundry](https://img.shields.io/badge/Azure_AI_Foundry-0078D4.svg?style=for-the-badge&logo=azure&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Design Thinking](https://img.shields.io/badge/Design_Thinking-%231F67CC.svg?style=for-the-badge&logo=adobexd&logoColor=white)

> BCDE311 - Software Development Project
>
> A user-focused website remake for Prostate Cancer NZ, as part of the **BCDE311 - Software Development Project** course. `Prostate Care | Aotearoa`, formerly BlueprintNZ, is an informational and resource platform designed to support individuals affected by prostate cancer in New Zealand. The site aims to provide reliable guidance, raise awareness, and connect users with helpful resources and support networks.
This project demonstrates full-stack development using modern web technologies, accessibility best practices, and responsive design principles.

[![Live Demo](https://img.shields.io/badge/Netlify-Live%20Demo%20-181717?style=for-the-badge&logo=netlify&labelColor=080182)](https://prostatecarenz.netlify.app/)

---
## Wiki [→](https://github.com/arzenikos/prostate-care/wiki)
- **[Iterations](https://github.com/arzenikos/prostate-care/wiki/Development-Iterations)**
- **[Figma Prototype](https://www.figma.com/design/fCs420IxnIJFJ5a36LEQdp/DesignThinkingProjects--Copy-?node-id=2012-192&t=OKl2kRrYhCOtsRTu-1)**
- **[PDF Wireframe Diagram](https://github.com/arzenikos/prostate-care/tree/docs/assets/diagrams/pamana-diagram.pdf)**
- **[Emerge Poster](https://github.com/arzenikos/prostate-care/tree/docs/assets/documents/emerge-poster.pdf)**
- **[Short Paper](https://github.com/arzenikos/prostate-care/tree/docs/assets/documents/citrenz-short-paper.pdf)**

---
## Features
- Informational Pages: Clear, structured content on prostate cancer awareness, symptoms, treatment options, and support services.
- Responsive Design: Optimized for mobile, tablet, and desktop screens.
- Fast & Lightweight: Built with Astro for minimal client-side JavaScript and high performance.
- Accessibility-Focused: Ensures inclusive navigation for all users.
- Deployment: Seamlessly hosted on Netlify with automated CI/CD.


## Installation

### 1. Clone the repository

```bash
git clone https://github.com/arzenikos/prostate-care.git
```

### 2. Install dependencies

```bash
cd prostate-care
npm install
```

### 3. Clone fresh assets from private repo `prostate-care-assets` to `public/assets`

```bash
# Adding submodule
git submodule add --force https://github.com/arzenikos/prostate-care-assets.git public/assets


# Set submodule deinitialisation behavior for easier clean up (important when switching branches)
git config --global submodule.recurse true
```

### 4. Start local development server

```bash
npm run dev
```

---

## Deployment

The site is deployed on Netlify for easy hosting and continuous deployment:

1. Connect your GitHub repo to Netlify.
2. Configure build settings:
   - Build command: npm run build
   - Publish directory: dist/
3. Automatic redeploy on every push to the main branch.

---

## Checks

### Linkinator

```bash
# Local
npx linkinator http://localhost:4321 --recurse
```

## Cleanup

```bash
# Switching from branch with submodule to another branch 
git checkout --recurse-submodules other-branch
```

```bash
# Deinit the submodule's working directory without deleting its config
git submodule deinit -f public/assets

rm -r .\node_modules\
rm -r .\package-lock.json

# Now switch branches
git checkout <other-branch-without-submodule>

# When you come back and need it again:
git checkout <branch-with-submodule>
git submodule update --init --recursive
```

> [!WARNING]
> ## Important Notice: Academic Integrity
>
> **BCDE311 - Software Development Project**
>
> This portfolio contains original work completed as part of my BCDE311 - Software Development Project course at Ara Institute of Canterbury. I do not condone plagiarism or academic misconduct in any form. This project is for academic purposes only and is not intended to be copied or used without proper authorisation.
> The university has a STRICT policy on academic misconduct, and I fully support this policy. Any attempt to plagiarise, copy, or use this work as your own will result in serious consequences. Please respect academic integrity and do not attempt to pass off this work as your own.
>
> ## **Disclaimer**
>
> All the content presented here is the result of my own individual work, and any resemblance to other works is purely coincidental. If you are a student, please refrain from using or copying this work in any way that violates the principles of academic honesty and integrity.


## Project Structure
<!-- readme-tree start -->
```text
.
├── .env.example
├── .github
│   └── workflows
│       └── readme-tree.yaml
├── .gitignore
├── .gitmodules
├── README.md
├── astro.config.mjs
├── db
│   └── migrations
│       └── 0001_init.sql
├── desktop.ini
├── docker-compose.yaml
├── ollama-client.ts
├── package.json
├── public
│   └── assets
├── src
│   ├── components
│   │   ├── astro
│   │   │   ├── NodeGraph
│   │   │   │   ├── BlueGuideDetails.astro
│   │   │   │   ├── CanvasNav.astro
│   │   │   │   └── GraphCanvas.astro
│   │   │   ├── accordion
│   │   │   │   └── StageAccordion.astro
│   │   │   ├── article
│   │   │   │   ├── RelatedArticles.astro
│   │   │   │   └── SimpleArticle.astro
│   │   │   ├── brand
│   │   │   │   └── BrandMark.astro
│   │   │   ├── button
│   │   │   │   └── PrometheusAIButton.astro
│   │   │   ├── cards
│   │   │   │   ├── CategoryCard.astro
│   │   │   │   └── PersonaCard.astro
│   │   │   ├── chrome
│   │   │   │   ├── AccessibilityPanelOverlay.astro
│   │   │   │   ├── ChatTrigger.astro
│   │   │   │   ├── HubOverlay.astro
│   │   │   │   ├── PrometheusChat.astro
│   │   │   │   ├── SplashScreen.astro
│   │   │   │   └── UtilityNav.astro
│   │   │   ├── hero
│   │   │   │   └── HubHero.astro
│   │   │   ├── media
│   │   │   │   ├── ArticleThumbnail.astro
│   │   │   │   ├── Canvas.astro
│   │   │   │   ├── HeroThumbnail.astro
│   │   │   │   ├── OverlayThumbnail.astro
│   │   │   │   └── PlaceholderMedia.astro
│   │   │   └── ui
│   │   │       ├── Breadcrumbs.astro
│   │   │       ├── Callout.astro
│   │   │       └── LineIcon.astro
│   │   └── react
│   │       ├── AccordionToggle.tsx
│   │       ├── CardGrid.tsx
│   │       ├── ChatWidget.tsx
│   │       ├── PrometheusChatContent.tsx
│   │       └── data.json
│   ├── consts.ts
│   ├── content
│   │   ├── family
│   │   │   ├── first-post.md
│   │   │   ├── markdown-style-guide.md
│   │   │   ├── second-post.md
│   │   │   ├── third-post.md
│   │   │   └── using-mdx.mdx
│   │   ├── patients
│   │   │   ├── stage-0
│   │   │   │   ├── should-i-get-screened.md
│   │   │   │   ├── small-choices-big-impact.md
│   │   │   │   └── what-you-need-to-know-early.md
│   │   │   ├── stage-1
│   │   │   │   ├── doctor-time-making-every-visit-count.md
│   │   │   │   ├── navigating-your-options.md
│   │   │   │   └── understanding-your-diagnosis.md
│   │   │   ├── stage-2
│   │   │   │   ├── body-care-that-builds-you-up.md
│   │   │   │   ├── staying-grounded-through-it-all.md
│   │   │   │   └── your-body-your-needs.md
│   │   │   ├── stage-3
│   │   │   │   ├── caring-for-a-tired-body.md
│   │   │   │   ├── finding-your-ground.md
│   │   │   │   └── what-to-expect-now.md
│   │   │   └── stage-4
│   │   │       ├── honouring-your-life.md
│   │   │       ├── support-for-the-day-to-day.md
│   │   │       └── the-care-that-fits-you.md
│   │   ├── researchers
│   │   │   ├── first-post.md
│   │   │   ├── second-post.md
│   │   │   └── third-post.md
│   │   ├── sections.data.ts
│   │   └── ui
│   │       ├── article-paths.ts
│   │       ├── common
│   │       │   ├── chatbox.ts
│   │       │   ├── footer.ts
│   │       │   └── navigation.ts
│   │       └── site.ts
│   ├── content.config.ts
│   ├── layouts
│   │   ├── ArticleLayout.astro
│   │   ├── BlogPost.astro
│   │   ├── Layout.astro
│   │   ├── SiteFooter.astro
│   │   └── SiteHeader.astro
│   ├── lib
│   │   ├── markdown.ts
│   │   ├── patient-articles.ts
│   │   ├── rag
│   │   │   ├── chunking.ts
│   │   │   ├── config.ts
│   │   │   ├── db.ts
│   │   │   ├── embeddings.ts
│   │   │   ├── ingestion.ts
│   │   │   ├── llm.ts
│   │   │   ├── messages.ts
│   │   │   ├── pdf.ts
│   │   │   ├── prompts.ts
│   │   │   ├── rateLimit.ts
│   │   │   ├── repository.ts
│   │   │   └── retrieval.ts
│   │   └── types
│   │       └── nav.ts
│   ├── pages
│   │   ├── api
│   │   │   └── chat.ts
│   │   ├── bluenode.astro
│   │   ├── clinics.astro
│   │   ├── family-support
│   │   │   ├── index.astro
│   │   │   ├── real-support-for-real-people.astro
│   │   │   ├── the-basics-you-need.astro
│   │   │   └── youre-part-of-this-but-youre-still-you.astro
│   │   ├── index.astro
│   │   ├── newsletters.astro
│   │   ├── patient-space
│   │   │   ├── [stage]
│   │   │   │   └── [slug].astro
│   │   │   ├── body-care-that-builds-you-up.astro
│   │   │   ├── caring-for-a-tired-body.astro
│   │   │   ├── doctor-time-making-every-visit-count.astro
│   │   │   ├── finding-your-ground.astro
│   │   │   ├── honouring-your-life.astro
│   │   │   ├── index.astro
│   │   │   ├── navigating-your-options.astro
│   │   │   ├── sexual.health.astro
│   │   │   ├── should-i-get-screened.astro
│   │   │   ├── small-choices-big-impact.astro
│   │   │   ├── staying-grounded-through-it-all.astro
│   │   │   ├── support-for-the-day-to-day.astro
│   │   │   ├── the-care-that-fits-you.astro
│   │   │   ├── understanding-your-diagnosis.astro
│   │   │   ├── what-to-expect-now.astro
│   │   │   ├── what-you-need-to-know-early.astro
│   │   │   └── your-body-your-needs.astro
│   │   ├── researcher-hub
│   │   │   ├── [...slug].astro
│   │   │   ├── index.astro
│   │   │   ├── structured-understanding.astro
│   │   │   ├── tools-grants-collaboration.astro
│   │   │   └── trials-treatment-innovation.astro
│   │   ├── rss.xml.js
│   │   ├── style-guide.astro
│   │   └── unused
│   │       ├── design-system.astro
│   │       ├── empty.astro
│   │       ├── shop.astro
│   │       ├── user-guide.astro
│   │       ├── volunteer.astro
│   │       └── xnewsletter.astro
│   ├── scripts
│   │   ├── eval.cases.json
│   │   ├── eval.ts
│   │   ├── ingest.ts
│   │   └── search.ts
│   ├── styles
│   │   ├── globals.css
│   │   ├── markdown.css
│   │   └── tokens.css
│   └── utils
│       ├── pageMeta.ts
│       └── resolveAssets.ts
├── tree.bak
└── tsconfig.json

46 directories, 143 files
```
<!-- readme-tree end -->
