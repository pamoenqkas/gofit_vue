<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body" ref="content">
                        <h2>GoFit</h2>
                        <h4>Jl. Centralpark No. 10 Yogyakarta</h4>
                        <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3">
                            <h3><b><u>Laporan Pendapatan Bulanan</u></b></h3>
                        </div>
                            <h5>Periode : {{ tahun }}</h5>
                        <div class="border-bottom">
                            <h5>Tanggal : {{ tanggal_cetak }}</h5>
                        </div>
                        <table class="styled-table" border="1">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Bulan</th>
                                    <th scope="col">Aktivasi</th>
                                    <th scope="col">Deposit</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(laporan_pendapatan_bulanan, id_laporan_pendapatan_bulanan) in laporan_pendapatan_bulanan" :key="id_laporan_pendapatan_bulanan">
                                    <td>{{ laporan_pendapatan_bulanan.bulan }}</td>
                                    <td>{{ laporan_pendapatan_bulanan.aktivasi_tahunan }}</td>
                                    <td>{{ laporan_pendapatan_bulanan.total }}</td>
                                    <td>{{ laporan_pendapatan_bulanan.total_aktivasi_deposit}}</td>
                                    <!-- <tr>
                                        <td colspan="3" class="text-end">Total Semua</td>
                                        <td>{{ totalSemua }}</td>
                                    </tr> -->
                                </tr>
                                <tr>
                                <td colspan="3"><b>Total</b></td>
                                <td>{{ total_semua }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button class="btn btn-md-3 btn-success" @click="downloadPDF()">Cetak Laporan Pendapatan</button>
                </div>
                <div class="container mt-5">
                <div class="col-md-12">
                    <div class="card border-0 rounded shadow">
                        <div class="card-body">
                            <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3" ref="graph">
                                <h3><b><u>Graph Laporan Bulanan</u></b></h3>
                                <canvas id="myChart"></canvas>
                            </div>
                            </div>  
                                <button class="btn btn-md-3 btn-success" @click="downloadGraph()">Cetak Graph</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import axios from 'axios'
    import jsPDF from'jspdf';
    import { onMounted, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import Chart from 'chart.js/auto'


    export default {
        setup() {
            //reactive state
            let laporan_pendapatan_bulanan = ref([])
            let tahun = ref([])
            let tanggal_cetak = ref([])
            let total_semua = ref([])
        
            const router = useRouter()


            //mounted
            onMounted(() => {            
            //get API from Laravel Backend
            axios.post('https://pam.ppcdeveloper.com/api/laporan_pendapatan_bulanan').then(response => {
                //assign state posts with response data
                laporan_pendapatan_bulanan.value = response.data.data
                tahun.value = response.data.tahun
                tanggal_cetak.value = response.data.tanggal_cetak
                total_semua.value = response.data.total_semua
                const ctx = document.getElementById('myChart');

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                    labels: laporan_pendapatan_bulanan.value.map(item => item.bulan),
                    datasets: [{
                        label: '# Total Perbulannya',
                        data: laporan_pendapatan_bulanan.value.map(item => item.total_aktivasi_deposit),
                        borderWidth: 1
                    }]
                    },
                    options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                    }
                });
                }).catch(error => {
                    console.log(error.response.data)
                })
            })  
            
            //return
            return {
                laporan_pendapatan_bulanan,
                tahun,
                router,
                tanggal_cetak,
                total_semua
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
            },
            downloadGraph() {
                const canvas = this.$refs.graph.querySelector('#myChart');
                
                // Simpan latar belakang asli
                const originalBackgroundColor = canvas.style.backgroundColor;
                
                // Setel latar belakang menjadi putih
                canvas.style.backgroundColor = 'white';
                
                const imageURI = canvas.toDataURL('image/jpeg', 1.0);
                
                const pdf = new jsPDF();
                pdf.addImage(imageURI, 'JPEG', 10, 10, 190, 100);
                pdf.save('graph.pdf');
                
                // Kembalikan latar belakang ke nilai aslinya setelah mencetak selesai
                canvas.style.backgroundColor = originalBackgroundColor;
            },
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
    }
</style>