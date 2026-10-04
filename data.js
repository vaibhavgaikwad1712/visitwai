/* =====================================================================
   VISIT WAI — EDIT YOUR DETAILS HERE
   Change these once and every page updates.
   ===================================================================== */
const SITE = {
  email: "visitwaitour@gmail.com",
  phoneDisplay: "+91 98342 14377",   // how the number looks on the site
  phoneLink: "+919834214377",        // same number, no spaces
  whatsapp: "919834214377",          // country code + number, no + or spaces
  instagram: "visitwai"
};


/* =====================================================================
   PRICES — change these numbers and every page and booking form update.
   ===================================================================== */
const PRICING = {
  // Package cost per day, by group size (adults + children aged 5 and above).
  // A budget stay (worth ₹1,000 per room per night) is INCLUDED in this price.
  packageTiers: [
    { upTo: 3,  perDay: 5500 },    // 1–3 people (priced for 2; a 3rd person shares a room)
    { upTo: 6,  perDay: 7500 },    // 4–6 people
    { upTo: 14, perDay: 9500 },    // 7–14 people
    { upTo: 20, perDay: 11500 }    // 15–20 people
  ],
  maxPeople: 20,
  children: { freeUnderAge: 5, maxFree: 2 },   // up to 2 children under 5 travel free
  includedHotel: "Budget",          // this hotel type is included in the package price
  hotelsPerNight: {                 // value of each hotel type, per room (2 people) per night
    "Budget": 1000,
    "2 star": 1500,
    "3 star": 3000,
    "4 star": 5000,
    "5 star": 10000
  },
  driverOnlyPerDay: 1999,           // our driver for the customer's own car
  addons: {                         // per day; larger price from largeGroupFrom people
    largeGroupFrom: 6,
    photographer: { label: "Trip photographer (DSLR photos)", perDay: 1499, perDayLarge: 2999 },
    drone: { label: "Drone shots (up to 10 shots a day)", perDay: 2499, perDayLarge: 4999 },
    caretaker: { label: "Caretaker for elders", perDay: 999, perDayLarge: 999, onlyFor: ["seniors-2", "seniors-3"] }
  },
  villa: { perNight: 9999, maxGuests: 8, transfer: 0 }   // transfer: 0 = Wai stand pickup & drop included
};
const inr = n => "₹" + Math.round(n).toLocaleString("en-IN");

/* =====================================================================
   GOOGLE FORM — bookings are saved to your Google Form (and its Sheet).
   Fill in formId and each entry number from your form's pre-filled link.
   While formId is empty, bookings are emailed through FormSubmit instead.
   ===================================================================== */
const GOOGLE_FORM = {
  formId: "",                 // the long ID in .../forms/d/e/THIS_PART/viewform
  fields: {                   // entry numbers, e.g. "entry.123456789"
    name: "", phone: "", email: "", package: "", date: "", days: "", people: "",
    children: "", hotel: "", rooms: "", addons: "", food: "", total: "", breakdown: "", notes: "", terms: ""
  },
  alsoEmail: true             // also send a full-detail booking email to SITE.email
};

/* =====================================================================
   PACKAGES
   Each package has: id, group (2day / 3day / special), category,
   name, summary, details, days (each with stops: [time, place, note]),
   and optional notes. Edit text freely; keep the commas and quotes.
   ===================================================================== */
