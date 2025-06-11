
# Emerson Estates Website - Project Structure

## 🏗️ Project Overview
**Domain:** www.emersonestateshomes.com  
**Address:** 2583 Regency Cove Ct, Las Vegas, NV 89121  
**Type:** Luxury Real Estate Website  
**Framework:** Next.js with TypeScript  
**Deployment:** Replit Deployments  

## 📁 Directory Structure

```
emerson-estates/
├── components/
│   ├── Layout.tsx              # Shared layout component
│   └── RealScoutWidget.tsx     # Property listings widget
├── pages/
│   ├── api/
│   │   └── hello.ts           # Contact form API endpoint
│   ├── _app.tsx               # Next.js app wrapper
│   ├── index.tsx              # Homepage
│   ├── homes.tsx              # Available homes page
│   ├── community.tsx          # Community information
│   ├── amenities.tsx          # Community amenities
│   └── contact.tsx            # Contact form page
├── public/
│   ├── favicon.ico            # Site icon
│   └── replit.svg            # Replit logo
├── styles/
│   ├── globals.css            # Global styles
│   └── Home.module.css        # Page-specific styles
├── .eslintrc.json             # ESLint configuration
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## 🎯 Key Features

### ✅ Implemented
- **Responsive Design:** Mobile-friendly layout
- **Property Listings:** RealScout widget integration
- **SEO Optimized:** Meta tags, titles, descriptions
- **Navigation:** Consistent header/footer across pages
- **Contact System:** API endpoint for inquiries
- **Modern UI:** Clean, professional styling

### 🔧 Technical Stack
- **Framework:** Next.js 15.2.3
- **Language:** TypeScript
- **Styling:** CSS Modules + Global CSS
- **Deployment:** Replit with custom domain support
- **Property Data:** RealScout API integration

## 🚀 Deployment Configuration

### Current Settings
- **Build Command:** `npm run build`
- **Run Command:** `npm run start`
- **Port:** 3000 (forwarded to 80/443 in production)

### Custom Domain Setup
1. Deploy on Replit Deployments
2. Configure DNS records for www.emersonestateshomes.com
3. Add SSL certificate (automatic via Replit)

## 📊 Page Structure

### Homepage (/)
- Hero section with CTA
- Featured properties widget
- Contact information

### Available Homes (/homes)
- Property listings
- Home features overview
- Search functionality via RealScout

### Community (/community)
- Neighborhood information
- Location benefits
- Community highlights

### Amenities (/amenities)
- Recreation facilities
- Lifestyle features
- Community services

### Contact (/contact)
- Contact form
- Office information
- Sales team details

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## 📈 SEO & Performance
- Optimized meta tags for each page
- Structured data for real estate listings
- Fast loading with Next.js optimization
- Mobile-responsive design
- Clean URL structure

## 🔗 External Integrations
- **RealScout:** Property listings and search
- **Contact API:** Lead capture system
- **Analytics:** Ready for Google Analytics/Tag Manager

## 📋 Todo/Future Enhancements
- [ ] Property detail pages
- [ ] Virtual tour integration
- [ ] Mortgage calculator
- [ ] Neighborhood map
- [ ] Blog/news section
- [ ] Customer testimonials
- [ ] Advanced search filters
