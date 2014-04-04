$(document).ready(function(){

  $(".aerolineas").click(function(){
    $("#entidades").load("aerolineas");
  });

  $(".aeropuertos").click(function(){
    $("#entidades").load("aeropuertos");
  });

  $(".programavuelos").click(function(){
    $("#entidades").load("programavuelos");
  });

  $(".pasajeros").click(function(){
    $("#entidades").load("pasajeros");
  });

  $(".gates").click(function(){
    $("#entidades").load("gates");
  });

  $(".ciudades").click(function(){
    $("#entidades").load("ciudades");
  });

  $(".paises").click(function(){
    $("#entidades").load("paises");
  });
});