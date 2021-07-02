import { Worksheet } from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';

export class FormatExcel {
  static letter = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'AA',
    'AB',
    'AC',
    'AD',
    'AE',
    'AF',
    'AG',
    'AH',
    'AI',
    'AJ',
    'AK',
    'AL',
    'AM',
    'AN',
    'AO',
    'AP',
    'AQ',
    'AR',
    'AS',
    'AT',
    'AU',
    'AV',
    'AW',
    'AX',
    'AY',
    'AZ',
    'BA',
    'BB',
    'BC',
    'BD',
    'BE',
    'BF',
    'BG',
    'BH',
    'BI',
    'BJ',
    'BK',
    'BL',
    'BM',
    'BN',
    'BO',
    'BP',
    'BQ',
    'BR',
    'BS',
    'BT',
    'BU',
    'BV',
    'BW',
    'BX',
    'BY',
    'BZ',
    'CA',
    'CB',
    'CC',
    'CD',
    'CE',
    'CF',
    'CG',
    'CH',
    'CI',
    'CJ',
    'CK',
    'CL',
    'CM',
    'CN',
    'CO',
    'CP',
    'CQ',
    'CR',
    'CS',
    'CT',
    'CU',
    'CV',
    'CW',
    'CX',
    'CY',
    'CZ',
  ];

  static formatRow(
    ws,
    row,
    vertical: 'top' | 'middle' | 'bottom',
    horizontal: 'left' | 'center' | 'right',
    wrapText: boolean,
  ) {
    ws.getRow(row).alignment = { vertical, horizontal, wrapText };
  }

  static alignmentCell(
    ws,
    cell,
    vertical: 'top' | 'middle' | 'bottom',
    horizontal: 'left' | 'center' | 'right',
  ) {
    ws.getCell(cell).alignment = { vertical: vertical, horizontal: horizontal };
  }

  static formatInfo(ws, letter, rowStart, infoArray) {
    infoArray.map((info, i) => {
      ws.getCell(`${letter}${i + rowStart}`).value = {
        richText: info.richText,
      };
      ws.getCell(`${letter}${i + rowStart}`).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor:
          i === 0
            ? { argb: 'F8FF4A' }
            : { argb: (i + rowStart) % 2 == 0 ? 'FFE0E0E0' : 'FFF9F9F9' },
      };
    });
  }

  static backgroundRow(ws, row, initialLetter, endLetter, color) {
    const indexIniLetter = this.letter.findIndex(item => item == initialLetter);
    const indexEndLetter = this.letter.findIndex(item => item == endLetter);

    for (let i = indexIniLetter; i <= indexEndLetter; i++) {
      ws.getCell(this.letter[i] + row).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    }
  }
  static borderCellRow(ws, row, initialLetter, endLetter, color) {
    const indexIniLetter = this.letter.findIndex(item => item == initialLetter);
    const indexEndLetter = this.letter.findIndex(item => item == endLetter);

    for (let i = indexIniLetter; i <= indexEndLetter; i++) {
      ws.getCell(this.letter[i] + row).border = {
        top: { style: 'thin', color: { argb: color } },
        left: { style: 'thin', color: { argb: color } },
        bottom: { style: 'thin', color: { argb: color } },
        right: { style: 'thin', color: { argb: color } },
      };
    }
  }

  static formatTextColmuns(
    ws: Worksheet,
    from: string,
    to: string,
    line: number,
  ) {
    for (let i = from.charCodeAt(0); i <= to.charCodeAt(0); i++) {
      let cell = String.fromCharCode(i)+line;
      ws.getCell(cell).dataValidation = {
        type: 'textLength',
        operator: 'lessThan',
        showErrorMessage: true,
        allowBlank: true,
        formulae: [100],
        errorStyle: 'error',
        errorTitle: 'Valor ingresado',
        error: 'El valor ingresado debe ser un texto'
      };
    }
  }

  static formatDecimal(ws, cell) {
    ws.getCell(cell).numFmt = '0.00';
  }

  static formatWhole(ws, cell, cellCompare?, min?) {
    ws.getCell(cell).numFmt = '0';
    ws.getCell(cell).dataValidation = {
      type: 'whole',
      operator: min ? 'greaterThanOrEqual' : 'between',
      showErrorMessage: true,
      allowBlank: true,
      formulae: min ? [cellCompare] : [1, cellCompare],
      errorStyle: 'error',
      errorTitle: 'Valor ingresado',
      error: min
        ? 'El valor debe ser numérico y mayor a rango de días de entrega mínimo'
        : 'El valor debe ser numérico y menor a rango de días de entrega máximo',
    };
  }

  static protectCells(ws, index, cols: Array<string>, isLocked) {
    cols.forEach(col => {
      ws.getCell(`${index}${col}`).protection = {
        locked: isLocked,
        hidden: true,
      };
    });
  }

  static formatColor(
    ws,
    cell: string,
    background?: string,
    color?: string,
    bold?: true | false,
  ) {
    if (background) {
      ws.getCell(cell).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: background },
      };
    }
    if (color) {
      ws.getCell(cell).font = {
        color: { argb: color },
        size: 12,
        bold,
      };
    }
  }
  static formatHeader(ws, row, initialLetter, endLetter) {
    const indexIniLetter = this.letter.findIndex(item => item == initialLetter);
    const indexEndLetter = this.letter.findIndex(item => item == endLetter);
    for (let i = indexIniLetter; i <= indexEndLetter; i++) {
      ws.getCell(this.letter[i] + String(row)).border = {
        top: { style: 'thin', color: { argb: 'FFF5F5F5' } },
        left: { style: 'thin', color: { argb: 'FFF5F5F5' } },
        bottom: { style: 'thin', color: { argb: 'FFF5F5F5' } },
        right: { style: 'thin', color: { argb: 'FFF5F5F5' } },
      };
      ws.getCell(this.letter[i] + String(row)).alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
      ws.getCell(this.letter[i] + String(row)).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF5F2CA1' },
      };
      ws.getCell(this.letter[i] + String(row)).font = {
        color: { argb: 'FFFFFFFF' },
        size: 12,
      };
    }
  }
}
