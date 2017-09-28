/**
 * Created by vuong on 25/07/2017.
 */
$('#btn-edit').on('click', function (e) {
    e.preventDefault();
    var isDisable = $('#form-name').prop("disabled");
    //console.log(isDisable);
    if (isDisable) {
        $('#form-name').prop("disabled", false);
        $('#form-phone').prop("disabled", false);
        $('#form-email').prop("disabled", false);
        $('#form-password').val('');
        $('#form-password').prop("disabled", false);
        $('#btn-save').prop("disabled", false);
        $('#btn-edit').text('Cancel');
    } else {
        $('#form-name').prop("disabled", true);
        $('#form-phone').prop("disabled", true);
        $('#form-email').prop("disabled", true);
        $('#form-password').val('Khong xem dc dau');
        $('#form-password').prop("disabled", true);
        $('#btn-save').prop("disabled", true);
        $('#btn-edit').text('Change');
    }
});

$('#form-name, #form-email, #form-password').on('keyup', function () {
    $('#message').html('');
})

$('#myForm').submit(function (e) {
    console.log("Validating form...");
    let name = $('#form-name').val().trim();
    let email = $('#form-email').val().trim();
    let pass = $('#form-password').val().trim();

    if (name === '') {
        $('#message').html('Invalid name').css('color', 'red');
        e.preventDefault();
        return;
    } else {
        $('#message').html('');
    }

    if (email === '') {
        $('#message').html('Invalid email').css('color', 'red');
        e.preventDefault();
        return;
    } else {
        $('#message').html('');
    }

    $('#form-name').val(name);
    $('#form-email').val(email);
    $('#form-password').val(pass);
});