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


## Project Structure
<!-- START_STRUCTURE -->
```text
.
├── README.md
├── astro.config.mjs
├── netlify.toml
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── public
│   └── assets
├── renovate.json
├── sonar-project.properties
├── src
│   ├── assets
│   ├── components
│   ├── content
│   ├── layouts
│   ├── lib
│   ├── pages
│   ├── styles
│   └── tsconfig.json
├── structure.txt
├── tailwind.config.ts
└── tsconfig.json

11 directories, 12 files
```
<!-- END_STRUCTURE -->
---

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
<!-- readme-tree start -->
```
.
├── .env.example
├── .github
│   └── workflows
│       └── readme-tree.yaml
├── .gitignore
├── .gitmodules
├── Dockerfile
├── README.md
├── astro.config.mjs
├── db
│   └── init
│       ├── 001-extensions.sql
│       ├── 002-table.sql
│       ├── 003-index.sql
│       └── schema.sql
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
│   │   │   │   ├── PersonaThumbnail.astro
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
│   │   │   ├── diagnosis
│   │   │   │   └── something.md
│   │   │   └── stages
│   │   │       ├── stage-0
│   │   │       │   ├── should-i-get-screened.md
│   │   │       │   ├── small-choices-big-impact.md
│   │   │       │   └── what-you-need-to-know-early.md
│   │   │       ├── stage-1
│   │   │       │   ├── doctor-time-making-every-visit-count.md
│   │   │       │   ├── navigating-your-options.md
│   │   │       │   └── understanding-your-diagnosis.md
│   │   │       ├── stage-2
│   │   │       │   ├── body-care-that-builds-you-up.md
│   │   │       │   ├── staying-grounded-through-it-all.md
│   │   │       │   └── your-body-your-needs.md
│   │   │       ├── stage-3
│   │   │       │   ├── caring-for-a-tired-body.md
│   │   │       │   ├── finding-your-ground.md
│   │   │       │   └── what-to-expect-now.md
│   │   │       └── stage-4
│   │   │           ├── honouring-your-life.md
│   │   │           ├── support-for-the-day-to-day.md
│   │   │           └── the-care-that-fits-you.md
│   │   ├── researchers
│   │   │   ├── first-post.md
│   │   │   ├── second-post.md
│   │   │   ├── third-post.md
│   │   │   └── using-mdx.mdx
│   │   ├── sections.data.ts
│   │   ├── seed-docs
│   │   │   └── psa-test.md
│   │   ├── seed-pdfs
│   │   │   ├── Clinic & Places Info sheets
│   │   │   │   ├── CS-Info-Sheet-Radiation-Treatment.pdf
│   │   │   │   └── CommunityInfusionServiceBrochure.pdf
│   │   │   ├── Diet Related Articles
│   │   │   │   ├── Blackcurrant research
│   │   │   │   │   ├── BlackCurrantsHealth-Benefits-Review-updated-19-December-2017.pdf
│   │   │   │   │   ├── Blackcurrants - a Kiwi example of a positive food · Plant & Food Research.pdf
│   │   │   │   │   ├── Chichester Research.pdf
│   │   │   │   │   ├── Cook et al EJAP R2 accepted version.pdf
│   │   │   │   │   ├── EFFECT-1.PDF
│   │   │   │   │   ├── Intermittent HI exercise R2.pdf
│   │   │   │   │   ├── fnut-06-00073.pdf
│   │   │   │   │   ├── nutrients-13-02875-v2.pdf
│   │   │   │   │   ├── nutrients-13-02875-with-cover.pdf
│   │   │   │   │   ├── s00394-020-02329-7.pdf
│   │   │   │   │   ├── s12970-020-00354-9.pdf
│   │   │   │   │   └── sports-05-00025.pdf
│   │   │   │   ├── Diet and Heart Disease
│   │   │   │   │   ├── 2009-09-02-caldwell-b-esselstyn-transcripts.pdf
│   │   │   │   │   ├── A Strategy to Arrest and Reverse Coronary Artery Disease_ A 5-Year Longitudi.pdf
│   │   │   │   │   ├── A5 Blood Pressure 2010.pdf
│   │   │   │   │   ├── A5 Cholesterol 09 02.pdf
│   │   │   │   │   ├── ABOUT DR. ESSELSTYN.pdf
│   │   │   │   │   ├── C B Esselstyn Book Excerpt.pdf
│   │   │   │   │   ├── Calcium & vitamin D – new insights.pdf
│   │   │   │   │   ├── Can-Lifestyle-Changes-Reverse-CHD.pdf
│   │   │   │   │   ├── CardioSource - Mountin Evidence for Fish Oil Heart benefits.pdf
│   │   │   │   │   ├── Cholesterol_blood_lipids.pdf
│   │   │   │   │   ├── CoEnzymeQ10.pdf
│   │   │   │   │   ├── Cooking Oils.docx
│   │   │   │   │   ├── Diet, lifestyle, and the etiology of coronary arte... [Am J Cardiol. 1998] -.pdf
│   │   │   │   │   ├── Esselstyn_Caldwell_Article.pdf
│   │   │   │   │   ├── Fish Oil Story remains fishy.pdf
│   │   │   │   │   ├── FishOils.pdf
│   │   │   │   │   ├── Fish_ are vegetarians and vegans missing out by not eating it_.pdf
│   │   │   │   │   ├── Foreword_ Changing the Treatment Paradigm for Coronary Artery Disease.pdf
│   │   │   │   │   ├── From Hdrive
│   │   │   │   │   │   ├── 2009-09-02-caldwell-b-esselstyn-transcripts.pdf
│   │   │   │   │   │   ├── A Strategy to Arrest and Reverse Coronary Artery Disease_ A 5-Year Longitudi.pdf
│   │   │   │   │   │   ├── ABOUT DR. ESSELSTYN.pdf
│   │   │   │   │   │   ├── C B Esselstyn Book Excerpt.pdf
│   │   │   │   │   │   ├── Esselstyn_Caldwell_Article.pdf
│   │   │   │   │   │   ├── Foreword_ Changing the Treatment Paradigm for Coronary Artery Disease.pdf
│   │   │   │   │   │   ├── Introduction_ More Than Coronary Artery Disease (continued).pdf
│   │   │   │   │   │   ├── PLANT-BASED NUTRITION.pdf
│   │   │   │   │   │   ├── Resolving the Coronary Artery Disease Epidemic through Plant-Based Nutrition.pdf
│   │   │   │   │   │   ├── SAMPLE RECIPES from PREVENT AND REVERSE HEART DISEASE.pdf
│   │   │   │   │   │   ├── The Collapse of Cardiology.pdf
│   │   │   │   │   │   ├── Updating a 12-Year Experience With Arrest and Reversal Therapy for Coronary .pdf
│   │   │   │   │   │   ├── sat-20101127-0815-Caldwell_Esselstyn_Plant_Based_Diet-048.mp3
│   │   │   │   │   │   └── sat-20120519-0815-lawrence_krauss_-_the_plausible_universe-048.mp3
│   │   │   │   │   ├── Glycemic Index Table.pdf
│   │   │   │   │   ├── Heart-Disease-and-Diet.pdf
│   │   │   │   │   ├── Hypertension and Weight Loss.pdf
│   │   │   │   │   ├── Intensive-Lifestyle-Changes-for-Reversal-of-Coronary-Heart-Disease.pdf
│   │   │   │   │   ├── Introduction_ More Than Coronary Artery Disease (continued).pdf
│   │   │   │   │   ├── Lavie Reply to Fishy tale.pdf
│   │   │   │   │   ├── Legumes, the much maligned superfood.pdf
│   │   │   │   │   ├── Marine fatty Acids and Atherosclerosis in Japanese men.pdf
│   │   │   │   │   ├── NUTS - the surprising benefits of eating nuts regularly..pdf
│   │   │   │   │   ├── Oat beta-glucan reduces blood cholesterol concentration in hypercholesterolemic subjects.htm
│   │   │   │   │   ├── Omega-3 PolyUnsaturated FA and CVD.pdf
│   │   │   │   │   ├── Omega3 and cardiovascular disease.pdf
│   │   │   │   │   ├── Omega3 randomised controlled trials.pdf
│   │   │   │   │   ├── Oxford-Cornell China Study
│   │   │   │   │   │   ├── Mono_Annex.pdf
│   │   │   │   │   │   ├── Mono_Diet_Survey.pdf
│   │   │   │   │   │   └── Mono_Mortality.pdf
│   │   │   │   │   ├── PLANT-BASED NUTRITION.pdf
│   │   │   │   │   ├── Resolving the Coronary Artery Disease Epidemic through Plant-Based Nutrition.pdf
│   │   │   │   │   ├── Role of Omega-3 remains controversial.pdf
│   │   │   │   │   ├── SAMPLE RECIPES from PREVENT AND REVERSE HEART DISEASE.pdf
│   │   │   │   │   ├── SOY_ THE HOPES PROBABLY OUTWEIGH THE FEARS.pdf
│   │   │   │   │   ├── The Collapse of Cardiology.pdf
│   │   │   │   │   ├── Updating a 12-Year Experience With Arrest and Reversal Therapy for Coronary .pdf
│   │   │   │   │   ├── VeganHealth.ppt
│   │   │   │   │   ├── Weight ManagementA51007.pdf
│   │   │   │   │   ├── cholesterol.pdf
│   │   │   │   │   └── sat-20101127-0815-Caldwell_Esselstyn_Plant_Based_Diet-048.mp3
│   │   │   │   ├── Fruits & Vegetables - Anti cancer properties
│   │   │   │   │   └── Dietary lycopene intake and risk of prostate cancer defined by ERG.pdf
│   │   │   │   ├── Legume related Flatulence
│   │   │   │   │   ├── Effect_of_pulse_consumption_on_perceived flatulennce.pdf
│   │   │   │   │   └── Evaluation of two methods to reduce legume-related faltulence.pdf
│   │   │   │   └── aft-20180423-1325-getting_enough_vitamin_d_over_summer-128.mp3
│   │   │   ├── Meat and Proteins Effect Articles
│   │   │   │   ├── Amount and type of dietary protein in the treatment of metabolic disorder.pdf
│   │   │   │   ├── Cancer Prev Res EggRedmeatPoultry and Risk of Lethal Prostatre Cancer 2011.pdf
│   │   │   │   ├── Consumptionof NZ Blackcurrant extract prior to exercise  Pilot Study.pdf
│   │   │   │   ├── Diet and Lifestyle in Prostate Cancer _ SpringerLink.pdf
│   │   │   │   ├── Dietary factors and Prostate Cancer Development Nutrients 2021.pdf
│   │   │   │   ├── Effect of total red meat consumption on inflammatory markers.pdf
│   │   │   │   ├── Effect_of_pulse_consumption_on_perceived flatulennce.pdf
│   │   │   │   ├── Epidemiology of Prostate Cancer 2019 wjon-10-063.pdf
│   │   │   │   ├── Evaluation of two methods to reduce legume-related faltulence.pdf
│   │   │   │   ├── Figure1 Prostate cancer Causes.ppt
│   │   │   │   ├── Fnut relationship between meat and risk of cancer 2022.pdf
│   │   │   │   ├── Lean Beef effects in Med Diet on Lipoproteins .pdf
│   │   │   │   ├── Meta-Analysis of Association of Protein Intake and Prostate Cancer Risk 2018.pdf
│   │   │   │   ├── Protein intake and Cancer Umbrella review of German Nutrition Guidelines 2024.pdf
│   │   │   │   ├── Red Meat consumption and Risk of Imflammation Review.pdf
│   │   │   │   ├── Red and Processed Meat and other food intake in US Men with Non Metastatic Prostate Cancer.pdf
│   │   │   │   ├── Red and processed meat consumption and cancer outcomes_ Umbrella review - ScienceDirect.pdf
│   │   │   │   ├── Relationship Betwenn Dietary Protein and PSA 2020.pdf
│   │   │   │   ├── ScienceDirect_articles_02Aug2024_21-11-43.924.zip
│   │   │   │   ├── The Effects of Red meat Intake on Inflammation Biomarkers - A systematic Review.pdf
│   │   │   │   ├── fcvm-09-996467.pdf
│   │   │   │   ├── frontiersofnutrition-09-801722.pdf
│   │   │   │   ├── ijc31046-sup-0001-suppinfos01.docx
│   │   │   │   └── ijc31046-sup-0002-suppinfos02.docx
│   │   │   ├── Reply to A.W.pdf
│   │   │   ├── Research Updates
│   │   │   │   ├── An Update on the Management of Bone Metastases s11912-024-01515-8.pdf
│   │   │   │   ├── cancers-14-04149.pdf
│   │   │   │   └── cancers-15-00461.pdf
│   │   │   ├── Research-Approach
│   │   │   │   ├── A Review of K9MD Trials in New Zealand, Including Prostate Cancer Detection.docx
│   │   │   │   ├── Addition of Metastasis-Directed Therapy to Intermittent Hormone Therapy for Oligometastatic Prostate Cancer 2023.docx
│   │   │   │   ├── Androgen receptor axis-targeted agents v conventional hormonal therapy in Japan ol-24-04-13453.pdf
│   │   │   │   ├── Bione Metastases Imaging Medscape.pdf
│   │   │   │   ├── Comparative_analysis_of_real_world_data_of.128.pdf
│   │   │   │   ├── Cost Effectiveness of Prophylatic Radiation in Patients with Asymptomatic Bone Mestastases.pdf
│   │   │   │   ├── Cost-Effectiveness of Prophylactic Radiation IJRO e578 2023.pdf
│   │   │   │   ├── Dietary lycopene intake and risk of prostate cancer defined by ERG.pdf
│   │   │   │   ├── Early palliative radiation versus observation for high risk asympotomatic or minimally symptomatic bone metastases.pdf
│   │   │   │   ├── Oligometastatic Review of Management cancers-14-02017.pdf
│   │   │   │   ├── PROPHY~1.PDF
│   │   │   │   ├── Palliative Radiotherapy to Asymptomatic Bone Metastasis MEJC_Volume 12_Issue 3_Pages 422-428.pdf
│   │   │   │   ├── Prophylactic Radiation Therapy protocol_JCO.23.00753.pdf
│   │   │   │   ├── Resistance Exercise examples in Men on ADT.pdf
│   │   │   │   ├── Resistance Exercises Counteracts the impact of ADT in Cancer Patients.pdf
│   │   │   │   ├── SABR snd Conventional Review bindels_2024_oi_231631_1707168814.33326.pdf
│   │   │   │   ├── UK SABR Consortium Pelvic PIIS0936655522004563.pdf
│   │   │   │   ├── chan-et-al-2024-prophylactic-radiation-therapy-for-high-risk-asymptomatic-bone-metastases-a-new-standard-of-care-or.pdf
│   │   │   │   ├── fimmu-11-01014.pdf
│   │   │   │   ├── fimmu-12-748741.pdf
│   │   │   │   ├── journal.pmed.1003998.pdf
│   │   │   │   └── patel-et-al-2020-low-dose-abiraterone-in-metastatic-prostate-cancer-is-it-practice-changing-facts-and-facets.pdf
│   │   │   ├── Research-Food
│   │   │   │   ├── Nahoko Shiomi - Dietary Nucleic Acid Supression of Tumor Cells 2024 .pdf
│   │   │   │   └── New Zealand Kawakawa Tree Medical Use.docx
│   │   │   ├── Research-Meds
│   │   │   │   ├── 2nd Generation Antiandrogen Use in Prostate Cancer oyab045.pdf
│   │   │   │   ├── ABIRAT~1.PDF
│   │   │   │   ├── Bicalutamie and Survival Case Study 928787.pdf
│   │   │   │   ├── Bringing medicines into New Zealand _ Ministry of Health NZ.pdf
│   │   │   │   ├── Low dose Abiraterone for Prostate Cancer An Attracive Strategy for Limited Resource Settings s-0042-1742400.pdf
│   │   │   │   ├── Low-Dose Abiraterone with fatty food versus standard dose in MCRPS  PIIS0923753422043873.pdf
│   │   │   │   ├── Lower Dose of Prostate Cancer Drug with Food - NCI.pdf
│   │   │   │   ├── Monitoring New Zealand patients on abiraterone 2017.docx
│   │   │   │   ├── PEACE-1 Results 2022 1-s2.0-S0140673622003671-am.pdf
│   │   │   │   ├── PIIS1470204523001481.pdf
│   │   │   │   ├── Potential Cost Savings with Low-Dose Abiraterone inthe United States GO.20.00140.pdf
│   │   │   │   ├── Prednisone.pdf
│   │   │   │   ├── Pregabalin Side Effects.docx
│   │   │   │   ├── TAR-399-Abiraterone-Acetate-for-high-risk-hormone-naive-and-high-risk-hormone-sensitive-prostate-cancer.pdf
│   │   │   │   ├── YonsaMpredtab Abiraterone Acetate.pdf
│   │   │   │   ├── mourey-et-al-2023-efficacy-and-safety-of-abiraterone-acetate-plus-prednisone-and-androgen-deprivation-therapy-docetaxel.pdf
│   │   │   │   ├── s40291-022-00594-2.pdf
│   │   │   │   ├── tau-09-04-1691.pdf
│   │   │   │   ├── zbc30204.pdf
│   │   │   │   └── zytigatab.pdf
│   │   │   ├── Research-Scientific
│   │   │   │   └── 1-s2.0-S177322472031248X-fx1_lrg.jpg
│   │   │   ├── Research-Statistics
│   │   │   │   └── 1-s2.0-S0959804920300630-fx1_lrg.jpg
│   │   │   ├── Research-Training
│   │   │   │   ├── Androgen deprivation in Prostate Cancer - benefits of home-based resitance training.pdf
│   │   │   │   ├── NHS Pelvic Floor Exercises PHY_PFEM.pdf
│   │   │   │   ├── Resistance-Training-Exercise-for-Men-with-Prostate-Cancer-2012.pdf
│   │   │   │   ├── Resistance_Exercise_in_Men_Receiving_Androgen_Depr.pdf
│   │   │   │   └── pelvic-floor-muscle-training-for-men_0.pdf
│   │   │   ├── Review of PR_Zytga 2015.pdf
│   │   │   ├── Stage0 - Testing
│   │   │   │   ├── BPAC Testing for prostate cancer 2020.pdf
│   │   │   │   ├── Info-sheet-questions-you-may-wish-to-ask-English-te-reo-Maori.pdf
│   │   │   │   ├── Key-Questions-CHT-TRAD.pdf
│   │   │   │   ├── Key-Questions-ENG.pdf
│   │   │   │   ├── What-to-ask-your-specialist_FINAL_single-page-spread-WEB.pdf
│   │   │   │   └── ss-prostate-1-the-use-of-psa-testing-in-general-practice-dr-ross-lawrenson.pdf
│   │   │   ├── Stage0-Prevent & Lifestyle
│   │   │   │   ├── A Review of Kegel Exercises for Men - Benefits and Clinical Evidence.docx
│   │   │   │   ├── Long Distance  Cycing and PSA pone.0056030.pdf
│   │   │   │   └── PEP for Prostate Cancer Patients Welcome.pdf
│   │   │   ├── Stage1 Meds & Treatment Plan
│   │   │   │   ├── 00d1bbc8-cdhb-oncology-treatment-booklet-ref-3588.pdf
│   │   │   │   ├── 1-s2.0-S0140673622003671-am.pdf
│   │   │   │   ├── Bicaloxtab.pdf
│   │   │   │   ├── Booklet-radiation-treatment.pdf
│   │   │   │   ├── Dexamethasone.pdf
│   │   │   │   ├── Domperidone.pdf
│   │   │   │   ├── Goserelin combined with bicalutamide ijcem0115155.pdf
│   │   │   │   ├── Imunotherapy 6678.00.pdf
│   │   │   │   ├── Info-sheet-your-cancer-treatment-team.pdf
│   │   │   │   ├── [main] Booklet-chemotherapy-immunotherapy-and-targeted-treatment.pdf
│   │   │   │   ├── docetaxelaccordinj.pdf
│   │   │   │   └── zytiga Medsafe Consumer  Datasheet.pdf
│   │   │   ├── Stage2-3 MH
│   │   │   │   ├── Info-sheet-cancer-related-fatigue.pdf
│   │   │   │   ├── prostate testing bpac nz.pdf
│   │   │   │   ├── prostate-cancer-management-referral-guidance_sept15-c.pdf
│   │   │   │   └── prostate-cancer-treatment-choices (1).pdf
│   │   │   ├── Stereotactic Radiation for the Comprehensive Treatment of Oligometastases (SABR-COMET)_ Extended Long-Term Outcomes - PubMed.pdf
│   │   │   ├── junk
│   │   │   │   └── CS-Info-sheet-radiation-treatment-Chinese-simple.pdf
│   │   │   ├── node-key
│   │   │   │   ├── MOV0009- PCOR ANZ - Annual Report - Summary Version_DIGI (Singles)_FA.pdf
│   │   │   │   ├── Medicines - New Zealand Customs Service.pdf
│   │   │   │   ├── PCOR-ANZ_Consumer_Report_Meeting_ Slide_Deck_16Apr24.pdf
│   │   │   │   ├── PSA - Urology Waikato.pdf
│   │   │   │   ├── PSA testing and screening Otago Urology.pdf
│   │   │   │   ├── Personal Importing Medicines.pdf
│   │   │   │   └── pcor-anz_2023_annual_report.pdf
│   │   │   └── rush-et-al-2021-quality-of-life-in-men-with-prostate-cancer-randomly-allocated-to-receive-docetaxel-or-abiraterone-in.pdf
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

72 directories, 342 files
```
<!-- readme-tree end -->
