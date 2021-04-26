<template>
    <div class="flex items-center p-3 text-white bg-gray-800 border-gray-700 border-b-1">
        <div>
            <img
                :src="hydraLogo"
                class="float-left h-6 mr-3"
            />
            <span class="text-lg">Hydra</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import hydraLogo from '../assets/img/logo.svg';

    export default defineComponent({
        name: 'TopBar',
        setup () {
            return {
                hydraLogo
            };
        }
    });
</script>
