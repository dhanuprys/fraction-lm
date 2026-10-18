import {
	bold,
	bulletList,
	diagram,
	doc,
	heading,
	math,
	orderedList,
	p,
} from './helpers';

export const topic2 =
	// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  TOPIC 2  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	{
		name: 'Membandingkan dan Mengurutkan Pecahan',
		slug: 'membandingkan-mengurutkan-pecahan',
		description:
			'Mempelajari cara membandingkan dua pecahan dan mengurutkan beberapa pecahan, baik yang berpenyebut sama maupun berbeda.',
		order: 2,
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
					// ───────────────────────── POST-TEST AKHIR (isExerciseOnly) ─────────────────────────
					{
						title: 'Post-Test: Pecahan Senilai dan Membandingkan Pecahan',
						order: 4,
						difficulty: 2,
						isExerciseOnly: true,
						content: doc(
							heading(
								2,
								'Post-Test: Pecahan Senilai dan Membandingkan Pecahan',
							),
							p(
								'Latihan ini menguji pemahaman kamu tentang pecahan senilai, simbol perbandingan (>, <, =), dan cara membandingkan pecahan.',
							),
						),
						materialLlmContext:
							'Post-test akhir yang mencakup: pecahan senilai (equivalent fractions), ' +
							'simbol perbandingan > < =, membandingkan pecahan berpenyebut sama, ' +
							'membandingkan pecahan berpembilang sama, dan membandingkan pecahan berpenyebut berbeda. ' +
							'Diadaptasi dari Aktivitas 2.1–2.10 buku Pecahan Senilai dan Membandingkan Pecahan.',
						questions: [
							// ─── Q1: Notasi matematika "lebih besar dari" (Akt. 2.2) ───
							{
								learningObjective:
									'Siswa dapat menuliskan perbandingan pecahan dalam notasi matematika menggunakan simbol >.',
								questionType: 'fraction_comparison',
								questionUi: doc(
									p(
										'Tuliskan dalam bentuk notasi matematika singkat. Pilih simbol yang tepat ',
										bold('( > , < , = )'),
										' untuk setiap pasangan pecahan berikut:',
									),
								),
								answerConfig: {
									items: [
										{
											prompt: '$\\frac{3}{6}$ menggambarkan bagian yang lebih besar daripada $\\frac{3}{8}$',
											leftFraction: '3/6',
											rightFraction: '3/8',
										},
										{
											prompt: '$\\frac{3}{4}$ menggambarkan bagian yang lebih besar daripada $\\frac{1}{4}$',
											leftFraction: '3/4',
											rightFraction: '1/4',
										},
										{
											prompt: '$\\frac{1}{2}$ menggambarkan bagian yang lebih besar daripada $\\frac{1}{4}$',
											leftFraction: '1/2',
											rightFraction: '1/4',
										},
										{
											prompt: '$\\frac{4}{6}$ menggambarkan bagian yang lebih besar daripada $\\frac{1}{6}$',
											leftFraction: '4/6',
											rightFraction: '1/6',
										},
									],
								},
								questionLlmContext:
									'Siswa menuliskan notasi matematika dari perbandingan verbal "lebih besar dari". ' +
									'Semua jawaban menggunakan simbol >: ' +
									'$\\frac{3}{6} > \\frac{3}{8}$, $\\frac{3}{4} > \\frac{1}{4}$, $\\frac{1}{2} > \\frac{1}{4}$, $\\frac{4}{6} > \\frac{1}{6}$.',
								evaluationParameters: {
									expected_answer_keywords: [
										'>',
										'\\frac{3}{6} > \\frac{3}{8}',
										'3/6 > 3/8',
										'\\frac{3}{4} > \\frac{1}{4}',
										'3/4 > 1/4',
										'\\frac{1}{2} > \\frac{1}{4}',
										'1/2 > 1/4',
										'\\frac{4}{6} > \\frac{1}{6}',
										'4/6 > 1/6',
									],
									expected_operators: ['>', '>', '>', '>'],
									common_misconceptions: [
										'Menggunakan < padahal soal mengatakan "lebih besar"',
										'Menukar posisi pecahan',
									],
									strictness_level: 'strict',
									hints: [
										'Perhatikan kata "lebih besar daripada". Simbol apa yang digunakan untuk "lebih besar"?',
										'Simbol > artinya "lebih besar dari".',
									],
								},
								answers: {
									operators: ['>', '>', '>', '>'],
								},
							},

							// ─── Q2: Notasi matematika "lebih kecil dari" (Akt. 2.3) ───
							{
								learningObjective:
									'Siswa dapat menuliskan perbandingan pecahan dalam notasi matematika menggunakan simbol <.',
								questionType: 'fraction_comparison',
								questionUi: doc(
									p(
										'Tuliskan dalam bentuk notasi singkat matematika. Pilih simbol yang tepat ',
										bold('( > , < , = )'),
										' untuk setiap pasangan pecahan berikut:',
									),
								),
								answerConfig: {
									items: [
										{
											prompt: '$\\frac{3}{6}$ menggambarkan bagian yang lebih kecil daripada $\\frac{5}{6}$',
											leftFraction: '3/6',
											rightFraction: '5/6',
										},
										{
											prompt: '$\\frac{2}{4}$ menggambarkan bagian yang lebih kecil daripada $\\frac{3}{4}$',
											leftFraction: '2/4',
											rightFraction: '3/4',
										},
										{
											prompt: '$\\frac{1}{2}$ menggambarkan bagian yang lebih kecil daripada $\\frac{3}{4}$',
											leftFraction: '1/2',
											rightFraction: '3/4',
										},
										{
											prompt: '$\\frac{4}{6}$ menggambarkan bagian yang lebih kecil daripada $\\frac{5}{6}$',
											leftFraction: '4/6',
											rightFraction: '5/6',
										},
									],
								},
								questionLlmContext:
									'Siswa menuliskan notasi matematika dari perbandingan verbal "lebih kecil dari". ' +
									'Semua jawaban menggunakan simbol <: ' +
									'$\\frac{3}{6} < \\frac{5}{6}$, $\\frac{2}{4} < \\frac{3}{4}$, $\\frac{1}{2} < \\frac{3}{4}$, $\\frac{4}{6} < \\frac{5}{6}$.',
								evaluationParameters: {
									expected_answer_keywords: [
										'<',
										'\\frac{3}{6} < \\frac{5}{6}',
										'3/6 < 5/6',
										'\\frac{2}{4} < \\frac{3}{4}',
										'2/4 < 3/4',
										'\\frac{1}{2} < \\frac{3}{4}',
										'1/2 < 3/4',
										'\\frac{4}{6} < \\frac{5}{6}',
										'4/6 < 5/6',
									],
									expected_operators: ['<', '<', '<', '<'],
									common_misconceptions: [
										'Menggunakan > padahal soal mengatakan "lebih kecil"',
										'Bingung antara > dan <',
									],
									strictness_level: 'strict',
									hints: [
										'Perhatikan kata "lebih kecil daripada". Simbol apa yang digunakan untuk "lebih kecil"?',
										'Simbol < artinya "lebih kecil dari". Bentuknya menunjuk ke yang lebih kecil.',
									],
								},
								answers: {
									operators: ['<', '<', '<', '<'],
								},
							},

							// ─── Q3: Pecahan senilai — isi pembilang (Akt. 2.4) ────────
							{
								learningObjective:
									'Siswa dapat menentukan pecahan senilai dengan melengkapi pembilang yang hilang.',
								questionType: 'fraction_input',
								questionUi: doc(
									p(
										'Pada gambar berikut, sebuah bidang dibagi menjadi 12 bagian yang sama besar. Setiap 2 kotak mewakili $\\frac{1}{6}$ dari bidang tersebut.',
									),
									diagram({
										diagramType: 'rectangle',
										totalParts: 12,
										shadedParts: [0, 1],
										rows: 3,
										cols: 4,
									}),
									p(
										'Lengkapilah pecahan senilai:',
									),
									math('\\frac{1}{6} = \\frac{\\square}{12}'),
								),
								answerConfig: {
									fields: [
										{
											prompt: '$\\frac{1}{6} = \\frac{\\square}{12}$',
											prefilled: { denominator: 12 },
										},
									],
								},
								questionLlmContext:
									'Pecahan senilai: $\\frac{1}{6} = \\frac{2}{12}$. Bidang 3×4 = 12 kotak. $\\frac{1}{6}$ artinya 2 kotak dari 12. ' +
									'Pembilang yang dicari: 2.',
								evaluationParameters: {
									expected_answer_keywords: ['2', '\\frac{2}{12}', '2/12'],
									common_misconceptions: [
										'Menjawab 1 karena 1/6 hanya melihat pembilang asli',
										'Menjawab 6 karena bingung pembilang dan penyebut',
									],
									strictness_level: 'strict',
									hints: [
										'Dari 1/6 ke ?/12, penyebut dikali berapa? 6 × ? = 12.',
										'Jika penyebut dikali 2, pembilang juga harus dikali 2.',
									],
								},
								answers: { numerator: 2 },
							},

							// ─── Q4: Tabel Benar/Salah — perbandingan pecahan (Akt. 2.6) ──
							{
								learningObjective:
									'Siswa dapat menentukan kebenaran pernyataan perbandingan pecahan.',
								questionType: 'true_false_table',
								questionUi: doc(
									p(
										bold('Berilah tanda centang!'),
										' Tentukan apakah pernyataan berikut ',
										bold('Benar'),
										' atau ',
										bold('Salah'),
										':',
									),
								),
								answerConfig: {
									statements: [
										'$\\frac{3}{6}$ lebih besar dari $\\frac{3}{8}$',
										'$\\frac{1}{3}$ lebih besar dari $\\frac{1}{4}$',
										'$\\frac{1}{2}$ lebih besar dari $\\frac{1}{3}$',
										'$\\frac{1}{2}$ sama dengan $\\frac{2}{4}$',
										'$\\frac{3}{5}$ lebih besar dari $\\frac{3}{4}$',
										'$\\frac{7}{8}$ lebih besar dari $\\frac{8}{9}$',
									],
								},
								questionLlmContext:
									'Tabel Benar/Salah untuk 6 pernyataan perbandingan pecahan: ' +
									'(a) $\\frac{3}{6} > \\frac{3}{8}$ → BENAR (pembilang sama, penyebut 6 < 8 → potongan lebih besar). ' +
									'(b) $\\frac{1}{3} > \\frac{1}{4}$ → BENAR (pembilang sama, penyebut 3 < 4 → potongan lebih besar). ' +
									'(c) $\\frac{1}{2} > \\frac{1}{3}$ → BENAR (pembilang sama, penyebut 2 < 3). ' +
									'(d) $\\frac{1}{2} = \\frac{2}{4}$ → BENAR (pecahan senilai: $\\frac{1}{2} = \\frac{2}{4}$). ' +
									'(e) $\\frac{3}{5} > \\frac{3}{4}$ → SALAH (pembilang sama, penyebut 5 > 4 → potongan lebih kecil, jadi $\\frac{3}{5} < \\frac{3}{4}$). ' +
									'(f) $\\frac{7}{8} > \\frac{8}{9}$ → SALAH ($\\frac{7}{8} = \\frac{63}{72}$, $\\frac{8}{9} = \\frac{64}{72}$, jadi $\\frac{7}{8} < \\frac{8}{9}$).',
								evaluationParameters: {
									expected_answer_keywords: [
										'Benar',
										'Benar',
										'Benar',
										'Benar',
										'Salah',
										'Salah',
									],
									expected_row_answers: [
										true,
										true,
										true,
										true,
										false,
										false,
									],
									common_misconceptions: [
										'Menganggap 3/5 > 3/4 karena 5 > 4 (salah, penyebut lebih besar = potongan lebih kecil)',
										'Menganggap 7/8 > 8/9 tanpa menyamakan penyebut',
									],
									strictness_level: 'strict',
									hints: [
										'Untuk pecahan dengan pembilang sama, semakin besar penyebut berarti potongannya semakin kecil.',
										'Pecahan senilai berarti memiliki nilai yang sama, misalnya 1/2 = 2/4.',
									],
								},
								answers: {
									row_answers: [
										true,
										true,
										true,
										true,
										false,
										false,
									],
								},
							},

							// ─── Q5: Penalaran terbuka — Elsa vs Irfan (Akt. 2.5) ─────
							{
								learningObjective:
									'Siswa dapat bernalar tentang informasi yang dibutuhkan untuk menentukan bagian pecahan.',
								questionType: 'short_answer',
								questionUi: doc(
									p(
										bold('Elsa'),
										' berkata: "Jika saya mengetahui berapa banyak potong pizza yang dimakan oleh seseorang, maka saya juga dapat menentukan seberapa besar bagiannya."',
									),
									p(
										bold('Irfan'),
										' berkata: "Saya tidak percaya itu. Untuk melakukan hal tersebut, kamu membutuhkan informasi tentang menjadi berapa banyak potongan pizza yang telah dipotong."',
									),
									p(
										bold('Pertanyaan: '),
										'Siapa yang benar? Jelaskan jawabanmu!',
									),
								),
								questionLlmContext:
									'Irfan yang benar. Untuk menentukan pecahan (bagian dari keseluruhan), ' +
									'kita perlu mengetahui DUA hal: (1) berapa potong yang dimakan (pembilang), dan ' +
									'(2) menjadi berapa bagian pizza dipotong (penyebut). ' +
									'Contoh: makan 2 potong dari pizza yang dipotong 4 = $\\frac{2}{4} = \\frac{1}{2}$, ' +
									'tetapi 2 potong dari pizza yang dipotong 8 = $\\frac{2}{8} = \\frac{1}{4}$. ' +
									'Tanpa tahu total potongan, kita tidak bisa tentukan besarnya bagian.',
								evaluationParameters: {
									expected_answer_keywords: [
										'Irfan',
										'benar',
										'berapa bagian',
										'penyebut',
										'total potongan',
										'dipotong',
									],
									common_misconceptions: [
										'Menjawab Elsa karena hanya fokus pada jumlah yang dimakan',
										'Tidak bisa menjelaskan mengapa jumlah potongan total penting',
									],
									strictness_level: 'lenient',
									hints: [
										'Bayangkan kamu makan 2 potong. Apakah 2 potong dari pizza yang dipotong 4 sama besarnya dengan 2 potong dari pizza yang dipotong 8?',
										'Pecahan membutuhkan pembilang (yang dimakan) DAN penyebut (total potongan).',
									],
								},
								answers: {
									jawaban: 'Irfan',
									alasan: 'Kita perlu tahu berapa total potongan (penyebut) untuk menentukan besar bagian pecahan.',
								},
							},

							// ─── Q6: Bandingkan pasangan pecahan — penyebut sama (Akt. 2.8) ──
							{
								learningObjective:
									'Siswa dapat membandingkan pecahan berpenyebut sama menggunakan simbol matematika.',
								questionType: 'fraction_comparison',
								questionUi: doc(
									p(
										'Urutkan pecahan-pecahan tersebut sesuai dengan besar nilainya. Pilih simbol yang tepat ',
										bold('( > , < , = )'),
										':',
									),
								),
								answerConfig: {
									items: [
										{
											prompt: 'Bandingkan $\\frac{3}{17}$ dan $\\frac{15}{17}$ (penyebut sama)',
											leftFraction: '3/17',
											rightFraction: '15/17',
										},
										{
											prompt: 'Bandingkan $\\frac{10}{12}$ dan $\\frac{6}{12}$ (penyebut sama)',
											leftFraction: '10/12',
											rightFraction: '6/12',
										},
										{
											prompt: 'Bandingkan $\\frac{13}{25}$ dan $\\frac{15}{25}$ (penyebut sama)',
											leftFraction: '13/25',
											rightFraction: '15/25',
										},
									],
								},
								questionLlmContext:
									'Membandingkan pecahan berpenyebut sama: cukup bandingkan pembilang. ' +
									'$\\frac{3}{17} < \\frac{15}{17}$ (3 < 15). $\\frac{10}{12} > \\frac{6}{12}$ (10 > 6). $\\frac{13}{25} < \\frac{15}{25}$ (13 < 15). ' +
									'Catatan: soal asli menulis 15/257 tetapi diperbaiki ke 15/25 agar penyebut sama.',
								evaluationParameters: {
									expected_answer_keywords: [
										'\\frac{3}{17} < \\frac{15}{17}',
										'3/17 < 15/17',
										'\\frac{10}{12} > \\frac{6}{12}',
										'10/12 > 6/12',
										'\\frac{13}{25} < \\frac{15}{25}',
										'13/25 < 15/25',
									],
									expected_operators: ['<', '>', '<'],
									common_misconceptions: [
										'Membandingkan penyebut padahal penyebutnya sudah sama',
									],
									strictness_level: 'strict',
									hints: [
										'Jika penyebutnya sama, cukup bandingkan pembilangnya.',
										'Pecahan dengan pembilang lebih besar adalah pecahan yang lebih besar.',
									],
								},
								answers: { operators: ['<', '>', '<'] },
							},

							// ─── Q7: Bandingkan pasangan — pembilang sama (Akt. 2.10 pilihan) ──
							{
								learningObjective:
									'Siswa dapat membandingkan pecahan berpembilang sama dengan memperhatikan penyebut.',
								questionType: 'fraction_comparison',
								questionUi: doc(
									p(
										'Bandingkan dan tentukan mana yang lebih besar. Pilih simbol yang tepat ',
										bold('( > , < , = )'),
										':',
									),
								),
								answerConfig: {
									items: [
										{
											prompt: 'Bandingkan $\\frac{2}{4}$ dan $\\frac{2}{8}$',
											leftFraction: '2/4',
											rightFraction: '2/8',
										},
										{
											prompt: 'Bandingkan $\\frac{4}{6}$ dan $\\frac{4}{11}$',
											leftFraction: '4/6',
											rightFraction: '4/11',
										},
										{
											prompt: 'Bandingkan $\\frac{5}{9}$ dan $\\frac{5}{12}$',
											leftFraction: '5/9',
											rightFraction: '5/12',
										},
										{
											prompt: 'Bandingkan $\\frac{6}{8}$ dan $\\frac{6}{10}$',
											leftFraction: '6/8',
											rightFraction: '6/10',
										},
										{
											prompt: 'Bandingkan $\\frac{7}{12}$ dan $\\frac{7}{15}$',
											leftFraction: '7/12',
											rightFraction: '7/15',
										},
										{
											prompt: 'Bandingkan $\\frac{3}{7}$ dan $\\frac{3}{10}$',
											leftFraction: '3/7',
											rightFraction: '3/10',
										},
									],
								},
								questionLlmContext:
									'Membandingkan pecahan berpembilang sama: penyebut lebih besar = potongan lebih kecil. ' +
									'$\\frac{2}{4} > \\frac{2}{8}$. $\\frac{4}{6} > \\frac{4}{11}$. $\\frac{5}{9} > \\frac{5}{12}$. $\\frac{6}{8} > \\frac{6}{10}$. $\\frac{7}{12} > \\frac{7}{15}$. $\\frac{3}{7} > \\frac{3}{10}$.',
								evaluationParameters: {
									expected_answer_keywords: [
										'\\frac{2}{4} > \\frac{2}{8}',
										'2/4 > 2/8',
										'\\frac{4}{6} > \\frac{4}{11}',
										'4/6 > 4/11',
										'\\frac{5}{9} > \\frac{5}{12}',
										'5/9 > 5/12',
										'\\frac{6}{8} > \\frac{6}{10}',
										'6/8 > 6/10',
										'\\frac{7}{12} > \\frac{7}{15}',
										'7/12 > 7/15',
										'\\frac{3}{7} > \\frac{3}{10}',
										'3/7 > 3/10',
									],
									expected_operators: [
										'>',
										'>',
										'>',
										'>',
										'>',
										'>',
									],
									common_misconceptions: [
										'Menjawab < karena mengira penyebut besar berarti pecahan besar',
									],
									strictness_level: 'strict',
									hints: [
										'Pembilangnya sama. Perhatikan penyebutnya.',
										'Semakin besar penyebut, semakin banyak potongan, semakin kecil setiap potongannya.',
									],
								},
								answers: {
									operators: ['>', '>', '>', '>', '>', '>'],
								},
							},

							// ─── Q8: Urutkan pecahan /100 (Akt. 2.7c) ──────────────────
							{
								learningObjective:
									'Siswa dapat mengurutkan pecahan berpenyebut sama dari yang terkecil hingga terbesar.',
								questionType: 'fraction_ordering',
								questionUi: doc(
									p(
										'Aktivitas 2.7c: Urutkan pecahan-pecahan berikut dari yang ',
										bold('terkecil hingga terbesar'),
										'. Gunakan simbol matematika yang sesuai:',
									),
									math(
										'\\frac{17}{100} \\quad \\frac{65}{100} \\quad \\frac{15}{100} \\quad \\frac{39}{100}',
									),
								),
								answerConfig: {
									items: ['17/100', '65/100', '15/100', '39/100'],
									separator: '<',
									instruction:
										'Urutkan kartu pecahan berikut dari yang terkecil hingga terbesar:',
								},
								questionLlmContext:
									'Aktivitas 2.7c: Siswa mengurutkan pecahan berpenyebut sama (100) dari terkecil ke terbesar. ' +
									'Pecahan awal yang ditampilkan: $\\frac{17}{100}$, $\\frac{65}{100}$, $\\frac{15}{100}$, $\\frac{39}{100}$. ' +
									'Urutan pembilang dari terkecil: 15 < 17 < 39 < 65. ' +
									'Jawaban benar: $\\frac{15}{100} < \\frac{17}{100} < \\frac{39}{100} < \\frac{65}{100}$.',
								evaluationParameters: {
									expected_answer_keywords: [
										'\\frac{15}{100} < \\frac{17}{100} < \\frac{39}{100} < \\frac{65}{100}',
										'15/100 < 17/100 < 39/100 < 65/100',
										'\\frac{15}{100}',
										'15/100',
										'\\frac{17}{100}',
										'17/100',
										'\\frac{39}{100}',
										'39/100',
										'\\frac{65}{100}',
										'65/100',
										'<',
									],
									common_misconceptions: [
										'Mengurutkan dari besar ke kecil (terbalik)',
										'Salah membandingkan pembilang',
									],
									strictness_level: 'strict',
									hints: [
										'Penyebut semua pecahan adalah 100 (sama). Bandingkan pembilangnya: 17, 65, 15, 39.',
										'Urutan pembilang dari yang paling kecil adalah 15, 17, 39, 65.',
										'Gunakan simbol < (lebih kecil dari), contoh: 15/100 < 17/100 < ...',
									],
								},
								answers: {
									urutan: '15/100 < 17/100 < 39/100 < 65/100',
									expected_order: ['15/100', '17/100', '39/100', '65/100'],
								},
							},
						],
					},
				],
			},
		],
	};
