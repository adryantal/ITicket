
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>ITicket - All tickets</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" media="screen" href="\..\it\css\frame.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="\..\it\css\ticketlist.css" />
    <link rel="icon" type="image/x-icon" href="../images/logo_mini.PNG" />
    <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>
    <script src="it\js\Ajax.js"></script>    
    <script src="it\js\frameView.js"></script>   
    <script src="it\js\ticketListController.js"></script>
    <script src="it\js\ticketListView.js"></script>
    <script src="it\js\ticketListMain.js"></script>
    <meta name="csrf-token" content=<?php $token=csrf_token(); echo $token;?>>
      

  </head>
  <body>
    <main>
      <section id="panel-top">
     <div id="logocontainer">
       <img id="iticket-logo" src="<?php echo asset('storage/logo_mini.PNG') ?>" alt="">
       <div class="nav-dropdown">
       <button id="hamburger-icon" ><img src="<?php echo asset('storage/icons/hamburger_icon.png') ?>" alt="" class="h-icon">       
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
            <input class="custom-input" name="custom_search" placeholder="Enter keywords..." type="text">
            <a class="icon-area" >
              <i class="magnifier"><img src="<?php echo asset('storage/icons/magnifier.png') ?>" alt=""></i>
            </a>
          </div>
        </div>
      </div>
    <!-- Dropdown list - avatar -->
      <div class="profile-dropdown">
        <button class="pr-dropbtn" id="avatar"><img src="<?php echo asset('storage/icons/avatar_default.png') ?>" alt="" class="avatar-img">        
        </button>
        <div id="username"><?php echo auth()->user()->name ?></div>
        <div class="prdropdown-content">
          <a href="#">Profile</a>
          <a href="/logout">Logout</a>        
        </div>
      </div>
      
      
      </section>

      <section id="container-main">
        <nav>         

        </nav>

        <article>

          <div id="search-status-bar">
          Filter | All tickets 
          </div>
           
          <div id="attr-bar">
            <div class="attr-header"><img class="magnifier-attr-icon" src="<?php echo asset('storage/icons/magnifier.png') ?>" alt=""></div>
            
          </div>

          <div id="attr-filter-bar">
            <div class="attr-filter"></div>
            
            
          </div>

          <div id="ticket-container">

            
          </div>

            <div id="footer-bar">
              <div id="pagination-bar">
              </div>
                <div id="pageinterval-bar">
              </div>

            
          </div>

        </article>

     

        <section class="template">
          <div class="ticket-data-line">
            <div class="ticket-data"></div>
            <div class="ticket-data"><span class="ticketID"><a></a></span></div>
            <div class="ticket-data"><span class="caller"><a></a></span></div>
            <div class="ticket-data"><span class="subjperson"><a></a></span></div>
            <div class="ticket-data"><span class="title"></span></div>
            <div class="ticket-data"><span class="type"></span></div>
            <div class="ticket-data"><span class="service"></span></div>
            <div class="ticket-data"><span class="category"></span></div>
            <div class="ticket-data"><span class="status"></span></div>
            <div class="ticket-data"><span class="assignedTo"><a></a></span></div>
            <div class="ticket-data"><span class="createdOn"></span></div>
            <div class="ticket-data"><span class="createdBy"><a></a></span></div>
            <div class="ticket-data"><span class="updated"></span></div>
            <div class="ticket-data"><span class="updatedBy"><a></a></span></div>  
          </div>
        </section>



      </section>
      
    </main>
  </body>
</html>
