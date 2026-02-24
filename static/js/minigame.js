"use strict";

(() => {
  const comp = $(".minigame-computer");
  const enemies = $('.enemies');
  const ray = $('.ray');
  const laser = $('.laser');
  const keysPressed = {};
  const DISTP = '15px';
  const DISTE = '20px';
  const FRAMERATE = 20;
  const FRAMESPERENEMYSPAWN = 4;
  const ENEMYSPERSPAWN = 1;
  const FRAMESPERBORDERENEMY = 30;
  const STARTDELAY = 1000;
  const RAYFREQ = 3250;
  const RAYINCOMINGTIME = 3000;
  const RAYACTIVEDURATION = 100;
  const LASERFREQ = 4250;
  const LASERINCOMINGTIME = 4000;
  const LASERACTIVEDURATION = 100;
  const WINTIME = 45000;
  const TEXTDELAY = 3000;
  const getIdx = (() => {let idx = 0; return () => idx++})();
  let compFrameID;
  let on = true;
  let victory = false;
  let data;

  (async () => {
    try {
      const response = await fetch('static/dialogue.json');
      data = await response.json();
    } catch (err) {
      console.error(`Error fetching JSON: ${err}`)
      throw err;
    }
  })();

  $('#next').on('click', function () {
    if (data) {
      $('.text').html(data.victory[getIdx()]?.text || 'balo');
    } else {
      $('.text').html('Loading...')
    }
  });

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
    const key = e.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'arrowleft', 'arrowright', 'arrowup', 'arrowdown'].includes(key)) {
      keysPressed[key] = e.type === 'keydown';
    }
  });

  $(window).on('keydown', e => {
    if (e.key.toLowerCase() === 'f' && $('#final').css('display') === 'block') $('#continue').click();
  });


  const addEnemy = bottom => {
    const enemy = $('<div class="enemy"></div>');
    enemy.css('bottom', bottom);
    enemies.append(enemy);
  }

  const dead = (pLeft, pBottom, eLeft, eBottom, rLeft, lBottom, rayw, laserh) => {
    return (laser.hasClass('fired') && pBottom > lBottom - 20 && pBottom < lBottom + laserh)
           || (ray.hasClass('active') && pLeft > rLeft - 20 && pLeft < rLeft + rayw)
           || (pLeft >= eLeft - 25 && pLeft <= eLeft + 50 && pBottom >= eBottom - 25 && pBottom <= eBottom + 10)
  }

  setTimeout(() => {
    let start = Date.now();
    let counter = 1
    setInterval(() => {
      const width = $(window).width();
      const height = $(window).height();
      const rayw = parseInt(ray.css('width'));
      const laserh = parseInt(laser.css('height'));
      const enemies = $('.enemies');

      if (!victory && counter++ % FRAMESPERENEMYSPAWN === 0) {
        for (let i = 0; i < ENEMYSPERSPAWN; i++) {
          addEnemy(Math.floor(Math.random() * (height - 10)));
        }
      }

      if (!victory && counter === FRAMESPERBORDERENEMY) {
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
        const lBottom = parseInt(laser.css('bottom'));

        let now = Date.now();
        const survived = now - start;
        const minutes = Math.floor(survived / 60000);
        const seconds = Math.floor(survived % 60000 / 1000);
        const milliseconds = survived % 1000;
        const str = `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString
        ().padStart(3, '0')}`;
        $('body > .time').html(str);

        if (on && dead(pLeft, pBottom, eLeft, eBottom, rLeft, lBottom, rayw, laserh)) {
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

    const laserInterval = setInterval(() => {
      const height = $(window).height();
      const laserh = parseInt(laser.css('height'));
      const pBottom = parseInt(comp.css('bottom'));
      const shift = pBottom - 0.5*laserh;

      laser.css('bottom', `${shift}px`);
      laser.show();
      setTimeout(() => {
        laser.addClass('fired');
        setTimeout(() => {
          laser.removeClass('fired');
          laser.hide();
        }, LASERACTIVEDURATION);
      }, LASERINCOMINGTIME);
    }, LASERFREQ);

    const rayInterval = setInterval(() => {
      const width = $(window).width();
      const rayw = parseInt(ray.css('width'));
      const pLeft = parseInt(comp.css('left'));
      const shift = pLeft - 1/(Math.floor(Math.random() * 3) + 3) * rayw;
      if (shift + rayw <= width) {
        ray.css('left', `${shift}px`);
      } else {
        ray.css('left', Math.max(pLeft - (rayw / 2), 150));
      }

      ray.show();
      setTimeout(() => {
        ray.addClass('active');
        setTimeout(() => {
          ray.removeClass('active');
          ray.hide();
        }, RAYACTIVEDURATION);
      }, RAYINCOMINGTIME);
    }, RAYFREQ);

    setTimeout(() => {
      if (!on) return;
      clearInterval(rayInterval);
      clearInterval(laserInterval);
      victory = true;
      setTimeout(() => {
        if (!on) return;
        $('.hidden').removeClass('hidden');
      }, TEXTDELAY)
    }, WINTIME)
  }, STARTDELAY);
})();
