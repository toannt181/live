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
                            <a href="#custom-modal" id="btn-add-topic" class="btn btn-default btn-md waves-effect waves-light m-b-30" data-animation="fadein" data-plugin="custommodal" data-overlayspeed="200" data-overlaycolor="#36404a">
                                <i class="md md-add"></i> Add Topic </a>
                        </div>

                        <h4 class="page-title">Topic</h4>
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

                                    <th>Action</th>
                                </tr>
                                </thead>


                                <tbody>
                                @foreach($topics as $topic)
                                    <tr id="{{$topic->id}}">
                                        <td>{{$topic->id}}</td>
                                        <td>{{$topic->name}}</td>

                                        <td>
                                            <a href="#custom-modal" data-id = "{{$topic->id}}" data-overlayspeed="200" data-overlaycolor="#36404a" data-animation="fadein" data-plugin="custommodal" class="btn btn-default btn-sm waves-effect waves-light btn-edit">
                                                <i class="fa fa-pencil"></i>
                                            </a>

                                            <a href="#delete-modal" data-overlayspeed="200" data-overlaycolor="#36404a" data-animation="fadein" data-plugin="custommodal" data-id="{{$topic->id}}" class="btn btn-default btn-sm waves-effect waves-light btn-delete">
                                                <i class="fa fa-remove"></i>
                                            </a>
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
    <div id="custom-modal" class="modal-demo">
        <button type="button" class="close" onclick="Custombox.close();">
            <span>&times;</span><span class="sr-only">Close</span>
        </button>
        <h4 class="custom-modal-title">Add</h4>
        <div class="custom-modal-text text-left">

            <form role="form" class="form_modal" id="myForm" method="post" action="">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="id" id="form_id" value="">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="form-name" name="name" placeholder="Enter name">
                </div>
                <button type="submit" id="btn-submit" class="btn btn-default waves-effect waves-light">Save</button>
                <button type="button" class="btn btn-danger waves-effect waves-light m-l-10" onclick="Custombox.close();">Cancel</button>
                <span id="message"></span>
            </form>
        </div>
    </div>

    <!-- DELETE Modal -->
    <div id="delete-modal" class="modal-demo">
        <button type="button" class="close" onclick="Custombox.close();">
            <span>&times;</span><span class="sr-only">Close</span>
        </button>
        <h4 class="custom-modal-title">Confirm delete</h4>
        <div class="custom-modal-text text-left">
            <form role="form" class="form_modal" id="deleteForm" method="post" action="">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="id" id="form_id" value="">
                <div class="form-group">
                    <label for="name">Do you really want delete the selected topic</label>
                </div>
                <button type="submit" data-from="admin" id="btn-submit" class="btn btn-default waves-effect waves-light">Yes</button>
                <button type="button" class="btn btn-danger waves-effect waves-light m-l-10" onclick="Custombox.close();">No</button>
            </form>
        </div>
    </div>

    <!-- ============================================================== -->
    <!-- End Right content here -->
    <!-- ============================================================== -->
@stop

@section('script')
    <script src="/js/topic.js"></script>
@endsection
@push('inline_scripts')
<script type="text/javascript">
    $(document).ready(function () {
        $('#datatable').dataTable();
    });
</script>
@endpush


