@extends('layouts.master')
@section('content')
    <link rel="stylesheet" href="/css/chatlog.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/bootstrap.min.scss">

    <div class="content-page">
        <!-- Start content -->
        <div class="tab-pane">
            <div class="content-page">
            <div class="row">
                <div>Room Type: {{$room_type}}</div>
                {{--content chat--}}
                <div>
                    <ol class="chat" id="chat">
                        @foreach($messages as $message)
                            @if($message['sender_id'] !== 0)
                                <li class="other">
                            @else
                                <li class="self">
                                    @endif
                                    <div class="msg">
                                        <p class="sender"><a
                                                    href="customer/{{$message['sender_id']}}">{{$message['sender_name']}}</a>
                                        </p>
                                        <p>{{$message['content']}}</p>
                                        <time>{{$message['sent_time']}}</time>
                                    </div>
                                </li>
                                @endforeach
                    </ol>

                    {{--end content chat --}}

                    <input class="textarea" type="text" name="message" placeholder="Type here!" id="chat_message"/>
                    <img class="icon-send" src="/images/send-icon.png" id="icon-send" alt="">
                </div>

            </div>
        </div>


        <div class="box-info">
            <h4 id="box-info">Customer info</h4>
            <ul>
                <li>
                    <p>
                        <b>Name: </b>
                        {{$customer->name}}
                    </p>
                </li>
                <li>
                    <p>
                        <b>Phone: </b>
                        <a href="#">{{$customer->phone}}</a>
                    </p>
                </li>
                <li>
                    <p>
                        <b>Email: </b>
                        <a href="#">{{$customer->email}}</a>
                    </p>
                </li>
            </ul>
        </div>

    </div>
    <!-- ============================================================== -->
    <!-- End Right content here -->
    <!-- ============================================================== -->

@stop
@push('inline_scripts')
    <script src="/js/socket.io.js"></script>
    <script src="/js/jquery-migrate-3.0.0.min.js"></script>
    <script src="/js/scrollyeah.js"></script>
    <script src="/js/chat.js"></script>
    <script type="text/javascript">
        var adminData = {
            assignee: {{Auth::user()->id}},
            room_id: {{$room->id}}
        };

        //send message to server


        $(document).ready(function () {

            var send_chat = function () {
                var msg = $('#chat_message').val();
                $('#chat_message').val('');
                console.log(msg);
                if (msg) {

                    socket.emit('client-send-message', {
                        name: "Admin",
                        message: msg,
                        sender_id: 0,
                        room_id: adminData.room_id
                    });

                    var blockSelf = '<li class="self">';
                    blockSelf += '<div class="msg">';
                    blockSelf += '<p class="sender"><a href="">' + '</a></p>';
                    blockSelf += '<p>' + msg + '</p>';
                    blockSelf += '<time>' + '20:10' + '</time>';
                    blockSelf += '</div></li>';
                    $("#chat").append(blockSelf);
                }
                else {
                    alert("Please enter a message");
                }
            };

            var socket = io.connect('http://127.0.0.1:3000/chat');


            socket.emit('admin-join-room', {
                assignee: adminData.assignee,
                room_id: adminData.room_id
            });

            console.log("join room successfully");

            socket.on('server-confirm-join', function (data) {
                console.log(data)
            });


            $('#chat_message').keypress(function (e) {

                if (e.charCode === 13) {
                    send_chat();
                    return false;
                }


            });

            $('#box-info').click(function() {
                $(this).parent().find('ul').slideToggle();
            });

            $('#icon-send').click(function () {
                send_chat();
            });

            socket.on('server-send-message', function (data) {

                if (data !== null && typeof data !== 'object') {
                    data = jQuery.parseJSON(data);
                }


                var block = '<li class="other">';
                block += '<div class="msg">';
                block += '<p class="sender"><a href="">' + data.name + '</a></p>';
                block += '<p>' + data.message + '</p>';
                block += '<time>' + '20:10' + '</time>';
                block += '</div></li>';

                $("#chat").append(block);

            });

        });


    </script>
@endpush