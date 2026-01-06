sessionStorage.setItem('n-balls', Math.min(parseInt(sessionStorage.getItem('n-balls')) + 1, 25) || 1)

const rPos = () => `${Math.ceil(Math.random() * -500 + 250)}px`;
const setRDist = (dx, dy) => {
  sessionStorage.setItem(dx, Math.ceil(Math.random() * 5) + 5);
  sessionStorage.setItem(dy, Math.ceil(Math.random() * 5) + 5);
};

for (let i = 0; i < sessionStorage.getItem('n-balls'); i++) {
  $('#balls').append('<div class="ball"></div>');
}

$('.ball').each(function(idx) {
  $(this).css('left', sessionStorage.getItem(`left${idx}`) ?? rPos());
  $(this).css('bottom', sessionStorage.getItem(`bottom${idx}`) ?? rPos());
  sessionStorage.setItem(`dx${idx}`, sessionStorage.getItem(`dx${idx}`) ?? 10);
  sessionStorage.setItem(`dy${idx}`, sessionStorage.getItem(`dy${idx}`) ?? 10);
})

setInterval(() => {
    $('.ball').each(function(idx) {
        const width = $(window).width();
        const height = $(window).height();
        const left = parseInt(sessionStorage.getItem(`left${idx}`)) ?? $('.ball').css('left');
        const bottom = parseInt(sessionStorage.getItem(`bottom${idx}`)) ?? $('.ball').css('bottom');
        const dx = `dx${idx}`;
        const dy = `dy${idx}`;

        let horizontal = sessionStorage.getItem(`horizontal${idx}`) ?? '+';
        let vertical = sessionStorage.getItem(`vertical${idx}`) ?? '-';

        if (left >= width) {
            horizontal = '-';
            sessionStorage.setItem(`horizontal${idx}`, '-');
            setRDist(dx, dy);
        } else if (left <= 0) {
            horizontal = '+';
            sessionStorage.setItem(`horizontal${idx}`, '+');
            setRDist(dx, dy);
        }

        if (bottom >= height) {
            vertical = '-';
            sessionStorage.setItem(`vertical${idx}`, '-');
            setRDist(dx, dy);
        } else if (bottom <= 0) {
            vertical = '+';
            sessionStorage.setItem(`vertical${idx}`, '+');
            setRDist(dx, dy);
        }

        $(this).css('left', `${horizontal}=${sessionStorage.getItem(dx)}`);
        $(this).css('bottom', `${vertical}=${sessionStorage.getItem(dy)}`);
        sessionStorage.setItem(`left${idx}`, $(this).css('left'))
        sessionStorage.setItem(`bottom${idx}`, $(this).css('bottom'))
    });
}, 25);
