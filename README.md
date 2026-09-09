# Portable Gemini Toolkit (Audit Reporter)

A comprehensive, interactive audit dashboard built to compare Gemini CLI design documents against live Batch implementations. It visualizes missing features, highlights critical gaps, and reviews crash logs to ensure feature parity and execution stability.

## Features
- **Gap Analysis Viewer**: Side-by-side comparison of documented design features versus implemented script reality.
- **Crash Log Parsing**: Ingests and formats raw debug logs to track execution flows and isolate failure points.
- **Dynamic Reporting**: Sorts gaps by severity (Critical, Missing, Partial, Implemented).
- **Static & Secure**: Runs entirely in the browser using React.

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
