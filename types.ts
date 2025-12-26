
export enum ReportType {
  DESIGN_DOC = 'DESIGN_DOC',
  GAP_ANALYSIS = 'GAP_ANALYSIS',
  CRASH_LOGS = 'CRASH_LOGS',
  SCRIPT_SOURCE = 'SCRIPT_SOURCE',
  AI_SCRIPTS = 'AI_SCRIPTS'
}

export interface ReportSection {
  id: string;
  title: string;
  status: 'missing' | 'partial' | 'implemented' | 'critical';
  details: string;
}
