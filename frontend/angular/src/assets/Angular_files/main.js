(self["webpackChunkangular"] = self["webpackChunkangular"] || []).push([["main"],{

/***/ 8255:
/*!*******************************************************!*\
  !*** ./$_lazy_route_resources/ lazy namespace object ***!
  \*******************************************************/
/***/ ((module) => {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 8255;
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 1258);
/* harmony import */ var _auth_page_auth_auth_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth-page/auth/auth.component */ 2282);
/* harmony import */ var _registered_page_content_about_me_about_me_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registered-page/content/about-me/about-me.component */ 3666);
/* harmony import */ var _registered_page_content_friends_friends_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./registered-page/content/friends/friends.component */ 3426);
/* harmony import */ var _registered_page_content_live_live_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./registered-page/content/live/live.component */ 3713);
/* harmony import */ var _registered_page_content_play_play_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./registered-page/content/play/play.component */ 3146);
/* harmony import */ var _registered_page_content_ranking_ranking_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./registered-page/content/ranking/ranking.component */ 1776);
/* harmony import */ var _registered_page_content_rules_rules_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./registered-page/content/rules/rules.component */ 1600);
/* harmony import */ var _registered_page_content_stats_stats_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./registered-page/content/stats/stats.component */ 4573);
/* harmony import */ var _registered_page_content_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./registered-page/content/welcome/welcome.component */ 4141);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);












const routes = [
    { path: 'auth', component: _auth_page_auth_auth_component__WEBPACK_IMPORTED_MODULE_0__.AuthComponent },
    { path: 'welcome', component: _registered_page_content_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_8__.WelcomeComponent },
    { path: 'profile/about-me', component: _registered_page_content_about_me_about_me_component__WEBPACK_IMPORTED_MODULE_1__.AboutMeComponent },
    { path: 'profile/my-friends', component: _registered_page_content_friends_friends_component__WEBPACK_IMPORTED_MODULE_2__.FriendsComponent },
    { path: 'profile/my-stats', component: _registered_page_content_stats_stats_component__WEBPACK_IMPORTED_MODULE_7__.StatsComponent },
    { path: 'pong/play', component: _registered_page_content_play_play_component__WEBPACK_IMPORTED_MODULE_4__.PlayComponent },
    { path: 'pong/live', component: _registered_page_content_live_live_component__WEBPACK_IMPORTED_MODULE_3__.LiveComponent },
    { path: 'pong/ranking', component: _registered_page_content_ranking_ranking_component__WEBPACK_IMPORTED_MODULE_5__.RankingComponent },
    { path: 'pong/rules', component: _registered_page_content_rules_rules_component__WEBPACK_IMPORTED_MODULE_6__.RulesComponent },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule.forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule] }); })();


/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _services_sf_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/sf-global.service */ 7167);
/* harmony import */ var _services_sf_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/sf-user.service */ 495);
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-socket-io */ 5083);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 1258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 4364);
/* harmony import */ var _auth_page_auth_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-page/auth-page.component */ 7012);
/* harmony import */ var _registered_page_registered_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./registered-page/registered-page.component */ 1680);








function AppComponent_span_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-auth-page");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function AppComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "app-registered-page", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("notifyAppComponent", function AppComponent_ng_template_1_Template_app_registered_page_notifyAppComponent_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r3.onLogOutHandleClick($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
class AppComponent {
    constructor(global, user, socket, router) {
        this.global = global;
        this.user = user;
        this.socket = socket;
        this.router = router;
    }
    onLogOutHandleClick(event) {
        const mess = {
            id: this.global.socketId,
            login: this.global.login,
            to: ['nobody'],
            body: 'loging-out',
            date: new Date(),
            conv_id: 0
        };
        this.socket.emit('log-out', mess);
    }
    ngOnInit() {
        this.socket.on('disconnection', () => {
            console.log('disconnection');
            this.socket.disconnect();
            this.global.login = undefined;
            this.user.user.status = 'offline';
            this.router.navigate(['/']); // -> signaler a tt le monde
        });
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_sf_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_sf_user_service__WEBPACK_IMPORTED_MODULE_1__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_socket_io__WEBPACK_IMPORTED_MODULE_5__.Socket), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router)); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["isConnected", ""], [3, "notifyAppComponent"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, AppComponent_span_0_Template, 2, 0, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, AppComponent_ng_template_1_Template, 1, 0, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.global.login === undefined)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _auth_page_auth_page_component__WEBPACK_IMPORTED_MODULE_2__.AuthPageComponent, _registered_page_registered_page_component__WEBPACK_IMPORTED_MODULE_3__.RegisteredPageComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/platform-browser */ 1570);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _auth_page_auth_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-page/auth-page.component */ 7012);
/* harmony import */ var _registered_page_registered_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./registered-page/registered-page.component */ 1680);
/* harmony import */ var _registered_page_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./registered-page/sidebar/sidebar.component */ 3176);
/* harmony import */ var _registered_page_header_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./registered-page/header/header.component */ 4345);
/* harmony import */ var _registered_page_content_content_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./registered-page/content/content.component */ 1944);
/* harmony import */ var _registered_page_chat_chat_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./registered-page/chat/chat.component */ 6154);
/* harmony import */ var _registered_page_content_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./registered-page/content/welcome/welcome.component */ 4141);
/* harmony import */ var _registered_page_content_rules_rules_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./registered-page/content/rules/rules.component */ 1600);
/* harmony import */ var _registered_page_content_about_me_about_me_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./registered-page/content/about-me/about-me.component */ 3666);
/* harmony import */ var _registered_page_content_ranking_ranking_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./registered-page/content/ranking/ranking.component */ 1776);
/* harmony import */ var _registered_page_content_stats_stats_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./registered-page/content/stats/stats.component */ 4573);
/* harmony import */ var _registered_page_content_live_live_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./registered-page/content/live/live.component */ 3713);
/* harmony import */ var _registered_page_content_friends_friends_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./registered-page/content/friends/friends.component */ 3426);
/* harmony import */ var _registered_page_content_play_play_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./registered-page/content/play/play.component */ 3146);
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ngx-socket-io */ 5083);
/* harmony import */ var ngx_online_status__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-online-status */ 3917);
/* harmony import */ var _services_sf_global_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./services/sf-global.service */ 7167);
/* harmony import */ var _auth_page_auth_auth_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./auth-page/auth/auth.component */ 2282);
/* harmony import */ var _auth_page_input_prompt_input_prompt_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./auth-page/input-prompt/input-prompt.component */ 5998);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 2316);

























const config = { url: 'http://127.0.0.1:3000', options: { autoConnect: false } };
class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineInjector"]({ providers: [_services_sf_global_service__WEBPACK_IMPORTED_MODULE_16__.GlobalService], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__.BrowserModule,
            _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
            ngx_online_status__WEBPACK_IMPORTED_MODULE_21__.OnlineStatusModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_22__.ReactiveFormsModule,
            ngx_socket_io__WEBPACK_IMPORTED_MODULE_23__.SocketIoModule.forRoot(config),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent,
        _auth_page_auth_page_component__WEBPACK_IMPORTED_MODULE_2__.AuthPageComponent,
        _registered_page_registered_page_component__WEBPACK_IMPORTED_MODULE_3__.RegisteredPageComponent,
        _registered_page_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_4__.SidebarComponent,
        _registered_page_header_header_component__WEBPACK_IMPORTED_MODULE_5__.HeaderComponent,
        _registered_page_content_content_component__WEBPACK_IMPORTED_MODULE_6__.ContentComponent,
        _registered_page_chat_chat_component__WEBPACK_IMPORTED_MODULE_7__.ChatComponent,
        _registered_page_content_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_8__.WelcomeComponent,
        _registered_page_content_rules_rules_component__WEBPACK_IMPORTED_MODULE_9__.RulesComponent,
        _registered_page_content_about_me_about_me_component__WEBPACK_IMPORTED_MODULE_10__.AboutMeComponent,
        _registered_page_content_ranking_ranking_component__WEBPACK_IMPORTED_MODULE_11__.RankingComponent,
        _registered_page_content_stats_stats_component__WEBPACK_IMPORTED_MODULE_12__.StatsComponent,
        _registered_page_content_live_live_component__WEBPACK_IMPORTED_MODULE_13__.LiveComponent,
        _registered_page_content_friends_friends_component__WEBPACK_IMPORTED_MODULE_14__.FriendsComponent,
        _registered_page_content_play_play_component__WEBPACK_IMPORTED_MODULE_15__.PlayComponent,
        _auth_page_auth_auth_component__WEBPACK_IMPORTED_MODULE_17__.AuthComponent,
        _auth_page_input_prompt_input_prompt_component__WEBPACK_IMPORTED_MODULE_18__.InputPromptComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__.BrowserModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
        ngx_online_status__WEBPACK_IMPORTED_MODULE_21__.OnlineStatusModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_22__.ReactiveFormsModule, ngx_socket_io__WEBPACK_IMPORTED_MODULE_23__.SocketIoModule] }); })();


