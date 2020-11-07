import jspdf from 'jspdf'

import fontUtils from './font'
import fontUtils2 from './fontBold'

const Certificate_doc = (data) => {
    var doc = new jspdf('p', 'pt', 'a4')
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    doc.addFileToVFS("THSarabunNew.ttf", fontUtils.THSarabunNew)
    doc.addFont('THSarabunNew.ttf', 'THSarabunNew', 'normal')
    doc.setFont('THSarabunNew')

    doc.addFileToVFS("THSarabunNewBold.ttf", fontUtils2.THSarabunNewBold)
    doc.addFont('THSarabunNewBold.ttf', 'THSarabunNew', 'bold')

    doc.setProperties({
        title: 'ใบรับรองแพทย์'
    })
    // หัวเอกสาร
    doc.setFontSize(20)
    doc.setFont('THSarabunNew', 'bold')
    doc.text('ใบรับรองแพทย์', pageWidth / 2, 50, 'center')

    //บรรทัดที่1
    doc.setFontSize(16)
    doc.setFont('THSarabunNew', 'normal')
    doc.text('เล่มที่', 50, 60)
    if (!data.book) {
        doc.text('..............', 75, 60)
    } else {
        doc.text(data.book, 80, 60)
    }

    doc.text('เลขที่', 480, 60)
    if (!data.num) {
        doc.text('..............', 505, 60)
    } else {
        doc.text(data.num, 505, 60)
    }

    //บรรทัดที่2
    doc.setFontSize(16)
    doc.setFont('THSarabunNew', 'bold')
    doc.text('ส่วนที่ 1 ของผู้ขอรับใบรับรองสุขภาพ', 50, 90)

    //บรรทัดที่3
    doc.setFontSize(16)
    doc.setFont('THSarabunNew', 'normal')
    doc.text('คำนำหน้าชื่อ', 50, 110)
    if (!data.medicalRecord_id.title) {
        doc.text('..............', 105, 110)
    } else {
        doc.text(data.medicalRecord_id.title, 108, 110)
    }

    doc.text('ชื่อ', 145, 110)
    if (!data.medicalRecord_id.first) {
        doc.text('.................................................................', 160, 110)
    } else {
        doc.text(data.medicalRecord_id.first, 200, 110)
    }

    doc.text('นามสกุล', 330, 110)
    if (!data.medicalRecord_id.last) {
        doc.text('...................................................................', 370, 110)
    } else {
        doc.text(data.medicalRecord_id.last, 400, 110)
    }

    doc.text('สถานที่อยู่ (ที่สามารถติดต่อได้)', 50, 130)
    if (!data.medicalRecord_id.address) {
        doc.text('...............', 180, 130)
    } else {
        doc.text(data.medicalRecord_id.address, 200, 130)
    }

    doc.text('หมู่', 220, 130)
    if (!data.medicalRecord_id.moo) {
        doc.text('...............', 230, 130)
    } else {
        doc.text(data.medicalRecord_id.moo, 240, 130)
    }

    doc.text('ตำบล', 270, 130)
    if (!data.medicalRecord_id.tambon) {
        doc.text('........................................', 295, 130)
    } else {
        doc.text(data.medicalRecord_id.tambon, 310, 130)
    }

    doc.text('อำเภอ', 400, 130)
    if (!data.distric) {
        doc.text('............................................', 430, 130)
    } else {
        doc.text(data.medicalRecord_id.distric, 440, 130)
    }

    //บรรทัดที่4
    doc.text('จังหวัด', 50, 150)
    if (!data.medicalRecord_id.province) {
        doc.text('..............................................', 80, 150)
    } else {
        doc.text(data.medicalRecord_id.province, 100, 150)
    }

    doc.text('เลขประจำตัวประชาชน', 200, 150)
    if (!data.medicalRecord_id.citizen_id) {
        doc.text('...............................................', 300, 150)
    } else {
        doc.text(data.medicalRecord_id.citizen_id, 320, 150)
    }
    doc.text('ข้าพเจ้าขอใบรับรองสุขภาพ โดยมีประวัติสุขภาพดังนี้', 50, 170)

    //เว้นไว้ 3 บรรทัด 190 210 230
    doc.text('1. โรคประจำตัว', 50, 190)
    if (!data.deseat) {
        doc.text('ไม่มี', 250, 190)
    } else {
        doc.text(data.medicalRecord_id.disease, 250, 190)

    }

    doc.text('2. อุบัติเหตุ และผ่าตัด', 50, 210)
    if (!data.aciden) {
        doc.text('ไม่มี', 250, 210)
    } else {
        doc.text(data.aciden_detail, 250, 210)

    }

    doc.text('3. เคยเข้ารับการรักษาในโรงพยาบาล', 50, 230)
    if (!data.heal) {
        doc.text('ไม่มี', 250, 230)
    } else {
        doc.text(data.heal_detail, 250, 230)

    }


    doc.text('4.ประวัติอื่นที่สำคัญ', 50, 250)
    if (!data.note1) {
        doc.text('..............................................................................................................................................................', 135, 250)
    } else {
        doc.text(data.note1, 150, 250)
    }

    doc.setFontSize(14)
    doc.setFont('THSarabunNew', 'normal')
    doc.text('ลงชื่อ.......................................', 250, 280)
    doc.text('วัน', 360, 280)
    if (!data.day) {
        doc.text('..................', 375, 280)
    } else {
        doc.text(data.day, 390, 280)
    }
    doc.text('เดือน', 420, 280)
    if (!data.month) {
        doc.text('.....................', 440, 280)
    } else {
        doc.text(data.month, 450, 280)
    }
    doc.text('พ.ศ.', 500, 280)
    if (!data.year) {
        doc.text('................', 510, 280)
    } else {
        doc.text(data.year, 520, 280)
    }
    doc.text('ในกรณีเด็กที่ไม่สามารถรับรองตนเองได้ ให้ผู้ปกครองลงนามรับรองแทนได้', 275, 300)

    doc.setFontSize(16)
    doc.setFont('THSarabunNew', 'bold')
    doc.text('ส่วนที่ 2 ของแพทย์', 50, 330)
    doc.setFontSize(16)
    doc.setFont('THSarabunNew', 'normal')
    doc.text('สถานที่ตรวจ 13-15 ตำบลอุทัยใหม่ อำเภอเมือง จังหวัดอุทัยธานี', 50, 350)
    doc.text('วัน', 350, 350)
    if (!data.day) {
        doc.text('....................', 335, 350)
    } else {
        doc.text(data.day, 370, 350)
    }
    doc.text('เดือน', 390, 350)
    if (!data.month) {
        doc.text('......................', 410, 350)
    } else {
        doc.text(data.month, 425, 350)
    }
    doc.text('พ.ศ.', 480, 350)
    if (!data.year) {
        doc.text('......................', 490, 350)
    } else {
        doc.text(data.year, 510, 350)
    }

    doc.text('(1) ข้าพเจ้า', 35, 370)
    if (!data.name_predicate) {
        doc.text('...............................................................', 85, 370)
    } else {
        doc.text(data.name_predicate, 110, 370)
    }
    doc.text('ใบอนุญาตประกอบวิชาชีพเวชกรรมเลขที่', 250, 370)
    if (!data.doctor_id) {
        doc.text('.................................................', 420, 370)
    } else {
        doc.text(data.doctor_id, 440, 370)
    }
    doc.text(' สถานพยาบาลชื่อ    ท่าซุงคลินิกเวชกรรม    ที่อยู่  13-15  ถนนณรงค์วิถี  ตำบลอุทัยใหม่  อำเภอเมือง  จังหวัดอุทัยธานี', 50, 390)
    doc.text(' ได้ตรวจร่างกาย คำนำหน้าชื่อ', 50, 410)
    if (!data.title) {
        doc.text('.........................', 175, 410)
    } else {
        doc.text(data.title, 185, 410)
    }
    doc.text('ชื่อ', 240, 410)
    if (!data.name) {
        doc.text('..................................................', 255, 410)
    } else {
        doc.text(data.name, 290, 410)
    }
    doc.text('นามสกุล', 400, 410)
    if (!data.last) {
        doc.text('................................................', 425, 410)
    } else {
        doc.text(data.last, 450, 410)
    }

    doc.text(' แล้วเมื่อ วันที่', 50, 430)
    if (!data.day) {
        doc.text('....................', 110, 430)
    } else {
        doc.text(data.day, 125, 430)
    }
    doc.text('เดือน', 165, 430)
    if (!data.month) {
        doc.text('.......................', 190, 430)
    } else {
        doc.text(data.month, 200, 430)
    }
    doc.text('พ.ศ.', 250, 430)
    if (!data.year) {
        doc.text('......................', 270, 430)
    } else {
        doc.text(data.year, 280, 430)
    }
    doc.text('มีรายละเอียดดังนี้', 330, 430)

    doc.text(' น้ำหนักตัว', 50, 450)
    if (!data.weight) {
        doc.text('..................', 100, 450)
    } else {
        doc.text(data.weight, 115, 450)
    }
    doc.text('กก.', 150, 450)

    doc.text('ความสูง', 170, 450)
    if (!data.height) {
        doc.text('.................', 205, 450)
    } else {
        doc.text(data.height, 215, 450)
    }
    doc.text('ซม.', 250, 450)

    doc.text('ความดันโลหิต', 270, 450)
    if (!data.press) {
        doc.text('..................', 330, 450)
    } else {
        doc.text(data.press, 345, 450)
    }
    doc.text('มม. ปรอท', 380, 450)

    doc.text('ชีพจร', 425, 450)
    if (!data.pulse) {
        doc.text('.......................', 450, 450)
    } else {
        doc.text(data.pulse, 475, 450)
    }
    doc.text('ครั้ง/นาที', 510, 450)
    //เว้นบรรทัด 1 บรรทัด 470

    doc.text('สภาพร่างกายทั่วไปอยู่ในเกณฑ์' , 50, 470)

    doc.text('ขอรับรองว่า บุคคลดังกล่าว ไม่เป็นผู้มีร่างกายทุพพลภาพจนไม่สามารถปฏิบัติหน้าที่ได้ ไม่ปรากฎอาการของโรคจิต', 80, 490)
    doc.text('หรือจิตฟั่นเฟือง  หรือปัญญาอ่อน  ไม่ปรากฎอาการของการติดยาเสพติดให้โทษ  และอาการของโรคพิษสุราเรื้อรัง และไม่', 50, 510)
    doc.text('ปรากฎอาการ และอาการแสดงของโรคต่อไปนี้', 50, 530)
    doc.text('(1) โรคเรื้อนในระยะติดต่อ หรือในระยะที่ปรากฎอาการเป็นที่รังเกียจแก่สังคม', 70, 550)
    doc.text('(2) วัณโรคในระยะอันตราย', 70, 570)
    doc.text('(3) โรคเท้าช้างในระยะที่ปรากฎอาการเป็นที่รังเกียจแก่สังคม', 70, 590)
    doc.text('(4) อื่น ๆ (ถ้ามี)', 70, 610)
    if (!data.disease) {
        doc.text('................................................................................................................................................................', 135, 610)
    } else {
        doc.text(data.disease, 160, 610)
    }
    doc.text('(2) สรุปความเห็น และข้อเสนอแนะของแพทย์', 35, 630)
    if (!data.opinion) {
        doc.text('.............................................................................................................................', 225, 630)
    } else {
        doc.text(data.opinion, 240, 630)
    }

    doc.setFontSize(14)
    doc.setFont('THSarabunNew', 'normal')
    doc.text('ลงชื่อ.......................................', 250, 680)
    doc.text('วัน', 360, 680)
    if (!data.day) {
        doc.text('..................', 375, 680)
    } else {
        doc.text(data.day, 385, 680)
    }
    doc.text('เดือน', 420, 680)
    if (!data.month) {
        doc.text('.....................', 440, 680)
    } else {
        doc.text(data.month, 445, 680)
    }
    doc.text('พ.ศ.', 490, 680)
    if (!data.year) {
        doc.text('................', 510, 680)
    } else {
        doc.text(data.year, 510, 680)
    }

    doc.text('หมายเหตุ (1) ต้องเป็นแพทย์ซึ่งได้ขึ้นทะเบียนรับใบอนุญาตประกอบวิชาชีพเวชกรรม', 50, 730)
    doc.text('(2) ให้แสดงว่าเป็นผู้มีร่างกายสมบูรณ์เพียงใด ใบรับรองแพทย์ฉบับนี้ให้ใช้ได้ 1 เดือนนับตั้งแต่วันที่ตรวจร่างกาย', 90, 750)
    doc.text('(3) คำรับรองนี้เป็นการตรวจวินิจฉัยเบื้องต้น', 90, 770)
    doc.text('แบบฟอร์มนี้ได้รับการรับรองจากมติคณะกรรมการแพทยสภาในการประชุมครั้งที่ 4/2561 วันที่ 19 เมษายน 2561', 90, 790)



    doc.output('dataurlnewwindow')
}

