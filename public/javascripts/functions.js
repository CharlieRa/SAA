$(document).ready(function(){

  $(".aerolineas").click(function(){
    $("#entidades").load("aerolineas");
    $( "#btn_cerrar" ).hide( 400 );
  });

  $(".aeropuertos").click(function(){
    $( ".container" ).hide( 400 );
    $( "#btn_cerrar" ).hide( 400 );
    $("#entidades").load("aeropuertos");
    
  });

  $(".contacto").click(function(){
    $( ".container" ).hide( 400 );
    $( "#btn_cerrar" ).hide( 400 );
    $("#entidades").load("contacto");

  });

  $(".programavuelos").click(function(){
    $("#entidades").load("programavuelos");
    $( "#btn_cerrar" ).hide( 400 );
  });

  $(".pasajeros").click(function(){
    $("#entidades").load("pasajeros");
    $( "#btn_cerrar" ).hide( 400 );
  });

  $(".gates").click(function(){
    $("#entidades").load("gates");
    $( "#btn_cerrar" ).hide( 400 );
  });

  $(".ciudades").click(function(){
    $("#entidades").load("ciudades");
    $( "#btn_cerrar" ).hide( 400 );
  });

  $(".paises").click(function(){
    $("#entidades").load("paises");
    $( "#btn_cerrar" ).hide( 400 );   
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
});