import { db } from '../prisma/db';

const args = process.argv.slice(2);
if (args.length < 3) {
	console.error(
		'Usage: bun run create-admin.ts <username> <password> <name>',
	);
	process.exit(1);
}

const [username, password, name] = args;

async function createAdmin() {
	try {
		const existingUser = await db.orm.public.User.where({
			username,
		}).first();
		if (existingUser) {
			console.error('User with this username already exists.');
			process.exit(1);
		}

		const hashedPassword = await Bun.password.hash(password);

		const newUser = await db.orm.public.User.create({
			username,
			password: hashedPassword,
			name,
			isAdmin: true,
		});

		console.log('Admin user created successfully!');
		console.log(`ID: ${newUser.id}`);
		console.log(`Username: ${newUser.username}`);
		console.log(`Name: ${newUser.name}`);
	} catch (error) {
		console.error('Error creating admin user:', error);
	} finally {
		process.exit(0);
	}
}

createAdmin();
