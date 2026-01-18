# 🎨 Customization Guide

## Using the Admin Panel (Recommended)

### Access Admin Panel
1. Go to `your-site.com/login`
2. Click "Continue with GitHub"
3. Sign in with your authorized email

### Dashboard Sections

| Tab | What You Can Edit |
|-----|-------------------|
| **Dashboard** | Overview & quick stats |
| **Profiles** | Multiple portfolio versions |
| **Profile Info** | Name, bio, contact, social links |
| **Projects** | Add/edit/delete projects |
| **Experience** | Work history |
| **Education** | Degrees & certifications |
| **Skills** | Skill categories & levels |
| **Testimonials** | Client reviews |
| **Blog** | Blog post links |
| **Stats** | Counter statistics |
| **Sections** | Show/hide & reorder sections |
| **Theme** | Colors, fonts, style |
| **SEO** | Meta tags, descriptions |

---

## Via Code (Advanced)

### Default Data
Edit `src/context/DataContext.tsx`:
- Find `defaultProfileData` (around line 259)
- Modify the placeholder values

### Styling
- Global styles: `src/app/globals.css`
- Component styles: Each component file
- Theme: Via admin panel (recommended)

### Adding New Sections
1. Create component in `src/components/`
2. Export from `src/components/index.ts`
3. Add to `sectionComponents` in `src/app/page.tsx`

---

## Images

### Avatar
- Replace `/public/avatar.png`
- Or use URL in admin panel

### Projects
- Add images to `/public/projects/`
- Reference as `/projects/image.jpg`

### Resume
- Replace `/public/resume.pdf`

---

## Colors & Themes

Preset themes available:
- Cyberpunk (purple/cyan)
- Ocean (blue tones)
- Forest (green tones)
- Sunset (orange/red)
- Monochrome (grayscale)
- Custom (pick your own)

Access via Admin → Theme tab.

---

## Need More Help?
Check the admin panel - most things can be edited there without touching code!
