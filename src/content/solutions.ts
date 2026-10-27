import type { Locale } from '../i18n';

type L = Record<Locale, string>;
type LList = Record<Locale, string[]>;

export interface Solution {
  slug: string;
  name: L; // short label used in nav and cards
  title: L;
  summary: L;
  body: L;
  capabilities: LList;
  /** Real process steps, shown as a numbered sequence on the detail page. */
  process?: { title: L; body: L }[];
}

// Copy carried over from the old /solutions/ page. Indonesian is a first translation for review.
export const solutions: Solution[] = [
  {
    slug: 'embedded-finance',
    name: { en: 'Embedded finance', id: 'Pembiayaan terintegrasi' },
    title: { en: 'Embedded finance & trade credit (Talangin)', id: 'Pembiayaan & kredit dagang terintegrasi (Talangin)' },
    summary: {
      en: 'Short-term working capital and trade credit built into every transaction.',
      id: 'Modal kerja jangka pendek dan kredit dagang yang menyatu dengan setiap transaksi.',
    },
    body: {
      en: 'PasarMIKRO funds trades in real time for verified users, so buyers and suppliers can trade faster, safer and at larger volumes.',
      id: 'PasarMIKRO mendanai transaksi secara real time untuk pengguna terverifikasi, sehingga pembeli dan pemasok dapat berdagang lebih cepat, aman, dan dalam volume lebih besar.',
    },
    capabilities: {
      en: [
        'Talangin working capital for inputs, stock procurement and order fulfilment',
        'Credit scoring from transaction history and partner verification',
        'Deferred-payment (TOP) bridging for trusted buyers and suppliers',
        'Advance PO financing and invoice-based settlement',
      ],
      id: [
        'Modal kerja Talangin untuk input, pengadaan stok, dan pemenuhan pesanan',
        'Penilaian kredit dari riwayat transaksi dan verifikasi mitra',
        'Jembatan pembayaran tempo (TOP) untuk pembeli dan pemasok tepercaya',
        'Pembiayaan PO di muka dan penyelesaian berbasis faktur',
      ],
    },
    // From the Talangin trade credit process diagram on the old site.
    process: [
      { title: { en: 'Purchase order', id: 'Pesanan pembelian' }, body: { en: 'The processor issues a PO.', id: 'Pengolah menerbitkan PO.' } },
      {
        title: { en: 'Credit allocation', id: 'Alokasi kredit' },
        body: { en: 'Up to 90% of the contract value is made available as credit.', id: 'Hingga 90% dari nilai kontrak tersedia sebagai kredit.' },
      },
      {
        title: { en: 'Commodity purchase', id: 'Pembelian komoditas' },
        body: { en: 'Suppliers buy the commodities from farmers.', id: 'Pemasok membeli komoditas dari petani.' },
      },
      {
        title: { en: 'Delivery confirmation', id: 'Konfirmasi pengiriman' },
        body: { en: 'The processor confirms the goods were received.', id: 'Pengolah mengonfirmasi barang telah diterima.' },
      },
      {
        title: { en: 'Final invoice', id: 'Faktur akhir' },
        body: { en: 'The invoice is verified in the PasarMIKRO app.', id: 'Faktur diverifikasi di aplikasi PasarMIKRO.' },
      },
      {
        title: { en: 'Payment settlement', id: 'Penyelesaian pembayaran' },
        body: { en: 'The processor settles the supplier’s invoice.', id: 'Pengolah melunasi faktur pemasok.' },
      },
    ],
  },
  {
    slug: 'trusted-trade',
    name: { en: 'Trusted trade', id: 'Perdagangan tepercaya' },
    title: { en: 'Trusted trade facilitation', id: 'Fasilitasi perdagangan tepercaya' },
    summary: {
      en: 'Secure, transparent workflows from deal confirmation to settlement.',
      id: 'Alur kerja yang aman dan transparan dari konfirmasi kesepakatan hingga penyelesaian.',
    },
    body: {
      en: 'Core digital infrastructure that lets informal traders and supply-chain actors transact with confidence in fulfilment, payment and traceability.',
      id: 'Infrastruktur digital inti yang memungkinkan pedagang informal dan pelaku rantai pasok bertransaksi dengan yakin atas pemenuhan, pembayaran, dan ketertelusuran.',
    },
    capabilities: {
      en: ['Deal confirmation workflows', 'Transaction tracking and proof', 'Notifications and payment anchoring', 'Integrated logistics and settlement'],
      id: ['Alur konfirmasi kesepakatan', 'Pelacakan dan bukti transaksi', 'Notifikasi dan penjaminan pembayaran', 'Logistik dan penyelesaian terintegrasi'],
    },
  },
  {
    slug: 'risk-credit',
    name: { en: 'Risk & credit', id: 'Risiko & kredit' },
    title: { en: 'Counterparty risk & credit assessment', id: 'Penilaian risiko & kredit mitra' },
    summary: {
      en: 'Digital profiling, KYC and credit scoring for safer lending and trade.',
      id: 'Profil digital, KYC, dan penilaian kredit untuk pembiayaan dan perdagangan yang lebih aman.',
    },
    body: {
      en: 'Due diligence and creditworthiness assessment at onboarding and continuously through behaviour tracking.',
      id: 'Uji tuntas dan penilaian kelayakan kredit saat pendaftaran dan secara berkelanjutan melalui pemantauan perilaku.',
    },
    capabilities: {
      en: ['KYC/AML data collection', 'Dynamic credit scoring', 'Buyer-verified trust tagging', 'Behavioural history and repayment reliability'],
      id: ['Pengumpulan data KYC/AML', 'Penilaian kredit dinamis', 'Penandaan kepercayaan terverifikasi pembeli', 'Riwayat perilaku dan keandalan pembayaran'],
    },
  },
  {
    slug: 'field-verification',
    name: { en: 'Field verification', id: 'Verifikasi lapangan' },
    title: { en: 'Field verification & inspection', id: 'Verifikasi & inspeksi lapangan' },
    summary: {
      en: 'On-the-ground stock surveys, inspections and sourcing checks.',
      id: 'Survei stok, inspeksi, dan pemeriksaan sumber langsung di lapangan.',
    },
    body: {
      en: 'Our field operations team runs physical checks of inventories, facilities and logistics, so buyers and funders can rely on more than the digital record.',
      id: 'Tim operasional lapangan kami melakukan pemeriksaan fisik atas stok, fasilitas, dan logistik, sehingga pembeli dan pendana tidak hanya mengandalkan catatan digital.',
    },
    capabilities: {
      en: ['Stock counting before financing', 'Warehouse and facility inspections for buyers or funders', 'Site verification for sourcing programs'],
      id: ['Penghitungan stok sebelum pembiayaan', 'Inspeksi gudang dan fasilitas untuk pembeli atau pendana', 'Verifikasi lokasi untuk program sumber pasok'],
    },
  },
  {
    slug: 'trade-insurance',
    name: { en: 'Trade insurance', id: 'Asuransi dagang' },
    title: { en: 'Integrated trade insurance', id: 'Asuransi dagang terintegrasi' },
    summary: {
      en: 'Cargo, warehouse and crop-linked protection for smallholder trade.',
      id: 'Perlindungan kargo, gudang, dan hasil panen untuk perdagangan petani kecil.',
    },
    body: {
      en: 'Access to insurance designed for smallholder-linked trade risk, including loss, damage and liability.',
      id: 'Akses ke asuransi yang dirancang untuk risiko perdagangan petani kecil, termasuk kehilangan, kerusakan, dan tanggung gugat.',
    },
    capabilities: {
      en: ['Cargo and transit insurance', 'Warehouse and storage insurance', 'Crop and harvest-linked coverage (coming)'],
      id: ['Asuransi kargo dan pengiriman', 'Asuransi gudang dan penyimpanan', 'Perlindungan terkait panen (segera)'],
    },
  },
  {
    slug: 'program-delivery',
    name: { en: 'Program delivery', id: 'Pelaksanaan program' },
    title: { en: 'Traceability & digitization programs', id: 'Program ketertelusuran & digitalisasi' },
    summary: {
      en: 'Co-designed sourcing, traceability and inclusion programs with global partners.',
      id: 'Program sumber pasok, ketertelusuran, dan inklusi yang dirancang bersama mitra global.',
    },
    body: {
      en: 'We co-develop and implement digitization programs for inclusive sourcing, traceability and financial inclusion with large buyers and institutions.',
      id: 'Kami mengembangkan dan menjalankan program digitalisasi untuk sumber pasok inklusif, ketertelusuran, dan inklusi keuangan bersama pembeli besar dan institusi.',
    },
    capabilities: {
      en: [
        'IKEA & Findora: rattan supply chain and home-weaver digitization',
        'Unilever: palm sugar traceability and sourcing compliance',
        'Upcoming work in cocoa, rice, kapok and seaweed',
      ],
      id: [
        'IKEA & Findora: rantai pasok rotan dan digitalisasi penganyam rumahan',
        'Unilever: ketertelusuran gula aren dan kepatuhan sumber pasok',
        'Program mendatang untuk kakao, beras, kapuk, dan rumput laut',
      ],
    },
  },
  {
    slug: 'institutional-tools',
    name: { en: 'Institutional tools', id: 'Solusi institusi' },
    title: { en: 'Institutional deployment & white-label', id: 'Penerapan institusi & white-label' },
    summary: {
      en: 'Custom deployments and dashboards for processors, cooperatives, NGOs and DFIs.',
      id: 'Penerapan khusus dan dasbor untuk pengolah, koperasi, LSM, dan lembaga pembiayaan pembangunan.',
    },
    body: {
      en: 'A platform set up around your organisation, with your own workflows, data and reporting.',
      id: 'Platform yang disesuaikan dengan organisasi Anda, dengan alur kerja, data, dan pelaporan Anda sendiri.',
    },
    capabilities: {
      en: ['Mirror databases', 'Custom workflows', 'Reporting dashboards', 'Embedded monitoring tools'],
      id: ['Basis data cermin', 'Alur kerja khusus', 'Dasbor pelaporan', 'Alat pemantauan terintegrasi'],
    },
  },
  {
    slug: 'mikro-erp',
    name: { en: 'Mikro ERP', id: 'Mikro ERP' },
    title: { en: 'Mikro ERP', id: 'Mikro ERP' },
    summary: {
      en: 'Mobile-first ERP for smallholder-based agri-businesses and cooperatives.',
      id: 'ERP berbasis ponsel untuk usaha agri dan koperasi berbasis petani kecil.',
    },
    body: {
      en: 'Digitize purchases, sales, inventory, orders and payments, and connect that data to PasarMIKRO finance and traceability.',
      id: 'Digitalkan pembelian, penjualan, stok, pesanan, dan pembayaran, lalu hubungkan datanya dengan pembiayaan dan ketertelusuran PasarMIKRO.',
    },
    capabilities: {
      en: [
        'Inventory and order management',
        'Simple ledger for receivables, payables and cash flow',
        'Direct link to the PasarMIKRO marketplace and financing',
        'Multi-user access for managers, traders and staff',
      ],
      id: [
        'Manajemen stok dan pesanan',
        'Pembukuan sederhana untuk piutang, utang, dan arus kas',
        'Terhubung langsung dengan marketplace dan pembiayaan PasarMIKRO',
        'Akses multi-pengguna untuk pengelola, pedagang, dan staf',
      ],
    },
  },
];
