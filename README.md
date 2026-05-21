# TamLing Tea - Premium Landing Page

A modern, highly responsive, and premium landing page for **TamLing Tea** — showcasing the essence of Vietnamese ancient wild teas and Tây Nguyên longevity herbs. Built with **React**, **Vite**, and **Vanilla CSS** featuring state-of-the-art styling, dark aesthetics, and dual-language localization (English & Vietnamese).

---

## 🍵 Project Overview

**TamLing Tea** offers a sensory journey into the ancient wild forests of Northwest Vietnam and the herbal traditions of the Central Highlands. 

- **Vietnamese Specialty Teas**: Harvested from wild centuries-old tea trees (Camellia sinensis & Camellia taliensis) at altitudes over 1,000–2,000 meters in Northwest Vietnam.
- **Bitter Melon Longevity Tea**: A wellness blend of 6 indigenous wild plants from the Central Highlands, distributed as complimentary samples for trial and longevity support.

This repository contains the source code for the premium landing page, fully optimized for fast loading, SEO, and seamless deployment on Vercel.

---

## ✨ Features

- **Modern & Premium Aesthetics**: Sleek dark mode design with gold accents, smooth glassmorphism, tailored typography (Playfair Display & Inter via Google Fonts), and interactive micro-animations.
- **Localization (i18n)**: Fully supporting dynamic language toggle between **English (EN)** and **Vietnamese (VI)**.
- **Responsive Layout**: Designed mobile-first, ensuring an optimal user experience across smartphones, tablets, laptops, and wide monitors.
- **Product Showcase**: Detailed highlights of the specialty teas, packaging specs, ingredients, and guidelines.
- **Interactive Brewing & Adaptation Schedules**:
  - Interactive infusion guides (temperature, ratio, multiple steep profiles).
  - Weekly progressive dosage timeline for adapting to active herbal infusions.
- **Interactive Contact & Booking Form**: Allows visitors to register for free Bitter Melon Tea samples or book a private tea-tasting experience.
- **SEO & Performance Optimized**: Properly structured semantic HTML, structured titles, meta descriptions, and clean assets.
- **Vercel Native Deployment**: Pre-configured `vercel.json` for routing and clean URLs.

---

## 📂 Project Structure

```text
TamLing/
├── public/
│   ├── favicon.ico
│   └── images/                 # Friendly named, optimized assets
│       ├── benefits.jpg
│       ├── bitter-melon-tea.jpg
│       ├── brewing-guide.jpg
│       ├── schedule.jpg
│       ├── tea-culture.jpg
│       └── warnings.jpg
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── BrewingGuide.jsx    # Brewing guidelines & taste profiles
│   │   ├── ContactForm.jsx     # Registration for samples & visits
│   │   ├── Footer.jsx          # Copyright and brand signature
│   │   ├── Header.jsx          # Sticky nav & language switcher
│   │   ├── Hero.jsx            # Brand introduction & primary CTA
│   │   ├── Products.jsx        # Ancient teas & bitter melon longevity tea
│   │   └── Warnings.jsx        # Health precautions & adaptation info
│   ├── locales/                # Localization string definitions
│   │   ├── en.js               # English copy
│   │   └── vi.js               # Vietnamese copy
│   ├── App.jsx                 # Application entry, state manager
│   ├── index.css               # Global CSS styles & design system tokens
│   └── main.jsx                # DOM mounting
├── index.html                  # Root template & SEO tags
├── package.json                # Dependencies & script configs
├── vercel.json                 # Vercel deployment routing rules
└── README.md                   # Project documentation (You are here)
```

---

## 🛠️ Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Vanilla CSS (Tailored HSL color palette, CSS Grid/Flexbox, custom micro-interactions)
- **Deployment**: Vercel Ready

---

## 🚀 Local Development

To run the project locally, ensure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

1. **Clone or Navigate to the project directory:**
   ```bash
   cd TamLing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the local URL (usually `http://localhost:5173`).

4. **Build for production:**
   ```bash
   npm run build
   ```
   This will output optimized static files into the `dist/` directory, ready to be served.

---

## 🌐 Deployment on Vercel

The project is pre-configured for one-click Vercel deployments.

### Option 1: Vercel CLI (Recommended for Local Devs)
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project root directory.
3. Follow the prompts to link the project and deploy.
4. Deploy to production using `vercel --prod`.

### Option 2: Connect to GitHub (Continuous Integration)
1. Push the code to a remote Git repository (GitHub, GitLab, Bitbucket).
2. Go to [Vercel Dashboard](https://vercel.com/) and click **Add New** > **Project**.
3. Import your repository.
4. Keep the default build settings (Vite is automatically detected) and click **Deploy**.

---

## 📞 Experience & Contact

To experience the unique terroir of our wild ancient teas:

- **Hotline**: `0981498668`
- **Tasting Space Address**: Phù Đổng, Gia Lâm, Hanoi, Vietnam
