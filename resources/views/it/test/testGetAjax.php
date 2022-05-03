<!DOCTYPE html>
<meta charset="utf-8">
<title>Testing ITicket - Listing tickets using GET Ajax call</title>
<link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.18.0.css">

<body>
  <div id="qunit"></div>
  <div id="qunit-fixture">

    <article>

      <div id="search-status-bar">
        All tickets
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
        <div class="ticket-data"><span class="assignmentGroup"><a></a></span></div>
        <div class="ticket-data"><span class="createdOn"></span></div>
        <div class="ticket-data"><span class="createdBy"><a></a></span></div>
        <div class="ticket-data"><span class="updated"></span></div>
        <div class="ticket-data"><span class="updatedBy"><a></a></span></div>
      </div>
    </section>

<div id='qunit-testresult-display'></div>
  </div>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" media="screen" href="\..\it\css\frame.css" />
  <link rel="stylesheet" type="text/css" media="screen" href="\..\it\css\ticketlist.css" />
  <script src="https://code.jquery.com/qunit/qunit-2.18.0.js"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
  <!-- JS used by the module to be tested -->
  <script src="..\it\js\Ajax.js"></script>
  <script src="..\it\js\frameView.js"></script>
  <script src="..\it\js\ticketListController.js"></script>
  <script src="..\it\js\ticketListView.js"></script>
  <script src="..\it\js\ticketListMain.js"></script>

  <script src="..\it\js\newTicketMain.js"></script>
  <script src="..\it\js\newTicketController.js"></script>
  <script src="..\it\js\newticketView.js"></script>

  <script src="..\it\js\test\functionality\testGetAjax.js"></script>

  <meta name="csrf-token" content=<?php $token = csrf_token();
                                  echo $token; ?>>
</body>