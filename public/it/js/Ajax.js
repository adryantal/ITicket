
class MyAjax {
    constructor(token) {
        this.token = token;
    }

    /*GET - ADATOK LEKÉRÉSE*/
    //apiEndPoint: ahol megkapja a szervertől (ill. azon keresztül az adatbázistól) a (frissített ill. adott esetben szűrt) adatokat
    getAjax(apiEndPoint, array, myCallback) {
        array.splice(0, array.length); //tömb ürítése, hogy többszöri lefutáskor ne legyen hozzáfűzés
        $.ajax({
            url: apiEndPoint,
            type: "GET", //GET metódussal lekéri az adatokat az API végpontról, és egy result tömbbe teszi
            success: function (result) {
                result.forEach((element) => {
                    array.push(element); //a result összes elemét beletöltjük egy tömbbe
                });
                myCallback(array); //ha a tömb már teljesen feltöltődött, átadható paraméterként egy függvénynek
            },
        });
        console.log("GET OK");
    }

    /*POST - új adat felvitele az AB-ba API végponton keresztül*/
    postAjax(apiEndPoint, newData) {
        newData._token = this.token;
        $.ajax({
            headers: { "X-CSRF-TOKEN": this.token },
            url: apiEndPoint,
            type: "POST",
            data: newData,
            success: function (result) {
                console.log("POST success");
            },
        });
    }

    /*POST - új adat felvitele az AB-ba API végponton keresztül + fájl feltöltése*/

    postAjaxWithFileUpload(apiEndPoint, newData, myCallback) {
        newData._token = this.token;        
        $.ajax({
            headers: { "X-CSRF-TOKEN": this.token },
            url: apiEndPoint,
            enctype: "multipart/form-data",
            processData: false,
            contentType: false,
            cache: false,
            type: "POST",
            data: newData,
            success: function (result) {
                console.log("POST success");
                myCallback();
            },
        });
    }

    /*POST - új adat felvitele tömbösen az AB-ba API végponton keresztül*/
    postAjaxForArray(apiEndPoint, requestData) {
        requestData._token = this.token;
        $.ajax({
            headers: { "X-CSRF-TOKEN": this.token },
            url: apiEndPoint,
            type: "POST",
            data: { data: requestData },
            success: function (data) {
                console.log("POST success");                
            },
        });
    }

    /*DELETE - adott id-jú adat törlése az AB-ból API végponton keresztül*/
    deleteAjax(apiEndPoint, id) {
        $.ajax({
            headers: { "X-CSRF-TOKEN": this.token },
            url: apiEndPoint + "/" + id,
            type: "DELETE",
            success: function (result) {
                console.log("DEL success");
            },
        });
    }

    /*PUT - adott id-jú adat módosítása az AB-ban API végponton keresztül*/
    putAjax(apiEndPoint, newData, id) {
        newData._token = this.token;

        $.ajax({
            headers: { "X-CSRF-TOKEN": this.token },
            url: apiEndPoint + "/" + id,
            type: "PUT",
            data: newData,
            success: function (result) {
                console.log("PUT success");
                alert('Successful data update!');
            },
            error: function (data) {
                let errors = $.parseJSON(data.responseText);
                // $.each(errors, function (key, value) {
                //    alert(value);
                // });
                alert('Unsuccessful data update due to inappropriate data or bad format.');
            }
        });
    }

    
}