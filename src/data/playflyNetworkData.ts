/**
 * Playfly Network Data & Metrics
 *
 * This file contains all network-level metrics, partner school data,
 * and performance analytics for the Playfly Sports partnership ecosystem.
 */

// ============================================
// INTERFACES & TYPES
// ============================================

export interface NetworkMetrics {
  totalPostsTracked: number;
  totalPartnerSchools: number;
  totalAthletesTracked: number;
  aggregateLikes: number;
  aggregateComments: number;
  totalFollowers: number;
  averageEngagementRate: number;
  revenueGrowthMultiplier: number;
}

export enum PlayflyPartnerTier {
  MAX = 'MAX',
  STANDARD = 'STANDARD',
  CONFERENCE_PARTNERSHIP = 'CONFERENCE_PARTNERSHIP',
}

export interface NinetyDayMetrics {
  followers: number;
  likes: number;
  comments: number;
  contentCount: number;
  logoContentCount: number;
  avgEngagementRateWithLogo: number;
  avgEngagementRateWithoutLogo: number;
  engagementRateLogoLift: number;
  avgLikesWithLogo: number;
  avgLikesWithoutLogo: number;
  likesLogoLift: number;
  avgCommentsWithLogo: number;
  avgCommentsWithoutLogo: number;
  commentsLogoLift: number;
  collaborationContentCount: number;
  avgEngagementRateWithCollaboration: number;
  avgEngagementRateWithoutCollaboration: number;
  engagementRateCollaborationLift: number;
}

export interface SchoolPartner {
  schoolId: string;
  schoolName: string;
  mascot: string;
  conference: string;
  tier: PlayflyPartnerTier;
  partnershipStartDate: Date;
  athletesTracked: number;
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  averageEngagementRate: number;
  activeBrands: string[];
  topAthletesCount: number;
  mainSports: string[];
  instagramFollowers: number;
  tiktokFollowers: number;
  ipPerformanceLift: number;
  brandedContentLift: number;
  collaborationLift: number;
  rollingSocietyMetrics?: NinetyDayMetrics;
}

export interface ConferenceDistribution {
  conferenceName: string;
  schoolCount: number;
  percentageOfNetwork: number;
  totalAthletesInConference: number;
  aggregateEngagementRate: number;
}

// ============================================
// PLAYFLY MAX PARTNERS (Premium Tier)
// ============================================

