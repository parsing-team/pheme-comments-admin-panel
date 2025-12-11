# Pheme Comments Admin Panel

Social media analytics platform for analyzing Telegram channels and Twitter (X) profiles, including bot detection, community analysis, and fanbase clustering.

## Features

### Telegram Comments
- 📺 Channel monitoring and analysis
- ⭐ Top users tracking
- 🔍 User search functionality
- 📊 Engagement statistics

### Twitter (X) Analytics
- 👤 Profile analysis and tracking
- 🔥 Top posts by engagement
- 🤖 **Bot Detection** - Advanced bot analysis with multiple detection methods
- 🕸️ **Community Detection** - Multi-layer graph analysis for bot networks
- 👥 **Fanbase Clustering** - Identify supporter communities and their roles
- 📈 Interaction analysis
- 🔍 User search and filtering

## Tech Stack

- **Frontend**: Next.js 16, React
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: CSS with custom design system
- **Analytics**: Graph analysis (graphology, Louvain clustering)
- **Containerization**: Docker & Docker Compose

## Quick Start with Docker

### Prerequisites

- Docker and Docker Compose installed
- Git

### 1. Clone Repository

```bash
git clone https://github.com/parsing-team/pheme-comments-admin-panel.git
cd pheme-comments-admin-panel
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and set your database credentials:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=telegram
POSTGRES_PORT=5432
APP_PORT=3000
```

### 3. Start Services

```bash
docker-compose up -d
```

This will:
- Start PostgreSQL database
- Run database migrations
- Build and start the Next.js application

### 4. Access Application

Open http://localhost:3000 in your browser.

### 5. Stop Services

```bash
docker-compose down
```

To remove volumes (database data):

```bash
docker-compose down -v
```

## Local Development

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm or yarn

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Database

Create two PostgreSQL schemas:
- `public` - for Telegram data
- `twitter` - for Twitter data

Update `.env` in the `frontend` directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/telegram?schema=public"
TWITTER_DATABASE_URL="postgresql://user:password@localhost:5432/telegram?schema=twitter"
```

### 3. Run Migrations

```bash
# Telegram schema
npx prisma migrate deploy --schema=./prisma/schema.prisma

# Twitter schema
npx prisma migrate deploy --schema=./prisma/twitter-schema.prisma
```

Or use the provided SQL migration files:

```bash
psql -U postgres -d telegram -f prisma/migrations/create_bot_analysis_tables.sql
psql -U postgres -d telegram -f prisma/migrations/create_fanbase_clustering_tables.sql
```

### 4. Generate Prisma Client

```bash
npx prisma generate --schema=./prisma/schema.prisma
npx prisma generate --schema=./prisma/twitter-schema.prisma
```

### 5. Start Development Server

```bash
npm run dev
```

Application will be available at http://localhost:3000

### 6. Prisma Studio (Optional)

View and edit database data:

```bash
npx prisma studio
```

## Project Structure

```
DB-Tg-comments/
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js app directory
│   │   │   ├── twitter/      # Twitter analytics pages
│   │   │   │   ├── content/analytics/bot-finder/
│   │   │   │   │   ├── bot-detection/
│   │   │   │   │   ├── community-detection/
│   │   │   │   │   └── fanbase-clustering/
│   │   │   ├── channels/     # Telegram channels
│   │   │   └── ...
│   │   ├── services/         # Business logic
│   │   │   └── twitter/
│   │   │       ├── bot-detection.js
│   │   │       ├── graph.js
│   │   │       └── fanbase.js
│   │   ├── lib/              # Utilities
│   │   └── config/           # Configuration
│   ├── prisma/
│   │   ├── schema.prisma     # Telegram schema
│   │   ├── twitter-schema.prisma
│   │   └── migrations/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── init-db.sql
└── README.md
```

## Database Schemas

### Telegram Schema (public)
- `channels` - Telegram channel information
- `comments` - Channel messages and comments
- `users` - User profiles

### Twitter Schema (twitter)
- `profiles` - Twitter user profiles
- `comments` - Tweets and replies
- `bot_analysis_cache` - Bot detection results
- `bot_analysis_history` - Historical bot analysis
- `fanbase_runs` - Fanbase clustering snapshots
- `fanbase_communities` - Detected communities
- `fanbase_memberships` - Community member details

## Key Features Explained

### Bot Detection
Multi-layered analysis using:
- Account age and verification status
- Posting patterns and frequency
- Content analysis (repetition, hashtags)
- Network behavior
- Username patterns

### Community Detection
Graph-based analysis with three layers:
- **Retweet Layer**: Interaction patterns
- **Sync Layer**: Synchronized posting (strongest bot indicator)
- **Hashtag Layer**: Shared hashtag usage

Calculates network metrics:
- Density
- Reciprocity
- Clustering coefficient

### Fanbase Clustering
Identifies supporter communities using:
- Louvain community detection
- Leadership scoring
- Support vs opposition classification
- Role assignment (Core Supporters, Amplifiers, Opponents)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `POSTGRES_USER` | PostgreSQL username | `postgres` |
| `POSTGRES_PASSWORD` | PostgreSQL password | `postgres` |
| `POSTGRES_DB` | Database name | `telegram` |
| `POSTGRES_PORT` | PostgreSQL port | `5432` |
| `APP_PORT` | Application port | `3000` |
| `DATABASE_URL` | Telegram database connection | - |
| `TWITTER_DATABASE_URL` | Twitter database connection | - |
| `NODE_ENV` | Environment mode | `production` |

## Troubleshooting

### Docker Build Issues

If build fails, try:

```bash
docker-compose build --no-cache
docker-compose up
```

### Database Connection Issues

Check if PostgreSQL is running:

```bash
docker-compose ps
```

View logs:

```bash
docker-compose logs postgres
docker-compose logs frontend
```

### Prisma Issues

Regenerate Prisma client:

```bash
cd frontend
npx prisma generate --schema=./prisma/schema.prisma
npx prisma generate --schema=./prisma/twitter-schema.prisma
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.
