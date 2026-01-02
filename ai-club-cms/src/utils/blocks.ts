// blocks/blocks.ts
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

const nestedEditor = lexicalEditor({
  features: ({ defaultFeatures }) => defaultFeatures,
})

export const blocksFeature = BlocksFeature({
  blocks: [
    // Image + Text (existing)
    {
      slug: 'imageText',
      labels: {
        singular: 'Image + Text',
        plural: 'Image + Text',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'text',
          type: 'richText',
          required: true,
          editor: nestedEditor,
        },
        {
          name: 'imagePosition',
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'left',
        },
      ],
    },

    // Grid of Images
    {
      slug: 'imageGrid',
      labels: {
        singular: 'Image Grid',
        plural: 'Image Grids',
      },
      fields: [
        {
          name: 'images',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          name: 'columns',
          type: 'select',
          defaultValue: '3',
          options: [
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
        },
      ],
    },

    // Image with Labeling Text
    {
      slug: 'imageWithLabel',
      labels: {
        singular: 'Image with Label',
        plural: 'Images with Label',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
})
