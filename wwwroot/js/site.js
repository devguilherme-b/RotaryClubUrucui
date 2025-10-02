function copyToClipboard(elementId) {
    var text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(function () {
        alert("Chave PIX copiada: " + text);
    }, function (err) {
        alert('Erro ao copiar o conteúdo: ', err);
    });
}

// TO INICIALIZE SWIPER

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    effect: "fade",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});