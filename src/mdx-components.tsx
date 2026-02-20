import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => <h1 className={`mdx-h1 ${className ?? ''}`} {...props} />,
    h2: ({ className, ...props }) => <h2 className={`mdx-h2 ${className ?? ''}`} {...props} />,
    h3: ({ className, ...props }) => <h3 className={`mdx-h3 ${className ?? ''}`} {...props} />,
    p: ({ className, ...props }) => <p className={`mdx-p ${className ?? ''}`} {...props} />,
    ul: ({ className, ...props }) => <ul className={`mdx-ul ${className ?? ''}`} {...props} />,
    ol: ({ className, ...props }) => <ol className={`mdx-ol ${className ?? ''}`} {...props} />,
    a: ({ className, ...props }) => <a className={`mdx-link ${className ?? ''}`} {...props} />,
    blockquote: ({ className, ...props }) => (
      <blockquote className={`mdx-quote ${className ?? ''}`} {...props} />
    ),
    code: ({ className, ...props }) => <code className={`mdx-code ${className ?? ''}`} {...props} />,
    ...components,
  };
}
