import { useState } from 'react';
import { AlertTriangle, CheckCircle2, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';

interface SchoolPerformance {
  schoolName: string;
  athletesTracked: number;
  currentRevenue: number;
  revenuePerAthlete: number;
  monetizationRate: number;
  peerBenchmark: number;
  revenueGap: number;
  actionNeeded: 'GREEN' | 'YELLOW' | 'RED';
  conference: string;
}

export function SchoolRevenuePerformance() {
  // Peer benchmarks by conference
  const peerBenchmarks: Record<string, number> = {
    'Big Ten': 8500,
    'SEC': 5800,
    'Big 12': 6200,
    'ACC': 5400,
    'Mountain West': 4200,
  };

  const schoolData: SchoolPerformance[] = [
    {
      schoolName: 'Penn State University',
      conference: 'Big Ten',
      athletesTracked: 1245,
      currentRevenue: 4200000,
      revenuePerAthlete: 3373,
      monetizationRate: 0.30,
      peerBenchmark: peerBenchmarks['Big Ten'],
      revenueGap: (peerBenchmarks['Big Ten'] - 3373) * 1245,
      actionNeeded: 'RED',
    },
    {
      schoolName: 'Louisiana State University',
      conference: 'SEC',
      athletesTracked: 1180,
      currentRevenue: 3800000,
      revenuePerAthlete: 3220,
      monetizationRate: 0.28,
      peerBenchmark: peerBenchmarks['SEC'],
      revenueGap: (peerBenchmarks['SEC'] - 3220) * 1180,
      actionNeeded: 'RED',
    },
    {
      schoolName: 'Auburn University',
      conference: 'SEC',
      athletesTracked: 1050,
      currentRevenue: 2800000,
      revenuePerAthlete: 2667,
      monetizationRate: 0.22,
      peerBenchmark: peerBenchmarks['SEC'],
      revenueGap: (peerBenchmarks['SEC'] - 2667) * 1050,
      actionNeeded: 'RED',
    },
    {
      schoolName: 'Texas A&M University',
      conference: 'SEC',
      athletesTracked: 1380,
      currentRevenue: 3900000,
      revenuePerAthlete: 2826,
      monetizationRate: 0.25,
      peerBenchmark: peerBenchmarks['SEC'],
      revenueGap: (peerBenchmarks['SEC'] - 2826) * 1380,
      actionNeeded: 'RED',
    },
    {
      schoolName: 'Baylor University',
      conference: 'Big 12',
      athletesTracked: 892,
      currentRevenue: 2100000,
      revenuePerAthlete: 2354,
      monetizationRate: 0.23,
      peerBenchmark: peerBenchmarks['Big 12'],
      revenueGap: (peerBenchmarks['Big 12'] - 2354) * 892,
      actionNeeded: 'RED',
    },
    {
      schoolName: 'University of Texas at San Antonio',
      conference: 'ACC',
      athletesTracked: 645,
      currentRevenue: 1850000,
      revenuePerAthlete: 2868,
      monetizationRate: 0.27,
      peerBenchmark: peerBenchmarks['ACC'],
      revenueGap: (peerBenchmarks['ACC'] - 2868) * 645,
      actionNeeded: 'RED',
    },
    {
      schoolName: 'University of Virginia',
      conference: 'ACC',
      athletesTracked: 758,
      currentRevenue: 2300000,
      revenuePerAthlete: 3034,
      monetizationRate: 0.29,
      peerBenchmark: peerBenchmarks['ACC'],
      revenueGap: (peerBenchmarks['ACC'] - 3034) * 758,
      actionNeeded: 'RED',
    },
    {
      schoolName: 'Washington State University',
      conference: 'Mountain West',
      athletesTracked: 623,
      currentRevenue: 1650000,
      revenuePerAthlete: 2649,
      monetizationRate: 0.26,
      peerBenchmark: peerBenchmarks['Mountain West'],
      revenueGap: (peerBenchmarks['Mountain West'] - 2649) * 623,
      actionNeeded: 'YELLOW',
    },
  ];

  const [sortConfig, setSortConfig] = useState<{ key: keyof SchoolPerformance; direction: 'asc' | 'desc' }>({
    key: 'revenueGap',
    direction: 'desc',
  });

  const sortedData = [...schoolData].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const handleSort = (key: keyof SchoolPerformance) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const formatCurrency = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toFixed(0)}`;
  };

  const formatPercent = (num: number): string => {
    return `${(num * 100).toFixed(0)}%`;
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'RED':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-900 text-xs font-bold rounded-full flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            VERY HIGH
          </span>
        );
      case 'YELLOW':
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-900 text-xs font-bold rounded-full flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            HIGH
          </span>
        );
      case 'GREEN':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-900 text-xs font-bold rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            OPTIMIZED
          </span>
        );
      default:
        return null;
    }
  };

  const getRowColor = (action: string) => {
    switch (action) {
      case 'RED':
        return 'bg-red-50 hover:bg-red-100';
      case 'YELLOW':
        return 'bg-yellow-50 hover:bg-yellow-100';
      case 'GREEN':
        return 'bg-green-50 hover:bg-green-100';
      default:
        return 'hover:bg-gray-50';
    }
  };

  const totalRevenueGap = schoolData.reduce((sum, school) => sum + school.revenueGap, 0);
  const redSchools = schoolData.filter(s => s.revenueGap > 500000).length;
  const yellowSchools = schoolData.filter(s => s.revenueGap >= 200000 && s.revenueGap <= 500000).length;
  const greenSchools = schoolData.filter(s => s.revenueGap < 200000).length;

  const SortIcon = ({ column }: { column: keyof SchoolPerformance }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black tracking-wide mb-2">
          SCHOOL-BY-SCHOOL REVENUE PERFORMANCE
        </h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-red-600 to-orange-600" />
        <p className="text-gray-700 mt-3 text-lg">
          Not all schools are equal. Some are monetizing well. Others are leaving serious money on the table.
        </p>
      </div>

      {/* Performance Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th
                className="text-left p-3 text-sm font-semibold cursor-pointer hover:bg-gray-800"
                onClick={() => handleSort('schoolName')}
              >
                <div className="flex items-center gap-2">
                  School Name
                  <SortIcon column="schoolName" />
                </div>
              </th>
              <th
                className="text-center p-3 text-sm font-semibold cursor-pointer hover:bg-gray-800"
                onClick={() => handleSort('athletesTracked')}
              >
                <div className="flex items-center justify-center gap-2">
                  Athletes Tracked
                  <SortIcon column="athletesTracked" />
                </div>
              </th>
              <th
                className="text-right p-3 text-sm font-semibold cursor-pointer hover:bg-gray-800"
                onClick={() => handleSort('currentRevenue')}
              >
                <div className="flex items-center justify-end gap-2">
                  Current Est. Revenue
                  <SortIcon column="currentRevenue" />
                </div>
              </th>
              <th
                className="text-right p-3 text-sm font-semibold cursor-pointer hover:bg-gray-800"
                onClick={() => handleSort('revenuePerAthlete')}
              >
                <div className="flex items-center justify-end gap-2">
                  Revenue/Athlete
                  <SortIcon column="revenuePerAthlete" />
                </div>
              </th>
              <th
                className="text-center p-3 text-sm font-semibold cursor-pointer hover:bg-gray-800"
                onClick={() => handleSort('monetizationRate')}
              >
                <div className="flex items-center justify-center gap-2">
                  Monetization Rate
                  <SortIcon column="monetizationRate" />
                </div>
              </th>
              <th
                className="text-right p-3 text-sm font-semibold cursor-pointer hover:bg-gray-800"
                onClick={() => handleSort('peerBenchmark')}
              >
                <div className="flex items-center justify-end gap-2">
                  Peer Benchmark
                  <SortIcon column="peerBenchmark" />
                </div>
              </th>
              <th
                className="text-right p-3 text-sm font-semibold cursor-pointer hover:bg-gray-800"
                onClick={() => handleSort('revenueGap')}
              >
                <div className="flex items-center justify-end gap-2">
                  Revenue Gap
                  <SortIcon column="revenueGap" />
                </div>
              </th>
              <th className="text-center p-3 text-sm font-semibold">Action Needed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData.map((school, index) => (
              <tr key={index} className={`${getRowColor(school.actionNeeded)} transition-colors`}>
                <td className="p-3 text-sm font-semibold text-gray-900">
                  <div>{school.schoolName}</div>
                  <div className="text-xs text-gray-600 mt-1">{school.conference}</div>
                </td>
                <td className="p-3 text-sm text-center text-gray-700">
                  {school.athletesTracked.toLocaleString()}
                </td>
                <td className="p-3 text-sm text-right font-bold text-gray-900">
                  {formatCurrency(school.currentRevenue)}
                </td>
                <td className="p-3 text-sm text-right text-gray-700">
                  {formatCurrency(school.revenuePerAthlete)}
                </td>
                <td className="p-3 text-sm text-center">
                  <span className={`px-2 py-1 rounded font-semibold ${
                    school.monetizationRate >= 0.30
                      ? 'bg-green-100 text-green-800'
                      : school.monetizationRate >= 0.25
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {formatPercent(school.monetizationRate)}
                  </span>
                </td>
                <td className="p-3 text-sm text-right text-gray-700">
                  {formatCurrency(school.peerBenchmark)}
                  <div className="text-xs text-gray-500 mt-1">{school.conference} avg</div>
                </td>
                <td className="p-3 text-sm text-right">
                  <span className={`font-bold ${
                    school.revenueGap > 500000
                      ? 'text-red-600'
                      : school.revenueGap >= 200000
                      ? 'text-yellow-700'
                      : 'text-green-600'
                  }`}>
                    {school.revenueGap > 0 ? '-' : '+'}{formatCurrency(Math.abs(school.revenueGap))}
                  </span>
                </td>
                <td className="p-3 text-sm text-center">
                  {getActionBadge(school.actionNeeded)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div className="text-sm font-semibold text-red-900">Urgent Action Needed</div>
          </div>
          <div className="text-4xl font-bold text-red-600 mb-1">{redSchools}</div>
          <div className="text-xs text-red-700">Schools with {'>'}$500K gap</div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
            <div className="text-sm font-semibold text-yellow-900">High Priority</div>
          </div>
          <div className="text-4xl font-bold text-yellow-600 mb-1">{yellowSchools}</div>
          <div className="text-xs text-yellow-700">Schools with $200K-$500K gap</div>
        </div>

        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <div className="text-sm font-semibold text-green-900">Performing Well</div>
          </div>
          <div className="text-4xl font-bold text-green-600 mb-1">{greenSchools}</div>
          <div className="text-xs text-green-700">Schools with {'<'}$200K gap</div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="text-center">
          <div className="text-2xl font-semibold mb-4">
            Combined, these schools have a <span className="font-bold text-yellow-300">{formatCurrency(totalRevenueGap)}</span> revenue opportunity gap.
          </div>
          <div className="text-lg">
            The reason: lower monetization rates, lower deal values, or both.
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="text-sm font-semibold text-gray-700 mb-3">📉 Underperforming Schools</div>
          <ul className="space-y-2 text-sm text-gray-700">
            {sortedData
              .filter(s => s.actionNeeded === 'RED')
              .slice(0, 3)
              .map((school, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span>
                    <strong>{school.schoolName}</strong> - {formatPercent(school.monetizationRate)} monetization, leaving {formatCurrency(school.revenueGap)} on table
                  </span>
                </li>
              ))}
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="text-sm font-semibold text-gray-700 mb-3">📈 Top Performers</div>
          <ul className="space-y-2 text-sm text-gray-700">
            {sortedData
              .filter(s => s.monetizationRate >= 0.28)
              .slice(0, 3)
              .map((school, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>
                    <strong>{school.schoolName}</strong> - {formatPercent(school.monetizationRate)} monetization, {formatCurrency(school.currentRevenue)} revenue
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
