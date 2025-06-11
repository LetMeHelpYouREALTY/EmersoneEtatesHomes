
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.emersonestateshomes.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*', '/_*'],
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/homes'),
    await config.transform(config, '/community'),
    await config.transform(config, '/amenities'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/about'),
    await config.transform(config, '/services'),
    await config.transform(config, '/neighborhoods'),
    await config.transform(config, '/market-insights'),
    await config.transform(config, '/market-trends'),
    await config.transform(config, '/blog'),
    await config.transform(config, '/calculator'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/static/']
      }
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.emersonestateshomes.com'}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: path === '/' ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
    }
  },
}
