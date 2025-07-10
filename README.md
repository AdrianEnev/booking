# Adrian Cuts - Barber Booking App

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[Website](https://booking.lunge.run)

A modern, responsive web application for booking barber appointments. Built with a React frontend and Node.js/Express backend, featuring a seamless booking experience with real-time availability and an intuitive admin dashboard.

## ✨ Features

### 🎯 Seamless Booking Experience
- **Interactive Calendar**: Intuitive date and time selection with real-time availability
- **Service Customization**: Choose from various barber services with detailed descriptions
- **Real-time Updates**: Instant booking confirmation and updates
- **User Authentication**: Secure sign-up and login with Firebase Auth
- **Email Notifications**: Automatic booking confirmations and reminders

### 🛠️ Admin Dashboard
- **Appointment Management**: View, edit, and cancel bookings
- **Calendar Overview**: Visual representation of daily/weekly appointments
- **Customer Insights**: Track booking trends and customer preferences
- **Service Management**: Add, update, or remove services
- **Barber Scheduling**: Manage barber availability and working hours

### 🎨 Modern UI/UX
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations**: Built with Framer Motion for delightful interactions
- **Dark/Light Mode**: User preference-based theming
- **Accessibility**: Built with WCAG standards in mind
- **Performance**: Optimized loading with code splitting and lazy loading

## 🚀 Tech Stack

| Area          | Technologies Used |
|---------------|-------------------|
| **Frontend**  | React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router 7 |
| **Backend**   | Node.js, Express, TypeScript, Firebase Admin SDK |
| **Database**  | Firebase (Firestore, Authentication) |
| **Email**     | Nodemailer |
| **Deployment**| Netlify (Frontend), Fly.io (Backend) |
| **Dev Tools** | Git, npm, TypeScript, ESLint |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+ or Yarn
- Firebase project with Firestore and Authentication enabled
- SMTP server credentials for email notifications

### 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/adrian-cuts.git
   cd adrian-cuts
   ```

2. **Set up the backend**
   ```bash
   cd server
   cp .env.example .env
   # Update .env with your Firebase credentials and other settings
   npm install
   npm run build
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   cp .env.example .env
   # Update .env with your Firebase config
   npm install
   ```

4. **Start the development servers**
   - In one terminal (backend):
     ```bash
     cd server
     npm run dev
     ```
   - In another terminal (frontend):
     ```bash
     cd client
     npm run dev
     ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

## 🔧 Environment Variables

### Server (`.env`)
```
PORT=3000
NODE_ENV=development
FIREBASE_SERVICE_ACCOUNT_KEY=path/to/serviceAccountKey.json
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
```

### Client (`.env`)
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_API_URL=http://localhost:3000
```

## 🏗 Project Structure

```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── app/           # Main application routes and layout
│   │   ├── assets/        # Static assets (images, fonts, etc.)
│   │   ├── components/    # Reusable UI components
│   │   ├── config/        # Configuration files
│   │   └── styles/        # Global styles and Tailwind config
│   └── ...
│
├── server/                 # Backend Node.js/Express application
│   ├── config/            # Configuration files
│   ├── dist/              # Compiled TypeScript files
│   ├── errors/            # Custom error classes
│   ├── middleware/        # Express middleware
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   └── server.ts          # Entry point
│
├── .gitignore
├── README.md
└── package.json
```

## 🚀 Deployment

### Frontend (Netlify)
1. Push your code to a GitHub repository
2. Connect the repository to Netlify
3. Set the build command: `npm run build`
4. Set the publish directory: `build/client`
5. Add environment variables from your `.env` file

### Backend (Fly.io)
1. Install Fly.io CLI: `npm install -g flyctl`
2. Login: `flyctl auth login`
3. Deploy: `flyctl deploy`
4. Set environment variables: `flyctl secrets set KEY=value`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Firebase](https://firebase.google.com/) - Backend services
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React

## 📬 Contact

- **Name**: Adrian Enev
- **Email**: [enevadria@gmail.com](mailto:enevadria@gmail.com)
- **Website**: [adrianenev.com](https://adrianenev.com)
- **GitHub**: [github.com/AdrianEnev](https://github.com/AdrianEnev)

---

<p align="center">
  Built with ❤️ and ☕ by <a href="https://github.com/AdrianEnev">Adrian Enev</a>
  <br>
  If you find this project helpful, consider giving it a ⭐️
</p>