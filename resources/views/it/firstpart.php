<?php echo

' 

<div id="alert-popup">
<div id="alert-text">Alert </div>
<div> <input type="button" id="alert-close-btn" value="OK"></div>
</div>

<section id="panel-top">
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

 <!-- Search bar -->
 <div class="wrapper c-height">
   <div class="search-area c-height">
     <div class="single-search">
       <input class="custom-input" name="custom_search" placeholder="Enter keywords..." type="search" >
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
  
   <div class="prdropdown-content">
   <div id="username" res-group-id="'.auth()->user()->resolver_id .'">'. auth()->user()->name .'</div>
     <a href="#">Profile</a>
     <a href="#" id="switchboard-link"  >Switchboard</a>
     <a href="/logout" id="logout-option">Logout</a>        
   </div>
 </div>
 
 
 </section>

 <section id="container-main">
   <nav>         

   </nav>

'



?>