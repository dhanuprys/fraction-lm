import { topic2Exercise1Questions } from "./exercises/topic2-exercise1";
import { topic2Exercise2Questions } from "./exercises/topic2-exercise2";
import {
	bold,
	bulletList,
	doc,
	heading,
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
			"Mempelajari cara membandingkan dua pecahan (berpenyebut sama, berpembilang sama, dan berpenyebut berbeda), mengurutkan pecahan, mengenal pecahan sejati dan tidak sejati, serta memahami pecahan senilai (setara) beserta cara membuat dan menyederhanakannya.",
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
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"menjelaskan arti membandingkan pecahan",
								"menggunakan simbol >, <, dan = dengan benar",
								"mengetahui bahwa membandingkan pecahan hanya bermakna jika bendanya sama besar",
							),
							heading(3, "Ayo Mulai"),
							p(
								"Rani dan Doni mendapat cokelat yang sama besar. Rani memakan 1/2 cokelatnya, sedangkan Doni memakan 3/4 cokelatnya. Siapa yang makan lebih banyak? Untuk menjawabnya, kita perlu membandingkan kedua pecahan tersebut.",
							),
							heading(3, "Pengertian"),
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
								"Mulut simbol selalu terbuka ke arah bilangan yang lebih besar. Bayangkan mulut itu sebagai buaya yang lapar, yang selalu ingin memakan bagian yang lebih banyak.",
							),
							heading(3, "Contoh dengan Gambar"),
							p(
								"Dua cokelat yang sama besar masing-masing dibagi menjadi 4 kotak. Tanda [X] adalah bagian yang dimakan.",
							),
							p(
								"Cokelat Rani, 1/2 bagian (sama dengan 2 dari 4 kotak): [X][X][ ][ ]",
							),
							p("Cokelat Doni, 3/4 bagian: [X][X][X][ ]"),
							p(
								"Bagian yang dimakan Doni lebih banyak daripada bagian yang dimakan Rani. Maka:",
							),
							math("\\frac{1}{2} < \\frac{3}{4}"),
							p(
								'Kita membacanya "setengah lebih kecil dari tiga perempat". Kita juga bisa menulisnya terbalik, yaitu 3/4 > 1/2, dibaca "tiga perempat lebih besar dari setengah".',
							),
							heading(
								3,
								"Syarat Penting: Bendanya Harus Sama Besar",
							),
							p(
								"Perbandingan pecahan hanya adil jika kita membandingkan bagian dari benda yang ",
								bold("sama besar"),
								". Setengah dari pizza besar bisa lebih banyak daripada tiga perempat dari pizza kecil. Jadi, selalu periksa dulu apakah benda utuhnya sama besar.",
							),
							heading(3, "Tiga Cara Membandingkan Pecahan"),
							p(
								"Cara membandingkan pecahan bergantung pada penyebut dan pembilangnya. Kita akan mempelajari satu per satu:",
							),
							orderedList(
								"Pecahan dengan penyebut sama",
								"Pecahan dengan pembilang sama",
								"Pecahan dengan penyebut berbeda",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Membandingkan pecahan berarti menentukan mana yang lebih besar, lebih kecil, atau sama",
								"Simbol yang dipakai adalah >, <, dan =",
								"Mulut simbol terbuka ke arah pecahan yang lebih besar",
								"Benda utuh yang dibandingkan harus sama besar",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Dua cokelat sama besar dibagi menjadi 4 kotak. Cokelat A dimakan 1 kotak [X][ ][ ][ ], cokelat B dimakan 3 kotak [X][X][X][ ]. Tulis perbandingannya dengan simbol.",
								"Tulis simbol yang tepat: 2/4 ... 2/4",
								"Bacalah kalimat matematika 3/4 > 1/2 dengan kata-kata.",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"Bagian cokelat B lebih banyak, sehingga 1/4 < 3/4.",
								"Kedua pecahan sama persis, sehingga 2/4 = 2/4.",
								'Dibaca "tiga perempat lebih besar dari setengah".',
							),
						),
						materialLlmContext:
							"Materi ini memperkenalkan pengertian membandingkan pecahan untuk siswa SD: menentukan pecahan yang lebih besar, lebih kecil, atau sama.\n" +
							"Tujuan belajar: siswa dapat menjelaskan arti membandingkan, memakai simbol >, <, = dengan benar, dan memahami bahwa benda utuhnya harus sama besar.\n" +
							"Simbol: > (lebih besar dari), < (lebih kecil dari), = (sama dengan). Mulut simbol terbuka ke arah bilangan yang lebih besar (analogi buaya lapar).\n" +
							"Contoh visual: 1/2 < 3/4 (cokelat sama besar dibagi 4 kotak; 1/2 = 2 kotak, 3/4 = 3 kotak).\n" +
							"Syarat penting: pecahan hanya dapat dibandingkan jika benda utuhnya sama besar.\n" +
							"Tiga cara membandingkan: penyebut sama, pembilang sama, penyebut berbeda.\n" +
							"Cara membimbing: minta siswa membayangkan dua benda yang sama besar, lalu bertanya bagian mana yang lebih banyak, sebelum memilih simbol.",
						questions: [],
					},
					{
						title: "Membandingkan Pecahan dengan Penyebut Sama",
						order: 2,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(
								2,
								"Membandingkan Pecahan Berpenyebut Sama",
							),
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"membandingkan dua pecahan yang penyebutnya sama",
								"menjelaskan alasan membandingkan hanya dengan melihat pembilang",
							),
							heading(3, "Ayo Mulai"),
							p(
								"Dua kue yang sama besar masing-masing dipotong menjadi 5 bagian sama besar. Dina mengambil 3 potong dan Eko mengambil 2 potong. Karena potongannya sama besar, siapa yang mengambil lebih banyak potongan, dia mendapat bagian yang lebih besar. Gagasan sederhana ini adalah kunci materi kita hari ini.",
							),
							heading(3, "Aturan"),
							p(
								"Jika dua pecahan memiliki ",
								bold("penyebut yang sama"),
								", bandingkan saja ",
								bold("pembilangnya"),
								". Pembilang lebih besar berarti pecahan lebih besar.",
							),
							heading(3, "Mengapa Aturan Ini Benar?"),
							p(
								"Penyebut yang sama berarti benda dibagi menjadi bagian-bagian yang ukurannya sama. Jadi, kita hanya perlu menghitung siapa yang mengambil lebih banyak potongan. Ibaratnya membandingkan 3 apel dengan 2 apel, tentu 3 apel lebih banyak.",
							),
							heading(3, "Contoh 1"),
							p("3/5 : [X][X][X][ ][ ]"),
							p("2/5 : [X][X][ ][ ][ ]"),
							math("\\frac{3}{5} > \\frac{2}{5}"),
							p("Karena penyebutnya sama (5) dan 3 > 2."),
							heading(3, "Contoh 2"),
							p("Bandingkan 7/10 dan 9/10."),
							bulletList(
								"Penyebutnya sama, yaitu 10",
								"Bandingkan pembilang: 7 lebih kecil dari 9",
							),
							math("\\frac{7}{10} < \\frac{9}{10}"),
							heading(3, "Contoh 3"),
							p(
								"Bandingkan 4/9 dan 4/9. Penyebut sama dan pembilang juga sama, sehingga:",
							),
							math("\\frac{4}{9} = \\frac{4}{9}"),
							heading(3, "Kesalahan yang Sering Terjadi"),
							bulletList(
								"Membandingkan penyebutnya padahal penyebutnya sudah sama. Jika penyebut sama, yang menentukan adalah pembilang",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Penyebut sama: bandingkan pembilangnya",
								"Pembilang lebih besar berarti pecahan lebih besar",
								"Pembilang sama berarti pecahannya sama",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Bandingkan 4/7 dan 6/7 dengan simbol.",
								"Bandingkan 9/12 dan 5/12 dengan simbol.",
								"Andi makan 3/8 pizza dan Bimo makan 5/8 pizza. Kedua pizza sama besar. Siapa yang makan lebih banyak?",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"4 < 6, sehingga 4/7 < 6/7.",
								"9 > 5, sehingga 9/12 > 5/12.",
								"Penyebutnya sama (8) dan 5 > 3, sehingga 5/8 > 3/8. Bimo makan lebih banyak.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan membandingkan pecahan berpenyebut sama.\n" +
							"Tujuan belajar: siswa dapat membandingkan pecahan berpenyebut sama dan menjelaskan alasannya.\n" +
							"Aturan: jika penyebut sama, bandingkan pembilang; pembilang lebih besar = pecahan lebih besar. Alasan: potongan sama besar, jadi yang mengambil lebih banyak potongan mendapat bagian lebih besar.\n" +
							"Contoh: 3/5 > 2/5 karena 3 > 2; 7/10 < 9/10; 4/9 = 4/9.\n" +
							"Kesalahan umum: membandingkan penyebut padahal penyebut sudah sama.\n" +
							'Cara membimbing: tanyakan "apakah potongannya sama besar?" lalu "siapa yang mengambil lebih banyak potongan?" sebelum meminta simbol.',
						questions: [],
					},
					{
						title: "Membandingkan Pecahan dengan Pembilang Sama",
						order: 3,
						difficulty: 2,
						isExerciseOnly: false,
						content: doc(
							heading(
								2,
								"Membandingkan Pecahan Berpembilang Sama",
							),
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"membandingkan dua pecahan yang pembilangnya sama",
								"menjelaskan mengapa penyebut yang lebih besar membuat pecahan lebih kecil",
							),
							heading(3, "Ayo Mulai"),
							p(
								"Ketty dan Ochan sama-sama makan 3 potong pizza. Pizza Ketty dipotong menjadi 8 bagian, sedangkan pizza Ochan dipotong menjadi 6 bagian. Walaupun jumlah potong yang dimakan sama, apakah bagian pizza yang mereka makan sama banyak? Mari kita cari tahu.",
							),
							heading(3, "Aturan"),
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
								"Semakin banyak potongan yang dibuat, semakin kecil tiap potongannya. Bayangkan satu kue dibagi untuk 3 orang dan satu kue lain dibagi untuk 6 orang. Bagian setiap orang pada kue yang dibagi untuk 6 orang tentu lebih kecil. Perhatikan dua kue yang sama besar:",
							),
							p("1/3 : [X][ ][ ] (potongan besar)"),
							p("1/6 : [X][ ][ ][ ][ ][ ] (potongan kecil)"),
							math("\\frac{1}{3} > \\frac{1}{6}"),
							heading(3, "Contoh 1"),
							math("\\frac{3}{4} > \\frac{3}{8}"),
							p(
								"Pembilangnya sama (3). Penyebut 4 lebih kecil dari 8, jadi 3/4 lebih besar.",
							),
							heading(
								3,
								"Contoh 2: Kembali ke Pizza Ketty dan Ochan",
							),
							p(
								"Ketty makan 3/8 pizza dan Ochan makan 3/6 pizza. Pembilangnya sama (3). Penyebut 6 lebih kecil dari 8, sehingga potongan pizza Ochan lebih besar.",
							),
							math("\\frac{3}{6} > \\frac{3}{8}"),
							p(
								"Jadi, Ochan makan pizza lebih banyak daripada Ketty.",
							),
							heading(3, "Kesalahan yang Sering Terjadi"),
							bulletList(
								"Mengira penyebut yang lebih besar membuat pecahan lebih besar. Padahal 8 > 4 tetapi 3/8 justru lebih kecil daripada 3/4",
								"Hanya melihat banyak potongan (pembilang) tanpa memperhatikan ukuran potongan (penyebut)",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Pembilang sama: bandingkan penyebutnya",
								"Penyebut lebih besar berarti potongan lebih kecil, sehingga pecahan lebih kecil",
								"Penyebut lebih kecil berarti potongan lebih besar, sehingga pecahan lebih besar",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Bandingkan 2/5 dan 2/9 dengan simbol.",
								"Bandingkan 5/6 dan 5/8 dengan simbol.",
								"Bandingkan 1/10 dan 1/4 dengan simbol, lalu jelaskan alasanmu.",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"Pembilang sama. Penyebut 5 lebih kecil dari 9, sehingga 2/5 > 2/9.",
								"Pembilang sama. Penyebut 6 lebih kecil dari 8, sehingga 5/6 > 5/8.",
								"Pembilang sama. Penyebut 10 lebih besar dari 4, sehingga 1/10 < 1/4. Satu potong dari kue yang dibagi 10 lebih kecil daripada satu potong dari kue yang dibagi 4.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan membandingkan pecahan berpembilang sama.\n" +
							"Tujuan belajar: siswa dapat membandingkan pecahan berpembilang sama dan menjelaskan mengapa penyebut lebih besar membuat pecahan lebih kecil.\n" +
							"Aturan: jika pembilang sama, bandingkan penyebut; penyebut lebih besar -> pecahan lebih kecil (potongan makin banyak, makin kecil).\n" +
							"Contoh: 1/3 > 1/6; 3/4 > 3/8; 3/6 > 3/8 (pizza Ochan lebih besar daripada pizza Ketty, sesuai konteks Lembar Kerja Topik 1).\n" +
							"Analogi: satu kue dibagi untuk lebih banyak orang, bagian tiap orang makin kecil.\n" +
							"Kesalahan umum: mengira penyebut lebih besar berarti pecahan lebih besar.\n" +
							"Cara membimbing: minta siswa membayangkan ukuran satu potongan, bukan membandingkan angka penyebut saja. Jangan langsung memberi simbol.",
						questions: [],
					},
					{
						title: "Membandingkan Pecahan dengan Penyebut Berbeda",
						order: 4,
						difficulty: 2,
						isExerciseOnly: false,
						content: doc(
							heading(
								2,
								"Membandingkan Pecahan Berpenyebut Berbeda",
							),
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"mencari KPK dari dua bilangan",
								"mengubah pecahan menjadi pecahan dengan penyebut yang sama",
								"membandingkan dua pecahan yang pembilang dan penyebutnya sama-sama berbeda",
							),
							heading(3, "Ayo Mulai"),
							p(
								"Bagaimana cara membandingkan 1/3 dan 2/5? Pembilangnya berbeda dan penyebutnya juga berbeda, sehingga kita belum bisa langsung menentukan mana yang lebih besar. Solusinya adalah membuat kedua pecahan memiliki penyebut yang sama terlebih dahulu.",
							),
							heading(3, "Mengenal KPK"),
							p(
								"KPK (Kelipatan Persekutuan Terkecil) dari dua bilangan adalah bilangan terkecil yang merupakan kelipatan kedua bilangan itu. Contoh mencari KPK dari 3 dan 5:",
							),
							bulletList(
								"Kelipatan 3: 3, 6, 9, 12, 15, 18, ...",
								"Kelipatan 5: 5, 10, 15, 20, ...",
								"Kelipatan yang sama dan terkecil adalah 15, jadi KPK dari 3 dan 5 adalah 15",
							),
							heading(
								3,
								"Mengubah Pecahan Menjadi Penyebut yang Sama",
							),
							p(
								"Kalikan pembilang dan penyebut dengan bilangan yang sama. Nilai pecahan tidak berubah, sebab kita hanya memotong setiap bagian menjadi bagian-bagian yang lebih kecil. Pecahan yang nilainya sama ini disebut pecahan setara, yang akan kita pelajari lebih lanjut pada subtopik berikutnya.",
							),
							heading(3, "Langkah-langkah"),
							orderedList(
								"Cari KPK dari kedua penyebut",
								"Ubah kedua pecahan agar penyebutnya sama dengan KPK, dengan mengalikan pembilang dan penyebut dengan bilangan yang sama",
								"Bandingkan pembilangnya",
							),
							heading(3, "Contoh 1"),
							p("Bandingkan 1/3 dan 2/5:"),
							bulletList(
								"KPK dari 3 dan 5 adalah 15",
								"1/3 = 5/15 (atas dan bawah dikali 5)",
								"2/5 = 6/15 (atas dan bawah dikali 3)",
								"5/15 < 6/15, jadi 1/3 < 2/5",
							),
							math("\\frac{1}{3} < \\frac{2}{5}"),
							heading(3, "Contoh 2"),
							p("Bandingkan 3/4 dan 5/6:"),
							bulletList(
								"KPK dari 4 dan 6 adalah 12",
								"3/4 = 9/12 (atas dan bawah dikali 3)",
								"5/6 = 10/12 (atas dan bawah dikali 2)",
								"9/12 < 10/12, jadi 3/4 < 5/6",
							),
							heading(3, "Contoh 3"),
							p("Bandingkan 7/8 dan 3/4:"),
							bulletList(
								"KPK dari 8 dan 4 adalah 8",
								"7/8 tidak perlu diubah",
								"3/4 = 6/8 (atas dan bawah dikali 2)",
								"7/8 > 6/8, jadi 7/8 > 3/4",
							),
							heading(
								3,
								"Cara Cepat: Bandingkan dengan Setengah",
							),
							p(
								"Kadang kita dapat menebak dengan membandingkan pecahan dengan 1/2. Misalnya 3/8 lebih kecil dari 1/2 (sebab 1/2 = 4/8), sedangkan 4/5 lebih besar dari 1/2. Jadi, 3/8 < 4/5. Cara ini berguna untuk memeriksa jawabanmu.",
							),
							p(
								bold("Hati-hati: "),
								"Jangan langsung membandingkan pembilangnya sebelum penyebutnya sama! Pecahan 1/3 dan 2/5 tidak bisa dibandingkan hanya dengan melihat angka 1 dan 2.",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Penyebut berbeda: samakan penyebut dengan KPK",
								"Kalikan pembilang dan penyebut dengan bilangan yang sama",
								"Setelah penyebut sama, bandingkan pembilangnya",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Bandingkan 1/2 dan 3/5 dengan simbol.",
								"Bandingkan 2/3 dan 3/4 dengan simbol.",
								"Bandingkan 5/6 dan 7/9 dengan simbol.",
								"Bandingkan 3/4 dan 5/8 dengan simbol.",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"KPK 2 dan 5 adalah 10. 1/2 = 5/10 dan 3/5 = 6/10. Karena 5 < 6, maka 1/2 < 3/5.",
								"KPK 3 dan 4 adalah 12. 2/3 = 8/12 dan 3/4 = 9/12. Karena 8 < 9, maka 2/3 < 3/4.",
								"KPK 6 dan 9 adalah 18. 5/6 = 15/18 dan 7/9 = 14/18. Karena 15 > 14, maka 5/6 > 7/9.",
								"KPK 4 dan 8 adalah 8. 3/4 = 6/8, sedangkan 5/8 tetap. Karena 6 > 5, maka 3/4 > 5/8.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan membandingkan pecahan berpenyebut berbeda.\n" +
							"Tujuan belajar: siswa dapat mencari KPK, mengubah pecahan ke penyebut yang sama, dan membandingkan pembilang.\n" +
							"Langkah: (1) cari KPK penyebut, (2) ubah pecahan ke penyebut KPK dengan mengalikan pembilang dan penyebut dengan bilangan yang sama (pecahan setara/senilai), (3) bandingkan pembilang.\n" +
							"Contoh: 1/3 vs 2/5 -> KPK=15 -> 5/15 vs 6/15 -> 1/3 < 2/5. 3/4 vs 5/6 -> KPK=12 -> 9/12 < 10/12. 7/8 vs 3/4 -> KPK=8 -> 7/8 > 6/8.\n" +
							"Cara cepat: bandingkan dengan 1/2 untuk memeriksa kewajaran jawaban (contoh 3/8 < 1/2 < 4/5).\n" +
							"Kesalahan umum: membandingkan pembilang sebelum penyebut disamakan; menjumlahkan alih-alih mengalikan saat mengubah pecahan.\n" +
							"Cara membimbing: jika siswa kesulitan mencari KPK, ajak menuliskan kelipatan kedua bilangan secara bertahap.",
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
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"menjelaskan arti mengurutkan pecahan",
								"membedakan urutan naik dan urutan turun",
								"menuliskan urutan pecahan menggunakan simbol < dan >",
							),
							heading(3, "Ayo Mulai"),
							p(
								"Ketika berbaris di sekolah, kamu mungkin diminta berbaris dari yang paling pendek sampai yang paling tinggi. Itu juga contoh mengurutkan. Pecahan pun dapat diurutkan berdasarkan nilainya, yaitu dari yang paling kecil sampai yang paling besar, atau sebaliknya.",
							),
							heading(3, "Pengertian"),
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
								"Perhatikan bahwa pada urutan dari terkecil ke terbesar, kita memakai simbol <. Pada urutan dari terbesar ke terkecil, kita memakai simbol >.",
							),
							heading(3, "Kata Kunci pada Soal"),
							bulletList(
								'"Dari terkecil ke terbesar" atau "dari yang paling sedikit" berarti urutan naik',
								'"Dari terbesar ke terkecil" atau "dari yang paling banyak" berarti urutan turun',
							),
							p(
								bold("Ingat: "),
								"Membandingkan pecahan adalah dasar untuk mengurutkan pecahan. Jika kamu sudah bisa membandingkan dua pecahan, kamu pasti bisa mengurutkan banyak pecahan.",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Mengurutkan pecahan berarti menyusun pecahan berdasarkan nilainya",
								"Urutan naik: terkecil ke terbesar",
								"Urutan turun: terbesar ke terkecil",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Urutkan dari terkecil ke terbesar: 3/6, 1/6, 5/6.",
								"Urutkan dari terbesar ke terkecil: 2/9, 8/9, 4/9.",
								"Apakah 2/7 < 5/7 < 4/7 benar? Jelaskan.",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"1/6, 3/6, 5/6.",
								"8/9, 4/9, 2/9.",
								"Tidak benar, karena 5/7 lebih besar daripada 4/7. Urutan yang benar adalah 2/7 < 4/7 < 5/7.",
							),
						),
						materialLlmContext:
							"Materi ini memperkenalkan pengertian mengurutkan pecahan: menyusun tiga pecahan atau lebih berdasarkan nilainya.\n" +
							"Tujuan belajar: siswa dapat menjelaskan arti mengurutkan, membedakan urutan naik dan turun, dan menulis urutan dengan simbol.\n" +
							"Urutan naik: dari terkecil ke terbesar (simbol <). Urutan turun: dari terbesar ke terkecil (simbol >). Contoh: 1/4 < 2/4 < 3/4.\n" +
							'Kata kunci soal: "paling sedikit" = kecil, "paling banyak" = besar.\n' +
							"Cara membimbing: ingatkan bahwa mengurutkan adalah membandingkan berulang kali.",
						questions: [],
					},
					{
						title: "Mengurutkan Pecahan dengan Penyebut Sama",
						order: 2,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Mengurutkan Pecahan Berpenyebut Sama"),
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"mengurutkan beberapa pecahan yang penyebutnya sama",
								"menuliskan kembali hasil urutan dengan benar",
							),
							heading(3, "Ayo Mulai"),
							p(
								"Tiga anak minum dari botol minum yang sama besar dan dibagi menjadi 8 bagian. Ani minum 5/8, Budi minum 2/8, dan Citra minum 7/8. Karena semua penyebutnya 8, kita cukup memperhatikan pembilangnya untuk mengetahui siapa yang minum paling sedikit.",
							),
							heading(3, "Aturan"),
							p(
								"Jika penyebutnya sama, cukup urutkan ",
								bold("pembilangnya"),
								". Penyebutnya tetap.",
							),
							heading(3, "Contoh 1: Urutan Naik"),
							p(
								"Urutkan dari terkecil ke terbesar: 5/8, 2/8, 7/8",
							),
							orderedList(
								"Penyebut sama (8), lihat pembilangnya: 5, 2, 7",
								"Urutan pembilang dari kecil ke besar: 2, 5, 7",
								"Tulis kembali dengan penyebut 8",
							),
							p("Jadi:"),
							math("\\frac{2}{8} < \\frac{5}{8} < \\frac{7}{8}"),
							heading(3, "Contoh 2: Urutan Turun"),
							p(
								"Urutkan dari terbesar ke terkecil: 3/10, 9/10, 1/10, 6/10",
							),
							bulletList(
								"Pembilangnya: 3, 9, 1, 6",
								"Urutan pembilang dari besar ke kecil: 9, 6, 3, 1",
							),
							math(
								"\\frac{9}{10} > \\frac{6}{10} > \\frac{3}{10} > \\frac{1}{10}",
							),
							heading(3, "Kesalahan yang Sering Terjadi"),
							bulletList(
								"Lupa menuliskan penyebut pada hasil akhir. Jawaban yang benar adalah 2/8, 5/8, 7/8, bukan 2, 5, 7",
								"Salah arah urutan, misalnya soal meminta dari terbesar ke terkecil tetapi dijawab dari terkecil ke terbesar",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Penyebut sama: urutkan pembilangnya",
								"Tuliskan kembali pecahan lengkap dengan penyebutnya",
								"Perhatikan arah urutan yang diminta soal",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Urutkan dari terkecil ke terbesar: 4/9, 1/9, 7/9, 3/9.",
								"Urutkan dari terbesar ke terkecil: 6/11, 10/11, 2/11.",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"Pembilang dari kecil ke besar: 1, 3, 4, 7. Jadi: 1/9, 3/9, 4/9, 7/9.",
								"Pembilang dari besar ke kecil: 10, 6, 2. Jadi: 10/11, 6/11, 2/11.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan mengurutkan pecahan berpenyebut sama.\n" +
							"Tujuan belajar: siswa dapat mengurutkan pecahan berpenyebut sama dan menulis hasil dengan benar.\n" +
							"Cukup urutkan pembilang, penyebut tetap. Contoh: 5/8, 2/8, 7/8 dari terkecil -> 2/8, 5/8, 7/8. Urutan turun: 9/10, 6/10, 3/10, 1/10.\n" +
							"Kesalahan umum: lupa menulis penyebut pada hasil; salah arah urutan.\n" +
							"Cara membimbing: minta siswa membaca ulang kalimat soal untuk memastikan arah urutan.",
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
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"mencari KPK dari tiga penyebut atau lebih",
								"mengurutkan pecahan yang penyebutnya berbeda",
								"menuliskan hasil urutan dalam bentuk pecahan semula",
							),
							heading(3, "Ayo Mulai"),
							p(
								"Bagaimana cara mengurutkan 1/2, 1/3, dan 1/4? Penyebutnya berbeda-beda, sehingga kita perlu menyamakan penyebutnya terlebih dahulu, seperti saat membandingkan dua pecahan.",
							),
							heading(3, "Aturan"),
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
							heading(3, "Contoh 1"),
							p(
								"Urutkan 1/2, 1/3, 1/4 dari terkecil ke terbesar:",
							),
							bulletList(
								"KPK dari 2, 3, dan 4 adalah 12",
								"1/2 = 6/12, 1/3 = 4/12, 1/4 = 3/12",
								"Urutan pembilang: 3, 4, 6",
								"Jadi: 1/4, 1/3, 1/2",
							),
							math("\\frac{1}{4} < \\frac{1}{3} < \\frac{1}{2}"),
							heading(3, "Contoh 2"),
							p(
								"Urutkan 2/3, 5/6, 1/2 dari terbesar ke terkecil:",
							),
							bulletList(
								"KPK dari 3, 6, dan 2 adalah 6",
								"2/3 = 4/6, 5/6 tetap, 1/2 = 3/6",
								"Urutan pembilang dari besar ke kecil: 5, 4, 3",
								"Jadi: 5/6, 2/3, 1/2",
							),
							heading(3, "Contoh 3"),
							p(
								"Urutkan 3/4, 2/5, 7/10 dari terkecil ke terbesar:",
							),
							bulletList(
								"KPK dari 4, 5, dan 10 adalah 20",
								"3/4 = 15/20, 2/5 = 8/20, 7/10 = 14/20",
								"Urutan pembilang dari kecil ke besar: 8, 14, 15",
								"Jadi: 2/5, 7/10, 3/4",
							),
							p(
								bold("Jalan pintas: "),
								"Jika pembilangnya sama, pecahan dengan penyebut lebih besar nilainya lebih kecil. Contohnya 1/5 < 1/3 < 1/2.",
							),
							heading(3, "Kesalahan yang Sering Terjadi"),
							bulletList(
								"Menuliskan jawaban akhir dalam bentuk pecahan yang sudah diubah (misalnya 3/12, 4/12, 6/12), padahal soal meminta pecahan semula (1/4, 1/3, 1/2)",
								"Salah mencari KPK sehingga penyebutnya tidak habis dibagi semua penyebut",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Cari KPK semua penyebut",
								"Ubah semua pecahan ke penyebut KPK",
								"Urutkan pembilangnya",
								"Tulis kembali pecahan semula",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Urutkan dari terkecil ke terbesar: 1/2, 1/5, 1/3.",
								"Urutkan dari terbesar ke terkecil: 3/4, 5/8, 1/2.",
								"Urutkan dari terkecil ke terbesar: 5/6, 2/3, 3/4.",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"Pembilang sama, penyebut makin besar nilainya makin kecil. Jadi: 1/5, 1/3, 1/2.",
								"KPK 4, 8, dan 2 adalah 8. 3/4 = 6/8, 5/8, 1/2 = 4/8. Jadi dari terbesar: 3/4, 5/8, 1/2.",
								"KPK 6, 3, dan 4 adalah 12. 5/6 = 10/12, 2/3 = 8/12, 3/4 = 9/12. Jadi dari terkecil: 2/3, 3/4, 5/6.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan mengurutkan pecahan berpenyebut berbeda.\n" +
							"Tujuan belajar: siswa dapat mencari KPK tiga penyebut, mengubah pecahan ke penyebut sama, mengurutkan pembilang, dan menulis kembali pecahan semula.\n" +
							"Langkah: cari KPK semua penyebut, ubah semua pecahan ke penyebut tersebut, urutkan pembilang, tulis kembali pecahan semula.\n" +
							"Contoh: 1/2, 1/3, 1/4 -> KPK=12 -> 6/12, 4/12, 3/12 -> urutan naik: 1/4, 1/3, 1/2. Contoh lain: 2/3, 5/6, 1/2 turun -> 5/6, 2/3, 1/2. 3/4, 2/5, 7/10 naik -> 2/5, 7/10, 3/4.\n" +
							"Jalan pintas: pembilang sama, penyebut lebih besar -> nilai lebih kecil.\n" +
							"Kesalahan umum: menulis jawaban dalam bentuk pecahan yang sudah diubah; salah mencari KPK.\n" +
							"Cara membimbing: bila siswa kesulitan mencari KPK tiga bilangan, ajak mencoba kelipatan bilangan terbesar.",
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
								"Lembar kerja ini membantu kamu mengecek pemahaman tentang pecahan senilai, simbol perbandingan (>, <, =), serta cara membandingkan dan mengurutkan pecahan. Kerjakan dengan teliti dan bayangkan selalu ukuran potongan benda yang sedang dibandingkan.",
							),
							heading(3, "Yang Perlu Kamu Ingat"),
							bulletList(
								'Simbol > artinya "lebih besar dari", simbol < artinya "lebih kecil dari", dan simbol = artinya "sama dengan"',
								"Penyebut sama: bandingkan pembilangnya",
								"Pembilang sama: bandingkan penyebutnya. Penyebut lebih besar berarti potongan lebih kecil",
								"Penyebut berbeda: samakan penyebut dengan KPK, lalu bandingkan pembilangnya",
								"Pecahan senilai memiliki nilai yang sama walaupun pembilang dan penyebutnya berbeda",
							),
							heading(3, "Tips Mengerjakan"),
							bulletList(
								"Periksa dulu apakah benda yang dibandingkan sama besar",
								"Jangan hanya melihat banyak potongan, perhatikan juga ukuran potongannya",
								"Gunakan gambar untuk membantu kamu membayangkan jawaban",
							),
						),
						materialLlmContext:
							'Rangkuman Materi & Konsep Bab "Pecahan Senilai dan Membandingkan Pecahan" (Kelas 3–4 SD):\n' +
							"1. Konteks Visual & Model Riil:\n" +
							"   - Pizza Kardus (two_pizzas_boxes.svg, Aktivitas 2.1): Dua pizza utuh di dalam kotak kardus terbuka, masing-masing dipotong 8 bagian sama besar. Ayah makan 5 potong (5/8), Ibu makan 3 potong (3/8). Tari makan 4 potong (4/8), Dude makan 1 potong (1/8), Reza makan 3 potong (3/8). Urutan porsi anak dari terbesar: Tari (4/8) > Reza (3/8) > Dude (1/8).\n" +
							"   - Grid Warna 12 Sel (grid_12_colors_pairs.svg, Aktivitas 2.4): Persegi panjang 3x4 = 12 kotak sama besar dengan 6 pasang warna (oranye, biru, abu-abu, cyan, hijau, kuning). Tiap pasang warna terdiri dari 2 kotak, membuktikan pecahan senilai 1/6 = 2/12.\n" +
							"   - Dua Pizza Polos (two_pizzas_plain.svg, Aktivitas 2.5 & 2.9): Dua pizza utuh tanpa garis potongan. Digunakan untuk membuktikan bahwa mengetahui jumlah potongan yang dimakan saja tidak cukup (argumen Elsa keliru), melainkan harus tahu total potongan pizza dipotong sama besar (argumen Irfan benar). Juga digunakan untuk membandingkan pizza dipotong 8 vs dipotong 4 (1/8 < 1/4 dan 2/8 < 2/4).\n" +
							"   - Lingkaran Tiga Sektor (circle_three_sectors.svg, Soal 2.8): Lingkaran dengan sektor abu-abu (1/4), biru (1/4), dan oranye (1/2). Sektor abu-abu 1/4 dapat dibagi 2 menjadi dua sektor 1/8, sehingga 2/8 = 1/4 dan 2/4 = 1/2. Pizza dipotong 3 ambil 1 potong (1/3) senilai dengan pizza dipotong 6 ambil 2 potong (2/6), yaitu 1/3 = 2/6.\n" +
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
						questions: topic2Exercise1Questions,
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
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"menjelaskan pengertian pecahan sejati",
								"menjelaskan pengertian pecahan tidak sejati",
								"menyebutkan contoh kedua jenis pecahan tersebut",
							),
							heading(3, "Ayo Mulai"),
							p(
								"Sebelum mempelajari lebih jauh tentang pecahan, kita perlu mengetahui bahwa pecahan memiliki beberapa jenis. Dua di antaranya adalah ",
								bold("pecahan sejati"),
								" dan ",
								bold("pecahan tidak sejati"),
								'. Kata "sejati" berarti sebenarnya. Pecahan sejati adalah pecahan yang benar-benar hanya sebagian dari satu benda utuh.',
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
								"Jika pizza dibagi menjadi 4 bagian sama besar dan kamu mengambil 5 bagian dengan ukuran yang sama, jumlahnya lebih dari satu pizza utuh. Kamu menghabiskan satu pizza dan masih mengambil 1 potong dari pizza yang lain.",
							),
							math("\\frac{5}{4} > 1"),
							p(
								"Jika pembilang dan penyebut sama, seperti 4/4, pecahan tersebut nilainya tepat 1. Artinya semua bagian diambil, sehingga kamu mendapat satu benda utuh.",
							),
							math("\\frac{4}{4} = 1"),
							heading(3, "Ingat Perbedaannya!"),
							bulletList(
								"Pecahan sejati: pembilang < penyebut. Nilainya kurang dari 1",
								"Pecahan tidak sejati: pembilang ≥ penyebut. Nilainya sama dengan atau lebih dari 1",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Pecahan sejati: pembilangnya lebih kecil dari penyebut",
								"Pecahan tidak sejati: pembilangnya lebih besar atau sama dengan penyebut",
								"Jika pembilang sama dengan penyebut, nilai pecahannya tepat 1",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Sebutkan dua contoh pecahan sejati dengan penyebut 9.",
								"Pecahan 8/8 termasuk jenis apa? Berapa nilainya?",
								"Sebuah pizza dibagi 6 bagian sama besar. Dina mengambil 7 potong dari pizza yang sama ukuran potongannya. Apakah Dina mengambil kurang dari satu pizza atau lebih dari satu pizza?",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"Contohnya 2/9 dan 5/9 (pembilangnya harus kurang dari 9).",
								"8/8 adalah pecahan tidak sejati karena pembilang sama dengan penyebut. Nilainya 1.",
								"Pecahannya 7/6. Karena 7 > 6, Dina mengambil lebih dari satu pizza.",
							),
						),
						materialLlmContext:
							"Materi ini memperkenalkan pecahan sejati dan tidak sejati untuk siswa SD.\n" +
							"Tujuan belajar: siswa dapat menjelaskan pengertian kedua jenis pecahan dan memberi contoh.\n" +
							"Pecahan sejati memiliki pembilang lebih kecil daripada penyebut dan nilainya kurang dari 1. Contoh: 1/2, 2/5, dan 3/4.\n" +
							"Pecahan tidak sejati memiliki pembilang lebih besar atau sama dengan penyebut dan nilainya minimal 1. Contoh: 5/4, 7/3, dan 4/4.\n" +
							"Jika pembilang sama dengan penyebut, nilainya adalah 1.\n" +
							'Kata "sejati" berarti sebenarnya.\n' +
							"Cara membimbing: gunakan pizza sebagai model. Tanyakan apakah semua bagian sudah terambil atau masih ada sisa.",
						questions: [],
					},
					{
						title: "Membedakan Pecahan Sejati dan Tidak Sejati",
						order: 2,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Bagaimana Cara Membedakannya?"),
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"menentukan jenis pecahan dengan membandingkan pembilang dan penyebut",
								"mengenal bentuk bilangan campuran dari pecahan tidak sejati",
							),
							heading(3, "Ayo Mulai"),
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
								"Jangan hanya melihat besar angka pembilang. Pecahan 9/20 memiliki pembilang 9, tetapi tetap pecahan sejati karena 9 < 20. Selalu bandingkan pembilang dengan penyebut.",
							),
							heading(
								3,
								"Pecahan Tidak Sejati dan Bilangan Campuran",
							),
							p(
								"Pecahan tidak sejati yang nilainya lebih dari 1 dapat ditulis sebagai satu bilangan bulat dan satu pecahan sejati. Bentuk ini disebut ",
								bold("bilangan campuran"),
								". Contohnya, 5/4 berarti 4/4 (satu utuh) ditambah 1/4.",
							),
							math(
								"\\frac{5}{4} = \\frac{4}{4} + \\frac{1}{4} = 1\\frac{1}{4}",
							),
							p(
								'Bilangan campuran 1 1/4 dibaca "satu seperempat". Kamu akan memakai bentuk ini lagi saat mempelajari penjumlahan dan pengurangan pecahan.',
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Bandingkan pembilang dengan penyebut untuk menentukan jenis pecahan",
								"Pembilang < penyebut: pecahan sejati",
								"Pembilang ≥ penyebut: pecahan tidak sejati",
								"Pecahan tidak sejati yang lebih dari 1 dapat ditulis sebagai bilangan campuran",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Tentukan jenis pecahan berikut: 5/12, 12/5, 7/7, 15/16.",
								"Tulis 7/4 sebagai bilangan campuran.",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"5/12 sejati (5 < 12), 12/5 tidak sejati (12 > 5), 7/7 tidak sejati (7 = 7, nilainya 1), 15/16 sejati (15 < 16).",
								"7/4 = 4/4 + 3/4 = 1 3/4.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan cara mengidentifikasi jenis pecahan dengan membandingkan pembilang dan penyebut.\n" +
							"Tujuan belajar: siswa dapat menentukan jenis pecahan dan mengenal bilangan campuran.\n" +
							"Jika pembilang lebih kecil daripada penyebut, pecahan sejati. Jika pembilang lebih besar atau sama dengan penyebut, pecahan tidak sejati. Contoh: 2/7 sejati; 6/6 dan 9/5 tidak sejati.\n" +
							"Bilangan campuran: pecahan tidak sejati lebih dari 1 dapat ditulis sebagai bilangan bulat dan pecahan sejati. Contoh: 5/4 = 4/4 + 1/4 = 1 1/4; 7/4 = 1 3/4.\n" +
							"Kesalahan umum: menilai jenis pecahan hanya dari besar pembilang, misalnya mengira 9/20 tidak sejati karena pembilang 9 besar.\n" +
							"Cara membimbing: minta siswa membandingkan pembilang dan penyebut dengan kata-kata, lalu menentukan jenisnya.",
						questions: [],
					},
				],
			},

			// ═══════════════════ SUB-TOPIK 3.4 ═══════════════════
			{
				name: "Pecahan yang Setara",
				slug: "pecahan-yang-setara",
				description:
					"Mengenal pecahan setara (senilai) yang memiliki nilai sama meskipun pembilang dan penyebutnya berbeda, serta belajar membuat dan menyederhanakannya.",
				order: 4,
				materials: [
					{
						title: "Pengertian Pecahan yang Setara",
						order: 1,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Apa Itu Pecahan Setara?"),
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"menjelaskan pengertian pecahan setara (senilai)",
								"membuat pecahan setara dengan mengalikan pembilang dan penyebut",
								"menyederhanakan pecahan dengan membagi pembilang dan penyebut",
							),
							heading(3, "Ayo Mulai"),
							p(
								"Bayangkan dua pizza yang ukurannya sama. Pizza pertama dipotong menjadi 2 bagian sama besar, sedangkan pizza kedua dipotong menjadi 4 bagian sama besar. Jika kamu mengambil setengah dari setiap pizza, apakah jumlah pizza yang kamu ambil sama?",
							),
							heading(3, "Pengertian"),
							p(
								"Pecahan setara (disebut juga pecahan senilai) adalah dua pecahan atau lebih yang memiliki ",
								bold("nilai yang sama"),
								", meskipun pembilang dan penyebutnya berbeda.",
							),
							bulletList(
								"Pizza pertama: 1 dari 2 bagian, yaitu 1/2.",
								"Pizza kedua: 2 dari 4 bagian, yaitu 2/4.",
							),
							p(
								"Walaupun jumlah potongannya berbeda, bagian pizza yang kamu ambil sama banyak.",
							),
							math("\\frac{1}{2} = \\frac{2}{4}"),
							p(
								"Kita dapat melihatnya pada model kotak. Semua gambar sama besar:",
							),
							bulletList(
								"1/2 : [X][ ]",
								"2/4 : [X][X][ ][ ]",
								"4/8 : [X][X][X][X][ ][ ][ ][ ]",
							),
							p(
								"Ketiganya mewarnai setengah dari seluruh bagian.",
							),
							heading(3, "Contoh Pecahan Setara"),
							math(
								"\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6} = \\frac{4}{8}",
							),
							p(
								"Semua pecahan tersebut mewakili setengah dari satu benda utuh.",
							),
							heading(3, "Cara Membuat Pecahan Setara"),
							p(
								"Ada dua cara untuk membuat pecahan setara, yaitu memperluas dan menyederhanakan.",
							),
							heading(3, "Cara 1: Memperluas Pecahan"),
							p(
								"Kalikan pembilang dan penyebut dengan ",
								bold("bilangan yang sama"),
								". Nilai pecahan tidak berubah, karena setiap bagian dipotong menjadi bagian yang lebih kecil sambil jumlah yang diambil tetap sama.",
							),
							math(
								"\\frac{2}{3} = \\frac{2 \\times 2}{3 \\times 2} = \\frac{4}{6}",
							),
							math(
								"\\frac{2}{3} = \\frac{2 \\times 3}{3 \\times 3} = \\frac{6}{9}",
							),
							heading(3, "Cara 2: Menyederhanakan Pecahan"),
							p(
								"Bagi pembilang dan penyebut dengan ",
								bold("bilangan yang sama"),
								". Pecahan disebut paling sederhana jika pembilang dan penyebut tidak dapat dibagi lagi dengan bilangan yang sama (selain 1).",
							),
							math(
								"\\frac{6}{8} = \\frac{6 \\div 2}{8 \\div 2} = \\frac{3}{4}",
							),
							math(
								"\\frac{12}{18} = \\frac{12 \\div 6}{18 \\div 6} = \\frac{2}{3}",
							),
							p(
								"Pada 12/18, kamu juga dapat membaginya dua kali: dibagi 2 menjadi 6/9, lalu dibagi 3 menjadi 2/3. Hasilnya sama.",
							),
							heading(3, "Manfaat Pecahan Setara"),
							bulletList(
								"Membandingkan dan mengurutkan pecahan berpenyebut berbeda",
								"Menjumlahkan dan mengurangkan pecahan berpenyebut berbeda",
								"Menuliskan pecahan dalam bentuk yang paling sederhana",
							),
							heading(3, "Kesalahan yang Sering Terjadi"),
							bulletList(
								"Menambah pembilang dan penyebut dengan bilangan yang sama, misalnya 1/2 menjadi 2/3. Pecahan 2/3 tidak setara dengan 1/2, karena yang benar adalah dikali atau dibagi",
								"Mengalikan hanya pembilang atau hanya penyebut. Keduanya harus dikalikan atau dibagi dengan bilangan yang sama",
								"Mengira pecahan setara harus memiliki angka yang sama. Padahal yang harus sama adalah nilainya",
							),
							p(
								bold("Ingat: "),
								"Pecahan setara memiliki nilai yang sama, bukan harus memiliki angka pembilang dan penyebut yang sama.",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Pecahan setara adalah pecahan berbeda yang nilainya sama",
								"Memperluas: kalikan pembilang dan penyebut dengan bilangan yang sama",
								"Menyederhanakan: bagi pembilang dan penyebut dengan bilangan yang sama",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Tulis tiga pecahan yang setara dengan 2/3.",
								"Ubah 3/4 menjadi pecahan setara berpenyebut 12.",
								"Sederhanakan 10/15.",
								"Apakah 2/3 = 3/4? Jelaskan.",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"Contohnya 4/6, 6/9, dan 8/12 (pembilang dan penyebut dikali 2, 3, dan 4).",
								"12 dibagi 4 adalah 3. Jadi 3/4 = (3 x 3)/(4 x 3) = 9/12.",
								"Bagi pembilang dan penyebut dengan 5: 10/15 = 2/3.",
								"Tidak sama. 2/3 = 8/12, sedangkan 3/4 = 9/12, sehingga nilainya berbeda.",
							),
						),
						materialLlmContext:
							"Materi ini memperkenalkan pecahan setara (senilai) kepada siswa SD.\n" +
							"Tujuan belajar: siswa dapat menjelaskan pecahan setara, memperluas pecahan dengan perkalian, dan menyederhanakan pecahan dengan pembagian.\n" +
							"Pecahan setara adalah pecahan berbeda yang mempunyai nilai sama. Contoh: 1/2 = 2/4 = 3/6 = 4/8.\n" +
							"Kesetaraan dapat dijelaskan menggunakan benda yang sama besar, seperti pizza atau kue yang dibagi menjadi jumlah potongan berbeda tetapi bagian yang diambil memiliki nilai sama. Model teks: [X][ ] = [X][X][ ][ ] = [X][X][X][X][ ][ ][ ][ ].\n" +
							"Memperluas: kalikan pembilang dan penyebut dengan bilangan yang sama (2/3 = 4/6 = 6/9). Menyederhanakan: bagi pembilang dan penyebut dengan bilangan yang sama (6/8 = 3/4; 12/18 = 2/3).\n" +
							"Kesalahan umum: menambah (bukan mengalikan) pembilang dan penyebut dengan bilangan yang sama; mengalikan hanya satu bagian; mengira angka harus sama.\n" +
							"Manfaat: dipakai untuk membandingkan, mengurutkan, menjumlahkan, dan mengurangkan pecahan berpenyebut berbeda.\n" +
							"Cara membimbing: gunakan model benda yang dipotong dengan jumlah bagian berbeda, lalu minta siswa membuktikan bahwa bagian yang diambil sama banyak.",
						questions: topic2Exercise2Questions,
					},
				],
			},
		],
	};
