-- Bot Analysis Tables Migration
-- Creates dedicated tables for bot analysis caching and history

-- Create bot_analysis_cache table
CREATE TABLE IF NOT EXISTS bot_analysis_cache (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    bot_score INTEGER NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    analysis_data JSONB NOT NULL,
    analyzed_at TIMESTAMP(6) NOT NULL DEFAULT NOW(),
    last_tweet_date TIMESTAMP(6),
    tweet_count INTEGER,
    created_at TIMESTAMP(6) NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP(6) NOT NULL DEFAULT NOW()
);

-- Create indexes for bot_analysis_cache
CREATE INDEX IF NOT EXISTS idx_bot_cache_profile ON bot_analysis_cache(profile_id);
CREATE INDEX IF NOT EXISTS idx_bot_cache_score ON bot_analysis_cache(bot_score DESC);
CREATE INDEX IF NOT EXISTS idx_bot_cache_risk ON bot_analysis_cache(risk_level);

-- Create bot_analysis_history table
CREATE TABLE IF NOT EXISTS bot_analysis_history (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    bot_score INTEGER NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    analysis_data JSONB NOT NULL,
    analyzed_at TIMESTAMP(6) NOT NULL DEFAULT NOW(),
    tweet_count INTEGER,
    score_change INTEGER,
    created_at TIMESTAMP(6) NOT NULL DEFAULT NOW()
);

-- Create indexes for bot_analysis_history
CREATE INDEX IF NOT EXISTS idx_bot_history_profile_date ON bot_analysis_history(profile_id, analyzed_at DESC);
CREATE INDEX IF NOT EXISTS idx_bot_history_date ON bot_analysis_history(analyzed_at DESC);

-- Optional: Migrate existing data from profiles table
-- Uncomment if you want to migrate existing bot_analysis_data
/*
INSERT INTO bot_analysis_cache (profile_id, bot_score, risk_level, analysis_data, analyzed_at, last_tweet_date, tweet_count)
SELECT 
    id,
    COALESCE(bot_score, 0),
    CASE 
        WHEN bot_score > 75 THEN 'Critical'
        WHEN bot_score > 50 THEN 'High'
        WHEN bot_score > 25 THEN 'Medium'
        ELSE 'Low'
    END,
    COALESCE(bot_analysis_data, '{}'::jsonb),
    COALESCE(bot_analysis_date, NOW()),
    bot_analysis_last_tweet_date,
    (bot_analysis_data->>'details'->>'tweetCount')::integer
FROM profiles
WHERE bot_analysis_data IS NOT NULL
ON CONFLICT (profile_id) DO NOTHING;
*/
