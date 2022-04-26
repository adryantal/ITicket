class TicketListItem {
    constructor(ticketDataContainer, data) {
        this.ticketDataContainer = ticketDataContainer;
        this.data = data;

        /*Pointers to ticket attributes*/
        this.idItem = this.ticketDataContainer
            .children(".ticket-data")
            .children(".ticketID")
            .children("a");
        this.callerItem = this.ticketDataContainer
            .children(".ticket-data")
            .children(".caller")
            .children("a");
        this.subjpersonItem = this.ticketDataContainer
            .children(".ticket-data")
            .children(".subjperson")
            .children("a");
        this.titleItem = this.ticketDataContainer
            .children(".ticket-data")
            .children(".title");
        this.typeItem = this.ticketDataContainer
            .children(".ticket-data")
            .children(".type");
        this.serviceItem = this.ticketDataContainer
            .children(".ticket-data")
            .children(".service");
        this.categoryItem = this.ticketDataContainer
            .children(".ticket-data")
            .children(".category");
        this.statusItem = this.ticketDataContainer
            .children(".ticket-data")
            .children(".status");
        this.assignedToItem = this.ticketDataContainer
            .children(".ticket-data")
            .children(".assignedTo")
            .children("a");
        this.createdOnItem = this.ticketDataContainer
            .children(".ticket-data")
            .children(".createdOn");
        this.createdByItem = this.ticketDataContainer
            .children(".ticket-data")
            .children(".createdBy")
            .children("a");
        this.updatedItem = this.ticketDataContainer
            .children(".ticket-data")
            .children(".updated");
        this.updatedByItem = this.ticketDataContainer
            .children(".ticket-data")
            .children(".updatedBy")
            .children("a");
        this.assignmentGroupItem = this.ticketDataContainer
        .children(".ticket-data")
        .children(".assignmentGroup");
      

        this.setData(this.data);
        this.setPageResponsivity(768, 3); //under window width of 700px only the first 3 columns are visible
        this.setPageResponsivity(285, 2); //under window width of 285px only the first 2 columns are 
        
        let counter=0;
    }
    setData(data) {
        this.data = data;
        this.idItem.text(data.id);
        this.callerItem.text(data.caller_name);
        this.subjpersonItem.text(data.subjperson_name);
        this.titleItem.text(data.title);
        this.typeItem.text(data.type);
        this.serviceItem.text(data.service_name);
        this.categoryItem.text(data.category_name);
        this.statusItem.text(data.status);
        this.assignedToItem.text(data.assigned_to_name);
        this.createdOnItem.text(data.created_on);
        this.createdByItem.text(data.created_by_name);
        this.updatedItem.text(data.updated);
        this.updatedByItem.text(data.updated_by_name);
        this.assignmentGroupItem.text(data.assignment_group_name);
    }

    setPageResponsivity(size, colNr) {
        let parameter = "(min-width:" + size + "px)";
        const mq = window.matchMedia(parameter);
        if (!mq.matches) {
            //"window width < size"
            $("#attr-bar")
                .children("div")
                .each(function (index) {
                    if (index > colNr) {
                        $("#attr-bar").children("div").eq(index).hide();
                        $("#attr-filter-bar").children("div").eq(index).hide();
                    }
                });
            $(".ticket-data-line").each(function (i) {
                let tDataLine = $(".ticket-data-line").eq(i);
                tDataLine.children("div").each(function (index) {
                    if (index > colNr) {
                        tDataLine.children("div").eq(index).hide();
                    }
                });
            });
            $("article").css("overflow-x", "hidden");
        } else {
            //$("article").css("overflow-x", "scroll");
        }
    }
}

class TicketFilter {
  constructor() {
    

    this.customSearchField = $(".custom-input"); //general search / custom search
    this.filterInputField = $(".attr-filter").children("input"); //whole class / ticket filter
    this.filterSearchIcon = $(".attr-filter").children('i');
    const filterInputArray = [];

    this.filterByAttribute(filterInputArray);
    this.filterBySingleAttribute();
    this.generalFilter();
  }

  searchTrigger(eventName, eventDetail) {
    let ev = new CustomEvent(eventName, {
      detail: eventDetail,
    });
    window.dispatchEvent(ev);    
  }

