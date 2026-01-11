export async function CopyToClipboard(elementOrText: any): Promise<void>{{
    let contentToCopy = '';

    const element = document.getElementById(elementOrText);
    if (element) {
        contentToCopy = element.innerText || element.ariaValueText || '';
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
}}