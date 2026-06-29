const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Memulai proses seeding data awal...');

  // 1. Clean Database
  await prisma.activityLog.deleteMany();
  await prisma.caseContribution.deleteMany();
  await prisma.article.deleteMany();
  await prisma.caseStage.deleteMany();
  await prisma.defendant.deleteMany();
  await prisma.case.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const passwordHashAdmin = await bcrypt.hash('admin12345', 10);
  const passwordHashContri = await bcrypt.hash('kontri123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Super Admin Januar',
      email: 'jan@hallojanu.xyz',
      passwordHash: passwordHashAdmin,
      role: 'SUPER_ADMIN',
    },
  });

  const contributor = await prisma.user.create({
    data: {
      name: 'Budi (Jurnalis)',
      email: 'budi@hallojanu.xyz',
      passwordHash: passwordHashContri,
      role: 'CONTRIBUTOR',
    },
  });

  console.log('✅ Pengguna default berhasil dibuat.');

  // 3. Create Categories
  const catKorupsi = await prisma.category.create({
    data: { name: 'Korupsi & Pencucian Uang', slug: 'korupsi', color: '#e02424', icon: 'shield-alert' },
  });

  const catPidanaUmum = await prisma.category.create({
    data: { name: 'Pidana Umum', slug: 'pidana-umum', color: '#1a56db', icon: 'gavel' },
  });

  const catPerdata = await prisma.category.create({
    data: { name: 'Perdata', slug: 'perdata', color: '#ff5a1f', icon: 'scale' },
  });

  const catLingkungan = await prisma.category.create({
    data: { name: 'Lingkungan & Agraria', slug: 'lingkungan', color: '#0e9f6e', icon: 'leaf' },
  });

  console.log('✅ Kategori berhasil dibuat.');

  // 4. Create Mock Cases, Stages, and Articles
  // Case 1: Korupsi Pengadaan Barang
  const case1 = await prisma.case.create({
    data: {
      caseNumber: '77/Pid.Sus-TPK/2026/PN.Jkt.Pus',
      title: 'Dugaan Korupsi Pengadaan Sensor Lingkungan Digital',
      description: 'Kasus penyalahgunaan wewenang dan mark-up anggaran dalam proyek pengadaan sensor kualitas udara digital nasional tahun anggaran 2025 yang merugikan keuangan negara sebesar Rp45 Miliar.',
      categoryId: catKorupsi.id,
      currentStatus: 'PERSIDANGAN',
    },
  });

  await prisma.defendant.createMany({
    data: [
      { caseId: case1.id, name: 'Heri Hartono, M.T.', role: 'Terdakwa Utama (Mantan Pejabat KemenLHK)' },
      { caseId: case1.id, name: 'Ir. Samuel Wijaya', role: 'Terdakwa (Direktur Kontraktor Pelaksana PT Rekayasa Cipta)' },
    ],
  });

  // Timeline Case 1
  const stage1Case1 = await prisma.caseStage.create({
    data: {
      caseId: case1.id,
      stageType: 'PELAPORAN',
      status: 'SELESAI',
      startedAt: new Date('2026-01-10'),
      endedAt: new Date('2026-02-15'),
      createdById: admin.id,
    },
  });

  await prisma.article.create({
    data: {
      title: 'Laporan Awal Dugaan Korupsi Sensor Kualitas Udara',
      content: 'Masyarakat sipil melaporkan dugaan ketidakberesan proyek sensor udara nasional ke KPK pada 10 Januari 2026 setelah ditemukannya ketidaksesuaian spesifikasi alat di lapangan yang berujung malfungsi masal.',
      stageId: stage1Case1.id,
      authorId: admin.id,
    },
  });

  const stage2Case1 = await prisma.caseStage.create({
    data: {
      caseId: case1.id,
      stageType: 'PENYIDIKAN',
      status: 'SELESAI',
      startedAt: new Date('2026-02-15'),
      endedAt: new Date('2026-04-20'),
      createdById: admin.id,
    },
  });

  await prisma.article.create({
    data: {
      title: 'Penyidikan Korupsi Sensor: Penetapan Tersangka Heri Hartono',
      content: 'Penyidik menetapkan Heri Hartono sebagai tersangka setelah memeriksa 25 saksi ahli dan menyita dokumen kontrak senilai Rp120 Miliar beserta bukti transfer rekening luar negeri.',
      stageId: stage2Case1.id,
      authorId: admin.id,
    },
  });

  const stage3Case1 = await prisma.caseStage.create({
    data: {
      caseId: case1.id,
      stageType: 'PENUNTUTAN',
      status: 'SELESAI',
      startedAt: new Date('2026-04-21'),
      endedAt: new Date('2026-05-30'),
      createdById: admin.id,
    },
  });

  await prisma.article.create({
    data: {
      title: 'Berkas P21: Kasus Korupsi Sensor Diserahkan ke Jaksa Penuntut Umum',
      content: 'Jaksa Penuntut Umum menyatakan berkas perkara lengkap (P21) dan merumuskan surat dakwaan pasal berlapis UU Tindak Pidana Korupsi dengan ancaman maksimal hukuman seumur hidup.',
      stageId: stage3Case1.id,
      authorId: admin.id,
    },
  });

  const stage4Case1 = await prisma.caseStage.create({
    data: {
      caseId: case1.id,
      stageType: 'PERSIDANGAN',
      status: 'AKTIF',
      startedAt: new Date('2026-06-01'),
      createdById: admin.id,
    },
  });

  await prisma.article.create({
    data: {
      title: 'Sidang Perdana: Pembacaan Surat Dakwaan Terdakwa Heri & Samuel',
      content: 'Sidang dibuka untuk umum di Pengadilan Tipikor Jakarta Pusat. Jaksa membacakan dakwaan mengenai kronologi penyelewengan dana dan kesepakatan kickback sebesar 15% dari nilai proyek.',
      stageId: stage4Case1.id,
      authorId: admin.id,
    },
  });


  // Case 2: Sengketa Hutan Adat
  const case2 = await prisma.case.create({
    data: {
      caseNumber: '298/Pid.B-LH/2026/PN.Mdn',
      title: 'Sengketa Lahan Adat Talun Rebo vs PT Sawit Jaya Lestari',
      description: 'Kasus dugaan penyerobotan kawasan hutan adat lindung seluas 450 Hektar oleh PT Sawit Jaya Lestari untuk konversi perkebunan kelapa sawit tanpa izin pelepasan kawasan dari kementerian terkait.',
      categoryId: catLingkungan.id,
      currentStatus: 'PENYIDIKAN',
    },
  });

  await prisma.defendant.create({
    data: { caseId: case2.id, name: 'PT Sawit Jaya Lestari (Direktur Utama: Ronald S.)', role: 'Terdakwa Korporasi' }
  });

  // Timeline Case 2
  const stage1Case2 = await prisma.caseStage.create({
    data: {
      caseId: case2.id,
      stageType: 'PELAPORAN',
      status: 'SELESAI',
      startedAt: new Date('2026-03-01'),
      endedAt: new Date('2026-04-10'),
      createdById: admin.id,
    },
  });

  await prisma.article.create({
    data: {
      title: 'Masyarakat Adat Melaporkan Dugaan Pembalakan Liar Perkebunan Sawit',
      content: 'Aliansi Masyarakat Adat Talun Rebo melayangkan laporan resmi ke Polda Sumatra Utara mengenai hilangnya wilayah hutan ulayat dan ditemukannya alat berat yang merusak patok batas adat.',
      stageId: stage1Case2.id,
      authorId: admin.id,
    },
  });

  const stage2Case2 = await prisma.caseStage.create({
    data: {
      caseId: case2.id,
      stageType: 'PENYIDIKAN',
      status: 'AKTIF',
      startedAt: new Date('2026-04-11'),
      createdById: admin.id,
    },
  });

  await prisma.article.create({
    data: {
      title: 'Pemasangan Police Line dan Pemeriksaan Direksi PT SJL',
      content: 'Kepolisian memasang garis polisi di lokasi konsesi konflik. Penyidik memanggil jajaran direksi korporasi sawit untuk verifikasi dokumen izin usaha perkebunan (IUP) dan hak guna usaha (HGU).',
      stageId: stage2Case2.id,
      authorId: admin.id,
    },
  });

  // 5. Create a Mock Contribution
  await prisma.caseContribution.create({
    data: {
      caseId: case2.id,
      userId: contributor.id,
      description: 'Saksi ahli adat baru saja selesai memberikan keterangan di Polda Sumut hari ini. Menyebutkan patok batas ulayat sah berdasarkan peta adat 1974.',
      status: 'PENDING',
      proofLinks: JSON.stringify(['https://news-mediaindo.com/sengketa-hutan-adat-talun-rebo-saksi-ahli']),
      proofFiles: JSON.stringify([]),
    }
  });

  console.log('✅ Data Mock Kasus, Timeline, Artikel, & Kontribusi berhasil ditanam.');
  console.log('🌱 Proses seeding data awal SELESAI!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
