class FrameView {
  constructor() {
    /*Pointers - Nav dropdown*/
    this.navDropdownList = $(".navdropd-content");
    this.hamburgerBtn = $("#hamburger-icon");
    this.navDropdownList.hide();

    /*Pointers - Profile dropdown*/
    this.profileBtn = $("#avatar");
    this.profileDropdownList = $(".prdropdown-content");
    this.profileDropdownList.hide();


    $(window).on("click", (event) => {
    this.switchNavDropDown(event);
    this.switchProfileDropDown(event);  
    
    });

    new Nav();
    new NavDropDown();    

    //general page - navigation
    this.loadPage($('#ticketmanagement .menuitem'),0,'/alltickets','allTickets');
    this.loadPage($('#ticketmanagement .menuitem'),1,'/newticket','');
    this.loadPage($('#ticketmanagement .menuitem'),2,'/alltickets','myTeamsTickets'); 
    this.loadPage($('#ticketmanagement .menuitem'),3,'/alltickets','myTickets');
    this.loadPage($('#ticketmanagement .menuitem'),4,'/alltickets','myIncidents');
    this.loadPage($('#ticketmanagement .menuitem'),5,'/alltickets','myRequests');
    this.loadPage($('#dashboards .menuitem'),0,'/teamcharts','');
    //dropdown menu - navigation
    this.loadPage($('#nd-ticketmanagement .menuitem'),0,'/alltickets','allTickets');
    this.loadPage($('#nd-ticketmanagement .menuitem'),1,'/newticket',''); 
    this.loadPage($('#nd-ticketmanagement .menuitem'),2,'/alltickets','myTeamsTickets'); 
    this.loadPage($('#nd-ticketmanagement .menuitem'),3,'/alltickets','myTickets');
    this.loadPage($('#nd-ticketmanagement .menuitem'),4,'/alltickets','myIncidents');
    this.loadPage($('#nd-ticketmanagement .menuitem'),5,'/alltickets','myRequests');
    this.loadPage($('#nd-dashboards .menuitem'),0,'/teamcharts','');

    this.setSwitchBoardLink();

    this.navDropdownSetHeight();

    $(window).on("resize", () => {
      this.navDropdownSetHeight();  
    });

    let counter=0;
    $(".single-search .icon-area").on("click", () => {
    this.manageGeneralSearchArea(counter);
    counter++;
  });
 
}

 manageGeneralSearchArea(counter){  
      if (counter % 2 === 0) {
          $(".custom-input").addClass("custom-input-expand");
          $(".icon-area").addClass("icon-transform-effect");
      } else {
          $(".custom-input").removeClass("custom-input-expand");
          $(".icon-area").removeClass("icon-transform-effect");
      }  
}

loadPage(selector, index, url,note){
  selector.eq(index).on('click', function(e){
    e.preventDefault(); 
    localStorage.setItem("ticketListType", note);
    window.open(url,"_self");     
  });
}


  setSwitchBoardLink(){
    if($('#username').attr('res-group-id')==='102'){
      console.log($('#username').attr('id'))
      $("#switchboard-link").prop("href", "switchboard/db")
    }else{
      $("#switchboard-link").prop("href", "switchboard")
    }
  }

  switchNavDropDown(event){
/*Click events - Nav dropdown*/
    if ( !$(event.target).hasClass("h-icon") && this.navDropdownList.is(":visible") ) {
      this.navDropdownList.hide();
    }
    if ($(event.target).hasClass("h-icon")) { 
      console.log('kattintottam') 
      if (this.navDropdownList.is(":visible")) { this.navDropdownList.hide();
        return;
      }
      if (this.profileDropdownList.is(":visible")) {
        this.profileDropdownList.hide();       
      }
      if (this.navDropdownList.is(":hidden")) {
       
        this.navDropdownList.show();
        return;
      }
    }
  }

