<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>ITicket - Create new ticket</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />


  <link rel="stylesheet" type="text/css" media="screen" href="\..\it\css\frame.css" />
  <link rel="stylesheet" type="text/css" media="screen" href="\..\it\css\newticket.css" />
  <link rel="icon" type="image/x-icon" href="/storage/logo_mini.PNG" />
  <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>
  <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js" integrity="sha256-6XMVI0zB8cRzfZjqKcD01PBsAy3FlDASrlC8SxCpInY="
  crossorigin="anonymous"></script>
  <script src='it\js\frameView.js'></script>  
  <script src='it\js\newTicketView.js'></script>
  <script src='it\js\Ajax.js'></script>
  <script src='it\js\newTicketController.js'></script>
  <script src='it\js\newTicketMain.js'></script>
  <meta name="csrf-token" content=<?php $token=csrf_token(); echo $token;?>>


</head>
 <body>
  <main>
  <?php include 'firstpart.php';?>
      <article>      

        <div id="newticketform-header">Create new ticket</div>

        <div id='submission-confirmation'>
          <div> Successful ticket submission! <br>Ticket #: <span id="ticket-number" ></span></div>
          <div> <input type="button" id="confirmation-close-btn" value="OK"></div>
        </div>

        <form action="" method="POST" enctype="multipart/form-data"> 

        <div id='alerts'><div id='ajax-messages'></div><div id="alert-close-btn"><a>x</a></div></div>

          <div class="row-top"> 
            <div><label for="caller">Caller</label></div>
            <div> <input type="text" id="caller" name="caller" >
              </div>
              <div><label for="subjperson">Affected user</label></div>
              <div> <input type="text" id="subjperson" name="subjperson" >
              </div>

            
          </div>

          <div class="row-top">  
             
            <div><label for="service">Service</label></div>
            <div> <input type="text" id="service" name="service" >
            </div>
            <div><label for="category">Category</label></div>
            <div> <input type="text" id="category" name="category" >
            </div>   
              
          </div>


          <div class="row-top"> 

            <div><label for="type">Type</label></div>
            <div> <select id="type" name="type">
                <option value="Incident">Incident</option>
                <option value="Request">Request</option>
              </select></div>

            <div><label for="impact">Impact</label></div>
            <div> <input type="number" name="impact" id="impact" min="1" max="4" ></div>
            
             </div>

          <div class="row-top">  
           
            <div><label for="urgency">Urgency</label></div>
            <div> <input type="number" name="urgency" id="urgency" min="1" max="4" ></div>
              <div><label for="priority">Priority</label></div>
                <div> <input type="number" name="priority" id="priority" min="1" max="4" ></div>
          </div>

          


          <div class="row-top">  
            <div><label for="assignmentGroup">Assignment group</label></div>
            <div> <input type="text" name="assignmentGroup" id="assignmentGroup" value="IT Helpdesk" readonly></div>           
                <!-- <div><label for="assignedTo" >Assigned to</label></div>
                <div> <input type="text" id="assignedTo" name="assignedTo" readonly> -->
                <div><label for="status" >Status</label></div>
                <div> <input type="text" id="status" name="status" value = "New" readonly>
                </div>
                
          </div>



          <div class="row-top">  
            <div><label for="contactType">Contact type</label></div>
            <div> <select id="contactType" name="contactType">
                <option value="Phone">Phone</option>
                <option value="Email">Email</option>
                <option value="Chat">Chat</option>
                <option value="Walk-in">Walk-in</option>
                <option value="Self-service">Self-service</option>
              </select></div>
              <div><label for="parentTicket">Parent ticket</label></div>
              <div> <input type="text" name="parentTicket" id="parentTicket"></div>
          </div>


          <div class="row-bottom">  
            <div><label for="title">Title</label></div>
            <div> <input type="text" name="title" id="title" ></div>
          </div>
          <div class="row-bottom">  
            <div><label for="description">Description</label></div>             
            <div> <textarea name="description" id="description" ></textarea></div>
          </div>

         <div id="row-last">

          <div id="attachment-container">           
          <label id="attachment-btn" for ='attachment' class="custom-file-input"></label>
            <input type="file" id="attachment" name="attachments[]" multiple >
            <div id="attachment-list"></div>
          </div>
        

          <div id="newticketform-buttons">
            <input type="button" name="submit" id="submit" value="Submit">
            <input type="button" name="reset" id="reset" value="Reset">
          </div>
         

        </div>

       


        </form>

        
        
      </article>

    </section>

   

  </main>
</body>

</html>