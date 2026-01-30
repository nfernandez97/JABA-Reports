import { Check, X, Database, Lock, Layers, Award, Zap } from 'lucide-react';

export function CompetitivePositioning() {
  const competitiveAdvantages = [
    {
      category: 'Data Infrastructure',
      icon: Database,
      playflyFeatures: [
        'Proprietary 90-day rolling analytics',
        'Real-time engagement benchmarking',
        'IP performance lift tracking',
        'Automated reporting & insights',
      ],
      competitorLack: 'Only offers basic metrics',
    },
    {
      category: 'Exclusive Access',
      icon: Lock,
      playflyFeatures: [
        'Conference-level partnerships (Big Ten, Pac-12, Big East)',
        '40+ schools (rivals have <20)',
        'Direct athlete relationships',
        'Multi-year partnership agreements',
      ],
      competitorLack: 'Fragmented school-by-school approach',
    },
    {
      category: 'Services Integration',
      icon: Layers,
      playflyFeatures: [
        'Media Rights + Sponsorship + Advisory (3-in-1)',
        'End-to-end campaign management',
        'Athlete task scheduling & deliverables',
        'Brand partnership facilitation',
      ],
      competitorLack: 'Single service offering only',
    },
    {
      category: 'Brand Trust',
      icon: Award,
      playflyFeatures: [
        'Proven results (Nike, Wegmans, Sheetz, H-E-B)',
        'Consistent 2.5X revenue growth',
        'Multi-year brand partnerships',
        '100% MAX tier retention rate',
      ],
      competitorLack: 'High brand churn rate',
    },
    {
      category: 'Scalability',
      icon: Zap,
      playflyFeatures: [
        'Platform tech-enabled (not consultant-driven)',
        'Repeatable playbook across schools',
        'Automated workflow systems',
        'Standardized onboarding process',
      ],
      competitorLack: 'Manual processes, not scalable',
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black tracking-wide mb-2">
          PLAYFLY'S STRUCTURAL ADVANTAGES
        </h2>
        <div className="h-1 w-24 bg-green-600" />
        <p className="text-gray-600 mt-3">
          Competitive moats that create sustainable barriers to entry
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {competitiveAdvantages.map((advantage, index) => {
          const Icon = advantage.icon;

          return (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black">{advantage.category}</h3>
              </div>

              {/* Playfly Features */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600 font-bold" />
                  </div>
                  <span className="text-xs font-bold text-green-900">PLAYFLY</span>
                </div>
                <div className="space-y-2">
                  {advantage.playflyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitor Lack */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="w-4 h-4 text-red-600 font-bold" />
                  </div>
                  <span className="text-xs font-bold text-red-900">COMPETITORS</span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{advantage.competitorLack}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Comparison Table */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
        <h3 className="text-lg font-bold text-black mb-4">Head-to-Head Comparison</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-green-300">
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-900">Capability</th>
                <th className="text-center py-3 px-4 text-sm font-bold text-green-900">Playfly</th>
                <th className="text-center py-3 px-4 text-sm font-bold text-red-900">Typical Competitor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-200">
              <tr className="hover:bg-white transition-colors">
                <td className="py-3 px-4 text-sm text-gray-700">90-day rolling analytics</td>
                <td className="py-3 px-4 text-center">
                  <Check className="w-5 h-5 text-green-600 mx-auto" />
                </td>
                <td className="py-3 px-4 text-center">
                  <X className="w-5 h-5 text-red-600 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-white transition-colors">
                <td className="py-3 px-4 text-sm text-gray-700">Conference partnerships</td>
                <td className="py-3 px-4 text-center">
                  <Check className="w-5 h-5 text-green-600 mx-auto" />
                </td>
                <td className="py-3 px-4 text-center">
                  <X className="w-5 h-5 text-red-600 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-white transition-colors">
                <td className="py-3 px-4 text-sm text-gray-700">3-in-1 service integration</td>
                <td className="py-3 px-4 text-center">
                  <Check className="w-5 h-5 text-green-600 mx-auto" />
                </td>
                <td className="py-3 px-4 text-center">
                  <X className="w-5 h-5 text-red-600 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-white transition-colors">
                <td className="py-3 px-4 text-sm text-gray-700">Proven brand partnerships</td>
                <td className="py-3 px-4 text-center">
                  <Check className="w-5 h-5 text-green-600 mx-auto" />
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-xs text-gray-600">Limited</span>
                </td>
              </tr>
              <tr className="hover:bg-white transition-colors">
                <td className="py-3 px-4 text-sm text-gray-700">Tech-enabled scalability</td>
                <td className="py-3 px-4 text-center">
                  <Check className="w-5 h-5 text-green-600 mx-auto" />
                </td>
                <td className="py-3 px-4 text-center">
                  <X className="w-5 h-5 text-red-600 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-white transition-colors">
                <td className="py-3 px-4 text-sm text-gray-700">School network size</td>
                <td className="py-3 px-4 text-center">
                  <span className="text-sm font-bold text-green-900">40+</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-sm font-bold text-red-900">&lt;20</span>
                </td>
              </tr>
              <tr className="hover:bg-white transition-colors">
                <td className="py-3 px-4 text-sm text-gray-700">MAX tier retention</td>
                <td className="py-3 px-4 text-center">
                  <span className="text-sm font-bold text-green-900">100%</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-sm font-bold text-red-900">&lt;70%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white text-center">
        <div className="text-2xl font-bold mb-2">5 Structural Moats = Defensible Market Position</div>
        <div className="text-green-100">
          Each advantage compounds over time, making it increasingly difficult for competitors to replicate Playfly's model
        </div>
      </div>
    </div>
  );
}
