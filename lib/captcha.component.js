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
var forms_1 = require("@angular/forms");
var captcha_service_1 = require("./captcha.service");
var ReCaptchaComponent = ReCaptchaComponent_1 = (function () {
    function ReCaptchaComponent(_zone, _captchaService) {
        this._zone = _zone;
        this._captchaService = _captchaService;
        this.site_key = null;
        this.theme = 'light';
        this.type = 'image';
        this.size = 'normal';
        this.tabindex = 0;
        this.badge = 'bottomright';
        /* Available languages: https://developers.google.com/recaptcha/docs/language */
        this.language = null;
        this.captchaResponse = new core_1.EventEmitter();
        this.captchaExpired = new core_1.EventEmitter();
        this.widgetId = null;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    ReCaptchaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._captchaService.getReady(this.language)
            .subscribe(function (ready) {
            if (!ready)
                return;
            // noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
            _this.widgetId = window.grecaptcha.render(_this.targetRef.nativeElement, {
                'sitekey': _this.site_key,
                'badge': _this.badge,
                'theme': _this.theme,
                'type': _this.type,
                'size': _this.size,
                'tabindex': _this.tabindex,
                'callback': (function (response) { return _this._zone.run(_this.recaptchaCallback.bind(_this, response)); }),
                'expired-callback': (function () { return _this._zone.run(_this.recaptchaExpiredCallback.bind(_this)); })
            });
        });
    };
    // noinspection JSUnusedGlobalSymbols
    ReCaptchaComponent.prototype.reset = function () {
        if (this.widgetId === null)
            return;
        // noinspection TypeScriptUnresolvedVariable
        window.grecaptcha.reset(this.widgetId);
        this.onChange(null);
    };
    // noinspection JSUnusedGlobalSymbols
    ReCaptchaComponent.prototype.execute = function () {
        if (this.widgetId === null)
            return;
        // noinspection TypeScriptUnresolvedVariable
        window.grecaptcha.execute(this.widgetId);
    };
    ReCaptchaComponent.prototype.getResponse = function () {
        if (this.widgetId === null)
            return null;
        // noinspection TypeScriptUnresolvedVariable
        return window.grecaptcha.getResponse(this.widgetId);
    };
    ReCaptchaComponent.prototype.writeValue = function (newValue) {
        /* ignore it */
    };
    ReCaptchaComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    ReCaptchaComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    ReCaptchaComponent.prototype.recaptchaCallback = function (response) {
        this.onChange(response);
        this.onTouched();
        this.captchaResponse.emit(response);
    };
    ReCaptchaComponent.prototype.recaptchaExpiredCallback = function () {
        this.onChange(null);
        this.onTouched();
        this.captchaExpired.emit();
    };
    return ReCaptchaComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ReCaptchaComponent.prototype, "site_key", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ReCaptchaComponent.prototype, "theme", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ReCaptchaComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ReCaptchaComponent.prototype, "size", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ReCaptchaComponent.prototype, "tabindex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ReCaptchaComponent.prototype, "badge", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ReCaptchaComponent.prototype, "language", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ReCaptchaComponent.prototype, "captchaResponse", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ReCaptchaComponent.prototype, "captchaExpired", void 0);
__decorate([
    core_1.ViewChild('target'),
    __metadata("design:type", core_1.ElementRef)
], ReCaptchaComponent.prototype, "targetRef", void 0);
ReCaptchaComponent = ReCaptchaComponent_1 = __decorate([
    core_1.Component({
        selector: 're-captcha',
        template: '<div #target></div>',
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return ReCaptchaComponent_1; }),
                multi: true
            }
        ]
    }),
    __metadata("design:paramtypes", [core_1.NgZone,
        captcha_service_1.ReCaptchaService])
], ReCaptchaComponent);
exports.ReCaptchaComponent = ReCaptchaComponent;
var ReCaptchaComponent_1;
