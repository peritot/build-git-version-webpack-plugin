import { execSync } from 'child_process';
import { dateToStr } from './utils/date';

/**
 * Add version.json to dist
 * @public
 */
class BuildGitVersionWebpackPlugin {
  pluginName = 'BuildGitVersionWebpackPlugin';

  apply(compiler) {
    compiler.hooks.emit.tapAsync(this.pluginName, (compilation, callback) => {
      const content = JSON.stringify(this.fetchInfo(), undefined, 4);

      compilation.assets['version.json'] = {
        source: () => content,
        size: () => content.length,
      };

      callback();
    });
  }

  fetchInfo() {
    let branch;
    try {
      branch = execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}').toString().trim();
    } catch {
      //
    }

    if (!branch) {
      try {
        branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      } catch {
        //
      }
    }

    let commit = {};
    try {
      const id = execSync('git rev-parse HEAD').toString().trim();
      const detail = execSync('git --no-pager log --pretty=format:"%an-----%ae-----%ci-----%s" HEAD -1').toString().trim();
      const [an, ae, ci, s] = detail?.split('-----') || [];

      commit = {
        id,
        time: dateToStr(new Date(ci)),
        message: s,
        author: {
          name: an,
          email: ae,
        },
      };
    } catch {
      //
    }

    return {
      build: {
        time: dateToStr(new Date()),
      },
      git: {
        branch,
        commit,
      },
    };
  }
}

export { BuildGitVersionWebpackPlugin };
