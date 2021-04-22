<template>
    <div class="flex justify-around border-gray-700 shadow-lg border-b-1">
        <SelectBox
            :opts="methods"
            v-model="currRequest.method"
        />

        <input
            v-model.trim="currRequest.url"
            placeholder="http://"
            class="flex-grow p-3 text-gray-400 bg-gray-800"
        >

        <button
            @click="submit"
            class="text-gray-100 bg-blue-500 w-22 active:bg-blue-600"
        >
            Send
        </button>
        <!-- <button
            @click="submit"
            class="text-gray-300 bg-gray-800 w-22 hover:bg-gray-700"
        >
            Send
        </button> -->
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent } from 'vue';
    import SelectBox from './SelectBox.vue';
    import { requestStore } from '../stores/RequestStore';

    export default defineComponent({
        name: 'InputBar.vue',
        components: {
            SelectBox
        },
        props: {
            modelValue: String
        },
        setup (_, { emit }) {
            const currRequest = computed(() => requestStore.currRequest);

            const methods = [
                { name: 'GET', value: 'get' },
                { name: 'POST', value: 'post' },
                { name: 'PUT', value: 'put' },
                { name: 'DELETE', value: 'delete' },
                { name: 'HEAD', value: 'head' }
            ];

            const submit = () => {
                if (!currRequest?.value?.url || !currRequest?.value?.method) return;

                const url = new URL(currRequest?.value?.url as string);
                const auth = btoa(`${url.username}:${url.password}`);

                const opts = {
                    method: currRequest?.value?.method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${auth}`
                    }
                };

                fetch(url.origin, opts)
                    .then((res) => res.json())
                    .then((res) => JSON.stringify(res, null, '\t'))
                    .then((res) => emit('update:modelValue', res));
            };

            return {
                currRequest,
                requestStore,
                methods,
                submit
            };
        }
    });
</script>

<style lang="scss">
    .get { @apply text-purple-500 }
    .post { @apply text-green-500 }
    .put { @apply text-orange-500 }
    .delete { @apply text-red-500 }
    .head { @apply text-blue-500 }
</style>
