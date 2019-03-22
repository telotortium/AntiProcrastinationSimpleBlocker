/*! simple-blocker 2016-08-21 */
function update_tally() {
  var a = JSON.parse(localStorage.blockcount);
  localStorage.blockcount = JSON.stringify(a + 1);
}
function give_blocktime() {
  "true" === localStorage.timeron && timer();
}
function timer() {
  var a = new Date(),
    b = a.getTime(),
    c = JSON.parse(localStorage.timerend),
    d = c - b,
    e = Math.floor(d / 1e3),
    f = Math.floor(e / 3600),
    g = e % 3600,
    h = Math.floor(g / 60),
    i = g % 60;
  0 > f ? (f = "00") : 10 > f && (f = "0" + f),
    0 > h ? (h = "00") : 10 > h && (h = "0" + h),
    0 > i ? (i = "00") : 10 > i && (i = "0" + i);
  var j = f + ":" + h + ":" + i;
  (j = "Sleep timer enabled. Block time remaining: <strong>" + j + "</strong>"),
    (document.getElementById("blockedtimeleft").innerHTML = j);
}
document.addEventListener("DOMContentLoaded", give_blocktime),
  update_tally(),
  window.history.pushState(null, null, "blocked.html"),
  (window.onpopstate = function() {
    window.history.go(-2);
  }),
  (function(a, b, c, d, e, f, g) {
    (a.GoogleAnalyticsObject = e),
      (a[e] =
        a[e] ||
        function() {
          (a[e].q = a[e].q || []).push(arguments);
        }),
      (a[e].l = 1 * new Date()),
      (f = b.createElement(c)),
      (g = b.getElementsByTagName(c)[0]),
      (f.async = 1),
      (f.src = d),
      g.parentNode.insertBefore(f, g);
  })(
    window,
    document,
    "script",
    "https://www.google-analytics.com/analytics.js",
    "ga"
  ),
  ga("create", "UA-39146256-6", "auto"),
  ga("set", "checkProtocolTask", null),
  ga("send", "pageview", "/blocked");
