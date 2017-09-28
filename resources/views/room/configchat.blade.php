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
                    <div class="col-sm-6">

                        <h4 class="page-title">Config Chat</h4>
                    </div>


                </div>


                <div class="row">
                    <div class="col-lg-6">
                        <div class="card-box">
                            <h4 class="m-t-0 m-b-30 header-title"><b>Fields</b></h4>
{{--                            {{dd($registers[0]->COLUMN_NAME)}}--}}
                            @foreach($registers as $register)

                            <div class="checkbox checkbox-custom checkbox-circle">
                                <input type="checkbox" name="checkbox" data-comment={{$register->COLUMN_COMMENT}} value={{$register->COLUMN_NAME}} id={{$register->COLUMN_NAME}}>
                                <label for={{$register->COLUMN_NAME}}>
                                    {{$register->COLUMN_COMMENT}}
                                </label>
                            </div>
                                @endforeach
                        </div>
                    </div>



                    <div class="col-lg-6">
                        <div class="card-box">
                            <h4 class="m-t-0 m-b-30 header-title"><b>Topic</b></h4>
                            <ul id="list-topics" style="list-style: none;">
                                @foreach($topics as $topic)
                                <li>
                                    <input type="text" placeholder="Type topic here" name="topic" value={{$topic->name}}>
                                    <button class="btn btn-primary delete-row-topic"><i class="fa fa-remove"></i></button>
                                </li>
                                @endforeach
                            </ul>
                            <button class="btn btn-primary" id="add-row-topic"><i class="fa fa-plus"></i></button>


                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <div class="input-group m-t-10">
                            <input type="text" id="link" disabled name="example-input2-group1" class="form-control">
                            <span style="background: greenyellow" id="btn-copy-link" class="btn input-group-addon" data-toggle="tooltip" title="Copy this link"><i class="fa fa-copy"></i></span>
                        </div>
                        <br>
                        <div class="col-sm-offset-5">
                            <button id="btn-send" type="button" class="btn btn-purple waves-effect waves-light w-sm">Send</button>
                        </div>
                    </div>
                </div>



            </div> <!-- container -->

        </div> <!-- content -->

        <footer class="footer">
            © 2016. All rights reserved.
        </footer>

    </div>
    <!-- ============================================================== -->
    <!-- End Right content here -->
    <!-- ============================================================== -->

@stop

@push('inline_scripts')
    <script src="/js/configchat.js">

    </script>
    @endpush
