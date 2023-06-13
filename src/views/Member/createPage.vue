<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH Member</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama member</label>
                                <input class="form-control" v-model="member.nama_member" placeholder="Masukkan nama member">
                                <!-- validation -->
                                <div v-if="validation.nama_member" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.nama_member[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Nomo Telephone member</label>
                                <input class="form-control" v-model="member.no_telp_member" placeholder="Masukkan Nomor Telephone Member">
                                <!-- validation -->
                                <div v-if="validation.no_telp_member" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.no_telp_member[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Alamat Member</label>
                                <input class="form-control" v-model="member.alamat_member" placeholder="Masukkan Alamat Member">
                                <!-- validation -->
                                <div v-if="validation.alamat_member" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.alamat_member[0] }}
                                </div>
                            </div>
                              <div class="form-group mb-3">
                                <label class="form-label">Email Member</label>
                                <input class="form-control" v-model="member.email_member" placeholder="Masukkan Email Member">
                                <!-- validation -->
                                <div v-if="validation.email_member" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.email_member[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Tanggal Lahir Member</label>
                                <input class="form-control" v-model="member.tanggal_lahir" placeholder="Masukkan Tanggal Lahir Member" type="date">
                                <!-- validation -->
                                <div v-if="validation.tanggal_lahir" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.tanggal_lahir[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Deposit Member</label>
                                <input class="form-control" v-model="member.deposit" placeholder="Masukkan Deposit Member">
                                <!-- validation -->
                                <div v-if="validation.deposit" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.deposit[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Deposit Kelas Member</label>
                                <input class="form-control" v-model="member.deposit_kelas" placeholder="Masukkan Deposit Member">
                                <!-- validation -->
                                <div v-if="validation.deposit_kelas" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.deposit_kelas[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" >Password Member</label>
                                <input class="form-control" v-model="member.password" placeholder="Masukkan Password Member" type="password">
                                <!-- validation -->
                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.password[0] }}
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
        setup() {
            //state member
            const member = reactive({
                id_member:'',
                nama_member: '',
                no_telp_member: '',
                alamat_member: '',
                email_member: '',
                tanggal_lahir:'',
                deposit: '',
                deposit_kelas: '',
                password:'',
            })

            //state validation
            const validation = ref([])
            //vue router
            
            const router = useRouter()
            //method store

            function store() {
                let id_member = member.id_member
                let nama_member = member.nama_member
                let no_telp_member = member.no_telp_member
                let alamat_member = member.alamat_member
                let email_member = member.email_member
                let tanggal_lahir = member.tanggal_lahir                
                let deposit = member.deposit
                let deposit_kelas = member.deposit_kelas
                let password = member.password

                axios.post('https://pam.ppcdeveloper.com/api/member/', {
                    id_member: id_member,
                    nama_member: nama_member,
                    no_telp_member: no_telp_member,
                    alamat_member: alamat_member,
                    email_member: email_member,
                    tanggal_lahir: tanggal_lahir,
                    deposit: deposit,
                    deposit_kelas: deposit_kelas,
                    password: password,
                }).then(() => {
                    //redirect ke post index
                    router.push({
                        name: 'member.index'
                    })
                }).catch(error => {
                    //assign state validation with error
                    validation.value = error.response.data
                    console.log('Objek belum didefinisikan atau nilai nya tidak valid.');
                })
            }

            //return
            return {
                member,
                validation,
                router,
                store
            }
        }
    }
</script>
<style></style>
