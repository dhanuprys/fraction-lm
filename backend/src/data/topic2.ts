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
	// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  TOPIC 2 (Topik 4)  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	{
		name: 'Penjumlahan dan Pengurangan Bilangan Pecahan',
		slug: 'penjumlahan-pengurangan-bilangan-pecahan',
		description:
			'Mempelajari cara menjumlahkan dan mengurangkan bilangan pecahan, baik yang berpenyebut sama maupun berpenyebut berbeda.',
		order: 4,
		subTopics: [
			// ═══════════════════ SUB-TOPIK 4.1 ═══════════════════
			{
				name: 'Penjumlahan Bilangan Pecahan',
				slug: 'penjumlahan-bilangan-pecahan',
				description:
					'Menjumlahkan pecahan yang berpenyebut sama maupun berbeda.',
				order: 1,
				materials: [
					{
						title: 'Penjumlahan Bilangan Pecahan Berpenyebut Sama',
						order: 1,
						difficulty: 1,
						content: doc(
							heading(2, 'Penjumlahan Pecahan Berpenyebut Sama'),
							p(
								'Jika dua pecahan memiliki ',
								bold('penyebut yang sama'),
								', kita cukup ',
								bold('menjumlahkan pembilangnya'),
								'. Penyebutnya tetap.',
							),
							math(
								'\\frac{a}{c} + \\frac{b}{c} = \\frac{a + b}{c}',
							),
							heading(3, 'Contoh'),
							p(
								'Ayah makan 2 potong dan Ibu makan 3 potong dari kue yang dipotong menjadi 7 bagian sama besar:',
							),
							p(
								'🟩🟩⬜⬜⬜⬜⬜ + ⬜⬜🟨🟨🟨⬜⬜ = 🟩🟩🟨🟨🟨⬜⬜',
							),
							math(
								'\\frac{2}{7} + \\frac{3}{7} = \\frac{2 + 3}{7} = \\frac{5}{7}',
							),
							p(
								bold('Ingat: '),
								'Penyebutnya TIDAK dijumlahkan. Hasilnya bukan 5/14!',
							),
							heading(3, 'Jika Hasilnya Lebih dari 1'),
							p(
								'Kadang pembilang hasilnya lebih besar dari penyebut. Itu artinya hasilnya lebih dari 1 utuh.',
							),
							math(
								'\\frac{4}{5} + \\frac{3}{5} = \\frac{7}{5} = 1\\frac{2}{5}',
							),
							p(
								'7/5 berarti 5/5 (satu utuh) ditambah 2/5 lagi, sehingga ditulis 1 2/5.',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan penjumlahan pecahan berpenyebut sama untuk siswa SD. ' +
							'Rumus: a/c + b/c = (a+b)/c. Penyebut tetap, pembilang dijumlahkan. Contoh: 2/7 + 3/7 = 5/7. ' +
							'Kesalahan umum: ikut menjumlahkan penyebut (5/14). ' +
							'Jika hasil pembilang > penyebut, hasil lebih dari 1; contoh 4/5 + 3/5 = 7/5 = 1 2/5 (7/5 = 5/5 + 2/5). ' +
							'Jawaban 7/5 maupun 1 2/5 sama-sama benar.',
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
										'5/12 (ikut menjumlahkan penyebut)',
									],
									strictness_level: 'moderate',
									hints: [
										'Penyebutnya sudah sama, yaitu 6. Penyebut tidak berubah.',
										'Jumlahkan saja pembilangnya: 1 + 4.',
									],
								},
								answers: { hasil: '5/6' },
							},
							{
								learningObjective:
									'Siswa dapat menjumlahkan pecahan berpenyebut sama dengan hasil lebih dari 1.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'\\frac{5}{6} + \\frac{4}{6} = \\ldots',
									),
									p(
										'Hasilnya boleh ditulis sebagai pecahan biasa atau pecahan campuran.',
									),
								),
								questionLlmContext:
									'5/6 + 4/6 = 9/6 = 1 3/6 (= 1 1/2). Terima 9/6, 1 3/6, atau 1 1/2.',
								evaluationParameters: {
									expected_answer_keywords: [
										'9/6',
										'1 3/6',
										'1 1/2',
									],
									common_misconceptions: [
										'9/12 (ikut menjumlahkan penyebut)',
									],
									strictness_level: 'moderate',
								},
								answers: { hasil: '9/6', campuran: '1 3/6' },
							},
						],
					},
					{
						title: 'Penjumlahan Bilangan Pecahan Berpenyebut Berbeda',
						order: 2,
						difficulty: 2,
						content: doc(
							heading(
								2,
								'Penjumlahan Pecahan Berpenyebut Berbeda',
							),
							p(
								'Pecahan hanya bisa dijumlahkan jika ',
								bold('penyebutnya sama'),
								'. Jika berbeda, samakan dulu penyebutnya menggunakan ',
								bold('KPK'),
								' (Kelipatan Persekutuan Terkecil).',
							),
							heading(3, 'Langkah-langkah'),
							orderedList(
								'Cari KPK dari kedua penyebut',
								'Ubah kedua pecahan agar penyebutnya sama dengan KPK',
								'Jumlahkan pembilangnya, penyebut tetap',
							),
							heading(3, 'Contoh'),
							math('\\frac{1}{3} + \\frac{1}{4}'),
							bulletList(
								'KPK dari 3 dan 4 adalah 12',
								'1/3 = 4/12 (kalikan atas dan bawah dengan 4)',
								'1/4 = 3/12 (kalikan atas dan bawah dengan 3)',
								'4/12 + 3/12 = 7/12',
							),
							p(
								bold('Ingat: '),
								'Jangan langsung menjumlahkan pembilang dan penyebut. 1/3 + 1/4 bukan 2/7!',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan penjumlahan pecahan berpenyebut berbeda. ' +
							'Langkah: (1) cari KPK penyebut, (2) ubah ke penyebut yang sama dengan mengalikan pembilang dan penyebut dengan bilangan yang sama, (3) jumlahkan pembilang. ' +
							'Contoh: 1/3 + 1/4 → KPK(3,4)=12 → 4/12 + 3/12 = 7/12. ' +
							'Kesalahan umum: menjumlahkan pembilang dengan pembilang dan penyebut dengan penyebut (2/7).',
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
									'1/2 + 1/3. KPK(2,3)=6. 1/2=3/6, 1/3=2/6. Hasil 5/6.',
								evaluationParameters: {
									expected_answer_keywords: [
										'5/6',
										'lima per enam',
									],
									common_misconceptions: [
										'2/5 (menjumlahkan pembilang dan penyebut langsung)',
									],
									strictness_level: 'moderate',
									hints: [
										'Penyebutnya berbeda (2 dan 3). Samakan dulu.',
										'Cari KPK dari 2 dan 3. Kelipatan 2: 2, 4, 6. Kelipatan 3: 3, 6.',
										'Ubah keduanya menjadi penyebut 6, lalu jumlahkan pembilangnya.',
									],
								},
								answers: { hasil: '5/6' },
							},
							{
								learningObjective:
									'Siswa dapat menunjukkan langkah menyamakan penyebut saat menjumlahkan.',
								questionUi: doc(
									p(
										'Hitunglah dengan menunjukkan langkah-langkahnya:',
									),
									math(
										'\\frac{2}{5} + \\frac{1}{3} = \\ldots',
									),
								),
								questionLlmContext:
									'2/5 + 1/3. KPK(5,3)=15. 2/5=6/15, 1/3=5/15. Hasil 11/15.',
								evaluationParameters: {
									expected_answer_keywords: [
										'11/15',
										'KPK',
										'15',
										'6/15',
										'5/15',
									],
									common_misconceptions: [
										'3/8 (menjumlahkan pembilang dan penyebut langsung)',
									],
									strictness_level: 'moderate',
								},
								answers: { hasil: '11/15' },
							},
						],
					},
					{
						title: 'LATIHAN',
						order: 3,
						difficulty: 2,
						content: doc(
							heading(2, 'LATIHAN'),
							p(
								'Latihan untuk menguji pemahaman siswa tentang penjumlahan pecahan berpenyebut sama maupun berbeda.',
							),
						),
						materialLlmContext:
							'Latihan ini menguji pemahaman siswa terhadap seluruh materi pada subtopik Penjumlahan Bilangan Pecahan: ' +
							'penjumlahan berpenyebut sama (termasuk hasil > 1) dan berpenyebut berbeda (menggunakan KPK).',
						questions: [
							{
								learningObjective:
									'Siswa menerapkan penjumlahan pecahan berpenyebut sama dalam soal cerita.',
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
								questionLlmContext: '2/5 + 1/5 = 3/5 botol.',
								evaluationParameters: {
									expected_answer_keywords: [
										'3/5',
										'tiga per lima',
									],
									common_misconceptions: [
										'3/10 (ikut menjumlahkan penyebut)',
									],
									strictness_level: 'moderate',
									hints: [
										'Penyebutnya sudah sama, jadi tinggal jumlahkan pembilangnya.',
										'2 + 1 = ? Penyebutnya tetap 5.',
									],
								},
								answers: { total: '3/5 botol' },
							},
							{
								learningObjective:
									'Siswa menjumlahkan pecahan berpenyebut sama dengan hasil lebih dari 1.',
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
									'5/8 + 6/8 = 11/8 = 1 3/8 liter. Terima 11/8 atau 1 3/8.',
								evaluationParameters: {
									expected_answer_keywords: ['11/8', '1 3/8'],
									common_misconceptions: [
										'11/16 (ikut menjumlahkan penyebut)',
									],
									strictness_level: 'moderate',
								},
								answers: {
									total: '11/8 liter',
									campuran: '1 3/8 liter',
								},
							},
							{
								learningObjective:
									'Siswa menerapkan penjumlahan pecahan berpenyebut berbeda dalam soal cerita.',
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
									'1/4 + 1/3. KPK(4,3)=12. 3/12 + 4/12 = 7/12 km.',
								evaluationParameters: {
									expected_answer_keywords: [
										'7/12',
										'tujuh per dua belas',
									],
									common_misconceptions: [
										'2/7 (menjumlahkan pembilang dan penyebut langsung)',
									],
									strictness_level: 'moderate',
									hints: [
										'Penyebutnya berbeda (4 dan 3). Samakan dulu dengan KPK.',
										'KPK dari 4 dan 3 adalah 12.',
										'1/4 = 3/12 dan 1/3 = 4/12. Sekarang jumlahkan.',
									],
								},
								answers: { total: '7/12 km' },
							},
							{
								learningObjective:
									'Siswa dapat menemukan kesalahan dalam penjumlahan pecahan.',
								questionUi: doc(
									p('Dani mengerjakan soal berikut:'),
									math(
										'\\frac{1}{3} + \\frac{1}{3} = \\frac{2}{6}',
									),
									p(
										bold('Pertanyaan: '),
										'Apakah jawaban Dani benar? Jelaskan, lalu tuliskan jawaban yang benar!',
									),
								),
								questionLlmContext:
									'Dani salah karena ikut menjumlahkan penyebut (3+3=6). Seharusnya penyebut tetap: 1/3 + 1/3 = 2/3. ' +
									'Siswa harus menyatakan jawaban salah, menjelaskan bahwa penyebut tidak dijumlahkan, dan menulis 2/3.',
								evaluationParameters: {
									expected_answer_keywords: [
										'salah',
										'2/3',
										'penyebut',
										'tetap',
									],
									common_misconceptions: [
										'Menjawab benar karena 3 + 3 = 6',
										'Menjawab salah tanpa alasan atau jawaban benar',
									],
									strictness_level: 'lenient',
								},
								answers: {
									benar: false,
									jawaban_benar: '2/3',
									alasan: 'Penyebut tidak dijumlahkan, hanya pembilang',
								},
							},
						],
					},
				],
			},

			// ═══════════════════ SUB-TOPIK 4.2 ═══════════════════
			{
				name: 'Pengurangan Bilangan Pecahan',
				slug: 'pengurangan-bilangan-pecahan',
				description:
					'Mengurangkan pecahan yang berpenyebut sama maupun berbeda.',
				order: 2,
				materials: [
					{
						title: 'Pengurangan Bilangan Pecahan Berpenyebut Sama',
						order: 1,
						difficulty: 1,
						content: doc(
							heading(2, 'Pengurangan Pecahan Berpenyebut Sama'),
							p(
								'Sama seperti penjumlahan, jika penyebutnya sama kita cukup ',
								bold('mengurangkan pembilangnya'),
								'. Penyebutnya tetap.',
							),
							math(
								'\\frac{a}{c} - \\frac{b}{c} = \\frac{a - b}{c}',
							),
							heading(3, 'Contoh'),
							p(
								'Ada 5 dari 9 bagian cokelat. Lalu 2 bagian dimakan:',
							),
							p('🟫🟫🟫🟫🟫⬜⬜⬜⬜ → 🟫🟫🟫⬜⬜⬜⬜⬜⬜'),
							math(
								'\\frac{5}{9} - \\frac{2}{9} = \\frac{5 - 2}{9} = \\frac{3}{9}',
							),
							p(
								bold('Ingat: '),
								'Penyebutnya tidak dikurangkan. Hasilnya bukan 3/0!',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan pengurangan pecahan berpenyebut sama. ' +
							'Rumus: a/c - b/c = (a-b)/c. Penyebut tetap, pembilang dikurangkan. Contoh: 5/9 - 2/9 = 3/9. ' +
							'Kesalahan umum: ikut mengurangkan penyebut (menghasilkan penyebut 0). ' +
							'Hasil seperti 3/9 sudah benar; tidak wajib disederhanakan.',
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
								questionLlmContext:
									'7/10 - 3/10 = 4/10. Boleh juga disederhanakan menjadi 2/5.',
								evaluationParameters: {
									expected_answer_keywords: ['4/10', '2/5'],
									common_misconceptions: [
										'4/0 (ikut mengurangkan penyebut)',
									],
									strictness_level: 'moderate',
									hints: [
										'Penyebutnya sudah sama (10) dan tidak berubah.',
										'Kurangkan pembilangnya: 7 - 3.',
									],
								},
								answers: { hasil: '4/10', sederhana: '2/5' },
							},
							{
								learningObjective:
									'Siswa dapat mengurangkan pecahan berpenyebut sama dengan benar.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'\\frac{6}{8} - \\frac{2}{8} = \\ldots',
									),
								),
								questionLlmContext:
									'6/8 - 2/8 = 4/8. Boleh juga disederhanakan menjadi 1/2.',
								evaluationParameters: {
									expected_answer_keywords: ['4/8', '1/2'],
									common_misconceptions: [
										'4/0 (ikut mengurangkan penyebut)',
									],
									strictness_level: 'moderate',
								},
								answers: { hasil: '4/8', sederhana: '1/2' },
							},
						],
					},
					{
						title: 'Pengurangan Bilangan Pecahan Berpenyebut Berbeda',
						order: 2,
						difficulty: 2,
						content: doc(
							heading(
								2,
								'Pengurangan Pecahan Berpenyebut Berbeda',
							),
							p(
								'Langkahnya sama seperti penjumlahan: ',
								bold('samakan penyebut dulu'),
								' menggunakan KPK, baru kurangkan pembilangnya.',
							),
							heading(3, 'Langkah-langkah'),
							orderedList(
								'Cari KPK dari kedua penyebut',
								'Ubah kedua pecahan agar penyebutnya sama dengan KPK',
								'Kurangkan pembilangnya, penyebut tetap',
							),
							heading(3, 'Contoh'),
							math('\\frac{3}{4} - \\frac{1}{3}'),
							bulletList(
								'KPK dari 4 dan 3 adalah 12',
								'3/4 = 9/12',
								'1/3 = 4/12',
								'9/12 - 4/12 = 5/12',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan pengurangan pecahan berpenyebut berbeda. ' +
							'Langkah: cari KPK, samakan penyebut, kurangkan pembilang. ' +
							'Contoh: 3/4 - 1/3 → KPK(4,3)=12 → 9/12 - 4/12 = 5/12. ' +
							'Kesalahan umum: mengurangkan pembilang dengan pembilang dan penyebut dengan penyebut tanpa menyamakan penyebut.',
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
									'3/4 - 1/2. KPK(4,2)=4. 1/2 = 2/4. 3/4 - 2/4 = 1/4.',
								evaluationParameters: {
									expected_answer_keywords: [
										'1/4',
										'seperempat',
									],
									common_misconceptions: [
										'2/2 (mengurangkan pembilang dan penyebut langsung)',
									],
									strictness_level: 'moderate',
									hints: [
										'Penyebutnya berbeda (4 dan 2). Samakan dulu.',
										'Ubah 1/2 menjadi pecahan berpenyebut 4.',
									],
								},
								answers: { hasil: '1/4' },
							},
							{
								learningObjective:
									'Siswa dapat menunjukkan langkah lengkap pengurangan pecahan berpenyebut berbeda.',
								questionUi: doc(
									p('Hitunglah dan tunjukkan langkahnya:'),
									math(
										'\\frac{5}{6} - \\frac{1}{4} = \\ldots',
									),
								),
								questionLlmContext:
									'5/6 - 1/4. KPK(6,4)=12. 5/6 = 10/12, 1/4 = 3/12. 10/12 - 3/12 = 7/12.',
								evaluationParameters: {
									expected_answer_keywords: [
										'7/12',
										'KPK',
										'12',
										'10/12',
										'3/12',
									],
									common_misconceptions: [
										'4/2 (mengurangkan pembilang dan penyebut langsung)',
									],
									strictness_level: 'moderate',
								},
								answers: { hasil: '7/12' },
							},
						],
					},
					{
						title: 'LATIHAN',
						order: 3,
						difficulty: 2,
						content: doc(
							heading(2, 'LATIHAN'),
							p(
								'Latihan untuk menguji pemahaman siswa tentang pengurangan pecahan berpenyebut sama maupun berbeda.',
							),
						),
						materialLlmContext:
							'Latihan ini menguji pemahaman siswa terhadap seluruh materi pada subtopik Pengurangan Bilangan Pecahan: ' +
							'pengurangan berpenyebut sama dan berpenyebut berbeda (menggunakan KPK).',
						questions: [
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
									p(
										bold('Pertanyaan: '),
										'Berapa sisa gula ibu?',
									),
								),
								questionLlmContext:
									'5/6 - 2/6 = 3/6 kg (boleh 1/2 kg).',
								evaluationParameters: {
									expected_answer_keywords: ['3/6', '1/2'],
									common_misconceptions: [
										'3/0 (ikut mengurangkan penyebut)',
									],
									strictness_level: 'moderate',
									hints: [
										'Kata "sisa" berarti dikurangi.',
										'Penyebutnya sama, kurangkan saja pembilangnya: 5 - 2.',
									],
								},
								answers: { sisa: '3/6 kg' },
							},
							{
								learningObjective:
									'Siswa dapat mengurangkan pecahan berpenyebut sama.',
								questionUi: doc(
									p('Hitunglah:'),
									math(
										'\\frac{7}{8} - \\frac{3}{8} = \\ldots',
									),
								),
								questionLlmContext:
									'7/8 - 3/8 = 4/8 (boleh 1/2).',
								evaluationParameters: {
									expected_answer_keywords: ['4/8', '1/2'],
									common_misconceptions: [
										'4/0 (ikut mengurangkan penyebut)',
									],
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
									p(
										bold('Pertanyaan: '),
										'Berapa sisa tali kakak?',
									),
								),
								questionLlmContext:
									'2/3 - 1/4. KPK(3,4)=12. 8/12 - 3/12 = 5/12 meter.',
								evaluationParameters: {
									expected_answer_keywords: [
										'5/12',
										'lima per dua belas',
									],
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
									math(
										'\\frac{5}{7} - \\frac{2}{7} = \\frac{3}{0}',
									),
									p(
										bold('Pertanyaan: '),
										'Apakah jawaban Eko benar? Jelaskan, lalu tuliskan jawaban yang benar!',
									),
								),
								questionLlmContext:
									'Eko salah karena ikut mengurangkan penyebut (7-7=0). Penyebut tetap, jawaban benar 3/7.',
								evaluationParameters: {
									expected_answer_keywords: [
										'salah',
										'3/7',
										'penyebut',
										'tetap',
									],
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
						],
					},
				],
			},
		],
	};
