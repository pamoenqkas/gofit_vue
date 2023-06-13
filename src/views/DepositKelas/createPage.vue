<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH DEPOSIT KELAS</h4>
                        <hr>
                        <form @submit.prevent="store()">
                            <div class="form-group mb-3">
                                <label class="form-label">ID Pegawai</label>
                                <!-- <input class="form-control" v-model="aktivasi_tahunan_table.id_pegawai" placeholder="Masukkan ID Pegawai"> -->
                                <select type="text" class="form-control" v-model="deposit_kelas.id_pegawai" placeholder="Masukkan nama Pegawai">
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
                                <select type="text" class="form-control" v-model="deposit_kelas.id_member" placeholder="Masukkan nama Member">
                                    <option v-for="(atr, id_member) in member" :key="id_member" v-bind:value="atr.id_member">
                                        {{ atr.nama_member }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.id_member" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.id_member[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Deposit Kelas</label>
                                <input class="form-control" v-model="deposit_kelas.deposit_kelas_member" placeholder="Masukkan Deposit Kelas" >
                                <!-- validation -->
                                <div v-if="validation.deposit_kelas_member" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.deposit_kelas_member[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Jenis Kelas</label>
                                <input class="form-control" v-model="deposit_kelas.jenis_kelas" placeholder="Masukkan Jenis Kelas" >
                                <!-- validation -->
                                <div v-if="validation.jenis_kelas" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.jenis_kelas[0] }}
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
  import { onMounted, ref } from "vue"
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    export default {
        created(){
            this.id_member = this.$route.params.id_member
        },
        setup() {
            //state aktivasi_tahuan
            let deposit_kelas = ref([]);
            let member = ref([]);
            let pegawai = ref([]);

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

            //method store

            function store() {
                let id_pegawai = deposit_kelas.value.id_pegawai
                let id_member = deposit_kelas.value.id_member
                let deposit_kelas_member = deposit_kelas.value.deposit_kelas_member
                let jenis_kelas = deposit_kelas.value.jenis_kelas
                // let total_deposit = deposit_kelas.total_deposit
                // let bonus_deposit = deposit_kelas.bonus_deposit
                // let sisa_deposit = deposit_kelas.sisa_deposit
                axios.post('https://pam.ppcdeveloper.com/api/deposit_kelas', {
                    id_pegawai: id_pegawai,
                    id_member: id_member,
                    deposit_kelas: deposit_kelas_member,
                    jenis_kelas: jenis_kelas,
                    // total_deposit: total_deposit,
                    // bonus_deposit: bonus_deposit,
                    // sisa_deposit: sisa_deposit,
                }).then(() => {
                    //redirect ke post index
                    router.push({
                        name: 'deposit_kelas.index'
                    })
                }).catch(error => {
                    //assign state validation with error
                    validation.value = error.response.data
                })
            }

            //return
            return {
                deposit_kelas,
                validation,
                router,
                store,
                member,
                pegawai,
            }
        }
    }
</script>
<style></style>