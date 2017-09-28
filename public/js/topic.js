/**
 * Created by vuong on 25/07/2017.
 */
function resetFormModal() {
    $('#form-name').val('');
}

$('#btn-add-topic').on('click', function (e) {
    e.preventDefault();
    resetFormModal();
});

$('#form-name').on('keyup', function (e) {
    e.preventDefault();
    $('#message').html('');
});

/**
 * validate data before submit
 */
$('.btn-edit').on('click', function (e) {
    var id = $(this).data("id");
    $('.custom-modal-title').text('Edit');
    $('#myForm').attr("action", "topics/edit?id=" + id);

    var name = document.getElementById(id).getElementsByTagName("td")[1].innerHTML;
    console.log(id);
    console.log(name);

    $('#form-name').val(name);
});

$('#myForm').submit(function (e) {
    //console.log("Validating form...");
    if ($('#form-name').val() === '') {
        $('#message').html('Invalid name').css('color', 'red');
        e.preventDefault();
        return;
    } else {
        $('#message').html('');
    }
});

$('.btn-delete').on('click', function (e) {
    var id = $(this).data("id");
    $('#deleteForm').attr("action", "/topics/delete?id=" + id);
})

