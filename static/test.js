/**
 * @author angusfu1126@qq.com
 * @date   2017-01-18
 */

var isPrerender = function () {
  return document.visibilityState === 'prerender';
};

// image ping on load
window.addEventListener('load', function () {
  if (!isPrerender()) {
    imagePing('/image_ping.gif?src=normal&from=' + encodeURIComponent(location.href));
    return;
  }

  var executed = false;

  var cb = function () {
    if (!executed && !isPrerender()) {
      imagePing('/image_ping.gif?src=prerender');
      executed = true;
      document.removeEventListener('visibilitychange', cb);
    }
  };

  document.addEventListener('visibilitychange', cb, false);
}, false);


// send beacon when unload
window.addEventListener('unload', function () {
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/beacon.gif?src=' + encodeURIComponent(location.href));
  } else {
    document.addEventListener('visibilitychange', function () {
      imagePing('/beacon.gif?src=imagePing');
    });
  }
}, false);

function imagePing(src) {
  var img = new Image();
  img.src = src;
  img.onload = img.onerror = function () {
    img.onload = img.onerror = null;
    img = null;
  };
}