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
exports.id = "app/api/review/route";
exports.ids = ["app/api/review/route"];
exports.modules = {

/***/ "(rsc)/./app/api/review/route.js":
/*!*********************************!*\
  !*** ./app/api/review/route.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n// app/api/review/route.js\n\nconst mockReviews = [\n    {\n        id: '1',\n        title: 'รีวิวแอร์บ้าน ประหยัดไฟ',\n        date: '6 กรกฎาคม 2568',\n        thumbnail: 'https://www.youtube.com/watch?v=V79Hfn7EYGU',\n        url: 'https://www.youtube.com/watch?v=V79Hfn7EYGU',\n        description: 'สินเชื่อโซลาร์เซลล์ ประหยัด..ลดค่าไฟฟ้าได้จริง'\n    },\n    {\n        id: '2',\n        title: 'สินเชื่อโซลาร์เซลล์ ประหยัด ลดค่าไฟฟ้าได้จริง',\n        date: '6 กรกฎาคม 2568',\n        thumbnail: 'https://www.youtube.com/watch?v=MXjpk4iM2nM',\n        url: 'https://www.youtube.com/watch?v=MXjpk4iM2nM',\n        description: 'คลิปนี้พูดถึงระบบโซลาร์รูฟท็อปในบ้านเดี่ยว พร้อมคำนวณระยะคืนทุน'\n    },\n    {\n        id: '3',\n        title: 'โซลาร์รูฟท็อป คุ้มไหม?',\n        date: '7 กรกฎาคม 2568',\n        thumbnail: 'https://i3.ytimg.com/vi/ysz5S6PUM-U/maxresdefault.jpg',\n        url: 'https://www.youtube.com/watch?v=MXjpk4iM2nM',\n        description: 'คลิปนี้พูดถึงระบบโซลาร์รูฟท็อปในบ้านเดี่ยว พร้อมคำนวณระยะคืนทุน'\n    }\n];\nasync function GET() {\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(mockReviews);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Jldmlldy9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBCQUEwQjtBQUNpQjtBQUUzQyxNQUFNQyxjQUFjO0lBQ2xCO1FBQ0VDLElBQUk7UUFDSkMsT0FBTztRQUNQQyxNQUFNO1FBQ05DLFdBQVc7UUFDWEMsS0FBSztRQUNMQyxhQUFhO0lBQ2Y7SUFDQTtRQUNFTCxJQUFJO1FBQ0pDLE9BQU87UUFDUEMsTUFBTTtRQUNOQyxXQUFXO1FBQ1hDLEtBQUs7UUFDTEMsYUFBYTtJQUNmO0lBQ0U7UUFDQUwsSUFBSTtRQUNKQyxPQUFPO1FBQ1BDLE1BQU07UUFDTkMsV0FBVztRQUNYQyxLQUFLO1FBQ0xDLGFBQWE7SUFDZjtDQUNEO0FBRU0sZUFBZUM7SUFDcEIsT0FBT1IscURBQVlBLENBQUNTLElBQUksQ0FBQ1I7QUFDM0IiLCJzb3VyY2VzIjpbIkM6XFxzYWsgc29sYXJcXHNhay1zb2xhci1tYWluXFxhcHBcXGFwaVxccmV2aWV3XFxyb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAvYXBpL3Jldmlldy9yb3V0ZS5qc1xyXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcblxyXG5jb25zdCBtb2NrUmV2aWV3cyA9IFtcclxuICB7XHJcbiAgICBpZDogJzEnLFxyXG4gICAgdGl0bGU6ICfguKPguLXguKfguLTguKfguYHguK3guKPguYzguJrguYnguLLguJkg4Lib4Lij4Liw4Lir4Lii4Lix4LiU4LmE4LifJyxcclxuICAgIGRhdGU6ICc2IOC4geC4o+C4geC4juC4suC4hOC4oSAyNTY4JyxcclxuICAgIHRodW1ibmFpbDogJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9Vjc5SGZuN0VZR1UnLFxyXG4gICAgdXJsOiAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1WNzlIZm43RVlHVScsXHJcbiAgICBkZXNjcmlwdGlvbjogJ+C4quC4tOC4meC5gOC4iuC4t+C5iOC4reC5guC4i+C4peC4suC4o+C5jOC5gOC4i+C4peC4peC5jCDguJvguKPguLDguKvguKLguLHguJQuLuC4peC4lOC4hOC5iOC4suC5hOC4n+C4n+C5ieC4suC5hOC4lOC5ieC4iOC4o+C4tOC4hycsXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogJzInLFxyXG4gICAgdGl0bGU6ICfguKrguLTguJnguYDguIrguLfguYjguK3guYLguIvguKXguLLguKPguYzguYDguIvguKXguKXguYwg4Lib4Lij4Liw4Lir4Lii4Lix4LiUIOC4peC4lOC4hOC5iOC4suC5hOC4n+C4n+C5ieC4suC5hOC4lOC5ieC4iOC4o+C4tOC4hycsXHJcbiAgICBkYXRlOiAnNiDguIHguKPguIHguI7guLLguITguKEgMjU2OCcsXHJcbiAgICB0aHVtYm5haWw6ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PU1YanBrNGlNMm5NJyxcclxuICAgIHVybDogJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9TVhqcGs0aU0ybk0nLFxyXG4gICAgZGVzY3JpcHRpb246ICfguITguKXguLTguJvguJnguLXguYnguJ7guLnguJTguJbguLbguIfguKPguLDguJrguJrguYLguIvguKXguLLguKPguYzguKPguLnguJ/guJfguYfguK3guJvguYPguJnguJrguYnguLLguJnguYDguJTguLXguYjguKLguKcg4Lie4Lij4LmJ4Lit4Lih4LiE4Liz4LiZ4Lin4LiT4Lij4Liw4Lii4Liw4LiE4Li34LiZ4LiX4Li44LiZJyxcclxuICB9LFxyXG4gICAge1xyXG4gICAgaWQ6ICczJyxcclxuICAgIHRpdGxlOiAn4LmC4LiL4Lil4Liy4Lij4LmM4Lij4Li54Lif4LiX4LmH4Lit4LibIOC4hOC4uOC5ieC4oeC5hOC4q+C4oT8nLFxyXG4gICAgZGF0ZTogJzcg4LiB4Lij4LiB4LiO4Liy4LiE4LihIDI1NjgnLFxyXG4gICAgdGh1bWJuYWlsOiAnaHR0cHM6Ly9pMy55dGltZy5jb20vdmkveXN6NVM2UFVNLVUvbWF4cmVzZGVmYXVsdC5qcGcnLFxyXG4gICAgdXJsOiAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1NWGpwazRpTTJuTScsXHJcbiAgICBkZXNjcmlwdGlvbjogJ+C4hOC4peC4tOC4m+C4meC4teC5ieC4nuC4ueC4lOC4luC4tuC4h+C4o+C4sOC4muC4muC5guC4i+C4peC4suC4o+C5jOC4o+C4ueC4n+C4l+C5h+C4reC4m+C5g+C4meC4muC5ieC4suC4meC5gOC4lOC4teC5iOC4ouC4pyDguJ7guKPguYnguK3guKHguITguLPguJnguKfguJPguKPguLDguKLguLDguITguLfguJnguJfguLjguJknLFxyXG4gIH1cclxuXTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKG1vY2tSZXZpZXdzKTtcclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwibW9ja1Jldmlld3MiLCJpZCIsInRpdGxlIiwiZGF0ZSIsInRodW1ibmFpbCIsInVybCIsImRlc2NyaXB0aW9uIiwiR0VUIiwianNvbiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/review/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freview%2Froute&page=%2Fapi%2Freview%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freview%2Froute.js&appDir=C%3A%5Csak%20solar%5Csak-solar-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csak%20solar%5Csak-solar-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freview%2Froute&page=%2Fapi%2Freview%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freview%2Froute.js&appDir=C%3A%5Csak%20solar%5Csak-solar-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csak%20solar%5Csak-solar-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_sak_solar_sak_solar_main_app_api_review_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/review/route.js */ \"(rsc)/./app/api/review/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/review/route\",\n        pathname: \"/api/review\",\n        filename: \"route\",\n        bundlePath: \"app/api/review/route\"\n    },\n    resolvedPagePath: \"C:\\\\sak solar\\\\sak-solar-main\\\\app\\\\api\\\\review\\\\route.js\",\n    nextConfigOutput,\n    userland: C_sak_solar_sak_solar_main_app_api_review_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZyZXZpZXclMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnJldmlldyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnJldmlldyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDc2FrJTIwc29sYXIlNUNzYWstc29sYXItbWFpbiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q3NhayUyMHNvbGFyJTVDc2FrLXNvbGFyLW1haW4maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ1M7QUFDdEY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXHNhayBzb2xhclxcXFxzYWstc29sYXItbWFpblxcXFxhcHBcXFxcYXBpXFxcXHJldmlld1xcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcmV2aWV3L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcmV2aWV3XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9yZXZpZXcvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxzYWsgc29sYXJcXFxcc2FrLXNvbGFyLW1haW5cXFxcYXBwXFxcXGFwaVxcXFxyZXZpZXdcXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freview%2Froute&page=%2Fapi%2Freview%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freview%2Froute.js&appDir=C%3A%5Csak%20solar%5Csak-solar-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csak%20solar%5Csak-solar-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freview%2Froute&page=%2Fapi%2Freview%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freview%2Froute.js&appDir=C%3A%5Csak%20solar%5Csak-solar-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csak%20solar%5Csak-solar-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();