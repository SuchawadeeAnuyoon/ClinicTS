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
  doc.setFont('THSarabunNew','bold')
    doc.text('ท่าซุงคลินิกเวชกรรม', 250, 70)
    doc.text('Tha Sung Medical Clinic ', 230, 85)
  doc.line(20, 90, 575, 90)
  doc.text('ใบนัด', 290, 110)

  // เนื้อหา
  doc.setFontSize(16)
  doc.setFont('THSarabunNew','normal')
  doc.text('คำนำหน้าชื่อ', 150, 130)
  if(!data.title) {
    doc.text('..........................', 170, 130)
  } else {
    doc.text(data.title, 150, 130)
  }

  doc.text('ชื่อ', 220, 130)
  if(!data.name) {
    doc.text('..........................', 240, 130)
  } else {
    doc.text(data.name, 220, 130)
  }
  
  doc.text('นามสกุล', 270, 130)
  if(!data.last) {
    doc.text('..........................', 290, 130)
  } else {
    doc.text(data.last, 270, 130)
  }

  
  

  doc.output('dataurlnewwindow')
}

export default {
  Appoinment
}