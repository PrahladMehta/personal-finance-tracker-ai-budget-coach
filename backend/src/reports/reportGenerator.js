const pdfMake = require('pdfmake')
const {Table, Text, Document, PageNumbers} = require('pdfmake')

const generateFinancialSummaryReport = async (data) => {
  try {
    const { income, expenses, netProfit } = data;

    const documentDefinition = {
      content: [
        { text: 'Financial Summary Report', style: 'header' },
        { text: new Date().toLocaleDateString(), style: 'subheader' },
        {
          table: {
            body: [
              [{ text: 'Income', style: 'tableHeader' }, { text: income, style: 'tableData' }],
              [{ text: 'Expenses', style: 'tableHeader' }, { text: expenses, style: 'tableData' }],
              [{ text: 'Net Profit', style: 'tableHeader' }, { text: netProfit, style: 'tableData' }],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 20],
        },
        subheader: {
          fontSize: 14,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
        },
        tableData: {
          fontSize: 12,
        },
      },
      pageMargins: [40, 60, 40, 60],
      footer: { text: 'Page [pageText] of [totalPages]', style: 'footer' },
    };


    const pdfDoc = new pdfMake({
      Roboto: {normal: new Buffer(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
      bold: new Buffer(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Medium.ttf'], 'base64')
      }
    }).createPdfKitDocument(documentDefinition)
    const chunks = [];
    pdfDoc.on('data', chunks.push.bind(chunks));
    pdfDoc.on('end', () => {
      const result = Buffer.concat(chunks);
      return result
    });
    pdfDoc.end();

  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};


module.exports = { generateFinancialSummaryReport };