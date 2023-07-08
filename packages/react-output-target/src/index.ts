import type { OutputTargetReact } from "@stencil/react-output-target/dist/types"
import type { OutputTargetCustom } from '@stencil/core/internal';
import { normalizeOutputTarget } from "./plugin"
import { reactProxyOutput } from "./output-react"

export const reactOutputTarget = (outputTarget: OutputTargetReact & { removePrefix?: string }): OutputTargetCustom => ({
  type: 'custom',
  name: 'react-library',
  validate(config) {
    const { removePrefix, ...rest } = outputTarget
    return normalizeOutputTarget(config, rest);
  },
  async generator(config, compilerCtx, buildCtx) {
    const timespan = buildCtx.createTimeSpan(`generate react started`, true);

    await reactProxyOutput(config, compilerCtx, outputTarget, buildCtx.components);

    timespan.finish(`generate react finished`);
  },
})