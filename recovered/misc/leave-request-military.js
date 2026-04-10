const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, UnderlineType,
  PageNumber, Header, Footer
} = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function p(text, opts = {}) {
  return new Paragraph({
    alignment: opts.align || AlignmentType.LEFT,
    spacing: { before: opts.before || 0, after: opts.after || 120 },
    indent: opts.indent ? { left: opts.indent } : undefined,
    children: [new TextRun({
      text,
      bold: opts.bold || false,
      font: "Khmer OS Siemreap",
      size: opts.size || 22,
      underline: opts.underline ? { type: UnderlineType.SINGLE } : undefined,
    })]
  });
}

function blankLine(n = 1) {
  return Array(n).fill(null).map(() => new Paragraph({
    spacing: { before: 0, after: 0 },
    children: [new TextRun({ text: "", font: "Khmer OS Siemreap", size: 22 })]
  }));
}

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Khmer OS Siemreap", size: 22 } }
    }
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1260, bottom: 1440, left: 1800 }
      }
    },
    children: [
      // ====== HEADER BLOCK ======
      // Kingdom of Cambodia Header
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 60 },
        children: [new TextRun({ text: "ព្រះរាជាណាចក្រកម្ពុជា", bold: true, font: "Khmer OS Siemreap", size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 60 },
        children: [new TextRun({ text: "ជាតិ សាសនា ព្រះមហាក្សត្រ", bold: true, font: "Khmer OS Siemreap", size: 22 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 200 },
        children: [new TextRun({ text: "❖❖❖", font: "Khmer OS Siemreap", size: 20 })]
      }),

      // Two column header: Left = Unit info, Right = Classification
      new Table({
        width: { size: 9180, type: WidthType.DXA },
        columnWidths: [5000, 4180],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: noBorders,
                width: { size: 5000, type: WidthType.DXA },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: "កងរាជអាវុធហត្ថ", bold: true, font: "Khmer OS Siemreap", size: 22 })]
                  }),
                  new Paragraph({
                    children: [new TextRun({ text: "អង្គភាព៖ ______________________________", font: "Khmer OS Siemreap", size: 22 })]
                  }),
                  new Paragraph({
                    spacing: { after: 0 },
                    children: [new TextRun({ text: "ចំណោទ៖ ______________________________", font: "Khmer OS Siemreap", size: 22 })]
                  }),
                ]
              }),
              new TableCell({
                borders: noBorders,
                width: { size: 4180, type: WidthType.DXA },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [new TextRun({ text: "ចំណាត់ថ្នាក់៖ ធម្មតា", font: "Khmer OS Siemreap", size: 20 })]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [new TextRun({ text: "ចម្លង _____ ច្បាប់", font: "Khmer OS Siemreap", size: 20 })]
                  }),
                ]
              }),
            ]
          })
        ]
      }),

      ...blankLine(1),

      // ====== TITLE ======
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 60 },
        children: [new TextRun({
          text: "លិខិតសុំច្បាប់",
          bold: true, font: "Khmer OS Siemreap", size: 36,
          underline: { type: UnderlineType.SINGLE }
        })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 300 },
        children: [new TextRun({ text: "(Leave Request)", font: "Khmer OS Siemreap", size: 20 })]
      }),

      // ====== REF + DATE ======
      new Table({
        width: { size: 9180, type: WidthType.DXA },
        columnWidths: [4590, 4590],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: noBorders,
                width: { size: 4590, type: WidthType.DXA },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: "លេខ៖ _____ / ______ / ________", font: "Khmer OS Siemreap", size: 22 })]
                  }),
                ]
              }),
              new TableCell({
                borders: noBorders,
                width: { size: 4590, type: WidthType.DXA },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [new TextRun({ text: "ភ្នំពេញ, ថ្ងៃទី ___ ខែ ________ ឆ្នាំ _____", font: "Khmer OS Siemreap", size: 22 })]
                  }),
                ]
              }),
            ]
          })
        ]
      }),

      ...blankLine(1),

      // ====== TO ======
      new Paragraph({
        spacing: { before: 0, after: 100 },
        children: [
          new TextRun({ text: "គោរពជូន៖\t\t", bold: true, font: "Khmer OS Siemreap", size: 22 }),
          new TextRun({ text: "លោក/លោកស្រី ___________________________________", font: "Khmer OS Siemreap", size: 22 }),
        ]
      }),
      new Paragraph({
        spacing: { before: 0, after: 100 },
        indent: { left: 1800 },
        children: [new TextRun({ text: "មុខតំណែង៖ _______________________________________________", font: "Khmer OS Siemreap", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 300 },
        indent: { left: 1800 },
        children: [new TextRun({ text: "អង្គភាព/ក្រុម៖ ______________________________________________", font: "Khmer OS Siemreap", size: 22 })]
      }),

      // ====== BODY ======
      new Paragraph({
        spacing: { before: 0, after: 160 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "ខ្ញុំ", font: "Khmer OS Siemreap", size: 22 }),
          new TextRun({ text: " (យស) ", bold: true, font: "Khmer OS Siemreap", size: 22 }),
          new TextRun({ text: "_____________________ ឋានន្តរស័ក្តិ ________________________", font: "Khmer OS Siemreap", size: 22 }),
        ]
      }),
      new Paragraph({
        spacing: { before: 0, after: 160 },
        indent: { left: 720 },
        children: [new TextRun({ text: "អង្គភាព __________________________ នៃ កងរាជអាវុធហត្ថ សូមគោរពជូន", font: "Khmer OS Siemreap", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 160 },
        indent: { left: 720 },
        children: [new TextRun({ text: "ដំណឹងថា ខ្ញុំមានបំណងសុំច្បាប់ ដោយសារ៖", font: "Khmer OS Siemreap", size: 22 })]
      }),

      // Reason
      new Paragraph({
        spacing: { before: 0, after: 100 },
        indent: { left: 1440 },
        children: [new TextRun({ text: "☐  ជំងឺ / ព្យាបាល (Medical Leave)", font: "Khmer OS Siemreap", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 100 },
        indent: { left: 1440 },
        children: [new TextRun({ text: "☐  ឈប់សំរាក (Annual Leave)", font: "Khmer OS Siemreap", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 100 },
        indent: { left: 1440 },
        children: [new TextRun({ text: "☐  ការងារផ្ទាល់ខ្លួន (Personal Leave)", font: "Khmer OS Siemreap", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 100 },
        indent: { left: 1440 },
        children: [new TextRun({ text: "☐  មរណភាព (Bereavement Leave)", font: "Khmer OS Siemreap", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 200 },
        indent: { left: 1440 },
        children: [new TextRun({ text: "☐  ផ្សេងៗ៖ ___________________________________________________", font: "Khmer OS Siemreap", size: 22 })]
      }),

      // Details
      new Paragraph({
        spacing: { before: 0, after: 100 },
        indent: { left: 720 },
        children: [new TextRun({ text: "មូលហេតុលម្អិត៖ ______________________________________________________________________________", font: "Khmer OS Siemreap", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 300 },
        indent: { left: 720 },
        children: [new TextRun({ text: "________________________________________________________________________________________", font: "Khmer OS Siemreap", size: 22 })]
      }),

      // Leave Period Table
      new Table({
        width: { size: 9180, type: WidthType.DXA },
        columnWidths: [2295, 2295, 2295, 2295],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders,
                width: { size: 2295, type: WidthType.DXA },
                shading: { fill: "C0C0C0", type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ប្រភេទច្បាប់", bold: true, font: "Khmer OS Siemreap", size: 22 })] })]
              }),
              new TableCell({
                borders,
                width: { size: 2295, type: WidthType.DXA },
                shading: { fill: "C0C0C0", type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ចាប់ពីថ្ងៃ", bold: true, font: "Khmer OS Siemreap", size: 22 })] })]
              }),
              new TableCell({
                borders,
                width: { size: 2295, type: WidthType.DXA },
                shading: { fill: "C0C0C0", type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ដល់ថ្ងៃ", bold: true, font: "Khmer OS Siemreap", size: 22 })] })]
              }),
              new TableCell({
                borders,
                width: { size: 2295, type: WidthType.DXA },
                shading: { fill: "C0C0C0", type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "សរុប (ថ្ងៃ)", bold: true, font: "Khmer OS Siemreap", size: 22 })] })]
              }),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2295, type: WidthType.DXA }, margins: { top: 100, bottom: 100, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "", font: "Khmer OS Siemreap", size: 22 })] })] }),
              new TableCell({ borders, width: { size: 2295, type: WidthType.DXA }, margins: { top: 100, bottom: 100, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "", font: "Khmer OS Siemreap", size: 22 })] })] }),
              new TableCell({ borders, width: { size: 2295, type: WidthType.DXA }, margins: { top: 100, bottom: 100, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "", font: "Khmer OS Siemreap", size: 22 })] })] }),
              new TableCell({ borders, width: { size: 2295, type: WidthType.DXA }, margins: { top: 100, bottom: 100, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "", font: "Khmer OS Siemreap", size: 22 })] })] }),
            ]
          }),
        ]
      }),

      ...blankLine(1),

      // Closing
      new Paragraph({
        spacing: { before: 200, after: 120 },
        indent: { left: 720 },
        children: [new TextRun({ text: "ក្នុងអំឡុងពេលច្បាប់ ខ្ញុំបានប្រគល់ភារកិច្ចឱ្យ (យស) _________________________________ ទទួលបន្ត។", font: "Khmer OS Siemreap", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 300 },
        indent: { left: 720 },
        children: [new TextRun({ text: "សូមលោក/លោកស្រី មេត្តាពិនិត្យ និងអនុញ្ញាតឱ្យខ្ញុំផង។", font: "Khmer OS Siemreap", size: 22 })]
      }),

      // ====== SIGNATURE BLOCK ======
      new Table({
        width: { size: 9180, type: WidthType.DXA },
        columnWidths: [3060, 3060, 3060],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: noBorders,
                width: { size: 3060, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "យល់ព្រម / អនុម័ត", bold: true, font: "Khmer OS Siemreap", size: 22 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 60 }, children: [new TextRun({ text: "(ហត្ថលេខា និងត្រា)", font: "Khmer OS Siemreap", size: 20 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 700, after: 60 }, children: [new TextRun({ text: "ឈ្មោះ:___________________", font: "Khmer OS Siemreap", size: 22 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ថ្ងៃ:_____________________", font: "Khmer OS Siemreap", size: 22 })] }),
                ]
              }),
              new TableCell({
                borders: noBorders,
                width: { size: 3060, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "មេប្រចាំការ / ប្រធានបន្ទាន់", bold: true, font: "Khmer OS Siemreap", size: 22 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 60 }, children: [new TextRun({ text: "(ហត្ថលេខា)", font: "Khmer OS Siemreap", size: 20 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 700, after: 60 }, children: [new TextRun({ text: "ឈ្មោះ:___________________", font: "Khmer OS Siemreap", size: 22 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ថ្ងៃ:_____________________", font: "Khmer OS Siemreap", size: 22 })] }),
                ]
              }),
              new TableCell({
                borders: noBorders,
                width: { size: 3060, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "អ្នកដាក់ពាក្យ", bold: true, font: "Khmer OS Siemreap", size: 22 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 60 }, children: [new TextRun({ text: "(ហត្ថលេខា)", font: "Khmer OS Siemreap", size: 20 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 700, after: 60 }, children: [new TextRun({ text: "ឈ្មោះ:___________________", font: "Khmer OS Siemreap", size: 22 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ថ្ងៃ:_____________________", font: "Khmer OS Siemreap", size: 22 })] }),
                ]
              }),
            ]
          })
        ]
      }),

      ...blankLine(1),

      // Note
      new Paragraph({
        spacing: { before: 200, after: 0 },
        children: [
          new TextRun({ text: "កំណត់ចំណាំ: ", bold: true, font: "Khmer OS Siemreap", size: 20 }),
          new TextRun({ text: "លិខិតនេះត្រូវដាក់ជូនយ៉ាងហោចណាស់ ៤៨ ម៉ោង មុនពេលឈប់ (លើកលែងករណីជំងឺបន្ទាន់)", font: "Khmer OS Siemreap", size: 20 })
        ]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/KOOMPI/.openclaw/nimmit/leave-request-military.docx', buffer);
  console.log('Done!');
});
