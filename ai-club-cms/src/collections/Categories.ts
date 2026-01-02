import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: ({ req }) => {
      // Allow Admin UI & logged-in users
      if (req.user) return true

      // Allow server-to-server access
      const auth = req.headers.get('authorization')
      if (auth === `Bearer ${process.env.CMS_READ_TOKEN}`) {
        return true
      }

      return false
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Controls tab order in UI',
      },
    },
  ],
}
