import { PLAYFLY_MAX_PARTNERS, PlayflyPartnerTier } from './playflyNetworkData';

// ============================================================================
// REVENUE POTENTIAL TRACKING
// ============================================================================
// This file tracks network-wide metrics with revenue potential analysis
// showing the gap between current performance and optimized potential

export interface PostVolumeMetrics {
  totalPosts: number;
  postsPerMonth: number;
  currentMonetizationRate: number; // % of posts that generate revenue
  currentRevenuePerPost: number; // Average $ per monetized post
  currentMonthlyRevenue: number; // Current revenue from posts

  // Potential metrics
  targetMonetizationRate: number; // % of posts that COULD generate revenue
  targetRevenuePerPost: number; // Potential $ per post with optimization
  potentialMonthlyRevenue: number; // What we COULD be earning

  // Gap analysis
  monetizationGap: number; // % points between current and potential
  revenueGap: number; // $ difference between current and potential
  growthMultiplier: number; // Potential / Current
}

export interface AthleteEarningsMetrics {
  totalAthletes: number;
  activeAthletes: number; // Athletes with at least 1 deal
  activationRate: number; // % of athletes with deals

  // Current earnings
  avgDealValuePerAthlete: number; // Average deal value for active athletes
  totalCurrentEarnings: number; // Sum of all athlete earnings

  // Potential earnings
  targetActivationRate: number; // % of athletes that SHOULD have deals
  targetAvgDealValue: number; // What each athlete COULD earn with better positioning
  totalPotentialEarnings: number; // Maximum network earnings potential

  // Gap analysis
  activationGap: number; // Athletes not yet activated
  earningsGapPerAthlete: number; // $ difference per athlete
  totalEarningsGap: number; // Total $ opportunity
}

export interface EngagementMonetizationMetrics {
  // Aggregate engagement
  totalLikes: number;
  totalComments: number;
  totalFollowers: string; // e.g., "450M+"
  totalEngagements: number; // Likes + Comments

  // Current monetization
  monetizedEngagements: number; // Engagements that led to revenue
  currentMonetizationPercent: number; // % of engagement monetized
  revenuePerEngagement: number; // $ per monetized engagement
  currentEngagementRevenue: number; // Total $ from engagement

  // Potential monetization
  targetMonetizationPercent: number; // % we SHOULD be monetizing
  targetRevenuePerEngagement: number; // $ per engagement at scale
  potentialEngagementRevenue: number; // Maximum revenue from engagement

  // Gap analysis
  engagementGap: number; // Engagements not being monetized
  revenueOpportunity: number; // $ opportunity from better monetization
}

export interface SchoolConferencePerformance {
  schoolId: string;
  schoolName: string;
  conference: string;
  tier: PlayflyPartnerTier;

  // Current performance
  currentRevenue: number; // Annual revenue from this school
  currentROI: number; // Return on investment %
  revenuePerAthlete: number; // $ per athlete at this school

  // Potential performance
  potentialRevenue: number; // What this school COULD generate
  targetROI: number; // Target ROI based on tier

  // Classification
  performanceStatus: 'exceeding' | 'meeting' | 'underperforming';
  revenueGap: number; // $ gap to potential
  recommendations: string[];
}

// ============================================================================
// NETWORK POST VOLUME ANALYSIS
// ============================================================================

export function getPostVolumeMetrics(): PostVolumeMetrics {
  const totalPosts = 252171;
  const postsPerMonth = 21014; // 252,171 / 12 months

  // Current state: Only 12% of posts are directly monetized through brand partnerships
  const currentMonetizationRate = 0.12;
  const currentRevenuePerPost = 45; // Average $45 per monetized post
  const currentMonthlyRevenue = postsPerMonth * currentMonetizationRate * currentRevenuePerPost;

  // Potential state: With better brand matching, 35% could be monetized
  const targetMonetizationRate = 0.35;
  const targetRevenuePerPost = 75; // With premium brands and better positioning
  const potentialMonthlyRevenue = postsPerMonth * targetMonetizationRate * targetRevenuePerPost;

  // Gap analysis
  const monetizationGap = targetMonetizationRate - currentMonetizationRate;
  const revenueGap = potentialMonthlyRevenue - currentMonthlyRevenue;
  const growthMultiplier = potentialMonthlyRevenue / currentMonthlyRevenue;

  return {
    totalPosts,
    postsPerMonth,
    currentMonetizationRate,
    currentRevenuePerPost,
    currentMonthlyRevenue,
    targetMonetizationRate,
    targetRevenuePerPost,
    potentialMonthlyRevenue,
    monetizationGap,
    revenueGap,
    growthMultiplier,
  };
}

// ============================================================================
// ATHLETE EARNINGS ANALYSIS
// ============================================================================

