<!DOCTYPE html>

<html>

<head>
    <title>ITicket - Switchboard</title>

    <meta name="viewport" content="width=device-width,initial-scale=1.0">

    <!-- Latest compiled and minified CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Latest compiled JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="\..\it\css\switchboardfordb.css" rel="stylesheet">

</head>



<body>

    <main>

        <nav class="navbar navbar-expand  navbar-light rounded-bottom">

            <div class="right container-fluid">
                <div> Welcome, <strong> {{auth()->user()->name}}! </strong> </div>
                <div> <a href="{{ URL::to('/logout') }}">Log out</a> </div>
            </div>
        </nav>
        <article>

            <div class="container-fluid bg-3 text-center ">

                <div class="margin logo">
                    <img src="<?php echo asset('storage/logo_mid_transparent.png') ?>" alt="Logo" class="logoMid" class="img-responsive margin">
                </div>
                <div class="row d-flex  justify-content-between">

                    <div class="col-lg-5 border rounded p-3 ">
                        <h2>User view</h2>
                        <!-- <a href="{{ URL::to('/userplatform') }}"> -->
                        <a href="#">
                            <div class="square"> <i class="fa fa-users" style="font-size: 64px; color: rgb(133, 193, 250);"></i></div>
                        </a>

                    </div>


                    <div class="col-lg-5 border rounded p-3 ">
                        <h2>Ticket Management Platform</h2>
                        <a href="{{ URL::to('/alltickets') }}">

                            <div class="square"> <i class="fa fa-ticket " style="font-size: 64px; color: rgb(133, 193, 250);"></i></div>

                        </a>

                    </div>

                </div>


                <div class="row d-flex justify-content-between">


                    <div class="col-lg-5 border rounded p-3 ">
                        <h2>User Creation Tool</h2>
                        <a href="{{ URL::to('/newuser') }}">

                            <div class="square"> <i class="fa fa-laptop " style="font-size: 64px; color: rgb(133, 193, 250);"></i></div>

                        </a>

                    </div>

                    <div class="col-lg-5 border rounded p-3 ">
                        <h2>User Data Management Tool</h2>
                        <!-- <a href="{{ URL::to('/modifyuser') }}"> -->
                        <a href='#'>
                            <div class="square"> <i class="fa fa-database" style="font-size: 64px; color: rgb(133, 193, 250);"></i></div>

                        </a>

                    </div>

                </div>
            </div>



        </article>
    </main>
</body>

</html>