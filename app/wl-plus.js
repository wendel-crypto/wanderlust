/* wl-plus: booking flow + fully wired pages for the Wanderlust prototype */
(function () {
  if (window.__wlPlus) return; window.__wlPlus = 1;
  var D = document, $1 = function (s) { return D.querySelector(s); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function img(k, w) { return U(IMG[k] || k, w || 600); }
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var TODAY = new Date(); TODAY.setHours(12, 0, 0, 0);
  function addDays(d, n) { return new Date(d.getTime() + n * 864e5); }
  function fmtD(d) { return MON[d.getMonth()] + ' ' + d.getDate(); }
  function fmtLong(d) { return WD[d.getDay()] + ', ' + MON[d.getMonth()] + ' ' + d.getDate(); }
  function money(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
  function priceOf(p) { var m = String(p.price).match(/\d+/); return m ? +m[0] : 60; }
  var BACK = '<svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>', X = '<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  var css = '' +
    '.wl-step{display:flex;gap:6px;margin:4px 0 16px}.wl-step i{flex:1;height:3px;border-radius:3px;background:rgba(255,255,255,.12)}.wl-step i.on{background:var(--grad)}' +
    '.wl-top{display:flex;align-items:center;gap:10px;padding:14px 0 10px;position:sticky;top:0;background:var(--card);z-index:3}.wl-top h2{flex:1;font:800 17px/1.2 inherit;margin:0}' +
    '.wl-ib{width:36px;height:36px;border-radius:12px;background:var(--card2);display:grid;place-items:center;flex:none}.wl-ib svg{width:18px;height:18px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}' +
    '.wl-lst{display:flex;gap:12px;align-items:center;background:var(--card2);border-radius:18px;padding:10px;margin-bottom:18px}.wl-lst img{width:64px;height:64px;border-radius:14px;object-fit:cover;flex:none}.wl-lst b{display:block;font-size:15px}.wl-lst small{color:var(--mut);font-size:12px;display:block;margin-top:2px}' +
    '.wl-days{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;margin:0 -18px 18px;padding:0 18px}.wl-days::-webkit-scrollbar{display:none}' +
    '.wl-day{flex:none;width:58px;padding:10px 0;border-radius:16px;background:var(--card2);text-align:center;border:1.5px solid transparent;transition:.15s}.wl-day small{display:block;font-size:10px;color:var(--mut);text-transform:uppercase;letter-spacing:.6px}.wl-day b{display:block;font-size:19px;margin:3px 0 2px}.wl-day em{font-style:normal;font-size:9.5px;color:var(--teal)}' +
    '.wl-day.on{border-color:var(--coral);background:rgba(255,107,107,.12)}.wl-day.off{opacity:.35;pointer-events:none}.wl-day.off em{color:var(--mut)}' +
    '.wl-slots{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px}.wl-slot{padding:12px;border-radius:14px;background:var(--card2);text-align:left;border:1.5px solid transparent}.wl-slot b{display:block;font-size:14px}.wl-slot small{color:var(--mut);font-size:11px}.wl-slot.on{border-color:var(--coral);background:rgba(255,107,107,.12)}' +
    '.wl-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px;border-radius:16px;background:var(--card2);margin-bottom:10px}.wl-row b{display:block;font-size:14px}.wl-row small{color:var(--mut);font-size:12px}' +
    '.wl-step2{display:flex;align-items:center;gap:14px}.wl-step2 button{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.08);font-size:18px;font-weight:700}.wl-step2 b{min-width:18px;text-align:center;font-size:16px}' +
    '.wl-tg{width:44px;height:26px;border-radius:13px;background:rgba(255,255,255,.12);position:relative;flex:none;transition:.2s}.wl-tg:after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:.2s}.wl-tg.on{background:var(--teal)}.wl-tg.on:after{left:21px}' +
    '.wl-sum{background:var(--card2);border-radius:18px;padding:14px 16px;margin:6px 0 18px}.wl-sum div{display:flex;justify-content:space-between;font-size:13.5px;padding:5px 0;color:var(--mut)}.wl-sum div b{color:#fff;font-weight:600}.wl-sum .tot{border-top:1px solid var(--line);margin-top:6px;padding-top:10px;color:#fff;font-weight:800;font-size:16px}' +
    '.wl-bar{position:sticky;bottom:-30px;background:linear-gradient(transparent,var(--card) 30%);padding:18px 0 4px;margin-top:4px}' +
    '.wl-in{width:100%;box-sizing:border-box;background:var(--card2);border:1.5px solid transparent;border-radius:14px;padding:13px 14px;color:#fff;font:inherit;font-size:14px;outline:none;margin-bottom:10px}.wl-in:focus{border-color:rgba(255,107,107,.6)}textarea.wl-in{resize:none}' +
    '.wl-pay{display:flex;align-items:center;gap:12px;width:100%;padding:14px;border-radius:16px;background:var(--card2);margin-bottom:8px;text-align:left;border:1.5px solid transparent}.wl-pay.on{border-color:var(--coral)}.wl-pay .r{width:18px;height:18px;border-radius:50%;border:2px solid rgba(255,255,255,.3);margin-left:auto;flex:none}.wl-pay.on .r{border:6px solid var(--coral)}.wl-pay span.ic{width:38px;height:26px;border-radius:6px;background:#fff;color:#000;font-size:10px;font-weight:800;display:grid;place-items:center;flex:none}' +
    '.wl-spin{width:46px;height:46px;border-radius:50%;border:3px solid rgba(255,255,255,.1);border-top-color:var(--coral);animation:wls .8s linear infinite;margin:0 auto 16px}@keyframes wls{to{transform:rotate(360deg)}}' +
    '.wl-done{text-align:center;padding:30px 0 10px}.wl-check{width:78px;height:78px;border-radius:50%;background:var(--grad);display:grid;place-items:center;margin:0 auto 18px;animation:wlp .5s ease}.wl-check svg{width:38px;height:38px;fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}@keyframes wlp{0%{transform:scale(.4);opacity:0}70%{transform:scale(1.1)}}' +
    '.wl-done h2{font-size:24px;margin:0 0 6px}.wl-done p{color:var(--mut);margin:0 0 4px;font-size:14px}.wl-code{display:inline-block;margin:12px 0 18px;padding:8px 14px;border-radius:12px;background:var(--card2);font:700 15px/1 ui-monospace,Menlo,monospace;letter-spacing:2px}' +
    '.wl-btns{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}.wl-ghost{padding:14px;border-radius:16px;background:var(--card2);font-weight:700;font-size:14px}' +
    '.wl-hero{position:relative;margin:0 -18px 16px;height:240px}.wl-hero img{width:100%;height:100%;object-fit:cover}.wl-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 40%,var(--card))}.wl-hero .wl-ib{position:absolute;top:14px;left:18px;z-index:2;background:rgba(0,0,0,.5);backdrop-filter:blur(8px)}.wl-hero .wl-ib.r{left:auto;right:18px}' +
    '.wl-h{font-size:24px;font-weight:800;margin:-40px 0 4px;position:relative;z-index:2}.wl-sub{color:var(--mut);font-size:13px;margin-bottom:16px}' +
    '.wl-it{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--line)}.wl-it:last-child{border:0}.wl-it .d{width:44px;flex:none;text-align:center;border-radius:12px;background:var(--card2);padding:6px 0}.wl-it .d small{display:block;font-size:9.5px;color:var(--mut);text-transform:uppercase}.wl-it .d b{font-size:16px}.wl-it div.t b{display:block;font-size:14px}.wl-it div.t small{color:var(--mut);font-size:12px}.wl-it .tag{margin-left:auto;align-self:center;font-size:10.5px;font-weight:700;padding:4px 8px;border-radius:8px;background:rgba(46,196,182,.15);color:var(--teal);white-space:nowrap}' +
    '.wl-chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}.wl-chip{padding:9px 13px;border-radius:12px;background:var(--card2);font-size:13px;font-weight:600;border:1.5px solid transparent}.wl-chip.on{border-color:var(--coral);background:rgba(255,107,107,.12)}' +
    '.wl-coll{display:grid;grid-template-columns:1fr 1fr;gap:12px}.wl-cc{text-align:left}.wl-cc .m{display:grid;grid-template-columns:1fr 1fr;gap:3px;border-radius:16px;overflow:hidden;aspect-ratio:1}.wl-cc .m img{width:100%;height:100%;object-fit:cover}.wl-cc b{display:block;margin-top:8px;font-size:14px}.wl-cc small{color:var(--mut);font-size:12px}' +
    '.sec span[data-wl]{cursor:pointer;color:var(--coral);font-weight:700}' +
    '.trip .st.booked{background:var(--teal);color:#062}' +
    '.wl-story{position:absolute;inset:0;z-index:120;background:#000;display:none}.wl-story.on{display:block}.wl-story img.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.wl-story .pr{position:absolute;top:44px;left:12px;right:12px;display:flex;gap:4px;z-index:3}.wl-story .pr i{flex:1;height:2.5px;border-radius:2px;background:rgba(255,255,255,.35);overflow:hidden}.wl-story .pr i b{display:block;height:100%;width:0;background:#fff}.wl-story .pr i.done b{width:100%}.wl-story .pr i.run b{animation:wlpr 3.6s linear forwards}@keyframes wlpr{to{width:100%}}' +
    '.wl-story .hd{position:absolute;top:56px;left:14px;right:14px;display:flex;align-items:center;gap:10px;z-index:3;text-shadow:0 1px 6px rgba(0,0,0,.6)}.wl-story .hd img{width:34px;height:34px;border-radius:50%;object-fit:cover}.wl-story .hd b{font-size:14px}.wl-story .hd small{opacity:.8;font-size:12px;margin-left:6px}.wl-story .hd button{margin-left:auto}' +
    '.wl-story .cap{position:absolute;left:16px;right:16px;bottom:84px;z-index:3;font-size:15px;font-weight:600;text-shadow:0 1px 8px rgba(0,0,0,.7)}.wl-story .tap{position:absolute;top:100px;bottom:80px;width:40%;z-index:2}.wl-story .tap.l{left:0}.wl-story .tap.r{right:0}' +
    '.wl-story form{position:absolute;left:14px;right:14px;bottom:24px;z-index:3;display:flex;gap:8px}.wl-story form input{flex:1;background:rgba(0,0,0,.35);border:1.5px solid rgba(255,255,255,.5);border-radius:22px;padding:11px 16px;color:#fff;font:inherit;outline:none}.wl-story form button{width:44px;height:44px;border-radius:50%;background:var(--grad);display:grid;place-items:center}.wl-story form button svg{width:18px;height:18px;fill:none;stroke:#fff;stroke-width:2}' +
    '.wl-chatbook{margin-left:auto}.wl-qr{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding:6px 0 10px}.wl-qr button{flex:none;padding:8px 12px;border-radius:14px;background:var(--card2);font-size:12.5px;font-weight:600;border:1px solid var(--line)}' +
    '.bub .wl-inl{display:inline-block;margin-top:8px;padding:7px 12px;border-radius:10px;background:#fff;color:#111;font-weight:700;font-size:12.5px}' +
    '.pgrid button{padding:0;border:0;background:none;aspect-ratio:1;overflow:hidden}.pgrid button img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}.pgrid button:active img{transform:scale(.96)}';
  var st = D.createElement('style'); st.textContent = css; D.head.appendChild(st);
  var phone = $1('#phone');
  function mkSheet(id, full) {
    var s = D.createElement('div'); s.className = 'sheet'; s.id = 'sh-' + id;
    s.innerHTML = '<div class="panel' + (full ? ' full' : '') + '" id="p-' + id + '"></div>';
    if (!full) s.addEventListener('click', function (e) { if (e.target === s) closeSheets(); });
    phone.insertBefore(s, $1('#toast')); return s;
  }
  ['book', 'trip', 'place'].forEach(function (n) { mkSheet(n, true); });
  ['newtrip', 'coll', 'edit', 'filter'].forEach(function (n) { mkSheet(n, false); });
  function show(id, html) { var sh = $1('#sh-' + id), pn = $1('#p-' + id); if (sh.classList.contains('on')) { pn.style.animation = 'none'; pn.innerHTML = html; return; } closeSheets(); pn.style.animation = ''; pn.innerHTML = html; pn.scrollTop = 0; sh.classList.add('on'); }
  function head(title, back) { return '<div class="wl-top"><button class="wl-ib" onclick="' + (back || 'closeSheets()') + '">' + (back ? BACK : X) + '</button><h2>' + title + '</h2></div>'; }
  function bhead(title) { return '<div class="grab"></div><div class="phead"><h2>' + title + '</h2><button class="x" onclick="closeSheets()">' + X + '</button></div>'; }
  var bookings = [], myTrips = [], following = {}, PROFILE = { name: 'Leo Martins', handle: '@leo.goes', loc: 'Miami, FL', bio: 'Slow traveler, fast walker. 23 countries, one carry-on. Reviewing every place I\'d send my mom to. ✈️' };
  var BASE_TRIPS = [
    { id: 't1', k: 'kyoto', n: 'Kyoto & Tokyo', start: new Date(2027, 2, 14), nights: 12, sub: '3 saved places', pct: 62, st: 'Upcoming', stops: ['Arrive Tokyo · Shibuya', 'Tsukiji outer market & teamLab', 'Shinkansen to Kyoto', 'Fushimi Inari at sunrise', 'Arashiyama bamboo grove', 'Nara day trip', 'Fly home'] },
    { id: 't2', k: 'machu', n: 'Peru: Sacred Valley', start: new Date(2027, 6, 2), nights: 9, sub: 'Machu Picchu booked', pct: 30, st: 'Planning', stops: ['Arrive Cusco · acclimatise', 'Sacred Valley & Pisac', 'Ollantaytambo', 'Train to Aguas Calientes', 'Machu Picchu sunrise', 'Rainbow Mountain', 'Fly home'] },
    { id: 't3', k: 'iceland', n: 'Iceland Ring Road', start: new Date(2026, 8, 4), nights: 10, sub: '8 posts · 14 reviews', pct: 100, st: 'Done', stops: ['Reykjavík', 'Golden Circle', 'Vík & black sand beach', 'Fjaðrárgljúfur canyon', 'Jökulsárlón glacier lagoon', 'East fjords', 'Mývatn & Akureyri'] }
  ];
  var SLOTS = { 2: [['07:30', 'Early lagoons · 7h'], ['09:00', 'Classic tour · 7h']], 4: [['05:30', 'Sunrise entry · 6h'], ['09:00', 'Morning · 5h']] };
  var EXTRAS = { 2: [['Private boat upgrade', 40, 'group'], ['Snorkel gear & GoPro', 15, 'person']], 4: [['Huayna Picchu climb', 35, 'person'], ['Hotel pickup in Cusco', 25, 'group']] };
  var B = null;
  window.openBook = function (pid) {
    var p = posts.find(function (q) { return q.id === pid; }) || posts.find(function (q) { return q.book; });
    if (!p) { toast('Nothing to book here'); return; }
    var days = []; for (var i = 1; i <= 21; i++) { var d = addDays(TODAY, i), off = (i * 7 + p.id) % 6 === 0; days.push({ d: d, off: off, left: off ? 0 : 2 + (i * 3 + p.id) % 7 }); }
    var first = days.find(function (x) { return !x.off; });
    B = { p: p, days: days, day: first, slot: 0, guests: 2, ex: {}, pay: 'apple', name: PROFILE.name, email: 'leo@wanderlust.app', phone: '+1 305 555 0142', note: '' };
    bStep1();
  };
  function slotsOf(p) { return SLOTS[p.id] || [['09:00', 'Morning'], ['14:00', 'Afternoon']]; }
  function extrasOf(p) { return EXTRAS[p.id] || [['Private guide', 30, 'group']]; }
  function calc() {
    var unit = priceOf(B.p), sub = unit * B.guests, ex = 0;
    extrasOf(B.p).forEach(function (e, i) { if (B.ex[i]) ex += e[2] === 'person' ? e[1] * B.guests : e[1]; });
    var fee = Math.round((sub + ex) * 0.05); return { unit: unit, sub: sub, ex: ex, fee: fee, tot: sub + ex + fee };
  }
  function lst() { var p = B.p, u = P[p.u]; return '<div class="wl-lst"><img src="' + img(p.imgs[0], 200) + '" alt=""><div><b>' + esc(p.loc.split(',')[0]) + '</b><small>' + esc(u.name) + (u.verified ? ' ✓' : '') + ' · ★ ' + p.rating + '</small><small>' + money(priceOf(p)) + ' / person</small></div></div>'; }
  function steps(n) { return '<div class="wl-step">' + [1, 2, 3].map(function (i) { return '<i class="' + (i <= n ? 'on' : '') + '"></i>'; }).join('') + '</div>'; }
  function sumBox() {
    var c = calc(); return '<div class="wl-sum"><div><span>' + money(c.unit) + ' × ' + B.guests + ' guest' + (B.guests > 1 ? 's' : '') + '</span><b>' + money(c.sub) + '</b></div>' + (c.ex ? '<div><span>Extras</span><b>' + money(c.ex) + '</b></div>' : '') + '<div><span>Service fee</span><b>' + money(c.fee) + '</b></div><div class="tot"><span>Total</span><span>' + money(c.tot) + '</span></div></div>';
  }
  function bStep1() {
    var p = B.p;
    var h = head('Book experience') + steps(1) + lst() +
      '<div class="lbl">Choose a date</div><div class="wl-days">' + B.days.map(function (x, i) { return '<button class="wl-day' + (x === B.day ? ' on' : '') + (x.off ? ' off' : '') + '" onclick="wlB.day(' + i + ')"><small>' + WD[x.d.getDay()] + '</small><b>' + x.d.getDate() + '</b><em>' + (x.off ? 'Full' : x.left < 4 ? x.left + ' left' : MON[x.d.getMonth()]) + '</em></button>'; }).join('') + '</div>' +
      '<div class="lbl">Time</div><div class="wl-slots">' + slotsOf(p).map(function (s, i) { return '<button class="wl-slot' + (i === B.slot ? ' on' : '') + '" onclick="wlB.slot(' + i + ')"><b>' + s[0] + '</b><small>' + s[1] + '</small></button>'; }).join('') + '</div>' +
      '<div class="lbl">Guests</div><div class="wl-row"><div><b>Guests</b><small>Ages 6+ · max 8</small></div><div class="wl-step2"><button onclick="wlB.g(-1)">−</button><b>' + B.guests + '</b><button onclick="wlB.g(1)">+</button></div></div>' +
      '<div class="lbl" style="margin-top:16px">Add-ons</div>' + extrasOf(p).map(function (e, i) { return '<div class="wl-row"><div><b>' + e[0] + '</b><small>+' + money(e[1]) + ' / ' + e[2] + '</small></div><button class="wl-tg' + (B.ex[i] ? ' on' : '') + '" onclick="wlB.ex(' + i + ')" aria-label="Toggle"></button></div>'; }).join('') +
      sumBox() + '<p style="color:var(--mut);font-size:12px;margin:-6px 0 0">Free cancellation up to 24 hours before.</p>' +
      '<div class="wl-bar"><button class="cta" onclick="wlB.next()">Continue · ' + money(calc().tot) + '</button></div>';
    var sc = ($1('#p-book') || {}).scrollTop || 0; var same = $1('#sh-book').classList.contains('on') && $1('#p-book .wl-days');
    show('book', h); $1('#p-book').scrollTop = same ? sc : 0;
    var on = $1('#p-book .wl-day.on'); if (on) on.scrollIntoView({ block: 'nearest', inline: 'center' });
  }
  function bStep2() {
    var pays = [['apple', 'Pay', 'Apple Pay'], ['card', 'VISA', 'Visa ending 4242'], ['later', '$', 'Pay at meeting point']];
    var h = head('Your details', 'wlB.back()') + steps(2) + lst() +
      '<div class="wl-sum" style="margin-top:0"><div><span>Date</span><b>' + fmtLong(B.day.d) + '</b></div><div><span>Time</span><b>' + slotsOf(B.p)[B.slot][0] + '</b></div><div><span>Guests</span><b>' + B.guests + '</b></div></div>' +
      '<div class="lbl">Lead traveler</div><input class="wl-in" id="wlName" value="' + esc(B.name) + '" placeholder="Full name"><input class="wl-in" id="wlEmail" type="email" value="' + esc(B.email) + '" placeholder="Email"><input class="wl-in" id="wlPhone" value="' + esc(B.phone) + '" placeholder="Phone (WhatsApp)">' +
      '<textarea class="wl-in" id="wlNote" rows="2" placeholder="Dietary needs, pickup hotel, anything the host should know">' + esc(B.note) + '</textarea>' +
      '<div class="lbl">Payment</div>' + pays.map(function (x) { return '<button class="wl-pay' + (B.pay === x[0] ? ' on' : '') + '" onclick="wlB.pay(\'' + x[0] + '\')"><span class="ic">' + x[1] + '</span><b>' + x[2] + '</b><span class="r"></span></button>'; }).join('') +
      sumBox() + '<div class="wl-bar"><button class="cta" onclick="wlB.confirm()">' + (B.pay === 'later' ? 'Reserve now' : 'Confirm & pay ' + money(calc().tot)) + '</button></div>';
    var sc = $1('#p-book').scrollTop, same = !!$1('#p-book #wlName');
    show('book', h); $1('#p-book').scrollTop = same ? sc : 0;
  }
  function grab() { var g = function (id) { var e = $1('#' + id); return e ? e.value.trim() : ''; }; if (!$1('#wlName')) return; B.name = g('wlName'); B.email = g('wlEmail'); B.phone = g('wlPhone'); B.note = g('wlNote'); }
  function bConfirm() {
    grab();
    if (!B.name) { toast('Add the lead traveler name'); $1('#wlName').focus(); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(B.email)) { toast('Check the email address'); $1('#wlEmail').focus(); return; }
    show('book', head('Confirming') + steps(3) + '<div style="padding:90px 0;text-align:center"><div class="wl-spin"></div><b>' + (B.pay === 'later' ? 'Reserving your spot…' : 'Processing payment…') + '</b><p style="color:var(--mut);font-size:13px">Checking availability with ' + esc(P[B.p.u].name) + '</p></div>');
    $1('#p-book').scrollTop = 0; setTimeout(bDone, 1500);
  }
  function bDone() {
    var p = B.p, u = P[p.u], c = calc(), code = 'WL-' + (1000 + Math.floor(Math.random() * 9000)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var bk = { id: 'b' + Date.now(), code: code, p: p, d: B.day.d, slot: slotsOf(p)[B.slot][0], guests: B.guests, tot: c.tot, pay: B.pay, name: B.name, ex: extrasOf(p).filter(function (e, i) { return B.ex[i]; }).map(function (e) { return e[0]; }) };
    bookings.unshift(bk); B.day.left = Math.max(0, B.day.left - B.guests);
    threads[p.u] = threads[p.u] || [];
    threads[p.u].push(['them', 'You\'re booked! ' + fmtLong(bk.d) + ' at ' + bk.slot + ' for ' + bk.guests + '. Confirmation ' + code + '. See you there 🙌']);
    renderTrips();
    var h = '<div class="wl-done"><div class="wl-check"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></div><h2>You\'re booked!</h2><p>' + esc(p.loc.split(',')[0]) + ' with ' + esc(u.name) + '</p><p>' + fmtLong(bk.d) + ' · ' + bk.slot + ' · ' + bk.guests + ' guest' + (bk.guests > 1 ? 's' : '') + '</p><span class="wl-code">' + code + '</span></div>' +
      '<div class="wl-sum" style="margin-top:0"><div><span>Total ' + (bk.pay === 'later' ? 'due on the day' : 'paid') + '</span><b>' + money(bk.tot) + '</b></div><div><span>Confirmation sent to</span><b>' + esc(bk.name.split(' ')[0]) + ' · email</b></div>' + (bk.ex.length ? '<div><span>Add-ons</span><b>' + esc(bk.ex.join(', ')) + '</b></div>' : '') + '<div><span>Free cancellation until</span><b>' + fmtD(addDays(bk.d, -1)) + '</b></div></div>' +
      '<button class="cta" onclick="wlTrip(\'' + bk.id + '\')">View in My trips</button><div class="wl-btns"><button class="wl-ghost" onclick="openChat(\'' + p.u + '\',' + p.id + ')">Message host</button><button class="wl-ghost" onclick="closeSheets();openShare(' + p.id + ')">Share</button></div>';
    show('book', '<div class="wl-top"><button class="wl-ib" onclick="closeSheets()">' + X + '</button><h2></h2></div>' + h);
    $1('#p-book').scrollTop = 0; toast('Booking confirmed · ' + code);
  }
  window.wlB = {
    day: function (i) { B.day = B.days[i]; bStep1(); },
    slot: function (i) { B.slot = i; bStep1(); },
    g: function (d) { B.guests = Math.max(1, Math.min(8, B.guests + d)); bStep1(); },
    ex: function (i) { B.ex[i] = !B.ex[i]; bStep1(); },
    next: function () { bStep2(); },
    back: function () { grab(); bStep1(); },
    pay: function (m) { grab(); B.pay = m; bStep2(); },
    confirm: bConfirm
  };
  function allTrips() {
    var bt = bookings.map(function (b) { return { id: b.id, k: b.p.imgs[0], n: b.p.loc.split(',')[0], start: b.d, nights: 0, sub: b.slot + ' · ' + b.guests + ' guests · ' + b.code, pct: 100, st: 'Booked', bk: b }; });
    return bt.concat(myTrips, BASE_TRIPS);
  }
  window.renderTrips = function () {
    var sv = posts.filter(function (p) { return p.saved; }); $1('#savedCount').textContent = sv.length + 7;
    $1('#trips').innerHTML = allTrips().map(function (t) {
      var dates = t.nights ? fmtD(t.start) + ' – ' + fmtD(addDays(t.start, t.nights)) + ', ' + t.start.getFullYear() : fmtLong(t.start);
      return '<button class="trip" onclick="wlTrip(\'' + t.id + '\')"><img src="' + img(t.k, 700) + '" alt=""><div><span class="st ' + (t.st === 'Done' ? 'done' : t.st === 'Booked' ? 'booked' : '') + '">' + t.st + '</span><span><b>' + esc(t.n) + '</b><br><small>' + dates + ' · ' + esc(t.sub) + '</small></span><span class="bar"><span style="width:' + t.pct + '%"></span></span></div></button>';
    }).join('');
    $1('#saved').innerHTML = sv.length ? sv.map(function (p) { return '<button class="row" onclick="openDetail(' + p.id + ')"><img src="' + img(p.imgs[0], 200) + '" alt=""><div><b>' + esc(p.loc.split(',')[0]) + '</b><small>' + esc(p.loc.split(',').slice(1).join(',').trim()) + ' · ' + p.cat + '</small></div><span class="score">' + p.rating.toFixed(1) + '</span></button>'; }).join('') : '<div class="empty">Tap the bookmark on any post to save it here.</div>';
  };
  window.wlTrip = function (id) {
    var t = allTrips().find(function (x) { return x.id === id; }); if (!t) return;
    var h = '<div class="wl-hero"><img src="' + img(t.k, 900) + '" alt=""><button class="wl-ib" onclick="closeSheets()">' + BACK + '</button><button class="wl-ib r" onclick="closeSheets();openShare(null)"><svg viewBox="0 0 24 24"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg></button></div><div class="wl-h">' + esc(t.n) + '</div>';
    if (t.bk) {
      var b = t.bk, u = P[b.p.u];
      h += '<div class="wl-sub">Booked with ' + esc(u.name) + ' · ' + b.code + '</div><div class="wl-sum"><div><span>Date</span><b>' + fmtLong(b.d) + '</b></div><div><span>Meeting time</span><b>' + b.slot + '</b></div><div><span>Guests</span><b>' + b.guests + '</b></div>' + (b.ex.length ? '<div><span>Add-ons</span><b>' + esc(b.ex.join(', ')) + '</b></div>' : '') + '<div><span>Lead traveler</span><b>' + esc(b.name) + '</b></div><div class="tot"><span>' + (b.pay === 'later' ? 'Due on the day' : 'Paid') + '</span><span>' + money(b.tot) + '</span></div></div>' +
        '<div class="lbl">Meeting point</div><div class="wl-row"><div><b>' + esc(b.p.loc) + '</b><small>Your host will share the exact pin 24h before.</small></div></div>' +
        '<button class="cta" onclick="openChat(\'' + b.p.u + '\',' + b.p.id + ')" style="margin-top:8px">Message host</button><div class="wl-btns"><button class="wl-ghost" onclick="openDetail(' + b.p.id + ')">View listing</button><button class="wl-ghost" style="color:var(--coral)" data-cancel="' + b.id + '" onclick="wlCancel(\'' + b.id + '\')">Cancel booking</button></div>';
    } else {
      var n = t.nights || 7, stops = t.stops || [];
      h += '<div class="wl-sub">' + fmtD(t.start) + ' – ' + fmtD(addDays(t.start, n)) + ', ' + t.start.getFullYear() + ' · ' + n + ' nights · ' + t.st + '</div>' +
        '<div class="lbl">Trip progress</div><div class="wl-row"><div style="flex:1"><b>' + t.pct + '% planned</b><span style="display:block;height:5px;border-radius:5px;background:rgba(255,255,255,.1);margin-top:8px;overflow:hidden"><span style="display:block;height:100%;width:' + t.pct + '%;background:var(--grad)"></span></span></div></div>' +
        '<div class="lbl" style="margin-top:14px">Itinerary</div><div>' + stops.map(function (s, i) { var off = Math.round(i * n / Math.max(1, stops.length - 1)), d = addDays(t.start, off); var booked = /Machu Picchu sunrise/.test(s); return '<div class="wl-it"><div class="d"><small>' + MON[d.getMonth()] + '</small><b>' + d.getDate() + '</b></div><div class="t"><b>' + esc(s) + '</b><small>Day ' + (off + 1) + '</small></div>' + (booked ? '<span class="tag">Booked</span>' : '') + '</div>'; }).join('') + '</div>' +
        (t.st !== 'Done' ? '<button class="cta" style="margin-top:16px" onclick="closeSheets();go(\'explore\')">Add places from Explore</button>' : '<button class="cta" style="margin-top:16px" onclick="openSheet(\'create\')">Post a memory from this trip</button>');
    }
    show('trip', h);
  };
  window.wlCancel = function (id) {
    var b = bookings.find(function (x) { return x.id === id; }); if (!b) return;
    var btn = D.querySelector('[data-cancel="' + id + '"]');
    if (btn && !btn.dataset.armed) { btn.dataset.armed = 1; btn.textContent = 'Tap again to cancel'; setTimeout(function () { if (btn) { delete btn.dataset.armed; btn.textContent = 'Cancel booking'; } }, 3000); return; }
    bookings = bookings.filter(function (x) { return x !== b; }); renderTrips(); closeSheets(); go('trips'); toast('Booking cancelled · refund on its way');
  };
  var NT = { k: 'bali', n: '', start: '', nights: 7 };
  var DEST = [['bali', 'Bali, Indonesia'], ['santorini', 'Santorini, Greece'], ['morocco', 'Marrakech, Morocco'], ['paris', 'Paris, France'], ['lauter', 'Lauterbrunnen, Switzerland'], ['elnido', 'El Nido, Philippines'], ['utah', 'Moab, Utah'], ['rio', 'Rio de Janeiro, Brazil']];
  window.wlNewTrip = function (k) {
    if (k) NT.k = k; if (!NT.start) NT.start = addDays(TODAY, 45).toISOString().slice(0, 10);
    var d = DEST.find(function (x) { return x[0] === NT.k; }) || DEST[0];
    var h = bhead('New trip') + '<div class="lbl">Where to?</div><div class="wl-chips">' + DEST.map(function (x) { return '<button class="wl-chip' + (x[0] === NT.k ? ' on' : '') + '" onclick="wlNT(\'' + x[0] + '\')">' + x[1].split(',')[0] + '</button>'; }).join('') + '</div>' +
      '<div class="lbl">Trip name</div><input class="wl-in" id="ntName" value="' + esc(NT.n || d[1].split(',')[0] + ' escape') + '">' +
      '<div class="lbl">Start date</div><input class="wl-in" id="ntStart" type="date" value="' + NT.start + '" style="color-scheme:dark">' +
      '<div class="lbl">Length</div><div class="wl-row"><div><b>' + NT.nights + ' nights</b><small>Ends ' + fmtD(addDays(new Date(NT.start + 'T12:00'), NT.nights)) + '</small></div><div class="wl-step2"><button onclick="wlNTn(-1)">−</button><b>' + NT.nights + '</b><button onclick="wlNTn(1)">+</button></div></div>' +
      '<button class="cta" style="margin-top:10px" onclick="wlNTsave()">Create trip</button>';
    show('newtrip', h);
  };
  window.wlNT = function (k) { NT.n = ''; NT.start = ($1('#ntStart') || {}).value || NT.start; wlNewTrip(k); };
  window.wlNTn = function (d) { NT.n = $1('#ntName').value; NT.start = $1('#ntStart').value || NT.start; NT.nights = Math.max(1, Math.min(30, NT.nights + d)); wlNewTrip(); };
  window.wlNTsave = function () {
    var name = $1('#ntName').value.trim(), s = $1('#ntStart').value; if (!name) { toast('Give the trip a name'); return; } if (!s) { toast('Pick a start date'); return; }
    var d = DEST.find(function (x) { return x[0] === NT.k; });
    var t = { id: 'n' + Date.now(), k: NT.k, n: name, start: new Date(s + 'T12:00'), nights: NT.nights, sub: d[1].split(',').pop().trim() + ' · 0 places', pct: 10, st: 'Planning', stops: ['Arrive in ' + d[1].split(',')[0], 'Explore the neighbourhood', 'Day trip', 'Free day', 'Fly home'] };
    myTrips.unshift(t); NT = { k: 'bali', n: '', start: '', nights: 7 }; renderTrips(); closeSheets(); go('trips'); toast('Trip created'); setTimeout(function () { wlTrip(t.id); }, 350);
  };
  window.wlColl = function (which) {
    var sv = posts.filter(function (p) { return p.saved; });
    var C = [['Saved posts', sv.map(function (p) { return p.imgs[0]; }).concat(['bali', 'paris']).slice(0, 4), sv.length + ' places'], ['Kyoto 2027', ['kyoto', 'tokyo', 'kyoto', 'tokyo'], '6 places'], ['Beach escapes', ['elnido', 'maldives', 'santorini', 'bali'], '9 places'], ['Bucket list', ['iceland', 'machu', 'lauter', 'morocco'], '14 places']];
    if (which != null) {
      var c = C[which], seen = {}, items = which === 0 ? sv.map(function (p) { return { t: p.loc.split(',')[0], s: P[p.u].name, k: p.imgs[0], id: p.id }; }) : c[1].filter(function (k) { if (seen[k]) return false; seen[k] = 1; return true; }).map(function (k) { var p = posts.find(function (q) { return q.imgs.indexOf(k) > -1; }); var e = extra.find(function (x) { return x.k === k; }); return { t: p ? p.loc.split(',')[0] : e ? e.n.split(',')[0] : k.charAt(0).toUpperCase() + k.slice(1), s: p ? P[p.u].name : e ? e.s : '', k: k, id: p && p.id }; });
      show('coll', bhead(c[0]) + '<div class="list" style="padding:0">' + (items.length ? items.map(function (x) { return '<button class="row" onclick="' + (x.id ? 'openDetail(' + x.id + ')' : 'wlPlace(\'' + x.k + '\')') + '"><img src="' + img(x.k, 200) + '" alt=""><div><b>' + esc(x.t) + '</b><small>' + esc(x.s) + '</small></div></button>'; }).join('') : '<div class="empty">Nothing saved yet.</div>') + '</div><button class="wl-ghost" style="width:100%;margin-top:12px" onclick="wlColl()">← All collections</button>');
      return;
    }
    show('coll', bhead('Collections') + '<div class="wl-coll">' + C.map(function (c, i) { return '<button class="wl-cc" onclick="wlColl(' + i + ')"><div class="m">' + c[1].concat(['clouds', 'clouds', 'clouds']).slice(0, 4).map(function (k) { return '<img src="' + img(k, 200) + '" alt="">'; }).join('') + '</div><b>' + c[0] + '</b><small>' + c[2] + '</small></button>'; }).join('') + '</div>');
  };
  var BLURB = { bali: 'Rice terraces, surf breaks and temple ceremonies. Best from April to October.', morocco: 'Souks, riads and the Atlas Mountains a short drive away. Go in spring or autumn.', paris: 'Walk it. Every arrondissement has its own rhythm, and its own bakery worth a detour.', lauter: 'A valley of 72 waterfalls. Base yourself in Wengen or Mürren for the views.', utah: 'Arches, Canyonlands and sunsets that turn the rock to fire. Hike early, carry water.' };
  window.wlPlace = function (k) {
    var e = extra.find(function (x) { return x.k === k || x.n === k; }) || { n: k.charAt(0).toUpperCase() + k.slice(1), k: k, s: '' };
    var near = posts.filter(function (p) { return P[p.u].type === 'provider' && p.book; }).slice(0, 2);
    var h = '<div class="wl-hero"><img src="' + img(e.k, 900) + '" alt=""><button class="wl-ib" onclick="closeSheets()">' + BACK + '</button></div><div class="wl-h">' + esc(e.n.split(',')[0]) + '</div><div class="wl-sub">' + esc(e.n.split(',').slice(1).join(',').trim()) + (e.s ? ' · ' + e.s : '') + '</div>' +
      '<p style="color:var(--mut);font-size:14px;line-height:1.55;margin:0 0 18px">' + (BLURB[e.k] || 'Loved by travelers in your network.') + '</p>' +
      '<div class="wl-btns" style="margin:0 0 18px"><button class="cta" onclick="wlNewTrip(\'' + (DEST.some(function (x) { return x[0] === e.k; }) ? e.k : 'bali') + '\')">Plan a trip here</button><button class="wl-ghost" onclick="this.textContent=\'Saved ✓\';toast(\'Saved to Bucket list\')">Save place</button></div>' +
      '<div class="lbl">Bookable experiences you might like</div>' + near.map(function (p) { return '<button class="row" onclick="openBook(' + p.id + ')"><img src="' + img(p.imgs[0], 200) + '" alt=""><div><b>' + esc(p.loc.split(',')[0]) + '</b><small>' + esc(P[p.u].name) + ' · ' + p.price + '</small></div><span class="book" style="padding:7px 12px">Book</span></button>'; }).join('');
    show('place', h);
  };
  var exAll = false, exSort = 'top';
  window.renderExplore = function () {
    var q = ($1('#q').value || '').toLowerCase();
    var all = posts.map(function (p) { return { n: p.loc, k: p.imgs[0], id: p.id, txt: (p.loc + p.cap + p.tags.join(' ') + P[p.u].name).toLowerCase() }; }).concat(extra.map(function (e) { return { n: e.n, k: e.k, txt: e.n.toLowerCase() }; }));
    var f = all.filter(function (a) { return !q || a.txt.indexOf(q) > -1; });
    $1('#trend').innerHTML = f.slice(0, exAll ? 99 : 5).map(function (a) { var parts = a.n.split(','); return '<button class="dest" onclick="' + (a.id ? 'openDetail(' + a.id + ')' : 'wlPlace(\'' + a.k + '\')') + '"><img src="' + img(a.k, 500) + '" alt=""><div><b>' + esc((parts.length > 2 ? parts[parts.length - 2] : parts[0]).trim()) + '</b><small>' + esc(parts[parts.length - 1].trim()) + '</small></div></button>'; }).join('') || '<div class="empty" style="grid-column:span 2">No places match “' + esc(q) + '”.</div>';
    var top = posts.filter(function (p) { return !q || (p.loc + p.cap).toLowerCase().indexOf(q) > -1; });
    if (exSort === 'price') top = top.slice().sort(function (a, b) { return (String(a.price).match(/\d+/) ? priceOf(a) : 0) - (String(b.price).match(/\d+/) ? priceOf(b) : 0); });
    else if (exSort === 'book') top = top.filter(function (p) { return p.book; });
    else if (exSort === 'free') top = top.filter(function (p) { return p.price === 'Free'; });
    else top = top.slice().sort(function (a, b) { return b.rating - a.rating; });
    $1('#top').innerHTML = top.map(function (p) { return '<button class="row" onclick="openDetail(' + p.id + ')"><img src="' + img(p.imgs[0], 200) + '" alt=""><div><b>' + esc(p.loc.split(',')[0]) + '</b><small>' + esc(P[p.u].name) + ' · ' + p.price + '</small></div>' + (p.book ? '<span class="book" style="padding:7px 12px" onclick="event.stopPropagation();openBook(' + p.id + ')">Book</span>' : '<span class="score">' + p.rating.toFixed(1) + '</span>') + '</button>'; }).join('') || '<div class="empty">Nothing matches this filter.</div>';
    var secs = D.querySelectorAll('#s-explore .sec span'); if (secs[0]) { secs[0].textContent = exAll ? 'Show less' : 'See all'; } if (secs[1]) secs[1].textContent = exSort === 'top' ? 'Filter' : 'Filter · 1';
  };
  window.wlFilter = function () {
    var o = [['top', 'Top rated'], ['price', 'Price: low to high'], ['book', 'Bookable now'], ['free', 'Free experiences']];
    show('filter', bhead('Filter experiences') + o.map(function (x) { return '<button class="wl-pay' + (exSort === x[0] ? ' on' : '') + '" onclick="wlSort(\'' + x[0] + '\')"><b>' + x[1] + '</b><span class="r"></span></button>'; }).join(''));
  };
  window.wlSort = function (s) { exSort = s; closeSheets(); renderExplore(); };
  var sv = D.createElement('div'); sv.className = 'wl-story'; phone.insertBefore(sv, $1('#toast'));
  var SQ = [], si = 0, stimer = null;
  window.wlStory = function (k) {
    var mine = posts.filter(function (p) { return p.u === k; });
    SQ = []; mine.forEach(function (p) { p.imgs.forEach(function (im) { SQ.push({ k: im, cap: p.loc.split(',')[0], p: p }); }); });
    if (!SQ.length) SQ = [{ k: 'clouds', cap: 'Somewhere new' }];
    si = 0; sv.dataset.u = k; sv.classList.add('on'); drawStory();
  };
  function drawStory() {
    clearTimeout(stimer); var u = P[sv.dataset.u], s = SQ[si];
    sv.innerHTML = '<img class="bg" src="' + img(s.k, 900) + '" alt=""><div class="pr">' + SQ.map(function (_, i) { return '<i class="' + (i < si ? 'done' : i === si ? 'run' : '') + '"><b></b></i>'; }).join('') + '</div>' +
      '<div class="hd"><img src="' + U(u.av, 120) + '" alt=""><b>' + esc(u.name) + '</b><small>' + (si + 1) + 'h</small><button class="wl-ib" onclick="wlStoryClose()" style="background:rgba(0,0,0,.4)">' + X + '</button></div>' +
      '<div class="tap l" onclick="wlStoryNav(-1)"></div><div class="tap r" onclick="wlStoryNav(1)"></div><div class="cap">📍 ' + esc(s.cap) + (s.p && s.p.book ? '<br><button class="book" style="margin-top:10px" onclick="wlStoryClose();openBook(' + s.p.id + ')">Book this</button>' : '') + '</div>' +
      '<form onsubmit="event.preventDefault();wlStoryReply()"><input id="wlSR" placeholder="Reply to ' + esc(u.name.split(' ')[0]) + '…" onfocus="clearTimeout(window.__wlst)"><button type="submit"><svg viewBox="0 0 24 24"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg></button></form>';
    stimer = window.__wlst = setTimeout(function () { wlStoryNav(1); }, 3600);
  }
  window.wlStoryNav = function (d) { si += d; if (si < 0) si = 0; if (si >= SQ.length) { wlStoryClose(); return; } drawStory(); };
  window.wlStoryClose = function () { clearTimeout(stimer); sv.classList.remove('on'); sv.innerHTML = ''; };
  window.wlStoryReply = function () { var v = $1('#wlSR').value.trim(); if (!v) return; var k = sv.dataset.u; threads[k] = threads[k] || []; threads[k].push(['me', v]); wlStoryClose(); toast('Reply sent to ' + P[k].name.split(' ')[0]); };
  var _rs = window.renderStories;
  window.renderStories = function () { _rs(); D.querySelectorAll('#stories .story').forEach(function (b) { var m = (b.getAttribute('onclick') || '').match(/toast\('(\w+)/); if (!m) return; var k = Object.keys(P).find(function (x) { return P[x].name.split(' ')[0] === m[1]; }); if (k) b.setAttribute('onclick', 'wlStory(\'' + k + '\')'); }); };
  var _post = window.postHTML;
  window.postHTML = function (p) { var h = _post(p); return p.book ? h.replace('class="book" onclick="openChat(\'' + p.u + '\',' + p.id + ')"', 'class="book" onclick="openBook(' + p.id + ')"') : h; };
  var _det = window.openDetail;
  window.openDetail = function (id) { _det(id); var p = posts.find(function (q) { return q.id === id; }); if (!p) return; var b = D.querySelector('#detail .ph .book'); if (b && p.book) { b.textContent = 'Book'; b.setAttribute('onclick', 'openBook(' + id + ')'); b.insertAdjacentHTML('beforebegin', '<button class="wl-ib" style="margin-right:6px" onclick="openChat(\'' + p.u + '\',' + id + ')"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button>'); } };
  var _chat = window.openChat;
  window.openChat = function (k, pid) {
    _chat(k, pid);
    if (P[k].type !== 'provider') return;
    var bp = pid || (posts.find(function (q) { return q.u === k && q.book; }) || {}).id; if (!bp) return;
    var hd = D.querySelector('#chat .chathead'); if (hd) hd.insertAdjacentHTML('beforeend', '<button class="book wl-chatbook" onclick="openBook(' + bp + ')">Book</button>');
    var cp = D.querySelector('#chat .composer'); if (cp) cp.insertAdjacentHTML('beforebegin', '<div class="wl-qr" style="padding-left:14px;padding-right:14px"><button onclick="openBook(' + bp + ')">📅 Check availability</button><button onclick="wlQuick(\'Is it family friendly?\')">Family friendly?</button><button onclick="wlQuick(\'What should I bring?\')">What to bring?</button></div>');
    window.__wlBookPid = bp;
  };
  window.wlQuick = function (t) { var i = $1('#msgIn'); if (i) { i.value = t; sendMsg(); } };
  var _send = window.sendMsg;
  window.sendMsg = function () {
    var k = chatWith; _send();
    if (P[k] && P[k].type === 'provider') setTimeout(function () { var bubs = D.querySelectorAll('#msgs .bub.them'); var last = bubs[bubs.length - 1]; if (last && /booking link/.test(last.textContent) && !last.querySelector('.wl-inl')) last.insertAdjacentHTML('beforeend', '<br><button class="wl-inl" onclick="openBook(' + (window.__wlBookPid || 2) + ')">Open booking →</button>'); }, 1400);
  };
  window.renderProfile = function () {
    var mine = posts.filter(function (p) { return p.u === 'me'; });
    $1('#postCount').textContent = 48 + mine.length;
    var cells = mine.map(function (p) { return { k: p.imgs[0], id: p.id }; }).concat(['iceland', 'paris', 'braies', 'utah', 'morocco', 'lauter', 'bali', 'rio', 'tokyo'].map(function (k) { return { k: k, id: (posts.find(function (p) { return p.imgs.indexOf(k) > -1; }) || {}).id }; }));
    $1('#pgrid').innerHTML = cells.map(function (c) { return '<button onclick="' + (c.id ? 'openDetail(' + c.id + ')' : 'wlPlace(\'' + c.k + '\')') + '"><img src="' + img(c.k, 300) + '" alt=""></button>'; }).join('');
  };
  window.wlEdit = function () {
    show('edit', bhead('Edit profile') + '<div class="lbl">Name</div><input class="wl-in" id="peName" value="' + esc(PROFILE.name) + '"><div class="lbl">Username</div><input class="wl-in" id="peHandle" value="' + esc(PROFILE.handle) + '"><div class="lbl">Location</div><input class="wl-in" id="peLoc" value="' + esc(PROFILE.loc) + '"><div class="lbl">Bio</div><textarea class="wl-in" id="peBio" rows="3" maxlength="150">' + esc(PROFILE.bio) + '</textarea><button class="cta" onclick="wlEditSave()">Save</button>');
  };
  window.wlEditSave = function () {
    var g = function (i) { return $1('#' + i).value.trim(); }; if (!g('peName')) { toast('Name can\'t be empty'); return; }
    PROFILE = { name: g('peName'), handle: '@' + g('peHandle').replace(/^@+/, ''), loc: g('peLoc'), bio: g('peBio') };
    P.me.name = PROFILE.name; P.me.handle = PROFILE.handle;
    $1('.pname').textContent = PROFILE.name; $1('.phandle').textContent = PROFILE.handle + (PROFILE.loc ? ' · ' + PROFILE.loc : ''); $1('.bio').textContent = PROFILE.bio;
    closeSheets(); toast('Profile updated');
  };
  var _notif = window.renderNotif;
  window.renderNotif = function () { _notif(); D.querySelectorAll('#notifs .row').forEach(function (r) { var b = r.querySelector('button.book'); if (!b) return; b.onclick = function () { following.aiko = !following.aiko; b.textContent = following.aiko ? 'Following' : 'Follow'; b.style.background = following.aiko ? 'var(--card2)' : ''; toast(following.aiko ? 'Following Aiko' : 'Unfollowed'); }; if (following.aiko) { b.textContent = 'Following'; b.style.background = 'var(--card2)'; } }); };
  function wire() {
    var tripsSecs = D.querySelectorAll('#s-trips .sec span');
    if (tripsSecs[0]) { tripsSecs[0].dataset.wl = 1; tripsSecs[0].onclick = function () { wlNewTrip(); }; }
    if (tripsSecs[1]) { tripsSecs[1].dataset.wl = 1; tripsSecs[1].onclick = function () { wlColl(); }; }
    var ex = D.querySelectorAll('#s-explore .sec span');
    if (ex[0]) { ex[0].dataset.wl = 1; ex[0].onclick = function () { exAll = !exAll; renderExplore(); }; }
    if (ex[1]) { ex[1].dataset.wl = 1; ex[1].onclick = wlFilter; }
    var ed = D.querySelector('.pbtns .pri'); if (ed) ed.setAttribute('onclick', 'wlEdit()');
    var mc = $1('#mapcard'); if (mc) new MutationObserver(function () { var fn = mc.onclick; if (!fn || fn.__wl) return; var src = mc.innerHTML; var w = function () { if (/>Explore</.test(src)) { mc.classList.remove('on'); var t = (mc.querySelector('b') || {}).textContent || ''; var e = extra.find(function (x) { return x.n === t; }); if (e) { wlPlace(e.k); return; } } fn(); }; w.__wl = 1; mc.onclick = w; }).observe(mc, { childList: true });
  }
  wire();
  renderStories(); renderFeed(); renderTrips(); renderProfile();
  if (D.querySelector('#s-explore.on')) renderExplore();
  var q = new URLSearchParams(location.search).get('screen');
  if (q === 'book') openBook(2); else if (q === 'trip') wlTrip('t1');
})();