  /*TICKET FILTER - keypress event*/
  filterByAttribute(filterInputArray) { 
    this.filterInputField.on("keydown", (e) => {
      //when pressing enter
      if (e.keyCode == 13) {
        this.filterInputField.each(function () {
          if (!$(this).val() == "")
            //collect all POPUPATED filter input fields' IDs along with the values to an array
            filterInputArray.push({
              id: $(this).attr("id"),
              value: $(this).val(),
            }); //saving the IDs and the input values to an array
        });
        this.searchTrigger("filterTicketData", filterInputArray); //forwarding the array to the Controller for further processing        
      }
      filterInputArray.splice(0, filterInputArray.length);
    });
  }


/*TICKET FILTER - filter using the magnifier icon in each search field*/
  filterBySingleAttribute(){    
    this.filterSearchIcon.on('click',(e)=>{      
      const fInputArray=[];
       let searchVal=$(e.currentTarget).closest('.attr-filter').children('input').val();
       let filterItemID=($(e.currentTarget).closest('.attr-filter').children('input').attr('id'));
       console.log(searchVal, filterItemID);
       if (searchVal == "") {         
               this.searchTrigger("filterTicketData", fInputArray); //forwarding the array to the Controller for further  
               $("#search-status-bar").html("Filter | All tickets");        
       } else {
           //collect all POPUPATED filter input fields' IDs along with the values to an array
           fInputArray.push({
               id: filterItemID,
               value: searchVal,
           }); //saving the IDs and the input values to an array
           $("#search-status-bar").html("Filter | All tickets > keyword(s)=<b>" + searchVal + "<b>");
           this.searchTrigger("filterTicketData", fInputArray); //forwarding the array to the Controller for further           
           $(e.currentTarget).closest('.attr-filter').children('input').val('');
       }      
    })    
  } 

  /*GENERAL SEARCH using keywords - keypress event*/
  generalFilter() {       
     let afterSearch = false;//only when this is true will any search be triggered 
      //when pressing the magnifier icon
      $(".single-search .icon-area").on('click',()=>{        
        //set the search status bar to the default state, in case there are results of a previous filtering shown...
        $("#search-status-bar").empty();      
        if (this.customSearchField.val() == "") {   
          if(afterSearch){
            this.searchTrigger("generalSearch", $(".custom-input").val());
          }          
          $("#search-status-bar").append("Filter | All tickets");
          afterSearch = false;
        } else {
          this.searchTrigger("generalSearch", $(".custom-input").val());
          afterSearch = true;
          $("#search-status-bar").append("Filter | All tickets > keyword(s)=<b>" + $(".custom-input").val() + "<b>");
        }
        this.customSearchField.val("");      
    });
  
  }


}


