import {
	bold,
	bulletList,
	doc,
	heading,
	image,
	math,
	orderedList,
	p,
} from "./helpers";

export const topic2 =
	// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  TOPIC 2  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	{
		name: "Pecahan Senilai dan Membandingkan Pecahan",
		slug: "pecahan-senilai-membandingkan-pecahan",
		description:
			"Mempelajari jenis pecahan (sejati dan tidak sejati), pecahan senilai, penyederhanaan dan perluasan pecahan, membandingkan dua pecahan (penyebut sama, pembilang sama, penyebut berbeda), dan mengurutkan pecahan.",
		order: 2,
		subTopics: [
			// ═══════════════════ SUB-TOPIK 3.1 ═══════════════════
			{
				name: "Membandingkan Dua Pecahan",
				slug: "membandingkan-dua-pecahan",
				description:
					"Menentukan mana yang lebih besar, lebih kecil, atau sama di antara dua pecahan.",
				order: 1,
				materials: [
					{
						title: "Pengertian Membandingkan Pecahan",
						order: 1,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Apa Itu Membandingkan Pecahan?"),
							p(
								"Membandingkan pecahan artinya menentukan pecahan mana yang ",
								bold("lebih besar"),
								", ",
								bold("lebih kecil"),
								", atau apakah keduanya ",
								bold("sama"),
								".",
							),
							heading(3, "Simbol Perbandingan"),
							bulletList(
								'> artinya "lebih besar dari"',
								'< artinya "lebih kecil dari"',
								'= artinya "sama dengan"',
							),
							p(
								bold("Tips: "),
								"Mulut simbol selalu terbuka ke arah bilangan yang lebih besar.",
							),
							heading(3, "Contoh dengan Gambar"),
							p("Dua cokelat yang sama besar:"),
							p("1/2 → 🟫🟫⬜⬜"),
							p("3/4 → 🟫🟫🟫⬜"),
							p("Bagian berwarna 3/4 lebih banyak daripada 1/2."),
							math("\\frac{1}{2} < \\frac{3}{4}"),
							p(
								"Ada tiga cara membandingkan pecahan, tergantung penyebut dan pembilangnya. Kita akan mempelajarinya satu per satu.",
							),
						),
						materialLlmContext:
							"Materi ini memperkenalkan pengertian membandingkan pecahan untuk siswa SD: menentukan pecahan yang lebih besar, lebih kecil, atau sama. " +
							"Simbol: > (lebih besar dari), < (lebih kecil dari), = (sama dengan). Mulut simbol terbuka ke arah bilangan yang lebih besar. " +
							"Contoh visual: 1/2 < 3/4.",
						questions: [],
					},
					{
						title: "Membandingkan Pecahan dengan Penyebut Sama",
						order: 2,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Penyebut Sama"),
							p(
								"Jika dua pecahan memiliki ",
								bold("penyebut yang sama"),
								", bandingkan saja ",
								bold("pembilangnya"),
								". Pembilang lebih besar berarti pecahan lebih besar.",
							),
							heading(3, "Contoh"),
							p("3/5 → 🟩🟩🟩⬜⬜"),
							p("2/5 → 🟩🟩⬜⬜⬜"),
							math("\\frac{3}{5} > \\frac{2}{5}"),
							p("Karena penyebutnya sama (5) dan 3 > 2."),
						),
						materialLlmContext:
							"Materi ini mengajarkan membandingkan pecahan berpenyebut sama. " +
							"Jika penyebut sama, bandingkan pembilang: pembilang lebih besar = pecahan lebih besar. " +
							"Contoh: 3/5 > 2/5 karena 3 > 2.",
						questions: [],
					},
					{
						title: "Membandingkan Pecahan dengan Pembilang Sama",
						order: 3,
						difficulty: 2,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Pembilang Sama"),
							p(
								"Jika dua pecahan memiliki ",
								bold("pembilang yang sama"),
								", bandingkan ",
								bold("penyebutnya"),
								". Caranya terbalik dari sebelumnya: ",
								bold(
									"penyebut lebih besar berarti pecahan lebih kecil",
								),
								".",
							),
							heading(3, "Mengapa?"),
							p(
								"Semakin banyak potongan yang dibuat, semakin kecil tiap potongannya. Perhatikan dua kue yang sama besar:",
							),
							p("1/3 → 🟩⬜⬜ (potongan besar)"),
							p("1/6 → 🟩⬜⬜⬜⬜⬜ (potongan kecil)"),
							math("\\frac{1}{3} > \\frac{1}{6}"),
							heading(3, "Contoh"),
							math("\\frac{3}{4} > \\frac{3}{8}"),
							p(
								"Pembilangnya sama (3). Penyebut 4 lebih kecil dari 8, jadi 3/4 lebih besar.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan membandingkan pecahan berpembilang sama. " +
							"Jika pembilang sama, bandingkan penyebut: penyebut lebih besar → pecahan lebih kecil (potongan makin banyak, makin kecil). " +
							"Contoh: 1/3 > 1/6; 3/4 > 3/8.",
						questions: [],
					},
					{
						title: "Membandingkan Pecahan dengan Penyebut Berbeda",
						order: 4,
						difficulty: 2,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Penyebut Berbeda"),
							p(
								"Jika pembilang dan penyebutnya sama-sama berbeda, kita ",
								bold("samakan penyebutnya"),
								" terlebih dahulu menggunakan ",
								bold("KPK"),
								" (Kelipatan Persekutuan Terkecil), lalu bandingkan pembilangnya.",
							),
							heading(3, "Langkah-langkah"),
							orderedList(
								"Cari KPK dari kedua penyebut",
								"Ubah kedua pecahan agar penyebutnya sama dengan KPK, dengan mengalikan pembilang dan penyebut dengan bilangan yang sama",
								"Bandingkan pembilangnya",
							),
							heading(3, "Contoh"),
							p("Bandingkan 1/3 dan 2/5:"),
							bulletList(
								"KPK dari 3 dan 5 adalah 15",
								"1/3 = 5/15 (atas dan bawah dikali 5)",
								"2/5 = 6/15 (atas dan bawah dikali 3)",
								"5/15 < 6/15, jadi 1/3 < 2/5",
							),
							p(
								bold("Hati-hati: "),
								"Jangan langsung membandingkan pembilangnya sebelum penyebutnya sama!",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan membandingkan pecahan berpenyebut berbeda. " +
							"Langkah: (1) cari KPK penyebut, (2) ubah pecahan ke penyebut KPK dengan mengalikan pembilang dan penyebut dengan bilangan yang sama (pecahan senilai), (3) bandingkan pembilang. " +
							"Contoh: 1/3 vs 2/5 → KPK=15 → 5/15 vs 6/15 → 1/3 < 2/5.",
						questions: [],
					},
				],
			},

			// ═══════════════════ SUB-TOPIK 3.2 ═══════════════════
			// with exercise
			{
				name: "Mengurutkan Pecahan",
				slug: "mengurutkan-pecahan",
				description:
					"Mengurutkan tiga pecahan atau lebih dari yang terkecil ke terbesar, atau sebaliknya.",
				order: 2,
				materials: [
					{
						title: "Pengertian Mengurutkan Pecahan",
						order: 1,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Apa Itu Mengurutkan Pecahan?"),
							p(
								"Mengurutkan pecahan artinya menyusun ",
								bold("tiga pecahan atau lebih"),
								" berdasarkan nilainya. Ada dua jenis urutan:",
							),
							bulletList(
								"Dari terkecil ke terbesar (urutan naik)",
								"Dari terbesar ke terkecil (urutan turun)",
							),
							heading(3, "Contoh"),
							p("Urutan dari terkecil ke terbesar:"),
							math("\\frac{1}{4} < \\frac{2}{4} < \\frac{3}{4}"),
							p("Urutan dari terbesar ke terkecil:"),
							math("\\frac{3}{4} > \\frac{2}{4} > \\frac{1}{4}"),
							p(
								bold("Ingat: "),
								"Membandingkan pecahan adalah dasar untuk mengurutkan pecahan.",
							),
						),
						materialLlmContext:
							"Materi ini memperkenalkan pengertian mengurutkan pecahan: menyusun tiga pecahan atau lebih berdasarkan nilainya. " +
							"Urutan naik: dari terkecil ke terbesar. Urutan turun: dari terbesar ke terkecil. " +
							"Contoh: 1/4 < 2/4 < 3/4.",
						questions: [],
					},
					{
						title: "Mengurutkan Pecahan dengan Penyebut Sama",
						order: 2,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Mengurutkan Pecahan Berpenyebut Sama"),
							p(
								"Jika penyebutnya sama, cukup urutkan ",
								bold("pembilangnya"),
								". Penyebutnya tetap.",
							),
							heading(3, "Contoh"),
							p(
								"Urutkan dari terkecil ke terbesar: 5/8, 2/8, 7/8",
							),
							bulletList(
								"Penyebut sama (8), lihat pembilangnya: 5, 2, 7",
								"Urutan pembilang dari kecil ke besar: 2, 5, 7",
								"Jadi: 2/8, 5/8, 7/8",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan mengurutkan pecahan berpenyebut sama. " +
							"Cukup urutkan pembilang, penyebut tetap. Contoh: 5/8, 2/8, 7/8 dari terkecil → 2/8, 5/8, 7/8.",
						questions: [],
					},
					{
						title: "Mengurutkan Pecahan dengan Penyebut Berbeda",
						order: 3,
						difficulty: 2,
						isExerciseOnly: false,
						content: doc(
							heading(
								2,
								"Mengurutkan Pecahan Berpenyebut Berbeda",
							),
							p(
								"Samakan dulu semua penyebutnya menggunakan ",
								bold("KPK"),
								", lalu urutkan pembilangnya.",
							),
							heading(3, "Langkah-langkah"),
							orderedList(
								"Cari KPK dari semua penyebut",
								"Ubah semua pecahan agar penyebutnya sama dengan KPK",
								"Urutkan pembilangnya sesuai permintaan soal",
								"Tulis kembali dalam bentuk pecahan semula",
							),
							heading(3, "Contoh"),
							p(
								"Urutkan 1/2, 1/3, 1/4 dari terkecil ke terbesar:",
							),
							bulletList(
								"KPK dari 2, 3, dan 4 adalah 12",
								"1/2 = 6/12, 1/3 = 4/12, 1/4 = 3/12",
								"Urutan pembilang: 3, 4, 6",
								"Jadi: 1/4, 1/3, 1/2",
							),
							p(
								bold("Jalan pintas: "),
								"Jika pembilangnya sama, pecahan dengan penyebut lebih besar nilainya lebih kecil.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan mengurutkan pecahan berpenyebut berbeda. " +
							"Langkah: cari KPK semua penyebut, ubah semua pecahan ke penyebut tersebut, urutkan pembilang, tulis kembali pecahan semula. " +
							"Contoh: 1/2, 1/3, 1/4 → KPK=12 → 6/12, 4/12, 3/12 → urutan naik: 1/4, 1/3, 1/2.",
						questions: [],
					},
					// ───────────────────────── LEMBAR KERJA (isExerciseOnly) ─────────────────────────
					{
						title: "Lembar Kerja: Pecahan Senilai dan Membandingkan Pecahan",
						order: 4,
						difficulty: 2,
						isExerciseOnly: true,
						content: doc(
							heading(
								2,
								"Lembar Kerja: Pecahan Senilai dan Membandingkan Pecahan",
							),
							p(
								"Latihan ini menguji pemahaman kamu tentang pecahan senilai, simbol perbandingan (>, <, =), dan cara membandingkan serta mengurutkan pecahan sesuai naskah pembelajaran.",
							),
						),
						materialLlmContext:
							'Rangkuman Materi & Konsep Bab "Pecahan Senilai dan Membandingkan Pecahan" (Kelas 3–4 SD):\n' +
							"1. Konteks Visual & Model Riil:\n" +
							"   - Pizza Kardus (two_pizzas_boxes.svg, Aktivitas 2.1): Dua pizza utuh di dalam kotak kardus terbuka, masing-masing dipotong 8 bagian sama besar. Ayah makan 5 potong (5/8), Ibu makan 3 potong (3/8). Tari makan 4 potong (4/8), Dude makan 1 potong (1/8), Reza makan 3 potong (3/8). Urutan porsi anak dari terbesar: Tari (4/8) > Reza (3/8) > Dude (1/8).\n" +
							"   - Grid Warna 12 Sel (grid_12_colors_pairs.svg, Aktivitas 2.4): Persegi panjang 3x4 = 12 kotak sama besar dengan 6 pasang warna (oranye, biru, abu-abu, cyan, hijau, kuning). Tiap pasang warna terdiri dari 2 kotak, membuktikan pecahan senilai 1/6 = 2/12.\n" +
							"   - Dua Pizza Polos (two_pizzas_plain.svg, Aktivitas 2.5 & 2.9): Dua pizza utuh tanpa garis potongan. Digunakan untuk membuktikan bahwa mengetahui jumlah potongan yang dimakan saja tidak cukup (argumen Elsa keliru), melainkan harus tahu total potongan pizza dipotong sama besar (argumen Irfan benar). Juga digunakan untuk membandingkan pizza dipotong 8 vs dipotong 4 (1/8 < 1/4 dan 2/8 < 2/4).\n" +
							"   - Lingkaran Tiga Sektor (circle_three_sectors.svg, Aufgabe 2.8): Lingkaran dengan sektor abu-abu (1/4), biru (1/4), dan oranye (1/2). Sektor abu-abu 1/4 dapat dibagi 2 menjadi dua sektor 1/8, sehingga 2/8 = 1/4 dan 2/4 = 1/2. Pizza dipotong 3 ambil 1 potong (1/3) senilai dengan pizza dipotong 6 ambil 2 potong (2/6), yaitu 1/3 = 2/6.\n" +
							"2. Simbol Perbandingan Pecahan:\n" +
							'   - Simbol > artinya "lebih besar dari".\n' +
							'   - Simbol < artinya "lebih kecil dari".\n' +
							'   - Simbol = artinya "sama dengan" (senilai).\n' +
							"   - Mulut simbol (> atau <) selalu membuka ke arah pecahan yang nilainya LEBIH BESAR.\n" +
							"3. Kaidah Membandingkan Pecahan:\n" +
							"   a. Jika Penyebut Sama (misal 3/17 vs 15/17, atau per/100): Cukup bandingkan pembilangnya. Semakin besar pembilang, semakin besar nilai pecahannya.\n" +
							"   b. Jika Pembilang Sama (misal 3/8 vs 3/4, atau 4/6 vs 4/11): Perhatikan penyebutnya! Semakin BESAR penyebut, benda dibagi menjadi semakin BANYAK potongan, sehingga ukuran tiap potongan justru semakin KECIL. Pecahan dengan penyebut lebih kecil bernilai LEBIH BESAR (3/4 > 3/8, 4/6 > 4/11).\n" +
							"   c. Kasus Khusus 13/25 vs 15/257: 13/25 bernilai lebih dari setengah (0.52), sedangkan 15/257 bernilai sangat kecil (kurang dari 0.06), maka 13/25 > 15/257.\n" +
							"4. Bimbingan Sokratik: Jangan langsung memberikan jawaban simbol >/< atau angka. Ajak siswa membayangkan ukuran potongan pizza atau coklat.",
						questions: [
							// ─── Soal 1: Aktivitas 2.1 — Pizza Orang Tua dan 3 Anak ───
							{
								learningObjective:
									"Siswa dapat menentukan dan mengurutkan pecahan dari pembagian pizza keluarga.",
								questionType: "fraction_input",
								questionUi: doc(
									heading(
										3,
										"Aktivitas 2.1: Pembagian Pizza Keluarga (Ayah, Ibu, dan Tiga Anak)",
									),
									image(
										"/images/topic2/two_pizzas_boxes.svg",
										"Dua buah pizza utuh di dalam kotak kardus terbuka",
									),
									p(
										"Sebuah keluarga memesan dua buah pizza. Orang tua membagi satu pizza untuk mereka berdua: ",
										bold("ayah mengambil 5 potong"),
										", sedangkan ",
										bold("ibu mengambil 3 potong"),
										".",
									),
									p(
										"Ibu memakan $\\frac{3}{8}$ bagian pizza, sedangkan ayah memakan $\\frac{5}{8}$ bagian pizza. Karena 5 potong lebih banyak daripada 3 potong, maka berlaku $\\frac{5}{8} > \\frac{3}{8}$.",
									),
									p(
										bold("Tugasmu: "),
										"Pizza kedua dibagi oleh 3 anak bernama ",
										bold("Tari (4 potong)"),
										", ",
										bold("Dude (1 potong)"),
										", dan ",
										bold("Reza (3 potong)"),
										". Tuliskan bagian pecahan pizza yang dimakan oleh masing-masing anak:",
									),
								),
								answerConfig: {
									fields: [
										{
											prompt: "Bagian pizza yang dimakan Tari (4 dari 8 potong):",
											prefilled: { denominator: 8 },
										},
										{
											prompt: "Bagian pizza yang dimakan Dude (1 dari 8 potong):",
											prefilled: { denominator: 8 },
										},
										{
											prompt: "Bagian pizza yang dimakan Reza (3 dari 8 potong):",
											prefilled: { denominator: 8 },
										},
									],
								},
								questionLlmContext:
									"Konteks Visual & Aktivitas 2.1:\n" +
									"Siswa melihat gambar dua buah pizza di dalam kardus terbuka (two_pizzas_boxes.svg). Masing-masing pizza dipotong menjadi 8 bagian sama besar.\n" +
									"Pizza pertama: Ayah makan 5 potong (5/8), Ibu makan 3 potong (3/8). 5/8 > 3/8.\n" +
									"Pizza kedua dibagi 3 anak: Tari (4 potong), Dude (1 potong), Reza (3 potong).\n" +
									"Jawaban:\n" +
									"- Tari = 4/8 bagian pizza.\n" +
									"- Dude = 1/8 bagian pizza.\n" +
									"- Reza = 3/8 bagian pizza.\n" +
									"Urutan dari terbesar ke terkecil: 4/8 (Tari) > 3/8 (Reza) > 1/8 (Dude).\n" +
									"Kalimat perbandingan: Bagian pizza Tari (4/8) lebih besar dari bagian Reza (3/8) dan bagian Reza (3/8) lebih besar dari bagian Dude (1/8).\n" +
									"Bimbingan Sokratik: Ingatkan bahwa total potongan satu pizza adalah 8 (penyebut = 8). Jumlah potong yang dimakan menjadi pembilang.",
								evaluationParameters: {
									expected_answer_keywords: [
										"\\frac{4}{8}",
										"4/8",
										"\\frac{1}{8}",
										"1/8",
										"\\frac{3}{8}",
										"3/8",
									],
									common_misconceptions: [
										"Menulis penyebut selain 8 (misal 3 karena ada 3 anak)",
										"Tertukar pembilang antar anak",
									],
									strictness_level: "strict",
									hints: [
										"Satu pizza dipotong menjadi 8 potong sama besar, jadi penyebutnya adalah 8.",
										"Tari makan 4 potong dari 8 potong, artinya Tari memakan 4/8.",
										"Dude makan 1 potong (1/8) dan Reza makan 3 potong (3/8).",
									],
								},
								answers: {
									tari: "4/8",
									dude: "1/8",
									reza: "3/8",
								},
							},

							// ─── Soal 2: Aktivitas 2.2 — Notasi Matematika Singkat (>) ───
							{
								learningObjective:
									"Siswa dapat menuliskan perbandingan pecahan dalam notasi matematika menggunakan simbol >.",
								questionType: "fraction_comparison",
								questionUi: doc(
									heading(
										3,
										'Aktivitas 2.2: Notasi Singkat "Lebih Besar Dari" ( > )',
									),
									p(
										"Tuliskan dalam bentuk notasi matematika singkat. Pilih simbol yang tepat ",
										bold("( > , < , = )"),
										" untuk setiap pasangan pecahan berikut:",
									),
								),
								answerConfig: {
									items: [
										{
											prompt: "$\\frac{3}{6}$ menggambarkan bagian yang lebih besar daripada $\\frac{3}{8}$",
											leftFraction: "3/6",
											rightFraction: "3/8",
										},
										{
											prompt: "$\\frac{3}{4}$ menggambarkan bagian yang lebih besar daripada $\\frac{1}{4}$",
											leftFraction: "3/4",
											rightFraction: "1/4",
										},
										{
											prompt: "$\\frac{1}{2}$ menggambarkan bagian yang lebih besar daripada $\\frac{1}{4}$",
											leftFraction: "1/2",
											rightFraction: "1/4",
										},
										{
											prompt: "$\\frac{4}{6}$ menggambarkan bagian yang lebih besar daripada $\\frac{1}{6}$",
											leftFraction: "4/6",
											rightFraction: "1/6",
										},
									],
								},
								questionLlmContext:
									'Aktivitas 2.2: Siswa mengubah pernyataan verbal "lebih besar dari" menjadi simbol >:\n' +
									"1. 3/6 > 3/8 (pembilang sama, penyebut 6 < 8 maka potongan 3/6 lebih besar)\n" +
									"2. 3/4 > 1/4 (penyebut sama, pembilang 3 > 1)\n" +
									"3. 1/2 > 1/4 (1/2 = 2/4 > 1/4)\n" +
									"4. 4/6 > 1/6 (penyebut sama, pembilang 4 > 1)\n" +
									"Semua pasangan bernilai >.",
								evaluationParameters: {
									expected_answer_keywords: [">"],
									expected_operators: [">", ">", ">", ">"],
									common_misconceptions: [
										'Menggunakan < padahal soal menyatakan "lebih besar"',
										"Bingung antara simbol > dan <",
									],
									strictness_level: "strict",
									hints: [
										'Perhatikan kata "lebih besar daripada". Simbol > selalu membuka mulutnya ke pecahan yang lebih besar.',
									],
								},
								answers: {
									operators: [">", ">", ">", ">"],
								},
							},

							// ─── Soal 3: Aktivitas 2.3 — Notasi Matematika Singkat (<) ───
							{
								learningObjective:
									"Siswa dapat menuliskan perbandingan pecahan dalam notasi matematika menggunakan simbol <.",
								questionType: "fraction_comparison",
								questionUi: doc(
									heading(
										3,
										'Aktivitas 2.3: Notasi Singkat "Lebih Kecil Dari" ( < )',
									),
									p(
										"Tuliskan dalam bentuk notasi matematika singkat. Pilih simbol yang tepat ",
										bold("( > , < , = )"),
										" untuk setiap pasangan pecahan berikut:",
									),
								),
								answerConfig: {
									items: [
										{
											prompt: "$\\frac{3}{6}$ menggambarkan bagian yang lebih kecil daripada $\\frac{5}{6}$",
											leftFraction: "3/6",
											rightFraction: "5/6",
										},
										{
											prompt: "$\\frac{2}{4}$ menggambarkan bagian yang lebih kecil daripada $\\frac{3}{4}$",
											leftFraction: "2/4",
											rightFraction: "3/4",
										},
										{
											prompt: "$\\frac{1}{2}$ menggambarkan bagian yang lebih kecil daripada $\\frac{3}{4}$",
											leftFraction: "1/2",
											rightFraction: "3/4",
										},
										{
											prompt: "$\\frac{4}{6}$ menggambarkan bagian yang lebih kecil daripada $\\frac{5}{6}$",
											leftFraction: "4/6",
											rightFraction: "5/6",
										},
									],
								},
								questionLlmContext:
									'Aktivitas 2.3: Siswa mengubah pernyataan verbal "lebih kecil dari" menjadi simbol <:\n' +
									"1. 3/6 < 5/6 (penyebut sama, 3 < 5)\n" +
									"2. 2/4 < 3/4 (penyebut sama, 2 < 3)\n" +
									"3. 1/2 < 3/4 (1/2 = 2/4 < 3/4)\n" +
									"4. 4/6 < 5/6 (penyebut sama, 4 < 5)\n" +
									"Semua pasangan bernilai <.",
								evaluationParameters: {
									expected_answer_keywords: ["<"],
									expected_operators: ["<", "<", "<", "<"],
									common_misconceptions: [
										'Menggunakan > padahal soal menyatakan "lebih kecil"',
									],
									strictness_level: "strict",
									hints: [
										'Perhatikan kata "lebih kecil daripada". Simbol < menunjuk ujung lancipnya ke pecahan yang lebih kecil.',
									],
								},
								answers: {
									operators: ["<", "<", "<", "<"],
								},
							},

							// ─── Soal 4: Aktivitas 2.4 — Pecahan Senilai Grid 12 Kotak ───
							{
								learningObjective:
									"Siswa dapat menentukan pecahan senilai 1/6 = 2/12 dengan bantuan grid 12 kotak berpasangan warna.",
								questionType: "fraction_input",
								questionUi: doc(
									heading(
										3,
										"Aktivitas 2.4: Pecahan Senilai pada Grid 12 Kotak",
									),
									image(
										"/images/topic2/grid_12_colors_pairs.svg",
										"Persegi panjang 12 kotak sama besar (3 baris x 4 kolom) dalam 6 pasang warna berbeda",
									),
									p(
										"Pada gambar di atas, kita mencoba memperkirakan berapa besar $\\frac{1}{6}$ dari luas bidang tersebut.",
									),
									p(
										"Bidang dibagi menjadi 12 bagian yang sama besar (3 baris $\\times$ 4 kolom) yang dikelompokkan dalam 6 pasang warna (oranye, biru, abu-abu, cyan, hijau, kuning). Setiap 2 kotak dengan warna yang sama mewakili $\\frac{1}{6}$ dari bidang tersebut.",
									),
									p("Lengkapilah pecahan senilai berikut:"),
									math("\\frac{1}{6} = \\frac{\\square}{12}"),
								),
								answerConfig: {
									fields: [
										{
											prompt: "$\\frac{1}{6} = \\frac{\\square}{12}$",
											prefilled: { denominator: 12 },
										},
									],
								},
								questionLlmContext:
									"Konteks Visual & Aktivitas 2.4:\n" +
									"Siswa melihat grid 3x4 = 12 kotak (grid_12_colors_pairs.svg) dengan 6 pasangan warna:\n" +
									"- 2 sel oranye, 2 sel biru\n" +
									"- 2 sel abu-abu, 2 sel cyan\n" +
									"- 2 sel hijau, 2 sel kuning\n" +
									"Karena ada 6 warna sama banyak dari total 12 kotak, maka 1 warna = 1/6 bagian = 2 kotak dari 12.\n" +
									"Jadi pecahan senilainya: 1/6 = 2/12. Angka pembilang yang dicari adalah 2.\n" +
									"Bimbingan Sokratik: Minta siswa menghitung berapa kotak yang memiliki satu warna yang sama.",
								evaluationParameters: {
									expected_answer_keywords: [
										"2",
										"\\frac{2}{12}",
										"2/12",
									],
									common_misconceptions: [
										"Menjawab 1 karena menyalin pembilang dari 1/6",
										"Menjawab 6 karena melihat angka 6",
									],
									strictness_level: "strict",
									hints: [
										"Lihat satu kelompok warna pada gambar, misalnya warna oranye. Ada berapa kotak oranye?",
										"Ada 2 kotak oranye dari total 12 kotak, jadi 1/6 senilai dengan 2/12.",
									],
								},
								answers: { numerator: 2 },
							},

							// ─── Soal 5: Aktivitas 2.5 — Penalaran Kritis: Elsa vs Irfan ───
							{
								learningObjective:
									"Siswa dapat bernalar kritis tentang informasi yang dibutuhkan untuk menentukan besar bagian pecahan.",
								questionType: "short_answer",
								questionUi: doc(
									heading(
										3,
										"Aktivitas 2.5: Penalaran Kritis Besar Bagian Pecahan (Elsa vs Irfan)",
									),
									image(
										"/images/topic2/two_pizzas_plain.svg",
										"Dua buah pizza utuh bundar tanpa garis potongan",
									),
									p(
										bold("Elsa: "),
										"“Jika saya mengetahui berapa banyak potong pizza yang dimakan oleh seseorang, maka saya juga dapat menentukan seberapa besar bagiannya.”",
									),
									p(
										bold("Irfan: "),
										"“Saya tidak percaya itu. Untuk melakukan hal tersebut, kamu membutuhkan informasi tentang menjadi berapa banyak potongan pizza yang telah dipotong.”",
									),
									p(
										bold("Pertanyaan: "),
										"Siapa yang benar? Jelaskan alasanmu!",
									),
								),
								questionLlmContext:
									"Konteks Visual & Aktivitas 2.5:\n" +
									"Siswa melihat dua pizza utuh tanpa garis potongan (two_pizzas_plain.svg).\n" +
									"Inti persoalan: Apakah cukup tahu jumlah potongan yang dimakan saja (argumen Elsa)?\n" +
									"Jawaban benar: Irfan yang benar.\n" +
									"Alasan matematika: Pecahan adalah perbandingan antara bagian yang diambil (pembilang) terhadap TOTAL keseluruhan potongan (penyebut).\n" +
									"Contoh kontras: Makan 2 potong dari pizza yang dipotong 4 menghasilkan 2/4 = 1/2 (setengah pizza). Tetapi makan 2 potong dari pizza yang dipotong 8 menghasilkan 2/8 = 1/4 (seperempat pizza). Tanpa mengetahui penyebut (total potongan pizza), besar bagian pecahan tidak dapat ditentukan.\n" +
									"Bimbingan Sokratik: Tanyakan kepada siswa, apakah 2 potong pizza kecil sama besarnya dengan 2 potong pizza raksasa jika kita tidak tahu dipotong berapa?",
								evaluationParameters: {
									expected_answer_keywords: [
										"Irfan",
										"benar",
										"total",
										"potongan",
										"penyebut",
										"keseluruhan",
										"dipotong",
									],
									common_misconceptions: [
										"Membenarkan Elsa karena mengira jumlah potong sudah cukup",
									],
									strictness_level: "lenient",
									hints: [
										"Pikirkan: jika kamu makan 2 potong pizza, apakah kamu pasti tahu itu setengah pizza atau seperempat pizza?",
										"Kita juga harus tahu pizza tersebut dipotong menjadi berapa bagian sama besar secara keseluruhan.",
									],
								},
								answers: {
									jawaban: "Irfan",
									alasan: "Irfan benar karena kita harus mengetahui total potongan pizza (penyebut), bukan hanya potongan yang dimakan (pembilang).",
								},
							},

							// ─── Soal 6: Aktivitas 2.6 — Tabel Centang Benar/Salah ───
							{
								learningObjective:
									"Siswa dapat menentukan kebenaran pernyataan perbandingan pecahan.",
								questionType: "true_false_table",
								questionUi: doc(
									heading(
										3,
										"Aktivitas 2.6: Evaluasi Perbandingan Pecahan (Tabel Centang)",
									),
									p(
										"Tentukan apakah setiap pernyataan perbandingan pecahan berikut ",
										bold("Benar"),
										" atau ",
										bold("Salah"),
										":",
									),
								),
								answerConfig: {
									statements: [
										"$\\frac{3}{6}$ lebih besar dari $\\frac{3}{8}$",
										"$\\frac{1}{3}$ lebih besar dari $\\frac{1}{4}$",
										"$\\frac{1}{2}$ lebih besar dari $\\frac{1}{3}$",
										"$\\frac{1}{2}$ sama dengan $\\frac{2}{4}$",
										"$\\frac{3}{5}$ lebih besar dari $\\frac{3}{4}$",
										"$\\frac{7}{8}$ lebih besar dari $\\frac{8}{9}$",
									],
								},
								questionLlmContext:
									"Aktivitas 2.6: Tabel Benar/Salah untuk 6 baris pernyataan perbandingan pecahan:\n" +
									"a. 3/6 > 3/8 → BENAR (pembilang sama = 3, penyebut 6 < 8, maka potongan 3/6 lebih besar).\n" +
									"b. 1/3 > 1/4 → BENAR (pembilang sama = 1, penyebut 3 < 4).\n" +
									"c. 1/2 > 1/3 → BENAR (pembilang sama = 1, penyebut 2 < 3).\n" +
									"d. 1/2 = 2/4 → BENAR (pecahan senilai, atas dan bawah dikali 2).\n" +
									"e. 3/5 > 3/4 → SALAH (pembilang sama = 3, penyebut 5 > 4 maka potongan 3/5 LEBIH KECIL dari 3/4).\n" +
									"f. 7/8 > 8/9 → SALAH (7/8 = 63/72, sedangkan 8/9 = 64/72, jadi 7/8 < 8/9).\n" +
									"Kunci jawaban: Benar, Benar, Benar, Benar, Salah, Salah.",
								evaluationParameters: {
									expected_answer_keywords: [
										"Benar",
										"Salah",
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
										"Mengira 3/5 > 3/4 karena angka 5 lebih besar dari 4",
										"Mengira 7/8 > 8/9 tanpa membandingkan bagian yang tersisa (1/8 vs 1/9)",
									],
									strictness_level: "strict",
									hints: [
										"Jika pembilangnya sama, semakin besar penyebut maka potongannya semakin kecil.",
										"1/2 sama nilainya dengan 2/4 (pecahan senilai).",
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

							// ─── Soal 7: Antara 2.6 & 2.7 — Model Tabel Seratusan ───
							{
								learningObjective:
									"Siswa dapat membandingkan pecahan berpenyebut 100 dengan membayangkan kotak pada tabel seratusan.",
								questionType: "fraction_comparison",
								questionUi: doc(
									heading(
										3,
										"Aktivitas 2.6 (Konseptual): Model Tabel Seratusan",
									),
									p(
										"Bagaimana cara membandingkan dua pecahan yang tidak dapat dibayangkan sebagai bagian dari pizza?",
									),
									p(
										"Kita mengambil $\\frac{3}{100}$ dan $\\frac{70}{100}$. Di sini kita dapat membayangkan kotak-kotak pada tabel seratusan:",
									),
									bulletList(
										"$\\frac{3}{100}$ menggambarkan 3 kotak pada tabel seratusan.",
										"$\\frac{70}{100}$ menggambarkan 70 Petak-petak pada tabel seratusan.",
									),
									p(
										"Berdasarkan banyaknya petak tersebut, pilihlah simbol perbandingan yang tepat ",
										bold("( > , < , = )"),
										":",
									),
								),
								answerConfig: {
									items: [
										{
											prompt: "$\\frac{70}{100}$ dibandingkan dengan $\\frac{3}{100}$ (70 petak vs 3 petak)",
											leftFraction: "70/100",
											rightFraction: "3/100",
										},
										{
											prompt: "$\\frac{3}{100}$ dibandingkan dengan $\\frac{70}{100}$ (3 petak vs 70 petak)",
											leftFraction: "3/100",
											rightFraction: "70/100",
										},
									],
								},
								questionLlmContext:
									"Aktivitas antara 2.6 dan 2.7: Model Tabel Seratusan untuk pecahan /100.\n" +
									"3/100 = 3 kotak dari 100 kotak.\n" +
									"70/100 = 70 kotak dari 100 kotak.\n" +
									"Karena 70 kotak jelas jauh lebih banyak daripada 3 kotak, maka:\n" +
									"1. 70/100 > 3/100\n" +
									"2. 3/100 < 70/100.",
								evaluationParameters: {
									expected_answer_keywords: [">", "<"],
									expected_operators: [">", "<"],
									common_misconceptions: [
										"Terbalik menempatkan simbol > dan <",
									],
									strictness_level: "strict",
									hints: [
										"70 petak lebih banyak daripada 3 petak, jadi 70/100 lebih besar daripada 3/100.",
									],
								},
								answers: {
									operators: [">", "<"],
								},
							},

							// ─── Soal 8: Aktivitas 2.7c — Mengurutkan Pecahan /100 ───
							{
								learningObjective:
									"Siswa dapat mengurutkan pecahan berpenyebut sama (100) dari terkecil ke terbesar.",
								questionType: "fraction_ordering",
								questionUi: doc(
									heading(
										3,
										"Aktivitas 2.7: Mengurutkan Pecahan Berpenyebut 100",
									),
									p(
										"Urutkan kartu pecahan berikut dari yang ",
										bold("terkecil hingga terbesar"),
										". Geser atau tukar posisi kartu hingga urutannya tepat:",
									),
									math(
										"\\frac{17}{100} \\quad \\frac{65}{100} \\quad \\frac{15}{100} \\quad \\frac{39}{100}",
									),
								),
								answerConfig: {
									items: [
										"17/100",
										"65/100",
										"15/100",
										"39/100",
									],
									separator: "<",
									instruction:
										"Urutkan kartu pecahan berikut dari yang terkecil hingga terbesar:",
								},
								questionLlmContext:
									"Aktivitas 2.7c: Mengurutkan pecahan berpenyebut 100 dari terkecil ke terbesar.\n" +
									"Kartu awal: 17/100, 65/100, 15/100, 39/100.\n" +
									"Urutan pembilang dari terkecil: 15 < 17 < 39 < 65.\n" +
									"Urutan pecahan yang benar: 15/100 < 17/100 < 39/100 < 65/100.",
								evaluationParameters: {
									expected_answer_keywords: [
										"15/100",
										"17/100",
										"39/100",
										"65/100",
										"<",
									],
									common_misconceptions: [
										"Mengurutkan terbalik dari terbesar ke terkecil",
									],
									strictness_level: "strict",
									hints: [
										"Semua pecahan memiliki penyebut 100. Cukup bandingkan pembilangnya: 17, 65, 15, 39.",
										"Urutan pembilang dari paling kecil: 15, 17, 39, lalu 65.",
									],
								},
								answers: {
									expected_order: [
										"15/100",
										"17/100",
										"39/100",
										"65/100",
									],
								},
							},

							// ─── Soal 9: Aktivitas 2.8 — Membandingkan Pasangan Pecahan ───
							{
								learningObjective:
									"Siswa dapat membandingkan pasangan pecahan berpenyebut sama dengan simbol matematika yang tepat (mempertahankan teks naskah 15/257).",
								questionType: "fraction_comparison",
								questionUi: doc(
									heading(
										3,
										"Aktivitas 2.8: Membandingkan Pecahan Berpenyebut Sama",
									),
									p(
										"Bandingkan pecahan-pecahan tersebut sesuai dengan besar nilainya. Pilih simbol yang tepat ",
										bold("( > , < , = )"),
										":",
									),
								),
								answerConfig: {
									items: [
										{
											prompt: "a. Bandingkan $\\frac{3}{17}$ dan $\\frac{15}{17}$",
											leftFraction: "3/17",
											rightFraction: "15/17",
										},
										{
											prompt: "b. Bandingkan $\\frac{10}{12}$ dan $\\frac{6}{12}$",
											leftFraction: "10/12",
											rightFraction: "6/12",
										},
										{
											prompt: "c. Bandingkan $\\frac{13}{25}$ dan $\\frac{15}{257}$",
											leftFraction: "13/25",
											rightFraction: "15/257",
										},
									],
								},
								questionLlmContext:
									"Aktivitas 2.8: Membandingkan pasangan pecahan:\n" +
									"a. 3/17 dan 15/17: Penyebut sama (17), pembilang 3 < 15, maka 3/17 < 15/17.\n" +
									"b. 10/12 dan 6/12: Penyebut sama (12), pembilang 10 > 6, maka 10/12 > 6/12.\n" +
									"c. 13/25 dan 15/257: Catatan naskah mempertahankan angka 15/257 persis. 13/25 bernilai lebih dari setengah (0.52), sedangkan 15/257 bernilai sangat kecil (sekitar 0.058). Jadi 13/25 > 15/257.\n" +
									"Kunci operator: < , > , >.",
								evaluationParameters: {
									expected_answer_keywords: ["<", ">"],
									expected_operators: ["<", ">", ">"],
									common_misconceptions: [
										"Mengira 15/257 lebih besar karena angka 257 sangat besar",
									],
									strictness_level: "strict",
									hints: [
										"Untuk soal a dan b, penyebutnya sama, jadi bandingkan langsung pembilangnya.",
										"Untuk soal c, 13/25 lebih dari setengah. Sedangkan 15/257 bendanya dibagi menjadi 257 bagian sehingga tiap potongan sangat amat kecil.",
									],
								},
								answers: {
									operators: ["<", ">", ">"],
								},
							},

							// ─── Soal 10: Aktivitas 2.9 — Pembilang Sama, Penyebut Berbeda ───
							{
								learningObjective:
									"Siswa dapat membandingkan pecahan berpembilang sama (pizza 8 potong vs pizza 4 potong).",
								questionType: "fraction_comparison",
								questionUi: doc(
									heading(
										3,
										"Aktivitas 2.9: Membandingkan Pecahan Berpembilang Sama",
									),
									image(
										"/images/topic2/two_pizzas_plain.svg",
										"Dua buah pizza utuh untuk membandingkan pembagian 8 potong dan 4 potong",
									),
									p(
										"Kita kembali membayangkan dua buah pizza. Satu pizza dibagi menjadi ",
										bold("8 bagian sama besar"),
										", sedangkan pizza lainnya dibagi menjadi ",
										bold("4 bagian sama besar"),
										".",
									),
									p(
										"Satu potong dari pizza 8 bagian ($\\frac{1}{8}$) lebih kecil daripada satu potong dari pizza 4 bagian ($\\frac{1}{4}$), sehingga berlaku $\\frac{1}{8} < \\frac{1}{4}$ dan $\\frac{2}{8} < \\frac{2}{4}$.",
									),
									p(
										bold("Kaidah penting: "),
										"Pembilang (jumlah potongan) nilainya sama, tetapi semakin besar penyebutnya, semakin banyak jumlah potongan dan semakin kecil ukuran setiap potongannya.",
									),
									p("Bandingkan pasangan pecahan berikut:"),
								),
								answerConfig: {
									items: [
										{
											prompt: "Bandingkan $\\frac{3}{8}$ dan $\\frac{3}{4}$",
											leftFraction: "3/8",
											rightFraction: "3/4",
										},
										{
											prompt: "Bandingkan $\\frac{4}{8}$ dan $\\frac{4}{4}$",
											leftFraction: "4/8",
											rightFraction: "4/4",
										},
									],
								},
								questionLlmContext:
									"Konteks Visual & Aktivitas 2.9:\n" +
									"Siswa membandingkan pecahan dengan pembilang sama tetapi penyebut berbeda:\n" +
									"- Pizza kiri dibagi 8 potong: tiap potong lebih kecil.\n" +
									"- Pizza kanan dibagi 4 potong: tiap potong lebih besar.\n" +
									"1. 3/8 vs 3/4: karena 1/8 < 1/4, maka 3/8 < 3/4.\n" +
									"2. 4/8 vs 4/4: 4/8 adalah setengah pizza, sedangkan 4/4 adalah pizza utuh, maka 4/8 < 4/4.\n" +
									"Kunci: < , <.",
								evaluationParameters: {
									expected_answer_keywords: ["<"],
									expected_operators: ["<", "<"],
									common_misconceptions: [
										"Mengira 3/8 > 3/4 karena angka 8 lebih besar dari 4",
									],
									strictness_level: "strict",
									hints: [
										"Pembilangnya sama-sama 3. Pizza yang dipotong 4 memiliki potongan yang lebih besar daripada pizza yang dipotong 8.",
										"Jadi, 3/8 lebih kecil daripada 3/4.",
									],
								},
								answers: {
									operators: ["<", "<"],
								},
							},

							// ─── Soal 11: Aktivitas 2.10 — 9 Baris Perbandingan "Lebih Besar" ───
							{
								learningObjective:
									"Siswa dapat membandingkan pasangan pecahan untuk menentukan hubungan lebih besar dari.",
								questionType: "fraction_comparison",
								questionUi: doc(
									heading(
										3,
										'Aktivitas 2.10: Menentukan Hubungan "Lebih Besar Dari"',
									),
									p(
										"Pilihlah simbol yang tepat ",
										bold("( > , < , = )"),
										" untuk setiap pasangan pecahan berikut:",
									),
								),
								answerConfig: {
									items: [
										{
											prompt: "a. $\\frac{2}{4}$ dibandingkan dengan $\\frac{2}{8}$",
											leftFraction: "2/4",
											rightFraction: "2/8",
										},
										{
											prompt: "b. $\\frac{4}{6}$ dibandingkan dengan $\\frac{4}{11}$",
											leftFraction: "4/6",
											rightFraction: "4/11",
										},
										{
											prompt: "c. $\\frac{5}{9}$ dibandingkan dengan $\\frac{5}{12}$",
											leftFraction: "5/9",
											rightFraction: "5/12",
										},
										{
											prompt: "d. $\\frac{6}{8}$ dibandingkan dengan $\\frac{3}{8}$",
											leftFraction: "6/8",
											rightFraction: "3/8",
										},
										{
											prompt: "e. $\\frac{7}{9}$ dibandingkan dengan $\\frac{2}{9}$",
											leftFraction: "7/9",
											rightFraction: "2/9",
										},
										{
											prompt: "f. $\\frac{8}{10}$ dibandingkan dengan $\\frac{4}{10}$",
											leftFraction: "8/10",
											rightFraction: "4/10",
										},
										{
											prompt: "g. $\\frac{6}{8}$ dibandingkan dengan $\\frac{6}{10}$",
											leftFraction: "6/8",
											rightFraction: "6/10",
										},
										{
											prompt: "h. $\\frac{7}{12}$ dibandingkan dengan $\\frac{7}{15}$",
											leftFraction: "7/12",
											rightFraction: "7/15",
										},
										{
											prompt: "i. $\\frac{3}{7}$ dibandingkan dengan $\\frac{3}{10}$",
											leftFraction: "3/7",
											rightFraction: "3/10",
										},
									],
								},
								questionLlmContext:
									'Aktivitas 2.10: Melengkapi perbandingan "lebih besar dari" untuk 9 pasangan pecahan:\n' +
									"a. 2/4 > 2/8 (pembilang sama, penyebut 4 < 8)\n" +
									"b. 4/6 > 4/11 (pembilang sama, penyebut 6 < 11)\n" +
									"c. 5/9 > 5/12 (pembilang sama, penyebut 9 < 12)\n" +
									"d. 6/8 > 3/8 (penyebut sama, pembilang 6 > 3)\n" +
									"e. 7/9 > 2/9 (penyebut sama, pembilang 7 > 2)\n" +
									"f. 8/10 > 4/10 (penyebut sama, pembilang 8 > 4)\n" +
									"g. 6/8 > 6/10 (pembilang sama, penyebut 8 < 10)\n" +
									"h. 7/12 > 7/15 (pembilang sama, penyebut 12 < 15)\n" +
									"i. 3/7 > 3/10 (pembilang sama, penyebut 7 < 10)\n" +
									"Semua pasangan diurutkan sehingga pecahan kiri LEBIH BESAR daripada pecahan kanan (>).",
								evaluationParameters: {
									expected_answer_keywords: [">"],
									expected_operators: [
										">",
										">",
										">",
										">",
										">",
										">",
										">",
										">",
										">",
									],
									common_misconceptions: [
										"Bingung antara aturan penyebut sama vs pembilang sama",
									],
									strictness_level: "strict",
									hints: [
										"Jika pembilangnya sama, pecahan dengan penyebut lebih kecil adalah yang lebih besar.",
										"Jika penyebutnya sama, pecahan dengan pembilang lebih besar adalah yang lebih besar.",
									],
								},
								answers: {
									operators: [
										">",
										">",
										">",
										">",
										">",
										">",
										">",
										">",
										">",
									],
								},
							},

							// ─── Soal 12: Aufgabe 2.8 — Lingkaran 3 Sektor & Pecahan Senilai ───
							{
								learningObjective:
									"Siswa dapat bernalar tentang pecahan senilai melalui diagram lingkaran dan model pizza.",
								questionType: "fraction_comparison",
								questionUi: doc(
									heading(
										3,
										"Aufgabe 2.8: Eksplorasi Pecahan Senilai (Lingkaran dan Pizza)",
									),
									image(
										"/images/topic2/circle_three_sectors.svg",
										"Diagram lingkaran 3 sektor: abu-abu seperempat, biru seperempat, oranye setengah",
									),
									p(
										"Perhatikan gambar lingkaran di atas: Bagian berwarna abu-abu adalah $\\frac{1}{4}$, bagian biru $\\frac{1}{4}$, dan bagian oranye $\\frac{1}{2}$.",
									),
									p(
										"Bagian abu-abu ($\\frac{1}{4}$) masih dapat dibagi menjadi dua bagian yang sama besar, masing-masing bernilai $\\frac{1}{8}$. Dari sini kita melihat bahwa dua kali $\\frac{1}{8}$ sama besar dengan $\\frac{1}{4}$ ($\\frac{2}{8} = \\frac{1}{4}$), dan dua kali $\\frac{1}{4}$ sama besar dengan setengah pizza ($\\frac{2}{4} = \\frac{1}{2}$).",
									),
									p(
										"Sekarang bayangkan jika pizza sebelah kiri dipotong 3 bagian dan diambil 1 potong ($\\frac{1}{3}$), sedangkan pizza sebelah kanan dipotong 6 bagian dan diambil 2 potong ($\\frac{2}{6}$). Jika diletakkan bertumpuk, kedua potongan tersebut sama besar!",
									),
									p(
										"Pilihlah simbol perbandingan yang tepat ",
										bold("( > , < , = )"),
										" untuk pasangan pecahan senilai berikut:",
									),
								),
								answerConfig: {
									items: [
										{
											prompt: "Perbandingan $\\frac{2}{8}$ dan $\\frac{1}{4}$",
											leftFraction: "2/8",
											rightFraction: "1/4",
										},
										{
											prompt: "Perbandingan $\\frac{2}{4}$ dan $\\frac{1}{2}$",
											leftFraction: "2/4",
											rightFraction: "1/2",
										},
										{
											prompt: "Perbandingan $\\frac{1}{3}$ dan $\\frac{2}{6}$",
											leftFraction: "1/3",
											rightFraction: "2/6",
										},
									],
								},
								questionLlmContext:
									"Konteks Visual & Aufgabe 2.8:\n" +
									"Siswa melihat diagram lingkaran (circle_three_sectors.svg) dengan 3 sektor: abu-abu (1/4), biru (1/4), dan oranye (1/2).\n" +
									"Pecahan senilai yang dibahas:\n" +
									"1. 2/8 = 1/4 (sektor abu-abu dibagi 2 menghasilkan dua juring 1/8)\n" +
									"2. 2/4 = 1/2 (dua sektor seperempat sama besar dengan setengah lingkaran)\n" +
									"3. 1/3 = 2/6 (pizza dipotong 3 ambil 1 potong sama besarnya dengan pizza dipotong 6 ambil 2 potong)\n" +
									"Semua pasangan bernilai sama dengan (=).",
								evaluationParameters: {
									expected_answer_keywords: ["="],
									expected_operators: ["=", "=", "="],
									common_misconceptions: [
										"Mengira 2/6 lebih besar dari 1/3 karena angka 2 dan 6 lebih besar",
									],
									strictness_level: "strict",
									hints: [
										"Kedua potongan menutupi luas yang persis sama saat ditumpuk.",
										"Simbol = digunakan ketika dua pecahan memiliki nilai yang sama besar (pecahan senilai).",
									],
								},
								answers: {
									operators: ["=", "=", "="],
								},
							},

							// ─── Soal 13: Refleksi Diri (Final Self-Assessment) ───
							{
								learningObjective:
									"Siswa dapat melakukan refleksi diri terhadap 7 indikator capaian pembelajaran pecahan.",
								questionType: "true_false_table",
								questionUi: doc(
									heading(
										3,
										"Refleksi Diri: Evaluasi Kemampuan Belajar Siswa",
									),
									p(
										"Berilah tanda centang pada kolom yang paling menggambarkan kemampuan belajarmu saat ini:",
									),
								),
								answerConfig: {
									labels: ["Baik", "Perlu Latihan"],
									statements: [
										"Saya dapat menulis dan membaca pecahan.",
										"Saya dapat menyebutkan pembilang dan penyebut dari suatu pecahan.",
										"aya dapat menggambarkan pecahan sebagai bagian dari pizza.",
										"Saya dapat menggambarkan pecahan sebagai bagian dari suatu bidang.",
										"Saya dapat membandingkan dua pecahan dengan penyebut yang sama.",
										"Saya dapat membandingkan dua pecahan dengan pembilang yang sama.",
										"Saya dapat membandingkan pecahan dalam notasi singkat matematika.",
									],
								},
								questionLlmContext:
									"Refleksi Diri Siswa (Final Self-Assessment):\n" +
									"Siswa mengevaluasi pemahaman mereka terhadap 7 kemampuan dasar pecahan:\n" +
									"1. Menulis dan membaca pecahan\n" +
									"2. Menyebutkan pembilang dan penyebut\n" +
									'3. Menggambarkan pecahan bagian pizza (naskah asli menggunakan ejaan "aya")\n' +
									"4. Menggambarkan pecahan bagian bidang\n" +
									"5. Membandingkan dua pecahan penyebut sama\n" +
									"6. Membandingkan dua pecahan pembilang sama\n" +
									"7. Membandingkan pecahan dalam notasi matematika\n" +
									"Ini adalah instrumen metakognitif. Semua pengisian dinilai selesai secara positif untuk memberikan apresiasi refleksi diri kepada siswa.",
								evaluationParameters: {
									expected_answer_keywords: [
										"Baik",
										"Perlu Latihan",
									],
									strictness_level: "lenient",
									hints: [
										"Jawablah dengan jujur sesuai apa yang kamu rasakan setelah belajar topik ini.",
									],
								},
								answers: {
									completed: true,
								},
							},
						],
					},
				],
			},

			// ═══════════════════ SUB-TOPIK 3.3 ═══════════════════
			{
				name: "Pecahan Sejati dan Tidak Sejati",
				slug: "pecahan-sejati-dan-tidak-sejati",
				description:
					"Mengenal perbedaan pecahan sejati dan pecahan tidak sejati berdasarkan hubungan antara pembilang dan penyebut.",
				order: 3,
				materials: [
					{
						title: "Mengenal Pecahan Sejati dan Tidak Sejati",
						order: 1,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(
								2,
								"Apa Itu Pecahan Sejati dan Tidak Sejati?",
							),
							p(
								"Sebelum mempelajari lebih jauh tentang pecahan, kita perlu mengetahui bahwa pecahan memiliki beberapa jenis. Dua di antaranya adalah ",
								bold("pecahan sejati"),
								" dan ",
								bold("pecahan tidak sejati"),
								".",
							),
							heading(3, "1. Pecahan Sejati"),
							p(
								"Pecahan sejati adalah pecahan yang memiliki ",
								bold("pembilang lebih kecil daripada penyebut"),
								". Nilainya selalu kurang dari 1.",
							),
							p("Contoh:"),
							bulletList(
								"1/2 karena 1 < 2",
								"2/5 karena 2 < 5",
								"3/4 karena 3 < 4",
							),
							p(
								"Bayangkan sebuah pizza yang dibagi menjadi 4 bagian sama besar. Jika kamu mengambil 3 bagian, kamu mendapatkan 3/4 pizza. Karena belum mengambil seluruh pizza, nilai pecahannya kurang dari 1.",
							),
							math("\\frac{3}{4} < 1"),
							heading(3, "2. Pecahan Tidak Sejati"),
							p(
								"Pecahan tidak sejati adalah pecahan yang memiliki ",
								bold(
									"pembilang lebih besar atau sama dengan penyebut",
								),
								". Nilainya sama dengan atau lebih besar dari 1.",
							),
							p("Contoh:"),
							bulletList(
								"5/4 karena 5 > 4",
								"7/3 karena 7 > 3",
								"4/4 karena 4 = 4",
							),
							p(
								"Jika pizza dibagi menjadi 4 bagian sama besar dan kamu mengambil 5 bagian dengan ukuran yang sama, jumlahnya lebih dari satu pizza utuh.",
							),
							math("\\frac{5}{4} > 1"),
							p(
								"Jika pembilang dan penyebut sama, seperti 4/4, pecahan tersebut nilainya tepat 1.",
							),
							math("\\frac{4}{4} = 1"),
							heading(3, "Ingat Perbedaannya!"),
							bulletList(
								"Pecahan sejati: pembilang < penyebut.",
								"Pecahan tidak sejati: pembilang ≥ penyebut.",
							),
						),
						materialLlmContext:
							"Materi ini memperkenalkan pecahan sejati dan tidak sejati untuk siswa SD. " +
							"Pecahan sejati memiliki pembilang lebih kecil daripada penyebut dan nilainya kurang dari 1. Contoh: 1/2, 2/5, dan 3/4. " +
							"Pecahan tidak sejati memiliki pembilang lebih besar atau sama dengan penyebut dan nilainya minimal 1. Contoh: 5/4, 7/3, dan 4/4. " +
							"Jika pembilang sama dengan penyebut, nilainya adalah 1.",
						questions: [],
					},
					{
						title: "Membedakan Pecahan Sejati dan Tidak Sejati",
						order: 2,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Bagaimana Cara Membedakannya?"),
							p(
								"Cara membedakan pecahan sejati dan tidak sejati cukup mudah. Perhatikan pembilang dan penyebutnya, kemudian bandingkan kedua bilangan tersebut.",
							),
							heading(3, "Langkah-langkah"),
							orderedList(
								"Perhatikan pembilang, yaitu bilangan di atas garis pecahan.",
								"Perhatikan penyebut, yaitu bilangan di bawah garis pecahan.",
								"Bandingkan pembilang dengan penyebut.",
								"Tentukan jenis pecahannya.",
							),
							heading(3, "Contoh 1: Pecahan 2/7"),
							math("2 < 7"),
							p(
								"Pembilang 2 lebih kecil daripada penyebut 7. Jadi, 2/7 adalah pecahan sejati.",
							),
							heading(3, "Contoh 2: Pecahan 6/6"),
							math("6 = 6"),
							p(
								"Pembilang sama dengan penyebut. Jadi, 6/6 adalah pecahan tidak sejati dan nilainya sama dengan 1.",
							),
							heading(3, "Contoh 3: Pecahan 9/5"),
							math("9 > 5"),
							p(
								"Pembilang 9 lebih besar daripada penyebut 5. Jadi, 9/5 adalah pecahan tidak sejati dan nilainya lebih dari 1.",
							),
							p(
								bold("Tips: "),
								"Jangan hanya melihat besar angka pembilang. Selalu bandingkan pembilang dengan penyebut.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan cara mengidentifikasi jenis pecahan dengan membandingkan pembilang dan penyebut. " +
							"Jika pembilang lebih kecil daripada penyebut, pecahan sejati. Jika pembilang lebih besar atau sama dengan penyebut, pecahan tidak sejati. " +
							"Contoh: 2/7 adalah pecahan sejati; 6/6 dan 9/5 adalah pecahan tidak sejati.",
						questions: [],
					},
				],
			},

			// ═══════════════════ SUB-TOPIK 3.4 ═══════════════════
			{
				name: "Pecahan yang Setara",
				slug: "pecahan-yang-setara",
				description:
					"Mengenal pecahan setara yang memiliki nilai sama meskipun pembilang dan penyebutnya berbeda.",
				order: 4,
				materials: [
					{
						title: "Pengertian Pecahan yang Setara",
						order: 1,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Apa Itu Pecahan Setara?"),
							p(
								"Pecahan setara adalah dua pecahan atau lebih yang memiliki ",
								bold("nilai yang sama"),
								", meskipun pembilang dan penyebutnya bisa berbeda.",
							),
							p(
								"Bayangkan dua pizza yang ukurannya sama. Pizza pertama dipotong menjadi 2 bagian sama besar, sedangkan pizza kedua dipotong menjadi 4 bagian sama besar.",
							),
							p(
								"Jika kamu mengambil setengah dari setiap pizza:",
							),
							bulletList(
								"Pizza pertama: 1 dari 2 bagian, yaitu 1/2.",
								"Pizza kedua: 2 dari 4 bagian, yaitu 2/4.",
							),
							p(
								"Walaupun jumlah potongannya berbeda, bagian pizza yang kamu ambil sama banyak.",
							),
							math("\\frac{1}{2} = \\frac{2}{4}"),
							heading(3, "Contoh Pecahan Setara"),
							math(
								"\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6} = \\frac{4}{8}",
							),
							p(
								"Semua pecahan tersebut mewakili setengah dari satu benda utuh.",
							),
							heading(3, "Cara Mengingatnya"),
							p(
								"Pembilang dan penyebut boleh berbeda, tetapi nilai pecahannya harus tetap sama. Seperti satu kue yang dipotong menjadi beberapa bagian dengan ukuran berbeda, bagian yang diambil dapat tetap mewakili jumlah yang sama.",
							),
							p(
								bold("Ingat: "),
								"Pecahan setara memiliki nilai yang sama, bukan harus memiliki angka pembilang dan penyebut yang sama.",
							),
						),
						materialLlmContext:
							"Materi ini memperkenalkan pecahan setara kepada siswa SD. " +
							"Pecahan setara adalah pecahan berbeda yang mempunyai nilai sama. " +
							"Contoh: 1/2 = 2/4 = 3/6 = 4/8. " +
							"Kesetaraan dapat dijelaskan menggunakan benda yang sama besar, seperti pizza atau kue yang dibagi menjadi jumlah potongan berbeda tetapi bagian yang diambil memiliki nilai sama.",
						questions: [],
					},
					{
						title: "Menentukan Pecahan yang Setara",
						order: 2,
						difficulty: 2,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Bagaimana Menentukan Pecahan Setara?"),
							p(
								"Kita dapat menentukan pecahan setara dengan mengalikan atau membagi pembilang dan penyebut menggunakan bilangan yang sama, selain nol.",
							),
							heading(3, "Contoh 1: Mengalikan"),
							p("Tentukan pecahan yang setara dengan 2/3!"),
							p("Kalikan pembilang dan penyebut dengan 2."),
							math(
								"\\frac{2}{3} = \\frac{2 \\times 2}{3 \\times 2} = \\frac{4}{6}",
							),
							p(
								"Jadi, 2/3 setara dengan 4/6. Keduanya memiliki nilai yang sama.",
							),
							heading(3, "Contoh 2: Membagi"),
							p("Apakah 6/8 setara dengan 3/4?"),
							p("Bagilah pembilang dan penyebut 6/8 dengan 2."),
							math(
								"\\frac{6}{8} = \\frac{6 \\div 2}{8 \\div 2} = \\frac{3}{4}",
							),
							p("Benar! Jadi, 6/8 setara dengan 3/4."),
							heading(3, "Hal yang Harus Diingat"),
							bulletList(
								"Kalikan pembilang dan penyebut dengan bilangan yang sama untuk mendapatkan pecahan setara.",
								"Bagilah pembilang dan penyebut dengan faktor persekutuan yang sama untuk mendapatkan pecahan setara yang lebih sederhana.",
								"Jangan mengalikan atau membagi hanya pembilang atau hanya penyebut karena nilai pecahan bisa berubah.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan cara menentukan pecahan setara melalui perkalian atau pembagian pembilang dan penyebut dengan bilangan yang sama, selain nol. " +
							"Contoh perkalian: 2/3 = 4/6 karena pembilang dan penyebut dikalikan 2. " +
							"Contoh pembagian: 6/8 = 3/4 karena pembilang dan penyebut dibagi 2. " +
							"Operasi harus dilakukan terhadap pembilang dan penyebut sekaligus agar nilai pecahan tetap sama.",
						questions: [],
					},
				],
			},

			// ═══════════════════ SUB-TOPIK 3.5 ═══════════════════
			{
				name: "Penyederhanaan Pecahan",
				slug: "penyederhanaan-pecahan",
				description:
					"Mempelajari cara menyederhanakan pecahan dengan membagi pembilang dan penyebut menggunakan faktor persekutuan yang sama.",
				order: 5,
				materials: [
					{
						title: "Pengertian Penyederhanaan Pecahan",
						order: 1,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Apa Itu Penyederhanaan Pecahan?"),
							p(
								"Penyederhanaan pecahan adalah mengubah pecahan menjadi bentuk yang lebih sederhana tanpa mengubah nilainya.",
							),
							p(
								"Caranya adalah membagi pembilang dan penyebut dengan bilangan yang sama. Bilangan tersebut harus dapat membagi keduanya hingga menghasilkan bilangan bulat.",
							),
							heading(3, "Contoh"),
							p("Perhatikan pecahan 4/8."),
							math(
								"\\frac{4}{8} = \\frac{4 \\div 2}{8 \\div 2} = \\frac{2}{4}",
							),
							p("Pecahan 2/4 masih dapat disederhanakan lagi."),
							math(
								"\\frac{2}{4} = \\frac{2 \\div 2}{4 \\div 2} = \\frac{1}{2}",
							),
							p(
								"Jadi, bentuk paling sederhana dari 4/8 adalah 1/2.",
							),
							math("\\frac{4}{8} = \\frac{2}{4} = \\frac{1}{2}"),
							heading(3, "Mengapa Nilainya Tidak Berubah?"),
							p(
								"Ketika pembilang dan penyebut dibagi dengan bilangan yang sama, perbandingan antara keduanya tetap sama. Kita hanya mengubah cara menuliskannya, bukan nilai pecahannya.",
							),
							p(
								bold("Ingat: "),
								"Pecahan sudah paling sederhana jika pembilang dan penyebutnya tidak memiliki faktor persekutuan lebih besar dari 1.",
							),
						),
						materialLlmContext:
							"Materi ini menjelaskan penyederhanaan pecahan untuk siswa SD. " +
							"Penyederhanaan adalah mengubah pecahan menjadi bentuk yang lebih sederhana tanpa mengubah nilai. " +
							"Caranya membagi pembilang dan penyebut dengan faktor persekutuan yang sama. " +
							"Contoh: 4/8 = 2/4 = 1/2. " +
							"Pecahan berada dalam bentuk paling sederhana apabila pembilang dan penyebut tidak memiliki faktor persekutuan lebih besar dari 1.",
						questions: [],
					},
					{
						title: "Langkah-Langkah Menyederhanakan Pecahan",
						order: 2,
						difficulty: 2,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Cara Menyederhanakan Pecahan"),
							p(
								"Ada beberapa langkah sederhana yang dapat kamu ikuti untuk menyederhanakan pecahan.",
							),
							heading(3, "Langkah-langkah"),
							orderedList(
								"Tentukan pembilang dan penyebut pecahan.",
								"Cari bilangan yang dapat membagi pembilang dan penyebut sekaligus.",
								"Bagilah pembilang dan penyebut dengan bilangan tersebut.",
								"Periksa apakah pecahan masih bisa disederhanakan.",
								"Ulangi jika masih memungkinkan.",
							),
							heading(3, "Contoh: Sederhanakan 12/18"),
							p(
								"Langkah 1: Bagi pembilang dan penyebut dengan 2.",
							),
							math(
								"\\frac{12}{18} = \\frac{12 \\div 2}{18 \\div 2} = \\frac{6}{9}",
							),
							p(
								"Langkah 2: Sederhanakan 6/9 dengan membagi keduanya dengan 3.",
							),
							math(
								"\\frac{6}{9} = \\frac{6 \\div 3}{9 \\div 3} = \\frac{2}{3}",
							),
							p(
								"Jadi, bentuk paling sederhana dari 12/18 adalah 2/3.",
							),
							math(
								"\\frac{12}{18} = \\frac{6}{9} = \\frac{2}{3}",
							),
							heading(3, "Tips Mudah"),
							p(
								"Periksa apakah pembilang dan penyebut sama-sama dapat dibagi 2, 3, 5, atau bilangan lainnya. Pilih faktor persekutuan agar perhitungan lebih mudah.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan langkah menyederhanakan pecahan: cari faktor persekutuan pembilang dan penyebut, bagi keduanya dengan faktor yang sama, lalu ulangi hingga tidak dapat disederhanakan lagi. " +
							"Contoh: 12/18 dibagi 2 menjadi 6/9, kemudian dibagi 3 menjadi 2/3. " +
							"Bentuk paling sederhana dari 12/18 adalah 2/3. " +
							"Contoh faktor persekutuan yang dapat digunakan adalah 2, 3, dan 5 jika bilangan tersebut membagi pembilang dan penyebut dengan tepat.",
						questions: [],
					},
				],
			},

			// ═══════════════════ SUB-TOPIK 3.6 ═══════════════════
			// with exercise
			{
				name: "Perluasan Pecahan",
				slug: "perluasan-pecahan",
				description:
					"Mempelajari cara memperluas pecahan dengan mengalikan pembilang dan penyebut menggunakan bilangan yang sama.",
				order: 6,
				materials: [
					{
						title: "Pengertian Perluasan Pecahan",
						order: 1,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Apa Itu Perluasan Pecahan?"),
							p(
								"Perluasan pecahan adalah mengubah pecahan menjadi pecahan lain dengan angka pembilang dan penyebut yang lebih besar, tetapi ",
								bold("nilainya tetap sama"),
								".",
							),
							p(
								"Caranya dengan mengalikan pembilang dan penyebut menggunakan bilangan yang sama.",
							),
							heading(3, "Contoh"),
							p("Perhatikan pecahan 1/2."),
							p(
								"Jika pembilang dan penyebutnya dikalikan 2, kita mendapatkan 2/4.",
							),
							math(
								"\\frac{1}{2} = \\frac{1 \\times 2}{2 \\times 2} = \\frac{2}{4}",
							),
							p(
								"Jika pembilang dan penyebutnya dikalikan 3, kita mendapatkan 3/6.",
							),
							math(
								"\\frac{1}{2} = \\frac{1 \\times 3}{2 \\times 3} = \\frac{3}{6}",
							),
							p(
								"Jadi, 1/2, 2/4, dan 3/6 merupakan pecahan setara. Ketiganya memiliki nilai yang sama.",
							),
							math("\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6}"),
							heading(3, "Untuk Apa Perluasan Pecahan?"),
							p(
								"Perluasan pecahan sering digunakan untuk mencari pecahan setara, menyamakan penyebut, membandingkan pecahan, dan mengurutkan pecahan.",
							),
							p(
								bold("Ingat: "),
								"Pembilang dan penyebut harus dikalikan dengan bilangan yang sama agar nilai pecahan tidak berubah.",
							),
						),
						materialLlmContext:
							"Materi ini memperkenalkan perluasan pecahan untuk siswa SD. " +
							"Perluasan pecahan adalah mengalikan pembilang dan penyebut dengan bilangan yang sama, selain nol, untuk menghasilkan pecahan setara. " +
							"Contoh: 1/2 = 2/4 = 3/6. " +
							"Perluasan pecahan berguna untuk memperoleh pecahan setara dan menyamakan penyebut saat membandingkan atau mengurutkan pecahan.",
						questions: [],
					},
					{
						title: "Langkah-Langkah Memperluas Pecahan",
						order: 2,
						difficulty: 2,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Cara Memperluas Pecahan"),
							p(
								"Untuk memperluas pecahan, tentukan bilangan pengali yang akan digunakan, lalu kalikan pembilang dan penyebut dengan bilangan tersebut.",
							),
							heading(3, "Contoh 1: Memperluas 3/5"),
							p(
								"Misalnya, kita ingin memperoleh pecahan dengan penyebut 20.",
							),
							p("Penyebut 5 harus dikalikan 4 agar menjadi 20."),
							math("5 \\times 4 = 20"),
							p(
								"Karena penyebut dikalikan 4, pembilang juga harus dikalikan 4.",
							),
							math(
								"\\frac{3}{5} = \\frac{3 \\times 4}{5 \\times 4} = \\frac{12}{20}",
							),
							p(
								"Jadi, bentuk perluasan dari 3/5 dengan penyebut 20 adalah 12/20.",
							),
							heading(3, "Contoh 2: Memperluas 2/3"),
							p("Kalikan pembilang dan penyebut dengan 3."),
							math(
								"\\frac{2}{3} = \\frac{2 \\times 3}{3 \\times 3} = \\frac{6}{9}",
							),
							heading(3, "Langkah-langkah"),
							orderedList(
								"Tentukan pecahan yang ingin diperluas.",
								"Tentukan bilangan pengali.",
								"Kalikan pembilang dengan bilangan pengali.",
								"Kalikan penyebut dengan bilangan pengali yang sama.",
								"Tulis pecahan hasil perluasan.",
							),
							p(
								bold("Hati-hati: "),
								"Jika pembilang dikalikan 4, penyebut juga harus dikalikan 4. Jangan menggunakan pengali yang berbeda.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan langkah memperluas pecahan. " +
							"Caranya tentukan faktor pengali, kalikan pembilang dan penyebut dengan faktor yang sama, lalu tulis hasilnya. " +
							"Contoh: memperluas 3/5 menjadi penyebut 20 menghasilkan 12/20 karena pembilang dan penyebut dikalikan 4. " +
							"Contoh lain: 2/3 = 6/9 karena keduanya dikalikan 3. " +
							"Perluasan pecahan tidak mengubah nilai pecahan.",
						questions: [],
					},
					// ───────────────────────── LEMBAR KERJA (isExerciseOnly) ─────────────────────────
					{
						title: "Lembar Kerja: Pecahan Sejati, Tidak Sejati, dan Perluasan Pecahan",
						order: 3,
						difficulty: 2,
						isExerciseOnly: true,
						content: doc(
							heading(
								2,
								"Lembar Kerja: Pecahan Sejati, Tidak Sejati, dan Perluasan Pecahan",
							),
							p(
								"Latihan ini menguji pemahaman kamu tentang pecahan senilai melalui model pizza, pecahan yang senilai dengan 1, konsep pecahan sejati dan tidak sejati, membandingkan pecahan berpatokan pada bilangan 1, serta menentukan bilangan pengali dalam memperluas pecahan sesuai naskah pembelajaran.",
							),
						),
						materialLlmContext:
							'Rangkuman Materi & Konsep Bab "Pecahan Sejati, Tidak Sejati, Pecahan Senilai, dan Perluasan Pecahan":\n' +
							"1. Konteks Visual & Model Riil:\n" +
							"   - Pizza Kardus (two_pizzas_boxes.svg, Aktivitas 3.1): Dua pizza utuh di dalam kotak kardus terbuka, pizza kiri dipotong 8 bagian sama besar dan pizza kanan dipotong 4 bagian sama besar. Mengambil 4 potong dari pizza kiri (4/8) dan 2 potong dari pizza kanan (2/4) menghasilkan porsi yang persis sama besar, membuktikan 2/4 = 4/8.\n" +
							"   - Dua Pizza Polos (two_pizzas_plain.svg, Aktivitas 3.3 & 3.7): Digunakan untuk membayangkan pizza 1/1 (satu pizza utuh tanpa dipotong sama sekali) dan menunjukkan pecahan senilai 1/2 dan 2/4 melalui pemotongan lebih lanjut.\n" +
							"2. Pecahan Senilai dengan 1/1 (Aktivitas 3.2 & 3.3):\n" +
							"   - Pecahan 1/1 adalah pecahan nyata yang artinya 1 bagian dari 1 bagian utuh (1 pizza utuh tanpa dipotong).\n" +
							"   - Semua pecahan dengan pembilang dan penyebut yang sama (misal 2/2, 3/3, 4/4, 5/5) memiliki nilai yang sama dengan 1 utuh (senilai dengan 1/1).\n" +
							"3. Pecahan Sejati dan Tidak Sejati (Aktivitas 3.4 & 3.5):\n" +
							"   - Pecahan Sejati: Pembilang LEBIH KECIL daripada penyebut (misal 1/2, 2/5, 10/11, 0/2). Nilainya selalu KURANG DARI 1 bilangan bulat utuh. Ditandai dengan warna BIRU.\n" +
							"   - Pecahan Tidak Sejati: Pembilang LEBIH BESAR daripada penyebut (misal 5/4, 8/5, 6/2, 3/2, 4/2). Nilainya selalu LEBIH DARI 1 bilangan bulat utuh. Ditandai dengan warna MERAH.\n" +
							"   - Model 4/2 Pizza (Mince dan Olif): Penyebut 2 artinya 1 pizza dipotong 2 bagian sama besar (setengah pizza). Pembilang 4 artinya ada 4 potong setengah pizza, yang setara dengan 2 pizza utuh (4/2 = 2).\n" +
							"4. Membandingkan Pecahan dengan Patokan 1 (Aktivitas 3.6):\n" +
							"   - Pecahan sejati (8/9) selalu < 1.\n" +
							"   - Pecahan tidak sejati (7/6) selalu > 1 (1 < 7/6).\n" +
							"   - Maka dapat dibuat rantai perbandingan 8/9 < 1 < 7/6, sehingga secara langsung 8/9 < 7/6 tanpa perlu menyamakan penyebut.\n" +
							"5. Perluasan Pecahan (Aktivitas 3.7 & 3.8):\n" +
							"   - Memperluas pecahan adalah mengalikan pembilang dan penyebut dengan bilangan pengali yang sama (k != 0).\n" +
							"   - Contoh: 1/2 diperluas dengan pengali 2 menghasilkan (1 x 2)/(2 x 2) = 2/4. Nilai pecahannya tetap senilai (1/2 = 2/4).\n" +
							"   - Menentukan bilangan pengali: 2/5 -> 4/10 (pengali 2), 3/7 -> 12/28 (pengali 4), 1/3 -> 4/12 (pengali 4).\n" +
							"6. Bimbingan Sokratik: Tuntun siswa dengan membayangkan ukuran potongan pizza nyata dan perbandingan terhadap 1 kesatuan utuh sebelum menerapkan manipulasi aljabar.",
						questions: [
							// ─── Soal 1: Aktivitas 3.1 — Pizza Kardus: Pecahan Senilai 4/8 dan 2/4 ───
							{
								learningObjective:
									"Siswa dapat menandai dan memahami pecahan senilai 4/8 dan 2/4 melalui interaksi langsung pada model visual dua pizza di dalam kotak kardus.",
								questionType: "pizza_slice_marker",
								questionUi: doc(
									heading(
										3,
										"Aktivitaas 3.1: Pecahan Senilai pada Pizza ($\\frac{4}{8}$ dan $\\frac{2}{4}$)",
									),
									image(
										"/images/topic2/two_pizzas_boxes.svg",
										"Dua buah pizza di dalam kotak kardus terbuka: pizza kiri dipotong 8 bagian sama besar dan pizza kanan dipotong 4 bagian sama besar",
									),
									p(
										bold("Tandailah $\\frac{4}{8}$ dari Pizza sebelah kiri dan $\\frac{2}{4}$ dari Pizza sebelah kanan pada model pizza interaktif di bawah ini!"),
									),
									p(
										"Kamu dapat melihat bahwa bagian yang ditandai pada kedua pizza memiliki ukuran yang sama besar.",
									),
									p(
										"Dalam penulisan matematika secara singkat: $\\frac{2}{4} = \\frac{4}{8}$",
									),
									p(
										"Hal ini dapat dibayangkan sebagai berikut: satu pizza dipotong menjadi 4 bagian yang sama besar, lalu diambil 2 bagian. Pada langkah berikutnya, masing-masing dari 4 bagian dipotong lagi menjadi 2 bagian lebih kecil sehingga menjadi 8 bagian sama besar. Dua potong dari 4 bagian kini menjadi 4 potong dari total 8 bagian.",
									),
								),
								answerConfig: {
									pizzas: [
										{
											label: "Pizza Sebelah Kiri",
											totalSlices: 8,
											targetFraction: "4/8",
											helperText: "Tandai 4 dari 8 potong",
										},
										{
											label: "Pizza Sebelah Kanan",
											totalSlices: 4,
											targetFraction: "2/4",
											helperText: "Tandai 2 dari 4 potong",
										},
									],
									instruction:
										"Klik potongan pizza untuk menandai 4/8 pada pizza kiri dan 2/4 pada pizza kanan.",
								},
								questionLlmContext:
									"Aktivitas 3.1: Menandai 4/8 pada pizza kiri (8 potong) dan 2/4 pada pizza kanan (4 potong).\n" +
									"- Pizza kiri: 4 dari 8 potong ditandai (4/8).\n" +
									"- Pizza kanan: 2 dari 4 potong ditandai (2/4).\n" +
									"Kedua bagian yang ditandai memiliki luas yang sama besar (pecahan senilai: 2/4 = 4/8).\n" +
									"Bimbingan Sokratik: Puji siswa saat berhasil menandai 4 potong di kiri dan 2 potong di kanan. Tanyakan apakah luas setengah pizza kiri sama dengan luas setengah pizza kanan.",
								evaluationParameters: {
									expected_answer_keywords: [
										"4/8",
										"2/4",
										"senilai",
										"sama besar",
										"setengah",
									],
									expected_pizza_slices: {
										0: 4,
										1: 2,
									},
									common_misconceptions: [
										"Menandai jumlah potong yang terbalik antara pizza kiri dan kanan",
										"Mengira 4/8 lebih besar dari 2/4 karena angka 4 dan 8 lebih besar",
									],
									strictness_level: "strict",
									hints: [
										"Pada pizza kiri (8 potong), klik 4 potong untuk menandai 4/8.",
										"Pada pizza kanan (4 potong), klik 2 potong untuk menandai 2/4.",
										"Perhatikan bahwa 4 potong dari 8 sama luasnya dengan 2 potong dari 4 (pecahan senilai).",
									],
								},
								answers: {
									pizza_kiri: "4 dari 8 potong",
									pizza_kanan: "2 dari 4 potong",
									kesimpulan: "2/4 = 4/8 (pecahan senilai)",
								},
							},

							// ─── Soal 2: Aktivitas 3.2 — Pecahan Lain yang Senilai ───
							{
								learningObjective:
									"Siswa dapat menentukan dan menuliskan pecahan yang senilai dengan 2/4, 1/3, 1/2, dan 2/2 beserta notasi singkatnya.",
								questionType: "fraction_equivalence",
								questionUi: doc(
									heading(
										3,
										"Aktivitas 3.2: Menentukan Pecahan Lain yang Setara",
									),
									p(
										"Dapatkah kamu menyebutkan pecahan lain yang setara dengan $\\frac{2}{4}$?",
									),
									p("Lengkapilah:"),
								),
								answerConfig: {
									items: [
										{ baseFraction: "2/4" },
										{ baseFraction: "1/3" },
										{ baseFraction: "1/2" },
										{ baseFraction: "2/2" },
									],
								},
								questionLlmContext:
									"Aktivitas 3.2: Menentukan pecahan senilai untuk 4 butir soal:\n" +
									"1. Senilai dengan 2/4: siswa dapat memasukkan 1/2, 4/8, 3/6, 5/10, dll.\n" +
									"2. Senilai dengan 1/3: siswa dapat memasukkan 2/6, 3/9, 4/12, 5/15, dll.\n" +
									"3. Senilai dengan 1/2: siswa dapat memasukkan 2/4, 3/6, 4/8, 5/10, dll.\n" +
									"4. Senilai dengan 2/2: siswa dapat memasukkan 1/1, 3/3, 4/4, 5/5, dll.\n" +
									"Bimbingan Sokratik: Tuntun siswa dengan mengalikan pembilang dan penyebut dengan angka yang sama (misal dikali 2 atau 3), atau membaginya (disederhanakan).",
								evaluationParameters: {
									expected_answer_keywords: [
										"senilai",
										"setara",
										"1/2",
										"2/6",
										"1/1",
										"4/8",
									],
									common_misconceptions: [
										"Menambahkan angka alih-alih mengalikan pembilang dan penyebut",
									],
									strictness_level: "lenient",
									hints: [
										"Untuk mencari pecahan senilai, kalikan pembilang dan penyebut dengan angka yang sama (misalnya dikali 2).",
										"Contoh untuk 1/3: 1 dikali 2 = 2, 3 dikali 2 = 6, maka pecahannya 2/6.",
										"Untuk 2/2, nilainya adalah 1 utuh, jadi pembilang dan penyebutnya harus sama besar (misal 1/1 atau 3/3).",
									],
								},
								answers: {
									item1: "1/2 atau 4/8",
									item2: "2/6 atau 3/9",
									item3: "2/4 atau 3/6",
									item4: "1/1 atau 3/3",
								},
							},

							// ─── Soal 3: Aktivitas 3.3a — Keraguan Mince tentang Pecahan 1/1 ───
							{
								learningObjective:
									"Siswa dapat bernalar kritis dan menjelaskan makna pecahan 1/1 menggunakan model pizza utuh.",
								questionType: "short_answer",
								questionUi: doc(
									heading(
										3,
										"Aktivitas 3.3a: Penalaran Kritis — Keraguan Mince tentang Pecahan $\\frac{1}{1}$",
									),
									image(
										"/images/topic2/two_pizzas_plain.svg",
										"Pizza bundar utuh tanpa garis potongan",
									),
									p(
										bold("Mince: "),
										"“Sejauh ini, pembilang suatu pecahan selalu lebih kecil daripada penyebutnya. Saya tidak dapat membayangkan pecahan $\\frac{1}{1}$. Apakah pecahan seperti itu benar-benar ada? Bagaimana saya harus memotong pizza agar dapat menunjukkan bagian sebesar $\\frac{1}{1}$ tersebut?”",
									),
									p(
										bold("Tugasmu: "),
										"Tulislah penjelasan untuk membantu Mince memahami pecahan $\\frac{1}{1}$ pada pizza!",
									),
								),
								questionLlmContext:
									"Aktivitas 3.3a: Mince ragu tentang keberadaan pecahan 1/1 dan bagaimana memotong pizza untuk menunjukkan 1/1.\n" +
									"Jawaban yang benar secara konseptual:\n" +
									"1. Pecahan 1/1 benar-benar ada dan sah secara matematis.\n" +
									"2. Penyebut 1 artinya pizza dibagi menjadi 1 bagian utuh (sama sekali tidak dipotong).\n" +
									"3. Pembilang 1 artinya kita mengambil 1 bagian tersebut (seluruh pizza utuh).\n" +
									"4. Jadi, untuk menunjukkan 1/1, Mince tidak perlu memotong pizza sama sekali; satu pizza utuh tersebut adalah 1/1.\n" +
									"5. Nilai 1/1 sama dengan 1 kesatuan bilangan bulat utuh.\n" +
									"Bimbingan Sokratik: Puji siswa jika menjelaskan bahwa pizza tidak perlu dipotong atau pizza utuh itu sendiri adalah 1/1.",
								evaluationParameters: {
									expected_answer_keywords: [
										"ada",
										"utuh",
										"satu",
										"tanpa dipotong",
										"tidak dipotong",
										"keseluruhan",
										"1 bagian",
									],
									common_misconceptions: [
										"Mengira 1/1 itu tidak ada karena tidak ada bagian yang dipotong",
										"Mengira harus memotong pizza menjadi 2 lalu disatukan lagi",
									],
									strictness_level: "lenient",
									hints: [
										"Pikirkan: jika penyebutnya 1, artinya pizza dibagi menjadi 1 bagian saja (utuh).",
										"Jika pembilangnya 1, artinya kita mengambil 1 bagian dari 1 bagian itu.",
										"Apakah pizza tersebut perlu dipotong jika hanya ada 1 bagian utuh?",
									],
								},
								answers: {
									jawaban: "Pecahan 1/1 benar-benar ada. Artinya satu pizza utuh tanpa dipotong sama sekali, karena 1 dari 1 bagian sama dengan 1 utuh.",
								},
							},

							// ─── Soal 4: Aktivitas 3.3b — Tiga Pecahan yang Senilai dengan 1/1 ───
							{
								learningObjective:
									"Siswa dapat menuliskan tiga pecahan berbeda yang senilai dengan 1/1 (bernilai 1 utuh).",
								questionType: "fraction_input",
								questionUi: doc(
									heading(
										3,
										"Aktivitas 3.3b: Tiga Pecahan yang Senilai dengan $\\frac{1}{1}$",
									),
									p(
										"Setelah membantu Mince memahami bahwa $\\frac{1}{1}$ bernilai satu kesatuan utuh, sekarang tuliskan ",
										bold("tiga pecahan berbeda"),
										" yang senilai dengan $\\frac{1}{1}$:",
									),
								),
								answerConfig: {
									fields: [
										{
											prompt: "Pecahan senilai 1 ke-1:",
										},
										{
											prompt: "Pecahan senilai 1 ke-2:",
										},
										{
											prompt: "Pecahan senilai 1 ke-3:",
										},
									],
								},
								questionLlmContext:
									"Aktivitas 3.3b: Menuliskan tiga pecahan yang senilai dengan 1/1.\n" +
									"Kaidah matematika: Semua pecahan yang memiliki pembilang dan penyebut sama besar (a/a dengan a != 0) bernilai 1 (senilai dengan 1/1).\n" +
									"Contoh jawaban yang benar: 2/2, 3/3, 4/4, 5/5, 6/6, 8/8, 10/10, 100/100.\n" +
									"Syarat: ketiga pecahan yang dimasukkan harus memiliki nilai 1 dan tidak boleh sama/duplikat satu sama lain.\n" +
									"Bimbingan Sokratik: Ingatkan siswa bahwa jika sebuah benda dipotong N bagian dan diambil semua N bagian, maka kita mendapatkan 1 benda utuh.",
								evaluationParameters: {
									expected_answer_keywords: [
										"2/2",
										"3/3",
										"4/4",
										"5/5",
										"8/8",
										"senilai",
										"1",
									],
									common_misconceptions: [
										"Menulis pecahan yang pembilang dan penyebutnya berbeda",
										"Menulis pecahan yang sama untuk ketiga kotak",
									],
									strictness_level: "strict",
									hints: [
										"Pecahan yang bernilai 1 utuh memiliki angka pembilang dan penyebut yang persis sama besar.",
										"Misalnya jika pizza dipotong 2 dan diambil 2 potong, pecahannya adalah 2/2.",
										"Tuliskan 3 pecahan berbeda dengan angka atas dan bawah yang sama, contohnya 2/2, 3/3, dan 4/4.",
									],
								},
								answers: {
									pecahan1: "2/2",
									pecahan2: "3/3",
									pecahan3: "4/4",
								},
							},

							// ─── Soal 5: Aktivitas 3.4 — Membayangkan Pecahan 4/2 Pizza (Mince & Olif) ───
							{
								learningObjective:
									"Siswa dapat memahami representasi pecahan tidak sejati 4/2 dan menghubungkannya dengan konsep pecahan lebih dari 1 utuh.",
								questionType: "short_answer",
								questionUi: doc(
									heading(
										3,
										"Aktivitas  3.4: Membayangkan Pecahan $\\frac{4}{2}$ Pizza (Mince dan Olif)",
									),
									p(
										bold("Mince: "),
										"“Sekarang saya sudah memahaminya. Ada pecahan yang pembilangnya lebih kecil daripada penyebutnya. Ada juga pecahan yang pembilang dan penyebutnya sama besar. Namun, apakah pembilang suatu pecahan juga bisa lebih besar daripada penyebutnya? Saya dapat membayangkan $\\frac{2}{4}$ pizza, yaitu 2 potong pizza dari satu pizza yang dibagi menjadi 4 bagian sama besar. Namun, bagaimana saya harus membayangkan $\\frac{4}{2}$ pizza?”",
									),
									p(
										bold("Olif: "),
										"“Pertama, perhatikan penyebutnya. Angka 2 berarti satu pizza dipotong menjadi dua bagian yang sama besar. Pembilang menunjukkan berapa banyak bagian yang dimaksud. Dalam hal ini, jumlahnya adalah 4 bagian.”",
									),
									p(
										bold("Tugas: "),
										"Jelaskan bagaimana kamu membayangkan atau menggambarkan $\\frac{4}{2}$ pizza! Berapa buah pizza utuh yang kita dapatkan dari 4 potong setengah pizza tersebut?",
									),
									p(
										"Pecahan yang pembilangnya lebih kecil daripada penyebutnya disebut ",
										bold("pecahan sejati"),
										". Pecahan sejati selalu lebih kecil daripada satu bilangan bulat utuh.",
									),
									p(
										"Pecahan yang pembilangnya lebih besar daripada penyebutnya disebut ",
										bold("pecahan tidak sejati"),
										". Pecahan tidak sejati selalu lebih besar daripada satu bilangan bulat utuh.",
									),
								),
								questionLlmContext:
									"Aktivitas 3.4: Membayangkan representasi pecahan 4/2 pizza.\n" +
									"Penjelasan konsep:\n" +
									"- Penyebut 2 artinya satu pizza dipotong menjadi 2 bagian sama besar (tiap potong = 1/2 pizza).\n" +
									"- Pembilang 4 artinya ada 4 potong setengah pizza.\n" +
									"- Dua potong setengah pizza menghasilkan 1 pizza utuh.\n" +
									"- Maka 4 potong setengah pizza menghasilkan 2 buah pizza utuh (4 dibagi 2 = 2).\n" +
									"Definisi penting:\n" +
									"- Pecahan yang pembilangnya lebih kecil dari penyebut disebut PECAHAN SEJATI (nilainya selalu < 1).\n" +
									"- Pecahan yang pembilangnya lebih besar dari penyebut disebut PECAHAN TIDAK SEJATI (nilainya selalu > 1).\n" +
									"Jawaban benar: 2 pizza utuh.\n" +
									"Bimbingan Sokratik: Tanyakan kepada siswa, jika 2 potong setengah digabung jadi 1 pizza utuh, berapa pizza jika ada 4 potong setengah?",
								evaluationParameters: {
									expected_answer_keywords: [
										"2",
										"dua",
										"pizza utuh",
										"setengah",
										"4 potong",
										"lebih dari 1",
										"tidak sejati",
									],
									common_misconceptions: [
										"Menjawab 4 pizza karena melihat pembilang 4",
										"Mengira pecahan 4/2 tidak mungkin ada",
									],
									strictness_level: "lenient",
									hints: [
										"Ingat: setiap 2 potong setengah pizza dapat disatukan menjadi 1 pizza utuh.",
										"Jika kamu memiliki 4 potong setengah pizza, berapa banyak pizza utuh yang bisa kamu bentuk?",
										"4 potong dibagi 2 potong per pizza = 2 pizza utuh.",
									],
								},
								answers: {
									jawaban: "2 pizza utuh",
									alasan: "Karena setiap 1 pizza menghasilkan 2 potong setengah, maka 4 potong setengah pizza setara dengan 2 pizza utuh (4 : 2 = 2).",
								},
							},

							// ─── Soal 6: Aktivitas 3.5 — Klasifikasi Pecahan Sejati vs Tidak Sejati ───
							{
								learningObjective:
									"Siswa dapat menandai dan mengklasifikasikan pecahan menjadi pecahan sejati (biru) atau pecahan tidak sejati (merah) sesuai urutan naskah.",
								questionType: "fraction_classification",
								questionUi: doc(
									heading(
										3,
										"Aktivitas  3.5: Menandai Pecahan Sejati dan Tidak Sejati",
									),
									p(
										bold(
											"Tandailah semua pecahan sejati dengan warna biru dan semua pecahan tidak sejati dengan warna merah!",
										),
									),
								),
								answerConfig: {
									items: [
										{ fraction: "5/4" },
										{ fraction: "0/2" },
										{ fraction: "8/5" },
										{ fraction: "6/2" },
										{ fraction: "3/2" },
										{ fraction: "10/11" },
									],
									categories: [
										{
											key: "sejati",
											label: "Pecahan Sejati",
											badge: "Biru",
											color: "blue",
										},
										{
											key: "tidak_sejati",
											label: "Pecahan Tidak Sejati",
											badge: "Merah",
											color: "red",
										},
									],
								},
								questionLlmContext:
									"Aktivitas 3.5: Klasifikasi 6 pecahan menjadi Sejati (Biru) atau Tidak Sejati (Merah):\n" +
									"1. 5/4: Pembilang 5 > Penyebut 4 -> Pecahan Tidak Sejati (Merah)\n" +
									"2. 0/2: Pembilang 0 < Penyebut 2 -> Pecahan Sejati (Biru, bernilai 0 < 1)\n" +
									"3. 8/5: Pembilang 8 > Penyebut 5 -> Pecahan Tidak Sejati (Merah)\n" +
									"4. 6/2: Pembilang 6 > Penyebut 2 -> Pecahan Tidak Sejati (Merah, bernilai 3)\n" +
									"5. 3/2: Pembilang 3 > Penyebut 2 -> Pecahan Tidak Sejati (Merah, bernilai 1.5)\n" +
									"6. 10/11: Pembilang 10 < Penyebut 11 -> Pecahan Sejati (Biru)\n" +
									"Kunci jawaban: Merah (tidak_sejati), Biru (sejati), Merah (tidak_sejati), Merah (tidak_sejati), Merah (tidak_sejati), Biru (sejati).\n" +
									"Bimbingan Sokratik: Minta siswa membandingkan angka atas (pembilang) dan angka bawah (penyebut). Jika atas < bawah maka Sejati (Biru), jika atas > bawah maka Tidak Sejati (Merah).",
								evaluationParameters: {
									expected_answer_keywords: [
										"sejati",
										"tidak sejati",
										"biru",
										"merah",
									],
									expected_classifications: {
										0: "tidak_sejati",
										1: "sejati",
										2: "tidak_sejati",
										3: "tidak_sejati",
										4: "tidak_sejati",
										5: "sejati",
									},
									common_misconceptions: [
										"Mengira 0/2 bukan pecahan sejati",
										"Terbalik antara pecahan sejati dan tidak sejati",
									],
									strictness_level: "strict",
									hints: [
										"Bandingkan angka pembilang (atas) dan penyebut (bawah).",
										"Jika pembilang lebih kecil dari penyebut, itu adalah Pecahan Sejati (pilih Biru).",
										"Jika pembilang lebih besar dari penyebut, itu adalah Pecahan Tidak Sejati (pilih Merah).",
										"Pecahan sejati: 0/2 dan 10/11. Pecahan tidak sejati: 5/4, 8/5, 6/2, 3/2.",
									],
								},
								answers: {
									"0": "tidak_sejati",
									"1": "sejati",
									"2": "tidak_sejati",
									"3": "tidak_sejati",
									"4": "tidak_sejati",
									"5": "sejati",
								},
							},

							// ─── Soal 7: Aktivitas 3.6 — Membandingkan 8/9 dan 7/6 melalui Patokan 1 ───
							{
								learningObjective:
									"Siswa dapat membandingkan 8/9 dan 7/6 dengan melengkapi kalimat analisis hubungan pembilang-penyebut dan merangkai pertidaksamaan terhadap 1.",
								questionType: "sentence_completion",
								questionUi: doc(
									heading(
										3,
										"Aktivitas  3.6: Membandingkan $\\frac{8}{9}$ dan $\\frac{7}{6}$. Lengkapilah!",
									),
									p(
										bold("Bandingkan $\\frac{8}{9}$ dan $\\frac{7}{6}$."),
										" Lengkapilah kalimat penalaran dan rantai pertidaksamaannya di bawah ini:",
									),
									p(
										"Kita telah mempelajari melalui contoh pecahan $\\frac{4}{8}$ dan $\\frac{2}{4}$ bagaimana cara membandingkan pecahan yang memiliki pembilang dan penyebut berbeda.",
									),
									p(
										"Untuk itu, kita membagi dua lagi setiap bagian seperempat sehingga menjadi bagian-bagian yang lebih kecil, yaitu seperdelapan. Kita menemukan bahwa: $\\frac{4}{8} = \\frac{2}{4}$.",
									),
								),
								answerConfig: {
									sections: [
										{
											title: "Pada bilangan pecahan $\\frac{8}{9}$",
											badge: "1",
											fractionMath: "8/9",
											blanks: [
												{
													id: "b_8_9_comp",
													prefix: "Pembilang lebih",
													suffix: "daripada penyebut.",
													options: [
														{ value: "kecil", label: "lebih kecil" },
														{ value: "besar", label: "lebih besar" },
													],
													placeholder: "Pilih perbandingan",
												},
												{
													id: "b_8_9_type",
													prefix: "Jadi, pecahan tersebut merupakan",
													suffix: ".",
													options: [
														{ value: "sejati", label: "pecahan sejati" },
														{ value: "tidak_sejati", label: "pecahan tidak sejati" },
													],
													placeholder: "Pilih jenis pecahan",
												},
												{
													id: "b_8_9_unit",
													prefix: "Nilai $\\frac{8}{9}$ selalu",
													suffix: "daripada satu kesatuan (1 utuh).",
													options: [
														{ value: "kurang", label: "lebih kecil / kurang dari (< 1)" },
														{ value: "lebih", label: "lebih besar / lebih dari (> 1)" },
													],
													placeholder: "Pilih hubungan dengan 1",
												},
											],
										},
										{
											title: "Pada bilangan pecahan $\\frac{7}{6}$",
											badge: "2",
											fractionMath: "7/6",
											blanks: [
												{
													id: "b_7_6_comp",
													prefix: "Pembilang lebih",
													suffix: "daripada penyebut.",
													options: [
														{ value: "besar", label: "lebih besar" },
														{ value: "kecil", label: "lebih kecil" },
													],
													placeholder: "Pilih perbandingan",
												},
												{
													id: "b_7_6_type",
													prefix: "Jadi, pecahan tersebut merupakan",
													suffix: ".",
													options: [
														{ value: "tidak_sejati", label: "pecahan tidak sejati" },
														{ value: "sejati", label: "pecahan sejati" },
													],
													placeholder: "Pilih jenis pecahan",
												},
												{
													id: "b_7_6_unit",
													prefix: "Dengan demikian, pecahan $\\frac{7}{6}$",
													suffix: "daripada satu kesatuan (1 utuh).",
													options: [
														{ value: "lebih", label: "lebih besar / lebih dari (> 1)" },
														{ value: "kurang", label: "lebih kecil / kurang dari (< 1)" },
													],
													placeholder: "Pilih hubungan dengan 1",
												},
											],
										},
									],
									inequalityCard: {
										title: "Notasi Matematika Singkat & Kesimpulan",
										chainPrompt: "Dalam notasi matematika singkat:",
										leftSlot: {
											id: "chain_left",
											placeholder: "Pecahan 1",
											options: ["8/9", "7/6"],
										},
										rightSlot: {
											id: "chain_right",
											placeholder: "Pecahan 2",
											options: ["7/6", "8/9"],
										},
										conclusionPrompt: "Jadi, kesimpulan perbandingan:",
										conclusionLeftSlot: {
											id: "conc_left",
											options: ["8/9", "7/6"],
										},
										conclusionOperator: "<",
										conclusionRightSlot: {
											id: "conc_right",
											options: ["7/6", "8/9"],
										},
									},
								},
								questionLlmContext:
									"Aktivitas 3.6: Membandingkan 8/9 dan 7/6 melalui perbandingan terhadap bilangan 1:\n" +
									"1. Pada pecahan 8/9: pembilang lebih kecil dari penyebut -> pecahan sejati -> 8/9 < 1.\n" +
									"2. Pada pecahan 7/6: pembilang lebih besar dari penyebut -> pecahan tidak sejati -> 7/6 > 1 (1 < 7/6).\n" +
									"3. Notasi matematika singkat: 8/9 < 1 < 7/6.\n" +
									"4. Kesimpulan: 8/9 < 7/6.\n" +
									"Bimbingan Sokratik: Tuntun siswa bahwa pecahan sejati (< 1) pasti selalu lebih kecil daripada pecahan tidak sejati (> 1), sehingga dapat dibandingkan langsung tanpa menyamakan penyebut.",
								evaluationParameters: {
									expected_answer_keywords: [
										"8/9",
										"7/6",
										"sejati",
										"tidak sejati",
										"kurang",
										"lebih",
										"<",
									],
									expected_sentence_blanks: {
										b_8_9_comp: "kecil",
										b_8_9_type: "sejati",
										b_8_9_unit: "kurang",
										b_7_6_comp: "besar",
										b_7_6_type: "tidak_sejati",
										b_7_6_unit: "lebih",
										chain_left: "8/9",
										chain_right: "7/6",
										conc_left: "8/9",
										conc_right: "7/6",
									},
									common_misconceptions: [
										"Mengira 8/9 > 7/6 hanya karena angka 8 dan 9 lebih besar dari 7 dan 6",
									],
									strictness_level: "strict",
									hints: [
										"Perhatikan: 8/9 memiliki pembilang lebih kecil (8 < 9), jadi 8/9 adalah pecahan sejati yang nilainya kurang dari 1.",
										"Pecahan 7/6 memiliki pembilang lebih besar (7 > 6), jadi 7/6 adalah pecahan tidak sejati yang nilainya lebih dari 1.",
										"Maka rantai perbandingannya: 8/9 < 1 < 7/6, sehingga 8/9 < 7/6.",
									],
								},
								answers: {
									analisis_8_9: "pembilang lebih kecil, pecahan sejati, kurang dari 1",
									analisis_7_6: "pembilang lebih besar, pecahan tidak sejati, lebih dari 1",
									rantai_notasi: "8/9 < 1 < 7/6",
									kesimpulan: "8/9 < 7/6",
								},
							},

							// ─── Soal 8: Aktivitas 3.7 — Konsep Memperluas Pecahan 1/2 Menjadi 2/4 ───
							{
								learningObjective:
									"Siswa dapat memahami konsep memperluas pecahan dengan mengalikan pembilang dan penyebut menggunakan bilangan yang sama.",
								questionType: "pizza_slice_marker",
								questionUi: doc(
									heading(
										3,
										"Aktivitas 3.7: Menunjukkan Pecahan Senilai $\\frac{1}{2}$ dan $\\frac{2}{4}$",
									),
									image(
										"/images/topic2/two_pizzas_plain.svg",
										"Dua pizza utuh untuk menunjukkan pecahan senilai 1/2 dan 2/4",
									),
									p(
										bold("Lakukan kegiatan di atas untuk kedua pecahan yang senilai, yaitu $\\frac{1}{2}$ dan $\\frac{2}{4}$. Tunjukkanlah pada model pizza di bawah ini!"),
									),
									p(
										"Jika kita ingin menjelaskan langkah-langkah ini tanpa menggambar dan memotong pizza, kita bisa menuliskannya dengan cara berikut:",
									),
									p(
										"Kita mulai dengan satu potong pizza yang dibagi menjadi dua bagian sama besar: $\\frac{1}{2}$. Kita membagi pecahan ini menjadi bagian yang lebih kecil dengan cara mengalikan pembilang dan penyebutnya dengan ",
										bold("2"),
										":",
									),
									math(
										"\\frac{1 \\times 2}{2 \\times 2} = \\frac{2}{4}",
									),
									p(
										"Nilai pecahannya tetap sama. Jadi, $\\frac{1}{2} = \\frac{2}{4}$. Cara ini memiliki nama, yaitu ",
										bold("Memperluas Pecahan"),
										", atau mengalikan pembilang dan penyebut dengan bilangan yang sama.",
									),
								),
								answerConfig: {
									pizzas: [
										{
											label: "Pizza Pertama (1/2)",
											totalSlices: 2,
											targetFraction: "1/2",
											helperText: "Tandai 1 dari 2 potong",
										},
										{
											label: "Pizza Kedua (2/4)",
											totalSlices: 4,
											targetFraction: "2/4",
											helperText: "Tandai 2 dari 4 potong",
										},
									],
									instruction:
										"Klik potongan pizza untuk menunjukkan 1/2 pada pizza pertama dan 2/4 pada pizza kedua.",
								},
								questionLlmContext:
									"Aktivitas 3.7: Menunjukkan pecahan senilai 1/2 dan 2/4 pada dua pizza, dan memahami konsep Memperluas Pecahan:\n" +
									"- Pizza 1: dipotong 2, ditandai 1 potong (1/2).\n" +
									"- Pizza 2: dipotong 4, ditandai 2 potong (2/4).\n" +
									"- Operasi simbolik: (1 x 2)/(2 x 2) = 2/4.\n" +
									"- Definisi: Memperluas pecahan adalah mengalikan pembilang dan penyebut dengan bilangan yang sama.\n" +
									"Bimbingan Sokratik: Tanyakan kepada siswa apakah 1 potong dari 2 bagian sama luasnya dengan 2 potong dari 4 bagian, dan jelaskan bahwa ini adalah memperluas pecahan dengan pengali 2.",
								evaluationParameters: {
									expected_answer_keywords: [
										"1/2",
										"2/4",
										"senilai",
										"memperluas",
										"dikali 2",
									],
									expected_pizza_slices: {
										0: 1,
										1: 2,
									},
									common_misconceptions: [
										"Menandai jumlah potong yang salah pada pizza",
										"Mengira memperluas pecahan mengubah nilai pecahan (nilainya tetap sama senilai)",
									],
									strictness_level: "strict",
									hints: [
										"Pada pizza pertama (2 potong), klik 1 potong untuk menunjukkan 1/2.",
										"Pada pizza kedua (4 potong), klik 2 potong untuk menunjukkan 2/4.",
										"Perhatikan bahwa 1/2 dan 2/4 sama besar, dan 2/4 diperoleh dari mengalikan pembilang dan penyebut 1/2 dengan 2.",
									],
								},
								answers: {
									pizza_1: "1 dari 2 potong (1/2)",
									pizza_2: "2 dari 4 potong (2/4)",
									konsep: "Memperluas pecahan dengan mengalikan pembilang dan penyebut dengan 2: (1x2)/(2x2) = 2/4",
								},
							},

							// ─── Soal 9: Aktivitas 3.8 — Menentukan Bilangan Pengali (Perluasan Pecahan) ───
							{
								learningObjective:
									"Siswa dapat menentukan bilangan pengali yang tepat untuk pembilang dan penyebut pada perluasan pecahan.",
								questionType: "fraction_expansion",
								questionUi: doc(
									heading(
										3,
										"Aktivitas 3.8: Menentukan Bilangan Pengali pada Perluasan Pecahan",
									),
									p(
										"Dengan bilangan berapa pembilang dan penyebut pecahan harus dikalikan? Lengkapilah!",
									),
								),
								answerConfig: {
									items: [
										{
											prompt: "Dengan bilangan berapa $\\frac{2}{5}$ dikalikan agar menjadi $\\frac{4}{10}$?",
											originalFraction: "2/5",
											targetFraction: "4/10",
										},
										{
											prompt: "Dengan bilangan berapa $\\frac{3}{7}$ dikalikan agar menjadi $\\frac{12}{28}$?",
											originalFraction: "3/7",
											targetFraction: "12/28",
										},
										{
											prompt: "Dengan bilangan berapa $\\frac{1}{3}$ dikalikan agar menjadi $\\frac{4}{12}$?",
											originalFraction: "1/3",
											targetFraction: "4/12",
										},
									],
								},
								questionLlmContext:
									"Aktivitas 3.8: Menentukan bilangan pengali (k) pada 3 persamaan perluasan pecahan:\n" +
									"1. 2/5 -> 4/10: 2 dikali 2 = 4, dan 5 dikali 2 = 10. Bilangan pengali = 2.\n" +
									"2. 3/7 -> 12/28: 3 dikali 4 = 12, dan 7 dikali 4 = 28. Bilangan pengali = 4.\n" +
									"3. 1/3 -> 4/12: 1 dikali 4 = 4, dan 3 dikali 4 = 12. Bilangan pengali = 4.\n" +
									"Kunci jawaban: nomor 1 = 2, nomor 2 = 4, nomor 3 = 4.\n" +
									"Bimbingan Sokratik: Tanyakan kepada siswa, 2 dikali berapa menghasilkan 4? Atau 5 dikali berapa menghasilkan 10?",
								evaluationParameters: {
									expected_answer_keywords: ["2", "4"],
									expected_multipliers: {
										0: 2,
										1: 4,
										2: 4,
									},
									common_misconceptions: [
										"Mengurangkan atau menjumlahkan alih-alih mencari faktor kali (misal mengira ditambah 2 atau ditambah 5)",
									],
									strictness_level: "strict",
									hints: [
										"Untuk 2/5 menjadi 4/10: pikirkan 2 dikali berapa agar menjadi 4? 2 x 2 = 4.",
										"Untuk 3/7 menjadi 12/28: pikirkan 3 dikali berapa agar menjadi 12? 3 x 4 = 12.",
										"Untuk 1/3 menjadi 4/12: pikirkan 1 dikali berapa agar menjadi 4? 1 x 4 = 4.",
									],
								},
								answers: {
									"0": 2,
									"1": 4,
									"2": 4,
								},
							},
						],
					},
				],
			},
		],
	};
