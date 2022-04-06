
 
class ModifyTicketController {
  constructor() {
    new FrameView();
    const mTicketView = new ModifyTicketView();
    const myAjax = new MyAjax();
    let attachmentsArray = []; //attachments display list
    let attachmentsToBeAdded = [];
    let attachmentToBeRemoved = [];
    let commentsArray = [];
    let commentsToBeInserted = [];
    let apiEndPointTicket = "http://localhost:3000/tickets";
    let apiEndPointAttachments = "http://localhost:3000/attachments";
    let apiendPointJournals = "http://localhost:3000/journals";
    
  //read in ticketID from the URL
  const index = document.URL.indexOf("=");
  let ticketID = document.URL.substring(index + 1, document.URL.length);
  let apiEndPointSelectedTicket = "http://localhost:3000/tickets?id=" + ticketID;


    loadTicketData();
 
   
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
      validateForm();
    });  

  
    function loadTicketData(){
      loadBasicTicketData();
      loadAttachments();
      loadComments();
    }

    function loadBasicTicketData() {
      /*LOAD BASIC DETAILS*/
      //load ticket data from API endpoint
      const tArray = [];
      myAjax.getAjax(apiEndPointSelectedTicket, tArray, function () {
        mTicketView.ticketIDField.val(tArray[0].id);
        mTicketView.callerField.val(tArray[0].caller_name);
        mTicketView.subjpersonField.val(tArray[0].subjperson_name);
        mTicketView.serviceField.val(tArray[0].service_name);
        mTicketView.statusField.val(tArray[0].status);
        mTicketView.categoryField.val(tArray[0].category_name);
        mTicketView.impactField.val(tArray[0].impact);
        mTicketView.priorityField.val(tArray[0].priority);
        mTicketView.urgencyField.val(tArray[0].urgency);
        mTicketView.assignmentGroupField.val(tArray[0].assignment_group_name);
        mTicketView.assignedToField.val(tArray[0].assigned_to_name);
        mTicketView.titleField.val(tArray[0].title);
        mTicketView.typeField.val(tArray[0].type);
        mTicketView.descriptionField.val(tArray[0].description);
        mTicketView.contactTypeField.val(tArray[0].contact_type);
        mTicketView.parentTicketField.val(tArray[0].parent_ticket);
        mTicketView.createdByField.val(tArray[0].created_by_name);
        mTicketView.createdOnField.val(tArray[0].created_on);
        mTicketView.lastUpdatedBy.val(tArray[0].updated_by_name);
        mTicketView.lastUpdatedOn.val(tArray[0].updated);
        mTicketView.parentTicketField.val(tArray[0].parent_ticket);
        //creating hidden input fields for the IDs
        mTicketView.addHiddenInputField("caller", tArray[0].caller_id);
        mTicketView.addHiddenInputField("subjperson", tArray[0].subjperson_id);
        mTicketView.addHiddenInputField("assignedTo", tArray[0].assigned_to_id);
        mTicketView.addHiddenInputField(
          "assignmentGroup",
          tArray[0].assignment_group_id
        );
        mTicketView.addHiddenInputField("service", tArray[0].service_id);
        mTicketView.addHiddenInputField("category", tArray[0].category_id);
      });
    }

    
    function loadAttachments(){
      //loading attachments
      let apiEndPointAttachmentsPerTicket =
        "http://localhost:3000/attachments?ticket_id=" + ticketID;
      myAjax.getAjax(
        apiEndPointAttachmentsPerTicket,
        mTicketView.existingAttachments,
        function () {
          mTicketView.existingAttachments.forEach((element, index) => {
            mTicketView.attachments.push(element.file_name);
            mTicketView.displayAttachmentList();
          });
        }
      );  
    }

    function loadComments(){
      //loading comments   
      let apiEndPointJournalsPerTicket = 'http://localhost:3000/journals?ticket_id=' + ticketID+'&_sort=id&_order=DESC';
      const commentContainer = $("#comment-history");
        myAjax.getAjax(
         apiEndPointJournalsPerTicket,
       commentsArray,
       function () {   
         commentsArray.forEach((element, index) => {        
           new CommentItem(commentContainer,element);
           console.log("description"+index+ " " +element.description)
         });
         
         if (commentsArray.length>0){
           $("#comment-draft").html("");
           commentsArray.splice(0,commentsArray.length);
         }
       }    
     );
   }

    function updateBasicTicketData() {
      /*insert value of the input fields to the Tickets table*/
      let modifiedTicketData = {
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
        created_on: "",
        created_by_name: mTicketView.createdByField.val(),
        updated: "",
        updated_by: "",
        description: mTicketView.descriptionField.val(),
        contact_type: mTicketView.contactTypeField.val(),
        parent_ticket: mTicketView.parentTicketField.val(),
        //attachments: attachmentsArray

        //reading data from hidden input fields
        caller_id: $("#callerID").val(),
        subjperson_id: $("#subjpersonID").val(),
        service_id: $("#serviceID").val(),
        category_id: $("#categoryID").val(),
        assigned_to_id: $("#assignedToID").val(),
        assignment_group_id: $("#assignmentGroupID").val(),
      };
      myAjax.putAjax(
        apiEndPointTicket,
        modifiedTicketData,
        mTicketView.ticketIDField.val()
      );
    }

    function updateAttachments(){
      /*UPDATE ATTACHMENTS*/
      /*insert new attachments to the Attachments table*/
      let now = new Date(Date.now());
      let dateTimeNow =
        $.datepicker.formatDate("yy-mm-dd", now) +
        " " +
        now.getHours() +
        ":" +
        now.getMinutes() +
        ":" +
        now.getSeconds();
      attachmentsToBeAdded.forEach((element) => {
        let newAttData = {
          date: dateTimeNow,
          ticket_id: mTicketView.ticketIDField.val(),
          file_name: element,
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
       commentsToBeInserted.forEach((element) => {
        let newCommentData = {
          description: element,
          ticket_id: mTicketView.ticketIDField.val(),
        };
        myAjax.postAjax(apiendPointJournals, newCommentData);
      });
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
      updateAttachments();
      insertNewComments();    
    }



  }

}
