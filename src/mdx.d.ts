declare module '*.mdx' {
  import type { ComponentProps } from 'react';

  const MDXComponent: (props: ComponentProps<'div'>) => JSX.Element;
  export default MDXComponent;
}
