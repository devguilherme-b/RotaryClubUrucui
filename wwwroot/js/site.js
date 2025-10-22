function copyToClipboard(elementId) {
    var text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(function () {
        alert("Chave PIX copiada: " + text);
    }, function (err) {
        alert('Erro ao copiar o conteúdo: ', err);
    });
}

// Função para gerar Pix payload EMV
function gerarPixPayload(chavePix, nome, cidade, valor) {
    const pad = (s, n) => s.toString().padStart(n, '0');

    let payload = "";
    payload += "000201";
    let mai = "0014BR.GOV.BCB.PIX"; 
    mai += "01" + pad(chavePix.length, 2) + chavePix;
    payload += "26" + pad(mai.length, 2) + mai;

    payload += "52" + "0000";
    payload += "53" + "986"; 
    payload += "54" + pad(valor, 1); 
    payload += "58" + "02BR";
    payload += "59" + pad(nome.length, 2) + nome;
    payload += "60" + pad(cidade.length, 2) + cidade;
    payload += "6304";

    // Função CRC16-CCITT (hex)
    function crc16(str) {
        let crc = 0xFFFF;
        for (let i = 0; i < str.length; i++) {
            crc ^= str.charCodeAt(i) << 8;
            for (let j = 0; j < 8; j++) {
                crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
            }
        }
        crc &= 0xFFFF;
        return crc.toString(16).toUpperCase().padStart(4, '0');
    }

    payload += crc16(payload);
    return payload;
}

// Função para gerar QR Code
function gerarQRCode(valor) {
    const chavePix = "52.476.099/0001-04";
    const nome = "Rotary Club de Uruçuí";
    const cidade = "Uruçuí-PI";

    document.getElementById("qrContainer").innerHTML = "";

    const pixTexto = gerarPixPayload(chavePix, nome, cidade, valor);

    new QRCode(document.getElementById("qrContainer"), {
        text: pixTexto,
        width: 200,
        height: 200
    });

    document.getElementById("pixTexto").innerText = `Pix (copia e cola): ${pixTexto}`;
}

// Eventos de clique nos links de doação
const linksDoacao = document.querySelectorAll(".donate-btn");
linksDoacao.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const valor = this.dataset.valor;
        gerarQRCode(valor);
    });
});