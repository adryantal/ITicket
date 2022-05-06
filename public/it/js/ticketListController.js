class TicketListController {
  constructor(apiTickets) {
    new FrameView();    
    const ticketDataArray = [];
    const token=$('meta[name="csrf-token"]').attr('content');
    const myAjax = new MyAjax(token);
      
    myAjax.getAjax(apiTickets, ticketDataArray, ticketList);
    new TicketListHeader();



    /*DISPLAY TICKET LIST */
    function ticketList(array) {
      const parentItem = $("#ticket-container");
      const templateItem = $(".template .ticket-data-line"); // új templateItem, a multiplikálódás elkerülése végett
      parentItem.empty(); //szülőelem ürítése, hogy többszöri lefutáskor ne legyen hozzáfűzés
      templateItem.show();
      array.forEach(function (data) {      
        let node = templateItem.clone().appendTo(parentItem); //
        const obj = new TicketListItem(node, data);
      });
      $("#pageinterval-bar").empty(); //in order to prevent duplication of the content of pageintervalbar when invoking a new instance of the Pagination class
      new Pagination();     
      templateItem.hide();   
    }
       
    /*CLICK ON TICKET NR. AND GET REDIRECTED TO THE MODIFY PAGE*/
       $("#ticket-container").on("click",'.ticket-data .ticketID a',(e)=>{      
        const ticketNr = $(e.target).text();      
       //over to the modify page     
         window.location.href="/modifyticket/"+ticketNr;        
         //save ticket object data to the localStorage   
         localStorage.removeItem('ticket');    
        $.getJSON('api/ticket/get/'+ticketNr, function(data) {
        localStorage.setItem('ticket', JSON.stringify(data));
        });
      })


    /*GENERAL SEARCH*/
    $(window).on("generalSearch", (event) => {
     // console.log('event detail '+event.detail )
      let filter = apiTickets + "search?q=" + event.detail; //configure API endpoint containing the filter conditions
      myAjax.getAjax(filter, ticketDataArray, ticketList); //display filtered ticketlist
    });

    /*FILTER BAR - filtering tickets by attributes*/

    new TicketFilter();
    $(window).on("filterTicketData", (event) => { 
      let filterInputValueChain = "filter?";
      event.detail.forEach((filterInput) => {
        filterInputValueChain +=
          filterInput.id.substring(7, filterInput.id.length) +  //key
          "?like=" +
          filterInput.value + //value
          "&";
      });
      filterInputValueChain = filterInputValueChain.substring(0,filterInputValueChain.length - 1);
      let filter = apiTickets + filterInputValueChain; //configure API endpoint containing the filter conditions        
       myAjax.getAjax(filter, ticketDataArray, ticketList); //display filtered ticketlist
  
    });

     
    /*ATTRIBUTE HEADER - sorting tickets by attributes*/ 
    let asc=true;
    $(window).on("sortByAttribute", (event) => {
      let attribute = event.detail;  
      myAjax.getAjax(apiTickets,ticketDataArray, function(){ //get the list of up-to-date data
        asc ? sortByKeyAsc(ticketDataArray,attribute) : sortByKeyDesc(ticketDataArray,attribute);
        ticketList(ticketDataArray);
      })   
      asc=!asc;
    });

    function sortByKeyDesc(array, key) {
      return array.sort(function (a, b) {         
          return ((a[key]> b[key]) ? -1 : ((a[key] < b[key]) ? 1 : 0));
      });
  }
    function sortByKeyAsc(array, key) {
      return array.sort(function (a, b) {          
          return ((a[key]< b[key]) ? -1 : ((a[key] > b[key]) ? 1 : 0));
      });
  }
 

  }


}
