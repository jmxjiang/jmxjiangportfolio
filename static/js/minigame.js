const comp = $(".minigame-computer");
const DISTP = '10px';
const DISTE = '10px';
const MS = 25;
const keysPressed = {};
let compFrameID;

(function compFrame() {
  const width = $(window).width();
  const height = $(window).height();
  const left = parseInt(comp.css('left'));
  const bottom = parseInt(comp.css('bottom'));
  for (const [k, v] of Object.entries(keysPressed)) {
    if (v) {
      switch (k) {
        case 'w':
          if (bottom + 35 <= height) comp.css('bottom', `+=${DISTP}`);
          break;
        case 'a':
          if (left - 10 >= 0) comp.css('left', `-=${DISTP}`);
          break;
        case 's':
          if (bottom - 10 >= 0) comp.css('bottom', `-=${DISTP}`);
          break;
        case 'd':
          if (left + 35 <= width) comp.css('left', `+=${DISTP}`);
          break;
        default: null
      }
    }
  }
  compFrameID = requestAnimationFrame(compFrame);
})();

$(window).on('keydown keyup', e => {
  keysPressed[e.key] = e.type === 'keydown';
});

let counter = 0
setTimeout(() => {
  const interval = setInterval(() => {
    const width = $(window).width();
    const height = $(window).height();
    const enemies = $('.enemies')

    if (counter++ === 2) {
      counter = 0
      const newEnemy = $('<div class="enemy"></div>')
      newEnemy.css('bottom', Math.floor(Math.random() * (height - 10)))
      enemies.append(newEnemy);
    }

    $('.enemy').each(function(idx) {
      const el = $(this);
      const pLeft = parseInt(comp.css('left'));
      const pBottom = parseInt(comp.css('bottom'));
      const eLeft = parseInt(el.css('left'));
      const eBottom = parseInt(el.css('bottom'));

      if ((pLeft >= eLeft - 25 && pLeft <= eLeft + 50) && (pBottom >= eBottom - 25 && pBottom <= eBottom + 10)) {
        clearInterval(interval);
        cancelAnimationFrame(compFrameID);
        $('#continue').show();
        $('.minigame-computer')
        .append(`<img src="/static/imgs/splash.png" alt="yellow splash" width="50" class='splash' style="left:
        ${pLeft-25}px; bottom:${pBottom}px"/>`);
        $('.minigame-computer').removeClass('minigame-computer');
      }

      el.css('left', `+=${DISTE}`)
      if (eLeft >= width) el.remove();
    })
  }, MS);
}, 1000)
