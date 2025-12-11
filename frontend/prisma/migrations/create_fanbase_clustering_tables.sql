-- Fanbase Clustering Persistence Tables Migration
-- Creates tables for storing clustering runs, communities, and memberships

-- Create fanbase_runs table
CREATE TABLE IF NOT EXISTS fanbase_runs (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP(6) NOT NULL DEFAULT NOW(),
    source VARCHAR(50),
    node_count INTEGER,
    edge_count INTEGER,
    method VARCHAR(50),
    params JSONB,
    time_from TIMESTAMP(6),
    time_to TIMESTAMP(6),
    is_current BOOLEAN DEFAULT false,
    notes TEXT,
    completed_at TIMESTAMP(6)
);

-- Create indexes for fanbase_runs
CREATE INDEX IF NOT EXISTS idx_fanbase_runs_current ON fanbase_runs(is_current) WHERE is_current = true;
CREATE INDEX IF NOT EXISTS idx_fanbase_runs_created ON fanbase_runs(created_at DESC);

-- Create fanbase_communities table
CREATE TABLE IF NOT EXISTS fanbase_communities (
    id SERIAL PRIMARY KEY,
    run_id INTEGER NOT NULL REFERENCES fanbase_runs(id) ON DELETE CASCADE,
    label VARCHAR(100),
    member_count INTEGER,
    leader_count INTEGER,
    density REAL,
    reciprocity REAL,
    clustering REAL,
    avg_weight REAL,
    leader_username VARCHAR(100),
    top_hashtags JSONB,
    metrics JSONB
);

-- Create indexes for fanbase_communities
CREATE INDEX IF NOT EXISTS idx_fanbase_communities_run ON fanbase_communities(run_id);
CREATE INDEX IF NOT EXISTS idx_fanbase_communities_size ON fanbase_communities(member_count DESC);

-- Create fanbase_memberships table
CREATE TABLE IF NOT EXISTS fanbase_memberships (
    run_id INTEGER NOT NULL REFERENCES fanbase_runs(id) ON DELETE CASCADE,
    community_id INTEGER NOT NULL REFERENCES fanbase_communities(id) ON DELETE CASCADE,
    profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role VARCHAR(20),
    leadership_score REAL,
    support_score REAL,
    local_activity INTEGER,
    share_in_cluster REAL,
    bot_score INTEGER,
    bot_risk_level VARCHAR(20),
    is_suspicious BOOLEAN,
    features JSONB,
    
    PRIMARY KEY (run_id, community_id, profile_id)
);

-- Create indexes for fanbase_memberships
CREATE INDEX IF NOT EXISTS idx_memberships_profile ON fanbase_memberships(profile_id, run_id);
CREATE INDEX IF NOT EXISTS idx_memberships_community ON fanbase_memberships(community_id);
CREATE INDEX IF NOT EXISTS idx_memberships_bot_score ON fanbase_memberships(bot_score DESC) WHERE bot_score > 50;
