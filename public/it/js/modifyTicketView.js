class ModifyTicketView {
  constructor() {
    this.attachments = [];  
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
    this.lastUpdatedOn = $("#parentTicket");
    this.lastUpdatedBy = $("#lastUpdatedBy");
    this.attachmentList = $("#attachment-list");
    this.addAttachmentFileInput = $("#attachment"); 
    this.postCommentBtn = $("#comment-btn").children('input'); 
      

   this.setRequiredInputFields();
    this.setAutocompInputFields();

    //add attachments  
    this.addAttachmentFileInput.on("change", (event) => {
      //update displayed list
      this.addAttachments(event);          
      this.eventTrigger('modifyAttachments',this.attachments);  
             
    });   

    //remove attachments
    this.attachmentList.on("click", ".attm-remove-btn", (event) => {
      //update displayed list
      this.removeAttachment(event);
      this.eventTrigger('modifyAttachments',this.attachments);   
    });  


    $("#comment-template").hide();
    this.draftComment();
  }

  eventTrigger(eventName, eventDetail) {
    let ev = new CustomEvent(eventName, {
      detail: eventDetail,
    });
    window.dispatchEvent(ev);
  }


  setRequiredInputFields(){    
    const requiredfields = [this.callerField, this.impactField, this.urgencyField, 
      this.priorityField, this.subjpersonField, this.serviceField, this.categoryField, this.titleField, 
      this.descriptionField, this.contactTypeField]
    requiredfields.forEach(element => {
      element.attr("required",true);
    });
     
  }

  addAttachments(event) {    
      if (event.target.files.length <= 10) {
        for (let index = 0; index < event.target.files.length; index++) {
          let fileName = event.target.files[index].name;
          let fileExt = fileName.substring(fileName.lastIndexOf("."));
          const allowedTypes = [
            ".pdf",
            ".jpeg",
            ".jpg",
            ".JPG",
            ".png",
            ".PNG",
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
          if (jQuery.inArray(fileExt, allowedTypes) == -1) {
            alert(
              "Unsupported file format! Permitted file formats are: .jpg, .jpeg, .png, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .zip, .msg"
            );
            return false;
          } else {
            if (jQuery.inArray(fileName, this.attachments) === -1) {
              this.attachments.push(fileName);
              //send the filename to the controller if it is not in the attachment display list   
              this.eventTrigger('newFile',fileName); 
            } else {
              confirm("Some of the selected files are already in the list!");             
              return false;
            }
          }
        }
        this.displayAttachmentList();
      } else {
        alert("Max. 10 files are allowed to be attached!");
      }   
  }

  displayAttachmentList() {
    this.attachmentList.empty();
    this.attachments.forEach((element, index) => {
      this.attachmentList.append(
        "<div id='attachment" +
          index +
          "'>&#128206 " +
          element +
          " <div class='attm-remove-btn'>x</div></div>"
      );
    });
  }

  removeAttachment(event) {   
      //identify index of attachment based on the id
      let attIndex = $(event.target).parent().closest("div").attr("id").slice(-1);
      //remove it from the attachment display list
      this.attachments.splice(attIndex, 1);
      //get the filename
      let txt = ($(event.target).parent().closest("div")).text();
      let filename = txt.substring(3,txt.length-2);     
      //check if the selected file is amongst the already existing attachments
      //if so, add forward details of the related object to the controller and remove it from this.existingAttachments
      let i;  
      if(this.existingAttachments.length>0){   
      this.existingAttachments.forEach((element, index) => {
        if(element.filename===filename){      
          i=index;    
          this.eventTrigger("deleteExistingAttachment",element);
        }
      });   
      this.existingAttachments.splice(i, 1); 
    }  
     //send filename to controller to check if the attachment to be removed is amongst the new attachments to be added;
     this.eventTrigger("checkifNewAttachment",filename);       
     this.displayAttachmentList();    
  }

  
  
  autoComp(selector, attributeName,apiEndPoint) {    
    selector
      .autocomplete({
        source: function (request, response) {
          $.ajax({
            url: apiEndPoint + "?" + attributeName + "_like=" + request.term,
            dataType: "json",
            data: {
              q: request.term,
            },
            success: function (data) {
              if (data.length > 0) {
                response(
                  $.map(data, function (item) {
                    return {
                      label: item["id"],
                      value: item[attributeName],
                    };
                  })
                );
              } else {
                //If no records found, set the default "No match found" item with label null.
                response([{ label: null, value: "No results found." }]);
              }
            },
          });
        },
        minlength: 3,
        select: (e, u) => {
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
          if (!(u.item === null || u.item === undefined)) {
               selector.val(u.item.value); // take from attribute and insert as value
          } else {
               selector.val("");
          }
        },
      })
      .data("uiAutocomplete")._renderItem = function (ul, item) {
      //get position of the selector being clicked onto
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
    };      
  }

  draftComment(){
       //post a comment (only at frontend level)    
       this.postCommentBtn.on("click",()=>{
        $("#comments-empty").hide(); 
        let commentDescription = $("#comment").val();       
        if(!commentDescription==""){
        $("#comment-template .comment-item").clone().prependTo("#comment-draft");
        $("#comment-draft .comment-item").eq(0).children(".comment-description").text(commentDescription); 
       //transfer description of new comment to controller
       this.eventTrigger("newComments", commentDescription); 
       $("#comment").val("");  
      }
        else
        {(alert("Empty comment field!"));
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
    const apiEndPointUsers = "http://localhost:3000/users";
    const apiEndPointCategories = "http://localhost:3000/categories";    
    const apiEndPointResolvers = "http://localhost:3000/resolvers"; 
    const apiEndPointTickets = "http://localhost:3000/tickets";
        
    $(window).on( {
      keyup: (event) => {   
       let selectorName = $(event.target).attr("id");          
      switch (selectorName) {        
        case "caller":                                 
          this.autoComp($("#caller"), "name", apiEndPointUsers);                           
          break;
        case "subjperson":                  
          this.autoComp($("#subjperson"), "name", apiEndPointUsers);
          break;
        case "assignedTo":                            
          this.autoComp($("#assignedTo"), "name",apiEndPointUsers);
          break;
        case "service":               
          this.autoComp($("#service"), "name",apiEndPointCategories); //
          break;
        case "category":                
          this.autoComp($("#category"), "name",apiEndPointCategories); //ez meg nem jo: majd kulon utvonal kell csak a fokategoriakra
           break;
        case "assignmentGroup":                   
           this.autoComp($("#assignmentGroup"), "name",apiEndPointResolvers); //ez meg nem jo: majd kulon utvonal kell csak a fokategoriakra
           break;   
           case "parentTicket":                   
           this.autoComp($("#parentTicket"), "id",apiEndPointTickets); //ez meg nem jo: majd kulon utvonal kell csak a fokategoriakra
           break;      
        default: ;        
      };    
           
    } 

    
   
    });

  }
}


class CommentItem{
  constructor(container,data){
     this.container = container;  
     this.data = data;     
     this.commentTemplateItem = $("#comment-template .comment-item");
     this.headerItem = this.commentTemplateItem.children(".comment-header");
     this.descriptionItem = this.commentTemplateItem.children(".comment-description");
     this.changedFieldsItem = this.commentTemplateItem.children(".changed-fields");
     this.setData(this.data);
     this.commentTemplateItem.clone().appendTo(container);    
  }
  setData(data){
   console.log("setdata")
    this.data = data; 
    this.descriptionItem.text(data.description);
  }
}
