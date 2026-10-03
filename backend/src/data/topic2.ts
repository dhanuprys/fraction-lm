import {
	bold,
	bulletList,
	doc,
	heading,
	math,
	orderedList,
	p,
} from './helpers';

export const topic2 =
	// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  TOPIC 2  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	{
		name: 'Operasi Pecahan Dasar',
		slug: 'operasi-pecahan-dasar',
		description:
			'Mempelajari cara menjumlahkan dan mengurangkan pecahan, baik yang berpenyebut sama maupun berbeda.',
		order: 2,
		subTopics: [
			{
				name: 'Penjumlahan Pecahan Berpenyebut Sama',
				slug: 'penjumlahan-penyebut-sama',
				description:
					'Cara menjumlahkan pecahan yang memiliki penyebut sama — cukup jumlahkan pembilangnya!',
				order: 1,
				materials: [
					{
						title: 'Dasar Penjumlahan Pecahan',
						order: 1,
						difficulty: 1,
						content: doc(
							heading(2, 'Penjumlahan Pecahan Berpenyebut Sama'),
							p(
								'Jika dua pecahan memiliki penyebut yang sama, kita cukup ',
								bold('menjumlahkan pembilangnya'),
								', sedangkan penyebutnya tetap.',
							),
							heading(3, 'Rumus'),
							math(
								'\\frac{a}{c} + \\frac{b}{c} = \\frac{a + b}{c}',
							),
							heading(3, 'Contoh'),
							math(
								'\\frac{2}{7} + \\frac{3}{7} = \\frac{2 + 3}{7} = \\frac{5}{7}',
							),
							p(
								bold('Ingat: '),
								'Penyebutnya TIDAK dijumlahkan!',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan penjumlahan pecahan berpenyebut sama. ' +
							'Rumus: a/c + b/c = (a+b)/c. Penyebutnya tetap, pembilangnya dijumlahkan. ' +
							'Contoh: 2/7 + 3/7 = 5/7. Penyebut TIDAK dijumlahkan (bukan 5/14). ' +
							'Kesalahan umum: menjumlahkan penyebut juga.',
						questions: [
							{
								learningObjective:
									'Siswa dapat menjumlahkan pecahan berpenyebut sama.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'\\frac{1}{6} + \\frac{4}{6} = \\ldots',
									),
								),
								questionLlmContext:
									'1/6 + 4/6 = (1+4)/6 = 5/6. Penyebut tetap 6.',
								evaluationParameters: {
									expected_answer_keywords: [
										'5/6',
										'lima per enam',
									],
									common_misconceptions: [
										'5/12 (menjumlahkan penyebut juga)',
									],
									strictness_level: 'moderate',
								},
								answers: { hasil: '5/6' },
							},
							{
								learningObjective:
									'Siswa dapat menjumlahkan pecahan dan menyederhanakan.',
								questionUi: doc(
									p('Hitunglah dan sederhanakan jika bisa:'),
									math(
										'\\frac{3}{8} + \\frac{1}{8} = \\ldots',
									),
								),
								questionLlmContext:
									'3/8 + 1/8 = 4/8. Disederhanakan: 4/8 = 1/2.',
								evaluationParameters: {
									expected_answer_keywords: [
										'4/8',
										'1/2',
										'setengah',
									],
									common_misconceptions: [
										'4/16',
										'3/8 (lupa menjumlahkan)',
									],
									strictness_level: 'moderate',
								},
								answers: { hasil: '4/8', sederhana: '1/2' },
							},
						],
					},
					{
						title: 'Penjumlahan Pecahan Hasil Lebih dari 1',
						order: 2,
						difficulty: 2,
						content: doc(
							heading(2, 'Hasil Penjumlahan Lebih dari 1'),
							p(
								'Kadang hasil penjumlahan pecahan menghasilkan pecahan yang ',
								bold(
									'pembilangnya lebih besar dari penyebutnya',
								),
								'. Artinya hasilnya lebih dari 1.',
							),
							heading(3, 'Contoh'),
							math(
								'\\frac{4}{5} + \\frac{3}{5} = \\frac{7}{5} = 1\\frac{2}{5}',
							),
							p(
								'Kita bisa mengubah 7/5 menjadi pecahan campuran: 7 ÷ 5 = 1 sisa 2.',
							),
						),
						materialLlmContext:
							'Materi ini membahas kasus penjumlahan pecahan berpenyebut sama yang hasilnya lebih dari 1. ' +
							'Contoh: 4/5 + 3/5 = 7/5 = 1 2/5. ' +
							'Siswa perlu bisa mengubah pecahan tak wajar (improper fraction) ke pecahan campuran.',
						questions: [
							{
								learningObjective:
									'Siswa dapat menjumlahkan pecahan dengan hasil > 1.',
								questionUi: doc(
									p(
										'Hitunglah dan ubah ke pecahan campuran:',
									),
									math(
										'\\frac{5}{6} + \\frac{4}{6} = \\ldots',
									),
								),
								questionLlmContext:
									'5/6 + 4/6 = 9/6. Pecahan campuran: 9÷6 = 1 sisa 3 → 1 3/6 = 1 1/2.',
								evaluationParameters: {
									expected_answer_keywords: [
										'9/6',
										'1 3/6',
										'1 1/2',
										'1,5',
									],
									common_misconceptions: ['9/12', '1 9/6'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '9/6', campuran: '1 1/2' },
							},
							{
								learningObjective:
									'Siswa menjumlahkan dan menyatakan sebagai campuran.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'\\frac{3}{4} + \\frac{3}{4} = \\ldots',
									),
									p('Nyatakan dalam pecahan campuran!'),
								),
								questionLlmContext:
									'3/4 + 3/4 = 6/4. Pecahan campuran: 6÷4 = 1 sisa 2 → 1 2/4 = 1 1/2.',
								evaluationParameters: {
									expected_answer_keywords: [
										'6/4',
										'1 2/4',
										'1 1/2',
									],
									common_misconceptions: ['6/8', '3/4'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '6/4', campuran: '1 1/2' },
							},
						],
					},
					{
						title: 'Pengurangan Pecahan Berpenyebut Sama',
						order: 3,
						difficulty: 1,
						content: doc(
							heading(2, 'Pengurangan Pecahan Berpenyebut Sama'),
							p(
								'Sama seperti penjumlahan, kita cukup mengurangkan ',
								bold('pembilangnya'),
								' saja. Penyebutnya tetap.',
							),
							heading(3, 'Rumus'),
							math(
								'\\frac{a}{c} - \\frac{b}{c} = \\frac{a - b}{c}',
							),
							heading(3, 'Contoh'),
							math(
								'\\frac{5}{9} - \\frac{2}{9} = \\frac{5 - 2}{9} = \\frac{3}{9} = \\frac{1}{3}',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan pengurangan pecahan berpenyebut sama. ' +
							'Rumus: a/c - b/c = (a-b)/c. Penyebutnya tetap, pembilangnya dikurangkan. ' +
							'Contoh: 5/9 - 2/9 = 3/9 = 1/3 (setelah disederhanakan). ' +
							'Siswa harus ingat untuk menyederhanakan jika bisa.',
						questions: [
							{
								learningObjective:
									'Siswa dapat mengurangkan pecahan berpenyebut sama.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'\\frac{7}{10} - \\frac{3}{10} = \\ldots',
									),
								),
								questionLlmContext: '7/10 - 3/10 = 4/10 = 2/5.',
								evaluationParameters: {
									expected_answer_keywords: ['4/10', '2/5'],
									common_misconceptions: ['4/0', '10/10'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '4/10', sederhana: '2/5' },
							},
							{
								learningObjective:
									'Siswa mengurangkan dan menyederhanakan.',
								questionUi: doc(
									p('Hitunglah dan sederhanakan:'),
									math(
										'\\frac{6}{8} - \\frac{2}{8} = \\ldots',
									),
								),
								questionLlmContext: '6/8 - 2/8 = 4/8 = 1/2.',
								evaluationParameters: {
									expected_answer_keywords: ['4/8', '1/2'],
									common_misconceptions: ['4/0', '8/8'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '4/8', sederhana: '1/2' },
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
								'Latihan untuk menguji pemahaman siswa tentang Penjumlahan Pecahan Berpenyebut Sama.',
							),
						),
						materialLlmContext:
							'Latihan ini menguji pemahaman siswa terhadap seluruh materi pada subtopik Penjumlahan Pecahan Berpenyebut Sama. ' +
							'Soal latihan menggabungkan konsep-konsep yang telah dipelajari pada materi sebelumnya.',
						questions: [
							{
								learningObjective:
									'Siswa menerapkan penjumlahan pecahan dalam soal cerita.',
								questionUi: doc(
									p(
										'Ayah minum ',
										bold('2/5'),
										' botol air. Lalu ia minum lagi ',
										bold('1/5'),
										' botol air.',
									),
									p(
										bold('Pertanyaan: '),
										'Berapa total air yang diminum Ayah?',
									),
								),
								questionLlmContext:
									'2/5 + 1/5 = 3/5 botol air.',
								evaluationParameters: {
									expected_answer_keywords: [
										'3/5',
										'tiga per lima',
									],
									common_misconceptions: ['3/10', '2/5'],
									strictness_level: 'moderate',
								},
								answers: { total: '3/5 botol' },
							},
							{
								learningObjective:
									'Soal cerita penjumlahan dengan hasil > 1.',
								questionUi: doc(
									p(
										'Kakak membuat 2 gelas jus. Gelas pertama berisi ',
										bold('5/8'),
										' liter, gelas kedua berisi ',
										bold('6/8'),
										' liter.',
									),
									p(
										bold('Pertanyaan: '),
										'Berapa total jus yang dibuat kakak?',
									),
								),
								questionLlmContext:
									'5/8 + 6/8 = 11/8 = 1 3/8 liter.',
								evaluationParameters: {
									expected_answer_keywords: ['11/8', '1 3/8'],
									common_misconceptions: ['11/16', '5/8'],
									strictness_level: 'moderate',
								},
								answers: {
									total: '11/8 liter',
									campuran: '1 3/8 liter',
								},
							},
							{
								learningObjective:
									'Soal cerita pengurangan pecahan.',
								questionUi: doc(
									p(
										'Ibu memiliki ',
										bold('5/6'),
										' kg gula. Untuk membuat kue, ibu menggunakan ',
										bold('2/6'),
										' kg gula.',
									),
									p(
										bold('Pertanyaan: '),
										'Berapa sisa gula ibu?',
									),
								),
								questionLlmContext:
									'5/6 - 2/6 = 3/6 = 1/2 kg gula.',
								evaluationParameters: {
									expected_answer_keywords: ['3/6', '1/2'],
									common_misconceptions: ['3/0', '7/6'],
									strictness_level: 'moderate',
								},
								answers: {
									sisa: '3/6 kg',
									sederhana: '1/2 kg',
								},
							},
						],
					},
				],
			},
			{
				name: 'Penjumlahan Pecahan Berpenyebut Berbeda',
				slug: 'penjumlahan-penyebut-berbeda',
				description:
					'Menjumlahkan pecahan yang penyebutnya berbeda dengan menyamakan penyebut terlebih dahulu.',
				order: 2,
				materials: [
					{
						title: 'Menyamakan Penyebut untuk Penjumlahan',
						order: 1,
						difficulty: 2,
						content: doc(
							heading(
								2,
								'Penjumlahan Pecahan Berpenyebut Berbeda',
							),
							p(
								'Jika penyebutnya berbeda, kita harus ',
								bold('menyamakan penyebut'),
								' terlebih dahulu menggunakan KPK.',
							),
							heading(3, 'Langkah-langkah'),
							orderedList(
								'Cari KPK dari kedua penyebut',
								'Ubah kedua pecahan agar penyebutnya = KPK',
								'Jumlahkan pembilangnya',
								'Sederhanakan jika bisa',
							),
							heading(3, 'Contoh'),
							math('\\frac{1}{3} + \\frac{1}{4}'),
							bulletList(
								'KPK(3, 4) = 12',
								'1/3 = 4/12',
								'1/4 = 3/12',
								'4/12 + 3/12 = 7/12',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan penjumlahan pecahan berpenyebut berbeda. ' +
							'Langkah: (1) Cari KPK penyebut, (2) Ubah pecahan ke penyebut yang sama, (3) Jumlahkan pembilang, (4) Sederhanakan. ' +
							'Contoh: 1/3 + 1/4 → KPK(3,4)=12 → 4/12 + 3/12 = 7/12.',
						questions: [
							{
								learningObjective:
									'Siswa dapat menjumlahkan pecahan berpenyebut berbeda.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'\\frac{1}{2} + \\frac{1}{3} = \\ldots',
									),
								),
								questionLlmContext:
									'1/2 + 1/3. KPK(2,3)=6. 1/2=3/6, 1/3=2/6. 3/6+2/6 = 5/6.',
								evaluationParameters: {
									expected_answer_keywords: [
										'5/6',
										'lima per enam',
									],
									common_misconceptions: [
										'2/5 (menjumlahkan langsung)',
										'1/5',
									],
									strictness_level: 'moderate',
								},
								answers: { hasil: '5/6' },
							},
							{
								learningObjective:
									'Siswa menunjukkan langkah menyamakan penyebut.',
								questionUi: doc(
									p(
										'Hitunglah dengan menunjukkan langkah-langkahnya:',
									),
									math(
										'\\frac{2}{5} + \\frac{1}{3} = \\ldots',
									),
								),
								questionLlmContext:
									'2/5 + 1/3. KPK(5,3)=15. 2/5=6/15, 1/3=5/15. 6/15+5/15 = 11/15.',
								evaluationParameters: {
									expected_answer_keywords: [
										'11/15',
										'KPK',
										'15',
										'6/15',
										'5/15',
									],
									common_misconceptions: ['3/8', '2/15'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '11/15' },
							},
						],
					},
					{
						title: 'Pengurangan Pecahan Berpenyebut Berbeda',
						order: 2,
						difficulty: 2,
						content: doc(
							heading(
								2,
								'Pengurangan Pecahan Berpenyebut Berbeda',
							),
							p(
								'Langkahnya sama dengan penjumlahan — samakan penyebut dulu, baru kurangkan.',
							),
							heading(3, 'Contoh'),
							math('\\frac{3}{4} - \\frac{1}{3}'),
							bulletList(
								'KPK(4, 3) = 12',
								'3/4 = 9/12',
								'1/3 = 4/12',
								'9/12 - 4/12 = 5/12',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan pengurangan pecahan berpenyebut berbeda. ' +
							'Langkah: samakan penyebut menggunakan KPK, lalu kurangkan pembilang. ' +
							'Contoh: 3/4 - 1/3 → KPK(4,3)=12 → 9/12 - 4/12 = 5/12.',
						questions: [
							{
								learningObjective:
									'Siswa dapat mengurangkan pecahan berpenyebut berbeda.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'\\frac{3}{4} - \\frac{1}{2} = \\ldots',
									),
								),
								questionLlmContext:
									'3/4 - 1/2. KPK(4,2)=4. 1/2=2/4. 3/4-2/4=1/4.',
								evaluationParameters: {
									expected_answer_keywords: [
										'1/4',
										'seperempat',
									],
									common_misconceptions: ['2/2', '3/2'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '1/4' },
							},
							{
								learningObjective:
									'Pengurangan dengan langkah lengkap.',
								questionUi: doc(
									p('Hitunglah dan tunjukkan langkahnya:'),
									math(
										'\\frac{5}{6} - \\frac{1}{4} = \\ldots',
									),
								),
								questionLlmContext:
									'5/6 - 1/4. KPK(6,4)=12. 5/6=10/12, 1/4=3/12. 10/12-3/12=7/12.',
								evaluationParameters: {
									expected_answer_keywords: [
										'7/12',
										'KPK',
										'12',
										'10/12',
										'3/12',
									],
									common_misconceptions: ['4/2', '5/2'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '7/12' },
							},
						],
					},
					{
						title: 'Latihan Campuran Penjumlahan dan Pengurangan',
						order: 3,
						difficulty: 2,
						content: doc(
							heading(2, 'Latihan Campuran'),
							p(
								'Sekarang waktunya berlatih soal campuran penjumlahan dan pengurangan pecahan!',
							),
							p(
								bold('Tips: '),
								'Selalu perhatikan apakah penyebutnya sudah sama. Jika belum, samakan dulu!',
							),
							heading(3, 'Ringkasan Rumus'),
							math(
								'\\frac{a}{c} \\pm \\frac{b}{c} = \\frac{a \\pm b}{c}',
							),
							p(
								'Jika penyebut berbeda: samakan dulu menggunakan KPK!',
							),
						),
						materialLlmContext:
							'Materi ini adalah latihan campuran penjumlahan dan pengurangan pecahan. ' +
							'Siswa perlu menentukan apakah penyebutnya sama atau berbeda, lalu menyamakan jika perlu. ' +
							'Rumus penyebut sama: (a±b)/c. Penyebut beda: cari KPK dulu.',
						questions: [
							{
								learningObjective:
									'Menghitung campuran dengan penyebut sama.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'\\frac{7}{10} - \\frac{2}{10} + \\frac{4}{10} = \\ldots',
									),
								),
								questionLlmContext:
									'7/10 - 2/10 + 4/10 = (7-2+4)/10 = 9/10.',
								evaluationParameters: {
									expected_answer_keywords: ['9/10'],
									common_misconceptions: ['9/30', '11/10'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '9/10' },
							},
							{
								learningObjective:
									'Menghitung campuran dengan penyebut berbeda.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'\\frac{1}{2} + \\frac{1}{4} - \\frac{1}{8} = \\ldots',
									),
								),
								questionLlmContext:
									'1/2 + 1/4 - 1/8. KPK(2,4,8)=8. 1/2=4/8, 1/4=2/8, 1/8=1/8. ' +
									'4/8+2/8-1/8 = 5/8.',
								evaluationParameters: {
									expected_answer_keywords: ['5/8'],
									common_misconceptions: ['1/14', '3/8'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '5/8' },
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
								'Latihan untuk menguji pemahaman siswa tentang Penjumlahan Pecahan Berpenyebut Berbeda.',
							),
						),
						materialLlmContext:
							'Latihan ini menguji pemahaman siswa terhadap seluruh materi pada subtopik Penjumlahan Pecahan Berpenyebut Berbeda. ' +
							'Soal latihan menggabungkan konsep-konsep yang telah dipelajari pada materi sebelumnya.',
						questions: [
							{
								learningObjective:
									'Soal cerita penjumlahan penyebut berbeda.',
								questionUi: doc(
									p(
										'Ani berjalan ',
										bold('1/4'),
										' km ke sekolah, lalu ',
										bold('1/3'),
										' km ke perpustakaan.',
									),
									p(
										bold('Pertanyaan: '),
										'Berapa total jarak yang ditempuh Ani?',
									),
								),
								questionLlmContext:
									'1/4 + 1/3. KPK(4,3)=12. 1/4=3/12, 1/3=4/12. 3/12+4/12=7/12 km.',
								evaluationParameters: {
									expected_answer_keywords: [
										'7/12',
										'tujuh per dua belas',
									],
									common_misconceptions: ['2/7', '1/7'],
									strictness_level: 'moderate',
								},
								answers: { total: '7/12 km' },
							},
							{
								learningObjective:
									'Soal cerita pengurangan penyebut berbeda.',
								questionUi: doc(
									p(
										'Kakak memiliki tali sepanjang ',
										bold('2/3'),
										' meter. Ia memotong ',
										bold('1/4'),
										' meter untuk membuat gelang.',
									),
									p(
										bold('Pertanyaan: '),
										'Berapa sisa tali kakak?',
									),
								),
								questionLlmContext:
									'2/3 - 1/4. KPK(3,4)=12. 2/3=8/12, 1/4=3/12. 8/12-3/12=5/12 meter.',
								evaluationParameters: {
									expected_answer_keywords: [
										'5/12',
										'lima per dua belas',
									],
									common_misconceptions: ['1/1', '2/4'],
									strictness_level: 'moderate',
								},
								answers: { sisa: '5/12 meter' },
							},
							{
								learningObjective: 'Soal cerita campuran.',
								questionUi: doc(
									p(
										'Ibu membeli ',
										bold('3/4'),
										' kg tepung. Digunakan ',
										bold('1/3'),
										' kg untuk kue, lalu beli lagi ',
										bold('1/6'),
										' kg.',
									),
									p(
										bold('Pertanyaan: '),
										'Berapa tepung ibu sekarang?',
									),
								),
								questionLlmContext:
									'3/4 - 1/3 + 1/6. KPK(4,3,6)=12. 3/4=9/12, 1/3=4/12, 1/6=2/12. ' +
									'9/12-4/12+2/12 = 7/12 kg.',
								evaluationParameters: {
									expected_answer_keywords: ['7/12'],
									common_misconceptions: ['3/7', '1/1'],
									strictness_level: 'moderate',
								},
								answers: { total: '7/12 kg' },
							},
						],
					},
				],
			},
			{
				name: 'Penjumlahan dan Pengurangan Pecahan Campuran',
				slug: 'operasi-pecahan-campuran',
				description:
					'Belajar menjumlahkan dan mengurangkan pecahan campuran (bilangan bulat + pecahan).',
				order: 3,
				materials: [
					{
						title: 'Mengubah Pecahan Campuran ke Pecahan Biasa',
						order: 1,
						difficulty: 2,
						content: doc(
							heading(2, 'Pecahan Campuran ke Pecahan Biasa'),
							p(
								'Untuk menjumlahkan atau mengurangkan pecahan campuran, seringkali lebih mudah mengubahnya ke ',
								bold('pecahan biasa'),
								' terlebih dahulu.',
							),
							heading(3, 'Rumus'),
							math(
								'a\\frac{b}{c} = \\frac{(a \\times c) + b}{c}',
							),
							heading(3, 'Contoh'),
							math(
								'2\\frac{3}{5} = \\frac{(2 \\times 5) + 3}{5} = \\frac{13}{5}',
							),
							p(
								'Cara baca: Kalikan bilangan bulat (2) dengan penyebut (5) = 10. Lalu tambahkan pembilang (3). Hasilnya 13. Penyebutnya tetap 5.',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan konversi pecahan campuran ke pecahan biasa (improper fraction). ' +
							'Rumus: a b/c = (a×c + b)/c. Contoh: 2 3/5 = (2×5+3)/5 = 13/5. ' +
							'Ini penting sebagai langkah awal operasi penjumlahan/pengurangan pecahan campuran.',
						questions: [
							{
								learningObjective:
									'Siswa dapat mengubah pecahan campuran ke biasa.',
								questionUi: doc(
									p(
										'Ubahlah pecahan campuran berikut ke pecahan biasa:',
									),
									math('3\\frac{1}{4}'),
								),
								questionLlmContext: '3 1/4 = (3×4+1)/4 = 13/4.',
								evaluationParameters: {
									expected_answer_keywords: [
										'13/4',
										'tiga belas per empat',
									],
									common_misconceptions: [
										'31/4',
										'3/4',
										'4/13',
									],
									strictness_level: 'moderate',
								},
								answers: { pecahan_biasa: '13/4' },
							},
							{
								learningObjective:
									'Konversi pecahan campuran lainnya.',
								questionUi: doc(
									p('Ubahlah ke pecahan biasa:'),
									math('1\\frac{5}{6}'),
								),
								questionLlmContext: '1 5/6 = (1×6+5)/6 = 11/6.',
								evaluationParameters: {
									expected_answer_keywords: ['11/6'],
									common_misconceptions: ['15/6', '6/11'],
									strictness_level: 'moderate',
								},
								answers: { pecahan_biasa: '11/6' },
							},
						],
					},
					{
						title: 'Penjumlahan Pecahan Campuran',
						order: 2,
						difficulty: 2,
						content: doc(
							heading(2, 'Penjumlahan Pecahan Campuran'),
							p('Ada dua cara menjumlahkan pecahan campuran:'),
							heading(3, 'Cara 1: Ubah ke Pecahan Biasa'),
							orderedList(
								'Ubah semua pecahan campuran ke pecahan biasa',
								'Samakan penyebut jika perlu',
								'Jumlahkan',
								'Ubah kembali ke pecahan campuran',
							),
							heading(3, 'Contoh'),
							math('1\\frac{1}{3} + 2\\frac{1}{2}'),
							bulletList(
								'1 1/3 = 4/3, 2 1/2 = 5/2',
								'KPK(3, 2) = 6',
								'4/3 = 8/6, 5/2 = 15/6',
								'8/6 + 15/6 = 23/6 = 3 5/6',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan penjumlahan pecahan campuran. ' +
							'Cara: ubah ke pecahan biasa → samakan penyebut → jumlahkan → ubah kembali ke campuran. ' +
							'Contoh: 1 1/3 + 2 1/2 = 4/3 + 5/2 = 8/6 + 15/6 = 23/6 = 3 5/6.',
						questions: [
							{
								learningObjective:
									'Siswa dapat menjumlahkan pecahan campuran.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'1\\frac{1}{4} + 2\\frac{1}{4} = \\ldots',
									),
								),
								questionLlmContext:
									'1 1/4 + 2 1/4. Penyebut sama: (1+2) dan (1/4 + 1/4) = 3 2/4 = 3 1/2.',
								evaluationParameters: {
									expected_answer_keywords: [
										'3 2/4',
										'3 1/2',
									],
									common_misconceptions: ['3 2/8', '4 1/4'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '3 1/2' },
							},
							{
								learningObjective:
									'Penjumlahan pecahan campuran penyebut berbeda.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'2\\frac{1}{3} + 1\\frac{1}{2} = \\ldots',
									),
								),
								questionLlmContext:
									'2 1/3 + 1 1/2 = 7/3 + 3/2. KPK(3,2)=6. 14/6+9/6 = 23/6 = 3 5/6.',
								evaluationParameters: {
									expected_answer_keywords: ['3 5/6', '23/6'],
									common_misconceptions: ['3 2/5', '4 1/6'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '3 5/6' },
							},
						],
					},
					{
						title: 'Pengurangan Pecahan Campuran',
						order: 3,
						difficulty: 2,
						content: doc(
							heading(2, 'Pengurangan Pecahan Campuran'),
							p(
								'Langkahnya sama: ubah ke pecahan biasa, samakan penyebut, kurangkan.',
							),
							heading(3, 'Contoh'),
							math('3\\frac{1}{2} - 1\\frac{2}{3}'),
							bulletList(
								'3 1/2 = 7/2, 1 2/3 = 5/3',
								'KPK(2, 3) = 6',
								'7/2 = 21/6, 5/3 = 10/6',
								'21/6 - 10/6 = 11/6 = 1 5/6',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan pengurangan pecahan campuran. ' +
							'Cara: ubah ke pecahan biasa → samakan penyebut → kurangkan → ubah ke campuran. ' +
							'Contoh: 3 1/2 - 1 2/3 = 7/2 - 5/3 = 21/6 - 10/6 = 11/6 = 1 5/6.',
						questions: [
							{
								learningObjective:
									'Siswa dapat mengurangkan pecahan campuran.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'3\\frac{3}{4} - 1\\frac{1}{4} = \\ldots',
									),
								),
								questionLlmContext:
									'3 3/4 - 1 1/4. Penyebut sama: (3-1) dan (3/4-1/4) = 2 2/4 = 2 1/2.',
								evaluationParameters: {
									expected_answer_keywords: [
										'2 2/4',
										'2 1/2',
									],
									common_misconceptions: ['2 4/8', '4 2/4'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '2 1/2' },
							},
							{
								learningObjective:
									'Pengurangan campuran penyebut berbeda.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'4\\frac{1}{2} - 2\\frac{1}{3} = \\ldots',
									),
								),
								questionLlmContext:
									'4 1/2 - 2 1/3 = 9/2 - 7/3 = 27/6 - 14/6 = 13/6 = 2 1/6.',
								evaluationParameters: {
									expected_answer_keywords: ['2 1/6', '13/6'],
									common_misconceptions: ['2 0/1', '2 2/5'],
									strictness_level: 'moderate',
								},
								answers: { hasil: '2 1/6' },
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
								'Latihan untuk menguji pemahaman siswa tentang Penjumlahan dan Pengurangan Pecahan Campuran.',
							),
						),
						materialLlmContext:
							'Latihan ini menguji pemahaman siswa terhadap seluruh materi pada subtopik Penjumlahan dan Pengurangan Pecahan Campuran. ' +
							'Soal latihan menggabungkan konsep-konsep yang telah dipelajari pada materi sebelumnya.',
						questions: [
							{
								learningObjective: 'Konversi bolak-balik.',
								questionUi: doc(
									p(
										bold('Pertanyaan: '),
										'Ubahlah 17/5 menjadi pecahan campuran, lalu ubahlah kembali ke pecahan biasa untuk memastikan jawabanmu benar!',
									),
								),
								questionLlmContext:
									'17/5: 17÷5 = 3 sisa 2 → 3 2/5. Cek: (3×5+2)/5 = 17/5. ✓',
								evaluationParameters: {
									expected_answer_keywords: ['3 2/5', '17/5'],
									common_misconceptions: ['3 1/5', '2 3/5'],
									strictness_level: 'moderate',
								},
								answers: { campuran: '3 2/5', biasa: '17/5' },
							},
							{
								learningObjective:
									'Soal cerita penjumlahan pecahan campuran.',
								questionUi: doc(
									p(
										'Pagi hari ibu membuat ',
										bold('1 1/2'),
										' liter jus. Sore hari membuat lagi ',
										bold('2 1/4'),
										' liter.',
									),
									p(
										bold('Pertanyaan: '),
										'Berapa total jus yang dibuat ibu?',
									),
								),
								questionLlmContext:
									'1 1/2 + 2 1/4 = 3/2 + 9/4 = 6/4 + 9/4 = 15/4 = 3 3/4 liter.',
								evaluationParameters: {
									expected_answer_keywords: ['3 3/4', '15/4'],
									common_misconceptions: ['3 2/6', '3 1/2'],
									strictness_level: 'moderate',
								},
								answers: { total: '3 3/4 liter' },
							},
							{
								learningObjective:
									'Soal cerita pengurangan campuran.',
								questionUi: doc(
									p(
										'Sebuah tali panjangnya ',
										bold('5 1/3'),
										' meter. Dipotong ',
										bold('2 1/2'),
										' meter.',
									),
									p(
										bold('Pertanyaan: '),
										'Berapa meter sisa tali?',
									),
								),
								questionLlmContext:
									'5 1/3 - 2 1/2 = 16/3 - 5/2 = 32/6 - 15/6 = 17/6 = 2 5/6 meter.',
								evaluationParameters: {
									expected_answer_keywords: ['2 5/6', '17/6'],
									common_misconceptions: ['3 0/1', '3 1/6'],
									strictness_level: 'moderate',
								},
								answers: { sisa: '2 5/6 meter' },
							},
						],
					},
				],
			},
		],
	};
