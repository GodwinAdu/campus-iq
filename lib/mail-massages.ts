

export const welcomeMail = (fullName: string, rawPassword: string, rawUsername: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: 50px auto;
            max-width: 600px;
        }
        .header {
            background-color: #4CAF50;
            padding: 20px;
            color: #ffffff;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .footer {
            background-color: #4CAF50;
            padding: 10px;
            color: #ffffff;
            text-align: center;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            color: #ffffff;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to EduXcel!</h1>
        </div>
        <div class="content">
            <p class="text-xl font-bold">Hi ${fullName},</p>
            <p>Welcome to our Service! We're thrilled to have you on board.</p>
            <p>Here are your login credentials, Username <bold class="font-bold underline">${rawUsername}</bold> and Password is <bold class="font-bold underline">${rawPassword}. </bold> please do not share with anyone..</p>
            <p>If you have any questions or need assistance, feel free to <a href="mailto:jutech347@gmail.com">contact us</a>.</p>
            <p>Best regards,<br class="font-bold underline">EduXcel</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}" class="button">Get Started</a>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} EduXcel. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

export const welcomeEmail = (fullName: string, rawPassword: string, rawUsername: string, schoolName: string, schoolEmail: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: 50px auto;
            max-width: 600px;
        }
        .header {
            background-color: #4CAF50;
            padding: 20px;
            color: #ffffff;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .footer {
            background-color: #4CAF50;
            padding: 10px;
            color: #ffffff;
            text-align: center;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            color: #ffffff;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #45a049;
        }
        .text{
            font-weight:bold,
            text-decoration-line: underline;
        }
        .font{
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to ${schoolName}!</h1>
        </div>
        <div class="content">
            <p class="font-bold text-xl">Hi ${fullName},</p>
            <p>Welcome to our School! We're thrilled to have you on board.</p>
            <p>Here are your login credentials, Username <bold class="text">${rawUsername}</bold> and Password is <bold class="text">${rawPassword}. </bold> please do not share with anyone..</p>
            <p>If you have any questions or need assistance, feel free to <a href="mailto:${schoolEmail}">contact us</a>.</p>
            <p>Best regards,<br class="font">${schoolName}</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}" target="_blank" class="button">Log In</a>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Campus<span class="span">IQ</span>. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
export const welcomeCombinedEmail = (fullName: string, rawPassword: string, rawUsername: string, parentPassword: string, parentUsername: string, schoolName: string, schoolEmail: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: 50px auto;
            max-width: 600px;
        }
        .header {
            background-color: #4CAF50;
            padding: 20px;
            color: #ffffff;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .footer {
            background-color: #4CAF50;
            padding: 10px;
            color: #ffffff;
            text-align: center;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            color: #ffffff;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #45a049;
        }
        .span {
            color:#ff2342;
            font-weight: bold
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to ${schoolName}!</h1>
        </div>
        <div class="content">
            <p class="font-bold text-xl">Hi ${fullName},</p>
            <p>Welcome to our School! We're thrilled to have you on board.</p>
            <p>Here are your login credentials, Username <bold class="text">${rawUsername}</bold> and Password is <bold class="text">${rawPassword}. </bold> please do not share with anyone..</p>
            <p> Also here are parent login credentials, Username <bold class="font">${parentUsername}</bold> and Password is <bold class="font-bold underline">${parentPassword}. </bold> .</p>
            <p>If you have any questions or need assistance, feel free to <a href="mailto:${schoolEmail}">contact us</a>.</p>
            <p>Best regards,<br class="font">${schoolName}</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}" target="_blank" class="button">Log In</a>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Campus<span class="span">IQ</span>. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;


export const passwordResetEmail = (userName: string, resetLink: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: 50px auto;
            max-width: 600px;
        }
        .header {
            background-color: #FF5733;
            padding: 20px;
            color: #ffffff;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .footer {
            background-color: #FF5733;
            padding: 10px;
            color: #ffffff;
            text-align: center;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            color: #ffffff;
            background-color: #FF5733;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #E14E26;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Hi ${userName},</p>
            <p>We received a request to reset your password. Click the button below to reset it.</p>
            <a href="${resetLink}" class="button">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Best regards,<br>The Team</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Our Service. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
