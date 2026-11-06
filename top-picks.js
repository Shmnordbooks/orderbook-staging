/* ═══════════════════════════════════════════════════════════════════════
   TOP PICKS — "Most requested" strip under the category video
   ───────────────────────────────────────────────────────────────────────
   Load on hardgoods.html AFTER the main script and shared-cart.js:

       <script src="top-picks.js"></script>

   To switch it off, remove that line. Nothing else depends on it.

   Adding a group: add an entry to TOP_PICKS below, keyed by the CATALOG
   group name (same key as CATEGORY_VIDEOS), with 3-6 item codes.

   Rules
   - Stock is read live from allItems, so the daily stock update applies.
   - Unavailable or missing codes are skipped; fewer than 3 valid picks
     hides the strip for that group.
   - Add uses the page's own setQty(), so the cart, N/A guard and
     shared cart behave exactly like the table rows below.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.__topPicks) return;
  window.__topPicks = true;

  var MIN_PICKS = 3;

  /* Picks chosen from public best-seller rankings and reviews
     (Galaxus, Bikable, eBay, buyer guides; checked 6 Nov 2026),
     limited to items that exist in this catalog. */
  window.TOP_PICKS = window.TOP_PICKS || {
    'Bottom Bracket': {
      title: 'Top Picks',
      sub: 'Most requested bottom brackets',
      picks: [
        { code: 'ISMBBR60B',  model: 'SM-BBR60', tag: 'Road',        spec: 'Ultegra · BSA 68mm · Hollowtech II 24mm' },
        { code: 'IBBMT801B',  model: 'BB-MT801', tag: 'MTB',         spec: 'BSA 68/73mm · Hollowtech II 24mm' },
        { code: 'EBBMT501B',  model: 'BB-MT501', tag: 'MTB',         spec: 'BSA 68/73mm · Hollowtech II 24mm' },
        { code: 'EBBRS501B',  model: 'BB-RS501', tag: 'Road + MTB',  spec: 'BSA threaded · Hollowtech II 24mm' },
        { code: 'EBBUN300B23X', model: 'BB-UN300', tag: 'City / Trekking', spec: 'BSA 122.5/68mm · Square taper' },
        { code: 'EBBES300B13', model: 'BB-ES300', tag: 'Octalink',   spec: 'BSA 68/113mm · Octalink' }
      ]
    }
  };

  var css =
    '.tp-wrap{margin:-6px 0 18px 0}' +
    '.tp-head{display:flex;align-items:baseline;gap:10px;margin:0 0 8px 2px}' +
    '.tp-title{font-family:"Barlow Condensed",Arial,sans-serif;font-weight:700;font-size:18px;letter-spacing:.1em;text-transform:uppercase;color:var(--text,#fff)}' +
    '.tp-title i{font-style:normal;color:#0082CA}' +
    '.tp-sub{font-size:12px;color:var(--text2,#9aa);letter-spacing:.03em}' +
    '.tp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}' +
    '.tp-card{position:relative;display:flex;flex-direction:column;gap:6px;padding:12px 12px 10px;' +
      'background:var(--surface,#111118);border:1px solid var(--border,#1e1e2e);border-radius:10px;' +
      'box-shadow:inset 0 2px 0 #0082CA}' +
    '.tp-tag{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#0082CA}' +
    '.tp-model{font-family:"Barlow Condensed",Arial,sans-serif;font-weight:700;font-size:20px;line-height:1.05;color:var(--text,#fff)}' +
    '.tp-spec{font-size:12px;line-height:1.35;color:var(--text2,#9aa);min-height:32px}' +
    '.tp-code{font-size:11px;color:var(--text3,#6b7280);letter-spacing:.04em}' +
    '.tp-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:auto;padding-top:4px}' +
    '.tp-st{font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase}' +
    '.tp-st.av{color:#00c896}.tp-st.etd{color:#f5a623}' +
    '.tp-add{display:flex;align-items:center;gap:6px}' +
    '.tp-qty{width:52px;padding:6px 4px;text-align:center;background:var(--surface,#111118);color:var(--text,#fff);' +
      'border:1px solid var(--border,#1e1e2e);border-radius:6px;font-family:"Barlow Condensed",sans-serif;font-size:14px;font-weight:600}' +
    '.tp-btn{padding:7px 12px;border:0;border-radius:6px;background:#0082CA;color:#fff;cursor:pointer;' +
      'font-family:"Barlow Condensed",Arial,sans-serif;font-weight:700;font-size:14px;letter-spacing:.06em;text-transform:uppercase}' +
    '.tp-btn:hover{background:#0a94e0}' +
    '@media(max-width:900px){.tp-grid{grid-template-columns:repeat(2,1fr);gap:8px}.tp-model{font-size:18px}.tp-spec{min-height:0}' +
      '.tp-foot{flex-wrap:wrap}.tp-sub{display:none}}';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function ensureHost() {
    var host = document.getElementById('topPicks');
    if (host) return host;
    var anchor = document.getElementById('categoryVideo');
    if (!anchor || !anchor.parentNode) return null;
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    host = document.createElement('div');
    host.id = 'topPicks';
    host.className = 'tp-wrap';
    host.setAttribute('lang', 'en');
    host.style.display = 'none';
    anchor.parentNode.insertBefore(host, anchor.nextSibling);
    return host;
  }

  function itemByCode(code) {
    if (typeof allItems === 'undefined') return null;
    for (var i = 0; i < allItems.length; i++) if (allItems[i].code === code) return allItems[i];
    return null;
  }

  function stBadge(it) {
    if (it.status === 'available') return '<span class="tp-st av">In stock</span>';
    return '<span class="tp-st etd">ETD' + (it.etd ? ' ' + esc(it.etd) : '') + '</span>';
  }

  function render() {
    var host = ensureHost();
    if (!host) return;
    var cfg = null;
    try {
      cfg = (typeof currentCat !== 'undefined' && !searchQuery) ? window.TOP_PICKS[currentCat] : null;
    } catch (e) { cfg = null; }
    if (!cfg) { host.style.display = 'none'; host.innerHTML = ''; return; }

    var cards = [];
    cfg.picks.forEach(function (p) {
      var it = itemByCode(p.code);
      if (!it || (it.status !== 'available' && it.status !== 'etd')) return;
      cards.push(
        '<div class="tp-card">' +
          '<div class="tp-tag">' + esc(p.tag) + '</div>' +
          '<div class="tp-model">' + esc(p.model || it.desc2 || it.desc1) + '</div>' +
          '<div class="tp-spec">' + esc(p.spec || it.desc1) + '</div>' +
          '<div class="tp-code">' + esc(it.code) + '</div>' +
          '<div class="tp-foot">' + stBadge(it) +
            '<span class="tp-add"><input class="tp-qty" type="number" min="1" value="1" aria-label="Quantity">' +
            '<button class="tp-btn" type="button" data-code="' + esc(it.code) + '">Add</button></span>' +
          '</div>' +
        '</div>');
    });

    if (cards.length < MIN_PICKS) { host.style.display = 'none'; host.innerHTML = ''; return; }
    host.innerHTML =
      '<div class="tp-head"><span class="tp-title"><i>★</i> ' + esc(cfg.title || 'Top Picks') + '</span>' +
      '<span class="tp-sub">' + esc(cfg.sub || '') + '</span></div>' +
      '<div class="tp-grid">' + cards.join('') + '</div>';
    host.style.display = '';
  }

  /* One delegated click handler: adds the typed quantity on top of what is already in the order */
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('.tp-btn') : null;
    if (!b) return;
    var code = b.getAttribute('data-code');
    var it = itemByCode(code);
    if (!it || typeof setQty !== 'function') return;
    var card = b.closest('.tp-card');
    var add = parseInt(card.querySelector('.tp-qty').value, 10);
    if (!add || add < 1) add = 1;
    var cur = (typeof orderList !== 'undefined' && orderList[code]) ? (orderList[code].qty || orderList[code]) : 0;
    cur = parseInt(cur, 10) || 0;
    var total = cur + add;
    setQty(code, it.desc1 || code, String(total));
    document.querySelectorAll('.qty-input[data-code="' + code + '"]').forEach(function (el) { el.value = total; });
  });

  /* Re-render whenever the page redraws the category banner (category / search / page changes) */
  var orig = window.updateCategoryBanner;
  if (typeof orig === 'function') {
    window.updateCategoryBanner = function () {
      var r = orig.apply(this, arguments);
      try { render(); } catch (e) {}
      return r;
    };
  }
  document.addEventListener('DOMContentLoaded', function () { try { render(); } catch (e) {} });
  try { render(); } catch (e) {}
})();