export function getAthleteEarningsMetrics(): AthleteEarningsMetrics {
  const totalAthletes = 15000;

  // Current state: Only 18% of athletes have active deals
  const activeAthletes = 2700; // 18% of 15,000
  const activationRate = 0.18;

  // Current earnings
  const avgDealValuePerAthlete = 3500; // Average $3,500 per active athlete per year
  const totalCurrentEarnings = activeAthletes * avgDealValuePerAthlete;

  // Potential state: With proper marketplace, 65% could have deals
  const targetActivationRate = 0.65;
  const targetAvgDealValue = 5200; // Better brand matching = higher avg deal value
  const totalPotentialEarnings = (totalAthletes * targetActivationRate) * targetAvgDealValue;

  // Gap analysis
  const activationGap = (totalAthletes * targetActivationRate) - activeAthletes;
  const earningsGapPerAthlete = targetAvgDealValue - avgDealValuePerAthlete;
  const totalEarningsGap = totalPotentialEarnings - totalCurrentEarnings;

  return {
    totalAthletes,
    activeAthletes,
    activationRate,
    avgDealValuePerAthlete,
    totalCurrentEarnings,
    targetActivationRate,
    targetAvgDealValue,
    totalPotentialEarnings,
    activationGap,
    earningsGapPerAthlete,
    totalEarningsGap,
  };
}

// ============================================================================
// ENGAGEMENT MONETIZATION ANALYSIS
// ============================================================================

export function getEngagementMonetizationMetrics(): EngagementMonetizationMetrics {
  // Aggregate all likes and comments from schools
  const totalLikes = PLAYFLY_MAX_PARTNERS.reduce((sum, school) => sum + school.totalLikes, 0);
  const totalComments = PLAYFLY_MAX_PARTNERS.reduce((sum, school) => sum + school.totalComments, 0);
  const totalFollowers = '450M+';
  const totalEngagements = totalLikes + totalComments;

  // Current state: Only 8% of engagements lead to monetization
  const currentMonetizationPercent = 0.08;
  const monetizedEngagements = Math.floor(totalEngagements * currentMonetizationPercent);
  const revenuePerEngagement = 0.12; // $0.12 per monetized engagement (CPM-like metric)
  const currentEngagementRevenue = monetizedEngagements * revenuePerEngagement;

  // Potential state: With better attribution and brand tools, 22% could be monetized
  const targetMonetizationPercent = 0.22;
  const targetRevenuePerEngagement = 0.18; // Higher rate with premium brands
  const potentialEngagementRevenue = (totalEngagements * targetMonetizationPercent) * targetRevenuePerEngagement;

  // Gap analysis
  const engagementGap = (totalEngagements * targetMonetizationPercent) - monetizedEngagements;
  const revenueOpportunity = potentialEngagementRevenue - currentEngagementRevenue;

  return {
    totalLikes,
    totalComments,
    totalFollowers,
    totalEngagements,
    monetizedEngagements,
    currentMonetizationPercent,
    revenuePerEngagement,
    currentEngagementRevenue,
    targetMonetizationPercent,
    targetRevenuePerEngagement,
    potentialEngagementRevenue,
    engagementGap,
    revenueOpportunity,
  };
}

// ============================================================================
// SCHOOL / CONFERENCE PERFORMANCE BREAKDOWN
// ============================================================================

export function getSchoolConferencePerformance(): SchoolConferencePerformance[] {
  return PLAYFLY_MAX_PARTNERS.map(school => {
    // Revenue calculations based on tier and performance
    const baseMAXRevenue = 1200000; // $1.2M for MAX tier
    const baseStandardRevenue = 300000; // $300K for standard tier

    // Current revenue varies by engagement and brand partnerships
    const engagementMultiplier = school.averageEngagementRate / 0.038; // Normalized to avg
    const brandMultiplier = school.activeBrands.length / 3; // Normalized to avg brands

    const baseRevenue = school.tier === PlayflyPartnerTier.MAX ? baseMAXRevenue : baseStandardRevenue;
    const currentRevenue = baseRevenue * (engagementMultiplier * 0.3 + brandMultiplier * 0.7);

    // Potential revenue with optimization
    const targetMAXRevenue = 1500000; // $1.5M with premium pricing
    const targetStandardRevenue = 400000; // $400K with better positioning
    const targetBase = school.tier === PlayflyPartnerTier.MAX ? targetMAXRevenue : targetStandardRevenue;

    // Assume all schools can hit 90% of target with optimization
    const potentialRevenue = targetBase * 0.9;

    // ROI calculations
    const currentROI = school.tier === PlayflyPartnerTier.MAX ? 2.8 : 1.9;
    const targetROI = school.tier === PlayflyPartnerTier.MAX ? 3.5 : 2.5;

    // Revenue per athlete
    const revenuePerAthlete = currentRevenue / school.athletesTracked;

    // Performance status
    const revenueGap = potentialRevenue - currentRevenue;
    const performanceRatio = currentRevenue / potentialRevenue;

    let performanceStatus: 'exceeding' | 'meeting' | 'underperforming';
    let recommendations: string[];

    if (performanceRatio >= 0.95) {
      performanceStatus = 'exceeding';
      recommendations = [
        'Maintain current brand partnerships',
        'Consider expanding to adjacent categories',
        'Share best practices with underperforming schools',
      ];
    } else if (performanceRatio >= 0.75) {
      performanceStatus = 'meeting';
      recommendations = [
        'Identify 2-3 new brand partnership opportunities',
        'Increase athlete activation rate by 10%',
        'Optimize posting frequency for higher engagement',
      ];
    } else {
      performanceStatus = 'underperforming';
      recommendations = [
        'PRIORITY: Conduct brand partnership audit',
        'Implement athlete marketplace to increase activation',
        'Review engagement strategy - currently below network average',
        school.tier === PlayflyPartnerTier.MAX
          ? 'Consider MAX tier pricing optimization'
          : 'Evaluate for MAX tier upgrade opportunity',
      ];
    }

    return {
      schoolId: school.schoolId,
      schoolName: school.schoolName,
      conference: school.conference,
      tier: school.tier,
      currentRevenue,
      currentROI,
      revenuePerAthlete,
      potentialRevenue,
      targetROI,
      performanceStatus,
      revenueGap,
      recommendations,
    };
  });
}

