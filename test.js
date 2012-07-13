
function callback(call, cb) {
  call.success(function (json) { cb(0, json); }).error(function (err) { cb(err, null); });
}

function bus89morn(cb) {
  $.getJSON('http://proximobus.appspot.com/agencies/mbta/stops/02730/predictions/by-route/89.js?callback=?', cb);
}

function bus71morn(cb) {
  $.getJSON('http://proximobus.appspot.com/agencies/mbta/stops/02076/predictions/by-route/71.js?callback=?', cb);
  //71_1_var1
  //02076
}

function bus71night(cb) {
  //71_0_var2
  //08178
  $.getJSON('http://proximobus.appspot.com/agencies/mbta/stops/08178/predictions/by-route/71.js?callback=?', cb);
}

function bus89night(cb) {
  //05104 Davis Square
  //89_1_var0
  //89_1_var1
  $.getJSON('http://proximobus.appspot.com/agencies/mbta/stops/05104/predictions/by-route/71.js?callback=?', cb);
//  callback($.get('http://proximobus.appspot.com/agencies/mbta/stops/02730/predictions/by-route/89.json'), cb);
}

function parseTimeDiff(now, then) {
  var msFromNow = then-now;
  if(msFromNow < 1000*60) {
    return "In less than a minute!";  
  } else if (msFromNow < 1000*60*60) {
    var minutes = Math.floor(msFromNow/1000/60);
    if (minutes == 1) {
      return "In about a minute!";
    } else {
      return "In about "+minutes+" minutes!";
    }
  } else if (msFromNow < 1000*60*60*24) {
    var hours = Math.floor(msAgo/1000/60/60);
     if (hours == 1) {
      return "In about an hour!";
    } else {
      return "In about "+hours+" hours!";
    }   
  } else {
    return "At "+then+".";
  }
}

function evalForFunAndList(fun, liStr) {
    fun(function(ret) {
      console.log(ret.items);
      for (var v=0; v<ret.items.length; v++) { 
        s = ret.items[v]['seconds'];
        console.log(s);
        then = new Date();
        then.setSeconds(then.getSeconds() + s)
        var inTime = parseTimeDiff(new Date, then);
        console.log(inTime);

        $(liStr).text('');

        var li = document.createElement('li');
        $(li).text(inTime);
        $(li).appendTo($(liStr));
      }
    });  
}

setInterval(function () {
    evalForFunAndList(bus89morn, '#89morn');
  },
10000);
setInterval(function () {
    evalForFunAndList(bus71morn, '#71morn');
  },
10000);
setInterval(function () {
    evalForFunAndList(bus71night, '#71night');
  },
10000);
setInterval(function () {
    evalForFunAndList(bus89night, '#89night');
  },
10000);
