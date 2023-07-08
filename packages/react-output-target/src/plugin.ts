import type { Config } from '@stencil/core/internal';
import { normalizePath } from './utils';
import type { OutputTargetReact } from '@stencil/react-output-target/dist/types';
import path from 'path';

/**
 * Normalizes the structure of a provided output target and verifies a Stencil configuration
 * associated with the wrapper is valid
 * @param config the configuration to validate
 * @param outputTarget the output target to normalize
 * @returns an output target that's been normalized
 */
export function normalizeOutputTarget(config: Config, outputTarget: any): OutputTargetReact {
  const results: OutputTargetReact = {
    ...outputTarget,
    excludeComponents: outputTarget.excludeComponents || [],
    includePolyfills: outputTarget.includePolyfills ?? true,
    includeDefineCustomElements: outputTarget.includeDefineCustomElements ?? true,
  };

  if (config.rootDir == null) {
    throw new Error('rootDir is not set and it should be set by stencil itself');
  }
  if (outputTarget.proxiesFile == null) {
    throw new Error('proxiesFile is required');
  }

  if (outputTarget.includeDefineCustomElements && outputTarget.includeImportCustomElements) {
    throw new Error(
      'includeDefineCustomElements cannot be used at the same time as includeImportCustomElements since includeDefineCustomElements is used for lazy loading components. Set `includeDefineCustomElements: false` in your React output target config to resolve this.'
    );
  }

  if (outputTarget.includeImportCustomElements && outputTarget.includePolyfills) {
    throw new Error(
      'includePolyfills cannot be used at the same time as includeImportCustomElements. Set `includePolyfills: false` in your React output target config to resolve this.'
    );
  }

  if (outputTarget.directivesProxyFile && !path.isAbsolute(outputTarget.directivesProxyFile)) {
    results.proxiesFile = normalizePath(path.join(config.rootDir, outputTarget.proxiesFile));
  }

  return results;
}
