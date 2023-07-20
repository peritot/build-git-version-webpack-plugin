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
    timeZone: 'Asia/Shanghai',
    showAuthor: false,
    showMessage: false,
  };

  apply(compiler) {
    compiler.hooks.emit.tapAsync(this.name, (compilation, callback) => {
      try {
        const { fileName = 'version.json', ...option } = this.option || {};

        const info = buildGitVersion(option);
        const content = JSON.stringify(info, undefined, 4);

        compilation.assets[fileName] = {
          source: () => content,
          size: () => content.length,
        };

        callback();
      } catch (error) {
        console.log('BuildGitVersionWebpackPlugin error', error);
      }
    });
  }
}

export { BuildGitVersionWebpackPlugin, BuildGitVersionPluginOption as BuildGitVersionWebpackPluginOption };
