<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">PEGAWAI</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA PEGAWAI</th>
                                    <th scope="col">ROLE PEGAWAI</th>
                                    <th scope="col">NOMOR TELEPHONE PEGAWAI</th>
                                    <th scope="col">ALAMAT PEGAWAI</th>
                                    <th scope="col">EMAIL PEGAWAI</th>
                                    <th scope="col">TANGGAL LAHIR PEGAWAI</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(pegawai, id) in pegawai" :key="id">
                                    <td>{{ pegawai.nama_pegawai }}</td>
                                    <td>{{ pegawai.id_role }}</td>
                                    <td>{{ pegawai.no_telp_pegawai}}</td>
                                    <td>{{ pegawai.alamat_pegawai }}</td>
                                    <td>{{ pegawai.email_pegawai }}</td>
                                    <td>{{ pegawai.tanggal_lahir_pegawai }}</td>
                                    <td class="text-center">
                                    <router-link :to="{ name:
                                    'pegawai.edit', params: { id: pegawai.id } }" class="btn
                                    btn-sm btn-primary mr-1">
                                    <i class="bi bi-pencil"></i>    
                                    </router-link>
                                    <button class="btn btn-sm btn-danger ml-2 " @click.prevent="deletePegawai(pegawai.id_pegawai)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p align="right">
                                <router-link :to="{name: 'pegawai.create'}" class="btn btn-md-3 btn-success">Tambah
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
    let pegawai = ref([]);

    const router = useRouter()

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get('https://pam.ppcdeveloper.com/api/pegawai')
        .then((response) => {
          //assign state posts with response data
          pegawai.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        })
    })

    function deletePegawai($id_pegawai){
        axios.delete('https://pam.ppcdeveloper.com/api/pegawai/' + $id_pegawai).then(()=>{
            //assign state posts with response data
            window.location.reload()
        }).catch(error => {
            console.log(error.response.data)
        })            
    }

    //return
    return {
      pegawai,
      deletePegawai,
      router
    }
  },

}
</script>
<style></style>
