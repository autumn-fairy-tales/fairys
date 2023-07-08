import path from 'path';
import type { OutputTargetReact, PackageJSON } from '@stencil/react-output-target/dist/types';
import { dashToPascalCase, normalizePath, relativeImport, } from './utils';
import type { ComponentCompilerMeta, Config, OutputTargetDist } from '@stencil/core/internal';


const getComponentName = (name: string, removePrefix?: string) => {
  if (removePrefix && name) {
    return name.replace(removePrefix, "")
  }
  return name
}

/**
 * Generate the code that will be responsible for creating the Stencil-React bindings
 * @param config the Stencil configuration associated with the project
 * @param components the Stencil components to generate wrappers for
 * @param pkgData `package.json` data for the Stencil project
 * @param outputTarget the output target configuration used to generate the Stencil-React bindings
 * @param rootDir the directory of the Stencil project
 * @returns the generated code to create the Stencil-React bindings
 */
export function generateProxies(
  config: Config,
  components: ReadonlyArray<ComponentCompilerMeta>,
  pkgData: PackageJSON,
  outputTarget: OutputTargetReact & { removePrefix?: string },
  rootDir: string
) {
  const { removePrefix } = outputTarget
  const removeComponentPrefix = dashToPascalCase(removePrefix);

  const distTypesDir = path.dirname(pkgData.types);
  const dtsFilePath = path.join(rootDir, distTypesDir, GENERATED_DTS);
  const componentsTypeFile = relativeImport(outputTarget.proxiesFile, dtsFilePath, '.d.ts');
  // const pathToCorePackageLoader = getPathToCorePackageLoader(config, outputTarget);

  const imports = `/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from '../react-component-lib';\n`;

  /**
   * Generate JSX import type from correct location.
   * When using custom elements build, we need to import from
   * either the "components" directory or customElementsDir
   * otherwise we risk bundlers pulling in lazy loaded imports.
   */
  const generateTypeImports = () => {
    if (outputTarget.componentCorePackage !== undefined) {
      const dirPath = outputTarget.includeImportCustomElements
        ? `/${outputTarget.customElementsDir || 'components'}`
        : '';
      return `import type { ${IMPORT_TYPES} } from '${normalizePath(outputTarget.componentCorePackage)}${dirPath}';\n`;
    }

    return `import type { ${IMPORT_TYPES} } from '${normalizePath(componentsTypeFile)}';\n`;
  };

  const typeImports = generateTypeImports();



  const indexContent: string[] = []

  /**根据组件进行分组引入*/
  // { name:"组件名称",content:"内容" }
  const componentArray = components.map((component) => {
    const { tagName } = component
    const pascalImport = dashToPascalCase(component.tagName);

    const newName = getComponentName(tagName, removePrefix)
    const contentArray: string[] = [
      imports,
      typeImports
    ]
    contentArray.push(`import { defineCustomElement as define${pascalImport} } from '${normalizePath(
      outputTarget.componentCorePackage!
    )}/${outputTarget.customElementsDir || 'components'}/${component.tagName}.js';`)

    contentArray.push(createComponentDefinition(component, outputTarget.includeImportCustomElements, removeComponentPrefix))

    indexContent.push(`export * from "./components/${newName}"`)

    return { name: newName, content: contentArray.join("\n") }
  })

  return { componentArray, indexContent: indexContent.join("\n") }
  // let sourceImports = '';
  // let registerCustomElements = '';

  // /**
  //  * Build an array of Custom Elements build imports and namespace them so that they do not conflict with the React
  //  * wrapper names. For example, IonButton would be imported as IonButtonCmp to not conflict with the IonButton React
  //  * Component that takes in the Web Component as a parameter.
  //  */
  // if (outputTarget.includeImportCustomElements && outputTarget.componentCorePackage !== undefined) {
  //   const cmpImports = components.map((component) => {
  //     const pascalImport = dashToPascalCase(component.tagName);

  //     return `import { defineCustomElement as define${pascalImport} } from '${normalizePath(
  //       outputTarget.componentCorePackage!
  //     )}/${outputTarget.customElementsDir || 'components'}/${component.tagName}.js';`;
  //   });

  //   sourceImports = cmpImports.join('\n');
  // } else if (outputTarget.includePolyfills && outputTarget.includeDefineCustomElements) {
  //   sourceImports = `import { ${APPLY_POLYFILLS}, ${REGISTER_CUSTOM_ELEMENTS} } from '${pathToCorePackageLoader}';\n`;
  //   registerCustomElements = `${APPLY_POLYFILLS}().then(() => ${REGISTER_CUSTOM_ELEMENTS}());`;
  // } else if (!outputTarget.includePolyfills && outputTarget.includeDefineCustomElements) {
  //   sourceImports = `import { ${REGISTER_CUSTOM_ELEMENTS} } from '${pathToCorePackageLoader}';\n`;
  //   registerCustomElements = `${REGISTER_CUSTOM_ELEMENTS}();`;
  // }

  // const final: ReadonlyArray<string> = [
  //   imports,
  //   typeImports,
  //   sourceImports,
  //   registerCustomElements,
  //   components
  //     .map((cmpMeta) => createComponentDefinition(cmpMeta, outputTarget.includeImportCustomElements))
  //     .join('\n'),
  // ];

  // return final.join('\n') + '\n';
}

/**
 * Defines the React component that developers will import to use in their applications.
 * @param cmpMeta Meta data for a single Web Component
 * @param includeCustomElement If `true`, the Web Component instance will be passed in to createReactComponent to be
 * registered with the Custom Elements Registry.
 * @returns An array where each entry is a string version of the React component definition.
 */
export function createComponentDefinition(
  cmpMeta: ComponentCompilerMeta,
  includeCustomElement: boolean = false,
  removeComponentPrefix?: string
): string {
  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);
  let template = `export const ${getComponentName(tagNameAsPascal, removeComponentPrefix)} = /*@__PURE__*/createReactComponent<${IMPORT_TYPES}.${tagNameAsPascal}, HTML${tagNameAsPascal}Element>('${cmpMeta.tagName}'`;

  if (includeCustomElement) {
    template += `, undefined, undefined, define${tagNameAsPascal}`;
  }

  template += `);`;

  return template;
}


/**
 * Derive the path to the loader
 * @param config the Stencil configuration for the project
 * @param outputTarget the output target used for generating the Stencil-React bindings
 * @returns the derived loader path
 */
export function getPathToCorePackageLoader(config: Config, outputTarget: OutputTargetReact): string {
  const basePkg = outputTarget.componentCorePackage || '';
  const distOutputTarget = config.outputTargets?.find((o) => o.type === 'dist') as OutputTargetDist;

  const distAbsEsmLoaderPath =
    distOutputTarget?.esmLoaderPath && path.isAbsolute(distOutputTarget.esmLoaderPath)
      ? distOutputTarget.esmLoaderPath
      : null;

  const distRelEsmLoaderPath =
    config.rootDir && distAbsEsmLoaderPath ? path.relative(config.rootDir, distAbsEsmLoaderPath) : null;

  const loaderDir = outputTarget.loaderDir || distRelEsmLoaderPath || DEFAULT_LOADER_DIR;
  return normalizePath(path.join(basePkg, loaderDir));
}

export const GENERATED_DTS = 'components.d.ts';
const IMPORT_TYPES = 'JSX';
// const REGISTER_CUSTOM_ELEMENTS = 'defineCustomElements';
// const APPLY_POLYFILLS = 'applyPolyfills';
const DEFAULT_LOADER_DIR = '/dist/loader';
