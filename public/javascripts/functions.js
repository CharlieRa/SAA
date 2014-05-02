$(document).ready(function(){

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