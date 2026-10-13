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
  <section class="hero page-hero pkg-hero">
    <div class="hero-photo" aria-hidden="true"></div>
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
      <div class="gallery-wrap" hidden>
        <h2 style="margin-top:2.5rem">Photos</h2>
        <div class="gallery"></div>
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

  /* ---- photos ---- */
  const list = PHOTOS[p.id] || [];
  const hero = root.querySelector(".pkg-hero"), heroBox = root.querySelector(".hero-photo");
  hero.style.backgroundImage = `linear-gradient(90deg,rgba(8,19,24,.94) 0%,rgba(8,19,24,.6) 42%,rgba(8,19,24,0) 75%), url(${sceneFor(p.id)})`;
  if (list[0]) {
    const img = photoImg(list[0], "");
    img.loading = "eager";
    img.onload = () => { heroBox.appendChild(img); hero.classList.add("has-photo"); };
  }
  const gw = root.querySelector(".gallery-wrap"), gal = root.querySelector(".gallery");
  const shown = [];
  list.forEach((ph, i) => {
    const fig = document.createElement("figure");
    fig.className = "g-item" + (i === 0 ? " wide" : "");
    const img = photoImg(ph, "");
    img.onload = () => {
      fig.appendChild(img);
      const cap = document.createElement("figcaption");
      cap.textContent = ph.caption + (ph.credit ? ` · ${ph.credit}` : "");
      fig.appendChild(cap);
      if (ph.drone) { const b = document.createElement("span"); b.className = "badge"; b.textContent = "Drone shot"; fig.appendChild(b); }
      if (ph.ai) { const b = document.createElement("span"); b.className = "badge ai"; b.textContent = "AI illustration"; fig.appendChild(b); }
      fig.tabIndex = 0; fig.setAttribute("role", "button"); fig.setAttribute("aria-label", "View photo: " + ph.caption);
      fig.addEventListener("click", () => openViewer(ph));
      fig.addEventListener("keydown", e => { if (e.key === "Enter") openViewer(ph); });
      // keep the planned order even though images load at different times
      fig.style.order = i;
      gal.appendChild(fig); shown.push(ph); gw.hidden = false;
    };
  });
  function openViewer(ph) {
    const v = document.createElement("div");
    v.className = "viewer"; v.setAttribute("role", "dialog"); v.setAttribute("aria-label", ph.caption);
    v.innerHTML = `<button class="viewer-close" aria-label="Close">✕</button><img alt=""><p></p>`;
    v.querySelector("img").src = ph.file; v.querySelector("img").alt = ph.alt;
    v.querySelector("p").textContent = ph.caption + (ph.ai ? " (AI illustration)" : "") + (ph.credit ? ` · ${ph.credit}` : "");
    const close = () => v.remove();
    v.addEventListener("click", e => { if (e.target === v || e.target.classList.contains("viewer-close")) close(); });
    document.addEventListener("keydown", function esc(e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc); } });
    document.body.appendChild(v); v.querySelector(".viewer-close").focus();
  }
  if (location.hash) { const t = document.querySelector(location.hash); if (t) setTimeout(() => t.scrollIntoView(), 60); }
});
