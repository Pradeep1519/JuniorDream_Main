# Junior Dream Private Limited - Website

## 🚀 About
Junior Dream is a student success platform that helps young learners discover their potential, build skills, and achieve their career goals through mentorship, education, and guidance.

## 🛠️ Tech Stack
- React 18
- TypeScript
- Tailwind CSS v4
- Vite
- React Router v7

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- pnpm or npm

### Setup
```bash
# Install dependencies
pnpm install
# or
npm install

# Start development server
pnpm run dev
# or
npm run dev

# Build for production
pnpm run build
# or
npm run build
```

## 🔐 Applicant Accounts

The application flow uses Firebase Authentication with email and password. Enable the **Email/Password** provider for the configured Firebase project before accepting applications. Applicant profiles and application documents are stored at `users/{uid}` and `applications/{applicationId}`; application documents are readable only by their owning UID.

Firestore policy is in `firestore.rules`. Review it against any existing production rules and other Firebase collections before deploying, since this workspace does not contain the currently deployed rules or Firebase CLI project configuration. Deploy enrollment records from a trusted server/admin environment at `enrollments/{uid}`; browser clients are intentionally denied enrollment writes. A separate enrollment record with `status: "enrolled"` is required to unlock the Student Portal.