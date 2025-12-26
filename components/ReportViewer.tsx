
import React from 'react';

interface ReportViewerProps {
  content: string;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({ content }) => {
  if (typeof content !== 'string') {
    return (
       <div className="max-w-none p-6 bg-gray-800 rounded-lg shadow-sm border border-gray-700 h-full flex items-center justify-center">
         <p className="text-gray-500 italic">No content available to display.</p>
       </div>
    );
  }
  
  return (
    <div className="max-w-none p-6 bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-y-auto h-full">
      <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300 leading-relaxed">
        {content}
      </pre>
    </div>
  );
};
