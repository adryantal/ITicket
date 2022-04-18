
 
class ModifyTicketController {
  constructor() {
    new FrameView();
    const mTicketView = new ModifyTicketView();
    const token = $('meta[name="csrf-token"]').attr("content");
    const myAjax = new MyAjax(token);
    let attachmentsArray = []; //attachments display list
    let attachmentsToBeAdded = [];
    let attachmentToBeRemoved = [];   
    let commentsToBeInserted = [];   
    let apiEndPointAttachments = "api/attachment/all";
    let apiendPointJournalNew = "api/journal/new";    
    const ticketNr = mTicketView.ticketIDField.val();  //get ticketNr
    const ticketID = getTicketIDByNumber(ticketNr);    
    let apiEndPointTicket = "api/ticket";
 
    loadAllTicketData(ticketNr);
   
    //if a new attachment is to be added, add the related object to the attachmentsToBeAdded array
    $(window).on("newFile", (event) => {
      attachmentsToBeAdded.push(event.detail);
    });
    //update attachment display list
    $(window).on("modifyAttachments", (event) => {
      attachmentsArray.splice(0, attachmentsArray.length);
      event.detail.forEach((element) => {
        attachmentsArray.push(element);
      });
    });
    //if an already existing attachment needs to be deleted, add the related id to the deleteExistingAttachment array
    $(window).on("deleteExistingAttachment", (event) => {
      attachmentToBeRemoved.push(event.detail);
    });
    //check if the attachment marked for deletion is in the attachmentsToBeAdded array; if so, remove it
    $(window).on("checkifNewAttachment", (event) => {
      let index;
      if (!(jQuery.inArray(event.detail, attachmentsToBeAdded) == -1)) {
        index = attachmentsToBeAdded.indexOf(event.detail);
        attachmentsToBeAdded.splice(index, 1);
        
      }
    });



    //receive descriptions of new comments to be addeed
    $(window).on("newComments", (event) => {      
      commentsToBeInserted.push(event.detail);      
    });


    //validate ticket data and submit ticket data
    $("#submit").on("click", (evt) => { 
      if(mTicketView.statusField.val()===null){
        mTicketView.statusField.css('border-color','crimson');
        alert('Please select a status other than "New"!');  
       } else 
       if($("#comment-draft").children('div').length<1){
        alert('Please insert a comment for the modification!');           
      }else if(mTicketView.assignedToField.val()===''){
        alert('You cannot update a case if it is unassigned. Please make sure it is assigned to you or a colleague. Thank you.');       
      }
      else{
        validateForm();
        $("#comment-draft div").each(function(){
           $(this.remove());
        })
        $("#comment-history").empty();
        loadAllTicketData(mTicketView.ticketIDField.val());
      }       
    }); 
    
    setStatusFieldBorder();  
  
    function loadAllTicketData(ticketNr){     
      loadTicketData(ticketNr);     
     // loadAttachments();    
    }

    function loadTicketData(ticketNr) {
    
      /*LOAD BASIC DETAILS*/
      let apiEndPointSelectedTicket = "api/ticket/get/"+ticketNr;
      //load ticket data from API endpoint     
      $.getJSON(apiEndPointSelectedTicket, function(data) {
      
        setTicketToInactive(data);
        mTicketView.ticketIDField.val(ticketNr);
        mTicketView.callerField.val(data.caller_name);
        mTicketView.subjpersonField.val(data.subjperson_name);
        mTicketView.serviceField.val(data.service_name);
        mTicketView.statusField.val(data.status);     
        mTicketView.categoryField.val(data.category_name);
        mTicketView.impactField.val(data.impact);
        mTicketView.priorityField.val(data.priority);
        mTicketView.urgencyField.val(data.urgency);
        mTicketView.assignmentGroupField.val(data.assignment_group_name);
        mTicketView.assignedToField.val(data.assigned_to_name);
        mTicketView.titleField.val(data.title);
        mTicketView.typeField.val(data.type);
        mTicketView.descriptionField.val(data.description);
        mTicketView.contactTypeField.val(data.contact_type);
        mTicketView.parentTicketField.val(data.parent_ticket);       
        mTicketView.createdOnField.val(data.created_on);      
        mTicketView.lastUpdatedOn.val(data.updated);
        mTicketView.parentTicketField.val(data.parent_ticketnr);       
        mTicketView.timeSpentField.val(data.timespent);
        checkTimeLeft(data);
        //creating hidden input fields for the IDs
        mTicketView.addHiddenInputField("caller", data.caller_id); 
        mTicketView.addHiddenInputField("subjperson", data.subjperson_id);
        mTicketView.addHiddenInputField("assignedTo", data.assigned_to_id);
        mTicketView.addHiddenInputField("assignmentGroup", data.assignment_group_id);
        mTicketView.addHiddenInputField("service", data.service_id);
        mTicketView.addHiddenInputField("category", data.category_id);        
        loadComments(data.journals);
        console.log('modified formba érkező adat: '+data.parent_ticket);
     
              
      });
    }

    //in case the ticket is in Closed status, disable all input fields on the form
    function setTicketToInactive(data){
      if (data.status==="Closed"){        
        $('form').find(':input:not(:disabled)').prop('disabled',true);
        return false;
      }
  
    }

    //format timeLeftField and timeSpentField and set value of timeLeftField to 0 in case of SLA breach
    function checkTimeLeft(data){
      if(Number(data.timeleft) <=0 )        {     
        mTicketView.timeLeftField.css("color","crimson"); 
        mTicketView.timeSpentField.css("color","crimson");
        mTicketView.timeLeftField.val(0);
      }else
      {
        mTicketView.timeLeftField.val(data.timeleft);
      }
    }

    
    function loadAttachments(){
      //loading attachments
      let apiEndPointAttachmentsPerTicket =
        "http://localhost:3000/attachments?ticketid=" + ticketID;
      myAjax.getAjax(
        apiEndPointAttachmentsPerTicket,
        mTicketView.existingAttachments,
        function () {
          mTicketView.existingAttachments.forEach((element, index) => {
            mTicketView.attachments.push(element.filename);
            mTicketView.displayAttachmentList();
          });
        }
      );  
    }

    function loadComments(commentsArray){
      console.log("kommentek töltése")
               //loading comments       
      const commentContainer = $("#comment-history");       
         commentsArray.forEach((element, index) => {                        
           new CommentItem(commentContainer,element);                  
         });         
         if (commentsArray.length>0){
           $("#comment-draft").html("");
           commentsArray.splice(0,commentsArray.length);
         }
     }

    function updateBasicTicketData() {
      /*insert value of the input fields to the Tickets table*/     
      let modifiedTicketData = {
        id: ticketID,
        ticketnr: ticketNr,
        caller_name: mTicketView.callerField.val(),
        subjperson_name: mTicketView.subjpersonField.val(),
        title: mTicketView.titleField.val(),
        type: mTicketView.typeField.val(),
        service_name: mTicketView.serviceField.val(),
        category_name: mTicketView.categoryField.val(),
        status: mTicketView.statusField.val(),
        assigned_to_name: mTicketView.assignedToField.val(),
        assignment_group_name: mTicketView.assignmentGroupField.val(),
        impact: mTicketView.impactField.val(),
        priority: mTicketView.priorityField.val(),
        urgency: mTicketView.urgencyField.val(),    
        created_by_name: mTicketView.createdByField.val(),        
        description: mTicketView.descriptionField.val(),
        contact_type: mTicketView.contactTypeField.val(),
        parent_ticket: mTicketView.parentTicketField.val().substring(3,mTicketView.parentTicketField.val().length),
        //attachments: attachmentsArray

        //reading data from hidden input fields
        caller_id: $("#callerID").val(),
        subjperson_id: $("#subjpersonID").val(),
        service_id: $("#serviceID").val(),
        category_id: $("#categoryID").val(),
        assigned_to_id: $("#assignedToID").val(),
        assignment_group_id: $("#assignmentGroupID").val(),
      };
      console.log('modified formról kimenő  adat: '+ mTicketView.parentTicketField.val().substring(3,mTicketView.parentTicketField.val().length));
     
      myAjax.putAjax(apiEndPointTicket,modifiedTicketData,ticketID);
    }

    function updateAttachments(){
      /*UPDATE ATTACHMENTS*/
      /*insert new attachments to the Attachments table*/      
      attachmentsToBeAdded.forEach((element) => {
        let newAttData = {
          
          ticketid: mTicketView.ticketIDField.val(),
          filename: element,
        };
        myAjax.postAjax(apiEndPointAttachments, newAttData);
      });
      attachmentsToBeAdded.splice(0, attachmentsToBeAdded, length);
      /*if any of the already existing attachments was marked for deletion, remove them from the Attachment table*/
      attachmentToBeRemoved.forEach((element) => {
        myAjax.deleteAjax(apiEndPointAttachments, element.id);
      });
      attachmentToBeRemoved.splice(0, attachmentToBeRemoved.length);
      mTicketView.existingAttachments.splice(
        0,
        mTicketView.existingAttachments.length
      );

    }
    
    function insertNewComments(){
       /*INSERT NEW COMMENTS TO THE JOURNALS TABLE */
       let arraytoJson = [];
       commentsToBeInserted.forEach((element) => {
           let newCommentData = {
               description: element,
               ticketid: ticketID,
               caller_id: $("#callerID").val(),
               subjperson_id: $("#subjpersonID").val(),
               service_id: $("#serviceID").val(),
               category_id: $("#categoryID").val(),
               assigned_to_id: $("#assignedToID").val(),
               status: mTicketView.statusField.val(),
               impact: mTicketView.impactField.val(),
               priority: mTicketView.priorityField.val(),
               urgency: mTicketView.urgencyField.val(),
               contact_type: mTicketView.contactTypeField.val()
           };
           arraytoJson.push(newCommentData);           
       });     
      myAjax.postAjaxForArray(apiendPointJournalNew, JSON.parse(JSON.stringify(arraytoJson)));
      commentsToBeInserted.splice(0, commentsToBeInserted.length);
    }


    function validateForm(){          
      const form = $("form");
      // Trigger HTML5 validity
      let reportValidity = form[0].reportValidity();
      // Then submit if form is OK.
      if (reportValidity) {       
        modifyNewTicket();
      } else {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
      }
    }


    function modifyNewTicket() {
      updateBasicTicketData();
     // updateAttachments();
      insertNewComments();    
    }


    function setStatusFieldBorder(){
      mTicketView.statusField.on("change",function(){
        mTicketView.statusField.css('border-color','rgb(125, 163, 163, 0.7)');
      });
    }
  

    function getTicketIDByNumber(ticketNr){
      return ticketNr.substring(3,ticketNr.length);    
    }


  }

}
