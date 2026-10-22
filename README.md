# Motorcycle road trips

Day-by-day trip plans with maps, routes and photos.
Live: https://ilkkapeltola.github.io/roadtrips/

- `index.html` lists every trip in `trips/`.
- `trip.html?t=<slug>` shows one trip.

Preview locally: `python3 -m http.server 8765` → http://localhost:8765

## Layout

```
trips/
  manifest.js              generated — the trip list on the front page
  <slug>/
    trip.js                THE trip — the only file you edit by hand
    routes.js              generated — road geometry per leg (OSRM)
    gallery.js             generated — photo list with credits
    images/<stop-id>/…     generated — downloaded photos
assets/trip-view.js        shared renderer (no trip content)
assets/styles.css          shared styles
tools/build.mjs            regenerates the generated files
```

## Adding a trip

1. Copy an existing trip's `trip.js` into `trips/<new-slug>/trip.js` (slug: lowercase, digits, dashes).
2. Edit it (format below).
3. Run `node tools/build.mjs <new-slug>`. This fetches the routes and photos and adds the trip to the front page.
4. Commit and push. GitHub Pages redeploys in about a minute.

## Editing a trip

Edit `trips/<slug>/trip.js`, then run `node tools/build.mjs <slug>`.
The build only refetches what changed. Use `routes` or `images` to limit it, or `--force` to refetch everything.
Day numbers, dates and totals are always derived, so you never type them.
A leg whose route hasn't been rebuilt yet shows as a dashed straight line with an estimated distance.

## Trip data format

```js
window.TRIP = {
  meta: {
    title, subtitle,
    startDate: "2027-08-23",   // day 1; all dates derive from this
    defaultUnits: "km",        // "km" or "mi" (viewer can toggle)
    cover: "images/<stop>/<file>.jpg",  // front-page card photo (optional)
    order: 1,                  // sort order on the front page (optional)
    season: "…", notes: ["…"], shorten: ["…"],   // shown at the bottom of the trip page
  },
  stops: [ /* ordered overnight places */ ],
};
```

Each **stop** is a place you sleep.

| field | meaning |
|---|---|
| `id` | unique slug; used for image folders and cached routes |
| `name`, `region` | display; consecutive stops with the same `region` are grouped in the day selector |
| `coords` | `[lat, lon]` |
| `nights` | nights here. 1 = ride in, leave next morning. N = 1 riding day + N−1 explore days. `0` on the **first** stop = a departure point with no day of its own. `0` on the last stop = an arrival day only. |
| `optional` | `true` shows an "optional stop" badge |
| `summary` | why you stop here |
| `ride` | how you get here from the previous stop (`null` on the first stop) |
| `ride.via` | `[[lat, lon, "label"], …]` waypoints that force the route; unlabelled points are not shown |
| `ride.roads`, `ride.notes` | text |
| `ride.long` | `true` flags a longer day |
| `ride.weighting` | Kurviger route style: `curvaturefastest` (default), `curvature`, `curvaturebooster` (extra curvy), `fastest` |
| `ride.mode: "ferry"` | sea crossing: drawn through `via`, not routed, excluded from riding totals. Add `ride.ferry: { operator, depart, arrive, hours }` |
| `highlights` | `[{ name, text }]` |
| `explore` | one entry per extra night: `{ title, text, loop? }`. `loop` is `[[lat, lon, "label"], …]`, a day ride from and back to the stop. |
| `sleep` | where to stay |
| `alerts` | things to check (closures, bookings), shown on the arrival day |
| `wiki` | Wikipedia article titles; the build downloads each article's lead photo |
| `gallery` | extra photos by hand: `[{ src, caption, credit }]`, with `src` relative to the trip folder or a full URL |

Tips:
- **Waypoints:** put them on the road you want, not next to it. The router snaps to the nearest road, and a point 300 m off can pull the route onto a farm track. If a leg's riding time looks absurd, a waypoint is usually the cause.
- **Photos:** if an article's lead image is a map or a road sign, the build skips it. Pick a different article, e.g. a viewpoint or a town instead of a highway.
