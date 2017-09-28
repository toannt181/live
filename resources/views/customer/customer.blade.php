@extends('layouts.master')
@section('content')
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
                            <a href="#custom-modal" id="btn-add-customer" class="btn btn-default btn-md waves-effect waves-light m-b-30" data-animation="fadein" data-plugin="custommodal" data-overlayspeed="200" data-overlaycolor="#36404a"><i class="md md-add"></i> Add Customer</a>
                        </div>

                        <h4 class="page-title">Customer</h4>
                    </div>
                </div>



                <div class="row">
                    <div class="col-sm-12">
                        <div class="card-box table-responsive">
                            <table id="datatable" class="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Started Date</th>
                                    <th>Updated Date</th>
                                    <th>Attended rooms</th>
                                    <th>Sent messages</th>
                                    <th>Action</th>
                                </tr>
                                </thead>

                                <tbody>
                                {{--@foreach($data as $d)--}}
                                    {{--<tr id="{{$d[0]->id}}">--}}
                                        {{--<td id="customer-id">{{$d[0]->id}}</td>--}}
                                        {{--<td>{{$d[0]->name}}</td>--}}
                                        {{--<td>{{$d[0]->phone}}</td>--}}
                                        {{--<td>{{$d[0]->email}}</td>--}}
                                        {{--@if(empty($d[0]->created_at))--}}
                                            {{--<td>NULL</td>--}}
                                        {{--@else--}}
                                            {{--<td>{{$d[0]->created_at->toDateString()}}</td>--}}
                                        {{--@endif--}}
                                        {{--@if(empty($d[0]->updated_at))--}}
                                            {{--<td>NULL</td>--}}
                                        {{--@else--}}
                                            {{--<td>{{$d[0]->updated_at->toDateString()}}</td>--}}
                                        {{--@endif--}}
                                        {{--<td>{{$d[1]}}</td>--}}
                                        {{--<td>{{$d[2]}}</td>--}}
                                        {{--<td>--}}
                                            {{--<a href="#custom-modal" data-id ="{{$d[0]->id}}" data-overlayspeed="200" data-overlaycolor="#36404a" data-animation="fadein" data-plugin="custommodal" class="btn btn-default btn-sm waves-effect waves-light btn-edit">--}}
                                                {{--<i class="fa fa-pencil"></i>--}}
                                            {{--</a>--}}
                                        {{--</td>--}}
                                    {{--</tr>--}}
                                {{--@endforeach--}}
                                {{--<td>--}}
                                {{--<a href="#custom-modal" data-id ="{{$d[0]->id}}" data-overlayspeed="200" data-overlaycolor="#36404a" data-animation="fadein" data-plugin="custommodal" class="btn btn-default btn-sm waves-effect waves-light btn-edit">--}}
                                {{--<i class="fa fa-pencil"></i>--}}
                                {{--</a>--}}
                                {{--</td>--}}
                                </tbody>
                            </table>
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

    <!--Modal-->
    <div id="con-close-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <form role="form" class="form_modal" id="form_edit" method="post" action="/customers/edit?id=">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">Edit</h4>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="id" id="form_id" value="">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="name" class="control-label">Name</label>
                                    <input type="text" class="form-control" id="editName" name="name" placeholder="Enter name">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="email" class="control-label">Email</label>
                                    <input type="email" class="form-control" id="editEmail" name="email" placeholder="Enter email">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="phone">Phone number</label>
                                    <input type="tel" class="form-control" id="editPhone" name="phone" placeholder="Enter phone number">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <span id="messageE"></span>
                        <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-info waves-effect waves-light">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div id="custom-modal" class="modal-demo">
        <button type="button" class="close" onclick="Custombox.close();">
            <span>&times;</span><span class="sr-only">Close</span>
        </button>
        <h4 class="custom-modal-title">Add</h4>
        <div class="custom-modal-text text-left">

            <form role="form" class="form_modal" id="form_admin" method="post" action="/customers/add">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="id" id="form_id" value="">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="form-name" name="name" placeholder="Enter name">
                </div>

                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="form-email" name="email" placeholder="Enter email">
                </div>

                <div class="form-group">
                    <label for="phone">Phone number</label>
                    <input type="tel" class="form-control" id="form-phone" name="phone" placeholder="Enter phone number">
                </div>

                <button type="submit" data-from="admin" id="btn-submit" class="btn btn-default waves-effect waves-light">Save</button>
                <button type="button" class="btn btn-danger waves-effect waves-light m-l-10" onclick="Custombox.close();">Cancel</button>
                <span id="message"></span>
            </form>
        </div>
    </div>

    <!-- ============================================================== -->
    <!-- End Right content here -->
    <!-- ============================================================== -->
@stop

@section('script')
    <script src="/js/customer.js"></script>
@endsection
