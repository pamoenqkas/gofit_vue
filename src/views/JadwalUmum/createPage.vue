<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH JADWAL UMUM</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label for="select-option">NAMA INSTRUKTUR</label>
                                <select type="text" class="form-control" v-model="jadwal_umum.id_instruktur" placeholder="Masukkan nama Instruktur">
                                    <option v-for="(atr, id_instruktur) in instruktur" :key="id_instruktur" v-bind:value="atr.id_instruktur">
                                        {{ atr.nama_instruktur }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.nama_instruktur" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.nama_instruktur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="select-option">KELAS</label>
                                <select type="text" class="form-control" v-model="jadwal_umum.id_kelas" placeholder="Masukkan nama kelas">
                                    <option v-for="(atr, id_kelas) in kelas" :key="id_kelas" v-bind:value="atr.id_kelas">
                                        {{ atr.nama_kelas }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.nama_kelas" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.nama_kelas[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="select-option">HARI</label>
                                    <select type="text" class="form-control" v-model="jadwal_umum.hari" placeholder="Masukkan  hari">
                                    <option v-for="hari in haris" :key="hari.id" :value="hari.id">{{ hari.name }}</option>
                                </select>
                            </div>
                            <div class="form-group mb-3">
                                <label for="select-option">JAM MULAI</label>
                                    <select type="text" class="form-control" v-model="jadwal_umum.jam_mulai" placeholder="Masukkan Jam Mulai">
                                    <option v-for="jam_mulai in jam_mulais" :key="jam_mulai.id" :value="jam_mulai.id">{{ jam_mulai.name }}</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.jam_mulai" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.jam_selesai[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="select-option">JAM MULAI</label>
                                    <select type="text" class="form-control" v-model="jadwal_umum.jam_selesai" placeholder="Masukkan Jam selesai">
                                    <option v-for="jam_selesai in jam_selesais" :key="jam_selesai.id" :value="jam_selesai.id">{{ jam_selesai.name }}</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.jam_selesai" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.jam_selesai[0] }}
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
    import { useRouter} from 'vue-router'
    export default {
        created(){
            this.id_jadwal_umum = this.$route.params.id_jadwal_umum
        },
    setup() {
        //reactive state
        let jadwal_umum = ref([]);
        let kelas = ref ([]);
        let instruktur = ref ([]);
        let haris = ref([
                {id : 'Senin', name: 'Senin'},
                {id : 'Selasa', name: 'Selasa'},
                {id : 'Rabu', name: 'Rabu'},
                {id : 'Kamis', name: 'Kamis'},
                {id : 'Jumat', name: 'Jumat'},
                {id : 'Sabtu', name: 'Sabtu'},
                {id : 'Minggu', name: 'Minggu'},

        ])
        let jam_mulais = ref([
                {id : '08:00:00', name: '08:00:00'},
                {id : '09:30:00', name: '09:30:00'},
                {id : '17:00:00', name: '17:00:00'},
                {id : '18:30:00', name: '18:30:00'},
        ])
        let jam_selesais = ref([
                {id : '09:30:00', name: '09:30:00'},
                {id : '11:00:00', name: '11:00:00'},
                {id : '18:30:00', name: '18:30:00'},
                {id : '20:00:00', name: '20:00:00'},
        ])
        const router = useRouter()
        // const route = useRoute()

        const validation = ref([])

        //mounted
        onMounted(() => {
        //get API from Laravel Backend
        axios
            .get("https://pam.ppcdeveloper.com/api/instruktur")
            .then((response) => {
                //assign state posts with response data
                instruktur.value = response.data.data;
                console.log(instruktur.value)
            })
            .catch((error) => {
                console.log(error.response.data);
            });

        axios
            .get("https://pam.ppcdeveloper.com/api/kelas")
            .then((response) => {
                //assign state posts with response data
                kelas.value = response.data.data;
                console.log(kelas.value)
            })
            .catch((error) => {
                console.log(error.response.data);
            });

        })
        
        function store() {
            let id_instruktur = jadwal_umum.value.id_instruktur
            let id_kelas = jadwal_umum.value.id_kelas
            let hari = jadwal_umum.value.hari
            let jam_mulai = jadwal_umum.value.jam_mulai
            let jam_selesai = jadwal_umum.value.jam_selesai

            axios.post('https://pam.ppcdeveloper.com/api/jadwal_umum/', {
                id_instruktur: id_instruktur,
                id_kelas: id_kelas,
                hari: hari,
                jam_mulai: jam_mulai,
                jam_selesai: jam_selesai,
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'jadwal_umum.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
                console.log(error.response.data)
            })
        }

        //return
        return {
        jadwal_umum,
        kelas,
        instruktur,
        haris,
        store,
        router,
        validation,
        jam_mulais,
        jam_selesais,
        }
    },
        }
    </script>
    <style></style>