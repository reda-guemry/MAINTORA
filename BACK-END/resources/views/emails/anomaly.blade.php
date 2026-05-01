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
        .alert-box { padding: 20px; border-radius: 12px; margin-bottom: 25px; text-align: center; }
        .severity-critical { background-color: #fef2f2; border: 1px solid #fee2e2; color: #991b1b; }
        .severity-high { background-color: #fffbeb; border: 1px solid #fef3c7; color: #92400e; }
        .severity-low { background-color: #f0f9f8; border: 1px solid #dce5e2; color: #3d8d8d; }
        .label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 5px; display: block; }
        .value { font-size: 16px; font-weight: 800; }
        .section-title { font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; color: #648080; margin-bottom: 10px; }
        .description-text { color: #4a5568; background-color: #f8faf9; padding: 20px; border-radius: 12px; font-size: 14px; margin-bottom: 30px; }
        .btn-container { text-align: center; }
        .btn { display: inline-block; background-color: #3d8d8d; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
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
                <div class="alert-box @if($severity === 'critical') severity-critical @elseif($severity === 'high') severity-high @else severity-low @endif">
                    <span class="label">Anomaly Detected</span>
                    <div class="value">ID #{{ $anomalyId }} &bull; Severity: {{ strtoupper($severity) }}</div>
                </div>

                <div class="section-title">Description</div>
                <div class="description-text">
                    {{ $description }}
                </div>

                <div class="section-title">Action Required</div>
                <p style="font-size: 14px; color: #4a5568; margin-bottom: 30px;">
                    A technical review of this anomaly is required. Please access the control panel to evaluate the situation and assign repair tasks if necessary.
                </p>

                <div class="btn-container">
                    <a href="{{ config('app.frontend_url') }}/anomalies/{{ $anomalyId }}" class="btn">
                        Review Anomaly Details
                    </a>
                </div>
            </div>
            <div class="footer">
                <p>This is an automated operational alert from the MAINTORA CMMS Platform.</p>
                <p>&copy; 2026 Maintora Platforms. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>