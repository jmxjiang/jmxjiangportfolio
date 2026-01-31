(() => {
  const comp = $(".minigame-computer");
  const enemies = $('.enemies');
  const ray = $('.ray');
  const keysPressed = {};
  const DISTP = '10px';
  const DISTE = '10px';
  const FRAMERATE = 20;
  const FRAMESPERENEMYSPAWN = 3;
  const ENEMYSPERSPAWN = 1;
  const FRAMESPERBORDERENEMY = 30;
  const STARTDELAY = 1000;
  const RAYFREQ = 3250;
  const INCOMINGTIME = 3000;
  const ACTIVEDURATION = 100;
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
          case 'arrowup':
            if (bottom + 35 <= height) comp.css('bottom', `+=${DISTP}`);
            break;
          case 'a':
          case 'arrowleft':
            if (left - 10 >= 0) comp.css('left', `-=${DISTP}`);
            break;
          case 's':
          case 'arrowdown':
            if (bottom - 10 >= 0) comp.css('bottom', `-=${DISTP}`);
            break;
          case 'd':
          case 'arrowright':
            if (left + 35 <= width) comp.css('left', `+=${DISTP}`);
            break;
          default: null;
        }
      }
    }
    compFrameID = requestAnimationFrame(compFrame);
  })();

  $(window).on('keydown keyup', e => {
    if (['w', 'a', 's', 'd', 'arrowleft', 'arrowright', 'arrowup', 'arrowdown'].includes(key=e.key.toLowerCase())) {
      keysPressed[key] = e.type === 'keydown';
    }
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
      const rayw = parseInt(ray.css('width'));
      const enemies = $('.enemies');

      if (counter++ % FRAMESPERENEMYSPAWN === 0) {
        for (let i = 0; i < ENEMYSPERSPAWN; i++) {
          addEnemy(Math.floor(Math.random() * (height - 10)));
        }
      }

      if (counter === FRAMESPERBORDERENEMY) {
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
        const rLeft = parseInt(ray.css('left'));

        let now = Date.now();
        const survived = now - start;
        const minutes = Math.floor(survived / 60000);
        const seconds = Math.floor(survived % 60000 / 1000);
        const milliseconds = survived % 1000;
        const str = `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString
        ().padStart(3, '0')}`;
        $('body > .time').html(str);

        if (on && ((ray.hasClass('active') && pLeft > rLeft - 20 && pLeft < rLeft + rayw) || (pLeft >= eLeft - 25
        && pLeft <= eLeft + 50 && pBottom >= eBottom - 25 && pBottom <= eBottom + 10))) {
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
    }, FRAMERATE);

    setInterval(() => {
      const width = $(window).width();
      const rayw = parseInt(ray.css('width'));
      const pLeft = parseInt(comp.css('left'));
      const shift = pLeft - 1/(Math.floor(Math.random() * 3) + 3) * rayw;
      if (shift + rayw <= width) {
        ray.css('left', `${shift}px`);
      } else {
        ray.css('left', Math.max(pLeft - (rayw / 2)), 150);
      }

      ray.show();
      setTimeout(() => {
        ray.addClass('active');
        setTimeout(() => {
          ray.removeClass('active');
          ray.hide();
        }, ACTIVEDURATION);
      }, INCOMINGTIME);
    }, RAYFREQ);
  }, STARTDELAY);
})();
