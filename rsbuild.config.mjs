import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });
const envVars = {};

for (const key in process.env) {
  if (key.startsWith('REACT_APP_')) {
    envVars[key] = JSON.stringify(process.env[key]);
  }
}

export default defineConfig({
  source: {
    define: {
      'process.env': {
        ...envVars,
      }
    }
  },
  server: {
    port: 3000,
  },
  plugins: [pluginReact()],
  html: {
    title: "Ultimate Utility"
  }
});
