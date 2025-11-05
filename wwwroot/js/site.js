// Share content using Web Share API
function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: "Rotary Club em ação",
            text: "Vale a pena conferir o que o Rotary Club de Uruçuí preparou!\nAcesse aqui: ",
            url: window.location.href,
        }).catch(() => {
            alert("Erro ao compartilhar.");
        });
    } else {
        alert("O compartilhamento nativo não é suportado neste navegador.");
    }
}

/**
 *  Copy any content.
 * @param {any} elementOrText
 */
function copyToClipboard(elementOrText) {
    let contentToCopy = '';

    const element = document.getElementById(elementOrText);
    if (element) {
        contentToCopy = element.innerText || element.value || '';
    } else {
        contentToCopy = elementOrText;
    }
    navigator.clipboard.writeText(contentToCopy)
        .then(() => {
            alert("Conteúdo copiado com sucesso!");
        })
        .catch(err => {
            alert("Erro ao copiar o conteúdo: " + err);
        });
}

// Accordion animation for agenda months
document.querySelectorAll("details").forEach((el) => {
    el.addEventListener("toggle", () => {
        const content = el.querySelector(".agenda-month-content");
        if (el.open) {
            const height = content.scrollHeight;
            content.style.height = height + "px";
            setTimeout(() => (content.style.height = "auto"), 100);
        } else {
            const height = content.scrollHeight;
            content.style.height = height;
            setTimeout(() => (content.style.height = "0px"), 10);
        }
    });
});



// Generate payload PIX and QR Code
function emv(id, value) {
    const len = value.length.toString().padStart(2, '0');
    return id + len + value;
}
function gerarPixPayload(chavePix, nome, cidade, valor = "", txid = "TX1234") {
    const payloadFormatIndicator = emv("00", "01");
    const pointOfInitiationMethod = valor ? emv("01", "12") : emv("01", "11");

    const gui = emv("00", "br.gov.bcb.pix");
    const chave = emv("01", chavePix);
    const txidField = emv("02", txid);
    const merchantAccountInfo = emv("26", gui + chave + txidField);

    const merchantCategoryCode = emv("52", "0000");
    const transactionCurrency = emv("53", "986");
    const transactionAmount = valor ? emv("54", parseFloat(valor).toFixed(2)) : "";
    const countryCode = emv("58", "BR");
    const merchantName = emv("59", nome.substring(0, 25));
    const merchantCity = emv("60", cidade.substring(0, 15));
    const additionalDataField = emv("62", emv("05", txid));

    const payloadSemCRC =
        payloadFormatIndicator +
        pointOfInitiationMethod +
        merchantAccountInfo +
        merchantCategoryCode +
        transactionCurrency +
        transactionAmount +
        countryCode +
        merchantName +
        merchantCity +
        additionalDataField;

    const crc = gerarCRC16(payloadSemCRC + "6304");
    return payloadSemCRC + "6304" + crc;
}
function gerarCRC16(payload) {
    let polinomio = 0x1021, resultado = 0xFFFF;
    for (let i = 0; i < payload.length; i++) {
        resultado ^= payload.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            resultado = (resultado & 0x8000)
                ? (resultado << 1) ^ polinomio
                : resultado << 1;
            resultado &= 0xFFFF;
        }
    }
    return resultado.toString(16).toUpperCase().padStart(4, "0");
}

function gerarQRCode(valor) {
    const chavePix = "52476099000104";
    const nome = "ROTARY";
    const cidade = "URUCUI";
    const txid = "TX" + Date.now().toString().slice(-6);

    const payload = gerarPixPayload(chavePix, nome, cidade, valor, txid);

    document.getElementById("qrContainer").innerHTML = "";
    new QRCode(document.getElementById("qrContainer"), {
        text: payload,
        width: 200,
        height: 200,
        correctLevel: QRCode.CorrectLevel.Q
    });

    document.getElementById("pixTexto").innerText = payload;
}

// Evento do botão de doação
document.querySelectorAll(".donate-btn").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        gerarQRCode(btn.dataset.valor);
    });
});