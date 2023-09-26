<template>
    <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
        <div class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <div class="d-flex align-items-center justify-content-center w-100">
            <div class="row justify-content-center w-100">
              <div class="col-md-8 col-lg-6 col-xxl-3">
                <div class="card mb-0">
                  <div class="card-body">
                    <a href="index.html" class="text-nowrap logo-img text-center d-block mb-5 w-100">
                      <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/logos/dark-logo.svg" width="180" alt="">
                    </a>
                    <form>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input type="email" v-model="credentials.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                      </div>
                      <div class="mb-4">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" v-model="credentials.password" class="form-control" id="exampleInputPassword1">
                      </div>
                      <div class="d-flex align-items-center justify-content-between mb-4">
                        <div class="form-check">
                          <input class="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" checked>
                          <label class="form-check-label text-dark" for="flexCheckChecked">
                            Remeber this Device
                          </label>
                        </div>
                        <a class="text-primary fw-medium" href="authentication-forgot-password.html">Forgot Password ?</a>
                      </div>
                      <button type="submit" @click.prevent="attemptLogin()" :disabled="flagTrigger" class="btn btn-primary w-100 py-8 mb-4 rounded-2">
                        
                        <span>{{ flagTrigger == true ? 'Signing In...' : 'Sign In' }}</span>
                        &nbsp;&nbsp;
                        <span
                        v-if="flagTrigger"
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                        ></span>
                      </button>
                      <div class="d-flex align-items-center justify-content-center">
                        <p class="fs-4 mb-0 fw-medium">New to Modernize?</p>
                        <a class="text-primary fw-medium ms-2" href="authentication-register.html">Create an account</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api'
import Cookies from 'js-cookie'

export default defineComponent({
    setup () {
        const router = useRouter()
        const credentials = ref({
            email: '',
            password: ''
        })
        const flagTrigger = ref(false)

        const attemptLogin = async () => {
            flagTrigger.value = true
           

            try {
                const response = await api.post('/auth/login', {
                email: credentials.value.email,
                password: credentials.value.password
                })

                if (response.data.status == 'success') {
                    const token = response.data.authorization.token
                    Cookies.set('auth_token', token, { expires: 1 / 24 })
                    router.push({ name: 'dashboard' })
                }else{
                    alert(response.status.message)
                    flagTrigger.value = false
                }
                
            } catch (error) {
                console.log('Error: ', error)
                flagTrigger.value = false
            }

            
        }

        return { 
            credentials, 
            flagTrigger,
            attemptLogin 
        }
    }
})
</script>

<style scoped>

</style>