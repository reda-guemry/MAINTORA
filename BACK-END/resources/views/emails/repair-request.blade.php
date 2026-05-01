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
        .notification-card { background-color: #f8faf9; border-radius: 12px; border: 1px solid #edf2f1; padding: 25px; margin-bottom: 30px; text-align: center; }
        .label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; color: #648080; display: block; margin-bottom: 8px; }
        .status-badge { display: inline-block; padding: 6px 16px; border-radius: 8px; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
        .status-pending { background-color: #fffbeb; color: #92400e; border: 1px solid #fef3c7; }
        .status-approved { background-color: #f0f9f8; color: #3d8d8d; border: 1px solid #dce5e2; }
        .status-rejected { background-color: #fef2f2; color: #991b1b; border: 1px solid #fee2e2; }
        .id-text { font-size: 18px; font-weight: 900; color: #111818; margin-top: 10px; display: block; }
        .section-title { font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.12em; color: #111818; margin: 25px 0 15px 0; }
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
                <div class="notification-card">
                    <span class="label">New Repair Request Registered</span>
                    <span class="id-text">Reference #{{ $repairRequestId }}</span>
                    <div style="margin-top: 15px;">
                        <span class="status-badge @if($status === 'pending') status-pending @elseif($status === 'approved') status-approved @else status-rejected @endif">
                            {{ ucfirst($status) }}
                        </span>
                    </div>
                </div>

                <p style="font-size: 14px; color: #4a5568;">
                    A formal repair request has been initialized in the system. Technical supervisors are required to evaluate the scope of work and allocate resources accordingly.
                </p>

                <div class="section-title">Operational Protocol</div>
                <ul class="steps-list">
                    <li>Perform detailed technical validation of the request</li>
                    <li>Verify technician availability and expertise requirements</li>
                    <li>Define priority level based on asset criticality</li>
                </ul>

                <div class="btn-container">
                    <a href="{{ config('app.frontend_url') }}/repair-requests/{{ $repairRequestId }}" class="btn">
                        Evaluate Repair Request
                    </a>
                </div>
            </div>
            <div class="footer">
                <p>Maintora Asset Management System &bull; Automated Dispatch</p>
                <p>&copy; 2026 Maintora Platforms. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>