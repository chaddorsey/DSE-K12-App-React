declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '@remix-run/router' {
  export * from '@remix-run/router/dist/index';
} 