/*
 * ===========================================================================
 *  TRIP DATA — the only file you need to edit.
 * ===========================================================================
 *
 *  The page (index.html + app.js) renders everything from this object.
 *  Days, dates, day numbers and totals are DERIVED — never typed by hand.
 *
 *  A trip is an ordered list of STOPS (overnight places). Each stop has:
 *
 *    id          unique slug, used for images + cached routes
 *    name        display name
 *    region      used to group the day selector (consecutive stops share it)
 *    coords      [lat, lon] of the overnight spot
 *    nights      how many nights you sleep here (1 = ride in, leave next morning)
 *                -> creates 1 "ride" day + (nights - 1) "explore" days
 *    optional    true = a stop you can drop to save time (shown as a badge)
 *    summary     one or two sentences on why you stop here
 *    ride        how you get here from the previous stop (null for the start)
 *       via       [[lat, lon, "label"], ...] waypoints that force the scenic roads
 *       roads     the roads you ride, in words
 *       notes     riding notes
 *       long      true = flagged as a longer-than-usual day
 *       weighting Kurviger style: "curvaturefastest" (default), "curvature",
 *                 "curvaturebooster" (extra curvy) or "fastest"
 *    highlights  [{ name, text }] what to see
 *    explore     one entry per extra night: { title, text, loop? }
 *                  loop = [[lat, lon, "label"], ...] optional day-ride loop
 *    sleep       where to stay
 *    alerts      [..] things to check before you go (closures, reservations)
 *    wiki        Wikipedia article titles — `npm run build` downloads their lead
 *                photo into images/<id>/ with credits
 *    gallery     extra images you add by hand: [{ src, caption, credit }]
 *
 *  After changing coords / via / loops / wiki, run:   node tools/build.mjs
 *  (re-fetches road geometry + photos; the page still works without it,
 *   it just draws straight dashed lines for legs whose route is stale.)
 * ===========================================================================
 */

