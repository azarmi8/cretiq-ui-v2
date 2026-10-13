/**
 * Sample Data Model — Cretiq v2
 * 
 * Strength values are stored in kg/cm² (cube 15×15).
 * Cylinder MPa is derived in the view layer.
 */

export interface Sample {
  id: string;
  rowNumber: number;
  specimenNo: string;
  clientLabSpecimenNo: string;
  waybillNo: string;
  sampledDate: string;
  sampledTime: string;
  clientName: string;
  projectAddress: string;

  concreteType: string;
  strengthClass: string;
  mixDesignCode: string;
  sectionLabel: string;
  batchingDetails: string;
  breakerName: string;
  samplerName: string;
  mixerDriver: string;
  pumpDetails: string;
  notes: string;

  airRecorded: number | null;
  specificWeight: number | null;
  temperature: number | null;
  slump: number | null;

  // ── Cube strengths in kg/cm² ──
  weight7d1: number | null;
  weight7d2: number | null;
  strength7d1: number | null;
  strength7d2: number | null;

  weight28d1: number | null;
  weight28d2: number | null;
  strength28d1: number | null;
  strength28d2: number | null;

  weight90d: number | null;
  strength90d: number | null;

  status: 'curing' | 'ready' | 'warning' | 'danger';
}

export const mockSamplesFull: Sample[] = [
  {
    id: 's-001', rowNumber: 1,
    specimenNo: '403-A-127', clientLabSpecimenNo: 'LAB-1405-127', waybillNo: 'WB-1405-0412',
    sampledTime: '09:30', sampledDate: '1405/07/15',
    clientName: 'ساختمانیان پاسارگاد',
    projectAddress: 'تهران، سعادت‌آباد، بلوار دریا',
    concreteType: 'بتن آماده', strengthClass: 'C30', mixDesignCode: 'MD-C30-04',
    sectionLabel: 'فونداسیون', batchingDetails: 'بچ ۳۸، خط A', breakerName: 'مکعب شکن ۱۵×۱۵',
    samplerName: 'علی رضایی', mixerDriver: 'ایران ۷۷ - ۲۳۴ ب ۱۲', pumpDetails: 'پمپ ۳۲ متری',
    notes: 'بدون مشکل',
    airRecorded: 2.1, specificWeight: 2.38, temperature: 23.4, slump: 12.5,
    weight7d1: 8210, weight7d2: 8180, strength7d1: 224, strength7d2: 218,
    weight28d1: null, weight28d2: null, strength28d1: null, strength28d2: null,
    weight90d: null, strength90d: null,
    status: 'curing',
  },
  {
    id: 's-002', rowNumber: 2,
    specimenNo: '403-A-128', clientLabSpecimenNo: 'LAB-1405-128', waybillNo: 'WB-1405-0413',
    sampledTime: '14:15', sampledDate: '1405/07/08',
    clientName: 'عمران سازه گستر',
    projectAddress: 'کرج، مهرشهر، خیابان گلستان',
    concreteType: 'بتن آماده', strengthClass: 'C35', mixDesignCode: 'MD-C35-07',
    sectionLabel: 'ستون', batchingDetails: 'بچ ۴۲، خط B', breakerName: 'مکعب شکن ۱۵×۱۵',
    samplerName: 'محمد کریمی', mixerDriver: 'ایران ۷۸ - ۴۵۶ ج ۹۰', pumpDetails: 'پمپ ۴۰ متری',
    notes: 'افزودنی کندگیر',
    airRecorded: 1.9, specificWeight: 2.41, temperature: 24.1, slump: 14.0,
    weight7d1: 8320, weight7d2: 8300, strength7d1: 261, strength7d2: 256,
    weight28d1: null, weight28d2: null, strength28d1: null, strength28d2: null,
    weight90d: null, strength90d: null,
    status: 'warning',
  },
  {
    id: 's-003', rowNumber: 3,
    specimenNo: '403-A-129', clientLabSpecimenNo: 'LAB-1405-129', waybillNo: 'WB-1405-0414',
    sampledTime: '11:00', sampledDate: '1405/06/24',
    clientName: 'توسعه ساختمان البرز',
    projectAddress: 'تهران، پونک، بلوار همیلا',
    concreteType: 'بتن آماده', strengthClass: 'C40', mixDesignCode: 'MD-C40-02',
    sectionLabel: 'دال', batchingDetails: 'بچ ۵۱، خط A', breakerName: 'مکعب شکن ۱۵×۱۵',
    samplerName: 'حسین نوری', mixerDriver: 'ایران ۷۹ - ۸۹۰ د ۳۳', pumpDetails: 'پمپ ۳۷ متری',
    notes: 'مقاومت بالا',
    airRecorded: 2.0, specificWeight: 2.42, temperature: 22.8, slump: 11.0,
    weight7d1: 8400, weight7d2: 8380, strength7d1: 305, strength7d2: 298,
    weight28d1: 8410, weight28d2: 8395, strength28d1: 423, strength28d2: 416,
    weight90d: null, strength90d: null,
    status: 'ready',
  },
  {
    id: 's-004', rowNumber: 4,
    specimenNo: '403-A-130', clientLabSpecimenNo: 'LAB-1405-130', waybillNo: 'WB-1405-0415',
    sampledTime: '08:45', sampledDate: '1405/07/16',
    clientName: 'پیمانکاری آریا',
    projectAddress: 'تهران، ولنجک، خیابان یکم',
    concreteType: 'بتن آماده', strengthClass: 'C25', mixDesignCode: 'MD-C25-01',
    sectionLabel: 'دیوار برشی', batchingDetails: 'بچ ۳۹، خط A', breakerName: 'مکعب شکن ۱۰×۱۰',
    samplerName: 'رضا احمدی', mixerDriver: 'ایران ۸۰ - ۱۲۳ الف ۵۵', pumpDetails: '—',
    notes: '—',
    airRecorded: 2.3, specificWeight: 2.36, temperature: 25.0, slump: 13.0,
    weight7d1: 8050, weight7d2: 8020, strength7d1: 182, strength7d2: 179,
    weight28d1: null, weight28d2: null, strength28d1: null, strength28d2: null,
    weight90d: null, strength90d: null,
    status: 'curing',
  },
  {
    id: 's-005', rowNumber: 5,
    specimenNo: '403-A-131', clientLabSpecimenNo: 'LAB-1405-131', waybillNo: 'WB-1405-0416',
    sampledTime: '16:20', sampledDate: '1405/07/02',
    clientName: 'سازه پایدار',
    projectAddress: 'تهران، شهرک غرب، فاز ۳',
    concreteType: 'بتن آماده', strengthClass: 'C30', mixDesignCode: 'MD-C30-05',
    sectionLabel: 'تیر', batchingDetails: 'بچ ۴۴، خط B', breakerName: 'مکعب شکن ۱۵×۱۵',
    samplerName: 'علی رضایی', mixerDriver: 'ایران ۸۱ - ۷۷۷ ب ۴۴', pumpDetails: 'پمپ ۳۲ متری',
    notes: 'شرایط جوی نامساعد',
    airRecorded: 2.4, specificWeight: 2.37, temperature: 26.8, slump: 15.5,
    weight7d1: 8120, weight7d2: 8100, strength7d1: 201, strength7d2: 194,
    weight28d1: 8150, weight28d2: 8130, strength28d1: 287, strength28d2: 281,
    weight90d: null, strength90d: null,
    status: 'warning',
  },
  {
    id: 's-006', rowNumber: 6,
    specimenNo: '403-A-132', clientLabSpecimenNo: 'LAB-1405-132', waybillNo: 'WB-1405-0417',
    sampledTime: '10:10', sampledDate: '1405/06/15',
    clientName: 'عمران نوین',
    projectAddress: 'تهران، نیاوران، خیابان شهید باهنر',
    concreteType: 'بتن آماده', strengthClass: 'C45', mixDesignCode: 'MD-C45-01',
    sectionLabel: 'ستون', batchingDetails: 'بچ ۵۵، خط A', breakerName: 'مکعب شکن ۱۵×۱۵',
    samplerName: 'محمد کریمی', mixerDriver: 'ایران ۸۲ - ۵۵۵ ج ۱۲', pumpDetails: 'پمپ ۴۵ متری',
    notes: 'پروژه ویژه',
    airRecorded: 1.8, specificWeight: 2.44, temperature: 21.5, slump: 10.0,
    weight7d1: 8500, weight7d2: 8480, strength7d1: 335, strength7d2: 329,
    weight28d1: 8510, weight28d2: 8495, strength28d1: 482, strength28d2: 476,
    weight90d: 8520, strength90d: 521,
    status: 'ready',
  },
  {
    id: 's-007', rowNumber: 7,
    specimenNo: '403-A-133', clientLabSpecimenNo: 'LAB-1405-133', waybillNo: 'WB-1405-0418',
    sampledTime: '13:30', sampledDate: '1405/07/18',
    clientName: 'ساختمانیان پارس',
    projectAddress: 'تهران، اکباتان، فاز ۲',
    concreteType: 'بتن آماده', strengthClass: 'C30', mixDesignCode: 'MD-C30-06',
    sectionLabel: 'فونداسیون', batchingDetails: 'بچ ۴۶، خط A', breakerName: 'مکعب شکن ۱۵×۱۵',
    samplerName: 'حسین نوری', mixerDriver: 'ایران ۸۳ - ۲۲۲ د ۷۷', pumpDetails: 'پمپ ۳۲ متری',
    notes: '—',
    airRecorded: 2.0, specificWeight: 2.39, temperature: 23.9, slump: 12.0,
    weight7d1: 8180, weight7d2: 8160, strength7d1: 215, strength7d2: 210,
    weight28d1: null, weight28d2: null, strength28d1: null, strength28d2: null,
    weight90d: null, strength90d: null,
    status: 'curing',
  },
  {
    id: 's-008', rowNumber: 8,
    specimenNo: '403-A-134', clientLabSpecimenNo: 'LAB-1405-134', waybillNo: 'WB-1405-0419',
    sampledTime: '09:00', sampledDate: '1405/07/19',
    clientName: 'پیمانکاری مهر',
    projectAddress: 'تهران، جردن، خیابان ناهید',
    concreteType: 'بتن آماده', strengthClass: 'C35', mixDesignCode: 'MD-C35-08',
    sectionLabel: 'دال', batchingDetails: 'بچ ۴۷، خط B', breakerName: 'مکعب شکن ۱۵×۱۵',
    samplerName: 'علی رضایی', mixerDriver: 'ایران ۸۴ - ۹۹۹ الف ۱۱', pumpDetails: 'پمپ ۳۷ متری',
    notes: 'افزودنی فوق روان‌کننده',
    airRecorded: 2.2, specificWeight: 2.40, temperature: 22.5, slump: 14.5,
    weight7d1: 8260, weight7d2: 8240, strength7d1: 250, strength7d2: 245,
    weight28d1: null, weight28d2: null, strength28d1: null, strength28d2: null,
    weight90d: null, strength90d: null,
    status: 'curing',
  },
];
