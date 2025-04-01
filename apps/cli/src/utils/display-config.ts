import chalk from 'chalk';

import type { ProjectConfig } from '../types';

export function displayConfig(config: Partial<ProjectConfig>) {
  const displayConfig = [];

  if (config.name) {
    displayConfig.push(chalk.green(`Project name: ${config.name}`));
  }

  if (config.database !== undefined) {
    displayConfig.push(chalk.green(`Database: ${config.database}`));
  }

  if (config.orm !== undefined) {
    displayConfig.push(chalk.green(`ORM: ${config.orm}`));
  }

  if (config.auth !== undefined) {
    displayConfig.push(chalk.green(`Authentication: ${config.auth ? 'enabled' : 'disabled'}`));
  }

  if (config.webFramework !== undefined) {
    displayConfig.push(chalk.green(`Web framework: ${config.webFramework}`));
  }

  if (config.example !== undefined) {
    displayConfig.push(chalk.green(`Example code: ${config.example}`));
  }

  if (config.tools !== undefined) {
    displayConfig.push(chalk.green(`Tools: ${config.tools}`));
  }

  if (config.git !== undefined) {
    displayConfig.push(chalk.green(`Git repository: enabled`));
  }

  if (config.install !== undefined) {
    displayConfig.push(chalk.green(`Dependencies: ${config.install ? 'installed' : 'skipped'}`));
  }

  if (config.pkgManager !== undefined) {
    displayConfig.push(chalk.green(`Package manager: ${config.pkgManager}`));
  }

  if (config.runtime !== undefined) {
    displayConfig.push(chalk.green(`Runtime: ${config.runtime}`));
  }

  return displayConfig.join('\n');
}
