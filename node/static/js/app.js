$(function() {
    function escapeHtml(text) {
        return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
    $("input#text_search").keypress(function(e) {
        if (e.which === 13 || e.keyCode === 13 || e.charCode === 13) {
            e.preventDefault();
            window.location = $(this).attr('data-url') + escapeHtml($(this).val());
        }
    });
    
    $('a.like.notlike').click(function() {
        var obj = $(this);
        var cl = obj.attr("class");
        var id = parseInt(obj.attr("data-id"));
        if(cl === "like notlike" && id > 0) {
            obj.addClass("click");
            var url = $("#frmLike").attr('action') + "/" + id;
            var value = $("#frmLike").serialize();
            $.ajax({
                type: "POST",
                dataType: "json",
                url: url,
                data: value,
                success: function(data) {
                    if(data.result == 1) {
                        obj.removeClass("notlike");
                        obj.next().html(data.like_num);
                    } else if(data.result == 2) {
                        obj.removeClass("notlike");
                    } else if(data.result == 3) {
                        window.location="/dang-nhap";
                    } else {
                        alert(data.msg);
                        //console.log('login');
                    }
                },
                error: function(data) {
                }
            });
        }
    });
    
    $("img.left-lazy").lazyload({
        effect : "fadeIn"
    });
    $("img.right-lazy").lazyload({
        effect : "fadeIn"
    });
});