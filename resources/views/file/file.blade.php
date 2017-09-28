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
                        <h4 class="page-title">File</h4>
                        <div class="col-sm-4" style="float:left">
                        </div>
                        <div class="col-sm-4 pull-right">
                            <form action="/files/adminupload" method="post" enctype="multipart/form-data">
                                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                {{--<input type="file" name="fileToUpload">--}}
                                <div class="form-group col-sm-9">
                                    <input type="file" class="filestyle" data-size="sm" id="fileToUpload" name="fileToUpload" tabindex="-1" style="position: absolute; clip: rect(0px 0px 0px 0px);">
                                </div>
                                <div class="fileupload btn btn-purple waves-effect waves-light">
                                    <span><i class="ion-upload m-r-5"></i>Upload</span>
                                    <input type="submit" class="upload">
                                </div>
                            </form>
                            {{--<a href="#custom-modal" id="btn-add-admin" class="btn btn-default btn-md waves-effect waves-light m-b-30" data-animation="fadein" data-plugin="custommodal" data-overlayspeed="200" data-overlaycolor="#36404a"><i class="md md-add"></i> Upload File</a>--}}
                        </div>
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
                                    <th>Content Type</th>
                                    <th>URL</th>
                                    <th>Uploaded_at</th>
                                    <th>Preview</th>
                                    <th>Action</th>
                                </tr>
                                </thead>


                                <tbody>
                                @foreach($files as $file)
                                <tr>
                                    <td align="center" style="text-align: left; vertical-align: middle">{{$file->id}}</td>
                                    <td align="center" style="text-align: left; vertical-align: middle">{{$file->name}}</td>
                                    <td align="center" style="text-align: left; vertical-align: middle">{{$file->contentType}}</td>
                                    <td align="center" style="text-align: left; vertical-align: middle"><a href="/download?url={{$file->url}}"> {{$file->url}} </a></td>
                                    <td align="center" style="text-align: left; vertical-align: middle">{{$file->uploaded_at}}</td>
                                    <td align="center" style="text-align: center">
                                        <img src="/file?url={{$file->url}}" class="img-rounded" alt="Image" style="width: 100px;height: 100px">
                                    </td>
                                    <td align="center" style="vertical-align: middle">
                                        <a href="#delete-modal" data-overlayspeed="200" data-overlaycolor="#36404a" data-animation="fadein" data-plugin="custommodal" data-id="{{$file->id}}" class="btn btn-default btn-sm waves-effect waves-light btn-delete">
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

            <form role="form" class="form_modal" id="form_admin" method="post" action="/files/adminupload">
                <input type="hidden" name="_token" value="{!! csrf_token() !!}">
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

                <div class="form-group">
                    <label for="position">Password</label>
                    <input type="password" class="form-control" id="password_modal" name="password" placeholder="Enter password">
                </div>

                <div class="form-group">
                    <label for="position">Confirm password</label>
                    <input type="password" class="form-control" id="confirm_password_modal" name="password" placeholder="Confirm password">
                    <span id="warning-message"></span>
                </div>

                <button type="submit" data-from="admin" id="add-admin" class="btn btn-default waves-effect waves-light">Save</button>
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
            <form role="form" class="form_modal" id="deleteForm" method="POST" action="{{route('delete-file')}}">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="id" id="delete_form_id" value="">
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
    <script src="/js/file.js"></script>

@endsection

