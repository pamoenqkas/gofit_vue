<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Edit pegawai</h4>
                        <hr>
                        <form @submit.prevent="edit(this.id_pegawai)">
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
                            <button type="submit" class="btn btnprimary">SIMPAN</button>
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
            this.id_pegawai = this.$route.params.id_pegawai
        },
    setup() {
        //reactive state
        let pegawai = ref([]);
        const router = useRouter()
        const route = useRoute()

        const validation = ref([])

        //mounted
        onMounted(() => {
        //get API from Laravel Backend
        axios
            .get(`https://pam.ppcdeveloper.com/api/pegawai/${route.params.id_pegawai}`,)
            .then((response) => {
            //assign state posts with response data
            // pegawai.value = response.data.data;
            
            pegawai.value.nama_pegawai = response.data.data.nama_pegawai
            pegawai.value.no_telp_pegawai = response.data.data.no_telp_pegawai
            pegawai.value.alamat_pegawai = response.data.data.alamat_pegawai
            pegawai.value.email_pegawai = response.data.data.email_pegawai
            pegawai.value.tanggal_lahir_pegawai = response.data.data.tanggal_lahir_pegawai

            })
            .catch((error) => {
            console.log(error.response.data);
            })
        })

        function edit($id_pegawai) {
            let nama_pegawai = pegawai.value.nama_pegawai
            let no_telp_pegawai = pegawai.value.no_telp_pegawai
            let alamat_pegawai = pegawai.value.alamat_pegawai
            let email_pegawai = pegawai.value.email_pegawai
            let tanggal_lahir_pegawai = pegawai.value.tanggal_lahir_pegawai

            axios.put('https://pam.ppcdeveloper.com/api/pegawai/' + $id_pegawai, {
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
                console.log(error.response.data)
            })
        }

        //return
        return {
        pegawai,
        edit,
        router,
        validation
        }
    },
        }
    </script>
    <style></style>