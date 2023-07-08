import path from 'path';
import type { OutputTargetReact } from '@stencil/react-output-target/dist/types';
import { readPackageJson, sortBy } from './utils';
import type { CompilerCtx, ComponentCompilerMeta, Config, } from '@stencil/core/internal';
import resolvePackagePath from 'resolve-package-path';

import { generateProxies } from "./generateProxies"
/**
 * Generate and write the Stencil-React bindings to disc
 * @param config the Stencil configuration associated with the project
 * @param compilerCtx the compiler context of the current Stencil build
 * @param outputTarget the output target configuration for generating the React wrapper
 * @param components the components to generate the bindings for
 */
export async function reactProxyOutput(
  config: Config,
  compilerCtx: CompilerCtx,
  outputTarget: OutputTargetReact & { removePrefix?: string },
  components: ReadonlyArray<ComponentCompilerMeta>
): Promise<void> {
  const filteredComponents = getFilteredComponents(outputTarget.excludeComponents, components);
  const rootDir = config.rootDir as string;
  const pkgData = await readPackageJson(rootDir);

  const finalObj = generateProxies(config, filteredComponents, pkgData, outputTarget, rootDir);
  // 这个地方写入的内容，可以在这个地方进行组件分成一个个文件
  const lg = finalObj.componentArray.length;
  for (let index = 0; index < lg; index++) {
    const element = finalObj.componentArray[index];
    const fileName = path.join(path.dirname(outputTarget.proxiesFile), "components", `${element.name}.ts`);
    await compilerCtx.fs.writeFile(fileName, element.content);
  }
  await compilerCtx.fs.writeFile(outputTarget.proxiesFile, finalObj.indexContent);

  await copyResources(config, outputTarget);
}

/**
 * Removes all components from the provided `cmps` list that exist in the provided `excludedComponents` list
 * @param excludeComponents the list of components that should be removed from the provided `cmps` list
 * @param cmps a list of components
 * @returns the filtered list of components
 */
function getFilteredComponents(
  excludeComponents: ReadonlyArray<string> = [],
  cmps: readonly ComponentCompilerMeta[]
): ReadonlyArray<ComponentCompilerMeta> {
  return sortBy(cmps, (cmp) => cmp.tagName).filter((c) => !excludeComponents.includes(c.tagName) && !c.internal);
}

/**
 * Copy resources used to generate the Stencil-React bindings. The resources copied here are not specific a project's
 * Stencil components, but rather the logic used to do the actual component generation.
 * @param config the Stencil configuration associated with the project
 * @param outputTarget the output target configuration for generating the Stencil-React bindings
 * @returns The results of performing the copy
 */
async function copyResources(config: Config, outputTarget: OutputTargetReact) {
  if (!config.sys || !config.sys.copy || !config.sys.glob) {
    throw new Error('stencil is not properly initialized at this step. Notify the developer');
  }
  const pkgPath = resolvePackagePath("@stencil/react-output-target", process.cwd());
  if (pkgPath) {
    const srcDirectory = path.join(path.dirname(pkgPath), 'react-component-lib');
    const destDirectory = path.join(path.dirname(outputTarget.proxiesFile), 'react-component-lib');
    return config.sys.copy(
      [
        {
          src: srcDirectory,
          dest: destDirectory,
          keepDirStructure: false,
          warn: false,
        },
      ],
      srcDirectory
    );
  }
}


