"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productionConfig = exports.betaConfig = exports.devnetConfig = void 0;
const devnetConfig = require("./devnet.json");
exports.devnetConfig = devnetConfig;
const betaConfig = require("./beta.json");
exports.betaConfig = betaConfig;
const productionConfig = require("./production.json");
exports.productionConfig = productionConfig;
__exportStar(require("./types"), exports);