class Pagination {
  constructor() {
    const ticketDataLine = $("#ticket-container .ticket-data-line");
    const pageIntervalBar = $("#pageinterval-bar");
    const paginationBar = $("#pagination-bar");
    let numberOfTickets = ticketDataLine.length;
    //console.log(numberOfTickets);
    paginationBar.empty();

    let limitPerPage;
      //set limit per page based on browser height --> refresh needed
   
      $(window).on('resize', ()=>{        
        location.reload();
        countlimitPerPage();     
        $(window).scrollLeft(0);
        
    });      

        if ($(".ticket-data-line").length == 1) { //when only the template instance of .ticket-data-line exists
            pageIntervalBar.append("0");
        } else {
            countlimitPerPage();         
            if( limitPerPage>numberOfTickets)
          { pageIntervalBar.append("1-" + (limitPerPage-1 )); 
        }else
        {  pageIntervalBar.append("1-" + (limitPerPage ))}          
        }

    paginationBar.append(
      "<li id='previous-page'><a href='javascript:void(0)' aria-label='Previous'><span aria-hidden=true>&laquo;</span></a></li>"
    ); $("#ticket-container .ticket-data-line:gt(" + (limitPerPage - 1) + ")"
    ).hide(); // Hide all items over page limits (e.g., 5th item, 6th item, etc.)
    let totalPages = Math.ceil(numberOfTickets / limitPerPage); // Get number of pages
    paginationBar.append( "<li class='current-page active'><a href='javascript:void(0)'>" +  1 +"</a></li>" ); // Add first page marker
    // Loop to insert page number for each sets of items equal to page limit (e.g., limit of 4 with 20 total items = insert 5 pages)
    for (let i = 2; i <= totalPages; i++) 
    { paginationBar.append('<li class="current-page"><a href="javascript:void(0)">' +  i + "</a></li>" ); // Insert page number into pagination tabs
    }
    // Add next button after all the page numbers
    paginationBar.append( "<li id='next-page'><a href='javascript:void(0)' aria-label='Next'><span aria-hidden=true>&raquo;</span></a></li>" );
    

   goToSelectedPage();
   nextPage();
   

    // Function to navigate to the previous page when users click on the previous-page id (previous page button)
    $("#previous-page").on("click", function () {
      let currentPage = $("#pagination-bar li.active").index(); // Identify the current active page
      // Check to make sure that users is not on page 1 and attempting to navigating to a previous page
      if (currentPage === 1) {
        return false; // Return false (i.e., cannot navigate to a previous page because the current page is page 1)
      } else {
        currentPage--; // Decrement page by one
        $("#footer-bar li").removeClass("active"); // Remove the 'activate' status class from the previous active page number
        ticketDataLine.hide(); // Hide all items in the pagination loop
        let grandTotal = limitPerPage * currentPage; // Get the total number of items up to the page that was selected
        // Loop through total items, selecting a new set of items based on page number
        for (let i = grandTotal - limitPerPage; i < grandTotal; i++) {
          $("#ticket-container .ticket-data-line:eq(" + i + ")").show(); // Show items from the new page that was selected
        }
        $("#footer-bar li.current-page:eq(" + (currentPage - 1) + ")").addClass( "active" ); // Make new page number the 'active' page
      }
      pageIntervalBar.empty();
      pageIntervalBar.append(
        limitPerPage * currentPage - limitPerPage +  1 + "-" + limitPerPage * currentPage);
    });

    function countlimitPerPage(){      
      let itemContainerHeight =  $("main").height() -  $("#attr-bar").height()- $("#search-status-bar").height();
          limitPerPage = 0;
        
          $(".ticket-data-line").each(function () {          
              if ( $(this).position().top + $(this).height() /*+ MARGIN*/ > itemContainerHeight) {
          
                  return;
              } else {
                  limitPerPage++;
              }
          });   

        }  


        
   function goToSelectedPage(){
    // Function that displays new items based on page number that was clicked
       $("#pagination-bar li.current-page").on("click", function () {
         let currentPage;
         // Check if page number that was clicked on is the current page that is being displayed
         if ($(this).hasClass("active")) {
           return false; // Return false (i.e., nothing to do, since user clicked on the page number that is already being displayed)
         } else {
           currentPage = $(this).index(); // Get the current page number
           $("#pagination-bar li").removeClass("active"); // Remove the 'active' class status from the page that is currently being displayed
           $(this).addClass("active"); // Add the 'active' class status to the page that was clicked on
           ticketDataLine.hide(); // Hide all items in loop, this case, all the list groups
           let grandTotal = limitPerPage * currentPage; // Get the total number of items up to the page number that was clicked on
           // Loop through total items, selecting a new set of items based on page number
           for (let i = grandTotal - limitPerPage; i < grandTotal; i++) {
             $("#ticket-container .ticket-data-line:eq(" + i + ")").show(); // Show items from the new page that was selected
           }
           pageIntervalBar.empty();
           if (currentPage === totalPages) {
             pageIntervalBar.append((limitPerPage * currentPage -  limitPerPage + 1) + "-" + numberOfTickets);
           } else {
             pageIntervalBar.append((limitPerPage * currentPage - limitPerPage +  1) + "-" +( limitPerPage * currentPage));
           }
         }
       });
   
     }

     
   function nextPage(){
    // Function to navigate to the next page when users click on the next-page id (next page button)
    $("#next-page").on("click", function () {
      let currentPage = $("#pagination-bar li.active").index(); // Identify the current active page
      // Check to make sure that navigating to the next page will not exceed the total number of pages
      if (currentPage === totalPages) {
        return false; // Return false (i.e., cannot navigate any further, since it would exceed the maximum number of pages)
      } else {
        currentPage++; // Increment the page by one
        $("#footer-bar li").removeClass("active"); // Remove the 'active' class status from the current page
        ticketDataLine.hide(); // Hide all items in the pagination loop
        let grandTotal = limitPerPage * currentPage; // Get the total number of items up to the page that was selected
        // Loop through total items, selecting a new set of items based on page number
        for (let i = grandTotal - limitPerPage; i < grandTotal; i++) {
          $("#ticket-container .ticket-data-line:eq(" + i + ")").show(); // Show items from the new page that was selected
        }
        $("#footer-bar li.current-page:eq(" + (currentPage - 1) + ")").addClass(
          "active"
        ); // Make new page number the 'active' page
      }
        pageIntervalBar.empty();
        if (currentPage >= totalPages) {         
           pageIntervalBar.append( limitPerPage * currentPage - limitPerPage + 1 + "-" + numberOfTickets);
        } else {
            pageIntervalBar.append( limitPerPage * currentPage - limitPerPage +  1 + "-" + limitPerPage * currentPage);
        }
    });
  }

  }
  
}

