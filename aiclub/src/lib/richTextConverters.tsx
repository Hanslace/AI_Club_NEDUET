// richTextConverters.tsx
import Image from 'next/image'
import type { SerializedEditorState, SerializedLexicalNode } from 'lexical'
import {
  defaultJSXConverters,
  JSXConverters,
} from '@payloadcms/richtext-lexical/react'

type ImageTextBlockFields = {
  image: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  text: SerializedEditorState<SerializedLexicalNode>
  imagePosition: 'left' | 'right'
}

type ImageGridBlockFields = {
  images: {
    image: {
      url: string
      alt?: string
      width?: number
      height?: number
    }
  }[]
  columns: '2' | '3' | '4'
}

type ImageWithLabelBlockFields = {
  image: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  label: string
}
type MediaDoc = {
  url: string
  alt?: string
  width?: number
  height?: number
}



function isMediaDoc(value: unknown): value is MediaDoc {
  return (
    typeof value === 'object' &&
    value !== null &&
    'url' in value &&
    typeof (value as { url: unknown }).url === 'string'
  )
}



const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")

function isTextSerializedNode(
  node: SerializedLexicalNode
): node is SerializedLexicalNode & { text: string } {
  return (
    typeof node === 'object' &&
    node !== null &&
    (node as Record<string, unknown>).type === 'text' &&
    typeof (node as Record<string, unknown>).text === 'string'
  )
}

function hasChildren(
  node: SerializedLexicalNode
): node is SerializedLexicalNode & { children: SerializedLexicalNode[] } {
  return (
    typeof node === 'object' &&
    node !== null &&
    Array.isArray((node as Record<string, unknown>).children)
  )
}

function extractPlainText(
  nodes: readonly SerializedLexicalNode[]
): string {
  let result = ''

  for (const node of nodes) {
    if (isTextSerializedNode(node)) {
      result += node.text
    }

    if (hasChildren(node)) {
      result += extractPlainText(node.children)
    }
  }

  return result
}



export const richTextConverters: JSXConverters = {
  ...defaultJSXConverters,

  heading: ({ node, nodesToJSX }) => {
    const tag = node.tag || "h2"

    const text = extractPlainText(node.children).trim()

    const id = slugify(text)

    const content = nodesToJSX({ nodes: node.children })

    switch (tag) {
      case "h1":
        return (
          <h1 id={id} className="mt-12 mb-6 text-4xl font-bold">
            {content}
          </h1>
        )
      case "h2":
        return (
          <h2 id={id} className="mt-10 mb-5 text-3xl font-semibold">
            {content}
          </h2>
        )
      case "h3":
        return (
          <h3 id={id} className="mt-8 mb-4 text-2xl font-semibold">
            {content}
          </h3>
        )
      case "h4":
        return (
          <h4 id={id} className="mt-6 mb-3 text-xl font-semibold">
            {content}
          </h4>
        )
      default:
        return (
          <h5 id={id} className="mt-4 mb-2 text-lg font-semibold">
            {content}
          </h5>
        )
    }
  },

  upload: ({ node }) => {
    if (!isMediaDoc(node.value)) return null

    const media = node.value

    return (
      <figure className="my-12 w-full flex justify-center">
        <Image
          src={media.url}
          alt={media.alt || ''}
          width={media.width || 1600}
          height={media.height || 900}
          className="w-full max-w-4xl h-auto rounded-lg"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </figure>
    )
  },
  blocks: {
    ...defaultJSXConverters.blocks,

    imageText: ({ node, nodesToJSX }) => {
      const { image, text, imagePosition } =
        node.fields as unknown as ImageTextBlockFields

      return (
        <section className="grid grid-cols-2 gap-8 items-center my-10">
          {imagePosition === 'left' && (
            <Image
              src={image.url}
              alt={image.alt || ''}
              width={image.width || 600}
              height={image.height || 400}
            />
          )}

          <div className="prose max-w-none">
            {nodesToJSX({ nodes: text.root.children })}
          </div>

          {imagePosition === 'right' && (
            <Image
              src={image.url}
              alt={image.alt || ''}
              width={image.width || 600}
              height={image.height || 400}
            />
          )}
        </section>
      )
    },

    imageGrid: ({ node }) => {
      const { images, columns } =
        node.fields as unknown as ImageGridBlockFields

      return (
        <section
          className={`grid gap-6 my-10 grid-cols-${columns}`}
        >
          {images.map((item, i) => (
            <Image
              key={i}
              src={item.image.url}
              alt={item.image.alt || ''}
              width={item.image.width || 500}
              height={item.image.height || 350}
              className="w-full h-auto object-cover"
            />
          ))}
        </section>
      )
    },

    imageWithLabel: ({ node }) => {
      const { image, label } =
        node.fields as unknown as ImageWithLabelBlockFields

      return (
        <figure className="my-10 text-center">
          <Image
            src={image.url}
            alt={image.alt || ''}
            width={image.width || 700}
            height={image.height || 450}
            className="mx-auto"
          />
          <figcaption className="mt-3 text-sm text-muted-foreground">
            {label}
          </figcaption>
        </figure>
      )
    },
  },
}