const PACKAGES = [
  /* ---------------- 2-DAY ---------------- */
  {
    id: "couples-2", group: "2day", category: "Couples", baseDays: 2,
    name: "Hills for Two",
    summary: "A private 2-day trip for couples with a verified driver, a couple-friendly hotel, sunset at Bombay Point and an optional Wilson Point sunrise.",
    stay: "1 night, couple-friendly hotel in Mahabaleshwar", walking: "Moderate", bestFor: "Couples, honeymooners",
    cardNote: "Travelling solo? The couple package price stays the same for one person, because the car, driver and room are the same.",
    notes: ["Travelling solo? The couple package price stays the same for one person, because the car, driver and room are the same."],
    days: [
      { title: "Day 1: Wai → Panchgani → Mahabaleshwar", stops: [
        ["8:00 am", "Dholya Ganpati, Wai", "Darshan and photos on the Krishna ghat"],
        ["8:45 am", "Menavali Ghat", "Quiet riverside walk at the \"Swades\" film location"],
        ["10:00 am", "Harrison's Folly", "Valley views; tandem paragliding optional (Oct–May)"],
        ["11:15 am", "Table Land & Devil's Kitchen", "Plateau walk, pony cart"],
        ["12:45 pm", "Sydney Point", "Krishna valley and Dhom views"],
        ["1:30 pm", "Lunch, Panchgani", ""],
        ["2:45 pm", "Mapro Garden", "Strawberries with cream, chocolate shop"],
        ["4:00 pm", "Check-in, Mahabaleshwar", "Rest"],
        ["4:45 pm", "Venna Lake", "Boating before sunset"],
        ["6:15 pm", "Bombay Point", "Sunset"],
        ["7:15 pm", "Main market", "Chikki, fudge, dinner"]
      ]},
      { title: "Day 2: Mahabaleshwar points → Wai", stops: [
        ["6:15 am", "Wilson Point", "Sunrise (optional early start)"],
        ["8:30 am", "Breakfast & check-out", ""],
        ["9:30 am", "Old Mahabaleshwar", "Mahabaleshwar temple, Panchganga, Krishnabai"],
        ["10:45 am", "Arthur's Seat, Window Point, Tiger Spring", "Deepest valley views"],
        ["12:45 pm", "Lunch", ""],
        ["2:00 pm", "Lingmala Waterfall", "Best Jul–Oct"],
        ["3:15 pm", "Strawberry farm, Bhilar/Avkali", "Pick-your-own (Dec–Apr)"],
        ["4:30 pm", "Kate's Point & Needle Hole", "Dhom and Balkawadi dam views"],
        ["6:30 pm", "Drop in Wai", ""]
      ]}
    ]
  },
  {
    id: "families-2", group: "2day", category: "Families", baseDays: 2,
    name: "Hills, Rides & Strawberries",
    summary: "Pony carts, an adventure park, the Wax Museum and Mapro's chocolate factory, with no early starts so kids can sleep in.",
    stay: "1 night, family room in Mahabaleshwar", walking: "Easy to moderate", bestFor: "Parents with kids",
    days: [
      { title: "Day 1: Wai → Panchgani → Mahabaleshwar", stops: [
        ["8:30 am", "Dholya Ganpati, Wai", "Quick darshan"],
        ["9:30 am", "Harrison's Folly", "Camel and horse rides, valley photos"],
        ["10:30 am", "Table Land", "Pony cart, go-karting, snacks"],
        ["12:00 pm", "Sydney Point", ""],
        ["1:00 pm", "Lunch, Panchgani", ""],
        ["2:30 pm", "On Wheelz or Velocity adventure park", "Rides, go-karting, zip line (about 2.5 hrs)"],
        ["5:30 pm", "Check-in, Mahabaleshwar", ""],
        ["6:15 pm", "Venna Lake & market", "Corn, strawberries, horse ride by the lake"]
      ]},
      { title: "Day 2: Mahabaleshwar → Wai", stops: [
        ["8:30 am", "Breakfast & check-out", "No sunrise start, kids sleep in"],
        ["9:30 am", "Arthur's Seat & Echo Point", "Kids love the echo"],
        ["11:00 am", "Elephant's Head & Needle Hole", ""],
        ["12:00 pm", "Old Mahabaleshwar temples", ""],
        ["1:15 pm", "Lunch", ""],
        ["2:30 pm", "Wax Museum", ""],
        ["3:30 pm", "Mapro Garden", "Chocolate factory, play area, shakes"],
        ["4:45 pm", "Parsi Point", "Quick photo stop"],
        ["6:00 pm", "Drop in Wai", ""]
      ]}
    ]
  },
  {
    id: "seniors-2", group: "2day", category: "Seniors", baseDays: 2,
    name: "Easy Hills for Elders",
    summary: "A gentle trip for elders, with an optional caretaker for just ₹999 a day. Every stop is close to parking, with rest after lunch and home before dark.",
    stay: "1 night, ground-floor or lift-access room", walking: "Very easy", bestFor: "Elderly couples, with or without a caretaker",
    days: [
      { title: "Day 1: Wai → Panchgani → Mahabaleshwar", stops: [
        ["9:00 am", "Dholya Ganpati, Wai", "Darshan; help on the ghat steps"],
        ["10:00 am", "Pasarni Ghat", "View from the car or a roadside stop"],
        ["10:45 am", "Sydney Point", "Short walk from parking"],
        ["11:45 am", "Parsi Point", "Roadside viewpoint, seating"],
        ["12:30 pm", "Lunch & rest, Panchgani", "Low-spice meal"],
        ["2:30 pm", "Mapro Garden", "Flat paths, seating, tea"],
        ["4:00 pm", "Check-in, Mahabaleshwar", "Rest"],
        ["5:30 pm", "Venna Lake", "Lakeside sitting; boating only with life jackets if they wish"],
        ["7:30 pm", "Early dinner", ""]
      ]},
      { title: "Day 2: Mahabaleshwar → Wai", stops: [
        ["8:30 am", "Breakfast & check-out", "No sunrise start"],
        ["9:30 am", "Mahabaleshwar temple & Panchganga temple", "Darshan; Krishnabai skipped (steep steps)"],
        ["11:00 am", "Arthur's Seat", "Valley view near the parking"],
        ["12:30 pm", "Lunch & rest", ""],
        ["2:30 pm", "Kate's Point", "Road access, short walk"],
        ["3:30 pm", "Bhilar Book Village", "Sit and read, strawberry snack"],
        ["5:30 pm", "Drop in Wai", "Home before dark"]
      ]}
    ]
  },
  {
    id: "groups-2", group: "2day", category: "Groups", baseDays: 2,
    name: "Adventure Weekend",
    summary: "Paragliding, go-karting, zip lines and a hotel bonfire, then a Wilson Point sunrise and the big Mahabaleshwar viewpoints.",
    stay: "1 night, shared rooms (2–4 per room)", walking: "Active", bestFor: "Friends, college and office groups",
    days: [
      { title: "Day 1: Wai → Panchgani → Mahabaleshwar", stops: [
        ["7:30 am", "Dholya Ganpati & Menavali Ghat", "Group photos on the ghats"],
        ["9:15 am", "Harrison's Folly", "Paragliding (Oct–May)"],
        ["10:45 am", "Table Land & Devil's Kitchen", "Go-karting, plateau walk"],
        ["12:15 pm", "Sydney Point", ""],
        ["1:00 pm", "Lunch, Panchgani", ""],
        ["2:15 pm", "Velocity Entertainmentz", "Zip line, ATV, rope course, rappelling"],
        ["5:30 pm", "Check-in, Mahabaleshwar", ""],
        ["6:30 pm", "Venna Lake & market", ""],
        ["8:30 pm", "Dinner & bonfire at hotel", "Where the hotel allows"]
      ]},
      { title: "Day 2: Mahabaleshwar → Wai", stops: [
        ["6:15 am", "Wilson Point", "Sunrise"],
        ["8:00 am", "Breakfast & check-out", ""],
        ["9:00 am", "Arthur's Seat & Echo Point", ""],
        ["10:30 am", "Elephant's Head & Needle Hole", ""],
        ["11:30 am", "Old Mahabaleshwar temples", ""],
        ["1:00 pm", "Lunch", ""],
        ["2:15 pm", "Lingmala Waterfall", ""],
        ["3:30 pm", "Mapro Garden", ""],
        ["5:00 pm", "Kate's Point", ""],
        ["6:45 pm", "Drop in Wai", ""]
      ]}
    ],
    notes: ["Larger group vehicles park further from some points (Arthur's Seat, Kate's Point), so a little extra walking is needed."]
  },

  /* ---------------- 3-DAY ---------------- */
  {
    id: "couples-3", group: "3day", category: "Couples", baseDays: 3,
    name: "Slow Hills for Two",
    summary: "Three relaxed days: Wai's ghats and Dhom Dam, the art and book villages of Panchgani, then a sunrise and a lake day at Tapola.",
    stay: "1 night Panchgani, 1 night Mahabaleshwar", walking: "Moderate", bestFor: "Couples wanting slower days",
    cardNote: "Travelling solo? The couple package price stays the same for one person, because the car, driver and room are the same.",
    notes: ["Travelling solo? The couple package price stays the same for one person, because the car, driver and room are the same."],
    days: [
      { title: "Day 1: Wai heritage → Dhom → Panchgani", stops: [
        ["9:00 am", "Dholya Ganpati & Kashi Vishweshwar, Wai", "Darshan on the ghat"],
        ["10:00 am", "Menavali Ghat & Nana Phadnavis Wada", "Wada interiors on weekends"],
        ["11:30 am", "Dhom Dam & Narsimha temple", "Boating where open"],
        ["1:00 pm", "Lunch by Dhom backwaters", ""],
        ["3:00 pm", "Pasarni Ghat → Harrison's Folly", "Paragliding optional (Oct–May)"],
        ["4:45 pm", "Check-in, Panchgani", ""],
        ["5:30 pm", "Table Land", "Sunset on the plateau"]
      ]},
      { title: "Day 2: Panchgani villages → Mahabaleshwar", stops: [
        ["9:00 am", "Devrai Art Village", "Meet Adivasi artisans, short craft workshop"],
        ["10:30 am", "Bhilar Book Village", "Reading in the village, strawberry farm"],
        ["12:15 pm", "Mapro Garden", "Lunch, strawberries with cream"],
        ["2:00 pm", "Check-in, Mahabaleshwar", ""],
        ["3:00 pm", "Old Mahabaleshwar temples", "Panchganga, Krishnabai"],
        ["4:15 pm", "Arthur's Seat & Window Point", ""],
        ["6:15 pm", "Bombay Point", "Sunset"],
        ["7:15 pm", "Main market", "Dinner"]
      ]},
      { title: "Day 3: Sunrise → Tapola → Wai", stops: [
        ["6:15 am", "Wilson Point", "Sunrise"],
        ["8:00 am", "Breakfast & check-out", ""],
        ["9:00 am", "Tapola (\"Mini Kashmir\")", "Boating or kayaking on Shivsagar lake"],
        ["12:30 pm", "Lunch at Tapola", ""],
        ["2:00 pm", "Lingmala Waterfall", "On the way back"],
        ["3:15 pm", "Venna Lake", "Boating"],
        ["4:45 pm", "Kate's Point & Needle Hole", ""],
        ["6:45 pm", "Drop in Wai", ""]
      ]}
    ]
  },
  {
    id: "families-3", group: "3day", category: "Families", baseDays: 3,
    name: "Rides, Books & a Fort",
    summary: "An amusement park day, a storybook village, strawberry picking and Mapro, then the story of Shivaji Maharaj at Pratapgad Fort.",
    stay: "1 night Panchgani, 1 night Mahabaleshwar", walking: "Easy to moderate", bestFor: "Families with kids",
    days: [
      { title: "Day 1: Wai → Panchgani", stops: [
        ["9:00 am", "Dholya Ganpati & Menavali Ghat", "Film-location story for kids"],
        ["10:30 am", "Harrison's Folly", "Camel and horse rides"],
        ["11:30 am", "Table Land & Devil's Kitchen", "Pony cart, go-karting"],
        ["1:00 pm", "Lunch, Panchgani", ""],
        ["2:30 pm", "On Wheelz Amusement Park", "Rides for all ages (about 3 hrs)"],
        ["6:00 pm", "Check-in, Panchgani", ""]
      ]},
      { title: "Day 2: Panchgani → Mahabaleshwar", stops: [
        ["9:00 am", "Bhilar Book Village", "Kids' corner, storybooks"],
        ["10:15 am", "Strawberry farm", "Pick your own (Dec–Apr)"],
        ["11:30 am", "Mapro Garden", "Chocolate factory, play area, lunch"],
        ["1:45 pm", "Wax Museum", ""],
        ["3:00 pm", "Check-in, Mahabaleshwar", ""],
        ["4:30 pm", "Venna Lake", "Boating, horse rides"],
        ["6:30 pm", "Main market", ""]
      ]},
      { title: "Day 3: Pratapgad → Mahabaleshwar points → Wai", stops: [
        ["8:00 am", "Breakfast & check-out", ""],
        ["8:45 am", "Pratapgad Fort", "Shivaji Maharaj and Afzal Khan story; about 30 min of steps"],
        ["11:45 am", "Arthur's Seat & Echo Point", ""],
        ["1:00 pm", "Lunch", ""],
        ["2:15 pm", "Elephant's Head & Needle Hole", ""],
        ["3:15 pm", "Lingmala Waterfall", ""],
        ["4:30 pm", "Old Mahabaleshwar temples", ""],
        ["7:00 pm", "Drop in Wai", ""]
      ]}
    ]
  },
  {
    id: "seniors-3", group: "3day", category: "Seniors", baseDays: 3,
    name: "Unhurried Hills",
    summary: "Three slow days with one hotel for both nights, so nobody repacks, and rest at the hotel after every lunch. Add a caretaker for just ₹999 a day.",
    stay: "2 nights, same Mahabaleshwar hotel, ground floor or lift", walking: "Very easy", bestFor: "Elderly couples, with or without a caretaker",
    days: [
      { title: "Day 1: Wai → Mahabaleshwar", stops: [
        ["9:30 am", "Dholya Ganpati, Wai", "Darshan"],
        ["10:15 am", "Menavali Ghat", "View from the top steps"],
        ["11:30 am", "Sydney Point", "Short walk"],
        ["12:30 pm", "Lunch, Panchgani", ""],
        ["2:00 pm", "Parsi Point", "Roadside"],
        ["3:30 pm", "Check-in, Mahabaleshwar", "Rest"],
        ["5:30 pm", "Venna Lake", "Lakeside sitting"]
      ]},
      { title: "Day 2: Temples and a garden", stops: [
        ["9:00 am", "Mahabaleshwar temple & Panchganga temple", "Darshan"],
        ["10:30 am", "Arthur's Seat", "View near parking"],
        ["12:30 pm", "Lunch & rest at hotel", ""],
        ["4:00 pm", "Mapro Garden or strawberry farm", "Flat paths, tea"],
        ["5:30 pm", "Main market", "Chikki, honey; early dinner"]
      ]},
      { title: "Day 3: Mahabaleshwar → Panchgani villages → Wai", stops: [
        ["9:30 am", "Check-out", ""],
        ["10:00 am", "Kate's Point", "Road access"],
        ["11:15 am", "Bhilar Book Village", "Reading, seating"],
        ["12:30 pm", "Lunch, Panchgani", ""],
        ["2:00 pm", "Devrai Art Village", "Watch artisans at work, seated"],
        ["3:30 pm", "Table Land by car", "Pony cart, no long walk"],
        ["5:30 pm", "Drop in Wai", ""]
      ]}
    ],
    notes: ["Pratapgad, Wilson Point sunrise and Tapola are left out on purpose: steep steps, early starts and long drives."]
  },
  {
    id: "groups-3", group: "3day", category: "Groups", baseDays: 3,
    name: "Forts, Flying & Kayaks",
    summary: "A Pandavgad fort trek, Dhom water sports, paragliding and an adventure park, then Pratapgad Fort and kayaking at Tapola.",
    stay: "1 night Panchgani, 1 night Mahabaleshwar, shared rooms", walking: "High", bestFor: "Adventure groups",
    days: [
      { title: "Day 1: Pandavgad trek → Dhom → Panchgani", stops: [
        ["7:00 am", "Pandavgad Fort trek, Wai", "About 3 hrs up and down with a local guide"],
        ["11:00 am", "Menavali Ghat", ""],
        ["12:30 pm", "Lunch, Wai", ""],
        ["2:00 pm", "Dhom Dam", "Water sports where open"],
        ["4:30 pm", "Pasarni Ghat → Table Land", "Sunset"],
        ["7:00 pm", "Check-in, Panchgani", "Bonfire where allowed"]
      ]},
      { title: "Day 2: Paragliding & adventure park → Mahabaleshwar", stops: [
        ["8:00 am", "Harrison's Folly", "Paragliding, best winds in the morning (Oct–May)"],
        ["10:30 am", "Velocity Entertainmentz", "Zip line, ATV, rope course"],
        ["1:30 pm", "Lunch", ""],
        ["2:45 pm", "Mapro Garden", ""],
        ["4:00 pm", "Check-in, Mahabaleshwar", ""],
        ["5:00 pm", "Venna Lake", "Boating"],
        ["6:15 pm", "Bombay Point", "Sunset"]
      ]},
      { title: "Day 3: Pratapgad & Tapola → Wai", stops: [
        ["7:30 am", "Breakfast & check-out", ""],
        ["8:15 am", "Pratapgad Fort", ""],
        ["10:45 am", "Drive to Tapola", "About 1 hr 30 min via Mahabaleshwar"],
        ["12:15 pm", "Tapola", "Kayaking, lunch"],
        ["3:00 pm", "Lingmala Waterfall", ""],
        ["4:15 pm", "Kate's Point", ""],
        ["6:30 pm", "Drop in Wai", "A long day, so we leave Tapola on time"]
      ]}
    ]
  },

  /* ---------------- SPECIAL ---------------- */
  {
    id: "ancient-wai", group: "special", category: "Heritage", baseDays: 1,
    name: "Ancient Wai",
    summary: "A heritage trail through \"Dakshin Kashi\": the Krishna ghats and their temples, Peshwa-era Menavali, the Buddhist caves of Lohare and, on an optional second day, the source of the Krishna and Pratapgad Fort.",
    stay: "1 day, or 2 days with a night in Wai", walking: "Moderate", bestFor: "History and temple lovers",
    extra: "Local history guide included on Day 1",
    days: [
      { title: "Day 1: Ghats, Wada and Caves (Wai)", stops: [
        ["8:00 am", "Dholya (Maha) Ganpati & Kashi Vishweshwar", "Morning aarti, the stone Ganpati"],
        ["9:00 am", "Walk of the Wai ghats", "Ganpati Ali, Brahmanshahi (four temples), Ramdoh (Rameshwar, Ramkund), Gangapuri ghats"],
        ["10:45 am", "Menavali Ghat", "Vishnu and Meneshwar temples, the Vasai bell"],
        ["11:30 am", "Nana Phadnavis Wada", "Six courtyards, teak lattice, Modi lipi name souvenir (interiors usually open on weekends)"],
        ["1:00 pm", "Lunch", "Maharashtrian thali in Wai"],
        ["2:30 pm", "Wai Caves, Lohare", "Nine Buddhist caves, 7 km north"],
        ["4:00 pm", "Dhom Dam, Narsimha & Dhomeshwar temples", ""],
        ["5:30 pm", "Dhom backwaters", "Sunset"],
        ["6:30 pm", "Drop or night stay in Wai", ""]
      ]},
      { title: "Day 2 (optional): Source of the Krishna", stops: [
        ["7:30 am", "Drive Wai → Panchgani", "Via Pasarni Ghat"],
        ["8:30 am", "Rajpuri Caves", "Karthikeya temple, holy ponds"],
        ["10:00 am", "Old Mahabaleshwar", "Mahabaleshwar Shiva temple, Panchganga (source of the Krishna), Krishnabai, Atibaleshwar"],
        ["12:30 pm", "Lunch, Mahabaleshwar", ""],
        ["1:30 pm", "Wax Museum", "Short stop on the way"],
        ["2:45 pm", "Pratapgad Fort", "Bhavani temple, Afzal Khan's tomb area, fort walls"],
        ["5:00 pm", "Drive back", "About 1 hr 45 min"],
        ["7:00 pm", "Drop in Wai", ""]
      ]}
    ],
    notes: [
      "For trekkers: Pandavgad or Kamalgad fort can replace Pratapgad.",
      "During the Kalubai yatra (Jan–Feb), Mandhardev temple can replace the caves; expect large crowds.",
      "Add-on: half day at the Chhatrapati Shivaji Maharaj Museum in Satara.",
      "Included: guide (Day 1), Wada and museum tickets, Rajpuri and Pratapgad entry, temple parking. Not included: puja offerings, souvenirs, boating at Dhom."
    ]
  },
  {
    id: "scenic-hidden", group: "special", category: "Scenic", baseDays: 2,
    name: "Scenic & Hidden Places",
    summary: "Two days chasing light: misty river mornings, quiet backwaters, plateaus and caves, then the best sunrise and sunset edges of Mahabaleshwar, including points most tour cars skip.",
    stay: "1 night in Panchgani", walking: "Moderate to active", bestFor: "Photographers and nature lovers",
    extra: "Best Oct–Feb for clear views, Jul–Sep for waterfalls",
    days: [
      { title: "Day 1: Wai valley → Panchgani", stops: [
        ["6:30 am", "Menavali Ghat", "Mist on the Krishna, empty ghat, temple reflections"],
        ["8:00 am", "Dhom Dam viewpoint & Narsimha temple", "Morning light over the lake"],
        ["9:15 am", "Balkawadi backwaters drive", "Quiet village roads few tourists take"],
        ["10:00 am", "Borgaon waterfalls", "Four falls between the dams (monsoon only)"],
        ["12:00 pm", "Pasarni Ghat viewpoints", "The whole Wai valley from above"],
        ["1:00 pm", "Lunch, Panchgani", ""],
        ["2:30 pm", "Nagewadi Dam", "Hidden hill reservoir"],
        ["3:30 pm", "Rajpuri Caves", "Old caves and holy ponds"],
        ["4:45 pm", "Table Land edge & Devil's Kitchen", "Cliff-edge walk away from the crowd"],
        ["6:00 pm", "Table Land", "Sunset over the plateau"],
        ["7:00 pm", "Night stay, Panchgani", ""]
      ]},
      { title: "Day 2: Mahabaleshwar edges → Wai", stops: [
        ["6:00 am", "Kate's Point", "East-facing sunrise over Dhom and Balkawadi"],
        ["7:15 am", "Needle Hole & Elephant's Head", "The rock arch in early light"],
        ["8:30 am", "Breakfast, Mahabaleshwar", ""],
        ["9:30 am", "Connaught Peak", "Views of Panchgani, Pasarni and Pratapgad"],
        ["10:30 am", "Arthur's Seat, Window Point, Tiger Spring", "Sheer drop to the Savitri valley"],
        ["12:00 pm", "Savitri Point & Castle Rock", "Quieter edges near Arthur's Seat"],
        ["1:00 pm", "Lunch", ""],
        ["2:15 pm", "Chinaman's Falls & Lingmala Waterfall", ""],
        ["3:45 pm", "Lodwick Point & Elphinstone Point", "Forest walk, fewer crowds"],
        ["5:45 pm", "Bombay Point", "Sunset"],
        ["7:00 pm", "Dinner, then drive to Wai", "Drop around 8:45 pm, or add a night"]
      ]}
    ],
    notes: [
      "Your driver-guide may reorder the Mahabaleshwar points on the day depending on cloud cover; the stops stay the same.",
      "Included: all viewpoint and forest entry fees, parking. Not included: boating, camera tripod fees where charged."
    ]
  },
  /* ---------------- VILLA, DRIVER-ONLY & CUSTOM ---------------- */
  {
    id: "pool-villa", group: "other", category: "Villa", kind: "villa", baseDays: 1,
    name: "Pool Villa for Your Group",
    summary: "Just want a private villa with a swimming pool for your gang? A pool villa for 7–8 people at ₹9,999 a night, with pickup from Wai bus stand to the villa and drop back to Wai.",
    stay: "Private pool villa, up to 8 guests", walking: "None", bestFor: "Groups of 7–8 friends or family",
    points: [
      "A private villa with its own swimming pool, for up to 8 guests",
      "₹9,999 per night for the villa",
      "Pickup from Wai bus stand to the villa and drop back to Wai",
      "Add a photographer or drone shots if you like",
      "Villa house rules apply (quiet hours, pool timings, guest limit)"
    ]
  },
  {
    id: "driver-only", group: "other", category: "Driver", kind: "driver", baseDays: 1,
    name: "Driver for Your Car",
    summary: "Tired of driving, or new to ghat roads? We've got you covered. A local driver who knows the hills drives your own car, from just ₹1,999 a day.",
    stay: "No stay included", walking: "Your choice", bestFor: "Families and friends travelling in their own car",
    points: [
      "An experienced local driver for your own car, for as many days as you need",
      "₹1,999 per day, nothing more to pay for the driver",
      "No need to pay for his food, unless you choose to offer it",
      "Fuel, tolls and parking for your car are paid by you",
      "Add a photographer or drone shots if you like",
      "Your car needs valid RC, insurance and PUC papers"
    ]
  },
  {
    id: "custom", group: "other", category: "Custom", kind: "custom", baseDays: 2,
    name: "Build Your Own Trip",
    summary: "Want different places, more days, a special occasion or your own pace? Tell us what you have in mind and we'll plan the trip and send you a price.",
    stay: "As you choose", walking: "As you choose", bestFor: "Anyone with their own plan",
    points: [
      "Pick the places, days, hotel type and pace you want",
      "Add a photographer, drone shots or meals",
      "Birthdays, anniversaries, office outings and school trips welcome",
      "We reply with a plan and price, usually within a few hours"
    ]
  }
];