class TicketListHeader {
  constructor() {
    /*Creating attribute headers*/
    this.createAttributeHeaders();
    /*Creating the filter bar*/
    this.createAttrFilterBar();
    /*Automatization of the Search Status bar*/
    this.automateSearchStatusBar();   

  }
  createAttributeHeaders() {
    const AttrHeaderTitlesArray = [
      { title: "Ticket ID", sortBy: "id" }, 
      { title: "Caller", sortBy: "caller_name" },
      { title: "Created for", sortBy: "subjperson_name" },
      { title: "Title", sortBy: "title" },
      { title: "Type", sortBy: "type" },
      { title: "Service", sortBy: "service_name" },
      { title: "Category", sortBy: "category_name" },
      { title: "Status", sortBy: "status" },
      { title: "Assigned to", sortBy: "assigned_to_name" },
      { title: "Assign. group", sortBy: "assignment_group_name" },
      { title: "Created on", sortBy: "created_on" },
      { title: "Created by", sortBy: "created_by_name" },
      { title: "Updated", sortBy: "updated" },
      { title: "Updated by", sortBy: "updated_by_name" },
    ];

    new AttributeHeader($("#attr-bar"), AttrHeaderTitlesArray);    
  }

  
  createAttrFilterBar() {
    const AttrFilterDataArray = [
      "filter-id",
      "filter-caller_name",
      "filter-subjperson_name",
      "filter-title",
      "filter-type",
      "filter-service_name",
      "filter-category_name",
      "filter-status",
      "filter-assigned_to_name",
      "filter-assignment_group_name",
      "filter-created_on",
      "filter-created_by_name",
      "filter-updated",
      "filter-updated_by_name",
    ];
    new AttributeFilterBar($("#attr-filter-bar"), AttrFilterDataArray);
  }

  automateSearchStatusBar() {
    $(".attr-filter").on("keypress", function (e) {      
      $("#search-status-bar").text("Filter | All tickets");
      if (e.which == 13) {
        $(".attr-filter input:text").each((index) => {
          let inputField = $(".attr-filter input:text").eq(index);
          if (inputField.val()) {
            $("#search-status-bar").append( "&nbsp;>&nbsp;" +  $(".attr-header .attr-header-title").eq(index).html() + "=<b>" + inputField.val() + "</b>");
          }
          inputField.val("");
        });
      }
    });
  }
}


class AttributeHeader {
  constructor(container, AttrHeaderTitlesArray) {    
  this.attrHeaderTitlesArray=AttrHeaderTitlesArray;
  this.container=container;
  this.buildAttrHeader();
    /*ATTRIBUTE HEADER - sorting tickets by attributes*/  
    this.sortIcon = $(".attr-header img");  
    this.sortTicketsByAttribute();
  }

  buildAttrHeader(){
    this.attrHeaderTitlesArray.forEach((data) => {
      this.container.append(
        '<div class="attr-header"><span class="attr-header-title">' +
          data.title +
          '</span><img class="sort-icon" sortBy="' +
          data.sortBy +
          '" src="storage/icons/sort.png" alt=""></div>'
      );
    });
  }

  sortTrigger(eventName, info) {
    let ev = new CustomEvent(eventName, {
      detail: info,
    });
    window.dispatchEvent(ev);
  }

  sortTicketsByAttribute(){
    let attribute;
    this.sortIcon.on("click", (e) => {      
      attribute = $(e.target).attr("sortBy");
      if (!(typeof attribute === "undefined")) {
        this.sortTrigger("sortByAttribute", attribute);
      }      
    });
  }
}

class AttributeFilterBar {
  constructor(container, AttrFilterDataArray) {
    /*Pointers - Attribute filter bar*/
    this.attrFilterBtn = $(".magnifier-attr-icon");
    this.attrFilterBar = $("#attr-filter-bar");
    this.container=container;
    this.attrFilterDataArray=AttrFilterDataArray;
    this.attrFilterBar.hide();

    /*Make attribute filter bar appear/disappear*/
    this.toggleAttributeFilterBar();
    /*Laying down the foundation of the Attr. filter bar*/
    this.buildAttrFilterBar();   
  }

  toggleAttributeFilterBar(){
    this.attrFilterBtn.on("click", () => {
      
      if (this.attrFilterBar.is(":hidden")) {
        this.attrFilterBar.show();
        $("article").css("grid-template-rows", "35px 35px 45px auto 30px");
        $("#search-status-bar").text("Filter | All tickets");
      } else {
        this.attrFilterBar.hide();
        $("article").css("grid-template-rows", "35px 35px auto 30px");
        $("#search-status-bar").text("All tickets");
      }
    });
  }

  buildAttrFilterBar(){
    this.attrFilterDataArray.forEach((id) => {
      this.container.append(
        '<div class="attr-filter"><input type="text" name="' +
          id +'" id="' +  id + '" placeholder="Search"><i class="fa fa-search-plus" style="font-size:19px; color: grey"></i></div>'
      );
    });
  }
}
