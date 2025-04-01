import type {
  ALLOWED_DATABASES,
  ALLOWED_EXAMPLES,
  ALLOWED_ORMS,
  ALLOWED_PACKAGE_MANAGERS,
  ALLOWED_RUNTIMES,
  ALLOWED_TOOLS,
  ALLOWED_WEB_FRAMEWORKS,
} from './constans';

export type CliConfig = {
  rootDir: string;
  version: string;
};

export type Runtime = (typeof ALLOWED_RUNTIMES)[number];
export type Example = (typeof ALLOWED_EXAMPLES)[number];
export type WebFramework = (typeof ALLOWED_WEB_FRAMEWORKS)[number];
export type PackageManager = (typeof ALLOWED_PACKAGE_MANAGERS)[number];
export type Orm = (typeof ALLOWED_ORMS)[number];
export type Database = (typeof ALLOWED_DATABASES)[number];
export type Tools = (typeof ALLOWED_TOOLS)[number];

export type ProjectConfig = {
  name: string;
  database: Database;
  orm: Orm;
  auth: boolean;
  webFramework: WebFramework;
  example: Example;
  tools: Tools;
  git: boolean;
  install: boolean;
  pkgManager: PackageManager;
  runtime: Runtime;
};

export type PromptGroup = ProjectConfig;
