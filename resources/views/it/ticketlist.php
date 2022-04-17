<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>ITicket - All tickets</title>
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" media="screen" href="\..\it\css\frame.css" />
  <link rel="stylesheet" type="text/css" media="screen" href="\..\it\css\ticketlist.css" />
  <link rel="icon" type="image/x-icon" href="/storage/logo_mini.PNG" />
  <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>
  <script src="it\js\Ajax.js"></script>
  <script src="it\js\frameView.js"></script>
  <script src="it\js\ticketListController.js"></script>
  <script src="it\js\ticketListView.js"></script>
  <script src="it\js\ticketListMain.js"></script>
  <meta name="csrf-token" content=<?php $token = csrf_token();
                                  echo $token; ?>>


</head>

<body>
  <main>
    <?php include 'firstpart.php'; ?>

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