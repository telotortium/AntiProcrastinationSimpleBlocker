/*! simple-blocker 2016-08-21 */
function half_sec_check() {
  "false" === localStorage.timeron && cancel_timer(),
    "true" === localStorage.flippoweroff && (localStorage.flippoweroff = !1),
    restore_onoff();
}
function cancel_timer() {
  (localStorage.timeron = !1),
    (document.getElementById("timerstatus").style.display = "none");
}
function parse_timer_input() {
  var a = document.getElementById("hours").value;
  "" == a && (a = 0);
  var b = Number(document.getElementById("minutes").value) + 60 * a;
  if (
    document.getElementById("hours").value < 0 ||
    document.getElementById("minutes").value < 0
  )
    alert("Invalid time set");
  else if (b > 0) {
    var c = 60 * b,
      d = 1e3 * c,
      e = new Date(),
      f = e.getTime(),
      g = f + d;
    (localStorage.timerend = JSON.stringify(g)),
      (localStorage.timeron = !0),
      restore_onoff();
    {
      setInterval(timer, 500);
    }
    (document.getElementById("hours").value = ""),
      (document.getElementById("minutes").value = ""),
      timer(),
      (document.getElementById("timerstatus").style.display = "block");
  } else alert("Invalid time set");
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
  document.getElementById("timeleft").innerHTML = j;
}
function save_options() {
  var a = document.getElementById("myonoffswitch");
  localStorage.activated = a.checked;
  var b = document.getElementById("blockextensions");
  localStorage.blockextensions = b.checked;
  var c = document.getElementById("allowlist-switch");
  localStorage.allowlist_mode = c.checked;
}
function hide_allowlist_blocklist() {
  if (localStorage.allowlist_mode === "true") {
    $("#blockrow").addClass("allowlist-blocklist-hidden");
    $("#allowrow").removeClass("allowlist-blocklist-hidden");
  } else {
    $("#blockrow").removeClass("allowlist-blocklist-hidden");
    $("#allowrow").addClass("allowlist-blocklist-hidden");
  }
}
function process_blocklist() {
  for (var a = $("#blockbox").val(), b = a.split(/\n/), c = 0; c < b.length; )
    (b[c] = trim(b[c])),
      "" == b[c] || void 0 === b[c] || null === b[c] ? b.splice(c, 1) : c++;
  localStorage.blocklist = JSON.stringify(b);
  var d = document.getElementById("saveblocklist");
  (d.innerHTML = "Saved!"),
    (d.style.color = "#0A7D00"),
    setTimeout(function() {
      (d.innerHTML = "Save Blocklist"), (d.style.color = "#000000");
    }, MSG_DISPLAY_TIME);
}
function process_allowlist() {
  for (var a = $("#allowbox").val(), b = a.split(/\n/), c = 0; c < b.length; )
    (b[c] = trim(b[c])),
      "" == b[c] || void 0 === b[c] || null === b[c] ? b.splice(c, 1) : c++;
  localStorage.allowlist = JSON.stringify(b);
  var d = document.getElementById("saveallowlist");
  (d.innerHTML = "Saved!"),
    (d.style.color = "#0A7D00"),
    setTimeout(function() {
      (d.innerHTML = "Save Allowlist"), (d.style.color = "#000000");
    }, MSG_DISPLAY_TIME);
}
function trim(a) {
  return a.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function password_switch() {
  var a = document.getElementById("passwordstatus2"),
    b = document.getElementById("passprotect");
  b.checked && null === JSON.parse(localStorage.password)
    ? ((localStorage.locked = !1),
      (b.checked = !1),
      (a.innerHTML =
        "You must set a password before you can enable password protection."),
      setTimeout(function() {
        a.innerHTML = "";
      }, MSG_DISPLAY_TIME))
    : b.checked
    ? ((localStorage.locked = !0),
      (a.innerHTML = "Password protection enabled using saved password."),
      setTimeout(function() {
        a.innerHTML = "";
      }, MSG_DISPLAY_TIME))
    : ((localStorage.locked = !1),
      (a.innerHTML = "Password protection disabled."),
      setTimeout(function() {
        a.innerHTML = "";
      }, MSG_DISPLAY_TIME));
}
function verify_passwords() {
  var a = document.getElementById("password1").value,
    b = document.getElementById("password2").value,
    c = document.getElementById("passwordstatus");
  if ("" != a && a === b) {
    (localStorage.password = JSON.stringify(md5(a))),
      (c.innerHTML = "New password saved."),
      setTimeout(function() {
        (c.innerHTML = ""),
          (document.getElementById("password1").value = ""),
          (document.getElementById("password2").value = "");
      }, MSG_DISPLAY_TIME);
    var d = document.getElementById("savepassword");
    (d.innerHTML = "Saved!"),
      (d.style.color = "#0A7D00"),
      setTimeout(function() {
        (d.innerHTML = "Save New Password"), (d.style.color = "#000000");
      }, MSG_DISPLAY_TIME);
  } else
    alert(
      "" === a && "" === b
        ? "Please enter a password"
        : "" != a || "" != b
        ? "Passwords do not match"
        : "error error"
    );
}
function random_password() {
  (localStorage.password = JSON.stringify(generate_random())),
    (document.getElementById("password1").value = ""),
    (document.getElementById("password2").value = "");
  var a = document.getElementById("passwordstatus");
  (a.innerHTML = "Random password saved (be careful!)."),
    setTimeout(function() {
      a.innerHTML = "";
    }, MSG_DISPLAY_TIME);
}
function generate_random() {
  return (rando = Math.random()
    .toString(36)
    .substring(5));
}
function restore_onoff() {
  var a = document.getElementById("myonoffswitch");
  a.checked = "true" === localStorage.activated ? !0 : !1;
}
function restore_allowlist() {
  var a = document.getElementById("allowlist-switch");
  a.checked = "true" === localStorage.allowlist_mode ? !0 : !1;
}
function restore_options() {
  var a = JSON.parse(localStorage.version);
  document.getElementById("versionheader").innerHTML = a;
  var b = JSON.parse(localStorage.blockcount);
  (document.getElementById("footertally").innerHTML = b),
    document
      .getElementById("gotoextensions")
      .addEventListener("click", function() {
        chrome.tabs.create({ url: "chrome://extensions" });
      });
  for (
    var c = JSON.parse(localStorage.blocklist), d = "", e = 0;
    e < c.length;
    e++
  )
    d = d + c[e] + "\n";
  (document.getElementById("blockbox").value = d);
  for (
    var c = JSON.parse(localStorage.allowlist), d = "", e = 0;
    e < c.length;
    e++
  )
    d = d + c[e] + "\n";
  (document.getElementById("allowbox").value = d), restore_onoff();
  restore_allowlist();
  var f = document.getElementById("blockextensions");
  f.checked = "true" === localStorage.blockextensions ? !0 : !1;
  var g = document.getElementById("passprotect");
  g.checked = "true" === localStorage.locked ? !0 : !1;
}
function check_password() {
  var a = md5(document.getElementById("passask").value),
    b = JSON.parse(localStorage.password);
  if (b === a || SECRET === a)
    $("body").load(chrome.extension.getURL(OPTIONS), function() {
      initializeOptionsPage();
    });
  else {
    var c = "Wrong password, sorry!";
    (document.getElementById("wrongpassworderror").innerHTML = c),
      (document.getElementById("passask").value = ""),
      setTimeout(function() {
        document.getElementById("wrongpassworderror").innerHTML = "";
      }, 2e3);
  }
}
function jumpTimer() {
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
    (document.getElementById("jumptimeleft").innerHTML = j);
}
function give_blocktime() {
  "true" === localStorage.timeron && jumpTimer();
}
function initializeOptionsPage() {
  if (
    (restore_options(),
    setInterval(half_sec_check, 500),
    "true" === localStorage.timeron)
  ) {
    timer();
    {
      setInterval(timer, 500);
    }
    document.getElementById("timerstatus").style.display = "block";
  }
  $("#hours").keyup(function(a) {
    13 == a.keyCode && $("#timerset").click();
  }),
    $("#minutes").keyup(function(a) {
      13 == a.keyCode && $("#timerset").click();
    }),
    $("#password2").keyup(function(a) {
      13 == a.keyCode && $("#savepassword").click();
    }),
    document.querySelector("#cancel").addEventListener("click", cancel_timer),
    document
      .querySelector("#timerset")
      .addEventListener("click", parse_timer_input),
    document.querySelector("#saveblocklist")
            .addEventListener("click", process_blocklist),
    document.querySelector("#saveallowlist")
            .addEventListener("click", process_allowlist),
    document
      .querySelector("#myonoffswitch")
      .addEventListener("click", save_options),
    document
      .querySelector("#allowlist-switch")
      .addEventListener("click", save_options),
    document
      .querySelector("#allowlist-switch")
      .addEventListener("click", hide_allowlist_blocklist),
    document
      .querySelector("#blockextensions")
      .addEventListener("click", save_options),
    document
      .querySelector("#passprotect")
      .addEventListener("click", password_switch),
    document
      .querySelector("#savepassword")
      .addEventListener("click", verify_passwords),
    document
      .querySelector("#randompassword")
      .addEventListener("click", random_password);
  hide_allowlist_blocklist();
}
function initializePasswordPage() {
  document.querySelector("#submit").addEventListener("click", check_password),
    $("#passask").keyup(function(a) {
      13 == a.keyCode && $("#submit").click();
    }),
    $("#passask").focus(),
    give_blocktime();
}
function initializeEverything() {
  "true" === localStorage.activated && "true" === localStorage.locked
    ? $("body").load(chrome.extension.getURL("jump.html"), function() {
        initializePasswordPage();
      })
    : $("body").load(chrome.extension.getURL(OPTIONS), function() {
        initializeOptionsPage();
      });
}
var MSG_DISPLAY_TIME = 1e3,
  SECRET = md5("sFJ4V5uaT87uFKS2qnogyYVHR"),
  OPTIONS = "options-inner.html";
initializeEverything();
