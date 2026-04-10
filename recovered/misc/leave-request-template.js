const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, HeadingLevel,
  UnderlineType
} = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "AAAAAA" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function cell(text, bold = false, shading = null, colSpan = 1, width = 4680) {
  const cellProps = {
    borders,
    width: { size: width, type: WidthType.DXA },
    margins: { top: 100, bottom: 100, left: 150, right: 150 },
    children: [new Paragraph({
      children: [new TextRun({ text, bold, font: "Khmer OS Siemreap", size: 22 })]
    })]
  };
  if (shading) cellProps.shading = { fill: shading, type: ShadingType.CLEAR };
  if (colSpan > 1) cellProps.columnSpan = colSpan;
  return new TableCell(cellProps);
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
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1800 }
      }
    },
    children: [
      // Header - Company Name
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 120 },
        children: [new TextRun({
          text: "ក្រុមហ៊ុន/អង្គភាព: ___________________________________",
          bold: true, font: "Khmer OS Siemreap", size: 26
        })]
      }),

      // Title
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 200 },
        children: [new TextRun({
          text: "លិខិតសុំច្បាប់",
          bold: true, font: "Khmer OS Siemreap", size: 36,
          underline: { type: UnderlineType.SINGLE }
        })]
      }),

      // Date line
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { before: 0, after: 300 },
        children: [new TextRun({
          text: "ភ្នំពេញ, ថ្ងៃទី ______ ខែ _____________ ឆ្នាំ _______",
          font: "Khmer OS Siemreap", size: 22
        })]
      }),

      // To line
      new Paragraph({
        spacing: { before: 0, after: 120 },
        children: [
          new TextRun({ text: "គោរពជូន: ", bold: true, font: "Khmer OS Siemreap", size: 22 }),
          new TextRun({ text: "_______________________________________________", font: "Khmer OS Siemreap", size: 22 })
        ]
      }),

      // Position
      new Paragraph({
        spacing: { before: 0, after: 300 },
        children: [
          new TextRun({ text: "មុខតំណែង: ", bold: true, font: "Khmer OS Siemreap", size: 22 }),
          new TextRun({ text: "____________________________________________", font: "Khmer OS Siemreap", size: 22 })
        ]
      }),

      // Opening paragraph
      new Paragraph({
        spacing: { before: 0, after: 200 },
        indent: { left: 720 },
        children: [new TextRun({
          text: "ខ្ញុំបាទ/នាងខ្ញុំ _____________________________ មុខតំណែង ________________________ នៃ _________________________ សូមគោរពជូនដំណឹងដល់លោក/លោកស្រី ថ្នាក់ដឹកនាំ ថា ខ្ញុំបាទ/នាងខ្ញុំ មានការចាំបាច់ ដោយសារ:",
          font: "Khmer OS Siemreap", size: 22
        })]
      }),

      // Reason box
      new Paragraph({
        spacing: { before: 100, after: 100 },
        indent: { left: 720 },
        children: [new TextRun({
          text: "មូលហេតុ: ___________________________________________________________________________",
          font: "Khmer OS Siemreap", size: 22
        })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 300 },
        indent: { left: 720 },
        children: [new TextRun({
          text: "___________________________________________________________________________________________",
          font: "Khmer OS Siemreap", size: 22
        })]
      }),

      // Leave details table
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3120, 3120, 3120],
        rows: [
          new TableRow({
            children: [
              cell("ប្រភេទច្បាប់", true, "D5E8F0", 1, 3120),
              cell("ចាប់ពីថ្ងៃ", true, "D5E8F0", 1, 3120),
              cell("ដល់ថ្ងៃ", true, "D5E8F0", 1, 3120),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders,
                width: { size: 3120, type: WidthType.DXA },
                margins: { top: 100, bottom: 100, left: 150, right: 150 },
                children: [
                  new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "☐  ច្បាប់ឈប់សំរាក", font: "Khmer OS Siemreap", size: 22 })] }),
                  new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "☐  ច្បាប់ឈឺ", font: "Khmer OS Siemreap", size: 22 })] }),
                  new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "☐  ច្បាប់ផ្ទាល់ខ្លួន", font: "Khmer OS Siemreap", size: 22 })] }),
                  new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: "☐  ផ្សេងៗ: ___________", font: "Khmer OS Siemreap", size: 22 })] }),
                ]
              }),
              cell("", false, null, 1, 3120),
              cell("", false, null, 1, 3120),
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders,
                width: { size: 9360, type: WidthType.DXA },
                columnSpan: 3,
                margins: { top: 100, bottom: 100, left: 150, right: 150 },
                children: [new Paragraph({
                  children: [new TextRun({ text: "សរុបចំនួន: _______ ថ្ងៃ", bold: true, font: "Khmer OS Siemreap", size: 22 })]
                })]
              }),
            ]
          }),
        ]
      }),

      // Closing
      new Paragraph({
        spacing: { before: 300, after: 200 },
        indent: { left: 720 },
        children: [new TextRun({
          text: "ខ្ញុំបាទ/នាងខ្ញុំ សូមសន្យាថា នឹងបំពេញភារកិច្ចឲ្យបានពេញលេញ ក្រោយពេលត្រឡប់មកធ្វើការវិញ។",
          font: "Khmer OS Siemreap", size: 22
        })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 400 },
        indent: { left: 720 },
        children: [new TextRun({
          text: "សូមលោក/លោកស្រី ចូលរួមពិចារណា និងអនុញ្ញាតផ្តល់ច្បាប់ជូនខ្ញុំបាទ/នាងខ្ញុំផង។",
          font: "Khmer OS Siemreap", size: 22
        })]
      }),

      // Signature block table
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [4680, 4680],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: noBorders,
                width: { size: 4680, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 150, right: 150 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "អ្នកដាក់សុំ", bold: true, font: "Khmer OS Siemreap", size: 22 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "(ហត្ថលេខា)", font: "Khmer OS Siemreap", size: 20 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600 }, children: [new TextRun({ text: "ឈ្មោះ: _______________________", font: "Khmer OS Siemreap", size: 22 })] }),
                ]
              }),
              new TableCell({
                borders: noBorders,
                width: { size: 4680, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 150, right: 150 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "អ្នកអនុម័ត", bold: true, font: "Khmer OS Siemreap", size: 22 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "(ហត្ថលេខា និងត្រា)", font: "Khmer OS Siemreap", size: 20 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600 }, children: [new TextRun({ text: "ឈ្មោះ: _______________________", font: "Khmer OS Siemreap", size: 22 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ថ្ងៃទី: ________________________", font: "Khmer OS Siemreap", size: 22 })] }),
                ]
              }),
            ]
          })
        ]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/KOOMPI/.openclaw/nimmit/leave-request-template.docx', buffer);
  console.log('Done! File created: leave-request-template.docx');
});
