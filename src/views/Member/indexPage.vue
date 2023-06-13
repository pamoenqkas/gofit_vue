<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">MEMBER</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div v-if="show">
                                <div class="card-body">
                                <div class="alert alert-success d-flex align-items-center" role="alert" >
                                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                                    <div>
                                    <p v-show="show">
                                        Data Member Berhasil Dihapus
                                    </p>
                                    </div>
                                </div>
                                </div>
                            </div>
                        <h1>Table Member</h1>
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">NOMOR TELEPHONE </th>
                                    <th scope="col">ALAMAT </th>
                                    <th scope="col">EMAIL </th>
                                    <th scope="col">TANGGAL LAHIR </th>
                                    <th scope="col">DEPOSIT</th>
                                    <th scope="col">DEPOSIT KELAS</th>
                                    <th scope="col">MASA MEMBERSHIP</th>
                                    <th scope="col">TANGGAL DAFTAR MEMBERSHIP</th>
                                    <th scope="col">STATUS </th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(member, id_member) in members" :key="id_member">
                                    <td>{{ member.nama_member }}</td>
                                    <td>{{ member.no_telp_member }}</td>
                                    <td>{{ member.alamat_member }}</td>
                                    <td>{{ member.email_member }}</td>
                                    <td>{{ member.tanggal_lahir }}</td>
                                    <td>{{ member.deposit }}</td>
                                    <td>{{ member.deposit_kelas }}</td>
                                    <td>{{ member.masa_membership }}</td>
                                    <td>{{ member.tanggal_daftar }}</td>
                                    <td>{{ member.status }}</td>
                                    <td class="text-center">
                                    <router-link :to="{ name:
                                    'member.edit', params: { id_member: member.id_member } }" class="btn
                                    btn-sm btn-primary mr-1">
                                    <i class="bi bi-pencil"></i>    
                                    </router-link>
                                    <button class="btn btn-sm btn-danger ml-2 " @click.prevent="deleteMember(member.id_member)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h5>Table Member Kedalursa per Hari Ini</h5>
                        <!-- Untuk Nampilkin Masa Membership yang Kedaluarsa -->
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">MASA MEMBERSHIP</th>
                                    <th scope="col">STATUS </th>
                                    <!-- <th scope="col">AKSI</th> -->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(members, id_member) in members_expired" :key="id_member">
                                    <td>{{ members.nama_member }}</td>
                                    <td>{{ members.masa_membership }}</td>
                                    <td>{{ members.status }}</td>
                                    <!-- <td class="text-center">
                                    <button class="btn btn-sm btn-danger ml-2 " @click.prevent="resetExpiredToday()">
                                        <p>Reset Expired</p>
                                    </button>
                                    </td> -->
                                </tr>
                            </tbody>
                        </table>
                        <p align="right">
                                    <button class="btn btn-sm btn-danger ml-2 " @click.prevent="resetExpiredToday()">
                                        <p>Reset Expired</p>
                                    </button>
                                </p>
                        <h5>Table Masa Berlaku Deposit Kelas Kedalursa per Hari Ini</h5>
                        <!-- Untuk Nampilkin Masa Membership yang Kedaluarsa -->
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID DEPOSIT KELAS</th>
                                    <th scope="col">ID MEMBER</th>
                                    <th scope="col">DEPOSIT KELAS</th>
                                    <th scope="col">MASA BERLAKU </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(deposit_kelas_expired, id_deposit_kelas) in deposit_kelas_expired" :key="id_deposit_kelas">
                                    <td>{{ deposit_kelas_expired.id_deposit_kelas }}</td>
                                    <td>{{ deposit_kelas_expired.id_member }}</td>
                                    <td>{{ deposit_kelas_expired.deposit_kelas }}</td>
                                    <td>{{ deposit_kelas_expired.masa_berlaku }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p align="right">
                            <button class="btn btn-sm btn-danger ml-2 " @click.prevent="resetDepositKelasExpiredToday()">
                                        <p>Reset Expired Deposit Kelas</p>
                                    </button>
                        </p>
                    </div>
                        <p align="right">
                            <router-link :to="{name: 'member.create'}" class="btn btn-md-3 btn-success">Tambah
                                <i class="bi bi-file-plus"></i>
                            </router-link>
                            <!-- <button class="btn btn-sm btn-danger ml-2 " @click.prevent="showKadaluarsaMember()">
                                <p>Show Kadaluarsa</p>
                            </button> -->
                        </p>
                    </div>
                </div>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
    import axios from 'axios'
    import { onMounted, ref } from 'vue'
    import { useRouter } from 'vue-router'
    export default {
        setup() {
            //reactive state
            let members = ref([])
            let members_expired = ref([])
            let deposit_kelas_expired = ref([])
            const router = useRouter()

            //Untuk alert delete
            let show = ref(false);
            let showKadaluarsa = ref(false);
            const reloadTime = 1000000;
            //mounted
            onMounted(() => {            
            //get API from Laravel Backend
            axios.get('https://pam.ppcdeveloper.com/api/member').then(response => {
                //assign state posts with response data
                members.value = response.data.data
                }).catch(error => {
                    console.log(error.response)
                })
            axios.get('https://pam.ppcdeveloper.com/api/member/expired').then(response => {
                //assign state posts with response data
                // console.log(response)
                members_expired.value = response.data.data
                // showKadaluarsa.value = true;
                }).catch(error => {
                    console.log(error.response.data)
                })  
            axios.get('https://pam.ppcdeveloper.com/api/deposit_kelas/expired').then(response => {
                //assign state posts with response data
                // console.log(response)
                deposit_kelas_expired.value = response.data.data
                // showKadaluarsa.value = true;
                }).catch(error => {
                    console.log(error.response.data)
                })    
            })
            
            
            // function showKadaluarsaMember(){
            //     axios.get('http://localhost:8000/api/member/expired').then(response => {
            //     //assign state posts with response data
            //     console.log(response)
            //     members.value = response.data.data
            //     showKadaluarsa.value = true;
            //     }).catch(error => {
            //         console.log(error.response.data)
            //     })   
            // }
            
            function deleteMember($id_member){
                axios.delete('https://pam.ppcdeveloper.com/api/member' + $id_member).then(()=>{
                    //assign state posts with response data
                    show.value = true;
                    window.location.reload()
                }, reloadTime).catch(error => {
                    console.log(error.response.data)
                })            
            }

            function resetExpiredToday(){
                axios.put('https://pam.ppcdeveloper.com/api/member/expired').then(response => {
                //assign state posts with response data
                console.log(response)
                window.location.reload()
                }).catch(error => {
                    console.log(error.response.data)
                })      
            }

            function resetDepositKelasExpiredToday(){
                axios.put('https://pam.ppcdeveloper.com/api/deposit_kelas/expired').then(response => {
                //assign state posts with response data
                console.log(response)
                window.location.reload()
                }).catch(error => {
                    console.log(error.response.data)
                })      
            }
            
            return {
                members,
                members_expired,
                deposit_kelas_expired,
                deleteMember,
                router,
                show,
                showKadaluarsa,
                resetExpiredToday,
                resetDepositKelasExpiredToday,
                // showKadaluarsaMember,
            }
        }
    }
</script>
<style></style>