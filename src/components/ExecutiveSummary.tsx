import { TrendingUp, DollarSign, Award, Users, BarChart3, Globe } from 'lucide-react';

export function ExecutiveSummary() {
  return (
    <div className="bg-white border-2 border-[#1770C0] rounded-2xl p-8 shadow-sm">
      {/* Headline */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#091831] tracking-wide mb-2">
          THE PLAYFLY OPPORTUNITY IN NUMBERS
        </h2>
        <div className="h-1 w-24 bg-[#1770C0]" />
      </div>

      {/* Three Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Network Reach & Scale */}
        <div className="bg-white rounded-xl p-6 border-t-4 border-[#1770C0] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#1770C0] flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#091831]">
              Network Reach & Scale
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#1770C0]">252,171</span>
              <span className="text-sm text-gray-700">social media posts tracked</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#1770C0]">40+</span>
              <span className="text-sm text-gray-700">college athletic departments</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#1770C0]">15,000+</span>
              <span className="text-sm text-gray-700">student-athletes generating content</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#1770C0]">450M+</span>
              <span className="text-sm text-gray-700">total followers across platforms</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#1770C0]">2,200+</span>
              <span className="text-sm text-gray-700">brand partnership opportunities</span>
            </div>
          </div>
        </div>

        {/* Card 2: Revenue Potential */}
        <div className="bg-white rounded-xl p-6 border-t-4 border-[#1770C0] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#1770C0] flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#091831]">
              Revenue Potential
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#1770C0]">2.5X</span>
              <span className="text-sm text-gray-700">higher revenue growth vs. industry avg</span>
            </div>

            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#1770C0]">+45%</span>
              <span className="text-sm text-gray-700">engagement lift with IP-driven content</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-[#1770C0]" />
                <span className="text-sm font-semibold text-[#091831]">Multi-Platform Dominance</span>
              </div>
              <span className="text-xs text-gray-700">Instagram + TikTok coverage</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-[#1770C0]" />
                <span className="text-sm font-semibold text-[#091831]">Proven Brand Partners</span>
              </div>
              <span className="text-xs text-gray-700">Nike, Wegmans, Sheetz, H-E-B, Raising Cane's</span>
            </div>
          </div>
        </div>

        {/* Card 3: Competitive Advantage */}
        <div className="bg-white rounded-xl p-6 border-t-4 border-[#1770C0] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#1770C0] flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#091831]">
              Competitive Advantage
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-[#1770C0]" />
                <span className="text-sm font-semibold text-[#091831]">Exclusive Conference Partnerships</span>
              </div>
              <span className="text-xs text-gray-700">Big Ten, Big East, Pac-12 access</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-[#1770C0]" />
                <span className="text-sm font-semibold text-[#091831]">Proprietary Athlete Data</span>
              </div>
              <span className="text-xs text-gray-700">90-day rolling analytics & insights</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-[#1770C0]" />
                <span className="text-sm font-semibold text-[#091831]">Performance Benchmarking</span>
              </div>
              <span className="text-xs text-gray-700">Branded vs. organic content comparison</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-[#1770C0]" />
                <span className="text-sm font-semibold text-[#091831]">End-to-End Management</span>
              </div>
              <span className="text-xs text-gray-700">Campaign creation through execution</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stat Bar */}
      <div className="mt-6 pt-6 border-t border-[#1770C0]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#1770C0]">8</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Playfly MAX Schools</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#1770C0]">18-45%</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Avg Engagement Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#1770C0]">$45M+</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Expansion Opportunity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#1770C0]">+52%</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Collaboration Lift</div>
          </div>
        </div>
      </div>
    </div>
  );
}
