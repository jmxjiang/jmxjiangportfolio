$(document).keydown(function(event) {
    if (event.key.toLowerCase() === 'a') $('#previous').click();
    else if (event.key.toLowerCase() === 'd') $('#next').click();
});