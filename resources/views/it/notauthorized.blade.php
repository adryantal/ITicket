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
    <link href="\..\it\css\notauthorized.css" rel="stylesheet">
</head>

<body>

    <main>
        <div class="container">


            <article>

                <div class="container-fluid bg-3 text-center">

                    <div class="margin logo"><img src="<?php echo asset('storage/logo_mid_transparent.png') ?>" alt="Logo" class="logoMid" class="img-responsive margin"></div>
                    <div class=" row justify-content-center">
                    
                        <div class="col-sm-5 border rounded">
                           
                            <h2>Unauthorized content</h2>                            

                                <div class="square"> <i class="fas fa-exclamation" style="font-size: 64px; color: red;"></i></div> 
                                
                                <div id="message"><p>For further details please contact your administrator or call your  Helpdesk.</p></div>

                        </div>
                        
                    </div>
                    
                </div>

               
            </article>
            <div class="container-fluid bg-3 text-center"> <a href="javascript:history.back()">Back to previous page</a></div>
    </main>
</body>

</html>