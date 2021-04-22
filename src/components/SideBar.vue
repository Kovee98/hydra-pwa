<template>
    <div class="bg-gray-800 border-gray-700 border-r-1">
        <div class="flex items-center justify-between h-12 p-3 text-center text-gray-300 border-gray-700 border-b-1">
            <div>
                <img
                    :src="hydraLogo"
                    class="float-left h-6 mr-3"
                />
                <span class="text-lg">Hydra</span>
            </div>
            <div>
                <button
                    @click="createFolder"
                    class="ml-1 hover:text-green-400"
                >
                    <i class="icon-folder"></i>
                </button>
                <button
                    @click="createRequest"
                    class="ml-1 hover:text-green-400"
                >
                    <i class="icon-plus"></i>
                </button>
            </div>
        </div>
        <div
            v-for="request in requests"
            :key="request.id"
            @click="requestStore.currRequest = request"
            class="request"
            :class="{ 'active' : request.id ===  requestStore.currRequest.id}"
        >
            <div
                v-if="editMode !== request.id"
                class="py-2 ml-4"
            >
                {{ request.name }}
            </div>
            <input
                v-if="editMode === request.id"
                @keyup.enter="editMode = -1"
                @blur="editMode = -1"
                class="p-4 py-2 text-gray-400 bg-transparent"
                v-model="request.name"
                ref="editModeInput"
            />
            <div class="mr-2">
                <button
                    @click.stop="editRequest(request.id)"
                    class="hover:text-blue-400"
                >
                    <i class="text-sm icon-pencil"></i>
                </button>
                <button
                    v-if="request.id !==  requestStore.currRequest.id"
                    @click.stop="requestStore.removeRequest(request.id)"
                    class="hover:text-red-500"
                >
                    <i class="text-sm icon-trash"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, ref, nextTick } from 'vue';
    import { requestStore } from '../stores/RequestStore';
    import { Request } from '../types';
    import hydraLogo from '../assets/img/logo.svg';

    export default defineComponent({
        name: 'SideBar',
        setup () {
            const requests = computed(() => requestStore.requests);
            const editMode = ref(-1);
            const editModeInput = ref(null);

            const createRequest = async () => {
                const newId: number = requestStore.getNextId();
                const newRequest: Request = {
                    id: newId,
                    name: 'New Request',
                    method: 'get',
                    url: '',
                    body: '',
                    response: ''
                } as Request;

                requestStore.saveRequest(newRequest);
                requestStore.currRequest = newRequest;

                // default to edit mode on new requests
                editMode.value = newId;
                await nextTick();
                editModeInput?.value?.select();
            };

            const createFolder = (id: number) => {
                console.log('create folder', id);
            };

            const editRequest = async (id: number) => {
                editMode.value = id;
                await nextTick();
                editModeInput?.value?.select();
            };

            return {
                requests,
                editMode,
                editModeInput,
                requestStore,
                createRequest,
                createFolder,
                editRequest,
                hydraLogo
            };
        }
    });
</script>

<style lang="scss" scoped>
    .request {
        @apply
            w-full
            flex
            justify-between
            items-center
            cursor-pointer
            text-gray-300;

        button {
            @apply
                invisible
                ml-1;
        }

        &:hover {
            button {
                @apply visible;
            }
        }

        &.active {
            @apply bg-gray-700;
        }
    }
</style>
