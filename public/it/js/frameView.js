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

//normal page - navigation
this.loadPage($('#ticketmanagement .menuitem'),0,'/alltickets');
this.loadPage($('#ticketmanagement .menuitem'),1,'/newticket'); 
//dropdown menu - navigation
this.loadPage($('#nd-ticketmanagement .menuitem'),0,'/alltickets');
this.loadPage($('#nd-ticketmanagement .menuitem'),1,'/newticket'); 



this.navDropdownSetHeight();

$(window).on("resize", () => {
  this.navDropdownSetHeight();  
})
}

loadPage(selector, index, url){
  selector.eq(index).on('click', function(e){
    e.preventDefault(); 
    window.open(url,"_self");    
  });

}

  switchNavDropDown(event){
/*Click events - Nav dropdown*/
    if (
      !$(event.target).hasClass("h-icon") &&
      this.navDropdownList.is(":visible")      
    ) {
      this.navDropdownList.hide();
    }
    if ($(event.target).hasClass("h-icon")) {
      if (this.navDropdownList.is(":visible")) {
        this.navDropdownList.hide();
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
          "Individual - weekly",
          "Individual - monthly",
          "Team - monthly",
          "Team - weekly",
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
      "Individual - weekly",
      "Individual - monthly",
      "Team - monthly",
      "Team - weekly",
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