const GROUP_LABELS = { "2day": "2-day packages", "3day": "3-day packages", "special": "Special packages", "other": "Pool villa, driver-only & custom trips" };

/* Each package has its own page: trip-<id>.html */
const pkgPage = p => `trip-${p.id}.html`;

/* What every package includes / excludes (shown on each package page) */
function includesFor(p) {
  if (p.kind === "villa") return {
    yes: ["Private pool villa for up to 8 guests", "Pickup from Wai bus stand to the villa and drop back to Wai"],
    no: ["Food and drinks, unless arranged with the villa", "Sightseeing and activities", "Photographer, drone and other add-ons unless selected"]
  };
  if (p.kind === "driver") return {
    yes: ["An experienced local driver for your own car", "No food charges for the driver, unless you choose to offer it"],
    no: ["Fuel, tolls and parking for your car", "Hotel stay and entry tickets", "Add-ons unless selected"]
  };
  if (p.kind === "custom") return {
    yes: ["A trip planned around your places, days, pace and budget"],
    no: ["Price is sent to you after we plan the trip"]
  };
  const yes = [
    "AC car with an experienced local driver",
    "Fuel, tolls, parking and driver allowance",
    "Municipal tourist tax at Panchgani and Mahabaleshwar",
    "Entry tickets for viewpoints, temples and heritage sites on the itinerary"
  ];
  if (p.baseDays > 1) yes.splice(1, 0, `Budget hotel stay included (worth ${inr(PRICING.hotelsPerNight[PRICING.includedHotel])} per room per night); upgrade to 2–5 star if you like`);
  if (p.id === "ancient-wai") yes.push("Local history guide on Day 1");
  const no = ["Boating, rides, paragliding and amusement parks", "Meals, unless you choose them", "Photographer, drone" + (p.category === "Seniors" ? ", caretaker" : "") + " unless selected", "Camera fees, shopping and tips"];
  return { yes, no };
}

