/*! simple-blocker 2016-08-21 */
function first_time_setup_check() {
  void 0 === localStorage.sbisinstalled &&
    ((localStorage.sbisinstalled = "true"),
    chrome.tabs.create({ url: chrome.extension.getURL("options.html") }));
}
function local_storage_check() {
  void 0 === localStorage.activated && (localStorage.activated = "true"),
  void 0 === localStorage.allowlist_mode && (localStorage.allowlist_mode = "false"),
    void 0 === localStorage.blocklist &&
      (localStorage.blocklist = JSON.stringify({})),
    void 0 === localStorage.allowlist &&
      (localStorage.allowlist = JSON.stringify({})),
    void 0 === localStorage.blockextensions &&
      (localStorage.blockextensions = "false"),
    void 0 === localStorage.locked && (localStorage.locked = "false"),
    void 0 === localStorage.password &&
      (localStorage.password = JSON.stringify(null)),
    void 0 === localStorage.flippoweroff &&
      (localStorage.flippoweroff = "false"),
    void 0 === localStorage.timeron && (localStorage.timeron = "false"),
    void 0 === localStorage.timerend &&
      (localStorage.timerend = JSON.stringify(0)),
    void 0 === localStorage.blockcount &&
      (localStorage.blockcount = JSON.stringify(0)),
    version_check();
}
function version_check() {
  var a = chrome.runtime.getManifest(),
    b = a.version;
  localStorage.version = JSON.stringify(b);
}
function checktime() {
  if ("true" === localStorage.timeron) {
    var a = new Date(),
      b = a.getTime(),
      c = JSON.parse(localStorage.timerend);
    b > c &&
      ((localStorage.timeron = !1),
      (localStorage.activated = (localStorage.activated === "false" ? !0 : !1)),
      (localStorage.flippoweroff = !0));
  }
}
function checkUrl(a, b) {
  var allowlist_mode = localStorage.allowlist_mode === "true";
  var do_block = allowlist_mode;
  var d = new RegExp("chrome://extensions", "i");
  var e = new RegExp(chrome.extension.getURL(""), "i");
  if (null !== b) {
    for (
      var c = JSON.parse(allowlist_mode ? localStorage.allowlist : localStorage.blocklist),
          f = 0;
      f < c.length;
      f++
    ) {
      var g = new RegExp(c[f], "i");
      if (g.test(b)) {
        do_block = !allowlist_mode;
        break;
      }
    }
    if (do_block && !e.test(b)) {
      block(a, b);
    }
  }
  "true" === localStorage.blockextensions && d.test(b) && block(a, b);
}
function block(a) {
  "true" === localStorage.activated &&
    chrome.tabs.update(a, { url: chrome.extension.getURL("blocked.html") });
}
function checkAllTabs() {
  chrome.tabs.query({}, function(a) {
    for (var b = 0; b < a.length; b++) checkUrl(a[b].id, a[b].url);
  });
}
function orgPomodoroCheck() {
  fetch("http://localhost:7345")
    .then((response) => response.json())
    .then((data) => {
      let last_state = localStorage.org_pomodoro_state;
      let state = data["org-pomodoro-state"];
      if (!last_state || state !== last_state) {
        if (state === ":pomodoro" ||
            state === ":none" &&
            [":short-break", ":long-break"].includes(last_state)) {
          localStorage.activated = "true";
          localStorage.locked = "true";
        } else {
          localStorage.activated = "false";
          localStorage.locked = "false";
        }
      }
      localStorage.org_pomodoro_state = state;
    })
    .catch((e) => {
      console.log(`Got error, now deactivating: ${e}`);
      localStorage.activated = "false";
      localStorage.locked = "false";
      localStorage.org_pomodoro_state = ":none";
    });
}
var scanFreq = 5e3;
localStorage.org_pomodoro_state = undefined;
setInterval(orgPomodoroCheck, 3e3);
local_storage_check(),
  first_time_setup_check(),
  setInterval(local_storage_check, 3e4),
  setInterval(checktime, 1e3),
  checkAllTabs(),
  setInterval(checkAllTabs, scanFreq),
  chrome.tabs.onUpdated.addListener(function(a, b, c) {
    checkUrl(a, c.url);
  }),
  chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({ url: "options.html" });
  });
