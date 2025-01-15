// app.js
// job    : controls clock app actions
// git    : https://github.com/motetpaper/pwa-motet-clock
// lic    : MIT

// the double dot clock separators
const dotdot = document.querySelectorAll('span');
// the hh mm ss time slots
const hhmmss = document.querySelectorAll('tt');
// the clock panel
const panel = document.querySelector('center');

// checkboxes in the settings popover
const checks = document.querySelectorAll('input[type=checkbox]');

// preferences
const prefs = {};
prefs.blink = localStorage['prefs-dotdot-blink'] == 'true'

checks.forEach((a)=>{
  a.checked = localStorage[a.id] == 'true';
  a.onchange = (evt)=>{
      localStorage[evt.target.id] = evt.target.checked;
      prefs.blink = evt.target.checked;
//      console.log('prefs-dotdot-blink: ', evt.target.checked);
  }
});

// tick, tock
setInterval(function() {
  const dt = new Date();
  const s = dt.toLocaleTimeString('en-GB');  // 00:00:00
  const [hh, mm, ss] = s.split(':');

  (+ss % 2) ? showDots(true) : showDots(false);

  updateClock([hh,mm,ss]);
}, 500);

// updates the clock time
function updateClock(arr) {
  panel.style.opacity = 1;
  arr.forEach((a,i)=>hhmmss[i].innerText=arr[i])
}

// shows clock separators, if given true;
// otherwise, hides them
function showDots(show) {
  if(prefs.blink) {
    dotdot.forEach((a)=>a.style.opacity=show+0)
  } else {
    dotdot.forEach((a)=>a.style.opacity=1)
  }
}
