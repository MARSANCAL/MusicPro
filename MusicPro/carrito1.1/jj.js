//ventana emergente
document.getElementById("btnAbrir").addEventListener("click", function() {
  document.getElementById("miVentana").style.display = "block";
  document.getElementById("btnCerrar").style.display = "block";
  document.getElementById("not_float").style.backdropFilter = "blur(100px)";
});

document.getElementById("btnCerrar").addEventListener("click", function() {
  document.getElementById("miVentana").style.display = "none";
  document.getElementById("btnCerrar").style.display = "none";
  document.getElementById("not_float").style.backdropFilter = "none";
});
//formurmulario retiro en tienda
document.getElementById("btnAbrir1").addEventListener("click", function() {
  document.getElementById("miVentana1").style.display = "block";
  document.getElementById("btnCerrar").style.display = "none";
  document.getElementById("miVentana").style.display = "none";
});

document.getElementById("btnCerrar1").addEventListener("click", function() {
  document.getElementById("miVentana1").style.display = "none";
  document.getElementById("miVentana").style.display = "block";
  document.getElementById("btnCerrar").style.display = "block";
  

});
//formurmulario despacho a domicilio
document.getElementById("btnAbrir2").addEventListener("click", function() {
  document.getElementById("miVentana2").style.display = "block";
  document.getElementById("miVentana").style.display = "none";
  document.getElementById("btnCerrar").style.display = "none";
});

document.getElementById("btnCerrar2").addEventListener("click", function() {
  document.getElementById("miVentana2").style.display = "none";
  document.getElementById("miVentana").style.display = "block";
  document.getElementById("btnCerrar").style.display = "block";
});

var maxLength = 5;
$('#example > option').text(function(i, text) {
    if (text.length > maxLength) {
        return text.substr(0, maxLength) + '...';  
    }
});