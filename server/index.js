import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Validation helper
const validateAppointmentData = (data) => {
  const errors = [];

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.push("Full name must be at least 2 characters long");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Valid email address is required");
  }

  if (
    !data.phone ||
    !/^[\d\s\-+$$$$]{10,}$/.test(data.phone.replace(/\s/g, ""))
  ) {
    errors.push("Valid phone number is required (minimum 10 digits)");
  }

  if (!data.location || data.location.trim().length < 3) {
    errors.push("Location must be at least 3 characters long");
  }

  if (
    !data.serviceType ||
    !["Building", "Plumbing", "Electrical"].includes(data.serviceType)
  ) {
    errors.push(
      "Valid service type is required (Building, Plumbing, or Electrical)"
    );
  }

  return errors;
};

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "BuildPro Construction API Server",
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.post("/send-appointment", async (req, res) => {
  try {
    const { fullName, email, phone, location, serviceType } = req.body;

    // Validate input data
    const validationErrors = validateAppointmentData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Check if required environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email configuration missing");
      return res.status(500).json({
        success: false,
        message: "Server configuration error. Please contact support.",
      });
    }

    // Create email transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (error) {
      console.error("Email transporter verification failed:", error);
      return res.status(500).json({
        success: false,
        message: "Email service configuration error. Please contact support.",
      });
    }

    // Email content
    const currentDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const emailSubject = `New Appointment Request from ${fullName}`;

    const emailText = `
New Appointment Request

Client Information:
- Name: ${fullName}
- Email: ${email}
- Phone: ${phone}
- Location: ${location}
- Service Type: ${serviceType}

Request submitted on: ${currentDate}

Please contact the client as soon as possible to schedule their appointment.

---
BuildPro Construction Management System
    `.trim();

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #0a2342; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .info-table th, .info-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        .info-table th { background-color: #f7931e; color: white; }
        .footer { background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        .highlight { background-color: #fff3cd; padding: 10px; border-left: 4px solid #f7931e; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏗️ New Appointment Request</h1>
    </div>
    
    <div class="content">
        <div class="highlight">
            <strong>Action Required:</strong> New client appointment request received. Please contact the client as soon as possible.
        </div>
        
        <h2>Client Information</h2>
        <table class="info-table">
            <tr><th>Name</th><td>${fullName}</td></tr>
            <tr><th>Email</th><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><th>Phone</th><td><a href="tel:${phone}">${phone}</a></td></tr>
            <tr><th>Location</th><td>${location}</td></tr>
            <tr><th>Service Type</th><td><strong>${serviceType}</strong></td></tr>
            <tr><th>Request Date</th><td>${currentDate}</td></tr>
        </table>
        
        <h3>Next Steps:</h3>
        <ul>
            <li>Contact the client within 24 hours</li>
            <li>Schedule a consultation or site visit</li>
            <li>Provide a detailed quote</li>
            <li>Update your CRM system</li>
        </ul>
    </div>
    
    <div class="footer">
        <p>BuildPro Construction Management System<br>
        This email was automatically generated from your website contact form.</p>
    </div>
</body>
</html>
    `.trim();

    // Email options
    const mailOptions = {
      from: `"BuildPro Construction Website" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL || "allbusiness1z1234@gmail.com",
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      replyTo: email,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Appointment email sent successfully:", {
      messageId: info.messageId,
      client: fullName,
      service: serviceType,
      timestamp: new Date().toISOString(),
    });

    res.json({
      success: true,
      message:
        "Appointment request sent successfully! We will contact you soon.",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error sending appointment email:", error);

    res.status(500).json({
      success: false,
      message:
        "Failed to send appointment request. Please try again or contact us directly.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BuildPro Construction API Server running on port ${PORT}`);
  console.log(
    `📧 Email service configured: ${process.env.EMAIL_USER ? "Yes" : "No"}`
  );
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `📍 CORS origin: ${
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:3000"
    }`
  );
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});
