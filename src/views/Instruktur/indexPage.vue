<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Instruktur</h1>
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
                    Data Insruktur Berhasil Dihapus
                  </p>
                </div>
              </div>
              </div>
          </div>
            <table class="table table-striped table-bordered mt4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">NAMA</th>
                  <th scope="col">NOMOR TELEPHONE</th>
                  <th scope="col">ALAMAT</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">TANGGAL LAHIR</th>
                  <th scope="col">TOTAL TERLAMBAT</th>
                  <th scope="col">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(instruktur, id_instruktur) in instruktur" :key="id_instruktur">
                  <td>{{ instruktur.nama_instruktur }}</td>
                  <td>{{ instruktur.no_telp_instruktur }}</td>
                  <td>{{ instruktur.alamat_instruktur }}</td>
                  <td>{{ instruktur.email_instruktur }}</td>
                  <td>{{ instruktur.tanggal_lahir_instruktur }}</td>
                  <td>{{ instruktur.total_terlambat }}</td>
                  <td class="text-center">
                    <router-link :to="{ name:
                    'instruktur.edit', params: { id_instruktur: instruktur.id_instruktur } }" 
                    class="btn btn-sm btn-primary mr-1">
                    <i class="bi bi-pencil"></i>    
                    </router-link>
                    <button class="btn btn-sm btn-danger ml-2 " @click.prevent="deleteInstruktur(instruktur.id_instruktur)">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                </tr>
              </tbody>
            </table>
            <p align="right">
                <router-link :to="{name: 'instruktur.create'}" class="btn btn-md-3 btn-success">Tambah
                    <i class="bi bi-file-plus"></i>
                </router-link>
                <button class="btn btn-sm btn-danger ml-2 " @click.prevent="resetTotalTerlambat()">
                        <!-- <i class="bi bi-trash"></i> -->
                        Reset Total Terlambat
                    </button>
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

export default {
  setup() {
    //reactive state
    let instruktur = ref([]);
    const router = useRouter()

    //Untuk alert delete
    let show = ref(false);
    const reloadTime = 30000;

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get('https://pam.ppcdeveloper.com/api/instruktur')
        .then((response) => {
          //assign state posts with response data
          instruktur.value = response.data.data;          
        })
        .catch((error) => {
          console.log(error.response.data);
        })
    })
  

    function deleteInstruktur($id_instruktur){
        axios.delete('https://pam.ppcdeveloper.com/api/instruktur/' + $id_instruktur).then(()=>{
            //assign state posts with response data
            show.value = true;
            window.location.reload()
        }, reloadTime).catch(error => {
            console.log(error.response.data)
        })
    }

    function resetTotalTerlambat(){
        axios.put('https://pam.ppcdeveloper.com/api/instruktur').then(response => {
        //assign state posts with response data
        console.log(response)
        window.location.reload()
        }).catch(error => {
            console.log(error.response.data)
        })      
    }

    //return
    return {
      instruktur,
      deleteInstruktur,
      resetTotalTerlambat,
      router,
      show,
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

