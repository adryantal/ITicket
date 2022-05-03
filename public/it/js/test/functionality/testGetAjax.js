const { test } = QUnit;

QUnit.module("MyAjax.getAjax függvény tesztelése", (hooks) =>{
  hooks.before(() => { 
    this.token=$('meta[name="csrf-token"]').attr('content');
    this.myAjax = new MyAjax(this.token); 
  });

  test( "Függvény létezése", (assert)=> {  
    assert.ok(this.myAjax.getAjax, 'MyAjax.getAjax létezik' );
  });
  test( "Függvény-e", (assert)=> {    
    assert.ok(typeof this.myAjax.getAjax==="function", 'MyAjax.getAjax létezik és függvény' );
  });
  test( "Funkcionalitás tesztelése, adatok egyezésének vizsgálata", (assert)=> {     
    const ticketDataArray = [];   
    const apiEndPoint="/api/ticket/all/"; 
    const done = assert.async();    
    //tesztalany: a legutoljára rögzített ticket objektum adatai
    this.myAjax.getAjax(apiEndPoint, ticketDataArray, function(){      
      assert.strictEqual(ticketDataArray.length, 26,'A tömb elemeinek a száma megegyezik az adatbázisbeli sorok számával');  
      assert.strictEqual(ticketDataArray[0]["id"],"INC1000000",
      "A legelső alkalommal nyitott ticket, melynek adatai az adatbázis Tickets táblájának első sorát képezik, a tömb legelső eleme");  
      assert.strictEqual(ticketDataArray[ticketDataArray.length-1]["id"],
      "INC1000029",'Az utolsó ticketobjektum "id" mezőjének értéke megegyezik az adatbázisbeli adattal');  
      assert.strictEqual(ticketDataArray[ticketDataArray.length-1]["caller_name"],
      "Ian Roberts",'Az utolsó ticketobjektum "caller" mezőjének értéke megegyezik az adatbázisbeli adattal');
      assert.strictEqual(ticketDataArray[ticketDataArray.length-1]["category_name"],
      "Office 365",'Az utolsó ticketobjektum "category_name" mezőjének értéke megegyezik az adatbázisbeli adattal');
      assert.strictEqual(ticketDataArray[ticketDataArray.length-1]["created_by_name"],
      "Leslie Hill",'Az utolsó ticketobjektum "created_by_name" mezőjének értéke megegyezik az adatbázisbeli adattal');
      assert.strictEqual(ticketDataArray[ticketDataArray.length-1]["service_name"],
      "Software",'Az utolsó ticketobjektum "service_name" mezőjének értéke megegyezik az adatbázisbeli adattal');
      assert.strictEqual(ticketDataArray[ticketDataArray.length-1]["status"],
      "New",'Az utolsó ticketobjektum "status" mezőjének értéke megegyezik az adatbázisbeli adattal');
      assert.strictEqual(ticketDataArray[ticketDataArray.length-1]["subjperson_name"],
      "Christian Parker",'Az utolsó ticketobjektum "subjperson_name" mezőjének értéke megegyezik az adatbázisbeli adattal');
      assert.strictEqual(ticketDataArray[ticketDataArray.length-1]["title"],
      "MS Word - Compatibility error",'Az utolsó ticketobjektum "title" mezőjének értéke megegyezik az adatbázisbeli adattal');
      assert.strictEqual(ticketDataArray[ticketDataArray.length-1]["type"],
      "Incident",'Az utolsó ticketobjektum "type" mezőjének értéke megegyezik az adatbázisbeli adattal');
      assert.strictEqual(ticketDataArray[ticketDataArray.length-1]["updated"],
      "29-04-2022 20:32:08",'Az utolsó ticketobjektum "updated" mezőjének értéke megegyezik az adatbázisbeli adattal');
      assert.strictEqual(ticketDataArray[ticketDataArray.length-1]["updated_by_name"]
      ,"",'Az utolsó ticketobjektum "updated_by_name" mezőjének értéke megegyezik az adatbázisbeli adattal');
      console.log(ticketDataArray[ticketDataArray.length-1])
      done();
    });    
  });
});

