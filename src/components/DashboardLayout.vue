<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
  />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">

  <header
    class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
  >
    <div class="collapse" id="navbarToggleExternalContent">
      <div class="bg-dark p-4">
        <h5 class="text-white h5">
          <h5 class="  mt-3" v-if="role === 'R01'">Halo {{ pegawai.nama_pegawai }}!! - Kasir</h5>
          <h5 class="  mt-3" v-if="role === 'R02'">Halo {{ pegawai.nama_pegawai }}!! - Admin</h5>
          <h5 class="  mt-3" v-if="role === 'R03'">Halo {{ pegawai.nama_pegawai }} - MO</h5>
          </h5>
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">

            <!-- Tampilan pada dashboard layout hanya untuk Kasir -->
            <li class="nav-item" v-show="role === 'R01'" >
              <router-link :to="{ name: 'presensi_gym.index' }" class="nav-link text-white">Presensi Gym</router-link>
            </li>
            <li class="nav-item" v-show="role === 'R01'" >
              <router-link :to="{ name: 'presensi_kelas.index' }" class="nav-link text-white">Presensi Kelas</router-link>
            </li>
            <li class="nav-item" v-show="role === 'R01'" >
              <router-link :to="{ name: 'deposit_kelas.index' }" class="nav-link text-white">Deposit Kelas</router-link>
            </li>
            <li class="nav-item" v-show="role === 'R01'" >
              <router-link :to="{ name: 'aktivasi_tahunan.index' }" class="nav-link text-white">Aktivasi Tahunan</router-link>
            </li>
            <li class="nav-item" v-show="role === 'R01'" >
              <router-link :to="{ name: 'deposit_umum.index' }" class="nav-link text-white">Deposit umum</router-link>
            </li>
            <li class="nav-item" v-show="role === 'R01'" >
              <router-link :to="{ name: 'member.index' }" class="nav-link text-white">Member</router-link>
            </li>

            <!-- Tampilan pada dashboard layout hanya untuk Admin -->
            <li class="nav-item" v-show="role === 'R02'" >
              <router-link :to="{ name: 'instruktur.index' }" class="nav-link text-white">Instruktur</router-link>
            </li>
            <li class="nav-item" v-show="role === 'R02'" >
              <router-link :to="{ name: 'pegawai.index' }" class="nav-link text-white">Pegawai</router-link>
            </li>

            <!-- //Tampilan pada dashboard layout hanya untuk Manajemen Operasi -->
            <li class="nav-item" v-show="role === 'R03'" >
              <router-link :to="{ name: 'jadwal_harian.index' }" class="nav-link text-white">Jadwal Harian</router-link>
            </li>
            <li class="nav-item" v-show="role === 'R03'" >
              <router-link :to="{ name: 'izin.index' }" class="nav-link text-white">Izin Instruktur</router-link>
            </li>
            <li class="nav-item" v-show="role === 'R03'" >
              <router-link :to="{ name: 'aktivitas_gym_bulanan.index' }" class="nav-link text-white">Aktivitas Gym Bulanan</router-link>
            </li>
            <li class="nav-item" v-show="role === 'R03'" >
              <router-link :to="{ name: 'aktivitas_kelas_bulanan.index' }" class="nav-link text-white">Aktivitas Kelas Bulanan</router-link>
            </li>
            <li class="nav-item" v-show="role === 'R03'" >
              <router-link :to="{ name: 'laporan_pendapatan_bulanan.index' }" class="nav-link text-white">Laporan Pendapatan Bulanan</router-link>
            </li>
            <li class="nav-item" v-show="role === 'R03'" >
              <router-link :to="{ name: 'kinerja_instruktur_bulanan.index' }" class="nav-link text-white">Kinerja Instruktur Bulanan</router-link>
            </li>            
          </ul>
        </div>
      </div>
    </div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="true"
          aria-label="Toggle navigation"
          align="right"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  </header>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4"> 
          <!-- <h5 class="  mt-3" v-if="role === 'R01'">Halo {{ pegawai.nama_pegawai }}!!</h5>
          <h5 class="  mt-3" v-if="role === 'R01'">Sebagai Kasir</h5>
          <h5 class="  mt-3" v-if="role === 'R02'">Halo {{ pegawai.nama_pegawai }}!!</h5>
          <h5 class="  mt-3" v-if="role === 'R02'">Sebagai Admin</h5>
          <h5 class="  mt-3" v-if="role === 'R03'">Halo {{ pegawai.nama_pegawai }}!!</h5>
          <h5 class="  mt-3" v-if="role === 'R03'">Sebagai MO</h5> -->
          <!-- View Route -->
            <router-view></router-view>
        </main>

</template>


<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    let nama_user;
    let id_user;
    let id_role;
    let role = localStorage.getItem('role');

    const pegawai = ref([]);
    const router = useRouter();

    onMounted(() => {
      //get API from Laravel Backend
      axios.get("https://pam.ppcdeveloper.com/api/pegawai/" + localStorage.getItem("id"))
        .then((response) => {
          //assign state posts with response data
          pegawai.value = response.data.data;
          nama_user = pegawai.value["nama_pegawai"];
          id_user = pegawai.value["id_pegawai"];
          id_role = pegawai.value["id_role"];
          localStorage.setItem('Nama_user', nama_user);
          localStorage.setItem('Id_user', id_user);
          console.log(id_role);
        })
        .catch((error) => {
          console.log(error.response);
        });
    });

    function logout() {
      localStorage.removeItem("Role");
      localStorage.removeItem("Id_User");
      router.push({
        name: "login",
      });

    }

    return {
      pegawai,
      role,
      nama_user,
      logout,
    };
  },
};
</script>


<style>
body {
  font-size: 0.875rem;
}
.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}
/*
    * Sidebar
    */
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}
.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
}
.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}
.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #727272;
}
.sidebar .nav-link.active {
  color: #2470dc;
}
.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}
.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}
/*
    * Navbar
    */
.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}
.navbar .navbar-toggler {
  top: 0.25rem;
  right: 1rem;
}
.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}
.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}
.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>
