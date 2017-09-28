@extends('layouts.master')
@section('content')
    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
    <div class="content-page">
        <!-- Start content -->
        <div class="content">

            <div class="wraper container">

                <!-- Page-Title -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="btn-group pull-right m-t-15">
                            <ul class="dropdown-menu drop-menu-right" role="menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li class="divider"></li>
                                <li><a href="#">Separated link</a></li>
                            </ul>
                        </div>

                        <h4 class="page-title">Profile</h4>
                    </div>
                </div>

                <div class="row" style="text-align: center" >
                    <div class="col-md-8 col-md-offset-2">
                        <div class="profile-detail card-box">
                            <div>
                                <img src="/images/avatar-default.png" width="" class="img-circle" alt="profile-image">

                                <hr>
                                <h4 class="text-uppercase font-600">About Me</h4>

                                <form class="form-horizontal" id="myForm" method="post" role="form" style="padding-left: 20%" action="/admin/profile/update?id={{$admin->id}}">
                                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                    <div class="form-group">
                                        <label class="col-md-2 control-label">Name</label>
                                        <div class="col-md-6">
                                            <input type="text" required id="form-name" name="name" disabled class="form-control" value="{{$admin->name}}">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-md-2 control-label" for="example-email">Email</label>
                                        <div class="col-md-6">
                                            <input type="email" required disabled id="form-email" name="email" class="form-control" value="{{$admin->email}}">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-md-2 control-label">Phone</label>
                                        <div class="col-md-6">
                                            <input type="text" id = "form-phone" disabled name="phone" class="form-control" value="{{$admin->phone}}">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-md-2 control-label">Password</label>
                                        <div class="col-md-6">
                                            <input type="password" disabled id = "form-password" name="password"class="form-control" value="Khong xem dc dau">
                                        </div>
                                    </div>

                                    <button type="button" id="btn-edit" class="btn btn-default waves-effect waves-light">Change</button>
                                    <button type="submit" id="btn-save" disabled class="btn btn-default waves-effect waves-light">Save</button>
                                    <span id="message"></span>
                                </form>

                            </div>

                        </div>
                    </div>

                </div>



            </div> <!-- container -->

        </div> <!-- content -->

        <footer class="footer">
            2016 © Ubold. Design by Coderthemes
        </footer>

    </div>
    <!-- ============================================================== -->
    <!-- End Right content here -->
    <!-- ============================================================== -->
@stop

@section('script')
    <script src="/js/profile.js"></script>
@endsection