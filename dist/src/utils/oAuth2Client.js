"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const CREDENTIALS_PATH = "../api/credenciales.json"; // Ruta al archivo de credenciales de tu proyecto de Google Cloud
const credentials = require(CREDENTIALS_PATH);
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
exports.default = oAuth2Client;
