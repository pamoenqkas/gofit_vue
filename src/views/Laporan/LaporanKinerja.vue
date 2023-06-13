<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3">
        <h1 class="h2">Kinerja Instruktur Bulanan</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body" ref="content">
                        <h2>GoFit</h2>
                        <h4>Jl. Centralpark No. 10 Yogyakarta</h4>
                        <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3">
                            <h3><b><u>Laporan Kinerja Instruktur Bulanan</u></b></h3>
                        </div>
                        <!-- <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3">
                            <h5 class="h5">Bulan : {{ bulan }} - Periode : {{ tahun }}</h5>
                        </div> -->
                        <div class="border-bottom">
                            <h5>Tanggal : {{ tanggal_cetak }}</h5>
                        </div>
                        <table class="styled-table" border="2">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Jumlah Hadir</th>
                                    <th scope="col">Jumlah Libur</th>
                                    <th scope="col">Waktu Terlambat (detik)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(kinerja_instruktur_bulanan, id) in kinerja_instruktur_bulanan" :key="id">
                                    <td>{{ kinerja_instruktur_bulanan.nama_instruktur }}</td>
                                    <td>{{ kinerja_instruktur_bulanan.jumlah_hadir }}</td>
                                    <td>{{ kinerja_instruktur_bulanan.jumlah_libur }}</td>
                                    <td>{{ kinerja_instruktur_bulanan.total_terlambat}}</td>
                                    <!-- <tr>
                                        <td colspan="3" class="text-end">Total Semua</td>
                                        <td>{{ totalSemua }}</td>
                                    </tr> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button class="btn btn-md-3 btn-success" @click="downloadPDF()">Cetak Laporan Kinerja</button>
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
            let kinerja_instruktur_bulanan = ref([])
            let tahun = ref([])
            let bulan = ref([])
            let tanggal_cetak = ref([])
        
            const router = useRouter()

            //mounted
            onMounted(() => {            
            //get API from Laravel Backend
            axios.post('https://pam.ppcdeveloper.com/api/kinerja_instruktur_bulanan').then(response => {
                //assign state posts with response data
                kinerja_instruktur_bulanan.value = response.data.data
                bulan.value = response.data.bulan
                tahun.value = response.data.tahun
                tanggal_cetak.value = response.data.tanggal_cetak
                }).catch(error => {
                    console.log(error.response.data)
                })
            })
            
            //return
            return {
                kinerja_instruktur_bulanan,
                tahun,
                bulan,
                router,
                tanggal_cetak,
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