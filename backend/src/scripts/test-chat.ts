require('dotenv').config();

import { deepseek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';

async function main() {
	const { text } = await generateText({
		model: deepseek('deepseek-chat'),
		prompt: [
			{
				role: 'assistant',
				content: 'You are a helpful assistant.',
			},
			{
				role: 'user',
				content: 'Explain the concept of quantum entanglement.',
			},
		],
	});

	console.log(text);
}

main();
