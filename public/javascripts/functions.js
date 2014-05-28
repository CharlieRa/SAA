$(document).ready(function(){

var pieData = [
        {
          value: 30,
          color:"#F38630"
        },
        {
          value : 50,
          color : "#E0E4CC"
        },
        {
          value : 100,
          color : "#69D2E7"
        }
      

  $('#from').autocomplete({
    serviceUrl: '/ciudades/buscar',
    onSelect: function (suggestion) {
        //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
    }
});

  $('#to').autocomplete({
    serviceUrl: '/ciudades/buscar',
    onSelect: function (suggestion) {
        //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
    }
});


  $('li > a').click(function() {
    $('li').removeClass();
    $(this).parent().addClass('active');
    });
});

function confirmGetMessage(id) {
  var theAnswer = confirm("Are you sure you wanna delete this?");
  if (theAnswer){
    var path = window.location.href +"/borrar/"+ id;
    window.location.replace(path);    
  }
}