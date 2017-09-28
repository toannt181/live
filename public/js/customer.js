/**
 * Created by vuong on 25/07/2017.
 */
$(document).ready(function () {
    var table = $('#datatable').dataTable({
        processing:true,
        serverSide: true,
        ajax: '/customers/getroom',
        columnDefs: [{
            "targets": -1,
            "data": null,
            "defaultContent": '<button class="btn btn-primary waves-effect waves-light btn-edit" data-toggle="modal" data-target="#con-close-modal" data-animation="fadein" data-plugin="custommodal" data-overlayspeed="200" data-overlaycolor="#36404a"><i class="fa fa-pencil"></i></button>',
        }],
        columns:[
            {data: 'id', name: 'c.id'},
            {data: 'name', name: 'c.name'},
            {data: 'phone', name: 'c.phone'},
            {data: 'email', name: 'c.email'},
            {data: 'created_at', name: 'c.created_at'},
            {data: 'updated_at', name: 'c.updated_at'},
            {data: 'rooms', name: 'rooms', searchable: false, orderable: false},
            {data: 'sentMessages', name: 'sentMessages', searchable: false, orderable: false},
            {data: 'action', name: 'action', searchable: false, orderable: false},
        ],
    });

    $('tbody').on('click', '.btn-edit', function (e) {
        // console.log("ok");
        //var tr = $(this).closest('tr');
        //console.log(tr);
        var id = $(this).closest('tr').find('td')[0].innerHTML;
        var name = $(this).closest('tr').find('td')[1].innerHTML;
        var phone = $(this).closest('tr').find('td')[2].innerHTML;
        var email = $(this).closest('tr').find('td')[3].innerHTML;
        // console.log(id);
        $('#form_edit').attr("action", "customers/edit?id=" + id);
        $('#editName').val(name);
        $('#editPhone').val(phone);
        $('#editEmail').val(email);
    });

    function resetFormModal() {
        $('#form-name').val('');
        $('#form-email').val('');
        $('#form-phone').val('');
        $('#message').text('');
        $('#warning-message').text('');
    }

    $('#btn-add-customer').on('click', function (e) {
        e.preventDefault();
        resetFormModal();
    });

    $('#form-name, #form-email').on('keyup', function () {
        $('#message').html('');
    });

    /**
     * validate data before submit
     */
    $('#form_edit').submit(function (e) {
        //console.log("Validating form...");
        if ($('#editName').val() === '') {
            $('#messageE').html('Invalid name').css('color', 'red');
            e.preventDefault();
            return;
        } else {
            $('#messageE').html('');
        }

        if ($('#editEmail').val() === '') {
            $('#messageE').html('Invalid email').css('color', 'red');
            e.preventDefault();
            return;
        } else {
            $('#messageE').html('');
        }
    });

    $('#form_admin').submit(function (e) {
        //console.log("Validating form...");
        if ($('#form-name').val() === '') {
            $('#message').html('Invalid name').css('color', 'red');
            e.preventDefault();
            return;
        } else {
            $('#message').html('');
        }

        if ($('#form-email').val() === '') {
            $('#message').html('Invalid email').css('color', 'red');
            e.preventDefault();
            return;
        } else {
            $('#message').html('');
        }
    });
});

