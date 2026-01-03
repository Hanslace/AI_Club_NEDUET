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

      const imageEl = (
        <Image
          src={image.url}
          alt={image.alt || ""}
          width={image.width || 600}
          height={image.height || 400}
          className="w-full rounded-[16px]"
        />
      )

      const textEl = (
        <div className="prose max-w-none">
          {nodesToJSX({ nodes: text.root.children })}
        </div>
      )

      return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-10">
          {/* Mobile: image always first */}
          {imageEl}
          {textEl}

          {/* Desktop override */}
          {imagePosition === "left" && (
            <>
              <div className="hidden md:block">{imageEl}</div>
              <div className="hidden md:block">{textEl}</div>
            </>
          )}

          {imagePosition === "right" && (
            <>
              <div className="hidden md:block">{textEl}</div>
              <div className="hidden md:block">{imageEl}</div>
            </>
          )}
        </section>
      )
    },


    imageGrid: ({ node }) => {
      const { images, columns } =
        node.fields as unknown as ImageGridBlockFields

      const columnMap: Record<number, string> = {
        2: "md:grid-cols-2",
        3: "md:grid-cols-3",
        4: "md:grid-cols-4",
      }

      return (
        <section
          className={`grid grid-cols-1 gap-6 my-10 ${
            columnMap[columns] ?? "md:grid-cols-2"
          }`}
        >
          {images.map((item, i) => (
            <Image
              key={i}
              src={item.image.url}
              alt={item.image.alt || ""}
              width={item.image.width || 500}
              height={item.image.height || 350}
              className="w-full h-auto rounded-[16px] object-cover"
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