/***/ }),

/***/ 7012:
/*!**************************************************!*\
  !*** ./src/app/auth-page/auth-page.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthPageComponent": () => (/* binding */ AuthPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 1258);


class AuthPageComponent {
    constructor() { }
    onRegister() {
        console.log('User clicked on register');
        const clientId = '433f62b085e15cdb9994c692a7fc5af7e43eb3ca173bae63a421b26fa176c29a';
        const redirectUri = 'http://127.0.0.1:80/auth/';
        const responseType = 'code';
        const state = 'enrfckqgilRbvr!XCWegret1@g30rt3h5/46+=40ethjr4j';
        const url = 'https://api.intra.42.fr/oauth/authorize?client_id=' +
            clientId +
            '&redirect_uri=' +
            redirectUri +
            '&response_type=' +
            responseType +
            '&state=' +
            state;
        window.location.href = url; // Keeping it into the component or a dedicated service ?
    }
}
AuthPageComponent.ɵfac = function AuthPageComponent_Factory(t) { return new (t || AuthPageComponent)(); };
AuthPageComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AuthPageComponent, selectors: [["app-auth-page"]], decls: 5, vars: 0, consts: [[1, "jumbotron", "text-center"], ["type", "button", 1, "btn", "btn-dark", 3, "click"], ["id", "auth"]], template: function AuthPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AuthPageComponent_Template_button_click_2_listener() { return ctx.onRegister(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " Register ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "router-outlet", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet], styles: [".jumbotron[_ngcontent-%COMP%] {\n  background-image: url('canvalogotransparent.png');\n  background-size: 12%;\n  min-height: 600px;\n}\n\nbody[_ngcontent-%COMP%] {\n  margin-top: 2%;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGgtcGFnZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaURBQThEO0VBQzlELG9CQUFvQjtFQUNwQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxjQUFjO0VBQ2Qsa0JBQWtCO0FBQ3BCIiwiZmlsZSI6ImF1dGgtcGFnZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmp1bWJvdHJvbiB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4uLy4uL2Fzc2V0cy9jYW52YWxvZ290cmFuc3BhcmVudC5wbmdcIik7XG4gIGJhY2tncm91bmQtc2l6ZTogMTIlO1xuICBtaW4taGVpZ2h0OiA2MDBweDtcbn1cblxuYm9keSB7XG4gIG1hcmdpbi10b3A6IDIlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4iXX0= */"] });


/***/ }),

/***/ 2282:
/*!**************************************************!*\
  !*** ./src/app/auth-page/auth/auth.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthComponent": () => (/* binding */ AuthComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ 9369);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var src_app_services_sf_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/sf-auth.service */ 5420);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 1258);
/* harmony import */ var _input_prompt_input_prompt_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../input-prompt/input-prompt.component */ 5998);





class AuthComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }

  ngOnInit() {
    var _this = this;

    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)(function* () {
      yield _this.authService.getLoggedIn(); // maybe try catch
    })();
  }

}

AuthComponent.ɵfac = function AuthComponent_Factory(t) {
  return new (t || AuthComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_sf_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
};

AuthComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: AuthComponent,
  selectors: [["app-auth"]],
  decls: 3,
  vars: 0,
  template: function AuthComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "auth works!");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "app-input-prompt");
    }
  },
  directives: [_input_prompt_input_prompt_component__WEBPACK_IMPORTED_MODULE_2__.InputPromptComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdXRoLmNvbXBvbmVudC5jc3MifQ== */"]
});

/***/ }),

/***/ 5998:
/*!******************************************************************!*\
  !*** ./src/app/auth-page/input-prompt/input-prompt.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputPromptComponent": () => (/* binding */ InputPromptComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var src_app_services_sf_user_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/sf-user.service */ 495);




class InputPromptComponent {
    constructor(userService) {
        this.userService = userService;
        this.i = 0;
        // pseudo_test = new FormControl('');
        this.avatarList = [
            {
                alt: 'My Intra Pic',
                url: '../../../assets/myIntraPictureBlack.png',
            },
            {
                alt: 'ageraud',
                url: 'https://cdn.intra.42.fr/users/large_ageraud.jpg',
            },
            {
                alt: 'sad-aude',
                url: 'https://cdn.intra.42.fr/users/large_sad-aude.jpg',
            },
            {
                alt: 'jobenass',
                url: 'https://cdn.intra.42.fr/users/large_jobenass.jpg',
            },
            {
                alt: 'lpieri',
                url: 'https://cdn.intra.42.fr/users/large_lpieri.jpg',
            },
            {
                alt: 'pgoudet',
                url: 'https://cdn.intra.42.fr/users/large_pgoudet.jpg',
            },
            {
                alt: 'rlepart',
                url: 'https://cdn.intra.42.fr/users/large_rlepart.jpg',
            },
        ];
        this.profileForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroup({
            pseudo: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required),
            bio: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required),
            avatarUrl: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl('../../../assets/myIntraPictureBlack.png'),
        });
    }
    ngOnInit() { }
    increment() {
        this.i = (this.i + 1) % this.avatarList.length;
    }
    decrement() {
        this.i = (this.i + this.avatarList.length - 1) % this.avatarList.length;
    }
}
InputPromptComponent.ɵfac = function InputPromptComponent_Factory(t) { return new (t || InputPromptComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_sf_user_service__WEBPACK_IMPORTED_MODULE_0__.UserService)); };
InputPromptComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: InputPromptComponent, selectors: [["app-input-prompt"]], decls: 48, vars: 6, consts: [["lang", "en"], ["charset", "utf-8"], ["name", "viewport", "content", "width=device-width, initial-scale=1"], [1, "modal-open"], ["id", "toOpenModal", "data-bs-toggle", "modal", "data-bs-target", "#myModal"], ["id", "myModal", 1, "modal"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], [1, "modal-title"], ["type", "button", "data-bs-dismiss", "modal", 1, "btn-close"], [1, "modal-body"], [3, "formGroup"], [1, "form-group"], ["for", "pseudo", 1, "col-form-label", "title-form"], ["id", "pseudo", "type", "text", "maxlength", "20", "formControlName", "pseudo", "pattern", "[A-Za-z0-9]+", 1, "form-control"], ["for", "bio", 1, "col-form-label", "title-form"], ["id", "bio", "type", "text", "maxlength", "200", "formControlName", "bio", 1, "form-control"], ["for", "avatar", 1, "col-form-label", "title-form"], [1, "btn", "btn-dark", 3, "click"], ["id", "avatar", 1, "rounded-circle", 3, "alt", "src"], ["type", "text", "id", "avatarUrl", "formControlName", "avatarUrl", 1, "d-none", 3, "value"], ["type", "file", "id", "uploaded-avatar", "name", "avatar", "accept", "image/png, image/jpeg, image/gif", 1, "form-control"], ["id", "submitId", "type", "button", "data-bs-dismiss", "modal", 1, "btn", "btn-primary", 3, "disabled"], [1, "padding-text"]], template: function InputPromptComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "html", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "head");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "meta", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "meta", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "body", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "h4", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Tell us more about you...");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "form", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "label", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, " Pseudo ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "h6");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "em");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Only letters and numbers are accepted");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](21, "input", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, " Bio ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](25, "textarea", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "label", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "Avatar");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function InputPromptComponent_Template_div_click_30_listener() { return ctx.decrement(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, "<");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](32, "img", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](33, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function InputPromptComponent_Template_div_click_34_listener() { return ctx.increment(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35, ">");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](37, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](38, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "button", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40, " Submit ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "h6");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "em");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](44, "Complete the form to enable the button");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "h6");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "em");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](47);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.profileForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("alt", ctx.avatarList[ctx.i].alt);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("src", ctx.avatarList[ctx.i].url, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("value", ctx.avatarList[ctx.i].url);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx.profileForm.valid);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Form Status: ", ctx.profileForm.status, "");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.PatternValidator], styles: [".padding-text[_ngcontent-%COMP%] {\n  padding-top: 3%;\n}\n\n.rounded-circle[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  object-fit: cover;\n  margin: 3%;\n}\n\n.title-form[_ngcontent-%COMP%] {\n  font-family: \"Comfortaa\";\n  font-size: 25px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlucHV0LXByb21wdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLFVBQVU7QUFDWjs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixlQUFlO0FBQ2pCIiwiZmlsZSI6ImlucHV0LXByb21wdC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBhZGRpbmctdGV4dCB7XG4gIHBhZGRpbmctdG9wOiAzJTtcbn1cblxuLnJvdW5kZWQtY2lyY2xlIHtcbiAgd2lkdGg6IDEwMHB4O1xuICBoZWlnaHQ6IDEwMHB4O1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgbWFyZ2luOiAzJTtcbn1cblxuLnRpdGxlLWZvcm0ge1xuICBmb250LWZhbWlseTogXCJDb21mb3J0YWFcIjtcbiAgZm9udC1zaXplOiAyNXB4O1xufVxuIl19 */"] });


