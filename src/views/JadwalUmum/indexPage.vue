<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Jadwal Umum</h1>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <table class="table table-striped table-bordered mt4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">ID Instruktur</th>
                  <th scope="col">ID KELAS</th>
                  <th scope="col">HARI</th>
                  <th scope="col">JAM MULAI</th>
                  <th scope="col">JAM SELESAI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(jadwal_umum, id_jadwal_umum) in jadwal_umum" :key="id_jadwal_umum">
                  <td>{{ jadwal_umum.instruktur.nama_instruktur }}</td>
                  <td>{{ jadwal_umum.kelas.nama_kelas }}</td>
                  <td>{{ jadwal_umum.hari }}</td>
                  <td>{{ jadwal_umum.jam_mulai }}</td>
                  <td>{{ jadwal_umum.jam_selesai }}</td>
                  <td class="text-center">
                    <router-link :to="{ name:
                    'jadwal_umum.edit', params: { id_jadwal_umum: jadwal_umum.id_jadwal_umum } }" class="btn
                    btn-sm btn-primary mr-1">
                    <i class="bi bi-pencil"></i>    
                    </router-link>
                    <button class="btn btn-sm btn-danger ml-2 " @click.prevent="deleteJadwalUmum(jadwal_umum.id_jadwal_umum)">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                </tr>
              </tbody>
            </table>
            <p align="right">
                <router-link :to="{name: 'jadwal_umum.create'}" class="btn btn-md-3 btn-success">Tambah
                    <i class="bi bi-file-plus"></i>
                </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router'
export default {
  setup() {
    //reactive state
    let jadwal_umum = ref([]);

    const router = useRouter()

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get('https://pam.ppcdeveloper.com/api/jadwal_umum/')
        .then((response) => {
          //assign state posts with response data
          jadwal_umum.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        })
    })

  function deleteJadwalUmum($id_jadwal_umum){
        axios.delete('https://pam.ppcdeveloper.com/api/jadwal_umum/' + $id_jadwal_umum).then(()=>{
            //assign state posts with response data
            window.location.reload()
        }).catch(error => {
            console.log(error.response.data)
        })            
    }

    //return
    return {
      jadwal_umum,
      deleteJadwalUmum,
      router
    }
  },

}
</script>
<style></style>
