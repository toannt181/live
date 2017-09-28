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
                        <h4 class="page-title">Admin</h4>
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
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>


                                <tbody>
                                @foreach($admins as $admin)
                                <tr>
                                    <td>{{$admin->id}}</td>
                                    <td>{{$admin->name}}</td>
                                    <td>{{$admin->email}}</td>
                                    <td>
                                        @if($admin->is_super)
                                            <span class="label label-purple">Super</span>
                                        @else
                                            <span class="label label-default">Agent</span>
                                        @endif
                                    </td>
                                    <td>
                                        <button class="btn btn-primary waves-effect waves-light btn-edit" data-toggle="modal" data-target="#con-close-modal"><i class="fa fa-pencil"></i></button>
                                    </td>
                                </tr>
                                    @endforeach
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

    <!-- Modal -->
    <div id="con-close-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <form action="/updatepermission" method="POST">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 id="modal-title" class="modal-title">Edit permission of ???</h4>
                    <input id="admin-id" type="text" hidden name="admin-id" value="">
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="field-1" class="control-label">Type account</label>
                                <input id="result-radio" type="text" name="result-radio" hidden value="">
                                <div class="radio radio-primary">
                                    <input type="radio" name="radio" id="radioAgent">
                                    <label for="radioAgent">
                                        Agent
                                    </label>
                                </div>
                                <div class="radio radio-primary">
                                    <input type="radio" name="radio" id="radioAdmin">
                                    <label for="radioAdmin">
                                        Admin
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <table class="table m-0">
                                <thead>
                                <tr>
                                    <th>
                                        <div class="checkbox checkbox-primary checkbox-single">
                                            <input type="checkbox" id="checkbox-select-all">
                                            <label></label>
                                        </div>
                                    </th>
                                    <th>
                                        <div style="padding-bottom: 15px;">
                                            Topic
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody id="body-modal">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-info waves-effect waves-light">Save changes</button>
                </div>
                </form>
            </div>
        </div>
    </div>

    <!-- ============================================================== -->
    <!-- End Right content here -->
    <!-- ============================================================== -->
@stop

@section('script')
    <script src="/js/setpermission.js"></script>
@endsection
@push('inline_scripts')
<script type="text/javascript">
    $(document).ready(function () {
        $('#datatable').dataTable();
    });
</script>
@endpush

