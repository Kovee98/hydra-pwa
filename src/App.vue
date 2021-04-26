<template>
    <div v-html="pageStyle"/>
    <div
        id="page"
        @mouseup="endDrag"
        @mousemove="handleDrag"
    >
        <div v-html="syntaxStyle"/>

        <TopBar id="header"/>

        <SideBar id="sidebar"/>

        <div
            id="sidebar-drag"
            @mousedown="startLeftDrag"
        >
            <div class="divider"></div>
        </div>

        <InputBar
            v-model="currRequest.response"
            id="request-inputs"
        />

        <div
            id="request-tabs"
            class="p-3 text-white bg-gray-800 border-gray-700 border-b-1"
        >
            Request Tabs
        </div>

        <CodeMirror
            v-model="currRequest.body"
            :readOnly="false"
            :opts="bodyOpts"
            id="request-body"
        />

        <div
            id="editor-drag"
            @mousedown="startRightDrag"
        >
            <div class="divider"></div>
        </div>

        <div
            id="response-header"
            class="p-3 text-white bg-gray-800 border-gray-700 border-b-1"
        >
            Response Header
        </div>

        <div
            id="response-tabs"
            class="p-3 text-white bg-gray-800 border-gray-700 border-b-1"
        >
            Response Tabs
        </div>

        <CodeMirror
            v-model="currRequest.response"
            :readOnly="true"
            :opts="responseOpts"
            id="response-body"
            ref="responseBody"
        />

        <BottomBar id="footer"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, computed, onBeforeMount, onBeforeUpdate } from 'vue';
    import InputBar from './components/InputBar.vue';
    import CodeMirror from './components/CodeMirror.vue';
    import SideBar from './components/SideBar.vue';
    import TopBar from './components/TopBar.vue';
    import BottomBar from './components/BottomBar.vue';
    import { requestStore } from './stores/RequestStore';
    import { generalStore } from './stores/GeneralStore';

    export default defineComponent({
        name: 'App',
        components: {
            InputBar,
            SideBar,
            TopBar,
            CodeMirror,
            BottomBar
        },
        setup () {
            onBeforeMount(async () => await requestStore.init());
            onBeforeMount(async () => await generalStore.init());
            const currRequest = computed(() => requestStore.currRequest);

            let isLeftDragging = false;
            let isRightDragging = false;
            let page;
            let sidebar;
            let responseBody;
            let dragbar;
            let dragbarWidth;
            let dragbarOffset;

            onBeforeUpdate(() => {
                page = document.querySelector('#page');
                sidebar = document.querySelector('#sidebar');
                dragbar = document.querySelector('#editor-drag');
                responseBody = document.querySelector('#response-body');
                dragbarWidth = dragbar.clientWidth;
                dragbarOffset = (dragbarWidth - 1) / 2;
            });

            const bodyOpts = {
                styleActiveLine: true,
                matchBrackets: true
            };

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

            const pageStyle = computed(() => {
                return '<style>' +
                    '#page { grid-template-columns: ' + generalStore.getColSize() + ' }' +
                    '</style>';
            });

            const syntaxStyle = computed(() => {
                return '<style>' +
                    'span.cm-string { color: ' + colors.string + ' !important }' +
                    'span.cm-number { color: ' + colors.number + ' !important }' +
                    'span.cm-atom { color: ' + colors.atom + ' !important }' +
                    'span.cm-keyword, span.cm-variable, span.cm-property { color: ' + colors.key + ' !important }' +
                    '</style>';
            });

            const startLeftDrag = () => {
                isLeftDragging = true;
                page.style.cursor = 'ew-resize';
            };

            const startRightDrag = () => {
                isRightDragging = true;
                page.style.cursor = 'ew-resize';
            };

            const endDrag = () => {
                isLeftDragging = false;
                isRightDragging = false;
                page.style.cursor = 'auto';
            };

            const handleDrag = (e) => {
                if (isLeftDragging || isRightDragging) {
                    const sidebarWidth = (isLeftDragging ? e.clientX : sidebar.clientWidth) - dragbarOffset;
                    const responseWidth = (isRightDragging ? page.clientWidth - e.clientX : responseBody.clientWidth) - dragbarOffset;
                    const requestWidth = ((page.clientWidth - (2 * dragbarWidth) - sidebarWidth - responseWidth) / page.clientWidth) * 100;

                    const colSize = `${sidebarWidth}px ${dragbarWidth}px ${requestWidth}% ${dragbarWidth}px 1fr`;
                    page.style.gridTemplateColumns = colSize;
                    generalStore.setColSize(colSize);

                    e.preventDefault();
                }
            };

            return {
                currRequest,
                bodyOpts,
                responseOpts,
                pageStyle,
                syntaxStyle,
                page,
                sidebar,
                responseBody,
                dragbar,
                startLeftDrag,
                startRightDrag,
                endDrag,
                handleDrag
            };
        }
    });
</script>
