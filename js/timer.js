var Timer = (function () {
  var defaults = {
    minutes: 25,
    seconds: 0,
  };

  var makeTimer = function(min,sec,update,alarm) {
    var min = (typeof min === 'undefined') ? defaults.minutes : min;
    var sec = (typeof sec === 'undefined') ? defaults.seconds : sec;

    var timeout = null;
    var end;
    var remaining = ((60 * min) + sec) * 1000;
    var doUpdate = function() {
      remaining = end - new Date().getTime();
      if (remaining < 0) {
        update(0,0);
        alarm();
      } else {
        next = new Date();
        next.setTime(remaining);
        update(next.getMinutes(),next.getSeconds());
        timeout = window.setTimeout(doUpdate, next.getMilliseconds());
        console.log("Next timeout is " + timeout);
      }
    };
    var stop = function() {
      console.log("Stopping timeout " + timeout);
      window.clearTimeout(timeout);
      remaining = ((60 * min) + sec) * 1000;
    };
    var start = function() {
      end = new Date().getTime() + remaining;
      doUpdate();
    };
    var pause = function() {
      window.clearTimeout(timeout);
    }
    return {
      start: start,
      pause: pause,
      stop: stop,
    };
  };

  return {
    makeTimer: makeTimer
  };
})();
