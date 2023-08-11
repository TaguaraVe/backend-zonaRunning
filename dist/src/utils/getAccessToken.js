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
Object.defineProperty(exports, "__esModule", { value: true });
function getAccessToken(oAuth2Client) {
    return __awaiter(this, void 0, void 0, function* () {
        const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this URL:', authUrl);
        // Aquí deberás implementar la lógica para obtener el código de autorización del usuario.
        const authorizationCode = 'YOUR_AUTHORIZATION_CODE';
        const { tokens } = yield oAuth2Client.getToken(authorizationCode);
        const accessToken = tokens.access_token;
        return accessToken;
    });
}
exports.default = getAccessToken;
