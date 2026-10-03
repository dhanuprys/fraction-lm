import {
	bold,
	bulletList,
	doc,
	heading,
	math,
	orderedList,
	p,
} from './helpers';

export const topic3 =
	// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  TOPIC 3  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	{
		name: 'Perkalian dan Pembagian Pecahan',
		slug: 'perkalian-pembagian-pecahan',
		description:
			'Mempelajari cara mengalikan dan membagi pecahan, termasuk pecahan dengan bilangan bulat.',
		order: 3,
		subTopics: [
			{
				name: 'Perkalian Pecahan',
				slug: 'perkalian-pecahan',
				description:
					'Mengalikan pecahan dengan pecahan atau pecahan dengan bilangan bulat.',
				order: 1,
				materials: [
					{
						title: 'Perkalian Pecahan dengan Pecahan',
						order: 1,
						difficulty: 1,
						content: doc(
							heading(2, 'Perkalian Pecahan dengan Pecahan'),
							p(
								'Untuk mengalikan dua pecahan, kita cukup ',
								bold('kalikan pembilang dengan pembilang'),
								' dan ',
								bold('penyebut dengan penyebut'),
								'.',
							),
							heading(3, 'Rumus'),
							math(
								'\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}',
							),
							heading(3, 'Contoh'),
							math(
								'\\frac{2}{3} \\times \\frac{4}{5} = \\frac{2 \\times 4}{3 \\times 5} = \\frac{8}{15}',
							),
							p(
								bold('Catatan: '),
								'Tidak perlu menyamakan penyebut! Langsung kalikan saja.',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan perkalian pecahan. ' +
							'Rumus: (a/b) × (c/d) = (a×c)/(b×d). Pembilang dikali pembilang, penyebut dikali penyebut. ' +
							'Contoh: 2/3 × 4/5 = 8/15. Tidak perlu menyamakan penyebut.',
						questions: [
							{
								learningObjective:
									'Siswa dapat mengalikan dua pecahan.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'\\frac{1}{3} \\times \\frac{2}{5} = \\ldots',
									),
								),
								questionLlmContext:
									'1/3 × 2/5 = (1×2)/(3×5) = 2/15.',
								evaluationParameters: {
									expected_answer_keywords: ['2/15'],
									common_misconceptions: [
										'3/8 (menjumlahkan)',
										'2/8',
									],
									strictness_level: 'moderate',
								},
								answers: { hasil: '2/15' },
							},
							{
								learningObjective:
									'Perkalian pecahan dan menyederhanakan.',
								questionUi: doc(
									p('Hitunglah dan sederhanakan:'),
									math(
										'\\frac{3}{4} \\times \\frac{2}{3} = \\ldots',
									),
								),
								questionLlmContext: '3/4 × 2/3 = 6/12 = 1/2.',
								evaluationParameters: {
									expected_answer_keywords: [
										'6/12',
										'1/2',
										'setengah',
									],
									common_misconceptions: ['5/7', '6/7'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '6/12', sederhana: '1/2' },
							},
						],
					},
					{
						title: 'Perkalian Pecahan dengan Bilangan Bulat',
						order: 2,
						difficulty: 1,
						content: doc(
							heading(
								2,
								'Perkalian Pecahan dengan Bilangan Bulat',
							),
							p(
								'Bilangan bulat bisa ditulis sebagai pecahan dengan penyebut 1.',
							),
							heading(3, 'Rumus'),
							math(
								'n \\times \\frac{a}{b} = \\frac{n \\times a}{b}',
							),
							heading(3, 'Contoh'),
							math(
								'3 \\times \\frac{2}{5} = \\frac{3 \\times 2}{5} = \\frac{6}{5} = 1\\frac{1}{5}',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan perkalian pecahan dengan bilangan bulat. ' +
							'Bilangan bulat ditulis sebagai n/1. Rumus: n × a/b = (n×a)/b. ' +
							'Contoh: 3 × 2/5 = 6/5 = 1 1/5.',
						questions: [
							{
								learningObjective:
									'Siswa mengalikan bilangan bulat dengan pecahan.',
								questionUi: doc(
									p('Hitunglah:'),
									math('4 \\times \\frac{1}{3} = \\ldots'),
								),
								questionLlmContext: '4 × 1/3 = 4/3 = 1 1/3.',
								evaluationParameters: {
									expected_answer_keywords: ['4/3', '1 1/3'],
									common_misconceptions: ['4/12', '1/12'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '4/3', campuran: '1 1/3' },
							},
							{
								learningObjective:
									'Perkalian dan penyederhanaan.',
								questionUi: doc(
									p('Hitunglah dan sederhanakan:'),
									math('6 \\times \\frac{1}{4} = \\ldots'),
								),
								questionLlmContext:
									'6 × 1/4 = 6/4 = 3/2 = 1 1/2.',
								evaluationParameters: {
									expected_answer_keywords: [
										'6/4',
										'3/2',
										'1 1/2',
									],
									common_misconceptions: ['6/24', '24/1'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '6/4', sederhana: '1 1/2' },
							},
						],
					},
					{
						title: 'Perkalian Pecahan Campuran',
						order: 3,
						difficulty: 2,
						content: doc(
							heading(2, 'Perkalian Pecahan Campuran'),
							p(
								'Untuk mengalikan pecahan campuran, ',
								bold('ubah dulu ke pecahan biasa'),
								', baru kalikan seperti biasa.',
							),
							heading(3, 'Contoh'),
							math('1\\frac{1}{2} \\times 2\\frac{1}{3}'),
							bulletList(
								'1 1/2 = 3/2',
								'2 1/3 = 7/3',
								'3/2 × 7/3 = 21/6 = 7/2 = 3 1/2',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan perkalian pecahan campuran. ' +
							'Langkah: ubah ke pecahan biasa dulu, lalu kalikan pembilang×pembilang, penyebut×penyebut. ' +
							'Contoh: 1 1/2 × 2 1/3 = 3/2 × 7/3 = 21/6 = 7/2 = 3 1/2.',
						questions: [
							{
								learningObjective:
									'Siswa mengalikan pecahan campuran.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'1\\frac{1}{3} \\times 1\\frac{1}{2} = \\ldots',
									),
								),
								questionLlmContext:
									'1 1/3 × 1 1/2 = 4/3 × 3/2 = 12/6 = 2.',
								evaluationParameters: {
									expected_answer_keywords: ['2', '12/6'],
									common_misconceptions: ['1 2/6', '2 1/6'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '2' },
							},
							{
								learningObjective:
									'Perkalian campuran dengan bilangan bulat.',
								questionUi: doc(
									p('Hitunglah:'),
									math('2\\frac{1}{4} \\times 2 = \\ldots'),
								),
								questionLlmContext:
									'2 1/4 × 2 = 9/4 × 2 = 18/4 = 9/2 = 4 1/2.',
								evaluationParameters: {
									expected_answer_keywords: [
										'4 1/2',
										'9/2',
										'18/4',
									],
									common_misconceptions: ['4 2/4', '4 1/8'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '4 1/2' },
							},
						],
					},
					{
						title: 'LATIHAN',
						order: 4,
						difficulty: 2,
						content: doc(
							heading(2, 'LATIHAN'),
							p(
								'Latihan untuk menguji pemahaman siswa tentang materi pada subtopik ini.',
							),
						),
						materialLlmContext:
							'Latihan ini menguji pemahaman siswa terhadap seluruh materi pada subtopik Perkalian Pecahan. ' +
							'Soal latihan menggabungkan konsep-konsep yang telah dipelajari pada materi sebelumnya.',
						questions: [
							{
								learningObjective:
									'Soal cerita perkalian pecahan.',
								questionUi: doc(
									p(
										'Ibu membuat kue. Resep membutuhkan ',
										bold('3/4'),
										' kg tepung. Ibu hanya ingin membuat ',
										bold('1/2'),
										' resep.',
									),
									p(
										bold('Pertanyaan: '),
										'Berapa kg tepung yang dibutuhkan?',
									),
								),
								questionLlmContext:
									'1/2 × 3/4 = 3/8 kg tepung.',
								evaluationParameters: {
									expected_answer_keywords: ['3/8'],
									common_misconceptions: ['3/2', '4/6'],
									strictness_level: 'moderate',
								},
								answers: { tepung: '3/8 kg' },
							},
							{
								learningObjective:
									'Soal cerita perkalian dengan bilangan bulat.',
								questionUi: doc(
									p(
										'Setiap hari Adi minum ',
										bold('2/5'),
										' liter susu. Berapa liter susu yang diminum Adi selama ',
										bold('3 hari'),
										'?',
									),
								),
								questionLlmContext:
									'3 × 2/5 = 6/5 = 1 1/5 liter.',
								evaluationParameters: {
									expected_answer_keywords: ['6/5', '1 1/5'],
									common_misconceptions: ['2/15', '6/15'],
									strictness_level: 'moderate',
								},
								answers: {
									total: '6/5 liter',
									campuran: '1 1/5 liter',
								},
							},
							{
								learningObjective:
									'Soal cerita perkalian campuran.',
								questionUi: doc(
									p(
										'Satu kotak berisi ',
										bold('1 1/2'),
										' kg apel. Ibu membeli ',
										bold('3'),
										' kotak.',
									),
									p(
										bold('Pertanyaan: '),
										'Berapa kg apel yang dibeli ibu?',
									),
								),
								questionLlmContext:
									'1 1/2 × 3 = 3/2 × 3 = 9/2 = 4 1/2 kg.',
								evaluationParameters: {
									expected_answer_keywords: ['4 1/2', '9/2'],
									common_misconceptions: ['3 3/2', '4 3/6'],
									strictness_level: 'moderate',
								},
								answers: { total: '4 1/2 kg' },
							},
						],
					},
				],
			},
			{
				name: 'Pembagian Pecahan',
				slug: 'pembagian-pecahan',
				description:
					'Membagi pecahan dengan pecahan — kunci rahasianya: kalikan dengan kebalikan!',
				order: 2,
				materials: [
					{
						title: 'Kebalikan (Invers) Pecahan',
						order: 1,
						difficulty: 1,
						content: doc(
							heading(2, 'Kebalikan (Invers) Pecahan'),
							p(
								'Kebalikan dari pecahan a/b adalah ',
								bold('b/a'),
								' — tinggal balik posisi pembilang dan penyebut.',
							),
							heading(3, 'Contoh'),
							bulletList(
								'Kebalikan dari 2/3 adalah 3/2',
								'Kebalikan dari 5/7 adalah 7/5',
								'Kebalikan dari 4 (= 4/1) adalah 1/4',
							),
							p(
								bold('Penting: '),
								'Kebalikan digunakan saat membagi pecahan. Membagi = mengalikan dengan kebalikan!',
							),
						),
						materialLlmContext:
							'Materi ini membahas konsep kebalikan (invers/reciprocal) pecahan. ' +
							'Kebalikan dari a/b adalah b/a. Contoh: kebalikan 2/3 = 3/2, kebalikan 5 = 1/5. ' +
							'Konsep ini penting untuk pembagian pecahan: a/b ÷ c/d = a/b × d/c.',
						questions: [
							{
								learningObjective:
									'Siswa dapat menemukan kebalikan pecahan.',
								questionUi: doc(
									p(
										bold('Pertanyaan: '),
										'Apa kebalikan dari pecahan berikut?',
									),
									math('\\frac{3}{8}'),
								),
								questionLlmContext: 'Kebalikan dari 3/8 = 8/3.',
								evaluationParameters: {
									expected_answer_keywords: [
										'8/3',
										'delapan per tiga',
									],
									common_misconceptions: [
										'3/8 (tidak diubah)',
										'1/3',
									],
									strictness_level: 'lenient',
								},
								answers: { kebalikan: '8/3' },
							},
							{
								learningObjective:
									'Kebalikan dari bilangan bulat.',
								questionUi: doc(
									p(
										bold('Pertanyaan: '),
										'Apa kebalikan dari bilangan 6?',
									),
								),
								questionLlmContext:
									'6 = 6/1. Kebalikan dari 6/1 = 1/6.',
								evaluationParameters: {
									expected_answer_keywords: ['1/6'],
									common_misconceptions: ['6/1', '-6'],
									strictness_level: 'lenient',
								},
								answers: { kebalikan: '1/6' },
							},
						],
					},
					{
						title: 'Pembagian Pecahan dengan Pecahan',
						order: 2,
						difficulty: 2,
						content: doc(
							heading(2, 'Pembagian Pecahan dengan Pecahan'),
							p(
								'Membagi pecahan sama dengan mengalikan dengan kebalikannya:',
							),
							heading(3, 'Rumus'),
							math(
								'\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c} = \\frac{a \\times d}{b \\times c}',
							),
							heading(3, 'Langkah'),
							orderedList(
								'Tulis soal pembagian',
								'Ganti tanda bagi (÷) menjadi kali (×)',
								'Balik pecahan kedua (pembagi)',
								'Kalikan seperti biasa',
							),
							heading(3, 'Contoh'),
							math(
								'\\frac{2}{3} \\div \\frac{4}{5} = \\frac{2}{3} \\times \\frac{5}{4} = \\frac{10}{12} = \\frac{5}{6}',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan pembagian pecahan. ' +
							'Rumus: a/b ÷ c/d = a/b × d/c. "Ubah bagi menjadi kali, balik pembaginya." ' +
							'Contoh: 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6.',
						questions: [
							{
								learningObjective:
									'Siswa dapat membagi pecahan dengan pecahan.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'\\frac{3}{4} \\div \\frac{1}{2} = \\ldots',
									),
								),
								questionLlmContext:
									'3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2 = 1 1/2.',
								evaluationParameters: {
									expected_answer_keywords: [
										'6/4',
										'3/2',
										'1 1/2',
									],
									common_misconceptions: ['3/8', '3/4'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '3/2', campuran: '1 1/2' },
							},
							{
								learningObjective:
									'Pembagian dan penyederhanaan.',
								questionUi: doc(
									p('Hitunglah dan sederhanakan:'),
									math(
										'\\frac{5}{6} \\div \\frac{5}{3} = \\ldots',
									),
								),
								questionLlmContext:
									'5/6 ÷ 5/3 = 5/6 × 3/5 = 15/30 = 1/2.',
								evaluationParameters: {
									expected_answer_keywords: ['15/30', '1/2'],
									common_misconceptions: ['25/18', '1/3'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '1/2' },
							},
						],
					},
					{
						title: 'Pembagian Pecahan dengan Bilangan Bulat',
						order: 3,
						difficulty: 2,
						content: doc(
							heading(
								2,
								'Pembagian Pecahan dengan Bilangan Bulat',
							),
							p(
								'Membagi pecahan dengan bilangan bulat = mengalikan pecahan dengan kebalikan bilangan bulat.',
							),
							heading(3, 'Rumus'),
							math(
								'\\frac{a}{b} \\div n = \\frac{a}{b} \\times \\frac{1}{n} = \\frac{a}{b \\times n}',
							),
							heading(3, 'Contoh'),
							math(
								'\\frac{3}{4} \\div 3 = \\frac{3}{4} \\times \\frac{1}{3} = \\frac{3}{12} = \\frac{1}{4}',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan pembagian pecahan dengan bilangan bulat. ' +
							'Rumus: a/b ÷ n = a/b × 1/n = a/(b×n). ' +
							'Contoh: 3/4 ÷ 3 = 3/4 × 1/3 = 3/12 = 1/4.',
						questions: [
							{
								learningObjective:
									'Siswa membagi pecahan dengan bilangan bulat.',
								questionUi: doc(
									p('Hitunglah:'),
									math('\\frac{2}{3} \\div 4 = \\ldots'),
								),
								questionLlmContext:
									'2/3 ÷ 4 = 2/3 × 1/4 = 2/12 = 1/6.',
								evaluationParameters: {
									expected_answer_keywords: ['2/12', '1/6'],
									common_misconceptions: ['8/3', '2/7'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '1/6' },
							},
							{
								learningObjective:
									'Pembagian dan penyederhanaan.',
								questionUi: doc(
									p('Hitunglah dan sederhanakan:'),
									math('\\frac{4}{5} \\div 2 = \\ldots'),
								),
								questionLlmContext:
									'4/5 ÷ 2 = 4/5 × 1/2 = 4/10 = 2/5.',
								evaluationParameters: {
									expected_answer_keywords: ['4/10', '2/5'],
									common_misconceptions: ['8/5', '4/7'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '2/5' },
							},
						],
					},
					{
						title: 'LATIHAN',
						order: 4,
						difficulty: 2,
						content: doc(
							heading(2, 'LATIHAN'),
							p(
								'Latihan untuk menguji pemahaman siswa tentang materi pada subtopik ini.',
							),
						),
						materialLlmContext:
							'Latihan ini menguji pemahaman siswa terhadap seluruh materi pada subtopik Pembagian Pecahan. ' +
							'Soal latihan menggabungkan konsep-konsep yang telah dipelajari pada materi sebelumnya.',
						questions: [
							{
								learningObjective:
									'Memahami hubungan pecahan dan kebalikannya.',
								questionUi: doc(
									p(
										bold('Pertanyaan: '),
										'Jika kamu mengalikan sebuah pecahan dengan kebalikannya, berapa hasilnya? Coba buktikan dengan pecahan 4/7!',
									),
								),
								questionLlmContext:
									'4/7 × 7/4 = 28/28 = 1. Setiap pecahan dikali kebalikannya selalu = 1.',
								evaluationParameters: {
									expected_answer_keywords: [
										'1',
										'28/28',
										'satu',
									],
									common_misconceptions: ['0', '4/7'],
									strictness_level: 'lenient',
								},
								answers: {
									hasil: '1',
									penjelasan: '4/7 × 7/4 = 28/28 = 1',
								},
							},
							{
								learningObjective:
									'Soal cerita pembagian pecahan.',
								questionUi: doc(
									p(
										'Ibu memiliki ',
										bold('3/4'),
										' kg gula. Setiap kue membutuhkan ',
										bold('1/8'),
										' kg gula.',
									),
									p(
										bold('Pertanyaan: '),
										'Berapa banyak kue yang bisa dibuat ibu?',
									),
								),
								questionLlmContext:
									'3/4 ÷ 1/8 = 3/4 × 8/1 = 24/4 = 6 kue.',
								evaluationParameters: {
									expected_answer_keywords: [
										'6',
										'enam',
										'6 kue',
									],
									common_misconceptions: ['3/32', '24/32'],
									strictness_level: 'moderate',
								},
								answers: { jumlah_kue: 6 },
							},
							{
								learningObjective:
									'Soal cerita pembagian pecahan dengan bilangan bulat.',
								questionUi: doc(
									p(
										'Sebuah kue dengan berat ',
										bold('3/4'),
										' kg dibagi rata untuk ',
										bold('6'),
										' anak.',
									),
									p(
										bold('Pertanyaan: '),
										'Berapa kg kue yang didapat setiap anak?',
									),
								),
								questionLlmContext:
									'3/4 ÷ 6 = 3/4 × 1/6 = 3/24 = 1/8 kg per anak.',
								evaluationParameters: {
									expected_answer_keywords: ['3/24', '1/8'],
									common_misconceptions: ['18/4', '3/10'],
									strictness_level: 'moderate',
								},
								answers: { per_anak: '1/8 kg' },
							},
						],
					},
				],
			},
			{
				name: 'Pecahan Desimal',
				slug: 'pecahan-desimal',
				description:
					'Mengenal pecahan desimal dan hubungannya dengan pecahan biasa. Mengubah pecahan ke desimal dan sebaliknya.',
				order: 3,
				materials: [
					{
						title: 'Apa Itu Pecahan Desimal?',
						order: 1,
						difficulty: 1,
						content: doc(
							heading(2, 'Pecahan Desimal'),
							p(
								'Pecahan desimal adalah cara lain menulis pecahan menggunakan ',
								bold('tanda koma'),
								' (di Indonesia) atau ',
								bold('tanda titik'),
								' (internasional).',
							),
							heading(3, 'Contoh'),
							bulletList(
								'1/2 = 0,5',
								'1/4 = 0,25',
								'3/4 = 0,75',
								'1/10 = 0,1',
								'7/10 = 0,7',
							),
							heading(3, 'Cara Mengubah'),
							p(
								'Untuk mengubah pecahan ke desimal, ',
								bold('bagi pembilang dengan penyebut'),
								'.',
							),
							math('\\frac{3}{4} = 3 \\div 4 = 0,75'),
						),
						materialLlmContext:
							'Materi ini memperkenalkan pecahan desimal. ' +
							'Pecahan desimal menggunakan tanda koma/titik. Contoh: 1/2 = 0,5; 1/4 = 0,25; 3/4 = 0,75. ' +
							'Cara mengubah: bagi pembilang dengan penyebut. 3/4 = 3÷4 = 0,75. ' +
							'Pecahan dengan penyebut 10, 100, 1000 mudah diubah ke desimal.',
						questions: [
							{
								learningObjective:
									'Siswa dapat mengubah pecahan ke desimal.',
								questionUi: doc(
									p(
										'Ubahlah pecahan berikut ke pecahan desimal:',
									),
									math('\\frac{1}{2}'),
								),
								questionLlmContext: '1/2 = 1÷2 = 0,5 atau 0.5.',
								evaluationParameters: {
									expected_answer_keywords: [
										'0,5',
										'0.5',
										'nol koma lima',
									],
									common_misconceptions: ['1,2', '0,2', '12'],
									strictness_level: 'lenient',
								},
								answers: { desimal: '0,5' },
							},
							{
								learningObjective:
									'Siswa mengubah desimal ke pecahan.',
								questionUi: doc(
									p(
										bold('Pertanyaan: '),
										'Ubahlah 0,75 menjadi pecahan biasa!',
									),
								),
								questionLlmContext: '0,75 = 75/100 = 3/4.',
								evaluationParameters: {
									expected_answer_keywords: [
										'75/100',
										'3/4',
										'tiga per empat',
									],
									common_misconceptions: ['7/5', '75/10'],
									strictness_level: 'lenient',
								},
								answers: { pecahan: '3/4' },
							},
						],
					},
					{
						title: 'Operasi dengan Pecahan Desimal',
						order: 2,
						difficulty: 2,
						content: doc(
							heading(2, 'Penjumlahan dan Pengurangan Desimal'),
							p(
								'Saat menjumlahkan atau mengurangkan desimal, pastikan ',
								bold('tanda koma sejajar'),
								'.',
							),
							heading(3, 'Contoh Penjumlahan'),
							math('0,5 + 0,25 = 0,75'),
							heading(3, 'Contoh Pengurangan'),
							math('1,5 - 0,75 = 0,75'),
							p(
								bold('Tips: '),
								'Tambahkan angka 0 di belakang agar jumlah angka di belakang koma sama.',
							),
							bulletList(
								'0,5 ditulis 0,50',
								'Lalu 0,50 + 0,25 = 0,75',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan penjumlahan dan pengurangan pecahan desimal. ' +
							'Tips: sejajarkan tanda koma, tambahkan 0 jika perlu. ' +
							'Contoh: 0,5 + 0,25 = 0,50 + 0,25 = 0,75. ' +
							'Contoh pengurangan: 1,5 - 0,75 = 1,50 - 0,75 = 0,75.',
						questions: [
							{
								learningObjective:
									'Siswa dapat menjumlahkan desimal.',
								questionUi: doc(
									p('Hitunglah:'),
									math('0,3 + 0,45 = \\ldots'),
								),
								questionLlmContext:
									'0,3 + 0,45 = 0,30 + 0,45 = 0,75.',
								evaluationParameters: {
									expected_answer_keywords: ['0,75', '0.75'],
									common_misconceptions: ['0,48', '0,345'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '0,75' },
							},
							{
								learningObjective:
									'Siswa dapat mengurangkan desimal.',
								questionUi: doc(
									p('Hitunglah:'),
									math('2,5 - 1,25 = \\ldots'),
								),
								questionLlmContext:
									'2,5 - 1,25 = 2,50 - 1,25 = 1,25.',
								evaluationParameters: {
									expected_answer_keywords: ['1,25', '1.25'],
									common_misconceptions: ['1,3', '1,5'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '1,25' },
							},
						],
					},
					{
						title: 'Hubungan Pecahan, Desimal, dan Persen',
						order: 3,
						difficulty: 2,
						content: doc(
							heading(2, 'Pecahan, Desimal, dan Persen'),
							p(
								'Pecahan, desimal, dan persen adalah ',
								bold('tiga cara berbeda'),
								' untuk menyatakan nilai yang sama.',
							),
							heading(3, 'Tabel Konversi'),
							bulletList(
								'1/2 = 0,5 = 50%',
								'1/4 = 0,25 = 25%',
								'3/4 = 0,75 = 75%',
								'1/5 = 0,2 = 20%',
								'1/10 = 0,1 = 10%',
							),
							heading(3, 'Cara Mengubah'),
							bulletList(
								'Pecahan → Desimal: bagi pembilang dengan penyebut',
								'Desimal → Persen: kalikan dengan 100, tambah tanda %',
								'Persen → Pecahan: tulis sebagai /100, sederhanakan',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan hubungan antara pecahan, desimal, dan persen. ' +
							'Konversi: 1/2 = 0,5 = 50%; 1/4 = 0,25 = 25%; 3/4 = 0,75 = 75%. ' +
							'Pecahan → Desimal: bagi. Desimal → Persen: ×100. Persen → Pecahan: /100.',
						questions: [
							{
								learningObjective:
									'Siswa dapat mengubah pecahan ke persen.',
								questionUi: doc(
									p('Ubahlah pecahan berikut ke persen:'),
									math('\\frac{3}{5}'),
								),
								questionLlmContext: '3/5 = 0,6 = 60%.',
								evaluationParameters: {
									expected_answer_keywords: [
										'60%',
										'60 persen',
										'0,6',
									],
									common_misconceptions: ['35%', '3,5%'],
									strictness_level: 'lenient',
								},
								answers: { persen: '60%' },
							},
							{
								learningObjective:
									'Siswa mengubah persen ke pecahan.',
								questionUi: doc(
									p(
										bold('Pertanyaan: '),
										'Ubahlah 25% menjadi pecahan biasa dalam bentuk paling sederhana!',
									),
								),
								questionLlmContext: '25% = 25/100 = 1/4.',
								evaluationParameters: {
									expected_answer_keywords: [
										'1/4',
										'25/100',
										'seperempat',
									],
									common_misconceptions: ['2/5', '1/25'],
									strictness_level: 'lenient',
								},
								answers: { pecahan: '1/4' },
							},
						],
					},
					{
						title: 'LATIHAN',
						order: 4,
						difficulty: 2,
						content: doc(
							heading(2, 'LATIHAN'),
							p(
								'Latihan untuk menguji pemahaman siswa tentang materi pada subtopik ini.',
							),
						),
						materialLlmContext:
							'Latihan ini menguji pemahaman siswa terhadap seluruh materi pada subtopik Pecahan Desimal. ' +
							'Soal latihan menggabungkan konsep-konsep yang telah dipelajari pada materi sebelumnya.',
						questions: [
							{
								learningObjective:
									'Memahami pecahan berpenyebut 10.',
								questionUi: doc(
									p('Ubahlah ke pecahan desimal:'),
									math('\\frac{3}{10}'),
								),
								questionLlmContext: '3/10 = 0,3.',
								evaluationParameters: {
									expected_answer_keywords: ['0,3', '0.3'],
									common_misconceptions: ['3,0', '0,03'],
									strictness_level: 'lenient',
								},
								answers: { desimal: '0,3' },
							},
							{
								learningObjective:
									'Soal cerita operasi desimal.',
								questionUi: doc(
									p(
										'Adik membeli pensil seharga Rp',
										bold('2,50'),
										' ribu dan penghapus seharga Rp',
										bold('1,75'),
										' ribu.',
									),
									p(
										bold('Pertanyaan: '),
										'Berapa total belanjaan adik?',
									),
								),
								questionLlmContext:
									'2,50 + 1,75 = 4,25 ribu rupiah.',
								evaluationParameters: {
									expected_answer_keywords: [
										'4,25',
										'4.25',
										'empat koma dua lima',
									],
									common_misconceptions: ['3,25', '3,75'],
									strictness_level: 'moderate',
								},
								answers: { total: 'Rp4,25 ribu' },
							},
							{
								learningObjective:
									'Konversi tiga bentuk sekaligus.',
								questionUi: doc(
									p('Lengkapi tabel konversi berikut:'),
									p('Pecahan: 1/2'),
									p('Desimal: ...'),
									p('Persen: ...'),
								),
								questionLlmContext:
									'1/2 = 0,5 = 50%. Siswa harus bisa mengisi desimal dan persen.',
								evaluationParameters: {
									expected_answer_keywords: [
										'0,5',
										'0.5',
										'50%',
									],
									common_misconceptions: ['0,12', '12%'],
									strictness_level: 'lenient',
								},
								answers: { desimal: '0,5', persen: '50%' },
							},
						],
					},
				],
			},
		],
	};
