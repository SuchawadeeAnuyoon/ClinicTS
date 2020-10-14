import jspdf from 'jspdf'

import fontUtils from './font'

const Appoinment=(data) => {
  var doc = new jspdf('p','pt','a4')

  doc.addFileToVFS("THSarabunNew.ttf",fontUtils.THSarabunNew)
  doc.addFont('THSarabunNew.ttf','THSarabunNew','normal')
  doc.setFont('THSarabunNew')

  doc.addFileToVFS("THSarabunNewBold.ttf",fontUtils.THSarabunNewBold)
  doc.addFont('THSarabunNewBold.ttf','THSarabunNew','bold')

  doc.setProperties({
    title: 'ใบนัด'
  })

  // หัวเอกสาร
  doc.setFontSize(20)
  // doc.setFontStyle("bold")
  doc.setFont('THSarabunNew','bold')
  if (!data.header) {
    doc.text('..............................', 250, 36)
  } else {
    doc.text(data.header, 250, 36)
  }

  doc.output('dataurlnewwindow')
}

export default {
  Appoinment
}