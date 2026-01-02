// collections/Projects.ts
import type { CollectionConfig } from 'payload'
import { generateTOC } from '../utils/generateTOC'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      const auth = req.headers.get('authorization')
      if (auth === `Bearer ${process.env.CMS_READ_TOKEN}`) return true
      return false
    },
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        data.tableOfContents = []

        if (data.content) {
          data.tableOfContents = generateTOC(data.content)
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tableOfContents',
      type: 'array',
      admin: {
        readOnly: true,
        description: 'Auto-generated from content headings',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'anchor',
          type: 'text',
          required: true,
        },
        { name: 'level', type: 'number', required: true },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
}
