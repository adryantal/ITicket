<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Home</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />


  <link rel="stylesheet" type="text/css" media="screen" href="./frame.css" />
  <link rel="stylesheet" type="text/css" media="screen" href="./newticket.css" />
  <link rel="icon" type="image/x-icon" href="../images/logo_mini.PNG" />
  <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>
  <script
  src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"
  integrity="sha256-6XMVI0zB8cRzfZjqKcD01PBsAy3FlDASrlC8SxCpInY="
  crossorigin="anonymous"></script>
  <script src='view/frameView.js'></script>  
  <script src='../it/view/newTicketView.js'></script>
  <script src='../it/model/Ajax.js'></script>
  <script src='../it/controller/newTicketController.js'></script>
  <script src='newTicketMain.js'></script>


</head>
 <body>
  <main>
    <section id="panel-top">
      <div id="logocontainer">
        <img id="iticket-logo" src="../images/logo_mini.PNG" alt="">
        <div class="nav-dropdown">
          <button id="hamburger-icon"><img src="../images/icons/hamburger_icon.png" alt="" class="h-icon">
          </button>
          <div class="navdropd-content">

          </div>
        </div>
      </div>

      <div id="infobar">
        <!-- Search bar -->

        <!-- Dropdown list - avatar -->
        <div class="profile-dropdown">
          <button class="pr-dropbtn" id="avatar"><img src="../images/icons/avatar_default.png" alt=""
              class="avatar-img">
          </button>
          <div id="username">Logged-in User's Name</div>
          <div class="prdropdown-content">
            <a href="#">Profile</a>
            <a href="#">Logout</a>
          </div>
        </div>


    </section>

    <section id="container-main">
      <nav>

      </nav>

      <article>      

        <div id="newticketform-header">Create new ticket</div>

        <form action="" method="post" enctype="multipart/form-data">        

          <div class="row-top"> 
            <div><label for="ticketID">Ticket ID</label></div>
            <div> <input type="other" name="ticketID" id="ticketID"></div>
            <div><label for="status" >Status</label></div>
            <div> <input type="other" name="status" id="status" value="New" disabled></div>
          </div>

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
            <div> <input type="text" id="category" name="category " >
            </div>   
              
          </div>


          <div class="row-top"> 

            <div><label for="type">Type</label></div>
            <div> <select id="type">
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
            <div> <input type="text" name="assignmentGroup" id="assignmentGroup" value="IT Helpdesk" disabled></div>           
                <div><label for="assignedTo">Assigned to</label></div>
                <div> <input type="text" id="assignedTo" name="assignedTo">
                </div>
                
          </div>



          <div class="row-top">  
            <div><label for="contactType">Contact type</label></div>
            <div> <select id="contactType" >
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
            <button id="attachment-btn" >Add attachment</button>
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