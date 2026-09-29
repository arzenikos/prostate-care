<div align="center">
   <img width="100" height="100" alt="unnamed (7 1)" src="https://github.com/user-attachments/assets/48113539-8454-4047-80ad-e0ea604adbff" />


<h1>
   Prometheus | Prostate Care Aotearoa Website
</h1>

![Astro](https://img.shields.io/badge/AstroJS-%232C2052.svg?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Azure AI Foundry](https://img.shields.io/badge/Azure_AI_Foundry-0078D4.svg?style=for-the-badge&logo=azure&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Design Thinking](https://img.shields.io/badge/Design_Thinking-%231F67CC.svg?style=for-the-badge&logo=adobexd&logoColor=white)

> BCDE311 - Software Development Project
>
> `Prometheus` is a user-focused website remake for Prostate Cancer NZ, as part of the **BCDE311 - Software Development Project** course. `Prometheus`, formerly BlueprintNZ, is an informational and resource platform designed to support individuals affected by prostate cancer in New Zealand. The site aims to provide reliable guidance, raise awareness, and connect users with helpful resources and support networks.
This project demonstrates full-stack development using modern web technologies, accessibility best practices, and responsive design principles.

[![Live Demo](https://img.shields.io/badge/Netlify-Live%20Demo%20-181717?style=for-the-badge&logo=netlify&labelColor=112927)](https://prostatecarenz.netlify.app/)
[![Figma Prototype](https://img.shields.io/badge/Figma-Prototype-181717?style=for-the-badge&logo=figma&labelColor=191b36)](https://www.figma.com/design/fCs420IxnIJFJ5a36LEQdp/DesignThinkingProjects--Copy-?node-id=2012-192&t=OKl2kRrYhCOtsRTu-1)
</div>


## Branch Note
- **Branch**: `chore/fix-ai-retrieval`  
- **Purpose**: Maintenance and retrieval‑logic fixes.
- **Key Points**:
   - Non‑feature work; improves AI data flow and reliability.

> [ ⎇ See Branch Info for more information](https://github.com/arzenikos/prostate-care/wiki) 
---
<table>
  <tr align="center">
    <td colspan="3"><img src="" alt="Image 1A" /></td>
    <td colspan="3"><img src="" alt="Image 1B" /></td>
  </tr>
  <tr align="center">
    <td colspan="3">Splashscreen</td>
    <td colspan="3">Landing Page</td>
  </tr>

  <tr align="center" colspan="6">
    <td colspan="2"><img src="" alt="Image 2A" /></td>
    <td colspan="2"><img src="" alt="Image 2B" /></td>
    <td colspan="2"><img src="" alt="Image 2C" /></td>
  </tr>
  <tr align="center">
    <td colspan="2">Family Support Page</td>
    <td colspan="2">Research Hub Page</td>
    <td colspan="2">Patient Space Page</td>
  </tr>

  <tr align="center">
    <td><img src="" alt="Image 3A" /></td>
    <td><img src="" alt="Image 3B" /></td>
    <td><img src="" alt="Image 3C" /></td>
    <td><img src="" alt="Image 3D" /></td>
    <td><img src="" alt="Image 3E" /></td>
    <td><img src="" alt="Image 3F" /></td>
  </tr>
  <tr align="center">
    <td>BlueNode Banner</td>
    <td>BlueNode Page</td>
    <td>Newsletter Banner</td>
    <td>Newsletter Page</td>
    <td>Community & Support Banner</td>
    <td>Community & Support Page</td>
  </tr>

  <tr align="center">
    <td colspan="6"><img src="" alt="Image 4" /></td>
  </tr>
  <tr align="center">
    <td colspan="6">BlueNode Feature</td>
  </tr>

  <!-- Row 5: 1 column spanning all 6 -->
  <tr align="center">
    <td colspan="6"><img src="" alt="Image 5" /></td>
  </tr>
  <tr align="center">
    <td colspan="6">Chatbot Feature</td>
  </tr>

</table>

> [See Wiki](https://github.com/arzenikos/shift-sync-agentic/wiki/Development-Iterations) for the iteration snapshots, full admin usage instructions, and data model details.



## High-Level Features
- Informational Pages: Clear, structured content on prostate cancer awareness, symptoms, treatment options, and support services.
- Responsive Design: Optimized for mobile, tablet, and desktop screens.
- Fast & Lightweight: Built with Astro for minimal client-side JavaScript and high performance.
- Accessibility-Focused: Ensures inclusive navigation for all users.
- Deployment: Seamlessly hosted on Netlify with automated CI/CD.

## Project Structure
<!-- START_STRUCTURE -->
```text

```
<!-- END_STRUCTURE -->

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
git checkout --recurse-submodules <other-branch>
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

---

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


## Project Documentation
- **[Iterations](https://github.com/arzenikos/prostate-care/wiki/Development-Iterations)**
- **[Figma Prototype](https://www.figma.com/design/fCs420IxnIJFJ5a36LEQdp/DesignThinkingProjects--Copy-?node-id=2012-192&t=OKl2kRrYhCOtsRTu-1)**
- **[UML Diagram](https://github.com/arzenikos/prostate-care/tree/docs/assets/diagrams/uml-diagram.pdf)**
- **[Emerge Poster](https://github.com/arzenikos/prostate-care/tree/docs/assets/documents/emerge-poster.pdf)**
- **[Short Paper](https://github.com/arzenikos/prostate-care/tree/docs/assets/documents/citrenz-short-paper.pdf)**


---

Created by Arsenie — 2025