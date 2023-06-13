//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a routes
const routes = [
  {
    path: "/",
    name: "login_page",
    component: () => import("@/components/loginPage.vue"),
  },
  {
    path: "/",
    name: "beranda",
    component: () => import("@/components/DashboardLayout.vue"),
    children: [
      {
        path: "/member",
        name: "member.index",
        component: () => import("@/views/Member/indexPage.vue"),
        // meta: { requiresAuth: true, role: 'Kasir' },
      },
      {
        path: "/member/create",
        name: "member.create",
        component: () => import("@/views/Member/createPage.vue"),
        // meta: { requiresAuth: true, role: 'Kasir' },
      },
      {
        path: "/member/edit",
        name: "member.edit",
        component: () => import("@/views/Member/editPage.vue"),
        // meta: { requiresAuth: true, role: 'Kasir' },
      },
      {
        path: "/instruktur",
        name: "instruktur.index",
        component: () => import("@/views/Instruktur/indexPage.vue"),
        // meta: { requiresAuth: true, role: 'Kasir' },
      },
      {
        path: "/instruktur/create",
        name: "instruktur.create",
        component: () => import("@/views/Instruktur/createPage.vue"),
      },
      {
        path: "/instruktur/edit:id_instruktur",
        name: "instruktur.edit",
        component: () => import("@/views/Instruktur/editPage.vue"),
      },
      {
        path: "/pegawai",
        name: "pegawai.index",
        component: () => import("@/views/Pegawai/indexPage.vue"),
      },
      {
        path: "/pegawai/create",
        name: "pegawai.create",
        component: () => import("@/views/Pegawai/createPage.vue"),
      },
      {
        path: "/pegawai/edit",
        name: "pegawai.edit",
        component: () => import("@/views/Pegawai/editPage.vue"),
      },
      {
        path: "/kelas",
        name: "kelas.index",
        component: () => import("@/views/Kelas/indexPage.vue"),
      },
      {
        path: "/kelas/create",
        name: "kelas.create",
        component: () => import("@/views/Kelas/createPage.vue"),
      },
      {
        path: "/kelas/edit",
        name: "kelas.edit",
        component: () => import("@/views/Kelas/editPage.vue"),
      },
      {
        path: "/jadwal_umum",
        name: "jadwal_umum.index",
        component: () => import("@/views/JadwalUmum/indexPage.vue"),
      },
      {
        path: "/jadwal_umum/create",
        name: "jadwal_umum.create",
        component: () => import("@/views/JadwalUmum/createPage.vue"),
      },
      {
        path: "/jadwal_umum/edit",
        name: "jadwal_umum.edit",
        component: () => import("@/views/JadwalUmum/editPage.vue"),
      },
      {
        path: "/jadwal_harian",
        name: "jadwal_harian.index",
        component: () => import("@/views/JadwalHarian/indexPage.vue"),
      },
      {
        path: "/jadwal_harian/create",
        name: "jadwal_harian.create",
        component: () => import("@/views/JadwalHarian/createPage.vue"),
      },
      {
        path: "/jadwal_harian/edit",
        name: "jadwal_harian.edit",
        component: () => import("@/views/JadwalHarian/editPage.vue"),
      },
      {
        path: "/aktivasi_tahunan",
        name: "aktivasi_tahunan.index",
        component: () => import("@/views/AktivasiTahunan/indexPage.vue"),
      },
      {
        path: "/aktivasi_tahunan/create",
        name: "aktivasi_tahunan.create",
        component: () => import("@/views/AktivasiTahunan/createPage.vue"),
      },
      {
        path: "/aktivasi_tahunan/edit",
        name: "aktivasi_tahunan.edit",
        component: () => import("@/views/AktivasiTahunan/editPage.vue"),
      },
      {
        path: "/deposit_umum",
        name: "deposit_umum.index",
        component: () => import("@/views/DepositUmum/indexPage.vue"),
      },
      {
        path: "/deposit_umum/create",
        name: "deposit_umum.create",
        component: () => import("@/views/DepositUmum/createPage.vue"),
      },
      {
        path: "/deposit_kelas",
        name: "deposit_kelas.index",
        component: () => import("@/views/DepositKelas/indexPage.vue"),
      },
      {
        path: "/deposit_kelas/create",
        name: "deposit_kelas.create",
        component: () => import("@/views/DepositKelas/createPage.vue"),
      },
      {
        path: "/izin",
        name: "izin.index",
        component: () => import("@/views/Izin/indexPage.vue"),
      },
      {
        path: "/izin/edit",
        name: "izin.edit",
        component: () => import("@/views/Izin/editPage.vue"),
      },
      {
        path: "/presensi_gym",
        name: "presensi_gym.index",
        component: () => import("@/views/PresensiGym/indexPage.vue"),
      },
      {
        path: "/presensi_kelas",
        name: "presensi_kelas.index",
        component: () => import("@/views/PresensiKelas/indexPage.vue"),
      },
      {
        path: "/laporan_pendapatan_bulanan",
        name: "laporan_pendapatan_bulanan.index",
        component: () => import("@/views/Laporan/LaporanPendapatan.vue"),
        // meta: { requiresAuth: true, role: 'Manajemen Operasi' },
      },
      {
        path: "/aktivitas_kelas_bulanan",
        name: "aktivitas_kelas_bulanan.index",
        component: () => import("@/views/Laporan/LaporanKelas.vue"),
        // meta: { requiresAuth: true, role: 'Manajemen Operasi' },
      },
      {
        path: "/aktivitas_gym_bulanan",
        name: "aktivitas_gym_bulanan.index",
        component: () => import("@/views/Laporan/LaporanGym.vue"),
        // meta: { requiresAuth: true, role: 'Manajemen Operasi' },
      },
      {
        path: "/kinerja_instruktur_bulanan",
        name: "kinerja_instruktur_bulanan.index",
        component: () => import("@/views/Laporan/LaporanKinerja.vue"),
        // meta: { requiresAuth: true, role: 'Manajemen Operasi' },
      },
      {
        path: "/login",
        name: "login.index",
        component: () => import("@/components/loginPage.vue"),
      },
    ],
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // config routes
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//   const role = to.meta.role;

//   if (requiresAuth && !isLoggedIn()) {
//       next('/login');
//   } else if (role && !hasRole(role)) {
//       next('/login');
//   } else {
//       next();
//   }
// });

// function isLoggedIn() {
//   // Periksa apakah ada token atau sesi yang valid
//   // Misalnya, jika menggunakan token, Anda dapat memeriksa keberadaan dan kevalidan token di localStorage atau sessionStorage
//   const token = localStorage.getItem('token');
//   return !!token; // Mengembalikan true jika token ditemukan, sebaliknya false
// }

// function hasRole(role) {
//   // Periksa peran pengguna
//   // Misalnya, jika menggunakan token dengan informasi peran, Anda dapat memeriksa apakah peran pengguna cocok dengan peran yang diperlukan
//   const userRole = localStorage.getItem('role');
//   return userRole === role; // Mengembalikan true jika peran pengguna cocok, sebaliknya false
// }

export default router;
