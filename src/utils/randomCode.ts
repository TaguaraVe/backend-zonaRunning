

function generateRandomCode():string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result:string = '';
  
    for (let i:number = 0; i < 40; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return result;
  } 


  export default generateRandomCode;