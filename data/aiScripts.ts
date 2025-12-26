
export const geminiNetScript = `// scripts/gemini_net.cjs
// Purpose: Analyzes network logs using Gemini API
// Usage: node gemini_net.cjs <path_to_log_file>

const { GoogleGenAI } = require("@google/genai");
const fs = require('fs').promises;
const path = require('path');

// 1. Setup & Validation
if (!process.env.API_KEY) {
    console.error("ERROR: API_KEY environment variable not set.");
    process.exit(1);
}

const logFilePath = process.argv[2];
if (!logFilePath) {
    console.error("ERROR: No log file path provided.");
    process.exit(1);
}

// 2. Main Execution
async function analyze() {
    try {
        const logContent = await fs.readFile(logFilePath, 'utf-8');

        // Initialize Gemini
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        console.log("\\n--- GEMINI AI ANALYSIS [Network] ---\\n");

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: \`You are a Senior Network Engineer. Analyze the following Windows IPConfig and Wireless LAN logs.
            
            Task:
            1. Identify connectivity status (Online/Offline).
            2. Check for IP conflicts, weird DNS (not 8.8.8.8 or ISP), or DHCP failures (169.254.x.x).
            3. If Wi-Fi data is present, check signal strength and driver dates.
            4. Provide 3 bullet points of actionable advice.
            
            Logs:
            \${logContent}\`,
            config: {
                temperature: 0.2, 
            }
        });

        console.log(response.text);
        console.log("\\n------------------------------------\\n");

    } catch (error) {
        console.error("AI Analysis Failed:", error.message);
        process.exit(1);
    }
}

analyze();
`;

export const geminiEventsScript = `// scripts/gemini_events.cjs
// Purpose: Analyzes Windows Event Logs using Gemini API
// Usage: node gemini_events.cjs <path_to_event_export>

const { GoogleGenAI } = require("@google/genai");
const fs = require('fs').promises;

// 1. Setup & Validation
if (!process.env.API_KEY) {
    console.error("ERROR: API_KEY environment variable not set.");
    process.exit(1);
}

const eventFilePath = process.argv[2];

// 2. Main Execution
async function analyze() {
    try {
        const eventContent = await fs.readFile(eventFilePath, 'utf-8');

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        console.log("\\n--- GEMINI AI ANALYSIS [System Events] ---\\n");

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: \`You are a Windows System Administrator. Analyze these specific Event Logs from the last 14 days.

            Task:
            1. Ignore "Information" level events unless relevant to a crash.
            2. Group similar errors (e.g., "5 instances of Event 41").
            3. For the top 2 most critical errors, explain the root cause and a potential fix.
            4. If the log is empty or healthy, just say "System appears healthy based on provided logs."

            Event Data:
            \${eventContent}\`,
             config: {
                temperature: 0.2,
            }
        });

        console.log(response.text);
        console.log("\\n------------------------------------------\\n");

    } catch (error) {
        console.error("AI Analysis Failed:", error.message);
        process.exit(1);
    }
}

analyze();
`;
