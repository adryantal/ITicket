class ChartsController {
  constructor() {
    new ChartsView();
    const token = $('meta[name="csrf-token"]').attr("content");
    const myAjax = new MyAjax(token);


    buildChart("api/charts/team/tickets/open","name","open_tickets","My Team's open tickets ",'team-open-tickets');
    buildChart("api/charts/team/tickets/resolved","name","resolved_tickets","My Team's resolved tickets (last 30 days) ",'team-resolved-tickets');
    buildChart("api/charts/team/tickets/breachedsla","name","slabreached_open_tickets","My Team's sla-breached open tickets",'breached-sla-tickets');
    buildChart("api/charts/team/tickets/breakdownbytype","type","nr_of_tickets","My Team's resolved tickets - breakdown by type (last 30 days) ",'bdtype-tickets');

   function buildChart(api, keyLeft, keyRight,chartTitle,selectorID){
    const dataArray=[];
    const inputDataArray=[];
    myAjax.getAjax(api,inputDataArray,function(){
      dataArray.push([keyLeft,keyRight]);
      inputDataArray.forEach(element => {
        dataArray.push([element[keyLeft],element[keyRight]]);
      });      
    });
    console 
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable(dataArray);
      var options = {
        title: chartTitle,
        pieHole: 0.4,
        is3D : true
      };
      var chart = new google.visualization.PieChart(document.getElementById(selectorID));
      chart.draw(data, options);
    }
  }  
     
     
   
  }


}
