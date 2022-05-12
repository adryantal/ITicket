<!DOCTYPE html>

<html>

<head>
    <title>ITicket - Profile of {{$user->name}}</title>
    <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
    <!-- Latest compiled and minified CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Latest compiled JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>
    <link href="\..\it\css\profile.css" rel="stylesheet">

    


</head>

<body>

    <main class="container-sm">


        <nav class="navbar navbar-expand-sm navbar-light rounded-bottom">

            <div class="right container-fluid">
                <div> Welcome, <strong> {{ $user->name}}! </strong> </div>
                <div> <a href="{{ URL::to('/logout') }}">Log out</a> </div>
            </div>
        </nav>
        <article class="bg-slate-100">



                    <div class="logo text-center">
                        <div id="gap"></div>
                        <img src="<?php echo asset('storage/logo_mid_transparent.png') ?>" alt="LogoMid">
                    </div>


                    <div class="m-6 text-center text-lg ">
                    <i class='fas fa-user-circle' style='font-size:60px;color:rgb(133, 193, 250,0.6)'></i>
                    </div>
                  

                    <div class="p-1">
                    <table class="table">
                    <thead>     </thead>
                    <tbody>
                        <tr class="table-active">                       
                        <th scope="row" >Name</th>
                        <td  >{{ $user->name }}</td>                        
                        </tr>
                        <tr >                       
                        <th scope="row" >Active Directory ID</th>
                        <td >{{ $user->ad_id }}</td>                        
                        </tr>
                        <tr class="table-active">                       
                        <th scope="row" >Department</th>
                        <td >{{ $user->department }}</td>                        
                        </tr>
                        <tr >                       
                        <th scope="row" >E-mail</th>
                        <td >{{ $user->email }}</td>                        
                        </tr>
                        <tr class="table-active">                       
                        <th scope="row" >Phone number</th>
                        <td >{{ $user->phone_number }}</td>                        
                        </tr>
                        <tr >                       
                        <th scope="row" >*Resolver (*if deparment is IT)</th>
                        <td >{{ $resolver->name }}</td>                        
                        </tr>
                    </tbody>
                    </table>

                    </div>                  



            <div id='previous' class=" text-center "> <a href="javascript:history.back()">Previous page</a></div>

        </article>


    </main>
</body>

</html>