/***/ }),

/***/ 6154:
/*!********************************************************!*\
  !*** ./src/app/registered-page/chat/chat.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatComponent": () => (/* binding */ ChatComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-socket-io */ 5083);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4364);



function ChatComponent_a_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const theMessage_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](theMessage_r1.body);
} }
class ChatComponent {
    constructor(socket) {
        this.socket = socket;
        this.messageTab = [];
        this.usersOnLine = new Set();
    }
    ngOnInit() {
        this.socket.on('usersOnLine', (data) => {
            this.usersOnLine = data;
            console.log('usersOnline = ', this.usersOnLine);
        });
        // obtenir les gens connnecte 
    }
}
ChatComponent.ɵfac = function ChatComponent_Factory(t) { return new (t || ChatComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_socket_io__WEBPACK_IMPORTED_MODULE_1__.Socket)); };
ChatComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ChatComponent, selectors: [["app-chat"]], decls: 9, vars: 1, consts: [[1, "chat-box"], [1, "header"], [1, "message"], ["id", "mess-1", 4, "ngFor", "ngForOf"], [1, "in"], ["type", "text", "id", "inputBody", "placeholder", "ecrivez votre message", 1, "inputB"], ["type", "text", "id", "inputTo", "placeholder", "to", 1, "inputT"], ["type", "button", "value", "send", 1, "send"], ["id", "mess-1"]], template: function ChatComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ChatComponent_a_3_Template, 2, 1, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "send");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.messageTab);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf], styles: ["body[_ngcontent-%COMP%] {\n  background-color: rgb(216, 144, 166);\n  background-size: 100%;\n  min-width: 200px;\n  min-height: 100%;\n  padding: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9DQUFvQztFQUNwQyxxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixhQUFhO0FBQ2YiLCJmaWxlIjoiY2hhdC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYm9keSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMTYsIDE0NCwgMTY2KTtcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xuICBtaW4td2lkdGg6IDIwMHB4O1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAxNXB4O1xufVxuIl19 */"] });


/***/ }),

/***/ 3666:
/*!************************************************************************!*\
  !*** ./src/app/registered-page/content/about-me/about-me.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AboutMeComponent": () => (/* binding */ AboutMeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);

class AboutMeComponent {
    constructor() { }
    ngOnInit() {
    }
}
AboutMeComponent.ɵfac = function AboutMeComponent_Factory(t) { return new (t || AboutMeComponent)(); };
AboutMeComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AboutMeComponent, selectors: [["app-about-me"]], decls: 2, vars: 0, template: function AboutMeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "about-me works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhYm91dC1tZS5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 1944:
/*!**************************************************************!*\
  !*** ./src/app/registered-page/content/content.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContentComponent": () => (/* binding */ ContentComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 1258);


class ContentComponent {
    constructor() { }
    ngOnInit() {
    }
}
ContentComponent.ɵfac = function ContentComponent_Factory(t) { return new (t || ContentComponent)(); };
ContentComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ContentComponent, selectors: [["app-content"]], decls: 2, vars: 0, template: function ContentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet], styles: ["body[_ngcontent-%COMP%] {\n  background-color: rgb(255, 255, 255);\n  background-size: 100%;\n  min-width: 200px;\n  min-height: 100%;\n  \n  padding: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRlbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9DQUFvQztFQUNwQyxxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQiwyQkFBMkI7RUFDM0IsYUFBYTtBQUNmOztBQUVBOztHQUVHIiwiZmlsZSI6ImNvbnRlbnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImJvZHkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcbiAgbWluLXdpZHRoOiAyMDBweDtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgLyogd29yZC1icmVhazogYnJlYWstYWxsOyAqL1xuICBwYWRkaW5nOiAxNXB4O1xufVxuXG4vKiBwIHtcbiAgd29yZC1icmVhazogYnJlYWstYWxsO1xufSAqL1xuIl19 */"] });


/***/ }),

/***/ 3426:
/*!**********************************************************************!*\
  !*** ./src/app/registered-page/content/friends/friends.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FriendsComponent": () => (/* binding */ FriendsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);

class FriendsComponent {
    constructor() { }
    ngOnInit() {
    }
}
FriendsComponent.ɵfac = function FriendsComponent_Factory(t) { return new (t || FriendsComponent)(); };
FriendsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FriendsComponent, selectors: [["app-friends"]], decls: 2, vars: 0, template: function FriendsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "friends works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmcmllbmRzLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 3713:
/*!****************************************************************!*\
  !*** ./src/app/registered-page/content/live/live.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LiveComponent": () => (/* binding */ LiveComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);

class LiveComponent {
    constructor() { }
    ngOnInit() {
    }
}
LiveComponent.ɵfac = function LiveComponent_Factory(t) { return new (t || LiveComponent)(); };
LiveComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LiveComponent, selectors: [["app-live"]], decls: 2, vars: 0, template: function LiveComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "live works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsaXZlLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 3146:
/*!****************************************************************!*\
  !*** ./src/app/registered-page/content/play/play.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayComponent": () => (/* binding */ PlayComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);

