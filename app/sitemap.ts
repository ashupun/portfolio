import { MetadataRoute } from 'next'
import { blogs } from './data/blogs'

const baseUrl = 'https://ashupun.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.id}`,
    lastModified: new Date(blog.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...blogEntries,
  ]
}
