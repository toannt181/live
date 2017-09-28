// var $ = require('jquery');

$(document).ready(function() {
    $('.image-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        }
    });

    $('.btn-join-room').on('click', function (event) {
        console.log("banmsjma");
        console.log("banmsjma");
        console.log("banmsjma");
        console.log("banmsjma");
        console.log("banmsjma");
        console.log("banmsjma");
        console.log("banmsjma");
        // console.log(event.target);
    })
});




