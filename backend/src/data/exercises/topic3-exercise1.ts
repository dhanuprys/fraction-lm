import { bold, doc, math, p } from '../helpers';
import type { QuestionSeedData } from '../types';

export const topic3Exercise1Questions: QuestionSeedData[] = [
	{
		learningObjective:
			'Siswa menerapkan pengurangan pecahan berpenyebut sama dalam soal cerita.',
		questionUi: doc(
			p(
				'Ibu memiliki ',
				bold('5/6'),
				' kg gula. Untuk membuat kue, ibu menggunakan ',
				bold('2/6'),
				' kg gula.',
			),
			p(bold('Pertanyaan: '), 'Berapa sisa gula ibu?'),
		),
		questionLlmContext: '5/6 - 2/6 = 3/6 kg (boleh 1/2 kg).',
		evaluationParameters: {
			expected_answer_keywords: ['3/6', '1/2'],
			common_misconceptions: ['3/0 (ikut mengurangkan penyebut)'],
			strictness_level: 'moderate',
			hints: [
				'Kata "sisa" berarti dikurangi.',
				'Penyebutnya sama, kurangkan saja pembilangnya: 5 - 2.',
			],
		},
		answers: { sisa: '3/6 kg' },
	},
	{
		learningObjective: 'Siswa dapat mengurangkan pecahan berpenyebut sama.',
		questionUi: doc(
			p('Hitunglah:'),
			math('\\frac{7}{8} - \\frac{3}{8} = \\ldots'),
		),
		questionLlmContext: '7/8 - 3/8 = 4/8 (boleh 1/2).',
		evaluationParameters: {
			expected_answer_keywords: ['4/8', '1/2'],
			common_misconceptions: ['4/0 (ikut mengurangkan penyebut)'],
			strictness_level: 'moderate',
		},
		answers: { hasil: '4/8' },
	},
	{
		learningObjective:
			'Siswa menerapkan pengurangan pecahan berpenyebut berbeda dalam soal cerita.',
		questionUi: doc(
			p(
				'Kakak memiliki tali sepanjang ',
				bold('2/3'),
				' meter. Ia memotong ',
				bold('1/4'),
				' meter untuk membuat gelang.',
			),
			p(bold('Pertanyaan: '), 'Berapa sisa tali kakak?'),
		),
		questionLlmContext: '2/3 - 1/4. KPK(3,4)=12. 8/12 - 3/12 = 5/12 meter.',
		evaluationParameters: {
			expected_answer_keywords: ['5/12', 'lima per dua belas'],
			common_misconceptions: [
				'1/1 (mengurangkan pembilang dan penyebut langsung)',
			],
			strictness_level: 'moderate',
			hints: [
				'Penyebutnya berbeda (3 dan 4). Samakan dulu dengan KPK.',
				'KPK dari 3 dan 4 adalah 12. 2/3 = 8/12 dan 1/4 = 3/12.',
			],
		},
		answers: { sisa: '5/12 meter' },
	},
	{
		learningObjective:
			'Siswa dapat menemukan kesalahan dalam pengurangan pecahan.',
		questionUi: doc(
			p('Eko mengerjakan soal berikut:'),
			math('\\frac{5}{7} - \\frac{2}{7} = \\frac{3}{0}'),
			p(
				bold('Pertanyaan: '),
				'Apakah jawaban Eko benar? Jelaskan, lalu tuliskan jawaban yang benar!',
			),
		),
		questionLlmContext:
			'Eko salah karena ikut mengurangkan penyebut (7-7=0). Penyebut tetap, jawaban benar 3/7.',
		evaluationParameters: {
			expected_answer_keywords: ['salah', '3/7', 'penyebut', 'tetap'],
			common_misconceptions: [
				'Menjawab benar',
				'Menjawab salah tanpa alasan atau jawaban benar',
			],
			strictness_level: 'lenient',
		},
		answers: {
			benar: false,
			jawaban_benar: '3/7',
			alasan: 'Penyebut tidak dikurangkan, hanya pembilang',
		},
	},
];
