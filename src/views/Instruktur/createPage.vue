<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH Instruktur</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">ID Instruktur</label>
                                <input class="form-control" v-model="instruktur.id_instruktur" placeholder="Masukkan ID instruktur">
                                <!-- validation -->
                                <div v-if="validation.id_instruktur" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.id_instruktur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Instruktur</label>
                                <input class="form-control" v-model="instruktur.nama_instruktur" placeholder="Masukkan nama instruktur">
                                <!-- validation -->
                                <div v-if="validation.nama_instruktur" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.nama_instruktur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Nomor Telephone Instruktur</label>
                                <input class="form-control" v-model="instruktur.no_telp_instruktur" placeholder="Masukkan Nomor Telephone Instruktur">
                                <!-- validation -->
                                <div v-if="validation.no_telp_instruktur" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.no_telp_instruktur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Alamat Instruktur</label>
                                <input class="form-control" v-model="instruktur.alamat_instruktur" placeholder="Masukkan Alamat Instruktur">
                                <!-- validation -->
                                <div v-if="validation.alamat_instruktur" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.alamat_instruktur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Email Instruktur</label>
                                <input class="form-control" v-model="instruktur.email_instruktur" placeholder="Masukkan Email Instruktur">
                                <!-- validation -->
                                <div v-if="validation.email_instruktur" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.email_instruktur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Tanggal Lahir Instruktur</label>
                                <input class="form-control" v-model="instruktur.tanggal_lahir_instruktur" placeholder="Masukkan Tanggal Lahir Instruktur" type="date">
                                <!-- validation -->
                                <div v-if="validation.tanggal_lahir_instruktur" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.tanggal_lahir_instruktur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Password Instruktur</label>
                                <input class="form-control" v-model="instruktur.password" placeholder="Masukkan Password Instruktur" type="password">
                                <!-- validation -->
                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.password[0] }}
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
            //state instruktur
            const instruktur = reactive({
                id_instruktur:'',
                nama_instruktur: '',
                no_telp_instruktur: '',
                alamat_instruktur: '',
                email_instruktur: '',
                tanggal_lahir_instruktur: '',
            })

            //state validation
            const validation = ref([])
            //vue router
            
            const router = useRouter()
            //method store

            function store() {
                let id_instruktur = instruktur.id_instruktur
                let nama_instruktur = instruktur.nama_instruktur
                let no_telp_instruktur = instruktur.no_telp_instruktur
                let alamat_instruktur = instruktur.alamat_instruktur
                let email_instruktur = instruktur.email_instruktur
                let tanggal_lahir_instruktur = instruktur.tanggal_lahir_instruktur
                let password = instruktur.password
            
                axios.post('https://pam.ppcdeveloper.com/api/instruktur/', {
                    id_instruktur: id_instruktur,
                    nama_instruktur: nama_instruktur,
                    no_telp_instruktur: no_telp_instruktur,
                    alamat_instruktur: alamat_instruktur,
                    email_instruktur: email_instruktur,
                    tanggal_lahir_instruktur: tanggal_lahir_instruktur,
                    password: password,
                }).then(() => {
                    //redirect ke post index
                    router.push({
                        name: 'instruktur.index'
                    })
                }).catch(error => {
                    //assign state validation with error
                    validation.value = error.response.data
                })
            }

            //return
            return {
                instruktur,
                validation,
                router,
                store
            }
        }
    }
</script>
<style></style>