/* Renders a package page. Each trip-*.html sets <body data-pkg="id">. */
document.addEventListener("DOMContentLoaded", () => {
  const id = document.body.dataset.pkg;
  const p = PACKAGES.find(x => x.id === id);
  const root = document.getElementById("pkgRoot");
  if (!p) { root.innerHTML = '<div class="wrap"><p>Package not found. <a href="packages.html">See all packages</a>.</p></div>'; return; }
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  document.title = `${p.name} | Visit Wai`;

  const who = p.group === "other" ? ({ villa: "Pool villa", driver: "Driver only", custom: "Custom trip" }[p.kind])
    : p.group === "special" ? "Special package" : `${p.group === "2day" ? "2-day" : "3-day"} package for ${p.category.toLowerCase()}`;
  const inc = includesFor(p);
  const days = (p.days || []).map(d => `
    <h4 class="day-title">${esc(d.title)}</h4>
    <div class="table-wrap"><table class="day-table">
      <thead><tr><th>Time</th><th>Stop</th><th>What to do</th></tr></thead>
      <tbody>${d.stops.map(s => `<tr><td class="time">${esc(s[0])}</td><td><b>${esc(s[1])}</b></td><td>${esc(s[2])}</td></tr>`).join("")}</tbody>
    </table></div>`).join("");
  const points = p.points ? `<ul class="itin-points">${p.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "";
  const notes = (p.notes || []).map(n => `<p class="note">${esc(n)}</p>`).join("");
  const others = PACKAGES.filter(x => x.id !== p.id).map(x => `<a class="chip" href="${pkgPage(x)}">${esc(x.name)}</a>`).join("");

  root.innerHTML = `
  <section class="hero page-hero">
    <div class="wrap">
      <span class="who-hero">${esc(who)}</span>
      <h1>${esc(p.name)}</h1>
      <p>${esc(p.summary)}</p>
      <p class="hero-price">${esc(fromPrice(p))}</p>
      <div class="actions"><a class="btn" href="#book">${p.kind === "custom" ? "Get a quote" : "Book now"}</a>${days ? '<a class="btn ghost" href="#plan">See the plan</a>' : ""}</div>
    </div>
  </section>
  <section style="padding:3rem 0 2rem">
    <div class="wrap">
      <div class="meta">
        <div><span>Best for</span> <b>${esc(p.bestFor)}</b></div>
        <div><span>Stay</span> <b>${esc(p.stay)}</b></div>
        <div><span>Walking</span> <b>${esc(p.walking)}</b></div>
        ${p.extra ? `<div><b>${esc(p.extra)}</b></div>` : ""}
      </div>
      ${p.cardNote ? `<p class="note">${esc(p.cardNote)}</p>` : ""}
      <h2 style="margin-top:2rem">What's included</h2>
      <div class="incl">
        <div class="in"><h3>Included</h3><ul>${inc.yes.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div class="out"><h3>Not included</h3><ul>${inc.no.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      </div>
      ${points ? `<h2 style="margin-top:2.5rem">How it works</h2>${points}` : ""}
      ${days ? `<h2 id="plan" style="margin-top:2.5rem">The plan</h2><p class="small">Timings are approximate and adjust to traffic, weather and your pace.</p>${days}` : ""}
      ${notes}
    </div>
  </section>
  <section id="book" class="alt">
    <div class="wrap">
      <h2>${p.kind === "custom" ? "Ask for a quote" : "Book this trip"}</h2>
      <p class="lede">Choose your dates, group and add-ons. Your price updates as you go. We'll call you to confirm availability and payment.</p>
      <div id="bookHost"></div>
    </div>
  </section>
  <section style="padding:3rem 0">
    <div class="wrap">
      <h3 class="group-title">Other trips</h3>
      <div class="filters">${others}</div>
    </div>
  </section>`;
  mountBooking(document.getElementById("bookHost"), p);
  if (location.hash) { const t = document.querySelector(location.hash); if (t) setTimeout(() => t.scrollIntoView(), 60); }
});
