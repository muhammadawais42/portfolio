# 🚀 Muhammad Awais Portfolio - Deployment & Domain Guide

This redesigned portfolio is fully static, zero-dependency, ultra-fast, and compatible with **GitHub Pages**, **Vercel**, **Netlify**, **Cloudflare Pages**, or any custom hosting domain.

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Main semantic HTML with modern SEO & OpenGraph tags
├── robots.txt              # Search engine crawler permissions
├── sitemap.xml             # Search engine index sitemap
├── assets/
│   ├── css/
│   │   └── main.css        # Design tokens, Dark/Light glassmorphism system
│   ├── js/
│   │   └── main.js         # Theme toggle, project filtering, modals, toasts, canvas
│   ├── images/             # High-resolution project covers & avatar
│   │   ├── avatar.jpg
│   │   ├── agri_ai.jpg
│   │   ├── emotion_ai.jpg
│   │   ├── flutter_mobile.jpg
│   │   ├── pos_store.jpg
│   │   └── unity_game.jpg
│   └── docs/               # Put your PDF Resume here (e.g. resume.pdf)
└── DEPLOYMENT.md
```

---

## 🌐 1. Deploying to GitHub Pages

1. Copy the contents of this `portfolio` folder to your local Git repository for `muhammadawais42.github.io/portfolio`.
2. Commit and push:
   ```bash
   git add .
   git commit -m "feat: complete modern portfolio overhaul with dark mode, modals, and rich assets"
   git push origin main
   ```
3. Go to **GitHub Repository Settings** -> **Pages** -> ensure the source branch is set to `main` (or `master`) and folder is set to `/ (root)`.
4. Your site will automatically update at `https://muhammadawais42.github.io/portfolio/`.

---

## 🌍 2. Connecting Your Own Custom Domain

When you purchase your own domain (e.g., `muhammadawais.dev` or `awais.me` from Namecheap, GoDaddy, Cloudflare, or Google Domains):

### Option A: Hosting via GitHub Pages with Custom Domain
1. Create a file named `CNAME` in the root folder containing only your domain name:
   ```
   muhammadawais.dev
   ```
2. In your Domain Registrar's DNS Settings, add these records:
   - **Apex domain (`@` or root)**: Add 4 `A` Records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **`www` subdomain**: Add a `CNAME` record pointing to:
     - `muhammadawais42.github.io`
3. In GitHub Settings -> Pages -> check **Enforce HTTPS**.

### Option B: Deploying to Vercel / Netlify / Cloudflare Pages (Recommended for 1-Click SSL)
1. Import your GitHub repository into Vercel or Cloudflare Pages.
2. Build command: None (Static site).
3. Add your custom domain in the Vercel/Cloudflare dashboard—it automatically generates free SSL certificates.

---

## 📄 3. Adding Your PDF Resume
Drop your resume into `assets/docs/resume.pdf`. The download buttons in the Hero and Navbar will automatically point to it.
