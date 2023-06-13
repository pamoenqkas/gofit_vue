<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH DEPOSIT UMUM</h4>
                        <hr>
                        <form @submit.prevent="store()">
                            <div class="form-group mb-3">
                                <label class="form-label">ID Pegawai</label>
                                <input class="form-control" v-model="deposit_umum.id_pegawai" placeholder="Masukkan ID Pegawai">
                                <!-- validation -->
                                <div v-if="validation.id_pegawai" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.id_pegawai[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">ID Member</label>
                                <input class="form-control" v-model="deposit_umum.id_member" placeholder="Masukkan ID Member">
                                <!-- validation -->
                                <div v-if="validation.id_member" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.id_member[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Tanggal</label>
                                <input class="form-control" v-model="deposit_umum.tanggal" placeholder="Masukkan Tanggal" type="date">
                                <!-- validation -->
                                <div v-if="validation.tanggal" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.tanggal[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="formlabel">Deposit</label>
                                <input class="form-control" v-model="deposit_umum.deposit" placeholder="Masukkan Deposit" >
                                <!-- validation -->
                                <div v-if="validation.deposit" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.deposit[0] }}
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
        created(){
            this.id_member = this.$route.params.id_member
        },
        setup() {
            //state aktivasi_tahuan
            const deposit_umum = reactive({
                id_pegawai:'',
                id_member: '',
                // id_promo_umum: '',
                tanggal: '',
                deposit: '',
                // total_deposit: '',
                // bonus_deposit: '',
                // sisa_deposit: '',
            })

            //state validation
            const validation = ref([])
            //vue router
            
            const router = useRouter()
            //method store

            function store() {
                let id_pegawai = deposit_umum.id_pegawai
                let id_member = deposit_umum.id_member
                let tanggal = deposit_umum.tanggal
                let deposit = deposit_umum.deposit
                // let total_deposit = deposit_umum.total_deposit
                // let bonus_deposit = deposit_umum.bonus_deposit
                // let sisa_deposit = deposit_umum.sisa_deposit
                axios.post('https://pam.ppcdeveloper.com/api/deposit_umum', {
                    id_pegawai: id_pegawai,
                    id_member: id_member,
                    tanggal: tanggal,
                    deposit: deposit,
                    // total_deposit: total_deposit,
                    // bonus_deposit: bonus_deposit,
                    // sisa_deposit: sisa_deposit,
                }).then(() => {
                    //redirect ke post index
                    router.push({
                        name: 'deposit_umum.index'
                    })
                }).catch(error => {
                    //assign state validation with error
                    validation.value = error.response.data
                })
            }

            //return
            return {
                deposit_umum,
                validation,
                router,
                store,
            }
        }
    }
</script>
<style></style>