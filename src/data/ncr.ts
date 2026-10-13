/**
 * NCR data — extracted for use across dashboard, sidebar, and future pages.
 */

export interface NCR {
  id: string;
  code: string;
  title: string;
  sampleRef: string;
  severity: 'critical' | 'major' | 'minor';
  status: 'open' | 'investigating' | 'resolved';
  reportedAt: string;
  category: string;
}

export const mockNCRs: NCR[] = [
  { id: '1', code: 'NCR-1405-042', title: 'اسلامپ خارج از محدوده مجاز', sampleRef: '403-A-125', severity: 'major', status: 'investigating', reportedAt: '۱۴۰۵/۰۷/۱۴', category: 'کارایی' },
  { id: '2', code: 'NCR-1405-041', title: 'مقاومت ۷ روزه زیر حد قابل قبول', sampleRef: '403-A-122', severity: 'critical', status: 'open', reportedAt: '۱۴۰۵/۰۷/۱۲', category: 'مقاومت' },
  { id: '3', code: 'NCR-1405-040', title: 'دمای بتن تازه بالاتر از حد مجاز', sampleRef: '403-A-119', severity: 'minor', status: 'resolved', reportedAt: '۱۴۰۵/۰۷/۰۹', category: 'دما' },
];

export const ncrCounts = {
  total: mockNCRs.length,
  open: mockNCRs.filter((n) => n.status === 'open').length,
  investigating: mockNCRs.filter((n) => n.status === 'investigating').length,
  resolved: mockNCRs.filter((n) => n.status === 'resolved').length,
  active: mockNCRs.filter((n) => n.status !== 'resolved').length,
};
