<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Edit Jadwal Harian</h4>
                        <hr>
                        <form @submit.prevent="edit(this.id_izin)">
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Status</label>
                                <input class="form-control" v-model="izin.status" placeholder="Masukkan Status">
                                <!-- validation -->
                                <div v-if="validation.status" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.status[0] }}
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
        this.id_izin = this.$route.params.id_izin
    },
    setup() {
        //reactive state
        let izin = ref([]);
        const router = useRouter()
        const route = useRoute()

        const validation = ref([])

        //mounted
        onMounted(() => {
        //get API from Laravel Backend
        axios
            .get(`https://pam.ppcdeveloper.com/api/izin/${route.params.id_izin}`,)
            .then((response) => {
            //assign state posts with response data
            // instruktur.value = response.data.data;
            izin.value.id_instruktur = response.data.data.id_instruktur
            izin.value.id_jadwal_harian = response.data.data.id_jadwal_harian
            izin.value.nama_instruktur = response.data.data.nama_instruktur
            izin.value.id_instruktur_pengganti = response.data.data.id_instruktur_pengganti
            izin.value.tanggal = response.data.data.tanggal
            izin.value.deskripsi_izin = response.data.data.deskripsi_izin
            izin.value.status = response.data.data.status
            })
            .catch((error) => {
            console.log(error.response.data);
            })
        })

        function edit($id_izin) {
            let id_instruktur = izin.value.id_instruktur
            let id_jadwal_harian = izin.value.id_jadwal_harian
            let nama_instruktur = izin.value.nama_instruktur
            let id_instruktur_pengganti = izin.value.id_instruktur_pengganti
            let tanggal = izin.value.tanggal
            let deskripsi_izin = izin.value.deskripsi_izin
            let status = izin.value.status

            axios.put('https://pam.ppcdeveloper.com/api/izin/' + $id_izin, {
                id_instruktur: id_instruktur,
                id_jadwal_harian: id_jadwal_harian,
                nama_instruktur: nama_instruktur,
                id_instruktur_pengganti: id_instruktur_pengganti,
                tanggal: tanggal,
                deskripsi_izin: deskripsi_izin,
                status: status,
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'izin.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
                console.log(error.response.data)
            })
        }

        //return
        return {
        izin,
        edit,
        router,
        validation
        }
    },
        }
    </script>
    <style></style>