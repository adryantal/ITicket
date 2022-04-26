
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />    
    <title>ITicket - Team Charts</title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" media="screen" href="\..\it\css\frame.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="\..\it\css\charts.css" />
   
    <link rel="icon" type="image/x-icon" href="/storage/logo_mini.PNG" />
    <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>
 
    <script src="it\js\Ajax.js"></script>    
    <script src="it\js\frameView.js"></script>   
    <script src="it\js\chartsController.js"></script>
    <script src="it\js\chartsView.js"></script>
    <script src="it\js\chartsMain.js"></script>
    <meta name="csrf-token" content=<?php $token=csrf_token(); echo $token;?>>

    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    

  </head>
  <body>
    <main>
    <?php include 'firstpart.php';?>

        <article>

       <div class='chartgroup'>
        <div class="donutchart" id="team-open-tickets" ></div>
        <div class="donutchart" id="team-resolved-tickets"></div>
        </div> 

        
       <div class='chartgroup'>
        <div class="donutchart" id="breached-sla-tickets" ></div>
        <div class="donutchart" id="bdtype-tickets"></div>
        </div> 

        </article>

     
        </section>



      </section>
      
    </main>
  </body>
</html>
