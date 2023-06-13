<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH Jadwal Harian</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">ID Jadwal Harian</label>
                                <input class="form-control" v-model="jadwal_harian.id_jadwal_harian" placeholder="Masukkan ID jadwal harian">
                                <!-- validation -->
                                <div v-if="validation.id_jadwal_harian" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.id_jadwal_harian[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">ID Instruktur</label>
                                <input class="form-control" v-model="jadwal_harian.id_instruktur" placeholder="Masukkan ID Instruktur">
                                <!-- validation -->
                                <div v-if="validation.id_instruktur" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.id_instruktur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">ID Kelas</label>
                                <input class="form-control" v-model="jadwal_harian.id_kelas" placeholder="Masukkan ID Kelas">
                                <!-- validation -->
                                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.id_kelas[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Hari</label>
                                <input class="form-control" v-model="jadwal_harian.hari" placeholder="Masukkan Hari">
                                <!-- validation -->
                                <div v-if="validation.hari" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.hari[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Jam Mulai</label>
                                <input class="form-control" v-model="jadwal_harian.jam_mulai" placeholder="Masukkan Jam Mulai">
                                <!-- validation -->
                                <div v-if="validation.jam_mulai" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.jam_mulai[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Jam Selesai</label>
                                <input class="form-control" v-model="jadwal_harian.jam_selesai" placeholder="Masukkan Jam Selesai">
                                <!-- validation -->
                                <div v-if="validation.jam_selesai" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.jam_selesai[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Tanggal</label>
                                <input class="form-control" v-model="jadwal_harian.tanggal" placeholder="Masukkan Tanggal" type="date">
                                <!-- validation -->
                                <div v-if="validation.tanggal" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.tanggal[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Keterangan</label>
                                <input class="form-control" v-model="jadwal_harian.keterangan" placeholder="Masukkan Keterangan">
                                <!-- validation -->
                                <div v-if="validation.keterangan" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.keterangan[0] }}
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
            //state jadwal_harian
            const jadwal_harian = reactive({
                id_jadwal_harian:'',
                id_instruktur: '',
                id_kelas: '',
                hari: '',
                jam_mulai: '',
                jam_selesai: '',
                tanggal: '',
                keterangan: '',
            })

            //state validation
            const validation = ref([])
            //vue router
            
            const router = useRouter()
            //method store

            function store() {
                let id_jadwal_harian = jadwal_harian.id_jadwal_harian
                let id_instruktur = jadwal_harian.id_instruktur
                let id_kelas = jadwal_harian.id_kelas
                let hari = jadwal_harian.hari
                let jam_mulai = jadwal_harian.jam_mulai
                let jam_selesai = jadwal_harian.jam_selesai
                let tanggal = jadwal_harian.tanggal
                let keterangan = jadwal_harian.keterangan
            
                axios.post('https://pam.ppcdeveloper.com/api/jadwal_harian/', {
                    id_jadwal_harian: id_jadwal_harian,
                    id_instruktur: id_instruktur,
                    id_kelas: id_kelas,
                    hari: hari,
                    jam_mulai: jam_mulai,
                    jam_selesai: jam_selesai,
                    tanggal: tanggal,
                    keterangan: keterangan,
                }).then(() => {
                    //redirect ke post index
                    router.push({
                        name: 'jadwal_harian.index'
                    })
                }).catch(error => {
                    //assign state validation with error
                    validation.value = error.response.data
                })
            }

            //return
            return {
                jadwal_harian,
                validation,
                router,
                store
            }
        }
    }
</script>
<style></style>