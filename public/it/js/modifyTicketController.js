 
class ModifyTicketController {
  constructor() {
    const modFframeView = new FrameView();
    const mTicketView = new ModifyTicketView();
    const token = $('meta[name="csrf-token"]').attr("content");
    const myAjax = new MyAjax(token);
    let attachmentToBeRemoved = [];   
    let commentsToBeInserted = [];   
    let apiEndPointAttachments = "api/attachments";
    let apiendPointJournalNew = "api/journal/new";   
    let apiEndPointTicket = "api/ticket";
 
    loadTicketData();
   
    //get the database id of the attachment to be removed and add it to the attachmentToBeRemoved array
    $(window).on("deleteExistingAttachment", (event) => {
      attachmentToBeRemoved.push(event.detail);
      console.log('to be removed:' + attachmentToBeRemoved)      
    });
  
    //receive descriptions of new comments to be addeed
    $(window).on("newComments", (event) => {      
      commentsToBeInserted.push(event.detail);      
    });


    //validate ticket data and submit ticket data
    $("#submit").on("click", (evt) => {      
      if(mTicketView.statusField.val()===null){
        mTicketView.statusField.css('border-color','crimson');
        modFframeView.displayAlert('Please select a status other than "New"!');  
       } else 
       if($("#comment-draft").children('div').length<1){
        modFframeView.displayAlert('Please insert a comment for the modification!');           
      }else if(mTicketView.assignedToField.val()===''){
        modFframeView.displayAlert('You cannot update a case if it is unassigned. Please make sure it is assigned to you or a colleague. Thank you.');       
      }
      else{
        validateForm();
        $("#comment-draft div").each(function(){
           $(this.remove());
        })
        $("#comment-history").empty();      
      }  
         
    }); 
    
    setStatusFieldBorder();  
     
    
    function loadTicketData() {  
      //load ticket data from localStorage
       const data= JSON.parse(localStorage.getItem('ticket'));                  
        setTicketToInactive(data);        
        mTicketView.ticketIDField.val(data.ticketnr);
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
        mTicketView.createdByField.val(data.created_by_name);
        mTicketView.lastUpdatedBy.val(data.updated_by_name);
        
        checkTimeLeft(data);
        //creating hidden input fields for the IDs
        mTicketView.addHiddenInputField("caller", data.caller_id); 
        mTicketView.addHiddenInputField("subjperson", data.subjperson_id);
        mTicketView.addHiddenInputField("assignedTo", data.assigned_to_id);
        mTicketView.addHiddenInputField("assignmentGroup", data.assignment_group_id);
        mTicketView.addHiddenInputField("service", data.service_id);
        mTicketView.addHiddenInputField("category", data.category_id);
        loadAttachments(data.attachments);          
        loadComments(data.journals);  
      
        console.log('feltöltésre jelölt fájlok: '+$('#attachment')[0].files);
        console.log('load ticket data completed')                         
     
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

    
    function loadAttachments(data){      
          data.forEach((element) => {
            mTicketView.existingAttachments.push(element);                      
        }
      );  
      mTicketView.displayAttachmentList();
    }

    function loadComments(commentsArray){     
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
        id: getTicketIDByNumber(mTicketView.ticketIDField.val()),
        ticketnr: mTicketView.ticketIDField.val(),
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
        
        //reading data from hidden input fields
        caller_id: $("#callerID").val(),
        subjperson_id: $("#subjpersonID").val(),
        service_id: $("#serviceID").val(),
        category_id: $("#categoryID").val(),
        assigned_to_id: $("#assignedToID").val(),
        assignment_group_id: $("#assignmentGroupID").val(),
      };     
     
      myAjax.putAjax(apiEndPointTicket,modifiedTicketData,getTicketIDByNumber(mTicketView.ticketIDField.val()));     
      mTicketView.existingAttachments.splice(0,mTicketView.existingAttachments.length);
    }

    function removeSelectedAttachments(){     
      /*if any of the already existing attachments have been marked for deletion, remove them from the Attachment table*/      
        myAjax.deleteAjaxForArray(apiEndPointAttachments, attachmentToBeRemoved);      
      attachmentToBeRemoved.splice(0, attachmentToBeRemoved.length);
      mTicketView.existingAttachments.splice( 0, mTicketView.existingAttachments.length);
    }
    
    function insertNewComments(){
       /*INSERT NEW COMMENTS TO THE JOURNALS TABLE */
       let arraytoJson = [];
       commentsToBeInserted.forEach((element) => {
           let newCommentData = {
               description: element,
               ticketid: getTicketIDByNumber(mTicketView.ticketIDField.val()),
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

    function addNewAttachments(formData){
      console.log($('#attachment')[0].files)
      myAjax.postAjaxWithFileUpload(apiEndPointAttachments,formData,()=>{ 
        getFreshTicketData(loadTicketData); 
           //Both getFreshTicketData and loadTicketData are callback functions!!!! 
          // This is because we need to wait until all file uploads have been completed and then load the refreshed data.
      });
    }

    function validateForm(){          
      const form = $("form");
      // Trigger HTML5 validity
      let reportValidity = form[0].reportValidity();    
      // Then submit if form is OK.
      if(reportValidity){
        let formData = new FormData(document.getElementsByTagName('form')[0]); //only for file upload          
        modifyNewTicket(formData);                 
      }else{      
         evt.preventDefault();
         evt.stopPropagation();
         evt.stopImmediatePropagation();     
      }  
    }

    function modifyNewTicket(formData) {
      updateBasicTicketData();      
      removeSelectedAttachments();
      insertNewComments();  
      addNewAttachments(formData); 
    }

    function setStatusFieldBorder(){
      mTicketView.statusField.on("change",function(){
        mTicketView.statusField.css('border-color','rgb(125, 163, 163, 0.7)');
      });
    }  

    function getTicketIDByNumber(ticketNr){
      return ticketNr.substring(3,ticketNr.length);    
    }

    function getFreshTicketData(callback){
      localStorage.clear();     
       $.getJSON('api/ticket/get/'+mTicketView.ticketIDField.val(), function(data) {
          localStorage.setItem('ticket', JSON.stringify(data));
          callback();
          });
       
  }

  }

}
