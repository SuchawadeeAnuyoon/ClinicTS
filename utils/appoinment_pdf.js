import jspdf from 'jspdf'

import fontUtils from './font'
import fontUtils2 from './fontBold'

const Appoinment=(data) => {
  var doc = new jspdf('l','pt','a5')
  var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

  doc.addFileToVFS("THSarabunNew.ttf",fontUtils.THSarabunNew)
  doc.addFont('THSarabunNew.ttf','THSarabunNew','normal')
  doc.setFont('THSarabunNew')

  doc.addFileToVFS("THSarabunNewBold.ttf",fontUtils2.THSarabunNewBold)
  doc.addFont('THSarabunNewBold.ttf','THSarabunNew','bold')

  doc.setProperties({
    title: 'ใบนัด'
  })

  // หัวเอกสาร
  doc.setFontSize(20)
  doc.setFont('THSarabunNew','bold')
    doc.text('ท่าซุงคลินิกเวชกรรม', pageWidth / 2, 70, 'center')
    doc.text('Tha Sung Medical Clinic ', pageWidth / 2, 90,'center')
  doc.line(20, 110, 575, 110)
  doc.text('ใบนัด', 290, 140)

  // เนื้อหาบรรทัดที่1
  doc.setFontSize(20)
  doc.setFont('THSarabunNew','normal')
  doc.text('คำนำหน้าชื่อ', 120, 180)
  if(!data.title) {
    doc.text('..............', 190, 180)
  } else {
    doc.text(data.title, 190, 180)
  }

  doc.text('ชื่อ', 240, 180)
  if(!data.name) {
    doc.text('..........................', 260, 180)
  } else {
    doc.text(data.name, 260, 180)
  }

  doc.text('นามสกุล', 350, 180)
  if(!data.last) {
    doc.text('..........................', 390, 180)
  } else {
    doc.text(data.last, 410, 180)
  }
  // เนื้อหาบรรทัดที่2
  doc.setFontSize(16)
  doc.setFont('THSarabunNew','normal')
  doc.text('เลขประจำตัวประชาชน', 50, 210)
  if(!data.id) {
    doc.text('..................................', 150, 210)
  } else {
    doc.text(data.id, 155, 210)
  }

  doc.text('ที่อยู่', 240, 210)
  if(!data.address) {
    doc.text('............', 260, 210)
  } else {
    doc.text(data.address, 270, 210)
  }

  doc.text('หมู่', 295, 210)
  if(!data.moo) {
    doc.text('..........', 310, 210)
  } else {
    doc.text(data.moo, 320, 210)
  }

  doc.text('ตำบล', 340, 210)
  if(!data.tambon) {
    doc.text('............................', 365, 210)
  } else {
    doc.text(data.tambon, 370, 210)
  }

  doc.text('อำเภอ', 440, 210)
  if(!data.district) {
    doc.text('..........................', 470, 210)
  } else {
    doc.text(data.district, 470, 210)
  }

  // เนื้อหาบรรทัดที่3
  doc.setFontSize(16)
  doc.setFont('THSarabunNew','normal')
  doc.text('จังหวัด', 50, 240)
  if(!data.province) {
    doc.text('..........................', 80, 240)
  } else {
    doc.text(data.province, 80, 240)
  }

  doc.text('เบอร์โทรติดต่อ', 150, 240)
  if(!data.phone) {
    doc.text('......................................', 215, 240)
  } else {
    doc.text(data.phone, 215, 240)
  }

  // เนื้อหาบรรทัดที่4
  doc.setFontSize(24)
  doc.setFont('THSarabunNew','bold')
  doc.text('วันนัดครั้งต่อไป', 110, 270)
  if(!data.day) {
    doc.text('..........................', 215, 270)
  } else {
    doc.text(data.day, 220, 270)
  }

  doc.text('เวลานัด', 325, 270)
  if(!data.time) {
    doc.text('................', 380, 270)
  } else {
    doc.text(data.time, 390, 270)
  }
  doc.text('น.', 450, 270)

  // เนื้อหาบรรทัดที่5
  doc.setFontSize(20)
  doc.setFont('THSarabunNew','normal')
  doc.text('หมายเหตุการนัด', 40, 300)
  if(!data.note) {
    doc.text('..................................................................................................................................', 130, 300)
  } else {
    doc.text(data.note, 150, 300)
  }

  // เนื้อหาบรรทัดที่6
  doc.setFontSize(14)
  doc.setFont('THSarabunNew','normal')
  doc.text('***กรุณานำใบนัดมาด้วยทุกครั้ง***', pageWidth / 2, 340, 'center')
  doc.text('13-15 ถนนณรงค์วิถี ตำบลอุทัยใหม่ อำเภอเมือง จังหวัดอุทัยธานี เบอร์โทรติดต่อ 05-651-2500', pageWidth / 2, 355, 'center')



  doc.output('dataurlnewwindow')
}

export default {
  Appoinment
}