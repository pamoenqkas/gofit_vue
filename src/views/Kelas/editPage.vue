<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Edit kelas</h4>
                        <hr>
                        <form @submit.prevent="edit(this.id_kelas)">
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Nama Kelas</label>
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
    import axios from "axios";
    import { onMounted, ref } from "vue";
    import { useRouter , useRoute } from 'vue-router'
    export default {
        created(){
            this.id_kelas = this.$route.params.id_kelas
        },
    setup() {
        //reactive state
        let kelas = ref([]);
        const router = useRouter()
        const route = useRoute()

        const validation = ref([])

        //mounted
        onMounted(() => {
        //get API from Laravel Backend
        axios
            .get(`http://localhost:8000/api/kelas/${route.params.id_kelas}`,)
            .then((response) => {
            //assign state posts with response data
            // kelas.value = response.data.data;
            
            kelas.value.nama_kelas = response.data.data.nama_kelas
            kelas.value.harga = response.data.data.harga
            kelas.value.kapasitas = response.data.data.kapasitas

            })
            .catch((error) => {
            console.log(error.response.data);
            })
        })

        function edit($id_kelas) {
            let nama_kelas = kelas.value.nama_kelas
            let harga = kelas.value.harga
            let kapasitas = kelas.value.kapasitas

            axios.put('http://localhost:8000/api/kelas/' + $id_kelas, {
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
                console.log(error.response.data)
            })
        }

        //return
        return {
        kelas,
        edit,
        router,
        validation
        }
    },
        }
    </script>
    <style></style>