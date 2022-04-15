<?php echo

' <section id="panel-top">
<div id="logocontainer">
  <img id="iticket-logo" src="'.asset("storage/logo_mini.PNG").'" alt="">
  <div class="nav-dropdown">
  <button id="hamburger-icon" ><img src="'.asset("storage/icons/hamburger_icon.png"). '" alt="" class="h-icon">       
 </button>   
 <div class="navdropd-content">        
    
 </div>
</div>   
</div>

<div id="infobar">
<div id="switchboard-link" > <a href="#" >Switchboard</a></div>
 <!-- Search bar -->
 <div class="wrapper c-height">
   <div class="search-area c-height">
     <div class="single-search">
       <input class="custom-input" name="custom_search" placeholder="Enter keywords..." type="text">
       <a class="icon-area" >
         <span class="magnifier"><img src="'.asset("storage/icons/magnifier.png"). '" alt=""></span>
       </a>
     </div>
    
   </div>
  
 </div>
<!-- Dropdown list - avatar -->
 <div class="profile-dropdown">
   <button class="pr-dropbtn" id="avatar"><img src="'.asset("storage/icons/avatar_default.png").'" alt="" class="avatar-img">        
   </button>
   <div id="username" res-group-id="'.auth()->user()->resolver_id .'">'. auth()->user()->name .'</div>
   <div class="prdropdown-content">
     <a href="#">Profile</a>
     <a href="/logout">Logout</a>        
   </div>
 </div>
 
 
 </section>

 <section id="container-main">
   <nav>         

   </nav>

'



?>