<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Izin Instruktur</h1>
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
              <h1>Table Izin</h1>
              <table class="table table-striped table-bordered mt4">
                <thead class="thead-dark">
                  <tr>
                      <th scope="col">Nama Instruktur</th>
                      <th scope="col">Nama Pengganti </th>
                      <th scope="col">Tanggal Izin </th>
                      <th scope="col">Deskripsi Izin</th>
                      <th scope="col">Status</th>
                      <th scope="col">AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(izin, id_izin) in izin" :key="id_izin">
                  <td>{{ izin.instruktur.nama_instruktur }}</td>
                  <td>{{ izin.id_instruktur_pengganti }}</td>
                  <td>{{ izin.tanggal }}</td>
                  <td>{{ izin.deskripsi_izin }}</td>
                  <td>{{ izin.status }}</td>
                  <td class="text-center">
                  <router-link :to="{ name:
                    'izin.edit', params: { id_izin: izin.id_izin } }" class="btn
                    btn-sm btn-primary mr-1">
                    <i class="bi bi-pencil"></i>    
                  </router-link>
                  <!-- <button class="btn btn-md-3 btn-success" @click="update(izin.id_izin)">Update</button> -->

                    <!-- <router-link :to="{name: 'izin.create',  params: { id_izin: izin.id_izin }}" 
                      class="btn btn-md-3 btn-success">Konfirmasi Izin
                        <i class="bi bi-file-plus"></i>
                    </router-link> -->
                  </td>
                </tr>
                </tbody>
              </table>
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
  
  export default {
    setup() {
      //reactive state
      let izin = ref([]);
      const validation = ref([])
      const reloadTime = 30000;
    //   let member = ref([])
      const router = useRouter()
  
      //Untuk alert delete
    //   let show = ref(false);
      // const reloadTime = 30000;
  
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get('https://pam.ppcdeveloper.com/api/izin')
          .then((response) => {
            //assign state posts with response data
            // show.value = true;
            izin.value = response.data.data;          
          })
          .catch((error) => {
            console.log(error.response);
          })
      })

      function update(id_izin){
          axios.put(`https://pam.ppcdeveloper.com/api/izin/${id_izin}`, {
        }).then((response) => {
            izin.value = response.data.data;                   
            //redirect ke post index
            router.push({
                name: 'izin.index'
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
      //return
      return {
        izin,
        router,
        update,
        // show,
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
  
  