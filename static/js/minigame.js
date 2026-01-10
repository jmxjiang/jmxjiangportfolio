(() => {
  const comp = $(".minigame-computer");
  const enemies = $('.enemies');
  const DISTP = '10px';
  const DISTE = '10px';
  const MS = 20;
  const keysPressed = {};
  let compFrameID;
  let on = true;

  (function compFrame() {
    const width = $(window).width();
    const height = $(window).height();
    const left = parseInt(comp.css('left'));
    const bottom = parseInt(comp.css('bottom'));
    for (const [k, v] of Object.entries(keysPressed)) {
      if (v) {
        switch (k.toLowerCase()) {
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
          default: null;
        }
      }
    }
    compFrameID = requestAnimationFrame(compFrame);
  })();

  $(window).on('keydown keyup', e => {
    if (['w', 'a', 's', 'd'].includes(key=e.key.toLowerCase())) keysPressed[key] = e.type === 'keydown';
  });

  const addEnemy = bottom => {
    const enemy = $('<div class="enemy"></div>');
    enemy.css('bottom', bottom);
    enemies.append(enemy);
  }

  setTimeout(() => {
    let start = Date.now();
    let counter = 1
    setInterval(() => {
      const width = $(window).width();
      const height = $(window).height();
      const enemies = $('.enemies');

      if (counter++ % 5 === 0) {
        addEnemy(Math.floor(Math.random() * (height - 10)));
        addEnemy(Math.floor(Math.random() * (height - 10)));
      }

      if (counter === 15) {
        counter = 1;
        addEnemy(Math.floor(Math.random() * 50) + 10);
        addEnemy(height - 10 - Math.floor(Math.random() * 50))
      }

      $('.enemy').each(function(idx) {
        const el = $(this);
        const pLeft = parseInt(comp.css('left'));
        const pBottom = parseInt(comp.css('bottom'));
        const eLeft = parseInt(el.css('left'));
        const eBottom = parseInt(el.css('bottom'));

        let now = Date.now();
        const survived = now - start;
        const minutes = Math.floor(survived / 60000);
        const seconds = Math.floor(survived % 60000 / 1000);
        const milliseconds = survived % 1000;
        const str = `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString
        ().padStart(3, '0')}`;
        $('body > .time').html(str);

        if (on && (pLeft >= eLeft - 25 && pLeft <= eLeft + 50) && (pBottom >= eBottom - 25 && pBottom <= eBottom + 10)) {
          on = false;
          cancelAnimationFrame(compFrameID);
          $('#final').show();
          $('#score').append(survived);
          $('body > .time').hide();
          $('#final > .time').append(str);

          $('.minigame-computer')
          .append(`<img src="/static/imgs/splash.png" alt="yellow splash" width="50" class='splash' style="left:
          ${pLeft-25}px; bottom:${pBottom}px"/>`);
          $('.minigame-computer').removeClass('minigame-computer');
        }

        el.css('left', `+=${DISTE}`);
        if (eLeft >= width) el.remove();
      })
    }, MS);
  }, 1000)
})();
