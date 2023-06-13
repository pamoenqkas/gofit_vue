<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Jadwal Harian</h1>
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
            <p align="right">
                  <button class="btn btn-sm btn-success ml-2 " @click.prevent="store()">Generate</button>
              </p>  
            <div v-if="checkGenerated.status" class="mt-1 alert alert-danger">Jadwal sudah di generate</div>
            <div v-else>

            </div>
              <!-- <div v-else></div> -->
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Nama Instruktur</th>
                    <th scope="col">Nama Kelas</th>
                    <!-- <th scope="col">Nama Instruktur Pengganti</th> -->
                    <th scope="col">Hari</th>
                    <th scope="col">Jam Mulai</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(jadwal_harian, id_jadwal_harian) in jadwal_harian" :key="id_jadwal_harian">
                    <td>{{ jadwal_harian.instruktur.nama_instruktur }}</td>
                    <td>{{ jadwal_harian.kelas.nama_kelas }}</td>
                    <!-- <td>{{ jadwal_harian.izin.id_instruktur_pengganti }}</td -->
                    <td>{{ jadwal_harian.hari }}</td>
                    <td>{{ jadwal_harian.jam_mulai }}</td>
                    <td>{{ jadwal_harian.tanggal }}</td>
                    <td>{{ jadwal_harian.keterangan }}</td>
                    <!-- <td class="text-center">
                      <router-link :to="{ name:
                      'jadwal_harian.edit', params: { id_jadwal_harian: jadwal_harian.id_jadwal_harian } }" class="btn
                      btn-sm btn-primary mr-1">
                      <i class="bi bi-pencil"></i>    
                      </router-link>
                    </td> -->
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
      </div>
    <!-- </div> -->
  </template>
  
  <script>
  import axios from "axios";
  import { onMounted, ref, reactive } from "vue";
  import { useRouter } from 'vue-router'
  
  export default {
    setup() {
      //reactive state
      let jadwal_harian = ref([]);
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
          .get('https://pam.ppcdeveloper.com/api/jadwal_harian')
          .then((response) => {
            //assign state posts with response data
            jadwal_harian.value = response.data.data;          
          })
          .catch((error) => {
            console.log(error.response.data);
          })
      })

      function store(){
        if(jadwal_harian.value.length <= 0){
          axios.post('https://pam.ppcdeveloper.com/api/jadwal_harian/', {
        }).then(() => {
            //redirect ke post index
            router.push({
                name: 'jadwal_harian.index'
            })
              // show.value = true;
            window.location.reload()
        }, reloadTime).catch(error => {
            //assign state validation with error
            validation.value = error.response.data
        })
        }else{
          checkGenerated.status = true
          setTimeout(function(){
            window.location.reload();
          }, 2000)
        }
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
        jadwal_harian,
        router,
        // show,
        store,
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
  
  