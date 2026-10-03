import {
	bold,
	bulletList,
	doc,
	heading,
	math,
	orderedList,
	p,
} from './helpers';

export const topic1 =
	// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  TOPIC 1  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	{
		name: 'Pengenalan Pecahan',
		slug: 'pengenalan-pecahan',
		description:
			'Memahami konsep dasar pecahan, membaca dan menulis pecahan, serta mengenal pecahan senilai. Topik ini adalah fondasi untuk seluruh materi pecahan.',
		order: 1,
		subTopics: [
			{
				name: 'Apa Itu Pecahan?',
				slug: 'apa-itu-pecahan',
				description:
					'Mengenal konsep pecahan sebagai bagian dari keseluruhan. Belajar tentang pembilang dan penyebut.',
				order: 1,
				materials: [
					{
						title: 'Memahami Pembilang dan Penyebut',
						order: 1,
						difficulty: 1,
						content: doc(
							heading(2, 'Apa Itu Pecahan?'),
							p(
								'Pecahan adalah cara kita menuliskan ',
								bold('bagian dari keseluruhan'),
								'. Bayangkan kamu punya sebuah kue utuh yang dipotong menjadi beberapa bagian yang sama besar.',
							),
							math('\\frac{a}{b}'),
							p(
								'Dalam pecahan, angka di ',
								bold('atas'),
								' disebut ',
								bold('pembilang'),
								' — yaitu jumlah bagian yang kita ambil. Angka di ',
								bold('bawah'),
								' disebut ',
								bold('penyebut'),
								' — yaitu jumlah semua bagian yang sama besar.',
							),
							heading(3, 'Contoh'),
							p(
								'Jika sebuah pizza dipotong menjadi 4 bagian yang sama, dan kamu mengambil 1 potong, maka kamu memiliki:',
							),
							math('\\frac{1}{4}'),
							bulletList(
								'Pembilang = 1 (satu potong yang kamu ambil)',
								'Penyebut = 4 (total ada 4 potong)',
							),
						),
						materialLlmContext:
							'Materi ini membahas definisi dasar pecahan (fraction) untuk siswa SD kelas 3. ' +
							'Pecahan ditulis sebagai a/b dimana "a" adalah pembilang (numerator) dan "b" adalah penyebut (denominator). ' +
							'Pembilang menunjukkan berapa bagian yang diambil, penyebut menunjukkan total bagian yang sama besar. ' +
							'Contoh: 1/4 berarti satu bagian dari empat bagian yang sama besar. ' +
							'Siswa harus bisa mengidentifikasi pembilang dan penyebut dari sebuah pecahan yang diberikan.',
						questions: [],
					},
					{
						title: 'Membaca dan Menulis Pecahan',
						order: 2,
						difficulty: 1,
						content: doc(
							heading(2, 'Cara Membaca Pecahan'),
							p(
								'Setiap pecahan memiliki cara baca yang khusus. Kita membaca pembilang terlebih dahulu, lalu kata ',
								bold('"per"'),
								', kemudian penyebut.',
							),
							heading(3, 'Contoh Cara Membaca'),
							bulletList(
								'1/2 dibaca "satu per dua" atau "setengah"',
								'1/3 dibaca "sepertiga"',
								'1/4 dibaca "seperempat"',
								'2/5 dibaca "dua per lima"',
								'3/7 dibaca "tiga per tujuh"',
							),
							heading(3, 'Pecahan dengan Nama Khusus'),
							p(
								'Beberapa pecahan memiliki nama khusus yang sering digunakan sehari-hari:',
							),
							bulletList(
								'1/2 = setengah',
								'1/3 = sepertiga',
								'1/4 = seperempat',
								'3/4 = tiga perempat',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan cara membaca pecahan dalam Bahasa Indonesia. ' +
							'Pecahan dibaca: [pembilang] per [penyebut]. Contoh: 3/7 dibaca "tiga per tujuh". ' +
							'Pecahan khusus: 1/2 = setengah, 1/3 = sepertiga, 1/4 = seperempat, 3/4 = tiga perempat. ' +
							'Siswa diharapkan bisa membaca pecahan dengan benar dan mengenali nama-nama khusus pecahan.',
						questions: [
							{
								learningObjective:
									'Siswa dapat membaca pecahan dengan benar.',
								questionUi: doc(
									p(
										'Bagaimana cara membaca pecahan berikut?',
									),
									math('\\frac{5}{8}'),
								),
								questionLlmContext:
									'Siswa diminta membaca pecahan 5/8. Jawaban yang benar: "lima per delapan".',
								evaluationParameters: {
									expected_answer_keywords: [
										'lima per delapan',
										'lima perdelapan',
										'5 per 8',
									],
									common_misconceptions: [
										'Membaca "delapan per lima" (terbalik)',
										'Membaca "lima bagi delapan"',
									],
									strictness_level: 'lenient',
								},
								answers: { cara_baca: 'lima per delapan' },
							},

							{
								learningObjective:
									'Siswa dapat menuliskan pecahan dari cara bacanya.',
								questionUi: doc(
									p(
										'Tuliskan pecahan yang dibaca ',
										bold('"tiga per tujuh"'),
										'!',
									),
								),
								questionLlmContext:
									'Siswa diminta menuliskan pecahan dari cara baca "tiga per tujuh". Jawaban benar: 3/7.',
								evaluationParameters: {
									expected_answer_keywords: [
										'3/7',
										'3 per 7',
									],
									common_misconceptions: [
										'Menulis 7/3 (terbalik)',
										'Menulis 37 (tanpa garis pecahan)',
									],
									strictness_level: 'lenient',
								},
								answers: { pecahan: '3/7' },
							},
						],
					},
					{
						title: 'Pecahan Senilai',
						order: 3,
						difficulty: 2,
						content: doc(
							heading(2, 'Pecahan Senilai'),
							p(
								'Pecahan senilai adalah pecahan-pecahan yang memiliki ',
								bold('nilai yang sama'),
								' meskipun pembilang dan penyebutnya berbeda.',
							),
							heading(3, 'Contoh'),
							math(
								'\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6} = \\frac{4}{8}',
							),
							p(
								'Semua pecahan di atas bernilai sama, yaitu setengah. Kita mendapatkannya dengan ',
								bold('mengalikan'),
								' atau ',
								bold('membagi'),
								' pembilang dan penyebut dengan bilangan yang sama.',
							),
							heading(3, 'Cara Menemukan Pecahan Senilai'),
							orderedList(
								'Kalikan pembilang dan penyebut dengan bilangan yang sama',
								'Atau bagi pembilang dan penyebut dengan bilangan yang sama',
								'Pastikan bilangan pengali/pembagi sama untuk atas dan bawah!',
							),
							heading(3, 'Contoh Mencari Pecahan Senilai'),
							math(
								'\\frac{2}{3} = \\frac{2 \\times 2}{3 \\times 2} = \\frac{4}{6}',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan konsep pecahan senilai (equivalent fractions). ' +
							'Pecahan senilai adalah pecahan yang nilainya sama meskipun pembilang dan penyebutnya berbeda. ' +
							'Contoh: 1/2 = 2/4 = 3/6 = 4/8. ' +
							'Cara menemukan pecahan senilai: kalikan atau bagi pembilang dan penyebut dengan bilangan yang sama. ' +
							'Contoh: 2/3 × 2/2 = 4/6. Ini disebut "mengalikan dengan bentuk 1". ' +
							'Siswa harus bisa menemukan pecahan senilai dari pecahan yang diberikan.',
						questions: [
							{
								learningObjective:
									'Siswa dapat menemukan pecahan senilai.',
								questionUi: doc(
									p('Carilah pecahan yang senilai dengan:'),
									math('\\frac{1}{3}'),
									p(
										bold('Petunjuk: '),
										'Kalikan pembilang dan penyebut dengan bilangan yang sama!',
									),
								),
								questionLlmContext:
									'Siswa diminta mencari pecahan senilai dengan 1/3. ' +
									'Jawaban yang diterima: 2/6, 3/9, 4/12, atau pecahan lain yang senilai dengan 1/3. ' +
									'Caranya: kalikan pembilang dan penyebut dengan bilangan yang sama (misal ×2 → 2/6, ×3 → 3/9).',
								evaluationParameters: {
									expected_answer_keywords: [
										'2/6',
										'3/9',
										'4/12',
										'5/15',
									],
									common_misconceptions: [
										'Hanya mengalikan pembilang saja tanpa penyebut',
										'Menambah 1 ke pembilang dan penyebut (1+1)/(3+1) = 2/4 — salah',
									],
									strictness_level: 'moderate',
								},
								answers: {
									contoh_jawaban: ['2/6', '3/9', '4/12'],
								},
							},

							{
								learningObjective:
									'Siswa dapat menentukan apakah dua pecahan senilai.',
								questionUi: doc(
									p(
										bold('Pertanyaan: '),
										'Apakah pecahan berikut senilai? Jelaskan alasanmu!',
									),
									math(
										'\\frac{2}{5} \\quad \\text{dan} \\quad \\frac{4}{10}',
									),
								),
								questionLlmContext:
									'Siswa diminta menentukan apakah 2/5 dan 4/10 senilai. ' +
									'Jawaban: Ya, senilai. Karena 2/5 × 2/2 = 4/10. ' +
									'Atau bisa juga dijelaskan bahwa 4/10 disederhanakan: 4÷2 / 10÷2 = 2/5.',
								evaluationParameters: {
									expected_answer_keywords: [
										'ya',
										'senilai',
										'sama',
										'dikali 2',
										'×2',
									],
									common_misconceptions: [
										'Menjawab tidak senilai karena angkanya berbeda',
										'Menjawab ya tanpa penjelasan',
									],
									strictness_level: 'moderate',
								},
								answers: {
									senilai: true,
									alasan: '2/5 × 2/2 = 4/10',
								},
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
							'Latihan ini menguji pemahaman siswa terhadap seluruh materi pada subtopik Apa Itu Pecahan?. ' +
							'Soal latihan menggabungkan konsep-konsep yang telah dipelajari pada materi sebelumnya.',
						questions: [
							{
								learningObjective:
									'Siswa dapat mengidentifikasi pembilang dan penyebut dari sebuah pecahan.',
								questionUi: doc(
									p('Perhatikan pecahan berikut:'),
									math('\\frac{3}{5}'),
									p(
										bold('Pertanyaan: '),
										'Berapakah pembilang dan penyebut dari pecahan tersebut?',
									),
								),
								questionLlmContext:
									'Soal ini meminta siswa mengidentifikasi pembilang dan penyebut dari pecahan 3/5. ' +
									'Jawaban yang benar: pembilang = 3, penyebut = 5. ' +
									'Pembilang adalah angka di atas garis pecahan (numerator), penyebut adalah angka di bawah garis pecahan (denominator).',
								evaluationParameters: {
									expected_answer_keywords: [
										'pembilang',
										'3',
										'penyebut',
										'5',
									],
									common_misconceptions: [
										'Menukar posisi pembilang dan penyebut',
										'Menyebut pembilang sebagai penyebut dan sebaliknya',
									],
									strictness_level: 'lenient',
									hints: [
										'Coba perhatikan angkanya, ada angka 3 di atas dan angka 5 di bawah garis pecahan.',
										'Ingat, angka yang di atas namanya pembilang, dan yang di bawah namanya penyebut.',
										'Jadi pembilangnya adalah 3. Kalau begitu, penyebutnya angka berapa?',
									],
								},
								answers: {
									pembilang: 3,
									penyebut: 5,
								},
							},

							{
								learningObjective:
									'Siswa dapat menuliskan pecahan berdasarkan gambar atau deskripsi situasi.',
								questionUi: doc(
									p(
										'Sebuah cokelat batangan dibagi menjadi ',
										bold('8 bagian yang sama besar'),
										'. Adik memakan ',
										bold('3 bagian'),
										'.',
									),
									p(
										bold('Pertanyaan: '),
										'Tuliskan pecahan yang menunjukkan bagian cokelat yang dimakan Adik!',
									),
								),
								questionLlmContext:
									'Soal ini meminta siswa menuliskan pecahan dari deskripsi situasi nyata. ' +
									'Cokelat dibagi 8 bagian sama besar, 3 bagian dimakan. ' +
									'Jawaban yang benar: 3/8. Pembilang = 3 (bagian yang dimakan), penyebut = 8 (total bagian).',
								evaluationParameters: {
									expected_answer_keywords: [
										'3/8',
										'tiga per delapan',
										'3 per 8',
									],
									common_misconceptions: [
										'Menulis 8/3 (membalik posisi)',
										'Menulis 3/5 (menghitung sisa bukan total)',
									],
									strictness_level: 'lenient',
									hints: [
										'Ada 8 potong cokelat semuanya. Adik memakan 3 potong.',
										'Pecahan itu adalah (bagian yang dimakan) per (jumlah seluruh bagian).',
										'Bagian yang dimakan itu jadi pembilang (angka atas). Berarti pembilangnya 3.',
										'Nah, pembilangnya 3 dan total semua cokelatnya 8. Gimana bentuk pecahannya?',
									],
								},
								answers: {
									pecahan: '3/8',
									pembilang: 3,
									penyebut: 8,
								},
							},
							{
								learningObjective:
									'Siswa dapat menjelaskan arti sebuah pecahan dalam konteks kehidupan nyata.',
								questionUi: doc(
									p(
										'Ibu memotong semangka menjadi ',
										bold('6 bagian yang sama besar'),
										'.',
									),
									p(
										'Kakak mengambil ',
										bold('2 bagian'),
										'.',
									),
									p(
										bold('Pertanyaan: '),
										'Apa arti pecahan 2/6 dalam cerita ini? Jelaskan dengan kata-katamu sendiri!',
									),
								),
								questionLlmContext:
									'Soal ini meminta siswa menjelaskan makna pecahan 2/6 dalam konteks cerita. ' +
									'Jawaban yang diharapkan: 2/6 berarti kakak mengambil 2 bagian dari total 6 bagian semangka yang sama besar. ' +
									'Siswa harus menunjukkan pemahaman bahwa pembilang (2) adalah bagian yang diambil dan penyebut (6) adalah total bagian.',
								evaluationParameters: {
									expected_answer_keywords: [
										'2 bagian',
										'6 bagian',
										'diambil',
										'total',
										'sama besar',
									],
									common_misconceptions: [
										'Menyebut 2/6 sebagai "dua kali enam"',
										'Tidak memahami bahwa bagian harus sama besar',
									],
									strictness_level: 'lenient',
								},
								answers: {
									penjelasan:
										'2/6 berarti kakak mengambil 2 bagian dari total 6 bagian semangka yang sama besar.',
								},
							},

							{
								learningObjective:
									'Siswa mengenal nama khusus untuk pecahan tertentu.',
								questionUi: doc(
									p(
										bold('Pertanyaan: '),
										'Ibu memotong kue menjadi 4 bagian yang sama. Ayah mengambil 1 bagian. Bagian yang diambil ayah biasa disebut apa?',
									),
								),
								questionLlmContext:
									'Soal ini menguji apakah siswa mengenal nama khusus pecahan 1/4. ' +
									'Jawaban: "seperempat" (atau "satu per empat", "1/4").',
								evaluationParameters: {
									expected_answer_keywords: [
										'seperempat',
										'1/4',
										'satu per empat',
									],
									common_misconceptions: [
										'Menjawab "setengah"',
										'Menjawab "sepertiga"',
									],
									strictness_level: 'lenient',
								},
								answers: { nama_khusus: 'seperempat' },
							},

							{
								learningObjective:
									'Siswa dapat menyederhanakan pecahan menggunakan konsep pecahan senilai.',
								questionUi: doc(
									p('Sederhanakan pecahan berikut:'),
									math('\\frac{6}{8}'),
									p(
										bold('Petunjuk: '),
										'Bagi pembilang dan penyebut dengan bilangan yang sama!',
									),
								),
								questionLlmContext:
									'Siswa diminta menyederhanakan pecahan 6/8. ' +
									'Jawaban: 3/4. Caranya: bagi pembilang dan penyebut dengan 2 → 6÷2 / 8÷2 = 3/4. ' +
									'FPB dari 6 dan 8 adalah 2.',
								evaluationParameters: {
									expected_answer_keywords: [
										'3/4',
										'tiga per empat',
										'tiga perempat',
									],
									common_misconceptions: [
										'Hanya membagi pembilang: 3/8',
										'Membagi dengan bilangan berbeda: 6÷2 / 8÷4 = 3/2',
									],
									strictness_level: 'moderate',
								},
								answers: { pecahan_sederhana: '3/4' },
							},
						],
					},
				],
			},
			{
				name: 'Membandingkan Pecahan',
				slug: 'membandingkan-pecahan',
				description:
					'Belajar membandingkan dua pecahan: mana yang lebih besar, lebih kecil, atau sama.',
				order: 2,
				materials: [
					{
						title: 'Membandingkan Pecahan Berpenyebut Sama',
						order: 1,
						difficulty: 1,
						content: doc(
							heading(
								2,
								'Membandingkan Pecahan Berpenyebut Sama',
							),
							p(
								'Jika dua pecahan memiliki ',
								bold('penyebut yang sama'),
								', maka kita cukup membandingkan pembilangnya saja.',
							),
							p(
								'Pecahan dengan pembilang lebih besar nilainya lebih besar.',
							),
							heading(3, 'Contoh'),
							math('\\frac{3}{5} > \\frac{2}{5}'),
							p('Karena 3 > 2, dan penyebutnya sama-sama 5.'),
							heading(3, 'Simbol Perbandingan'),
							bulletList(
								'> artinya "lebih besar dari"',
								'< artinya "lebih kecil dari"',
								'= artinya "sama dengan"',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan cara membandingkan pecahan yang penyebutnya sama. ' +
							'Jika penyebutnya sama, cukup bandingkan pembilangnya. Pembilang lebih besar = pecahan lebih besar. ' +
							'Contoh: 3/5 > 2/5 karena 3 > 2. ' +
							'Simbol: > (lebih besar), < (lebih kecil), = (sama dengan).',
						questions: [
							{
								learningObjective:
									'Siswa dapat membandingkan dua pecahan berpenyebut sama.',
								questionUi: doc(
									p(
										'Bandingkan kedua pecahan berikut menggunakan simbol >, <, atau =',
									),
									math(
										'\\frac{5}{7} \\quad \\square \\quad \\frac{3}{7}',
									),
								),
								questionLlmContext:
									'Siswa diminta membandingkan 5/7 dan 3/7. ' +
									'Jawaban: 5/7 > 3/7. Karena penyebutnya sama (7), kita bandingkan pembilang: 5 > 3.',
								evaluationParameters: {
									expected_answer_keywords: [
										'>',
										'lebih besar',
										'5/7 lebih besar',
									],
									common_misconceptions: [
										'Menulis < (terbalik)',
										'Bingung dengan simbol > dan <',
									],
									strictness_level: 'moderate',
								},
								answers: {
									simbol: '>',
									penjelasan: '5 > 3, penyebut sama',
								},
							},

							{
								learningObjective:
									'Siswa dapat mengurutkan pecahan berpenyebut sama dari terkecil.',
								questionUi: doc(
									p(
										bold('Pertanyaan: '),
										'Urutkan pecahan berikut dari yang ',
										bold('terkecil'),
										' ke yang ',
										bold('terbesar'),
										':',
									),
									math(
										'\\frac{4}{9}, \\quad \\frac{1}{9}, \\quad \\frac{7}{9}',
									),
								),
								questionLlmContext:
									'Siswa mengurutkan 4/9, 1/9, 7/9 dari terkecil ke terbesar. ' +
									'Jawaban: 1/9, 4/9, 7/9. Penyebut sama (9), urutkan pembilang: 1 < 4 < 7.',
								evaluationParameters: {
									expected_answer_keywords: [
										'1/9',
										'4/9',
										'7/9',
									],
									common_misconceptions: [
										'Mengurutkan terbalik (terbesar ke terkecil)',
									],
									strictness_level: 'moderate',
								},
								answers: { urutan: ['1/9', '4/9', '7/9'] },
							},
						],
					},
					{
						title: 'Membandingkan Pecahan Berpenyebut Berbeda',
						order: 2,
						difficulty: 2,
						content: doc(
							heading(
								2,
								'Membandingkan Pecahan Berpenyebut Berbeda',
							),
							p(
								'Jika penyebutnya berbeda, kita perlu menyamakan penyebutnya terlebih dahulu menggunakan ',
								bold('KPK (Kelipatan Persekutuan Terkecil)'),
								'.',
							),
							heading(3, 'Langkah-langkah'),
							orderedList(
								'Temukan KPK dari kedua penyebut',
								'Ubah kedua pecahan agar penyebutnya sama (= KPK)',
								'Bandingkan pembilangnya',
							),
							heading(3, 'Contoh'),
							p('Bandingkan 1/3 dan 2/5:'),
							bulletList(
								'KPK dari 3 dan 5 = 15',
								'1/3 = 5/15 (kalikan atas bawah dengan 5)',
								'2/5 = 6/15 (kalikan atas bawah dengan 3)',
								'5/15 < 6/15, jadi 1/3 < 2/5',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan membandingkan pecahan berpenyebut berbeda. ' +
							'Langkah: (1) Cari KPK penyebut, (2) Samakan penyebut, (3) Bandingkan pembilang. ' +
							'Contoh: 1/3 vs 2/5 → KPK(3,5)=15 → 5/15 vs 6/15 → 1/3 < 2/5. ' +
							'KPK = Kelipatan Persekutuan Terkecil.',
						questions: [
							{
								learningObjective:
									'Siswa dapat membandingkan pecahan berpenyebut berbeda.',
								questionUi: doc(
									p('Bandingkan kedua pecahan berikut:'),
									math(
										'\\frac{2}{3} \\quad \\square \\quad \\frac{3}{4}',
									),
									p(
										bold('Petunjuk: '),
										'Samakan penyebutnya terlebih dahulu!',
									),
								),
								questionLlmContext:
									'Membandingkan 2/3 dan 3/4. KPK(3,4)=12. ' +
									'2/3 = 8/12, 3/4 = 9/12. 8/12 < 9/12, jadi 2/3 < 3/4.',
								evaluationParameters: {
									expected_answer_keywords: [
										'<',
										'lebih kecil',
										'8/12',
										'9/12',
									],
									common_misconceptions: [
										'Langsung membandingkan pembilang tanpa menyamakan penyebut',
										'Membandingkan penyebut saja',
									],
									strictness_level: 'moderate',
								},
								answers: {
									simbol: '<',
									penjelasan: '8/12 < 9/12',
								},
							},

							{
								learningObjective:
									'Siswa dapat menyamakan penyebut untuk membandingkan.',
								questionUi: doc(
									p('Mana yang lebih besar?'),
									math(
										'\\frac{3}{4} \\quad \\text{atau} \\quad \\frac{5}{6}',
									),
									p('Tunjukkan langkah-langkahmu!'),
								),
								questionLlmContext:
									'Membandingkan 3/4 dan 5/6. KPK(4,6)=12. ' +
									'3/4 = 9/12, 5/6 = 10/12. 9/12 < 10/12, jadi 5/6 lebih besar.',
								evaluationParameters: {
									expected_answer_keywords: [
										'5/6',
										'lebih besar',
										'9/12',
										'10/12',
										'KPK',
									],
									common_misconceptions: [
										'Menjawab 3/4 karena pembilangnya lebih kecil',
										'Mengalikan silang tanpa pemahaman',
									],
									strictness_level: 'moderate',
								},
								answers: {
									jawaban: '5/6 lebih besar',
									penjelasan: '9/12 < 10/12',
								},
							},
						],
					},
					{
						title: 'Mengurutkan Pecahan',
						order: 3,
						difficulty: 2,
						content: doc(
							heading(2, 'Mengurutkan Pecahan'),
							p(
								'Setelah bisa membandingkan dua pecahan, kita bisa mengurutkan ',
								bold('tiga atau lebih'),
								' pecahan dari terkecil ke terbesar, atau sebaliknya.',
							),
							heading(3, 'Langkah Mengurutkan'),
							orderedList(
								'Samakan semua penyebut menggunakan KPK',
								'Bandingkan semua pembilang',
								'Urutkan sesuai permintaan soal',
							),
							heading(3, 'Contoh'),
							p(
								'Urutkan 1/2, 1/3, 1/4 dari terkecil ke terbesar:',
							),
							bulletList(
								'KPK(2, 3, 4) = 12',
								'1/2 = 6/12, 1/3 = 4/12, 1/4 = 3/12',
								'Urutan: 3/12, 4/12, 6/12',
								'Jadi: 1/4, 1/3, 1/2',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan cara mengurutkan pecahan (lebih dari 2). ' +
							'Langkah: (1) Cari KPK semua penyebut, (2) Ubah semua pecahan ke penyebut yang sama, (3) Urutkan berdasarkan pembilang. ' +
							'Contoh: 1/2, 1/3, 1/4 → KPK=12 → 6/12, 4/12, 3/12 → urutan: 1/4, 1/3, 1/2.',
						questions: [
							{
								learningObjective:
									'Siswa dapat mengurutkan pecahan.',
								questionUi: doc(
									p(
										'Urutkan pecahan berikut dari yang ',
										bold('terkecil'),
										' ke ',
										bold('terbesar'),
										':',
									),
									math(
										'\\frac{2}{3}, \\quad \\frac{1}{2}, \\quad \\frac{3}{4}',
									),
								),
								questionLlmContext:
									'Mengurutkan 2/3, 1/2, 3/4 dari terkecil ke terbesar. KPK(3,2,4)=12. ' +
									'2/3 = 8/12, 1/2 = 6/12, 3/4 = 9/12. Urutan: 6/12, 8/12, 9/12 → 1/2, 2/3, 3/4.',
								evaluationParameters: {
									expected_answer_keywords: [
										'1/2',
										'2/3',
										'3/4',
									],
									common_misconceptions: [
										'Mengurutkan berdasarkan penyebut saja',
										'Mengurutkan terbalik',
									],
									strictness_level: 'moderate',
								},
								answers: { urutan: ['1/2', '2/3', '3/4'] },
							},

							{
								learningObjective:
									'Siswa mengurutkan pecahan dari terbesar.',
								questionUi: doc(
									p(
										'Urutkan pecahan berikut dari yang ',
										bold('terbesar'),
										' ke ',
										bold('terkecil'),
										':',
									),
									math(
										'\\frac{1}{6}, \\quad \\frac{1}{2}, \\quad \\frac{1}{3}',
									),
								),
								questionLlmContext:
									'Mengurutkan 1/6, 1/2, 1/3 dari terbesar ke terkecil. KPK(6,2,3)=6. ' +
									'1/6 = 1/6, 1/2 = 3/6, 1/3 = 2/6. Urutan: 3/6, 2/6, 1/6 → 1/2, 1/3, 1/6.',
								evaluationParameters: {
									expected_answer_keywords: [
										'1/2',
										'1/3',
										'1/6',
									],
									common_misconceptions: [
										'Mengurutkan dari terkecil (terbalik)',
										'Berpikir penyebut besar = nilai besar',
									],
									strictness_level: 'moderate',
								},
								answers: { urutan: ['1/2', '1/3', '1/6'] },
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
							'Latihan ini menguji pemahaman siswa terhadap seluruh materi pada subtopik Membandingkan Pecahan. ' +
							'Soal latihan menggabungkan konsep-konsep yang telah dipelajari pada materi sebelumnya.',
						questions: [
							{
								learningObjective:
									'Siswa dapat menerapkan perbandingan pecahan dalam soal cerita.',
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
									'Soal cerita membandingkan 2/6 dan 4/6. ' +
									'Jawaban: Budi makan lebih banyak karena 4/6 > 2/6 (penyebutnya sama, 4 > 2).',
								evaluationParameters: {
									expected_answer_keywords: [
										'Budi',
										'lebih banyak',
										'4/6',
										'lebih besar',
									],
									common_misconceptions: [
										'Menjawab Andi karena bingung antara pembilang dan penyebut',
									],
									strictness_level: 'lenient',
								},
								answers: { jawaban: 'Budi makan lebih banyak' },
							},

							{
								learningObjective:
									'Siswa menerapkan perbandingan pecahan berpenyebut berbeda dalam soal cerita.',
								questionUi: doc(
									p(
										'Rina minum ',
										bold('1/3'),
										' gelas susu. Dina minum ',
										bold('1/4'),
										' gelas susu.',
									),
									p(
										bold('Pertanyaan: '),
										'Siapa yang minum susu lebih banyak? Jelaskan caramu!',
									),
								),
								questionLlmContext:
									'Membandingkan 1/3 dan 1/4. KPK(3,4)=12. ' +
									'1/3 = 4/12, 1/4 = 3/12. 4/12 > 3/12, jadi Rina minum lebih banyak.',
								evaluationParameters: {
									expected_answer_keywords: [
										'Rina',
										'lebih banyak',
										'1/3',
										'4/12',
										'3/12',
									],
									common_misconceptions: [
										'Menjawab Dina karena 4 > 3 (penyebut)',
										'Tidak menyamakan penyebut',
									],
									strictness_level: 'moderate',
								},
								answers: {
									jawaban: 'Rina',
									alasan: '1/3 = 4/12 > 3/12 = 1/4',
								},
							},

							{
								learningObjective:
									'Siswa mengurutkan pecahan campuran penyebut.',
								questionUi: doc(
									p('Urutkan dari terkecil ke terbesar:'),
									math(
										'\\frac{3}{8}, \\quad \\frac{1}{4}, \\quad \\frac{1}{2}',
									),
								),
								questionLlmContext:
									'Mengurutkan 3/8, 1/4, 1/2. KPK(8,4,2)=8. ' +
									'3/8 = 3/8, 1/4 = 2/8, 1/2 = 4/8. Urutan: 2/8, 3/8, 4/8 → 1/4, 3/8, 1/2.',
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
								},
								answers: { urutan: ['1/4', '3/8', '1/2'] },
							},
						],
					},
				],
			},
			{
				name: 'Pecahan pada Garis Bilangan',
				slug: 'pecahan-garis-bilangan',
				description:
					'Meletakkan dan menemukan pecahan pada garis bilangan untuk memahami posisi dan nilai pecahan.',
				order: 3,
				materials: [
					{
						title: 'Mengenal Garis Bilangan Pecahan',
						order: 1,
						difficulty: 1,
						content: doc(
							heading(2, 'Pecahan pada Garis Bilangan'),
							p(
								'Garis bilangan membantu kita melihat ',
								bold('posisi'),
								' pecahan di antara bilangan bulat.',
							),
							p(
								'Pada garis bilangan dari 0 sampai 1, kita bisa membagi jarak menjadi beberapa bagian yang sama untuk menunjukkan pecahan.',
							),
							heading(3, 'Contoh'),
							p(
								'Jika kita membagi jarak 0 sampai 1 menjadi 4 bagian yang sama, maka titik-titiknya menunjukkan:',
							),
							bulletList(
								'0/4 = 0',
								'1/4',
								'2/4 = 1/2',
								'3/4',
								'4/4 = 1',
							),
							p(
								bold('Penting: '),
								'Setiap bagian harus sama panjang!',
							),
						),
						materialLlmContext:
							'Materi ini membahas cara menempatkan pecahan pada garis bilangan. ' +
							'Garis bilangan dari 0 sampai 1 dibagi menjadi bagian-bagian yang sama sesuai penyebut. ' +
							'Contoh: penyebut 4 → bagi menjadi 4 bagian → titik-titiknya adalah 0/4, 1/4, 2/4, 3/4, 4/4. ' +
							'Siswa harus bisa menentukan posisi pecahan pada garis bilangan.',
						questions: [
							{
								learningObjective:
									'Siswa dapat menentukan posisi pecahan pada garis bilangan.',
								questionUi: doc(
									p(
										'Sebuah garis bilangan dari 0 sampai 1 dibagi menjadi ',
										bold('5 bagian yang sama'),
										'.',
									),
									p(
										bold('Pertanyaan: '),
										'Titik ketiga dari angka 0 menunjukkan pecahan berapa?',
									),
								),
								questionLlmContext:
									'Garis bilangan 0-1 dibagi 5 bagian. Titik ketiga = 3/5.',
								evaluationParameters: {
									expected_answer_keywords: [
										'3/5',
										'tiga per lima',
									],
									common_misconceptions: [
										'Menjawab 3 tanpa penyebut',
										'Menjawab 5/3',
									],
									strictness_level: 'lenient',
								},
								answers: { pecahan: '3/5' },
							},

							{
								learningObjective:
									'Siswa memahami bahwa pecahan terletak di antara bilangan bulat.',
								questionUi: doc(
									p(
										bold('Pertanyaan: '),
										'Di antara dua bilangan bulat manakah pecahan 3/4 terletak pada garis bilangan?',
									),
								),
								questionLlmContext:
									'3/4 terletak di antara 0 dan 1 pada garis bilangan karena 0 < 3/4 < 1.',
								evaluationParameters: {
									expected_answer_keywords: [
										'0',
										'1',
										'antara 0 dan 1',
									],
									common_misconceptions: ['Menjawab 3 dan 4'],
									strictness_level: 'lenient',
								},
								answers: { jawaban: 'antara 0 dan 1' },
							},
						],
					},
					{
						title: 'Meletakkan Pecahan pada Garis Bilangan',
						order: 2,
						difficulty: 1,
						content: doc(
							heading(
								2,
								'Cara Meletakkan Pecahan pada Garis Bilangan',
							),
							orderedList(
								'Lihat penyebutnya — bagi jarak 0 sampai 1 menjadi sejumlah penyebut bagian yang sama',
								'Hitung dari 0 sebanyak pembilang langkah',
								'Tandai titiknya!',
							),
							heading(3, 'Contoh'),
							p('Letakkan 3/8 pada garis bilangan:'),
							orderedList(
								'Penyebut = 8, bagi jarak 0-1 menjadi 8 bagian sama',
								'Pembilang = 3, hitung 3 langkah dari 0',
								'Tandai titik di posisi ke-3!',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan langkah meletakkan pecahan pada garis bilangan. ' +
							'Langkah: (1) Bagi jarak 0-1 menjadi bagian sebanyak penyebut, (2) Hitung dari 0 sebanyak pembilang, (3) Tandai. ' +
							'Contoh: 3/8 → bagi 8 bagian → hitung 3 langkah dari 0.',
						questions: [
							{
								learningObjective:
									'Siswa dapat menentukan langkah meletakkan pecahan.',
								questionUi: doc(
									p(
										'Kamu ingin meletakkan pecahan ',
										bold('5/8'),
										' pada garis bilangan.',
									),
									p(
										bold('Pertanyaan: '),
										'Menjadi berapa bagian kamu harus membagi jarak 0 sampai 1, dan berapa langkah dari angka 0?',
									),
								),
								questionLlmContext:
									'Untuk meletakkan 5/8: bagi 0-1 menjadi 8 bagian (penyebut), hitung 5 langkah (pembilang).',
								evaluationParameters: {
									expected_answer_keywords: [
										'8 bagian',
										'5 langkah',
										'8',
										'5',
									],
									common_misconceptions: [
										'Menukar angka pembilang dan penyebut',
									],
									strictness_level: 'lenient',
								},
								answers: { bagian: 8, langkah: 5 },
							},

							{
								learningObjective:
									'Siswa memahami bahwa 4/4 = 1 pada garis bilangan.',
								questionUi: doc(
									p(
										bold('Pertanyaan: '),
										'Pada garis bilangan yang dibagi 4 bagian, titik ke-4 dari angka 0 menunjukkan pecahan berapa? Apakah sama dengan bilangan bulat tertentu?',
									),
								),
								questionLlmContext:
									'Titik ke-4 dari 0 pada garis bilangan yang dibagi 4 = 4/4 = 1. Ini sama dengan bilangan bulat 1.',
								evaluationParameters: {
									expected_answer_keywords: [
										'4/4',
										'1',
										'sama dengan 1',
									],
									common_misconceptions: ['Menjawab 4'],
									strictness_level: 'lenient',
								},
								answers: { pecahan: '4/4', bilangan_bulat: 1 },
							},
						],
					},
					{
						title: 'Pecahan Lebih dari 1 pada Garis Bilangan',
						order: 3,
						difficulty: 2,
						content: doc(
							heading(2, 'Pecahan Lebih dari 1'),
							p(
								'Pecahan bisa memiliki nilai ',
								bold('lebih dari 1'),
								'. Ini terjadi ketika pembilang lebih besar dari penyebut.',
							),
							heading(3, 'Contoh'),
							math('\\frac{5}{4}'),
							p(
								'5/4 artinya kita punya 5 bagian dari potongan yang masing-masing berukuran 1/4. Ini lebih dari 1 utuh!',
							),
							p(
								'Pada garis bilangan, 5/4 terletak di antara 1 dan 2.',
							),
							heading(3, 'Pecahan Campuran'),
							p('5/4 bisa ditulis sebagai pecahan campuran:'),
							math('\\frac{5}{4} = 1\\frac{1}{4}'),
							p('Artinya: 1 utuh dan 1/4 lagi.'),
						),
						materialLlmContext:
							'Materi ini membahas pecahan dengan pembilang > penyebut (pecahan lebih dari 1) dan pecahan campuran. ' +
							'Contoh: 5/4 = 1 1/4 (satu dan seperempat). Terletak di antara 1 dan 2 pada garis bilangan. ' +
							'Pecahan campuran: bagian bulat + bagian pecahan. Cara konversi: bagi pembilang dengan penyebut.',
						questions: [
							{
								learningObjective:
									'Siswa memahami pecahan lebih dari 1.',
								questionUi: doc(
									p(
										bold('Pertanyaan: '),
										'Apakah pecahan berikut memiliki nilai lebih dari 1? Mengapa?',
									),
									math('\\frac{7}{3}'),
								),
								questionLlmContext:
									'7/3: pembilang (7) > penyebut (3), jadi nilainya lebih dari 1. ' +
									'7/3 = 2 1/3 (dua dan sepertiga).',
								evaluationParameters: {
									expected_answer_keywords: [
										'ya',
										'lebih dari 1',
										'pembilang lebih besar',
										'7 lebih besar dari 3',
									],
									common_misconceptions: [
										'Menjawab tidak karena berpikir semua pecahan < 1',
									],
									strictness_level: 'lenient',
								},
								answers: {
									lebih_dari_1: true,
									pecahan_campuran: '2 1/3',
								},
							},

							{
								learningObjective:
									'Siswa dapat mengubah pecahan menjadi pecahan campuran.',
								questionUi: doc(
									p(
										'Ubahlah pecahan berikut menjadi pecahan campuran:',
									),
									math('\\frac{11}{4}'),
								),
								questionLlmContext:
									'11/4 diubah ke pecahan campuran: 11 ÷ 4 = 2 sisa 3. Jadi 11/4 = 2 3/4.',
								evaluationParameters: {
									expected_answer_keywords: [
										'2 3/4',
										'2 tiga perempat',
										'dua tiga per empat',
									],
									common_misconceptions: [
										'Menulis 2 1/4 (salah sisa)',
										'Menulis 1 3/4',
									],
									strictness_level: 'moderate',
								},
								answers: { pecahan_campuran: '2 3/4' },
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
							'Latihan ini menguji pemahaman siswa terhadap seluruh materi pada subtopik Pecahan pada Garis Bilangan. ' +
							'Soal latihan menggabungkan konsep-konsep yang telah dipelajari pada materi sebelumnya.',
						questions: [
							{
								learningObjective:
									'Siswa dapat menempatkan beberapa pecahan pada garis bilangan.',
								questionUi: doc(
									p(
										'Pada garis bilangan yang dibagi menjadi 6 bagian sama, mana yang lebih dekat ke angka 1:',
									),
									math(
										'\\frac{2}{6} \\quad \\text{atau} \\quad \\frac{5}{6} ?',
									),
								),
								questionLlmContext:
									'Membandingkan 2/6 dan 5/6 pada garis bilangan. ' +
									'5/6 lebih dekat ke 1 karena 5/6 hanya berjarak 1/6 dari 1, sedangkan 2/6 berjarak 4/6 dari 1.',
								evaluationParameters: {
									expected_answer_keywords: [
										'5/6',
										'lebih dekat',
									],
									common_misconceptions: [
										'Menjawab 2/6 karena angkanya lebih kecil',
									],
									strictness_level: 'lenient',
								},
								answers: { jawaban: '5/6' },
							},

							{
								learningObjective:
									'Siswa dapat menentukan pecahan antara dua pecahan lain.',
								questionUi: doc(
									p(
										'Pada garis bilangan yang dibagi 8 bagian, sebutkan satu pecahan yang terletak ',
										bold('di antara'),
										' 2/8 dan 6/8!',
									),
								),
								questionLlmContext:
									'Pecahan antara 2/8 dan 6/8. Jawaban yang diterima: 3/8, 4/8, atau 5/8.',
								evaluationParameters: {
									expected_answer_keywords: [
										'3/8',
										'4/8',
										'5/8',
										'1/2',
									],
									common_misconceptions: [
										'Menjawab pecahan di luar rentang',
									],
									strictness_level: 'lenient',
								},
								answers: { contoh: ['3/8', '4/8', '5/8'] },
							},

							{
								learningObjective:
									'Siswa dapat menentukan posisi pecahan campuran pada garis bilangan.',
								questionUi: doc(
									p(
										bold('Pertanyaan: '),
										'Di antara dua bilangan bulat berapa posisi 9/5 pada garis bilangan?',
									),
								),
								questionLlmContext:
									'9/5 = 1 4/5. Terletak di antara 1 dan 2 pada garis bilangan.',
								evaluationParameters: {
									expected_answer_keywords: [
										'1',
										'2',
										'antara 1 dan 2',
									],
									common_misconceptions: [
										'Menjawab 9 dan 5',
										'Menjawab 0 dan 1',
									],
									strictness_level: 'lenient',
								},
								answers: { posisi: 'antara 1 dan 2' },
							},
						],
					},
				],
			},
		],
	};
