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
		name: 'Membandingkan dan Mengurutkan Pecahan',
		slug: 'membandingkan-mengurutkan-pecahan',
		description:
			'Mempelajari cara membandingkan dua pecahan dan mengurutkan beberapa pecahan, baik yang berpenyebut sama maupun berbeda.',
		order: 3,
		subTopics: [
			// ═══════════════════ SUB-TOPIK 3.1 ═══════════════════
			{
				name: 'Membandingkan Dua Pecahan',
				slug: 'membandingkan-dua-pecahan',
				description:
					'Menentukan mana yang lebih besar, lebih kecil, atau sama di antara dua pecahan.',
				order: 1,
				materials: [
					{
						title: 'Pengertian Membandingkan Pecahan',
						order: 1,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, 'Apa Itu Membandingkan Pecahan?'),
							p(
								'Membandingkan pecahan artinya menentukan pecahan mana yang ',
								bold('lebih besar'),
								', ',
								bold('lebih kecil'),
								', atau apakah keduanya ',
								bold('sama'),
								'.',
							),
							heading(3, 'Simbol Perbandingan'),
							bulletList(
								'> artinya "lebih besar dari"',
								'< artinya "lebih kecil dari"',
								'= artinya "sama dengan"',
							),
							p(
								bold('Tips: '),
								'Mulut simbol selalu terbuka ke arah bilangan yang lebih besar.',
							),
							heading(3, 'Contoh dengan Gambar'),
							p('Dua cokelat yang sama besar:'),
							p('1/2 → 🟫🟫⬜⬜'),
							p('3/4 → 🟫🟫🟫⬜'),
							p('Bagian berwarna 3/4 lebih banyak daripada 1/2.'),
							math('\\frac{1}{2} < \\frac{3}{4}'),
							p(
								'Ada tiga cara membandingkan pecahan, tergantung penyebut dan pembilangnya. Kita akan mempelajarinya satu per satu.',
							),
						),
						materialLlmContext:
							'Materi ini memperkenalkan pengertian membandingkan pecahan untuk siswa SD: menentukan pecahan yang lebih besar, lebih kecil, atau sama. ' +
							'Simbol: > (lebih besar dari), < (lebih kecil dari), = (sama dengan). Mulut simbol terbuka ke arah bilangan yang lebih besar. ' +
							'Contoh visual: 1/2 < 3/4.',
						questions: [],
					},
					{
						title: 'Membandingkan Pecahan dengan Penyebut Sama',
						order: 2,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, 'Penyebut Sama'),
							p(
								'Jika dua pecahan memiliki ',
								bold('penyebut yang sama'),
								', bandingkan saja ',
								bold('pembilangnya'),
								'. Pembilang lebih besar berarti pecahan lebih besar.',
							),
							heading(3, 'Contoh'),
							p('3/5 → 🟩🟩🟩⬜⬜'),
							p('2/5 → 🟩🟩⬜⬜⬜'),
							math('\\frac{3}{5} > \\frac{2}{5}'),
							p('Karena penyebutnya sama (5) dan 3 > 2.'),
						),
						materialLlmContext:
							'Materi ini mengajarkan membandingkan pecahan berpenyebut sama. ' +
							'Jika penyebut sama, bandingkan pembilang: pembilang lebih besar = pecahan lebih besar. ' +
							'Contoh: 3/5 > 2/5 karena 3 > 2.',
						questions: [],
					},
					{
						title: 'Membandingkan Pecahan dengan Pembilang Sama',
						order: 3,
						difficulty: 2,
						isExerciseOnly: false,
						content: doc(
							heading(2, 'Pembilang Sama'),
							p(
								'Jika dua pecahan memiliki ',
								bold('pembilang yang sama'),
								', bandingkan ',
								bold('penyebutnya'),
								'. Caranya terbalik dari sebelumnya: ',
								bold(
									'penyebut lebih besar berarti pecahan lebih kecil',
								),
								'.',
							),
							heading(3, 'Mengapa?'),
							p(
								'Semakin banyak potongan yang dibuat, semakin kecil tiap potongannya. Perhatikan dua kue yang sama besar:',
							),
							p('1/3 → 🟩⬜⬜ (potongan besar)'),
							p('1/6 → 🟩⬜⬜⬜⬜⬜ (potongan kecil)'),
							math('\\frac{1}{3} > \\frac{1}{6}'),
							heading(3, 'Contoh'),
							math('\\frac{3}{4} > \\frac{3}{8}'),
							p(
								'Pembilangnya sama (3). Penyebut 4 lebih kecil dari 8, jadi 3/4 lebih besar.',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan membandingkan pecahan berpembilang sama. ' +
							'Jika pembilang sama, bandingkan penyebut: penyebut lebih besar → pecahan lebih kecil (potongan makin banyak, makin kecil). ' +
							'Contoh: 1/3 > 1/6; 3/4 > 3/8.',
						questions: [],
					},
					{
						title: 'Membandingkan Pecahan dengan Penyebut Berbeda',
						order: 4,
						difficulty: 2,
						isExerciseOnly: false,
						content: doc(
							heading(2, 'Penyebut Berbeda'),
							p(
								'Jika pembilang dan penyebutnya sama-sama berbeda, kita ',
								bold('samakan penyebutnya'),
								' terlebih dahulu menggunakan ',
								bold('KPK'),
								' (Kelipatan Persekutuan Terkecil), lalu bandingkan pembilangnya.',
							),
							heading(3, 'Langkah-langkah'),
							orderedList(
								'Cari KPK dari kedua penyebut',
								'Ubah kedua pecahan agar penyebutnya sama dengan KPK, dengan mengalikan pembilang dan penyebut dengan bilangan yang sama',
								'Bandingkan pembilangnya',
							),
							heading(3, 'Contoh'),
							p('Bandingkan 1/3 dan 2/5:'),
							bulletList(
								'KPK dari 3 dan 5 adalah 15',
								'1/3 = 5/15 (atas dan bawah dikali 5)',
								'2/5 = 6/15 (atas dan bawah dikali 3)',
								'5/15 < 6/15, jadi 1/3 < 2/5',
							),
							p(
								bold('Hati-hati: '),
								'Jangan langsung membandingkan pembilangnya sebelum penyebutnya sama!',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan membandingkan pecahan berpenyebut berbeda. ' +
							'Langkah: (1) cari KPK penyebut, (2) ubah pecahan ke penyebut KPK dengan mengalikan pembilang dan penyebut dengan bilangan yang sama (pecahan senilai), (3) bandingkan pembilang. ' +
							'Contoh: 1/3 vs 2/5 → KPK=15 → 5/15 vs 6/15 → 1/3 < 2/5.',
						questions: [],
					},
					{
						title: 'Post-Test: Membandingkan Pecahan',
						order: 5,
						difficulty: 2,
						isExerciseOnly: true,
						content: doc(
							heading(2, 'Post-Test: Membandingkan Pecahan'),
							p(
								'Latihan untuk menguji pemahaman siswa tentang membandingkan dua pecahan: penyebut sama, pembilang sama, dan penyebut berbeda.',
							),
						),
						materialLlmContext:
							'Latihan ini menguji pemahaman siswa terhadap seluruh materi pada subtopik Membandingkan Dua Pecahan: ' +
							'pengertian dan simbol perbandingan, penyebut sama, pembilang sama, dan penyebut berbeda (KPK).',
						questions: [
							{
								learningObjective:
									'Siswa dapat membandingkan pecahan berpenyebut sama dalam soal cerita.',
								questionUi: doc(
									p(
										'Andi makan ',
										bold('2/6'),
										' bagian pizza. Budi makan ',
										bold('4/6'),
										' bagian pizza yang sama.',
									),
									p(
										bold('Pertanyaan: '),
										'Siapa yang makan lebih banyak? Jelaskan alasanmu!',
									),
								),
								questionLlmContext:
									'2/6 vs 4/6, penyebut sama. 4 > 2, jadi Budi makan lebih banyak.',
								evaluationParameters: {
									expected_answer_keywords: [
										'Budi',
										'lebih banyak',
										'4/6',
										'lebih besar',
									],
									common_misconceptions: [
										'Menjawab Andi karena tertukar pembilang dan penyebut',
									],
									strictness_level: 'lenient',
								},
								answers: { jawaban: 'Budi' },
							},
							{
								learningObjective:
									'Siswa dapat membandingkan pecahan berpembilang sama.',
								questionUi: doc(
									p(
										'Bandingkan kedua pecahan berikut dengan simbol >, <, atau =.',
									),
									math(
										'\\frac{3}{8} \\quad \\square \\quad \\frac{3}{5}',
									),
								),
								questionLlmContext:
									'Pembilang sama (3). Penyebut 8 > 5, sehingga 3/8 lebih kecil. Jawaban: 3/8 < 3/5.',
								evaluationParameters: {
									expected_answer_keywords: [
										'<',
										'lebih kecil',
									],
									common_misconceptions: [
										'Menulis > karena 8 lebih besar dari 5',
									],
									strictness_level: 'moderate',
									hints: [
										'Pembilangnya sama (3). Perhatikan penyebutnya.',
										'Semakin besar penyebut, semakin kecil potongannya.',
									],
								},
								answers: { simbol: '<' },
							},
							{
								learningObjective:
									'Siswa dapat menemukan kesalahan dalam membandingkan pecahan berpembilang sama.',
								questionUi: doc(
									p(
										'Dina berkata, ',
										bold(
											'"1/6 lebih besar dari 1/4 karena 6 lebih besar dari 4."',
										),
									),
									p(
										bold('Pertanyaan: '),
										'Apakah Dina benar? Jelaskan!',
									),
								),
								questionLlmContext:
									'Dina salah. Pembilang sama (1), penyebut lebih besar berarti potongan lebih kecil. Jadi 1/6 < 1/4. ' +
									'Siswa harus menyatakan Dina salah dan menjelaskan bahwa potongan makin banyak berarti makin kecil.',
								evaluationParameters: {
									expected_answer_keywords: [
										'salah',
										'1/4',
										'lebih besar',
										'potongan',
										'penyebut',
									],
									common_misconceptions: [
										'Menjawab Dina benar',
									],
									strictness_level: 'lenient',
								},
								answers: {
									benar: false,
									jawaban_benar: '1/6 < 1/4',
								},
							},
							{
								learningObjective:
									'Siswa dapat membandingkan pecahan berpenyebut berbeda.',
								questionUi: doc(
									p('Bandingkan kedua pecahan berikut:'),
									math(
										'\\frac{2}{3} \\quad \\square \\quad \\frac{3}{5}',
									),
								),
								questionLlmContext:
									'2/3 vs 3/5. KPK(3,5)=15. 2/3 = 10/15, 3/5 = 9/15. 10/15 > 9/15, jadi 2/3 > 3/5.',
								evaluationParameters: {
									expected_answer_keywords: [
										'>',
										'lebih besar',
										'10/15',
										'9/15',
									],
									common_misconceptions: [
										'Menulis < karena 2 < 3',
										'Tidak menyamakan penyebut',
									],
									strictness_level: 'moderate',
									hints: [
										'Penyebutnya berbeda (3 dan 5). Samakan dulu.',
										'KPK dari 3 dan 5 adalah 15.',
										'Ubah 2/3 dan 3/5 menjadi pecahan berpenyebut 15, lalu bandingkan pembilangnya.',
									],
								},
								answers: { simbol: '>' },
							},
							{
								learningObjective:
									'Siswa dapat menerapkan perbandingan pecahan berpenyebut berbeda dalam soal cerita.',
								questionUi: doc(
									p(
										'Rina minum ',
										bold('2/5'),
										' botol susu. Dina minum ',
										bold('1/2'),
										' botol susu yang sama.',
									),
									p(
										bold('Pertanyaan: '),
										'Siapa yang minum lebih banyak? Jelaskan caramu!',
									),
								),
								questionLlmContext:
									'2/5 vs 1/2. KPK(5,2)=10. 2/5 = 4/10, 1/2 = 5/10. Dina minum lebih banyak.',
								evaluationParameters: {
									expected_answer_keywords: [
										'Dina',
										'lebih banyak',
										'5/10',
										'4/10',
										'KPK',
									],
									common_misconceptions: [
										'Menjawab Rina karena 2 lebih besar dari 1',
										'Tidak menyamakan penyebut',
									],
									strictness_level: 'moderate',
								},
								answers: {
									jawaban: 'Dina',
									alasan: '1/2 = 5/10 > 4/10 = 2/5',
								},
							},
						],
					},
				],
			},

			// ═══════════════════ SUB-TOPIK 3.2 ═══════════════════
			{
				name: 'Mengurutkan Pecahan',
				slug: 'mengurutkan-pecahan',
				description:
					'Mengurutkan tiga pecahan atau lebih dari yang terkecil ke terbesar, atau sebaliknya.',
				order: 2,
				materials: [
					{
						title: 'Pengertian Mengurutkan Pecahan',
						order: 1,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, 'Apa Itu Mengurutkan Pecahan?'),
							p(
								'Mengurutkan pecahan artinya menyusun ',
								bold('tiga pecahan atau lebih'),
								' berdasarkan nilainya. Ada dua jenis urutan:',
							),
							bulletList(
								'Dari terkecil ke terbesar (urutan naik)',
								'Dari terbesar ke terkecil (urutan turun)',
							),
							heading(3, 'Contoh'),
							p('Urutan dari terkecil ke terbesar:'),
							math('\\frac{1}{4} < \\frac{2}{4} < \\frac{3}{4}'),
							p('Urutan dari terbesar ke terkecil:'),
							math('\\frac{3}{4} > \\frac{2}{4} > \\frac{1}{4}'),
							p(
								bold('Ingat: '),
								'Membandingkan pecahan adalah dasar untuk mengurutkan pecahan.',
							),
						),
						materialLlmContext:
							'Materi ini memperkenalkan pengertian mengurutkan pecahan: menyusun tiga pecahan atau lebih berdasarkan nilainya. ' +
							'Urutan naik: dari terkecil ke terbesar. Urutan turun: dari terbesar ke terkecil. ' +
							'Contoh: 1/4 < 2/4 < 3/4.',
						questions: [],
					},
					{
						title: 'Mengurutkan Pecahan dengan Penyebut Sama',
						order: 2,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, 'Mengurutkan Pecahan Berpenyebut Sama'),
							p(
								'Jika penyebutnya sama, cukup urutkan ',
								bold('pembilangnya'),
								'. Penyebutnya tetap.',
							),
							heading(3, 'Contoh'),
							p(
								'Urutkan dari terkecil ke terbesar: 5/8, 2/8, 7/8',
							),
							bulletList(
								'Penyebut sama (8), lihat pembilangnya: 5, 2, 7',
								'Urutan pembilang dari kecil ke besar: 2, 5, 7',
								'Jadi: 2/8, 5/8, 7/8',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan mengurutkan pecahan berpenyebut sama. ' +
							'Cukup urutkan pembilang, penyebut tetap. Contoh: 5/8, 2/8, 7/8 dari terkecil → 2/8, 5/8, 7/8.',
						questions: [],
					},
					{
						title: 'Mengurutkan Pecahan dengan Penyebut Berbeda',
						order: 3,
						difficulty: 2,
						isExerciseOnly: false,
						content: doc(
							heading(
								2,
								'Mengurutkan Pecahan Berpenyebut Berbeda',
							),
							p(
								'Samakan dulu semua penyebutnya menggunakan ',
								bold('KPK'),
								', lalu urutkan pembilangnya.',
							),
							heading(3, 'Langkah-langkah'),
							orderedList(
								'Cari KPK dari semua penyebut',
								'Ubah semua pecahan agar penyebutnya sama dengan KPK',
								'Urutkan pembilangnya sesuai permintaan soal',
								'Tulis kembali dalam bentuk pecahan semula',
							),
							heading(3, 'Contoh'),
							p(
								'Urutkan 1/2, 1/3, 1/4 dari terkecil ke terbesar:',
							),
							bulletList(
								'KPK dari 2, 3, dan 4 adalah 12',
								'1/2 = 6/12, 1/3 = 4/12, 1/4 = 3/12',
								'Urutan pembilang: 3, 4, 6',
								'Jadi: 1/4, 1/3, 1/2',
							),
							p(
								bold('Jalan pintas: '),
								'Jika pembilangnya sama, pecahan dengan penyebut lebih besar nilainya lebih kecil.',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan mengurutkan pecahan berpenyebut berbeda. ' +
							'Langkah: cari KPK semua penyebut, ubah semua pecahan ke penyebut tersebut, urutkan pembilang, tulis kembali pecahan semula. ' +
							'Contoh: 1/2, 1/3, 1/4 → KPK=12 → 6/12, 4/12, 3/12 → urutan naik: 1/4, 1/3, 1/2.',
						questions: [],
					},
					{
						title: 'Post-Test: Mengurutkan Pecahan',
						order: 4,
						difficulty: 2,
						isExerciseOnly: true,
						content: doc(
							heading(2, 'Post-Test: Mengurutkan Pecahan'),
							p(
								'Latihan untuk menguji pemahaman siswa tentang mengurutkan pecahan, baik yang berpenyebut sama maupun berbeda.',
							),
						),
						materialLlmContext:
							'Latihan ini menguji pemahaman siswa terhadap seluruh materi pada subtopik Mengurutkan Pecahan: ' +
							'pengertian urutan naik dan turun, penyebut sama, dan penyebut berbeda (KPK).',
						questions: [
							{
								learningObjective:
									'Siswa dapat mengurutkan pecahan berpenyebut sama dari terbesar.',
								questionUi: doc(
									p(
										'Urutkan dari yang ',
										bold('terbesar'),
										' ke yang ',
										bold('terkecil'),
										':',
									),
									math(
										'\\frac{1}{5}, \\quad \\frac{3}{5}, \\quad \\frac{2}{5}',
									),
								),
								questionLlmContext:
									'Penyebut sama (5). Urutan turun: 3/5, 2/5, 1/5.',
								evaluationParameters: {
									expected_answer_keywords: [
										'3/5',
										'2/5',
										'1/5',
									],
									common_misconceptions: [
										'Mengurutkan dari terkecil (terbalik)',
									],
									strictness_level: 'moderate',
									hints: [
										'Penyebutnya sama (5), jadi lihat pembilangnya.',
										'Mulai dari pembilang yang paling besar.',
									],
								},
								answers: { urutan: ['3/5', '2/5', '1/5'] },
							},
							{
								learningObjective:
									'Siswa dapat mengurutkan pecahan berpenyebut berbeda dari terkecil.',
								questionUi: doc(
									p('Urutkan dari terkecil ke terbesar:'),
									math(
										'\\frac{3}{8}, \\quad \\frac{1}{4}, \\quad \\frac{1}{2}',
									),
								),
								questionLlmContext:
									'KPK(8,4,2)=8. 3/8, 2/8, 4/8. Urutan naik: 1/4, 3/8, 1/2.',
								evaluationParameters: {
									expected_answer_keywords: [
										'1/4',
										'3/8',
										'1/2',
									],
									common_misconceptions: [
										'Membandingkan pembilang saja tanpa menyamakan penyebut',
									],
									strictness_level: 'moderate',
									hints: [
										'Penyebutnya berbeda. Cari KPK dari 8, 4, dan 2.',
										'KPK-nya 8. Ubah 1/4 dan 1/2 menjadi penyebut 8, lalu urutkan pembilangnya.',
									],
								},
								answers: { urutan: ['1/4', '3/8', '1/2'] },
							},
							{
								learningObjective:
									'Siswa dapat mengurutkan pecahan berpembilang sama dengan jalan pintas.',
								questionUi: doc(
									p('Urutkan dari terbesar ke terkecil:'),
									math(
										'\\frac{2}{3}, \\quad \\frac{2}{7}, \\quad \\frac{2}{5}',
									),
								),
								questionLlmContext:
									'Pembilang sama (2). Penyebut kecil → pecahan besar. Urutan turun: 2/3, 2/5, 2/7.',
								evaluationParameters: {
									expected_answer_keywords: [
										'2/3',
										'2/5',
										'2/7',
									],
									common_misconceptions: [
										'Mengurutkan 2/7, 2/5, 2/3 (mengira penyebut besar berarti nilai besar)',
									],
									strictness_level: 'moderate',
									hints: [
										'Pembilangnya sama (2). Perhatikan penyebutnya.',
										'Penyebut yang lebih kecil membuat potongan lebih besar.',
									],
								},
								answers: { urutan: ['2/3', '2/5', '2/7'] },
							},
							{
								learningObjective:
									'Siswa dapat menerapkan pengurutan pecahan dalam soal cerita.',
								questionUi: doc(
									p(
										'Tiga pita masing-masing panjangnya ',
										bold('3/4'),
										' meter, ',
										bold('2/3'),
										' meter, dan ',
										bold('5/6'),
										' meter.',
									),
									p(
										bold('Pertanyaan: '),
										'Urutkan panjang pita dari yang terpendek ke terpanjang!',
									),
								),
								questionLlmContext:
									'KPK(4,3,6)=12. 3/4 = 9/12, 2/3 = 8/12, 5/6 = 10/12. Urutan dari terpendek: 2/3, 3/4, 5/6.',
								evaluationParameters: {
									expected_answer_keywords: [
										'2/3',
										'3/4',
										'5/6',
									],
									common_misconceptions: [
										'Mengurutkan terbalik (dari terpanjang)',
										'Tidak menyamakan penyebut',
									],
									strictness_level: 'moderate',
									hints: [
										'Penyebutnya berbeda (4, 3, 6). Cari KPK-nya.',
										'KPK dari 4, 3, dan 6 adalah 12.',
										'Ubah ketiga pecahan ke penyebut 12, lalu urutkan dari yang terkecil.',
									],
								},
								answers: { urutan: ['2/3', '3/4', '5/6'] },
							},
							{
								learningObjective:
									'Siswa dapat menemukan kesalahan dalam mengurutkan pecahan.',
								questionUi: doc(
									p(
										'Tono mengurutkan pecahan dari terkecil ke terbesar dan menulis: ',
										bold('1/2, 1/3, 1/4'),
										'.',
									),
									p(
										bold('Pertanyaan: '),
										'Apakah urutan Tono benar? Jika salah, tuliskan urutan yang benar!',
									),
								),
								questionLlmContext:
									'Tono salah. Pembilang sama, penyebut besar berarti nilai kecil. Urutan naik yang benar: 1/4, 1/3, 1/2. ' +
									'Tono menyusun dari terbesar ke terkecil.',
								evaluationParameters: {
									expected_answer_keywords: [
										'salah',
										'1/4',
										'1/3',
										'1/2',
									],
									common_misconceptions: [
										'Menjawab benar karena penyebutnya urut dari kecil ke besar',
									],
									strictness_level: 'lenient',
								},
								answers: {
									benar: false,
									urutan_benar: ['1/4', '1/3', '1/2'],
								},
							},
						],
					},
				],
			},
		],
	};
