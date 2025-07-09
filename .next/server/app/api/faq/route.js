/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/faq/route";
exports.ids = ["app/api/faq/route"];
exports.modules = {

/***/ "(rsc)/./app/api/faq/route.js":
/*!******************************!*\
  !*** ./app/api/faq/route.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n// app/api/faq/route.js\nasync function GET() {\n    const faqData = [\n        {\n            id: 1,\n            question: \"โซลาร์เซลล์ทำงานอย่างไร?\",\n            answer: \"โซลาร์เซลล์แปลงพลังงานแสงอาทิตย์เป็นไฟฟ้าโดยตรงผ่านกระบวนการโฟโตโวลตาอิก\"\n        },\n        {\n            id: 2,\n            question: \"การติดตั้งโซลาร์เซลล์ช่วยประหยัดค่าไฟไหม?\",\n            answer: \"ช่วยลดค่าไฟฟ้าได้อย่างมาก โดยเฉพาะในช่วงกลางวันที่มีการใช้ไฟสูง\"\n        },\n        {\n            id: 3,\n            question: \"ต้องขออนุญาตอะไรบ้างในการติดตั้ง?\",\n            answer: \"จำเป็นต้องขออนุญาตจากการไฟฟ้าหากจะเชื่อมต่อเข้าระบบไฟฟ้าของรัฐ\"\n        },\n        {\n            id: 4,\n            question: \"ระบบโซลาร์เซลล์มีอายุการใช้งานกี่ปี?\",\n            answer: \"โดยทั่วไปแผงโซลาร์มีอายุการใช้งาน 25-30 ปี และ Inverter ประมาณ 10 ปี\"\n        }\n    ];\n    return Response.json({\n        faqs: faqData\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2ZhcS9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsdUJBQXVCO0FBRWhCLGVBQWVBO0lBQ3BCLE1BQU1DLFVBQVU7UUFDZDtZQUNFQyxJQUFJO1lBQ0pDLFVBQVU7WUFDVkMsUUFBUTtRQUNWO1FBQ0E7WUFDRUYsSUFBSTtZQUNKQyxVQUFVO1lBQ1ZDLFFBQVE7UUFDVjtRQUNBO1lBQ0VGLElBQUk7WUFDSkMsVUFBVTtZQUNWQyxRQUFRO1FBQ1Y7UUFDQTtZQUNFRixJQUFJO1lBQ0pDLFVBQVU7WUFDVkMsUUFBUTtRQUNWO0tBQ0Q7SUFFRCxPQUFPQyxTQUFTQyxJQUFJLENBQUM7UUFBRUMsTUFBTU47SUFBUTtBQUN2QyIsInNvdXJjZXMiOlsiQzpcXHNhayBzb2xhclxcc2FrLXNvbGFyLW1haW5cXGFwcFxcYXBpXFxmYXFcXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC9hcGkvZmFxL3JvdXRlLmpzXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gIGNvbnN0IGZhcURhdGEgPSBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAxLFxyXG4gICAgICBxdWVzdGlvbjogXCLguYLguIvguKXguLLguKPguYzguYDguIvguKXguKXguYzguJfguLPguIfguLLguJnguK3guKLguYjguLLguIfguYTguKM/XCIsXHJcbiAgICAgIGFuc3dlcjogXCLguYLguIvguKXguLLguKPguYzguYDguIvguKXguKXguYzguYHguJvguKXguIfguJ7guKXguLHguIfguIfguLLguJnguYHguKrguIfguK3guLLguJfguLTguJXguKLguYzguYDguJvguYfguJnguYTguJ/guJ/guYnguLLguYLguJTguKLguJXguKPguIfguJzguYjguLLguJnguIHguKPguLDguJrguKfguJnguIHguLLguKPguYLguJ/guYLguJXguYLguKfguKXguJXguLLguK3guLTguIFcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6IDIsXHJcbiAgICAgIHF1ZXN0aW9uOiBcIuC4geC4suC4o+C4leC4tOC4lOC4leC4seC5ieC4h+C5guC4i+C4peC4suC4o+C5jOC5gOC4i+C4peC4peC5jOC4iuC5iOC4p+C4ouC4m+C4o+C4sOC4q+C4ouC4seC4lOC4hOC5iOC4suC5hOC4n+C5hOC4q+C4oT9cIixcclxuICAgICAgYW5zd2VyOiBcIuC4iuC5iOC4p+C4ouC4peC4lOC4hOC5iOC4suC5hOC4n+C4n+C5ieC4suC5hOC4lOC5ieC4reC4ouC5iOC4suC4h+C4oeC4suC4gSDguYLguJTguKLguYDguInguJ7guLLguLDguYPguJnguIrguYjguKfguIfguIHguKXguLLguIfguKfguLHguJnguJfguLXguYjguKHguLXguIHguLLguKPguYPguIrguYnguYTguJ/guKrguLnguIdcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6IDMsXHJcbiAgICAgIHF1ZXN0aW9uOiBcIuC4leC5ieC4reC4h+C4guC4reC4reC4meC4uOC4jeC4suC4leC4reC4sOC5hOC4o+C4muC5ieC4suC4h+C5g+C4meC4geC4suC4o+C4leC4tOC4lOC4leC4seC5ieC4hz9cIixcclxuICAgICAgYW5zd2VyOiBcIuC4iOC4s+C5gOC4m+C5h+C4meC4leC5ieC4reC4h+C4guC4reC4reC4meC4uOC4jeC4suC4leC4iOC4suC4geC4geC4suC4o+C5hOC4n+C4n+C5ieC4suC4q+C4suC4geC4iOC4sOC5gOC4iuC4t+C5iOC4reC4oeC4leC5iOC4reC5gOC4guC5ieC4suC4o+C4sOC4muC4muC5hOC4n+C4n+C5ieC4suC4guC4reC4h+C4o+C4seC4kFwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogNCxcclxuICAgICAgcXVlc3Rpb246IFwi4Lij4Liw4Lia4Lia4LmC4LiL4Lil4Liy4Lij4LmM4LmA4LiL4Lil4Lil4LmM4Lih4Li14Lit4Liy4Lii4Li44LiB4Liy4Lij4LmD4LiK4LmJ4LiH4Liy4LiZ4LiB4Li14LmI4Lib4Li1P1wiLFxyXG4gICAgICBhbnN3ZXI6IFwi4LmC4LiU4Lii4LiX4Lix4LmI4Lin4LmE4Lib4LmB4Lic4LiH4LmC4LiL4Lil4Liy4Lij4LmM4Lih4Li14Lit4Liy4Lii4Li44LiB4Liy4Lij4LmD4LiK4LmJ4LiH4Liy4LiZIDI1LTMwIOC4m+C4tSDguYHguKXguLAgSW52ZXJ0ZXIg4Lib4Lij4Liw4Lih4Liy4LiTIDEwIOC4m+C4tVwiXHJcbiAgICB9XHJcbiAgXTtcclxuXHJcbiAgcmV0dXJuIFJlc3BvbnNlLmpzb24oeyBmYXFzOiBmYXFEYXRhIH0pO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJHRVQiLCJmYXFEYXRhIiwiaWQiLCJxdWVzdGlvbiIsImFuc3dlciIsIlJlc3BvbnNlIiwianNvbiIsImZhcXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/faq/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ffaq%2Froute&page=%2Fapi%2Ffaq%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ffaq%2Froute.js&appDir=C%3A%5Csak%20solar%5Csak-solar-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csak%20solar%5Csak-solar-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ffaq%2Froute&page=%2Fapi%2Ffaq%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ffaq%2Froute.js&appDir=C%3A%5Csak%20solar%5Csak-solar-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csak%20solar%5Csak-solar-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_sak_solar_sak_solar_main_app_api_faq_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/faq/route.js */ \"(rsc)/./app/api/faq/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/faq/route\",\n        pathname: \"/api/faq\",\n        filename: \"route\",\n        bundlePath: \"app/api/faq/route\"\n    },\n    resolvedPagePath: \"C:\\\\sak solar\\\\sak-solar-main\\\\app\\\\api\\\\faq\\\\route.js\",\n    nextConfigOutput,\n    userland: C_sak_solar_sak_solar_main_app_api_faq_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZmYXElMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmZhcSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmZhcSUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDc2FrJTIwc29sYXIlNUNzYWstc29sYXItbWFpbiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q3NhayUyMHNvbGFyJTVDc2FrLXNvbGFyLW1haW4maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ007QUFDbkY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXHNhayBzb2xhclxcXFxzYWstc29sYXItbWFpblxcXFxhcHBcXFxcYXBpXFxcXGZhcVxcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvZmFxL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZmFxXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9mYXEvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxzYWsgc29sYXJcXFxcc2FrLXNvbGFyLW1haW5cXFxcYXBwXFxcXGFwaVxcXFxmYXFcXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ffaq%2Froute&page=%2Fapi%2Ffaq%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ffaq%2Froute.js&appDir=C%3A%5Csak%20solar%5Csak-solar-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csak%20solar%5Csak-solar-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ffaq%2Froute&page=%2Fapi%2Ffaq%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ffaq%2Froute.js&appDir=C%3A%5Csak%20solar%5Csak-solar-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csak%20solar%5Csak-solar-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();