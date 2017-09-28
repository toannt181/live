/**
 * Created by vuong on 03/08/2017.
 */
$('.btn-delete').on('click', function (e) {
    e.preventDefault();
    var id = $(this).data("id");
    $('#delete_form_id').attr("value", id);
    console.log($('#delete_form_id').attr("value"));
});