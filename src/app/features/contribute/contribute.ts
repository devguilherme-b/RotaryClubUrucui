import { Component } from '@angular/core';
import { CopyToClipboard } from '../../utils';
import { QRCode } from 'qrcode';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.html',
  styleUrls: [
    './contribute.css',
    './OffCanvasCustomized.css'
  ]
})
export class Contribute {
  copy(idElemento: string) {
    CopyToClipboard(idElemento);
  }

  //   const chavePix = '52476099000104';
  //   const nome = 'ROTARY';
  //   const cidade = 'URUCUI';

  qrCodeDataUrl: string | null = null; // imagem QR Code em Base64
  payloadPix: string = '';

  async gerarQrCode(valor: number): Promise<void> {
    debugger;
    this.payloadPix = this.gerarPayloadPix(valor);
    this.qrCodeDataUrl = await QRCode.toDataURL(this.payloadPix);
  }

  // Função para gerar payload Pix
  private gerarPayloadPix(valor: number): string {
    const chavePix = '52476099000104';
    const nomeRecebedor = 'ROTARY';
    const cidade = 'URUCUI';
    const txid = 'TX123';
    const valorFormatado = valor.toFixed(2);

    const formatarCampo = (id: string, valor: string) => {
      const tamanho = valor.length.toString().padStart(2, '0');
      return `${id}${tamanho}${valor}`;
    };

    const payloadSemCRC = '000201' + formatarCampo('26', 
      formatarCampo('00', 'BR.GOV.BCB.PIX') + 
      formatarCampo('01', chavePix)) + '52040000' + '5303986' +
      formatarCampo('54', valorFormatado) + '5802BR' +
      formatarCampo('59', nomeRecebedor) +
      formatarCampo('60', cidade) +
      formatarCampo('62', formatarCampo('05', txid)) + '6304';

    const crc = this.calcularCRC16(payloadSemCRC);
    return payloadSemCRC + crc;
  }

  private calcularCRC16(payload: string): string {
    let crc = 0xffff;
    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = (crc << 1) ^ 0x1021;
        } else {
          crc <<= 1;
        }
        crc &= 0xffff;
      }
    }

    return crc.toString(16).toUpperCase().padStart(4, '0');
  }
}