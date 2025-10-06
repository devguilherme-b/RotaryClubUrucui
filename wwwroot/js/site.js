function copyToClipboard(elementId) {
    var text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(function () {
        alert("Chave PIX copiada: " + text);
    }, function (err) {
        alert('Erro ao copiar o conteúdo: ', err);
    });
}