import { createApp } from 'vue';
import App from './App.vue';
import 'windi.css';
import './scss/index.scss';
import './scss/fontello/css/fontello.css';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/selection/active-line.js';

createApp(App).mount('#app');
