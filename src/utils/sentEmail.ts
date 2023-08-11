import nodemailer from 'nodemailer';

interface EmailOptions{
    to:string;
    subject:string;
    html:string;

}

const sendEmail = async (options:EmailOptions): Promise<any> => new Promise((resolve, reject)=>{

   
 const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"miltonmercado92@gmail.com",
        pass:"wagffvxdhiafzdno"
    },
    tls: {
        rejectUnauthorized: false
    },
    secure:false
 });

 const mailOptions = {
    from:"miltonmercado92@gmail.com",
    ...options
 }  

 transporter.sendMail(mailOptions, (error, info) => {
        console.log(error, info);
        if(error){
            console.log(error);
            return reject({message:"An error has occured"})
            
        }
        return resolve({message:"Email sent successfully"})
 })

})


export default sendEmail;


