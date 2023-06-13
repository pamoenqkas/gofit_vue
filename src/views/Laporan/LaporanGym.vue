<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3><b>Aktivitas GYM Bulanan</b></h3>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body" ref="content">
                        <h2>GoFit</h2>
                        <h4>Jl. Centralpark No. 10 Yogyakarta</h4>
                        <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3">
                            <h3><b><u>Laporan GYM Bulanan</u></b></h3>
                        </div>
                            <h5>Periode : {{ tahun }}</h5>
                            <h5>Tanggal : {{ tanggal }}</h5>
                        <div class="border-bottom">
                            <h5>bulan : {{ bulan }}</h5>
                        </div>
                        <table class="styled-table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Tanggal</th>
                                    <th scope="col">Jumlah Member</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(aktivitas_gym_bulanan, id) in aktivitas_gym_bulanan" :key="id">
                                    <td>{{ aktivitas_gym_bulanan.tanggal }}</td>
                                    <td>{{ aktivitas_gym_bulanan.jumlah_member }}</td>
                                    <!-- <tr>
                                        <td colspan="3" class="text-end">Total Semua</td>
                                        <td>{{ totalSemua }}</td>
                                    </tr> -->
                                </tr>
                                <tr>
                                    <td colspan="1"><b>Total</b></td>
                                <td>
                                    {{ total_semua }}
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button class="btn btn-md-3 btn-success" @click="downloadPDF()">Cetak Laporan GYM</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { onMounted, ref } from 'vue'
    import { useRouter } from 'vue-router'

    export default {
        setup() {
            //reactive state
            let aktivitas_gym_bulanan = ref([])
            let tahun = ref([])
            let bulan = ref([])
            let tanggal = ref([])
            let total_semua = ref([])
        
            const router = useRouter()

            //mounted
            onMounted(() => {            
            //get API from Laravel Backend
            axios.post('https://pam.ppcdeveloper.com/api/aktivitas_gym_bulanan').then(response => {
                //assign state posts with response data
                aktivitas_gym_bulanan.value = response.data.data
                bulan.value = response.data.bulan
                tahun.value = response.data.tahun
                tanggal.value = response.data.tanggal
                total_semua.value = response.data.total_semua
                }).catch(error => {
                    console.log(error.response.data)
                })
            })  
            
            //return
            return {
                aktivitas_gym_bulanan,
                tahun,
                bulan,
                router,
                tanggal,
                total_semua,
            }
        },methods:{
            downloadPDF(){
                var html = this.$refs.content;
                let clonedTable = html.cloneNode(true);
                clonedTable.classList.remove("styled-table");
                let printWindow = window.open("");
                printWindow.document.write(`
                    <html>
                    <head>
                        <style>
                        .styled-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                        font-size: 14px;
                        }

                        .styled-table th, .styled-table td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        }

                        .styled-table th {
                        background-color: #f2f2f2;
                        text-align: left;
                        }

                        .styled-table tr:nth-child(even) {
                        background-color: #f9f9f9;
                        }

                        .styled-table tr:hover {
                        background-color: #f5f5f5;
                        }
                        </style>
                    </head>
                    <body>
                        ${clonedTable.outerHTML}
                    </body>
                    </html>
                `);
                printWindow.document.close();
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                }, 500);
            }
        }
        }
</script>
<style>
    .styled-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-size: 14px;
    }

    .styled-table th, .styled-table td {
    border: 1px solid #ddd;
    padding: 8px;
    }

    .styled-table th {
    background-color: #f2f2f2;
    text-align: left;
    }

    .styled-table tr:nth-child(even) {
    background-color: #f9f9f9;
    }

    .styled-table tr:hover {
    background-color: #f5f5f5;
}</style>