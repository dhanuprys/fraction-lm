import {
	bold,
	bulletList,
	doc,
	heading,
	math,
	orderedList,
	p,
} from "./helpers";

export const topic1 =
	// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  TOPIC 1  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	{
		name: "Bilangan Pecahan",
		slug: "bilangan-pecahan",
		description:
			"Memahami konsep dasar pecahan sebagai bagian dari keseluruhan, mengenal bentuk penulisannya, serta belajar membaca dan menuliskan pecahan. Topik ini adalah fondasi untuk seluruh materi pecahan.",
		order: 1,
		subTopics: [
			{
				name: "Konsep dan Makna Pecahan",
				slug: "konsep-dan-makna-pecahan",
				description:
					"Membangun pemahaman dasar tentang pecahan: apa itu pecahan, bagaimana menggambarkannya, cara penulisannya, serta cara membaca dan menuliskannya.",
				order: 1,
				materials: [
					// ───────────────────────── MATERI 1 ─────────────────────────
					{
						title: "Pengertian Pecahan dan Gambar Bagiannya",
						order: 1,
						difficulty: 1,
						content: doc(
							heading(2, "Apa Itu Pecahan?"),
							p(
								"Pecahan adalah cara kita menyatakan ",
								bold("bagian dari keseluruhan"),
								". Bayangkan kamu punya sebuah kue utuh, lalu kue itu dipotong menjadi beberapa bagian yang ",
								bold("sama besar"),
								".",
							),
							heading(3, "Syarat Sebuah Pecahan"),
							bulletList(
								"Ada sebuah benda atau kumpulan yang utuh",
								"Benda itu dibagi menjadi beberapa bagian",
								"Semua bagian harus sama besar",
							),
							heading(3, "Menggambarkan Bagian Pecahan"),
							p(
								"Kita bisa menggambarkan pecahan dengan mewarnai bagian dari sebuah gambar. Perhatikan contoh berikut, di mana kotak berwarna menunjukkan bagian yang diambil:",
							),
							bulletList(
								"🟩⬜ → 1 dari 2 bagian sama besar, yaitu setengah",
								"🟩⬜⬜⬜ → 1 dari 4 bagian sama besar, yaitu seperempat",
								"🟩🟩🟩⬜ → 3 dari 4 bagian sama besar, yaitu tiga perempat",
								"🟩🟩⬜⬜⬜⬜ → 2 dari 6 bagian sama besar",
							),
							heading(3, "Contoh"),
							p(
								"Sebuah pizza dipotong menjadi 4 bagian yang sama besar. Kamu mengambil 1 potong. Maka bagian pizza yang kamu ambil adalah:",
							),
							math("\\frac{1}{4}"),
							p(
								bold("Ingat: "),
								"Jika bagiannya tidak sama besar, maka itu bukan pecahan!",
							),
						),
						materialLlmContext:
							"Materi ini membahas pengertian pecahan dan cara menggambarkan bagian pecahan secara visual untuk siswa SD (kelas 3). " +
							"Pecahan adalah bagian dari keseluruhan yang dibagi menjadi bagian-bagian yang SAMA BESAR. " +
							"Visualisasi menggunakan kotak berwarna (🟩 = bagian yang diambil, ⬜ = bagian sisa). " +
							"Contoh: pizza dibagi 4 bagian sama besar, diambil 1 → 1/4. " +
							"Siswa harus memahami bahwa bagian-bagian harus sama besar, dan bisa menyatakan bagian berwarna pada gambar sebagai pecahan.",
						questions: [
							{
								learningObjective:
									"Siswa dapat menyatakan bagian berwarna pada gambar sebagai pecahan.",
								questionUi: doc(
									p("Perhatikan gambar berikut:"),
									p("🟦🟦🟦⬜"),
									p(
										bold("Pertanyaan: "),
										"Semua kotak sama besar. Pecahan berapakah yang menunjukkan kotak yang berwarna biru?",
									),
								),
								questionLlmContext:
									"Gambar terdiri dari 4 kotak sama besar, 3 kotak berwarna biru. Jawaban benar: 3/4 (tiga per empat atau tiga perempat). " +
									"Pembilang = jumlah kotak berwarna (3), penyebut = jumlah seluruh kotak (4).",
								evaluationParameters: {
									expected_answer_keywords: [
										"3/4",
										"tiga per empat",
										"tiga perempat",
									],
									common_misconceptions: [
										"Menulis 1/4 (menghitung kotak yang tidak berwarna)",
										"Menulis 4/3 (membalik posisi)",
									],
									strictness_level: "lenient",
									hints: [
										"Coba hitung dulu ada berapa kotak semuanya.",
										"Sekarang hitung ada berapa kotak yang berwarna biru.",
										"Pecahan ditulis (kotak berwarna) per (seluruh kotak).",
									],
								},
								answers: { pecahan: "3/4" },
							},
							{
								learningObjective:
									"Siswa memahami bahwa bagian pecahan harus sama besar.",
								questionUi: doc(
									p(
										"Sebuah roti dipotong menjadi 3 bagian, tetapi ",
										bold(
											"ukuran potongannya tidak sama besar",
										),
										". Adi mengambil 1 potong.",
									),
									p(
										bold("Pertanyaan: "),
										"Apakah bagian yang diambil Adi bisa disebut 1/3 roti? Jelaskan alasanmu!",
									),
								),
								questionLlmContext:
									"Roti dipotong 3 bagian dengan ukuran tidak sama. Jawaban benar: TIDAK, karena pecahan mensyaratkan semua bagian sama besar. " +
									"Siswa harus menyebutkan alasan bahwa bagian-bagiannya tidak sama besar.",
								evaluationParameters: {
									expected_answer_keywords: [
										"tidak",
										"sama besar",
										"tidak sama",
									],
									common_misconceptions: [
										"Menjawab ya karena ada 3 potongan",
										"Menjawab tidak tanpa alasan",
									],
									strictness_level: "lenient",
								},
								answers: {
									jawaban: "Tidak",
									alasan: "Bagian-bagiannya tidak sama besar",
								},
							},
						],
					},

					// ───────────────────────── MATERI 2 ─────────────────────────
					// Catatan: materi ini sengaja TANPA soal (pengenalan istilah),
					// pemahamannya diuji pada materi LATIHAN.
					{
						title: "Bentuk Penulisan Pecahan",
						order: 2,
						difficulty: 1,
						content: doc(
							heading(2, "Bentuk Penulisan Pecahan"),
							p(
								"Sebuah pecahan ditulis dengan dua angka yang dipisahkan oleh sebuah ",
								bold("garis pecahan"),
								".",
							),
							math("\\frac{a}{b}"),
							bulletList(
								"Angka di atas garis disebut pembilang",
								"Angka di bawah garis disebut penyebut",
								"Garis di tengah disebut garis pecahan",
							),
							heading(3, "Arti Pembilang dan Penyebut"),
							bulletList(
								"Pembilang menunjukkan jumlah bagian yang diambil atau diwarnai",
								"Penyebut menunjukkan jumlah seluruh bagian yang sama besar",
							),
							heading(3, "Contoh"),
							p(
								"Sebuah cokelat dibagi menjadi 5 bagian yang sama besar. Kamu memakan 2 bagian.",
							),
							math("\\frac{2}{5}"),
							bulletList(
								"Pembilang = 2 (bagian yang dimakan)",
								"Penyebut = 5 (seluruh bagian cokelat)",
							),
							p(
								bold("Hati-hati: "),
								"Posisi angkanya tidak boleh tertukar. ",
								"2/5 berbeda dengan 5/2.",
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan bentuk penulisan pecahan: a/b dengan "a" adalah pembilang (angka atas, bagian yang diambil) ' +
							'dan "b" adalah penyebut (angka bawah, jumlah seluruh bagian sama besar), dipisahkan garis pecahan. ' +
							"Contoh: cokelat 5 bagian, dimakan 2 → 2/5 (pembilang 2, penyebut 5). " +
							"Materi ini tidak memiliki soal sendiri; pemahaman siswa diuji pada LATIHAN. " +
							"Jika siswa bertanya, bantu dengan penjelasan dan contoh sederhana, jangan langsung memberi jawaban soal latihan.",
						questions: [],
					},

					// ───────────────────────── MATERI 3 ─────────────────────────
					{
						title: "Membaca dan Menuliskan Pecahan",
						order: 3,
						difficulty: 1,
						content: doc(
							heading(2, "Cara Membaca Pecahan"),
							p(
								"Kita membaca pembilang terlebih dahulu, lalu kata ",
								bold('"per"'),
								", kemudian penyebut.",
							),
							bulletList(
								'2/5 dibaca "dua per lima"',
								'3/7 dibaca "tiga per tujuh"',
								'5/8 dibaca "lima per delapan"',
							),
							heading(3, "Pecahan dengan Nama Khusus"),
							p(
								"Beberapa pecahan punya nama khusus yang sering dipakai sehari-hari:",
							),
							bulletList(
								'1/2 dibaca "setengah"',
								'1/3 dibaca "sepertiga"',
								'1/4 dibaca "seperempat"',
								'3/4 dibaca "tiga perempat"',
							),
							heading(3, "Cara Menuliskan Pecahan"),
							orderedList(
								"Dengar atau baca bilangan pertama, tulis sebagai pembilang",
								"Gambar garis pecahan di bawahnya",
								'Tulis bilangan setelah kata "per" sebagai penyebut',
							),
							p(
								bold("Contoh: "),
								'"empat per sembilan" ditulis:',
							),
							math("\\frac{4}{9}"),
						),
						materialLlmContext:
							"Materi ini mengajarkan cara membaca dan menuliskan pecahan dalam Bahasa Indonesia. " +
							'Cara baca: [pembilang] per [penyebut], contoh 3/7 = "tiga per tujuh". ' +
							"Nama khusus: 1/2 = setengah, 1/3 = sepertiga, 1/4 = seperempat, 3/4 = tiga perempat. " +
							'Cara menulis: bilangan sebelum "per" jadi pembilang, bilangan sesudah "per" jadi penyebut. ' +
							"Siswa diharapkan bisa membaca pecahan dan menuliskan pecahan dari cara bacanya.",
						questions: [
							{
								learningObjective:
									"Siswa dapat membaca pecahan dengan benar.",
								questionUi: doc(
									p(
										"Bagaimana cara membaca pecahan berikut?",
									),
									math("\\frac{5}{8}"),
								),
								questionLlmContext:
									'Siswa diminta membaca pecahan 5/8. Jawaban benar: "lima per delapan".',
								evaluationParameters: {
									expected_answer_keywords: [
										"lima per delapan",
										"lima perdelapan",
										"5 per 8",
									],
									common_misconceptions: [
										'Membaca "delapan per lima" (terbalik)',
										'Membaca "lima bagi delapan"',
									],
									strictness_level: "lenient",
								},
								answers: { cara_baca: "lima per delapan" },
							},
							{
								learningObjective:
									"Siswa dapat menuliskan pecahan dari cara bacanya.",
								questionUi: doc(
									p(
										"Tuliskan pecahan yang dibaca ",
										bold('"tiga per tujuh"'),
										"!",
									),
								),
								questionLlmContext:
									'Siswa diminta menuliskan pecahan dari bacaan "tiga per tujuh". Jawaban benar: 3/7.',
								evaluationParameters: {
									expected_answer_keywords: [
										"3/7",
										"3 per 7",
									],
									common_misconceptions: [
										"Menulis 7/3 (terbalik)",
										"Menulis 37 (tanpa garis pecahan)",
									],
									strictness_level: "lenient",
								},
								answers: { pecahan: "3/7" },
							},
						],
					},

					// ───────────────────────── LATIHAN ─────────────────────────
					{
						title: "LATIHAN",
						order: 4,
						difficulty: 2,
						content: doc(
							heading(2, "LATIHAN"),
							p(
								"Latihan untuk menguji pemahaman siswa tentang seluruh materi pada subtopik ini: pengertian pecahan, bentuk penulisan, serta cara membaca dan menuliskan pecahan.",
							),
						),
						materialLlmContext:
							"Latihan ini menguji pemahaman siswa terhadap seluruh materi pada subtopik Konsep dan Makna Pecahan: " +
							"(1) pengertian pecahan dan gambar bagiannya, (2) bentuk penulisan pecahan (pembilang, penyebut, garis pecahan), " +
							"(3) membaca dan menuliskan pecahan. Soal menggabungkan konsep-konsep tersebut.",
						questions: [
							{
								learningObjective:
									"Siswa dapat mengidentifikasi pembilang dan penyebut dari sebuah pecahan.",
								questionUi: doc(
									p("Perhatikan pecahan berikut:"),
									math("\\frac{3}{5}"),
									p(
										bold("Pertanyaan: "),
										"Berapakah pembilang dan penyebut dari pecahan tersebut?",
									),
								),
								questionLlmContext:
									"Siswa mengidentifikasi pembilang dan penyebut dari 3/5. Jawaban benar: pembilang = 3, penyebut = 5.",
								evaluationParameters: {
									expected_answer_keywords: [
										"pembilang",
										"3",
										"penyebut",
										"5",
									],
									common_misconceptions: [
										"Menukar posisi pembilang dan penyebut",
									],
									strictness_level: "lenient",
									hints: [
										"Perhatikan angka di atas dan di bawah garis pecahan.",
										"Angka di atas namanya pembilang, angka di bawah namanya penyebut.",
										"Jadi pembilangnya 3. Lalu, penyebutnya angka berapa?",
									],
								},
								answers: { pembilang: 3, penyebut: 5 },
							},
							{
								learningObjective:
									"Siswa dapat menyatakan bagian berwarna pada gambar sebagai pecahan.",
								questionUi: doc(
									p(
										"Perhatikan gambar berikut (semua kotak sama besar):",
									),
									p("🟩🟩🟩🟩🟩⬜⬜⬜"),
									p(
										bold("Pertanyaan: "),
										"Tuliskan pecahan yang menunjukkan kotak yang berwarna hijau!",
									),
								),
								questionLlmContext:
									"Ada 8 kotak sama besar, 5 berwarna hijau. Jawaban benar: 5/8. Pembilang = kotak hijau (5), penyebut = seluruh kotak (8).",
								evaluationParameters: {
									expected_answer_keywords: [
										"5/8",
										"lima per delapan",
										"5 per 8",
									],
									common_misconceptions: [
										"Menulis 3/8 (menghitung kotak putih)",
										"Menulis 8/5 (membalik posisi)",
									],
									strictness_level: "lenient",
									hints: [
										"Hitung dulu semua kotak yang ada.",
										"Lalu hitung kotak yang berwarna hijau.",
										"Kotak hijau jadi pembilang, seluruh kotak jadi penyebut.",
									],
								},
								answers: {
									pecahan: "5/8",
									pembilang: 5,
									penyebut: 8,
								},
							},
							{
								learningObjective:
									"Siswa dapat menuliskan pecahan dari cara bacanya.",
								questionUi: doc(
									p(
										bold("Pertanyaan: "),
										"Tuliskan pecahan yang dibaca ",
										bold('"dua per sembilan"'),
										"!",
									),
								),
								questionLlmContext:
									'Siswa menuliskan pecahan dari bacaan "dua per sembilan". Jawaban benar: 2/9.',
								evaluationParameters: {
									expected_answer_keywords: [
										"2/9",
										"2 per 9",
									],
									common_misconceptions: [
										"Menulis 9/2 (terbalik)",
										"Menulis 29 (tanpa garis pecahan)",
									],
									strictness_level: "lenient",
									hints: [
										'Bilangan sebelum kata "per" ditulis di atas garis pecahan.',
										'Bilangan setelah kata "per" ditulis di bawah garis pecahan.',
									],
								},
								answers: { pecahan: "2/9" },
							},
							{
								learningObjective:
									"Siswa dapat membaca pecahan dengan benar, termasuk nama khususnya.",
								questionUi: doc(
									p(
										"Bagaimana cara membaca pecahan berikut?",
									),
									math("\\frac{3}{4}"),
								),
								questionLlmContext:
									'Siswa membaca pecahan 3/4. Jawaban diterima: "tiga per empat" atau "tiga perempat".',
								evaluationParameters: {
									expected_answer_keywords: [
										"tiga per empat",
										"tiga perempat",
										"3 per 4",
									],
									common_misconceptions: [
										'Membaca "empat per tiga" (terbalik)',
										'Membaca "tiga puluh empat"',
									],
									strictness_level: "lenient",
								},
								answers: { cara_baca: "tiga per empat" },
							},
							{
								learningObjective:
									"Siswa dapat menjelaskan arti sebuah pecahan dalam konteks kehidupan nyata.",
								questionUi: doc(
									p(
										"Ibu memotong semangka menjadi ",
										bold("6 bagian yang sama besar"),
										". Kakak mengambil ",
										bold("2 bagian"),
										".",
									),
									p(
										bold("Pertanyaan: "),
										"Apa arti pecahan 2/6 dalam cerita ini? Jelaskan dengan kata-katamu sendiri!",
									),
								),
								questionLlmContext:
									"Siswa menjelaskan makna 2/6: kakak mengambil 2 bagian dari total 6 bagian semangka yang sama besar. " +
									"Siswa harus menunjukkan bahwa pembilang (2) adalah bagian yang diambil dan penyebut (6) adalah seluruh bagian.",
								evaluationParameters: {
									expected_answer_keywords: [
										"2 bagian",
										"6 bagian",
										"diambil",
										"sama besar",
									],
									common_misconceptions: [
										'Menyebut 2/6 sebagai "dua kali enam"',
										"Tidak menyebutkan bahwa bagian harus sama besar",
									],
									strictness_level: "lenient",
								},
								answers: {
									penjelasan:
										"2/6 berarti kakak mengambil 2 bagian dari total 6 bagian semangka yang sama besar.",
								},
							},
						],
					},
				],
			},
		],
	};
