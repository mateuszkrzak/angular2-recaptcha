"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
;
/*
 * Common service shared by all reCaptcha component instances
 * through dependency injection.
 * This service has the task of loading the reCaptcha API once for all.
 * Only the first instance of the component creates the service, subsequent
 * components will use the existing instance.
 *
 * As the language is passed to the <script>, the first component
 * determines the language of all subsequent components. This is a limitation
 * of the present Google API.
 */
var ReCaptchaService = (function () {
    function ReCaptchaService(zone) {
        var _this = this;
        this.scriptLoaded = false;
        this.readySubject = new BehaviorSubject_1.BehaviorSubject(false);
        /* the callback needs to exist before the API is loaded */
        window["reCaptchaOnloadCallback"] = (function () { return zone.run(_this.onloadCallback.bind(_this)); });
    }
    ReCaptchaService.prototype.getReady = function (language) {
        var instances = document.querySelectorAll("script[src=\"https://www.google.com/recaptcha/api.js\"]");
        console.log('Instancje: ');
        console.log(instances);
        if (!this.scriptLoaded) {
            this.scriptLoaded = true;
            var doc = document.body;
            var script = document.createElement('script');
            script.innerHTML = '';
            script.src = 'https://www.google.com/recaptcha/api.js?onload=reCaptchaOnloadCallback&render=explicit' +
                (language ? '&hl=' + language : '');
            script.async = true;
            script.defer = true;
            doc.appendChild(script);
        }
        return this.readySubject.asObservable();
    };
    ReCaptchaService.prototype.onloadCallback = function () {
        this.readySubject.next(true);
    };
    return ReCaptchaService;
}());
ReCaptchaService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.NgZone])
], ReCaptchaService);
exports.ReCaptchaService = ReCaptchaService;
/* singleton pattern taken from https://github.com/angular/angular/issues/13854 */
function RECAPTCHA_SERVICE_PROVIDER_FACTORY(ngZone, parentDispatcher) {
    return parentDispatcher || new ReCaptchaService(ngZone);
}
exports.RECAPTCHA_SERVICE_PROVIDER_FACTORY = RECAPTCHA_SERVICE_PROVIDER_FACTORY;
exports.RECAPTCHA_SERVICE_PROVIDER = {
    provide: ReCaptchaService,
    deps: [core_1.NgZone, [new core_1.Optional(), new core_1.SkipSelf(), ReCaptchaService]],
    useFactory: RECAPTCHA_SERVICE_PROVIDER_FACTORY
};
