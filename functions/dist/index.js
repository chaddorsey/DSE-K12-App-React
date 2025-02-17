"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  setUserRole: () => setUserRole
});
module.exports = __toCommonJS(index_exports);
var admin2 = __toESM(require("firebase-admin"));

// src/auth/setUserRole.ts
var functions = __toESM(require("firebase-functions"));
var admin = __toESM(require("firebase-admin"));
var validRoles = ["user", "manager", "admin"];
var setUserRole = functions.https.onCall(async (data, context) => {
  var _a;
  if (!((_a = context.auth) == null ? void 0 : _a.token.admin)) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only admins can set roles"
    );
  }
  const { uid, role } = data;
  if (!uid || !validRoles.includes(role)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Invalid user ID or role"
    );
  }
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    await admin.firestore().doc(`users/${uid}`).update({ role });
    return { success: true };
  } catch (error) {
    console.error("Error setting user role:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Error setting user role"
    );
  }
});

// src/index.ts
admin2.initializeApp();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setUserRole
});
//# sourceMappingURL=index.js.map