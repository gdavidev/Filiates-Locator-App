import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      ...getPathsFromTsConfig()
    }
  },
  plugins: [react()],
})

function getPathsFromTsConfig() {
  const tsconfig: any = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf-8'));
  const configuredPaths: Record<string, string> = tsconfig.compilerOptions.paths;

  const aliases: Record<string, string> = {};
  Object.entries(configuredPaths).forEach(([key, value]: [string, string]) => {
    const cleanKey = key.replace('/*', '');
    const cleanValue = value[0].replace('/*', '');

    aliases[cleanKey] = path.resolve(__dirname, cleanValue);
  });

  return aliases;
}
