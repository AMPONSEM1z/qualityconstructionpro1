# BuildPro Construction Website

A complete, production-ready construction services website built with React + Vite frontend and Node.js + Express backend. Features appointment booking with email notifications.

## 🏗️ Project Structure

\`\`\`
construction-website/
├── client/ # React + Vite frontend
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── App.tsx # Main app component
│ │ └── main.tsx # Entry point
│ ├── public/ # Static assets
│ └── package.json
├── server/ # Node.js + Express backend
│ ├── index.js # Server entry point
│ ├── .env.example # Environment variables template
│ └── package.json
└── README.md
\`\`\`

## ✨ Features

### Frontend

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, professional design with smooth animations
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Components**:
  - Fixed navigation with mobile hamburger menu
  - Hero section with call-to-action
  - Services showcase with interactive cards
  - Contact form with client-side validation
  - Professional footer with contact information

### Backend

- **RESTful API**: Express.js server with proper error handling
- **Email Service**: Nodemailer integration for appointment notifications
- **Validation**: Server-side input validation and sanitization
- **Security**: CORS configuration and environment variable protection
- **Monitoring**: Health check endpoint and comprehensive logging

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Gmail account with 2-Factor Authentication enabled

### 1. Clone and Install

\`\`\`bash

# Clone the repository

git clone <repository-url>
cd construction-website

# Install client dependencies

cd client
npm install

# Install server dependencies

cd ../server
npm install
\`\`\`

### 2. Email Configuration

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate App Password**:

   - Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Copy the generated 16-character password

3. **Configure Environment Variables**:
   \`\`\`bash
   cd server
   cp .env.example .env
   \`\`\`

Edit \`.env\` with your details:
\`\`\`env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-16-character-app-password
TO_EMAIL=allbusiness1z1234@gmail.com
PORT=3001
NODE_ENV=development
\`\`\`

### 3. Start Development Servers

**Terminal 1 - Backend:**
\`\`\`bash
cd server
npm run dev

# Server runs on http://localhost:3001

\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd client
npm run dev

# Client runs on http://localhost:3000

\`\`\`

### 4. Test the Application

1. Open http://localhost:3000
2. Navigate to "Book Appointment"
3. Fill out the form and submit
4. Check the configured email for appointment notification

## 📧 Email Setup Alternatives

### Gmail (Recommended for Development)

- Free and easy to set up
- Requires App Password with 2FA
- Daily sending limits apply

### Production Email Services

For production deployments, consider these alternatives:

#### SendGrid

\`\`\`env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
\`\`\`

#### Mailgun

\`\`\`env
EMAIL_SERVICE=mailgun
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=your-mailgun-domain
\`\`\`

#### Custom SMTP

\`\`\`env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
\`\`\`

## 🏭 Production Deployment

### Frontend Deployment (Vercel/Netlify)

#### Vercel

\`\`\`bash
cd client
npm run build
npx vercel --prod
\`\`\`

#### Netlify

\`\`\`bash
cd client
npm run build

# Upload dist/ folder to Netlify or use Netlify CLI

\`\`\`

### Backend Deployment

#### Heroku

\`\`\`bash
cd server

# Create Procfile

echo "web: node index.js" > Procfile

# Deploy

heroku create your-app-name
heroku config:set EMAIL_USER=your-email
heroku config:set EMAIL_PASS=your-app-password
heroku config:set TO_EMAIL=business@example.com
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-frontend-domain.com
git push heroku main
\`\`\`

#### Render

1. Connect your GitHub repository
2. Set environment variables in Render dashboard
3. Deploy with build command: \`npm install\`
4. Start command: \`node index.js\`

#### Google Cloud Run

\`\`\`bash

# Create Dockerfile in server/

FROM node:18-alpine
WORKDIR /app
COPY package\*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]

# Deploy

gcloud run deploy construction-api --source .
\`\`\`

### Environment Variables for Production

Set these in your hosting platform:

\`\`\`env
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-app-password
TO_EMAIL=allbusiness1z1234@gmail.com
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
PORT=3001
\`\`\`

## 🛠️ Development Scripts

### Client Scripts

\`\`\`bash
npm run dev # Start development server
npm run build # Build for production
npm run preview # Preview production build
npm run lint # Run ESLint
\`\`\`

### Server Scripts

\`\`\`bash
npm start # Start production server
npm run dev # Start development server with auto-reload
\`\`\`

## 🔧 Customization

### Styling

- Colors are defined in \`client/tailwind.config.js\`
- Main colors: Dark Blue (#0a2342), Orange (#f7931e), White (#ffffff)
- Modify the color palette to match your brand

### Content

- Update company information in components
- Replace placeholder images with actual photos
- Modify service descriptions and contact details

### Email Templates

- Customize email content in \`server/index.js\`
- Add your company branding to HTML email template

## 🔒 Security Considerations

### Development

- Never commit \`.env\` files
- Use App Passwords, not regular passwords
- Keep dependencies updated

### Production

- Use HTTPS for all communications
- Implement rate limiting for API endpoints
- Consider using dedicated email services
- Set up monitoring and logging
- Use environment variables for all secrets

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Common Issues

**Email not sending:**

- Verify Gmail App Password is correct
- Check 2FA is enabled on Google account
- Ensure \`.env\` file is in server directory
- Check server logs for detailed error messages

**CORS errors:**

- Verify frontend URL in CORS configuration
- Check if both servers are running
- Ensure ports match configuration

**Build errors:**

- Clear node_modules and reinstall dependencies
- Check Node.js version compatibility
- Verify all environment variables are set

### Getting Help

1. Check server logs for detailed error messages
2. Verify all environment variables are correctly set
3. Test email configuration with a simple test script
4. Ensure all dependencies are installed and up to date

## 📄 License

MIT License - feel free to use this project for your business needs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built By Kojo Amponsem for small construction businesses**
\`\`\`
