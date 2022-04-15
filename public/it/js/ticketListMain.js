$(function(){


    let listType =localStorage.getItem("ticketListType");
    let apiRoute; 
    if (localStorage.getItem("apiRoute") === null) {
           apiRoute='/api/ticket/all/'; 
      }else{
        apiRoute=localStorage.getItem("apiRoute");        
      }       

        switch (listType) {
            case "allTickets":
                apiRoute = "/api/ticket/all/";
                localStorage.removeItem("ticketListType");
                localStorage.setItem("apiRoute", apiRoute);
                break;
            case "myTickets":
                apiRoute = "/api/ticket/all/assignedtome/";
                additionalTasks(apiRoute, 'Tickets Assigned To Me');
                break;
            case "myTeamsTickets":
                apiRoute = "/api/ticket/all/assignedtomyteam";
                additionalTasks(apiRoute, 'Tickets Assigned To My Team');
                break;
            case "myIncidents":
                apiRoute = "api/ticket/all/assignedtome/incident";
                additionalTasks(apiRoute, 'Incidents Assigned To Me');
                break;
            case "myRequests":
                apiRoute = "api/ticket/all/assignedtome/request";
                additionalTasks(apiRoute,'Requests Assigned To Me');
                break;
            default:            
        }


        function additionalTasks(apiRoute,statusBarTitle){
                localStorage.removeItem("ticketListType");
                $(".wrapper").hide();
                $(".attr-header img").hide();
                $("#search-status-bar").text(statusBarTitle);
                localStorage.setItem("apiRoute", apiRoute);
        }


   
   console.log(apiRoute)
 
    new TicketListController(apiRoute);    
});