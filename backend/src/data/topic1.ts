import { topic1Exercise1Questions } from "./exercises/topic1-exercise1";
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
			"Memahami konsep dasar pecahan sebagai bagian dari keseluruhan, mengenal pembilang dan penyebut, serta belajar membaca dan menuliskan pecahan dengan benar. Topik ini adalah fondasi untuk seluruh materi pecahan berikutnya.",
		order: 1,
		subTopics: [
			{
				name: "Konsep dan Makna Pecahan",
				slug: "konsep-dan-makna-pecahan",
				description:
					"Membangun pemahaman dasar tentang pecahan: apa itu pecahan, bagaimana menggambarkannya, bagaimana cara penulisannya, serta bagaimana cara membaca dan menuliskannya.",
				order: 1,
				materials: [
					// ───────────────────────── MATERI 1 ─────────────────────────
					{
						title: "Pengertian Pecahan dan Gambar Bagiannya",
						order: 1,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Apa Itu Pecahan?"),
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"menjelaskan apa yang dimaksud dengan pecahan",
								"mengenali syarat sebuah benda dapat dinyatakan dengan pecahan",
								"menyatakan bagian yang diwarnai pada sebuah gambar sebagai pecahan",
							),
							heading(3, "Ayo Mulai"),
							p(
								"Pernahkah kamu berbagi kue dengan adik atau temanmu? Misalnya, Ibu memotong sebuah kue menjadi 4 bagian yang sama besar, lalu kamu mendapat 1 bagian. Kamu tidak mendapat kue yang utuh, tetapi hanya sebagian dari kue itu. Dalam matematika, bagian seperti ini dinyatakan dengan pecahan.",
							),
							heading(3, "Pengertian Pecahan"),
							p(
								"Pecahan adalah cara kita menyatakan ",
								bold("bagian dari keseluruhan"),
								". Keseluruhan itu disebut satu utuh, misalnya satu kue utuh, satu pizza utuh, atau satu pita utuh. Ketika satu utuh dibagi menjadi beberapa bagian yang ",
								bold("sama besar"),
								", setiap bagiannya atau beberapa bagiannya dapat dinyatakan dengan pecahan.",
							),
							heading(3, "Syarat Sebuah Pecahan"),
							bulletList(
								"Ada sebuah benda atau kumpulan benda yang utuh",
								"Benda itu dibagi menjadi beberapa bagian",
								"Semua bagian harus sama besar",
							),
							p(
								bold("Ingat: "),
								"Jika bagiannya tidak sama besar, maka itu bukan pecahan! Syarat sama besar inilah yang paling penting.",
							),
							heading(3, "Sama Besar atau Tidak Sama Besar?"),
							p(
								"Cokelat A dipotong menjadi 4 bagian yang sama besar. Setiap potongannya dapat dinyatakan sebagai seperempat bagian cokelat.",
							),
							p(
								"Cokelat B juga dipotong menjadi 4 bagian, tetapi satu potongannya sangat besar dan tiga potongan lainnya kecil. Karena bagiannya tidak sama besar, satu potongan cokelat B tidak bisa disebut seperempat.",
							),
							heading(3, "Menggambarkan Bagian Pecahan"),
							p(
								"Kita bisa menggambarkan pecahan dengan mewarnai sebagian dari sebuah gambar. Pada contoh di bawah, tanda [X] adalah bagian yang diwarnai (diambil), dan tanda [ ] adalah bagian yang tidak diwarnai. Semua kotak sama besar.",
							),
							bulletList(
								"[X][ ] : 1 dari 2 bagian sama besar, yaitu setengah",
								"[X][ ][ ][ ] : 1 dari 4 bagian sama besar, yaitu seperempat",
								"[X][X][X][ ] : 3 dari 4 bagian sama besar, yaitu tiga perempat",
								"[X][X][ ][ ][ ][ ] : 2 dari 6 bagian sama besar",
							),
							heading(
								3,
								"Langkah Menyatakan Gambar sebagai Pecahan",
							),
							orderedList(
								"Pastikan semua bagian pada gambar sama besar",
								"Hitung banyaknya seluruh bagian",
								"Hitung banyaknya bagian yang diwarnai atau diambil",
								"Tulis banyak bagian yang diwarnai di atas garis pecahan, dan banyak seluruh bagian di bawah garis pecahan",
							),
							heading(3, "Contoh 1: Pizza"),
							p(
								"Sebuah pizza dipotong menjadi 4 bagian yang sama besar. Kamu mengambil 1 potong. Maka bagian pizza yang kamu ambil adalah:",
							),
							math("\\frac{1}{4}"),
							heading(3, "Contoh 2: Kumpulan Benda"),
							p(
								"Pecahan juga dapat dipakai untuk menyatakan bagian dari sekumpulan benda. Di dalam keranjang ada 8 bola. Sebanyak 3 bola berwarna merah, dan sisanya berwarna biru. Maka bagian bola yang berwarna merah adalah 3 dari 8 bola, ditulis:",
							),
							math("\\frac{3}{8}"),
							heading(3, "Kesalahan yang Sering Terjadi"),
							bulletList(
								"Menganggap potongan yang tidak sama besar sebagai pecahan",
								"Membandingkan bagian yang diwarnai dengan bagian yang tidak diwarnai. Contohnya, gambar dengan 2 bagian diwarnai dan 4 bagian tidak diwarnai ditulis 2/4. Yang benar adalah 2/6, karena seluruh bagiannya ada 6",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Pecahan menyatakan bagian dari keseluruhan",
								"Keseluruhan harus dibagi menjadi bagian-bagian yang sama besar",
								"Untuk menyatakan gambar sebagai pecahan, hitung bagian yang diwarnai dan hitung seluruh bagian",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Sebuah pita dibagi menjadi 5 bagian yang sama besar. Dua bagian diberi warna merah. Tulis pecahan yang menyatakan bagian berwarna merah.",
								"Sebuah kue dipotong menjadi 3 bagian, tetapi ukuran ketiga potongnya berbeda. Apakah satu potong kue itu dapat disebut sepertiga? Jelaskan.",
								"Perhatikan gambar berikut: [X][X][X][ ][ ][ ]. Tulis pecahan yang menyatakan bagian yang diwarnai.",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"Pita dibagi menjadi 5 bagian sama besar dan 2 bagian berwarna merah, sehingga pecahannya 2/5.",
								"Tidak. Syarat pecahan adalah semua bagian sama besar. Karena ukuran potongnya berbeda, satu potong tidak dapat disebut sepertiga.",
								"Seluruh bagian ada 6 dan bagian yang diwarnai ada 3, sehingga pecahannya 3/6.",
							),
						),
						materialLlmContext:
							"Materi ini membahas pengertian pecahan dan cara menggambarkan bagian pecahan secara visual untuk siswa SD (kelas 3).\n" +
							"Tujuan belajar: siswa dapat menjelaskan pengertian pecahan, mengenali syarat pecahan, dan menyatakan bagian berwarna pada gambar sebagai pecahan.\n" +
							"Konsep utama: pecahan adalah bagian dari keseluruhan yang dibagi menjadi bagian-bagian yang SAMA BESAR. Jika bagian tidak sama besar, itu bukan pecahan.\n" +
							"Visualisasi teks: [X] = bagian yang diwarnai/diambil, [ ] = bagian yang tidak diwarnai. Contoh: [X][X][X][ ] = 3 dari 4 bagian = tiga perempat.\n" +
							"Contoh: pizza dibagi 4 bagian sama besar, diambil 1 potong = 1/4. Keranjang berisi 8 bola dengan 3 bola merah = 3/8 (pecahan dari kumpulan benda).\n" +
							"Langkah menyatakan gambar sebagai pecahan: pastikan bagian sama besar, hitung seluruh bagian, hitung bagian yang diwarnai, tulis bagian yang diwarnai di atas dan seluruh bagian di bawah.\n" +
							"Kesalahan umum: (1) menganggap potongan tidak sama besar sebagai pecahan; (2) membandingkan bagian berwarna dengan bagian tidak berwarna, misalnya 2 berwarna dan 4 tidak berwarna ditulis 2/4, padahal yang benar 2/6.\n" +
							"Cara membimbing: ajak siswa memeriksa dulu apakah semua bagian sama besar, lalu menghitung seluruh bagian sebelum menghitung bagian berwarna. Berikan pertanyaan pemandu, bukan langsung jawaban.",
						questions: [],
					},

					// ───────────────────────── MATERI 2 ─────────────────────────
					{
						title: "Bentuk Penulisan Pecahan",
						order: 2,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Bentuk Penulisan Pecahan"),
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"menyebutkan bagian-bagian pecahan, yaitu pembilang, penyebut, dan garis pecahan",
								"menjelaskan arti pembilang dan penyebut",
								"menuliskan pecahan dari gambar atau cerita dengan benar",
							),
							heading(3, "Ayo Mulai"),
							p(
								"Kamu sudah tahu bahwa pecahan menyatakan bagian dari keseluruhan. Sekarang, bagaimana cara menuliskannya agar semua orang dapat memahaminya? Matematika memiliki aturan penulisan yang rapi, yaitu dengan dua bilangan yang dipisahkan oleh sebuah garis.",
							),
							heading(3, "Bagian-Bagian Pecahan"),
							p(
								"Sebuah pecahan ditulis dengan dua bilangan yang dipisahkan oleh sebuah ",
								bold("garis pecahan"),
								".",
							),
							math("\\frac{a}{b}"),
							bulletList(
								"Bilangan di atas garis disebut pembilang",
								"Bilangan di bawah garis disebut penyebut",
								"Garis di tengah disebut garis pecahan",
							),
							heading(3, "Arti Pembilang dan Penyebut"),
							bulletList(
								"Pembilang menunjukkan jumlah bagian yang diambil, dimakan, atau diwarnai",
								"Penyebut menunjukkan jumlah seluruh bagian yang sama besar",
							),
							p(
								bold("Cara mengingat: "),
								'Pembilang berasal dari kata "membilang", artinya menghitung. Jadi, pembilang menghitung bagian yang kita ambil. Penyebut menyebutkan atau menamai pecahan itu, yaitu bahwa benda tersebut dibagi menjadi berapa bagian. Penyebut selalu berada di bawah, seperti fondasi yang menunjukkan jumlah seluruh bagian.',
							),
							heading(3, "Contoh 1: Cokelat"),
							p(
								"Sebuah cokelat dibagi menjadi 5 bagian yang sama besar. Kamu memakan 2 bagian.",
							),
							math("\\frac{2}{5}"),
							bulletList(
								"Pembilang = 2 (bagian yang dimakan)",
								"Penyebut = 5 (seluruh bagian cokelat)",
							),
							heading(3, "Contoh 2: Dari Gambar"),
							p(
								"Perhatikan gambar berikut. Semua kotak sama besar: [X][X][X][X][ ][ ][ ]",
							),
							bulletList(
								"Seluruh kotak ada 7, sehingga penyebutnya 7",
								"Kotak yang diwarnai ada 4, sehingga pembilangnya 4",
							),
							math("\\frac{4}{7}"),
							heading(3, "Contoh 3: Dari Pecahan ke Makna"),
							p(
								"Pecahan 3/8 artinya benda dibagi menjadi 8 bagian yang sama besar, dan yang diambil ada 3 bagian.",
							),
							heading(3, "Kesalahan yang Sering Terjadi"),
							bulletList(
								"Menukar posisi bilangan. 2/5 artinya 2 bagian dari 5 bagian yang sama besar. Pecahan 5/2 memiliki arti yang berbeda, dan akan kamu pelajari pada materi berikutnya",
								"Menuliskan penyebut dengan banyak bagian yang diwarnai. Ingat, penyebut adalah jumlah seluruh bagian, bukan hanya bagian yang diwarnai",
							),
							p(
								bold("Tahukah kamu? "),
								"Penyebut tidak boleh 0. Tidak ada benda yang dapat dibagi menjadi 0 bagian.",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Pecahan ditulis dalam bentuk a/b",
								"Pembilang (atas) = banyak bagian yang diambil atau diwarnai",
								"Penyebut (bawah) = banyak seluruh bagian yang sama besar",
								"Posisi pembilang dan penyebut tidak boleh tertukar",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Sebuah roti dipotong menjadi 6 bagian sama besar. Adik makan 1 bagian. Tulis pecahannya, lalu sebutkan pembilang dan penyebutnya.",
								"Pada pecahan 7/9, berapakah pembilangnya dan berapakah penyebutnya? Apa arti pecahan itu?",
								"Gambar: [X][X][ ][ ][ ]. Tulis pecahan yang menyatakan bagian yang diwarnai.",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"Pecahannya 1/6. Pembilangnya 1 (bagian yang dimakan) dan penyebutnya 6 (seluruh bagian roti).",
								"Pembilangnya 7 dan penyebutnya 9. Artinya benda dibagi menjadi 9 bagian sama besar dan diambil 7 bagian.",
								"Seluruh kotak ada 5 dan yang diwarnai ada 2, sehingga pecahannya 2/5.",
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan bentuk penulisan pecahan: a/b dengan "a" adalah pembilang (angka atas, bagian yang diambil/diwarnai) ' +
							'dan "b" adalah penyebut (angka bawah, jumlah seluruh bagian sama besar), dipisahkan garis pecahan.\n' +
							"Tujuan belajar: siswa dapat menyebutkan bagian pecahan, menjelaskan arti pembilang dan penyebut, dan menuliskan pecahan dari gambar atau cerita.\n" +
							'Pengingat: pembilang berasal dari kata "membilang" (menghitung bagian yang diambil); penyebut menyebutkan jumlah seluruh bagian yang sama besar.\n' +
							"Contoh: cokelat 5 bagian, dimakan 2 = 2/5 (pembilang 2, penyebut 5). Gambar [X][X][X][X][ ][ ][ ] = 4/7.\n" +
							"Kesalahan umum: (1) menukar pembilang dan penyebut (2/5 berbeda dengan 5/2); (2) mengisi penyebut dengan banyak bagian berwarna saja, bukan seluruh bagian.\n" +
							"Fakta tambahan: penyebut tidak boleh 0.\n" +
							'Cara membimbing: tanyakan "ada berapa bagian seluruhnya?" untuk penyebut dan "berapa yang diambil/diwarnai?" untuk pembilang.',
						questions: [],
					},

					// ───────────────────────── MATERI 3 ─────────────────────────
					{
						title: "Membaca dan Menuliskan Pecahan",
						order: 3,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Cara Membaca dan Menulis Pecahan"),
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"membaca pecahan dengan benar menggunakan Bahasa Indonesia",
								"mengenali nama khusus beberapa pecahan",
								"menuliskan pecahan dalam bentuk angka dari bacaan atau kata-kata",
							),
							heading(3, "Ayo Mulai"),
							p(
								'Saat berbelanja atau memasak, kamu mungkin sering mendengar orang berkata "setengah kilogram gula" atau "seperempat gelas susu". Itu adalah pecahan yang diucapkan dengan kata-kata. Agar kita bisa membicarakan pecahan dengan jelas, kita perlu tahu cara membacanya dengan benar.',
							),
							heading(3, "Cara Membaca Pecahan"),
							p(
								"Kita membaca pembilang terlebih dahulu, lalu kata ",
								bold('"per"'),
								", kemudian penyebut.",
							),
							bulletList(
								'2/5 dibaca "dua per lima"',
								'3/7 dibaca "tiga per tujuh"',
								'5/8 dibaca "lima per delapan"',
								'7/10 dibaca "tujuh per sepuluh"',
							),
							heading(3, "Pecahan dengan Nama Khusus"),
							p(
								"Beberapa pecahan memiliki nama khusus yang sering dipakai sehari-hari:",
							),
							bulletList(
								'1/2 dibaca "setengah"',
								'1/3 dibaca "sepertiga"',
								'1/4 dibaca "seperempat"',
								'3/4 dibaca "tiga perempat"',
							),
							p(
								'Pecahan yang pembilangnya 1 juga sering dibaca dengan awalan "se" yang artinya satu. Misalnya 1/5 dibaca "seperlima", 1/6 dibaca "seperenam", dan 1/10 dibaca "sepersepuluh".',
							),
							heading(3, "Cara Menuliskan Pecahan"),
							orderedList(
								"Dengarkan atau baca bilangan pertama, lalu tulis sebagai pembilang",
								"Gambar garis pecahan di bawah pembilang",
								'Tulis bilangan setelah kata "per" di bawah garis sebagai penyebut',
							),
							heading(3, "Contoh 1"),
							p(
								bold("Contoh: "),
								'"empat per sembilan" ditulis:',
							),
							math("\\frac{4}{9}"),
							heading(3, "Contoh 2"),
							p(
								'"Seperlima" artinya satu per lima. Jadi, ditulis:',
							),
							math("\\frac{1}{5}"),
							heading(3, "Kesalahan yang Sering Terjadi"),
							bulletList(
								'Membaca penyebut lebih dahulu. Pecahan 3/7 harus dibaca "tiga per tujuh", bukan "tujuh per tiga"',
								"Menuliskan pecahan dengan bilangan yang tertukar saat mendengar bacaannya",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Pecahan dibaca: pembilang, per, penyebut",
								"Ada pecahan yang memiliki nama khusus, yaitu setengah, sepertiga, seperempat, dan tiga perempat",
								'Saat menulis pecahan, bilangan sebelum "per" menjadi pembilang dan bilangan sesudah "per" menjadi penyebut',
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Bagaimana cara membaca pecahan 5/9?",
								'Tulis pecahan "tiga per sepuluh" dalam bentuk angka.',
								'Tulis pecahan "tiga perempat" dalam bentuk angka.',
								'Bagaimana cara membaca pecahan 1/8 dengan awalan "se"?',
							),
							heading(3, "Pembahasan"),
							orderedList(
								'5/9 dibaca "lima per sembilan".',
								'"Tiga per sepuluh" ditulis 3/10.',
								'"Tiga perempat" ditulis 3/4.',
								'1/8 dibaca "seperdelapan".',
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan cara membaca dan menuliskan pecahan dalam Bahasa Indonesia.\n" +
							"Tujuan belajar: siswa dapat membaca pecahan, mengenal nama khusus, dan menuliskan pecahan dari bacaan.\n" +
							'Cara baca: [pembilang] per [penyebut], contoh 3/7 = "tiga per tujuh". Nama khusus: 1/2 = setengah, 1/3 = sepertiga, 1/4 = seperempat, 3/4 = tiga perempat.\n' +
							'Pecahan berpembilang 1 sering dibaca dengan awalan "se": 1/5 = seperlima, 1/6 = seperenam, 1/8 = seperdelapan, 1/10 = sepersepuluh.\n' +
							'Cara menulis: bilangan sebelum "per" jadi pembilang, bilangan sesudah "per" jadi penyebut. Contoh: "empat per sembilan" = 4/9.\n' +
							"Kesalahan umum: membaca penyebut lebih dahulu atau menukar pembilang dan penyebut saat menulis.\n" +
							"Cara membimbing: minta siswa menyebutkan mana pembilang dan mana penyebut sebelum membaca atau menulis.",
						questions: [],
					},

					// ───────────────────────── LEMBAR KERJA (isExerciseOnly) ─────────────────────────
					{
						title: "Lembar Kerja: Konsep dan Makna Pecahan",
						order: 4,
						difficulty: 2,
						isExerciseOnly: true,
						content: doc(
							heading(
								2,
								"Lembar Kerja: Konsep dan Makna Pecahan",
							),
							p(
								"Lembar kerja ini membantu kamu mengecek pemahaman tentang seluruh materi pada subtopik ini: pengertian pecahan, bentuk penulisan pecahan, serta cara membaca dan menuliskan pecahan. Kerjakan soal satu per satu dengan tenang. Jika kamu kesulitan, bacalah kembali materi sebelumnya atau bertanya kepada tutor.",
							),
							heading(3, "Yang Perlu Kamu Ingat"),
							bulletList(
								"Pecahan adalah bagian dari keseluruhan yang dibagi menjadi bagian-bagian yang sama besar",
								"Pembilang adalah bilangan di atas garis pecahan. Pembilang menunjukkan banyak bagian yang diambil atau diwarnai",
								"Penyebut adalah bilangan di bawah garis pecahan. Penyebut menunjukkan banyak seluruh bagian yang sama besar",
								'Pecahan dibaca dengan urutan pembilang, kata "per", lalu penyebut. Contohnya, 3/8 dibaca "tiga per delapan"',
							),
							heading(3, "Tips Mengerjakan"),
							bulletList(
								"Baca soal dengan teliti sebelum menjawab",
								"Periksa dulu apakah semua bagian pada gambar sama besar",
								"Hitung seluruh bagian terlebih dahulu, kemudian hitung bagian yang diwarnai",
								"Setelah menjawab, periksa kembali apakah pembilang dan penyebutmu sudah berada di tempat yang benar",
							),
						),
						materialLlmContext:
							'Rangkuman Materi & Konsep Bab "Konsep dan Makna Pecahan" (Kelas 3–4 SD):\n' +
							"1. Konsep Dasar Pecahan: Pecahan menyatakan bagian dari keseluruhan yang dibagi menjadi bagian-bagian yang SAMA BESAR. Syarat mutlak: jika potongan tidak sama besar, maka itu bukan pecahan.\n" +
							'2. Bentuk Penulisan \\frac{a}{b}: Bilangan di atas garis adalah "pembilang" (menunjukkan berapa bagian yang diambil/dimakan/diarsir). Bilangan di bawah garis adalah "penyebut" (menunjukkan jumlah seluruh bagian yang sama besar). Garis di tengah disebut garis pecahan. Nilai \\frac{a}{b} berbeda dengan \\frac{b}{a}.\n' +
							'3. Cara Membaca & Menulis Pecahan: Dibaca "[pembilang] per [penyebut]" (misal 2/5 dibaca "dua per lima"). Nama khusus: 1/2 = "setengah", 1/3 = "sepertiga", 1/4 = "seperempat", 3/4 = "tiga perempat".\n' +
							"4. Konteks Cerita Soal (Kucing Rini: Ketty & Ochan):\n" +
							"   - Pizza Ketty dipotong menjadi 8 bagian sama besar. Ketty memakan 3 potong (pecahannya \\frac{3}{8}).\n" +
							"   - Pizza Ochan dipotong menjadi 6 bagian sama besar. Ochan memakan 3 potong (pecahannya \\frac{3}{6}).\n" +
							"   - Keduanya sama-sama memakan 3 potong, TETAPI bagian pizza yang dimakan TIDAK sama banyak, karena ukuran 1 potong pizza Ochan (1 dari 6) lebih besar daripada 1 potong pizza Ketty (1 dari 8). Jadi \\frac{3}{6} > \\frac{3}{8}.\n" +
							"5. Peran Tutor Socratic: Bimbing siswa mengaitkan jumlah potongan yang dimakan sebagai pembilang dan total potongan keseluruhan sebagai penyebut, serta menyadari pentingnya ukuran potongan yang sama besar.\n" +
							"6. Referensi Visual & Media yang Tersedia di Lembar Kerja:\n" +
							'   - Soal 1 & 2: Gambar SVG "pizza_ketty_ochan.svg" (Pizza Ketty 8 potong vs Pizza Ochan 6 potong di nampan kayu).\n' +
							'   - Soal 3: Infografis SVG "infografis_pecahan_3_8.svg" (Pembilang merah 3, penyebut biru 8, juring pizza 8 bagian).\n' +
							"   - Soal 4: Form input pecahan 5 butir dengan template kosong, badge identifikasi terbalik 5/11, dan template parsial 8/9 serta 1/10.\n" +
							'   - Soal 5: Gambar SVG "pizza_pius_unequal.svg" (Pizza Pius dipotong 2 garis paralel menjadi 3 bagian tidak sama besar; potongan tengah sangat lebar).\n' +
							"   - Soal 6 & 7: Grid interaktif 10x10 (100 kotak) dengan palet pensil merah, biru, hijau, hitam.\n" +
							"   - Soal 8: 10 diagram arsir geometris (persegi panjang, lingkaran 8 juring, persegi panjang diagonal 12 segitiga, bilah horizontal 5 & 6).\n" +
							'   - Soal 9: Gambar SVG "grid_12_pairs_ivon.svg" (Dialog Elsa vs Ivon & grid 3x4 dibagi 6 pasangan warna) + grid interaktif 3x4.\n' +
							"   - Soal 10: Grid interaktif 4x6 (24 kotak) untuk mewarnai 5/8 bagian (15 kotak).\n" +
							"Tutor AI memiliki pengetahuan visual lengkap mengenai apa yang sedang dilihat oleh siswa di layar, sehingga dapat merujuk ke elemen gambar (warna, posisi, bentuk) secara langsung saat berinteraksi.",
						questions: topic1Exercise1Questions,
					},
				],
			},
		],
	};
