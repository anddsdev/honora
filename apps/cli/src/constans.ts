import fs from 'node:fs';
import path from 'node:path';

import type { CliConfig, ProjectConfig } from './types';

const ROOT_DIR = path.resolve(process.cwd());
const PACKAGE_JSON = path.resolve(ROOT_DIR, 'package.json');
const PACKAGE_JSON_CONTENT = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));

export const CLI_CONFIG: CliConfig = {
  rootDir: ROOT_DIR,
  version: PACKAGE_JSON_CONTENT.version,
};

export const ALLOWED_RUNTIMES = ['node', 'bun'] as const;
export const ALLOWED_EXAMPLES = ['none', 'todo'] as const;
export const ALLOWED_WEB_FRAMEWORKS = ['react', 'vue'] as const;
export const ALLOWED_PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const;
export const ALLOWED_ORMS = ['prisma', 'typeorm', 'sequelize', 'drizzle'] as const;
export const ALLOWED_DATABASES = ['postgres', 'mysql', 'sqlite', 'mongodb'] as const;
export const ALLOWED_TOOLS = ['none', 'eslint', 'prettier', 'husky', 'commitlint'] as const;

function getUserpkgManager() {
  // eslint-disable-next-line node/no-process-env
  const agent = process.env.npm_config_user_agent;

  if (agent) {
    if (agent.includes('bun')) {
      return 'bun';
    }

    if (agent.includes('pnpm')) {
      return 'pnpm';
    }

    if (agent.includes('yarn')) {
      return 'yarn';
    }
  }

  return 'npm';
}

export const DEFAULT_PROJECT_CONFIG: ProjectConfig = {
  name: 'my-honora-app',
  database: 'sqlite',
  orm: 'prisma',
  auth: false,
  webFramework: 'react',
  example: 'none',
  tools: 'none',
  git: true,
  install: false,
  pkgManager: getUserpkgManager(),
  runtime: 'bun',
};
