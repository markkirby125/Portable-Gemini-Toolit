
export const designDocContent = `# Design Document: Gemini CLI Portable Launcher (v3.3.15)

## 1. Project Overview
The **Gemini CLI Portable Launcher** is a standalone, "no-install" diagnostic toolchain designed for IT professionals at **Berkshire IT Services (BITS)**. It leverages the Google Gemini API to analyze system logs, manage software, and provide troubleshooting advice directly from any location.

**Design Philosophy:**
*   **Universal Execution:** The tool **must** run from any location: USB drives, mapped network drives, UNC paths (Network Shares), or local folders. It relies exclusively on relative pathing (\`%~dp0\`) and must never contain hard-coded drive letters or absolute paths.
*   **Offline-First Core:** All diagnostic, repair, and maintenance features are built on native Windows batch and PowerShell scripts. They **must function 100% offline**.
*   **Robust & Self-Healing:** The tool must anticipate environment issues (locked files, missing dependencies) and degrade features gracefully rather than crashing.
*   **Privilege Adaptive:** The tool launches in the context of the current user ("Standard Mode"). It detects privilege levels and offers an in-app option to switch to "Elevated Mode" for administrative tasks.

## 2. Directory Structure & Environment

The tool relies on a relative path structure defined by \`%~dp0\` to ensure it works regardless of the source directory or drive letter.

### 2.1 File System Layout
*   **Root (\`/\`):** Contains \`run-gemini.bat\` (entry point) and \`config.txt\` (optional API key).
*   **\`/node\`:** A portable extraction of the Node.js binary (v20+ required). Can now host \`node_modules\` for a cleaner root directory.
*   **\`/logs\`:** Automatically created directory where session logs (\`.txt\`) are stored.

### 2.2 Initialization Routine
1.  **Debug Configuration (v3.3.34+):** 
    *   Checks for \`debug_level.txt\` in root.
    *   Levels: 0=Disable, 1=Critical, 2=Info, 3=Verbose ("Kitchen Sink").
    *   Logs are saved to \`GeminiCLI_Debug_log.txt\`.
2.  **Crash Protection (v3.3.28):** Initializes a startup/debug log. If locked, generates a fallback timestamped file (e.g. \`GeminiCLI_Debug_123456_log.txt\`).
3.  **Mode Detection:** Checks for admin rights using \`net session\`.
4.  **Environment Variable Injection (v3.3.31):**
    *   Prepends \`/node\` to \`%PATH%\`.
    *   Sets \`NODE_PATH\` to include nested modules.
5.  **Auto-Configuration:** Checks/creates \`package.json\`.
6.  **Deep Dependency Pre-Flight:** Checks for Gemini SDK in multiple locations.
7.  **Connectivity Check:** Pings 8.8.8.8.
8.  **Authentication:** Loads API key.

## 3. User Modes & Connectivity

### 3.1 Standard User Mode (Default)
*   **Capabilities:**
    *   Read-only diagnostics (IPConfig, System Info), Ping tests.
    *   **Enhanced Wi-Fi (v3.3.19):** View Signal Strength, Channel, BSSID, and Driver versions.
    *   User-level Temp cleanup.
*   **Restrictions:** Cannot restart services, edit HKLM registry, or clear system-level logs.
*   **Behavior:** If a user selects a restricted action (e.g., "Restart Print Spooler"), the tool displays:
    > "Access Denied: This action requires Administrator privileges. Select [E] to restart in Elevated Mode."

### 3.2 Elevated Mode (Admin)
*   **Capabilities:** Full access to Service Control Manager, Windows Update Agent, Checkpoint-Computer, and HKLM registry.
*   **Activation:** Triggered via the "Switch to Elevated Mode" menu option.

## 4. Functional Modules & Workflows

### 4.1 Network Diagnostics (Expanded v3.3.15)
*   **Workflow:**
    1.  **WAN IP Detection:** Perform 3-way redundant check with Cascade Logic (TLS 1.2 -> 1.1 -> 1.0) and User-Agent spoofing. Uses .NET Type Casting for verification.
    2.  **Interface Visualization:** PowerShell-generated table with VPN heuristics.
    3.  **Wi-Fi Deep Dive:**
        *   Capabilities Check (WPA2/WPA3 support).
        *   Neighbor Scan (BSSID/RSSI for interference detection).
        *   AutoConfig Service Status.
    4.  **Standard Comprehensive Suite:**
        *   DNS Resolution (\`nslookup\`).
        *   ARP Cache & Routing Table (\`route print\`).
        *   Interface Admin State.
    5.  **Enhancement (Online):** Gemini analyzes aggregated data.

### 4.2 Printer Fix
*   **Data Gathering (Offline):** Checks Spooler service status and job queue.
*   **Repair (Admin Only):** Restarts Spooler service, clears queue.
*   **Enhancement (Online):** Gemini analyzes specific error codes.

### 4.3 Unified Update Checkers
*   **Windows Updates (Admin Only):** Triggers \`USOClient StartScan\`. Service Repair. Native Troubleshooter.
*   **Application Updates:** Runs \`winget upgrade\`.
*   **Enhancement (Online):** Gemini parses failure codes.

### 4.4 Event Log Analysis
*   **Offline:** Exports last 14 days of Critical/Warning events.
*   **Online:** Sends JSON to Gemini for analysis.

### 4.5 Disk Cleanup (TFC Enhanced)
*   **Scout Phase:** Calculates size of Temp, Cache, and Orphans.
*   **Cleanup Phase:** Cleans \`%TEMP%\` and \`%WINDIR%\\Temp\`.
*   **Safety:** Creation of System Restore Point.
`;
