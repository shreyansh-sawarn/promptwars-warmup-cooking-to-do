# HackOS

> **A specification-driven engineering reasoning framework for AI-assisted software development under constraints.**

[![Status](https://img.shields.io/badge/status-stable-green.svg)](#project-status)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](#project-status)
[![Architecture](https://img.shields.io/badge/architecture-spec--driven-orange.svg)](#framework-architecture)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](#license)

HackOS helps humans and AI collaborate by structuring engineering thinking into deterministic reasoning stages. Rather than treating AI as a code generator, HackOS organizes planning, architecture, implementation, review and communication into repeatable workflows.

```mermaid
graph LR
    Problem[Problem] --> Reasoning[Reasoning]
    Reasoning --> Decision[Decision]
    Decision --> Implementation[Implementation]
    Implementation --> Validation[Validation]
    Validation --> Demo[Demo]
```

## Contents

- [Why HackOS?](#why-hackos)
- [Core Principles](#core-principles)
- [Framework Architecture](#framework-architecture)
- [Reasoning Cycle](#reasoning-cycle)
- [Repository Structure](#repository-structure)
- [Core Components](#core-components)
- [Quick Start: Hackathon Guide](#quick-start-hackathon-guide)
- [Design Goals](#design-goals)
- [Project Status](#project-status)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Why HackOS?

Most AI workflows start with prompts.

HackOS starts with reasoning.

Instead of asking:

> "Generate my application."

HackOS asks:

* What problem are we solving?
* What matters most?
* What will judges actually score?
* What is the simplest solution?
* What should be built first?
* What should be ignored?

The result is faster, more consistent and more explainable engineering decisions.

---

## Core Principles

* Reason before implementation.
* Maximize value per unit effort.
* Prefer simplicity over complexity.
* Optimize for demonstrable outcomes.
* Continuously validate assumptions.
* Make every engineering decision explainable.

---

## Framework Architecture

```text
                    HackOS

                       │
                 ┌─────┴─────┐
                 │  Kernel   │
                 └─────┬─────┘
                       │
               Specifications
                       │
          ┌────────────┴────────────┐
          │                         │
      Reasoning Engines      Expert Personas
          │                         │
          └────────────┬────────────┘
                       │
                Runtime Context
                       │
                 Presentation
```

---

## Reasoning Cycle

Every project follows the same reasoning cycle.

```text
OBSERVE
    ↓
UNDERSTAND
    ↓
PRIORITIZE
    ↓
PLAN
    ↓
EXECUTE
    ↓
VERIFY
    ↓
EVALUATE
    ↓
COMMUNICATE
```

Each Reasoning Engine owns one stage of this process.

---

## Repository Structure

```text
HackOS/
│
├── core/
├── specs/
├── engines/
├── personas/
├── context/
├── templates/
├── examples/
└── meta/
```

---

## Core Components

## Kernel

Defines immutable framework rules.

* AGENTS
* PRINCIPLES
* THINKING_PROTOCOL
* REASONING_CYCLE
* CONTRACTS
* GLOSSARY
* PLAYBOOK

---

## Specifications

Define implementation contracts.

* ENGINE_SPEC
* PERSONA_SPEC

---

## Engines

Own engineering decisions.

* Orchestrator
* Scoring
* Decision
* Architecture
* Implementation
* Review
* Judge
* Demo

---

## Personas

Provide specialized engineering expertise.

* Principal Engineer
* Staff Engineer
* Product Manager
* UX Designer
* AI Engineer
* QA Engineer
* Security Engineer
* Hackathon Judge
* Demo Coach

---

## Runtime

Stores project state.

* Problem
* Rubric
* Features
* Decisions
* Risks
* Notes
* State

---

## Quick Start: Hackathon Guide

Here is how to use HackOS to structure and run your next hackathon project step-by-step:

### Step 1: Initialize Workspace
Copy the `context/` directory templates into your new project repository to serve as your project's runtime memory:
```bash
cp -r path/to/HackOS/context/ ./context/
```

### Step 2: Define the Problem & Rubric
- Paste the official challenge description and constraints into [PROBLEM.md](file:///c:/Users/shrey/Documents/Repos/HackOS/context/PROBLEM.md).
- Document categories and judging weights in [RUBRIC.md](file:///c:/Users/shrey/Documents/Repos/HackOS/context/RUBRIC.md).

### Step 3: Run Prioritization (Observe & Understand)
Point your AI coding assistant to `PROBLEM.md` and `RUBRIC.md`. Ask it to act as the **Scoring Engine** and **Decision Engine** to populate:
- [FEATURES.md](file:///c:/Users/shrey/Documents/Repos/HackOS/context/FEATURES.md): Identifying the highest ROI features mapping to the rubric.
- [DECISIONS.md](file:///c:/Users/shrey/Documents/Repos/HackOS/context/DECISIONS.md): Recording architecture choices, trade-offs, and tech stacks.

### Step 4: Iterative Sprints (Execute & Verify)
For each development phase, copy [Sprint.md](file:///c:/Users/shrey/Documents/Repos/HackOS/templates/Sprint.md) (e.g. to `sprints/sprint_01.md`). Work with your AI assistant to implement features incrementally:
- Update [STATE.md](file:///c:/Users/shrey/Documents/Repos/HackOS/context/STATE.md) continuously to record progress and feature completion.
- Ask the AI to act as the **Review Engine** to perform quality checks and verify implementation completeness.

### Step 5: Scoring Simulation & Demo Prep (Evaluate & Communicate)
Before the submission deadline:
- Ask the AI to act as the **Judge Engine** to audit the project and predict the judging score, resolving any low-scoring gaps.
- Use [Pitch.md](file:///c:/Users/shrey/Documents/Repos/HackOS/templates/Pitch.md) and [Demo.md](file:///c:/Users/shrey/Documents/Repos/HackOS/templates/Demo.md) to structure a presentation highlighting your highest ROI features.

---

## Design Goals

* Deterministic reasoning
* Modular architecture
* Explainable decisions
* Minimal duplication
* AI-friendly documentation
* Hackathon-ready workflows

---

## Project Status

Current Version

**v1.0**

Status

**Release Candidate**

---

## Roadmap

## v1.0

* Kernel
* Specifications
* Engines
* Personas
* Runtime
* Templates
* Documentation

## v1.1

* PromptWars profile
* Devpost profile
* Enterprise profile
* Additional examples

---

## Contributing

HackOS follows a specification-first workflow.

1. Update specifications.
2. Regenerate implementations.
3. Validate consistency.
4. Update documentation.

Architecture changes require a major version increment.

---

## License

See `LICENSE`.
