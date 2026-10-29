/* widowsguide.org: buy buttons, the "how long has it been?" picker, and measurement. */
(function () {
  var books = (typeof BOOKS !== "undefined") ? BOOKS : [];
  function track(kind) {
    if (typeof gtag !== "function") return;
    gtag("event", kind === "amazon" ? "click_amazon" : kind === "download" ? "checklist_download" : "sign_up");
    var label = window.WG_LABELS && window.WG_LABELS[kind];
    if (window.WG_ADS && label) gtag("event", "conversion", { send_to: window.WG_ADS + "/" + label });
  }

  function formats(b) {
    var f = [["Kindle", b.amazon], ["Paperback", b.paperback], ["Hardcover", b.hardcover]].filter(function (x) { return x[1]; });
    if (f.length < 2) return '<p class="fine">Kindle, paperback and hardcover.</p>';
    return '<p class="fine formats">Also as: ' + f.map(function (x) {
      return '<a href="' + x[1] + '" rel="noopener" data-track="amazon">' + x[0] + '</a>'; }).join(' · ') + '</p>';
  }

  // Buy buttons: Amazon when the link is in books.js, otherwise "tell me".
  document.querySelectorAll("[data-buy]").forEach(function (el) {
    var b = books[+el.dataset.buy - 1]; if (!b) return;
    var big = el.dataset.big === "1" ? " big" : "";
    var title = b.title.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    if (b.amazon) {
      el.innerHTML = '<a class="btn' + big + '" href="' + b.amazon + '" rel="noopener" data-track="amazon">Buy ' +
        title + ' on Amazon</a>' + formats(b);
    } else {
      el.innerHTML = '<a class="btn' + big + '" href="#notify">Tell me when it’s out</a>' +
        '<p class="fine">' + title + ' is not out yet. Leave your email below for a note when it is.</p>';
    }
  });

  document.addEventListener("click", function (ev) {
    var a = ev.target.closest && ev.target.closest("[data-track]");
    if (a) track(a.dataset.track);
  });
  if (window.WG_THANKS) track("signup");

  // "How long has it been?"
  var advice = document.getElementById("advice");
  var buttons = document.querySelectorAll(".when button");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (x) { x.setAttribute("aria-pressed", String(x === btn)); });
      var w = WHEN[+btn.dataset.when];
      document.querySelectorAll(".card").forEach(function (c) { c.classList.remove("is-start", "is-also"); });
      var s = document.getElementById("book-" + w.start); if (s) s.classList.add("is-start");
      w.also.forEach(function (n) { var c = document.getElementById("book-" + n); if (c) c.classList.add("is-also"); });
      var t = function (n) { return books[n - 1].title + " (Book " + n + ")"; };
      advice.innerHTML = "";
      advice.appendChild(document.createTextNode("Start with "));
      var link = document.createElement("a"); link.href = books[w.start - 1].url; link.textContent = t(w.start);
      advice.appendChild(link);
      advice.appendChild(document.createTextNode(". " + (w.also.length ? "After that, " + w.also.map(t).join(" and ") + " may help." : "")));
      advice.hidden = false;
      if (s) s.scrollIntoView({ block: "nearest" });
    });
  });

  // Arriving at a book page with #ch-N: open that chapter's answer.
  var ch = location.hash.match(/^#ch-(\d+)$/);
  if (ch) { var d = document.getElementById("ch-" + ch[1]); if (d) { d.open = true; d.scrollIntoView(); } }

  // Arriving at /books/#book-N: mark that book.
  var m = location.hash.match(/^#book-(\d)$/);
  if (m) { var c = document.getElementById("book-" + m[1]); if (c) c.classList.add("is-next"); }

  // Letters: fill in once, then copy or print. Values live in sessionStorage, in this tab only.
  var fill = document.getElementById("fill");
  if (fill) {
    var KEY = "wg-letter", saved = {};
    try { saved = JSON.parse(sessionStorage.getItem(KEY) || "{}"); } catch (e) {}
    var fields = fill.querySelectorAll("[name]");
    var apply = function () {
      var v = {};
      fields.forEach(function (el) {
        if (el.type === "radio") { if (el.checked) v[el.name] = el.value; } else { v[el.name] = el.value.trim(); }
      });
      try { sessionStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
      v.today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
      document.querySelectorAll(".letter [data-f]").forEach(function (sp) {
        if (!sp.dataset.ph) sp.dataset.ph = sp.textContent;
        var t = v[sp.dataset.f];
        sp.textContent = t || sp.dataset.ph;
        sp.classList.toggle("on", !!t);
      });
    };
    fields.forEach(function (el) {
      if (saved[el.name] != null) { if (el.type === "radio") el.checked = el.value === saved[el.name]; else el.value = saved[el.name]; }
      el.addEventListener("input", apply);
      el.addEventListener("change", apply);
    });
    apply();
  }
  var status = document.getElementById("letter-status");
  document.querySelectorAll("[data-letter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.dataset.letter === "print") { window.print(); return; }
      var copy = document.getElementById("letter").cloneNode(true);
      copy.querySelectorAll("li").forEach(function (li) { li.insertBefore(document.createTextNode("\u2022 "), li.firstChild); });
      copy.style.cssText = "position:absolute;left:-9999px;white-space:normal";
      document.body.appendChild(copy);
      var text = copy.innerText.replace(/\n{3,}/g, "\n\n").trim();
      copy.remove();
      var done = function () { if (status) status.textContent = "Copied. Paste it into an email or a document."; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { if (status) status.textContent = "Copying didn’t work here. Select the letter and copy it instead."; });
      }
    });
  });
})();
