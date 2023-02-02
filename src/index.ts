import { execSync } from 'child_process';
import { dateToStr } from './utils/date';

/**
 * @public
 */
interface Options {
  showMessage: boolean;
  extend?: object;
}

/**
 * @public
 */
interface CommitInfo {
  id: string;
  time: string;
  author: {
    name: string;
    email: string;
  };
  message?: string;
}

/**
 * Add version.json to dist
 * @public
 */
class BuildGitVersionWebpackPlugin {
  constructor(options: Options) {
    this.options = { ...this.options, ...options };
  }

  name: string = 'BuildGitVersionWebpackPlugin';

  options: Options = {
    showMessage: false,
  };

  apply(compiler) {
    compiler.hooks.emit.tapAsync(this.name, (compilation, callback) => {
      const info = this.fetchInfo();
      const content = JSON.stringify(info, undefined, 4);

      compilation.assets['version.json'] = {
        source: () => content,
        size: () => content.length,
      };

      callback();
    });
  }

  fetchInfo() {
    let branch: string | undefined;
    try {
      branch = execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}').toString().trim();
    } catch {
      //
    }

    if (!branch) {
      try {
        branch = execSync('git name-rev --name-only HEAD').toString().trim();

        if (branch?.indexOf('remotes/') === 0) {
          branch = branch.replace('remotes/', '');
        }
      } catch {
        //
      }
    }

    if (!branch) {
      try {
        branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      } catch {
        //
      }
    }

    let commit: CommitInfo | undefined;
    try {
      const id = execSync('git rev-parse HEAD').toString().trim();
      const detail = execSync('git --no-pager log --pretty=format:"%an-----%ae-----%ci-----%s" HEAD -1').toString().trim();
      const [an, ae, ci, s] = detail?.split('-----') || [];

      commit = {
        id,
        time: dateToStr(new Date(ci)),
        author: {
          name: an,
          email: ae,
        },
      };

      if (this.options.showMessage) {
        commit.message = s;
      }
    } catch {
      //
    }

    let info = {
      build: {
        time: dateToStr(new Date()),
      },
      git: {
        branch,
        commit,
      },
    };

    if (Object.prototype.toString.call(this.options.extend) === '[object Object]') {
      info = { ...info, ...this.options.extend };
    }

    return info;
  }
}

export { Options, CommitInfo, BuildGitVersionWebpackPlugin };
