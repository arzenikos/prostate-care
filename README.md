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
> All the content presented here is the result of my own individual work, and any resemblance to other works is purely coincidental. If you are a student, please refrain from using or copying this work in any way that violates the principles of academic honesty and integrity.
