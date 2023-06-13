<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Aktivasi Tahunan Member</h1>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <!-- <tr v-for="(instruktur, id_instruktur) in instruktur" :key="id_instruktur">
                <div class="container">
                  <div class="row height d-flex justify-content-center align-items-center">
                    <div class="col-md-8">
                      <div class="search">
                        <i class="fa fa-search"></i>
                        <input type="text" class="form-control" placeholder="Have a question? Ask Now">
                        <button class="btn btn-primary">Search</button>
                      </div>
                    </div>
                  </div>
                </div>
              </tr> -->
              <h1>Table Member</h1>
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                  <tr>
                      <th scope="col">NAMA</th>
                      <th scope="col">NOMOR TELEPHONE </th>
                      <th scope="col">ALAMAT </th>
                      <th scope="col">EMAIL </th>
                      <th scope="col">TANGGAL LAHIR </th>
                      <th scope="col">DEPOSIT</th>
                      <th scope="col">MASA MEMBERSHIP</th>
                      <th scope="col">TANGGAL DAFTAR MEMBERSHIP</th>
                      <th scope="col">STATUS </th>
                      <th scope="col">AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(member, id_member) in member" :key="id_member">
                  <td>{{ member.nama_member }}</td>
                  <td>{{ member.no_telp_member }}</td>
                  <td>{{ member.alamat_member }}</td>
                  <td>{{ member.email_member }}</td>
                  <td>{{ member.tanggal_lahir }}</td>
                  <td>{{ member.deposit }}</td>
                  <td>{{ member.masa_membership }}</td>
                  <td>{{ member.tanggal_daftar }}</td>
                  <td>{{ member.status }}</td>
                  <td class="text-center">
                  <!-- <router-link :to="{ name:
                  'member.edit', params: { id_member: member.id_member } }" class="btn
                  btn-sm btn-primary mr-1">
                  <i class="bi bi-pencil"></i>    
                  </router-link> -->
                    <router-link :to="{name: 'aktivasi_tahunan.create',  params: { id_member: member.id_member }}" 
                      class="btn btn-md-3 btn-success">Aktivasi
                        <!-- <i class="bi bi-file-plus"></i> -->
                    </router-link>
                  </td>
                </tr>
                </tbody>
              </table>
              <div v-if="show">
                <h1>Table Aktivasi</h1>
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                  <tr>
                      <th scope="col">ID AKTIVASI</th>
                      <th scope="col">Nama Pegawai </th>
                      <th scope="col">Nama Member </th>
                      <th scope="col">TANGGAL </th>
                      <th scope="col">MASA AKTIF</th>
                      <th scope="col">AKTIVASI TAHUNAN </th>
                      <th scope="col">AKSI</th>
                  </tr>
                </thead>
                  <tbody>
                    <tr v-for="(aktivasi_tahunan, id_aktivasi_tahunan) in aktivasi_tahunan" :key="id_aktivasi_tahunan">
                    <td>{{ aktivasi_tahunan.id_aktivasi_tahunan }}</td>
                    <td>{{ aktivasi_tahunan.pegawai.nama_pegawai }}</td>
                    <td>{{ aktivasi_tahunan.member.nama_member}}</td>
                    <td>{{ aktivasi_tahunan.tanggal }}</td>
                    <td>{{ aktivasi_tahunan.masa_aktif }}</td>
                    <td>{{ aktivasi_tahunan.aktivasi_tahunan }}</td>
                    <td class="text-center">
                    <div class="pdf">
                      <button class="btn btn-md-3 btn-success" @click="downloadPDF(aktivasi_tahunan.id_aktivasi_tahunan, aktivasi_tahunan.member.id_member, 
                                                                                   aktivasi_tahunan.tanggal, aktivasi_tahunan.masa_aktif, 
                                                                                   aktivasi_tahunan.pegawai.id_pegawai, aktivasi_tahunan.member.nama_member, 
                                                                                   aktivasi_tahunan.pegawai.nama_pegawai)">Cetak Struk</button>
                    </div>
                      <!-- <router-link :to="{ name:
                      'aktivasi_tahunan.edit', params: { id_aktivasi_tahunan: aktivasi_tahunan.id_aktivasi_tahunan } }" class="btn
                      btn-sm btn-primary mr-1">
                      <i class="bi bi-pencil"></i>    
                      </router-link> -->
                      <!-- <p align="right">
                          <router-link :to="{name: 'aktivasi_tahunan.create',  params: { id_member: aktivasi_tahunan.id_member }}" 
                            class="btn btn-md-3 btn-success">Tambah
                              <i class="bi bi-file-plus"></i>
                          </router-link>
                      </p> -->
                    </td>
                  </tr>
                    </tbody>
                </table>
            </div>
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </template>
  
  <script>
  import jsPDF from'jspdf';
  import axios from "axios";
  import { onMounted, ref } from "vue";
  import { useRouter } from 'vue-router'
  
  export default {
    setup() {
      //reactive state
      let aktivasi_tahunan = ref([]);
      let member = ref([])
      const router = useRouter()
  
      //Untuk alert delete
      let show = ref(false);
      // const reloadTime = 30000;
  
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get('https://pam.ppcdeveloper.com/api/aktivasi_tahunan')
          .then((response) => {
            //assign state posts with response data
            show.value = true;
            aktivasi_tahunan.value = response.data.data;          
          })
          .catch((error) => {
            console.log(error.response.data);
          })
        axios
          .get('https://pam.ppcdeveloper.com/api/member')
          .then((response) => {
            //assign state posts with response data
            member.value = response.data.data;          
          })
          .catch((error) => {
            console.log(error.response.data);
          })
      })
    
  
      // function dekleteAktivasiTahuhan($id_aktivasi_tahunan){
      //     axios.delete('http://localhost:8000/api/aktivasi_tahunan/' + $id_aktivasi_tahunan).then(()=>{
      //         //assign state posts with response data
      //         show.value = true;
      //         window.location.reload()
      //     }, reloadTime).catch(error => {
      //         console.log(error.response.data)
      //     })
      // }

      // function downloadPDF(){
      //   var pdf = new jsPDF();
      //   pdf.text('Halo dunia', 10, 1);
      //   pdf.save('info.pdf');
      // }
  
      function downloadPDF($id_aktivasi_tahunan, $id_member, $tanggal, $masa_aktif, $id_pegawai, $nama_member, $nama_pegawai){
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'cm',
                format: [8, 17]
            });

            pdf.text('Go Fit', 0.5, 1);
            pdf.text("No Struk : "+ $id_aktivasi_tahunan, 11, 1);
            pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 2);
            pdf.text("Tanggal : "+ $tanggal, 11, 2);
            pdf.text('', 0.5, 3);
            pdf.text("Member                    : "+ $id_member +" / " + $nama_member, 0.5, 4);
            pdf.text("Aktivasi Tahunan      : Rp.3.000.000 ", 0.5, 5);
            pdf.text("Masa aktif member   : " + $masa_aktif, 0.5, 6);
            pdf.text("Kasir : " + $id_pegawai + " /" + $nama_pegawai, 11, 7);
            pdf.save("Struk Aktivasi-" + $id_member + ".pdf");
          }
      //return
      return {
        aktivasi_tahunan,
        router,
        show,
        member,
        downloadPDF,
      }
    },
  
  }
  </script>
  <style>
  
  body{
   background-color:#eee;
   font-family: "Poppins", sans-serif;
   font-weight: 300;
  }
  
  .height{
   height: 100vh;
  }
  
  
  .search{
  position: relative;
  box-shadow: 0 0 40px rgba(51, 51, 51, .1);
    
  }
  
  .search input{
  
   height: 60px;
   text-indent: 25px;
   border: 2px solid #d6d4d4;
  
  
  }
  
  
  .search input:focus{
  
   box-shadow: none;
   border: 2px solid blue;
  
  
  }
  
  .search .fa-search{
  
   position: absolute;
   top: 20px;
   left: 16px;
  
  }
  
  .search button{
  
   position: absolute;
   top: 5px;
   right: 5px;
   height: 50px;
   width: 110px;
   background: blue;
  
  }
  </style>
  
  