export const PLAYFLY_MAX_PARTNERS: SchoolPartner[] = [
  {
    schoolId: 'auburn',
    schoolName: 'Auburn University',
    mascot: 'Tigers',
    conference: 'SEC',
    tier: PlayflyPartnerTier.MAX,
    partnershipStartDate: new Date('2022-07-01'),
    athletesTracked: 485,
    totalPosts: 6200,
    totalLikes: 8500000,
    totalComments: 245000,
    averageEngagementRate: 0.42,
    activeBrands: ['Nike', 'Coca-Cola', 'Buffalo Wild Wings', 'AT&T'],
    topAthletesCount: 45,
    mainSports: ['Football', 'Basketball', 'Baseball', 'Gymnastics'],
    instagramFollowers: 95000000,
    tiktokFollowers: 32000000,
    ipPerformanceLift: 45,
    brandedContentLift: 38,
    collaborationLift: 52,
  },
  {
    schoolId: 'baylor',
    schoolName: 'Baylor University',
    mascot: 'Bears',
    conference: 'Big 12',
    tier: PlayflyPartnerTier.MAX,
    partnershipStartDate: new Date('2022-01-01'),
    athletesTracked: 421,
    totalPosts: 5727,
    totalLikes: 5096433,
    totalComments: 199140,
    averageEngagementRate: 1.9046,
    activeBrands: ['Dr Pepper', 'Adidas', 'Whataburger', 'H-E-B'],
    topAthletesCount: 38,
    mainSports: ['Football', 'Basketball', 'Volleyball', 'Equestrian'],
    instagramFollowers: 78000000,
    tiktokFollowers: 28000000,
    ipPerformanceLift: 45,
    brandedContentLift: 38,
    collaborationLift: 52,
  },
  {
    schoolId: 'lsu',
    schoolName: 'Louisiana State University',
    mascot: 'Tigers',
    conference: 'SEC',
    tier: PlayflyPartnerTier.MAX,
    partnershipStartDate: new Date('2021-09-01'),
    athletesTracked: 520,
    totalPosts: 6850,
    totalLikes: 9200000,
    totalComments: 278000,
    averageEngagementRate: 0.48,
    activeBrands: ['Nike', 'Raising Cane\'s', 'Smoothie King', 'Gatorade'],
    topAthletesCount: 52,
    mainSports: ['Football', 'Basketball', 'Baseball', 'Gymnastics', 'Track & Field'],
    instagramFollowers: 102000000,
    tiktokFollowers: 35000000,
    ipPerformanceLift: 45,
    brandedContentLift: 38,
    collaborationLift: 52,
  },
  {
    schoolId: 'penn-state',
    schoolName: 'Penn State University',
    mascot: 'Nittany Lions',
    conference: 'Big Ten',
    tier: PlayflyPartnerTier.MAX,
    partnershipStartDate: new Date('2021-07-01'),
    athletesTracked: 565,
    totalPosts: 7204,
    totalLikes: 12114166,
    totalComments: 280577,
    averageEngagementRate: 0.3849,
    activeBrands: ['Nike', 'Wegmans', 'Sheetz', 'State Farm'],
    topAthletesCount: 58,
    mainSports: ['Football', 'Basketball', 'Wrestling', 'Volleyball', 'Hockey'],
    instagramFollowers: 115000000,
    tiktokFollowers: 38000000,
    ipPerformanceLift: 45,
    brandedContentLift: 38,
    collaborationLift: 52,
  },
  {
    schoolId: 'texas-am',
    schoolName: 'Texas A&M University',
    mascot: 'Aggies',
    conference: 'SEC',
    tier: PlayflyPartnerTier.MAX,
    partnershipStartDate: new Date('2022-06-01'),
    athletesTracked: 273,
    totalPosts: 3419,
    totalLikes: 5934200,
    totalComments: 140702,
    averageEngagementRate: 0.4892,
    activeBrands: ['Adidas', 'H-E-B', 'Dr Pepper', 'Chicken Salad Chick'],
    topAthletesCount: 28,
    mainSports: ['Football', 'Basketball', 'Baseball', 'Soccer'],
    instagramFollowers: 68000000,
    tiktokFollowers: 24000000,
    ipPerformanceLift: 45,
    brandedContentLift: 38,
    collaborationLift: 52,
  },
  {
    schoolId: 'utsa',
    schoolName: 'University of Texas at San Antonio',
    mascot: 'Roadrunners',
    conference: 'American',
    tier: PlayflyPartnerTier.MAX,
    partnershipStartDate: new Date('2022-03-01'),
    athletesTracked: 185,
    totalPosts: 2100,
    totalLikes: 1850000,
    totalComments: 68000,
    averageEngagementRate: 0.35,
    activeBrands: ['Nike', 'Whataburger', 'Valero', 'H-E-B'],
    topAthletesCount: 22,
    mainSports: ['Football', 'Basketball', 'Track & Field'],
    instagramFollowers: 42000000,
    tiktokFollowers: 15000000,
    ipPerformanceLift: 45,
    brandedContentLift: 38,
    collaborationLift: 52,
  },
  {
    schoolId: 'virginia',
    schoolName: 'University of Virginia',
    mascot: 'Cavaliers',
    conference: 'ACC',
    tier: PlayflyPartnerTier.MAX,
    partnershipStartDate: new Date('2022-01-15'),
    athletesTracked: 395,
    totalPosts: 4850,
    totalLikes: 4200000,
    totalComments: 152000,
    averageEngagementRate: 0.38,
    activeBrands: ['Nike', 'Chick-fil-A', 'Coca-Cola', 'Geico'],
    topAthletesCount: 35,
    mainSports: ['Football', 'Basketball', 'Lacrosse', 'Soccer'],
    instagramFollowers: 62000000,
    tiktokFollowers: 22000000,
    ipPerformanceLift: 45,
    brandedContentLift: 38,
    collaborationLift: 52,
  },
  {
    schoolId: 'washington-state',
    schoolName: 'Washington State University',
    mascot: 'Cougars',
    conference: 'Pac-12',
    tier: PlayflyPartnerTier.MAX,
    partnershipStartDate: new Date('2022-08-01'),
    athletesTracked: 78,
    totalPosts: 887,
    totalLikes: 514916,
    totalComments: 34756,
    averageEngagementRate: 0.3809,
    activeBrands: ['Nike', 'Dutch Bros', 'Alaska Airlines', 'Dairy Queen'],
    topAthletesCount: 12,
    mainSports: ['Football', 'Basketball', 'Soccer', 'Track & Field'],
    instagramFollowers: 18000000,
    tiktokFollowers: 8000000,
    ipPerformanceLift: 45,
    brandedContentLift: 38,
    collaborationLift: 52,
  },
];

