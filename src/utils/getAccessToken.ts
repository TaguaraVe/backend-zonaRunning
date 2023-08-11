async function getAccessToken(oAuth2Client: any) {
    const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this URL:', authUrl);
  
    // Aquí deberás implementar la lógica para obtener el código de autorización del usuario.
  
    const authorizationCode = 'YOUR_AUTHORIZATION_CODE';
  
    const { tokens } = await oAuth2Client.getToken(authorizationCode);
    const accessToken = tokens.access_token;
    return accessToken;
  }
export default getAccessToken;