<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="12" sm="6">
              <div>รายงานวัตถุออกฤทธิ์ในประเภท ๓ หรือประเภท ๔ ประจำปี</div>
            </v-col>
            <v-col cols="12" sm="3">
              <v-select
                flat
                :items="years"
                v-model="currentYear"
                item-text="name"
                item-value="value"
                @click="fetch"
                dense
                hide-details="true"
              ></v-select>
            </v-col> </v-row
        ></v-card-title>
        <v-divider class="mx-3"></v-divider>
        <v-card-text v-if="loading">
          <div class="mb-3" v-for="(item, i) in month_name" :key="i">
            <div>{{ item }}</div>
            <v-divider></v-divider>

            <div
              class="mx-5"
              v-if="i == 0 && m1.length != 0"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th>ชื่อยา</th>
                    <th>เลขที่รุ่น/ครั้งที่ผลิต</th>
                    <th>ผู้ผลิตและแหล่งผลิต</th>
                    <th>ได้มาจาก</th>
                    <th>รับ</th>
                    <th>จ่าย</th>
                    <th>คงเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in m1" :key="i">
                    <td>{{item.name}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.creator}}</td>
                    <td>{{item.from}}</td>
                    <td>{{item.add}}</td>
                    <td>{{item.paid}}</td>
                    <td>{{item.total}}</td>
                  </tr>
                  <!-- <tr v-if="m1.d1">
                    <td>{{ m1.d1.name }}</td>
                    <td>{{ m1.d1.number }}</td>
                    <td>{{ m1.d1.creator }}</td>
                    <td>{{ m1.d1.from }}</td>
                    <td>{{ m1.d1.add }}</td>
                    <td>{{ m1.d1.paid }}</td>
                    <td>{{ m1.d1.total }}</td>
                  </tr>
                  <tr v-if="m1.d2">
                    <td>{{ m1.d2.name }}</td>
                    <td>{{ m1.d2.number }}</td>
                    <td>{{ m1.d2.creator }}</td>
                    <td>{{ m1.d2.from }}</td>
                    <td>{{ m1.d2.add }}</td>
                    <td>{{ m1.d2.paid }}</td>
                    <td>{{ m1.d2.total }}</td>
                  </tr>
                  <tr v-if="m1.d3">
                    <td>{{ m1.d3.name }}</td>
                    <td>{{ m1.d3.number }}</td>
                    <td>{{ m1.d3.creator }}</td>
                    <td>{{ m1.d3.from }}</td>
                    <td>{{ m1.d3.add }}</td>
                    <td>{{ m1.d3.paid }}</td>
                    <td>{{ m1.d3.total }}</td>
                  </tr>
                  <tr v-if="m1.d4">
                    <td>{{ m1.d4.name }}</td>
                    <td>{{ m1.d4.number }}</td>
                    <td>{{ m1.d4.creator }}</td>
                    <td>{{ m1.d4.from }}</td>
                    <td>{{ m1.d4.add }}</td>
                    <td>{{ m1.d4.paid }}</td>
                    <td>{{ m1.d4.total }}</td>
                  </tr>
                  <tr v-if="m1.d5">
                    <td>{{ m1.d5.name }}</td>
                    <td>{{ m1.d5.number }}</td>
                    <td>{{ m1.d5.creator }}</td>
                    <td>{{ m1.d5.from }}</td>
                    <td>{{ m1.d5.add }}</td>
                    <td>{{ m1.d5.paid }}</td>
                    <td>{{ m1.d5.total }}</td>
                  </tr>
                  <tr v-if="m1.d6">
                    <td>{{ m1.d6.name }}</td>
                    <td>{{ m1.d6.number }}</td>
                    <td>{{ m1.d6.creator }}</td>
                    <td>{{ m1.d6.from }}</td>
                    <td>{{ m1.d6.add }}</td>
                    <td>{{ m1.d6.paid }}</td>
                    <td>{{ m1.d6.total }}</td>
                  </tr> -->
                </tbody>
              </v-simple-table>
            </div>

            <div
              class="mx-5"
              v-if="i == 1 && m2.length != 0"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th>ชื่อยา</th>
                    <th>เลขที่รุ่น/ครั้งที่ผลิต</th>
                    <th>ผู้ผลิตและแหล่งผลิต</th>
                    <th>ได้มาจาก</th>
                    <th>รับ</th>
                    <th>จ่าย</th>
                    <th>คงเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in m2" :key="i">
                    <td>{{item.name}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.creator}}</td>
                    <td>{{item.from}}</td>
                    <td>{{item.add}}</td>
                    <td>{{item.paid}}</td>
                    <td>{{item.total}}</td>
                  </tr>
                  <!-- <tr v-if="m2.d1">
                    <td>{{ m2.d1.name }}</td>
                    <td>{{ m2.d1.number }}</td>
                    <td>{{ m2.d1.creator }}</td>
                    <td>{{ m2.d1.from }}</td>
                    <td>{{ m2.d1.add }}</td>
                    <td>{{ m2.d1.paid }}</td>
                    <td>{{ m2.d1.total }}</td>
                  </tr>
                  <tr v-if="m2.d2">
                    <td>{{ m2.d2.name }}</td>
                    <td>{{ m2.d2.number }}</td>
                    <td>{{ m2.d2.creator }}</td>
                    <td>{{ m2.d2.from }}</td>
                    <td>{{ m2.d2.add }}</td>
                    <td>{{ m2.d2.paid }}</td>
                    <td>{{ m2.d2.total }}</td>
                  </tr>
                  <tr v-if="m2.d3">
                    <td>{{ m2.d3.name }}</td>
                    <td>{{ m2.d3.number }}</td>
                    <td>{{ m2.d3.creator }}</td>
                    <td>{{ m2.d3.from }}</td>
                    <td>{{ m2.d3.add }}</td>
                    <td>{{ m2.d3.paid }}</td>
                    <td>{{ m2.d3.total }}</td>
                  </tr>
                  <tr v-if="m2.d4">
                    <td>{{ m2.d4.name }}</td>
                    <td>{{ m2.d4.number }}</td>
                    <td>{{ m2.d4.creator }}</td>
                    <td>{{ m2.d4.from }}</td>
                    <td>{{ m2.d4.add }}</td>
                    <td>{{ m2.d4.paid }}</td>
                    <td>{{ m2.d4.total }}</td>
                  </tr>
                  <tr v-if="m2.d5">
                    <td>{{ m2.d5.name }}</td>
                    <td>{{ m2.d5.number }}</td>
                    <td>{{ m2.d5.creator }}</td>
                    <td>{{ m2.d5.from }}</td>
                    <td>{{ m2.d5.add }}</td>
                    <td>{{ m2.d5.paid }}</td>
                    <td>{{ m2.d5.total }}</td>
                  </tr>
                  <tr v-if="m2.d6">
                    <td>{{ m2.d6.name }}</td>
                    <td>{{ m2.d6.number }}</td>
                    <td>{{ m2.d6.creator }}</td>
                    <td>{{ m2.d6.from }}</td>
                    <td>{{ m2.d6.add }}</td>
                    <td>{{ m2.d6.paid }}</td>
                    <td>{{ m2.d6.total }}</td>
                  </tr> -->
                </tbody>
              </v-simple-table>
            </div>

            <div
              class="mx-5"
              v-if="i == 2 && m3.length != 0"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th>ชื่อยา</th>
                    <th>เลขที่รุ่น/ครั้งที่ผลิต</th>
                    <th>ผู้ผลิตและแหล่งผลิต</th>
                    <th>ได้มาจาก</th>
                    <th>รับ</th>
                    <th>จ่าย</th>
                    <th>คงเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in m3" :key="i">
                    <td>{{item.name}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.creator}}</td>
                    <td>{{item.from}}</td>
                    <td>{{item.add}}</td>
                    <td>{{item.paid}}</td>
                    <td>{{item.total}}</td>
                  </tr>
                  <!-- <tr v-if="m3.d1">
                    <td>{{ m3.d1.name }}</td>
                    <td>{{ m3.d1.number }}</td>
                    <td>{{ m3.d1.creator }}</td>
                    <td>{{ m3.d1.from }}</td>
                    <td>{{ m3.d1.add }}</td>
                    <td>{{ m3.d1.paid }}</td>
                    <td>{{ m3.d1.total }}</td>
                  </tr>
                  <tr v-if="m3.d2">
                    <td>{{ m3.d2.name }}</td>
                    <td>{{ m3.d2.number }}</td>
                    <td>{{ m3.d2.creator }}</td>
                    <td>{{ m3.d2.from }}</td>
                    <td>{{ m3.d2.add }}</td>
                    <td>{{ m3.d2.paid }}</td>
                    <td>{{ m3.d2.total }}</td>
                  </tr>
                  <tr v-if="m3.d3">
                    <td>{{ m3.d3.name }}</td>
                    <td>{{ m3.d3.number }}</td>
                    <td>{{ m3.d3.creator }}</td>
                    <td>{{ m3.d3.from }}</td>
                    <td>{{ m3.d3.add }}</td>
                    <td>{{ m3.d3.paid }}</td>
                    <td>{{ m3.d3.total }}</td>
                  </tr>
                  <tr v-if="m3.d4">
                    <td>{{ m3.d4.name }}</td>
                    <td>{{ m3.d4.number }}</td>
                    <td>{{ m3.d4.creator }}</td>
                    <td>{{ m3.d4.from }}</td>
                    <td>{{ m3.d4.add }}</td>
                    <td>{{ m3.d4.paid }}</td>
                    <td>{{ m3.d4.total }}</td>
                  </tr>
                  <tr v-if="m3.d5">
                    <td>{{ m3.d5.name }}</td>
                    <td>{{ m3.d5.number }}</td>
                    <td>{{ m3.d5.creator }}</td>
                    <td>{{ m3.d5.from }}</td>
                    <td>{{ m3.d5.add }}</td>
                    <td>{{ m3.d5.paid }}</td>
                    <td>{{ m3.d5.total }}</td>
                  </tr>
                  <tr v-if="m3.d6">
                    <td>{{ m3.d6.name }}</td>
                    <td>{{ m3.d6.number }}</td>
                    <td>{{ m3.d6.creator }}</td>
                    <td>{{ m3.d6.from }}</td>
                    <td>{{ m3.d6.add }}</td>
                    <td>{{ m3.d6.paid }}</td>
                    <td>{{ m3.d6.total }}</td>
                  </tr> -->
                </tbody>
              </v-simple-table>
            </div>

            <div
              class="mx-5"
              v-if="i == 3 && m4.length != 0"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th>ชื่อยา</th>
                    <th>เลขที่รุ่น/ครั้งที่ผลิต</th>
                    <th>ผู้ผลิตและแหล่งผลิต</th>
                    <th>ได้มาจาก</th>
                    <th>รับ</th>
                    <th>จ่าย</th>
                    <th>คงเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in m4" :key="i">
                    <td>{{item.name}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.creator}}</td>
                    <td>{{item.from}}</td>
                    <td>{{item.add}}</td>
                    <td>{{item.paid}}</td>
                    <td>{{item.total}}</td>
                  </tr>
                  <tr v-if="m4.d1">
                    <td>{{ m4.d1.name }}</td>
                    <td>{{ m4.d1.number }}</td>
                    <td>{{ m4.d1.creator }}</td>
                    <td>{{ m4.d1.from }}</td>
                    <td>{{ m4.d1.add }}</td>
                    <td>{{ m4.d1.paid }}</td>
                    <td>{{ m4.d1.total }}</td>
                  </tr>
                  <tr v-if="m4.d2">
                    <td>{{ m4.d2.name }}</td>
                    <td>{{ m4.d2.number }}</td>
                    <td>{{ m4.d2.creator }}</td>
                    <td>{{ m4.d2.from }}</td>
                    <td>{{ m4.d2.add }}</td>
                    <td>{{ m4.d2.paid }}</td>
                    <td>{{ m4.d2.total }}</td>
                  </tr>
                  <tr v-if="m4.d3">
                    <td>{{ m4.d3.name }}</td>
                    <td>{{ m4.d3.number }}</td>
                    <td>{{ m4.d3.creator }}</td>
                    <td>{{ m4.d3.from }}</td>
                    <td>{{ m4.d3.add }}</td>
                    <td>{{ m4.d3.paid }}</td>
                    <td>{{ m4.d3.total }}</td>
                  </tr>
                  <tr v-if="m4.d4">
                    <td>{{ m4.d4.name }}</td>
                    <td>{{ m4.d4.number }}</td>
                    <td>{{ m4.d4.creator }}</td>
                    <td>{{ m4.d4.from }}</td>
                    <td>{{ m4.d4.add }}</td>
                    <td>{{ m4.d4.paid }}</td>
                    <td>{{ m4.d4.total }}</td>
                  </tr>
                  <tr v-if="m4.d5">
                    <td>{{ m4.d5.name }}</td>
                    <td>{{ m4.d5.number }}</td>
                    <td>{{ m4.d5.creator }}</td>
                    <td>{{ m4.d5.from }}</td>
                    <td>{{ m4.d5.add }}</td>
                    <td>{{ m4.d5.paid }}</td>
                    <td>{{ m4.d5.total }}</td>
                  </tr>
                  <tr v-if="m4.d6">
                    <td>{{ m4.d6.name }}</td>
                    <td>{{ m4.d6.number }}</td>
                    <td>{{ m4.d6.creator }}</td>
                    <td>{{ m4.d6.from }}</td>
                    <td>{{ m4.d6.add }}</td>
                    <td>{{ m4.d6.paid }}</td>
                    <td>{{ m4.d6.total }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </div>

            <div
              class="mx-5"
              v-if="i == 4 && m5.length != 0"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th>ชื่อยา</th>
                    <th>เลขที่รุ่น/ครั้งที่ผลิต</th>
                    <th>ผู้ผลิตและแหล่งผลิต</th>
                    <th>ได้มาจาก</th>
                    <th>รับ</th>
                    <th>จ่าย</th>
                    <th>คงเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in m5" :key="i">
                    <td>{{item.name}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.creator}}</td>
                    <td>{{item.from}}</td>
                    <td>{{item.add}}</td>
                    <td>{{item.paid}}</td>
                    <td>{{item.total}}</td>
                  </tr>
                  <!-- <tr v-if="m5.d1">
                    <td>{{ m5.d1.name }}</td>
                    <td>{{ m5.d1.number }}</td>
                    <td>{{ m5.d1.creator }}</td>
                    <td>{{ m5.d1.from }}</td>
                    <td>{{ m5.d1.add }}</td>
                    <td>{{ m5.d1.paid }}</td>
                    <td>{{ m5.d1.total }}</td>
                  </tr>
                  <tr v-if="m5.d2">
                    <td>{{ m5.d2.name }}</td>
                    <td>{{ m5.d2.number }}</td>
                    <td>{{ m5.d2.creator }}</td>
                    <td>{{ m5.d2.from }}</td>
                    <td>{{ m5.d2.add }}</td>
                    <td>{{ m5.d2.paid }}</td>
                    <td>{{ m5.d2.total }}</td>
                  </tr>
                  <tr v-if="m5.d3">
                    <td>{{ m5.d3.name }}</td>
                    <td>{{ m5.d3.number }}</td>
                    <td>{{ m5.d3.creator }}</td>
                    <td>{{ m5.d3.from }}</td>
                    <td>{{ m5.d3.add }}</td>
                    <td>{{ m5.d3.paid }}</td>
                    <td>{{ m5.d3.total }}</td>
                  </tr>
                  <tr v-if="m5.d4">
                    <td>{{ m5.d4.name }}</td>
                    <td>{{ m5.d4.number }}</td>
                    <td>{{ m5.d4.creator }}</td>
                    <td>{{ m5.d4.from }}</td>
                    <td>{{ m5.d4.add }}</td>
                    <td>{{ m5.d4.paid }}</td>
                    <td>{{ m5.d4.total }}</td>
                  </tr>
                  <tr v-if="m5.d5">
                    <td>{{ m5.d5.name }}</td>
                    <td>{{ m5.d5.number }}</td>
                    <td>{{ m5.d5.creator }}</td>
                    <td>{{ m5.d5.from }}</td>
                    <td>{{ m5.d5.add }}</td>
                    <td>{{ m5.d5.paid }}</td>
                    <td>{{ m5.d5.total }}</td>
                  </tr>
                  <tr v-if="m5.d6">
                    <td>{{ m5.d6.name }}</td>
                    <td>{{ m5.d6.number }}</td>
                    <td>{{ m5.d6.creator }}</td>
                    <td>{{ m5.d6.from }}</td>
                    <td>{{ m5.d6.add }}</td>
                    <td>{{ m5.d6.paid }}</td>
                    <td>{{ m5.d6.total }}</td>
                  </tr> -->
                </tbody>
              </v-simple-table>
            </div>

            <div
              class="mx-5"
              v-if="i == 5 && m6.length != 0"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th>ชื่อยา</th>
                    <th>เลขที่รุ่น/ครั้งที่ผลิต</th>
                    <th>ผู้ผลิตและแหล่งผลิต</th>
                    <th>ได้มาจาก</th>
                    <th>รับ</th>
                    <th>จ่าย</th>
                    <th>คงเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in m6" :key="i">
                    <td>{{item.name}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.creator}}</td>
                    <td>{{item.from}}</td>
                    <td>{{item.add}}</td>
                    <td>{{item.paid}}</td>
                    <td>{{item.total}}</td>
                  </tr>
                  <!-- <tr v-if="m6.d1">
                    <td>{{ m6.d1.name }}</td>
                    <td>{{ m6.d1.number }}</td>
                    <td>{{ m6.d1.creator }}</td>
                    <td>{{ m6.d1.from }}</td>
                    <td>{{ m6.d1.add }}</td>
                    <td>{{ m6.d1.paid }}</td>
                    <td>{{ m6.d1.total }}</td>
                  </tr>
                  <tr v-if="m6.d2">
                    <td>{{ m6.d2.name }}</td>
                    <td>{{ m6.d2.number }}</td>
                    <td>{{ m6.d2.creator }}</td>
                    <td>{{ m6.d2.from }}</td>
                    <td>{{ m6.d2.add }}</td>
                    <td>{{ m6.d2.paid }}</td>
                    <td>{{ m6.d2.total }}</td>
                  </tr>
                  <tr v-if="m6.d3">
                    <td>{{ m6.d3.name }}</td>
                    <td>{{ m6.d3.number }}</td>
                    <td>{{ m6.d3.creator }}</td>
                    <td>{{ m6.d3.from }}</td>
                    <td>{{ m6.d3.add }}</td>
                    <td>{{ m6.d3.paid }}</td>
                    <td>{{ m6.d3.total }}</td>
                  </tr>
                  <tr v-if="m6.d4">
                    <td>{{ m6.d4.name }}</td>
                    <td>{{ m6.d4.number }}</td>
                    <td>{{ m6.d4.creator }}</td>
                    <td>{{ m6.d4.from }}</td>
                    <td>{{ m6.d4.add }}</td>
                    <td>{{ m6.d4.paid }}</td>
                    <td>{{ m6.d4.total }}</td>
                  </tr>
                  <tr v-if="m6.d5">
                    <td>{{ m6.d5.name }}</td>
                    <td>{{ m6.d5.number }}</td>
                    <td>{{ m6.d5.creator }}</td>
                    <td>{{ m6.d5.from }}</td>
                    <td>{{ m6.d5.add }}</td>
                    <td>{{ m6.d5.paid }}</td>
                    <td>{{ m6.d5.total }}</td>
                  </tr>
                  <tr v-if="m6.d6">
                    <td>{{ m6.d6.name }}</td>
                    <td>{{ m6.d6.number }}</td>
                    <td>{{ m6.d6.creator }}</td>
                    <td>{{ m6.d6.from }}</td>
                    <td>{{ m6.d6.add }}</td>
                    <td>{{ m6.d6.paid }}</td>
                    <td>{{ m6.d6.total }}</td>
                  </tr> -->
                </tbody>
              </v-simple-table>
            </div>

            <div
              class="mx-5"
              v-if="i == 6 && m7.length != 0"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th>ชื่อยา</th>
                    <th>เลขที่รุ่น/ครั้งที่ผลิต</th>
                    <th>ผู้ผลิตและแหล่งผลิต</th>
                    <th>ได้มาจาก</th>
                    <th>รับ</th>
                    <th>จ่าย</th>
                    <th>คงเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in m7" :key="i">
                    <td>{{item.name}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.creator}}</td>
                    <td>{{item.from}}</td>
                    <td>{{item.add}}</td>
                    <td>{{item.paid}}</td>
                    <td>{{item.total}}</td>
                  </tr>
                  <!-- <tr v-if="m7.d1">
                    <td>{{ m7.d1.name }}</td>
                    <td>{{ m7.d1.number }}</td>
                    <td>{{ m7.d1.creator }}</td>
                    <td>{{ m7.d1.from }}</td>
                    <td>{{ m7.d1.add }}</td>
                    <td>{{ m7.d1.paid }}</td>
                    <td>{{ m7.d1.total }}</td>
                  </tr>
                  <tr v-if="m7.d2">
                    <td>{{ m7.d2.name }}</td>
                    <td>{{ m7.d2.number }}</td>
                    <td>{{ m7.d2.creator }}</td>
                    <td>{{ m7.d2.from }}</td>
                    <td>{{ m7.d2.add }}</td>
                    <td>{{ m7.d2.paid }}</td>
                    <td>{{ m7.d2.total }}</td>
                  </tr>
                  <tr v-if="m7.d3">
                    <td>{{ m7.d3.name }}</td>
                    <td>{{ m7.d3.number }}</td>
                    <td>{{ m7.d3.creator }}</td>
                    <td>{{ m7.d3.from }}</td>
                    <td>{{ m7.d3.add }}</td>
                    <td>{{ m7.d3.paid }}</td>
                    <td>{{ m7.d3.total }}</td>
                  </tr>
                  <tr v-if="m7.d4">
                    <td>{{ m7.d4.name }}</td>
                    <td>{{ m7.d4.number }}</td>
                    <td>{{ m7.d4.creator }}</td>
                    <td>{{ m7.d4.from }}</td>
                    <td>{{ m7.d4.add }}</td>
                    <td>{{ m7.d4.paid }}</td>
                    <td>{{ m7.d4.total }}</td>
                  </tr>
                  <tr v-if="m7.d5">
                    <td>{{ m7.d5.name }}</td>
                    <td>{{ m7.d5.number }}</td>
                    <td>{{ m7.d5.creator }}</td>
                    <td>{{ m7.d5.from }}</td>
                    <td>{{ m7.d5.add }}</td>
                    <td>{{ m7.d5.paid }}</td>
                    <td>{{ m7.d5.total }}</td>
                  </tr>
                  <tr v-if="m7.d6">
                    <td>{{ m7.d6.name }}</td>
                    <td>{{ m7.d6.number }}</td>
                    <td>{{ m7.d6.creator }}</td>
                    <td>{{ m7.d6.from }}</td>
                    <td>{{ m7.d6.add }}</td>
                    <td>{{ m7.d6.paid }}</td>
                    <td>{{ m7.d6.total }}</td>
                  </tr> -->
                </tbody>
              </v-simple-table>
            </div>

            <div
              class="mx-5"
              v-if="i == 7 && m8.length != 0"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th>ชื่อยา</th>
                    <th>เลขที่รุ่น/ครั้งที่ผลิต</th>
                    <th>ผู้ผลิตและแหล่งผลิต</th>
                    <th>ได้มาจาก</th>
                    <th>รับ</th>
                    <th>จ่าย</th>
                    <th>คงเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in m8" :key="i">
                    <td>{{item.name}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.creator}}</td>
                    <td>{{item.from}}</td>
                    <td>{{item.add}}</td>
                    <td>{{item.paid}}</td>
                    <td>{{item.total}}</td>
                  </tr>
                  <!-- <tr v-if="m8.d1">
                    <td>{{ m8.d1.name }}</td>
                    <td>{{ m8.d1.number }}</td>
                    <td>{{ m8.d1.creator }}</td>
                    <td>{{ m8.d1.from }}</td>
                    <td>{{ m8.d1.add }}</td>
                    <td>{{ m8.d1.paid }}</td>
                    <td>{{ m8.d1.total }}</td>
                  </tr>
                  <tr v-if="m8.d2">
                    <td>{{ m8.d2.name }}</td>
                    <td>{{ m8.d2.number }}</td>
                    <td>{{ m8.d2.creator }}</td>
                    <td>{{ m8.d2.from }}</td>
                    <td>{{ m8.d2.add }}</td>
                    <td>{{ m8.d2.paid }}</td>
                    <td>{{ m8.d2.total }}</td>
                  </tr>
                  <tr v-if="m8.d3">
                    <td>{{ m8.d3.name }}</td>
                    <td>{{ m8.d3.number }}</td>
                    <td>{{ m8.d3.creator }}</td>
                    <td>{{ m8.d3.from }}</td>
                    <td>{{ m8.d3.add }}</td>
                    <td>{{ m8.d3.paid }}</td>
                    <td>{{ m8.d3.total }}</td>
                  </tr>
                  <tr v-if="m8.d4">
                    <td>{{ m8.d4.name }}</td>
                    <td>{{ m8.d4.number }}</td>
                    <td>{{ m8.d4.creator }}</td>
                    <td>{{ m8.d4.from }}</td>
                    <td>{{ m8.d4.add }}</td>
                    <td>{{ m8.d4.paid }}</td>
                    <td>{{ m8.d4.total }}</td>
                  </tr>
                  <tr v-if="m8.d5">
                    <td>{{ m8.d5.name }}</td>
                    <td>{{ m8.d5.number }}</td>
                    <td>{{ m8.d5.creator }}</td>
                    <td>{{ m8.d5.from }}</td>
                    <td>{{ m8.d5.add }}</td>
                    <td>{{ m8.d5.paid }}</td>
                    <td>{{ m8.d5.total }}</td>
                  </tr>
                  <tr v-if="m8.d6">
                    <td>{{ m8.d6.name }}</td>
                    <td>{{ m8.d6.number }}</td>
                    <td>{{ m8.d6.creator }}</td>
                    <td>{{ m8.d6.from }}</td>
                    <td>{{ m8.d6.add }}</td>
                    <td>{{ m8.d6.paid }}</td>
                    <td>{{ m8.d6.total }}</td>
                  </tr> -->
                </tbody>
              </v-simple-table>
            </div>

            <div
              class="mx-5"
              v-if="i == 8 && m9.length != 0"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th>ชื่อยา</th>
                    <th>เลขที่รุ่น/ครั้งที่ผลิต</th>
                    <th>ผู้ผลิตและแหล่งผลิต</th>
                    <th>ได้มาจาก</th>
                    <th>รับ</th>
                    <th>จ่าย</th>
                    <th>คงเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in m9" :key="i">
                    <td>{{item.name}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.creator}}</td>
                    <td>{{item.from}}</td>
                    <td>{{item.add}}</td>
                    <td>{{item.paid}}</td>
                    <td>{{item.total}}</td>
                  </tr>
                  <!-- <tr v-if="m9.d1">
                    <td>{{ m9.d1.name }}</td>
                    <td>{{ m9.d1.number }}</td>
                    <td>{{ m9.d1.creator }}</td>
                    <td>{{ m9.d1.from }}</td>
                    <td>{{ m9.d1.add }}</td>
                    <td>{{ m9.d1.paid }}</td>
                    <td>{{ m9.d1.total }}</td>
                  </tr>
                  <tr v-if="m9.d2">
                    <td>{{ m9.d2.name }}</td>
                    <td>{{ m9.d2.number }}</td>
                    <td>{{ m9.d2.creator }}</td>
                    <td>{{ m9.d2.from }}</td>
                    <td>{{ m9.d2.add }}</td>
                    <td>{{ m9.d2.paid }}</td>
                    <td>{{ m9.d2.total }}</td>
                  </tr>
                  <tr v-if="m9.d3">
                    <td>{{ m9.d3.name }}</td>
                    <td>{{ m9.d3.number }}</td>
                    <td>{{ m9.d3.creator }}</td>
                    <td>{{ m9.d3.from }}</td>
                    <td>{{ m9.d3.add }}</td>
                    <td>{{ m9.d3.paid }}</td>
                    <td>{{ m9.d3.total }}</td>
                  </tr>
                  <tr v-if="m9.d4">
                    <td>{{ m9.d4.name }}</td>
                    <td>{{ m9.d4.number }}</td>
                    <td>{{ m9.d4.creator }}</td>
                    <td>{{ m9.d4.from }}</td>
                    <td>{{ m9.d4.add }}</td>
                    <td>{{ m9.d4.paid }}</td>
                    <td>{{ m9.d4.total }}</td>
                  </tr>
                  <tr v-if="m9.d5">
                    <td>{{ m9.d5.name }}</td>
                    <td>{{ m9.d5.number }}</td>
                    <td>{{ m9.d5.creator }}</td>
                    <td>{{ m9.d5.from }}</td>
                    <td>{{ m9.d5.add }}</td>
                    <td>{{ m9.d5.paid }}</td>
                    <td>{{ m9.d5.total }}</td>
                  </tr>
                  <tr v-if="m9.d6">
                    <td>{{ m9.d6.name }}</td>
                    <td>{{ m9.d6.number }}</td>
                    <td>{{ m9.d6.creator }}</td>
                    <td>{{ m9.d6.from }}</td>
                    <td>{{ m9.d6.add }}</td>
                    <td>{{ m9.d6.paid }}</td>
                    <td>{{ m9.d6.total }}</td>
                  </tr> -->
                </tbody>
              </v-simple-table>
            </div>

            <div
              class="mx-5"
              v-if="i == 9 && m10.length != 0"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th>ชื่อยา</th>
                    <th>เลขที่รุ่น/ครั้งที่ผลิต</th>
                    <th>ผู้ผลิตและแหล่งผลิต</th>
                    <th>ได้มาจาก</th>
                    <th>รับ</th>
                    <th>จ่าย</th>
                    <th>คงเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in m10" :key="i">
                    <td>{{item.name}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.creator}}</td>
                    <td>{{item.from}}</td>
                    <td>{{item.add}}</td>
                    <td>{{item.paid}}</td>
                    <td>{{item.total}}</td>
                  </tr>
                  <!-- <tr v-if="m10.d1">
                    <td>{{ m10.d1.name }}</td>
                    <td>{{ m10.d1.number }}</td>
                    <td>{{ m10.d1.creator }}</td>
                    <td>{{ m10.d1.from }}</td>
                    <td>{{ m10.d1.add }}</td>
                    <td>{{ m10.d1.paid }}</td>
                    <td>{{ m10.d1.total }}</td>
                  </tr>
                  <tr v-if="m10.d2">
                    <td>{{ m10.d2.name }}</td>
                    <td>{{ m10.d2.number }}</td>
                    <td>{{ m10.d2.creator }}</td>
                    <td>{{ m10.d2.from }}</td>
                    <td>{{ m10.d2.add }}</td>
                    <td>{{ m10.d2.paid }}</td>
                    <td>{{ m10.d2.total }}</td>
                  </tr>
                  <tr v-if="m10.d3">
                    <td>{{ m10.d3.name }}</td>
                    <td>{{ m10.d3.number }}</td>
                    <td>{{ m10.d3.creator }}</td>
                    <td>{{ m10.d3.from }}</td>
                    <td>{{ m10.d3.add }}</td>
                    <td>{{ m10.d3.paid }}</td>
                    <td>{{ m10.d3.total }}</td>
                  </tr>
                  <tr v-if="m10.d4">
                    <td>{{ m10.d4.name }}</td>
                    <td>{{ m10.d4.number }}</td>
                    <td>{{ m10.d4.creator }}</td>
                    <td>{{ m10.d4.from }}</td>
                    <td>{{ m10.d4.add }}</td>
                    <td>{{ m10.d4.paid }}</td>
                    <td>{{ m10.d4.total }}</td>
                  </tr>
                  <tr v-if="m10.d5">
                    <td>{{ m10.d5.name }}</td>
                    <td>{{ m10.d5.number }}</td>
                    <td>{{ m10.d5.creator }}</td>
                    <td>{{ m10.d5.from }}</td>
                    <td>{{ m10.d5.add }}</td>
                    <td>{{ m10.d5.paid }}</td>
                    <td>{{ m10.d5.total }}</td>
                  </tr>
                  <tr v-if="m10.d6">
                    <td>{{ m10.d6.name }}</td>
                    <td>{{ m10.d6.number }}</td>
                    <td>{{ m10.d6.creator }}</td>
                    <td>{{ m10.d6.from }}</td>
                    <td>{{ m10.d6.add }}</td>
                    <td>{{ m10.d6.paid }}</td>
                    <td>{{ m10.d6.total }}</td>
                  </tr> -->
                </tbody>
              </v-simple-table>
            </div>

            <div
              class="mx-5"
              v-if="i == 10 && m11.length != 0"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th>ชื่อยา</th>
                    <th>เลขที่รุ่น/ครั้งที่ผลิต</th>
                    <th>ผู้ผลิตและแหล่งผลิต</th>
                    <th>ได้มาจาก</th>
                    <th>รับ</th>
                    <th>จ่าย</th>
                    <th>คงเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in m11" :key="i">
                    <td>{{item.name}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.creator}}</td>
                    <td>{{item.from}}</td>
                    <td>{{item.add}}</td>
                    <td>{{item.paid}}</td>
                    <td>{{item.total}}</td>
                  </tr>
                  <!-- <tr v-if="m11.d1">
                    <td>{{ m11.d1.name }}</td>
                    <td>{{ m11.d1.number }}</td>
                    <td>{{ m11.d1.creator }}</td>
                    <td>{{ m11.d1.from }}</td>
                    <td>{{ m11.d1.add }}</td>
                    <td>{{ m11.d1.paid }}</td>
                    <td>{{ m11.d1.total }}</td>
                  </tr>
                  <tr v-if="m11.d2">
                    <td>{{ m11.d2.name }}</td>
                    <td>{{ m11.d2.number }}</td>
                    <td>{{ m11.d2.creator }}</td>
                    <td>{{ m11.d2.from }}</td>
                    <td>{{ m11.d2.add }}</td>
                    <td>{{ m11.d2.paid }}</td>
                    <td>{{ m11.d2.total }}</td>
                  </tr>
                  <tr v-if="m11.d3">
                    <td>{{ m11.d3.name }}</td>
                    <td>{{ m11.d3.number }}</td>
                    <td>{{ m11.d3.creator }}</td>
                    <td>{{ m11.d3.from }}</td>
                    <td>{{ m11.d3.add }}</td>
                    <td>{{ m11.d3.paid }}</td>
                    <td>{{ m11.d3.total }}</td>
                  </tr>
                  <tr v-if="m11.d4">
                    <td>{{ m11.d4.name }}</td>
                    <td>{{ m11.d4.number }}</td>
                    <td>{{ m11.d4.creator }}</td>
                    <td>{{ m11.d4.from }}</td>
                    <td>{{ m11.d4.add }}</td>
                    <td>{{ m11.d4.paid }}</td>
                    <td>{{ m11.d4.total }}</td>
                  </tr>
                  <tr v-if="m11.d5">
                    <td>{{ m11.d5.name }}</td>
                    <td>{{ m11.d5.number }}</td>
                    <td>{{ m11.d5.creator }}</td>
                    <td>{{ m11.d5.from }}</td>
                    <td>{{ m11.d5.add }}</td>
                    <td>{{ m11.d5.paid }}</td>
                    <td>{{ m11.d5.total }}</td>
                  </tr>
                  <tr v-if="m11.d6">
                    <td>{{ m11.d6.name }}</td>
                    <td>{{ m11.d6.number }}</td>
                    <td>{{ m11.d6.creator }}</td>
                    <td>{{ m11.d6.from }}</td>
                    <td>{{ m11.d6.add }}</td>
                    <td>{{ m11.d6.paid }}</td>
                    <td>{{ m11.d6.total }}</td>
                  </tr> -->
                </tbody>
              </v-simple-table>
            </div>

            <div
              class="mx-5"
              v-if="i == 11 && m12.length != 0"
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th>ชื่อยา</th>
                    <th>เลขที่รุ่น/ครั้งที่ผลิต</th>
                    <th>ผู้ผลิตและแหล่งผลิต</th>
                    <th>ได้มาจาก</th>
                    <th>รับ</th>
                    <th>จ่าย</th>
                    <th>คงเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in m12" :key="i">
                    <td>{{item.name}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.creator}}</td>
                    <td>{{item.from}}</td>
                    <td>{{item.add}}</td>
                    <td>{{item.paid}}</td>
                    <td>{{item.total}}</td>
                  </tr>
                  <!-- <tr v-if="m12.d1">
                    <td>{{ m12.d1.name }}</td>
                    <td>{{ m12.d1.number }}</td>
                    <td>{{ m12.d1.creator }}</td>
                    <td>{{ m12.d1.from }}</td>
                    <td>{{ m12.d1.add }}</td>
                    <td>{{ m12.d1.paid }}</td>
                    <td>{{ m12.d1.total }}</td>
                  </tr>
                  <tr v-if="m12.d2">
                    <td>{{ m12.d2.name }}</td>
                    <td>{{ m12.d2.number }}</td>
                    <td>{{ m12.d2.creator }}</td>
                    <td>{{ m12.d2.from }}</td>
                    <td>{{ m12.d2.add }}</td>
                    <td>{{ m12.d2.paid }}</td>
                    <td>{{ m12.d2.total }}</td>
                  </tr>
                  <tr v-if="m12.d3">
                    <td>{{ m12.d3.name }}</td>
                    <td>{{ m12.d3.number }}</td>
                    <td>{{ m12.d3.creator }}</td>
                    <td>{{ m12.d3.from }}</td>
                    <td>{{ m12.d3.add }}</td>
                    <td>{{ m12.d3.paid }}</td>
                    <td>{{ m12.d3.total }}</td>
                  </tr>
                  <tr v-if="m12.d4">
                    <td>{{ m12.d4.name }}</td>
                    <td>{{ m12.d4.number }}</td>
                    <td>{{ m12.d4.creator }}</td>
                    <td>{{ m12.d4.from }}</td>
                    <td>{{ m12.d4.add }}</td>
                    <td>{{ m12.d4.paid }}</td>
                    <td>{{ m12.d4.total }}</td>
                  </tr>
                  <tr v-if="m12.d5">
                    <td>{{ m12.d5.name }}</td>
                    <td>{{ m12.d5.number }}</td>
                    <td>{{ m12.d5.creator }}</td>
                    <td>{{ m12.d5.from }}</td>
                    <td>{{ m12.d5.add }}</td>
                    <td>{{ m12.d5.paid }}</td>
                    <td>{{ m12.d5.total }}</td>
                  </tr>
                  <tr v-if="m12.d6">
                    <td>{{ m12.d6.name }}</td>
                    <td>{{ m12.d6.number }}</td>
                    <td>{{ m12.d6.creator }}</td>
                    <td>{{ m12.d6.from }}</td>
                    <td>{{ m12.d6.add }}</td>
                    <td>{{ m12.d6.paid }}</td>
                    <td>{{ m12.d6.total }}</td>
                  </tr> -->
                </tbody>
              </v-simple-table>
            </div>
          </div>
          <!-- {{list_active[10]}} -->
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import * as ActivitiesAPI from "../../utils/activitiesAPI";
import moment from "../../utils/moment";
export default {
  layout: "dashboard",
  middleware: "auth",
  data() {
    return {
      list_active: [],
      list_name: [
        "Diazepam 2 mg",
        "Diazepam 5 mg",
        "Diazepam injection",
        "Lorazepam 0.5 mg",
        "Phenobarb elixir",
        "Phenobarb 60 mg"
      ],
      month: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ],
      month_name: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
      ],
      years: [],
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      loading: false,
      m1: {
        d1: {},
        d2: {},
        d3: {},
        d4: {},
        d5: {},
        d6: {}
      },
      m2: {
        d1: {},
        d2: {},
        d3: {},
        d4: {},
        d5: {},
        d6: {}
      },
      m3: {
        d1: {},
        d2: {},
        d3: {},
        d4: {},
        d5: {},
        d6: {}
      },
      m4: {
        d1: {},
        d2: {},
        d3: {},
        d4: {},
        d5: {},
        d6: {}
      },
      m5: {
        d1: {},
        d2: {},
        d3: {},
        d4: {},
        d5: {},
        d6: {}
      },
      m6: {
        d1: {},
        d2: {},
        d3: {},
        d4: {},
        d5: {},
        d6: {}
      },
      m7: {
        d1: {},
        d2: {},
        d3: {},
        d4: {},
        d5: {}
      },
      m8: {
        d1: {},
        d2: {},
        d3: {},
        d4: {},
        d5: {},
        d6: {}
      },
      m9: {
        d1: {},
        d2: {},
        d3: {},
        d4: {},
        d5: {}
      },
      m10: {
        d1: {},
        d2: {},
        d3: {},
        d4: {},
        d5: {},
        d6: {}
      },
      m11: {
        d1: {},
        d2: {},
        d3: {},
        d4: {},
        d5: {}
      },
      m12: {
        d1: {},
        d2: {},
        d3: {},
        d4: {},
        d5: {},
        d6: {}
      }
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      // await this.month.forEach((e, i) => {
      //   this.list_active[i].d1 = {}
      //   this.list_active[i].d2 = {}
      //   this.list_active[i].d3 = {}
      //   this.list_active[i].d4 = {}
      //   this.list_active[i].d5 = {}
      // })
      let list = [];
      let data_use = [];
      // const response = await ActivitiesAPI.getAllActivities();
      // list = await response.data.data;

      await this.$api.getActivities()
        .then(response => {
          list = response.data.data
        })

      await list.forEach(async e => {
        if (e.from == "medical-supply" ||  e.from == "drug-list") {

          let data_y = moment.getYearUTC(e.data.date_add);
          let data_m = moment.getMonth(e.data.date_add);

          // console.log(data_y)
          // console.log(this.currentYear)

          if (e.data.type4 == true && this.currentYear == data_y) {
            let id;
          // console.log(e.data.medical_name)

          //   if (e.data.medical_name == "Diazepam 2 mg") {
          //     id = "d1";
          //   }
          //   if (e.data.medical_name == "Diazepam 5 mg") {
          //     id = "d2";
          //   }
          //   if (e.data.medical_name == "Diazepam injection") {
          //     id = "d3";
          //   }
          //   if (e.data.medical_name == "Lorazepam 0.5 mg") {
          //     id = "d4";
          //   }
          //   if (e.data.medical_name == "Phenobarb elixir") {
          //     id = "d5";
          //   }
          //   if (e.data.medical_name == "Phenobarb 60 mg") {
          //     id = "d6";
          //   }
            data_use.push({
              id: e.data.medical_name,
              name: e.data.medical_name,
              total: e.data.total,
              add: e.from == "medical-supply" ? e.data.amount : 0,
              paid: e.from == "drug-list" ? e.data.amount : 0,
              m: data_m,
              y: data_y,
              number: e.data.number,
              creator: e.data.creator,
              from: e.data.from
            });
          }
          // console.log(new Date(e.m).getMonth())
        } 
        // else if (e.from == "drug-list") {
        //   let data_y = moment.getYearUTC(e.time);
        //   let data_m = moment.getMonth(e.time);
        //   if (
        //     e.data.type4 == true &&
        //     e.data.status == true &&
        //     this.currentYear == data_y
        //   ) {
        //     let id;
        //     if (e.data.medical_name == "Diazepam 2 mg") {
        //       id = "d1";
        //     }
        //     if (e.data.medical_name == "Diazepam 5 mg") {
        //       id = "d2";
        //     }
        //     if (e.data.medical_name == "Diazepam injection") {
        //       id = "d3";
        //     }
        //     if (e.data.medical_name == "Lorazepam 0.5 mg") {
        //       id = "d4";
        //     }
        //     if (e.data.medical_name == "Phenobarb elixir") {
        //       id = "d5";
        //     }
        //     if (e.data.medical_name == "Phenobarb 60 mg") {
        //       id = "d6";
        //     }
        //     data_use.push({
        //       id,
        //       name: e.data.medical_name,
        //       total: e.data.total,
        //       add: 0,
        //       paid: e.data.amount,
        //       m: data_m,
        //       y: data_y,
        //       number: e.data.number,
        //       creator: e.data.creator,
        //       from: e.data.from
        //     });
        //   }
        // }

      });

      let year = [];

      for (let i = 0; i < 5; i++) {
        let y = new Date("2020").getFullYear() + i;
        year.push({
          name: y + 543,
          value: y
        });
      }

      let list_id = []

      await data_use.forEach(e => {
        if (!list_id.includes(e.id)) {
          list_id.push(e.id)
        }
      })

      let list_data = []
      list_id.forEach(e => {
        list_data.push({
          id: e,
          add: 0,
          paid: 0
        })
      })

      await data_use.forEach(e => {
        list_data.forEach(list => {
          if (e.id == list.id) {
            list.add += e.add
            list.paid += e.paid
            list.total = e.total
            list.name = e.name
            list.m = e.m
            list.y = e.y
            list.number = e.number
            list.creator = e.creator
            list.from = e.from
          }
        })
      })

      // console.log(list_data)

      this.years = year;

      this.group(list_data);

    },
    async group(data_list) {
      let list = await this.month.map(m => data_list.filter(e => e.m === m));
      // console.log(list)

      await list.forEach(async (e, i) => {
        let sumsArray = {};
        // console.log(i)
        e.forEach(item => {
          // console.log(e)
          let sums = sumsArray[item.id];
          if (sums) {
            sums.add += item.add;
            sums.paid += item.paid;
            sums.total = item.total;
          } else {
            sumsArray[item.id] = {
              id: item.id,
              name: item.name,
              add: item.add,
              paid: item.paid,
              total: item.total,
              number: item.number,
              creator: item.creator,
              from: item.from
            };
          }
        });
        this.list_active[i] = sumsArray;
        // console.log(`test: ${i}`)
        // console.log(sumsArray)
      });
      this.list_active = list;

      // console.log(this.list_active[4]);
      this.m1 = await this.list_active[0];
      this.m2 = await this.list_active[1];
      this.m3 = await this.list_active[2];
      this.m4 = await this.list_active[3];
      this.m5 = await this.list_active[4];
      this.m6 = await this.list_active[5];
      this.m7 = await this.list_active[6];
      this.m8 = await this.list_active[7];
      this.m9 = await this.list_active[8];
      this.m10 = await this.list_active[9];
      this.m11 = await this.list_active[10];
      this.m12 = await this.list_active[11];
      // console.log(this.m5)
      this.loading = await true;
    }
  }
};
</script>
