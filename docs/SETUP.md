
# Setup Guide

## Quick Start

1. **Open in Replit**
   - Project runs automatically in Replit environment
   - Dependencies are installed automatically

2. **Start Development**
   ```bash
   npm run dev
   ```

3. **Access the Site**
   - Development: Click the web preview in Replit
   - Production: www.emersonestateshomes.com

## Development Setup

### Prerequisites
- Replit account (recommended)
- Or local Node.js 18+ installation

### Installation Steps

1. **Clone/Import Repository**
   ```bash
   # If using git
   git clone [repository-url]
   cd emerson-estates
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create `.env.local` file (if needed):
   ```env
   # Add any required environment variables
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## File Structure Setup

### Key Directories
```
emerson-estates/
├── components/     # React components
├── pages/         # Next.js pages
├── public/        # Static assets
├── styles/        # CSS files
├── types/         # TypeScript definitions
└── docs/          # Documentation
```

### Important Files
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.json` - ESLint rules
- `tailwind.config.js` - Tailwind CSS config (if needed)

## Development Workflow

### Making Changes
1. Create new branch for features
2. Make changes in appropriate files
3. Test locally with `npm run dev`
4. Commit changes with descriptive messages

### Testing
```bash
# Run linting
npm run lint

# Build for production (test)
npm run build

# Start production server
npm run start
```

### Page Creation
1. Create new file in `pages/` directory
2. Add to navigation in `components/Layout.tsx`
3. Add appropriate meta tags and SEO

## Deployment Setup

### Replit Deployment
1. **Automatic Deployment**
   - Configured via `.replit` file
   - Builds automatically on changes

2. **Manual Deployment**
   ```bash
   npm run build
   npm run start
   ```

3. **Environment Variables**
   - Set in Replit Secrets tab
   - Access via `process.env.VARIABLE_NAME`

### Custom Domain Setup
1. Configure DNS records
2. Point to Replit deployment URL
3. SSL certificate auto-generated

## Common Issues

### Build Errors
- Check TypeScript errors: `npm run lint`
- Verify all imports are correct
- Ensure all required dependencies are installed

### Performance Issues
- Optimize images in `/public` directory
- Check for unused CSS/JavaScript
- Monitor bundle size with `npm run build`

### Styling Issues
- Check Tailwind CSS classes
- Verify CSS Module imports
- Test responsive design on multiple devices

## Additional Configuration

### RealScout Integration
1. Obtain API credentials
2. Configure widget parameters
3. Test property listings display

### Contact Form
1. Verify API endpoint functionality
2. Test form submission
3. Configure email notifications

### Analytics Setup
1. Add Google Analytics ID
2. Configure tracking codes
3. Set up conversion tracking

## Support

### Documentation
- Check `docs/` directory for detailed guides
- Review `PROJECT_STRUCTURE.md` for overview

### Troubleshooting
- Check browser console for errors
- Review Replit logs for server issues
- Verify all environment variables are set

### Getting Help
- Use Replit community forums
- Check Next.js documentation
- Review error messages carefully
