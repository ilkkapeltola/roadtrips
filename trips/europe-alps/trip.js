// Three weeks from Finland: ferry to Germany, the big Alpine passes, back via Prague.
// Format: see "Trip data format" in README.md. After editing, run: node tools/build.mjs europe-alps

window.TRIP = {
  meta: {
    title: "Helsinki to the Alps",
    subtitle: "Three weeks: ferry to Germany, Koblenz and the Rhine, Swiss & Italian passes, the Dolomites, home via Prague",
    startDate: "2027-08-23",
    defaultUnits: "km",
    cover: "images/canazei/passo-giau.jpg",
    order: 1,
    season:
      "Late August → mid-September. The high passes (Stelvio, Grimsel, Furka, Großglockner) are reliably open, the August holiday crowds " +
      "in Italy and Austria have thinned, and it's still warm in the valleys. Bring layers: it can be 5 °C on Stelvio and 28 °C at Lake Como on the same day.",
    notes: [
      "Finnlines Helsinki (Vuosaari) ↔ Travemünde cuts out ~1,800 km of riding through the Baltics and Poland each way. Book a cabin; the bike is strapped down by the crew.",
      "Vignettes: Switzerland needs one for motorcycles (CHF 40, e-vignette online). Austria's motorcycle vignette is digital-only from 2027 (10-day ≈ €5). Germany and Czech motorways are free for motorcycles. Italian autostrade are pay-at-booth.",
      "Mountain-road etiquette: horn before blind hairpins on narrow passes, give way to postal buses (they have priority in Switzerland), and expect cyclists everywhere on the big climbs.",
      "Riding times assume car speeds from the router; on pass days add 30–60 min for photo stops.",
    ],
    shorten: [
      "Drop the Prague rest day: −1 day.",
      "Skip the Black Forest: ride Koblenz → Lucerne in one long day (~5 h, mostly motorway) and gain a second Dolomites day instead.",
      "Short on time entirely? Take the ferry both ways and do only Lucerne → Lauterbrunnen → Como → Bormio → Dolomites → Großglockner (≈ 12 days door to door).",
    ],
  },

  stops: [
    // ─────────────────────────────── BALTIC CROSSING ─────────────────────────
    {
      id: "helsinki",
      name: "Helsinki (Vuosaari harbour)",
      region: "Baltic crossing",
      coords: [60.2069, 25.1946],
      nights: 0, // departure point only
      summary: "Check in at Vuosaari harbour about 2 h before the 15:00 sailing.",
      ride: null,
      highlights: [],
      explore: [],
      sleep: "",
      alerts: [],
      wiki: [],
      gallery: [],
    },
    {
      id: "aboard-out",
      name: "Aboard Finnlines, Baltic Sea",
      region: "Baltic crossing",
      coords: [57.6, 19.4],
      nights: 1,
      summary: "Overnight ferry across the Baltic. Sauna, buffet dinner, sleep — the easiest 1,100 km of the trip.",
      ride: {
        mode: "ferry",
        ferry: { operator: "Finnlines", depart: "15:00", arrive: "21:00 +1 day", hours: 30 },
        via: [
          [59.9, 24.4],
          [59.5, 22.2],
          [58.6, 20.6],
        ],
        roads: "Finnlines Helsinki (Vuosaari) → Travemünde, Finnstar / Finnmaid / Finnlady class ropax",
        notes: "Motorcycles board first or last — follow the crew. Bring your own soft straps if you're fussy about where they go on the bike.",
      },
      highlights: [
        { name: "Sea sauna", text: "The Finnlines ships have saunas — the perfect start." },
        { name: "Gulf of Finland archipelago", text: "Stand on deck for the first hour as the ship threads out past the islands off Helsinki." },
      ],
      explore: [],
      sleep: "Book an outside cabin; the ferry is also your hotel for the first night.",
      alerts: ["Times differ slightly between sources (arrival 21:00 vs 22:00) — confirm on finnlines.com when booking."],
      wiki: ["MS_Finnmaid"],
      gallery: [],
    },

    // ────────────────────────────────── GERMANY ──────────────────────────────
    {
      id: "lubeck",
      name: "Lübeck, Germany",
      region: "Germany",
      coords: [53.8655, 10.6866],
      nights: 1,
      summary: "Arrive in Travemünde late evening, 25 minutes' ride to the medieval Hanseatic capital.",
      ride: {
        mode: "ferry",
        ferry: { operator: "Finnlines", depart: "at sea", arrive: "≈ 21:00", hours: 6 },
        via: [
          [56.6, 18.0],
          [55.3, 14.6],
          [54.5, 12.0],
          [53.9616, 10.8686, "Travemünde"],
        ],
        roads: "Ferry into Travemünde → B75 into Lübeck (20 km)",
        notes: "Arrival is after dark — book a hotel with late check-in and parking in advance.",
      },
      highlights: [
        { name: "Holstentor", text: "The leaning brick city gate, symbol of the Hanseatic League." },
        { name: "Old town island", text: "UNESCO-listed brick Gothic: St. Mary's Church, Buddenbrook House, tiny courtyards (Gänge)." },
        { name: "Niederegger marzipan", text: "Breakfast of champions: marzipan cake at the Niederegger café." },
      ],
      explore: [],
      sleep: "Old-town hotels with garages (Radisson Senator, Hotel Lindenhof).",
      alerts: [],
      wiki: ["Holstentor", "Lübeck"],
      gallery: [],
    },
    {
      id: "wernigerode",
      name: "Wernigerode (Harz), Germany",
      region: "Germany",
      coords: [51.835, 10.7854],
      nights: 1,
      summary: "Half-timbered fairy-tale town at the foot of the Harz mountains — northern Germany's best riding.",
      ride: {
        via: [
          [53.2464, 10.4115, "Lüneburg"],
          [51.8, 10.539, "Torfhaus (B4)"],
          [51.766, 10.664, "Schierke"],
        ],
        roads: "A1/B209 to Lüneburg → B4 south into the Harz → Torfhaus → Schierke → Wernigerode",
        notes: "Flat until Bad Harzburg, then the Harz roads (B4, B242, L100) start twisting. Lüneburg makes a good coffee stop.",
        long: true,
      },
      highlights: [
        { name: "Lüneburg", text: "Wealthy salt-trading town of crooked brick gables." },
        { name: "Torfhaus", text: "Biker meeting point on the B4 with a view to the Brocken." },
        { name: "Brocken narrow-gauge railway", text: "Steam train from Wernigerode up the Harz's highest peak (1,141 m) — witches' mountain of Goethe's Faust." },
        { name: "Wernigerode Castle", text: "Romantic hilltop castle over a town of 1,000 timber-framed houses." },
      ],
      explore: [],
      sleep: "Hotel Gothisches Haus on the market square, or Harz biker hotels around Schierke.",
      alerts: [],
      wiki: ["Wernigerode_Castle", "Brocken", "Lüneburg"],
      gallery: [],
    },
    {
      id: "koblenz",
      name: "Koblenz, Germany",
      region: "Germany",
      coords: [50.3597, 7.5978],
      nights: 1,
      summary: "Back to your old university town, where the Moselle meets the Rhine — twenty years on.",
      ride: {
        via: [],
        roads: "Harz back roads → autobahn west via Kassel and the Westerwald → Koblenz",
        notes:
          "A transit day on the autobahn. Arrive mid-afternoon to leave time to wander the old haunts. Add your old campus or flat as a waypoint here and it'll be on the map and in the Kurviger/GPX export.",
        long: true,
      },
      highlights: [
        { name: "Deutsches Eck", text: "The 'German Corner' where the Moselle flows into the Rhine, under the giant Kaiser Wilhelm statue." },
        { name: "Ehrenbreitstein Fortress", text: "Ride or take the cable car across the Rhine up to the fortress for the view over both rivers." },
        { name: "Altstadt", text: "Görresplatz, Florinsmarkt, the 'Schängel' fountain that spits at passers-by, and a Riesling in a wine bar on the Moselle bank." },
        { name: "Old haunts", text: "Your university, your old street, the bar you remember. Things may have changed in 20 years; the Rhine hasn't." },
      ],
      explore: [],
      sleep: "Altstadt hotels near the Moselle (Hotel Kornpforte, Diehls Hotel across the Rhine with the view).",
      alerts: [],
      wiki: ["Deutsches_Eck", "Ehrenbreitstein_Fortress", "Koblenz"],
      gallery: [],
    },
    {
      id: "freudenstadt",
      name: "Freudenstadt (Black Forest), Germany",
      region: "Germany",
      coords: [48.4633, 8.411],
      nights: 1,
      summary: "Up the Rhine Gorge past the Loreley and a castle on every bend, then the Black Forest High Road (B500).",
      ride: {
        via: [
          [50.1517, 7.7128, "St. Goar (Loreley view)"],
          [49.967, 7.899, "Bingen / Rüdesheim"],
          [48.7606, 8.2398, "Baden-Baden"],
          [48.598, 8.201, "Mummelsee (B500)"],
        ],
        roads: "B9 along the Rhine Gorge → Bingen → A61/A5 → Baden-Baden → B500 Schwarzwaldhochstraße → Freudenstadt",
        notes: "The Rhine Gorge (UNESCO) from Koblenz to Bingen is 60 km of castles, vineyards and river barges — take it slow. Then motorway to Baden-Baden and the B500: 60 km along the ridge at ~1,000 m.",
        long: true,
      },
      highlights: [
        { name: "Rhine Gorge & Loreley", text: "The legendary rock where the siren lured boatmen; Marksburg and Burg Rheinfels along the way." },
        { name: "Baden-Baden", text: "Belle-époque spa town; Friedrichsbad Roman-Irish baths if you have 3 hours." },
        { name: "Schwarzwaldhochstraße (B500)", text: "Ridge road with Mummelsee lake and the Hornisgrinde viewpoint." },
        { name: "Freudenstadt market square", text: "Germany's largest market square, arcaded and lively in the evening." },
      ],
      explore: [],
      sleep: "Freudenstadt hotels, or Hotel Mummelsee right on the B500.",
      alerts: [],
      wiki: ["Mummelsee", "Baden-Baden", "Lorelei"],
      gallery: [],
    },

    // ──────────────────────────────── SWITZERLAND ────────────────────────────
    {
      id: "lucerne",
      name: "Lucerne, Switzerland",
      region: "Switzerland",
      coords: [47.0502, 8.3093],
      nights: 1,
      summary: "Through the southern Black Forest and past Europe's biggest waterfall into Switzerland.",
      ride: {
        via: [
          [48.13, 8.232, "Triberg (waterfalls)"],
          [47.903, 8.154, "Titisee"],
          [47.6779, 8.6155, "Rhine Falls"],
        ],
        roads: "B500 south → Triberg → B31/B500 → Titisee → B315/B34 → Schaffhausen → A4/A14 → Lucerne",
        notes: "Buy the Swiss motorway vignette online before the border. The approach from Zürich to Lucerne is motorway — fine.",
      },
      highlights: [
        { name: "Triberg", text: "Germany's highest waterfalls and the world's largest cuckoo clocks." },
        { name: "Titisee", text: "Glacial lake; Black Forest cake by the water." },
        { name: "Rhine Falls", text: "Europe's most powerful waterfall — take the boat to the rock in the middle." },
        { name: "Chapel Bridge, Lucerne", text: "14th-century covered wooden bridge with painted panels, lake and Pilatus behind." },
      ],
      explore: [],
      sleep: "Old-town hotels near the river (Hotel des Balances), or cheaper across the lake in Weggis.",
      alerts: ["Swiss vignette required on motorways for motorcycles too (CHF 40, valid the calendar year)."],
      wiki: ["Triberg_Waterfalls", "Rhine_Falls", "Chapel_Bridge"],
      gallery: [],
    },
    {
      id: "lauterbrunnen",
      name: "Lauterbrunnen, Switzerland",
      region: "Switzerland",
      coords: [46.5935, 7.9091],
      nights: 2,
      summary: "The valley of 72 waterfalls under the Eiger, Mönch and Jungfrau. Short ride, then a day off the bike up high.",
      ride: {
        via: [
          [46.7577, 8.1381, "Brünig Pass"],
          [46.7547, 8.0353, "Brienz"],
          [46.6863, 7.8632, "Interlaken"],
        ],
        roads: "A8 along Lake Sarnen → Brünig Pass → Brienz → along Lake Brienz → Interlaken → Lauterbrunnen",
        notes: "Only ~80 km — arrive by lunchtime and take the cable car up to Mürren for the afternoon.",
      },
      highlights: [
        { name: "Lake Brienz", text: "Turquoise glacial lake; Giessbach Falls hotel on the far shore." },
        { name: "Staubbach Falls", text: "297 m free-falling waterfall right in the village." },
        { name: "Trümmelbach Falls", text: "Ten glacial waterfalls inside the mountain, reached by tunnel lift." },
        { name: "Mürren", text: "Car-free cliff-top village — Eiger, Mönch and Jungfrau across the valley." },
      ],
      explore: [
        {
          title: "Up high: Jungfraujoch or Schilthorn",
          text:
            "Leave the bike. Either the train to Jungfraujoch (3,454 m, 'Top of Europe', Aletsch Glacier — pricey, book a timed seat) " +
            "or the cable car via Mürren to Schilthorn (2,970 m, revolving restaurant from the Bond film). Hike Grütschalp → Mürren on the way back.",
        },
      ],
      sleep: "Hotel Silberhorn or a chalet in Lauterbrunnen; Mürren if you want the view from bed.",
      alerts: [],
      wiki: ["Lauterbrunnen", "Staubbach_Falls", "Mürren", "Jungfraujoch"],
      gallery: [],
    },

    // ─────────────────────────────── ITALIAN ALPS ────────────────────────────
    {
      id: "menaggio",
      name: "Menaggio (Lake Como), Italy",
      region: "Italian Alps",
      coords: [46.0213, 9.2384],
      nights: 2,
      summary: "The great Swiss pass day — Grimsel, Furka and the cobbled Tremola — then down to the palms of Lake Como.",
      ride: {
        via: [
          [46.5613, 8.337, "Grimsel Pass"],
          [46.5727, 8.415, "Furka Pass"],
          [46.6357, 8.5935, "Andermatt"],
          [46.555, 8.5655, "Gotthard Pass (Tremola)"],
          [46.1935, 9.024, "Bellinzona"],
          [46.0037, 8.9511, "Lugano"],
        ],
        roads: "Grimsel Pass → Gletsch → Furka Pass → Andermatt → Gotthard via the old cobbled Tremola → Bellinzona → Lugano → Menaggio",
        notes:
          "THE day. Grimsel's granite and dam lakes, Furka's James Bond hairpins (Goldfinger) above the Rhône Glacier, then the 24 cobbled hairpins of the Tremola. Start early — passes get busy by 11:00.",
        long: true,
        weighting: "curvature",
      },
      highlights: [
        { name: "Grimsel Pass", text: "Bare granite and turquoise reservoirs at 2,164 m." },
        { name: "Furka Pass & Hotel Belvédère", text: "Hairpins from Goldfinger; the abandoned Belvédère hotel at the Rhône Glacier." },
        { name: "Tremola", text: "1830s cobbled road over the Gotthard — 24 hairpins, the most famous in Switzerland." },
        { name: "Lake Como", text: "Villas, gardens and ferries; Menaggio is central for hopping to Bellagio and Varenna." },
      ],
      explore: [
        {
          title: "Lake Como by boat",
          text:
            "Day off the bike: ferry Menaggio → Bellagio → Varenna. Villa Carlotta's gardens (Tremezzo), lunch on the water in Varenna, aperitivo in Bellagio. " +
            "Or, if you want to ride: the twisty Valsolda road along Lake Lugano and up to Monte San Primo.",
        },
      ],
      sleep: "Grand Hotel Menaggio, or B&Bs above town with parking (lakeside parking is scarce).",
      alerts: ["Grimsel and Furka are high passes — check pass status (alpen-paesse.ch) the morning of; early snow is possible in September."],
      wiki: ["Grimsel_Pass", "Furka_Pass", "Gotthard_Pass", "Lake_Como", "Bellagio,_Lombardy"],
      gallery: [],
    },
    {
      id: "bormio",
      name: "Bormio, Italy",
      region: "Italian Alps",
      coords: [46.4669, 10.3705],
      nights: 1,
      summary: "North through the Engadin over Maloja and Bernina, fuel up duty-free in Livigno, and sleep at the foot of the Stelvio.",
      ride: {
        via: [
          [46.32, 9.4, "Chiavenna"],
          [46.401, 9.695, "Maloja Pass"],
          [46.4908, 9.8355, "St. Moritz"],
          [46.4106, 10.0236, "Bernina Pass"],
          [46.538, 10.135, "Livigno (duty-free fuel)"],
        ],
        roads: "SS340/SS36 → Chiavenna → Maloja Pass → St. Moritz → Bernina Pass → Forcola di Livigno → Livigno → Passo Foscagno → Bormio",
        notes: "Maloja's hairpins climb straight out of Italy into the high Engadin lakes. Livigno is a tax-free zone — fill the tank (and buy cheap chocolate).",
        weighting: "curvature",
      },
      highlights: [
        { name: "Maloja Pass", text: "Steep wall of hairpins up from Val Bregaglia to the Engadin." },
        { name: "St. Moritz & Engadin lakes", text: "High-altitude lakes at 1,800 m." },
        { name: "Bernina Pass", text: "Glaciers of Piz Palü; watch the red Bernina Express train climb beside the road." },
        { name: "Bormio", text: "Old town with Roman-era thermal baths — soak at Bagni Vecchi." },
      ],
      explore: [],
      sleep: "Bormio old-town hotels; QC Terme Bagni di Bormio for the hot pools.",
      alerts: [],
      wiki: ["Maloja_Pass", "Bernina_Pass", "Livigno", "Bormio"],
      gallery: [],
    },

    // ──────────────────────────────── DOLOMITES ──────────────────────────────
    {
      id: "canazei",
      name: "Canazei (Dolomites), Italy",
      region: "Dolomites",
      coords: [46.4766, 11.77],
      nights: 2,
      summary: "Over the Stelvio (48 hairpins on the north side) and through South Tyrol into the heart of the Dolomites.",
      ride: {
        via: [
          [46.5286, 10.4532, "Stelvio Pass (2,757 m)"],
          [46.6196, 10.5932, "Prato allo Stelvio"],
          [46.6713, 11.1594, "Merano"],
          [46.4983, 11.3548, "Bolzano"],
          [46.406, 11.611, "Passo Costalunga (Karerpass)"],
        ],
        roads: "SS38 Stelvio from Bormio → 48 hairpins down to Prato → Val Venosta → Merano → Bolzano → Val d'Ega & Karerpass → Val di Fassa",
        notes:
          "Ride Stelvio early (before 9:00) — by midday it's crowded with cars, cyclists and campers. Lago di Carezza (Karersee) is a must-stop on the Karerpass.",
        long: true,
        weighting: "curvature",
      },
      highlights: [
        { name: "Stelvio Pass", text: "2,757 m, the second-highest paved pass in the Alps; 48 numbered hairpins on the Trafoi side." },
        { name: "Merano", text: "Spa town with palm trees and arcaded streets — good lunch stop." },
        { name: "Lago di Carezza", text: "Emerald lake beneath the Latemar spires." },
        { name: "Canazei", text: "Base of the Sella Ronda; Marmolada glacier (3,343 m) overhead." },
      ],
      explore: [
        {
          title: "Dolomites grand loop: Pordoi, Falzarego, Giau, Fedaia",
          text:
            "The best riding day of the trip. Passo Pordoi → Arabba → Passo Falzarego (Lagazuoi cable car) → Cortina d'Ampezzo for lunch → " +
            "Passo Giau (29 hairpins, Nuvolau peaks — the most beautiful pass in the Dolomites) → Colle Santa Lucia → Passo Fedaia under the Marmolada glacier → back to Canazei.",
          loop: [
            [46.488, 11.812, "Passo Pordoi"],
            [46.5, 11.876, "Arabba"],
            [46.519, 12.009, "Passo Falzarego"],
            [46.5405, 12.1357, "Cortina d'Ampezzo"],
            [46.483, 12.053, "Passo Giau"],
            [46.445, 12.016, "Colle Santa Lucia"],
            [46.459, 11.862, "Passo Fedaia (Marmolada)"],
          ],
        },
      ],
      sleep: "Canazei or Campitello di Fassa — many hotels here are 'bike hotels' with garages and wash stations.",
      alerts: [
        "Stelvio closes to motor traffic on its 'Stelvio Bike Day' (a Saturday in late Aug / early Sept) — check the date before fixing this day.",
        "Sellaronda Bike Day closes Pordoi, Sella, Gardena and Campolongo 9:00–16:00 on one Saturday in September (12 Sep in 2026).",
        "Passo Gardena (not on this route) may become a limited-traffic zone from 2027 — the loop above deliberately avoids it.",
      ],
      wiki: ["Stelvio_Pass", "Passo_Giau", "Marmolada", "Lago_di_Carezza"],
      gallery: [],
    },

    // ────────────────────────────────── AUSTRIA ──────────────────────────────
    {
      id: "zell-am-see",
      name: "Zell am See, Austria",
      region: "Austria",
      coords: [47.3239, 12.7964],
      nights: 1,
      summary: "Out of the Dolomites via Val Badia and Lienz, then over the Großglockner High Alpine Road — Austria's showpiece.",
      ride: {
        via: [
          [46.488, 11.812, "Passo Pordoi"],
          [46.5, 11.876, "Arabba"],
          [46.5405, 11.892, "Passo Campolongo"],
          [46.7963, 11.936, "Brunico"],
          [46.8297, 12.769, "Lienz"],
          [47.0393, 12.843, "Heiligenblut"],
          [47.083, 12.842, "Hochtor (Großglockner Road)"],
        ],
        roads: "Pordoi → Campolongo → Val Badia → Brunico → Pustertal → Lienz → Heiligenblut → Großglockner High Alpine Road → Zell am See",
        notes:
          "Long but spectacular. Take the 'Kaiser-Franz-Josefs-Höhe' spur (+ 16 km) to look straight at the Pasterze glacier and the Großglockner (3,798 m). Toll ≈ €36 for a motorcycle.",
        long: true,
      },
      highlights: [
        { name: "Val Badia", text: "Ladin-speaking valley with wooden farmhouses below the Sella massif." },
        { name: "Lienz", text: "Sunny East Tyrol town — Italian-style piazza for an espresso." },
        { name: "Großglockner High Alpine Road", text: "48 km, 36 hairpins, up to 2,504 m at Hochtor; Edelweißspitze is the highest viewpoint." },
        { name: "Zell am See", text: "Lake town beneath the Schmittenhöhe; swim if it's warm." },
      ],
      explore: [],
      sleep: "Zell am See lakeside hotels, or Fusch at the foot of the Glockner for quiet.",
      alerts: ["Großglockner toll ≈ €36.50 per motorcycle (2026); online tickets are slightly cheaper.", "Austrian motorway vignette is digital-only from Feb 2027 — buy online before entering."],
      wiki: ["Grossglockner_High_Alpine_Road", "Grossglockner", "Zell_am_See"],
      gallery: [],
    },

    // ────────────────────────────────── CZECHIA ──────────────────────────────
    {
      id: "cesky-krumlov",
      name: "Český Krumlov, Czechia",
      region: "Czechia",
      coords: [48.8127, 14.3175],
      nights: 1,
      summary: "Past Salzburg and through the Salzkammergut lakes to a Renaissance town in a loop of the Vltava.",
      ride: {
        via: [
          [47.8095, 13.055, "Salzburg"],
          [48.3069, 14.2858, "Linz"],
        ],
        roads: "B311 → Salzburg → A1 → Linz → E55 north → Český Krumlov",
        notes: "Czech motorways are toll-free for motorcycles. Mind the 0.0 ‰ alcohol limit in Czechia. Optional +45 min: Wolfgangsee and Mondsee instead of the A1 out of Salzburg.",
        long: true,
      },
      highlights: [
        { name: "Salzburg", text: "Mozart's city — Getreidegasse and the fortress, or just ride through." },
        { name: "Wolfgangsee (optional)", text: "Postcard Salzkammergut lake; White Horse Inn at St. Wolfgang." },
        { name: "Český Krumlov", text: "UNESCO town wrapped in a river bend; castle with a baroque theatre and the bear moat." },
      ],
      explore: [],
      sleep: "Hotel Ruze or a pension in the old town (park outside the centre — it's pedestrian).",
      alerts: [],
      wiki: ["Český_Krumlov", "Český_Krumlov_Castle", "Wolfgangsee"],
      gallery: [],
    },
    {
      id: "prague",
      name: "Prague, Czechia",
      region: "Czechia",
      coords: [50.0875, 14.4213],
      nights: 2,
      summary: "Via the fairy-tale Hluboká castle to the city of a hundred spires. A last rest day before the ride north.",
      ride: {
        via: [
          [49.052, 14.439, "Hluboká Castle"],
          [49.4144, 14.6578, "Tábor"],
        ],
        roads: "Route 3/E55 → Hluboká nad Vltavou → Tábor → D1/D3 into Prague",
        notes: "Park the bike in a guarded garage for the rest day — the old town is best on foot and by tram.",
      },
      highlights: [
        { name: "Hluboká Castle", text: "White neo-Gothic castle modelled on Windsor." },
        { name: "Charles Bridge", text: "Go at sunrise to have the statues to yourself." },
        { name: "Prague Castle & St. Vitus", text: "Largest ancient castle complex in the world." },
        { name: "Old Town Square", text: "Astronomical clock (1410) — on the hour, the apostles parade." },
      ],
      explore: [
        {
          title: "Prague on foot",
          text: "Charles Bridge at dawn, Prague Castle and Golden Lane, lunch in Malá Strana, Old Town Square and the Jewish Quarter, beer in a proper pivnice (U Zlatého tygra) at night.",
        },
      ],
      sleep: "Malá Strana or Vinohrady hotels with garage parking.",
      alerts: [],
      wiki: ["Charles_Bridge", "Prague_Castle", "Prague_astronomical_clock", "Hluboká_Castle"],
      gallery: [],
    },
    {
      id: "dresden",
      name: "Dresden, Germany",
      region: "Germany",
      coords: [51.0504, 13.7373],
      nights: 1,
      summary: "Through the sandstone towers of Bohemian and Saxon Switzerland to baroque Dresden on the Elbe.",
      ride: {
        via: [
          [50.874, 14.24, "Hřensko (Pravčická brána)"],
          [50.962, 14.073, "Bastei"],
        ],
        roads: "D8 → Děčín → Elbe valley road → Hřensko → Bad Schandau → Bastei → Dresden",
        notes: "The Elbe canyon road from Děčín to Bad Schandau is lovely and twisty.",
      },
      highlights: [
        { name: "Pravčická brána", text: "Europe's largest natural sandstone arch (short hike from Hřensko)." },
        { name: "Bastei", text: "Sandstone bridge 194 m above the Elbe — the iconic view of Saxon Switzerland." },
        { name: "Dresden Frauenkirche", text: "Rebuilt baroque church; Zwinger and Semperoper next door." },
      ],
      explore: [],
      sleep: "Neustadt hotels for the bar scene, or near the Frauenkirche.",
      alerts: [],
      wiki: ["Bastei", "Pravčická_brána", "Frauenkirche,_Dresden"],
      gallery: [],
    },
    {
      id: "travemunde",
      name: "Travemünde → aboard Finnlines",
      region: "Germany",
      coords: [53.9358, 10.853],
      nights: 2,
      summary: "Autobahn day north to the ferry. Board in the evening; the ship sails at 02:00.",
      ride: {
        via: [[52.52, 13.405, "Berlin (ring)"]],
        roads: "A13 → Berlin ring → A24 → A1 → Travemünde Skandinavienkai",
        notes:
          "Long but easy motorway day — and you have until ~midnight to board. Stop in Berlin for lunch if you like, or take the A14/A39 west of Berlin instead.",
        long: true,
      },
      highlights: [
        { name: "Travemünde promenade", text: "Fish sandwich and a beer on the beach while you wait to board." },
        { name: "Passat", text: "Four-masted 1911 sailing ship moored at the harbour entrance." },
      ],
      explore: [
        {
          title: "At sea",
          text: "A full day on the Baltic: sleep in, sauna, write up the trip. Arrival in Helsinki next morning.",
        },
      ],
      sleep: "Aboard — cabin booked with the return sailing (two nights on board).",
      alerts: ["Check-in closes ~1 h before departure; the 02:00 sailing boards from about 22:00."],
      wiki: ["Travemünde"],
      gallery: [],
    },

    // ─────────────────────────────────── HOME ────────────────────────────────
    {
      id: "helsinki-home",
      name: "Helsinki",
      region: "Baltic crossing",
      coords: [60.2069, 25.1946],
      nights: 0, // arrival day only
      summary: "Morning arrival at Vuosaari. Home.",
      ride: {
        mode: "ferry",
        ferry: { operator: "Finnlines", depart: "02:00 (from Travemünde)", arrive: "≈ 10:00", hours: 31 },
        via: [
          [54.5, 12.0],
          [55.3, 14.6],
          [56.6, 18.0],
          [58.6, 20.6],
          [59.5, 22.2],
          [59.9, 24.4],
        ],
        roads: "Finnlines Travemünde → Helsinki (Vuosaari)",
        notes: "Arrives mid-morning — 20 minutes from Vuosaari to central Helsinki.",
      },
      highlights: [{ name: "Helsinki archipelago", text: "Be on deck for the last hour coming in through the islands." }],
      explore: [],
      sleep: "Your own bed.",
      alerts: [],
      wiki: ["Helsinki"],
      gallery: [],
    },
  ],
};
