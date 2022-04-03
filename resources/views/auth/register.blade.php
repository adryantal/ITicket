

<x-guest-layout  >


    <x-auth-card >
 
      
        <x-slot name="logo">
        <div id="gap"></div>
        <img src="<?php echo asset('storage/logo_mid_transparent.png') ?>" alt="LogoMid">  
        </x-slot>

        <div class="h-full ">
            <div class="m-6 text-center text-lg ">
               <b> Add a new user</b>
            </div>
           
                    <div class="p-6" >

                        <!-- Validation Errors -->
                        <x-auth-validation-errors class="mb-4" :errors="$errors" />

                        <form method="POST" action="{{ route('register') }}">
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

                            <!-- Email Address -->
                            <div class="mt-4">
                                <x-label for="email" :value="__('Email')" />

                                <x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required />
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
                            <div class="mt-4">
                                <x-label for="resolver_id" :value="__('Resolver')" />

                                <x-input id="resolver_id" class="block mt-1 w-full" type="text" name="resolver_id" :value="old('resolver_id')"  />
                            </div>

                            <!-- Password -->
                            <div class="mt-4">
                                <x-label for="password" :value="__('Password')" />

                                <x-input id="password" class="block mt-1 w-full" type="password" name="password" required autocomplete="new-password" />
                            </div>

                            <!-- Confirm Password -->
                            <div class="mt-4">
                                <x-label for="password_confirmation" :value="__('Confirm Password')" />

                                <x-input id="password_confirmation" class="block mt-1 w-full" type="password" name="password_confirmation" required />
                            </div>

                            <!-- ez majd nem kell -->
                            <div class="flex items-center justify-end mt-4">
                                <!-- <a class="underline text-sm text-gray-600 hover:text-gray-900" href="{{ route('login') }}">
                                    {{ __('Already registered?') }}
                                </a> -->

                                <x-button class="ml-4">
                                    {{ __('Submit') }}
                                </x-button>
                            </div>
                        </form>

                    </div>
                
            
        </div>


    </x-auth-card>
</x-guest-layout>
