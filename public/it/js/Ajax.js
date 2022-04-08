
class MyAjax{
  constructor(token){
    this.token=token;
  }                  

       /*GET - ADATOK LEKÉRÉSE*/
      //apiEndPoint: ahol megkapja a szervertől (ill. azon keresztül az adatbázistól) a (frissített ill. adott esetben szűrt) adatokat
    getAjax(apiEndPoint, array, myCallback) {
       array.splice(0,array.length); //tömb ürítése, hogy többszöri lefutáskor ne legyen hozzáfűzés
       $.ajax({
         url: apiEndPoint,
         type: "GET",     //GET metódussal lekéri az adatokat az API végpontról, és egy result tömbbe teszi
         success: function (result) {
           result.forEach((element) => { 
             array.push(element);   //a result összes elemét beletöltjük egy tömbbe
           });          
           myCallback(array);   //ha a tömb már teljesen feltöltődött, átadható paraméterként egy függvénynek
          
         },
       });
       console.log('GET OK');
     }


     /*POST - új adat felvitele az AB-ba API végponton keresztül*/
     postAjax(apiEndPoint,newData) {
    
        $.ajax({
          headers: {'X-CSRF-TOKEN': this.token},
          url: apiEndPoint,
          type: "POST",
          data: newData,
          success: function (result) {
            console.log('POST success');
          },
          
          traditional: true,
        });
      }
    
      /*DELETE - adott id-jú adat törlése az AB-ból API végponton keresztül*/
      deleteAjax(apiEndPoint,id) {
        $.ajax({
          headers: {'X-CSRF-TOKEN': this.token},
          url: apiEndPoint+"/"+id,
          type: "DELETE",    
          success: function (result) {
            console.log('DEL success');
          },
        });
      }
    
      /*PUT - dott id-jú adat módosítása az AB-ban API végponton keresztül*/
      putAjax(apiEndPoint,newData,id) {
        $.ajax({
          headers: {'X-CSRF-TOKEN': this.token},
          url: apiEndPoint+"/"+id,
          type: "PUT",  
          data: newData,  
          success: function (result) {
            console.log('PUT success');
          },
        });
      }
    

    }