class PlayComponent {
    constructor() { }
    ngOnInit() {
        let KeyBindings;
        (function (KeyBindings) {
            KeyBindings[KeyBindings["UP"] = 38] = "UP";
            KeyBindings[KeyBindings["DOWN"] = 40] = "DOWN";
        })(KeyBindings || (KeyBindings = {}));
        class Game {
            constructor() {
                this.gameCanvas = document.getElementById("game-canvas");
                this.gameContext = this.gameCanvas.getContext("2d");
                this.gameContext.font = "30px Orbitron";
                window.addEventListener("keydown", function (e) {
                    Game.keysPressed[e.which] = true;
                });
                window.addEventListener("keyup", function (e) {
                    Game.keysPressed[e.which] = false;
                });
                var paddleWidth = 20, paddleHeight = 60, ballSize = 10, wallOffset = 20;
                this.player1 = new Paddle(paddleWidth, paddleHeight, wallOffset, this.gameCanvas.height / 2 - paddleHeight / 2);
                this.computerPlayer = new ComputerPaddle(paddleWidth, paddleHeight, this.gameCanvas.width - (wallOffset + paddleWidth), this.gameCanvas.height / 2 - paddleHeight / 2);
                this.ball = new Ball(ballSize, ballSize, this.gameCanvas.width / 2 - ballSize / 2, this.gameCanvas.height / 2 - ballSize / 2);
            }
            drawBoardDetails() {
                //draw court outline
                this.gameContext.strokeStyle = "#fff";
                this.gameContext.lineWidth = 5;
                this.gameContext.strokeRect(10, 10, this.gameCanvas.width - 20, this.gameCanvas.height - 20);
                //draw center lines
                for (var i = 0; i + 30 < this.gameCanvas.height; i += 30) {
                    this.gameContext.fillStyle = "#fff";
                    this.gameContext.fillRect(this.gameCanvas.width / 2 - 10, i + 10, 15, 20);
                }
                //draw scores
                this.gameContext.fillText(Game.playerScore, 280, 50);
                this.gameContext.fillText(Game.computerScore, 390, 50);
            }
            update() {
                this.player1.update(this.gameCanvas);
                this.computerPlayer.update(this.ball, this.gameCanvas);
                this.ball.update(this.player1, this.computerPlayer, this.gameCanvas);
            }
            draw() {
                // this.gameContext.fillStyle = `#${Math.floor(Math.random() * 256)}${Math.floor(Math.random() * 256)}${Math.floor(Math.random() * 256)}`;
                this.gameContext.fillStyle = "#000";
                this.gameContext.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
                this.drawBoardDetails();
                this.player1.draw(this.gameContext);
                this.computerPlayer.draw(this.gameContext);
                this.ball.draw(this.gameContext);
            }
            gameLoop() {
                game.update();
                game.draw();
                requestAnimationFrame(game.gameLoop);
            }
        }
        Game.keysPressed = [];
        Game.playerScore = 0;
        Game.computerScore = 0;
        class Entity {
            constructor(w, h, x, y) {
                this.xVel = 0;
                this.yVel = 0;
                this.width = w;
                this.height = h;
                this.x = x;
                this.y = y;
            }
            draw(context) {
                context.fillStyle = "#fff";
                context.fillRect(this.x, this.y, this.width, this.height);
            }
        }
        class Paddle extends Entity {
            constructor(w, h, x, y) {
                super(w, h, x, y);
                this.speed = 10;
            }
            update(canvas) {
                if (Game.keysPressed[KeyBindings.UP]) {
                    this.yVel = -1;
                    if (this.y <= 20) {
                        this.yVel = 0;
                    }
                }
                else if (Game.keysPressed[KeyBindings.DOWN]) {
                    this.yVel = 1;
                    if (this.y + this.height >= canvas.height - 20) {
                        this.yVel = 0;
                    }
                }
                else {
                    this.yVel = 0;
                }
                this.y += this.yVel * this.speed;
            }
        }
        class ComputerPaddle extends Entity {
            constructor(w, h, x, y) {
                super(w, h, x, y);
                this.speed = 10;
            }
            update(ball, canvas) {
                //chase ball
                if (ball.y < this.y && ball.xVel == 1) {
                    this.yVel = -1;
                    if (this.y <= 20) {
                        this.yVel = 0;
                    }
                }
                else if (ball.y > this.y + this.height && ball.xVel == 1) {
                    this.yVel = 1;
                    if (this.y + this.height >= canvas.height - 20) {
                        this.yVel = 0;
                    }
                }
                else {
                    this.yVel = 0;
                }
                this.y += this.yVel * this.speed;
            }
        }
        class Ball extends Entity {
            constructor(w, h, x, y) {
                super(w, h, x, y);
                this.speed = 5;
                var randomDirection = Math.floor(Math.random() * 2) + 1;
                if (randomDirection % 2) {
                    this.xVel = 1;
                }
                else {
                    this.xVel = -1;
                }
                this.yVel = 1;
            }
            update(player, computer, canvas) {
                //check top canvas bounds
                if (this.y <= 10) {
                    this.yVel = 1;
                }
                //check bottom canvas bounds
                if (this.y + this.height >= canvas.height - 10) {
                    this.yVel = -1;
                }
                //check left canvas bounds
                if (this.x <= 0) {
                    this.x = canvas.width / 2 - this.width / 2;
                    Game.computerScore += 1;
                }
                //check right canvas bounds
                if (this.x + this.width >= canvas.width) {
                    this.x = canvas.width / 2 - this.width / 2;
                    Game.playerScore += 1;
                }
                //check player collision
                if (this.x <= player.x + player.width) {
                    if (this.y >= player.y && this.y + this.height <= player.y + player.height) {
                        this.xVel = 1;
                    }
                }
                //check computer collision
                if (this.x + this.width >= computer.x) {
                    if (this.y >= computer.y && this.y + this.height <= computer.y + computer.height) {
                        this.xVel = -1;
                    }
                }
                this.x += this.xVel * this.speed;
                this.y += this.yVel * this.speed;
            }
        }
        var game = new Game();
        requestAnimationFrame(game.gameLoop);
    }
}
PlayComponent.ɵfac = function PlayComponent_Factory(t) { return new (t || PlayComponent)(); };
PlayComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PlayComponent, selectors: [["app-play"]], decls: 9, vars: 0, consts: [["href", "https://fonts.googleapis.com/css?family=Comfortaa:900", "rel", "stylesheet", "type", "text/css"], ["width", "700", "height", "400", "id", "game-canvas"]], template: function PlayComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "html");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "head");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Typescript Pong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "link", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "canvas", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Move left paddle up and down with the arrow keys");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["body[_ngcontent-%COMP%]{\n    text-align: center;\n  }\n  canvas[_ngcontent-%COMP%]{\n    display: block;\n    margin: 0px auto;\n    background: rgb(187, 101, 101);\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXkuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGtCQUFrQjtFQUNwQjtFQUNBO0lBQ0UsY0FBYztJQUNkLGdCQUFnQjtJQUNoQiw4QkFBOEI7RUFDaEMiLCJmaWxlIjoicGxheS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYm9keXtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbiAgY2FudmFze1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1hcmdpbjogMHB4IGF1dG87XG4gICAgYmFja2dyb3VuZDogcmdiKDE4NywgMTAxLCAxMDEpO1xuICB9Il19 */"] });


/***/ }),

/***/ 1776:
/*!**********************************************************************!*\
  !*** ./src/app/registered-page/content/ranking/ranking.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RankingComponent": () => (/* binding */ RankingComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);

class RankingComponent {
    constructor() { }
    ngOnInit() {
    }
}
RankingComponent.ɵfac = function RankingComponent_Factory(t) { return new (t || RankingComponent)(); };
RankingComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RankingComponent, selectors: [["app-ranking"]], decls: 2, vars: 0, template: function RankingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "ranking works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyYW5raW5nLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 1600:
/*!******************************************************************!*\
  !*** ./src/app/registered-page/content/rules/rules.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RulesComponent": () => (/* binding */ RulesComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);

