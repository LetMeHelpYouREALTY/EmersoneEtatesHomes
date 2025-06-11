
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://emersonestateshomes.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*', '/_*'],
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/about'),
    await config.transform(config, '/homes'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/services'),
    await config.transform(config, '/neighborhoods'),
    await config.transform(config, '/market-insights'),
    await config.transform(config, '/community'),
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
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://emersonestateshomes.com'}/sitemap.xml`
    ]
  }
}
