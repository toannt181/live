function resetFormModal() {
    $('#modal-title').text("Edit permission for:     ");
    $('#radioAdmin').prop('checked', false);
    $('#radioAgent').prop('checked', false);
    $('#admin-id').val('');
    $('#result-radio').val('');
}

$('#checkbox-select-all').change(function () {
    var checkboxes = $('#body-modal').find(':checkbox');
    if($(this).is(':checked')) {
        checkboxes.prop('checked', true);
    } else {
        checkboxes.prop('checked', false);
    }
});

$('.btn-edit').on('click', function () {
    resetFormModal();

    let row = $(this).closest('tr');
    let tds = row.children('td');
    //console.log(tds);
    let name = tds[1].innerHTML;
    let id = tds[0].innerHTML;
    let isSuper = tds[3].innerText;
    // console.log(isSuper);
    // console.log(name);
    // console.log(id);
    $('#modal-title').text("Edit permission for:     " + name);
    $('#admin-id').val(id);
    //console.log(isSuper === 'Super')
    if (isSuper === 'Super') {
        $('#radioAdmin').prop('checked', true);
        $('#result-radio').val('Admin');
    } else {
        $('#radioAgent').prop('checked', true);
        $('#result-radio').val('Agent');
    }

    function getTopic() {
        $('#body-modal').empty();
        $.ajax({
            url: '/api/gettopicofadmin?id=' + id,
            cache: false,
            dataType: 'json',
            success: function (data) {
                //console.log(data);
                $.each(data, function (index, val) {
                    //console.log(index, val);
                    let isChecked = false;

                    //console.log(val.ahtid, id, val.ahtid == id);
                    if (val.ahtid !== null) isChecked = true;

                    let newRow = '<tr id="row-topic-' + val.id + '" > ' +
                                    '<td> '+
                                        '<div class="checkbox checkbox-primary checkbox-single"> ' +
                                            '<input type="checkbox" ' + (isChecked ? 'checked' : '') + ' id="' + val.id + '" name="checkbox-' + val.id + '"> ' +
                                            '<label></label> '+
                                        '</div> '+
                                    '</td> '+
                                    '<td> '+
                                        '<div> '+
                                            '<label style="padding-top: 10px;cursor: pointer;" for="' + val.id + '">' + val.name + '</label> '+
                                        '</div> '+
                                    '</td> '+
                                '</tr> ';
                    $('#body-modal').append(newRow);
                })

            }
        })
    }

    getTopic();
});

$('#radioAgent').on('click', function () {
    $('#result-radio').val('Agent');
    //console.log($('#result-radio').val());
});

$('#radioAdmin').on('click', function () {
    $('#result-radio').val('Admin');
    //console.log($('#result-radio').val());
});