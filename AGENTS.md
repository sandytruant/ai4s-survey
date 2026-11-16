# AI4S Survey Guidelines (`AGENTS.md`)

This repository contains a systematic survey of **AI for Science (AI4S)** applications, tailored specifically for **computer scientists working on hardware accelerator architecture and compilers**.

## Core Rules & Conventions

1. **Target Audience & Perspective**
   - Written for **computer architects and compiler engineers**.
   - Translate physics/chemistry/mechanics concepts into computational primitives: data structures (grids, graphs, particles, dense/sparse tensors), memory access patterns, arithmetic intensity, control flow, precision requirements, and communication/synchronization bottlenecks.
   - Highlight what AI replaces vs. what non-AI classical kernels remain in the end-to-end loop (Amdahl's Law perspective).

2. **Language**
   - **All documents must be written in English.**

3. **Format**
   - **All survey documents must be written in HTML (`.html`)** (excluding repository meta-files like `AGENTS.md` and `.gitignore`).
   - Use clean, self-contained or shared-CSS HTML5 with interactive/readable typography, MathJax/KaTeX (or clean math markup) for key equations, and structured tables for profiling data.

4. **Visual-First & Intuitive Explanations**
   - **Prefer diagrams over walls of text.** Anything that can be explained visually—physical intuition, multi-scale relationships, solver workflows, AI vs. non-AI step boundaries, tensor shapes, dataflow, and hardware bottlenecks—must be illustrated using inline **SVG** diagrams, **Mermaid** diagrams, or visual HTML/CSS flowcharts.
   - Keep prose concise, punchy, and structured. Avoid dense paragraphs.

5. **Workspace Hygiene (No `/tmp`)**
   - **NEVER write to `/tmp`.**
   - All intermediate artifacts (downloaded papers, scripts, scratch notes, caches, or test outputs) must be stored inside a `.gitignore`d directory under the project root (e.g., `.scratch/`, `.cache/`, `.downloads/`).

6. **Accuracy & Verifiability**
   - Every cited method must include verified links to its **paper/documentation** and **open-source repository** (prioritizing high-impact, recent, open-source methods).
   - Computational profiling numbers (hardware used, throughput, speedup, memory/compute bottlenecks) must be sourced from published papers or official documentation—do not fabricate or extrapolate numbers.
   - Dedicated academic or industrial accelerators must be explicitly listed if they exist.

7. **GitHub Pages Deployment & Unified Web UX**
   - **Deployment Target**: Publish as a static GitHub Pages site from the `ai4s-survey` repository under the user's `gh` CLI-authenticated GitHub account. All internal asset and page links must use relative paths so the site works cleanly under the `/ai4s-survey/` subpath.
   - **Unified Navigation & Interactive Structure**: Pages must not be isolated HTML files. Provide a persistent site-wide navigation shell (sidebar index + top bar), tabbed interfaces (e.g., pillar/section/comparison tabs), responsive layout, and dark mode support.
   - **Modern Web Guidance**: All HTML, CSS, and client-side JS refactoring must follow the `modern-web-guidance` skill (searching and retrieving relevant guides before writing code).

## Repository Structure

```text
.
├── AGENTS.md
├── .gitignore
├── index.html                          # Master portal & cross-domain comparison
├── assets/
│   └── style.css                       # Shared clean visual styling for all HTML pages
├── 01_electronic_structure/            # Pillar 1: Complex PDEs & Eigenvalue Problems
│   ├── 1_scientific_problem/
│   │   ├── 1.1_problem_overview.html
│   │   ├── 1.2_classical_methods_and_bottlenecks.html
│   │   └── 1.3_compute_demand_and_impact.html
│   └── 2_ai4s_methods/
│       ├── 2.1_landscape_overview.html
│       └── 2.2_representative_methods/
│           └── <method_name>.html      # Contains 2.2.1 Workflow, 2.2.2 Profiling, 2.2.3 Accelerators
├── 02_molecular_dynamics/              # Pillar 2: Particle System Simulation (MD)
│   ├── 1_scientific_problem/
│   │   ├── 1.1_problem_overview.html
│   │   ├── 1.2_classical_methods_and_bottlenecks.html
│   │   └── 1.3_compute_demand_and_impact.html
│   └── 2_ai4s_methods/
│       ├── 2.1_landscape_overview.html
│       └── 2.2_representative_methods/
│           └── <method_name>.html
└── 03_continuum_mechanics_pde/         # Pillar 3: Macroscopic Continuum Mechanics PDEs
    ├── 1_scientific_problem/
    │   ├── 1.1_problem_overview.html
    │   ├── 1.2_classical_methods_and_bottlenecks.html
    │   └── 1.3_compute_demand_and_impact.html
    └── 2_ai4s_methods/
        ├── 2.1_landscape_overview.html
        └── 2.2_representative_methods/
            └── <method_name>.html
```
