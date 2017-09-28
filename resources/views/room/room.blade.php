@extends('layouts.master')
@section('content')
    <link rel="stylesheet" href="/css/chatlog.css">
    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
    <div class="content-page">
        <!-- Start content -->
        <div class="content">
            <div class="container">

                <!-- Page-Title -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="btn-group pull-right m-t-15">


                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-md-12">
                        <div class="panel panel-default">

                            <div class="panel-heading">
                                <h3 class="panel-title">Chat Management</h3>
                            </div>

                            <div class="panel-body">
                                <ul class="nav nav-pills m-b-30" id="list-room-chat">
                                    <li class="active">
                                        <a href="#room-chat" id="tab-room-chat" data-toggle="tab" aria-expanded="true">Room Chat
                                            <span class="badge badge-xs" data-numberNewRoom="0"></span></a>
                                    </li>

                                </ul>

                                <div class="tab-content br-n pn" id="list-tab">
                                    <div id="room-chat" class="tab-pane active">
                                        <div class="row">
                                            <div class="card-box table-responsive">


                                                <table id="datatable" class="table table-striped table-bordered">
                                                    <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Type</th>
                                                        <th>Customer</th>
                                                        <th>Created at</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>


                                                    <tbody id="room-list">
                                                    @foreach($rooms as $room)
                                                        <tr>
                                                            <td>{{$room['id']}}</td>
                                                            <td>{{$room['topic']}}</td>
                                                            <td>{{$room['customerName']}}</td>
                                                            <td>{{$room['created_at']}}</td>
                                                            @if($room['status'] === 1)
                                                                <td><i class="fa fa-circle"></i> In-active</td>
                                                                <td>
                                                                    <a data-roomid={{$room['id']}} class="btn btn-default btn-sm waves-effect waves-light btn-join-room">
                                                                        Join

                                                                    </a>
                                                                </td>
                                                            @else
                                                                <td><i class="fa fa-circle" style="color: #a0d269;"></i> Active</td>
                                                                <td>
                                                                    <a data-roomid={{$room['id']}} class="btn-rejoin-room">
                                                                    Re-join
                                                                    </a>
                                                                </td>
                                                            @endif
                                                        </tr>
                                                    @endforeach
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                    </div>
                </div>



                {{--End row--}}




            </div> <!-- container -->

        </div> <!-- content -->

        <footer class="footer">
            © 2017. All rights reserved.
        </footer>

    </div>
    <!-- ============================================================== -->
    <!-- End Right content here -->
    <!-- ============================================================== -->

@stop
@push('inline_scripts')
    <script type="text/javascript">
        var adminData = {
            assignee: {{Auth::user()->id}},
            room_id: ""
        };
    </script>
    <script src="/js/socket.io.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#datatable').dataTable({
                "order": [[ 5, 'desc' ], [ 3, 'desc' ]]
            });
        });
    </script>
    <script src="js/room.js"></script>
    <script src="js/chat.js"></script>
    @endpush