// ============================================
// CONFERENCE DISTRIBUTION
// ============================================

export const CONFERENCE_DISTRIBUTION: ConferenceDistribution[] = [
  {
    conferenceName: 'SEC',
    schoolCount: 12,
    percentageOfNetwork: 30.0,
    totalAthletesInConference: 4200,
    aggregateEngagementRate: 0.45,
  },
  {
    conferenceName: 'Big Ten',
    schoolCount: 10,
    percentageOfNetwork: 25.0,
    totalAthletesInConference: 3800,
    aggregateEngagementRate: 0.42,
  },
  {
    conferenceName: 'ACC',
    schoolCount: 8,
    percentageOfNetwork: 20.0,
    totalAthletesInConference: 2900,
    aggregateEngagementRate: 0.38,
  },
  {
    conferenceName: 'Big 12',
    schoolCount: 6,
    percentageOfNetwork: 15.0,
    totalAthletesInConference: 2200,
    aggregateEngagementRate: 0.40,
  },
  {
    conferenceName: 'Pac-12',
    schoolCount: 4,
    percentageOfNetwork: 10.0,
    totalAthletesInConference: 1900,
    aggregateEngagementRate: 0.35,
  },
];

// ============================================
// NETWORK METRICS CALCULATOR
// ============================================

export function getNetworkMetrics(): NetworkMetrics {
  const totalPostsTracked = 252171;
  const totalPartnerSchools = 40;
  const totalAthletesTracked = 15000;

  // Calculate aggregate metrics from MAX partners
  const aggregateLikes = PLAYFLY_MAX_PARTNERS.reduce((sum, partner) => sum + partner.totalLikes, 0);
  const aggregateComments = PLAYFLY_MAX_PARTNERS.reduce((sum, partner) => sum + partner.totalComments, 0);
  const totalFollowers = PLAYFLY_MAX_PARTNERS.reduce(
    (sum, partner) => sum + partner.instagramFollowers + partner.tiktokFollowers,
    0
  );

  // Calculate average engagement rate across MAX partners
  const averageEngagementRate = PLAYFLY_MAX_PARTNERS.reduce(
    (sum, partner) => sum + partner.averageEngagementRate,
    0
  ) / PLAYFLY_MAX_PARTNERS.length;

  return {
    totalPostsTracked,
    totalPartnerSchools,
    totalAthletesTracked,
    aggregateLikes,
    aggregateComments,
    totalFollowers,
    averageEngagementRate,
    revenueGrowthMultiplier: 2.5,
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getPartnerBySchoolId(schoolId: string): SchoolPartner | undefined {
  return PLAYFLY_MAX_PARTNERS.find(partner => partner.schoolId === schoolId);
}

export function getPartnersByConference(conference: string): SchoolPartner[] {
  return PLAYFLY_MAX_PARTNERS.filter(partner => partner.conference === conference);
}

export function getPartnersByTier(tier: PlayflyPartnerTier): SchoolPartner[] {
  return PLAYFLY_MAX_PARTNERS.filter(partner => partner.tier === tier);
}

export function getTotalAthletesByConference(conference: string): number {
  return PLAYFLY_MAX_PARTNERS
    .filter(partner => partner.conference === conference)
    .reduce((sum, partner) => sum + partner.athletesTracked, 0);
}

export function getAverageEngagementByConference(conference: string): number {
  const partners = getPartnersByConference(conference);
  if (partners.length === 0) return 0;

  return partners.reduce((sum, partner) => sum + partner.averageEngagementRate, 0) / partners.length;
}

export function getTopPerformingSchools(limit: number = 5): SchoolPartner[] {
  return [...PLAYFLY_MAX_PARTNERS]
    .sort((a, b) => b.averageEngagementRate - a.averageEngagementRate)
    .slice(0, limit);
}

export function getRecentPartners(months: number = 12): SchoolPartner[] {
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - months);

  return PLAYFLY_MAX_PARTNERS.filter(
    partner => partner.partnershipStartDate >= cutoffDate
  );
}
