/*
  @license
	Rollup.js v4.34.8
	Mon, 17 Feb 2025 06:25:53 GMT - commit 8f667b7c15b176728449a4917cb29fe5ee3a1c0c

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
export { version as VERSION, defineConfig, rollup, watch } from './shared/node-entry.js';
import './shared/parseAst.js';
import '../native.js';
import 'node:path';
import 'path';
import 'node:process';
import 'node:perf_hooks';
import 'node:fs/promises';
