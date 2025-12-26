

import { ReportSection } from '../types';

export const gapAnalysisReport: ReportSection[] = [
  {
    id: 'CRITICAL-1',
    title: 'Broken Navigation Logic',
    status: 'implemented',
    details: 'VERIFIED v3.3.6: All menu labels (:printer_fix, :event_logs, etc.) are present and logically reachable via the dashboard choice command.'
  },
  {
    id: 'CRITICAL-2',
    title: 'Universal Pathing (USB/UNC)',
    status: 'implemented',
    details: 'VERIFIED v3.3.6: Script initializes with "pushd %~dp0". Elevation routine explicitly passes the working directory to the Admin process, ensuring UNC path stability.'
  },
  {
    id: 'LOG-2',
    title: 'Startup Log Robustness',
    status: 'implemented',
    details: 'VERIFIED v3.3.6: Implements fallback timestamped filenames (e.g., GeminiCLI_Debug_123456_log.txt) and uses .txt extension for main debug log, ensuring crash data is never lost.'
  },
  {
    id: 'LOG-3',
    title: 'Real-Time Console Debugging',
    status: 'implemented',
    details: 'VERIFIED v3.3.14: When Debug Level is set to 3 (Kitchen Sink), all debug logs are echoed to the console in real-time while simultaneously writing to the crash log.'
  },
  {
    id: 'DEP-1',
    title: 'Dependency Pre-Flight Check',
    status: 'implemented',
    details: 'VERIFIED v3.3.6: Script performs a "Deep Check" for node_modules\@google\genai\package.json. Safely disables AI features if the specific SDK package is missing, preventing Node crashes.'
  },
  {
    id: 'NET-2',
    title: 'WAN IP & VPN Visibility',
    status: 'implemented',
    details: 'EXCEEDS SPEC v3.3.13: Implements Type Casting ([ipaddress]) validation for WAN IP. Replaces fragile regex, successfully parsing IPs even when headers or encoding vary. Retains verbose debugging.'
  },
  {
    id: 'NET-3',
    title: 'Wi-Fi Deep Dive',
    status: 'implemented',
    details: 'VERIFIED v3.3.15: Now includes "netsh wlan show capabilities" (WPA support) and "show networks mode=bssid" (interference detection), plus AutoConfig service checks.'
  },
  {
    id: 'NET-4',
    title: 'Comprehensive Network Suite',
    status: 'implemented',
    details: 'EXCEEDS SPEC v3.3.15: "Standard Diagnostics" now includes DNS Resolution (nslookup), ARP Cache, Routing Table (route print), and Interface Admin State.'
  },
  {
    id: 'ARCH-1',
    title: 'Privilege Adaptive Mode',
    status: 'implemented',
    details: 'VERIFIED v3.3.6: "Standard User" is the default state. Elevation is only triggered via the [E] menu option, fulfilling the "Standard User Mode" requirement.'
  },
  {
    id: 'INIT-1',
    title: 'Telemetry & Connectivity',
    status: 'implemented',
    details: 'VERIFIED v3.3.6: Connectivity check (8.8.8.8) is active. Telemetry switched from Get-CimInstance (Win32_OperatingSystem/ComputerSystem) to prevent startup hangs.'
  },
  {
    id: 'UPD-1',
    title: 'Windows System Updates',
    status: 'implemented',
    details: 'EXCEEDS SPEC v3.3.6: Implements Scan, Repair, and explicitly adds the Native Windows Update Troubleshooter (msdt.exe) as a robust fallback option.'
  },
  {
    id: 'UPD-2',
    title: 'Application Updates',
    status: 'implemented',
    details: 'VERIFIED v3.3.6: "winget upgrade" is implemented within the Updates sub-menu, supporting the application management requirement.'
  },
  {
    id: 'DISK-1',
    title: 'Disk Cleanup & Safety',
    status: 'implemented',
    details: 'VERIFIED v3.3.6: Implements the "Safety" requirement by attempting "Checkpoint-Computer" (System Restore Point) before executing Admin-level deletion of %WINDIR%\\Temp.'
  },
  {
    id: 'LOG-1',
    title: 'Logging & Persistence',
    status: 'implemented',
    details: 'VERIFIED v3.3.6: Session logs are generated with timestamps in the /logs directory. All major actions append output to %LOGFILE%.'
  },
  {
    id: 'AI-1',
    title: 'AI/Gemini Integration',
    status: 'implemented',
    details: 'VERIFIED v3.3.7: Switched to CommonJS (.cjs) modules to resolve NODE_PATH limitations with portable ESM installs. Scripts are now executed from root using relative paths.'
  }
];