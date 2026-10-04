/* =====================================================================
   VISIT WAI — booking form + live price panel used on every package page.
   Prices come from PRICING in data.js. Bookings go to the Google Form
   (if set up in data.js) and/or by email through FormSubmit.
   ===================================================================== */
function mountBooking(host, p) {
  const isPkg = !p.kind, isVilla = p.kind === "villa", isDriver = p.kind === "driver", isCustom = p.kind === "custom";
  const base = PRICING.hotelsPerNight[PRICING.includedHotel];
  const addons = addonsFor(p);
  const big = PRICING.addons.largeGroupFrom;
  const minDays = isPkg && p.id !== "ancient-wai" ? p.baseDays : 1;

  host.innerHTML = `
  <div class="book-grid">
    <form class="book-form" novalidate>
      <h3>Your trip details</h3>
      <div class="row">
        <label>Travel date<input name="date" type="date"></label>
        <label>${isVilla ? "Number of nights" : "Number of days"}<input name="days" type="number" min="${minDays}" max="15" value="${p.baseDays}"></label>
      </div>
      <div class="row">
        <label>${isVilla ? "Guests" : "People"} (adults and children 5+)<input name="people" type="number" min="1" max="${isVilla ? PRICING.villa.maxGuests : PRICING.maxPeople}" value="${isVilla ? PRICING.villa.maxGuests : 2}"></label>
        <label>Children under ${PRICING.children.freeUnderAge} (free, max ${PRICING.children.maxFree})<input name="kids" type="number" min="0" max="${PRICING.children.maxFree}" value="0"></label>
      </div>
      ${isPkg || isCustom ? `
      <div class="row hotel-row">
        <label>Hotel
          <select name="hotel">
            ${Object.keys(PRICING.hotelsPerNight).map(k => {
              const up = hotelUpgrade(k);
              return `<option value="${k}">${k === PRICING.includedHotel ? `${k} (included)` : isCustom ? k : `${k} (+${inr(up)} per room per night)`}</option>`;
            }).join("")}
            <option value="none">No hotel needed (I have my own stay)</option>
          </select>
        </label>
        <label class="rooms-wrap">Rooms<input name="rooms" type="number" min="1" max="20" value="1"></label>
      </div>` : ""}
      ${addons.length ? `<fieldset class="addons"><legend>Add-ons</legend>
        ${addons.map(k => {
          const a = PRICING.addons[k];
          const price = a.perDay === a.perDayLarge ? `${inr(a.perDay)} a day` : `${inr(a.perDay)} a day (${inr(a.perDayLarge)} for ${big}+ people)`;
          return `<label class="check-terms"><input type="checkbox" name="addon" value="${k}"><span>${a.label}: ${price}</span></label>`;
        }).join("")}
      </fieldset>` : ""}
      ${isPkg || isCustom ? `<label>Food preference
        <select name="food">
          <option>No meals, we'll manage</option>
          <option>Veg meals</option>
          <option>Non-veg meals</option>
          <option>Jain meals</option>
          <option>Senior-friendly meals</option>
        </select></label>` : ""}
      <label>${isCustom ? "Tell us about your trip" : isDriver ? "Pickup point and where you want to go" : "Anything we should know?"}
        <textarea name="notes" placeholder="${isCustom ? "Places, pace, special occasion, budget…" : "Pickup point, medical needs, special occasion…"}"></textarea></label>
      <h3>Your details</h3>
      <div class="row">
        <label>Your name<input name="name" required autocomplete="name"></label>
        <label>Phone<input name="phone" type="tel" required autocomplete="tel"></label>
      </div>
      <label>Email (optional)<input name="email" type="email" autocomplete="email"></label>
      <label class="check-terms"><input type="checkbox" name="terms" required>
        <span>I have read and accept the <a href="terms.html" target="_blank" rel="noopener">Terms &amp; Conditions, Code of Conduct and Cancellation Policy</a>.</span></label>
      <button type="submit" class="btn">${isCustom ? "Send for a quote" : "Book now"}</button>
      <p class="form-msg" role="status"></p>
    </form>
    <aside class="price-panel" aria-live="polite">
      <div class="price-box">
        <h3>${isCustom ? "Custom trip" : "Your price"}</h3>
        <div class="pp-lines"></div>
        <p class="total">Total <b class="pp-total"></b></p>
        <div class="box-notes"></div>
      </div>
    </aside>
  </div>
  <div class="price-bar" aria-hidden="true">
    <button type="button" class="pb-toggle"><span>Total</span> <b class="pb-total"></b> <span class="pb-hint">See breakdown</span></button>
  </div>`;

  const f = host.querySelector("form");
  const panel = host.querySelector(".price-panel");
  const bar = host.querySelector(".price-bar");
  const num = (el, d) => { const n = parseInt(el && el.value, 10); return isNaN(n) ? d : n; };
  const clamp = (n, a, b) => Math.min(Math.max(n, a), b);

  function setRooms() {
    if (!f.rooms) return;
    const people = clamp(num(f.people, 2), 1, 20);
    f.rooms.min = Math.max(1, Math.ceil(people / 3));
    f.rooms.max = people;
    f.rooms.value = Math.ceil(people / 2);
  }
  function opts() {
    return {
      days: Math.max(num(f.days, p.baseDays), minDays),
      people: clamp(num(f.people, 2), 1, 99),
      rooms: f.rooms ? clamp(num(f.rooms, 1), 1, 99) : 1,
      hotel: f.hotel ? f.hotel.value : "none",
      addons: [...f.querySelectorAll("input[name=addon]:checked")].map(i => i.value)
    };
  }
  function update() {
    const o = opts();
    if (num(f.kids, 0) > PRICING.children.maxFree) f.kids.value = PRICING.children.maxFree;
    const nights = isPkg ? o.days - 1 : 0;
    const rw = host.querySelector(".rooms-wrap");
    if (rw) rw.hidden = isCustom || o.hotel === "none" || nights < 1;
    const linesEl = panel.querySelector(".pp-lines"), notesEl = panel.querySelector(".box-notes");
    const totalEls = [panel.querySelector(".pp-total"), bar.querySelector(".pb-total")];
    linesEl.innerHTML = ""; notesEl.innerHTML = "";
    const note = t => { const el = document.createElement("p"); el.className = "small"; el.textContent = t; notesEl.appendChild(el); };

    if (isCustom) {
      totalEls.forEach(el => el.textContent = "On request");
      note("Tell us your plan and we'll send you a price, usually within a few hours.");
      if (o.addons.length) note("Add-ons chosen: " + o.addons.map(k => PRICING.addons[k].label).join(", "));
      return;
    }
    const r = calcPrice(p, o);
    if (r.error) { totalEls.forEach(el => el.textContent = "–"); note(r.error); return; }
    const t = document.createElement("table"); t.className = "mini";
    r.lines.forEach(l => { const tr = t.insertRow(); tr.insertCell().textContent = l[0]; tr.insertCell().textContent = inr(l[1]); });
    linesEl.appendChild(t);
    totalEls.forEach(el => el.textContent = inr(r.total));
    r.notes.forEach(note);
    if (isPkg && o.days === 1) note("1-day trip: no hotel stay.");
    if (num(f.kids, 0) > 0) note(`${num(f.kids, 0)} child${num(f.kids, 0) > 1 ? "ren" : ""} under ${PRICING.children.freeUnderAge}: free.`);
  }

  f.people.addEventListener("input", () => { setRooms(); update(); });
  f.addEventListener("input", e => { if (e.target !== f.people) update(); });
  f.addEventListener("change", update);
  bar.querySelector(".pb-toggle").addEventListener("click", () => panel.classList.toggle("open"));
  panel.addEventListener("click", e => { if (e.target === panel) panel.classList.remove("open"); });
  setRooms(); update();

  // Show the phone price bar only while the booking form is on screen
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(es => es.forEach(en => bar.classList.toggle("show", en.isIntersecting)), { threshold: 0 }).observe(f);
  }

  f.addEventListener("submit", async e => {
    e.preventDefault();
    const msg = f.querySelector(".form-msg"), btn = f.querySelector("button[type=submit]");
    if (!f.name.value.trim() || !f.phone.value.trim()) { msg.textContent = "Add your name and phone number so we can reach you."; return; }
    if (isCustom && !f.notes.value.trim()) { msg.textContent = "Tell us a little about the trip you want."; f.notes.focus(); return; }
    if (!f.terms.checked) { msg.textContent = "Please tick the box to accept the Terms & Conditions before booking."; f.terms.focus(); return; }
    const o = opts(), r = calcPrice(p, o);
    if (r && r.error) { msg.textContent = r.error; return; }
    const unit = isVilla ? "night" : "day";
    const v = {
      name: f.name.value.trim(), phone: f.phone.value.trim(), email: f.email.value.trim() || "Not given",
      package: pkgLabel(p), date: f.date.value || "Not decided", days: `${o.days} ${unit}${o.days > 1 ? "s" : ""}`,
      people: String(o.people), children: String(num(f.kids, 0)),
      hotel: isPkg || isCustom ? (o.hotel === "none" ? "No hotel needed" : o.hotel) : "Not applicable",
      rooms: isPkg && o.hotel !== "none" && o.days > 1 ? String(o.rooms) : "-",
      addons: o.addons.map(k => PRICING.addons[k].label).join(", ") || "None",
      food: f.food ? f.food.value : "-",
      total: r ? inr(r.total) : "Quote needed",
      breakdown: r ? r.lines.map(l => `${l[0]} = ${inr(l[1])}`).concat(r.notes).join(" | ") : "Custom trip",
      notes: f.notes.value.trim() || "-", terms: "Yes"
    };
    btn.disabled = true; msg.textContent = "Sending your booking…";
    let ok = false;
    try {
      const gf = GOOGLE_FORM, useGF = gf.formId && Object.values(gf.fields).every(Boolean);
      if (useGF) {
        const body = new URLSearchParams();
        Object.entries(gf.fields).forEach(([k, entry]) => body.append(entry, v[k]));
        await fetch(`https://docs.google.com/forms/d/e/${gf.formId}/formResponse`, { method: "POST", mode: "no-cors", body });
        ok = true;
      }
      if (!useGF || gf.alsoEmail) {
        const res = await fetch("https://formsubmit.co/ajax/" + SITE.email, {
          method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            _subject: `New booking: ${p.name} (${v.days}, ${v.people} ${o.people > 1 ? "people" : "person"})`,
            _template: "table", _captcha: "false",
            Name: v.name, Phone: v.phone, Email: v.email, Package: v.package, "Travel date": v.date,
            [isVilla ? "Nights" : "Days"]: v.days, People: v.people, "Children under 5": v.children,
            Hotel: v.hotel, Rooms: v.rooms, "Add-ons": v.addons, Food: v.food,
            Total: v.total, "Price breakdown": v.breakdown, Notes: v.notes, "Terms accepted": v.terms
          })
        });
        if (res.ok) ok = true; else if (!ok) throw new Error("send failed");
      }
      f.reset(); setRooms(); update();
      msg.innerHTML = 'Booking sent! We\'ll call you soon to confirm. <a class="wa-after" href="#">Also message us on WhatsApp</a>';
      msg.querySelector(".wa-after").href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hi Visit Wai, I just booked ${v.package} for ${v.date}. My name is ${v.name}.`)}`;
    } catch (err) {
      if (!ok) {
        const text = Object.entries(v).map(([k, x]) => `${k}: ${x}`).join("\n");
        location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("New booking: " + p.name)}&body=${encodeURIComponent(text)}`;
        msg.textContent = "We couldn't send it automatically, so your email app is opening with the booking filled in. Please press send there.";
      }
    } finally { btn.disabled = false; }
  });
}
