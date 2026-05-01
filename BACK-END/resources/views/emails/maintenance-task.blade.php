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
        .status-badge { display: inline-block; background-color: #e6f4f1; color: #3d8d8d; padding: 6px 14px; border-radius: 8px; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 15px; }
        .task-title { font-size: 24px; font-weight: 900; color: #111818; margin: 0 0 10px 0; letter-spacing: -0.02em; }
        .task-id { font-size: 13px; color: #648080; font-weight: 600; margin-bottom: 30px; }
        .info-grid { background-color: #f8faf9; border-radius: 12px; padding: 20px; margin-bottom: 30px; border: 1px solid #edf2f1; }
        .info-item { margin-bottom: 15px; }
        .info-item:last-child { margin-bottom: 0; }
        .label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; color: #94a3b8; display: block; margin-bottom: 4px; }
        .value { font-size: 14px; font-weight: 700; color: #1e293b; }
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
                <div class="status-badge">{{ $status }}</div>
                <h1 class="task-title">{{ $taskName }}</h1>
                <div class="task-id">Reference: Task #{{ $taskId }}</div>

                <div class="info-grid">
                    <div class="info-item">
                        <span class="label">Current Status</span>
                        <span class="value">{{ ucfirst($status) }}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">System Update Time</span>
                        <span class="value">{{ now()->format('Y-m-d H:i A') }}</span>
                    </div>
                </div>

                <p style="font-size: 14px; color: #4a5568; line-height: 1.6;">
                    The status of this maintenance task has been updated in the system. Please review the current progress and ensure all safety protocols are followed.
                </p>

                <div class="btn-container">
                    <a href="{{ config('app.frontend_url') }}/maintenance-tasks/{{ $taskId }}" class="btn">
                        Open Task Management
                    </a>
                </div>
            </div>
            <div class="footer">
                <p>Automated Maintenance Management Notification</p>
                <p>&copy; 2026 Maintora Platforms. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>