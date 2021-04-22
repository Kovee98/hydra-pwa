<template>
    <div class="layout">
        <div v-html="style"/>

        <SideBar class="sidebar"/>

        <InputBar
            v-model="currRequest.response"
            class="inputs"
        />

        <CodeMirror
            v-model="currRequest.body"
            :readOnly="false"
            :opts="bodyOpts"
            class="border-gray-700 request border-r-1"
        />

        <CodeMirror
            v-model="currRequest.response"
            :readOnly="true"
            :opts="responseOpts"
            class="response"
        />

        <BottomBar class="bottom"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, reactive, computed, onBeforeMount } from 'vue';
    import InputBar from './components/InputBar.vue';
    import CodeMirror from './components/CodeMirror.vue';
    import SideBar from './components/SideBar.vue';
    import BottomBar from './components/BottomBar.vue';
    import { requestStore } from './stores/RequestStore';

    export default defineComponent({
        name: 'App',
        components: {
            InputBar,
            SideBar,
            CodeMirror,
            BottomBar
        },
        setup () {
            onBeforeMount(async () => await requestStore.init());
            const currRequest = computed(() => requestStore.currRequest);

            // const body = ref('{}');
            const bodyOpts = {
                styleActiveLine: true,
                matchBrackets: true
            };

            // const results = ref('');
            const responseOpts = {
                readOnly: true,
                matchBrackets: false,
                cursorBlinkRate: -1
            };

            const colors = reactive({
                key: '#80ff00',
                string: '#e7db74',
                number: '#ac80ff',
                atom: '#ac80ff'
            });

            const style = computed(() => {
                return '<style>' +
                    'span.cm-string { color: ' + colors.string + ' !important }' +
                    'span.cm-number { color: ' + colors.number + ' !important }' +
                    'span.cm-atom { color: ' + colors.atom + ' !important }' +
                    'span.cm-keyword, span.cm-variable, span.cm-property { color: ' + colors.key + ' !important }' +
                    '</style>';
            });

            return {
                currRequest,
                // body,
                bodyOpts,
                // results,
                responseOpts,
                style
            };
        }
    });
</script>
