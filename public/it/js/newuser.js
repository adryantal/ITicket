$(function(){
  $("#resolver").attr('disabled','disabled'); 
    $("#department").on('input',()=>{        
      let deptVal = $("#department").val().toUpperCase();;  
      if(deptVal==='IT'){
          $("#resolver").removeAttr('disabled'); 
          if($("#resolver").val() === 'selection'){
               $('.submit').css('pointer-events', 'none');
          }          
          $('#resolver').change(function(){
            if($(this).val() == 'selection'){ // or this.value == ''
              $('.submit').css('pointer-events', 'none');
            }else{
              $('.submit').css('pointer-events', 'auto');
            }
      });
    }else{
        $("#resolver").attr('disabled','disabled');  
        $('.submit').css('pointer-events', 'auto');
        document.getElementById("resolver").selectedIndex = "0";    
    }
});    
});