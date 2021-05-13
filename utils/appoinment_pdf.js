import jspdf from 'jspdf'

import fontUtils from './font'
import fontUtils2 from './fontBold'
import logo from './logo'

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
  doc.addImage(logo.logo, 'PNG' , 248, 15, 100, 100)

  doc.setFontSize(20)
  doc.setFont('THSarabunNew','bold')
  doc.text('ท่าซุงคลินิกเวชกรรม', pageWidth / 2, 130, 'center')
  doc.text('Tha Sung Medical Clinic ', pageWidth / 2, 147,'center')
  doc.line(20, 157, 575, 157)
  doc.text('ใบนัด', 285, 180)

  // เนื้อหาบรรทัดที่1
  doc.setFontSize(20)
  doc.setFont('THSarabunNew','normal')
  doc.text('คำนำหน้าชื่อ', 120, 220)
  if(!data.title) {
    doc.text('..............', 190, 220)
  } else {
    doc.text(data.title, 190, 220)
  }

  doc.text('ชื่อ', 240, 220)
  if(!data.first) {
    doc.text('..........................', 260, 220)
  } else {
    doc.text(data.first, 260, 220)
  }

  doc.text('นามสกุล', 350, 220)
  if(!data.last) {
    doc.text('..........................', 390, 220)
  } else {
    doc.text(data.last, 410, 220)
  }
  // เนื้อหาบรรทัดที่2
  doc.setFontSize(16)
  doc.setFont('THSarabunNew','normal')
  doc.text('เลขประจำตัวประชาชน', 50, 250)
  if(!data.id) {
    doc.text('..................................', 150, 250)
  } else {
    doc.text(data.id, 155, 250)
  }

  doc.text('ที่อยู่', 240, 250)
  if(!data.address) {
    doc.text('............', 260, 250)
  } else {
    doc.text(data.address, 270, 250)
  }

  doc.text('หมู่', 295, 250)
  if(!data.moo) {
    doc.text('..........', 310, 250)
  } else {
    doc.text(data.moo, 320, 250)
  }

  doc.text('ตำบล', 340, 250)
  if(!data.tambon) {
    doc.text('............................', 365, 250)
  } else {
    doc.text(data.tambon, 370, 250)
  }

  doc.text('อำเภอ', 440, 250)
  if(!data.district) {
    doc.text('..........................', 470, 250)
  } else {
    doc.text(data.district, 470, 250)
  }

  // เนื้อหาบรรทัดที่3
  doc.setFontSize(16)
  doc.setFont('THSarabunNew','normal')
  doc.text('จังหวัด', 50, 280)
  if(!data.province) {
    doc.text('..........................', 80, 280)
  } else {
    doc.text(data.province, 80, 280)
  }

  doc.text('เบอร์โทรติดต่อ', 150, 280)
  if(!data.phone) {
    doc.text('......................................', 215, 280)
  } else {
    doc.text(data.phone, 215, 280)
  }

  // เนื้อหาบรรทัดที่4
  doc.setFontSize(24)
  doc.setFont('THSarabunNew','bold')
  doc.text('วันนัดครั้งต่อไป', 110, 310)
  if(!data.day) {
    doc.text('..........................', 215, 310)
  } else {
    doc.text(data.day, 220, 310)
  }

  doc.text('เวลานัด', 325, 310)
  if(!data.time) {
    doc.text('................', 380, 310)
  } else {
    doc.text(data.time, 390, 310)
  }
  doc.text('น.', 450, 310)

  // เนื้อหาบรรทัดที่5
  doc.setFontSize(20)
  doc.setFont('THSarabunNew','normal')
  doc.text('หมายเหตุการนัด', 40, 340)
  if(!data.note) {
    doc.text('..................................................................................................................................', 130, 340)
  } else {
    doc.text(data.note, 150, 340)
  }

  // เนื้อหาบรรทัดที่6
  doc.setFontSize(14)
  doc.setFont('THSarabunNew','normal')
  doc.text('***กรุณานำใบนัดมาด้วยทุกครั้ง***', pageWidth / 2, 380, 'center')
  doc.text('13-15 ถนนณรงค์วิถี ตำบลอุทัยใหม่ อำเภอเมือง จังหวัดอุทัยธานี เบอร์โทรติดต่อ 05-651-2500', pageWidth / 2, 395, 'center')



  doc.output('dataurlnewwindow')
}

export default {
  Appoinment
}