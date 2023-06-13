<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Presensi Gym</h1>
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
            <!-- <div v-if="checkGenerate()">
              <div class="card-body">
                <div class="alert alert-success d-flex align-items-center" role="alert" >
                  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                  <div>
                    <p v-show="checkGenerated()">
                        Tidak dapat melakukan generate
                    </p>
                  </div>
                </div>
                </div>
            </div> -->
            <!-- <p align="right">
                  <button class="btn btn-sm btn-success ml-2 " @click.prevent="store()"></button>
              </p>  
            <div v-if="checkGenerated.status" class="mt-1 alert alert-danger">Jadwal sudah di generate</div>
            <div v-else> -->

            </div>
              <!-- <div v-else></div> -->
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID Member</th>
                    <th scope="col">Nama Member</th>
                    <th scope="col">ID Booking Gym</th>
                    <th scope="col">Tanggal Booking Gym</th>
                    <th scope="col">Tanggal Presensi Gym</th>
                    <th scope="col">Sesi Mulai</th>
                    <th scope="col">Sesi Selesai</th>
                    <th scope="col">Status</th>
                    <th scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(presensi_gym, id_presensi_gym) in presensi_gym" :key="id_presensi_gym">
                    <td>{{ presensi_gym.id_member }}</td>
                    <td>{{ presensi_gym.member.nama_member }}</td>
                    <td>{{ presensi_gym.id_booking_gym }}</td>
                    <td>{{ presensi_gym.booking_gym.tanggal_booking_gym }}</td>
                    <td>{{ presensi_gym.tanggal_presensi_gym }}</td>
                    <td>{{ presensi_gym.booking_gym.sesi_gym.jam_mulai }}</td>
                    <td>{{ presensi_gym.booking_gym.sesi_gym.jam_selesai }}</td>
                    <td>{{ presensi_gym.status }}</td>
                    <td class="text-center">
                    <div class="pdf">
                        <button v-show="presensi_gym.status == 'Belum Hadir'" class="btn btn-sm btn-danger ml-2 " @click.prevent="presensiMemberGym(presensi_gym.id_presensi_gym)">
                         Update
                        </button>
                        <button v-show="presensi_gym.status == 'Hadir'" class="btn btn-md-3 btn-success" @click="downloadPDF(presensi_gym.id_presensi_gym, presensi_gym.booking_gym.tanggal_booking_gym, 
                                                                                    presensi_gym.id_member, presensi_gym.member.nama_member, presensi_gym.booking_gym.sesi_gym.jam_mulai,
                                                                                    presensi_gym.booking_gym.sesi_gym.jam_selesai)"
                                                                                   >Cetak Presensi</button>
                    </div>
                  </td>
                  </tr>
                </tbody>
              </table>
              <!-- <p align="right">
                  <button class="btn btn-sm btn-success ml-2 " @click.prevent="checkGenerate()">Check Generate</button>
              </p> -->
              <!-- <div>
              <button @click.prevent="checkGenerate()">Check Data</button>
                <div v-if="dataFilled">Data is filled</div>
                <div v-else>Data is not filled</div>
              </div> -->
            </div>
          </div>
        </div>
    <!-- </div> -->
  </template>
  
  <script>
  import jsPDF from'jspdf';
  import axios from "axios";
  import { onMounted, ref, reactive } from "vue";
  import { useRouter } from 'vue-router'
  
  export default {
    created(){
        this.id_presensi_gym = this.$route.params.id_presensi_gym
    },
    setup() {
      //reactive state
      let presensi_gym = ref([]);
      const router = useRouter()
  
      //Untuk alert delete
      let dataFilled = ref(false);
      const validation = ref([])

      const reloadTime = 30000;
  
      let checkGenerated = reactive({
        status : false
      })
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get('https://pam.ppcdeveloper.com/api/presensi_gym')
          .then((response) => {
            //assign state posts with response data
            presensi_gym.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          })
      })

      function presensiMemberGym(id_presensi_gym){
          axios.put(`https://pam.ppcdeveloper.com/api/presensi_gym/presensiMemberGym/${id_presensi_gym}`, {
        }).then((response) => {
            presensi_gym.value = response.data.data;                   
            //redirect ke post index
            router.push({
                name: 'presensi_gym.index'
            })
              // show.value = true;
            window.location.reload()
        }, reloadTime).catch(error => {
            //assign state validation with error
            validation.value = error.response.data
        })
          // setTimeout(function(){
          //   window.location.reload();
          // }, 2000)
        }

        function downloadPDF($id_presensi_gym, $tanggal_booking_gym,  $id_member, $nama_member, $jam_mulai, $jam_selesai){
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'cm',
                format: [11, 11]
            });

            pdf.text('Go Fit', 0.5, 1);
            pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 2);
            pdf.text("STRUK PRESENSI GYM", 0.5, 4);
            pdf.text("No Struk : " + $id_presensi_gym, 0.5, 5);
            pdf.text("Tanggal : " + $tanggal_booking_gym, 0.5, 6);
            pdf.text("Member      : "+ $id_member +" / " + $nama_member, 0.5, 8)
            pdf.text("Jam Mulai   : " + $jam_mulai, 0.5, 9);
            pdf.text("Jam Selesai   : " + $jam_selesai, 0.5, 10);
            pdf.save("Struk Presensi Gym-" + $id_member + ".pdf");
          }

      // function checkGenerate(){
      //   axios
      //     .get('http://localhost:8000/api/jadwal_harian/')
      //     .then((response) => {
      //       //assign state posts with response data
      //       this.dataFilled = response.data.filled;
      //     })
      //     .catch((error) => {
      //       console.log(error.response.data);
      //     })
      // }

  
      //return
      return {
        presensi_gym,
        router,
        // show,
        downloadPDF,
        presensiMemberGym,
        checkGenerated,
        dataFilled,
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
  
  