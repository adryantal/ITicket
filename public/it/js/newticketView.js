class NewTicketView {
  constructor() {  
    this.ticketIDField = $("#ticketID");
    this.callerField = $("#caller");    
    this.impactField = $("#impact");
    this.urgencyField = $("#urgency");
    this.priorityField = $("#priority");
    this.typeField = $("#type");
    this.subjpersonField = $("#subjperson");
    this.assignedToField = $("#assignedTo");
    this.createdByField = $("#createdBy");
    this.serviceField = $("#service");
    this.categoryField = $("#category");
    this.statusField = $("#status");
    this.assignmentGroupField = $("#assignmentGroup");
    this.contactTypeField = $("#contactType");
    this.descriptionField = $("#description");
    this.titleField = $("#title");    
    this.parentTicketField = $("#parentTicket");
    this.attachmentList = $("#attachment-list");
    this.addAttachmentFileInput = $("#attachment");    
    this.ResetFormBtn = $("#reset");    
    this.submissionConfirmationWindow=$('#submission-confirmation');
    this.confirmationCloseBtn=$("#confirmation-close-btn");
    this.alertBox = $('#alerts')
    this.alertCloseBtn = $('#alert-close-btn a');
    this.serviceID="";    

     //handle displaying of custom alert messages
    this.alertBox.hide();
    this.alertCloseBtn.on('click',()=>{
      this.alertBox.hide();     
    })

    this.submissionConfirmationWindow.hide();  
    this.confirmationCloseBtn.on("click",()=>{
      this.submissionConfirmationWindow.hide()
    });

    this.categoryField.attr('disabled', 'disabled'); 
    this.setRequiredInputFields();
    this.setAutocompInputFields();

    //attachment / file upload  
    this.addAttachmentFileInput.on("change", (event) => {
      if ($("#attachment")[0].files.length > 10) {
         this.displayAlert("You can upload maximum 10 files!");
     } else {  
        this.hideAlert();        
        for (let index = 0; index < $('#attachment')[0].files.length; index++) {   
            this.validateFileToUpload(index);    
        }     
      this.displayAttachmentList(); 
    }        
    }); 
    
   //reset form
    this.resetForm(); 
  }
  validateFileToUpload(index){
          //validation of files to be uploaded
          let sizeTooBig = false;
          let unsupportedFormat = false;
          if($('#attachment')[0].files[index].size > 1048576 ){
            this.displayAlert("At least one of the selected files is too big! (Max. file size is 1MB.)");
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
          this.displayAlert("Unsupported file format! Permitted file formats are: .jpg, .jpeg, .png, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .zip, .msg");
          unsupportedFormat = true;        
        }
         if(sizeTooBig || unsupportedFormat){
          $('#attachment')[0].value = "";
         }
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
      this.descriptionField, this.contactTypeField, this.assignedToField]
    requiredfields.forEach(element => {
      element.attr("required",true);
    });     
  }

  
  displayAttachmentList() {
    this.attachmentList.empty();
   for (let index = 0; index < $('#attachment')[0].files.length; index++) {    
      this.attachmentList.append(
        "<div id='attachment" +  index +  "'>&#128206 " +  $('#attachment')[0].files[index].name  );
    }
  }  
  
  resetForm(){
    this.ResetFormBtn.on("click",()=>{
      this.resetAllFields();         
    });  
  }

   resetAllFields(){ 
    this.displayAttachmentList();
    $("form input[type=text], form input[type=number], form textarea").val('');     
    this.assignmentGroupField.val('IT Helpdesk');
    this.statusField.val('New');
    $('form option').prop('selected', function() {
      return this.defaultSelected;
  });  
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
                if (u.item.value == 'No results found.') {                  
                  selector.val("");                 
                    return false;
                }else{ 
                  //if results are found, create a new hidden input field to store the ID                                
                  this.addHiddenInputField(selector.attr("id"),u.item.label);                          
                }                                    
            },
            change: function (e, u) {        
              if(!(u.item === null || u.item===undefined)){
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
                //If the No match found" item is selected, clear the TextBox.
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
    const apiEndPointUsers = "api/user/all/active/filter";  //active users only     
    const apiEndPointServices = "api/service/all/filter";  
    const apiEndPointTickets = "api/ticket/all/searchtickets";        
    $(window).on( {
      mouseenter: (event) => {           
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
          this.autoComp($("#service"), "name",apiEndPointServices);         
          break;
        case "category": 
          if(!this.serviceField.val()==""){                                  
          this.autoComp($("#category"), "name","api/service/"+this.serviceID+"/categories/filter"); 
          }
          case "parentTicket":               
          this.autoCompForTicketNrs($("#parentTicket"), "ticketnr",apiEndPointTickets);         
          break;                         
        default: ;        
      };            
    } , keyup:()=> {
        if(this.serviceField.val()==='') {  
          this.categoryField.val(''); 
            this.categoryField.attr('disabled', 'disabled'); 
        } 
      }
    });

  }

  displayAlert(message){
    $('#alerts').removeClass('info');             
    $('#alerts').addClass('error');
    $('#alerts').show();
    $('form #ajax-messages').text(message); 
   }

   hideAlert(){
    $('#alerts').removeClass('error');   
    $('#alerts').removeClass('info');  
    $('#alerts').hide();
    $('form #ajax-messages').text('');
   }
}
