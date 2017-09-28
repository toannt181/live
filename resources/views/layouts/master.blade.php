<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="_token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A fully featured admin theme which can be used to build CRM, CMS, etc.">
    <meta name="author" content="Coderthemes">

    <link rel="shortcut icon" href="/vendor/light/assets/images/favicon_1.ico">

    <title>Ubold - Responsive Admin Dashboard Template</title>

    <!-- DataTables -->
    <link href="/vendor/light/assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css"/>
    <link href="/vendor/light/assets/plugins/datatables/buttons.bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="/vendor/light/assets/plugins/datatables/fixedHeader.bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="/vendor/light/assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="/vendor/light/assets/plugins/datatables/scroller.bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="/vendor/light/assets/plugins/datatables/dataTables.colVis.css" rel="stylesheet" type="text/css"/>
    <link href="/vendor/light/assets/plugins/datatables/dataTables.bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="/vendor/light/assets/plugins/datatables/fixedColumns.dataTables.min.css" rel="stylesheet" type="text/css"/>
    <link href="/vendor/light/assets/plugins/custombox/css/custombox.css" rel="stylesheet">

    <link href="/vendor/light/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="/vendor/light/assets/css/core.css" rel="stylesheet" type="text/css"/>
    <link href="/vendor/light/assets/css/components.css" rel="stylesheet" type="text/css"/>
    <link href="/vendor/light/assets/css/icons.css" rel="stylesheet" type="text/css"/>
    <link href="/vendor/light/assets/css/pages.css" rel="stylesheet" type="text/css"/>
    <link href="/vendor/light/assets/css/responsive.css" rel="stylesheet" type="text/css"/>

    <!-- HTML5 Shiv and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->

    <script src="/vendor/light/assets/js/modernizr.min.js"></script>
    {{--<link href="/vendor/light/assets/plugins/bootstrap-select/css/bootstrap-select.min.css" rel="stylesheet" type="text/css"/>--}}

</head>

<body class="fixed-left">

<!-- Begin page -->
<div id="wrapper">
@include('layouts.header')
@include('layouts.leftbar')

@yield('content')
<span id="alert"></span>
</div>
<!-- END wrapper -->

<script>
    var resizefunc = [];
</script>
<script src="js/dist/client.js"></script>
<!-- jQuery  -->

<script src="/vendor/light/assets/js/jquery.min.js"></script>
<script src="/vendor/light/assets/js/bootstrap.min.js"></script>
<script src="/vendor/light/assets/js/detect.js"></script>
<script src="/vendor/light/assets/js/fastclick.js"></script>
<script src="/vendor/light/assets/js/jquery.slimscroll.js"></script>
<script src="/vendor/light/assets/js/jquery.blockUI.js"></script>
<script src="/vendor/light/assets/js/waves.js"></script>
<script src="/vendor/light/assets/js/wow.min.js"></script>
<script src="/vendor/light/assets/js/jquery.nicescroll.js"></script>
<script src="/vendor/light/assets/js/jquery.scrollTo.min.js"></script>


<script src="/vendor/light/assets/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="/vendor/light/assets/plugins/datatables/dataTables.bootstrap.js"></script>

<script src="/vendor/light/assets/plugins/datatables/dataTables.buttons.min.js"></script>
<script src="/vendor/light/assets/plugins/datatables/buttons.bootstrap.min.js"></script>
<script src="/vendor/light/assets/plugins/datatables/jszip.min.js"></script>
<script src="/vendor/light/assets/plugins/datatables/pdfmake.min.js"></script>
<script src="/vendor/light/assets/plugins/datatables/vfs_fonts.js"></script>
<script src="/vendor/light/assets/plugins/datatables/buttons.html5.min.js"></script>
<script src="/vendor/light/assets/plugins/datatables/buttons.print.min.js"></script>
<script src="/vendor/light/assets/plugins/datatables/dataTables.fixedHeader.min.js"></script>
<script src="/vendor/light/assets/plugins/datatables/dataTables.keyTable.min.js"></script>
<script src="/vendor/light/assets/plugins/datatables/dataTables.responsive.min.js"></script>
<script src="/vendor/light/assets/plugins/datatables/responsive.bootstrap.min.js"></script>
<script src="/vendor/light/assets/plugins/datatables/dataTables.scroller.min.js"></script>
<script src="/vendor/light/assets/plugins/datatables/dataTables.colVis.js"></script>
<script src="/vendor/light/assets/plugins/datatables/dataTables.fixedColumns.min.js"></script>
<script src="/vendor/light/assets/plugins/bootstrap-filestyle/js/bootstrap-filestyle.min.js" type="text/javascript"></script>

<script src="/vendor/light/assets/pages/datatables.init.js"></script>
{{--<script type="text/javascript" src="/vendor/light/assets/pages/jquery.form-advanced.init.js"></script>--}}
<script src="/vendor/light/assets/plugins/bootstrap-filestyle/js/bootstrap-filestyle.min.js" type="text/javascript"></script>
<!-- Modal-Effect -->
<script src="/vendor/light/assets/plugins/custombox/js/custombox.min.js"></script>
<script src="/vendor/light/assets/plugins/custombox/js/legacy.min.js"></script>

<script src="/vendor/light/assets/js/jquery.core.js"></script>
<script src="/vendor/light/assets/js/jquery.app.js"></script>

<script src="/vendor/light/assets/plugins/notifyjs/js/notify.js"></script>
<script src="/vendor/light/assets/plugins/notifications/notify-metro.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
{{--<script src="/vendor/light/assets/plugins/bootstrap-select/js/bootstrap-select.min.js" type="text/javascript"></script>--}}


<script type="text/javascript">


    @if (Session::has('notification'))


        var r = $('<a id="alert-noti" ' +
            'onclick="$.Notification.autoHideNotify(\'{{Session::get('notification.alert-type')}}\', \'top right\', \'{{Session::get('notification.title')}}\',\'{{Session::get('notification.message')}}\')"/>');

        $("#alert").append(r);
        $("#alert-noti").click();
    @endif


</script>

@stack('inline_scripts')


@yield('script')

</body>
</html>