import { buildGitVersion, type BuildGitVersionPluginOption } from 'rollup-plugin-build-git-version';

/**
 * Add version.json to dist
 * @public
 */
class BuildGitVersionWebpackPlugin {
  constructor(option: BuildGitVersionPluginOption) {
    this.option = { ...this.option, ...option };
  }

  name: string = 'BuildGitVersionWebpackPlugin';

  option: BuildGitVersionPluginOption = {
    showAuthor: false,
    showMessage: false,
  };

  apply(compiler) {
    compiler.hooks.emit.tapAsync(this.name, (compilation, callback) => {
      const info = buildGitVersion(this.option);
      const content = JSON.stringify(info, undefined, 4);

      compilation.assets['version.json'] = {
        source: () => content,
        size: () => content.length,
      };

      callback();
    });
  }
}

export { BuildGitVersionWebpackPlugin, BuildGitVersionPluginOption as BuildGitVersionWebpackPluginOption };
