declare module 'dotenv-webpack' {
  import { Plugin } from 'webpack';
  
  interface DotenvWebpackOptions {
    path?: string;
    safe?: boolean | string;
    systemvars?: boolean;
    silent?: boolean;
    defaults?: boolean;
  }

  class DotenvWebpack extends Plugin {
    constructor(options?: DotenvWebpackOptions);
  }

  export = DotenvWebpack;
} 