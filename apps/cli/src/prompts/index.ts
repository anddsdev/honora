import { group } from '@clack/prompts';

import type { ProjectConfig, PromptGroup } from '../types';

import { getName } from './get-name';

export async function setupPrompts(flags: Partial<ProjectConfig>): Promise<ProjectConfig> {
  return await group<PromptGroup>({
    name: async () => getName(flags.name || '.'),
    database(_opts: {
      results: {
        name?: string | undefined;
        orm?: 'prisma' | 'typeorm' | 'sequelize' | 'drizzle' | undefined;
        auth?: boolean | undefined;
        webFramework?: 'react' | 'vue' | undefined;
        example?: 'none' | 'todo' | undefined;
        tools?: 'none' | 'eslint' | 'prettier' | 'husky' | 'commitlint' | undefined;
        git?: boolean | undefined;
        install?: boolean | undefined;
        pkgManager?: 'npm' | 'pnpm' | 'yarn' | 'bun' | undefined;
        runtime?: 'bun' | 'node' | undefined;
      };
    }): Promise<'postgres' | 'mysql' | 'sqlite' | 'mongodb' | undefined> | undefined {
      throw new Error('Function not implemented.');
    },
    orm(_opts: {
      results: {
        name?: string | undefined;
        database?: 'postgres' | 'mysql' | 'sqlite' | 'mongodb' | undefined;
        auth?: boolean | undefined;
        webFramework?: 'react' | 'vue' | undefined;
        example?: 'none' | 'todo' | undefined;
        tools?: 'none' | 'eslint' | 'prettier' | 'husky' | 'commitlint' | undefined;
        git?: boolean | undefined;
        install?: boolean | undefined;
        pkgManager?: 'npm' | 'pnpm' | 'yarn' | 'bun' | undefined;
        runtime?: 'bun' | 'node' | undefined;
      };
    }): Promise<'prisma' | 'typeorm' | 'sequelize' | 'drizzle' | undefined> | undefined {
      throw new Error('Function not implemented.');
    },
    auth(_opts: {
      results: {
        name?: string | undefined;
        database?: 'postgres' | 'mysql' | 'sqlite' | 'mongodb' | undefined;
        orm?: 'prisma' | 'typeorm' | 'sequelize' | 'drizzle' | undefined;
        webFramework?: 'react' | 'vue' | undefined;
        example?: 'none' | 'todo' | undefined;
        tools?: 'none' | 'eslint' | 'prettier' | 'husky' | 'commitlint' | undefined;
        git?: boolean | undefined;
        install?: boolean | undefined;
        pkgManager?: 'npm' | 'pnpm' | 'yarn' | 'bun' | undefined;
        runtime?: 'bun' | 'node' | undefined;
      };
    }): Promise<boolean | undefined> | undefined {
      throw new Error('Function not implemented.');
    },
    webFramework(_opts: {
      results: {
        name?: string | undefined;
        database?: 'postgres' | 'mysql' | 'sqlite' | 'mongodb' | undefined;
        orm?: 'prisma' | 'typeorm' | 'sequelize' | 'drizzle' | undefined;
        auth?: boolean | undefined;
        example?: 'none' | 'todo' | undefined;
        tools?: 'none' | 'eslint' | 'prettier' | 'husky' | 'commitlint' | undefined;
        git?: boolean | undefined;
        install?: boolean | undefined;
        pkgManager?: 'npm' | 'pnpm' | 'yarn' | 'bun' | undefined;
        runtime?: 'bun' | 'node' | undefined;
      };
    }): Promise<'react' | 'vue' | undefined> | undefined {
      throw new Error('Function not implemented.');
    },
    example(_opts: {
      results: {
        name?: string | undefined;
        database?: 'postgres' | 'mysql' | 'sqlite' | 'mongodb' | undefined;
        orm?: 'prisma' | 'typeorm' | 'sequelize' | 'drizzle' | undefined;
        auth?: boolean | undefined;
        webFramework?: 'react' | 'vue' | undefined;
        tools?: 'none' | 'eslint' | 'prettier' | 'husky' | 'commitlint' | undefined;
        git?: boolean | undefined;
        install?: boolean | undefined;
        pkgManager?: 'npm' | 'pnpm' | 'yarn' | 'bun' | undefined;
        runtime?: 'bun' | 'node' | undefined;
      };
    }): Promise<'none' | 'todo' | undefined> | undefined {
      throw new Error('Function not implemented.');
    },
    tools(_opts: {
      results: {
        name?: string | undefined;
        database?: 'postgres' | 'mysql' | 'sqlite' | 'mongodb' | undefined;
        orm?: 'prisma' | 'typeorm' | 'sequelize' | 'drizzle' | undefined;
        auth?: boolean | undefined;
        webFramework?: 'react' | 'vue' | undefined;
        example?: 'none' | 'todo' | undefined;
        git?: boolean | undefined;
        install?: boolean | undefined;
        pkgManager?: 'npm' | 'pnpm' | 'yarn' | 'bun' | undefined;
        runtime?: 'bun' | 'node' | undefined;
      };
    }): Promise<'none' | 'eslint' | 'prettier' | 'husky' | 'commitlint' | undefined> | undefined {
      throw new Error('Function not implemented.');
    },
    git(_opts: {
      results: {
        name?: string | undefined;
        database?: 'postgres' | 'mysql' | 'sqlite' | 'mongodb' | undefined;
        orm?: 'prisma' | 'typeorm' | 'sequelize' | 'drizzle' | undefined;
        auth?: boolean | undefined;
        webFramework?: 'react' | 'vue' | undefined;
        example?: 'none' | 'todo' | undefined;
        tools?: 'none' | 'eslint' | 'prettier' | 'husky' | 'commitlint' | undefined;
        install?: boolean | undefined;
        pkgManager?: 'npm' | 'pnpm' | 'yarn' | 'bun' | undefined;
        runtime?: 'bun' | 'node' | undefined;
      };
    }): Promise<boolean | undefined> | undefined {
      throw new Error('Function not implemented.');
    },
    install(_opts: {
      results: {
        name?: string | undefined;
        database?: 'postgres' | 'mysql' | 'sqlite' | 'mongodb' | undefined;
        orm?: 'prisma' | 'typeorm' | 'sequelize' | 'drizzle' | undefined;
        auth?: boolean | undefined;
        webFramework?: 'react' | 'vue' | undefined;
        example?: 'none' | 'todo' | undefined;
        tools?: 'none' | 'eslint' | 'prettier' | 'husky' | 'commitlint' | undefined;
        git?: boolean | undefined;
        pkgManager?: 'npm' | 'pnpm' | 'yarn' | 'bun' | undefined;
        runtime?: 'bun' | 'node' | undefined;
      };
    }): Promise<boolean | undefined> | undefined {
      throw new Error('Function not implemented.');
    },
    pkgManager(_opts: {
      results: {
        name?: string | undefined;
        database?: 'postgres' | 'mysql' | 'sqlite' | 'mongodb' | undefined;
        orm?: 'prisma' | 'typeorm' | 'sequelize' | 'drizzle' | undefined;
        auth?: boolean | undefined;
        webFramework?: 'react' | 'vue' | undefined;
        example?: 'none' | 'todo' | undefined;
        tools?: 'none' | 'eslint' | 'prettier' | 'husky' | 'commitlint' | undefined;
        git?: boolean | undefined;
        install?: boolean | undefined;
        runtime?: 'bun' | 'node' | undefined;
      };
    }): Promise<'npm' | 'pnpm' | 'yarn' | 'bun' | undefined> | undefined {
      throw new Error('Function not implemented.');
    },
    runtime(_opts: {
      results: {
        name?: string | undefined;
        database?: 'postgres' | 'mysql' | 'sqlite' | 'mongodb' | undefined;
        orm?: 'prisma' | 'typeorm' | 'sequelize' | 'drizzle' | undefined;
        auth?: boolean | undefined;
        webFramework?: 'react' | 'vue' | undefined;
        example?: 'none' | 'todo' | undefined;
        tools?: 'none' | 'eslint' | 'prettier' | 'husky' | 'commitlint' | undefined;
        git?: boolean | undefined;
        install?: boolean | undefined;
        pkgManager?: 'npm' | 'pnpm' | 'yarn' | 'bun' | undefined;
      };
    }): Promise<'bun' | 'node' | undefined> | undefined {
      throw new Error('Function not implemented.');
    },
  });
}
