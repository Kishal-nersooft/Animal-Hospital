# Best Care Animal Hospital — Website

Static marketing site for Best Care Animal Hospital (Nugegoda, Sri Lanka), including a **Channel a Doctor** page for vet discovery and connection requests.

## Stack

- HTML, CSS, JavaScript (no build step)
- Python static file server in Docker (port 8005)

## Pages

| Path | Description |
|------|-------------|
| `/` | Home — services, testimonials, FAQ, contact |
| `/channel-doctor.html` | Channel a Doctor — find vets and request a connection |

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) 20.10+
- [Docker Compose](https://docs.docker.com/compose/install/) v2+ (included with Docker Desktop)

## Quick start (Docker Compose)

From the project root:

```bash
docker compose up -d --build
```

Open [http://localhost:8005](http://localhost:8005).

Stop the stack:

```bash
docker compose down
```

## Docker (without Compose)

Build and run manually:

```bash
docker build -t bestcare-animal-hospital .
docker run -d --name bestcare -p 8005:8005 --restart unless-stopped bestcare-animal-hospital
```

Visit [http://localhost:8005](http://localhost:8005).

Remove the container:

```bash
docker stop bestcare && docker rm bestcare
```

## Local development (no Docker)

Open `index.html` in a browser, or use any static file server:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Configuration

| Variable / setting | Default | Notes |
|--------------------|---------|--------|
| Port | `8005` | Change in `docker-compose.yml` under `ports` and in the Dockerfile `CMD` |

## Deployment notes

- The site loads fonts and icons from CDNs and images from external URLs; the host needs outbound HTTPS access.
- For production, put a reverse proxy (e.g. Caddy, Traefik, or cloud load balancer) in front of the container for TLS.
- Map host port `80` or `443` only if nothing else uses those ports on the server.

## Health check

The container exposes an HTTP health check on `/`. With Compose:

```bash
docker compose ps
```

Status should show `healthy` after a few seconds.

## Project layout

```
.
├── index.html           # Home page
├── channel-doctor.html  # Channel a Doctor page
├── style.css
├── script.js
├── channel-doctor.js
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## License

Proprietary — Best Care Animal Hospital.
