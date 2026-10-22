/*
 * Trip renderer, shared by every trip. trip.html loads trips/<slug>/trip.js,
 * routes.js and gallery.js (window.TRIP / ROUTES / GALLERY) before this file.
 * Contains no trip content — edit the data, not this file.
 */
(function () {
  "use strict";

  const TRIP = window.TRIP;
  const ROUTES = window.ROUTES || {};
  const GALLERY = window.GALLERY || {};
  const BASE = window.TRIP_BASE || "";
  const SLUG = window.TRIP_SLUG || "trip";
  const stops = TRIP.stops;
  const MI = 1609.344;
  const REGION_COLORS = ["#d9541e", "#2f7d6d", "#7c5cbf", "#c48a12", "#2b6cb0", "#b83280", "#5a7d2a", "#c05621", "#4a5568", "#0f766e", "#9b2c2c"];

  // ── helpers ──────────────────────────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const storage = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };
  // Must match routeKey() in tools/build.mjs.
  const routeKey = (pts) => pts.map((p) => `${(+p[0]).toFixed(4)},${(+p[1]).toFixed(4)}`).join(";");
  const haversine = (a, b) => {
    const R = 6371000, r = Math.PI / 180;
    const dLat = (b[0] - a[0]) * r, dLon = (b[1] - a[1]) * r;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  };
  const addDays = (iso, n) => {
    const d = new Date(iso + "T12:00:00");
    d.setDate(d.getDate() + n);
    return d;
  };
  const fmtDate = (d, opts = { weekday: "short", month: "short", day: "numeric" }) => d.toLocaleDateString("en-US", opts);

  let units = storage.get(`units:${SLUG}`) || TRIP.meta.defaultUnits || "mi";
  const fmtDist = (m) => (units === "km" ? `${Math.round(m / 1000).toLocaleString()} km` : `${Math.round(m / MI).toLocaleString()} mi`);
  const fmtHours = (s) => {
    const h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60 / 5) * 5;
    return m === 60 ? `${h + 1} h` : `${h} h${m ? " " + String(m).padStart(2, "0") : ""}`;
  };

  // ── derive legs and days from the data ────────────────────────────────────
  const regions = [];
  stops.forEach((s) => { if (!regions.includes(s.region)) regions.push(s.region); });
  const regionColor = (r) => REGION_COLORS[regions.indexOf(r) % REGION_COLORS.length];

  function makeLeg(id, pts, ferry) {
    if (ferry) {
      // Sea crossing: drawn through the via points as given; time comes from the data.
      let d = 0;
      for (let i = 1; i < pts.length; i++) d += haversine(pts[i - 1], pts[i]);
      return { id, pts, coords: pts.map((p) => [p[0], p[1]]), distance: d, duration: (ferry.hours || 0) * 3600, ferry, estimated: false };
    }
    const cached = ROUTES[id];
    if (cached && cached.key === routeKey(pts)) {
      return { id, pts, coords: cached.coords, distance: cached.distance, duration: cached.duration, estimated: false };
    }
    // Stale or missing: straight lines, distance padded for winding roads, 45 mph average.
    let d = 0;
    for (let i = 1; i < pts.length; i++) d += haversine(pts[i - 1], pts[i]);
    d *= 1.25;
    return { id, pts, coords: pts.map((p) => [p[0], p[1]]), distance: d, duration: d / (45 * MI / 3600), estimated: true };
  }

  const days = [];
  stops.forEach((stop, i) => {
    // nights: 0 on the first stop = just a departure point (no day of its own);
    // on any other stop it still gets its arrival day (e.g. arriving home).
    const nights = i === 0 && stop.nights === 0 ? 0 : Math.max(1, stop.nights || 0);
    for (let n = 0; n < nights; n++) {
      const day = { stop, stopIndex: i, night: n, index: days.length };
      if (n === 0) {
        day.kind = stop.ride && i > 0 ? "ride" : "start";
        if (day.kind === "ride") {
          day.from = stops[i - 1];
          const ferry = stop.ride.mode === "ferry" ? stop.ride.ferry || {} : null;
          day.leg = makeLeg(stop.id, [day.from.coords, ...(stop.ride.via || []), stop.coords], ferry);
        }
      } else {
        day.kind = "explore";
        day.explore = (stop.explore || [])[n - 1] || { title: "Free day", text: "Rest, laundry, wander." };
        if (day.explore.loop && day.explore.loop.length) {
          day.leg = makeLeg(`${stop.id}#${n - 1}`, [stop.coords, ...day.explore.loop, stop.coords]);
        }
      }
      day.date = addDays(TRIP.meta.startDate, day.index);
      days.push(day);
    }
  });
  const travelDays = days.filter((d) => d.kind === "ride");
  const rideDays = travelDays.filter((d) => !d.leg.ferry);
  const ferryDays = travelDays.filter((d) => d.leg.ferry);
  const tripSoFar = (day) => rideDays.filter((d) => d.index <= day.index).reduce((a, d) => a + d.leg.distance, 0);

  // ── header & notes ───────────────────────────────────────────────────────
  function renderHeader() {
    document.title = TRIP.meta.title;
    if (TRIP.meta.defaultUnits === "km" && !storage.get(`units:${SLUG}`)) units = "km";
    $("#title").textContent = TRIP.meta.title;
    $("#subtitle").textContent = TRIP.meta.subtitle || "";
    const dist = rideDays.reduce((a, d) => a + d.leg.distance, 0);
    const dur = rideDays.reduce((a, d) => a + d.leg.duration, 0);
    const loops = days.filter((d) => d.kind === "explore" && d.leg).reduce((a, d) => a + d.leg.distance, 0);
    const first = days[0].date, last = days[days.length - 1].date;
    const stat = (k, v) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`;
    $("#stats").innerHTML =
      stat("Days", days.length) +
      stat("Riding days", rideDays.length) +
      stat("Distance", fmtDist(dist)) +
      (loops ? stat("Optional day loops", "+" + fmtDist(loops)) : "") +
      (ferryDays.length ? stat("Ferry", fmtHours(ferryDays.reduce((a, d) => a + d.leg.duration, 0))) : "") +
      stat("Avg ride", fmtHours(dur / rideDays.length)) +
      stat("Dates", `${fmtDate(first, { month: "short", day: "numeric" })} – ${fmtDate(last, { month: "short", day: "numeric", year: "numeric" })}`);
    document.querySelectorAll(".units button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.units === units)));
    $("#legend").innerHTML = regions.map((r) => `<span><i style="background:${regionColor(r)}"></i>${esc(r)}</span>`).join("");
  }

  function renderNotes() {
    const m = TRIP.meta;
    const list = (arr) => `<ul>${(arr || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
    $("#trip-notes").innerHTML =
      `<div><h3>When to go</h3><p>${esc(m.season || "")}</p></div>` +
      `<div><h3>Good to know</h3>${list(m.notes)}</div>` +
      `<div><h3>Short on time?</h3>${list(m.shorten)}</div>`;
  }

  // ── maps ─────────────────────────────────────────────────────────────────
  // Esri World Topo: no API key, works from file:// too, shows terrain.
  const tileLayer = () =>
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
      attribution: "&copy; Esri, USGS, NPS, OpenStreetMap",
      maxZoom: 18,
    });
  const accent = () => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
  const divIcon = (cls, size) => L.divIcon({ className: "", html: `<div class="${cls}"></div>`, iconSize: [size, size], iconAnchor: [size / 2, size / 2] });

  let overview, overviewHighlight, dayMap, dayLayer;

  function initOverview() {
    overview = L.map("overview-map", { scrollWheelZoom: false, zoomSnap: 0.25 });
    tileLayer().addTo(overview);
    const all = [];
    travelDays.forEach((d) => {
      L.polyline(d.leg.coords, d.leg.ferry
        ? { color: "#2b6cb0", weight: 3, opacity: 0.8, dashArray: "2 8" }
        : { color: regionColor(d.stop.region), weight: 3.5, opacity: 0.85, dashArray: d.leg.estimated ? "6 6" : null })
        .on("click", () => select(d.index))
        .addTo(overview);
      all.push(...d.leg.coords);
    });
    stops.forEach((s, i) => {
      const cls = i === 0 ? "pin start" : i === stops.length - 1 ? "pin end" : s.nights > 1 ? "pin multi" : "pin";
      const size = s.nights > 1 || i === 0 || i === stops.length - 1 ? 16 : 12;
      L.marker(s.coords, { icon: divIcon(cls, size), title: s.name })
        .bindTooltip(`<b>${esc(s.name)}</b>${s.nights ? `<br>${s.nights} night${s.nights > 1 ? "s" : ""}` : ""}`, { direction: "top", offset: [0, -6] })
        .on("click", () => select(days.findIndex((d) => d.stop === s)))
        .addTo(overview);
    });
    overview.fitBounds(L.latLngBounds(all.length ? all : stops.map((s) => s.coords)), { padding: [16, 16] });
  }

  function highlightOverview(day) {
    if (overviewHighlight) overviewHighlight.remove();
    overviewHighlight = L.layerGroup().addTo(overview);
    if (day.leg && day.kind === "ride") {
      L.polyline(day.leg.coords, { color: "#fff", weight: 9, opacity: 0.9 }).addTo(overviewHighlight);
      L.polyline(day.leg.coords, { color: accent(), weight: 5.5 }).addTo(overviewHighlight);
    } else {
      L.circleMarker(day.stop.coords, { radius: 11, color: accent(), weight: 3, fillOpacity: 0.15 }).addTo(overviewHighlight);
    }
  }

  function renderDayMap(day) {
    if (!dayMap) {
      dayMap = L.map("day-map", { scrollWheelZoom: false, zoomSnap: 0.25 });
      tileLayer().addTo(dayMap);
    }
    if (dayLayer) dayLayer.remove();
    dayLayer = L.layerGroup().addTo(dayMap);
    if (day.leg) {
      L.polyline(day.leg.coords, { color: "#fff", weight: 8, opacity: 0.9 }).addTo(dayLayer);
      L.polyline(day.leg.coords, { color: day.leg.ferry ? "#2b6cb0" : accent(), weight: 5, dashArray: day.leg.ferry ? "2 10" : day.leg.estimated ? "8 8" : null }).addTo(dayLayer);
      day.leg.pts.slice(1, -1).filter((p) => p[2]).forEach((p) => {
        const m = L.marker([p[0], p[1]], { icon: divIcon("via-pin", 10) }).addTo(dayLayer);
        if (p[2]) m.bindTooltip(esc(p[2]), { className: "via-label", direction: "right", offset: [6, 0] });
      });
      if (day.kind === "ride") {
        L.marker(day.from.coords, { icon: divIcon("pin start", 14) }).bindTooltip(esc(day.from.name)).addTo(dayLayer);
      }
      L.marker(day.stop.coords, { icon: divIcon("pin end", 16) }).bindTooltip(esc(day.stop.name)).addTo(dayLayer);
      dayMap.fitBounds(L.latLngBounds(day.leg.coords), { padding: [24, 24] });
    } else {
      L.marker(day.stop.coords, { icon: divIcon("pin end", 16) }).bindTooltip(esc(day.stop.name)).addTo(dayLayer);
      dayMap.setView(day.stop.coords, 11);
    }
    dayMap.invalidateSize();
  }

  // ── links & exports ───────────────────────────────────────────────────────
  const kurvigerUrl = (pts, weighting) =>
    "https://kurviger.com/en/plan?" + pts.map((p) => `point=${(+p[0]).toFixed(5)},${(+p[1]).toFixed(5)}`).join("&") + `&weighting=${weighting || "curvaturefastest"}`;
  function googleUrl(pts) {
    const f = (p) => `${(+p[0]).toFixed(5)},${(+p[1]).toFixed(5)}`;
    const mid = pts.slice(1, -1).slice(0, 9).map(f).join("|");
    return `https://www.google.com/maps/dir/?api=1&origin=${f(pts[0])}&destination=${f(pts[pts.length - 1])}${mid ? "&waypoints=" + encodeURIComponent(mid) : ""}&travelmode=driving`;
  }
  const xml = (s) => esc(s);
  function gpxRoute(name, pts) {
    return `  <rte><name>${xml(name)}</name>\n${pts.map((p, i) => `    <rtept lat="${p[0]}" lon="${p[1]}"><name>${xml(p[2] || (i === 0 ? "Start" : i === pts.length - 1 ? "End" : "Via " + i))}</name></rtept>`).join("\n")}\n  </rte>`;
  }
  function downloadGpx(filename, routes) {
    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="coast-to-coast" xmlns="http://www.topografix.com/GPX/1/1">\n${routes.join("\n")}\n</gpx>\n`;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([body], { type: "application/gpx+xml" }));
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  const namedPts = (day) => {
    const pts = day.leg.pts.map((p) => [...p]);
    if (day.kind === "ride") pts[0][2] = day.from.name;
    pts[pts.length - 1][2] = day.stop.name;
    return pts;
  };
  const dayTitle = (day) =>
    day.kind === "ride" ? `${day.from.name} → ${day.stop.name}` : day.kind === "explore" ? day.explore.title : `Start: ${day.stop.name}`;

  // ── day selector ─────────────────────────────────────────────────────────
  function renderChips() {
    const groups = [];
    days.forEach((d) => {
      const g = groups[groups.length - 1];
      if (g && g.region === d.stop.region) g.days.push(d);
      else groups.push({ region: d.stop.region, days: [d] });
    });
    $("#days").innerHTML = groups
      .map(
        (g) =>
          `<div class="region-group"><div class="region-label" style="color:${regionColor(g.region)}">${esc(g.region)}</div><div class="region-days">` +
          g.days
            .map((d) => {
              const label = d.stop.name.split(/[,(]/)[0].trim();
              const cls = `chip ${d.leg && d.leg.ferry ? "ferry" : d.kind}${d.stop.optional ? " optional" : ""}`;
              return `<button class="${cls}" data-day="${d.index}" title="Day ${d.index + 1}: ${esc(dayTitle(d))}"><b><i class="dot"></i>Day ${d.index + 1}</b><span>${esc(label)}</span></button>`;
            })
            .join("") +
          `</div></div>`
      )
      .join("");
  }

  // ── day view ─────────────────────────────────────────────────────────────
  function renderDay(day) {
    const s = day.stop;
    const ride = s.ride || {};
    const isRide = day.kind === "ride";
    const kindLabel = day.leg && day.leg.ferry ? "Ferry" : { ride: "Riding day", explore: "Stay & explore", start: "Departure city" }[day.kind];
    const badges = [
      `<span class="badge accent">${kindLabel}</span>`,
      s.nights > 1 ? `<span class="badge">${s.nights} nights here</span>` : "",
      isRide && ride.long ? `<span class="badge accent">Longer day</span>` : "",
      s.optional ? `<span class="badge">Optional stop</span>` : "",
      `<span class="badge">${esc(s.region)}</span>`,
    ].join("");

    const f = day.leg && day.leg.ferry;
    const stats = f
      ? `<dl class="ride-stats">
          <div><dt>Departs</dt><dd>${esc(f.depart || "—")}</dd></div>
          <div><dt>Arrives</dt><dd>${esc(f.arrive || "—")}</dd></div>
          <div><dt>Crossing</dt><dd>${f.hours ? f.hours + " h" : "—"}</dd></div>
        </dl>`
      : day.leg
      ? `<dl class="ride-stats">
          <div><dt>Distance</dt><dd>${fmtDist(day.leg.distance)}</dd></div>
          <div><dt>Riding time</dt><dd>${fmtHours(day.leg.duration)}${day.leg.estimated ? ' <span class="est">est.</span>' : ""}</dd></div>
          <div><dt>Trip so far</dt><dd>${fmtDist(tripSoFar(day))}</dd></div>
        </dl>`
      : "";

    const routePanel = isRide
      ? `<div class="panel card"><h3>${f ? "The crossing" : "The ride"}</h3>
          <p class="roads">${esc(ride.roads)}</p>
          ${ride.notes ? `<p class="muted">${esc(ride.notes)}</p>` : ""}
          <ul class="via">${day.leg.pts.map((p, i) => (i === 0 ? day.from.name : i === day.leg.pts.length - 1 ? s.name : p[2])).filter(Boolean).map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
        </div>`
      : day.kind === "explore"
      ? `<div class="panel card"><h3>${esc(day.explore.title)}</h3><p>${esc(day.explore.text)}</p></div>`
      : "";

    const alerts = (s.alerts || []).length && day.night === 0
      ? `<div class="alerts"><ul>${s.alerts.map((a) => `<li>${esc(a)}</li>`).join("")}</ul></div>`
      : "";

    const highlights = (s.highlights || []).length
      ? `<div class="panel card"><h3>Highlights${day.night > 0 ? ` in ${esc(s.name.split(",")[0])}` : ""}</h3><ul class="hl">${s.highlights
          .map((h) => `<li><b>${esc(h.name)}</b>${esc(h.text)}</li>`)
          .join("")}</ul></div>`
      : "";

    const sleep = s.sleep ? `<div class="panel card"><h3>Where to stay</h3><p>${esc(s.sleep)}</p></div>` : "";

    const actions = day.leg && !day.leg.ferry
      ? `<div class="actions">
          <a class="btn primary" target="_blank" rel="noopener" href="${kurvigerUrl(day.leg.pts, isRide ? ride.weighting : "curvature")}">Open in Kurviger</a>
          <a class="btn" target="_blank" rel="noopener" href="${googleUrl(day.leg.pts)}">Google Maps</a>
          <button class="btn" id="gpx-day">GPX</button>
        </div>`
      : "";

    const nextIdx = day.index + 1 < days.length ? day.index + 1 : null;
    const imgs = galleryFor(s);

    $("#day").innerHTML = `
      <div class="day-map-col">
        <div class="card"><div id="day-map" class="map map-day"></div>${actions}</div>
      </div>
      <div class="day-body">
        <div class="day-head">
          <div class="kicker">Day ${day.index + 1} · ${fmtDate(day.date)}</div>
          <h2>${esc(dayTitle(day))}</h2>
          <p class="summary">${day.kind === "explore" ? `Day ${day.night + 1} of ${s.nights} in ${esc(s.name)}.` : esc(s.summary)}</p>
          <div class="badges">${badges}</div>
        </div>
        ${stats}${alerts}${routePanel}${highlights}${sleep}
        ${nextIdx !== null ? `<p class="muted">Next: <a href="#day-${nextIdx + 1}">Day ${nextIdx + 1} — ${esc(dayTitle(days[nextIdx]))}</a></p>` : `<p class="muted">🏁 That's the whole country.</p>`}
      </div>
      ${imgs.length
        ? `<div class="gallery"><h3>${esc(s.name)} in pictures</h3><div class="grid">${imgs
            .map((g, i) => `<button data-img="${i}"><img loading="lazy" src="${esc(g.src)}" alt="${esc(g.caption)}"><span>${esc(g.caption)}</span></button>`)
            .join("")}</div></div>`
        : ""}`;

    dayMap = null; // container was replaced
    renderDayMap(day);
    const gpxBtn = $("#gpx-day");
    if (gpxBtn) gpxBtn.onclick = () => downloadGpx(`${SLUG}-day-${String(day.index + 1).padStart(2, "0")}-${s.id}.gpx`, [gpxRoute(`Day ${day.index + 1}: ${dayTitle(day)}`, namedPts(day))]);
    document.querySelectorAll(".grid button").forEach((b) => (b.onclick = () => openLightbox(imgs, +b.dataset.img)));
  }

  const withBase = (src) => (/^(https?:)?\/\//.test(src) ? src : BASE + src);
  const galleryFor = (stop) => [...(GALLERY[stop.id] || []), ...(stop.gallery || [])].map((g) => ({ ...g, src: withBase(g.src) }));

  // ── lightbox ─────────────────────────────────────────────────────────────
  let lb = { imgs: [], i: 0 };
  function openLightbox(imgs, i) {
    lb = { imgs, i };
    showLightbox();
    $("#lightbox").hidden = false;
  }
  function showLightbox() {
    const g = lb.imgs[lb.i];
    const box = $("#lightbox");
    box.querySelector("img").src = g.src;
    box.querySelector("img").alt = g.caption || "";
    const credit = [g.credit, g.source ? `<a href="${esc(g.source)}" target="_blank" rel="noopener">source</a>` : ""].filter(Boolean);
    box.querySelector("figcaption").innerHTML = `${esc(g.caption)}${g.description ? " — " + esc(g.description) : ""}<small>${credit.map((c, i) => (i === 0 && g.credit ? esc(c) : c)).join(" · ")}</small>`;
  }
  function stepLightbox(d) {
    lb.i = (lb.i + d + lb.imgs.length) % lb.imgs.length;
    showLightbox();
  }
  $("#lightbox .lb-close").onclick = () => ($("#lightbox").hidden = true);
  $("#lightbox .lb-prev").onclick = () => stepLightbox(-1);
  $("#lightbox .lb-next").onclick = () => stepLightbox(1);
  $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") e.currentTarget.hidden = true; });

  // ── selection & navigation ───────────────────────────────────────────────
  let current = -1;
  function select(i, { push = true } = {}) {
    i = Math.max(0, Math.min(days.length - 1, i));
    if (i === current) return;
    current = i;
    const day = days[i];
    document.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-current", String(+c.dataset.day === i)));
    const chip = document.querySelector(`.chip[data-day="${i}"]`);
    if (chip) {
      const box = $("#days");
      box.scrollTo({ left: chip.offsetLeft - box.clientWidth / 2 + chip.clientWidth / 2 });
    }
    $("#prev").disabled = i === 0;
    $("#next").disabled = i === days.length - 1;
    renderDay(day);
    highlightOverview(day);
    if (push) history.replaceState(null, "", `#day-${i + 1}`);
  }
  const dayFromHash = () => {
    const m = location.hash.match(/day-(\d+)/);
    return m ? +m[1] - 1 : 0;
  };

  $("#days").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (b) select(+b.dataset.day);
  });
  $("#prev").onclick = () => select(current - 1);
  $("#next").onclick = () => select(current + 1);
  window.addEventListener("hashchange", () => select(dayFromHash(), { push: false }));
  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea")) return;
    const open = !$("#lightbox").hidden;
    if (e.key === "Escape" && open) $("#lightbox").hidden = true;
    else if (e.key === "ArrowLeft") open ? stepLightbox(-1) : select(current - 1);
    else if (e.key === "ArrowRight") open ? stepLightbox(1) : select(current + 1);
  });
  document.querySelectorAll(".units button").forEach((b) =>
    (b.onclick = () => {
      units = b.dataset.units;
      storage.set(`units:${SLUG}`, units);
      renderHeader();
      const c = current;
      current = -1;
      select(c, { push: false });
    })
  );
  $("#gpx-all").onclick = () =>
    downloadGpx(`${SLUG}-full.gpx`, rideDays.map((d) => gpxRoute(`Day ${d.index + 1}: ${dayTitle(d)}`, namedPts(d))));

  // ── boot ─────────────────────────────────────────────────────────────────
  renderHeader();
  renderNotes();
  renderChips();
  initOverview();
  select(dayFromHash(), { push: false });
})();
