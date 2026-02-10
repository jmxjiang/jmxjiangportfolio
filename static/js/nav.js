$(document).keydown(function(event) {
    if (event.key.toLowerCase() === 'a') $('#previous').click();
    else if (event.key.toLowerCase() === 'f' && $('#next').css('display') !== 'none') $('#next').click();
});