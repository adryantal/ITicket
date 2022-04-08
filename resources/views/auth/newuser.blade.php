<!DOCTYPE html>

<html>

<head>
    <title>ITicket - Create new user</title>

    <!-- Latest compiled and minified CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Latest compiled JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="\..\it\css\newuser.css" rel="stylesheet">

   
</head>

<body>

    <main>
        <div class="container">

            <nav class="navbar navbar-expand-sm navbar-light rounded-bottom">

                <div class="right container-fluid">
                    <div> Welcome, <strong> {{auth()->user()->name}}! </strong> </div>
                    <div> <a href="{{ URL::to('/logout') }}">Log out</a> </div>
                </div>
            </nav>
         <article class="bg-slate-100"> 


<x-guest-layout  >

    <x-auth-card >
  
      
        <x-slot name="logo">
        <div id="gap"></div>
        <img src="<?php echo asset('storage/logo_mid_transparent.png') ?>" alt="LogoMid">  
        </x-slot>

        <div class="h-full ">
            <div class="m-6 text-center text-lg ">
               <b> Create new user</b>
            </div>
           
                    <div class="p-6" >

                        <!-- Validation Errors -->
                        <x-auth-validation-errors class="mb-4" :errors="$errors" />

                        <form method="POST" action="{{ route('newuser') }}">
                            @csrf

                            <!-- Name -->
                            <div>
                                <x-label for="name" :value="__('Name')" />

                                <x-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus />
                            </div>
                            <br>
                            <!-- AD ID -->
                            <div>
                                <x-label for="ad_id" :value="__('Active Directory ID')" />

                                <x-input id="ad_id" class="block mt-1 w-full" type="text" name="ad_id" :value="old('ad_id')" required autofocus />
                            </div>                         

                            <!-- Phone number -->
                            <div class="mt-4">
                                <x-label for="phone_number" :value="__('Phone number')" />

                                <x-input id="phone_number" class="block mt-1 w-full" type="text" name="phone_number" :value="old('phone_number')" required />
                            </div>

                            <!-- Department -->
                            <div class="mt-4">
                                <x-label for="department" :value="__('Department')" />

                                <x-input id="department" class="block mt-1 w-full" type="text" name="department" :value="old('department')" required />
                            </div>

                          
                            <!-- Resolver team -->
                            <div class="mt-4"  >
                                <x-label for="resolver_id" :value="__('*Resolver (to be filled only if user is part of the IT Department)')" />

                                  
                         
                        <select id="resolver" class="form-select form-select-sm" name="resolver" placeholder="Resolver" >
                                <option >-- Select Resolver --</option>
                             @foreach ($resolvers as $resolver)                   
                                <option value="{{ $resolver->id }}">{{ $resolver->name }}</option>
                                 @endforeach

  

                             </select>  

                                <x-input id="resolver_id" class="block mt-1 w-full" type="text" name="resolver_id" :value="old('resolver_id')"  hidden/>

                                
                            </div>

                           

                            <div class="flex items-center justify-end mt-4">                            

                                <x-button class="ml-4">
                                    {{ __('Submit') }}
                                </x-button>
                            </div>
                        </form>

                    </div>
                
            
        </div>


    </x-auth-card>
</x-guest-layout>

</article>
</body>

</html>