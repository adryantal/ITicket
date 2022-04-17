<!DOCTYPE html>

<html>

<head>
    <title>ITicket - Switchboard</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">

    <!-- Latest compiled and minified CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Latest compiled JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
    <link href="\..\it\css\loggedout.css" rel="stylesheet">
</head>

<body>

    <main>
        <div class="container">


            <article>

                <div class="container-fluid bg-3 text-center justify-content-center">

                    <div class="logo row justify-content-center"><img src="<?php echo asset('storage/logo_mid_transparent.png') ?>" alt="Logo" class="logoMid img-responsive margin"></div>
                    <div class=" row justify-content-center">
                    <p>You have been logged out.</p>
                        <div class="col-sm-5 border rounded">
                           
                            <h2>Log back in</h2>
                            <a href="login">

                                <div class="square"> <i class="fas fa-laptop" style="font-size: 64px; color: rgb(133, 193, 250);"></i></div>
                            </a>

                        </div>

                    </div>
                </div>


            </article>
    </main>
</body>

</html>