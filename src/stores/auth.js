import axios from 'axios'
import { defineStore } from 'pinia'
import {useToast} from 'vue-toast-notification';
import '../../node_modules/vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();

const displayError = (message) => {
    $toast.error(message, {
        position: 'top',
        duration: 2000,
    })
}

const displaySuccess = (message) => {
    $toast.success(message, {
        position: 'top',
        duration: 2000,
    })
}

const app_url = "https://646e-2001-f40-908-f8f-f89f-641e-4f13-94cc.ngrok-free.app";

export const useAuthStore = defineStore('auth', {
    state: ()=> ({
        authUser: null,
        lockButton: false,
        authUserInfo: null,
    }),
    // persist: true,
    persist: {
        storage: sessionStorage,
    },
    getters: {
        user: (state)=> state.authUser,
        userDetail: (state)=> state.authUserInfo
    },
    actions: {
        async userLogin(data) {
            this.lockButton = true

            try {
            
                await axios.post(`${app_url}/api/employee/login`, { username: data.username, code: data.password, type: data.type })
                .then((response)=> {
                    this.authUser = response.data.data
                    this.lockButton = false
                    this.userInfo()
                    displaySuccess("Login success!")
                    this.router.push('/'); 
                })
                .catch((error)=> {
                    
                    if(error.response.data.message.username){
                        displayError(error.response.data.message.username[0])
                    }

                    if(error.response.data.message.password){
                        displayError(error.response.data.message.password[0])
                    }

                    if(error.response.data.message.login){
                        displayError(error.response.data.message.login)
                    }


                    this.lockButton = false

                });

            } catch (error) {
                
                displayError(error)
                this.lockButton = false

            }

        },
        async userLogout() {

            const token = this.authUser.token;

            const response = await axios.post(`${app_url}/api/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "ngrok-skip-browser-warning":"any"
                }
            })
            .catch((error)=> {
                console.log(error)
            })

            this.authUser = null
            this.authUserInfo = null
            displaySuccess("Logout success!")
            this.router.push('/login'); 

        },
        async userInfo() {

            const token = this.authUser.token

            const sample = await axios.get(`${app_url}/api/employee/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "ngrok-skip-browser-warning":"any"
                }
            })
            .then((response)=> {
                this.authUserInfo = response.data.data
            })
            .catch((error)=> {
                console.log(error)
            })

        },
        async userRegister(data) {
            this.lockButton = true

            try {
            
                await axios.post(`${app_url}/api/employee/register`, data)
                .then((response)=> {
                    this.authUser = response.data.data
                    this.lockButton = false
                    this.userInfo()
                    displaySuccess("Register success!")
                    this.router.push('/'); 
                })
                .catch((error)=> {

                    console.log(error)
                    
                    if(error.response.data.message.username){
                        displayError(error.response.data.message.username[0])
                    }

                    if(error.response.data.message.password){
                        displayError(error.response.data.message.password[0])
                    }

                    if(error.response.data.message.register){
                        displayError(error.response.data.message.register)
                    }

                    this.lockButton = false

                });

            } catch (error) {
                
                console.log(error)
                displayError(error)
                this.lockButton = false

            }

        },
        async userUpdateProfile(data) {

            this.lockButton = true
            const token = this.authUser.token

            try {

                const response = await axios.post(`${app_url}/api/employee/update-profile`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "ngrok-skip-browser-warning":"any"
                    }
                })
                .then((response)=> {
                    this.authUserInfo = response.data.data
                    this.lockButton = false
                    displaySuccess("Update profile success!")
                })
                .catch((error)=> {

                    if(error.response.data.message.name){
                        displayError(error.response.data.message.name[0])
                    }
                    else {
                        displayError(error.response.data.message);
                    }

                    this.lockButton = false
                })
                    
            } catch (error) {

                // displayError(error)
                this.lockButton = false
                
            }

        },
    }
})