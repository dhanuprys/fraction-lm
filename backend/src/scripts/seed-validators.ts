/**
 * Seed Script — Validator Users (Siswa / Normal User with DeepSeek V4 Pro)
 * =========================================================================
 * Seeds 12 validator student accounts: "validator01" through "validator12".
 * - Normal user permissions (isAdmin: false)
 * - Assigned AI Model: "deepseek-v4-pro"
 * - Numeric passwords with exact length 8
 * - Idempotent upsert: Preserves existing passwords if the account already exists.
 * - Saves and prints plain credentials in simple copy-pasteable format.
 *
 * Run with:
 *   bun run seed:validators
 */

import 'dotenv/config';
import { randomInt } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { db } from '../prisma/db';

const CREDENTIALS_FILE = path.resolve(__dirname, '../../validator-credentials.json');

function generate8DigitPassword(): string {
	// Generates an exact 8-digit numeric string (10000000 - 99999999)
	return randomInt(10000000, 100000000).toString();
}

function loadSavedPasswords(): Record<string, string> {
	if (existsSync(CREDENTIALS_FILE)) {
		try {
			return JSON.parse(readFileSync(CREDENTIALS_FILE, 'utf-8'));
		} catch {
			return {};
		}
	}
	return {};
}

function savePasswords(passwords: Record<string, string>): void {
	writeFileSync(CREDENTIALS_FILE, JSON.stringify(passwords, null, 2), 'utf-8');
}

async function main() {
	console.log('🌱 Seeding validator accounts (validator01 - validator12)...\n');

	const savedPasswords = loadSavedPasswords();
	const activePasswords: Record<string, string> = { ...savedPasswords };

	// Fallback map from initial seed run in case file was just introduced
	const knownPasswords: Record<string, string> = {
		validator01: '59565763',
		validator02: '12380301',
		validator03: '76995124',
		validator04: '39847776',
		validator05: '95833082',
		validator06: '37903790',
		validator07: '79140044',
		validator08: '52357177',
		validator09: '65699943',
		validator10: '79380977',
		validator11: '80814762',
		validator12: '58146018',
	};

	const entries: Array<{ username: string; password: string }> = [];

	for (let i = 1; i <= 12; i++) {
		const numStr = String(i).padStart(2, '0');
		const username = `validator${numStr}`;
		const name = `Validator ${numStr}`;
		const targetModel = 'deepseek-v4-pro';

		const existing = await db.orm.public.User.where({ username }).first();

		if (existing) {
			// Upsert metadata without modifying existing password
			await db.orm.public.User.where({ id: existing.id }).update({
				name,
				isAdmin: false,
				aiModel: targetModel,
				grade: 4,
			});

			const pass = activePasswords[username] || knownPasswords[username] || '(unchanged)';
			entries.push({ username, password: pass });
		} else {
			const plainPassword = activePasswords[username] || generate8DigitPassword();
			const hashedPassword = await Bun.password.hash(plainPassword);

			await db.orm.public.User.create({
				username,
				password: hashedPassword,
				name,
				grade: 4,
				isAdmin: false,
				aiModel: targetModel,
			});

			activePasswords[username] = plainPassword;
			entries.push({ username, password: plainPassword });
		}
	}

	// Update local credentials file
	savePasswords(activePasswords);

	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	console.log('🔐 DAFTAR AKUN VALIDATOR (COPY-PASTE FORMAT)');
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

	for (const e of entries) {
		console.log(`User: ${e.username}`);
		console.log(`Pass: ${e.password}\n`);
	}

	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	console.log('✅ Seeding validator selesai!\n');

	process.exit(0);
}

main().catch((err) => {
	console.error('❌ Seeding validators failed:', err);
	process.exit(1);
});