window.TRIP = {
  meta: {
    title: "Coast to Coast on Two Wheels",
    subtitle: "New York → Denver → San Francisco, the long way round",
    startDate: "2027-08-16",
    defaultUnits: "mi", // "mi" or "km" — toggle on the page too
    season:
      "Start mid-August. You reach the Blue Ridge in late summer, New Mexico in early September (chile harvest), " +
      "Colorado in mid/late September (aspens turning gold), Utah's canyons in late September (warm, not scorching) " +
      "and Tioga Pass in early October — before it closes for winter. A late-May start also works, but the desert " +
      "legs then land in July heat.",
    notes: [
      "Daily rides target 2–3 hours of actual riding on back roads; days flagged 'long' are 3.5–4.5 h.",
      "Non-US residents: buy the $250 America the Beautiful non-resident pass at the first park — it waives the $100/person surcharge at Rocky Mountain, Zion, Bryce and Yosemite.",
      "Around Denver (~day 37, ~3,000 mi in) book an oil change and look at tyres — the West is remote.",
      "Each day has 'Open in Kurviger' — the waypoints load there and Kurviger fills in the curvy roads between them.",
    ],
    shorten: [
      "Drop the optional stops (Muscle Shoals, Elk City) — ride Nashville→Memphis and OKC→Amarillo on the interstate: −2 days.",
      "Turn 2-night stops you care less about into 1-night stops (Asheville, Robbinsville, Jasper, Colorado Springs, Baker, Monterey): −1 day each.",
      "Skip Route 66 / New Mexico entirely: Eureka Springs → Wichita → Dodge City → Denver across Kansas saves ~7 days but it is flat and empty.",
    ],
  },

  stops: [
    // ─────────────────────────────── NORTHEAST ───────────────────────────────
    {
      id: "nyc",
      name: "New York City, NY",
      region: "Northeast",
      coords: [40.758, -73.9855],
      nights: 1,
      summary: "Pick up / unload the bike, sort luggage, one last city night.",
      ride: null,
      highlights: [
        { name: "Brooklyn Bridge at dawn", text: "Walk it early before the crowds; the Manhattan skyline from DUMBO is the classic send-off photo." },
        { name: "Hudson River Greenway / Little Island", text: "Easy walk along the west side to stretch your legs before 60 days in the saddle." },
        { name: "Gear run", text: "Last chance for big-city motorcycle shops (Manhattan & Brooklyn dealers) — rain gear, phone mount, tyre plug kit." },
      ],
      explore: [],
      sleep: "Anywhere with secure parking — Midtown West or Long Island City (Queens) hotels with garages are easiest for a bike.",
      alerts: ["Get out of the city early (before 7 am) to dodge traffic on the George Washington Bridge."],
      wiki: ["Brooklyn_Bridge", "Manhattan"],
      gallery: [],
    },
    {
      id: "jim-thorpe",
      name: "Jim Thorpe, PA",
      region: "Northeast",
      coords: [40.8645, -75.7377],
      nights: 1,
      summary: "Victorian 'Switzerland of America' in a Pocono river gorge. Day 1 takes the famous Hawk's Nest cliff road on the way.",
      ride: {
        via: [
          [40.8517, -73.9527, "George Washington Bridge"],
          [41.3226, -74.8024, "Milford, PA"],
          [41.0937, -75.0021, "Bushkill (US-209, Delaware Water Gap NRA)"],
        ],
        roads: "I-80 out of the city → US-206 → Milford → US-209 through the Delaware Water Gap → PA-33/US-209",
        notes:
          "Optional +1 h: from Port Jervis ride NY-97 'Hawk's Nest' — a ledge road carved into the cliff above the Delaware, the best few miles near NYC — then cross back to Milford.",
      },
      highlights: [
        { name: "Hawk's Nest (NY-97, optional)", text: "Serpentine road on a stone ledge 200 ft above the Delaware River. Pull-outs for photos." },
        { name: "Delaware Water Gap", text: "US-209 runs 30 mi through the national recreation area; Bushkill Falls ('Niagara of Pennsylvania') is a short detour." },
        { name: "Jim Thorpe town", text: "Steep Broadway lined with 1800s mansions; Asa Packer Mansion, Old Jail Museum, and the Lehigh Gorge Scenic Railway." },
      ],
      explore: [],
      sleep: "Inn at Jim Thorpe (historic, on Broadway) or a B&B in town.",
      alerts: [],
      wiki: ["Jim_Thorpe,_Pennsylvania", "Delaware_Water_Gap", "Bushkill_Falls"],
      gallery: [],
    },
    {
      id: "gettysburg",
      name: "Gettysburg, PA",
      region: "Northeast",
      coords: [39.8309, -77.2311],
      nights: 1,
      summary: "The Civil War's turning point, with a battlefield you can ride through. Via Amish country.",
      ride: {
        via: [
          [40.0379, -76.1052, "Intercourse (Amish country)"],
          [40.0279, -76.5049, "Columbia–Wrightsville bridge"],
        ],
        roads: "PA back roads through Lancaster County farmland → US-30 across the Susquehanna → PA-116/US-30",
        notes: "Watch for horse-drawn buggies on blind rises in Lancaster County — they are slow and hard to see.",
      },
      highlights: [
        { name: "Lancaster County Amish country", text: "Intercourse and Bird-in-Hand: farm stands, quilts, buggies. Stop for shoo-fly pie." },
        { name: "Gettysburg battlefield auto-tour", text: "24-mile self-guided loop — perfect on a bike. Little Round Top and the High Water Mark are the key stops." },
        { name: "Museum & Cyclorama", text: "The 1884 360° painting of Pickett's Charge in the visitor center is surprisingly moving." },
      ],
      explore: [],
      sleep: "Historic inns downtown (Gettysburg Hotel) or the Farnsworth House.",
      alerts: [],
      wiki: ["Gettysburg_National_Military_Park", "Intercourse,_Pennsylvania", "Little_Round_Top"],
      gallery: [],
    },
    {
      id: "luray",
      name: "Luray, VA",
      region: "Blue Ridge",
      coords: [38.6654, -78.4594],
      nights: 1,
      summary: "Gateway to Shenandoah. You ride the first third of Skyline Drive to get here.",
      ride: {
        via: [
          [39.3254, -77.7389, "Harpers Ferry"],
          [38.9182, -78.1944, "Front Royal (Skyline Drive mile 0)"],
          [38.6633, -78.3203, "Thornton Gap (Skyline mile 31)"],
        ],
        roads: "US-15 → MD back roads → US-340 via Harpers Ferry → Skyline Drive (35 mph) → US-211",
        notes: "Skyline Drive has a 35 mph limit that is enforced — relax and enjoy the overlooks. Fuel up in Front Royal.",
      },
      highlights: [
        { name: "Harpers Ferry", text: "Where the Potomac and Shenandoah meet; tiny preserved town and John Brown's Fort. Great lunch stop." },
        { name: "Skyline Drive (north section)", text: "75 overlooks over 105 miles; this first stretch climbs fast to 3,000 ft views over the Shenandoah Valley." },
        { name: "Luray Caverns", text: "Largest caverns in the East, with the 'Great Stalacpipe Organ'. 1-hour walking tour." },
      ],
      explore: [],
      sleep: "Mimslyn Inn in Luray, or Skyland lodge inside the park if you book early.",
      alerts: ["Shenandoah NP entrance fee applies (covered by the annual pass)."],
      wiki: ["Harpers_Ferry_National_Historical_Park", "Luray_Caverns", "Shenandoah_River"],
      gallery: [],
    },
    {
      id: "staunton",
      name: "Staunton, VA",
      region: "Blue Ridge",
      coords: [38.1496, -79.0717],
      nights: 1,
      summary: "Finish Skyline Drive end-to-end, sleep in a lovely brick-and-ironwork valley town.",
      ride: {
        via: [
          [38.6633, -78.3203, "Thornton Gap"],
          [38.5296, -78.4361, "Big Meadows"],
          [38.0331, -78.8586, "Rockfish Gap (Skyline end / BRP start)"],
        ],
        roads: "Skyline Drive mile 31 → 105 → US-250 into Staunton",
        notes: "Short mileage but slow road — 2.5 h with photo stops. Lunch at Big Meadows Lodge (blackberry ice cream pie).",
      },
      highlights: [
        { name: "Big Meadows", text: "Open highland meadow at mile 51 — deer everywhere, sometimes black bears at dusk." },
        { name: "Hawksbill & Stony Man overlooks", text: "Highest points of the park, sweeping valley views." },
        { name: "Staunton", text: "American Shakespeare Center (Blackfriars Playhouse replica) — catch an evening show." },
      ],
      explore: [],
      sleep: "Stonewall Jackson Hotel (renamed Hotel 24 South) downtown.",
      alerts: [],
      wiki: ["Shenandoah_National_Park", "Staunton,_Virginia"],
      gallery: [],
    },
    {
      id: "roanoke",
      name: "Roanoke, VA",
      region: "Blue Ridge",
      coords: [37.271, -79.9414],
      nights: 1,
      summary: "First 120 miles of the Blue Ridge Parkway — America's most famous motorcycle road.",
      ride: {
        via: [
          [38.0331, -78.8586, "BRP milepost 0 (Afton)"],
          [37.6295, -79.4436, "Otter Creek / James River (BRP mile 63)"],
          [37.4436, -79.6081, "Peaks of Otter (BRP mile 86)"],
        ],
        roads: "Blue Ridge Parkway mile 0 → 120 (45 mph, no trucks, no stoplights)",
        notes:
          "Fuel is NOT available on the Parkway — exit to fill up. The James River bridge (mile 63.5) may have a signed detour during rehabilitation.",
      },
      highlights: [
        { name: "Humpback Rocks (mile 5.8)", text: "Restored 1890s mountain farm, plus a steep 1-mile hike to a rock outcrop view." },
        { name: "Natural Bridge (detour from mile 61)", text: "215-ft limestone arch once owned by Thomas Jefferson. 15 min off the Parkway." },
        { name: "Peaks of Otter (mile 86)", text: "Lake, lodge and Sharp Top summit. Great place for lunch." },
        { name: "Mill Mountain Star", text: "Roanoke's giant neon star overlooking the city — ride up at night." },
      ],
      explore: [],
      sleep: "Hotel Roanoke (Tudor landmark) or Peaks of Otter Lodge on the Parkway.",
      alerts: ["Check nps.gov/blri road status the week before — sections close for repairs and weather."],
      wiki: ["Natural_Bridge_(Virginia)", "Peaks_of_Otter", "Mill_Mountain_Star"],
      gallery: [],
    },
    {
      id: "galax",
      name: "Galax, VA",
      region: "Blue Ridge",
      coords: [36.6612, -80.924],
      nights: 1,
      summary: "Old-time mountain-music capital, just off the Parkway at the Virginia–Carolina line.",
      ride: {
        via: [
          [37.0566, -80.3449, "Mabry Mill (BRP mile 176)"],
          [36.5856, -80.8516, "Blue Ridge Music Center (BRP mile 213)"],
        ],
        roads: "Blue Ridge Parkway mile 120 → 215 → US-58 into Galax",
        notes: "Rolling farmland section — gentler curves, very relaxing.",
      },
      highlights: [
        { name: "Mabry Mill", text: "The most photographed spot on the Parkway — water-powered gristmill. Buckwheat pancakes at the restaurant." },
        { name: "Floyd Country Store", text: "10 min off the Parkway; Friday-night jamboree with flat-footing locals." },
        { name: "Blue Ridge Music Center", text: "Free midday jam sessions on the porch most days; Saturday evening concerts in the amphitheatre." },
        { name: "Rex Theater", text: "Friday-night live bluegrass radio show in Galax." },
      ],
      explore: [],
      sleep: "Small motels in Galax, or a cabin near Fancy Gap.",
      alerts: [],
      wiki: ["Mabry_Mill", "Blue_Ridge_Music_Center", "Floyd,_Virginia"],
      gallery: [],
    },
    {
      id: "blowing-rock",
      name: "Blowing Rock, NC",
      region: "Blue Ridge",
      coords: [36.1351, -81.6779],
      nights: 1,
      summary: "Classic High Country resort village — sits right on the Parkway.",
      ride: {
        via: [
          [36.4958, -81.1328, "Doughton Park (BRP mile 241)"],
          [36.2195, -81.6526, "Moses Cone Manor (BRP mile 294)"],
        ],
        roads: "US-58 → Blue Ridge Parkway mile 215 → 292",
        notes: "Easy day. Leaves the afternoon for the town or a hike.",
      },
      highlights: [
        { name: "Doughton Park", text: "Rolling highland meadows and Brinegar Cabin." },
        { name: "Moses Cone Manor", text: "Gilded-age manor with carriage trails and a craft shop on the porch." },
        { name: "The Blowing Rock", text: "Cliff where light objects 'fall' upward in the updraft; Johns River Gorge view." },
      ],
      explore: [],
      sleep: "Chetola Resort or a B&B on Main Street.",
      alerts: [],
      wiki: ["Blowing_Rock,_North_Carolina", "Moses_H._Cone_Memorial_Park"],
      gallery: [],
    },
    {
      id: "asheville",
      name: "Asheville, NC",
      region: "Blue Ridge",
      coords: [35.5951, -82.5515],
      nights: 2,
      summary: "Arts, beer and Biltmore. First rest day after 9 days on the road — earned.",
      ride: {
        via: [
          [36.0965, -81.8156, "Linn Cove Viaduct (BRP mile 304)"],
          [35.9697, -81.945, "Linville Falls (BRP mile 316)"],
          [35.7644, -82.2652, "Mount Mitchell (BRP mile 355)"],
          [35.7123, -82.2840, "Craggy Gardens (BRP mile 364)"],
        ],
        roads: "Blue Ridge Parkway mile 292 → 382 via Grandfather Mountain",
        notes:
          "Highest, twistiest part of the northern Parkway so far. Linn Cove Viaduct is the engineering icon that snakes around Grandfather Mountain.",
      },
      highlights: [
        { name: "Linn Cove Viaduct", text: "Cantilevered S-curve bridge hugging Grandfather Mountain — the Parkway's signature photo." },
        { name: "Linville Falls", text: "Short hike to a gorge waterfall — 1 mile to Erwin's View." },
        { name: "Mount Mitchell", text: "6,684 ft, highest point east of the Mississippi. Spur road to the summit lot." },
        { name: "Biltmore Estate", text: "America's largest private house (Vanderbilt, 1895). Book timed entry; allow half a day." },
        { name: "River Arts District & breweries", text: "Studios in old warehouses; Asheville has more breweries per capita than almost anywhere." },
      ],
      explore: [
        {
          title: "Rest day: Biltmore + River Arts District",
          text: "Morning at the Biltmore house and gardens, afternoon in the River Arts District, evening on the South Slope brewery strip. Do laundry.",
        },
      ],
      sleep: "Downtown hotels with parking, or Grove Park Inn for a splurge with mountain views.",
      alerts: [
        "Hurricane Helene (2024) damaged this section. As of late 2026, BRP mile 344–355 (NC-80 → Mount Mitchell) was still being repaired with reopening targeted for end-2026. Check nps.gov/blri; detour is NC-80 → US-19E → NC-226.",
      ],
      wiki: ["Linn_Cove_Viaduct", "Biltmore_Estate", "Mount_Mitchell", "Linville_Falls"],
      gallery: [],
    },

    // ─────────────────────────────── SMOKIES ────────────────────────────────
    {
      id: "townsend",
      name: "Townsend, TN",
      region: "Smokies",
      coords: [35.6745, -83.7557],
      nights: 1,
      summary: "The 'quiet side of the Smokies'. Ride the highest, wildest end of the Parkway, then cross the national park.",
      ride: {
        via: [
          [35.3043, -82.9048, "Richland Balsam (BRP high point 6,053 ft)"],
          [35.4613, -83.1471, "Waterrock Knob"],
          [35.4835, -83.3109, "Cherokee (BRP mile 469 — the end)"],
          [35.6111, -83.425, "Newfound Gap"],
          [35.7143, -83.5102, "Gatlinburg"],
        ],
        roads: "Blue Ridge Parkway mile 382 → 469 → US-441 Newfound Gap Road → Little River Road",
        notes:
          "Long but legendary day. Tunnels and 6,000-ft balds south of Asheville, then over the spine of the Smokies. " +
          "Gatlinburg is a traffic jam — keep going to Townsend.",
        long: true,
      },
      highlights: [
        { name: "Richland Balsam", text: "Highest point on the whole Parkway, 6,053 ft — spruce-fir forest that feels like Canada." },
        { name: "Cherokee", text: "Museum of the Cherokee People and Oconaluftee Indian Village at the Parkway's southern end." },
        { name: "Kuwohi (formerly Clingmans Dome)", text: "7-mile spur off Newfound Gap Road to the park's high point and observation tower." },
        { name: "Little River Road", text: "Twisting riverside road into Townsend — one of the nicest in the park." },
      ],
      explore: [],
      sleep: "Townsend has cabins and motorcycle-friendly lodges; Dancing Bear Lodge is a good pick.",
      alerts: [
        "Great Smoky Mountains NP: entry is free but parking for >15 min needs a parking tag ($5/day, $15/week; buy online).",
      ],
      wiki: ["Great_Smoky_Mountains_National_Park", "Kuwohi", "Newfound_Gap"],
      gallery: [],
    },
    {
      id: "robbinsville",
      name: "Robbinsville / Deals Gap, NC",
      region: "Smokies",
      coords: [35.3226, -83.807],
      nights: 2,
      summary: "Motorcycle mecca: the Tail of the Dragon (318 curves in 11 miles) and the Cherohala Skyway are on your doorstep.",
      ride: {
        via: [
          [35.6012, -83.8115, "Cades Cove loop start"],
          [35.6435, -83.9436, "Foothills Parkway (west)"],
          [35.5087, -83.9852, "Tail of the Dragon (US-129)"],
          [35.4669, -83.9203, "Deals Gap"],
          [35.4516, -83.8051, "Fontana Dam"],
        ],
        roads: "Cades Cove loop (optional) → Foothills Parkway West → US-129 'Tail of the Dragon' → NC-28 'Moonshiner 28' → NC-143",
        notes:
          "Ride the Dragon mid-week and early morning. Pro photographers (Killboy, 129 Photos) shoot every corner — look them up afterwards. " +
          "Keep left of the yellow line in your head: oncoming riders cut corners.",
        weighting: "curvaturebooster",
      },
      highlights: [
        { name: "Tail of the Dragon (US-129)", text: "318 curves in 11 miles, no driveways or intersections. The 'Tree of Shame' at Deals Gap displays crashed bike parts." },
        { name: "Deals Gap Motorcycle Resort", text: "The pilgrimage spot at the NC end — stickers, burgers, bikes from every state." },
        { name: "Fontana Dam", text: "Tallest dam east of the Rockies (480 ft) — the Appalachian Trail crosses it." },
        { name: "Cades Cove", text: "11-mile one-way loop in a historic valley with churches and cabins; best wildlife viewing in the park. Go at opening." },
      ],
      explore: [
        {
          title: "Dragon day: ride it again + Moonshiner 28 loop",
          text: "Ride the Dragon in both directions with fresh eyes, lunch at Deals Gap, then the NC-28 'Moonshiner 28' loop past Fontana Lake. Or take the day off at the lake.",
          loop: [
            [35.4669, -83.9203, "Deals Gap"],
            [35.5266, -83.9927, "Dragon (TN end)"],
            [35.4669, -83.9203, "Deals Gap"],
            [35.4314, -83.4479, "Bryson City (NC-28)"],
          ],
        },
      ],
      sleep: "Two Wheels Only Motorcycle Resort or Iron Horse Motorcycle Lodge (bikers-only lodges near Robbinsville).",
      alerts: ["US-129 is closed to long trucks while I-40 Helene repairs continue — good news for bikes, less traffic."],
      wiki: ["Deals_Gap,_North_Carolina", "Fontana_Dam", "Cades_Cove"],
      gallery: [],
    },
    {
      id: "chattanooga",
      name: "Chattanooga, TN",
      region: "Smokies",
      coords: [35.0456, -85.3097],
      nights: 1,
      summary: "River city at the foot of Lookout Mountain, reached over the Cherohala Skyway.",
      ride: {
        via: [
          [35.3383, -84.0428, "Cherohala Skyway (5,400 ft)"],
          [35.3626, -84.2944, "Tellico Plains"],
          [35.0337, -84.3832, "Ducktown (top of the Ocoee gorge)"],
        ],
        roads: "NC-143 / TN-165 Cherohala Skyway → TN-68 → US-64 down the Ocoee gorge → Chattanooga",
        notes:
          "Cherohala is the opposite of the Dragon: 43 miles of wide, fast sweepers across mile-high balds. Tellico Plains has the last fuel for a while going east.",
      },
      highlights: [
        { name: "Cherohala Skyway", text: "Wide-open sweepers along ridge-tops to 5,400 ft. Some days you're above the clouds." },
        { name: "Ocoee River gorge (US-64)", text: "Whitewater river from the 1996 Olympics — scenic riverside road." },
        { name: "Lookout Mountain", text: "Rock City ('See Rock City' barns), Ruby Falls underground waterfall and the Incline Railway." },
        { name: "Walnut Street Bridge", text: "Pedestrian bridge across the Tennessee River — great at sunset." },
      ],
      explore: [],
      sleep: "Chattanooga Choo Choo hotel (in the old railway terminal) or the Read House.",
      alerts: [],
      wiki: ["Lookout_Mountain", "Ruby_Falls", "Walnut_Street_Bridge_(Chattanooga,_Tennessee)"],
      gallery: [],
    },

    // ───────────────────────────── MUSIC COUNTRY ────────────────────────────
    {
      id: "nashville",
      name: "Nashville, TN",
      region: "Music Country",
      coords: [36.1627, -86.7816],
      nights: 2,
      summary: "Music City. Ride via the Jack Daniel's distillery, then two nights of honky-tonks.",
      ride: {
        via: [
          [35.2017, -85.9213, "Sewanee (plateau)"],
          [35.2831, -86.3741, "Lynchburg (Jack Daniel's)"],
          [35.4853, -86.4603, "Shelbyville"],
        ],
        roads: "US-41 up Monteagle → TN-56/TN-156 back roads over the Cumberland Plateau → TN-55 Lynchburg → US-231 → Nashville",
        notes: "Lynchburg is in a dry county — the distillery tour has tastings, but you're riding. Buy a bottle to post home.",
        long: true,
      },
      highlights: [
        { name: "Jack Daniel's Distillery", text: "Lynchburg, TN — the oldest registered distillery in the US. 1-hour tour." },
        { name: "Ryman Auditorium", text: "'Mother Church of Country Music' — day tour or an evening show." },
        { name: "Lower Broadway", text: "Wall-to-wall honky-tonks with live bands from 10 am; Robert's Western World is the real deal." },
        { name: "Grand Ole Opry", text: "The longest-running radio show in the US (since 1925). Tue/Fri/Sat shows." },
      ],
      explore: [
        {
          title: "Music City day",
          text: "Country Music Hall of Fame in the morning, Ryman tour, hot chicken at Hattie B's or Prince's, evening at the Opry or the Bluebird Cafe (book weeks ahead).",
        },
      ],
      sleep: "The Gulch or Germantown — walking distance to Broadway but quieter. Many hotels charge for parking; ask for bike spots.",
      alerts: ["Bluebird Cafe and Opry tickets sell out — book when you lock in your dates."],
      wiki: ["Ryman_Auditorium", "Broadway_(Nashville,_Tennessee)", "Jack_Daniel's"],
      gallery: [],
    },
    {
      id: "muscle-shoals",
      name: "Florence / Muscle Shoals, AL",
      region: "Music Country",
      coords: [34.7998, -87.6773],
      nights: 1,
      optional: true,
      summary: "Down the Natchez Trace to the tiny town that recorded Aretha, the Stones and Lynyrd Skynyrd.",
      ride: {
        via: [
          [35.9323, -87.0053, "Natchez Trace Pkwy (near Loveless Cafe)"],
          [35.5121, -87.4498, "Meriwether Lewis site"],
          [34.8358, -87.944, "Colbert Ferry (Tennessee River)"],
        ],
        roads: "Natchez Trace Parkway mile 444 → 327 (50 mph, no commercial traffic) → US-72",
        notes: "Like the Blue Ridge Parkway but flatter and empty. Loveless Cafe biscuits near the start are mandatory.",
      },
      highlights: [
        { name: "Natchez Trace Parkway", text: "444-mile parkway on an ancient trade path — no billboards, no trucks, almost no traffic." },
        { name: "Muscle Shoals Sound Studio", text: "3614 Jackson Highway — where the Stones recorded 'Brown Sugar'. Restored and open for tours." },
        { name: "FAME Studios", text: "Rick Hall's studio, the origin of the Muscle Shoals sound (Aretha, Wilson Pickett, Etta James)." },
      ],
      explore: [],
      sleep: "GunRunner Boutique Hotel in Florence.",
      alerts: ["Skip to save a day: ride Nashville → Memphis directly on I-40 (≈3 h)."],
      wiki: ["Natchez_Trace", "Muscle_Shoals_Sound_Studio", "FAME_Studios"],
      gallery: [],
    },
    {
      id: "memphis",
      name: "Memphis, TN",
      region: "Music Country",
      coords: [35.1495, -90.049],
      nights: 2,
      summary: "Elvis, blues, BBQ and civil-rights history — via Elvis's birthplace in Tupelo.",
      ride: {
        via: [
          [34.5614, -88.2677, "Natchez Trace (Tishomingo)"],
          [34.2576, -88.7034, "Tupelo (Elvis birthplace)"],
        ],
        roads: "Natchez Trace Parkway → Tupelo → I-22 / US-78 into Memphis",
        notes: "Last stretch into Memphis is busy. Aim to arrive before 4 pm.",
        long: true,
      },
      highlights: [
        { name: "Elvis Presley Birthplace (Tupelo)", text: "The two-room shotgun house Vernon Presley built in 1934, plus the church where Elvis first sang." },
        { name: "Graceland", text: "Elvis's mansion and the huge car museum. Allow 3–4 hours." },
        { name: "Sun Studio", text: "Where Elvis, Johnny Cash, Jerry Lee Lewis and B.B. King cut early records. 45-min tour — fantastic." },
        { name: "National Civil Rights Museum", text: "Built around the Lorraine Motel where Dr. King was killed. Essential." },
        { name: "Beale Street", text: "Blues bars at night; dry-rub ribs at Rendezvous." },
      ],
      explore: [
        {
          title: "Memphis day",
          text: "Graceland in the morning (opens 9 am), Sun Studio after lunch, Civil Rights Museum late afternoon, Beale Street at night. Ducks march at the Peabody at 11 am and 5 pm.",
        },
      ],
      sleep: "The Peabody (with its famous duck march) or a hotel near South Main.",
      alerts: [],
      wiki: ["Graceland", "Sun_Studio", "National_Civil_Rights_Museum", "Beale_Street"],
      gallery: [],
    },

    // ───────────────────────────────── OZARKS ───────────────────────────────
    {
      id: "mountain-view",
      name: "Mountain View, AR",
      region: "Ozarks",
      coords: [35.8684, -92.1176],
      nights: 1,
      summary: "Folk-music town in the Ozark foothills — jams on the courthouse square every evening.",
      ride: {
        via: [
          [35.2512, -91.2009, "Augusta (White River)"],
          [35.5009, -91.6155, "Heber Springs (Greers Ferry Lake)"],
        ],
        roads: "US-64 west across the Delta → AR-25 → AR-16 / AR-5 into the hills",
        notes: "First half is pancake-flat Delta farmland; it turns to hills after Heber Springs. Hot — start early.",
        long: true,
      },
      highlights: [
        { name: "Ozark Folk Center", text: "State park dedicated to Ozark crafts and music; evening concerts." },
        { name: "Courthouse square jams", text: "Locals bring fiddles and banjos and play on the square most evenings — free." },
        { name: "Blanchard Springs Caverns", text: "Forest Service cave 15 min north — beautiful 'Dripstone Trail' tour." },
      ],
      explore: [],
      sleep: "Wildflower B&B on the square, or the Ozark Folk Center cabins.",
      alerts: [],
      wiki: ["Blanchard_Springs_Caverns", "Mountain_View,_Arkansas"],
      gallery: [],
    },
    {
      id: "jasper",
      name: "Jasper, AR",
      region: "Ozarks",
      coords: [36.0081, -93.1866],
      nights: 2,
      summary: "Tiny town on the Buffalo River, surrounded by the best riding in the Ozarks (Scenic 7, AR-21, AR-16).",
      ride: {
        via: [
          [35.9649, -92.1782, "Blanchard Springs"],
          [35.9087, -92.6343, "Marshall"],
        ],
        roads: "AR-14 → US-65 → AR-74 / AR-7 over the hills into Jasper",
        notes: "Short, twisty, beautiful. Arrive early and eat at the Ozark Cafe (since 1909).",
      },
      highlights: [
        { name: "Buffalo National River", text: "America's first national river — bluffs up to 500 ft, canoe it from Ponca if you want a day off the bike." },
        { name: "Scenic Byway 7", text: "Arkansas's most famous motorcycle road, running north–south through Jasper." },
        { name: "Arkansas 'Grand Canyon' overlook", text: "Viewpoint on AR-7 over the Big Creek valley — 3 min south of town." },
        { name: "Boxley Valley elk", text: "Wild elk herd grazes the meadows along AR-43 at dusk." },
        { name: "Hawksbill Crag (Whitaker Point)", text: "Iconic rock ledge, 3-mile round-trip hike." },
      ],
      explore: [
        {
          title: "Ozark Highlands loop",
          text: "Ride AR-7 south, AR-16 west through the national forest, AR-21 north into Boxley Valley (elk), then AR-43/74 home through Ponca. ~110 miles of curves.",
          loop: [
            [35.7930, -93.402, "Fallsville (AR-16/21)"],
            [35.9636, -93.4027, "Boxley Valley"],
            [36.0217, -93.3577, "Ponca"],
          ],
        },
      ],
      sleep: "Arkansas House Inn in Jasper, or Buffalo River cabins near Ponca.",
      alerts: ["Very little fuel in the hills — fill up in Jasper before the loop."],
      wiki: ["Buffalo_National_River", "Hawksbill_Crag", "Jasper,_Arkansas"],
      gallery: [],
    },
    {
      id: "eureka-springs",
      name: "Eureka Springs, AR",
      region: "Ozarks",
      coords: [36.4011, -93.738],
      nights: 1,
      summary: "Victorian spa town built into a hillside — huge biker scene. Via the famous Pig Trail.",
      ride: {
        via: [
          [35.7930, -93.402, "Fallsville"],
          [35.854, -93.7614, "Brashears (AR-16/AR-23)"],
          [35.6915, -93.8178, "Pig Trail (AR-23, Turner Bend)"],
        ],
        roads: "AR-16 → Brashears → AR-23 'Pig Trail' south to Turner Bend and back (out-and-back, ~20 mi) → AR-23 north via Huntsville → US-62",
        notes: "The Pig Trail's tree canopy forms a green tunnel. Popular with Razorback fans on game days — avoid Saturday afternoons. Skip the out-and-back to save ~45 min.",
        long: true,
        weighting: "curvature",
      },
      highlights: [
        { name: "Pig Trail Scenic Byway", text: "19 miles of AR-23 through a tunnel of trees — named for Razorback fans driving to games." },
        { name: "Historic downtown", text: "Winding streets with no right angles, stone buildings, spring-fed parks. Busy biker bars on Spring Street." },
        { name: "Thorncrown Chapel", text: "E. Fay Jones's glass-and-wood forest chapel — one of the finest buildings of the 20th century." },
        { name: "Crescent Hotel", text: "'America's most haunted hotel' — do the ghost tour." },
      ],
      explore: [],
      sleep: "1886 Crescent Hotel & Spa, or the Basin Park Hotel downtown.",
      alerts: [],
      wiki: ["Eureka_Springs,_Arkansas", "Thorncrown_Chapel", "Crescent_Hotel_(Eureka_Springs,_Arkansas)"],
      gallery: [],
    },

    // ──────────────────────────────── ROUTE 66 ──────────────────────────────
    {
      id: "tulsa",
      name: "Tulsa, OK",
      region: "Route 66",
      coords: [36.154, -95.9928],
      nights: 1,
      summary: "Art-deco oil city on Route 66 — via the world-class Crystal Bridges museum.",
      ride: {
        via: [
          [36.3826, -94.2023, "Crystal Bridges (Bentonville)"],
          [36.1863, -94.5349, "Siloam Springs"],
          [36.1891, -95.7175, "Blue Whale of Catoosa (Route 66)"],
        ],
        roads: "US-62 → Bentonville → US-412 west → Route 66 in Catoosa",
        notes: "Crystal Bridges is free and has a bike-friendly lot. Your first stretch of Route 66 starts at the Blue Whale.",
        long: true,
      },
      highlights: [
        { name: "Crystal Bridges Museum", text: "Walmart-heiress art museum in a forest ravine — American art from colonial to now. Free entry." },
        { name: "Blue Whale of Catoosa", text: "1970s roadside whale — your first Route 66 icon." },
        { name: "Tulsa art deco district", text: "Boston Avenue Methodist Church and the Philcade building." },
        { name: "Cain's Ballroom / Bob Dylan Center", text: "Western-swing landmark and the Dylan archive." },
      ],
      explore: [],
      sleep: "Mayo Hotel (1925) downtown, or the Campbell Hotel right on Route 66.",
      alerts: [],
      wiki: ["Crystal_Bridges_Museum_of_American_Art", "Blue_Whale_of_Catoosa", "Boston_Avenue_Methodist_Church"],
      gallery: [],
    },
    {
      id: "okc",
      name: "Oklahoma City, OK",
      region: "Route 66",
      coords: [35.4676, -97.5164],
      nights: 1,
      summary: "A solid day of original Route 66 two-lane, ending at the moving OKC National Memorial.",
      ride: {
        via: [
          [35.9987, -96.1142, "Sapulpa"],
          [35.7487, -96.6589, "Stroud (Rock Cafe)"],
          [35.7023, -96.8805, "Chandler"],
          [35.6604, -97.3266, "Arcadia (Round Barn, POPS)"],
        ],
        roads: "Historic Route 66 (OK-66) the whole way",
        notes: "This is the longest drivable original stretch of 66. Lots of little towns — ride slowly and stop often.",
      },
      highlights: [
        { name: "Rock Cafe, Stroud", text: "1939 sandstone café; inspiration for Sally in Pixar's 'Cars'." },
        { name: "Arcadia Round Barn", text: "1898 round red barn." },
        { name: "POPS", text: "Soda shop with a 66-ft LED soda bottle and 700 flavours." },
        { name: "OKC National Memorial", text: "168 empty chairs for the 1995 bombing victims. Visit the outdoor memorial at dusk." },
      ],
      explore: [],
      sleep: "Bricktown hotels (walkable riverside district).",
      alerts: [],
      wiki: ["Oklahoma_City_National_Memorial", "Arcadia_Round_Barn", "Rock_Café"],
      gallery: [],
    },
    {
      id: "elk-city",
      name: "Elk City, OK",
      region: "Route 66",
      coords: [35.412, -99.4043],
      nights: 1,
      optional: true,
      summary: "Short Route 66 day through western Oklahoma's two museums of the Mother Road.",
      ride: {
        via: [
          [35.5322, -97.955, "El Reno"],
          [35.547, -98.579, "Hydro (Lucille's)"],
          [35.5153, -98.9671, "Clinton (Route 66 Museum)"],
        ],
        roads: "Route 66 / I-40 frontage roads",
        notes: "Prairie opens up, wind picks up. Expect crosswinds.",
      },
      highlights: [
        { name: "Lucille's Service Station, Hydro", text: "1929 two-storey station run by 'Mother of the Mother Road' Lucille Hamons for 59 years." },
        { name: "Oklahoma Route 66 Museum, Clinton", text: "The best of the 66 museums — decade-by-decade story of the road." },
        { name: "National Route 66 & Transportation Museum, Elk City", text: "Plus a recreated pioneer town." },
      ],
      explore: [],
      sleep: "Chain motels; nothing fancy out here.",
      alerts: ["Skip to save a day: OKC → Amarillo on I-40 is ≈4 h."],
      wiki: ["U.S._Route_66_in_Oklahoma", "Lucille's"],
      gallery: [],
    },
    {
      id: "amarillo",
      name: "Amarillo, TX",
      region: "Route 66",
      coords: [35.222, -101.8313],
      nights: 2,
      summary: "Texas Panhandle — Cadillac Ranch and the Palo Duro Canyon, 'Grand Canyon of Texas'.",
      ride: {
        via: [
          [35.2148, -100.249, "Shamrock (U-Drop Inn)"],
          [35.2059, -101.1094, "Groom (leaning water tower)"],
          [35.1872, -101.987, "Cadillac Ranch"],
        ],
        roads: "Route 66 / I-40 frontage → Shamrock → Groom → Amarillo → Cadillac Ranch",
        notes: "Flat and windy. Bring spray paint for Cadillac Ranch (everyone does).",
      },
      highlights: [
        { name: "U-Drop Inn, Shamrock", text: "1936 art-deco gas station — another 'Cars' inspiration (Ramone's)." },
        { name: "Cadillac Ranch", text: "Ten graffiti-covered Cadillacs nose-down in a field. Add your own tag." },
        { name: "Palo Duro Canyon", text: "Second-largest canyon in the US; a paved road drops 800 ft to the canyon floor." },
        { name: "Big Texan Steak Ranch", text: "Home of the free 72-oz steak (if you eat it in an hour)." },
      ],
      explore: [
        {
          title: "Palo Duro Canyon ride",
          text: "30 miles south to Canyon, TX: ride the park road down to the canyon floor, hike the Lighthouse Trail (6 mi, go early — hot), and stop at the Panhandle-Plains Historical Museum.",
          loop: [
            [34.9806, -101.9188, "Canyon, TX"],
            [34.9375, -101.6588, "Palo Duro Canyon floor"],
          ],
        },
      ],
      sleep: "Downtown Amarillo hotels or along Route 66's 6th Avenue district.",
      alerts: [],
      wiki: ["Cadillac_Ranch", "Palo_Duro_Canyon", "U-Drop_Inn"],
      gallery: [],
    },
    {
      id: "tucumcari",
      name: "Tucumcari, NM",
      region: "Route 66",
      coords: [35.1717, -103.725],
      nights: 1,
      summary: "Neon-lit Route 66 motel town. Cross into New Mexico through a ghost town.",
      ride: {
        via: [
          [35.2742, -102.664, "Adrian (Midpoint Cafe)"],
          [35.1795, -103.0418, "Glenrio ghost town"],
        ],
        roads: "Route 66 / I-40 frontage roads",
        notes: "Adrian is the exact midpoint of Route 66 — 1,139 miles to both Chicago and LA. Ugly Crust pie at the Midpoint Cafe.",
      },
      highlights: [
        { name: "Midpoint Cafe, Adrian", text: "Halfway point of Route 66 — pie and photo op." },
        { name: "Glenrio", text: "Abandoned border town straddling Texas and New Mexico on original 66 gravel." },
        { name: "Tucumcari neon", text: "Ride Route 66 Boulevard after dark — dozens of restored neon signs." },
      ],
      explore: [],
      sleep: "Blue Swallow Motel (1939, each room has its own garage — perfect for the bike). Book ahead.",
      alerts: [],
      wiki: ["Blue_Swallow_Motel", "Glenrio_Historic_District", "Tucumcari,_New_Mexico"],
      gallery: [],
    },

    // ─────────────────────────────── NEW MEXICO ─────────────────────────────
    {
      id: "santa-fe",
      name: "Santa Fe, NM",
      region: "New Mexico",
      coords: [35.687, -105.9378],
      nights: 2,
      summary: "7,000-ft adobe capital — art, chile, history. Rest day.",
      ride: {
        via: [
          [34.9387, -104.6825, "Santa Rosa (Blue Hole)"],
          [35.5742, -105.675, "Pecos"],
        ],
        roads: "I-40 / Route 66 → Santa Rosa → US-84 → I-25 via Pecos → Santa Fe",
        notes: "Mostly highway today — fine. Optional: NM-3 from I-40 up the Pecos valley through Villanueva is a quieter canyon road through Spanish land-grant villages.",
        long: true,
      },
      highlights: [
        { name: "Blue Hole, Santa Rosa", text: "80-ft-deep, crystal-clear artesian spring — jump in to cool off (62 °F)." },
        { name: "Pecos National Historical Park", text: "Ruins of a pueblo and Spanish mission church." },
        { name: "The Plaza & Palace of the Governors", text: "Oldest public building in the US (1610). Native artists sell jewellery under the portal." },
        { name: "Meow Wolf — House of Eternal Return", text: "Mind-bending interactive art installation. Even skeptics love it." },
        { name: "Canyon Road", text: "Half a mile of galleries in old adobes." },
      ],
      explore: [
        {
          title: "Santa Fe rest day",
          text: "Plaza and Palace of the Governors, Loretto Chapel's 'miraculous staircase', Canyon Road galleries, Meow Wolf in the afternoon. Green or red chile? Say 'Christmas' for both.",
        },
      ],
      sleep: "La Fonda on the Plaza (since 1922) or an adobe inn near Canyon Road.",
      alerts: [],
      wiki: ["Blue_Hole_(New_Mexico)", "Palace_of_the_Governors", "Santa_Fe,_New_Mexico", "Meow_Wolf"],
      gallery: [],
    },
    {
      id: "taos",
      name: "Taos, NM",
      region: "New Mexico",
      coords: [36.4072, -105.5731],
      nights: 1,
      summary: "The High Road to Taos through Spanish mountain villages, ending at the 1,000-year-old pueblo.",
      ride: {
        via: [
          [35.9917, -105.9317, "Chimayó (Santuario)"],
          [36.0436, -105.8122, "Truchas"],
          [36.17, -105.6831, "Peñasco"],
        ],
        roads: "NM-503 → NM-76 'High Road' → NM-75 → NM-518 → Taos",
        notes: "Short day — 2 hours of riding. Truchas sits on a ridge at 8,000 ft with views to the Rio Grande valley.",
        weighting: "curvature",
      },
      highlights: [
        { name: "El Santuario de Chimayó", text: "Adobe pilgrimage church with 'holy dirt'. Lunch at Rancho de Chimayó." },
        { name: "High Road villages", text: "Truchas, Las Trampas (San José de Gracia church, 1760s) — barely changed in centuries." },
        { name: "Taos Pueblo", text: "Multi-storey adobe continuously inhabited for ~1,000 years. UNESCO site." },
        { name: "Rio Grande Gorge Bridge", text: "650 ft above the river, 10 min west of town." },
      ],
      explore: [],
      sleep: "Historic Taos Inn, or El Pueblo Lodge.",
      alerts: ["Taos Pueblo closes for ceremonies at times — check before going."],
      wiki: ["Taos_Pueblo", "El_Santuario_de_Chimayo", "Rio_Grande_Gorge_Bridge"],
      gallery: [],
    },

    // ─────────────────────────────── COLORADO ───────────────────────────────
    {
      id: "sand-dunes",
      name: "Great Sand Dunes, CO",
      region: "Colorado",
      coords: [37.7326, -105.5129],
      nights: 1,
      summary: "Tallest dunes in North America at the foot of the 14,000-ft Sangre de Cristos. Half the Enchanted Circle on the way.",
      ride: {
        via: [
          [36.5539, -105.2633, "Eagle Nest (Enchanted Circle)"],
          [36.7084, -105.4056, "Red River"],
          [36.7046, -105.5967, "Questa"],
          [37.2003, -105.4239, "San Luis (Colorado's oldest town)"],
        ],
        roads: "US-64 over Palo Flechado Pass → NM-38 Bobcat Pass → NM-522 → CO-159 → US-160 → CO-150",
        notes: "Altitude starts to matter — 9,800-ft Bobcat Pass. Cool mornings; layer up.",
      },
      highlights: [
        { name: "Enchanted Circle", text: "Mountain passes, Eagle Nest Lake and the Wild West town of Red River." },
        { name: "San Luis", text: "Founded 1851, Colorado's oldest town; Stations of the Cross shrine on the mesa." },
        { name: "Great Sand Dunes NP", text: "Dunes up to 750 ft. Hike High Dune at sunrise or sunset — sand gets scorching midday." },
      ],
      explore: [],
      sleep: "Great Sand Dunes Lodge (right outside the park) or Zapata Ranch.",
      alerts: [],
      wiki: ["Great_Sand_Dunes_National_Park_and_Preserve", "Eagle_Nest_Lake", "San_Luis,_Colorado"],
      gallery: [],
    },
    {
      id: "colorado-springs",
      name: "Colorado Springs, CO",
      region: "Colorado",
      coords: [38.8339, -104.8214],
      nights: 2,
      summary: "Garden of the Gods and the ride up Pikes Peak — 14,115 ft on pavement.",
      ride: {
        via: [
          [38.5347, -105.9989, "Salida"],
          [38.4615, -105.3253, "Royal Gorge Bridge"],
          [38.4422, -105.2392, "Cañon City"],
        ],
        roads: "CO-17 → US-285 over Poncha Pass → Salida → US-50 down the Arkansas River canyon → Royal Gorge → CO-115",
        notes: "Salida is a great lunch stop. US-50 follows the Arkansas River through Bighorn Sheep Canyon — rafts and bighorns.",
        long: true,
      },
      highlights: [
        { name: "Royal Gorge Bridge", text: "Suspension bridge 955 ft above the Arkansas River." },
        { name: "Garden of the Gods", text: "Red sandstone fins against Pikes Peak; free park — ride through at sunrise." },
        { name: "Pikes Peak Highway", text: "19 miles, 156 turns, to 14,115 ft — fully paved; motorcycles welcome. Summit donuts at the visitor center." },
        { name: "Manitou Springs", text: "Quirky mountain town with mineral springs at the base of the peak." },
      ],
      explore: [
        {
          title: "Pikes Peak day",
          text: "Ride the Pikes Peak Highway early (bring every layer — it's 30 °F colder on top), descend slowly in low gear, then Garden of the Gods and Manitou Springs in the afternoon.",
          loop: [
            [38.857, -104.932, "Manitou Springs"],
            [38.9214, -105.0355, "Pikes Peak toll gate"],
            [38.8405, -105.0442, "Pikes Peak summit"],
            [38.8783, -104.8698, "Garden of the Gods"],
          ],
        },
      ],
      sleep: "Downtown Colorado Springs, or Manitou Springs inns for character.",
      alerts: ["Pikes Peak Highway needs a timed-entry reservation in summer/fall — book online."],
      wiki: ["Garden_of_the_Gods", "Pikes_Peak_Highway", "Royal_Gorge_Bridge"],
      gallery: [],
    },
    {
      id: "denver",
      name: "Denver, CO",
      region: "Colorado",
      coords: [39.7392, -104.9903],
      nights: 2,
      summary: "The Mile High City — halfway point. Service the bike, catch a show at Red Rocks.",
      ride: {
        via: [
          [38.9939, -105.0569, "Woodland Park"],
          [39.2547, -105.2244, "Deckers (CO-67)"],
          [39.4255, -105.3433, "Pine / CO-126"],
          [39.5205, -105.3075, "Conifer"],
        ],
        roads: "US-24 → CO-67 along the South Platte → CO-126 → US-285 into Denver",
        notes: "CO-67 / CO-126 is a local favourite — riverside curves through Pike National Forest. Way better than I-25.",
        weighting: "curvature",
      },
      highlights: [
        { name: "Red Rocks Amphitheatre", text: "Concert venue between 300-ft sandstone monoliths. Check the calendar; even empty it's worth a visit." },
        { name: "LoDo, Union Station & Larimer Square", text: "Restored railway station with bars; Denver's oldest block." },
        { name: "Bike service", text: "~3,000 mi in. Book an oil change / tyre check at a dealer a week ahead." },
        { name: "Coors Field / breweries", text: "Great American Beer Festival town — tasting rooms in RiNo." },
      ],
      explore: [
        {
          title: "Service + Red Rocks day",
          text: "Drop the bike for service in the morning, explore Union Station and RiNo on foot, evening at Red Rocks (or ride out at sunset to Lookout Mountain).",
        },
      ],
      sleep: "Downtown / LoDo hotels with garage parking, or the Crawford Hotel in Union Station.",
      alerts: [],
      wiki: ["Red_Rocks_Amphitheatre", "Denver_Union_Station", "Larimer_Square"],
      gallery: [],
    },
    {
      id: "estes-park",
      name: "Estes Park, CO",
      region: "Colorado",
      coords: [40.3772, -105.5217],
      nights: 2,
      summary: "Gateway to Rocky Mountain National Park. Elk rut in September — bugling all night.",
      ride: {
        via: [
          [39.7555, -105.2211, "Golden"],
          [39.7469, -105.4167, "Clear Creek Canyon (US-6)"],
          [39.7969, -105.495, "Black Hawk"],
          [39.9614, -105.5108, "Nederland"],
          [40.2019, -105.5268, "Allenspark (CO-7)"],
        ],
        roads: "US-6 Clear Creek Canyon (tunnels) → CO-119 → CO-72/CO-7 Peak to Peak Highway",
        notes: "Peak to Peak is Colorado's oldest scenic byway — aspens and 14,000-ft views the whole way.",
      },
      highlights: [
        { name: "Clear Creek Canyon", text: "Narrow canyon with rock tunnels out of Golden." },
        { name: "Peak to Peak Highway", text: "55 miles along the Front Range at 8–9,000 ft, golden aspens in late September." },
        { name: "Elk rut", text: "September–October bull elk bugle in Moraine Park and on the Estes golf course." },
        { name: "The Stanley Hotel", text: "Inspired Stephen King's 'The Shining' — ghost tours." },
      ],
      explore: [
        {
          title: "RMNP: Bear Lake + Old Fall River Road",
          text: "Early start (timed entry) for Bear Lake Road and a short hike to Dream & Emerald Lakes. Then the one-way gravel Old Fall River Road up to the Alpine Visitor Center and back down Trail Ridge.",
          loop: [
            [40.3123, -105.6455, "Bear Lake"],
            [40.4057, -105.6248, "Old Fall River Road"],
            [40.4413, -105.7543, "Alpine Visitor Center"],
            [40.3926, -105.6876, "Trail Ridge Road"],
          ],
        },
      ],
      sleep: "Stanley Hotel or a riverside lodge on Fall River Road.",
      alerts: [
        "RMNP timed-entry permits required roughly late May → mid-October (9 am–2 pm; Bear Lake Road 5 am–6 pm). Book on recreation.gov.",
        "Old Fall River Road is gravel and usually closes in early October.",
        "Non-US residents: $100 surcharge unless you hold the $250 annual pass.",
      ],
      wiki: ["Rocky_Mountain_National_Park", "Old_Fall_River_Road", "The_Stanley_Hotel"],
      gallery: [],
    },
    {
      id: "leadville",
      name: "Leadville, CO",
      region: "Colorado",
      coords: [39.2508, -106.2925],
      nights: 1,
      summary: "Over Trail Ridge Road (12,183 ft) to the highest incorporated city in the US.",
      ride: {
        via: [
          [40.3926, -105.6876, "Trail Ridge Road high point"],
          [40.4413, -105.7543, "Alpine Visitor Center"],
          [40.2522, -105.8231, "Grand Lake"],
          [40.0589, -106.3889, "Kremmling"],
          [39.6303, -106.0717, "Silverthorne"],
          [39.3683, -106.1869, "Fremont Pass"],
        ],
        roads: "US-34 Trail Ridge Road → US-40 → CO-9 past Green Mountain Reservoir → CO-91 Fremont Pass",
        notes:
          "The big one. 11 miles above treeline on Trail Ridge, highest continuous paved road in the US. Cold and windy at the top even in September.",
        long: true,
      },
      highlights: [
        { name: "Trail Ridge Road", text: "Tundra at 12,000 ft; Forest Canyon and Rock Cut overlooks; marmots and pikas." },
        { name: "Grand Lake", text: "Colorado's largest natural lake, wooden boardwalk town — coffee stop." },
        { name: "Fremont Pass", text: "11,318 ft past the vast Climax molybdenum mine." },
        { name: "Leadville", text: "Silver-boom town at 10,152 ft — Tabor Opera House, Healy House. Breathe slowly." },
      ],
      explore: [],
      sleep: "Delaware Hotel (1886) on Harrison Avenue.",
      alerts: ["Trail Ridge closes with the first big snow (typically mid/late October)."],
      wiki: ["Fremont_Pass", "Grand_Lake,_Colorado", "Leadville,_Colorado"],
      gallery: [],
    },
    {
      id: "glenwood-springs",
      name: "Glenwood Springs, CO",
      region: "Colorado",
      coords: [39.5505, -107.3248],
      nights: 1,
      summary: "Independence Pass (12,095 ft) and Aspen, then a soak in the world's biggest hot-springs pool.",
      ride: {
        via: [
          [39.0822, -106.3803, "Twin Lakes"],
          [39.1083, -106.5644, "Independence Pass"],
          [39.1911, -106.8175, "Aspen"],
          [39.4022, -107.2112, "Carbondale"],
        ],
        roads: "US-24 → CO-82 over Independence Pass → Aspen → CO-82 down the Roaring Fork valley",
        notes: "Independence Pass is narrow, single-lane in spots with sheer drops and no guardrails. Vehicles over 35 ft are banned — you'll have it mostly to yourself.",
        weighting: "curvature",
      },
      highlights: [
        { name: "Twin Lakes", text: "Two glacial lakes under Colorado's two highest peaks (Elbert & Massive)." },
        { name: "Independence Pass", text: "Continental Divide at 12,095 ft; short walk to the overlook." },
        { name: "Maroon Bells", text: "Most photographed peaks in North America — 20 min off Aspen (shuttle/reservation required in season)." },
        { name: "Glenwood Hot Springs", text: "Two-block-long mineral pool since 1888. Exactly what your back needs." },
      ],
      explore: [],
      sleep: "Hotel Colorado (1893) next to the hot springs.",
      alerts: ["Maroon Bells road requires a reservation (shuttle or parking) in summer/fall."],
      wiki: ["Independence_Pass_(Colorado)", "Maroon_Bells", "Glenwood_Hot_Springs"],
      gallery: [],
    },
    {
      id: "ouray",
      name: "Ouray, CO",
      region: "Colorado",
      coords: [38.0228, -107.6714],
      nights: 2,
      summary: "'Switzerland of America' boxed in by 13,000-ft walls. Base for the San Juan Skyway — spend extra time here.",
      ride: {
        via: [
          [39.13, -107.286, "McClure Pass"],
          [38.8683, -107.592, "Paonia"],
          [38.7999, -107.7187, "Hotchkiss"],
          [38.4783, -107.8762, "Montrose"],
          [38.1528, -107.7548, "Ridgway"],
        ],
        roads: "CO-133 over McClure Pass → CO-92 → US-50 Montrose → US-550",
        notes:
          "Fruit stands in Paonia/Hotchkiss in September. If you're early, add the Black Canyon South Rim (+40 mi from Montrose).",
      },
      highlights: [
        { name: "McClure Pass", text: "Aspen-lined pass — one of the best fall-colour roads in the state." },
        { name: "Black Canyon of the Gunnison", text: "2,000-ft sheer walls so narrow sunlight barely hits the bottom. Painted Wall is the tallest cliff in Colorado." },
        { name: "Ouray Hot Springs Pool", text: "Hot pools with a 360° mountain view." },
        { name: "Box Cañon Falls", text: "Waterfall roaring inside a slot canyon, 5 min from town." },
      ],
      explore: [
        {
          title: "Dallas Divide → Telluride loop",
          text: "Ride CO-62 over the Dallas Divide (the classic Mount Sneffels postcard, golden aspens), into the box canyon of Telluride. Free gondola up to Mountain Village. Back the same way. ~100 mi round trip. Alternative: Black Canyon of the Gunnison South Rim (~50 mi each way).",
          loop: [
            [38.1528, -107.7548, "Ridgway"],
                        [37.9375, -107.8123, "Telluride"],
          ],
        },
      ],
      sleep: "Beaumont Hotel, or Box Canyon Lodge (private hot-spring tubs).",
      alerts: [],
      wiki: ["Black_Canyon_of_the_Gunnison_National_Park", "Ouray,_Colorado", "Telluride,_Colorado"],
      gallery: [],
    },
    {
      id: "mesa-verde",
      name: "Mesa Verde, CO",
      region: "Colorado",
      coords: [37.2697, -108.4894],
      nights: 1,
      summary: "The Million Dollar Highway — then sleep inside the park among 800-year-old cliff dwellings.",
      ride: {
        via: [
          [37.8981, -107.7123, "Red Mountain Pass"],
          [37.8119, -107.6645, "Silverton"],
          [37.2753, -107.8801, "Durango"],
          [37.3392, -108.413, "Mesa Verde entrance"],
        ],
        roads: "US-550 'Million Dollar Highway' over Red Mountain, Molas & Coal Bank passes → US-160 → Mesa Verde park road",
        notes:
          "Arguably the most spectacular paved road in the US: no guardrails, 1,000-ft drop-offs, switchbacks at 11,000 ft. Ride it in daylight, dry, and take your time. Durango for lunch.",
        weighting: "curvature",
      },
      highlights: [
        { name: "Million Dollar Highway", text: "Ouray → Silverton: carved into the cliff of the Uncompahgre Gorge, then over three 10–11,000-ft passes." },
        { name: "Silverton", text: "Mining town where the narrow-gauge steam train from Durango arrives." },
        { name: "Durango", text: "Lively Western main street — lunch and fuel." },
        { name: "Cliff Palace", text: "150-room Ancestral Puebloan cliff city. Ranger tours only — book 14 days ahead at 8 am MT." },
      ],
      explore: [],
      sleep: "Far View Lodge inside the park (open mid-April → mid-October) — sunset from your balcony over four states.",
      alerts: [
        "Cliff Palace / Balcony House tours sell out within minutes of release (14 days ahead). Set an alarm.",
        "Far View Lodge usually closes mid-October; if you're later, stay in Cortez.",
      ],
      wiki: ["Red_Mountain_Pass", "Silverton,_Colorado", "Cliff_Palace"],
      gallery: [],
    },

    // ────────────────────────────── CANYON COUNTRY ──────────────────────────
    {
      id: "monument-valley",
      name: "Monument Valley, UT/AZ",
      region: "Canyon Country",
      coords: [36.983, -110.1124],
      nights: 1,
      summary: "Into the red-rock desert: Bluff, the Goosenecks, and the most iconic Western skyline of all.",
      ride: {
        via: [
          [37.3489, -108.5859, "Cortez"],
          [37.2836, -109.5526, "Bluff"],
          [37.1746, -109.927, "Goosenecks State Park"],
          [37.1497, -109.8559, "Mexican Hat"],
          [37.1007, -109.9908, "Forrest Gump Point (US-163)"],
        ],
        roads: "US-160/US-491 → UT-162 → US-191 Bluff → US-163 → UT-261 spur to Goosenecks → US-163 into Monument Valley",
        notes:
          "Optional thrill: Valley of the Gods (17-mi graded dirt loop) and the Moki Dugway (3 mi gravel switchbacks) are both rideable on a road bike in dry weather.",
      },
      highlights: [
        { name: "Bluff", text: "Tiny pioneer town with great coffee (Comb Ridge Eat & Drink) and Bears Ears country around it." },
        { name: "Goosenecks State Park", text: "The San Juan River carves 1,000-ft-deep entrenched meanders." },
        { name: "Forrest Gump Point", text: "The famous straight road leading into the buttes — mile marker 13 on US-163." },
        { name: "Monument Valley sunrise", text: "Navajo Tribal Park: the View Hotel faces the Mittens. Take a Navajo-guided jeep tour into the restricted valley." },
      ],
      explore: [],
      sleep: "The View Hotel (every room faces the Mittens) or Goulding's Lodge. Book months ahead.",
      alerts: ["Monument Valley is on the Navajo Nation — tribal park fee; national park passes not accepted. Navajo Nation observes daylight saving time; surrounding Arizona does not."],
      wiki: ["Monument_Valley", "Goosenecks_State_Park", "Valley_of_the_Gods"],
      gallery: [],
    },
    {
      id: "page",
      name: "Page, AZ",
      region: "Canyon Country",
      coords: [36.9147, -111.4558],
      nights: 1,
      summary: "Lake Powell, Horseshoe Bend and the slot canyons of Antelope Canyon.",
      ride: {
        via: [
          [36.7278, -110.2546, "Kayenta"],
        ],
        roads: "US-163 → US-160 → AZ-98 across the Navajo Nation",
        notes: "Long empty desert straights. Book an Antelope Canyon tour for the afternoon — they're Navajo-guided only.",
      },
      highlights: [
        { name: "Antelope Canyon", text: "The famous light-beam slot canyon. Upper is the classic; Lower has ladders and fewer crowds. Tours only — book ahead." },
        { name: "Horseshoe Bend", text: "Colorado River makes a 270° loop 1,000 ft below — 1.5 mi walk; go at sunset." },
        { name: "Glen Canyon Dam & Lake Powell", text: "Walk the dam bridge; boat or kayak into side canyons." },
      ],
      explore: [],
      sleep: "Lake Powell Resort or motels in Page.",
      alerts: ["Antelope Canyon tours sell out in season — book a time slot as soon as your dates are firm."],
      wiki: ["Antelope_Canyon", "Horseshoe_Bend_(Arizona)", "Lake_Powell"],
      gallery: [],
    },
    {
      id: "springdale",
      name: "Springdale (Zion), UT",
      region: "Canyon Country",
      coords: [37.1889, -112.9986],
      nights: 2,
      summary: "Zion's sheer red canyon walls. Enter through the Zion–Mount Carmel tunnel — a spectacular arrival.",
      ride: {
        via: [
          [37.0475, -112.5263, "Kanab"],
          [37.234, -112.876, "Zion east entrance / Checkerboard Mesa"],
          [37.2128, -112.9583, "Zion–Mt Carmel tunnel"],
        ],
        roads: "US-89 → Kanab → US-89 → UT-9 Zion–Mount Carmel Highway",
        notes: "The switchbacks below the 1.1-mile tunnel down into the canyon are one of the great motorcycle descents.",
      },
      highlights: [
        { name: "Zion–Mount Carmel Highway", text: "Slickrock domes, Checkerboard Mesa, the 1930 tunnel with rock 'windows', then switchbacks into the canyon." },
        { name: "Zion Canyon (shuttle)", text: "The main canyon road is shuttle-only most of the year — park the bike in Springdale and ride the free shuttle." },
        { name: "The Narrows", text: "Hike up the Virgin River between 1,000-ft walls (rent water shoes in town)." },
        { name: "Angels Landing", text: "Chain-assisted ridge hike — permit lottery required." },
        { name: "Kolob Terrace Road", text: "Quiet high road on the park's west side — great motorcycle ride if you want a riding day." },
      ],
      explore: [
        {
          title: "Zion hiking day",
          text: "First shuttle at dawn to Temple of Sinawava → The Narrows (wade 2–3 h up). Afternoon: Riverside / Emerald Pools, or ride the Kolob Terrace Road to Lava Point (7,900 ft).",
        },
      ],
      sleep: "Cable Mountain Lodge or Desert Pearl Inn in Springdale (walk to the park entrance).",
      alerts: [
        "Non-US residents: $100 surcharge unless you hold the annual pass.",
        "Angels Landing needs a permit (seasonal lottery + day-before lottery on recreation.gov).",
      ],
      wiki: ["Zion_National_Park", "Checkerboard_Mesa", "The_Narrows_(Zion_National_Park)"],
      gallery: [],
    },
    {
      id: "bryce",
      name: "Bryce Canyon, UT",
      region: "Canyon Country",
      coords: [37.674, -112.158],
      nights: 1,
      summary: "Amphitheatres of orange hoodoos at 8,000 ft, via Red Canyon's arches.",
      ride: {
        via: [
          [37.234, -112.876, "Checkerboard Mesa"],
          [37.631, -112.4471, "Hatch"],
          [37.7432, -112.308, "Red Canyon (UT-12 arches)"],
        ],
        roads: "UT-9 east → US-89 north along the Sevier River → UT-12 through Red Canyon",
        notes: "Short day — arrive for the sunset at Sunset/Sunrise Point.",
      },
      highlights: [
        { name: "Red Canyon", text: "Ride through two rock-arch tunnels on UT-12." },
        { name: "Bryce Amphitheater", text: "Sunrise at Sunrise Point, then hike Navajo Loop + Queen's Garden (3 mi) down among the hoodoos." },
        { name: "Rainbow Point drive", text: "18-mile park road to 9,100 ft with overlooks all the way." },
      ],
      explore: [],
      sleep: "The Lodge at Bryce Canyon (in park) or Ruby's Inn.",
      alerts: ["Non-US residents: $100 surcharge unless you hold the annual pass."],
      wiki: ["Bryce_Canyon_National_Park", "Thor's_Hammer"],
      gallery: [],
    },
    {
      id: "torrey",
      name: "Torrey (Capitol Reef), UT",
      region: "Canyon Country",
      coords: [38.2997, -111.4196],
      nights: 1,
      summary: "Highway 12 — the All-American Road many riders call the best in the country.",
      ride: {
        via: [
          [37.7703, -111.6021, "Escalante"],
          [37.8546, -111.4224, "The Hogback"],
          [37.9083, -111.4229, "Boulder"],
        ],
        roads: "UT-12 'Scenic Byway 12' the whole way",
        notes:
          "The Hogback: a knife-edge ridge with 1,000-ft drops on both sides and no shoulders. Then the road climbs Boulder Mountain through aspens. Leave time for Capitol Reef in the afternoon.",
        weighting: "curvature",
      },
      highlights: [
        { name: "The Hogback", text: "UT-12 rides the spine of a narrow ridge between Escalante and Boulder — unforgettable." },
        { name: "Lower Calf Creek Falls", text: "126-ft waterfall, 6-mile round-trip sandy hike from the road." },
        { name: "Hell's Backbone Grill, Boulder", text: "Celebrated farm-to-table restaurant in a town of 200." },
        { name: "Capitol Reef scenic drive", text: "Fruita orchards (pick-your-own in season), pie at the Gifford House, petroglyphs." },
      ],
      explore: [],
      sleep: "Capitol Reef Resort or Torrey motels.",
      alerts: [],
      wiki: ["Grand_Staircase–Escalante_National_Monument", "Capitol_Reef_National_Park", "Calf_Creek_Falls"],
      gallery: [],
    },

    // ───────────────────────────────── GREAT BASIN ──────────────────────────
    {
      id: "baker",
      name: "Baker (Great Basin NP), NV",
      region: "Great Basin",
      coords: [39.0133, -114.1217],
      nights: 2,
      summary: "Remote, uncrowded national park with 5,000-year-old bristlecone pines and some of the darkest skies in America.",
      ride: {
        via: [
          [38.4022, -111.6433, "Loa"],
          [38.9576, -111.8599, "Salina"],
          [39.2486, -112.106, "Scipio"],
          [39.3522, -112.5772, "Delta"],
        ],
        roads: "UT-24 → Salina → US-50 → Delta → US-50/6 across the Sevier Desert",
        notes:
          "Transit day across empty desert. Fill up in Delta — next fuel is ~85 mi away in Baker. Note the time zone change (Nevada is Pacific time).",
        long: true,
      },
      highlights: [
        { name: "Fish Lake (detour, +30 min)", text: "Alpine lake at 8,800 ft via UT-25, home of 'Pando' — a single aspen clone that is one of the largest organisms on Earth." },
        { name: "Wheeler Peak Scenic Drive", text: "12 miles climbing to 10,000 ft beneath a 13,063-ft peak." },
        { name: "Bristlecone Pine Trail", text: "Walk among some of the oldest living things on Earth." },
        { name: "Lehman Caves", text: "Ornate marble cave; ranger tours." },
        { name: "Dark sky", text: "Gold-tier International Dark Sky Park — the Milky Way is ridiculous." },
      ],
      explore: [
        {
          title: "Great Basin day",
          text: "Wheeler Peak Scenic Drive in the morning, Bristlecone + Glacier trail hike, Lehman Caves tour in the afternoon, stargazing after dark. A real rest from the saddle.",
          loop: [[39.01, -114.3024, "Wheeler Peak Scenic Drive"]],
        },
      ],
      sleep: "Stargazer Inn in Baker, or cabins — Baker has ~70 residents.",
      alerts: ["Lehman Caves tours: reserve on recreation.gov.", "Wheeler Peak Scenic Drive upper section closes with snow (often by November)."],
      wiki: ["Great_Basin_National_Park", "Lehman_Caves", "Pando_(tree)"],
      gallery: [],
    },
    {
      id: "austin-nv",
      name: "Austin, NV",
      region: "Great Basin",
      coords: [39.4932, -117.0697],
      nights: 1,
      summary: "'The Loneliest Road in America' — US-50 across a dozen mountain ranges to an 1860s silver-mining town.",
      ride: {
        via: [
          [39.2474, -114.8886, "Ely"],
          [39.5124, -115.9608, "Eureka"],
        ],
        roads: "US-50 'Loneliest Road in America'",
        notes:
          "Basin, range, basin, range — straight lines across valleys, then twisties over each pass. Get your 'Loneliest Road' passport stamped in Ely, Eureka and Austin.",
        long: true,
      },
      highlights: [
        { name: "Nevada Northern Railway, Ely", text: "Complete working 1906 railyard — steam train rides." },
        { name: "Eureka", text: "Restored 1880 opera house and courthouse in a town of 600." },
        { name: "Austin", text: "Silver boom town clinging to a canyon: Stokes Castle, three 1860s churches." },
        { name: "Loneliest Road passport", text: "Free survival certificate from Nevada tourism — collect stamps in each town." },
      ],
      explore: [],
      sleep: "Cozy Mountain Motel or Union St. Lodging. Very basic.",
      alerts: ["Fuel in Ely, Eureka and Austin only — fill at every one."],
      wiki: ["Eureka,_Nevada", "Nevada_Northern_Railway", "Austin,_Nevada"],
      gallery: [],
    },
    {
      id: "tahoe",
      name: "South Lake Tahoe, CA",
      region: "Sierra & Coast",
      coords: [38.9399, -119.9772],
      nights: 1,
      summary: "Down from the desert to the deep-blue alpine lake. Loop the west shore past Emerald Bay.",
      ride: {
        via: [
          [39.4735, -118.7768, "Fallon"],
          [39.1638, -119.7674, "Carson City"],
          [39.1054, -119.8926, "Spooner Summit"],
        ],
        roads: "US-50 → Fallon → US-50 → Carson City → US-50 over Spooner Summit → Lake Tahoe",
        notes:
          "The descent from Spooner Summit to the lake is a huge reveal. If you have energy, add the 72-mi lake loop clockwise via Incline Village and Emerald Bay.",
        long: true,
      },
      highlights: [
        { name: "Middlegate Station", text: "Old Pony Express-era station; try the 'Monster Burger'." },
        { name: "Lake Tahoe", text: "1,645 ft deep, startlingly clear water." },
        { name: "Emerald Bay", text: "Postcard view from CA-89; Vikingsholm castle at the water's edge." },
        { name: "Sand Harbor", text: "Granite boulders in turquoise water on the Nevada shore." },
      ],
      explore: [],
      sleep: "Lakeside inns along US-50 or the Landing Tahoe.",
      alerts: [],
      wiki: ["Lake_Tahoe", "Emerald_Bay_State_Park", "Middlegate,_Nevada"],
      gallery: [],
    },

    // ───────────────────────────── SIERRA & COAST ───────────────────────────
    {
      id: "lee-vining",
      name: "Lee Vining (Mono Lake), CA",
      region: "Sierra & Coast",
      coords: [37.9566, -119.1197],
      nights: 1,
      summary: "Monitor Pass and the High Sierra's east side to otherworldly Mono Lake.",
      ride: {
        via: [
          [38.7873, -119.9411, "Luther Pass / Hope Valley"],
          [38.6949, -119.7801, "Markleeville"],
          [38.673, -119.617, "Monitor Pass (CA-89)"],
          [38.2557, -119.231, "Bridgeport"],
          [38.0726, -119.1782, "Conway Summit"],
        ],
        roads: "CA-89 Luther Pass → Markleeville → CA-89 Monitor Pass → US-395 → Bridgeport → Conway Summit",
        notes:
          "Monitor Pass (8,314 ft) is a superb motorcycle road with a dramatic drop to 395. US-395 is one of the West's great scenic highways.",
        weighting: "curvature",
      },
      highlights: [
        { name: "Monitor Pass", text: "Sagebrush and aspen pass with a jaw-dropping drop into the Antelope Valley." },
        { name: "Bodie State Historic Park", text: "Best-preserved ghost town in the West, 'arrested decay' — last 3 miles are gravel." },
        { name: "Mono Lake tufa towers", text: "Limestone spires rising from a salty lake — South Tufa at sunset." },
        { name: "Whoa Nellie Deli", text: "Legendary gas-station restaurant at the Tioga junction (fish tacos)." },
      ],
      explore: [],
      sleep: "Lake View Lodge or Murphey's Motel in Lee Vining.",
      alerts: ["Monitor Pass and Tioga Pass close with the first big snow — usually November, occasionally late October. Check Caltrans."],
      wiki: ["Mono_Lake", "Bodie,_California", "Monitor_Pass"],
      gallery: [],
    },
    {
      id: "yosemite",
      name: "Yosemite Valley, CA",
      region: "Sierra & Coast",
      coords: [37.7456, -119.5936],
      nights: 2,
      summary: "Over Tioga Pass (9,943 ft) and down past Tuolumne Meadows into the valley of El Capitan and Half Dome.",
      ride: {
        via: [
          [37.9108, -119.2577, "Tioga Pass"],
          [37.8735, -119.3593, "Tuolumne Meadows"],
          [37.8104, -119.4851, "Olmsted Point"],
          [37.7157, -119.6827, "Tunnel View"],
        ],
        roads: "CA-120 Tioga Road → Big Oak Flat Road → Northside Drive into the valley",
        notes: "One of the best mountain roads in America. Only ~75 mi, but stop everywhere: Tenaya Lake, Olmsted Point, Tuolumne.",
      },
      highlights: [
        { name: "Tioga Road", text: "Granite domes, alpine lakes and meadows at 8–10,000 ft." },
        { name: "Tunnel View", text: "El Capitan, Bridalveil Fall and Half Dome in one frame." },
        { name: "Glacier Point", text: "Look down 3,200 ft onto the valley floor; Half Dome eye-to-eye at sunset." },
        { name: "Valley floor", text: "Lower Yosemite Fall, El Capitan meadow (spot climbers), Mist Trail to Vernal Fall." },
      ],
      explore: [
        {
          title: "Glacier Point + valley day",
          text: "Morning hike up the Mist Trail to Vernal Fall. Afternoon ride up to Glacier Point (32 mi each way, superb road) for sunset.",
          loop: [
            [37.7157, -119.6827, "Tunnel View"],
            [37.6649, -119.6267, "Chinquapin"],
            [37.7272, -119.5744, "Glacier Point"],
          ],
        },
      ],
      sleep: "Yosemite Valley Lodge or the Ahwahnee (book 12+ months out); otherwise El Portal / Mariposa.",
      alerts: [
        "Non-US residents: $100 surcharge unless you hold the annual pass.",
        "No timed-entry reservation was required in 2026 — check whether that changes for your year.",
      ],
      wiki: ["Tioga_Pass", "Tuolumne_Meadows", "Yosemite_Valley", "Glacier_Point"],
      gallery: [],
    },
    {
      id: "monterey",
      name: "Monterey, CA",
      region: "Sierra & Coast",
      coords: [36.6002, -121.8947],
      nights: 2,
      summary: "Down the Merced River canyon to the Pacific — and a full day for Big Sur.",
      ride: {
        via: [
          [37.6669, -119.791, "Merced River canyon (CA-140)"],
          [37.4849, -119.9663, "Mariposa"],
          [37.0712, -121.2159, "Pacheco Pass"],
          [36.8527, -121.4019, "San Juan Bautista"],
        ],
        roads: "CA-140 along the Merced River → Mariposa → CA-140/CA-152 Pacheco Pass → CA-156 → Monterey",
        notes: "Central Valley crossing is hot and flat; the rest is good. First sight of the Pacific!",
        long: true,
      },
      highlights: [
        { name: "Merced River canyon", text: "CA-140 follows the river down from El Portal — lovely riverside curves." },
        { name: "Mission San Juan Bautista", text: "1797 mission (Hitchcock's 'Vertigo'); lunch stop." },
        { name: "Cannery Row & Monterey Bay Aquarium", text: "World-class aquarium in Steinbeck's old sardine cannery." },
        { name: "Big Sur", text: "Highway 1 fully reopened in January 2026 after years of landslide closures." },
      ],
      explore: [
        {
          title: "Big Sur ride",
          text: "Carmel → Bixby Bridge → Pfeiffer Big Sur → McWay Falls → lunch at Nepenthe's cliff-top terrace → back. Early start beats the camper vans. ~120 mi round trip.",
          loop: [
            [36.5552, -121.9233, "Carmel"],
            [36.3715, -121.9017, "Bixby Bridge"],
            [36.2219, -121.7594, "Nepenthe"],
            [36.1578, -121.6722, "McWay Falls"],
          ],
        },
      ],
      sleep: "Monterey / Pacific Grove inns, or Carmel-by-the-Sea for a treat.",
      alerts: [
        "Motorcycles are NOT allowed on the 17-Mile Drive in Pebble Beach.",
        "Highway 1 through Big Sur is landslide-prone — check Caltrans (QuickMap) the day before.",
      ],
      wiki: ["Bixby_Creek_Bridge", "Big_Sur", "Monterey_Bay_Aquarium", "McWay_Falls"],
      gallery: [],
    },
    {
      id: "sf",
      name: "San Francisco, CA",
      region: "Sierra & Coast",
      coords: [37.7749, -122.4194],
      nights: 2,
      summary: "Finale: up Highway 1 along the coast, through the city, and across the Golden Gate Bridge.",
      ride: {
        via: [
          [36.9741, -122.0308, "Santa Cruz"],
          [37.1817, -122.3936, "Pigeon Point Lighthouse"],
          [37.4636, -122.4286, "Half Moon Bay"],
          [37.5753, -122.5147, "Devil's Slide"],
          [37.8199, -122.4783, "Golden Gate Bridge"],
          [37.8325, -122.4994, "Marin Headlands (Hawk Hill)"],
        ],
        roads: "CA-1 Cabrillo Highway the whole coast → Great Highway → Golden Gate Bridge → Conzelman Road → back into the city",
        notes:
          "Finish with the classic: ride over the Golden Gate to Hawk Hill for THE photo of the bridge and the city, then ride back across. You've made it — coast to coast.",
      },
      highlights: [
        { name: "Santa Cruz Boardwalk", text: "1907 seaside amusement park and the Giant Dipper wooden coaster." },
        { name: "Pigeon Point Lighthouse", text: "One of the tallest lighthouses on the West Coast, 1872." },
        { name: "Golden Gate Bridge", text: "Ride across it, then up to Hawk Hill (Marin Headlands) for the view back." },
        { name: "City days", text: "Alcatraz (book ahead), cable cars, Mission burritos, Ferry Building, sunset at Lands End." },
      ],
      explore: [
        {
          title: "Victory lap: Mount Tamalpais + Muir Woods",
          text: "Last ride: across the bridge, Panoramic Highway up Mount Tam (views to the Farallon Islands), Muir Woods redwoods, Stinson Beach and back along CA-1. Then arrange bike shipping / return.",
          loop: [
            [37.8199, -122.4783, "Golden Gate Bridge"],
            [37.8931, -122.5666, "Muir Woods"],
            [37.9235, -122.5965, "Mount Tamalpais"],
            [37.9005, -122.6444, "Stinson Beach"],
          ],
        },
      ],
      sleep: "Anywhere with garage parking — Fisherman's Wharf and SoMa hotels are bike-friendly.",
      alerts: ["Alcatraz tickets sell out weeks ahead.", "Never leave luggage on a parked bike in SF."],
      wiki: ["Golden_Gate_Bridge", "Pigeon_Point_Light_Station", "Marin_Headlands", "Mount_Tamalpais"],
      gallery: [],
    },
  ],
};