// ============================================================================
// CONFERENCE-LEVEL AGGREGATION
// ============================================================================

export interface ConferenceRevenueMetrics {
  conference: string;
  schools: number;
  currentRevenue: number;
  potentialRevenue: number;
  revenueGap: number;
  avgRevenuePerSchool: number;
  performanceStatus: 'leading' | 'average' | 'lagging';
}

export function getConferenceRevenueMetrics(): ConferenceRevenueMetrics[] {
  const schoolPerformance = getSchoolConferencePerformance();

  // Group by conference
  const conferenceMap = new Map<string, SchoolConferencePerformance[]>();
  schoolPerformance.forEach(school => {
    const existing = conferenceMap.get(school.conference) || [];
    existing.push(school);
    conferenceMap.set(school.conference, existing);
  });

  // Calculate conference-level metrics
  const conferenceMetrics: ConferenceRevenueMetrics[] = [];

  conferenceMap.forEach((schools, conference) => {
    const currentRevenue = schools.reduce((sum, s) => sum + s.currentRevenue, 0);
    const potentialRevenue = schools.reduce((sum, s) => sum + s.potentialRevenue, 0);
    const revenueGap = potentialRevenue - currentRevenue;
    const avgRevenuePerSchool = currentRevenue / schools.length;

    // Performance status based on % of potential achieved
    const performanceRatio = currentRevenue / potentialRevenue;
    let performanceStatus: 'leading' | 'average' | 'lagging';

    if (performanceRatio >= 0.85) {
      performanceStatus = 'leading';
    } else if (performanceRatio >= 0.70) {
      performanceStatus = 'average';
    } else {
      performanceStatus = 'lagging';
    }

    conferenceMetrics.push({
      conference,
      schools: schools.length,
      currentRevenue,
      potentialRevenue,
      revenueGap,
      avgRevenuePerSchool,
      performanceStatus,
    });
  });

  // Sort by current revenue descending
  return conferenceMetrics.sort((a, b) => b.currentRevenue - a.currentRevenue);
}

// ============================================================================
// NETWORK-WIDE SUMMARY
// ============================================================================

export interface NetworkRevenueSummary {
  postMetrics: PostVolumeMetrics;
  athleteMetrics: AthleteEarningsMetrics;
  engagementMetrics: EngagementMonetizationMetrics;

  // Overall network
  totalCurrentRevenue: number;
  totalPotentialRevenue: number;
  totalRevenueGap: number;
  overallGrowthMultiplier: number;

  // Performance breakdown
  exceedingSchools: number;
  meetingSchools: number;
  underperformingSchools: number;
}

export function getNetworkRevenueSummary(): NetworkRevenueSummary {
  const postMetrics = getPostVolumeMetrics();
  const athleteMetrics = getAthleteEarningsMetrics();
  const engagementMetrics = getEngagementMonetizationMetrics();
  const schoolPerformance = getSchoolConferencePerformance();

  // Calculate total network revenue
  const totalCurrentRevenue = schoolPerformance.reduce((sum, s) => sum + s.currentRevenue, 0);
  const totalPotentialRevenue = schoolPerformance.reduce((sum, s) => sum + s.potentialRevenue, 0);
  const totalRevenueGap = totalPotentialRevenue - totalCurrentRevenue;
  const overallGrowthMultiplier = totalPotentialRevenue / totalCurrentRevenue;

  // Count performance categories
  const exceedingSchools = schoolPerformance.filter(s => s.performanceStatus === 'exceeding').length;
  const meetingSchools = schoolPerformance.filter(s => s.performanceStatus === 'meeting').length;
  const underperformingSchools = schoolPerformance.filter(s => s.performanceStatus === 'underperforming').length;

  return {
    postMetrics,
    athleteMetrics,
    engagementMetrics,
    totalCurrentRevenue,
    totalPotentialRevenue,
    totalRevenueGap,
    overallGrowthMultiplier,
    exceedingSchools,
    meetingSchools,
    underperformingSchools,
  };
}
