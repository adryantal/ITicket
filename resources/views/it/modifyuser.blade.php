<!DOCTYPE html>

<html>

<head>
    <title>ITicket - Modify  user</title>

    <!-- Latest compiled and minified CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
   
    <!-- Latest compiled JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>   
    <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js" integrity="sha256-6XMVI0zB8cRzfZjqKcD01PBsAy3FlDASrlC8SxCpInY=" crossorigin="anonymous"></script> 
    <link href="\..\it\css\modifyuser.css" rel="stylesheet">   
    <script src="it\js\newuser.js"></script>
    <script src='it\js\modifyuser.js'></script>
    <script src='it\js\Ajax.js'></script>
    <meta name="csrf-token" content=<?php $token = csrf_token(); echo $token; ?>>
</head>

    <body>

        <main class="container-sm">


            <nav class="navbar navbar-expand-sm navbar-light rounded-bottom">

                <div class="right container-fluid">
                    <div> Welcome, <strong> {{auth()->user()->name}}! </strong> </div>
                    <div> <a href="{{ URL::to('/logout') }}">Log out</a> </div>
                </div>
            </nav>
             <article class="bg-slate-100">

            
                <x-guest-layout >

                    <x-auth-card>

                        <x-slot name="logo">
                            <div id="gap"></div>
                            <img src="<?php echo asset('storage/logo_mid_transparent.png') ?>" alt="LogoMid">
                        </x-slot>

                     
                        <div class="m-6 text-center text-lg ">
                                <b> Modify user</b>
                        </div>

                        <div class="p-1">

                                <!-- Validation Errors -->
                                <x-auth-validation-errors class="mb-4" :errors="$errors" />

                                <form action="" method="POST" enctype="multipart/form-data">
                                <input type="hidden" name="_method" value="PUT">                                  
                                   

                                    <!-- Name -->
                                    <div>
                                        <x-label for="name" :value="__('Name')" />

                                        <x-input id="name1" class="block mt-1 w-full" type="text" name="name" :value="old('name')" hidden />
                                        <input type="text" class="form-control rounded" id="name" name="name" required>
                                    </div>
                                    <br>
                                    <!-- ID -->
                                    <div>
                                        <x-label for="id" :value="__('ID')" />

                                        <x-input id="id1" class="block mt-1 w-full" type="number" name="id" :value="old('id')" hidden />
                                        <input type="number" class="form-control rounded" id="id" name="id" readonly>
                                    </div>
                                    <br>
                                    <!-- AD ID -->
                                    <div>
                                        <x-label for="ad_id" :value="__('Active Directory ID')" />

                                        <x-input id="ad_id1" class="block mt-1 w-full" type="text" name="ad_id" :value="old('ad_id')" hidden />
                                        <input type="text" class="form-control rounded" id="ad_id" name="ad_id" required>
                                    </div>
                                    <br>
                                     <!-- Status -->
                                     <div>
                                        <x-label for="active" :value="__('Status')" />

                                        <x-input id="active1" class="block mt-1 w-full" type="number" name="active" :value="old('active')" hidden />
                                        <input type="number" class="form-control rounded" id="active" name="active" min="0" max="1" required>
                                    </div>
                                    <br>
                                    <!-- Password -->
                                    <div>
                                        <x-label for="password" :value="__('Password')" />

                                        <x-input id="password1" class="block mt-1 w-full" type="password" name="active" :value="old('active')" hidden />
                                        <input type="password" class="form-control rounded" id="password" name="password" minlength="8" >
                                       
                                    </div>
                                   

                                    <!-- Phone number -->
                                    <div class="mt-4">
                                        <x-label for="phone_number" :value="__('Phone number')" />

                                        <x-input id="phone_number1" class="block mt-1 w-full" type="text" name="phone_number" :value="old('phone_number')" hidden />
                                        <input type="text" class="form-control rounded" id="phone_number" name="phone_number" required>
                                    </div>

                                    <!-- Department -->
                                    <div class="mt-4">
                                        <x-label for="department" :value="__('Department')" />

                                        <x-input id="department1" class="block mt-1 w-full" type="text" name="department1" :value="old('department')" hidden />

                                        <input type="text" class="form-control rounded" id="department" name="department" required>
                                    </div>




                                    <!-- Resolver team -->
                                    <div class="mt-4">
                                        <x-label for="resolver_id" :value="__('*Resolver (to be filled only if user is part of the IT Department)')" />

                                        <select id="resolver" class="form-select form-select-sm" name="resolver"    >
                                            <option value='selection'>-- Select Resolver --</option>
                                            @foreach ($resolvers as $resolver)
                                            <option value="{{ $resolver->id }}">{{ $resolver->name }}</option>
                                            @endforeach
                                        </select>

                                        <x-input id="resolver_id" class="block mt-1 w-full" type="text" name="resolver_id" :value="old('resolver_id')" hidden />


                                    </div>



                                    <div class="submit flex items-center justify-end mt-4">

                                    <input type="button" id='btn-submit' value="SUBMIT">
                                    </div>
                                </form>

                               

                        </div>






                    </x-auth-card>

                </x-guest-layout>
                <div id='previous' class=" text-center "> <a href="{{ URL::to('switchboard/db') }}">Back to Switchboard</a></div>
           
             </article>
        

        </main>
    </body>

</html>