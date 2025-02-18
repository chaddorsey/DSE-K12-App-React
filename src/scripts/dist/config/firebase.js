"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.isStorageAvailable = exports.testFirestoreConnection = exports.testFirebaseConnection = exports.storage = exports.analytics = exports.db = exports.auth = void 0;
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var firestore_1 = require("firebase/firestore");
var storage_1 = require("firebase/storage");
var analytics_1 = require("firebase/analytics");
require("@firebase/storage");
var logger_1 = require("../utils/logger");
// Add debug logging
var debug = function (message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    console.log.apply(console, __spreadArray(["[Firebase Config] ".concat(message)], args, false));
};
// Check if we're in emulator mode
var isEmulator = process.env.REACT_APP_USE_EMULATORS === 'true';
var isDevelopment = process.env.NODE_ENV === 'development';
// Initialize Firebase with explicit storage config
var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};
// Verify config
console.log('Firebase Config:', {
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    emulator: process.env.REACT_APP_USE_EMULATORS
});
debug('Config values:', firebaseConfig);
debug('Environment:', {
    isEmulator: isEmulator,
    isDevelopment: isDevelopment,
    nodeEnv: process.env.NODE_ENV,
    storageBucket: firebaseConfig.storageBucket
});
// Check production config
console.log('Firebase Config:', {
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
});
// Initialize app
var app = (0, app_1.initializeApp)(firebaseConfig);
debug('Firebase app initialized');
// Initialize base services
exports.auth = (0, auth_1.getAuth)(app);
exports.db = (0, firestore_1.getFirestore)(app);
var analytics = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = process.env.NODE_ENV === 'production';
                if (!_a) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, analytics_1.isSupported)()];
            case 1:
                _a = (_b.sent());
                _b.label = 2;
            case 2:
                if (_a) {
                    try {
                        return [2 /*return*/, (0, analytics_1.getAnalytics)(app)];
                    }
                    catch (error) {
                        console.warn('Analytics initialization failed:', error);
                        return [2 /*return*/, null];
                    }
                }
                return [2 /*return*/, null];
        }
    });
}); };
exports.analytics = analytics;
// Initialize storage
var storage = null;
exports.storage = storage;
try {
    debug('Initializing Firebase Storage...');
    if (typeof window !== 'undefined') { // Only initialize in browser
        exports.storage = storage = (0, storage_1.getStorage)(app);
        debug('Firebase Storage initialized successfully');
    }
}
catch (error) {
    console.error('❌ Error initializing Firebase Storage:', error);
    debug('Firebase Storage initialization failed', error);
}
var initializeEmulators = function () {
    var _a;
    if (process.env.REACT_APP_USE_EMULATORS === 'true') {
        try {
            var host = process.env.REACT_APP_EMULATOR_HOST || 'localhost';
            // Connect to Auth emulator
            (0, auth_1.connectAuthEmulator)(exports.auth, "http://".concat(host, ":9099"), { disableWarnings: true });
            // Set admin role for testing
            if (process.env.NODE_ENV === 'development') {
                (_a = exports.auth.currentUser) === null || _a === void 0 ? void 0 : _a.getIdTokenResult(true).then(function (token) {
                    logger_1.logger.info('Current user token:', token);
                });
            }
            // Connect to Firestore emulator
            (0, firestore_1.connectFirestoreEmulator)(exports.db, host, 8080);
            // Connect to Storage emulator
            if (storage) {
                (0, storage_1.connectStorageEmulator)(storage, host, 9199);
            }
            console.log('Connected to Firebase emulators');
        }
        catch (error) {
            console.error('Error connecting to emulators:', error);
        }
    }
};
// Call initializeEmulators after Firebase initialization
initializeEmulators();
// Test connection functions
var testFirebaseConnection = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (process.env.NODE_ENV === 'development') {
            debug('Development mode - skipping Firebase connection test');
            return [2 /*return*/, true];
        }
        try {
            // Just verify the app is initialized
            if (exports.auth && exports.db && storage) {
                debug('Firebase services initialized successfully');
                return [2 /*return*/, true];
            }
            throw new Error('One or more Firebase services failed to initialize');
        }
        catch (error) {
            console.error('Firebase initialization check failed:', error);
            debug('Connection test failed', error);
            return [2 /*return*/, false];
        }
        return [2 /*return*/];
    });
}); };
exports.testFirebaseConnection = testFirebaseConnection;
var testFirestoreConnection = function () { return __awaiter(void 0, void 0, void 0, function () {
    var testDoc, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                testDoc = (0, firestore_1.doc)(exports.db, '_test_/connection');
                return [4 /*yield*/, (0, firestore_1.setDoc)(testDoc, { timestamp: new Date() })];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, firestore_1.deleteDoc)(testDoc)];
            case 2:
                _a.sent();
                return [2 /*return*/, true];
            case 3:
                error_1 = _a.sent();
                console.error('Firestore connection test failed:', error_1);
                return [2 /*return*/, false];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.testFirestoreConnection = testFirestoreConnection;
// Export a function to check if storage is available
var isStorageAvailable = function () {
    if (!storage) {
        debug('Storage is null or undefined');
        return false;
    }
    try {
        var isAvailable = typeof storage.app !== 'undefined';
        debug('Storage availability check:', isAvailable);
        return isAvailable;
    }
    catch (error) {
        debug('Storage availability check failed', error);
        return false;
    }
};
exports.isStorageAvailable = isStorageAvailable;
