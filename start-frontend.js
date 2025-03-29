#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Lanzamos solo el servidor de Vite para el frontend
const viteProcess = spawn('npx', ['vite'], {
  cwd: resolve(__dirname),
  stdio: 'inherit',
  shell: true
});

viteProcess.on('error', (error) => {
  console.error('Error al iniciar Vite:', error);
  process.exit(1);
});

process.on('SIGINT', () => {
  viteProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  viteProcess.kill('SIGTERM');
  process.exit(0);
});