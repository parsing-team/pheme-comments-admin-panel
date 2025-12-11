export const ANALYSIS_CONFIG = {
    // General Limits
    LIMITS: {
        COMMUNITY_DETECTION_PROFILES: 100000, // Effectively unlimited for current scale
        MIN_COMMENTS_FOR_PROFILE: 20,
        MIN_COMMENTS_FOR_TEMPORAL: 50,
    },

    // Temporal Analysis Config
    TEMPORAL: {
        MIN_INTERVALS: 10,
        MAX_INTERVAL_SECONDS: 86400, // 24 hours
        FIXED_INTERVAL_TOLERANCE: 5, // seconds
        BURST_WINDOW: 60, // seconds

        // Scoring Weights
        SCORES: {
            LOW_VARIANCE: 20,
            FIXED_INTERVALS: 20,
            HIGH_VOLUME: 15,
            NIGHT_ACTIVITY: 15,
            UNIFORM_HOURLY: 15,
            ROUND_MINUTES: 10,
            BURST_POSTING: 5,
            SUSPICIOUS_THRESHOLD: 40
        },

        // Thresholds
        THRESHOLDS: {
            LOW_VARIANCE_RATIO: 0.2,
            FIXED_INTERVAL_RATIO: 0.4,
            POSTS_PER_DAY: 100,
            NIGHT_RATIO: 0.3,
            HOUR_STD: 0.1,
            ROUND_MINUTE_RATIO: 0.4,
            BURST_RATIO: 0.2
        }
    },

    // Graph/Community Analysis Config
    GRAPH: {
        // Edge Weights
        WEIGHTS: {
            RETWEET: 3,
            SYNC_POST: 5,
            HASHTAG: 2
        },

        // Parameters
        SYNC_WINDOW_SECONDS: 5,
        MIN_EDGE_WEIGHT: 10,
        MIN_COMMUNITY_SIZE: 3,

        // Scoring Weights
        SCORES: {
            VERY_HIGH_DENSITY: 20,
            HIGH_DENSITY: 20,
            BOT_RECIPROCITY: 25,
            HIGH_RECIPROCITY: 15,
            EXTREME_CLUSTERING: 25,
            HIGH_CLUSTERING: 15,
            TYPICAL_BOT_SIZE: 10,
            SUSPICIOUS_THRESHOLD: 30
        },

        // Thresholds
        THRESHOLDS: {
            DENSITY_VERY_HIGH: 0.2,
            DENSITY_HIGH: 0.1,
            RECIPROCITY_BOT: 0.5,
            RECIPROCITY_HIGH: 0.3,
            CLUSTERING_EXTREME: 0.6,
            CLUSTERING_HIGH: 0.3,
            SIZE_MIN: 10,
            SIZE_MAX: 100
        }
    },

    // Fanbase Clustering Config
    FANBASE: {
        // Graph type weights (for future multi-graph combination)
        GRAPH_WEIGHTS: {
            SUPPORT_RETWEET: 1,  // Primary signal for support
            SUPPORT_LIKE: 0.5,     // If available in future
            NEUTRAL_QUOTE: 0,    // Don't use for leader detection
            NEUTRAL_REPLY: 0
        },

        // Leadership Score weights (combines local + global significance)
        LEADERSHIP_WEIGHTS: {
            LOCAL_SUPPORT: 0.3,           // Support from cluster members
            GLOBAL_SUPPORT: 0.4,          // Total retweets from all profiles
            STRUCTURAL_CENTRALITY: 0.2,   // Unique supporters (reach)
            CLUSTER_SPECIFICITY: 0.1
        },

        // Leader identification thresholds
        LEADER_THRESHOLDS: {
            MIN_SUPPORT_IN: 10,           // Minimum support edges from cluster
            MIN_GLOBAL_SUPPORT: 50,       // NEW: Minimum global retweets
            MIN_SUPPORT_RATIO: 0.7,       // 70% support vs opposition
            MIN_SHARE_IN_CLUSTER: 0.1,    // Reduced from 0.3 (too strict for global leaders)
            PERCENTILE: 0.05
        },

        // Support Score weights (now based on support edges only)
        SUPPORT_SCORE_WEIGHTS: {
            ENGAGEMENT_TO_LEADER: 0.4,
            HASHTAG_SIMILARITY: 0.2,
            RECIPROCITY: 0.2,
            CLUSTER_COHESION: 0.2
        },

        // Thresholds
        THRESHOLDS: {
            MIN_COMMUNITY_SIZE: 5,
            MIN_SHARED_HASHTAGS: 3,
            MIN_SUPPORT_SCORE: 0.3,
            MIN_RETWEETS: 3,
            MIN_QUOTES_REPLIES: 2
        },

        // Clustering Algorithm Configuration
        CLUSTERING: {
            ALGORITHM: 'louvain',           // 'connected_components' | 'louvain'
            RESOLUTION: 1.8,                // Louvain resolution (higher = more communities)
            EDGE_WEIGHT_THRESHOLD: 3,       // Minimum edge weight to include
            HUB_STRATEGY: 'dampen',         // 'none' | 'dampen' | 'remove'
            HUB_THRESHOLD: 500,             // Global support threshold for hub identification
            HUB_DAMPEN_FACTOR: 'log'        // 'log' | 'sqrt'
        },

        // Expected ranges for organic communities
        ORGANIC_RANGES: {
            DENSITY: { min: 0.1, max: 0.4 },
            RECIPROCITY: { min: 0.1, max: 0.3 },
            CLUSTERING: { min: 0.2, max: 0.6 },
            AVG_EDGE_WEIGHT: { min: 10, max: 150 }
        }
    }
}
