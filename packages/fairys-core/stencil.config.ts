import { Config } from '@stencil/core';
// import { reactOutputTarget } from '@stencil/react-output-target'
import { reactOutputTarget } from "@fairys/react-output-target"

export const config: Config = {
  namespace: 'fairys-core',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      dir: 'dist/components',
      copy: [{
        src: '../scripts/custom-elements',
        dest: 'dist/components',
        warn: true
      }],
      includeGlobalScripts: false
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    reactOutputTarget({
      includeImportCustomElements: true,
      componentCorePackage: '@fairys/core',
      customElementsDir: "dist/components",
      removePrefix: "fairys-",
      proxiesFile: '../fairys-react/src/index.ts',
    }),
  ],
  testing: {
    browserHeadless: "new",
  },
};
