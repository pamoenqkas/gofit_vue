<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH POST</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">ID Kelas</label>
                                <input class="form-control" v-model="kelas.id_kelas" placeholder="Masukkan ID Kelas">
                                <!-- validation -->
                                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.id_kelas[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Nomor Nama Kelas</label>
                                <input class="form-control" v-model="kelas.nama_kelas" placeholder="Masukkan Nama Kelas">
                                <!-- validation -->
                                <div v-if="validation.nama_kelas" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.nama_kelas[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Harga Kelas</label>
                                <input class="form-control" v-model="kelas.harga" placeholder="Masukkan Harga Kelas">
                                <!-- validation -->
                                <div v-if="validation.harga" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.harga[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Kapasitas Kelas</label>
                                <input class="form-control" v-model="kelas.kapasitas" placeholder="Masukkan Kapasitas Kelas">
                                <!-- validation -->
                                <div v-if="validation.kapasitas" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.kapasitas[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    export default {
        setup() {
            //state kelas
            const kelas = reactive({
                id_kelas: '',
                nama_kelas: '',
                harga: '',
                kapasitas: '',
            })

            //state validation
            const validation = ref([])
            //vue router
            
            const router = useRouter()
            //method store

            function store() {
                let id_kelas = kelas.id_kelas
                let nama_kelas = kelas.nama_kelas
                let harga = kelas.harga
                let kapasitas = kelas.kapasitas

                axios.post('https://pam.ppcdeveloper.com/api/kelas/', {
                    id_kelas: id_kelas,
                    nama_kelas: nama_kelas,
                    harga: harga,
                    kapasitas: kapasitas,
                }).then(() => {
                    //redirect ke post index
                    router.push({
                        name: 'kelas.index'
                    })
                }).catch(error => {
                    //assign state validation with error
                    validation.value = error.response.data
                    console.log('Objek belum didefinisikan atau nilai nya tidak valid.');
                })
            }

            //return
            return {
                kelas,
                validation,
                router,
                store
            }
        }
    }
</script>
<style></style>