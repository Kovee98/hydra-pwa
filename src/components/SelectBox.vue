<template>
    <button
        id="select-box"
        @click="showOpts = !showOpts"
        class="h-full px-2 uppercase bg-gray-800 cursor-default w-25 hover:bg-gray-700"
    >
        <span :class="modelValue">{{ modelValue }}</span>
        <i class="float-right mr-1 text-gray-400 icon-down-open-1"></i>
        <!-- <i class="float-right mr-1 text-gray-400 icon-down-dir"></i> -->
    </button>
    <div
        v-if="showOpts"
        class="relative w-0 h-0"
    >
        <div class="absolute z-50 py-2 bg-gray-200 rounded-lg shadow-lg w-30 -left-24 top-12">
            <button
                v-for="opt in opts"
                :key="opt.id"
                @click="selectOpt(opt)"
                class="w-full py-2 cursor-default hover:bg-gray-300"
                :class="opt.value"
            >
                {{ opt.name }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { SelectBoxOption } from '../types';

    export default defineComponent({
        name: 'SelectBox',
        props: {
            opts: Array,
            modelValue: String
        },
        setup (_, { emit }) {
            const showOpts = ref(false);

            const selectOpt = (opt: SelectBoxOption) => {
                emit('update:modelValue', opt.value);
                showOpts.value = false;
            };

            return {
                showOpts,
                selectOpt
            };
        }
    });
</script>
