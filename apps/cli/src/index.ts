import { cancel, intro, log, outro, spinner } from '@clack/prompts';
import chalk from 'chalk';
import { Command } from 'commander';

import type { ProjectConfig } from './types';

import {
  ALLOWED_DATABASES,
  ALLOWED_EXAMPLES,
  ALLOWED_ORMS,
  ALLOWED_PACKAGE_MANAGERS,
  ALLOWED_RUNTIMES,
  ALLOWED_TOOLS,
  ALLOWED_WEB_FRAMEWORKS,
  CLI_CONFIG,
  DEFAULT_PROJECT_CONFIG,
} from './constans';
import { setupPrompts } from './prompts';
import { displayConfig } from './utils/display-config';

const program = new Command();

process.on('SIGINT', () => {
  log.error(chalk.red('Interrupted'));
  process.exit(1);
});

async function bootstrap() {
  program
    .name('Honora CLI')
    .version(CLI_CONFIG.version)
    .argument('[project-name]', 'The name of the project to create')
    .option('-y, --yes', 'Use default configuration')
    .option(
      '-d, --database <database>',
      'The database to use for the project (default: none) (choices: postgres, mysql, sqlite, mongodb)',
    )
    .option(
      '--orm <orm>',
      'The ORM to use for the project (default: none) (choices: prisma, typeorm, sequelize, drizzle)',
    )
    .option('--auth', 'Include basic authentication template')
    .option('--no-auth', 'Exclude authentication')
    .option('--web-framework <web-framework>', 'Include web framework (default: React) (choices: React, Vue)')
    .option('--example <example>', 'Include example code (default: none) (choices: todo)')
    .option('--tools', 'Include tools (default: none) (choices: eslint, prettier, husky, commitlint)')
    .option('--git', 'Initialize a new git repository')
    .option('--no-git', 'Exclude git repository')
    .option('--install', 'Install dependencies')
    .option('--pkg-manager <package-manager>', 'Use package manager (default: npm) (choines: npm, pnpm, yarn, bun)')
    .option('--rumtime <runtime>', 'Use runtime (default: node) (choices: node, bun)')

    .parse();

  const spn = spinner();
  try {
    intro(chalk.magenta('Creating a new Honora project'));

    const options = program.opts();
    const name = program.args[0];

    if (options.database && !ALLOWED_DATABASES.includes(options.database)) {
      cancel(chalk.red(`Invalid database "${options.database}". Allowed databases: ${ALLOWED_DATABASES.join(', ')}`));
      process.exit(1);
    }

    if (options.orm && !ALLOWED_ORMS.includes(options.orm)) {
      cancel(chalk.red(`Invalid ORM "${options.orm}". Allowed ORMs: ${ALLOWED_ORMS.join(', ')}`));
      process.exit(1);
    }

    if (options.webFramework && !ALLOWED_WEB_FRAMEWORKS.includes(options.webFramework)) {
      cancel(
        chalk.red(
          `Invalid web framework "${options.webFramework}". Allowed web frameworks: ${ALLOWED_WEB_FRAMEWORKS.join(', ')}`,
        ),
      );
      process.exit(1);
    }

    if (options.example && !ALLOWED_EXAMPLES.includes(options.example)) {
      cancel(chalk.red(`Invalid example "${options.example}". Allowed examples: ${ALLOWED_EXAMPLES.join(', ')}`));
      process.exit(1);
    }

    if (options.tools && !ALLOWED_TOOLS.includes(options.tools)) {
      cancel(chalk.red(`Invalid tools "${options.tools}". Allowed tools: ${ALLOWED_TOOLS.join(', ')}`));
      process.exit(1);
    }

    if (options.pkgManager && !ALLOWED_PACKAGE_MANAGERS.includes(options.pkgManager)) {
      cancel(
        chalk.red(
          `Invalid package manager "${options.pkgManager}". Allowed package managers: ${ALLOWED_PACKAGE_MANAGERS.join(
            ', ',
          )}`,
        ),
      );
      process.exit(1);
    }

    if (options.runtime && !ALLOWED_RUNTIMES.includes(options.runtime)) {
      cancel(chalk.red(`Invalid runtime "${options.runtime}". Allowed runtimes: ${ALLOWED_RUNTIMES.join(', ')}`));
      process.exit(1);
    }

    const flags: Partial<ProjectConfig> = {
      ...(name && { name }),
      ...(options.database && { database: options.database }),
      ...(options.orm && { orm: options.orm }),
      ...('auth' in options && { auth: options.auth }),
      ...(options.webFramework && { webFramework: options.webFramework }),
      ...(options.example && { example: options.example }),
      ...('tools' in options && { tools: options.tools }),
      ...('git' in options && { git: options.git }),
      ...('install' in options && { install: !options.install }),
      ...(options.usePackageManager && { usePackageManager: options.usePackageManager }),
      ...(options.runtime && { runtime: options.runtime }),
      ...(options.example && { example: options.example }),
    };

    if (!options.yes && Object.keys(flags).length > 0) {
      log.info(chalk.yellow('Using these pre-selected options'));
      log.message(displayConfig(flags));
      log.message('');
    }

    const config = options.yes
      ? {
          ...DEFAULT_PROJECT_CONFIG,
          ...flags,
          name: name || DEFAULT_PROJECT_CONFIG.name,
        }
      : await setupPrompts(flags);

    if (options.yes) {
      log.info(chalk.yellow('Using default options'));
      log.message(displayConfig(config));
      log.message('');
    }

    outro(chalk.green('Project created successfully'));
  } catch (error) {
    spn.stop();
    if (error instanceof Error) {
      cancel(chalk.red(`An unexpected error occurred: ${error.message}`));
      process.exit(1);
    }
  }
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
