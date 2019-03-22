/*! simple-blocker 2016-08-21 */
function md5cycle(a, b) {
  var c = a[0],
    d = a[1],
    e = a[2],
    f = a[3];
  (c = ff(c, d, e, f, b[0], 7, -680876936)),
    (f = ff(f, c, d, e, b[1], 12, -389564586)),
    (e = ff(e, f, c, d, b[2], 17, 606105819)),
    (d = ff(d, e, f, c, b[3], 22, -1044525330)),
    (c = ff(c, d, e, f, b[4], 7, -176418897)),
    (f = ff(f, c, d, e, b[5], 12, 1200080426)),
    (e = ff(e, f, c, d, b[6], 17, -1473231341)),
    (d = ff(d, e, f, c, b[7], 22, -45705983)),
    (c = ff(c, d, e, f, b[8], 7, 1770035416)),
    (f = ff(f, c, d, e, b[9], 12, -1958414417)),
    (e = ff(e, f, c, d, b[10], 17, -42063)),
    (d = ff(d, e, f, c, b[11], 22, -1990404162)),
    (c = ff(c, d, e, f, b[12], 7, 1804603682)),
    (f = ff(f, c, d, e, b[13], 12, -40341101)),
    (e = ff(e, f, c, d, b[14], 17, -1502002290)),
    (d = ff(d, e, f, c, b[15], 22, 1236535329)),
    (c = gg(c, d, e, f, b[1], 5, -165796510)),
    (f = gg(f, c, d, e, b[6], 9, -1069501632)),
    (e = gg(e, f, c, d, b[11], 14, 643717713)),
    (d = gg(d, e, f, c, b[0], 20, -373897302)),
    (c = gg(c, d, e, f, b[5], 5, -701558691)),
    (f = gg(f, c, d, e, b[10], 9, 38016083)),
    (e = gg(e, f, c, d, b[15], 14, -660478335)),
    (d = gg(d, e, f, c, b[4], 20, -405537848)),
    (c = gg(c, d, e, f, b[9], 5, 568446438)),
    (f = gg(f, c, d, e, b[14], 9, -1019803690)),
    (e = gg(e, f, c, d, b[3], 14, -187363961)),
    (d = gg(d, e, f, c, b[8], 20, 1163531501)),
    (c = gg(c, d, e, f, b[13], 5, -1444681467)),
    (f = gg(f, c, d, e, b[2], 9, -51403784)),
    (e = gg(e, f, c, d, b[7], 14, 1735328473)),
    (d = gg(d, e, f, c, b[12], 20, -1926607734)),
    (c = hh(c, d, e, f, b[5], 4, -378558)),
    (f = hh(f, c, d, e, b[8], 11, -2022574463)),
    (e = hh(e, f, c, d, b[11], 16, 1839030562)),
    (d = hh(d, e, f, c, b[14], 23, -35309556)),
    (c = hh(c, d, e, f, b[1], 4, -1530992060)),
    (f = hh(f, c, d, e, b[4], 11, 1272893353)),
    (e = hh(e, f, c, d, b[7], 16, -155497632)),
    (d = hh(d, e, f, c, b[10], 23, -1094730640)),
    (c = hh(c, d, e, f, b[13], 4, 681279174)),
    (f = hh(f, c, d, e, b[0], 11, -358537222)),
    (e = hh(e, f, c, d, b[3], 16, -722521979)),
    (d = hh(d, e, f, c, b[6], 23, 76029189)),
    (c = hh(c, d, e, f, b[9], 4, -640364487)),
    (f = hh(f, c, d, e, b[12], 11, -421815835)),
    (e = hh(e, f, c, d, b[15], 16, 530742520)),
    (d = hh(d, e, f, c, b[2], 23, -995338651)),
    (c = ii(c, d, e, f, b[0], 6, -198630844)),
    (f = ii(f, c, d, e, b[7], 10, 1126891415)),
    (e = ii(e, f, c, d, b[14], 15, -1416354905)),
    (d = ii(d, e, f, c, b[5], 21, -57434055)),
    (c = ii(c, d, e, f, b[12], 6, 1700485571)),
    (f = ii(f, c, d, e, b[3], 10, -1894986606)),
    (e = ii(e, f, c, d, b[10], 15, -1051523)),
    (d = ii(d, e, f, c, b[1], 21, -2054922799)),
    (c = ii(c, d, e, f, b[8], 6, 1873313359)),
    (f = ii(f, c, d, e, b[15], 10, -30611744)),
    (e = ii(e, f, c, d, b[6], 15, -1560198380)),
    (d = ii(d, e, f, c, b[13], 21, 1309151649)),
    (c = ii(c, d, e, f, b[4], 6, -145523070)),
    (f = ii(f, c, d, e, b[11], 10, -1120210379)),
    (e = ii(e, f, c, d, b[2], 15, 718787259)),
    (d = ii(d, e, f, c, b[9], 21, -343485551)),
    (a[0] = add32(c, a[0])),
    (a[1] = add32(d, a[1])),
    (a[2] = add32(e, a[2])),
    (a[3] = add32(f, a[3]));
}
function cmn(a, b, c, d, e, f) {
  return (
    (b = add32(add32(b, a), add32(d, f))), add32((b << e) | (b >>> (32 - e)), c)
  );
}
function ff(a, b, c, d, e, f, g) {
  return cmn((b & c) | (~b & d), a, b, e, f, g);
}
function gg(a, b, c, d, e, f, g) {
  return cmn((b & d) | (c & ~d), a, b, e, f, g);
}
function hh(a, b, c, d, e, f, g) {
  return cmn(b ^ c ^ d, a, b, e, f, g);
}
function ii(a, b, c, d, e, f, g) {
  return cmn(c ^ (b | ~d), a, b, e, f, g);
}
function md51(a) {
  txt = "";
  var b,
    c = a.length,
    d = [1732584193, -271733879, -1732584194, 271733878];
  for (b = 64; b <= a.length; b += 64)
    md5cycle(d, md5blk(a.substring(b - 64, b)));
  a = a.substring(b - 64);
  var e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (b = 0; b < a.length; b++) e[b >> 2] |= a.charCodeAt(b) << (b % 4 << 3);
  if (((e[b >> 2] |= 128 << (b % 4 << 3)), b > 55))
    for (md5cycle(d, e), b = 0; 16 > b; b++) e[b] = 0;
  return (e[14] = 8 * c), md5cycle(d, e), d;
}
function md5blk(a) {
  var b,
    c = [];
  for (b = 0; 64 > b; b += 4)
    c[b >> 2] =
      a.charCodeAt(b) +
      (a.charCodeAt(b + 1) << 8) +
      (a.charCodeAt(b + 2) << 16) +
      (a.charCodeAt(b + 3) << 24);
  return c;
}
function rhex(a) {
  for (var b = "", c = 0; 4 > c; c++)
    b += hex_chr[(a >> (8 * c + 4)) & 15] + hex_chr[(a >> (8 * c)) & 15];
  return b;
}
function hex(a) {
  for (var b = 0; b < a.length; b++) a[b] = rhex(a[b]);
  return a.join("");
}
function md5(a) {
  return hex(md51(a));
}
function add32(a, b) {
  return (a + b) & 4294967295;
}
function add32(a, b) {
  var c = (65535 & a) + (65535 & b),
    d = (a >> 16) + (b >> 16) + (c >> 16);
  return (d << 16) | (65535 & c);
}
var hex_chr = "0123456789abcdef".split("");
"5d41402abc4b2a76b9719d911017c592" != md5("hello");
