import { topic2Exercise1Questions } from './exercises/topic2-exercise1';
import { topic2Exercise2Questions } from './exercises/topic2-exercise2';
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
		name: 'Pecahan Senilai dan Membandingkan Pecahan',
		slug: 'pecahan-senilai-membandingkan-pecahan',
		description:
			'Mempelajari jenis pecahan (sejati dan tidak sejati), pecahan senilai, penyederhanaan dan perluasan pecahan, membandingkan dua pecahan (penyebut sama, pembilang sama, penyebut berbeda), dan mengurutkan pecahan.',
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
			// with exercise
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
					// ───────────────────────── LEMBAR KERJA (isExerciseOnly) ─────────────────────────
					{
						title: 'Lembar Kerja: Pecahan Senilai dan Membandingkan Pecahan',
						order: 4,
						difficulty: 2,
						isExerciseOnly: true,
						content: doc(
							heading(
								2,
								'Lembar Kerja: Pecahan Senilai dan Membandingkan Pecahan',
							),
							p(
								'Latihan ini menguji pemahaman kamu tentang pecahan senilai, simbol perbandingan (>, <, =), dan cara membandingkan serta mengurutkan pecahan sesuai naskah pembelajaran.',
							),
						),
						materialLlmContext:
							'Rangkuman Materi & Konsep Bab "Pecahan Senilai dan Membandingkan Pecahan" (Kelas 3–4 SD):\n' +
							'1. Konteks Visual & Model Riil:\n' +
							'   - Pizza Kardus (two_pizzas_boxes.svg, Aktivitas 2.1): Dua pizza utuh di dalam kotak kardus terbuka, masing-masing dipotong 8 bagian sama besar. Ayah makan 5 potong (5/8), Ibu makan 3 potong (3/8). Tari makan 4 potong (4/8), Dude makan 1 potong (1/8), Reza makan 3 potong (3/8). Urutan porsi anak dari terbesar: Tari (4/8) > Reza (3/8) > Dude (1/8).\n' +
							'   - Grid Warna 12 Sel (grid_12_colors_pairs.svg, Aktivitas 2.4): Persegi panjang 3x4 = 12 kotak sama besar dengan 6 pasang warna (oranye, biru, abu-abu, cyan, hijau, kuning). Tiap pasang warna terdiri dari 2 kotak, membuktikan pecahan senilai 1/6 = 2/12.\n' +
							'   - Dua Pizza Polos (two_pizzas_plain.svg, Aktivitas 2.5 & 2.9): Dua pizza utuh tanpa garis potongan. Digunakan untuk membuktikan bahwa mengetahui jumlah potongan yang dimakan saja tidak cukup (argumen Elsa keliru), melainkan harus tahu total potongan pizza dipotong sama besar (argumen Irfan benar). Juga digunakan untuk membandingkan pizza dipotong 8 vs dipotong 4 (1/8 < 1/4 dan 2/8 < 2/4).\n' +
							'   - Lingkaran Tiga Sektor (circle_three_sectors.svg, Aufgabe 2.8): Lingkaran dengan sektor abu-abu (1/4), biru (1/4), dan oranye (1/2). Sektor abu-abu 1/4 dapat dibagi 2 menjadi dua sektor 1/8, sehingga 2/8 = 1/4 dan 2/4 = 1/2. Pizza dipotong 3 ambil 1 potong (1/3) senilai dengan pizza dipotong 6 ambil 2 potong (2/6), yaitu 1/3 = 2/6.\n' +
							'2. Simbol Perbandingan Pecahan:\n' +
							'   - Simbol > artinya "lebih besar dari".\n' +
							'   - Simbol < artinya "lebih kecil dari".\n' +
							'   - Simbol = artinya "sama dengan" (senilai).\n' +
							'   - Mulut simbol (> atau <) selalu membuka ke arah pecahan yang nilainya LEBIH BESAR.\n' +
							'3. Kaidah Membandingkan Pecahan:\n' +
							'   a. Jika Penyebut Sama (misal 3/17 vs 15/17, atau per/100): Cukup bandingkan pembilangnya. Semakin besar pembilang, semakin besar nilai pecahannya.\n' +
							'   b. Jika Pembilang Sama (misal 3/8 vs 3/4, atau 4/6 vs 4/11): Perhatikan penyebutnya! Semakin BESAR penyebut, benda dibagi menjadi semakin BANYAK potongan, sehingga ukuran tiap potongan justru semakin KECIL. Pecahan dengan penyebut lebih kecil bernilai LEBIH BESAR (3/4 > 3/8, 4/6 > 4/11).\n' +
							'   c. Kasus Khusus 13/25 vs 15/257: 13/25 bernilai lebih dari setengah (0.52), sedangkan 15/257 bernilai sangat kecil (kurang dari 0.06), maka 13/25 > 15/257.\n' +
							'4. Bimbingan Sokratik: Jangan langsung memberikan jawaban simbol >/< atau angka. Ajak siswa membayangkan ukuran potongan pizza atau coklat.',
						questions: topic2Exercise1Questions,
					},
				],
			},

			// ═══════════════════ SUB-TOPIK 3.3 ═══════════════════
			{
				name: 'Pecahan Sejati dan Tidak Sejati',
				slug: 'pecahan-sejati-dan-tidak-sejati',
				description:
					'Mengenal perbedaan pecahan sejati dan pecahan tidak sejati berdasarkan hubungan antara pembilang dan penyebut.',
				order: 3,
				materials: [
					{
						title: 'Mengenal Pecahan Sejati dan Tidak Sejati',
						order: 1,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(
								2,
								'Apa Itu Pecahan Sejati dan Tidak Sejati?',
							),
							p(
								'Sebelum mempelajari lebih jauh tentang pecahan, kita perlu mengetahui bahwa pecahan memiliki beberapa jenis. Dua di antaranya adalah ',
								bold('pecahan sejati'),
								' dan ',
								bold('pecahan tidak sejati'),
								'.',
							),
							heading(3, '1. Pecahan Sejati'),
							p(
								'Pecahan sejati adalah pecahan yang memiliki ',
								bold('pembilang lebih kecil daripada penyebut'),
								'. Nilainya selalu kurang dari 1.',
							),
							p('Contoh:'),
							bulletList(
								'1/2 karena 1 < 2',
								'2/5 karena 2 < 5',
								'3/4 karena 3 < 4',
							),
							p(
								'Bayangkan sebuah pizza yang dibagi menjadi 4 bagian sama besar. Jika kamu mengambil 3 bagian, kamu mendapatkan 3/4 pizza. Karena belum mengambil seluruh pizza, nilai pecahannya kurang dari 1.',
							),
							math('\\frac{3}{4} < 1'),
							heading(3, '2. Pecahan Tidak Sejati'),
							p(
								'Pecahan tidak sejati adalah pecahan yang memiliki ',
								bold(
									'pembilang lebih besar atau sama dengan penyebut',
								),
								'. Nilainya sama dengan atau lebih besar dari 1.',
							),
							p('Contoh:'),
							bulletList(
								'5/4 karena 5 > 4',
								'7/3 karena 7 > 3',
								'4/4 karena 4 = 4',
							),
							p(
								'Jika pizza dibagi menjadi 4 bagian sama besar dan kamu mengambil 5 bagian dengan ukuran yang sama, jumlahnya lebih dari satu pizza utuh.',
							),
							math('\\frac{5}{4} > 1'),
							p(
								'Jika pembilang dan penyebut sama, seperti 4/4, pecahan tersebut nilainya tepat 1.',
							),
							math('\\frac{4}{4} = 1'),
							heading(3, 'Ingat Perbedaannya!'),
							bulletList(
								'Pecahan sejati: pembilang < penyebut.',
								'Pecahan tidak sejati: pembilang ≥ penyebut.',
							),
						),
						materialLlmContext:
							'Materi ini memperkenalkan pecahan sejati dan tidak sejati untuk siswa SD. ' +
							'Pecahan sejati memiliki pembilang lebih kecil daripada penyebut dan nilainya kurang dari 1. Contoh: 1/2, 2/5, dan 3/4. ' +
							'Pecahan tidak sejati memiliki pembilang lebih besar atau sama dengan penyebut dan nilainya minimal 1. Contoh: 5/4, 7/3, dan 4/4. ' +
							'Jika pembilang sama dengan penyebut, nilainya adalah 1.',
						questions: [],
					},
					{
						title: 'Membedakan Pecahan Sejati dan Tidak Sejati',
						order: 2,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, 'Bagaimana Cara Membedakannya?'),
							p(
								'Cara membedakan pecahan sejati dan tidak sejati cukup mudah. Perhatikan pembilang dan penyebutnya, kemudian bandingkan kedua bilangan tersebut.',
							),
							heading(3, 'Langkah-langkah'),
							orderedList(
								'Perhatikan pembilang, yaitu bilangan di atas garis pecahan.',
								'Perhatikan penyebut, yaitu bilangan di bawah garis pecahan.',
								'Bandingkan pembilang dengan penyebut.',
								'Tentukan jenis pecahannya.',
							),
							heading(3, 'Contoh 1: Pecahan 2/7'),
							math('2 < 7'),
							p(
								'Pembilang 2 lebih kecil daripada penyebut 7. Jadi, 2/7 adalah pecahan sejati.',
							),
							heading(3, 'Contoh 2: Pecahan 6/6'),
							math('6 = 6'),
							p(
								'Pembilang sama dengan penyebut. Jadi, 6/6 adalah pecahan tidak sejati dan nilainya sama dengan 1.',
							),
							heading(3, 'Contoh 3: Pecahan 9/5'),
							math('9 > 5'),
							p(
								'Pembilang 9 lebih besar daripada penyebut 5. Jadi, 9/5 adalah pecahan tidak sejati dan nilainya lebih dari 1.',
							),
							p(
								bold('Tips: '),
								'Jangan hanya melihat besar angka pembilang. Selalu bandingkan pembilang dengan penyebut.',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan cara mengidentifikasi jenis pecahan dengan membandingkan pembilang dan penyebut. ' +
							'Jika pembilang lebih kecil daripada penyebut, pecahan sejati. Jika pembilang lebih besar atau sama dengan penyebut, pecahan tidak sejati. ' +
							'Contoh: 2/7 adalah pecahan sejati; 6/6 dan 9/5 adalah pecahan tidak sejati.',
						questions: [],
					},
				],
			},

			// ═══════════════════ SUB-TOPIK 3.4 ═══════════════════
			{
				name: 'Pecahan yang Setara',
				slug: 'pecahan-yang-setara',
				description:
					'Mengenal pecahan setara yang memiliki nilai sama meskipun pembilang dan penyebutnya berbeda.',
				order: 4,
				materials: [
					{
						title: 'Pengertian Pecahan yang Setara',
						order: 1,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, 'Apa Itu Pecahan Setara?'),
							p(
								'Pecahan setara adalah dua pecahan atau lebih yang memiliki ',
								bold('nilai yang sama'),
								', meskipun pembilang dan penyebutnya bisa berbeda.',
							),
							p(
								'Bayangkan dua pizza yang ukurannya sama. Pizza pertama dipotong menjadi 2 bagian sama besar, sedangkan pizza kedua dipotong menjadi 4 bagian sama besar.',
							),
							p(
								'Jika kamu mengambil setengah dari setiap pizza:',
							),
							bulletList(
								'Pizza pertama: 1 dari 2 bagian, yaitu 1/2.',
								'Pizza kedua: 2 dari 4 bagian, yaitu 2/4.',
							),
							p(
								'Walaupun jumlah potongannya berbeda, bagian pizza yang kamu ambil sama banyak.',
							),
							math('\\frac{1}{2} = \\frac{2}{4}'),
							heading(3, 'Contoh Pecahan Setara'),
							math(
								'\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6} = \\frac{4}{8}',
							),
							p(
								'Semua pecahan tersebut mewakili setengah dari satu benda utuh.',
							),
							heading(3, 'Cara Mengingatnya'),
							p(
								'Pembilang dan penyebut boleh berbeda, tetapi nilai pecahannya harus tetap sama. Seperti satu kue yang dipotong menjadi beberapa bagian dengan ukuran berbeda, bagian yang diambil dapat tetap mewakili jumlah yang sama.',
							),
							p(
								bold('Ingat: '),
								'Pecahan setara memiliki nilai yang sama, bukan harus memiliki angka pembilang dan penyebut yang sama.',
							),
						),
						materialLlmContext:
							'Materi ini memperkenalkan pecahan setara kepada siswa SD. ' +
							'Pecahan setara adalah pecahan berbeda yang mempunyai nilai sama. ' +
							'Contoh: 1/2 = 2/4 = 3/6 = 4/8. ' +
							'Kesetaraan dapat dijelaskan menggunakan benda yang sama besar, seperti pizza atau kue yang dibagi menjadi jumlah potongan berbeda tetapi bagian yang diambil memiliki nilai sama.',
						questions: topic2Exercise2Questions,
					},
				],
			},
		],
	};