/* Price maths.
   o = { days, people, rooms, hotel, addons }
   - Packages: per-day cost for the group size × days (budget stay included),
     plus any hotel upgrade: (chosen rate − budget rate) × rooms × nights.
   - Villa: villa rate × nights (o.days = nights), plus transfer if set.
   - Driver only: driver rate × days.
   - Add-ons: per day, larger price from PRICING.addons.largeGroupFrom people. */
function tierRate(people) {
  const t = PRICING.packageTiers.find(t => people <= t.upTo);
  return t ? t.perDay : null;
}
function addonRate(key, people) {
  const a = PRICING.addons[key];
  return people >= PRICING.addons.largeGroupFrom ? a.perDayLarge : a.perDay;
}
function addonsFor(p) {
  return Object.keys(PRICING.addons).filter(k => k !== "largeGroupFrom" && (!PRICING.addons[k].onlyFor || PRICING.addons[k].onlyFor.includes(p.id)));
}
function hotelUpgrade(hotel) {
  const r = PRICING.hotelsPerNight[hotel], base = PRICING.hotelsPerNight[PRICING.includedHotel];
  return r ? Math.max(0, r - base) : 0;
}
function calcPrice(p, o) {
  if (!p || p.kind === "custom") return null;
  const days = Math.max(1, parseInt(o.days, 10) || p.baseDays || 1);
  const people = Math.max(1, parseInt(o.people, 10) || 2);
  const s = (n, w) => `${n} ${w}${n > 1 ? "s" : ""}`;
  const lines = [], notes = [];
  if (p.kind === "villa") {
    if (people > PRICING.villa.maxGuests) return { error: `The pool villa takes up to ${PRICING.villa.maxGuests} guests. Choose "Build Your Own Trip" for bigger groups.` };
    lines.push([`Pool villa: ${s(days, "night")} × ${inr(PRICING.villa.perNight)}`, PRICING.villa.perNight * days]);
    if (PRICING.villa.transfer > 0) lines.push(["Wai stand pickup and drop", PRICING.villa.transfer]);
    else notes.push("Pickup from Wai bus stand and drop back to Wai included.");
  } else if (p.kind === "driver") {
    lines.push([`Driver: ${s(days, "day")} × ${inr(PRICING.driverOnlyPerDay)}`, PRICING.driverOnlyPerDay * days]);
  } else {
    if (people > PRICING.maxPeople) return { error: `Packages are for up to ${PRICING.maxPeople} people. For bigger groups, choose "Build Your Own Trip".` };
    const rate = tierRate(people), nights = days - 1;
    lines.push([`Package for ${people} ${people > 1 ? "people" : "person"}: ${s(days, "day")} × ${inr(rate)}`, rate * days]);
    if (nights > 0 && o.hotel !== "none") {
      const rooms = Math.max(1, parseInt(o.rooms, 10) || Math.ceil(people / 2));
      const up = hotelUpgrade(o.hotel);
      if (up > 0) lines.push([`${o.hotel} upgrade: ${s(rooms, "room")} × ${s(nights, "night")} × ${inr(up)}`, up * rooms * nights]);
      else notes.push(`Budget hotel stay included: ${s(rooms, "room")} for ${s(nights, "night")}.`);
      const extra = people - rooms * 2;
      if (extra > 0) notes.push(`${s(extra, "guest")} will share a room as a 3rd person. This depends on the hotel, and its extra-bed charge is added when we confirm.`);
    }
    if (people === 1) notes.push("Solo travellers pay the 2-person price, as the car, driver and room are the same.");
  }
  (o.addons || []).forEach(k => {
    const a = PRICING.addons[k]; if (!a) return;
    const r = addonRate(k, people);
    lines.push([`${a.label}: ${s(days, "day")} × ${inr(r)}`, r * days]);
  });
  return { days, lines, notes, total: lines.reduce((t, l) => t + l[1], 0) };
}
function fromPrice(p) {
  if (p.kind === "custom") return "Price on request";
  if (p.kind === "driver") return `${inr(PRICING.driverOnlyPerDay)} / day`;
  if (p.kind === "villa") return `${inr(PRICING.villa.perNight)} / night, up to ${PRICING.villa.maxGuests} guests`;
  const r = calcPrice(p, { days: p.baseDays, people: 2, rooms: 1, hotel: PRICING.includedHotel, addons: [] });
  return `From ${inr(r.total)} for 2 people` + (p.baseDays > 1 ? ", stay included" : "");
}
function pkgLabel(p) {
  if (p.kind) return p.name;
  const len = p.group === "2day" ? "2-day" : p.group === "3day" ? "3-day" : (p.id === "ancient-wai" ? "1–2 days" : "2-day");
  return `${p.name} (${p.category}, ${len})`;
}

/* Shared page behaviour: menu, year, contact details */
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn"), nav = document.getElementById("nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false);
    }));
  }
  document.querySelectorAll(".yr").forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll("[data-email]").forEach(el => { el.href = "mailto:" + SITE.email; if (!el.hasAttribute("data-keep")) el.textContent = SITE.email; });
  document.querySelectorAll("[data-phone]").forEach(el => { el.href = "tel:" + SITE.phoneLink; el.textContent = SITE.phoneDisplay; });
  document.querySelectorAll("[data-wa]").forEach(el => el.href = "https://wa.me/" + SITE.whatsapp);
  document.querySelectorAll("[data-insta]").forEach(el => { el.href = "https://instagram.com/" + SITE.instagram; if (!el.hasAttribute("data-keep")) el.textContent = "@" + SITE.instagram; });
});
