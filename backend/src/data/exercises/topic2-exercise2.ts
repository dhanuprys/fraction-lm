import { bold, doc, heading, image, math, p } from '../helpers';
import type { QuestionSeedData } from '../types';

export const topic2Exercise2Questions: QuestionSeedData[] = [
	// ─── Soal 1: Aktivitas 3.1 — Pizza Kardus: Pecahan Senilai 4/8 dan 2/4 ───
	{
		learningObjective:
			'Siswa dapat menandai dan memahami pecahan senilai 4/8 dan 2/4 melalui interaksi langsung pada model visual dua pizza di dalam kotak kardus.',
		questionType: 'pizza_slice_marker',
		questionUi: doc(
			heading(
				3,
				'Aktivitaas 3.1: Pecahan Senilai pada Pizza ($\\frac{4}{8}$ dan $\\frac{2}{4}$)',
			),
			image(
				'/images/topic2/two_pizzas_boxes.svg',
				'Dua buah pizza di dalam kotak kardus terbuka: pizza kiri dipotong 8 bagian sama besar dan pizza kanan dipotong 4 bagian sama besar',
			),
			p(
				bold(
					'Tandailah $\\frac{4}{8}$ dari Pizza sebelah kiri dan $\\frac{2}{4}$ dari Pizza sebelah kanan pada model pizza interaktif di bawah ini!',
				),
			),
			p(
				'Kamu dapat melihat bahwa bagian yang ditandai pada kedua pizza memiliki ukuran yang sama besar.',
			),
			p(
				'Dalam penulisan matematika secara singkat: $\\frac{2}{4} = \\frac{4}{8}$',
			),
			p(
				'Hal ini dapat dibayangkan sebagai berikut: satu pizza dipotong menjadi 4 bagian yang sama besar, lalu diambil 2 bagian. Pada langkah berikutnya, masing-masing dari 4 bagian dipotong lagi menjadi 2 bagian lebih kecil sehingga menjadi 8 bagian sama besar. Dua potong dari 4 bagian kini menjadi 4 potong dari total 8 bagian.',
			),
		),
		answerConfig: {
			pizzas: [
				{
					label: 'Pizza Sebelah Kiri',
					totalSlices: 8,
					targetFraction: '4/8',
					helperText: 'Tandai 4 dari 8 potong',
				},
				{
					label: 'Pizza Sebelah Kanan',
					totalSlices: 4,
					targetFraction: '2/4',
					helperText: 'Tandai 2 dari 4 potong',
				},
			],
			instruction:
				'Klik potongan pizza untuk menandai 4/8 pada pizza kiri dan 2/4 pada pizza kanan.',
		},
		questionLlmContext:
			'Aktivitas 3.1: Menandai 4/8 pada pizza kiri (8 potong) dan 2/4 pada pizza kanan (4 potong).\n' +
			'- Pizza kiri: 4 dari 8 potong ditandai (4/8).\n' +
			'- Pizza kanan: 2 dari 4 potong ditandai (2/4).\n' +
			'Kedua bagian yang ditandai memiliki luas yang sama besar (pecahan senilai: 2/4 = 4/8).\n' +
			'Bimbingan Sokratik: Puji siswa saat berhasil menandai 4 potong di kiri dan 2 potong di kanan. Tanyakan apakah luas setengah pizza kiri sama dengan luas setengah pizza kanan.',
		evaluationParameters: {
			expected_answer_keywords: [
				'4/8',
				'2/4',
				'senilai',
				'sama besar',
				'setengah',
			],
			expected_pizza_slices: {
				0: 4,
				1: 2,
			},
			common_misconceptions: [
				'Menandai jumlah potong yang terbalik antara pizza kiri dan kanan',
				'Mengira 4/8 lebih besar dari 2/4 karena angka 4 dan 8 lebih besar',
			],
			strictness_level: 'strict',
			hints: [
				'Pada pizza kiri (8 potong), klik 4 potong untuk menandai 4/8.',
				'Pada pizza kanan (4 potong), klik 2 potong untuk menandai 2/4.',
				'Perhatikan bahwa 4 potong dari 8 sama luasnya dengan 2 potong dari 4 (pecahan senilai).',
			],
		},
		answers: {
			pizza_kiri: '4 dari 8 potong',
			pizza_kanan: '2 dari 4 potong',
			kesimpulan: '2/4 = 4/8 (pecahan senilai)',
		},
	},

	// ─── Soal 2: Aktivitas 3.2 — Pecahan Lain yang Senilai ───
	{
		learningObjective:
			'Siswa dapat menentukan dan menuliskan pecahan yang senilai dengan 2/4, 1/3, 1/2, dan 2/2 beserta notasi singkatnya.',
		questionType: 'fraction_equivalence',
		questionUi: doc(
			heading(3, 'Aktivitas 3.2: Menentukan Pecahan Lain yang Setara'),
			p(
				'Dapatkah kamu menyebutkan pecahan lain yang setara dengan $\\frac{2}{4}$?',
			),
			p('Lengkapilah:'),
		),
		answerConfig: {
			items: [
				{ baseFraction: '2/4' },
				{ baseFraction: '1/3' },
				{ baseFraction: '1/2' },
				{ baseFraction: '2/2' },
			],
		},
		questionLlmContext:
			'Aktivitas 3.2: Menentukan pecahan senilai untuk 4 butir soal:\n' +
			'1. Senilai dengan 2/4: siswa dapat memasukkan 1/2, 4/8, 3/6, 5/10, dll.\n' +
			'2. Senilai dengan 1/3: siswa dapat memasukkan 2/6, 3/9, 4/12, 5/15, dll.\n' +
			'3. Senilai dengan 1/2: siswa dapat memasukkan 2/4, 3/6, 4/8, 5/10, dll.\n' +
			'4. Senilai dengan 2/2: siswa dapat memasukkan 1/1, 3/3, 4/4, 5/5, dll.\n' +
			'Bimbingan Sokratik: Tuntun siswa dengan mengalikan pembilang dan penyebut dengan angka yang sama (misal dikali 2 atau 3), atau membaginya (disederhanakan).',
		evaluationParameters: {
			expected_answer_keywords: [
				'senilai',
				'setara',
				'1/2',
				'2/6',
				'1/1',
				'4/8',
			],
			common_misconceptions: [
				'Menambahkan angka alih-alih mengalikan pembilang dan penyebut',
			],
			strictness_level: 'lenient',
			hints: [
				'Untuk mencari pecahan senilai, kalikan pembilang dan penyebut dengan angka yang sama (misalnya dikali 2).',
				'Contoh untuk 1/3: 1 dikali 2 = 2, 3 dikali 2 = 6, maka pecahannya 2/6.',
				'Untuk 2/2, nilainya adalah 1 utuh, jadi pembilang dan penyebutnya harus sama besar (misal 1/1 atau 3/3).',
			],
		},
		answers: {
			item1: '1/2 atau 4/8',
			item2: '2/6 atau 3/9',
			item3: '2/4 atau 3/6',
			item4: '1/1 atau 3/3',
		},
	},

	// ─── Soal 3: Aktivitas 3.3a — Keraguan Mince tentang Pecahan 1/1 ───
	{
		learningObjective:
			'Siswa dapat bernalar kritis dan menjelaskan makna pecahan 1/1 menggunakan model pizza utuh.',
		questionType: 'short_answer',
		questionUi: doc(
			heading(
				3,
				'Aktivitas 3.3a: Penalaran Kritis — Keraguan Mince tentang Pecahan $\\frac{1}{1}$',
			),
			image(
				'/images/topic2/two_pizzas_plain.svg',
				'Pizza bundar utuh tanpa garis potongan',
			),
			p(
				bold('Mince: '),
				'“Sejauh ini, pembilang suatu pecahan selalu lebih kecil daripada penyebutnya. Saya tidak dapat membayangkan pecahan $\\frac{1}{1}$. Apakah pecahan seperti itu benar-benar ada? Bagaimana saya harus memotong pizza agar dapat menunjukkan bagian sebesar $\\frac{1}{1}$ tersebut?”',
			),
			p(
				bold('Tugasmu: '),
				'Tulislah penjelasan untuk membantu Mince memahami pecahan $\\frac{1}{1}$ pada pizza!',
			),
		),
		questionLlmContext:
			'Aktivitas 3.3a: Mince ragu tentang keberadaan pecahan 1/1 dan bagaimana memotong pizza untuk menunjukkan 1/1.\n' +
			'Jawaban yang benar secara konseptual:\n' +
			'1. Pecahan 1/1 benar-benar ada dan sah secara matematis.\n' +
			'2. Penyebut 1 artinya pizza dibagi menjadi 1 bagian utuh (sama sekali tidak dipotong).\n' +
			'3. Pembilang 1 artinya kita mengambil 1 bagian tersebut (seluruh pizza utuh).\n' +
			'4. Jadi, untuk menunjukkan 1/1, Mince tidak perlu memotong pizza sama sekali; satu pizza utuh tersebut adalah 1/1.\n' +
			'5. Nilai 1/1 sama dengan 1 kesatuan bilangan bulat utuh.\n' +
			'Bimbingan Sokratik: Puji siswa jika menjelaskan bahwa pizza tidak perlu dipotong atau pizza utuh itu sendiri adalah 1/1.',
		evaluationParameters: {
			expected_answer_keywords: [
				'ada',
				'utuh',
				'satu',
				'tanpa dipotong',
				'tidak dipotong',
				'keseluruhan',
				'1 bagian',
			],
			common_misconceptions: [
				'Mengira 1/1 itu tidak ada karena tidak ada bagian yang dipotong',
				'Mengira harus memotong pizza menjadi 2 lalu disatukan lagi',
			],
			strictness_level: 'lenient',
			hints: [
				'Pikirkan: jika penyebutnya 1, artinya pizza dibagi menjadi 1 bagian saja (utuh).',
				'Jika pembilangnya 1, artinya kita mengambil 1 bagian dari 1 bagian itu.',
				'Apakah pizza tersebut perlu dipotong jika hanya ada 1 bagian utuh?',
			],
		},
		answers: {
			jawaban:
				'Pecahan 1/1 benar-benar ada. Artinya satu pizza utuh tanpa dipotong sama sekali, karena 1 dari 1 bagian sama dengan 1 utuh.',
		},
	},

	// ─── Soal 4: Aktivitas 3.3b — Tiga Pecahan yang Senilai dengan 1/1 ───
	{
		learningObjective:
			'Siswa dapat menuliskan tiga pecahan berbeda yang senilai dengan 1/1 (bernilai 1 utuh).',
		questionType: 'fraction_input',
		questionUi: doc(
			heading(
				3,
				'Aktivitas 3.3b: Tiga Pecahan yang Senilai dengan $\\frac{1}{1}$',
			),
			p(
				'Setelah membantu Mince memahami bahwa $\\frac{1}{1}$ bernilai satu kesatuan utuh, sekarang tuliskan ',
				bold('tiga pecahan berbeda'),
				' yang senilai dengan $\\frac{1}{1}$:',
			),
		),
		answerConfig: {
			fields: [
				{
					prompt: 'Pecahan senilai 1 ke-1:',
				},
				{
					prompt: 'Pecahan senilai 1 ke-2:',
				},
				{
					prompt: 'Pecahan senilai 1 ke-3:',
				},
			],
		},
		questionLlmContext:
			'Aktivitas 3.3b: Menuliskan tiga pecahan yang senilai dengan 1/1.\n' +
			'Kaidah matematika: Semua pecahan yang memiliki pembilang dan penyebut sama besar (a/a dengan a != 0) bernilai 1 (senilai dengan 1/1).\n' +
			'Contoh jawaban yang benar: 2/2, 3/3, 4/4, 5/5, 6/6, 8/8, 10/10, 100/100.\n' +
			'Syarat: ketiga pecahan yang dimasukkan harus memiliki nilai 1 dan tidak boleh sama/duplikat satu sama lain.\n' +
			'Bimbingan Sokratik: Ingatkan siswa bahwa jika sebuah benda dipotong N bagian dan diambil semua N bagian, maka kita mendapatkan 1 benda utuh.',
		evaluationParameters: {
			expected_answer_keywords: [
				'2/2',
				'3/3',
				'4/4',
				'5/5',
				'8/8',
				'senilai',
				'1',
			],
			common_misconceptions: [
				'Menulis pecahan yang pembilang dan penyebutnya berbeda',
				'Menulis pecahan yang sama untuk ketiga kotak',
			],
			strictness_level: 'strict',
			hints: [
				'Pecahan yang bernilai 1 utuh memiliki angka pembilang dan penyebut yang persis sama besar.',
				'Misalnya jika pizza dipotong 2 dan diambil 2 potong, pecahannya adalah 2/2.',
				'Tuliskan 3 pecahan berbeda dengan angka atas dan bawah yang sama, contohnya 2/2, 3/3, dan 4/4.',
			],
		},
		answers: {
			pecahan1: '2/2',
			pecahan2: '3/3',
			pecahan3: '4/4',
		},
	},

	// ─── Soal 5: Aktivitas 3.4 — Membayangkan Pecahan 4/2 Pizza (Mince & Olif) ───
	{
		learningObjective:
			'Siswa dapat memahami representasi pecahan tidak sejati 4/2 dan menghubungkannya dengan konsep pecahan lebih dari 1 utuh.',
		questionType: 'short_answer',
		questionUi: doc(
			heading(
				3,
				'Aktivitas  3.4: Membayangkan Pecahan $\\frac{4}{2}$ Pizza (Mince dan Olif)',
			),
			p(
				bold('Mince: '),
				'“Sekarang saya sudah memahaminya. Ada pecahan yang pembilangnya lebih kecil daripada penyebutnya. Ada juga pecahan yang pembilang dan penyebutnya sama besar. Namun, apakah pembilang suatu pecahan juga bisa lebih besar daripada penyebutnya? Saya dapat membayangkan $\\frac{2}{4}$ pizza, yaitu 2 potong pizza dari satu pizza yang dibagi menjadi 4 bagian sama besar. Namun, bagaimana saya harus membayangkan $\\frac{4}{2}$ pizza?”',
			),
			p(
				bold('Olif: '),
				'“Pertama, perhatikan penyebutnya. Angka 2 berarti satu pizza dipotong menjadi dua bagian yang sama besar. Pembilang menunjukkan berapa banyak bagian yang dimaksud. Dalam hal ini, jumlahnya adalah 4 bagian.”',
			),
			p(
				bold('Tugas: '),
				'Jelaskan bagaimana kamu membayangkan atau menggambarkan $\\frac{4}{2}$ pizza! Berapa buah pizza utuh yang kita dapatkan dari 4 potong setengah pizza tersebut?',
			),
			p(
				'Pecahan yang pembilangnya lebih kecil daripada penyebutnya disebut ',
				bold('pecahan sejati'),
				'. Pecahan sejati selalu lebih kecil daripada satu bilangan bulat utuh.',
			),
			p(
				'Pecahan yang pembilangnya lebih besar daripada penyebutnya disebut ',
				bold('pecahan tidak sejati'),
				'. Pecahan tidak sejati selalu lebih besar daripada satu bilangan bulat utuh.',
			),
		),
		questionLlmContext:
			'Aktivitas 3.4: Membayangkan representasi pecahan 4/2 pizza.\n' +
			'Penjelasan konsep:\n' +
			'- Penyebut 2 artinya satu pizza dipotong menjadi 2 bagian sama besar (tiap potong = 1/2 pizza).\n' +
			'- Pembilang 4 artinya ada 4 potong setengah pizza.\n' +
			'- Dua potong setengah pizza menghasilkan 1 pizza utuh.\n' +
			'- Maka 4 potong setengah pizza menghasilkan 2 buah pizza utuh (4 dibagi 2 = 2).\n' +
			'Definisi penting:\n' +
			'- Pecahan yang pembilangnya lebih kecil dari penyebut disebut PECAHAN SEJATI (nilainya selalu < 1).\n' +
			'- Pecahan yang pembilangnya lebih besar dari penyebut disebut PECAHAN TIDAK SEJATI (nilainya selalu > 1).\n' +
			'Jawaban benar: 2 pizza utuh.\n' +
			'Bimbingan Sokratik: Tanyakan kepada siswa, jika 2 potong setengah digabung jadi 1 pizza utuh, berapa pizza jika ada 4 potong setengah?',
		evaluationParameters: {
			expected_answer_keywords: [
				'2',
				'dua',
				'pizza utuh',
				'setengah',
				'4 potong',
				'lebih dari 1',
				'tidak sejati',
			],
			common_misconceptions: [
				'Menjawab 4 pizza karena melihat pembilang 4',
				'Mengira pecahan 4/2 tidak mungkin ada',
			],
			strictness_level: 'lenient',
			hints: [
				'Ingat: setiap 2 potong setengah pizza dapat disatukan menjadi 1 pizza utuh.',
				'Jika kamu memiliki 4 potong setengah pizza, berapa banyak pizza utuh yang bisa kamu bentuk?',
				'4 potong dibagi 2 potong per pizza = 2 pizza utuh.',
			],
		},
		answers: {
			jawaban: '2 pizza utuh',
			alasan: 'Karena setiap 1 pizza menghasilkan 2 potong setengah, maka 4 potong setengah pizza setara dengan 2 pizza utuh (4 : 2 = 2).',
		},
	},

	// ─── Soal 6: Aktivitas 3.5 — Klasifikasi Pecahan Sejati vs Tidak Sejati ───
	{
		learningObjective:
			'Siswa dapat menandai dan mengklasifikasikan pecahan menjadi pecahan sejati (biru) atau pecahan tidak sejati (merah) sesuai urutan naskah.',
		questionType: 'fraction_classification',
		questionUi: doc(
			heading(
				3,
				'Aktivitas  3.5: Menandai Pecahan Sejati dan Tidak Sejati',
			),
			p(
				bold(
					'Tandailah semua pecahan sejati dengan warna biru dan semua pecahan tidak sejati dengan warna merah!',
				),
			),
		),
		answerConfig: {
			items: [
				{ fraction: '5/4' },
				{ fraction: '0/2' },
				{ fraction: '8/5' },
				{ fraction: '6/2' },
				{ fraction: '3/2' },
				{ fraction: '10/11' },
			],
			categories: [
				{
					key: 'sejati',
					label: 'Pecahan Sejati',
					badge: 'Biru',
					color: 'blue',
				},
				{
					key: 'tidak_sejati',
					label: 'Pecahan Tidak Sejati',
					badge: 'Merah',
					color: 'red',
				},
			],
		},
		questionLlmContext:
			'Aktivitas 3.5: Klasifikasi 6 pecahan menjadi Sejati (Biru) atau Tidak Sejati (Merah):\n' +
			'1. 5/4: Pembilang 5 > Penyebut 4 -> Pecahan Tidak Sejati (Merah)\n' +
			'2. 0/2: Pembilang 0 < Penyebut 2 -> Pecahan Sejati (Biru, bernilai 0 < 1)\n' +
			'3. 8/5: Pembilang 8 > Penyebut 5 -> Pecahan Tidak Sejati (Merah)\n' +
			'4. 6/2: Pembilang 6 > Penyebut 2 -> Pecahan Tidak Sejati (Merah, bernilai 3)\n' +
			'5. 3/2: Pembilang 3 > Penyebut 2 -> Pecahan Tidak Sejati (Merah, bernilai 1.5)\n' +
			'6. 10/11: Pembilang 10 < Penyebut 11 -> Pecahan Sejati (Biru)\n' +
			'Kunci jawaban: Merah (tidak_sejati), Biru (sejati), Merah (tidak_sejati), Merah (tidak_sejati), Merah (tidak_sejati), Biru (sejati).\n' +
			'Bimbingan Sokratik: Minta siswa membandingkan angka atas (pembilang) dan angka bawah (penyebut). Jika atas < bawah maka Sejati (Biru), jika atas > bawah maka Tidak Sejati (Merah).',
		evaluationParameters: {
			expected_answer_keywords: [
				'sejati',
				'tidak sejati',
				'biru',
				'merah',
			],
			expected_classifications: {
				0: 'tidak_sejati',
				1: 'sejati',
				2: 'tidak_sejati',
				3: 'tidak_sejati',
				4: 'tidak_sejati',
				5: 'sejati',
			},
			common_misconceptions: [
				'Mengira 0/2 bukan pecahan sejati',
				'Terbalik antara pecahan sejati dan tidak sejati',
			],
			strictness_level: 'strict',
			hints: [
				'Bandingkan angka pembilang (atas) dan penyebut (bawah).',
				'Jika pembilang lebih kecil dari penyebut, itu adalah Pecahan Sejati (pilih Biru).',
				'Jika pembilang lebih besar dari penyebut, itu adalah Pecahan Tidak Sejati (pilih Merah).',
				'Pecahan sejati: 0/2 dan 10/11. Pecahan tidak sejati: 5/4, 8/5, 6/2, 3/2.',
			],
		},
		answers: {
			'0': 'tidak_sejati',
			'1': 'sejati',
			'2': 'tidak_sejati',
			'3': 'tidak_sejati',
			'4': 'tidak_sejati',
			'5': 'sejati',
		},
	},

	// ─── Soal 7: Aktivitas 3.6 — Membandingkan 8/9 dan 7/6 melalui Patokan 1 ───
	{
		learningObjective:
			'Siswa dapat membandingkan 8/9 dan 7/6 dengan melengkapi kalimat analisis hubungan pembilang-penyebut dan merangkai pertidaksamaan terhadap 1.',
		questionType: 'sentence_completion',
		questionUi: doc(
			heading(
				3,
				'Aktivitas  3.6: Membandingkan $\\frac{8}{9}$ dan $\\frac{7}{6}$. Lengkapilah!',
			),
			p(
				bold('Bandingkan $\\frac{8}{9}$ dan $\\frac{7}{6}$.'),
				' Lengkapilah kalimat penalaran dan rantai pertidaksamaannya di bawah ini:',
			),
			p(
				'Kita telah mempelajari melalui contoh pecahan $\\frac{4}{8}$ dan $\\frac{2}{4}$ bagaimana cara membandingkan pecahan yang memiliki pembilang dan penyebut berbeda.',
			),
			p(
				'Untuk itu, kita membagi dua lagi setiap bagian seperempat sehingga menjadi bagian-bagian yang lebih kecil, yaitu seperdelapan. Kita menemukan bahwa: $\\frac{4}{8} = \\frac{2}{4}$.',
			),
		),
		answerConfig: {
			sections: [
				{
					title: 'Pada bilangan pecahan $\\frac{8}{9}$',
					badge: '1',
					fractionMath: '8/9',
					blanks: [
						{
							id: 'b_8_9_comp',
							prefix: 'Pembilang lebih',
							suffix: 'daripada penyebut.',
							options: [
								{ value: 'kecil', label: 'lebih kecil' },
								{ value: 'besar', label: 'lebih besar' },
							],
							placeholder: 'Pilih perbandingan',
						},
						{
							id: 'b_8_9_type',
							prefix: 'Jadi, pecahan tersebut merupakan',
							suffix: '.',
							options: [
								{ value: 'sejati', label: 'pecahan sejati' },
								{
									value: 'tidak_sejati',
									label: 'pecahan tidak sejati',
								},
							],
							placeholder: 'Pilih jenis pecahan',
						},
						{
							id: 'b_8_9_unit',
							prefix: 'Nilai $\\frac{8}{9}$ selalu',
							suffix: 'daripada satu kesatuan (1 utuh).',
							options: [
								{
									value: 'kurang',
									label: 'lebih kecil / kurang dari (< 1)',
								},
								{
									value: 'lebih',
									label: 'lebih besar / lebih dari (> 1)',
								},
							],
							placeholder: 'Pilih hubungan dengan 1',
						},
					],
				},
				{
					title: 'Pada bilangan pecahan $\\frac{7}{6}$',
					badge: '2',
					fractionMath: '7/6',
					blanks: [
						{
							id: 'b_7_6_comp',
							prefix: 'Pembilang lebih',
							suffix: 'daripada penyebut.',
							options: [
								{ value: 'besar', label: 'lebih besar' },
								{ value: 'kecil', label: 'lebih kecil' },
							],
							placeholder: 'Pilih perbandingan',
						},
						{
							id: 'b_7_6_type',
							prefix: 'Jadi, pecahan tersebut merupakan',
							suffix: '.',
							options: [
								{
									value: 'tidak_sejati',
									label: 'pecahan tidak sejati',
								},
								{ value: 'sejati', label: 'pecahan sejati' },
							],
							placeholder: 'Pilih jenis pecahan',
						},
						{
							id: 'b_7_6_unit',
							prefix: 'Dengan demikian, pecahan $\\frac{7}{6}$',
							suffix: 'daripada satu kesatuan (1 utuh).',
							options: [
								{
									value: 'lebih',
									label: 'lebih besar / lebih dari (> 1)',
								},
								{
									value: 'kurang',
									label: 'lebih kecil / kurang dari (< 1)',
								},
							],
							placeholder: 'Pilih hubungan dengan 1',
						},
					],
				},
			],
			inequalityCard: {
				title: 'Notasi Matematika Singkat & Kesimpulan',
				chainPrompt: 'Dalam notasi matematika singkat:',
				leftSlot: {
					id: 'chain_left',
					placeholder: 'Pecahan 1',
					options: ['8/9', '7/6'],
				},
				rightSlot: {
					id: 'chain_right',
					placeholder: 'Pecahan 2',
					options: ['7/6', '8/9'],
				},
				conclusionPrompt: 'Jadi, kesimpulan perbandingan:',
				conclusionLeftSlot: {
					id: 'conc_left',
					options: ['8/9', '7/6'],
				},
				conclusionOperator: '<',
				conclusionRightSlot: {
					id: 'conc_right',
					options: ['7/6', '8/9'],
				},
			},
		},
		questionLlmContext:
			'Aktivitas 3.6: Membandingkan 8/9 dan 7/6 melalui perbandingan terhadap bilangan 1:\n' +
			'1. Pada pecahan 8/9: pembilang lebih kecil dari penyebut -> pecahan sejati -> 8/9 < 1.\n' +
			'2. Pada pecahan 7/6: pembilang lebih besar dari penyebut -> pecahan tidak sejati -> 7/6 > 1 (1 < 7/6).\n' +
			'3. Notasi matematika singkat: 8/9 < 1 < 7/6.\n' +
			'4. Kesimpulan: 8/9 < 7/6.\n' +
			'Bimbingan Sokratik: Tuntun siswa bahwa pecahan sejati (< 1) pasti selalu lebih kecil daripada pecahan tidak sejati (> 1), sehingga dapat dibandingkan langsung tanpa menyamakan penyebut.',
		evaluationParameters: {
			expected_answer_keywords: [
				'8/9',
				'7/6',
				'sejati',
				'tidak sejati',
				'kurang',
				'lebih',
				'<',
			],
			expected_sentence_blanks: {
				b_8_9_comp: 'kecil',
				b_8_9_type: 'sejati',
				b_8_9_unit: 'kurang',
				b_7_6_comp: 'besar',
				b_7_6_type: 'tidak_sejati',
				b_7_6_unit: 'lebih',
				chain_left: '8/9',
				chain_right: '7/6',
				conc_left: '8/9',
				conc_right: '7/6',
			},
			common_misconceptions: [
				'Mengira 8/9 > 7/6 hanya karena angka 8 dan 9 lebih besar dari 7 dan 6',
			],
			strictness_level: 'strict',
			hints: [
				'Perhatikan: 8/9 memiliki pembilang lebih kecil (8 < 9), jadi 8/9 adalah pecahan sejati yang nilainya kurang dari 1.',
				'Pecahan 7/6 memiliki pembilang lebih besar (7 > 6), jadi 7/6 adalah pecahan tidak sejati yang nilainya lebih dari 1.',
				'Maka rantai perbandingannya: 8/9 < 1 < 7/6, sehingga 8/9 < 7/6.',
			],
		},
		answers: {
			analisis_8_9:
				'pembilang lebih kecil, pecahan sejati, kurang dari 1',
			analisis_7_6:
				'pembilang lebih besar, pecahan tidak sejati, lebih dari 1',
			rantai_notasi: '8/9 < 1 < 7/6',
			kesimpulan: '8/9 < 7/6',
		},
	},

	// ─── Soal 8: Aktivitas 3.7 — Konsep Memperluas Pecahan 1/2 Menjadi 2/4 ───
	{
		learningObjective:
			'Siswa dapat memahami konsep memperluas pecahan dengan mengalikan pembilang dan penyebut menggunakan bilangan yang sama.',
		questionType: 'pizza_slice_marker',
		questionUi: doc(
			heading(
				3,
				'Aktivitas 3.7: Menunjukkan Pecahan Senilai $\\frac{1}{2}$ dan $\\frac{2}{4}$',
			),
			image(
				'/images/topic2/two_pizzas_plain.svg',
				'Dua pizza utuh untuk menunjukkan pecahan senilai 1/2 dan 2/4',
			),
			p(
				bold(
					'Lakukan kegiatan di atas untuk kedua pecahan yang senilai, yaitu $\\frac{1}{2}$ dan $\\frac{2}{4}$. Tunjukkanlah pada model pizza di bawah ini!',
				),
			),
			p(
				'Jika kita ingin menjelaskan langkah-langkah ini tanpa menggambar dan memotong pizza, kita bisa menuliskannya dengan cara berikut:',
			),
			p(
				'Kita mulai dengan satu potong pizza yang dibagi menjadi dua bagian sama besar: $\\frac{1}{2}$. Kita membagi pecahan ini menjadi bagian yang lebih kecil dengan cara mengalikan pembilang dan penyebutnya dengan ',
				bold('2'),
				':',
			),
			math('\\frac{1 \\times 2}{2 \\times 2} = \\frac{2}{4}'),
			p(
				'Nilai pecahannya tetap sama. Jadi, $\\frac{1}{2} = \\frac{2}{4}$. Cara ini memiliki nama, yaitu ',
				bold('Memperluas Pecahan'),
				', atau mengalikan pembilang dan penyebut dengan bilangan yang sama.',
			),
		),
		answerConfig: {
			pizzas: [
				{
					label: 'Pizza Pertama (1/2)',
					totalSlices: 2,
					targetFraction: '1/2',
					helperText: 'Tandai 1 dari 2 potong',
				},
				{
					label: 'Pizza Kedua (2/4)',
					totalSlices: 4,
					targetFraction: '2/4',
					helperText: 'Tandai 2 dari 4 potong',
				},
			],
			instruction:
				'Klik potongan pizza untuk menunjukkan 1/2 pada pizza pertama dan 2/4 pada pizza kedua.',
		},
		questionLlmContext:
			'Aktivitas 3.7: Menunjukkan pecahan senilai 1/2 dan 2/4 pada dua pizza, dan memahami konsep Memperluas Pecahan:\n' +
			'- Pizza 1: dipotong 2, ditandai 1 potong (1/2).\n' +
			'- Pizza 2: dipotong 4, ditandai 2 potong (2/4).\n' +
			'- Operasi simbolik: (1 x 2)/(2 x 2) = 2/4.\n' +
			'- Definisi: Memperluas pecahan adalah mengalikan pembilang dan penyebut dengan bilangan yang sama.\n' +
			'Bimbingan Sokratik: Tanyakan kepada siswa apakah 1 potong dari 2 bagian sama luasnya dengan 2 potong dari 4 bagian, dan jelaskan bahwa ini adalah memperluas pecahan dengan pengali 2.',
		evaluationParameters: {
			expected_answer_keywords: [
				'1/2',
				'2/4',
				'senilai',
				'memperluas',
				'dikali 2',
			],
			expected_pizza_slices: {
				0: 1,
				1: 2,
			},
			common_misconceptions: [
				'Menandai jumlah potong yang salah pada pizza',
				'Mengira memperluas pecahan mengubah nilai pecahan (nilainya tetap sama senilai)',
			],
			strictness_level: 'strict',
			hints: [
				'Pada pizza pertama (2 potong), klik 1 potong untuk menunjukkan 1/2.',
				'Pada pizza kedua (4 potong), klik 2 potong untuk menunjukkan 2/4.',
				'Perhatikan bahwa 1/2 dan 2/4 sama besar, dan 2/4 diperoleh dari mengalikan pembilang dan penyebut 1/2 dengan 2.',
			],
		},
		answers: {
			pizza_1: '1 dari 2 potong (1/2)',
			pizza_2: '2 dari 4 potong (2/4)',
			konsep: 'Memperluas pecahan dengan mengalikan pembilang dan penyebut dengan 2: (1x2)/(2x2) = 2/4',
		},
	},

	// ─── Soal 9: Aktivitas 3.8 — Menentukan Bilangan Pengali (Perluasan Pecahan) ───
	{
		learningObjective:
			'Siswa dapat menentukan bilangan pengali yang tepat untuk pembilang dan penyebut pada perluasan pecahan.',
		questionType: 'fraction_expansion',
		questionUi: doc(
			heading(
				3,
				'Aktivitas 3.8: Menentukan Bilangan Pengali pada Perluasan Pecahan',
			),
			p(
				'Dengan bilangan berapa pembilang dan penyebut pecahan harus dikalikan? Lengkapilah!',
			),
		),
		answerConfig: {
			items: [
				{
					prompt: 'Dengan bilangan berapa $\\frac{2}{5}$ dikalikan agar menjadi $\\frac{4}{10}$?',
					originalFraction: '2/5',
					targetFraction: '4/10',
				},
				{
					prompt: 'Dengan bilangan berapa $\\frac{3}{7}$ dikalikan agar menjadi $\\frac{12}{28}$?',
					originalFraction: '3/7',
					targetFraction: '12/28',
				},
				{
					prompt: 'Dengan bilangan berapa $\\frac{1}{3}$ dikalikan agar menjadi $\\frac{4}{12}$?',
					originalFraction: '1/3',
					targetFraction: '4/12',
				},
			],
		},
		questionLlmContext:
			'Aktivitas 3.8: Menentukan bilangan pengali (k) pada 3 persamaan perluasan pecahan:\n' +
			'1. 2/5 -> 4/10: 2 dikali 2 = 4, dan 5 dikali 2 = 10. Bilangan pengali = 2.\n' +
			'2. 3/7 -> 12/28: 3 dikali 4 = 12, dan 7 dikali 4 = 28. Bilangan pengali = 4.\n' +
			'3. 1/3 -> 4/12: 1 dikali 4 = 4, dan 3 dikali 4 = 12. Bilangan pengali = 4.\n' +
			'Kunci jawaban: nomor 1 = 2, nomor 2 = 4, nomor 3 = 4.\n' +
			'Bimbingan Sokratik: Tanyakan kepada siswa, 2 dikali berapa menghasilkan 4? Atau 5 dikali berapa menghasilkan 10?',
		evaluationParameters: {
			expected_answer_keywords: ['2', '4'],
			expected_multipliers: {
				0: 2,
				1: 4,
				2: 4,
			},
			common_misconceptions: [
				'Mengurangkan atau menjumlahkan alih-alih mencari faktor kali (misal mengira ditambah 2 atau ditambah 5)',
			],
			strictness_level: 'strict',
			hints: [
				'Untuk 2/5 menjadi 4/10: pikirkan 2 dikali berapa agar menjadi 4? 2 x 2 = 4.',
				'Untuk 3/7 menjadi 12/28: pikirkan 3 dikali berapa agar menjadi 12? 3 x 4 = 12.',
				'Untuk 1/3 menjadi 4/12: pikirkan 1 dikali berapa agar menjadi 4? 1 x 4 = 4.',
			],
		},
		answers: {
			'0': 2,
			'1': 4,
			'2': 4,
		},
	},
];
