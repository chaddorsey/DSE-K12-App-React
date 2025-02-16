declare module 'dotenv-webpack' {
  import { Configuration, Plugin } from 'webpack';
  
  interface DotenvOptions {
    path?: string;
    safe?: boolean | string;
    systemvars?: boolean;
    silent?: boolean;
    defaults?: boolean;
  }

  class Dotenv extends Plugin {
    constructor(options?: DotenvOptions);
  }

  export = Dotenv;
} 