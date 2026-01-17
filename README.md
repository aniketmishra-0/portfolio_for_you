# Aniket Mishra's Portfolio

A stunning, modern portfolio website built with Next.js 14, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🎨 **Premium Dark Theme** - Glassmorphism, gradients, and smooth animations
- ⚡ **Fast Performance** - Built with Next.js 14 App Router
- 📱 **Fully Responsive** - Works on all devices
- 🎭 **Beautiful Animations** - Powered by Framer Motion
- 📝 **Easy Content Updates** - Just edit `src/lib/data.ts`
- 🔍 **SEO Optimized** - Meta tags, Open Graph, Twitter cards

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx      # Main portfolio page
│   │   ├── layout.tsx    # Root layout with SEO
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── Navbar.tsx    # Navigation bar
│   │   ├── Hero.tsx      # Hero section
│   │   ├── About.tsx     # About section
│   │   ├── Skills.tsx    # Skills display
│   │   ├── Projects.tsx  # Project showcase
│   │   ├── Experience.tsx # Work experience
│   │   ├── Education.tsx # Education & certs
│   │   ├── Blog.tsx      # Blog articles
│   │   ├── Contact.tsx   # Contact form
│   │   └── Footer.tsx    # Site footer
│   └── lib/
│       └── data.ts       # ⭐ EDIT THIS TO UPDATE CONTENT
└── public/               # Static assets
```

## ✏️ How to Edit Content

**No coding required!** Just edit the `src/lib/data.ts` file:

### Update Your Profile
```typescript
export const profileData = {
  name: "Your Name",
  title: "Your Title",
  email: "your@email.com",
  // ... other fields
};
```

### Add Projects
```typescript
export const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Project description",
    tags: ["React", "Node.js"],
    liveUrl: "https://...",
    githubUrl: "https://github.com/...",
  },
  // Add more projects...
];
```

### Add Experience
```typescript
export const experience = [
  {
    id: 1,
    role: "Job Title",
    company: "Company Name",
    duration: "2023 - Present",
    description: ["Responsibility 1", "Responsibility 2"],
    technologies: ["React", "Node.js"],
  },
  // Add more experience...
];
```

## 🎨 Customization

### Colors
Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --accent-primary: #6366f1;    /* Change primary color */
  --accent-secondary: #8b5cf6;  /* Change secondary color */
  --accent-tertiary: #d946ef;   /* Change tertiary color */
}
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Done! Auto-deploys on every push

### Other Platforms
```bash
npm run build
# Deploy the .next folder
```

## 📄 License

MIT License - feel free to use this for your own portfolio!

---

Made with ❤️ by Aniket Mishra
