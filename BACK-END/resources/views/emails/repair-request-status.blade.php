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
        .status-update-card { background-color: #f8faf9; border-radius: 12px; border: 1px solid #edf2f1; padding: 25px; margin-bottom: 30px; }
        .label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; color: #648080; display: block; margin-bottom: 8px; }
        .status-value { font-size: 18px; font-weight: 900; color: #3d8d8d; text-transform: uppercase; }
        .request-id { font-size: 13px; color: #94a3b8; font-weight: 600; }
        .section-title { font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.12em; color: #111818; margin: 25px 0 12px 0; }
        .notes-content { font-size: 14px; color: #4a5568; background-color: #ffffff; border: 1px solid #f1f5f9; padding: 20px; border-radius: 10px; font-style: italic; }
        .steps-list { padding-left: 18px; margin: 0; color: #4a5568; font-size: 14px; }
        .steps-list li { margin-bottom: 8px; }
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
                <div class="status-update-card">
                    <span class="label">Repair Request Update</span>
                    <div class="status-value">{{ $status }}</div>
                    <div class="request-id">Case Reference: #{{ $repairRequestId }}</div>
                </div>

                <div class="section-title">Technical Notes</div>
                <div class="notes-content">
                    {{ $notes }}
                </div>

                <div class="section-title">Workflow Instructions</div>
                <ul class="steps-list">
                    <li>Verify the updated status against the physical asset condition</li>
                    <li>Synchronize your maintenance schedule with this update</li>
                    <li>Refer to the technical documentation for further action</li>
                </ul>

                <div class="btn-container">
                    <a href="{{ config('app.frontend_url') }}/repair-requests/{{ $repairRequestId }}" class="btn">
                        View Request Timeline
                    </a>
                </div>
            </div>
            <div class="footer">
                <p>This is a synchronized system update regarding asset repair operations.</p>
                <p>&copy; 2026 Maintora Platforms. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>