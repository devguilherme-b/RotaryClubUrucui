import { Component, ElementRef, ViewChild } from '@angular/core';
import { CopyToClipboard } from '../../utils';
import QRCode from 'qrcodejs';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.html',
  styleUrls: ['./contribute.css', './OffCanvasCustomized.css']
})
export class Contribute {
  copy(id: any){
    CopyToClipboard(id);
  }

  @ViewChild('qrContainer', { static: false }) qrContainer!: ElementRef;
  @ViewChild('pixTexto', { static: false }) pixTexto!: ElementRef;

  valorSelecionado = '';

  selecionarValor(valor: string): void {
    this.valorSelecionado = valor;

    // Aguarda o offcanvas ser renderizado
    setTimeout(() => {
      this.gerarQRCode();
    });
  }

  gerarQRCode(): void {
    const chavePix = '52476099000104';
    const nome = 'ROTARY';
    const cidade = 'URUCUI';
    const txid = 'TX' + Date.now().toString().slice(-6);

    const payload = this.gerarPixPayload(
      chavePix,
      nome,
      cidade,
      this.valorSelecionado,
      txid
    );

    this.qrContainer.nativeElement.innerHTML = '';

    new QRCode(this.qrContainer.nativeElement, {
      text: payload,
      width: 200,
      height: 200,
      correctLevel: QRCode.CorrectLevel.Q
    });

    this.pixTexto.nativeElement.innerText = payload;
  }

  // -----------------------------
  // PIX PAYLOAD
  // -----------------------------

  private emv(id: string, value: string): string {
    const len = value.length.toString().padStart(2, '0');
    return id + len + value;
  }

  private gerarPixPayload(
    chavePix: string,
    nome: string,
    cidade: string,
    valor: string = '',
    txid: string
  ): string {

    const payloadFormatIndicator = this.emv('00', '01');
    const pointOfInitiationMethod = valor
      ? this.emv('01', '12')
      : this.emv('01', '11');

    const gui = this.emv('00', 'br.gov.bcb.pix');
    const chave = this.emv('01', chavePix);
    const txidField = this.emv('02', txid);
    const merchantAccountInfo = this.emv('26', gui + chave + txidField);

    const merchantCategoryCode = this.emv('52', '0000');
    const transactionCurrency = this.emv('53', '986');
    const transactionAmount = valor
      ? this.emv('54', parseFloat(valor).toFixed(2))
      : '';

    const countryCode = this.emv('58', 'BR');
    const merchantName = this.emv('59', nome.substring(0, 25));
    const merchantCity = this.emv('60', cidade.substring(0, 15));
    const additionalDataField = this.emv('62', this.emv('05', txid));

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

    const crc = this.gerarCRC16(payloadSemCRC + '6304');
    return payloadSemCRC + '6304' + crc;
  }

  // -----------------------------
  // CRC16
  // -----------------------------

  private gerarCRC16(payload: string): string {
    const polinomio = 0x1021;
    let resultado = 0xFFFF;

    for (let i = 0; i < payload.length; i++) {
      resultado ^= payload.charCodeAt(i) << 8;

      for (let j = 0; j < 8; j++) {
        resultado = (resultado & 0x8000)
          ? (resultado << 1) ^ polinomio
          : resultado << 1;

        resultado &= 0xFFFF;
      }
    }

    return resultado
      .toString(16)
      .toUpperCase()
      .padStart(4, '0');
  }
}

