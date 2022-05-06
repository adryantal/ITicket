class ModifyTicketView {
  constructor() {  
    this.existingAttachments = [];   
    this.ticketIDField = $("#ticketID");
    this.callerField = $("#caller");
    this.statusField = $("#status");
    this.impactField = $("#impact");
    this.urgencyField = $("#urgency");
    this.priorityField = $("#priority");
    this.typeField = $("#type");
    this.subjpersonField = $("#subjperson");
    this.assignedToField = $("#assignedTo");
    this.createdOnField = $("#createdOn");
    this.createdByField = $("#createdBy");
    this.serviceField = $("#service");
    this.categoryField = $("#category");
    this.assignmentGroupField = $("#assignmentGroup");
    this.contactTypeField = $("#contactType");
    this.descriptionField = $("#description");
    this.titleField = $("#title");
    this.parentTicketField = $("#parentTicket");
    this.timeLeftField = $('#timeLeft');
    this.timeSpentField = $('#timeSpent');
    this.lastUpdatedOn = $("#lastUpdatedOn");
    this.lastUpdatedBy = $("#lastUpdatedBy");
    this.attachmentContainer = $('#attachment-container');
    this.attachmentList = $("#existing-attachments");
    this.draftAttachmentList = $("#draft-attachments");
    this.addAttachmentFileInput = $("#attachment"); 
    this.postCommentBtn = $("#comment-btn").children('input'); 
    this.commentTextArea = $("#comment");        
    this.serviceID="";
    this.assignmentGroupID="";
   
   
    //disable assignedTo and category fields
    this.categoryField.attr('disabled', 'disabled'); 
    this.assignedToField.attr('disabled', 'disabled');
    //controlling the status of the below 2 fields
    this.disableChildInputOnChange(this.serviceField,this.categoryField);
    this.disableChildInputOnChange(this.assignmentGroupField,this.assignedToField);    
   

    this.setRequiredInputFields();
    this.setAutocompInputFields();   
 

    //add new attachments  
    this.addAttachmentFileInput.on("change", (event) => {
      for (let index = 0; index < $('#attachment')[0].files.length; index++) {   
        this.validateFileToUpload(index);    
      }     
      this.displayDraftAttachments();                 
    });   

    //remove attachments
    this.attachmentList.on("click", ".attm-remove-btn", (event) => {
      //update attachment display list
      this.removeAttachment(event);    
    });  

   //hide comment template item
    $("#comment-template").hide();

    //prepare comment drafts
    this.draftComment();    
 
  }
 
  eventTrigger(eventName, eventDetail) {
    let ev = new CustomEvent(eventName, {
      detail: eventDetail,
    });
    window.dispatchEvent(ev);
  }


  setRequiredInputFields(){    
    const requiredfields = [this.callerField, this.impactField, this.urgencyField,  this.priorityField, this.subjpersonField, 
      this.serviceField, this.categoryField, this.titleField,    this.descriptionField, this.contactTypeField, this.assignedToField]
    requiredfields.forEach(element => {
      element.attr("required",true);
    });  
     
  }

validateFileToUpload(index){
          //validation of files to be uploaded
          let sizeTooBig = false;
          let unsupportedFormat = false;
          if($('#attachment')[0].files[index].size > 1048576 ){
            alert("At least one of the selected files is too big! (Max. file size is 1MB.)");
            sizeTooBig=true;          
         };
         let fileName = $('#attachment')[0].files[index].name;
         let fileExt = fileName.substring(fileName.lastIndexOf("."));
         const allowedTypes = [
          ".pdf",
          ".jpeg",
          ".jpg",
          ".JPG",
          ".png",
          ".pdf",
          ".doc",
          ".docx",
          ".xls",
          ".xlsx",
          ".ppt",
          ".pptx",
          ".txt",
          ".zip",
          ".msg",
        ];    
        if(jQuery.inArray(fileExt, allowedTypes) == -1) {
          alert("Unsupported file format! Permitted file formats are: .jpg, .jpeg, .png, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .zip, .msg");
          unsupportedFormat = true;        
        }
         if(sizeTooBig || unsupportedFormat){
          $('#attachment')[0].value = "";
         }
  }

  //display existing attachments
  displayAttachmentList() {
    this.attachmentList.empty(); 
    this.draftAttachmentList.empty();       
    this.existingAttachments.forEach((element, index) => {
      this.attachmentList.append( //create an attribute for the database id and filename in the tags
        "<div id='attachment" +  index + "' dbid=" +  element.id + "'><a href='storage/attachments/"+element.path +"'>&#128206 " + element.name + "</a> <div class='attm-remove-btn'>x</div></div>"
      );
    });
    
  }
 //display new attachments selected for upload
  displayDraftAttachments(){    
    this.draftAttachmentList.empty();    
      for (let index = 0; index < $('#attachment')[0].files.length; index++) {    
        this.draftAttachmentList.append(
          "<div id='newattachment" +  index +  "'>&#128206 " +  $('#attachment')[0].files[index].name);
      }
  }

  removeAttachment(event) {   
      //identify array index of the selected attachment, based on the tag id
      let attID = $(event.target).parent().closest("div").attr("id");
      let attIndex = attID.substring(10,attID.length);      
      //remove it from the attachment display list based on the index
      this.existingAttachments.splice(attIndex, 1);
      //read the database id of the file from the tag      
      let dbid = $(event.target).parent().closest("div").attr("dbid");
      //forward the database id of the related object to the controller
      this.eventTrigger("deleteExistingAttachment", dbid);           
     this.displayAttachmentList();    
     this.displayDraftAttachments(); 
  }

  autoCompForTicketNrs(selector, attributeName,apiEndPoint) {       
    selector.autocomplete({
        source: function (request, response) {           
          $.ajax({
            url:  apiEndPoint,
            dataType: "json",
            data: {
              ticketnr_like : request.term,              
            },
            success: function (data) {
              if (data.length > 0) {             
              response(
                $.map(data, function (item) {
                  return {
                    label : item["id"],
                    value: item[attributeName],
                  };
                })
              );
            } else {
              //If no records found, set the default "No match found" item with label null.
              response([{ label:null, value: 'No results found.'}]);                  
              }
            },
          });
        },
        minlength: 3,        
            select:  (e, u) =>{
                //If the No match found" item is selected, clear the TextBox.
                if (u.item.value == "No results found.") {
                    selector.val("");
                    return false;
                } else {
                    //if results are found, create a new hidden input field to store the ID
                    this.addHiddenInputField(selector.attr("id"), u.item.label);
                }                                    
            },
            change: function (e, u) {        
              if(!(u.item === null || u.item===undefined || u.item.value=='No results found.')){
               selector.val(u.item.value); // take from attribute and insert as value              
              }else{
                selector.val(""); 
              }
          }
      })
      .data("uiAutocomplete")._renderItem = function (ul, item) {
      //get position of the selector being clicked on  
      let inputFieldPosition = selector.position();          
        $(ul).addClass("ac-template");
        //set position of the autocomplete based on the selector's position
        $(ul).css({
            top: inputFieldPosition.top + 20,
            left: inputFieldPosition.left,
            position: "absolute",
        });
        let html;       
          html = "<a>" + item.value + "</a>";      
        return $("<li></li>").data("item.autocomplete", item).append(html).appendTo(ul);
    }      
  }

  
 autoComp(selector, attributeName,apiEndPoint) {       
    selector.autocomplete({
        source: function (request, response) {           
          $.ajax({
            url:  apiEndPoint,
            dataType: "json",
            data: {
              name_like : request.term,    //a query expression-t sajnos nem lehetet változón keresztül átadni-- >emiatt elengedhetetlen a "kódduplikáció"         
            },
            success: function (data) {
              if (data.length > 0) {             
              response(
                $.map(data, function (item) {
                  return {
                    label : item["id"],
                    value: item[attributeName],
                  };
                })
              );
            } else {
              //If no records found, set the default "No match found" item with label null.
              response([{ label:null, value: 'No results found.'}]);                              
              }
            },
          });
        },
        minlength: 3,        
            select:  (e, u) =>{
                //If no match is found when item is selected, clear the TextBox.
                if (u.item.value == 'No results found.') {                  
                  selector.val("");                 
                    return false;
                }else{ 
                  //if results are found, create a new hidden input field to store the ID                                
                  this.addHiddenInputField(selector.attr("id"),u.item.label); 
                  if(selector.attr("id")==='service') {               
                    this.serviceID=u.item.label;  //if a service has been seleted, get the selected service's ID (needed in order to determine the related categories)   
                    this.categoryField.removeAttr('disabled');
                  }   
                  if(selector.attr("id")==='assignmentGroup') {               
                    this.assignmentGroupID=u.item.label;  //if an assign.group has been seleted, get the selected group's ID (needed in order to determine the team members)   
                    this.assignedToField.removeAttr('disabled');
                  }        
                }                                    
            },
            change: function (e, u) {        
              if(!(u.item === null || u.item===undefined || u.item.value=='No results found.')){
               selector.val(u.item.value); // take from attribute and insert as value              
              }else{
                selector.val(""); 
              }
          }
      })
      .data("uiAutocomplete")._renderItem = function (ul, item) {
      //get position of the selector being clicked on  
      let inputFieldPosition = selector.position();          
        $(ul).addClass("ac-template");
      //set position of the autocomplete based on the selector's position 
        $(ul).css({
          top: inputFieldPosition.top + 20,
          left: inputFieldPosition.left,
          position: "absolute",
        });   
        const showNameAndID = ["caller", "subjperson", "assignedTo"]; //show both name and ID in autocomplete dropdown for these selectors
        let html;       
        if (jQuery.inArray(selector.attr("id"), showNameAndID) > -1) {
             html = "<a>" + item.value + (item.label === "No results found." ? "" : " (" + item.label + ")") + "</a>";
      } else {
            html = "<a>" + item.value + "</a>";
      }
        return $("<li></li>").data("item.autocomplete", item).append(html).appendTo(ul);
    }      
  }

  draftComment(){
      //post a comment (only at frontend level)
      this.postCommentBtn.on("click", () => {
          $("#comments-empty").hide();
          $("#comment-template .comment-timestamp").text(""); // ide lehetne egy date now? úgyse szúródik be AB-be...
          $("#comment-template .comment-creator").text(" Draft comment");
          $("#comment-template .handling-team").text('| To save click on "Submit"');
          $("#comment-template .status-indication-bar").hide();
          let commentDescription = $("#comment").val();
          if (!commentDescription == "") { 
              $("#comment-template .comment-item")
                  .clone()
                  .prependTo("#comment-draft");
              $("#comment-draft .comment-item")
                  .eq(0)
                  .children(".comment-description")
                  .text(commentDescription);
              //transfer description of new comment to controller (only description value gets transferred, so values of the other fields can be modified at the frontend at each click)
              this.eventTrigger("newComments", commentDescription);
              $("#comment").val("");
          } else {
            if($("#comment-draft .comment-item").length===0){
              alert("Empty comment field!"); ///////////
            }
          }
      });
  }

  addHiddenInputField(selectorName,val){
    const hiddenInputID = selectorName+"ID";
    //if a hidden input field with the same ID already exists, then remove it 
    if($("#" + hiddenInputID).length>0){ 
      $("#" + hiddenInputID).remove();
    }
    //create a new hidden input field
    $('<input>').attr({
      type: 'hidden',
      id: hiddenInputID,
      name: hiddenInputID,  
      value: val    
  }).appendTo('form');
  } 

  setAutocompInputFields(){    
    const apiEndPointUsers = "api/user/all/active/filter";   //active users only    
    const apiEndPointServices = "api/service/all/filter";  
    const apiEndPointPTickets = "/api/ticket/parentfor/"+this.ticketIDField.val();   
    const apiEndPointResolvers = "api/resolver/all/filter"; 
        
         
    $(window).on( {     
      keypress: (event) => {           
       let selectorName = $(event.target).attr("id");          
      switch (selectorName) {        
        case "caller":                         
          this.autoComp($("#caller"), "name", apiEndPointUsers);                           
          break;
        case "subjperson":                  
          this.autoComp($("#subjperson"), "name", apiEndPointUsers);
          break;
        case "assignedTo":                            
          this.autoComp($("#assignedTo"), "name","api/resolver/"+this.assignmentGroupID+"/users/filter");
          break;
        case "service":               
          this.autoComp($("#service"), "name",apiEndPointServices);         
          break;
        case "category": 
          if(!this.serviceField.val()==""){                                  
          this.autoComp($("#category"), "name","api/service/"+this.serviceID+"/categories/filter"); 
          }
          case "parentTicket":               
          this.autoCompForTicketNrs($("#parentTicket"), "ticketnr",apiEndPointPTickets);         
          break;     
          case "assignmentGroup":               
          this.autoComp($("#assignmentGroup"), "name",apiEndPointResolvers);         
          break;                       
        default: ;        
      };  
           
    }
    });
  }

   
   disableChildInputOnChange(parentSelector,childSelector){
    parentSelector.on("input", ()=> {
      childSelector.val(''); 
      childSelector.attr('disabled', 'disabled'); 
    });
  
   }
}


class CommentItem{
  constructor(container,data){  
     this.container = container;  
     this.data = data;     
     this.commentTemplateItem = $("#comment-template .comment-item");
     this.headerItem = this.commentTemplateItem.children(".comment-header");
     this.statusIndicationBarItem = this.commentTemplateItem.children(".status-indication-bar");
     this.descriptionItem = this.commentTemplateItem.children(".comment-description");
     this.timeStampField = this.headerItem.children().children(".comment-timestamp");
    
     this.commentCreatorField = this.headerItem.children().children(".comment-creator");
     this.handlingTeamField = this.headerItem.children().children(".handling-team");
     this.setData(this.data);
     this.commentTemplateItem.clone().appendTo(container);    
  }
  setData(data){ 
    this.data = data; 
    this.descriptionItem.text(this.data.comment);    
    this.timeStampField.text(this.data.updated);    
    this.commentCreatorField.text(this.data.updatedby+" @ ");
    this.handlingTeamField.text(this.data.assignment_group_name);
    this.statusIndicationBarItem.show();
    this.statusIndicationBarItem.html('Status set to: <b>'+this.data.status+'</b>');


}
}