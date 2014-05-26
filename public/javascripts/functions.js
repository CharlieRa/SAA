$(document).ready(function(){

    // Setup jQuery ajax mock:
    // $.mockjax({
    //     url: '*',
    //     responseTime: 2000,
    //     response: function (settings) {
    //         var query = settings.data.query,
    //             queryLowerCase = query.toLowerCase(),
    //             re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi'),
    //             suggestions = $.grep(countriesArray, function (country) {
    //                  // return country.value.toLowerCase().indexOf(queryLowerCase) === 0;
    //                 return re.test(country.value);
    //             }),
    //         this.responseText = JSON.stringify(response);
    //     }
    // });

  $('#from').autocomplete({
    serviceUrl: '/ciudades/buscar',
    onSelect: function (suggestion) {
        //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
    }
});


  $('li > a').click(function() {
    $('li').removeClass();
    $(this).parent().addClass('active');
    });

  $( "#btn_crear" ).click(function() {
    $( ".container" ).show( 400 );
    $( "#btn_cerrar" ).show( 400 );
  });
  $( "#btn_cerrar" ).click(function() {
    $( ".container" ).hide( 400 );
    $( "#btn_cerrar" ).hide( 400 );
  });
    $( "#btn_modificar" ).click(function() {
    $( ".container_mod" ).show( 400 );
    $( "#btn_cerrar_mod" ).show( 400 );
  });
  $( "#btn_cerrar_mod" ).click(function() {
    $( ".container_mod" ).hide( 400 );
    $( "#btn_cerrar_mod" ).hide( 400 );
  });
  $( '#table' ).searchable({
      searchType: 'fuzzy'
      });

});

function confirmGetMessage(id) {
  var theAnswer = confirm("Are you sure you wanna delete this?");
  if (theAnswer){
    var path = window.location.href +"/borrar/"+ id;
    window.location.replace(path);    
  }
}