  switchProfileDropDown(event){
    /*Click events - Profile dropdown*/
    if (
      !$(event.target).hasClass("avatar-img") &&
      this.profileDropdownList.is(":visible")
    ) {      
      this.profileDropdownList.hide();
    }

    if ($(event.target).hasClass("avatar-img")) {
      if (this.profileDropdownList.is(":visible")) {
        this.profileDropdownList.hide();
        return;
      }
      if (this.profileDropdownList.is(":hidden")) {
        this.profileDropdownList.show();
        return;
      }
    }
  }


  navDropdownSetHeight(){
    let wHeight = $(window).height();
    
    if(this.navDropdownList.height()>=wHeight){
      console.log("ablak - "+wHeight)
      console.log("nav dr - " + this.navDropdownList.height())
      this.navDropdownList.css("max-height",wHeight)
      this.navDropdownList.addClass('navdropd-setscrollbar');
    }else{
      this.navDropdownList.removeClass('navdropd-setscrollbar');
      this.navDropdownList.css("max-height","none");
    }       
  } 

}

class NavMenuItem {
  constructor(container, title) {
    container.append(
      '<li><span class="navicon"><img src="storage/icons/ticket_grey.png" alt=""></span><span class="menuitem">' +
        title +
        "</span></li>"
    );
  }
}

class NavGroup {
  constructor(container, divID, title, navMenuItemTitlesArray) {
    let nG = '<div id="' +  divID +  '"><p class="nav-group">' +  title +  "</p> <ul></ul></div>";
    container.append(nG);
    let navMenuItemContainer = $("#" + divID + " ul");

    navMenuItemTitlesArray.forEach((title) => {
      new NavMenuItem(navMenuItemContainer, title);
    });
  }
}

class Nav {  
  constructor() {    
    /*Bulding up nav */
    this.navGroupDataArray = [
      {
        divID: "ticketmanagement",
        title: "Ticket Management",
        navMenuItemTitlesArray: [
          "All tickets",
          "Create new ticket",
          "Tickets assigned to my team",
          "Tickets assigned to me",
          "Incidents assigned to me",
          "Requests assigned to me",
        ],
      },

      {
        divID: "dashboards",
        title: "Dashboards",
        navMenuItemTitlesArray: [
          "Team charts",
          "Individual charts",         
        ],
      },
    ];
    this.navGroupDataArray.forEach((element) => {
      new NavGroup(
        $("nav"),
        element.divID,
        element.title,
        element.navMenuItemTitlesArray
      );
    });
  }
}

class NavDropdownMenuItem {
  constructor(container, title) {
    container.append(
      '<li><span class="navdropd-navicon"><img src="storage/icons/ticket_grey.png" alt=""></span><span class="menuitem">' +
        title +
        "</span></li>"
    );
  }
}

class NavDropDownGroup {
  constructor(container, divID, title, navMenuItemTitlesArray) {
    let nG =
      '<div id="' +
      divID +
      '"><p class="nav-group">' +
      title +
      "</p> <ul></ul></div>";
    container.append(nG);
    let navMenuItemContainer = $("#" + divID + " ul");
    navMenuItemTitlesArray.forEach((title) => {
      new NavDropdownMenuItem(navMenuItemContainer, title);
    });
  }
}

class NavDropDown {
  constructor() {
 /*Bulding up the Nav dropdown list*/

 this.navDDGroupDataArray = [
  {
    divID: "nd-ticketmanagement",
    title: "Ticket Management",
    navMenuItemTitlesArray: [
      "All tickets",
      "Create new ticket",
      "Tickets assigned to my team",
      "Tickets assigned to me",
      "Incidents assigned to me",
      "Requests assigned to me",
    ],
  },

  {
    divID: "nd-dashboards",
    title: "Dashboards",
    navMenuItemTitlesArray: [
      "Team charts",
      "Individual charts", 
    ],
  },
];

    this.navDDGroupDataArray.forEach((element) => {
      new NavDropDownGroup(
        $(".navdropd-content"),
        element.divID,
        element.title,
        element.navMenuItemTitlesArray
      );
    });
  }
}

