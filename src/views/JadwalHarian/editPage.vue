<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Edit Jadwal Harian</h4>
                        <hr>
                        <form @submit.prevent="edit(this.id_jadwal_harian)">
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
    import axios from "axios";
    import { onMounted, ref } from "vue";
    import { useRouter , useRoute } from 'vue-router'
    export default {
    created(){
        this.id_jadwal_harian = this.$route.params.id_jadwal_harian
    },
    setup() {
        //reactive state
        let jadwal_harian = ref([]);
        const router = useRouter()
        const route = useRoute()

        const validation = ref([])

        //mounted
        onMounted(() => {
        //get API from Laravel Backend
        axios
            .get(`https://pam.ppcdeveloper.com/api/jadwal_harian/${route.params.id_jadwal_harian}`,)
            .then((response) => {
            //assign state posts with response data
            // instruktur.value = response.data.data;
            jadwal_harian.value.id_instruktur = response.data.data.id_instruktur
            jadwal_harian.value.id_kelas = response.data.data.id_kelas
            jadwal_harian.value.hari = response.data.data.hari
            jadwal_harian.value.jam_mulai = response.data.data.jam_mulai
            jadwal_harian.value.jam_selesai = response.data.data.jam_selesai
            jadwal_harian.value.tanggal = response.data.data.tanggal
            jadwal_harian.value.keterangan = response.data.data.keterangan
            })
            .catch((error) => {
            console.log(error.response.data);
            })
        })

        function edit($id_jadwal_harian) {
            let id_instruktur = jadwal_harian.value.id_instruktur
            let id_kelas = jadwal_harian.value.id_kelas
            let hari = jadwal_harian.value.hari
            let jam_mulai = jadwal_harian.value.jam_mulai
            let jam_selesai = jadwal_harian.value.jam_selesai
            let tanggal = jadwal_harian.value.tanggal
            let keterangan = jadwal_harian.value.keterangan

            axios.put('https://pam.ppcdeveloper.com/api/jadwal_harian/' + $id_jadwal_harian, {
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
                console.log(error.response.data)
            })
        }

        //return
        return {
        jadwal_harian,
        edit,
        router,
        validation
        }
    },
        }
    </script>
    <style></style>