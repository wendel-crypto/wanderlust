# Wanderlust

A travel social app prototype that mixes Instagram-style trip sharing with TripAdvisor-style reviews. Travelers post where they went and rate it; tour operators, hotels and guides post what they offer and take bookings through direct messages.

- **Try it:** https://www.wendelfreitas.com/wanderlust/app/
- **Case study:** https://www.wendelfreitas.com/wanderlust/

![Wanderlust screens](docs/cover.jpg)

## Features

- Feed with stories, traveler/provider filters, swipeable photo posts and double-tap to like
- Every post carries a geotag, category, price level, star rating and a short review
- Explore with live search, a trending grid and top-rated experiences
- Map of geotagged posts (Leaflet, Esri dark tiles), with providers marked in teal
- Create a post: traveler or provider, photos, location, caption with #tags, rating
- Direct messages that attach the post as context, with simulated replies
- Place detail with rating distribution, write-a-review and recent reviews
- Save, share sheet, trips with progress, profile and activity notifications

## Screens

| Feed | Explore | Map | Trips |
|---|---|---|---|
| ![](docs/thumbs/feed.jpg) | ![](docs/thumbs/explore.jpg) | ![](docs/thumbs/map.jpg) | ![](docs/thumbs/trips.jpg) |
| **Profile** | **New post** | **Messages** | **Reviews** |
| ![](docs/thumbs/profile.jpg) | ![](docs/thumbs/create.jpg) | ![](docs/thumbs/chat.jpg) | ![](docs/thumbs/detail.jpg) |

## What is in here

| Path | Contents |
|---|---|
| `app/index.html` | The whole app: one HTML file, no framework, no build step. |
| `docs/` | Screenshots, thumbnails and the cover image. |
| `site/case-page.html` | The portfolio case study page. |
| `scripts/shoot.py` | Playwright script that renders the screenshots. |

## Running

Open `app/index.html` in a browser. URL options:

- `?screen=explore` (also `map`, `trips`, `profile`, `create`, `chat`, `detail`, `inbox`, `notif`) opens a given screen
- `?embed` for use inside an iframe, `?bare` for a full-bleed phone view

All content is sample data and nothing is saved. Photos are from [Unsplash](https://unsplash.com).

Designed and directed by Wendel de Freitas; written with Claude.
