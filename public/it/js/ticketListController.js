class TicketListController {
  constructor() {
    new FrameView();    
    const ticketDataArray = [];
    const token=$('meta[name="csrf-token"]').attr('content');
    const myAjax = new MyAjax(token);
    let apiAllTickets = "http://localhost:8000/api/ticket/all/";    
    myAjax.getAjax(apiAllTickets, ticketDataArray, ticketList);
    new TicketListHeader();

    /*DISPLAY TICKET LIST */
    function ticketList(array) {
      const parentItem = $("#ticket-container");
      const templateItem = $(".template .ticket-data-line"); // új templateItem, a multiplikálódás elkerülése végett
      parentItem.empty(); //szülőelem ürítése, hogy többszöri lefutáskor ne legyen hozzáfűzés
      templateItem.show();
      array.forEach(function (data) {
        //console.log(data);
        let node = templateItem.clone().appendTo(parentItem); //
        const obj = new TicketListItem(node, data);

      });
      $("#pageinterval-bar").empty(); //ne duplikálódjon a pageintervalbar tartalma, mikor újra példányosítódik a Pagination osztály
      new Pagination();
      // array.splice(0, array.length); //ez az összetett keresés miatt kell(select/option + keresőmező együttes használata), ha az én megoldásomat nézzük
      // //templateItem.remove() //templateItem eltávolítása
      templateItem.hide();   
   
    }
       
    /*CLICK ON TICKET NR. AND GET REDIRECTED TO THE MODIFY PAGE*/
       $("#ticket-container").on("click",'.ticket-data .ticketID a',(e)=>{      
        const ticketID = $(e.target).text();  
        console.log(ticketID)           
         //transfer ticket ID to the modifyController            
         window.location.href="modifyticket.html?id="+ticketID;          
      })


    /*GENERAL SEARCH*/
    $(window).on("generalSearch", (event) => {
     // console.log('event detail '+event.detail )
      let filter = apiAllTickets + "search?q=" + event.detail; //szűrési feltétel hozzáadása az API végpont útvonalához
      myAjax.getAjax(filter, ticketDataArray, ticketList); //szűrt adatok lekérése, megjelenítése
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
      let filter = apiAllTickets + filterInputValueChain; ///szűrési feltétel hozzáadása az API végpont útvonalához
      console.log(filter)
     
       myAjax.getAjax(filter, ticketDataArray, ticketList); //szűrt adatok lekérése, megjelenítése
    
  
    });


       
     
    /*ATTRIBUTE HEADER - sorting tickets by attributes*/    

    let asc=true;
    $(window).on("sortByAttribute", (event) => {
      let attribute = event.detail;  
      myAjax.getAjax(apiAllTickets,ticketDataArray, function(){ //újra lekérjük a listát
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
