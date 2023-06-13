<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Edit Instruktur</h4>
                        <hr>
                        <form @submit.prevent="edit(this.id_instruktur)">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Instruktur</label>
                                <input class="form-control" v-model="instruktur.nama_instruktur" >
                                <!-- validation -->
                                <div v-if="validation.nama_instruktur" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.nama_instruktur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Nomor Telephone Instruktur</label>
                                <input class="form-control" v-model="instruktur.no_telp_instruktur">
                                <!-- validation -->
                                <div v-if="validation.no_telp_instruktur" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.no_telp_instruktur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Alamat Instruktur</label>
                                <input class="form-control" v-model="instruktur.alamat_instruktur" >
                                <!-- validation -->
                                <div v-if="validation.alamat_instruktur" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.alamat_instruktur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Email Instruktur</label>
                                <input class="form-control" v-model="instruktur.email_instruktur" >
                                <!-- validation -->
                                <div v-if="validation.email_instruktur" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.email_instruktur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Tanggal Lahir Instruktur</label>
                                <input class="form-control" v-model="instruktur.tanggal_lahir_instruktur" type="date">
                                <!-- validation -->
                                <div v-if="validation.tanggal_lahir_instruktur" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.tanggal_lahir_instruktur[0] }}
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
        this.id_instruktur = this.$route.params.id_instruktur
    },
    setup() {
        //reactive state
        let instruktur = ref([]);
        const router = useRouter()
        const route = useRoute()

        const validation = ref([])

        //mounted
        onMounted(() => {
        //get API from Laravel Backend
        axios
            .get(`https://pam.ppcdeveloper.com/api/instruktur/${route.params.id_instruktur}`,)
            .then((response) => {
            //assign state posts with response data
            // instruktur.value = response.data.data;
            instruktur.value.nama_instruktur = response.data.data.nama_instruktur
            instruktur.value.no_telp_instruktur = response.data.data.no_telp_instruktur
            instruktur.value.alamat_instruktur = response.data.data.alamat_instruktur
            instruktur.value.email_instruktur = response.data.data.email_instruktur
            instruktur.value.tanggal_lahir_instruktur = response.data.data.tanggal_lahir_instruktur
            })
            .catch((error) => {
            console.log(error.response.data);
            })
        })

        function edit($id_instruktur) {
            let nama_instruktur = instruktur.value.nama_instruktur
            let no_telp_instruktur = instruktur.value.no_telp_instruktur
            let alamat_instruktur = instruktur.value.alamat_instruktur
            let email_instruktur = instruktur.value.email_instruktur
            let tanggal_lahir_instruktur = instruktur.value.tanggal_lahir_instruktur

            axios.put('https://pam.ppcdeveloper.com/api/instruktur/' + $id_instruktur, {
                nama_instruktur: nama_instruktur,
                no_telp_instruktur: no_telp_instruktur,
                alamat_instruktur: alamat_instruktur,
                email_instruktur: email_instruktur,
                tanggal_lahir_instruktur: tanggal_lahir_instruktur,
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'instruktur.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
                console.log(error.response.data)
            })
        }

        //return
        return {
        instruktur,
        edit,
        router,
        validation
        }
    },
        }
    </script>
    <style></style>