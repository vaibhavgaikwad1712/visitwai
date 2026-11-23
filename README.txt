visitwai.in – price update (hotel add-ons +1000, villa offer)

FILES
- data.js    : new prices (replace the old data.js in the site root)
- booking.js : per-day photographer/drone checkboxes (same as last update)
- data-js-changes.patch.txt : only the lines that changed in data.js

WHAT CHANGED
1. Basic package stays the same (from Rs 5,500 per person per day).
2. Hotel upgrades, per room per night:
   2 star  Rs 1,500 -> Rs 2,500   (shown as +Rs 1,500 over Budget)
   3 star  Rs 3,000 -> Rs 4,000   (+Rs 3,000)
   4 star  Rs 5,000 -> Rs 6,000   (+Rs 5,000)
   5 star  Rs 10,000 -> Rs 11,000 (+Rs 10,000)
   Budget stays Rs 1,000 (included).
3. Pool villa: regular Rs 10,999/night, "Launch offer" Rs 1,000 off = Rs 9,999/night.
   Price cards show the old price struck through. The booking panel shows
   the regular line plus "Launch offer: Rs 1,000 off per night".

OFFER END DATE
In data.js, find:   offerEnds: "2027-01-31"
Change the date to extend or end the offer. After that date the site
automatically shows Rs 10,999 with no discount.

IMPORTANT
This data.js is built from the older copy I have. If your live data.js has
newer edits (for example an OFFER section), do NOT replace the whole file.
Open data-js-changes.patch.txt and copy only the changed lines
(lines starting with + replace lines starting with -).
