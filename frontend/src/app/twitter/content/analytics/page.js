import {
    getOverallStats,
    getEngagementTimeline,
    getTopProfilesByEngagement,
    getHashtagTrends,
    getLanguageDistribution,
    getTemporalActivity,
    getReplyNetworkStats
} from '../../analytics-actions'
import EngagementTimeline from './components/EngagementTimeline'
import TopHashtags from './components/TopHashtags'
import LanguageDistribution from './components/LanguageDistribution'
import ActivityHeatmap from './components/ActivityHeatmap'
import TopProfiles from './components/TopProfiles'
import DateRangeSelector from './components/DateRangeSelector'

export default async function AnalyticsPage({ searchParams }) {
    // Get date range from URL params (default to 90 days)
    const range = searchParams?.range || '90'
    const days = range === 'all' ? 365 : parseInt(range)

    // Fetch all analytics data
    const [
        overallStats,
        engagementTimeline,
        topProfiles,
        hashtagTrends,
        languageDistribution,
        temporalActivity,
        replyNetworkStats
    ] = await Promise.all([
        getOverallStats(),
        getEngagementTimeline('day', days),
        getTopProfilesByEngagement(20, 'likes'),
        getHashtagTrends(20, days),
        getLanguageDistribution(),
        getTemporalActivity(),
        getReplyNetworkStats()
    ])

    const formatNumber = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
        return num.toString()
    }

    const formatDate = (date) => {
        if (!date) return 'N/A'
        try {
            const d = new Date(date)
            if (isNaN(d.getTime())) return 'N/A'
            return d.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        } catch (e) {
            console.error('Error formatting date:', date, e)
            return 'N/A'
        }
    }

    return (
        <div>
            {/* Date Range Selector */}
            <DateRangeSelector currentRange={range} />

            {/* Overview Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Total Profiles
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        {formatNumber(overallStats.totalProfiles)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {formatNumber(overallStats.activeProfiles)} active
                    </div>
                </div>

                <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Total Comments
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2ecc71' }}>
                        {formatNumber(overallStats.totalComments)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {formatDate(overallStats.dateRange.earliest)} - {formatDate(overallStats.dateRange.latest)}
                    </div>
                </div>

                <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Avg Likes
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e74c3c' }}>
                        {formatNumber(overallStats.avgEngagement.likes)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        per comment
                    </div>
                </div>

                <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Avg Retweets
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>
                        {formatNumber(overallStats.avgEngagement.retweets)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        per comment
                    </div>
                </div>

                <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Reply Rate
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9b59b6' }}>
                        {replyNetworkStats.replyRate}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {formatNumber(replyNetworkStats.totalReplies)} replies
                    </div>
                </div>

                <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Reciprocal Pairs
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1abc9c' }}>
                        {formatNumber(replyNetworkStats.reciprocalPairs)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        mutual interactions
                    </div>
                </div>
            </div>

            {/* Engagement Timeline */}
            <div style={{ marginBottom: '2rem' }}>
                <EngagementTimeline data={engagementTimeline} />
            </div>

            {/* Two Column Layout */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
                gap: '2rem',
                marginBottom: '2rem'
            }}>
                <TopProfiles data={topProfiles} />
                <TopHashtags data={hashtagTrends} />
            </div>

            {/* Two Column Layout */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
                gap: '2rem',
                marginBottom: '2rem'
            }}>
                <LanguageDistribution data={languageDistribution} />
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
                        Network Statistics
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '1rem',
                            backgroundColor: 'var(--bg-color)',
                            borderRadius: '8px'
                        }}>
                            <span style={{ color: 'var(--text-muted)' }}>Total Replies</span>
                            <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                                {formatNumber(replyNetworkStats.totalReplies)}
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '1rem',
                            backgroundColor: 'var(--bg-color)',
                            borderRadius: '8px'
                        }}>
                            <span style={{ color: 'var(--text-muted)' }}>Root Posts</span>
                            <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                                {formatNumber(replyNetworkStats.totalRootPosts)}
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '1rem',
                            backgroundColor: 'var(--bg-color)',
                            borderRadius: '8px'
                        }}>
                            <span style={{ color: 'var(--text-muted)' }}>Unique Authors</span>
                            <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                                {formatNumber(replyNetworkStats.uniqueAuthors)}
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '1rem',
                            backgroundColor: 'var(--bg-color)',
                            borderRadius: '8px'
                        }}>
                            <span style={{ color: 'var(--text-muted)' }}>Reply Targets</span>
                            <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                                {formatNumber(replyNetworkStats.uniqueReplyTargets)}
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '1rem',
                            backgroundColor: 'var(--bg-color)',
                            borderRadius: '8px'
                        }}>
                            <span style={{ color: 'var(--text-muted)' }}>Reciprocal Pairs</span>
                            <span style={{ fontWeight: '600', fontSize: '1.1rem', color: 'var(--primary)' }}>
                                {formatNumber(replyNetworkStats.reciprocalPairs)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity Heatmap */}
            <div style={{ marginBottom: '2rem' }}>
                <ActivityHeatmap data={temporalActivity.heatmap} />
            </div>
        </div>
    )
}