class RulesComponent {
    constructor() { }
    ngOnInit() {
    }
}
RulesComponent.ɵfac = function RulesComponent_Factory(t) { return new (t || RulesComponent)(); };
RulesComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RulesComponent, selectors: [["app-rules"]], decls: 35, vars: 0, consts: [[1, "row", "middle"], [1, "col"], [1, "Pong"], [1, "block"], [1, "text-justify"], [1, "text-center"], ["src", "https://i.gifer.com/RY6p.gif", 1, "rounded"], [1, "chat-rules"]], template: function RulesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Pong Rules");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "What is Pong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Pong is one of the first computer games that ever created, this simple \"tennis like\" game features two paddles and a ball, the goal is to defeat your opponent by being the first one to gain 10 points, a player gets a point once the opponent misses a ball.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "How to play");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " You just have to move left paddle up and down with the arrow keys. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Chat Rules");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Be kind");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, " Giving constructive feedback is good. Being unnecessarily mean isn\u2019t what we do here. Make sure you take the time to evaluate which you are doing before you send a message. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Respect other humans");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, " We know our pong players are fine specimens of humanity. Complimenting them is good. Sexually objectifying, creeping on, describing violent actions toward, describing your physical reactions to, or otherwise dehumanizing them is not. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Include everyone");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, " We want this chat to be a safe and welcoming place for everyone. Don't do anything that might make someone feel like they don't belong. This includes but is not limited to generalizations of types of people, hate speech, or discriminatory language based on gender, religion, ethnicity, sex or socioeconomic background. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".col[_ngcontent-%COMP%] {\n  margin: 5%;\n  background-color: rgb(248, 248, 248);\n  \n}\n\n.middle[_ngcontent-%COMP%] {\n  height: 100%;\n  \n  \n}\n\n.row[_ngcontent-%COMP%] {\n  margin-left: 0%;\n  margin-right: 0%;\n}\n\n.block[_ngcontent-%COMP%] {\n  background-color: rgb(245, 237, 237);\n}\n\nimg[_ngcontent-%COMP%] {\n  width: 230px;\n  height: 150px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxVQUFVO0VBQ1Ysb0NBQW9DO0VBQ3BDLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixrQ0FBa0M7RUFDbEMsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtBQUNsQjs7QUFDQTtFQUNFLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0FBQ2YiLCJmaWxlIjoicnVsZXMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb2wge1xuICBtYXJnaW46IDUlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ4LCAyNDgsIDI0OCk7XG4gIC8qIG1pbi13aWR0aDogMjUwcHg7ICovXG59XG5cbi5taWRkbGUge1xuICBoZWlnaHQ6IDEwMCU7XG4gIC8qIFNlZW1zIHRvIHdvcmsgaW4gdGhlIHNhbWUgd2F5ICovXG4gIC8qIGZsZXgtZ3JvdzogMTsgKi9cbn1cblxuLnJvdyB7XG4gIG1hcmdpbi1sZWZ0OiAwJTtcbiAgbWFyZ2luLXJpZ2h0OiAwJTtcbn1cbi5ibG9jayB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDIzNywgMjM3KTtcbn1cblxuaW1nIHtcbiAgd2lkdGg6IDIzMHB4O1xuICBoZWlnaHQ6IDE1MHB4O1xufSJdfQ== */"] });


/***/ }),

/***/ 4573:
/*!******************************************************************!*\
  !*** ./src/app/registered-page/content/stats/stats.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatsComponent": () => (/* binding */ StatsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);

class StatsComponent {
    constructor() { }
    ngOnInit() {
    }
}
StatsComponent.ɵfac = function StatsComponent_Factory(t) { return new (t || StatsComponent)(); };
StatsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: StatsComponent, selectors: [["app-stats"]], decls: 2, vars: 0, template: function StatsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "stats works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzdGF0cy5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 4141:
/*!**********************************************************************!*\
  !*** ./src/app/registered-page/content/welcome/welcome.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WelcomeComponent": () => (/* binding */ WelcomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var ngx_online_status__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-online-status */ 3917);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4364);



function WelcomeComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Welcome ! You have successfully logged in !\n");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function WelcomeComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Oh, oh... Something went wrong ! There is no connexion.\n");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class WelcomeComponent {
    constructor(onlineStatusService) {
        this.onlineStatusService = onlineStatusService;
        this.status = 1;
        this.onlineStatusService.status.subscribe((status) => {
            this.status = status;
        });
    }
    ngOnInit() {
    }
}
WelcomeComponent.ɵfac = function WelcomeComponent_Factory(t) { return new (t || WelcomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_online_status__WEBPACK_IMPORTED_MODULE_1__.OnlineStatusService)); };
WelcomeComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WelcomeComponent, selectors: [["app-welcome"]], decls: 2, vars: 2, consts: [["class", "alert alert-success", "role", "alert", 4, "ngIf"], ["class", "alert alert-danger", "role", "alert", 4, "ngIf"], ["role", "alert", 1, "alert", "alert-success"], ["role", "alert", 1, "alert", "alert-danger"]], template: function WelcomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WelcomeComponent_div_0_Template, 2, 0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WelcomeComponent_div_1_Template, 2, 0, "div", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.status);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.status);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ3ZWxjb21lLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 4345:
/*!************************************************************!*\
  !*** ./src/app/registered-page/header/header.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeaderComponent": () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ 9369);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var src_app_services_sf_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/sf-user.service */ 495);
/* harmony import */ var src_app_services_sf_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/sf-global.service */ 7167);




class HeaderComponent {
  /* Need to deal with later (case of update ?) */
  // user: if_user = {
  //   login: '',
  //   pseudo: '',
  //   avatar: '',
  //   status: '',
  //   bio: '',
  //   pending_queue: false,
  //   banned: false,
  //   admonishement: 0,
  //   app_role: '',
  //   created_web_app: new Date(),
  //   updated_web_app: new Date(),
  //   last_name: '',
  //   first_name: '',
  //   mail: '',
  //   created_api: new Date(),
  //   updated_api: new Date(),
  // };
  constructor(userService, global) {
    this.userService = userService;
    this.global = global;
  }

  ngOnInit() {// try {
    //   this.user = await this.userService.getUser();
    //   console.log(this.user.login);
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }

    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)(function* () {})();
  }

}

HeaderComponent.ɵfac = function HeaderComponent_Factory(t) {
  return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_sf_user_service__WEBPACK_IMPORTED_MODULE_1__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_sf_global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService));
};

HeaderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: HeaderComponent,
  selectors: [["app-header"]],
  decls: 25,
  vars: 4,
  consts: [[1, "container"], [1, "flex-grid"], [1, "d-flex", "justify-content-center", "align-items-center"], [1, "rounded-circle", 3, "alt", "src"]],
  template: function HeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "header");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "img", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "login");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "pseudo");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "points");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "000000 pts");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](22, "classement");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "1st");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("alt", ctx.userService.user.login);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("src", ctx.userService.user.avatar, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.userService.user.login);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.userService.user.pseudo);
    }
  },
  styles: ["header[_ngcontent-%COMP%] {\n  display: flex;\n  \n  background: rgb(245, 111, 111);\n\n  height: auto;\n  min-height: 150px;\n  padding: 25px;\n}\n.rounded-circle[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n}\n.title[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 20px;\n}\n.title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  padding-left: 20px;\n}\n.card-horizontal[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1 1 auto;\n}\n.flex-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  padding-left: 0%;\n  padding-right: 0%;\n}\n.flex-grid[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  margin: 10px;\n  padding: 0px;\n  width: 200px;\n}\n.flex-grid[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  text-align: center;\n  \n  padding-top: 30%;\n  font-size: 14px;\n  width: auto;\n  font-weight: 200;\n  \n}\n.flex-grid[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  text-align: center;\n  width: auto;\n  font-weight: 600;\n  word-break: break-all;\n}\nimg[_ngcontent-%COMP%] {\n  object-fit: cover;\n}\n@media (max-width: 1000px) {\n  .flex-grid[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n\n  .flex-grid[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    margin-right: 0;\n  }\n\n  \n  .flex-grid[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    padding-top: 5%;\n  }\n}\n@media (max-width: 600px) {\n  .flex-grid[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    margin: 5px;\n    padding: 0px;\n    height: auto;\n  }\n\n  .flex-grid[_ngcontent-%COMP%] {\n    flex-direction: column;\n    flex-wrap: wrap;\n  }\n\n  \n  .flex-grid[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    padding-top: 5%;\n  }\n\n  .flex-grid[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    margin-right: 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtFQUNiLHlCQUF5QjtFQUN6Qiw4QkFBOEI7O0VBRTlCLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsYUFBYTtBQUNmO0FBQ0E7RUFDRSxZQUFZO0VBQ1osYUFBYTtBQUNmO0FBRUE7RUFDRSxhQUFhO0VBQ2IsYUFBYTtBQUNmO0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLGFBQWE7RUFDYixjQUFjO0FBQ2hCO0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLDZCQUE2QjtFQUM3QixnQkFBZ0I7RUFDaEIsaUJBQWlCO0FBQ25CO0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLFlBQVk7QUFDZDtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHdCQUF3QjtFQUN4QixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIsb0RBQW9EO0FBQ3REO0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixxQkFBcUI7QUFDdkI7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjtBQUVBO0VBQ0U7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQSxtQkFBbUI7RUFDbkI7SUFDRSxlQUFlO0VBQ2pCO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztJQUNYLFlBQVk7SUFDWixZQUFZO0VBQ2Q7O0VBRUE7SUFDRSxzQkFBc0I7SUFDdEIsZUFBZTtFQUNqQjs7RUFFQSxtQkFBbUI7RUFDbkI7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjtBQUNGIiwiZmlsZSI6ImhlYWRlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgLyogYmFja2dyb3VuZDogI2U3ZDVkNTsgKi9cbiAgYmFja2dyb3VuZDogcmdiKDI0NSwgMTExLCAxMTEpO1xuXG4gIGhlaWdodDogYXV0bztcbiAgbWluLWhlaWdodDogMTUwcHg7XG4gIHBhZGRpbmc6IDI1cHg7XG59XG4ucm91bmRlZC1jaXJjbGUge1xuICB3aWR0aDogMTAwcHg7XG4gIGhlaWdodDogMTAwcHg7XG59XG5cbi50aXRsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmc6IDIwcHg7XG59XG5cbi50aXRsZSBwIHtcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xufVxuXG4uY2FyZC1ob3Jpem9udGFsIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleDogMSAxIGF1dG87XG59XG5cbi5mbGV4LWdyaWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBwYWRkaW5nLWxlZnQ6IDAlO1xuICBwYWRkaW5nLXJpZ2h0OiAwJTtcbn1cblxuLmZsZXgtZ3JpZCA+IGRpdiB7XG4gIG1hcmdpbjogMTBweDtcbiAgcGFkZGluZzogMHB4O1xuICB3aWR0aDogMjAwcHg7XG59XG5cbi5mbGV4LWdyaWQgaDMge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIC8qIHBhZGRpbmc6IDEycHggMTVweDsgKi9cbiAgcGFkZGluZy10b3A6IDMwJTtcbiAgZm9udC1zaXplOiAxNHB4O1xuICB3aWR0aDogYXV0bztcbiAgZm9udC13ZWlnaHQ6IDIwMDtcbiAgLyogYm9yZGVyLWJvdHRvbTogMC43NXB4IHNvbGlkIHJnYigxNDksIDE5MSwgMjE5KTsgKi9cbn1cblxuLmZsZXgtZ3JpZCBwIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogYXV0bztcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgd29yZC1icmVhazogYnJlYWstYWxsO1xufVxuXG5pbWcge1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDEwMDBweCkge1xuICAuZmxleC1ncmlkIHtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gIH1cblxuICAuZmxleC1ncmlkID4gZGl2IHtcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gIH1cblxuICAvKiBTbWFsbGVyIGhlYWRlciAqL1xuICAuZmxleC1ncmlkIGgzIHtcbiAgICBwYWRkaW5nLXRvcDogNSU7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gIC5mbGV4LWdyaWQgPiBkaXYge1xuICAgIG1hcmdpbjogNXB4O1xuICAgIHBhZGRpbmc6IDBweDtcbiAgICBoZWlnaHQ6IGF1dG87XG4gIH1cblxuICAuZmxleC1ncmlkIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgfVxuXG4gIC8qIFNtYWxsZXIgaGVhZGVyICovXG4gIC5mbGV4LWdyaWQgaDMge1xuICAgIHBhZGRpbmctdG9wOiA1JTtcbiAgfVxuXG4gIC5mbGV4LWdyaWQgPiBkaXYge1xuICAgIG1hcmdpbi1yaWdodDogMDtcbiAgfVxufVxuIl19 */"]
});

/***/ }),

/***/ 1680:
/*!**************************************************************!*\
  !*** ./src/app/registered-page/registered-page.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisteredPageComponent": () => (/* binding */ RegisteredPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar/sidebar.component */ 3176);
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header/header.component */ 4345);
/* harmony import */ var _content_content_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./content/content.component */ 1944);
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chat/chat.component */ 6154);






class RegisteredPageComponent {
    constructor() {
        this.notifyAppComponent = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
    }
    sidebarLogOutEvent(event) {
        this.notifyAppComponent.emit('event');
    }
}
RegisteredPageComponent.ɵfac = function RegisteredPageComponent_Factory(t) { return new (t || RegisteredPageComponent)(); };
RegisteredPageComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: RegisteredPageComponent, selectors: [["app-registered-page"]], outputs: { notifyAppComponent: "notifyAppComponent" }, decls: 10, vars: 0, consts: [[1, "d-flex"], [3, "handleLogOutClick"], [1, "col", "right"], [1, "row"], [1, "row", "middle"], [1, "col", "left-col"], [1, "col", "right-col"]], template: function RegisteredPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "app-sidebar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("handleLogOutClick", function RegisteredPageComponent_Template_app_sidebar_handleLogOutClick_1_listener($event) { return ctx.sidebarLogOutEvent($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "app-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "app-chat");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } }, directives: [_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_0__.SidebarComponent, _header_header_component__WEBPACK_IMPORTED_MODULE_1__.HeaderComponent, _content_content_component__WEBPACK_IMPORTED_MODULE_2__.ContentComponent, _chat_chat_component__WEBPACK_IMPORTED_MODULE_3__.ChatComponent], styles: ["app-header[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0px;\n}\n\n\n\n.right-col[_ngcontent-%COMP%] {\n  flex: 25%;\n}\n\n.left-col[_ngcontent-%COMP%] {\n  flex: 75%;\n}\n\n.col[_ngcontent-%COMP%] {\n  padding-left: 0%;\n  padding-right: 0%;\n  background-color: bisque;\n}\n\n.right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.middle[_ngcontent-%COMP%] {\n  height: 100%;\n  \n  \n}\n\n.row[_ngcontent-%COMP%] {\n  margin-left: 0%;\n  margin-right: 0%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdGVyZWQtcGFnZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsT0FBTztFQUNQLFlBQVk7QUFDZDs7QUFFQTs7OztHQUlHOztBQUVIO0VBQ0UsU0FBUztBQUNYOztBQUVBO0VBQ0UsU0FBUztBQUNYOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGtDQUFrQztFQUNsQyxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCIiwiZmlsZSI6InJlZ2lzdGVyZWQtcGFnZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLWhlYWRlciB7XG4gIGZsZXg6IDE7XG4gIHBhZGRpbmc6IDBweDtcbn1cblxuLyogQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gIC5jb2x1bW4ge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59ICovXG5cbi5yaWdodC1jb2wge1xuICBmbGV4OiAyNSU7XG59XG5cbi5sZWZ0LWNvbCB7XG4gIGZsZXg6IDc1JTtcbn1cblxuLmNvbCB7XG4gIHBhZGRpbmctbGVmdDogMCU7XG4gIHBhZGRpbmctcmlnaHQ6IDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7XG59XG5cbi5yaWdodCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5taWRkbGUge1xuICBoZWlnaHQ6IDEwMCU7XG4gIC8qIFNlZW1zIHRvIHdvcmsgaW4gdGhlIHNhbWUgd2F5ICovXG4gIC8qIGZsZXgtZ3JvdzogMTsgKi9cbn1cblxuLnJvdyB7XG4gIG1hcmdpbi1sZWZ0OiAwJTtcbiAgbWFyZ2luLXJpZ2h0OiAwJTtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 3176:
/*!**************************************************************!*\
  !*** ./src/app/registered-page/sidebar/sidebar.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SidebarComponent": () => (/* binding */ SidebarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 1258);



