<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Edit Aktivasi Tahunan</h4>
                        <hr>
                        <form @submit.prevent="edit(this.id_aktivasi_tahunan)">
                            <div class="form-group mb-3">
                                <label class="form-label">ID Pegawai</label>
                                <input class="form-control" v-model="aktivasi_tahunan.id_pegawai" placeholder="Masukkan ID Pegawai">
                                <!-- validation -->
                                <div v-if="validation.id_pegawai" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.id_pegawai[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">ID Member</label>
                                <input class="form-control" v-model="aktivasi_tahunan.id_member" placeholder="Masukkan ID Member">
                                <!-- validation -->
                                <div v-if="validation.id_member" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.id_member[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Tanggal</label>
                                <input class="form-control" v-model="aktivasi_tahunan.tanggal" placeholder="Masukkan Tanggal" type="date">
                                <!-- validation -->
                                <div v-if="validation.tanggal" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.tanggal[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Masa Aktif Member</label>
                                <input class="form-control" v-model="aktivasi_tahunan.masa_aktif" placeholder="Masukkan Aktif">
                                <!-- validation -->
                                <div v-if="validation.masa_aktif" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.masa_aktif[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Aktivasi Tahunan</label>
                                <input class="form-control" v-model="aktivasi_tahunan.aktivasi_tahunan" placeholder="Masukkan Aktivasi Tahunan" type="number">
                                <!-- validation -->
                                <div v-if="validation.aktivasi_tahunan" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.aktivasi_tahunan[0] }}
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
        this.id_aktivasi_tahunan = this.$route.params.id_aktivasi_tahunan
    },
    setup() {
        //reactive state
        let aktivasi_tahunan = ref([]);
        const router = useRouter()
        const route = useRoute()

        const validation = ref([])

        //mounted
        onMounted(() => {
        //get API from Laravel Backend
        axios
            .get(`https://pam.ppcdeveloper.com/api/aktivasi_tahunan/${route.params.id_aktivasi_tahunan}`,)
            .then((response) => {
            //assign state posts with response data
            // instruktur.value = response.data.data;
            aktivasi_tahunan.value.id_pegawai = response.data.data.id_pegawai
            aktivasi_tahunan.value.id_member = response.data.data.id_member
            aktivasi_tahunan.value.tanggal = response.data.data.tanggal
            aktivasi_tahunan.value.masa_aktif = response.data.data.masa_aktif
            aktivasi_tahunan.value.aktivasi_tahunan = response.data.data.aktivasi_tahunan
            })
            .catch((error) => {
            console.log(error.response.data);
            })
        })

        function edit($id_aktivasi_tahunan) {
            let id_pegawai = aktivasi_tahunan.value.id_pegawai
            let id_member = aktivasi_tahunan.value.id_member
            let tanggal = aktivasi_tahunan.value.tanggal
            let masa_aktif = aktivasi_tahunan.value.masa_aktif
            let aktivasi_tahunan = aktivasi_tahunan.value.aktivasi_tahunan

            axios.put('https://pam.ppcdeveloper.com/api/aktivasi_tahunan/' + $id_aktivasi_tahunan, {
                id_pegawai: id_pegawai,
                id_member: id_member,
                tanggal: tanggal,
                masa_aktif: masa_aktif,
                aktivasi_tahunan: aktivasi_tahunan,
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'aktivasi_tahunan.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
                console.log(error.response.data)
            })
        }

        //return
        return {
        aktivasi_tahunan,
        edit,
        router,
        validation
        }
    },
        }
    </script>
    <style></style>