<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH AKTIVASI TAHUNAN</h4>
                        <hr>
                        <form @submit.prevent="store()">
                            <div class="form-group mb-3">
                                <label class="form-label">ID Pegawai</label>
                                <!-- <input class="form-control" v-model="aktivasi_tahunan_table.id_pegawai" placeholder="Masukkan ID Pegawai"> -->
                                <select type="text" class="form-control" v-model="aktivasi_tahunan.id_pegawai" placeholder="Masukkan nama Pegawai">
                                    <option v-for="(atr, id_pegawai) in pegawai" :key="id_pegawai" v-bind:value="atr.id_pegawai">
                                        {{ atr.nama_pegawai }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.id_pegawai" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.id_pegawai[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">ID Member</label>
                                <!-- <input class="form-control" v-model="aktivasi_tahunan.id_member" placeholder="Masukkan ID Member"> -->
                                <select type="text" class="form-control" v-model="aktivasi_tahunan.id_member" placeholder="Masukkan nama Member">
                                    <option v-for="(atr, id_member) in member" :key="id_member" v-bind:value="atr.id_member">
                                        {{ atr.nama_member }}
                                    </option>
                                </select>
                                <div v-if="validation.id_member" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.id_member[0] }}
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
    // import { onMounted, ref } from 'vue'
    // import { reactive, ref } from 'vue'
    import { onMounted, ref } from "vue"
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    
    export default {
        created(){
            this.id_member = this.$route.params.id_member
        },
        setup() {
            // state aktivasi_tahuan
            let aktivasi_tahunan = ref([]);
            let member = ref([]);
            let pegawai = ref([]);
            
            // = ref({
            //     id_pegawai:'',
            //     id_member: '',
            //     tanggal: '',
            //     masa_aktif: '',
            //     aktivasi_tahunan: '',
            // })

            // let aktivasi_tahunan_table = ref([]);

            //state validation
            const validation = ref([])
            //vue router
            
            const router = useRouter()
        onMounted(() => {
        //get API from Laravel Backend
        axios
            .get("https://pam.ppcdeveloper.com/api/pegawai")
            .then((response) => {
                //assign state posts with response data
                pegawai.value = response.data.data;
                console.log(pegawai.value)
            })
            .catch((error) => {
                console.log(error.response.data);
            });

        axios
            .get("https://pam.ppcdeveloper.com/api/member")
            .then((response) => {
                //assign state posts with response data
                member.value = response.data.data;
                console.log(member.value)
            })
            .catch((error) => {
                console.log(error.response.data);
            });

        })
            
            function store() {
                let id_pegawai = aktivasi_tahunan.value.id_pegawai
                let id_member = aktivasi_tahunan.value.id_member
                // let tanggal = aktivasi_tahunan.value.tanggal
                // let masa_aktif = aktivasi_tahunan_table.masa_aktif
                // let aktivasi_tahunan = aktivasi_tahunan_table.aktivasi_tahunan
            
                axios.post('https://pam.ppcdeveloper.com/api/aktivasi_tahunan', {
                    id_pegawai: id_pegawai,
                    id_member: id_member,
                    // tanggal: tanggal,
                    // masa_aktif: masa_aktif,
                    // aktivasi_tahunan: aktivasi_tahunan,
                }).then(() => {
                    //redirect ke post index
                    router.push({
                        name: 'aktivasi_tahunan.index'
                    })
                }).catch(error => {
                    //assign state validation with error
                    validation.value = error.response.data
                    // console.log(this.id_member);
                })
            }

            //return
            return {
                aktivasi_tahunan,
                member,
                validation,
                router,
                store,
                pegawai,
            }
        }
    }
</script>
<style></style>