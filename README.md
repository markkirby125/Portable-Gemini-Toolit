# Portable Gemini Toolkit (Audit Reporter)

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
