<template>
    <div
        class="flex flex-col w-full bg-gray-900 cursor-text"
    >
        <textarea
            ref="textarea"
            class=""
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, watch, ref } from 'vue';
    import CodeMirror from 'codemirror';

    export default defineComponent({
        name: 'ResponseSection',
        props: {
            modelValue: String,
            opts: Object,
            readOnly: Boolean
        },
        setup (props, { emit }) {
            const textarea = ref(null);
            const isEvent = ref(false);
            let codemirror: any;
            const opts = {
                value: props.modelValue,
                tabSize: 4,
                mode: 'application/json',
                lineNumbers: true,
                smartIndent: true,
                lineWrapping: true,
                lineWiseCopyCut: false,
                scrollbarStyle: 'null',
                showCursorWhenSelecting: true,
                autoCloseBrackets: true,
                readOnly: props.readOnly,
                matchBrackets: !props.readOnly,
                styleActiveLine: !props.readOnly,
                cursorBlinkRate: props.readOnly ? -1 : CodeMirror.defaults.cursorBlinkRate
            };

            onMounted(() => {
                codemirror = CodeMirror.fromTextArea(textarea.value, opts);
                codemirror?.setValue(props.modelValue);

                if (!props.readOnly) {
                    codemirror.on('change', () => {
                        isEvent.value = true;
                        const val = codemirror.getValue();
                        emit('update:modelValue', val);
                    });
                }
            });

            watch(() => props.modelValue, (val) => {
                if (!isEvent.value) {
                    codemirror?.setValue(val);
                }
                isEvent.value = false;
            });

            return {
                textarea
            };
        }
    });
</script>

<style lang="scss">
    .CodeMirror {
        @apply
            bg-transparent
            text-white
            text-lg
            flex-grow
            h-full;
    }
    .CodeMirror-selected,
    .CodeMirror-line::selection,
    .CodeMirror-line > span::selection,
    .CodeMirror-line > span > span::selection {
        @apply bg-gray-800;
    }
    .CodeMirror-line::-moz-selection,
    .CodeMirror-line > span::-moz-selection,
    .CodeMirror-line > span > span::-moz-selection {
        @apply bg-gray-800;
    }
    .CodeMirror-activeline-background {
        @apply bg-gray-800;
    }
    .CodeMirror-gutters {
        @apply
            bg-transparent
            border-none;
    }
    .CodeMirror-cursor {
        @apply
            border-1
            border-gray-200;
    }
    .CodeMirror-linenumber {
        @apply text-gray-500;
    }
    .CodeMirror-matchingbracket,
    .CodeMirror-nonmatchingbracket {
        @apply
            text-white
            underline;
    }
</style>
