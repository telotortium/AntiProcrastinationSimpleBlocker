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
  });
