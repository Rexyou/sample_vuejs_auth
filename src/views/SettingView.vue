<template>
  <div>
    <h1 class="text-center text-5xl pt-10">Setting</h1>
    <form>
      <div class="bg-white overflow-hidden shadow rounded-lg border w-3/4 mx-auto mt-14">
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ userInfo.name ?? 'User' }} Profile
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                This is some information about the {{ userInfo.name ?? 'User' }}.
            </p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Full name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input v-if="controller.edit" type="text" class="border-2 border-black px-2 w-full" v-model="form.name">
                      <span v-else class="px-2">{{ userInfo.name }}</span>
                      <span v-for="error in v$.name.$errors" :key="error.$uid" class="text-red-600">
                        {{ error.$message }} <br/>
                      </span>
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Email address
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input v-if="controller.edit" type="text" class="border-2 border-black px-2 w-full" v-model="form.email">
                        <span v-else class="px-2">{{ userInfo.email }}</span>
                        <span v-for="error in v$.email.$errors" :key="error.$uid" class="text-red-600">
                                {{ error.$message }} <br/>
                        </span>
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Phone number
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input v-if="controller.edit" type="text" class="border-2 border-black px-2 w-full" v-model="form.phone">
                        <span v-else class="px-2">{{ userInfo.phone }}</span>
                        <span v-for="error in v$.phone.$errors" :key="error.$uid" class="text-red-600">
                                {{ error.$message }} <br/>
                        </span>
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Address
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input v-if="controller.edit" type="text" class="border-2 border-black px-2 w-full" v-model="form.address">
                        <span v-else class="px-2">{{ userInfo.address }}</span>
                        <span v-for="error in v$.address.$errors" :key="error.$uid" class="text-red-600">
                                {{ error.$message }} <br/>
                        </span>
                    </dd>
                </div>
            </dl>
        </div>
      </div>

      <div class="w-3/4 mx-auto">
        <button v-if="controller.edit == false" class="bg-green-400 w-40 mt-5 py-3 mr-auto text-center rounded-lg" @click="editAction">Edit</button>
        <button v-if="controller.edit == true" class="bg-red-400 w-40 mt-5 py-3 mr-auto text-center rounded-lg" @click="editAction">Cancel</button>
        <button v-if="controller.edit == true" class="bg-blue-400 w-40 mt-5 py-3 mr-auto text-center rounded-lg ml-5" @click.prevent="submit" :disabled="authStore.lockButton">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
  import useVuelidate from "@vuelidate/core";
  import { reactive, computed } from "vue";
  import { useAuthStore } from "../stores/auth";
  import { alpha, email, helpers, minLength, maxLength } from "@vuelidate/validators";
  import {useToast} from 'vue-toast-notification';
  import '../../node_modules/vue-toast-notification/dist/theme-sugar.css';

  const authStore = useAuthStore()
  // authStore.userInfo()

  let userInfo = authStore.userDetail

  const controller = reactive({
    edit: false
  })

  const form = reactive({
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    address: userInfo.address,
  })

  const editAction = () => {
    controller.edit = !controller.edit

    if(controller.edit === false){
      Object.assign(form, authStore.userDetail)
    }
  }

  const $toast = useToast();

  const name_format = helpers.regex(/^[a-zA-Z\s\'\@]+$/)

  const phone_format = helpers.regex(/^\+60\d{1,2}?[-]?\d{7,8}$/)

  const address_format = helpers.regex(/^[a-zA-Z\d\s\,\-\'\_\.]+$/)

  const rules = computed(()=> {
    return {
      name: { name_format: helpers.withMessage("Name format invalid!", name_format), minLength: minLength(1) },
      email: { email },
      phone: { phone_format: helpers.withMessage("Phone number format invalid!", phone_format), minLength: minLength(11), maxLength: maxLength(13) },
      address: { address_format: helpers.withMessage("Address format invalid!", address_format), maxLength: maxLength(300) }
    }
  })

  const v$ = useVuelidate(rules, form);

  const submit = async () => {

    const result = await v$.value.$validate();

    if(result){

      let new_form = {}

      for(const key in form){
        for(const key2 in userInfo){
          if(key === key2 && (form[key] !== userInfo[key] && form[key] != null)){
            new_form[key] = form[key]
          }
        }
      }

      if(Object.keys(new_form).length !== 0){
        await authStore.userUpdateProfile(new_form)
        userInfo = authStore.userDetail
        editAction()
      }
      else {
        $toast.error("Nothing to update", {
          position: 'top',
          duration: 2000,
        })
      }

    }
    
  }
</script>

<style lang="scss" scoped>

</style>