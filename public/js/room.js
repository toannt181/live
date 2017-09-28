
var tab_id;
var socket = io.connect('http://127.0.0.1:3000/chat');

/** admin join default room to receive event when a new room has been created*/
socket.emit('admin-join-default-room');



$(document).ready(function () {
    /** connect to socket*/

    /**
     * emit to server when click join room
     */
    join_room =  function (room_id) {

        adminData.room_id = room_id;
        console.log(adminData.room_id);
        tab_id = '#' + adminData.room_id;

        /** socket send join event to chat server*/
        socket.emit('admin-join-room', {
            assignee: adminData.assignee,
            room_id: adminData.room_id
        });




    }


    $(document).on('click', '.btn-join-room', function () {
        var room_id = $(this).data('roomid');
        console.log(room_id);

        $(this).parent().prev().html('<i class="fa fa-circle" style="color: #a0d269;"></i> Active');
        $(this).parent().html('');

        join_room(room_id);
    });

    $(document).on('click', '.btn-rejoin-room', function () {
        var room_id = $(this).data('roomid');
        console.log(room_id);

        $(this).parent().html('');

        join_room(room_id);
    });


});