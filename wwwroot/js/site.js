// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function copyToClipboard(elementId) {
    var text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(function () {
        alert("Chave PIX copiada: " + text);
    }, function (err) {
        alert('Erro ao copiar o conteúdo: ', err);
    });
}