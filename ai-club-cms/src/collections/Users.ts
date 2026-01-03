import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,

  admin: {
    useAsTitle: 'email',
  },

  access: {
    read: ({ req }) => {
      // Admin UI
      if (req.user?.role === 'admin') return true

      // Token-based public reads (blogs author)
      const auth = req.headers.get('authorization')
      if (auth === `Bearer ${process.env.CMS_READ_TOKEN}`) return true

      // Self-read
      if (req.user) return true

      return false
    },

    create: ({ req }) => {
      if (!req.user) return true
      return req.user.role === 'admin'
    },

    update: ({ req, id }) => {
      if (!req.user) return false
      if (req.user.role === 'admin') return true
      return req.user.id === id
    },

    delete: ({ req }) => req.user?.role === 'admin',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
        },
    {
      name: 'profilePic',
      label: 'Profile Picture',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
}
