@extends('layouts.master-login')

@section('content')

    <div class="account-pages"></div>
    <div class="clearfix"></div>
    <div class="wrapper-page">
        <div class=" card-box">
            <div class="panel-heading">

                @if (session('result'))
                    <div class="alert alert-warning">
                        Email or password is incorrect!
                    </div>
                @endif
                <h3 class="text-center"> Sign In to <strong class="text-custom">UBold</strong></h3>
            </div>

            <div class="panel-body">
                <form class="form-horizontal m-t-20" method="post" action="{{route('admin-login')}}">
                {{--<form class="form-horizontal m-t-20" method="post" action="http://local.chat.com/api/login">--}}
                    {{csrf_field()}}

                    <div class="form-group ">
                        <div class="col-xs-12">
                            <input class="form-control" type="text" required="" placeholder="Email" name="email">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-xs-12">
                            <input class="form-control" type="password" required="" placeholder="Password"
                                   name="password">
                        </div>
                    </div>

                    <div class="form-group ">
                        <div class="col-xs-12">
                            <div class="checkbox checkbox-primary">
                                <input id="checkbox-signup" type="checkbox">
                                <label for="checkbox-signup">
                                    Remember me
                                </label>
                            </div>

                        </div>
                    </div>

                    <div class="form-group text-center m-t-40">
                        <div class="col-xs-12">
                            <button class="btn btn-info btn-block text-uppercase waves-effect waves-light"
                                    type="submit">Log In
                            </button>
                        </div>
                    </div>

                    <div class="form-group m-t-30 m-b-0">
                        <div class="col-sm-12">
                            <a href="page-recoverpw.html" class="text-dark"><i class="fa fa-lock m-r-5"></i> Forgot your
                                password?</a>
                        </div>
                    </div>
                </form>

            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 text-center">
                <p>Don't have an account? <a href="page-register.html" class="text-primary m-l-5"><b>Sign Up</b></a></p>

            </div>
        </div>

    </div>

@endsection