# Deployment Guide

This guide explains how to deploy the Pheme Comments Admin Panel using Docker.

## Prerequisites

- Server with Docker and Docker Compose installed
- PostgreSQL database (or use the included Docker PostgreSQL service)
- Git access to the repository

## Deployment Steps

### 1. Clone Repository

```bash
git clone https://github.com/parsing-team/pheme-comments-admin-panel.git
cd pheme-comments-admin-panel
```

### 2. Configure Environment

Create `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` with your production values:

```env
# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_strong_password_here
POSTGRES_DB=telegram
POSTGRES_PORT=5432

# Application Configuration
APP_PORT=3000
NODE_ENV=production
```

### 3. Start Services

```bash
# Build and start all services
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f
```

### 4. Verify Deployment

- Application: http://your-server:3000
- Database: localhost:5432 (accessible only from container network)

### 5. Database Management

#### Run Migrations

Migrations run automatically on container startup. To run manually:

```bash
docker compose exec frontend npx prisma migrate deploy --schema=./prisma/schema.prisma
docker compose exec frontend npx prisma migrate deploy --schema=./prisma/twitter-schema.prisma
```

#### Access Database

```bash
docker compose exec postgres psql -U postgres -d telegram
```

#### Backup Database

```bash
docker compose exec postgres pg_dump -U postgres telegram > backup_$(date +%Y%m%d_%H%M%S).sql
```

#### Restore Database

```bash
cat backup.sql | docker compose exec -T postgres psql -U postgres -d telegram
```

### 6. Updating Application

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker compose down
docker compose up -d --build
```

## Production Considerations

### Security

1. **Change default passwords** in `.env`
2. **Use HTTPS** with a reverse proxy (nginx, Caddy, Traefik)
3. **Restrict database access** - only allow container network
4. **Regular backups** - automate database backups
5. **Update dependencies** regularly

### Reverse Proxy Example (nginx)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL with Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com
```

### Monitoring

Monitor container health:

```bash
# Check container status
docker compose ps

# View resource usage
docker stats

# Check logs
docker compose logs -f --tail=100
```

### Scaling

To run multiple frontend instances:

```yaml
# In docker-compose.yml
services:
  frontend:
    deploy:
      replicas: 3
```

## Troubleshooting

### Container won't start

```bash
# Check logs
docker compose logs frontend

# Rebuild without cache
docker compose build --no-cache
docker compose up -d
```

### Database connection issues

```bash
# Check if database is ready
docker compose exec postgres pg_isready -U postgres

# Check network
docker network ls
docker network inspect db-tg-comments-network
```

### Permission issues

```bash
# Fix volume permissions
docker compose down
sudo chown -R 1001:1001 postgres_data
docker compose up -d
```

## Maintenance

### Stop Services

```bash
docker compose stop
```

### Remove Everything (including data)

```bash
docker compose down -v
```

### View Container Logs

```bash
# All services
docker compose logs

# Specific service
docker compose logs frontend
docker compose logs postgres

# Follow logs
docker compose logs -f
```

## Support

For issues, please open a ticket on GitHub: https://github.com/parsing-team/pheme-comments-admin-panel/issues
