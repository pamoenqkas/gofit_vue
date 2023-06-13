<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Kelas</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA </th>
                                    <th scope="col">HARGA</th>
                                    <th scope="col">KAPASITAS</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(kelas, id_kelas) in kelas" :key="id_kelas">
                                    <td>{{ kelas.nama_kelas }}</td>
                                    <td>{{ kelas.harga }}</td>
                                    <td>{{ kelas.kapasitas }}</td>
                                    <td class="text-center">
                                    <router-link :to="{ name:
                                    'kelas.edit', params: { id_kelas: kelas.id_kelas } }" class="btn
                                    btn-sm btn-primary mr-1">
                                    <i class="bi bi-pencil"></i>    
                                    </router-link>
                                    <button class="btn btn-sm btn-danger ml-2 " @click.prevent="deleteKelas(kelas.id_kelas)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p align="right">
                                <router-link :to="{name: 'kelas.create'}" class="btn btn-md-3 btn-success">Tambah
                                    <i class="bi    bi-file-plus"></i>
                                </router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { onMounted, ref } from 'vue'
    import { useRouter } from 'vue-router'
    export default {
        setup() {
            //reactive state
            let kelas = ref([])

            const router = useRouter()
            
            //mounted
            onMounted(() => {            
            //get API from Laravel Backend
            axios.get('https://pam.ppcdeveloper.com/api/kelas').then(response => {
                //assign state posts with response data
                kelas.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
            })  
            
            function deleteKelas($id_kelas){
                axios.delete('https://pam.ppcdeveloper.com/api/kelas/' + $id_kelas).then(()=>{
                    //assign state posts with response data
                    window.location.reload()
                }).catch(error => {
                    console.log(error.response.data)
                })            
            }
            
            //return
            return {
                kelas,
                deleteKelas,
                router
            }
        }
    }
</script>
<style></style>