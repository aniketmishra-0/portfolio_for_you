# 🚀 Portfolio Pro - Modern Developer Portfolio Template

A stunning, fully customizable developer portfolio built with **Next.js 16**, featuring an admin panel, GitHub OAuth authentication, and Appwrite backend.

![Portfolio Preview](preview.png)

## ✨ Features

- 🎨 **Modern Design** - Glassmorphism, animations, dark/light mode
- 🔐 **Admin Panel** - Edit everything without code
- 🔑 **GitHub OAuth** - Secure login via Appwrite
- 📱 **Fully Responsive** - Perfect on all devices
- ⚡ **Fast** - Next.js 16 with Turbopack
- 🌐 **SEO Optimized** - Meta tags, Open Graph
- 🎯 **Customizable** - Colors, fonts, sections, order
- 📊 **Multiple Profiles** - Different portfolios for different roles

## 🛠️ Tech Stack

- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS
- Framer Motion
- Appwrite (Auth + Database)

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/portfolio-template.git
cd portfolio-template
npm install
```

### 2. Set Up Appwrite

1. Create account at [cloud.appwrite.io](https://cloud.appwrite.io)
2. Create a new project
3. Enable GitHub OAuth in Auth settings
4. Add your domain as a Web Platform

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
NEXT_PUBLIC_ALLOWED_ADMIN_EMAIL=your.email@gmail.com
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📝 Customization

### Via Admin Panel (Recommended)
1. Go to `/login`
2. Sign in with GitHub (must be allowed admin email)
3. Edit everything from the dashboard

### Via Code
Edit `src/context/DataContext.tsx` for default data.

---

## 🌐 Deployment

### Appwrite Sites (Recommended)
1. Appwrite Console → Sites → Create Site
2. Connect GitHub repository
3. Add environment variables
4. Deploy!

### Vercel
1. Import repository to Vercel
2. Add environment variables
3. Deploy!

---

## 📁 Project Structure

```
src/
├── app/           # Next.js pages
├── components/    # React components
├── context/       # Data & Auth context
└── lib/           # Appwrite client
```

---

## 📄 License

MIT License - Use commercially, modify, distribute freely.

---

## 🤝 Support

For setup help or customization requests, contact the seller.
