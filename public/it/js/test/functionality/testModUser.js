const { test } = QUnit;

QUnit.module("User módosításának tesztelése lépésekben ", (hooks) =>{  
  hooks.before(() => { 
    this.token=$('meta[name="csrf-token"]').attr('content');
    this.myAjax = new MyAjax(this.token);     
  });
  test( "PutAjax függvény létezése", (assert)=> {  
    assert.ok(this.myAjax.putAjax, 'MyAjax.putAjax létezik' );
  });
  test( "PutAjax függvény-e", (assert)=> {    
    assert.ok(typeof this.myAjax.putAjax==="function", 
    'MyAjax.putAjax létezik és függvény' );
  });
  test( "Modifyuser.loadAttributeValues létezése", (assert)=> {   
    const modUserController = new ModifyUserController();  
    assert.ok(modUserController.loadAttributeValues, 
      'Modifyuser.loadAttributeValues létezik' );
  });
  test( "Modifyuser.loadAttributeValues függvény-e", (assert)=> {    
    const modUserController = new ModifyUserController(); 
    assert.ok(typeof modUserController.loadAttributeValues==="function", 
    'Modifyuser.loadAttributeValues létezik és függvény' );
  });
  test( "Modifyuser.autoComp létezése", (assert)=> {   
    const modUserController = new ModifyUserController();  
    assert.ok(modUserController.autoComp, 
      'Modifyuser.autoComp létezik' );
  });
  test( "Modifyuser.autoComp függvény-e", (assert)=> {    
    const modUserController = new ModifyUserController(); 
    assert.ok(typeof modUserController.autoComp==="function", 
    'Modifyuser.autoComp létezik és függvény' );
  });
  test( "A formba történő adatbetöltődés tesztelése", (assert)=> {  
    const modUserController = new ModifyUserController(); 
    const done1 = assert.async();
    //kiválasztom a 37-es usert, mintha az autocomplete listából jelöltem volna ki:
    $.get("/api/user/37", function( data ) {
      $( ".result" ).html( data );
      let dataToLoad ={
        label : data["id"],
        value: data["name"],
        ad_id : data['ad_id'],
        phone_number : data['phone_number'],
        department : data['department'],
        resolver_id : data['resolver_id'],
        active : data['active'],        
      }
      done1();
      //betöltöm az adatokat a megfelelő selectorokba, és megvizsgálom, helyesek-e
      modUserController.loadAttributeValues(dataToLoad);     
      assert.strictEqual(modUserController.idInputField.val(), "37", 'a mezőbe az adatbázisbeli érték került be');
      assert.strictEqual(modUserController.adIdInputField.val(), "djameson", 'a mezőbe az adatbázisbeli érték került be');
      assert.strictEqual(modUserController.nameInputField.val(), "Dorothy Jameson", 'a mezőbe helyes érték került be');
      assert.strictEqual(modUserController.activeInputField.val(), "1", 'a mezőbe helyes érték került be');
      assert.strictEqual(modUserController.phoneNumberInputField.val(), "4593827160", 'a mezőbe helyes érték került be');
      assert.strictEqual(modUserController.departmentInputField.val(), "Finance", 'a mezőbe helyes érték került be');
      assert.strictEqual(modUserController.resolverDropdown.val(), "selection", 'a mezőbe helyes érték került be');
    });    
  });

  test( "Az adatmódosítás teljes szimulációja megfelelő formátumú adatokkal, a végeredmény tesztelése", (assert)=> {     
    const modUserController = new ModifyUserController(); 
    const done1 = assert.async();
    const done2 = assert.async();
    const done3 = assert.async();
    //kiválasztom a 36-es usert, mintha az autocomplete listából jelöltem volna ki:
    $.get("/api/user/36", function( data ) {
      $( ".result" ).html( data );
      let dataToLoad ={
        label : data["id"],
        value: data["name"],
        ad_id : data['ad_id'],
        phone_number : data['phone_number'],
        department : data['department'],
        resolver_id : data['resolver_id'],
        active : data['active'],        
      }
      done1();
      //betöltöm az adatokat a megfelelő selectorokba
      modUserController.loadAttributeValues(dataToLoad);  
      //módosítom a telefonszámot és a részleget
      modUserController.departmentInputField.val('Operations');
      modUserController.phoneNumberInputField.val('5781236921');  
      //a módosított adatok küldésének előkészítése   
      let apiEndPointUser = '/api/user';
      let newData = {               
              "name":modUserController.nameInputField.val(),
              "password":modUserController.passwordInputField.val(),
              "ad_id":modUserController.adIdInputField.val(),
              "active":modUserController.activeInputField.val(),
              "phone_number":modUserController.phoneNumberInputField.val(),
              "department": modUserController.departmentInputField.val(),
              "resolver_id": modUserController.resolverDropdown.val(),
          };
      myAjax.putAjax(apiEndPointUser,newData,modUserController.idInputField.val());  
      done2();     
      
  });
   //lekérem és ellenőrzöm a módosított rekord adatait
  $.get("/api/user/36", function( data ) {
    $( ".result" ).html( data );
    done3();  
    assert.strictEqual(data.department, "Operations", 'a mezőbe helyes érték került be');
    assert.strictEqual(data.phone_number, "5781236921", 'a mezőbe helyes érték került be');
  });

});

test( "Helytelen adat felvitelének kísérlete: létező ad_id megadása", (assert)=> {
  const modUserController = new ModifyUserController(); 
  const done1 = assert.async();
  const done2 = assert.async();
  const done3 = assert.async();
  //kiválasztom a 36-es usert, mintha az autocomplete listából jelöltem volna ki:
  $.get("/api/user/36", function( data ) {
    $( ".result" ).html( data );
    let dataToLoad ={
      label : data["id"],
      value: data["name"],
      ad_id : data['ad_id'],
      phone_number : data['phone_number'],
      department : data['department'],
      resolver_id : data['resolver_id'],
      active : data['active'],        
    }
    done1();
    //betöltöm az adatokat a megfelelő selectorokba
    modUserController.loadAttributeValues(dataToLoad);  
    //megkísérlem egy, már létező ad_id-val felülírni az user ad_idjét    
    modUserController.adIdInputField.val('lhill');  
    //a módosított adatok küldésének előkészítése   
    let apiEndPointUser = '/api/user';
    let newData = {               
            "name":modUserController.nameInputField.val(),
            "password":modUserController.passwordInputField.val(),
            "ad_id":modUserController.adIdInputField.val(),
            "active":modUserController.activeInputField.val(),
            "phone_number":modUserController.phoneNumberInputField.val(),
            "department": modUserController.departmentInputField.val(),
            "resolver_id": modUserController.resolverDropdown.val(),
        };
  
    myAjax.putAjax(apiEndPointUser,newData,modUserController.idInputField.val());  
    done2();  
    //lekérem a módosítani kívánt rekord adatait
    $.get("/api/user/36", function( data ) {
      $( ".result" ).html( data );
      done3();  
      assert.notEqual(data.ad_id, "lhill", 'a módosítás nem valósult meg');    
      
    });    
});
  
});
});
