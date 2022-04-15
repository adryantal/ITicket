$(function(){


//     let listType =localStorage.getItem("ticketListType");
//     let apiRoute; 
//     if (localStorage.getItem("apiRoute") === null) {
//            apiRoute='/api/ticket/all/'; 
//       }else{
//         apiRoute=localStorage.getItem("apiRoute");        
//       }       

//         switch (listType) {
//             case "allTickets":
//                 apiRoute = "/api/ticket/all/";
//                 localStorage.removeItem("ticketListType");
//                 localStorage.setItem("apiRoute", apiRoute);
//                 break;
//             case "myTickets":
//                 apiRoute = "/api/ticket/all/assignedtome/";
//                 additionalTasks(apiRoute);
//                 break;
//             case "myTeamsTickets":
//                 apiRoute = "/api/ticket/all/assignedtomyteam";
//                 additionalTasks(apiRoute);
//                 break;
//             case "myIncidents":
//                 apiRoute = "api/ticket/all/assignedtome/incident";
//                 additionalTasks(apiRoute);
//                 break;
//             case "myRequests":
//                 apiRoute = "api/ticket/all/assignedtome/request";
//                 additionalTasks(apiRoute);
//                 break;
//             default:            
//         }


//         function additionalTasks(apiRoute){
//                 localStorage.removeItem("ticketListType");
//                 $(".search-area").hide();
//                 $(".attr-header img").hide();
//                 localStorage.setItem("apiRoute", apiRoute);
//         }


   
//    console.log(apiRoute)
 
    new ChartsController(/*apiRoute*/);    
});