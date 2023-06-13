<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
  />
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
    crossorigin="anonymous"
  />
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">
                  Please enter your login and password!
                </p>
                <form @submit.prevent="store()">
                  <div class="form-outline form-white mb-4">
                    <input
                      v-model="login.email"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="typeEmailX">Email</label>
                    <div v-if="validation.email" class="mt-2 alert alert-danger">
                      {{ validation.email[0] }}
                    </div>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input
                      v-model="login.password"
                      type="password"
                      id="typePasswordX"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="typePasswordX">Password</label>
                    <div v-if="validation.password" class="mt-2 alert alert-danger">
                      {{ validation.password[0] }}
                    </div>
                  </div>
                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="toast align-items-center text-white bg-danger"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      :class="{ show: snackbar.show }"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ snackbar.message }}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="snackbar.show = false"
        ></button>
      </div>
    </div>
    <div
      class="toast align-items-center text-white bg-success"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      :class="{ show: loginSuccess }"
    >
      <div class="d-flex">
        <div class="toast-body">
          Login successful.
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="loginSuccess = false"
        ></button>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2';


export default {
  setup() {
    const login = reactive({
      email: '',
      password: '',
    })

    const validation = ref([])
    const router = useRouter()
    const loginSuccess = ref(false)
    const snackbar = reactive({
      show: false,
      message: '',
    })

    function store() {
      let email = login.email
      let password = login.password
      axios
        .post('https://pam.ppcdeveloper.com/api/login', {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem('role', response.data.role)
            localStorage.setItem('id', response.data.id)
            router.push({
              name: 'beranda',
              params: {
                type: 'success',
                // text: 'Login Berhasil',
              },
            })
            Swal.fire({
              title: 'Login Berhasil',
              width: 600,
              padding: '3em',
              color: '#716add',
              background: '#fff url(/images/trees.png)',
              backdrop: `
                rgba(0,0,123,0.4)
                url("/images/nyan-cat.gif")
                left top
                no-repeat
              `
            })
            loginSuccess.value = true
            setTimeout(() => {
              loginSuccess.value = false
            }, 3000) // Menutup pop-up setelah 3 detik
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Login Gagal',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
            validation.value = response.data.errors
            // snackbar.message = 'Login failed.'
            // snackbar.show = true
          }
        })
        .catch((error) => {
          Swal.fire({
              icon: 'error',
              title: 'Login Gagal',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
          validation.value = error.response.data
          // snackbar.message = 'Login failed.'
          // snackbar.show = true
        })
    }

    return {
      login,
      validation,
      router,
      store,
      loginSuccess,
      snackbar,
    }
  },
}
</script>

<style></style>
