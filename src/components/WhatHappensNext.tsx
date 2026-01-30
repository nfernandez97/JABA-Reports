import { Download, Circle } from 'lucide-react';
import { generateExecutiveReportPDF } from '../utils/pdfExport';

export function WhatHappensNext() {
  const opportunityLow = 17000000; // $17M
  const opportunityHigh = 30000000; // $30M

  const formatCurrency = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(0)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toFixed(0)}`;
  };

  const handleDownload = () => {
    try {
      generateExecutiveReportPDF();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const options = [
    {
      number: 1,
      title: 'Do nothing.',
      description: 'Continue optimizing at current pace. You'll capture maybe 5-10% of this opportunity over 3 years.',
      color: 'gray',
    },
    {
      number: 2,
      title: 'Hire a consultant.',
      description: 'Spend $100K+ to tell you what this report already shows. 6-month engagement. Same conclusion.',
      color: 'yellow',
    },
    {
      number: 3,
      title: 'Get to work.',
      description: 'Use this data. Start with the quick wins:',
      color: 'green',
      actionItems: [
        'Reprice top 500 athletes (this month)',
        'Launch IP premium pricing (this quarter)',
        'Identify and target top 2K idle athletes (this quarter)',
        'Measure. Optimize. Scale.',
      ],
      revenueImpact: [
        { period: 'Year 1', range: '+$3-5M' },
        { period: 'Year 2', range: '+$15-20M' },
        { period: 'Year 3', range: '+$22-30M+' },
      ],
    },
  ];

  const getOptionColor = (color: string) => {
    switch (color) {
      case 'gray':
        return 'border-gray-300 bg-gray-50';
      case 'yellow':
        return 'border-yellow-300 bg-yellow-50';
      case 'green':
        return 'border-green-400 bg-green-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getNumberColor = (color: string) => {
    switch (color) {
      case 'gray':
        return 'bg-gray-400 text-white';
      case 'yellow':
        return 'bg-yellow-500 text-white';
      case 'green':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-black mb-6">WHAT HAPPENS NEXT?</h2>
        <div className="text-2xl text-gray-900 mb-2">
          You have <span className="font-bold text-blue-600">{formatCurrency(opportunityLow)}-{formatCurrency(opportunityHigh)}</span> sitting on the table.
        </div>
      </div>

      {/* Three Options */}
      <div className="mb-8">
        <div className="text-lg font-bold text-black mb-4">Three options:</div>
        <div className="space-y-4">
          {options.map((option) => (
            <div
              key={option.number}
              className={`border-2 ${getOptionColor(option.color)} rounded-xl p-6 ${
                option.number === 3 ? 'shadow-lg' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full ${getNumberColor(option.color)} flex items-center justify-center flex-shrink-0 font-bold text-xl shadow-md`}>
                  {option.number}
                </div>
                <div className="flex-1">
                  <div className="text-lg font-bold text-gray-900 mb-2">{option.title}</div>
                  <div className="text-sm text-gray-700 mb-3">{option.description}</div>

                  {/* Action Items (Option 3 only) */}
                  {option.actionItems && (
                    <div className="mb-4">
                      <ul className="space-y-2">
                        {option.actionItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-900">
                            <Circle className="w-2 h-2 fill-green-600 text-green-600 mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Revenue Impact (Option 3 only) */}
                  {option.revenueImpact && (
                    <div className="bg-white rounded-lg p-4 border-2 border-green-400">
                      <div className="text-sm font-semibold text-green-900 mb-2">Revenue impact:</div>
                      <div className="grid grid-cols-3 gap-3">
                        {option.revenueImpact.map((impact, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-xs text-gray-600 mb-1">{impact.period}</div>
                            <div className="text-lg font-bold text-green-600">{impact.range}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Statement */}
      <div className="mb-8 bg-gray-900 rounded-xl p-8 text-white">
        <div className="space-y-4 text-center">
          <div className="text-xl">The data is clear. The opportunity is real. The effort is significant but manageable.</div>
          <div className="text-2xl font-bold">
            The question isn't whether this is possible. The question is whether you're going to do it.
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center">
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-200 text-lg font-semibold"
        >
          <Download className="w-6 h-6" />
          Download This Report
        </button>
        <div className="text-sm text-gray-600 mt-3">Share internally. Make the case. Get started.</div>
      </div>
    </div>
  );
}
