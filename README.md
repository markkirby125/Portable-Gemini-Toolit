# Portable Gemini Toolkit (Audit Reporter)

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) ![React](https://img.shields.io/badge/React-20232A?style=flat# Portable Gemini Toolkit (Audit Reporter)logo=react# Portable Gemini Toolkit (Audit Reporter)logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat# Portable Gemini Toolkit (Audit Reporter)logo=typescript# Portable Gemini Toolkit (Audit Reporter)logoColor=white) ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat# Portable Gemini Toolkit (Audit Reporter)logo=vite# Portable Gemini Toolkit (Audit Reporter)logoColor=FFD62E)


**Gemini CLI audit tool** and interactive dashboard that compares the Gemini CLI design documents against live Batch implementations. It tracks missing features, maps execution gaps, and reads crash logs.

## Features
- **Gap Analysis Viewer**: Side-by-side comparison of the design spec and the active script.
- **Crash Log Parsing**: Extracts and formats raw debug logs to map the execution flow.
- **Severity Sorting**: Filters gaps by status (Critical, Missing, Partial, Implemented).
- **Client-Side Processing**: Runs in the browser without backend telemetry.

## Tech Stack
- React 19
- Vite
- Tailwind CSS
- TypeScript

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/markkirby125/Portable-Gemini-Toolit.git
   cd Portable-Gemini-Toolit
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## License
MIT License
