<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #111818; background-color: #f4f7f6; margin: 0; padding: 0; }
        .wrapper { background-color: #f4f7f6; padding: 40px 10px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #dce5e2; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .header { background-color: #111818; padding: 30px; text-align: center; }
        .logo-text { color: #ffffff; font-size: 18px; font-weight: 900; letter-spacing: 0.2em; text-transform: uppercase; }
        .content { padding: 40px; }
        .welcome-card { background-color: #f0f9f8; border: 1px solid #dce5e2; border-radius: 12px; padding: 25px; text-align: center; margin-bottom: 30px; }
        .label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; color: #3d8d8d; display: block; margin-bottom: 8px; }
        .welcome-title { font-size: 20px; font-weight: 900; color: #111818; margin: 0; }
        .section-title { font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.12em; color: #648080; margin: 25px 0 15px 0; border-bottom: 1px solid #edf2f1; padding-bottom: 8px; }
        .info-row { margin-bottom: 10px; font-size: 14px; }
        .info-label { font-weight: 700; color: #648080; width: 80px; display: inline-block; }
        .steps-list { padding-left: 18px; margin: 0; color: #4a5568; font-size: 14px; }
        .steps-list li { margin-bottom: 10px; }
        .btn-container { text-align: center; margin-top: 35px; }
        .btn { display: inline-block; background-color: #3d8d8d; color: #ffffff; padding: 18px 36px; text-decoration: none; border-radius: 12px; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
        .footer { padding: 30px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <div class="logo-text">Maintora</div>
            </div>
            <div class="content">
                <div class="welcome-card">
                    <span class="label">Registration Confirmed</span>
                    <h1 class="welcome-title">Welcome to the Platform</h1>
                </div>

                <p style="font-size: 14px; color: #4a5568;">
                    Hello {{ $firstName }} {{ $lastName }}, your professional maintenance account has been successfully provisioned. You now have access to the Maintora industrial ecosystem.
                </p>

                <div class="section-title">Account Credentials</div>
                <div class="info-row">
                    <span class="info-label">Name:</span>
                    <span style="font-weight: 600;">{{ $firstName }} {{ $lastName }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span style="font-weight: 600;">{{ $email }}</span>
                </div>

                <div class="section-title">Next Steps</div>
                <ul class="steps-list">
                    <li>Initialize your workspace by logging in</li>
                    <li>Update your specialized technical certifications</li>
                    <li>Synchronize with your assigned maintenance rounds</li>
                </ul>

                <div class="btn-container">
                    <a href="{{ config('app.frontend_url') }}/login" class="btn">
                        Access Your Workspace
                    </a>
                </div>
            </div>
            <div class="footer">
                <p>This is a mandatory system notification regarding your Maintora account.</p>
                <p>&copy; 2026 Maintora Platforms. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>