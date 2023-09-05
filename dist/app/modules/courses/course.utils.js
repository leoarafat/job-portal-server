"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_live = exports.generateRandomUUID = void 0;
function generateRandomUUID() {
    const uuidTemplate = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return uuidTemplate.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.generateRandomUUID = generateRandomUUID;
exports.is_live = false;