class SidebarComponent {
    constructor() {
        this.handleLogOutClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    }
    onLogOut() {
        this.handleLogOutClick.emit('event');
    }
}
SidebarComponent.ɵfac = function SidebarComponent_Factory(t) { return new (t || SidebarComponent)(); };
SidebarComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SidebarComponent, selectors: [["app-sidebar"]], outputs: { handleLogOutClick: "handleLogOutClick" }, decls: 45, vars: 0, consts: [[1, "sidebar"], [1, "fixed"], ["routerLink", "/welcome", 1, "d-flex", "align-items-center", "pb-3", "mb-3", "link-dark", "text-decoration-none", "border-bottom", "logo-link"], ["src", "../../../assets/canvalogotransparent.png", "alt", "Pong", 1, "fit-picture"], [1, "list-unstyled", "ps-0"], [1, "mb-1"], ["data-bs-toggle", "collapse", "data-bs-target", "#home-collapse", "aria-expanded", "true", 1, "btn", "btn-toggle", "align-items-center", "rounded", "collapsed"], ["id", "home-collapse", 1, "collapse", "show"], [1, "btn-toggle-nav", "list-unstyled", "fw-normal", "pb-1", "small"], ["routerLink", "profile/about-me", 1, "link-dark", "rounded"], ["routerLink", "profile/my-friends", 1, "link-dark", "rounded"], ["routerLink", "profile/my-stats", 1, "link-dark", "rounded"], ["data-bs-toggle", "collapse", "data-bs-target", "#dashboard-collapse", "aria-expanded", "true", 1, "btn", "btn-toggle", "align-items-center", "rounded", "collapsed"], ["id", "dashboard-collapse", 1, "collapse", "show"], ["routerLink", "pong/play", 1, "link-dark", "rounded"], ["routerLink", "pong/live", 1, "link-dark", "rounded"], ["routerLink", "pong/ranking", 1, "link-dark", "rounded"], ["routerLink", "pong/rules", 1, "link-dark", "rounded"], [1, "border-top", "my-3"], ["data-bs-toggle", "collapse", "data-bs-target", "#account-collapse", "aria-expanded", "false", 1, "btn", "btn-toggle", "align-items-center", "rounded", "collapsed"], ["id", "account-collapse", 1, "collapse"], [1, "link-dark", "rounded", 3, "click"]], template: function SidebarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ul", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Profile ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "ul", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "About me");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "My friends");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "My stats");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " Pong ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "ul", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "a", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Play");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "a", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Live");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Ranking");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Rules");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "li", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, " Sign out ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "ul", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "a", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SidebarComponent_Template_a_click_43_listener() { return ctx.onLogOut(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "Log out");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLinkWithHref], styles: [".sidebar[_ngcontent-%COMP%] {\n  width: 280px;\n  height: 100%;\n  min-height: 100vh;\n  \n  \n  background-color: rgb(129, 176, 218);\n  \n  background-size: cover;\n  padding: 1rem;\n}\n.fixed[_ngcontent-%COMP%] {\n  position: fixed;\n}\n.fit-picture[_ngcontent-%COMP%] {\n  width: 200px;\n  height: 200px;\n}\n.logo-link[_ngcontent-%COMP%] {\n  padding-left: 15px;\n}\n.btn-toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.25rem 0.5rem;\n  font-weight: 600;\n  color: rgba(0, 0, 0, 0.65);\n  background-color: transparent;\n  border: 0;\n}\n.btn-toggle[_ngcontent-%COMP%]:hover, .btn-toggle[_ngcontent-%COMP%]:focus {\n  color: rgba(0, 0, 0, 0.85);\n  background-color: #ffffff;\n}\n.btn-toggle[_ngcontent-%COMP%]::before {\n  width: 1.25em;\n  line-height: 0;\n  content: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e\");\n  transition: transform 0.35s ease;\n  transform-origin: 0.5em 50%;\n}\n.btn-toggle[aria-expanded=\"true\"][_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.85);\n}\n.btn-toggle[aria-expanded=\"true\"][_ngcontent-%COMP%]::before {\n  transform: rotate(90deg);\n}\n.btn-toggle-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.1875rem 0.5rem;\n  margin-top: 0.125rem;\n  margin-left: 1.25rem;\n  text-decoration: none;\n}\n.btn-toggle-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .btn-toggle-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus {\n  background-color: #ffffff;\n}\na[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n@media (max-width: 1000px) {\n  .sidebar[_ngcontent-%COMP%] {\n    width: 200px;\n  }\n\n  .fit-picture[_ngcontent-%COMP%] {\n    width: 150px;\n    height: 150px;\n  }\n\n  .logo-link[_ngcontent-%COMP%] {\n    padding-left: 5px;\n  }\n}\n@media (max-width: 500px) {\n  .sidebar[_ngcontent-%COMP%] {\n    width: 140px;\n  }\n\n  .fit-picture[_ngcontent-%COMP%] {\n    width: 90px;\n    height: 90px;\n  }\n}\n@media (max-height: 500px) {\n  .sidebar[_ngcontent-%COMP%] {\n    width: 140px;\n  }\n\n  .fit-picture[_ngcontent-%COMP%] {\n    width: 90px;\n    height: 90px;\n  }\n\n  \n  .fixed[_ngcontent-%COMP%] {\n    position: absolute;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZGViYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVk7RUFDWixZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLHNCQUFzQjtFQUN0Qiw4REFBOEQ7RUFDOUQsb0NBQW9DO0VBQ3BDLDBDQUEwQztFQUMxQyxzQkFBc0I7RUFDdEIsYUFBYTtBQUNmO0FBQ0E7RUFDRSxlQUFlO0FBQ2pCO0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtBQUNmO0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGdCQUFnQjtFQUNoQiwwQkFBMEI7RUFDMUIsNkJBQTZCO0VBQzdCLFNBQVM7QUFDWDtBQUNBOztFQUVFLDBCQUEwQjtFQUMxQix5QkFBeUI7QUFDM0I7QUFFQTtFQUNFLGFBQWE7RUFDYixjQUFjO0VBQ2QseVFBQXlRO0VBQ3pRLGdDQUFnQztFQUNoQywyQkFBMkI7QUFDN0I7QUFFQTtFQUNFLDBCQUEwQjtBQUM1QjtBQUNBO0VBQ0Usd0JBQXdCO0FBQzFCO0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIseUJBQXlCO0VBQ3pCLG9CQUFvQjtFQUNwQixvQkFBb0I7RUFDcEIscUJBQXFCO0FBQ3ZCO0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCO0FBRUE7RUFDRSxlQUFlO0FBQ2pCO0FBRUE7RUFDRTtJQUNFLFlBQVk7RUFDZDs7RUFFQTtJQUNFLFlBQVk7SUFDWixhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxpQkFBaUI7RUFDbkI7QUFDRjtBQUVBO0VBQ0U7SUFDRSxZQUFZO0VBQ2Q7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsWUFBWTtFQUNkO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsWUFBWTtFQUNkOztFQUVBO0lBQ0UsV0FBVztJQUNYLFlBQVk7RUFDZDs7RUFFQSw2Q0FBNkM7RUFDN0M7SUFDRSxrQkFBa0I7RUFDcEI7QUFDRiIsImZpbGUiOiJzaWRlYmFyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2lkZWJhciB7XG4gIHdpZHRoOiAyODBweDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgLyogbWluLWhlaWdodDogYXV0bzsgKi9cbiAgLyogYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2Jhbm5lcmZpZ21hLnBuZ1wiKTsgKi9cbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEyOSwgMTc2LCAyMTgpO1xuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTc5LCAxOTksIDIxMik7ICovXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gIHBhZGRpbmc6IDFyZW07XG59XG4uZml4ZWQge1xuICBwb3NpdGlvbjogZml4ZWQ7XG59XG5cbi5maXQtcGljdHVyZSB7XG4gIHdpZHRoOiAyMDBweDtcbiAgaGVpZ2h0OiAyMDBweDtcbn1cblxuLmxvZ28tbGluayB7XG4gIHBhZGRpbmctbGVmdDogMTVweDtcbn1cblxuLmJ0bi10b2dnbGUge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMC4yNXJlbSAwLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNjUpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiAwO1xufVxuLmJ0bi10b2dnbGU6aG92ZXIsXG4uYnRuLXRvZ2dsZTpmb2N1cyB7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuODUpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xufVxuXG4uYnRuLXRvZ2dsZTo6YmVmb3JlIHtcbiAgd2lkdGg6IDEuMjVlbTtcbiAgbGluZS1oZWlnaHQ6IDA7XG4gIGNvbnRlbnQ6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM2NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTYnIGhlaWdodD0nMTYnIHZpZXdCb3g9JzAgMCAxNiAxNiclM2UlM2NwYXRoIGZpbGw9J25vbmUnIHN0cm9rZT0ncmdiYSUyODAsMCwwLC41JTI5JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMicgZD0nTTUgMTRsNi02LTYtNicvJTNlJTNjL3N2ZyUzZVwiKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMzVzIGVhc2U7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAuNWVtIDUwJTtcbn1cblxuLmJ0bi10b2dnbGVbYXJpYS1leHBhbmRlZD1cInRydWVcIl0ge1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjg1KTtcbn1cbi5idG4tdG9nZ2xlW2FyaWEtZXhwYW5kZWQ9XCJ0cnVlXCJdOjpiZWZvcmUge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG59XG5cbi5idG4tdG9nZ2xlLW5hdiBhIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIHBhZGRpbmc6IDAuMTg3NXJlbSAwLjVyZW07XG4gIG1hcmdpbi10b3A6IDAuMTI1cmVtO1xuICBtYXJnaW4tbGVmdDogMS4yNXJlbTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuLmJ0bi10b2dnbGUtbmF2IGE6aG92ZXIsXG4uYnRuLXRvZ2dsZS1uYXYgYTpmb2N1cyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG59XG5cbmEge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiAxMDAwcHgpIHtcbiAgLnNpZGViYXIge1xuICAgIHdpZHRoOiAyMDBweDtcbiAgfVxuXG4gIC5maXQtcGljdHVyZSB7XG4gICAgd2lkdGg6IDE1MHB4O1xuICAgIGhlaWdodDogMTUwcHg7XG4gIH1cblxuICAubG9nby1saW5rIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDVweDtcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcbiAgLnNpZGViYXIge1xuICAgIHdpZHRoOiAxNDBweDtcbiAgfVxuXG4gIC5maXQtcGljdHVyZSB7XG4gICAgd2lkdGg6IDkwcHg7XG4gICAgaGVpZ2h0OiA5MHB4O1xuICB9XG59XG5cbkBtZWRpYSAobWF4LWhlaWdodDogNTAwcHgpIHtcbiAgLnNpZGViYXIge1xuICAgIHdpZHRoOiAxNDBweDtcbiAgfVxuXG4gIC5maXQtcGljdHVyZSB7XG4gICAgd2lkdGg6IDkwcHg7XG4gICAgaGVpZ2h0OiA5MHB4O1xuICB9XG5cbiAgLyogU2Nyb2xsYWJsZSBoZWFkZXIgd2hlbiBob3Jpem9udGFsIHNjcmVlbiAqL1xuICAuZml4ZWQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgfVxufVxuIl19 */"] });


/***/ }),

