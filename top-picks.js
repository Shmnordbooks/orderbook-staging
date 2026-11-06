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
        { code: 'ISMBBR60B',    model: 'SM-BBR60', tag: 'Road',            spec: 'Ultegra · BSA 68mm · Hollowtech II' },
        { code: 'IBBR9100I',    model: 'BB-R9100', tag: 'Road',            spec: 'Dura-Ace · Italian 70mm' },
        { code: 'EBBRS501B',    model: 'BB-RS501', tag: 'Road + MTB',      spec: 'BSA threaded · Hollowtech II' },
        { code: 'EBBRS500PB',   model: 'BB-RS500', tag: 'Road',            spec: 'Press-fit · Hollowtech II' },
        { code: 'IBBMT801B',    model: 'BB-MT801', tag: 'MTB',             spec: 'BSA 68/73mm · Hollowtech II' },
        { code: 'EBBMT501B',    model: 'BB-MT501', tag: 'MTB',             spec: 'BSA 68/73mm · Hollowtech II' },
        { code: 'EBBMT500PA',   model: 'BB-MT500', tag: 'MTB',             spec: 'Press-fit · Hollowtech II' },
        { code: 'ISMBB93B',     model: 'SM-BB93',  tag: 'MTB · XTR',       spec: 'BSA 68mm · Hollowtech II' },
        { code: 'EBBUN300B23X', model: 'BB-UN300', tag: 'City / Trekking', spec: 'BSA 122.5/68mm · Square taper' },
        { code: 'EBBES300B13',  model: 'BB-ES300', tag: 'Octalink',        spec: 'BSA 68/113mm · Octalink' }
      ]
    },
    'Chain': {
      title: 'Top Picks',
      sub: 'Most requested chains',
      picks: [
        { code: 'ICNM8100126Q', model: 'CN-M8100', tag: 'MTB · Deore XT', spec: '12-speed · 126 links · Quick Link' },
        { code: 'ICNM6100126Q', model: 'CN-M6100', tag: 'MTB · Deore', spec: '12-speed · 126 links · Quick Link' },
        { code: 'ICNHG60111116Q', model: 'CN-HG601', tag: 'Road + MTB', spec: '11-speed · 116 links · Quick Link' },
        { code: 'ICNHG70111116Q', model: 'CN-HG701', tag: 'Road + MTB', spec: '11-speed · 116 links · Quick Link' },
        { code: 'ICNLG500116Q', model: 'CN-LG500', tag: 'Linkglide', spec: '9/10/11-speed · 116 links · Quick Link' },
        { code: 'ICNHG95116I', model: 'CN-HG95', tag: '10-speed', spec: '10-speed · 116 links' },
        { code: 'ICNHG54116I', model: 'CN-HG54', tag: '10-speed', spec: '10-speed · 116 links' },
        { code: 'ECNHG53C116I', model: 'CN-HG53', tag: '9-speed', spec: '9-speed · 116 links' },
        { code: 'ECNHG71C116I', model: 'CN-HG71', tag: '6/7/8-speed', spec: '6/7/8-speed · 116 links' },
        { code: 'ECNHG40116Q', model: 'CN-HG40', tag: 'Entry · 6/7/8-speed', spec: '6/7/8-speed · 116 links' }
      ]
    },
    'Cassettes': {
      title: 'Top Picks',
      sub: 'Most requested cassettes',
      picks: [
        { code: 'ICSHG70011134', model: 'CS-HG700', tag: 'Road · 105', spec: '11-speed · 11-34T' },
        { code: 'ICSR710112134', model: 'CS-R7101', tag: 'Road · 105', spec: '12-speed · 11-34T' },
        { code: 'ICSR810112134', model: 'CS-R8101', tag: 'Road · Ultegra', spec: '12-speed · 11-34T' },
        { code: 'ICSHG8001111134', model: 'CS-HG800', tag: 'Road · Ultegra', spec: '11-speed · 11-34T' },
        { code: 'ICSM7100045', model: 'CS-M7100', tag: 'MTB · SLX', spec: '12-speed · 10-45T · Hyperglide+' },
        { code: 'ICSM8100051', model: 'CS-M8100', tag: 'MTB · Deore XT', spec: '12-speed · 10-51T · Hyperglide+' },
        { code: 'ICSM510011142', model: 'CS-M5100', tag: 'MTB · Deore', spec: '11-speed · 11-42T' },
        { code: 'ICSHG50010134', model: 'CS-HG500', tag: 'Road + MTB · Tiagra', spec: '10-speed · 11-34T' },
        { code: 'ICSHG5010136', model: 'CS-HG50', tag: 'MTB · Deore', spec: '10-speed · 11-36T' },
        { code: 'ICSHG4009134', model: 'CS-HG400', tag: '9-speed · Alivio', spec: '9-speed · 11-34T' }
      ]
    },
    'Crankset': {
      title: 'Top Picks',
      sub: 'Most requested cranksets',
      picks: [
        { code: 'IFCR7100CX04', model: 'FC-R7100', tag: 'Road · 105', spec: '2x12 · 50/34T · 170mm' },
        { code: 'IFCR8100CX26', model: 'FC-R8100', tag: 'Road · Ultegra', spec: '2x12 · 52/36T · 170mm' },
        { code: 'EFCRS510DX66X', model: 'FC-RS510', tag: 'Road · 105', spec: '2x11 · 46/36T · 172.5mm' },
        { code: 'EFCRS520CX04', model: 'FC-RS520', tag: 'Road', spec: '2x12 · 50/34T · 170mm' },
        { code: 'EFCRX600112CX60', model: 'FC-RX600', tag: 'Gravel · GRX', spec: '2x11 · 46/30T · 170mm' },
        { code: 'EFCM61001EXA2', model: 'FC-M6100-1', tag: 'MTB · Deore', spec: '1x12 · 32T · 175mm' },
        { code: 'EFCMT5101CXA2L', model: 'FC-MT510-1', tag: 'MTB · Deore', spec: '1x12 · 32T · 170mm' },
        { code: 'EFCM51001CXA0', model: 'FC-M5100-1', tag: 'MTB · Deore', spec: '1x10/11 · 30T · 170mm' },
        { code: 'EFCM371C422CL', model: 'FC-M371', tag: 'Trekking · Altus', spec: '9-speed · 44/32/22T · 170mm' },
        { code: 'EFCM361C888CL', model: 'FC-M361', tag: 'Entry · Acera', spec: '8-speed · 48/38/28T · 170mm' }
      ]
    }

  };

  var css =
    '.tp-wrap{margin:-6px 0 14px 0}' +
    '.tp-head{display:flex;align-items:baseline;gap:10px;margin:0 0 6px 2px}' +
    '.tp-title{font-family:"Barlow Condensed",Arial,sans-serif;font-weight:700;font-size:16px;letter-spacing:.1em;text-transform:uppercase;color:var(--text,#fff)}' +
    '.tp-title i{font-style:normal;color:#0082CA}' +
    '.tp-sub{font-size:11px;color:var(--text2,#9aa);letter-spacing:.03em}' +
    '.tp-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:7px}' +
    '.tp-card{display:flex;flex-direction:column;gap:3px;padding:8px 9px 7px;min-width:0;' +
      'background:var(--surface,#111118);border:1px solid var(--border,#1e1e2e);border-radius:8px;' +
      'box-shadow:inset 0 2px 0 #0082CA}' +
    '.tp-tag{font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#0082CA;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.tp-model{align-self:flex-start;font-family:"Barlow Condensed",Arial,sans-serif;font-weight:700;font-size:17px;line-height:1.05;color:var(--text,#fff)}' +
    '.tp-model.tp-ph{cursor:zoom-in;border-bottom:1px dotted #0082CA}' +
    '.tp-code{font-size:10px;color:var(--text3,#6b7280);letter-spacing:.04em}' +
    '.tp-spec{font-size:11px;line-height:1.3;color:var(--text2,#9aa);min-height:28px}' +
    '.tp-foot{display:flex;align-items:center;justify-content:space-between;gap:6px;margin-top:auto;padding-top:3px}' +
    '.tp-st{font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap}' +
    '.tp-st.av{color:#00c896}.tp-st.etd{color:#f5a623}' +
    '.tp-add{display:flex;align-items:center;gap:4px}' +
    '.tp-qty{width:38px;padding:4px 2px;text-align:center;background:var(--surface,#111118);color:var(--text,#fff);' +
      'border:1px solid var(--border,#1e1e2e);border-radius:5px;font-family:"Barlow Condensed",sans-serif;font-size:13px;font-weight:600}' +
    '.tp-btn{padding:5px 9px;border:0;border-radius:5px;background:#0082CA;color:#fff;cursor:pointer;' +
      'font-family:"Barlow Condensed",Arial,sans-serif;font-weight:700;font-size:13px;letter-spacing:.06em;text-transform:uppercase}' +
    '.tp-btn:hover{background:#0a94e0}' +
    '#tpPhoto{position:fixed;z-index:99999;display:none;width:240px;height:240px;padding:6px;box-sizing:border-box;' +
      'background:#fff;border:1px solid rgba(0,130,202,.6);border-radius:10px;box-shadow:0 14px 40px rgba(0,0,0,.55);pointer-events:none}' +
    '#tpPhoto img{width:100%;height:100%;object-fit:contain;display:block}' +
    '@media(max-width:1200px){.tp-grid{grid-template-columns:repeat(4,1fr)}}' +
    '@media(max-width:900px){.tp-grid{grid-template-columns:repeat(2,1fr);gap:6px}.tp-sub{display:none}.tp-spec{min-height:0}}';

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

  /* Photo on hover: reuses the page's product-photo map (pvHas / pvUrls). On touch screens a tap toggles it. */
  function hasPhoto(code) { return typeof window.pvHas === 'function' && window.pvHas(code); }
  var pop = null, popImg = null;
  function getPop() {
    if (pop) return pop;
    pop = document.createElement('div'); pop.id = 'tpPhoto';
    popImg = document.createElement('img'); popImg.alt = '';
    pop.appendChild(popImg); document.body.appendChild(pop);
    return pop;
  }
  function showPhoto(el) {
    var code = el.getAttribute('data-code');
    var urls = (typeof window.pvUrls === 'function') ? window.pvUrls(code) : [];
    if (!urls.length) return;
    var p = getPop(), url = urls[0];
    popImg.onerror = function () {
      if (popImg.getAttribute('data-step') !== '1') {
        popImg.setAttribute('data-step', '1');
        popImg.src = 'https://wsrv.nl/?url=' + encodeURIComponent(url.replace(/^https:/, 'http:')) + '&w=500&we&output=jpg';
      } else { p.style.display = 'none'; }
    };
    popImg.setAttribute('data-step', '0');
    popImg.src = url;
    var r = el.getBoundingClientRect(), W = 240, H = 240;
    var left = Math.max(8, Math.min(r.left, window.innerWidth - W - 8));
    var top = r.bottom + 8;
    if (top + H > window.innerHeight - 8) top = Math.max(8, r.top - H - 8);
    p.style.left = left + 'px'; p.style.top = top + 'px'; p.style.display = 'block';
  }
  function hidePhoto() { if (pop) pop.style.display = 'none'; }

  document.addEventListener('mouseover', function (e) {
    var m = e.target && e.target.closest ? e.target.closest('.tp-model.tp-ph') : null;
    if (m) showPhoto(m);
  });
  document.addEventListener('mouseout', function (e) {
    var m = e.target && e.target.closest ? e.target.closest('.tp-model.tp-ph') : null;
    if (m) hidePhoto();
  });
  document.addEventListener('click', function (e) {
    var m = e.target && e.target.closest ? e.target.closest('.tp-model.tp-ph') : null;
    if (m && window.matchMedia && window.matchMedia('(hover: none)').matches) {
      if (pop && pop.style.display === 'block') hidePhoto(); else showPhoto(m);
    } else if (!m) hidePhoto();
  });
  window.addEventListener('scroll', hidePhoto, true);

  function render() {
    var host = ensureHost();
    if (!host) return;
    var cfg = null;
    try {
      cfg = (typeof currentCat !== 'undefined' && !searchQuery) ? window.TOP_PICKS[currentCat] : null;
    } catch (e) { cfg = null; }
    if (!cfg) { hidePhoto(); host.style.display = 'none'; host.innerHTML = ''; return; }

    var cards = [];
    cfg.picks.forEach(function (p) {
      var it = itemByCode(p.code);
      if (!it || (it.status !== 'available' && it.status !== 'etd')) return;
      cards.push(
        '<div class="tp-card">' +
          '<div class="tp-tag">' + esc(p.tag) + '</div>' +
          '<div class="tp-model' + (hasPhoto(it.code) ? ' tp-ph' : '') + '" data-code="' + esc(it.code) + '">' + esc(p.model || it.desc2 || it.desc1) + '</div>' +
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
