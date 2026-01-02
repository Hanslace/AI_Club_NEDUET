import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: ({ req }) => {
        // Admin UI & logged-in users → full access (including deleted)
        if (req.user) {
        return true
        }

        // Server-to-server access → only non-deleted docs
        const auth = req.headers.get('authorization')
        if (auth === `Bearer ${process.env.CMS_READ_TOKEN}`) {
        return {
            isDeleted: {
            equals: false,
            },
        }
        }

        // Everyone else → no access
        return false
    },
  },

  fields: [
    {
      name: 'isDeleted',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'linkedinUrl',
      type: 'text',
    },
  ],
}
