type TextNode = {
  type: 'text'
  text: string
}

type HeadingNode = {
  type: 'heading'
  tag?: `h${1 | 2 | 3 | 4 | 5 | 6}`
  children: LexicalNode[]
}

type ElementNode = {
  type: string
  children: LexicalNode[]
}

type LexicalNode = TextNode | HeadingNode | ElementNode

type LexicalRoot = {
  root: {
    children: LexicalNode[]
  }
}

function isHeadingNode(node: LexicalNode): node is HeadingNode {
  return node.type === 'heading'
}

function hasChildren(node: LexicalNode): node is HeadingNode | ElementNode {
  return 'children' in node
}


type TOCItem = {
  label: string
  anchor: string
  level: number
}

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')

export function generateTOC(content: unknown): TOCItem[] {
  if (
    typeof content !== 'object' ||
    content === null ||
    !('root' in content) ||
    typeof (content as any).root !== 'object' ||
    !Array.isArray((content as any).root.children)
  ) {
    return []
  }

  const root = content as LexicalRoot
  const toc: TOCItem[] = []

  const walk = (nodes: LexicalNode[]) => {
    for (const node of nodes) {
      if (isHeadingNode(node)) {
        const text = node.children
          .filter((c): c is TextNode => c.type === 'text')
          .map((c) => c.text)
          .join('')
          .trim()

        if (text) {
          const level = node.tag
            ? Number(node.tag.slice(1))
            : 2

          toc.push({
            label: text,
            anchor: slugify(text),
            level,
          })
        }
      }

      if (hasChildren(node)) {
        walk(node.children)
      }
    }
  }

  walk(root.root.children)
  return toc
}
