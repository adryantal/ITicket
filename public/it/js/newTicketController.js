
 
class NewTicketController {
  constructor() {
    
    new FrameView();
    const nTicketView = new NewTicketView();
    const myAjax = new MyAjax();
    const attachmentsArray = [];
    let apiEndPointTicket = "http://localhost:3000/tickets";
    let apiEndPointAttachments = "http://localhost:3000/attachments";
    
    
    $(window).on("transferAttachments", (event) => {
      attachmentsArray.splice(0,attachmentsArray.length);
      event.detail.forEach((element) => {
        attachmentsArray.push(element);
      });     
    });

/*!!!!!!!!!!!!!!!!!!*/
   //generate new ticket nr. depending on ticket type
    const ticketType=nTicketView.typeField.val(); 
    newTicketIDGenerator(ticketType);  
    nTicketView.typeField.on("change",()=>{
      newTicketIDGenerator(nTicketView.typeField.val()); 
    })          
    function newTicketIDGenerator(type){    
      const getLastTicketArray=[];  
      let API = "http://localhost:3000/tickets?type="+type+"&_sort=id&_order=DESC";
       myAjax.getAjax(API, getLastTicketArray, function(){ 
         if(getLastTicketArray.length>0){
         let lastTicketNr =  Number(getLastTicketArray[0].id.substring(3,getLastTicketArray[0].id.length));         
         console.log(lastTicketNr)
         let prefix;
         if(type=="Incident"){
          prefix="INC"
         }else{
           prefix="REQ"         }           
          $("#ticketID").val(prefix+(lastTicketNr+1));          
        }else{
          if(type=="Incident"){
            $("#ticketID").val("INC1000001");
           }else{
            $("#ticketID").val("REQ1000001");
           }      
        }
        $("#ticketID").attr("disabled","disabled");
      });     
      
    }
  
//validate ticket data and submit ticket data
    $("#submit").on("click", (evt) => {
    const form = $('form');
    // Trigger HTML5 validity
    let reportValidity = form[0].reportValidity();    
    // Then submit if form is OK.
    if(reportValidity){
      addNewTicket();
    }else{
      // alert("could not submit")
       evt.preventDefault();
       evt.stopPropagation();
       evt.stopImmediatePropagation();     
    }  
  });
  
  function addNewTicket(){
      /*insert value of the input fields to the Tickets table*/  
    let now = new Date(Date.now());
    let dateTimeNow = $.datepicker.formatDate('yy-mm-dd', now)+" "+now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    let newTicketData = { 
      id: nTicketView.ticketIDField.val(),        
      caller_name: nTicketView.callerField.val(),
      subjperson_name: nTicketView.subjpersonField.val(),
      title: nTicketView.titleField.val(),
      type : nTicketView.typeField.val(),
      service_name: nTicketView.serviceField.val(),
      category_name: nTicketView.categoryField.val(),
      status : nTicketView.statusField.val(),      
      impact: nTicketView.impactField.val(),
      priority: nTicketView.priorityField.val(),      
      urgency: nTicketView.urgencyField.val(),
      assigned_to_name : nTicketView.assignedToField.val(),
      assignment_group_name : nTicketView.assignmentGroupField.val(),
      created_on : dateTimeNow,
      created_by_name : nTicketView.createdByField.val(),
      updated : "",
      updated_by_name: "",
      description: nTicketView.descriptionField.val(),
      contact_type: nTicketView.contactTypeField.val(),      
      parent_ticket: nTicketView.parentTicketField.val(),
      //attachments: attachmentsArray
      
      //reading data from hidden input fields
      caller_id: $("#callerID").val(),
      subjperson_id: $("#subjpersonID").val(),
      service_id: $("#serviceID").val(),
      category_id: $("#categoryID").val(),
      assigned_to_id: $("#assignedToID").val(),
      assignment_group_id: 106,
      
    };
    myAjax.postAjax(apiEndPointTicket, newTicketData);     
     /*insert attachments to the Attachments table*/   
    attachmentsArray.forEach(element => {     
        let newAttData ={
            // id: 1234,         
            date : dateTimeNow,
            ticket_id: nTicketView.ticketIDField.val(), 
            file_name: element
        };
        myAjax.postAjax(apiEndPointAttachments, newAttData);
    }); 

    }  

 }
}
