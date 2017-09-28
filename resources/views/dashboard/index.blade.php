@extends('layouts.master')

@section('content')
    <div class="content-page">
        <!-- Start content -->
        <div class="content">
            <div class="container">
                <!-- Page-Title -->
                <div class="row">
                    <form action="/getlink" method="post">
                        <div class="form-group">
                            <input type="text" id="linkAdd" name="link">
                            <input type ="submit" class="btn btn-default btn-success" value="GO">
                        </div>
                    </form>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="page-title">Welcome to Dashboard</h4>
                        <br />
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-4 col-sm-6">
                        <div class="widget-panel widget-style-2 bg-white">
                            <i class="md md-attach-money text-primary"></i>
                            <h2 class="m-0 text-dark counter font-600">{{$countRoom}}</h2>
                            <div class="text-muted m-t-5">Tổng số phòng</div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6">
                        <div class="widget-panel widget-style-2 bg-white">
                            <i class="md md-add-shopping-cart text-pink"></i>
                            <h2 class="m-0 text-dark counter font-600">{{$countAccount}}</h2>
                            <div class="text-muted m-t-5">Account đăng ký</div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6">
                        <div class="widget-panel widget-style-2 bg-white">
                            <i class="md md-store-mall-directory text-info"></i>
                            <h2 id="onlineAdmin" class="m-0 text-dark counter font-600">counting</h2>
                            <div class="text-muted m-t-5">Admin online</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <!-- Transactions -->
                    <div class="col-lg-12">
                        <div class="card-box">
                            <h4 class="m-t-0 m-b-20 header-title"><b>Top phòng chat</b></h4>
                            <table id="datatable-buttons" class="table table-striped table-bordered">
                                <thead class="text-center">
                                <tr>
                                    <th onclick="trSort(0)">STT</th>
                                    <th onclick="trSort(1)">ID Room</th>
                                    <th onclick="trSort(2)">ID Topic</th>
                                    <th onclick="trSort(3)">Status</th>
                                    <th onclick="trSort(4)">Ngày tạo</th>
                                </tr>
                                </thead>
                                <tbody>

                                @foreach($rooms as $key=>$room)
                                    <tr class="item">
                                        <td class="order">{{$key+1}}</td>
                                        <td class="room-id">{{$room->id}}</td>
                                        <td class="room-name">{{$room->topic_id}}</td>
                                        <td class="account-number">{{$room->status}}</td>
                                        <td class="created-at">{{$room->created_at}}</td>
                                    </tr>
                                    @endforeach
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div> <!-- end col -->

                </div> <!-- end row -->

            </div> <!-- container -->

        </div> <!-- content -->

        <footer class="footer text-right">
            © 2016. All rights reserved.
        </footer>

    </div>
@endsection

@section('script')
    <script>
        var adminId = {{Auth::user()->id}};
    </script>
    <script src="/js/dashboard.index.js"></script>
    <script src="/js/socket.io.js"></script>
    <script src="/js/dashboard.socket.js"></script>

@endsection
