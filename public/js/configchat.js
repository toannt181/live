// $(document).ready(function () {
//     var table = $('#datatable').dataTable({
//         "searching": false,
//         "ordering": false,
//         "lengthMenu": [ 5, 10, 20 ],
//         "language": {
//             "info": "_PAGE_ / _PAGES_",
//         },
//         "columns": [
//             { "width": "10%" },
//             { "width": "10%" },
//             null,
//             { "width": "10%" },
//         ]
//
//     });
//     $('.btn-add-topic').on('click',function (e) {
//         console.log(table);
//         console.log(1);
//
//     });
//     $('.btn-edit').on('click', function (e) {
//
//     });
//
//     $('.btn-delete').on('click', function (e) {
//         $(this).parent().parent().remove();
//     });
function standardized(topic) {
    var res = topic.toLowerCase();
    res = res.substr(0, 1).toUpperCase() + res.substr(1);
    return res;
}

// });
$(document).ready(function () {


    $('#add-row-topic').on('click', function (event) {
        console.log("dsad");
        var block = '<li>'+
            '<input type="text" placeholder="Type topic here" name="topic" value=""> '+
            '<button class="btn btn-primary delete-row-topic"><i class="fa fa-remove"></i></button>'+
            '</li>';
        $('#list-topics').append(block);
    });

    $(document).on('click', '.delete-row-topic', function() {
        $(this).parent().remove();

    });
    $('#btn-copy-link').on('click', function (e) {

        try {
            let $temp = $("<input>");
            let s = $('#link').val();
            $("body").append($temp);
            $temp.val(s).select();
            document.execCommand("copy");
            $temp.remove();
            console.log('Copied to clipboard');
        } catch (ex){
            console.log("Can't copy to clipboard");
        }
    });

    $('#btn-send').on('click',function(e){
       // console.log("Okbcs");
        var res = {"registers": [], "topics":[]};

        $("input:checkbox[name=checkbox]:checked").each(function(){
            var name = $(this).attr("id");
            // console.log(id);
            var comment = $(this).data('comment');



            var obj = {};
            obj[name] = comment;
            res.registers.push(obj);


        });


        $("input:text[name=topic]").each(function(){
            var topic = $(this).val().trim();
            if (topic !== '') res.topics.push(standardized(topic));
        });


        if (res.registers.length == 0) {
            alert("Chưa chọn trường!");
            return;
        }
        console.log(JSON.stringify(res));
        $('#link').val('Waiting...');
        $.ajax({
            url: 'getBundle',
            type: 'post',
            data: res,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $('#link').val(data.url);
            },
            error: function (err) {
                console.log("Loi r", err);
            }
        })
        // console.log("end");
    });

});