const Certificate_sick = (data) => {
    var doc = new jspdf('p', 'pt', 'a4')
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    doc.addFileToVFS("THSarabunNew.ttf", fontUtils.THSarabunNew)
    doc.addFont('THSarabunNew.ttf', 'THSarabunNew', 'normal')
    doc.setFont('THSarabunNew')

    doc.addFileToVFS("THSarabunNewBold.ttf", fontUtils2.THSarabunNewBold)
    doc.addFont('THSarabunNewBold.ttf', 'THSarabunNew', 'bold')

    doc.setProperties({
        title: 'ใบรับรองแพทย์'
    })

    // หัวเอกสาร
    doc.setFontSize(20)
    doc.setFont('THSarabunNew', 'bold')
    doc.text('ใบรับรองแพทย์', pageWidth / 2, 90, 'center')

    // เนื้อหาบรรทัดที่1
    doc.setFontSize(16)
    doc.setFont('THSarabunNew', 'normal')
    doc.text('แพทย์ผู้ตรวจ', 80, 140)
    if (!data.name_predicate) {
        doc.text('...............................................................', 135, 140)
    } else {
        doc.text(data.name_predicate, 165, 140)
    }

    doc.text('ผู้ประกอบวิชาชีพเวชกรรมใบอนุญาตเลขที่', 300, 140)
    if (!data.doctor_id) {
        doc.text('............................', 475, 140)
    } else {
        doc.text(data.doctor_id, 490, 140)
    }

    // เนื้อหาบรรทัดที่2
    doc.text('สถานที่ประกอบวิชาชีพเวชกรรม หรือสถานที่ปฏิบัติงานประจำ', 40, 160)

    doc.setFontSize(16)
    doc.setFont('THSarabunNew', 'bold')
    doc.text('ท่าซุงคลินิกเวชกรรม 13-15 ถนนณรงค์วิถี ตำบลอุทัยใหม่', 300, 160)
    doc.text('อำเภอเมืองอุทัยธานี  จังหวัดอุทัยธานี 61000', 40, 180)

    // เนื้อหาบรรทัดที่3
    doc.setFontSize(16)
    doc.setFont('THSarabunNew', 'normal')
    doc.text('หนังสือรับรองฉบับนี้ ขอรับรองว่า ข้าพเจ้า', 80, 210)
    if (!data.name_predicate) {
        doc.text('....................................................', 255, 210)
    } else {
        doc.text(data.name_predicate, 270, 210)
    }
    doc.text('ได้ทำการตรวจร่างกายบุคคลดังต่อไปนี้', 390, 210)

    // เนื้อหาบรรทัดที่5
    doc.text('คำนำหน้าชื่อ', 40, 230)
    if (!data.medicalRecord_id.title) {
        doc.text('.............', 95, 230)
    } else {
        doc.text(data.medicalRecord_id.title, 95, 230)
    }

    doc.text('ชื่อ', 130, 230)
    if (!data.medicalRecord_id.first) {
        doc.text('............................', 145, 230)
    } else {
        doc.text(data.medicalRecord_id.first, 155, 230)
    }

    doc.text('นามสกุล', 220, 230)
    if (!data.medicalRecord_id.last) {
        doc.text('...........................', 260, 230)
    } else {
        doc.text(data.medicalRecord_id.last, 265, 230)
    }

    doc.text('อายุ', 330, 230)
    if (!data.medicalRecord_id.age) {
        doc.text('............', 350, 230)
    } else {
        doc.text(data.medicalRecord_id.age, 355, 230)
    }
    doc.text('ปี', 380, 230)

    doc.text('สถานที่อยู่ บ้านเลขที่', 390, 230)
    if (!data.medicalRecord_id.address) {
        doc.text('...........................', 480, 230)
    } else {
        doc.text(data.medicalRecord_id.address, 490, 230)
    }

    // เนื้อหาบรรทัดที่6
    doc.text('หมู่', 40, 250)
    if (!data.medicalRecord_id.moo) {
        doc.text('.................', 55, 250)
    } else {
        doc.text(data.medicalRecord_id.moo, 70, 250)
    }

    doc.text('ถนน', 100, 250)
    if (!data.medicalRecord_id.road) {
        doc.text('............................', 120, 250)
    } else {
        doc.text(data.medicalRecord_id.road, 130, 250)
    }

    doc.text('ตำบล', 195, 250)
    if (!data.medicalRecord_id.tambon) {
        doc.text('..................................', 220, 250)
    } else {
        doc.text(data.medicalRecord_id.tambon, 235, 250)
    }

    doc.text('อำเภอ', 310, 250)
    if (!data.medicalRecord_id.district) {
        doc.text('................................', 340, 250)
    } else {
        doc.text(data.medicalRecord_id.district, 340, 250)
    }

    doc.text('จังหวัด', 425, 250)
    if (!data.medicalRecord_id.province) {
        doc.text('.....................................', 455, 250)
    } else {
        doc.text(data.medicalRecord_id.province, 470, 250)
    }

    // เนื้อหาบรรทัดที่7
    doc.text('เลขประจำตัวประชาชน', 40, 270)
    if (!data.medicalRecord_id.id) {
        doc.text('..................................', 140, 270)
    } else {
        doc.text(data.medicalRecord_id.id, 140, 270)
    }

    doc.text('เมื่อวันที่', 230, 270)
    if (!data.day) {
        doc.text('................................', 265, 270)
    } else {
        doc.text(data.day, 300, 270)
    }

    doc.text('เดือน', 355, 270)
    if (!data.month) {
        doc.text('.............................', 375, 270)
    } else {
        doc.text(data.month, 380, 270)
    }

    doc.text('พ.ศ.', 450, 270)
    if (!data.year) {
        doc.text('...............................', 470, 270)
    } else {
        doc.text(data.year, 480, 270)
    }
    doc.text('จากการตรวจร่างกายของผู้มีชื่อข้างต้นแล้ว ขอให้ความเห็นดังต่อไปนี้ วินิจฉัยโรค   (ควรบอกชื่อโรค บริเวณที่เป็นโรค   และ', 40, 290)
    doc.text('ระยะของโรค)', 40, 310)
    if (!data.note) {
        doc.text('.............................................................................................................................................................................', 100, 310)
    } else {
        doc.text(data.note, 120, 310)
    }

    doc.text('สรุปความเห็น (ควรหยุดงานกี่วัน เพราะเหตุใด)', 40, 330)
    if (!data.conclude) {
        doc.text('.......................................................................................................................', 240, 330)
    } else {
        doc.text(data.conclude, 260, 330)
    }


    doc.text('ใบรับรองฉบับนี้ออกให้เมื่อ วันที่', 80, 370)
    if (!data.day) {
        doc.text('........................', 215, 370)
    } else {
        doc.text(data.day, 240, 370)
    }

    doc.text('เดือน', 280, 370)
    if (!data.month) {
        doc.text('..............................', 305, 370)
    } else {
        doc.text(data.month, 315, 370)
    }

    doc.text('พ.ศ.', 390, 370)
    if (!data.year) {
        doc.text('..........................', 405, 370)
    } else {
        doc.text(data.year, 425, 370)
    }
    doc.text('ขอรับรองข้อความ', 475, 370)
    doc.text('ข้างต้นเป็นความจริง', 40, 390)
    doc.text('ลงชื่อแพทย์ผู้ตรวจ.................................................', 340, 550)

    doc.output('dataurlnewwindow')
}

export default {
    Certificate_doc,
    Certificate_sick
}