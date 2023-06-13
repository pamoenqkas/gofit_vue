<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Edit member</h4>
                        <hr>
                        <form @submit.prevent="edit(this.id_member)">
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
                                <label for="content">Masa Membership Member</label>
                                <input class="form-control" v-model="member.masa_membership" placeholder="Masukkan Masa Membership Member" type="date">
                                <!-- validation -->
                                <div v-if="validation.masa_membership" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.masa_membership[0] }}
                                </div>
                            </div>
                             <div class="form-group mb-3">
                                <label class="form-label">Tanggal Daftar Member</label>
                                <input class="form-control" v-model="member.tanggal_daftar" placeholder="Masukkan Tanggal Daftar Member" type="date">
                                <!-- validation -->
                                <div v-if="validation.tanggal_daftar" class="mt-2 alert alert-danger">
                                    {{ 
                                        validation.tanggal_daftar[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" >Status Member</label>
                                <input class="form-control" v-model="member.status" placeholder="Masukkan Status Member" >
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
            this.id_member = this.$route.params.id_member
        },
    setup() {
        //reactive state
        let member = ref([]);
        const router = useRouter()
        const route = useRoute()

        const validation = ref([])

        //mounted
        onMounted(() => {
        //get API from Laravel Backend
        axios
            .get(`https://pam.ppcdeveloper.com/api/member/${route.params.id_member}`,)
            .then((response) => {
            //assign state posts with response data
            member.value.nama_member        = response.data.data.nama_member
            member.value.no_telp_member     = response.data.data.no_telp_member
            member.value.alamat_member      = response.data.data.alamat_member
            member.value.email_member       = response.data.data.email_member
            member.value.tanggal_lahir      = response.data.data.tanggal_lahir
            member.value.deposit            = response.data.data.deposit
            member.value.masa_membership    = response.data.data.masa_membership
            member.value.tanggal_daftar     = response.data.data.tanggal_daftar
            member.value.status             = response.data.data.status
            })
            .catch((error) => {
            console.log(error.response.data)
            })
        })

        function edit($id_member) {
            let nama_member = member.value.nama_member
            let no_telp_member = member.value.no_telp_member
            let alamat_member = member.value.alamat_member
            let email_member = member.value.email_member
            let tanggal_lahir = member.value.tanggal_lahir
            let deposit = member.value.deposit
            let masa_membership = member.value.masa_membership
            let tanggal_daftar = member.value.tanggal_daftar
            let status = member.value.status
            let password = member.value.password

            axios.put('https://pam.ppcdeveloper.com/api/member/' + $id_member, {
                    nama_member: nama_member,
                    no_telp_member: no_telp_member,
                    alamat_member: alamat_member,
                    email_member: email_member,
                    tanggal_lahir: tanggal_lahir,
                    deposit: deposit,
                    masa_membership: masa_membership,
                    tanggal_daftar: tanggal_daftar,
                    status: status,
                    password: password,
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'member.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
                console.log(error.response.data)
            })
        }

        //return
        return {
        member,
        edit,
        router,
        validation
        }
    },
        }
    </script>
    <style></style>