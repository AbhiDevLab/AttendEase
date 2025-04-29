// This is a mock email service for demonstration purposes
// In a real application, you would use a service like SendGrid, Mailgun, etc.

interface EmailOptions {
  to: string
  subject: string
  body: string
  html?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  console.log("Sending email:")
  console.log("To:", options.to)
  console.log("Subject:", options.subject)
  console.log("Body:", options.body)

  // In a real application, this would connect to an email service
  // For this demo, we'll just simulate sending an email

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Simulate success (95% of the time)
  const success = Math.random() > 0.05

  if (!success) {
    console.error("Failed to send email")
  } else {
    console.log("Email sent successfully")
  }

  return success
}

export async function sendAttendanceWarning(
  studentEmail: string,
  studentName: string,
  courseId: string,
  courseName: string,
  currentAttendance: number,
  requiredAttendance: number,
  classesNeeded: number,
): Promise<boolean> {
  const subject = `[AttendEase] Low Attendance Warning for ${courseId}`

  const body = `
Dear ${studentName},

This is an automated notification from AttendEase regarding your attendance in ${courseId}: ${courseName}.

Your current attendance is ${currentAttendance}%, which is below the required minimum of ${requiredAttendance}%.

To meet the minimum attendance requirement, you need to attend at least ${classesNeeded} more classes.

Please ensure you attend upcoming classes to avoid any academic penalties.

Best regards,
AttendEase Attendance System
`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .footer { font-size: 12px; color: #6c757d; margin-top: 30px; }
    .warning { color: #dc3545; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>AttendEase Attendance Warning</h2>
    </div>
    <div class="content">
      <p>Dear ${studentName},</p>
      
      <p>This is an automated notification from AttendEase regarding your attendance in <strong>${courseId}: ${courseName}</strong>.</p>
      
      <p>Your current attendance is <span class="warning">${currentAttendance}%</span>, which is below the required minimum of ${requiredAttendance}%.</p>
      
      <p>To meet the minimum attendance requirement, you need to attend at least <strong>${classesNeeded} more classes</strong>.</p>
      
      <p>Please ensure you attend upcoming classes to avoid any academic penalties.</p>
      
      <p>Best regards,<br>
      AttendEase Attendance System</p>
    </div>
    <div class="footer">
      This is an automated message. Please do not reply to this email.
    </div>
  </div>
</body>
</html>
`

  return sendEmail({
    to: studentEmail,
    subject,
    body,
    html,
  })
}
