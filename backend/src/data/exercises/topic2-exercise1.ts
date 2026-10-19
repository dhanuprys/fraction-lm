import { bold, bulletList, doc, heading, image, math, p } from '../helpers';
import type { QuestionSeedData } from '../types';

export const topic2Exercise1Questions: QuestionSeedData[] = [
	// ─── Soal 1: Aktivitas 2.1 — Pizza Orang Tua dan 3 Anak ───
	{
		learningObjective:
			'Siswa dapat menentukan dan mengurutkan pecahan dari pembagian pizza keluarga.',
		questionType: 'fraction_input',
		questionUi: doc(
			heading(
				3,
				'Aktivitas 2.1: Pembagian Pizza Keluarga (Ayah, Ibu, dan Tiga Anak)',
			),
			image(
				'/images/topic2/two_pizzas_boxes.svg',
				'Dua buah pizza utuh di dalam kotak kardus terbuka',
			),
			p(
				'Sebuah keluarga memesan dua buah pizza. Orang tua membagi satu pizza untuk mereka berdua: ',
				bold('ayah mengambil 5 potong'),
				', sedangkan ',
				bold('ibu mengambil 3 potong'),
				'.',
			),
			p(
				'Ibu memakan $\\frac{3}{8}$ bagian pizza, sedangkan ayah memakan $\\frac{5}{8}$ bagian pizza. Karena 5 potong lebih banyak daripada 3 potong, maka berlaku $\\frac{5}{8} > \\frac{3}{8}$.',
			),
			p(
				bold('Tugasmu: '),
				'Pizza kedua dibagi oleh 3 anak bernama ',
				bold('Tari (4 potong)'),
				', ',
				bold('Dude (1 potong)'),
				', dan ',
				bold('Reza (3 potong)'),
				'. Tuliskan bagian pecahan pizza yang dimakan oleh masing-masing anak:',
			),
		),
		answerConfig: {
			fields: [
				{
					prompt: 'Bagian pizza yang dimakan Tari (4 dari 8 potong):',
					prefilled: { denominator: 8 },
				},
				{
					prompt: 'Bagian pizza yang dimakan Dude (1 dari 8 potong):',
					prefilled: { denominator: 8 },
				},
				{
					prompt: 'Bagian pizza yang dimakan Reza (3 dari 8 potong):',
					prefilled: { denominator: 8 },
				},
			],
		},
		questionLlmContext:
			'Konteks Visual & Aktivitas 2.1:\n' +
			'Siswa melihat gambar dua buah pizza di dalam kardus terbuka (two_pizzas_boxes.svg). Masing-masing pizza dipotong menjadi 8 bagian sama besar.\n' +
			'Pizza pertama: Ayah makan 5 potong (5/8), Ibu makan 3 potong (3/8). 5/8 > 3/8.\n' +
			'Pizza kedua dibagi 3 anak: Tari (4 potong), Dude (1 potong), Reza (3 potong).\n' +
			'Jawaban:\n' +
			'- Tari = 4/8 bagian pizza.\n' +
			'- Dude = 1/8 bagian pizza.\n' +
			'- Reza = 3/8 bagian pizza.\n' +
			'Urutan dari terbesar ke terkecil: 4/8 (Tari) > 3/8 (Reza) > 1/8 (Dude).\n' +
			'Kalimat perbandingan: Bagian pizza Tari (4/8) lebih besar dari bagian Reza (3/8) dan bagian Reza (3/8) lebih besar dari bagian Dude (1/8).\n' +
			'Bimbingan Sokratik: Ingatkan bahwa total potongan satu pizza adalah 8 (penyebut = 8). Jumlah potong yang dimakan menjadi pembilang.',
		evaluationParameters: {
			expected_answer_keywords: [
				'\\frac{4}{8}',
				'4/8',
				'\\frac{1}{8}',
				'1/8',
				'\\frac{3}{8}',
				'3/8',
			],
			common_misconceptions: [
				'Menulis penyebut selain 8 (misal 3 karena ada 3 anak)',
				'Tertukar pembilang antar anak',
			],
			strictness_level: 'strict',
			hints: [
				'Satu pizza dipotong menjadi 8 potong sama besar, jadi penyebutnya adalah 8.',
				'Tari makan 4 potong dari 8 potong, artinya Tari memakan 4/8.',
				'Dude makan 1 potong (1/8) dan Reza makan 3 potong (3/8).',
			],
		},
		answers: {
			tari: '4/8',
			dude: '1/8',
			reza: '3/8',
		},
	},

	// ─── Soal 2: Aktivitas 2.2 — Notasi Matematika Singkat (>) ───
	{
		learningObjective:
			'Siswa dapat menuliskan perbandingan pecahan dalam notasi matematika menggunakan simbol >.',
		questionType: 'fraction_comparison',
		questionUi: doc(
			heading(
				3,
				'Aktivitas 2.2: Notasi Singkat "Lebih Besar Dari" ( > )',
			),
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
			'Aktivitas 2.2: Siswa mengubah pernyataan verbal "lebih besar dari" menjadi simbol >:\n' +
			'1. 3/6 > 3/8 (pembilang sama, penyebut 6 < 8 maka potongan 3/6 lebih besar)\n' +
			'2. 3/4 > 1/4 (penyebut sama, pembilang 3 > 1)\n' +
			'3. 1/2 > 1/4 (1/2 = 2/4 > 1/4)\n' +
			'4. 4/6 > 1/6 (penyebut sama, pembilang 4 > 1)\n' +
			'Semua pasangan bernilai >.',
		evaluationParameters: {
			expected_answer_keywords: ['>'],
			expected_operators: ['>', '>', '>', '>'],
			common_misconceptions: [
				'Menggunakan < padahal soal menyatakan "lebih besar"',
				'Bingung antara simbol > dan <',
			],
			strictness_level: 'strict',
			hints: [
				'Perhatikan kata "lebih besar daripada". Simbol > selalu membuka mulutnya ke pecahan yang lebih besar.',
			],
		},
		answers: {
			operators: ['>', '>', '>', '>'],
		},
	},

	// ─── Soal 3: Aktivitas 2.3 — Notasi Matematika Singkat (<) ───
	{
		learningObjective:
			'Siswa dapat menuliskan perbandingan pecahan dalam notasi matematika menggunakan simbol <.',
		questionType: 'fraction_comparison',
		questionUi: doc(
			heading(
				3,
				'Aktivitas 2.3: Notasi Singkat "Lebih Kecil Dari" ( < )',
			),
			p(
				'Tuliskan dalam bentuk notasi matematika singkat. Pilih simbol yang tepat ',
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
			'Aktivitas 2.3: Siswa mengubah pernyataan verbal "lebih kecil dari" menjadi simbol <:\n' +
			'1. 3/6 < 5/6 (penyebut sama, 3 < 5)\n' +
			'2. 2/4 < 3/4 (penyebut sama, 2 < 3)\n' +
			'3. 1/2 < 3/4 (1/2 = 2/4 < 3/4)\n' +
			'4. 4/6 < 5/6 (penyebut sama, 4 < 5)\n' +
			'Semua pasangan bernilai <.',
		evaluationParameters: {
			expected_answer_keywords: ['<'],
			expected_operators: ['<', '<', '<', '<'],
			common_misconceptions: [
				'Menggunakan > padahal soal menyatakan "lebih kecil"',
			],
			strictness_level: 'strict',
			hints: [
				'Perhatikan kata "lebih kecil daripada". Simbol < menunjuk ujung lancipnya ke pecahan yang lebih kecil.',
			],
		},
		answers: {
			operators: ['<', '<', '<', '<'],
		},
	},

	// ─── Soal 4: Aktivitas 2.4 — Pecahan Senilai Grid 12 Kotak ───
	{
		learningObjective:
			'Siswa dapat menentukan pecahan senilai 1/6 = 2/12 dengan bantuan grid 12 kotak berpasangan warna.',
		questionType: 'fraction_input',
		questionUi: doc(
			heading(3, 'Aktivitas 2.4: Pecahan Senilai pada Grid 12 Kotak'),
			image(
				'/images/topic2/grid_12_colors_pairs.svg',
				'Persegi panjang 12 kotak sama besar (3 baris x 4 kolom) dalam 6 pasang warna berbeda',
			),
			p(
				'Pada gambar di atas, kita mencoba memperkirakan berapa besar $\\frac{1}{6}$ dari luas bidang tersebut.',
			),
			p(
				'Bidang dibagi menjadi 12 bagian yang sama besar (3 baris $\\times$ 4 kolom) yang dikelompokkan dalam 6 pasang warna (oranye, biru, abu-abu, cyan, hijau, kuning). Setiap 2 kotak dengan warna yang sama mewakili $\\frac{1}{6}$ dari bidang tersebut.',
			),
			p('Lengkapilah pecahan senilai berikut:'),
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
			'Konteks Visual & Aktivitas 2.4:\n' +
			'Siswa melihat grid 3x4 = 12 kotak (grid_12_colors_pairs.svg) dengan 6 pasangan warna:\n' +
			'- 2 sel oranye, 2 sel biru\n' +
			'- 2 sel abu-abu, 2 sel cyan\n' +
			'- 2 sel hijau, 2 sel kuning\n' +
			'Karena ada 6 warna sama banyak dari total 12 kotak, maka 1 warna = 1/6 bagian = 2 kotak dari 12.\n' +
			'Jadi pecahan senilainya: 1/6 = 2/12. Angka pembilang yang dicari adalah 2.\n' +
			'Bimbingan Sokratik: Minta siswa menghitung berapa kotak yang memiliki satu warna yang sama.',
		evaluationParameters: {
			expected_answer_keywords: ['2', '\\frac{2}{12}', '2/12'],
			common_misconceptions: [
				'Menjawab 1 karena menyalin pembilang dari 1/6',
				'Menjawab 6 karena melihat angka 6',
			],
			strictness_level: 'strict',
			hints: [
				'Lihat satu kelompok warna pada gambar, misalnya warna oranye. Ada berapa kotak oranye?',
				'Ada 2 kotak oranye dari total 12 kotak, jadi 1/6 senilai dengan 2/12.',
			],
		},
		answers: { numerator: 2 },
	},

	// ─── Soal 5: Aktivitas 2.5 — Penalaran Kritis: Elsa vs Irfan ───
	{
		learningObjective:
			'Siswa dapat bernalar kritis tentang informasi yang dibutuhkan untuk menentukan besar bagian pecahan.',
		questionType: 'short_answer',
		questionUi: doc(
			heading(
				3,
				'Aktivitas 2.5: Penalaran Kritis Besar Bagian Pecahan (Elsa vs Irfan)',
			),
			image(
				'/images/topic2/two_pizzas_plain.svg',
				'Dua buah pizza utuh bundar tanpa garis potongan',
			),
			p(
				bold('Elsa: '),
				'“Jika saya mengetahui berapa banyak potong pizza yang dimakan oleh seseorang, maka saya juga dapat menentukan seberapa besar bagiannya.”',
			),
			p(
				bold('Irfan: '),
				'“Saya tidak percaya itu. Untuk melakukan hal tersebut, kamu membutuhkan informasi tentang menjadi berapa banyak potongan pizza yang telah dipotong.”',
			),
			p(bold('Pertanyaan: '), 'Siapa yang benar? Jelaskan alasanmu!'),
		),
		questionLlmContext:
			'Konteks Visual & Aktivitas 2.5:\n' +
			'Siswa melihat dua pizza utuh tanpa garis potongan (two_pizzas_plain.svg).\n' +
			'Inti persoalan: Apakah cukup tahu jumlah potongan yang dimakan saja (argumen Elsa)?\n' +
			'Jawaban benar: Irfan yang benar.\n' +
			'Alasan matematika: Pecahan adalah perbandingan antara bagian yang diambil (pembilang) terhadap TOTAL keseluruhan potongan (penyebut).\n' +
			'Contoh kontras: Makan 2 potong dari pizza yang dipotong 4 menghasilkan 2/4 = 1/2 (setengah pizza). Tetapi makan 2 potong dari pizza yang dipotong 8 menghasilkan 2/8 = 1/4 (seperempat pizza). Tanpa mengetahui penyebut (total potongan pizza), besar bagian pecahan tidak dapat ditentukan.\n' +
			'Bimbingan Sokratik: Tanyakan kepada siswa, apakah 2 potong pizza kecil sama besarnya dengan 2 potong pizza raksasa jika kita tidak tahu dipotong berapa?',
		evaluationParameters: {
			expected_answer_keywords: [
				'Irfan',
				'benar',
				'total',
				'potongan',
				'penyebut',
				'keseluruhan',
				'dipotong',
			],
			common_misconceptions: [
				'Membenarkan Elsa karena mengira jumlah potong sudah cukup',
			],
			strictness_level: 'lenient',
			hints: [
				'Pikirkan: jika kamu makan 2 potong pizza, apakah kamu pasti tahu itu setengah pizza atau seperempat pizza?',
				'Kita juga harus tahu pizza tersebut dipotong menjadi berapa bagian sama besar secara keseluruhan.',
			],
		},
		answers: {
			jawaban: 'Irfan',
			alasan: 'Irfan benar karena kita harus mengetahui total potongan pizza (penyebut), bukan hanya potongan yang dimakan (pembilang).',
		},
	},

	// ─── Soal 6: Aktivitas 2.6 — Tabel Centang Benar/Salah ───
	{
		learningObjective:
			'Siswa dapat menentukan kebenaran pernyataan perbandingan pecahan.',
		questionType: 'true_false_table',
		questionUi: doc(
			heading(
				3,
				'Aktivitas 2.6: Evaluasi Perbandingan Pecahan (Tabel Centang)',
			),
			p(
				'Tentukan apakah setiap pernyataan perbandingan pecahan berikut ',
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
			'Aktivitas 2.6: Tabel Benar/Salah untuk 6 baris pernyataan perbandingan pecahan:\n' +
			'a. 3/6 > 3/8 → BENAR (pembilang sama = 3, penyebut 6 < 8, maka potongan 3/6 lebih besar).\n' +
			'b. 1/3 > 1/4 → BENAR (pembilang sama = 1, penyebut 3 < 4).\n' +
			'c. 1/2 > 1/3 → BENAR (pembilang sama = 1, penyebut 2 < 3).\n' +
			'd. 1/2 = 2/4 → BENAR (pecahan senilai, atas dan bawah dikali 2).\n' +
			'e. 3/5 > 3/4 → SALAH (pembilang sama = 3, penyebut 5 > 4 maka potongan 3/5 LEBIH KECIL dari 3/4).\n' +
			'f. 7/8 > 8/9 → SALAH (7/8 = 63/72, sedangkan 8/9 = 64/72, jadi 7/8 < 8/9).\n' +
			'Kunci jawaban: Benar, Benar, Benar, Benar, Salah, Salah.',
		evaluationParameters: {
			expected_answer_keywords: ['Benar', 'Salah'],
			expected_row_answers: [true, true, true, true, false, false],
			common_misconceptions: [
				'Mengira 3/5 > 3/4 karena angka 5 lebih besar dari 4',
				'Mengira 7/8 > 8/9 tanpa membandingkan bagian yang tersisa (1/8 vs 1/9)',
			],
			strictness_level: 'strict',
			hints: [
				'Jika pembilangnya sama, semakin besar penyebut maka potongannya semakin kecil.',
				'1/2 sama nilainya dengan 2/4 (pecahan senilai).',
			],
		},
		answers: {
			row_answers: [true, true, true, true, false, false],
		},
	},

	// ─── Soal 7: Antara 2.6 & 2.7 — Model Tabel Seratusan ───
	{
		learningObjective:
			'Siswa dapat membandingkan pecahan berpenyebut 100 dengan membayangkan kotak pada tabel seratusan.',
		questionType: 'fraction_comparison',
		questionUi: doc(
			heading(3, 'Aktivitas 2.6 (Konseptual): Model Tabel Seratusan'),
			p(
				'Bagaimana cara membandingkan dua pecahan yang tidak dapat dibayangkan sebagai bagian dari pizza?',
			),
			p(
				'Kita mengambil $\\frac{3}{100}$ dan $\\frac{70}{100}$. Di sini kita dapat membayangkan kotak-kotak pada tabel seratusan:',
			),
			bulletList(
				'$\\frac{3}{100}$ menggambarkan 3 kotak pada tabel seratusan.',
				'$\\frac{70}{100}$ menggambarkan 70 Petak-petak pada tabel seratusan.',
			),
			p(
				'Berdasarkan banyaknya petak tersebut, pilihlah simbol perbandingan yang tepat ',
				bold('( > , < , = )'),
				':',
			),
		),
		answerConfig: {
			items: [
				{
					prompt: '$\\frac{70}{100}$ dibandingkan dengan $\\frac{3}{100}$ (70 petak vs 3 petak)',
					leftFraction: '70/100',
					rightFraction: '3/100',
				},
				{
					prompt: '$\\frac{3}{100}$ dibandingkan dengan $\\frac{70}{100}$ (3 petak vs 70 petak)',
					leftFraction: '3/100',
					rightFraction: '70/100',
				},
			],
		},
		questionLlmContext:
			'Aktivitas antara 2.6 dan 2.7: Model Tabel Seratusan untuk pecahan /100.\n' +
			'3/100 = 3 kotak dari 100 kotak.\n' +
			'70/100 = 70 kotak dari 100 kotak.\n' +
			'Karena 70 kotak jelas jauh lebih banyak daripada 3 kotak, maka:\n' +
			'1. 70/100 > 3/100\n' +
			'2. 3/100 < 70/100.',
		evaluationParameters: {
			expected_answer_keywords: ['>', '<'],
			expected_operators: ['>', '<'],
			common_misconceptions: ['Terbalik menempatkan simbol > dan <'],
			strictness_level: 'strict',
			hints: [
				'70 petak lebih banyak daripada 3 petak, jadi 70/100 lebih besar daripada 3/100.',
			],
		},
		answers: {
			operators: ['>', '<'],
		},
	},

	// ─── Soal 8: Aktivitas 2.7c — Mengurutkan Pecahan /100 ───
	{
		learningObjective:
			'Siswa dapat mengurutkan pecahan berpenyebut sama (100) dari terkecil ke terbesar.',
		questionType: 'fraction_ordering',
		questionUi: doc(
			heading(3, 'Aktivitas 2.7: Mengurutkan Pecahan Berpenyebut 100'),
			p(
				'Urutkan kartu pecahan berikut dari yang ',
				bold('terkecil hingga terbesar'),
				'. Geser atau tukar posisi kartu hingga urutannya tepat:',
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
			'Aktivitas 2.7c: Mengurutkan pecahan berpenyebut 100 dari terkecil ke terbesar.\n' +
			'Kartu awal: 17/100, 65/100, 15/100, 39/100.\n' +
			'Urutan pembilang dari terkecil: 15 < 17 < 39 < 65.\n' +
			'Urutan pecahan yang benar: 15/100 < 17/100 < 39/100 < 65/100.',
		evaluationParameters: {
			expected_answer_keywords: [
				'15/100',
				'17/100',
				'39/100',
				'65/100',
				'<',
			],
			common_misconceptions: [
				'Mengurutkan terbalik dari terbesar ke terkecil',
			],
			strictness_level: 'strict',
			hints: [
				'Semua pecahan memiliki penyebut 100. Cukup bandingkan pembilangnya: 17, 65, 15, 39.',
				'Urutan pembilang dari paling kecil: 15, 17, 39, lalu 65.',
			],
		},
		answers: {
			expected_order: ['15/100', '17/100', '39/100', '65/100'],
		},
	},

	// ─── Soal 9: Aktivitas 2.8 — Membandingkan Pasangan Pecahan ───
	{
		learningObjective:
			'Siswa dapat membandingkan pasangan pecahan berpenyebut sama dengan simbol matematika yang tepat (mempertahankan teks naskah 15/257).',
		questionType: 'fraction_comparison',
		questionUi: doc(
			heading(3, 'Aktivitas 2.8: Membandingkan Pecahan Berpenyebut Sama'),
			p(
				'Bandingkan pecahan-pecahan tersebut sesuai dengan besar nilainya. Pilih simbol yang tepat ',
				bold('( > , < , = )'),
				':',
			),
		),
		answerConfig: {
			items: [
				{
					prompt: 'a. Bandingkan $\\frac{3}{17}$ dan $\\frac{15}{17}$',
					leftFraction: '3/17',
					rightFraction: '15/17',
				},
				{
					prompt: 'b. Bandingkan $\\frac{10}{12}$ dan $\\frac{6}{12}$',
					leftFraction: '10/12',
					rightFraction: '6/12',
				},
				{
					prompt: 'c. Bandingkan $\\frac{13}{25}$ dan $\\frac{15}{257}$',
					leftFraction: '13/25',
					rightFraction: '15/257',
				},
			],
		},
		questionLlmContext:
			'Aktivitas 2.8: Membandingkan pasangan pecahan:\n' +
			'a. 3/17 dan 15/17: Penyebut sama (17), pembilang 3 < 15, maka 3/17 < 15/17.\n' +
			'b. 10/12 dan 6/12: Penyebut sama (12), pembilang 10 > 6, maka 10/12 > 6/12.\n' +
			'c. 13/25 dan 15/257: Catatan naskah mempertahankan angka 15/257 persis. 13/25 bernilai lebih dari setengah (0.52), sedangkan 15/257 bernilai sangat kecil (sekitar 0.058). Jadi 13/25 > 15/257.\n' +
			'Kunci operator: < , > , >.',
		evaluationParameters: {
			expected_answer_keywords: ['<', '>'],
			expected_operators: ['<', '>', '>'],
			common_misconceptions: [
				'Mengira 15/257 lebih besar karena angka 257 sangat besar',
			],
			strictness_level: 'strict',
			hints: [
				'Untuk soal a dan b, penyebutnya sama, jadi bandingkan langsung pembilangnya.',
				'Untuk soal c, 13/25 lebih dari setengah. Sedangkan 15/257 bendanya dibagi menjadi 257 bagian sehingga tiap potongan sangat amat kecil.',
			],
		},
		answers: {
			operators: ['<', '>', '>'],
		},
	},

	// ─── Soal 10: Aktivitas 2.9 — Pembilang Sama, Penyebut Berbeda ───
	{
		learningObjective:
			'Siswa dapat membandingkan pecahan berpembilang sama (pizza 8 potong vs pizza 4 potong).',
		questionType: 'fraction_comparison',
		questionUi: doc(
			heading(
				3,
				'Aktivitas 2.9: Membandingkan Pecahan Berpembilang Sama',
			),
			image(
				'/images/topic2/two_pizzas_plain.svg',
				'Dua buah pizza utuh untuk membandingkan pembagian 8 potong dan 4 potong',
			),
			p(
				'Kita kembali membayangkan dua buah pizza. Satu pizza dibagi menjadi ',
				bold('8 bagian sama besar'),
				', sedangkan pizza lainnya dibagi menjadi ',
				bold('4 bagian sama besar'),
				'.',
			),
			p(
				'Satu potong dari pizza 8 bagian ($\\frac{1}{8}$) lebih kecil daripada satu potong dari pizza 4 bagian ($\\frac{1}{4}$), sehingga berlaku $\\frac{1}{8} < \\frac{1}{4}$ dan $\\frac{2}{8} < \\frac{2}{4}$.',
			),
			p(
				bold('Kaidah penting: '),
				'Pembilang (jumlah potongan) nilainya sama, tetapi semakin besar penyebutnya, semakin banyak jumlah potongan dan semakin kecil ukuran setiap potongannya.',
			),
			p('Bandingkan pasangan pecahan berikut:'),
		),
		answerConfig: {
			items: [
				{
					prompt: 'Bandingkan $\\frac{3}{8}$ dan $\\frac{3}{4}$',
					leftFraction: '3/8',
					rightFraction: '3/4',
				},
				{
					prompt: 'Bandingkan $\\frac{4}{8}$ dan $\\frac{4}{4}$',
					leftFraction: '4/8',
					rightFraction: '4/4',
				},
			],
		},
		questionLlmContext:
			'Konteks Visual & Aktivitas 2.9:\n' +
			'Siswa membandingkan pecahan dengan pembilang sama tetapi penyebut berbeda:\n' +
			'- Pizza kiri dibagi 8 potong: tiap potong lebih kecil.\n' +
			'- Pizza kanan dibagi 4 potong: tiap potong lebih besar.\n' +
			'1. 3/8 vs 3/4: karena 1/8 < 1/4, maka 3/8 < 3/4.\n' +
			'2. 4/8 vs 4/4: 4/8 adalah setengah pizza, sedangkan 4/4 adalah pizza utuh, maka 4/8 < 4/4.\n' +
			'Kunci: < , <.',
		evaluationParameters: {
			expected_answer_keywords: ['<'],
			expected_operators: ['<', '<'],
			common_misconceptions: [
				'Mengira 3/8 > 3/4 karena angka 8 lebih besar dari 4',
			],
			strictness_level: 'strict',
			hints: [
				'Pembilangnya sama-sama 3. Pizza yang dipotong 4 memiliki potongan yang lebih besar daripada pizza yang dipotong 8.',
				'Jadi, 3/8 lebih kecil daripada 3/4.',
			],
		},
		answers: {
			operators: ['<', '<'],
		},
	},

	// ─── Soal 11: Aktivitas 2.10 — 9 Baris Perbandingan "Lebih Besar" ───
	{
		learningObjective:
			'Siswa dapat membandingkan pasangan pecahan untuk menentukan hubungan lebih besar dari.',
		questionType: 'fraction_comparison',
		questionUi: doc(
			heading(
				3,
				'Aktivitas 2.10: Menentukan Hubungan "Lebih Besar Dari"',
			),
			p(
				'Pilihlah simbol yang tepat ',
				bold('( > , < , = )'),
				' untuk setiap pasangan pecahan berikut:',
			),
		),
		answerConfig: {
			items: [
				{
					prompt: 'a. $\\frac{2}{4}$ dibandingkan dengan $\\frac{2}{8}$',
					leftFraction: '2/4',
					rightFraction: '2/8',
				},
				{
					prompt: 'b. $\\frac{4}{6}$ dibandingkan dengan $\\frac{4}{11}$',
					leftFraction: '4/6',
					rightFraction: '4/11',
				},
				{
					prompt: 'c. $\\frac{5}{9}$ dibandingkan dengan $\\frac{5}{12}$',
					leftFraction: '5/9',
					rightFraction: '5/12',
				},
				{
					prompt: 'd. $\\frac{6}{8}$ dibandingkan dengan $\\frac{3}{8}$',
					leftFraction: '6/8',
					rightFraction: '3/8',
				},
				{
					prompt: 'e. $\\frac{7}{9}$ dibandingkan dengan $\\frac{2}{9}$',
					leftFraction: '7/9',
					rightFraction: '2/9',
				},
				{
					prompt: 'f. $\\frac{8}{10}$ dibandingkan dengan $\\frac{4}{10}$',
					leftFraction: '8/10',
					rightFraction: '4/10',
				},
				{
					prompt: 'g. $\\frac{6}{8}$ dibandingkan dengan $\\frac{6}{10}$',
					leftFraction: '6/8',
					rightFraction: '6/10',
				},
				{
					prompt: 'h. $\\frac{7}{12}$ dibandingkan dengan $\\frac{7}{15}$',
					leftFraction: '7/12',
					rightFraction: '7/15',
				},
				{
					prompt: 'i. $\\frac{3}{7}$ dibandingkan dengan $\\frac{3}{10}$',
					leftFraction: '3/7',
					rightFraction: '3/10',
				},
			],
		},
		questionLlmContext:
			'Aktivitas 2.10: Melengkapi perbandingan "lebih besar dari" untuk 9 pasangan pecahan:\n' +
			'a. 2/4 > 2/8 (pembilang sama, penyebut 4 < 8)\n' +
			'b. 4/6 > 4/11 (pembilang sama, penyebut 6 < 11)\n' +
			'c. 5/9 > 5/12 (pembilang sama, penyebut 9 < 12)\n' +
			'd. 6/8 > 3/8 (penyebut sama, pembilang 6 > 3)\n' +
			'e. 7/9 > 2/9 (penyebut sama, pembilang 7 > 2)\n' +
			'f. 8/10 > 4/10 (penyebut sama, pembilang 8 > 4)\n' +
			'g. 6/8 > 6/10 (pembilang sama, penyebut 8 < 10)\n' +
			'h. 7/12 > 7/15 (pembilang sama, penyebut 12 < 15)\n' +
			'i. 3/7 > 3/10 (pembilang sama, penyebut 7 < 10)\n' +
			'Semua pasangan diurutkan sehingga pecahan kiri LEBIH BESAR daripada pecahan kanan (>).',
		evaluationParameters: {
			expected_answer_keywords: ['>'],
			expected_operators: ['>', '>', '>', '>', '>', '>', '>', '>', '>'],
			common_misconceptions: [
				'Bingung antara aturan penyebut sama vs pembilang sama',
			],
			strictness_level: 'strict',
			hints: [
				'Jika pembilangnya sama, pecahan dengan penyebut lebih kecil adalah yang lebih besar.',
				'Jika penyebutnya sama, pecahan dengan pembilang lebih besar adalah yang lebih besar.',
			],
		},
		answers: {
			operators: ['>', '>', '>', '>', '>', '>', '>', '>', '>'],
		},
	},

	// ─── Soal 12: Aufgabe 2.8 — Lingkaran 3 Sektor & Pecahan Senilai ───
	{
		learningObjective:
			'Siswa dapat bernalar tentang pecahan senilai melalui diagram lingkaran dan model pizza.',
		questionType: 'fraction_comparison',
		questionUi: doc(
			heading(
				3,
				'Aufgabe 2.8: Eksplorasi Pecahan Senilai (Lingkaran dan Pizza)',
			),
			image(
				'/images/topic2/circle_three_sectors.svg',
				'Diagram lingkaran 3 sektor: abu-abu seperempat, biru seperempat, oranye setengah',
			),
			p(
				'Perhatikan gambar lingkaran di atas: Bagian berwarna abu-abu adalah $\\frac{1}{4}$, bagian biru $\\frac{1}{4}$, dan bagian oranye $\\frac{1}{2}$.',
			),
			p(
				'Bagian abu-abu ($\\frac{1}{4}$) masih dapat dibagi menjadi dua bagian yang sama besar, masing-masing bernilai $\\frac{1}{8}$. Dari sini kita melihat bahwa dua kali $\\frac{1}{8}$ sama besar dengan $\\frac{1}{4}$ ($\\frac{2}{8} = \\frac{1}{4}$), dan dua kali $\\frac{1}{4}$ sama besar dengan setengah pizza ($\\frac{2}{4} = \\frac{1}{2}$).',
			),
			p(
				'Sekarang bayangkan jika pizza sebelah kiri dipotong 3 bagian dan diambil 1 potong ($\\frac{1}{3}$), sedangkan pizza sebelah kanan dipotong 6 bagian dan diambil 2 potong ($\\frac{2}{6}$). Jika diletakkan bertumpuk, kedua potongan tersebut sama besar!',
			),
			p(
				'Pilihlah simbol perbandingan yang tepat ',
				bold('( > , < , = )'),
				' untuk pasangan pecahan senilai berikut:',
			),
		),
		answerConfig: {
			items: [
				{
					prompt: 'Perbandingan $\\frac{2}{8}$ dan $\\frac{1}{4}$',
					leftFraction: '2/8',
					rightFraction: '1/4',
				},
				{
					prompt: 'Perbandingan $\\frac{2}{4}$ dan $\\frac{1}{2}$',
					leftFraction: '2/4',
					rightFraction: '1/2',
				},
				{
					prompt: 'Perbandingan $\\frac{1}{3}$ dan $\\frac{2}{6}$',
					leftFraction: '1/3',
					rightFraction: '2/6',
				},
			],
		},
		questionLlmContext:
			'Konteks Visual & Aufgabe 2.8:\n' +
			'Siswa melihat diagram lingkaran (circle_three_sectors.svg) dengan 3 sektor: abu-abu (1/4), biru (1/4), dan oranye (1/2).\n' +
			'Pecahan senilai yang dibahas:\n' +
			'1. 2/8 = 1/4 (sektor abu-abu dibagi 2 menghasilkan dua juring 1/8)\n' +
			'2. 2/4 = 1/2 (dua sektor seperempat sama besar dengan setengah lingkaran)\n' +
			'3. 1/3 = 2/6 (pizza dipotong 3 ambil 1 potong sama besarnya dengan pizza dipotong 6 ambil 2 potong)\n' +
			'Semua pasangan bernilai sama dengan (=).',
		evaluationParameters: {
			expected_answer_keywords: ['='],
			expected_operators: ['=', '=', '='],
			common_misconceptions: [
				'Mengira 2/6 lebih besar dari 1/3 karena angka 2 dan 6 lebih besar',
			],
			strictness_level: 'strict',
			hints: [
				'Kedua potongan menutupi luas yang persis sama saat ditumpuk.',
				'Simbol = digunakan ketika dua pecahan memiliki nilai yang sama besar (pecahan senilai).',
			],
		},
		answers: {
			operators: ['=', '=', '='],
		},
	},

	// ─── Soal 13: Refleksi Diri (Final Self-Assessment) ───
	{
		learningObjective:
			'Siswa dapat melakukan refleksi diri terhadap 7 indikator capaian pembelajaran pecahan.',
		questionType: 'true_false_table',
		questionUi: doc(
			heading(3, 'Refleksi Diri: Evaluasi Kemampuan Belajar Siswa'),
			p(
				'Berilah tanda centang pada kolom yang paling menggambarkan kemampuan belajarmu saat ini:',
			),
		),
		answerConfig: {
			labels: ['Baik', 'Perlu Latihan'],
			statements: [
				'Saya dapat menulis dan membaca pecahan.',
				'Saya dapat menyebutkan pembilang dan penyebut dari suatu pecahan.',
				'aya dapat menggambarkan pecahan sebagai bagian dari pizza.',
				'Saya dapat menggambarkan pecahan sebagai bagian dari suatu bidang.',
				'Saya dapat membandingkan dua pecahan dengan penyebut yang sama.',
				'Saya dapat membandingkan dua pecahan dengan pembilang yang sama.',
				'Saya dapat membandingkan pecahan dalam notasi singkat matematika.',
			],
		},
		questionLlmContext:
			'Refleksi Diri Siswa (Final Self-Assessment):\n' +
			'Siswa mengevaluasi pemahaman mereka terhadap 7 kemampuan dasar pecahan:\n' +
			'1. Menulis dan membaca pecahan\n' +
			'2. Menyebutkan pembilang dan penyebut\n' +
			'3. Menggambarkan pecahan bagian pizza (naskah asli menggunakan ejaan "aya")\n' +
			'4. Menggambarkan pecahan bagian bidang\n' +
			'5. Membandingkan dua pecahan penyebut sama\n' +
			'6. Membandingkan dua pecahan pembilang sama\n' +
			'7. Membandingkan pecahan dalam notasi matematika\n' +
			'Ini adalah instrumen metakognitif. Semua pengisian dinilai selesai secara positif untuk memberikan apresiasi refleksi diri kepada siswa.',
		evaluationParameters: {
			expected_answer_keywords: ['Baik', 'Perlu Latihan'],
			strictness_level: 'lenient',
			hints: [
				'Jawablah dengan jujur sesuai apa yang kamu rasakan setelah belajar topik ini.',
			],
		},
		answers: {
			completed: true,
		},
	},
];
