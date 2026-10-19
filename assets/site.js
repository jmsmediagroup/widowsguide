/* widowsguide.org: buy buttons, the "how long has it been?" picker, and measurement. */
(function () {
  var books = (typeof BOOKS !== "undefined") ? BOOKS : [];
  function track(kind) {
    if (typeof gtag !== "function") return;
    gtag("event", kind === "amazon" ? "click_amazon" : kind === "download" ? "file_download" : "sign_up");
    var label = window.WG_LABELS && window.WG_LABELS[kind];
    if (window.WG_ADS && label) gtag("event", "conversion", { send_to: window.WG_ADS + "/" + label });
  }

  // Buy buttons: Amazon when the link is in books.js, otherwise "tell me".
  document.querySelectorAll("[data-buy]").forEach(function (el) {
    var b = books[+el.dataset.buy - 1]; if (!b) return;
    var big = el.dataset.big === "1" ? " big" : "";
    var title = b.title.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    if (b.amazon) {
      el.innerHTML = '<a class="btn' + big + '" href="' + b.amazon + '" rel="noopener" data-track="amazon">Buy ' +
        title + ' on Amazon</a><p class="fine">Kindle, paperback and hardcover.</p>';
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

  // Arriving at /books/#book-N: mark that book.
  var m = location.hash.match(/^#book-(\d)$/);
  if (m) { var c = document.getElementById("book-" + m[1]); if (c) c.classList.add("is-next"); }
})();
