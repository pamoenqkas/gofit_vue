<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Deposit Umum Member</h1>
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
            <div v-if="show">
              <div class="card-body">
                <div class="alert alert-success d-flex align-items-center" role="alert" >
                  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                  <div>
                    <p v-show="show">
                      Deposit Umum Berhasil Dihapus
                    </p>
                  </div>
                </div>
                </div>
            </div>
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID Deposit Umum</th>
                    <th scope="col">Nama Pegawai</th>
                    <th scope="col">Nama Member</th>
                    <th scope="col">Jenis Promo Umum</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Deposit</th>
                    <th scope="col">Total Deposit</th>
                    <th scope="col">Bonus Deposit</th>
                    <th scope="col">Sisa Deposit</th>
                    <th scope="col">AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(deposit_umum, id_deposit_umum) in deposit_umum" :key="id_deposit_umum">
                    <td>{{ deposit_umum.id_deposit_umum }}</td>
                    <td>{{ deposit_umum.pegawai.nama_pegawai }}</td>
                    <td>{{ deposit_umum.member.nama_member}}</td>
                    <td>{{ deposit_umum.id_promo_umum }}</td>
                    <td>{{ deposit_umum.tanggal }}</td>
                    <td>{{ deposit_umum.deposit }}</td>
                    <td>{{ deposit_umum.total_deposit }}</td>
                    <td>{{ deposit_umum.bonus_deposit }}</td>
                    <td>{{ deposit_umum.sisa_deposit }}</td>
                    <td class="text-center">
                    <div class="pdf">
                      <button class="btn btn-md-3 btn-success" @click="downloadPDF(deposit_umum.id_deposit_umum, deposit_umum.id_member, deposit_umum.tanggal, deposit_umum.deposit, deposit_umum.bonus_deposit, deposit_umum.sisa_deposit, deposit_umum.total_deposit, deposit_umum.pegawai.id_pegawai, deposit_umum.member.nama_member, deposit_umum.pegawai.nama_pegawai)">Cetak Struk</button>
                    </div>
                      <!-- <router-link :to="{ name:
                      'deposit_umum.edit', params: { id_deposit_umum: deposit_umum.id_deposit_umum } }" class="btn
                      btn-sm btn-primary mr-1">
                      <i class="bi bi-pencil"></i>    
                      </router-link> -->
                      <!-- <button class="btn btn-sm btn-danger ml-2 " @click.prevent="dekleteAktivasiTahuhan(aktivasi_tahunan.id_aktivasi_tahunan)">
                          <i class="bi bi-trash"></i>
                      </button> -->
                  </td>
                  </tr>
                </tbody>
              </table>
              <p align="right">
                  <router-link :to="{name: 'deposit_umum.create'}" class="btn btn-md-3 btn-success">Tambah
                      <i class="bi bi-file-plus"></i>
                  </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </template>
  
  <script>
  import axios from "axios";
  import { onMounted, ref } from "vue";
  import { useRouter } from 'vue-router'
  import jsPDF from'jspdf';

  export default {
    setup() {
      //reactive state
      let deposit_umum = ref([]);
      const router = useRouter()
  
      //Untuk alert delete
      let show = ref(false);
    //   const reloadTime = 30000;
  
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get('https://pam.ppcdeveloper.com/api/deposit_umum')
          .then((response) => {
            //assign state posts with response data
            deposit_umum.value = response.data.data;          
          })
          .catch((error) => {
            console.log(error.response.data);
          })
      })
    
  
    //   function dekleteAktivasiTahuhan($id_deposit_umum){
    //       axios.delete('http://localhost:8000/api/deposit_umum/' + $id_deposit_umum).then(()=>{
    //           //assign state posts with response data
    //           show.value = true;
    //           window.location.reload()
    //       }, reloadTime).catch(error => {
    //           console.log(error.response.data)
    //       })
    //   }

    function downloadPDF($id_deposit_umum, $id_member, $tanggal, $deposit, $bonus_deposit, $sisa_deposit, $total_deposit, $id_pegawai, $nama_member, $nama_pegawai){
      const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'cm',
          format: [10, 20]
      });

      pdf.text('Go Fit', 0.5, 1);
      pdf.text("No Struk : "+ $id_deposit_umum, 11, 1);
      pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 2);
      pdf.text("Tanggal : "+ $tanggal, 11, 2);
      pdf.text('', 0.5, 3);

      pdf.text("Member          : "+ $id_member +" / " + $nama_member, 0.5, 4);
      pdf.text("Deposit         : Rp " + $deposit + ",00", 0.5, 5);
      pdf.text("Bonus Deposit   : Rp " + $bonus_deposit + ",00", 0.5, 6);
      pdf.text("Sisa Deposit    : Rp " + $sisa_deposit + ",00" , 0.5, 7);
      pdf.text("Total Deposit   : Rp " + $total_deposit + ",00", 0.5, 8);
      pdf.text("Kasir           : Rp " + $id_pegawai + " /" + $nama_pegawai, 11, 7);
      pdf.save("Struk Aktivasi-" + $id_member + ".pdf");
    }
  
      //return
      return {
        deposit_umum,
        // dekleteAktivasiTahuhan,
        router,
        show,
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
  
  