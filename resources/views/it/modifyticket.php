<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>ITicket - Modify ticket</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />


  <link rel="stylesheet" type="text/css" media="screen" href="\..\it\css\frame.css" />
  <link rel="stylesheet" type="text/css" media="screen" href="\..\it\css\modifyticket.css" />
  <link rel="icon" type="image/x-icon" href="/storage/logo_mini.PNG" /> 
  <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>
  <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js" integrity="sha256-6XMVI0zB8cRzfZjqKcD01PBsAy3FlDASrlC8SxCpInY=" crossorigin="anonymous"></script>
  <script src='it\js\frameView.js'></script>
  <script src='it\js\modifyticketView.js'></script>
  <script src='it\js\Ajax.js'></script>
  <script src='it\js\modifyTicketController.js'></script>
  <script src='it\js\modifyTicketMain.js'></script>
  <meta name="csrf-token" content=<?php $token = csrf_token(); echo $token; ?>>
</head>

<body>
  <main>
    <?php include 'firstpart.php';
    $ticket= session()->get('data');
    
    if (!isset($ticket)) {
      $ticketnr=null;
      $created_by_name=null;  
      $created_on= null;
      $updated_by_name=null;
      $updated=null;    
      $timespent=null;
      $timeleft=null;
    }
    else{
      $ticketnr= $ticket['ticketnr'];
      $created_by_name= $ticket['created_by_name'];
      $created_on= $ticket['created_on'];  
      $updated_by_name= $ticket['updated_by_name'];
      $updated= $ticket['updated'];   
      $timespent= $ticket['timespent'];
      $timeleft= $ticket['timeleft'];
    }    
     ?>
   

    <article>

      <div id="newticketform-header">Modify ticket</div>

      <div id="page-container">

        <form action="" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="_method" value="PUT">

          <div class="row-top">
            <div><label for="ticketID">Ticket ID</label></div>
            <div> <input type="other" name="ticketID" id="ticketID" readonly value="<?php echo $ticketnr  ?>"></div>
            <div><label for="status">Status</label></div>
            <div> <select id="status" name="status">
               <option value="New" disabled>New</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending Customer">Pending Customer</option>
                <option value="Suspended">Suspended</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed" disabled>Closed</option>
              </select></div>
          </div>

          <div class="row-top">
            <div><label for="caller">Caller</label></div>
            <div> <input type="text" id="caller" name="caller">
            </div>
            <div><label for="subjperson">Affected user</label></div>
            <div> <input type="text" id="subjperson" name="subjperson">
            </div>


          </div>

          <div class="row-top">

            <div><label for="service">Service</label></div>
            <div> <input type="text" id="service" name="service">
            </div>
            <div><label for="category">Category</label></div>
            <div> <input type="text" id="category" name="category ">
            </div>

          </div>


          <div class="row-top">

            <div><label for="type">Type</label></div>
            <div> <input type="other" name="type" id="type" readonly></div>

            <div><label for="impact">Impact</label></div>
            <div> <input type="number" name="impact" id="impact" min="1" max="4"></div>

          </div>

          <div class="row-top">

            <div><label for="urgency">Urgency</label></div>
            <div> <input type="number" name="urgency" id="urgency" min="1" max="4"></div>
            <div><label for="priority">Priority</label></div>
            <div> <input type="number" name="priority" id="priority" min="1" max="4"></div>
          </div>


          <div class="row-top">
            <div><label for="assignmentGroup">Assignment group</label></div>
            <div> <input type="text" name="assignmentGroup" id="assignmentGroup"></div>
            <div><label for="assignedTo">Assigned to</label></div>
            <div> <input type="text" id="assignedTo" name="assignedTo">
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
          <div class="row-top">
            <div><label for="createdBy">Created by</label></div>
            <div> <input type="other" name="createdBy" id="createdBy" readonly value="<?php echo $created_by_name  ?>"></div>

            <div><label for="lastUpdatedBy">Last modified by</label></div>
            <div> <input type="other" name="lastUpdatedBy" id="lastUpdatedBy" readonly value="<?php echo $updated_by_name  ?>"></div>
          </div>
          <div class="row-top">
            <div><label for="createdOn">Created on</label></div>
            <div> <input type="other" name="createdOn" id="createdOn" readonly value="<?php echo $created_on  ?>"></div>
            <div><label for="LastUpdatedOn">Last updated on</label></div>
            <div> <input type="other" name="lastUpdatedOn" id="lastUpdatedOn" readonly value="<?php echo $updated  ?>"></div>

          </div>

          <div class="row-top">


            <div><label for="timeSpent"></label>Time spent (hours)</div>
            <div> <input type="other" name="timeSpent" id="timeSpent" readonly ></div>

            <div><label for="timeLeft">Time left (hours)</label></div>
            <div> <input type="other" name="timeLeft" id="timeLeft" readonly ></div>
          </div>

          <div class="row-bottom">
            <div><label for="title">Title</label></div>
            <div> <input type="text" name="title" id="title"></div>
          </div>
          <div class="row-bottom">
            <div><label for="description">Description</label></div>
            <div> <textarea name="description" id="description"></textarea></div>
          </div>


          <div id="row-last">

            <div id="attachment-container">
              <button id="attachment-btn">Add attachment</button>
              <input type="file" id="attachment" name="attachments[]" multiple>              
              <div id="existing-attachments"></div>
              <div id="draft-attachments"></div>
            </div>


            <div id="newticketform-buttons">
              <input type="button" name="submit" id="submit" value="Submit changes">

            </div>
          </div>

          <fieldset>
            <legend class="comment-info">Add worknote:</legend>


            <div class="comment-form">
              <div>
                <textarea name="comment" id="comment"></textarea>
              </div>
            </div>
            <div id="comment-btn">
              <input type="button" name="post-comment" id="post-comment" value="Post">
            </div>
          </fieldset>

        </form>

        <section id="comment-template">
          <div class="comment-item">
            <div class="comment-header">
              <div class="comment-header-left"> <span class="comment-creator"></span> <span class="handling-team"> </span> </div>
              <div class="comment-header-right"> <div class="comment-timestamp"></div></div>
            </div>
            <div class="status-indication-bar"></div>
            <div class="comment-description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, praesentium mollitia hic a illo quae
              nemo excepturi quo vel sunt nobis id voluptatem perspiciatis qui rem sint iusto, quam ratione?
            </div>
          
          </div>


        </section>

        <div class="comment-info">Worknote history:</div>

        <div id="comment-draft">

          <p id="comments-empty">(No worknotes have been added yet.)</p>

        </div>

        <div id="comment-history">



        </div>




      </div>



    </article>

    </section>



  </main>
</body>

</html>