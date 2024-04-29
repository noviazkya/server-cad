-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Apr 2024 pada 07.22
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cad_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refreshToken` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `uuid`, `username`, `email`, `password`, `refreshToken`, `createdAt`, `updatedAt`) VALUES
(1, 'c0e17f0e-d62c-4fc4-8beb-75f6d0835569', 'admin1', 'admin1@gmail.com', '$2a$10$OQwSRPcMXMGk8AYKBE9yOOqVAv3mqKuF8LBEW863WBcigAE99Cfi.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxLCJ1c2VybmFtZSI6ImFkbWluMSIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsImlhdCI6MTcxNDEyNzA0MCwiZXhwIjoxNzE0NzMxODQwfQ.yIyvzgr6_ibiFS0ibqC1KDilVgoEPs4hVBWzpCP7y8c', '2024-02-08 14:18:32', '2024-04-26 10:24:00'),
(2, '87213a7d-ee64-4ac5-8321-21283e35d944', 'ayang nopi', 'nopi@gmail.com', '$2a$10$Vdu0jo8qx.IP1QXohPGC0.wlX6SNP1xGIzaAh0Z/Hoj3GGFAkdRcm', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoyLCJ1c2VybmFtZSI6ImF5YW5nIG5vcGkiLCJlbWFpbCI6Im5vcGlAZ21haWwuY29tIiwiaWF0IjoxNzA4NTA0MDU3LCJleHAiOjE3MDkxMDg4NTd9.T5HVz0gkW3E20g4GSHi3_A6D0hrtVjbIrD4UBdbI0wc', '2024-02-21 05:48:15', '2024-02-21 08:27:37'),
(3, '8ab2ff54-574c-4c38-b654-998c0e73fc89', 'nopi', 'nopiii@gmail.com', '$2a$10$ivAEmqgqD/Xro22.MbE5BOCOpGq7mKIKvY6YYWm1hb2vPeoK5sZ.q', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjozLCJ1c2VybmFtZSI6Im5vcGkiLCJlbWFpbCI6Im5vcGlpaUBnbWFpbC5jb20iLCJpYXQiOjE3MDg0OTU1NDIsImV4cCI6MTcwOTEwMDM0Mn0.kdPiR6pmmaLXlzrM5R8zGbCpcoKm60Kj6U-h8WO9WBY', '2024-02-21 06:03:43', '2024-02-21 06:05:42'),
(4, 'f395525d-520e-4d53-b77d-ad9acf309da2', 'admin2', 'admin2@gmail.com', '$2a$10$no7.pb8MD/mQPri1Xp4FkOpJfRX0QjFsLMCQ1TXGIIEeaf9k0u1fG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjo0LCJ1c2VybmFtZSI6ImFkbWluMiIsImVtYWlsIjoiYWRtaW4yQGdtYWlsLmNvbSIsImlhdCI6MTcwODQ5NjA4NywiZXhwIjoxNzA5MTAwODg3fQ.IKEgJXJXKXYVq8QTK8WE-eqYWQCmRYLZ91-UzFsp_q8', '2024-02-21 06:14:28', '2024-02-21 06:14:47'),
(5, '501759ad-8689-4066-a6f2-944609b9f435', 'gojo', 'gojosatoru@gmail.com', '$2a$10$elwjbGzKpHyGRssZG0a14.uPH.dr7x4gYR.uAd5sp5.3Ac/J/Z5JG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjo1LCJ1c2VybmFtZSI6Imdvam8iLCJlbWFpbCI6Imdvam9zYXRvcnVAZ21haWwuY29tIiwiaWF0IjoxNzA4NjkwOTkxLCJleHAiOjE3MDkyOTU3OTF9.xMc-1ZGJqnXajmRcsb_5d7p1nr_6k2ua6ji_Mw8MxIg', '2024-02-21 06:18:07', '2024-02-23 12:23:11'),
(6, '8227005c-4135-423f-a7a4-bd196a15a788', 'alia', 'alia@gmail.com', '$2a$10$7YTH3a3E5XEDdSGDLzp3euNBufuM.50wD4pbIYAYpNow94BvRXS1i', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjo2LCJ1c2VybmFtZSI6ImFsaWEiLCJlbWFpbCI6ImFsaWFAZ21haWwuY29tIiwiaWF0IjoxNzA4NDk4ODI5LCJleHAiOjE3MDkxMDM2Mjl9.tJQ0BX84RKn3PVs6otfvaRFE0udwZiuNBP8IXMLF7iY', '2024-02-21 07:00:09', '2024-02-21 07:00:29'),
(7, '09e6f0ea-686d-439e-b4c9-3b814b96977c', 'daffafznnn', 'ayangdaffa@gmail.com', '$2a$10$FjWNBSk3BB51SaT9sZggEevXsPPz2jdlIq/5JRhyC4arQRJvbRXWy', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjo3LCJ1c2VybmFtZSI6ImRhZmZhZnpubm4iLCJlbWFpbCI6ImF5YW5nZGFmZmFAZ21haWwuY29tIiwiaWF0IjoxNzA4NTYyMzI4LCJleHAiOjE3MDkxNjcxMjh9.AqkhARz-X6ro6DSaO1DrUmxlxofy6jyznLiWVgXpDhk', '2024-02-22 00:28:09', '2024-02-22 00:38:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `collection`
--

CREATE TABLE `collection` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `creator` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `collection`
--

INSERT INTO `collection` (`id`, `uuid`, `title`, `creator`, `date`, `description`, `image`, `url`, `createdAt`, `updatedAt`) VALUES
(1, 'a1ed0188-c328-4c81-8415-80288176ee6b', 'Lukisan Monalisa', 'Leonardo Da Vinci ', '1503-05-05', 'Mona Lisa, Monalisa adalah lukisan minyak di atas kayu popular yang dibuat oleh Leonardo da Vinci pada abad ke-16. Lukisan ini sering dianggap sebagai salah satu lukisan paling terkenal di dunia dan hanya sedikit karya seni lain yang menjadi pusat perhatian, studi, mitologi, dan parodi', '39512138a73bcf5ec64a24ec868b91ab.jpg', 'http://localhost:5000/images/39512138a73bcf5ec64a24ec868b91ab.jpg', '2024-02-22 01:42:09', '2024-04-17 04:27:21'),
(7, '86cd41ff-f85c-4a74-8403-38eb2710a3ef', 'The Persistence of Memory', 'Salvador Dali', '1931-01-01', 'The Persistence of Memory adalah lukisan tahun 1931 karya seniman Salvador Dalí dan salah satu karya Surealisme yang paling dikenal. Pertama kali ditampilkan di Galeri Julien Levy pada tahun 1932, sejak 1934 lukisan itu telah menjadi koleksi Museum of Modern Art di New York City, yang menerimanya dari donor anonim', '64f909f4e18e6a48deed9d1dc5acd092.jpg', 'http://localhost:5000/images/64f909f4e18e6a48deed9d1dc5acd092.jpg', '2024-03-27 04:53:25', '2024-04-17 04:35:22'),
(10, 'c057ec5a-939e-469b-8985-fea41659eb32', 'Girl with a Pearl Earring', 'Johannes Vermeer', '1665-01-01', 'Gadis dengan Anting-Anting Mutiara adalah salah satu lukisan adikarya pelukis Belanda Johannes Vermeer. Seperti ditulis pada judulnya, pusat perhatian lukisan ini adalah anting-anting mutiara yang dipakai seorang gadis. Sekarang lukisan ini disimpan di galeri Mauritshuis, Den Haag', '2778dd536cb9d345326200fea706f6f1.jpg', 'http://localhost:5000/images/2778dd536cb9d345326200fea706f6f1.jpg', '2024-04-17 02:13:00', '2024-04-17 04:40:23'),
(11, 'cd94f580-ec35-4d12-9fc8-f9d2a05f82d2', 'The Scream', 'Edward Munch', '1893-01-01', 'The Scream atau di sebut juga dengan Jeritan adalah sebutan untuk empat buah versi lukisan ekspresionis oleh seniman Norwegia Edward Munch yang menjadi sumber inspirasi bagi banyak pelukis lainnya dalam aliran ini. Lukisan ini dianggap oleh banyak orang sebagai karyanya yang paling penting', 'dad0b71ceb9d2282b6cf416b634c35e4.jpg', 'http://localhost:5000/images/dad0b71ceb9d2282b6cf416b634c35e4.jpg', '2024-04-17 03:48:06', '2024-04-17 04:44:16'),
(13, 'c822ad29-abfd-4638-8488-5ed64bdc2920', 'The Starry Night', 'Vincent Van Gogh', '1889-04-17', 'The Starry Night adalah sebuah lukisan minyak di kanvas karya pelukis pasca-Impresionis Belanda Vincent van Gogh. Lukisan tersebut menggambarkan pemandangan sebuah desa pada malam hari dengan langit yang dihiasi cahaya bintang dan bulan. Lukisan Starry Night menyuguhkan keindahan sekaligus rasa sedih dan haru yang mendalam pada diri Van Gogh', '3096e4b7211ca3ec5ad8bdb45a052f38.jpg', 'http://localhost:5000/images/3096e4b7211ca3ec5ad8bdb45a052f38.jpg', '2024-04-17 08:11:37', '2024-04-17 08:25:10'),
(15, 'dc5cbcd4-c199-4a05-a727-99acc6801856', 'Garuda', 'Abas Alibasyah', '1969-03-31', 'Dalam lukisan ini, Abas menerapkan pola dasar geometrik untuk mengabstraksikan bentuk burung garuda. Menjadi unik karena deformasi bentuk garuda telah sedemikian jauh, sehingga yang lebih penting adalah ekspresi berbagai unsur visual yang ada. Warna merah dengan gradasi ke arah violet dan oranye memberi kekuatan sebagai latar belakang yang ekspresif. Bentuk burung muncul lewat konstruksi serpihan bidang dengan warna kuning dan hijau, diikat dengan tekstur dan goresan kasar yang mencitrakan nafas primitif. Lukisan ini juga seperti karya-karya Abas dalam periode itu, dipengaruhi oleh sumbersumber visual dari berbagai patung etnis nusantara.', 'd6790a0e63b22e16713519a7dec6e291.jpg', 'http://localhost:5000/images/d6790a0e63b22e16713519a7dec6e291.jpg', '2024-04-24 07:58:39', '2024-04-24 07:58:39'),
(16, '089d2563-dfc3-411b-aef6-11565a61d82d', 'Dewi-Nyi Roro Kidul', ' Agus Djaya', '1962-04-01', 'Lukisan Dewi-Nyi Roro Kidul\r\nDibuat pada tahun 1962, lukisan karya Agus Djaya ini mewakili gaya seni lukis modern Indonesia tahun 1960-an yang mengungkapkan tradisi mitologi Jawa. Lukisan Dewi mengekspresikan sosok Nyi Roro Kidul sang ratu penguasa pantai selatan dengan aliran impresionisme.', '18838805c2189d119dba0e272e80e4bb.jpg', 'http://localhost:5000/images/18838805c2189d119dba0e272e80e4bb.jpg', '2024-04-24 08:07:06', '2024-04-24 08:12:42'),
(18, '012792f0-0c5d-4d96-9e70-2e3a2087ece8', 'Penangkapan Pangeran Diponegoro', 'Raden Saleh', '1857-04-25', 'Penangkapan Pangeran Diponegoro adalah sebuah lukisan 1857 karya Raden Saleh, yang menggambarkan ditangkapnya Pangeran Diponegoro oleh Letnan Jenderal Hendrik Merkus de Kock pada 28 Maret 1830. ', '10bf5d1332ce4413c4e86d1a06f99f1a.jpg', 'http://localhost:5000/images/10bf5d1332ce4413c4e86d1a06f99f1a.jpg', '2024-04-25 09:22:02', '2024-04-25 09:22:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `information`
--

CREATE TABLE `information` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `opening` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `address` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `information`
--

INSERT INTO `information` (`id`, `uuid`, `title`, `opening`, `category`, `date`, `description`, `address`, `image`, `url`, `createdAt`, `updatedAt`) VALUES
(17, '8f527fe0-124a-49a9-bef0-64afc2ef16de', 'Pameran Kuratorial', 'Kuratorial', 'Seminar', '2023-07-05', 'Pameran “Ningyo : Kuratorial“ adalah salah satu aspek utama kebudayaan Jepang adalah kedalaman rasa cinta terhadap boneka (Ningyo). Kebudayaan boneka menyebar di Jepang khususnya pada abad ke-17. Boneka dapat ditemukan dalam berbagai aspek kehidupan sehari-hari, baik kehidupan di istana kekaisaran Jepang maupun masyarakat biasa. Selain itu, boneka merupakan pencapaian dari sudut pandang seni dan keterampilan modern. Banyak contoh yang memang masuk ke dalam ranah seni tinggi merupakan kejadian yang sangat langka jika dibandingkan dengan kebudayaan boneka yang terlihat di belahan dunia lain. Dengan demikian, bisa dibilang Jepang adalah “Negeri NINGYO” yang sesungguhnya, dengan boneka-boneka istimewa yang dibuat di sini dan sejarah budaya yang panjang dalam menghargainya. Pameran ini mengkaji keanekaragaman kebudayaan boneka Jepang dari 4 sudut pandang untuk memperkenalkan jenis-jenis dasar boneka Jepang dan budaya di balik setiap jenisnya.', 'Galeri Nasional Indonesia - Jakarta', '10dbef271e135c989e8e60bb5746fbf6.jpg', 'http://localhost:5000/images/10dbef271e135c989e8e60bb5746fbf6.jpg', '2024-04-25 09:44:36', '2024-04-25 11:44:57'),
(18, '11c98b1c-e50c-4851-a177-04d9f97e0193', 'Pameran Siaran Pers', 'Siaran Pers', 'Seminar', '2023-07-05', 'Pameran “Ningyo : Art and Beauty of Japanese Dolls” adalah bagian dari program pameran keliling yang digagas oleh The Japan Foundation di Tokyo, Jepang. Kehadiran pameran ini di Indonesia sekaligus merayakan 65 tahun hubungan diplomatik Indonesia dan Jepang. Selain di Jakarta, pameran ini juga akan digelar di Surabaya dan Bali.  \r\n\r\nTotal karya yang dipamerkan pada pameran ini sebanyak 67 karya boneka tradisional dan modern, yang disertai dengan penjelasan sejarah, fungsi, dan penyebarannya dalam kebudayaan masyarakat Jepang. Kurator Pameran yang juga merupakan Kurator Museum Nasional Tokyo, Mita Kakuyuki, menyatakan bahwa pameran ini akan mengkaji keanekaragamanan kebudayaan boneka Jepang dari 4 sudut pandang, yaitu: Ningyo sebagai doa untuk perkembangan anak; Ningyo sebagai seni rupa; Ningyo sebagai seni rakyat; dan penyebaran kebudayaan Ningyo.', 'Galeri Nasional Indonesia - Jakarta', '10dbef271e135c989e8e60bb5746fbf6.jpg', 'http://localhost:5000/images/10dbef271e135c989e8e60bb5746fbf6.jpg', '2024-04-25 09:56:47', '2024-04-25 11:23:07');

-- --------------------------------------------------------

--
-- Struktur dari tabel `information_tags`
--

CREATE TABLE `information_tags` (
  `id` int(11) NOT NULL,
  `informationId` int(11) NOT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`tags`)),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `information_tags`
--

INSERT INTO `information_tags` (`id`, `informationId`, `tags`, `createdAt`, `updatedAt`) VALUES
(33, 18, '\"awokawokaowk,awokaowkawo\"', '2024-04-25 11:23:07', '2024-04-25 11:23:07'),
(35, 17, '\"\"', '2024-04-25 11:44:57', '2024-04-25 11:44:57');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `information`
--
ALTER TABLE `information`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `information_tags`
--
ALTER TABLE `information_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `informationId` (`informationId`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `collection`
--
ALTER TABLE `collection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `information`
--
ALTER TABLE `information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `information_tags`
--
ALTER TABLE `information_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `information_tags`
--
ALTER TABLE `information_tags`
  ADD CONSTRAINT `information_tags_ibfk_1` FOREIGN KEY (`informationId`) REFERENCES `information` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
