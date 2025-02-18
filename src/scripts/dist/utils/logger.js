"use strict";
/**
 * Centralized logging utility for application-wide logging
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var Logger = /** @class */ (function () {
    function Logger() {
        this.options = {
            level: 'info',
            timestamp: true,
            prefix: '[App]'
        };
    }
    Logger.getInstance = function () {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    };
    Logger.prototype.formatMessage = function (level, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var timestamp = this.options.timestamp ? "[".concat(new Date().toISOString(), "]") : '';
        var prefix = this.options.prefix || '';
        return "".concat(timestamp).concat(prefix, "[").concat(level.toUpperCase(), "] ").concat(message);
    };
    Logger.prototype.info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (process.env.NODE_ENV !== 'production') {
            console.info.apply(console, __spreadArray([this.formatMessage('info', message)], args, false));
        }
    };
    Logger.prototype.warn = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (process.env.NODE_ENV !== 'production') {
            console.warn.apply(console, __spreadArray([this.formatMessage('warn', message)], args, false));
        }
    };
    Logger.prototype.error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var errorMessage = message instanceof Error ? message.message : message;
        console.error.apply(console, __spreadArray([this.formatMessage('error', errorMessage)], args, false));
        // In production, you might want to send this to an error tracking service
        if (process.env.NODE_ENV === 'production') {
            // Send to error tracking service
        }
    };
    Logger.prototype.debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (process.env.NODE_ENV === 'development') {
            console.debug.apply(console, __spreadArray([this.formatMessage('debug', message)], args, false));
        }
    };
    Logger.prototype.setOptions = function (options) {
        this.options = __assign(__assign({}, this.options), options);
    };
    return Logger;
}());
exports.logger = Logger.getInstance();
