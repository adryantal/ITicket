class TicketListController {
  constructor() {
    new FrameView();
    
    const ticketDataArray = [];
    const myAjax = new MyAjax();
    let apiEndPoint = "http://localhost:3000/tickets";
    myAjax.getAjax(apiEndPoint, ticketDataArray, ticketList);
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
    $(window).on("genealSearch", (event) => {
      let filter = apiEndPoint + "?q=" + event.detail; //szűrési feltétel hozzáadása az API végpont útvonalához
      myAjax.getAjax(filter, ticketDataArray, ticketList); //szűrt adatok lekérése, megjelenítése
    });

    /*FILTER BAR - filtering tickets by attributes*/

    new TicketFilter();
    $(window).on("filterTicketData", (event) => {
      let filterInputValueChain = "?";
      event.detail.forEach((filterInput) => {
        filterInputValueChain +=
          filterInput.id.substring(7, filterInput.id.length) +
          "_like=" +
          filterInput.value +
          "&";
      });
      filterInputValueChain = filterInputValueChain.substring(
        0,
        filterInputValueChain.length - 1
      );
      let filter = apiEndPoint + filterInputValueChain; ///szűrési feltétel hozzáadása az API végpont útvonalához
      console.log(filter)
      myAjax.getAjax(filter, ticketDataArray, ticketList); //szűrt adatok lekérése, megjelenítése
    });


    
    /*ATTRIBUTE HEADER - sorting tickets by attributes*/   
    let previousOrder="";       
    $(window).on("sortByAttribute", (event) => {
      let attribute = event.detail;  
      let order;  
      let asc= "?_sort=" + attribute + "&_order=ASC";
      let desc= "?_sort=" + attribute + "&_order=DESC";       
      if(previousOrder===asc){
        order=desc;
      }else if (!previousOrder===asc){
        order=asc;
      }else{
        order=asc;
      }
      let filter = apiEndPoint + order;
      myAjax.getAjax(filter, ticketDataArray, ticketList);
      previousOrder=order;
    });
  }

  
}
