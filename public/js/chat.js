

//send message to server

function scrollAUTO() {
    console.log('ok');

    $('body').scrollTop($('body').height());
}

$(document).ready(function () {
    //setInterval( scrollAUTO, 5000);
    scrollAUTO();
    var token = $('meta[name="_token"]').attr('content');
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        jqXHR.setRequestHeader('X-CSRF-Token', token);
    });

    var send_chat = function () {

        ////
        console.log("ajax upload file");
        var file = document.getElementById('file'), $formData = new FormData();
        if (file.files.length > 0) {
            $formData.append('fileToUpload', file.files[0]);
            // console.log($file.size);

            $.ajax({
                url: 'files/upload',
                type: 'POST',
                data: $formData,
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function ($data) {
                    console.log($data.status);
                    console.log($data.type);
                    console.log($data.content);
                    if ($data.status === 0) {
                        console.log('File is wrong!');
                        return;
                    }
                    var msg = $data.content;
                    socket.emit('client-send-message', {
                        name: "Admin",
                        message: {
                            content: $data['content'],
                            type: $data['type']
                        },
                        sender_id: 0,
                        room_id: adminData.room_id
                    });
                    var now = new Date();
                    var blockSelf = '<li class="self">';
                    blockSelf += '<div class="msg">';
                    blockSelf += '<p class="sender"><a href="">' + '</a></p>';
                    blockSelf += '<p><img src="' + msg + '" class="img-rounded" alt="image" style="height: 300px;"></p>';
                    blockSelf += '<time>' + now.getFullYear() + "-" + (now.getMonth().toString().length === 2 ? "" : "0") + now.getMonth() + "-" + (now.getDay().toString().length === 2 ? "" : "0") + now.getDay() + " " + (now.getHours().toString().length === 2 ? "" : "0") + now.getHours() + ":" + (now.getMinutes().toString().length === 2 ? "" : "0") + now.getMinutes() + '</time>';
                    blockSelf += '</div></li>';
                    var contentChat = tab_id + " .chat";
                    $(contentChat).append(blockSelf);

                    /** set new message = 0*/
                    var roomIdHtml = '#room-' + tab_id.substr(1);
                    console.log(roomIdHtml);
                    $(roomIdHtml).find('span').attr('data-message', 0)
                    $(roomIdHtml).find('span').html('');

                    scrollAUTO();
                }
            });
            document.getElementById("file").value = "";
            ///////////////////
        }

        contentMsg = tab_id + ' .chat_message';
        console.log(tab_id);
        console.log(contentMsg);
        var msg = $(contentMsg).val();
        $(contentMsg).val('');
        console.log(msg);
        console.log('send message to room id: ' + adminData.room_id);
        if (msg) {
            socket.emit('client-send-message', {
                name: "Admin",
                message: {content: msg},
                sender_id: 0,
                room_id: adminData.room_id
            });
            var now = new Date();
            var blockSelf = '<li class="self">';
            blockSelf += '<div class="msg">';
            blockSelf += '<p class="sender"><a href="">' + '</a></p>';
            blockSelf += '<p>' + msg + '</p>';
            blockSelf += '<time>' + now.getFullYear() + "-" + (now.getMonth().toString().length === 2 ? "" : "0") + now.getMonth() + "-" + (now.getDay().toString().length === 2 ? "" : "0") + now.getDay() + " " + (now.getHours().toString().length === 2 ? "" : "0") + now.getHours() + ":" + (now.getMinutes().toString().length === 2 ? "" : "0") + now.getMinutes() + '</time>';
            blockSelf += '</div></li>';
            var contentChat = tab_id + " .chat";
            $(contentChat).append(blockSelf);

            /** set new message = 0*/
            var roomIdHtml = '#room-' + tab_id.substr(1);
            console.log(roomIdHtml);
            $(roomIdHtml).find('span').attr('data-message', 0)
            $(roomIdHtml).find('span').html('');

            scrollAUTO();
            $.ajax({
                url: 'http://172.19.100.156:8000/api/islink?url=' + msg,
                dataType: 'json',
                error: function (xhr, status) {
                    console.log(status);
                },
                success: function (data) {
                    console.log(data);
                    if (data.result === true) {
                        var element = '<li class="self">' +
                            '<div class="meta-box msg">' +
                            '<div class="font-weight-bold">' + data.meta.title + '</div>' +
                            '<div>' + data.meta.description + '</div>' +
                            '<img src=' + data.meta.image + '/>' +
                            '</div>' +
                            '</li>';
                        /** append new message */
                        var contentChat = tab_id + " .chat";
                        console.log('append new message from server to ' + contentChat);
                        $(contentChat).append(element);
                        var roomIdHtml = '#room-' + tab_id.substr(1);
                        var message = parseInt($(roomIdHtml).find('span').data('message')) + 1;
                        $(roomIdHtml).find('span').data('message', message);
                        $(roomIdHtml).find('span').html(message);
                        scrollAUTO();
                    }
                }
            });
        }
        else {
            //alert("Please enter a message");
        }
    };

    // var socket = io.connect('http://127.0.0.1:3000/chat');


    // socket.emit('admin-join-room', {
    //     assignee: adminData.assignee,
    //     room_id: adminData.room_id
    // });

    console.log("join room successfully");

    /** server confirm join */
    socket.on('server-confirm-join', function (data) {
        console.log(data.success);
        if(data.success) {
            /** ajax get chat data */
            $.ajax({
                url:'/chat/' + adminData.room_id,
                type: 'get',

                success: function(data){
                    //console.log(data);
                    /** get data from ajax */
                    var room_type = data['room_type'];
                    var messages = data['messages'];
                    var room = data['room'];
                    var customer = $.parseJSON(data['customer']);

                    /** append new tab with name of customer */
                    var tab = '<li class="">\n' +
                        '<a id="room-'+adminData.room_id +'" href="#'+ adminData.room_id +'" data-toggle="tab" aria-expanded="false" class="tab-select">'+ customer.name+
                        '<i class="close-tab btn btn-close fa fa-close"></i><span class="badge badge-xs" data-message="0"></span></a></a>' +
                        '</li>';
                    $('#list-room-chat').append(tab);


                    /** append chat content **/
                    console.log(adminData.room_id);
                    var roomType =
                        '<div class="tab-pane" id='+ adminData.room_id +'>' +
                        '<div class="row">' +
                        '<div>Room Type: ' + room_type + '</div>' +'<button type="button" data-id="'+ adminData.room_id +'" class="btn btn-inverse waves-effect waves-light btn-rating">Require Rating</button>' +
                        '<ol id = "thuanoc" class="chat">';
                    scrollAUTO();
                    var contentChat="";

                    $.each(messages, function (index, value) {
                        console.log(value);
                        /** determine a message of admin or customer*/
                        var selfOther;
                        if(value["sender_id"] != 0) {
                            selfOther = '<li class="other">';
                        }else {
                            selfOther = '<li class="self">';
                        }
                        /** list of messages **/
                        var p = '<img src="' + value["content"] + '" class="img-rounded" alt="image" style="height: 300px;">';
                        //console.log(value["message_type"]);
                        var listMsg =
                            '<div class="msg">' +
                            '<p class="sender">' +
                            '<a href="#">'+ value["sender_name"] +'</a>' +
                            '</p>' +
                            '<p>'+ (value["message_type"] === 103 ? p : value["content"]) +'</p>' +
                            '<time>'+ value["sent_time"] +'</time>' +
                            '</div>' +
                            '</li>';

                        contentChat +=selfOther + listMsg;
                        scrollAUTO();
                    });


                    var inputChat =
                        '</ol>' +
                        '<input class="textarea chat_message" type="text" name="message" id="chat_message" placeholder="Type" />' +
                        '<form id = "form-upload" action="files/upload" method="post" enctype="multipart/form-data">' +
                        '<input type="hidden" name="_token" value="' + token + '">' +
                        '<div class="fileupload btn btn-purple waves-effect waves-light up-file">' +
                        '<span><i class="ion-upload m-r-5"></i>Upload</span>' +
                        '<input type="file" class="upload" id="file" name="fileToUpload">' +
                        '</div>' +
                        '</form>' +
                        '<img class="icon-send" src="/images/send-icon.png" alt="" id="icon-send">' +
                        '</div>' +
                        '</div>';


                    // console.log(roomType + contentChat + inputChat);
                    $('#room-chat').after(roomType + contentChat + inputChat);
                    $('#list-room-chat li:last-child a').click();
                    $(document).on('click', '.tab-select', function () {
                        tab_id = $(this).attr('href');
                        adminData.room_id = tab_id.substr(1);

                        scrollAUTO();
                    });




                },

                error: function (data) {
                    console.log(data);
                    console.log("error");
                }
            });

        } else {
            console.log(data);
            console.log("can't join room");
        }
    });

    /** event when has a new room*/
    socket.on('server-send-inactive-room', function(data) {
        console.log(data);

        var room_id = data.room_id || data.id;
        var topic = data.topic;
        var customer_name = data.customer_name;
        var created_at = data.created_at;
        var new_room =
            '<tr>' +
            '<td>'+ room_id +'</td>' +
            '<td>'+ topic +'</td>' +
            '<td>'+ customer_name +'</td>' +
            '<td>'+ created_at +'</td>' +
            '<td><i class="fa fa-circle"></i> In-active</td>' +
            '<td>' +
            '<a data-roomid='+ room_id +' class="btn btn-default btn-sm waves-effect waves-light btn-join-new-room">Join</a>' +
            '</td>' +
            '</tr>';
        console.log(new_room);
        /** append new room to view*/
        $('#room-list').prepend(new_room);
        /** get number of new room*/
        var numberNewRoom =parseInt( $('#tab-room-chat span').attr('data-numberNewRoom'))+1;
        console.log(numberNewRoom);
        $('#tab-room-chat span').attr('data-numberNewRoom', numberNewRoom);
        $('#tab-room-chat span').html(numberNewRoom);

        scrollAUTO();
    });



    $(document).on('click', '.btn-join-new-room', function () {
        var room_id = $(this).data('roomid');
        $(this).parent().prev().html('<i class="fa fa-circle" style="color: #a0d269;"></i> Active');
        $(this).parent().html('');
        join_room(room_id);
    });


    /**
     * remove tab when click 'x' button
     */
    $(document).on('click', '.close-tab', function () {
        var tab_content_id = $(this).parent().attr('href');

        $(tab_content_id).remove();
        $(this).parent().parent().remove();
        $('#tab-room-chat').click();

    });

    /** event when check new room*/
    $('#tab-room-chat').click(function () {

        $(this).find('span').html('');
    });

    /** event when press Enter button to send message*/
    $(document).on('keypress','#chat_message', function (e) {
        if (e.charCode === 13) {
            send_chat();
            return false;
        }
    });

    /** event when click button to send message*/
    $(document).on('click', '#icon-send', function (e) {
        send_chat();
    });

    /**event when client send message to server*/
    socket.on('server-send-message', function (data) {
        if (data !== null && typeof data !== 'object') {
            data = jQuery.parseJSON(data.data);
        }
        //console.log(data);
        var msg = data.type === 103?'<img src="' + data.message + '" class="img-rounded" alt="image" style="height: 300px;">'
            : data.message;
        /** make new message */
        var now = new Date();
        var block = '<li class="other">';
        block += '<div class="msg">';
        block += '<p class="sender"><a href="">' + data.name + '</a></p>';
        block += '<p>' + msg + '</p>';
        block += '<time>' + now.getFullYear() + "-" + (now.getMonth().toString().length === 2 ? "" : "0") + now.getMonth() + "-" + (now.getDay().toString().length === 2 ? "" : "0") + now.getDay() + " " + (now.getHours().toString().length === 2 ? "" : "0") + now.getHours() + ":" + (now.getMinutes().toString().length === 2 ? "" : "0") + now.getMinutes() + '</time>';
        block += '</div></li>';

        /** append new message */
        var contentChat = tab_id + " .chat";
        console.log('append new message from server to ' + contentChat);
        $(contentChat).append(block);
        var roomIdHtml = '#room-' + tab_id.substr(1);
        var message = parseInt($(roomIdHtml).find('span').data('message')) + 1;
        $(roomIdHtml).find('span').data('message', message);
        $(roomIdHtml).find('span').html(message);
        //
        scrollAUTO();
        $.ajax({
            url: 'http://local.chat.com/api/islink?url=' + data.message,
            dataType: 'json',
            error: function (xhr, status) {
                console.log(status);
            },
            success: function (data) {
                console.log(data);
                if (data.result === true) {
                    var element = '<li class="other">' +
                                    '<div class="meta-box msg">' +
                                        '<div class="font-weight-bold">' + data.meta.title + '</div>' +
                                        '<div>' + data.meta.description + '</div>' +
                                        '<img src=' + data.meta.image + '/>' +
                                    '</div>' +
                                  '</li>';
                    /** append new message */
                    var contentChat = tab_id + " .chat";
                    console.log('append new message from server to ' + contentChat);
                    $(contentChat).append(element);
                    var roomIdHtml = '#room-' + tab_id.substr(1);
                    var message = parseInt($(roomIdHtml).find('span').data('message')) + 1;
                    $(roomIdHtml).find('span').data('message', message);
                    $(roomIdHtml).find('span').html(message);

                    scrollAUTO();
                }
            }
        });
    });

    /** listen when successfully roin to default room*/
    socket.on('server-send-join-default-room',function (result) {
        console.log(result);
    });

    /**
     * require rating
     */
    $(document).on('click', '.btn-rating', function () {
        var room_id = parseInt($(this).data('id'));
        console.log(room_id);
        $(this).attr('disabled', '')
        socket.emit('admin-send-action-rating', {room_id: room_id});
    })

});
