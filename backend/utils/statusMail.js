const nodemailer = require("nodemailer")
require("dotenv").config()

const statusEmail = async (to, name, orderid, status) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure:true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    try{
        const formattedorderid = String(orderid).slice(-6).toUpperCase()

        const htmlContent = `
        <div style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
        ">
            <div style="background-color: #222; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">MyFurlenco</h1>
                <p style="color: #ccc; margin: 5px 0 0;">Furniture that feels like home</p>
            </div>

            <div style="padding: 25px;">
                <h2 style="color: #333;">Hello ${name},</h2>
                <p style="font-size: 15px; color: #555;">
                    We wanted to let you know that the status of your order has been updated.
                </p>

                <div style="
                    background: #f7f7f7;
                    padding: 15px;
                    border-left: 4px solid #FF6600;
                    margin: 20px 0;
                    border-radius: 5px;
                ">
                    <p style="margin: 0; font-size: 16px;">
                        <strong>Order ID:</strong> #${formattedorderid}
                    </p>
                    <p style="margin: 8px 0 0; font-size: 16px;">
                        <strong>Status:</strong> 
                        <span style="
                            padding: 4px 10px;
                            background: #FF6600;
                            color: white;
                            border-radius: 4px;
                            font-weight: bold;
                        ">
                            ${status.charAt(0).toUpperCase()+status.slice(1)}
                        </span>
                    </p>
                </div>

                <p style="color: #555; font-size: 15px;">
                    You can track your order anytime by logging into your MyFurlenco account.
                </p>

                <div style="text-align: center; margin-top: 30px;">
                    <a href="http://localhost:3000/orders" 
                        style="
                            background-color: #FF6600;
                            color: white;
                            padding: 12px 22px;
                            text-decoration: none;
                            font-size: 16px;
                            border-radius: 6px;
                            display: inline-block;
                        ">
                        View Order Details
                    </a>
                </div>
            </div>

            <div style="
                background-color: #f0f0f0;
                padding: 18px;
                text-align: center;
                color: #777;
                font-size: 13px;
            ">
                <p style="margin: 0;">You are receiving this email because you placed an order on MyFurlenco.</p>
                <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} MyFurlenco. All rights reserved.</p>
            </div>
        </div>
    `;


       await  transporter.sendMail({
            from:`MyFurlenco <${process.env.EMAIL_USER}>`,
            to : to,
            subject:`Your order ${formattedorderid} - ${status.charAt(0).toUpperCase()+status.slice(1)}`,
            html:htmlContent

        })
        console.log(`Email sent to ${to}`)
    }catch(error){
        console.log(error)
    }
}

module.exports = statusEmail