
 
class NewTicketController {
  constructor() {
    
    new FrameView();
    const nTicketView = new NewTicketView();
    const token=$('meta[name="csrf-token"]').attr('content');
    const myAjax = new MyAjax(token);   
    const apiEndPointCreateTicket = "api/ticket";
    const apiEndPointTicketNumber="api/ticket/new/number";     
   
//validate ticket data and submit ticket data
    $("#submit").on("click", (evt) => {
    const form = $('form');
    // Trigger HTML5 validity
    let reportValidity = form[0].reportValidity();    
    // Then submit if form is OK.
    if(reportValidity){
      let formData = new FormData(document.getElementsByTagName('form')[0]);
      console.log(formData);    
      addNewTicket(formData);
      nTicketView.attachmentList.empty();
    }else{      
       evt.preventDefault();
       evt.stopPropagation();
       evt.stopImmediatePropagation();     
    }  
  });

  let confirmTicketNr = () => this.getNewTicketNr(nTicketView,apiEndPointTicketNumber);   
  
  function addNewTicket(formData){    
    myAjax.postAjaxWithFileUpload(apiEndPointCreateTicket, formData, confirmTicketNr);
    nTicketView.resetAllFields();     
    }  

 }
 getNewTicketNr(nTicketView,apiEndPointTicketNumber) {
  //get the ticket number for the ticket just created and display it
  $.get(apiEndPointTicketNumber,  (data, status)=> {
      $("#ticket-number").text(data.ticketnr);
      nTicketView.submissionConfirmationWindow.show();      
  });
  //!!!it would make more sense to use the nTicketView.displayAlert method...
}
 
}