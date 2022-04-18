
 
class NewTicketController {
  constructor() {
    
    new FrameView();
    const nTicketView = new NewTicketView();
    const token=$('meta[name="csrf-token"]').attr('content');
    const myAjax = new MyAjax(token);
    const attachmentsArray = [];
    let apiEndPointCreateTicket = "api/ticket";
    let apiEndPointTicketNumber="api/ticket/new/number";
    let apiEndPointAttachments = "api/attachment/";
    
    
    $(window).on("transferAttachments", (event) => {
      attachmentsArray.splice(0,attachmentsArray.length);
      event.detail.forEach((element) => {
        attachmentsArray.push(element);
      });     
    });


  
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
    let newTicketData = {             
      caller_name: nTicketView.callerField.val(),
      subjperson_name: nTicketView.subjpersonField.val(),
      title: nTicketView.titleField.val(),
      type : nTicketView.typeField.val(),
      service_name: nTicketView.serviceField.val(),
      category_name: nTicketView.categoryField.val(),
      status : "New",      
      impact: nTicketView.impactField.val(),
      priority: nTicketView.priorityField.val(),      
      urgency: nTicketView.urgencyField.val(),
      assigned_to_name : nTicketView.assignedToField.val(),
      assignment_group_name : nTicketView.assignmentGroupField.val(),         
      updated_by_name: "",
      description: nTicketView.descriptionField.val(),
      contact_type: nTicketView.contactTypeField.val(),      
      parent_ticket: nTicketView.parentTicketField.val(),
      
      attachments: attachmentsArray,
      
      //reading data from hidden input fields
      caller_id: $("#callerID").val(),
      subjperson_id: $("#subjpersonID").val(),
      service_id: $("#serviceID").val(),
      category_id: $("#categoryID").val(),    
      assignment_group_id: 101,
      
    };
    console.log(newTicketData); 
      
    myAjax.postAjax(apiEndPointCreateTicket, newTicketData);  

    
    
    //should get the ticket ID here!
     /*insert attachments to the Attachments table*/   
    // attachmentsArray.forEach(element => {     
     /*   let newAttData ={
            // id: 1234,         
             date : dateTimeNow,
             ticketid: nTicketView.ticketIDField.val(), //should obtain the ticket ID somehow!!
             filename: element
         };
        myAjax.postAjax(apiEndPointAttachments, newAttData);
     });     
     */

     nTicketView.resetAllFields(); 
    
     //get the ticket number for the ticket just created and display it  
    $.get(apiEndPointTicketNumber,function(data,status){
      $('#ticket-number').text(data.ticketnr);
      nTicketView.submissionConfirmationWindow.show();
    });
     
     
    }  




 }
}