/***/ 5420:
/*!*********************************************!*\
  !*** ./src/app/services/sf-auth.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ 9369);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ 1172);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _sf_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sf-global.service */ 7167);
/* harmony import */ var _sf_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sf-user.service */ 495);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 1258);






class AuthService {
  constructor(global, userService, router) {
    this.global = global;
    this.userService = userService;
    this.router = router;
  }

  ngOnInit() {}

  getLoggedIn() {
    var _this = this;

    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)(function* () {
      var _a;

      const code = (_a = _this.router.url.split('?')[1]) === null || _a === void 0 ? void 0 : _a.substr(5, 64);

      try {
        console.log('0');
        const res = yield axios__WEBPACK_IMPORTED_MODULE_1___default().get('http://127.0.0.1:3000/cb-auth', {
          params: {
            code: code
          }
        });
        console.log('1 = ', res.data.data);

        if (res.data.data === 'error') {
          console.log('error in getLoggedIn');

          _this.router.navigate(['/']);
        } else {
          _this.userService.apiStatus(res.data);
        }
      } catch (error) {
        console.log('ngInit Auth error = ', error);

        _this.router.navigate(['/auth']);
      }
    })();
  }

}

AuthService.ɵfac = function AuthService_Factory(t) {
  return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_sf_global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_sf_user_service__WEBPACK_IMPORTED_MODULE_3__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
};

AuthService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: AuthService,
  factory: AuthService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 7167:
/*!***********************************************!*\
  !*** ./src/app/services/sf-global.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalService": () => (/* binding */ GlobalService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);

class GlobalService {
    constructor() {
        this.login = undefined;
        this.socketId = undefined;
    }
}
GlobalService.ɵfac = function GlobalService_Factory(t) { return new (t || GlobalService)(); };
GlobalService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GlobalService, factory: GlobalService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 495:
/*!*********************************************!*\
  !*** ./src/app/services/sf-user.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserService": () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ 9369);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ 1172);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _sf_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sf-global.service */ 7167);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 1258);
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-socket-io */ 5083);






class UserService {
  constructor(global, router, socket) {
    this.global = global;
    this.router = router;
    this.socket = socket;
    this.user = {
      login: '',
      pseudo: '',
      avatar: '',
      status: 'online',
      bio: '',
      pending_queue: false,
      banned: false,
      admonishement: 0,
      app_role: 'user',
      last_name: '',
      first_name: '',
      mail: '',
      created: new Date(),
      updated: new Date()
    };
    this.readyToDisplayForm = false;
  }

  ngOnInit() {}

  apiStatus(response) {
    var _this = this;

    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)(function* () {
      var _a;

      if (response.isFound == 'found') {
        _this.router.navigate(['/welcome']);

        _this.user = response.data;
        _this.global.login = response.data.login;
        console.log('connnneccctionnnnn');

        _this.socket.on('connect', () => {
          console.log('conection');

          _this.introduce(_this.socket);
        });

        _this.socket.connect();
      } else {
        console.log('response is :', response);
        (_a = document.getElementById('toOpenModal')) === null || _a === void 0 ? void 0 : _a.click();
        yield _this.handleSubmitClick();

        _this.fillUserInfos(response);

        _this.registerBackInRequest(response);
      }
    })();
  }

  introduce(socket) {
    this.global.socketId = socket.ioSocket.id;
    const message = {
      id: socket.ioSocket.id,
      login: this.global.login,
      body: 'connection',
      to: ['nobody'],
      conv_id: 0,
      date: new Date()
    };
    socket.emit('introduction', message);
  }

  registerBackInRequest(response) {
    var _this2 = this;

    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)(function* () {
      console.log("registerBackInRequest");

      try {
        const registerData = yield axios__WEBPACK_IMPORTED_MODULE_1___default().post('http://127.0.0.1:3000/cb-auth/registerData', {
          data: _this2.user
        });
        console.log('registerData = ', registerData);
        if (registerData.data !== 'Successfully created') _this2.router.navigate(['/auth']);else {
          console.log('the result of the registerData request is = ', registerData);
          _this2.global.login = response.data.login;

          _this2.socket.on('connect', () => {
            console.log('conection');

            _this2.introduce(_this2.socket);
          });

          _this2.socket.connect();

          _this2.router.navigate(['/welcome']);
        }
      } catch (error) {
        console.log('the registerData request failed with ', error);

        _this2.router.navigate(['/auth']);
      }
    })();
  }

  fillUserInfos(response) {
    console.log(document.getElementById('avatarUrl').value);
    this.user.login = response.data.login;

    if (document.getElementById('avatarUrl').value === '../../../assets/myIntraPictureBlack.png') {
      this.user.avatar = response.data.image_url;
    } else {
      this.user.avatar = document.getElementById('avatarUrl').value;
    }

    this.user.first_name = response.data.first_name;
    this.user.last_name = response.data.last_name;
    this.user.mail = response.data.email;
    this.user.pseudo = document.getElementById('pseudo').value;
    this.user.bio = document.getElementById('bio').value;
  }

  handleSubmitClick() {
    return new Promise(function (resolve) {
      var _a;

      (_a = document.getElementById('submitId')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        console.log('2- User clicked on submit !!!');
        resolve('OK');
      });
    });
  }

}

UserService.ɵfac = function UserService_Factory(t) {
  return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_sf_global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](ngx_socket_io__WEBPACK_IMPORTED_MODULE_5__.Socket));
};

UserService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: UserService,
  factory: UserService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 1570);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ }),

/***/ 6461:
/*!***************************************************************!*\
  !*** ./node_modules/webpack/hot/ sync nonrecursive ^\.\/log$ ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./log": 708
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 6461;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(3208), __webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map