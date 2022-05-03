$(function(){
 
    new ModifyUserController();    
});

class ModifyUserController{
    constructor(){

  const token = $('meta[name="csrf-token"]').attr("content");
  const myAjax = new MyAjax(token);

   this.nameInputField = $('#name');
   this.idInputField = $('#id');   
   this.adIdInputField = $('#ad_id'); 
   this.departmentInputField = $('#department'); 
   this.phoneNumberInputField = $('#phone_number');
   this.activeInputField = $('#active'); 
   this.passwordInputField = $('#password');
   this.resolverDropdown = $("#resolver"); 
   this.submitBtn = $("#btn-submit");    

   this.setAutocompInputFields();
  
   this.submitBtn.on("click",(evt)=>{   
    if(validateForm(evt)){
        let apiEndPointUser = 'api/user';
        let newData = {               
                "name":this.nameInputField.val(),
                "password":this.passwordInputField.val(),
                "ad_id":this.adIdInputField.val(),
                "active":this.activeInputField.val(),
                "phone_number":this.phoneNumberInputField.val(),
                "department": this.departmentInputField.val(),
                "resolver_id": this.resolverDropdown.val(),
            };
        myAjax.putAjax(apiEndPointUser,newData,this.idInputField.val());
    
    }

   
    
   })

   function validateForm(evt){ 
     let valid=false;           
    const form = $("form");
    // Trigger HTML5 validity
    let reportValidity = form[0].reportValidity();
    // Then submit if form is OK.
    if (reportValidity) {         
        valid=true;
    } else {       
      evt.preventDefault();
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
     return valid;
  }


    } 

     
 autoComp(selector, apiEndPoint) {      
    selector.autocomplete({
        source: function (request, response) {           
          $.ajax({
            url:  apiEndPoint,
            dataType: "json",
            data: {
              name_like : request.term,           
            },
            success: function (data) {
              if (data.length > 0) {             
              response(
                $.map(data, function (item) {
                  return {
                    label : item["id"],
                    value: item["name"],
                    ad_id : item['ad_id'],
                    phone_number : item['phone_number'],
                    department : item['department'],
                    resolver_id : item['resolver_id'],
                    active : item['active'],
                    password : item['password'],
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
                  $('input').val('');
                  this.resolverDropdown.prop('selectedIndex', 0); 
                  this.resolverDropdown.attr('disabled','disabled');             
                    return false;
                }else{ 
                    //load attribute values
                   this.loadAttributeValues(u.item); 
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
        let inputFieldPosition = selector.position();          
        $(ul).addClass("ac-template");      
        $(ul).css({
          top: inputFieldPosition.top + 20,
          left: inputFieldPosition.left,
          position: "absolute",
        });    
        let html;       
        html = "<a>" + item.value + (item.label === "No results found." ? "" : " (" + item.label + ")") + "</a>";    
        return $("<li></li>").data("item.autocomplete", item).append(html).appendTo(ul);
    }      
  }

  setAutocompInputFields(){    
    const apiEndPointUsers = "api/user/all/filter/excauth";  //all users except the one logged in       
    $(window).on( {     
      keydown: (event) => { 
        $('.alert-primary').remove();          
       let selectorName = $(event.target).attr("id");             
      switch (selectorName) {        
        case "name":                         
          this.autoComp($("#name"), apiEndPointUsers);                           
          break;                             
        default: ;        
      };           
    }
    });
  }

  loadAttributeValues(data){
    this.nameInputField.val(data.value);
    this.idInputField.val(data.label);
    this.adIdInputField.val(data.ad_id);
    this.phoneNumberInputField.val(data.phone_number);
    this.activeInputField.val(data.active);
    this.departmentInputField.val(data.department);                    
    this.resolverDropdown.val(data.resolver_id).change(); 
    if(data.department === 'IT'){
        this.resolverDropdown.removeAttr('disabled');
    }else{
        this.resolverDropdown.attr('disabled','disabled');
        this.resolverDropdown.prop('selectedIndex', 0); 
    }
  }
}