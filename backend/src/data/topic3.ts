import { topic3Exercise1Questions } from "./exercises/topic3-exercise1";
import {
	bold,
	bulletList,
	doc,
	heading,
	math,
	orderedList,
	p,
} from "./helpers";

export const topic3 =
	// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  TOPIC 3  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	{
		name: "Penjumlahan dan Pengurangan Bilangan Pecahan",
		slug: "penjumlahan-pengurangan-bilangan-pecahan",
		description:
			"Mempelajari cara menjumlahkan dan mengurangkan bilangan pecahan, baik yang berpenyebut sama maupun berpenyebut berbeda, lengkap dengan alasan di balik setiap langkahnya.",
		order: 3,
		subTopics: [
			// ═══════════════════ SUB-TOPIK 4.1 ═══════════════════
			{
				name: "Penjumlahan Bilangan Pecahan",
				slug: "penjumlahan-bilangan-pecahan",
				description:
					"Menjumlahkan pecahan yang berpenyebut sama maupun berbeda.",
				order: 1,
				materials: [
					{
						title: "Penjumlahan Bilangan Pecahan Berpenyebut Sama",
						order: 1,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Penjumlahan Pecahan Berpenyebut Sama"),
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"menjumlahkan dua pecahan yang penyebutnya sama",
								"menjelaskan mengapa penyebut tidak ikut dijumlahkan",
								"menuliskan hasil penjumlahan yang lebih dari 1 sebagai bilangan campuran",
							),
							heading(3, "Ayo Mulai"),
							p(
								"Ayah dan Ibu membeli satu kue yang dipotong menjadi 7 bagian sama besar. Ayah makan 2 potong dan Ibu makan 3 potong. Berapa bagian kue yang sudah dimakan oleh Ayah dan Ibu? Untuk menjawabnya, kita perlu menjumlahkan dua pecahan.",
							),
							heading(3, "Aturan"),
							p(
								"Jika dua pecahan memiliki ",
								bold("penyebut yang sama"),
								", kita cukup ",
								bold("menjumlahkan pembilangnya"),
								". Penyebutnya tetap.",
							),
							math(
								"\\frac{a}{c} + \\frac{b}{c} = \\frac{a + b}{c}",
							),
							heading(3, "Mengapa Penyebut Tidak Dijumlahkan?"),
							p(
								'Penyebut hanya menunjukkan ukuran setiap potongan, yaitu potongan per tujuh. Saat kita menjumlahkan, ukuran potongannya tidak berubah. Kita hanya menghitung ada berapa banyak potongan. Ini sama seperti 2 apel ditambah 3 apel menjadi 5 apel. Kata "apel" tidak ikut dijumlahkan.',
							),
							heading(3, "Contoh 1"),
							p(
								"Ayah makan 2 potong dan Ibu makan 3 potong dari kue yang dipotong menjadi 7 bagian sama besar. Tanda [A] adalah potongan Ayah, [I] adalah potongan Ibu, dan [ ] adalah sisa:",
							),
							p("Ayah : [A][A][ ][ ][ ][ ][ ]"),
							p("Ibu  : [ ][ ][I][I][I][ ][ ]"),
							p("Gabungan : [A][A][I][I][I][ ][ ]"),
							math(
								"\\frac{2}{7} + \\frac{3}{7} = \\frac{2 + 3}{7} = \\frac{5}{7}",
							),
							p(
								bold("Ingat: "),
								"Penyebutnya TIDAK dijumlahkan. Hasilnya bukan 5/14!",
							),
							heading(3, "Contoh 2: Hasilnya Tepat 1"),
							math(
								"\\frac{3}{8} + \\frac{5}{8} = \\frac{3 + 5}{8} = \\frac{8}{8} = 1",
							),
							p(
								"Semua bagian terambil, sehingga hasilnya satu utuh.",
							),
							heading(3, "Jika Hasilnya Lebih dari 1"),
							p(
								"Kadang pembilang hasilnya lebih besar dari penyebut. Itu artinya hasilnya lebih dari 1 utuh.",
							),
							math(
								"\\frac{4}{5} + \\frac{3}{5} = \\frac{7}{5} = 1\\frac{2}{5}",
							),
							p(
								"7/5 berarti 5/5 (satu utuh) ditambah 2/5 lagi, sehingga ditulis 1 2/5.",
							),
							p(
								"Jawaban 7/5 maupun 1 2/5 sama-sama benar. Jika hasilnya dapat disederhanakan, kamu boleh menyederhanakannya, tetapi tidak wajib.",
							),
							heading(3, "Kesalahan yang Sering Terjadi"),
							bulletList(
								"Ikut menjumlahkan penyebut sehingga 2/7 + 3/7 ditulis 5/14",
								"Lupa menuliskan penyebut pada hasil akhir",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Penyebut sama: jumlahkan pembilangnya, penyebut tetap",
								"Jika pembilang hasil lebih besar dari penyebut, hasilnya lebih dari 1",
								"Hasil lebih dari 1 dapat ditulis sebagai pecahan tidak sejati atau bilangan campuran",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Hitunglah 3/8 + 4/8.",
								"Hitunglah 5/6 + 4/6. Tulis hasilnya sebagai bilangan campuran.",
								"Rina membaca 2/10 bagian buku pada hari Senin dan 5/10 bagian pada hari Selasa. Berapa bagian buku yang sudah dibaca Rina?",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"3/8 + 4/8 = (3 + 4)/8 = 7/8.",
								"5/6 + 4/6 = 9/6 = 6/6 + 3/6 = 1 3/6 (boleh juga ditulis 1 1/2).",
								"2/10 + 5/10 = 7/10. Rina sudah membaca 7/10 bagian buku.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan penjumlahan pecahan berpenyebut sama untuk siswa SD.\n" +
							"Tujuan belajar: siswa dapat menjumlahkan pecahan berpenyebut sama, menjelaskan alasan penyebut tidak dijumlahkan, dan menulis hasil lebih dari 1 sebagai bilangan campuran.\n" +
							"Rumus: a/c + b/c = (a+b)/c. Penyebut tetap, pembilang dijumlahkan. Contoh: 2/7 + 3/7 = 5/7.\n" +
							"Alasan: penyebut menunjukkan ukuran potongan, yang tidak berubah saat dijumlahkan (analogi 2 apel + 3 apel = 5 apel).\n" +
							"Kesalahan umum: ikut menjumlahkan penyebut (5/14); lupa menulis penyebut.\n" +
							"Jika hasil pembilang > penyebut, hasil lebih dari 1; contoh 4/5 + 3/5 = 7/5 = 1 2/5 (7/5 = 5/5 + 2/5). 3/8 + 5/8 = 8/8 = 1.\n" +
							"Jawaban 7/5 maupun 1 2/5 sama-sama benar. Hasil tidak wajib disederhanakan.\n" +
							'Cara membimbing: minta siswa menceritakan "potongan per berapa" yang digabungkan, sebelum menghitung.',
						questions: [],
					},
					{
						title: "Penjumlahan Bilangan Pecahan Berpenyebut Berbeda",
						order: 2,
						difficulty: 2,
						isExerciseOnly: false,
						content: doc(
							heading(
								2,
								"Penjumlahan Pecahan Berpenyebut Berbeda",
							),
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"menjelaskan mengapa penyebut harus disamakan sebelum menjumlahkan",
								"menyamakan penyebut dua pecahan dengan KPK",
								"menjumlahkan pecahan berpenyebut berbeda dengan benar",
							),
							heading(3, "Ayo Mulai"),
							p(
								"Dina makan 1/3 bagian pizza dan Eko makan 1/4 bagian pizza yang sama. Berapa bagian pizza yang mereka makan bersama? Potongan pizza Dina dan Eko ukurannya berbeda, sehingga kita belum bisa langsung menjumlahkannya.",
							),
							heading(3, "Mengapa Penyebut Harus Sama?"),
							p(
								"Pecahan hanya bisa dijumlahkan jika ",
								bold("penyebutnya sama"),
								", sebab hanya potongan yang ukurannya sama yang dapat dihitung bersama. Ibaratnya, kamu tidak bisa langsung menjumlahkan apel dengan jeruk. Jika penyebutnya berbeda, samakan dulu penyebutnya menggunakan ",
								bold("KPK"),
								" (Kelipatan Persekutuan Terkecil).",
							),
							heading(3, "Langkah-langkah"),
							orderedList(
								"Cari KPK dari kedua penyebut",
								"Ubah kedua pecahan agar penyebutnya sama dengan KPK, dengan mengalikan pembilang dan penyebut dengan bilangan yang sama",
								"Jumlahkan pembilangnya, penyebut tetap",
								"Jika hasilnya lebih dari 1, tulis sebagai bilangan campuran",
							),
							heading(3, "Contoh 1"),
							math("\\frac{1}{3} + \\frac{1}{4}"),
							bulletList(
								"KPK dari 3 dan 4 adalah 12",
								"1/3 = 4/12 (kalikan atas dan bawah dengan 4)",
								"1/4 = 3/12 (kalikan atas dan bawah dengan 3)",
								"4/12 + 3/12 = 7/12",
							),
							math(
								"\\frac{1}{3} + \\frac{1}{4} = \\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}",
							),
							heading(3, "Contoh 2: Hasilnya Lebih dari 1"),
							math("\\frac{1}{2} + \\frac{2}{3}"),
							bulletList(
								"KPK dari 2 dan 3 adalah 6",
								"1/2 = 3/6 dan 2/3 = 4/6",
								"3/6 + 4/6 = 7/6",
								"7/6 = 6/6 + 1/6 = 1 1/6",
							),
							heading(
								3,
								"Contoh 3: Salah Satu Penyebut Kelipatan Penyebut Lain",
							),
							math("\\frac{3}{4} + \\frac{1}{8}"),
							bulletList(
								"KPK dari 4 dan 8 adalah 8",
								"3/4 = 6/8, sedangkan 1/8 tidak perlu diubah",
								"6/8 + 1/8 = 7/8",
							),
							p(
								bold("Ingat: "),
								"Jangan langsung menjumlahkan pembilang dan penyebut. 1/3 + 1/4 bukan 2/7!",
							),
							heading(3, "Mengapa Cara Langsung Itu Salah?"),
							p(
								"Jika kita menjumlahkan pembilang dengan pembilang dan penyebut dengan penyebut, maka 1/2 + 1/2 akan menjadi 2/4. Padahal 2/4 sama dengan setengah. Setengah ditambah setengah seharusnya menjadi satu utuh. Jadi, cara tersebut jelas keliru.",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Samakan penyebut lebih dulu dengan KPK",
								"Kalikan pembilang dan penyebut dengan bilangan yang sama",
								"Jumlahkan pembilang, penyebut tetap",
								"Periksa apakah hasilnya lebih dari 1",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Hitunglah 1/2 + 1/4.",
								"Hitunglah 2/3 + 1/5.",
								"Hitunglah 3/4 + 5/6. Tulis hasilnya sebagai bilangan campuran.",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"KPK 2 dan 4 adalah 4. 1/2 = 2/4. Jadi 2/4 + 1/4 = 3/4.",
								"KPK 3 dan 5 adalah 15. 2/3 = 10/15 dan 1/5 = 3/15. Jadi 10/15 + 3/15 = 13/15.",
								"KPK 4 dan 6 adalah 12. 3/4 = 9/12 dan 5/6 = 10/12. Jadi 9/12 + 10/12 = 19/12 = 12/12 + 7/12 = 1 7/12.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan penjumlahan pecahan berpenyebut berbeda.\n" +
							"Tujuan belajar: siswa dapat menjelaskan perlunya penyamaan penyebut, memakai KPK, dan menjumlahkan pecahan berpenyebut berbeda.\n" +
							"Langkah: (1) cari KPK penyebut, (2) ubah ke penyebut yang sama dengan mengalikan pembilang dan penyebut dengan bilangan yang sama, (3) jumlahkan pembilang, (4) tulis sebagai bilangan campuran jika hasil lebih dari 1.\n" +
							"Contoh: 1/3 + 1/4 -> KPK(3,4)=12 -> 4/12 + 3/12 = 7/12. 1/2 + 2/3 = 3/6 + 4/6 = 7/6 = 1 1/6. 3/4 + 1/8 = 6/8 + 1/8 = 7/8.\n" +
							"Kesalahan umum: menjumlahkan pembilang dengan pembilang dan penyebut dengan penyebut (2/7). Bukti kekeliruan: 1/2 + 1/2 menjadi 2/4 = 1/2, padahal seharusnya 1.\n" +
							"Cara membimbing: jika siswa kesulitan, minta menggambar atau membayangkan potongan yang ukurannya berbeda lalu bertanya bagaimana cara membuatnya sama.",
						questions: [],
					},
				],
			},

			// ═══════════════════ SUB-TOPIK 4.2 ═══════════════════
			{
				name: "Pengurangan Bilangan Pecahan",
				slug: "pengurangan-bilangan-pecahan",
				description:
					"Mengurangkan pecahan yang berpenyebut sama maupun berbeda.",
				order: 2,
				materials: [
					{
						title: "Pengurangan Bilangan Pecahan Berpenyebut Sama",
						order: 1,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, "Pengurangan Pecahan Berpenyebut Sama"),
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"mengurangkan dua pecahan yang penyebutnya sama",
								"menjelaskan mengapa penyebut tidak ikut dikurangkan",
								"mengurangkan pecahan dari satu utuh",
							),
							heading(3, "Ayo Mulai"),
							p(
								"Kamu memiliki 5/9 bagian cokelat. Lalu kamu memakan 2/9 bagian. Berapa bagian cokelat yang tersisa? Kali ini kita mengurangi, bukan menjumlahkan.",
							),
							heading(3, "Aturan"),
							p(
								"Sama seperti penjumlahan, jika penyebutnya sama kita cukup ",
								bold("mengurangkan pembilangnya"),
								". Penyebutnya tetap.",
							),
							math(
								"\\frac{a}{c} - \\frac{b}{c} = \\frac{a - b}{c}",
							),
							heading(3, "Mengapa Penyebut Tidak Dikurangkan?"),
							p(
								"Penyebut hanya menunjukkan ukuran potongan. Ukuran potongan tidak berubah ketika sebagian potongan dimakan. Kita hanya menghitung sisa potongannya, seperti 5 apel dikurangi 2 apel menjadi 3 apel.",
							),
							heading(3, "Contoh 1"),
							p(
								"Ada 5 dari 9 bagian cokelat. Lalu 2 bagian dimakan. Tanda [C] adalah potongan cokelat yang ada dan [ ] adalah tempat kosong:",
							),
							p("Sebelum dimakan : [C][C][C][C][C][ ][ ][ ][ ]"),
							p("Sesudah dimakan : [C][C][C][ ][ ][ ][ ][ ][ ]"),
							math(
								"\\frac{5}{9} - \\frac{2}{9} = \\frac{5 - 2}{9} = \\frac{3}{9}",
							),
							p(
								bold("Ingat: "),
								"Penyebutnya tidak dikurangkan. Jika penyebut ikut dikurangkan, 9 - 9 = 0, dan pecahan berpenyebut 0 tidak ada artinya. Jadi hasilnya bukan 3/0!",
							),
							heading(3, "Contoh 2"),
							math(
								"\\frac{7}{8} - \\frac{3}{8} = \\frac{7 - 3}{8} = \\frac{4}{8}",
							),
							heading(3, "Contoh 3: Mengurangkan dari Satu Utuh"),
							p(
								"Satu utuh dapat ditulis sebagai pecahan dengan pembilang dan penyebut yang sama. Misalnya 1 = 5/5. Jadi, jika kamu memiliki satu pita utuh dan memotong 3/5 bagian, sisanya adalah:",
							),
							math(
								"1 - \\frac{3}{5} = \\frac{5}{5} - \\frac{3}{5} = \\frac{2}{5}",
							),
							p(
								"Hasil seperti 3/9 sudah benar. Kamu boleh menyederhanakannya menjadi 1/3, tetapi tidak wajib.",
							),
							heading(3, "Kesalahan yang Sering Terjadi"),
							bulletList(
								"Ikut mengurangkan penyebut sehingga hasilnya berpenyebut 0",
								"Mengurangkan pembilang yang lebih kecil dengan yang lebih besar. Pembilang pertama harus lebih besar atau sama dengan pembilang kedua",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Penyebut sama: kurangkan pembilangnya, penyebut tetap",
								"Penyebut tidak pernah ikut dikurangkan",
								"Satu utuh dapat ditulis sebagai pecahan, misalnya 1 = 5/5",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Hitunglah 8/10 - 3/10.",
								"Hitunglah 6/7 - 2/7.",
								"Hitunglah 1 - 2/5.",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"8/10 - 3/10 = (8 - 3)/10 = 5/10.",
								"6/7 - 2/7 = (6 - 2)/7 = 4/7.",
								"1 = 5/5, sehingga 5/5 - 2/5 = 3/5.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan pengurangan pecahan berpenyebut sama.\n" +
							"Tujuan belajar: siswa dapat mengurangkan pecahan berpenyebut sama, menjelaskan alasan penyebut tidak dikurangkan, dan mengurangkan pecahan dari satu utuh.\n" +
							"Rumus: a/c - b/c = (a-b)/c. Penyebut tetap, pembilang dikurangkan. Contoh: 5/9 - 2/9 = 3/9.\n" +
							"Alasan: penyebut menunjukkan ukuran potongan yang tidak berubah (analogi 5 apel - 2 apel = 3 apel).\n" +
							"Kesalahan umum: ikut mengurangkan penyebut (menghasilkan penyebut 0).\n" +
							"Mengurangkan dari satu utuh: 1 = 5/5, sehingga 1 - 3/5 = 2/5.\n" +
							"Hasil seperti 3/9 sudah benar; tidak wajib disederhanakan.\n" +
							"Cara membimbing: minta siswa membayangkan potongan yang tersisa setelah sebagian dimakan.",
						questions: [],
					},
					{
						title: "Pengurangan Bilangan Pecahan Berpenyebut Berbeda",
						order: 2,
						difficulty: 2,
						isExerciseOnly: false,
						content: doc(
							heading(
								2,
								"Pengurangan Pecahan Berpenyebut Berbeda",
							),
							heading(3, "Tujuan Belajar"),
							p(
								"Setelah mempelajari materi ini, kamu diharapkan dapat:",
							),
							bulletList(
								"menyamakan penyebut dua pecahan dengan KPK sebelum mengurangkan",
								"mengurangkan pecahan berpenyebut berbeda dengan benar",
								"memeriksa kewajaran hasil pengurangan",
							),
							heading(3, "Ayo Mulai"),
							p(
								"Ibu memiliki 3/4 bagian kue. Ibu memberikan 1/3 bagian kue kepada tetangga. Berapa bagian kue yang tersisa? Penyebutnya berbeda, sehingga kita perlu menyamakannya terlebih dahulu.",
							),
							heading(3, "Aturan"),
							p(
								"Langkahnya sama seperti penjumlahan: ",
								bold("samakan penyebut dulu"),
								" menggunakan KPK, baru kurangkan pembilangnya.",
							),
							heading(3, "Langkah-langkah"),
							orderedList(
								"Cari KPK dari kedua penyebut",
								"Ubah kedua pecahan agar penyebutnya sama dengan KPK",
								"Kurangkan pembilangnya, penyebut tetap",
							),
							heading(3, "Contoh 1"),
							math("\\frac{3}{4} - \\frac{1}{3}"),
							bulletList(
								"KPK dari 4 dan 3 adalah 12",
								"3/4 = 9/12",
								"1/3 = 4/12",
								"9/12 - 4/12 = 5/12",
							),
							math(
								"\\frac{3}{4} - \\frac{1}{3} = \\frac{9}{12} - \\frac{4}{12} = \\frac{5}{12}",
							),
							heading(3, "Contoh 2"),
							math("\\frac{5}{6} - \\frac{1}{2}"),
							bulletList(
								"KPK dari 6 dan 2 adalah 6",
								"5/6 tetap, 1/2 = 3/6",
								"5/6 - 3/6 = 2/6",
							),
							heading(3, "Contoh 3"),
							math("\\frac{7}{10} - \\frac{2}{5}"),
							bulletList(
								"KPK dari 10 dan 5 adalah 10",
								"7/10 tetap, 2/5 = 4/10",
								"7/10 - 4/10 = 3/10",
							),
							heading(3, "Memeriksa Jawabanmu"),
							p(
								"Hasil pengurangan harus lebih kecil dari pecahan yang dikurangi. Pada contoh 1, hasilnya 5/12 memang lebih kecil dari 3/4 (yaitu 9/12). Untuk saat ini, pecahan yang dikurangi harus lebih besar dari pecahan pengurangnya.",
							),
							heading(3, "Kesalahan yang Sering Terjadi"),
							bulletList(
								"Mengurangkan pembilang dengan pembilang dan penyebut dengan penyebut tanpa menyamakan penyebut",
								"Hanya mengubah satu pecahan padahal kedua pecahan harus berpenyebut sama",
							),
							heading(3, "Rangkuman"),
							bulletList(
								"Samakan penyebut dengan KPK",
								"Kurangkan pembilang, penyebut tetap",
								"Periksa bahwa hasilnya lebih kecil dari pecahan awal",
							),
							heading(3, "Coba Sendiri"),
							orderedList(
								"Hitunglah 5/6 - 1/3.",
								"Hitunglah 3/4 - 2/5.",
								"Hitunglah 7/8 - 1/2.",
							),
							heading(3, "Pembahasan"),
							orderedList(
								"KPK 6 dan 3 adalah 6. 1/3 = 2/6. Jadi 5/6 - 2/6 = 3/6.",
								"KPK 4 dan 5 adalah 20. 3/4 = 15/20 dan 2/5 = 8/20. Jadi 15/20 - 8/20 = 7/20.",
								"KPK 8 dan 2 adalah 8. 1/2 = 4/8. Jadi 7/8 - 4/8 = 3/8.",
							),
						),
						materialLlmContext:
							"Materi ini mengajarkan pengurangan pecahan berpenyebut berbeda.\n" +
							"Tujuan belajar: siswa dapat menyamakan penyebut dengan KPK, mengurangkan pembilang, dan memeriksa kewajaran hasil.\n" +
							"Langkah: cari KPK, samakan penyebut, kurangkan pembilang.\n" +
							"Contoh: 3/4 - 1/3 -> KPK(4,3)=12 -> 9/12 - 4/12 = 5/12. 5/6 - 1/2 = 5/6 - 3/6 = 2/6. 7/10 - 2/5 = 7/10 - 4/10 = 3/10.\n" +
							"Pemeriksaan: hasil pengurangan harus lebih kecil dari pecahan yang dikurangi. Untuk saat ini, pecahan yang dikurangi lebih besar dari pengurangnya.\n" +
							"Kesalahan umum: mengurangkan pembilang dengan pembilang dan penyebut dengan penyebut tanpa menyamakan penyebut; hanya mengubah satu pecahan.\n" +
							"Cara membimbing: bila siswa kesulitan, minta menyebutkan dulu KPK, lalu mengubah pecahan satu per satu.",
						questions: topic3Exercise1Questions,
					},
				],
			},
		],
	};
