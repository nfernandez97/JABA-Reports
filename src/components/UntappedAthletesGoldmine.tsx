import { Users, AlertCircle, DollarSign, TrendingUp } from 'lucide-react';
import { PLAYFLY_MAX_PARTNERS } from '../data/playflyNetworkData';

export function UntappedAthletesGoldmine() {
  const totalAthletes = 15000;
  const monetizationRate = 0.30;
  const monetizedAthletes = Math.floor(totalAthletes * monetizationRate); // 4,500
  const idleAthletes = totalAthletes - monetizedAthletes; // 10,500

  // Idle athletes' activity (last 90 days)
  const idlePostsPerAthlete90Days = 42; // 14 posts/month * 3 months
  const idleTotalPosts = idleAthletes * idlePostsPerAthlete90Days;
  const avgEngagementsPerPost = 1250;
  const idleTotalEngagement = idleTotalPosts * avgEngagementsPerPost;
  const idleTotalEngagementMillions = idleTotalEngagement / 1000000;

  // Revenue calculations
  const avgDealValue = 2000; // $2K/year modest deal
  const halfIdleAthletes = Math.floor(idleAthletes / 2);
  const potentialNewRevenue = halfIdleAthletes * avgDealValue;

  const formatCurrency = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toFixed(0)}`;
  };

  // School-specific breakdown
  const schoolBreakdown = [
    {
      school: 'Penn State University',
      totalAthletes: 1245,
      monetized: 374,
      idle: 871,
      idleEngagement: '8.2M',
      estimatedRevenue: 1742000,
    },
    {
      school: 'Louisiana State University',
      totalAthletes: 1180,
      monetized: 354,
      idle: 826,
      idleEngagement: '7.1M',
      estimatedRevenue: 1652000,
    },
    {
      school: 'Auburn University',
      totalAthletes: 1050,
      monetized: 315,
      idle: 735,
      idleEngagement: '6.8M',
      estimatedRevenue: 1470000,
    },
    {
      school: 'Texas A&M University',
      totalAthletes: 1380,
      monetized: 414,
      idle: 966,
      idleEngagement: '8.9M',
      estimatedRevenue: 1932000,
    },
    {
      school: 'Baylor University',
      totalAthletes: 892,
      monetized: 268,
      idle: 624,
      idleEngagement: '5.4M',
      estimatedRevenue: 1248000,
    },
    {
      school: 'University of Texas at San Antonio',
      totalAthletes: 645,
      monetized: 194,
      idle: 451,
      idleEngagement: '3.2M',
      estimatedRevenue: 902000,
    },
    {
      school: 'University of Virginia',
      totalAthletes: 758,
      monetized: 227,
      idle: 531,
      idleEngagement: '4.1M',
      estimatedRevenue: 1062000,
    },
    {
      school: 'Washington State University',
      totalAthletes: 623,
      monetized: 187,
      idle: 436,
      idleEngagement: '3.5M',
      estimatedRevenue: 872000,
    },
  ];

  const totalIdleSchoolAthletes = schoolBreakdown.reduce((sum, s) => sum + s.idle, 0);
  const totalEstimatedRevenue = schoolBreakdown.reduce((sum, s) => sum + s.estimatedRevenue, 0);

  const capturedPercent = (monetizedAthletes / totalAthletes) * 100;
  const idlePercent = (idleAthletes / totalAthletes) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-3 bg-red-100 border-2 border-red-400 rounded-xl px-6 py-3 mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
          <h2 className="text-3xl font-bold text-black">THE UNTAPPED GOLDMINE: {idleAthletes.toLocaleString()} NON-MONETIZED ATHLETES</h2>
        </div>
      </div>

      {/* Main Stat */}
      <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-8 text-white mb-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="text-6xl font-bold mb-4">{capturedPercent.toFixed(0)}%</div>
          <div className="text-2xl font-semibold">
            Only {capturedPercent.toFixed(0)}% of your {totalAthletes.toLocaleString()} tracked athletes are in active brand deals.
          </div>
          <div className="text-xl mt-4">
            That means <span className="font-bold text-yellow-300">{idleAthletes.toLocaleString()} athletes</span> are posting regularly but generating ZERO revenue for Playfly.
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mb-8 bg-gray-50 rounded-xl p-8">
        <div className="max-w-lg mx-auto">
          <div className="relative w-80 h-80 mx-auto mb-6">
            <div
              className="w-full h-full rounded-full shadow-2xl"
              style={{
                background: `conic-gradient(
                  #10b981 0deg ${capturedPercent * 3.6}deg,
                  #ef4444 ${capturedPercent * 3.6}deg 360deg
                )`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full w-40 h-40 flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600">{idlePercent.toFixed(0)}%</div>
                  <div className="text-sm text-gray-600">Idle</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-green-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <div className="text-sm font-semibold text-gray-900">Monetized</div>
              </div>
              <div className="text-3xl font-bold text-green-600">{monetizedAthletes.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Generating revenue</div>
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-red-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <div className="text-sm font-semibold text-gray-900">Idle</div>
              </div>
              <div className="text-3xl font-bold text-red-600">{idleAthletes.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Active, posting, but not in deals</div>
            </div>
          </div>
        </div>
      </div>

      {/* Idle Athletes Activity */}
      <div className="mb-8 bg-red-50 border-2 border-red-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-red-900 mb-4">These {idleAthletes.toLocaleString()} idle athletes generated:</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-red-300">
            <div className="text-3xl font-bold text-red-600">{idleTotalEngagementMillions.toFixed(1)}M</div>
            <div className="text-sm text-gray-700">Total engagement (90 days)</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-300">
            <div className="text-3xl font-bold text-red-600">{(idleTotalPosts / 1000).toFixed(0)}K</div>
            <div className="text-sm text-gray-700">Posts (90 days)</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-300">
            <div className="text-3xl font-bold text-red-600">{idleTotalEngagementMillions.toFixed(1)}M</div>
            <div className="text-sm text-gray-700">Total likes/comments</div>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-red-400">
            <div className="text-3xl font-bold text-red-600">$0</div>
            <div className="text-sm text-gray-700 font-semibold">Revenue generated</div>
          </div>
        </div>
      </div>

      {/* School-by-School Breakdown */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-black mb-4">School-by-School Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="text-left p-3 text-sm font-semibold">School</th>
                <th className="text-center p-3 text-sm font-semibold">Total Athletes</th>
                <th className="text-center p-3 text-sm font-semibold">Monetized</th>
                <th className="text-center p-3 text-sm font-semibold">Idle</th>
                <th className="text-center p-3 text-sm font-semibold">Idle Engagement</th>
                <th className="text-right p-3 text-sm font-semibold">Est. Revenue If Activated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schoolBreakdown.map((school, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 text-sm font-semibold text-gray-900">{school.school}</td>
                  <td className="p-3 text-sm text-center text-gray-700">{school.totalAthletes.toLocaleString()}</td>
                  <td className="p-3 text-sm text-center">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded font-semibold">
                      {school.monetized}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-center">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded font-semibold">
                      {school.idle}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-center font-semibold text-gray-700">{school.idleEngagement}</td>
                  <td className="p-3 text-sm text-right font-bold text-green-600">
                    {formatCurrency(school.estimatedRevenue)}/year
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td className="p-3 text-sm">TOTALS</td>
                <td className="p-3 text-sm text-center">{schoolBreakdown.reduce((sum, s) => sum + s.totalAthletes, 0).toLocaleString()}</td>
                <td className="p-3 text-sm text-center text-green-700">{schoolBreakdown.reduce((sum, s) => sum + s.monetized, 0).toLocaleString()}</td>
                <td className="p-3 text-sm text-center text-red-700">{totalIdleSchoolAthletes.toLocaleString()}</td>
                <td className="p-3 text-sm text-center">-</td>
                <td className="p-3 text-sm text-right text-green-600">{formatCurrency(totalEstimatedRevenue)}/year</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-10 h-10 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold mb-4">
              If you activated just HALF of these idle athletes with even modest ${avgDealValue.toLocaleString()}/year deals:
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border-2 border-white/30">
              <div className="text-sm text-green-100 mb-2">Calculation</div>
              <div className="text-xl mb-4">
                {halfIdleAthletes.toLocaleString()} new athletes × ${avgDealValue.toLocaleString()} = {formatCurrency(potentialNewRevenue)} new revenue
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-yellow-300" />
                <div>
                  <div className="text-4xl font-bold text-yellow-300">{formatCurrency(potentialNewRevenue)}</div>
                  <div className="text-sm text-green-100">Annual new revenue opportunity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Message */}
      <div className="mt-6 text-center">
        <div className="text-2xl font-bold text-gray-900">
          You're leaving {idleAthletes.toLocaleString()} athletes on the sidelines. Here's what they're worth if you mobilize them.
        </div>
      </div>
    </div>
  );
}
