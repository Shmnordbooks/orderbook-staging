/* STAGING ONLY — this file must never be copied to the live orderbook repo.
   1) Keeps the test site's cart/login separate from the live site (same github.io origin)
      by prefixing every localStorage/sessionStorage key with "STG_".
   2) Shows a red TEST ENVIRONMENT bar on every page. */
(function () {
  // never send Google Analytics hits from the test site
  window['ga-disable-G-R5E515WN5S'] = true;
  window.gtag = function () {};
  var P = 'STG_';
  var proto = Storage.prototype;
  var g = proto.getItem, s = proto.setItem, r = proto.removeItem;
  function k(x) { x = String(x); return x.indexOf(P) === 0 ? x : P + x; }
  proto.getItem = function (x) { return g.call(this, k(x)); };
  proto.setItem = function (x, v) { return s.call(this, k(x), v); };
  proto.removeItem = function (x) { return r.call(this, k(x)); };
  function bar() {
    if (document.getElementById('stg-bar')) return;
    var b = document.createElement('div');
    b.id = 'stg-bar';
    b.textContent = 'TEST ENVIRONMENT — not the live dealer portal · build 27.10-1525';
    b.setAttribute('style', 'position:fixed;left:50%;bottom:0;transform:translateX(-50%);z-index:2147483647;' +
      'background:#d00;color:#fff;font:700 12px/1 Arial,sans-serif;letter-spacing:.08em;' +
      'padding:6px 14px;border-radius:6px 6px 0 0;pointer-events:none;opacity:.92');
    document.body.appendChild(b);
  }
  if (document.body) bar(); else document.addEventListener('DOMContentLoaded', bar);
})();
