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
                                <label class="form-label">ID Pegawai</label>
                                <input class="form-control" v-model="pegawai.id_pegawai" placeholder="Masukkan ID Pegawai">
                                <!-- validation -->
                                <div v-if="validation.id_pegawai" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.id_pegawai[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Role Pegawai</label>
                                <input class="form-control" v-model="pegawai.id_role" placeholder="Masukkan Role Pegawai">
                                <!-- validation -->
                                <div v-if="validation.id_role" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.id_role[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Nama Pegawai</label>
                                <input class="form-control" v-model="pegawai.nama_pegawai" placeholder="Masukkan Nama Pegawai">
                                <!-- validation -->
                                <div v-if="validation.nama_pegawai" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.nama_pegawai[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Nomor Telephone Pegawai</label>
                                <input class="form-control" v-model="pegawai.no_telp_pegawai" placeholder="Masukkan Nomor Telephone Pegawai">
                                <!-- validation -->
                                <div v-if="validation.no_telp_pegawai" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.no_telp_pegawai[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Alamat Pegawai</label>
                                <input class="form-control" v-model="pegawai.alamat_pegawai" placeholder="Masukkan Alamat Pegawai">
                                <!-- validation -->
                                <div v-if="validation.alamat_pegawai" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.alamat_pegawai[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Email Pegawai</label>
                                <input class="form-control" v-model="pegawai.email_pegawai" placeholder="Masukkan Email Pegawai">
                                <!-- validation -->
                                <div v-if="validation.email_pegawai" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.email_pegawai[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Tanggal Lahir Pegawai</label>
                                <input class="form-control" v-model="pegawai.tanggal_lahir_pegawai" placeholder="Masukkan Tanggal Lahir Pegawai" type="date">
                                <!-- validation -->
                                <div v-if="validation.tanggal_lahir_pegawai" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.tanggal_lahir_pegawai[0] }}
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
            //state pegawai
            const pegawai = reactive({
                id_pegawai: '',
                id_role: '',
                nama_pegawai: '',
                no_telp_pegawai: '',
                alamat_pegawai: '',
                email_pegawai: '',
                tanggal_lahir_pegawai: '',
            })

            //state validation
            const validation = ref([])
            //vue router
            
            const router = useRouter()
            //method store

            function store() {
                let id_pegawai = pegawai.id_pegawai
                let id_role = pegawai.id_role
                let nama_pegawai = pegawai.nama_pegawai
                let no_telp_pegawai = pegawai.no_telp_pegawai
                let alamat_pegawai = pegawai.alamat_pegawai
                let email_pegawai = pegawai.email_pegawai
                let tanggal_lahir_pegawai = pegawai.tanggal_lahir_pegawai

                axios.post('https://pam.ppcdeveloper.com/api/pegawai/', {
                    id_pegawai: id_pegawai,
                    id_role: id_role,
                    nama_pegawai: nama_pegawai,
                    no_telp_pegawai: no_telp_pegawai,
                    alamat_pegawai: alamat_pegawai,
                    email_pegawai: email_pegawai,
                    tanggal_lahir_pegawai: tanggal_lahir_pegawai,
                }).then(() => {
                    //redirect ke post index
                    router.push({
                        name: 'pegawai.index'
                    })
                }).catch(error => {
                    //assign state validation with error
                    validation.value = error.response.data
                    console.log('Objek belum didefinisikan atau nilai nya tidak valid.');
                })
            }

            //return
            return {
                pegawai,
                validation,
                router,
                store
            }
        }
    }
</script>
<style></style>