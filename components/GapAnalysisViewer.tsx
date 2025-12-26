
import React from 'react';
import { ReportSection } from '../types';

interface GapAnalysisViewerProps {
  report: ReportSection[];
}

export const GapAnalysisViewer: React.FC<GapAnalysisViewerProps> = ({ report }) => {
  if (!report) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-400 font-medium">Error: Report data is missing or failed to load.</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-900/30 text-red-200 border-red-800';
      case 'missing': return 'bg-orange-900/30 text-orange-200 border-orange-800';
      case 'partial': return 'bg-yellow-900/30 text-yellow-200 border-yellow-800';
      case 'implemented': return 'bg-green-900/30 text-green-200 border-green-800';
      default: return 'bg-gray-800 text-gray-300';
    }
  };

  const criticalCount = report.filter(r => r.status === 'critical').length;
  const missingCount = report.filter(r => r.status === 'missing').length;

  return (
    <div className="space-y-6 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-lg">
          <div className="text-2xl font-bold text-red-400">{criticalCount}</div>
          <div className="text-sm text-red-300/70 font-medium">Critical Issues</div>
        </div>
        <div className="p-4 bg-orange-900/20 border border-orange-900/50 rounded-lg">
          <div className="text-2xl font-bold text-orange-400">{missingCount}</div>
          <div className="text-sm text-orange-300/70 font-medium">Missing Features</div>
        </div>
        <div className="p-4 bg-blue-900/20 border border-blue-900/50 rounded-lg">
          <div className="text-2xl font-bold text-blue-400">{report.length}</div>
          <div className="text-sm text-blue-300/70 font-medium">Total Findings</div>
        </div>
      </div>

      <div className="space-y-4">
        {report.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-lg border border-gray-700 shadow-sm overflow-hidden hover:border-gray-600 transition-colors duration-200">
            <div className="p-5 border-b border-gray-700/50 bg-gray-900/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
                <h3 className="font-semibold text-gray-100">{item.title}</h3>
              </div>
              <span className="text-xs font-mono text-gray-500">Ref: {item.id}</span>
            </div>
            <div className="p-5">
              <p className="text-gray-300 leading-relaxed text-sm">
                {item.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
