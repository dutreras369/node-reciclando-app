/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\n    const lat = -33.4488814;\n    const lng = -70.6692553;\n    const map = L.map('map').setView([lat, lng ], 14);\n    let marker;\n\n    // util Provider & Geocoder\n    const geocodeService = L.esri.Geocoding.geocodeService();\n\n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(map);\n\n    // add pin\n    marker = new L.marker([lat, lng], {\n        draggable: true,\n        autoPan: true\n    })\n    .addTo(map)\n\n    // detect mov pin event\n    marker.on('moveend', function(e){\n        marker = e.target\n\n        const posicion = marker.getLatLng();\n\n        map.panTo(new L.LatLng(posicion.lat, posicion.lng))\n\n        // get addres\n        geocodeService.reverse().latlng(posicion, 14)\n        .run(function(error, res){\n            marker.bindPopup(res.address.LongLabel)\n            // fill field\n            document.querySelector('.street').textContent = res?.address?.Address ?? '';\n            document.querySelector('#street').value = res?.address?.Address ?? '';\n            document.querySelector('#lat').value = res?.latlng?.lat ?? '';\n            document.querySelector('#lng').value = res?.latlng?.lng ?? '';\n        })\n    })\n\n})()\n\n//# sourceURL=webpack://reciclando-app/./src/js/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;