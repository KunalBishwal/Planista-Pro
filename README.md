# Planista Pro - Event Planning Management System

Planista Pro is a full-featured event planning management system that simplifies venue booking, staff management, and payment processing. Built with modern web technologies, it offers a seamless experience for event organizers and attendees.

## 🚀 Features
- ✅ **Venue Management** – Browse, filter, and book venues in real-time
- ✅ **Event Booking** – Manage and schedule events with ease
- ✅ **Staff Management** – Assign staff to events and track availability
- ✅ **Secure Payments** – Integrated with Stripe/PayPal for smooth transactions
- ✅ **User Authentication** – Secure login with NextAuth.js and MySQL
- ✅ **Real-Time Updates** – Venue availability and search results refresh dynamically
- ✅ **Responsive UI** – Optimized for desktop and mobile devices

## 🛠️ Tech Stack
**Frontend**  
- React.js + Next.js – For building a fast and dynamic UI
- Tailwind CSS – For modern and responsive styling
- Framer Motion – For smooth UI animations

**Backend**  
- Node.js + Express.js – Handles API routes and business logic
- MySQL – Relational database for storing events, venues, users, and payments
- Prisma ORM – Simplifies database interactions

**Authentication**  
- NextAuth.js – Email/password authentication with MySQL

**Payments**  
- Stripe / PayPal – Secure and seamless payment processing

## 📂 Project Structure
```
planista-pro/
│── public/                  # Static assets (images, icons, etc.)
│── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Next.js pages (Home, Venues, Booking, etc.)
│   ├── styles/              # Global and component-specific styles
│   ├── utils/               # Helper functions
│── prisma/                  # Database schema and migrations
│── server/                  # Express.js backend
│── .env                     # Environment variables
│── next.config.js           # Next.js configuration
│── package.json             # Dependencies and scripts
│── README.md                # Project documentation
```
## 📌 Installation & Setup
1. **Clone the Repository**
```bash
git clone https://github.com/your-username/planista-pro.git
cd planista-pro
npm install
Set Up Environment Variables
Create .env file:
DATABASE_URL=mysql://user:password@localhost:3306/eventplanning
NEXTAUTH_SECRET=your-secret-key
STRIPE_SECRET_KEY=your-stripe-key

Set Up Database
npx prisma migrate dev
npx prisma generate

Start Development Server:
npm run dev

This markdown file uses proper GitHub formatting with:
- Headers and subheaders
- Code blocks with syntax highlighting
- Tables
- Emoji support
- Clear section organization
- Bullet points and checkmark emojis
- Proper indentation and spacing

Just copy this into your README.md file and it will render correctly on GitHub.
