
// required polyfills
import "core-js/stable";
import "regenerator-runtime/runtime";

// required assets
import './src/assets/css/main.css';
import './src/assets/js/main.js';
import './src/assets/js/fetch.js';

// // PREVENTS BROWSER FROM REFRESHING AND INJECTS THE NEW CODE INSTEAD
// // might cause some bugs when injecting dynamic DOM Components
// module.hot ? module.hot.accept() : null