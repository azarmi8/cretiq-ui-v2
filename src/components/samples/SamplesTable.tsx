/**
 * SamplesTable — Full concrete sample registry
 * 
 * Strength conventions:
 * - Cube strengths entered in kg/cm² (specimen-level)
 * - Mean cube = average of available specimens (1 or 2)
 * - Mean cylinder (MPa) = meanCube × 0.8 × 0.0980665
 * - Quality is classified relative to strengthClass target
 */

import { useTranslation } from 'react-i18next';
import { DataTable, type ColumnDef, StatusBadge, type StatusVariant } from '../../design-system';
import { usePersianNumber } from '../../design-system';
import type { Sample } from '../../data/samples';
import { QualityBadge, classify7d, classify28d } from './QualityBadge';

const STATUS_MAP: Record<Sample['status'], { variant: StatusVariant; key: string }> = {
  curing: { variant: 'live', key: 'sample.status.curing' },
  ready: { variant: 'info', key: 'sample.status.ready' },
  warning: { variant: 'warning', key: 'sample.status.warning' },
  danger: { variant: 'danger', key: 'sample.status.danger' },
};

// ── Conversion constants ──
const CUBE_TO_CYLINDER = 0.8;
const KGCM2_TO_MPA = 0.0980665;
const CUBE_TO_CYLINDER_NOMINAL = 1.25; // inverse of 0.8

/**
 * Nominal 28-day cube strength (kg/cm²) derived from concrete class.
 * C30 → 30 MPa (cylinder) → 37.5 MPa (cube) → ~382 kg/cm²
 */
function target28dCubeKgCm2(strengthClass: string): number | null {
  const match = strengthClass.match(/C(\d+)/);
  if (!match) return null;
  const cylinderMPa = parseInt(match[1], 10);
  const cubeMPa = cylinderMPa * CUBE_TO_CYLINDER_NOMINAL;
  return cubeMPa / KGCM2_TO_MPA;
}

function meanCube(a: number | null, b: number | null): number | null {
  if (a === null && b === null) return null;
  if (a === null) return b;
  if (b === null) return a;
  return (a + b) / 2;
}

function meanCylinderMPa(a: number | null, b: number | null): number | null {
  const mean = meanCube(a, b);
  if (mean === null) return null;
  return mean * CUBE_TO_CYLINDER * KGCM2_TO_MPA;
}

export function SamplesTable({ rows }: { rows: Sample[] }) {
  const { t } = useTranslation();
  const { format, formatFixed } = usePersianNumber();

  const num = (v: number | null, decimals = 0): string => {
    if (v === null) return '—';
    return decimals > 0 ? formatFixed(v, decimals) : format(v);
  };

  const columns: ColumnDef<Sample>[] = [
    // ── Identity ──
    { id: 'rowNumber', header: t('samples.columns.rowNumber'), group: t('samples.groups.identity'), width: 60, align: 'center',
      render: (r) => <span className="font-mono text-[#475569]">{format(r.rowNumber)}</span> },
    { id: 'specimenNo', header: t('samples.columns.specimenNo'), group: t('samples.groups.identity'), width: 130,
      render: (r) => <span className="font-mono text-[#45D483] font-bold">{r.specimenNo}</span> },
    { id: 'waybillNo', header: t('samples.columns.waybillNo'), group: t('samples.groups.identity'), width: 140,
      render: (r) => <span className="font-mono text-[#2DE2E6]">{r.waybillNo}</span> },
    { id: 'clientLabSpecimenNo', header: t('samples.columns.clientLabSpecimenNo'), group: t('samples.groups.identity'), width: 160,
      render: (r) => <span className="font-mono text-[#94A3B8]">{r.clientLabSpecimenNo}</span> },
    { id: 'sampledTime', header: t('samples.columns.sampledTime'), group: t('samples.groups.identity'), width: 90, align: 'center',
      render: (r) => <span className="font-mono text-[#94A3B8]">{r.sampledTime}</span> },
    { id: 'sampledDate', header: t('samples.columns.sampledDate'), group: t('samples.groups.identity'), width: 120,
      render: (r) => <span className="font-mono text-[#94A3B8]">{r.sampledDate}</span> },
    { id: 'clientName', header: t('samples.columns.clientName'), group: t('samples.groups.identity'), width: 180,
      render: (r) => <span>{r.clientName}</span> },
    { id: 'projectAddress', header: t('samples.columns.projectAddress'), group: t('samples.groups.identity'), width: 220,
      render: (r) => <span className="text-[#94A3B8]">{r.projectAddress}</span> },

    // ── Technical ──
    { id: 'concreteType', header: t('samples.columns.concreteType'), group: t('samples.groups.technical'), width: 110,
      render: (r) => <span>{r.concreteType}</span> },
    { id: 'strengthClass', header: t('samples.columns.strengthClass'), group: t('samples.groups.technical'), width: 100, align: 'center',
      render: (r) => <span className="px-2 py-0.5 rounded-md bg-[#45D483]/10 border border-[#45D483]/30 text-[#45D483] text-[11px] font-mono font-bold">{r.strengthClass}</span> },
    { id: 'mixDesignCode', header: t('samples.columns.mixDesignCode'), group: t('samples.groups.technical'), width: 120,
      render: (r) => <span className="font-mono text-[#94A3B8]">{r.mixDesignCode}</span> },
    { id: 'sectionLabel', header: t('samples.columns.sectionLabel'), group: t('samples.groups.technical'), width: 110,
      render: (r) => <span>{r.sectionLabel}</span> },
    { id: 'batchingDetails', header: t('samples.columns.batchingDetails'), group: t('samples.groups.technical'), width: 140,
      render: (r) => <span className="text-[#94A3B8]">{r.batchingDetails}</span> },
    { id: 'breakerName', header: t('samples.columns.breakerName'), group: t('samples.groups.technical'), width: 140,
      render: (r) => <span className="text-[#94A3B8]">{r.breakerName}</span> },
    { id: 'samplerName', header: t('samples.columns.samplerName'), group: t('samples.groups.technical'), width: 120,
      render: (r) => <span>{r.samplerName}</span> },
    { id: 'mixerDriver', header: t('samples.columns.mixerDriver'), group: t('samples.groups.technical'), width: 180,
      render: (r) => <span className="font-mono text-[#94A3B8]">{r.mixerDriver}</span> },
    { id: 'pumpDetails', header: t('samples.columns.pumpDetails'), group: t('samples.groups.technical'), width: 140,
      render: (r) => <span className="text-[#94A3B8]">{r.pumpDetails}</span> },
    { id: 'notes', header: t('samples.columns.notes'), group: t('samples.groups.technical'), width: 180,
      render: (r) => <span className="text-[#94A3B8]">{r.notes}</span> },

    // ── Fresh Concrete ──
    { id: 'airRecorded', header: t('samples.columns.airRecorded'), group: t('samples.groups.fresh'), width: 80, align: 'center',
      render: (r) => <span className="font-mono">{num(r.airRecorded, 1)}</span> },
    { id: 'specificWeight', header: t('samples.columns.specificWeight'), group: t('samples.groups.fresh'), width: 100, align: 'center',
      render: (r) => <span className="font-mono">{num(r.specificWeight, 2)}</span> },
    { id: 'temperature', header: t('samples.columns.temperature'), group: t('samples.groups.fresh'), width: 90, align: 'center',
      render: (r) => <span className="font-mono">{num(r.temperature, 1)}</span> },
    { id: 'slump', header: t('samples.columns.slump'), group: t('samples.groups.fresh'), width: 100, align: 'center',
      render: (r) => <span className="font-mono">{num(r.slump, 1)}</span> },

    // ── 7-Day ──
    { id: 'weight7d1', header: t('samples.columns.weight7d1'), group: t('samples.groups.day7'), width: 100, align: 'center',
      render: (r) => <span className="font-mono">{num(r.weight7d1)}</span> },
    { id: 'weight7d2', header: t('samples.columns.weight7d2'), group: t('samples.groups.day7'), width: 100, align: 'center',
      render: (r) => <span className="font-mono">{num(r.weight7d2)}</span> },
    { id: 'strength7d1', header: t('samples.columns.strength7d1'), group: t('samples.groups.day7'), width: 130, align: 'center',
      render: (r) => <span className="font-mono text-[#94A3B8]">{num(r.strength7d1)}</span> },
    { id: 'strength7d2', header: t('samples.columns.strength7d2'), group: t('samples.groups.day7'), width: 130, align: 'center',
      render: (r) => <span className="font-mono text-[#94A3B8]">{num(r.strength7d2)}</span> },
    {
      id: 'mean7dCube',
      header: t('samples.columns.mean7dCube'),
      group: t('samples.groups.day7'),
      width: 140, align: 'center',
      render: (r) => {
        const m = meanCube(r.strength7d1, r.strength7d2);
        return <span className="font-mono text-[#45D483] font-bold">{m === null ? '—' : format(m.toFixed(0))}</span>;
      },
    },
    {
      id: 'mean7dCylinder',
      header: t('samples.columns.mean7dCylinder'),
      group: t('samples.groups.day7'),
      width: 200, align: 'center',
      render: (r) => {
        const m = meanCylinderMPa(r.strength7d1, r.strength7d2);
        const target = target28dCubeKgCm2(r.strengthClass);
        const meanCubeVal = meanCube(r.strength7d1, r.strength7d2);
        const pct = (target !== null && meanCubeVal !== null) ? meanCubeVal / target : null;
        const level = classify7d(pct);
        return <QualityBadge level={level} value={m} unit="MPa" percent={pct} />;
      },
    },

    // ── 28-Day ──
    { id: 'weight28d1', header: t('samples.columns.weight28d1'), group: t('samples.groups.day28'), width: 100, align: 'center',
      render: (r) => <span className="font-mono">{num(r.weight28d1)}</span> },
    { id: 'weight28d2', header: t('samples.columns.weight28d2'), group: t('samples.groups.day28'), width: 100, align: 'center',
      render: (r) => <span className="font-mono">{num(r.weight28d2)}</span> },
    { id: 'strength28d1', header: t('samples.columns.strength28d1'), group: t('samples.groups.day28'), width: 130, align: 'center',
      render: (r) => <span className="font-mono text-[#94A3B8]">{num(r.strength28d1)}</span> },
    { id: 'strength28d2', header: t('samples.columns.strength28d2'), group: t('samples.groups.day28'), width: 130, align: 'center',
      render: (r) => <span className="font-mono text-[#94A3B8]">{num(r.strength28d2)}</span> },
    {
      id: 'mean28dCube',
      header: t('samples.columns.mean28dCube'),
      group: t('samples.groups.day28'),
      width: 140, align: 'center',
      render: (r) => {
        const m = meanCube(r.strength28d1, r.strength28d2);
        return <span className="font-mono text-[#45D483] font-bold">{m === null ? '—' : format(m.toFixed(0))}</span>;
      },
    },
    {
      id: 'mean28dCylinder',
      header: t('samples.columns.mean28dCylinder'),
      group: t('samples.groups.day28'),
      width: 200, align: 'center',
      render: (r) => {
        const m = meanCylinderMPa(r.strength28d1, r.strength28d2);
        const target = target28dCubeKgCm2(r.strengthClass);
        const meanCubeVal = meanCube(r.strength28d1, r.strength28d2);
        const pct = (target !== null && meanCubeVal !== null) ? meanCubeVal / target : null;
        const level = classify28d(pct);
        return <QualityBadge level={level} value={m} unit="MPa" percent={pct} />;
      },
    },

    // ── 90-Day ──
    { id: 'weight90d', header: t('samples.columns.weight90d'), group: t('samples.groups.day90'), width: 100, align: 'center',
      render: (r) => <span className="font-mono">{num(r.weight90d)}</span> },
    { id: 'strength90d', header: t('samples.columns.strength90d'), group: t('samples.groups.day90'), width: 130, align: 'center',
      render: (r) => <span className="font-mono text-[#94A3B8]">{num(r.strength90d)}</span> },
    {
      id: 'cylinder90d',
      header: t('samples.columns.cylinder90d'),
      group: t('samples.groups.day90'),
      width: 200, align: 'center',
      render: (r) => {
        const m = meanCylinderMPa(r.strength90d, null);
        const target = target28dCubeKgCm2(r.strengthClass);
        const pct = (target !== null && r.strength90d !== null) ? r.strength90d / target : null;
        const level = classify28d(pct);
        return <QualityBadge level={level} value={m} unit="MPa" percent={pct} />;
      },
    },

    // ── Status ──
    {
      id: 'status',
      header: t('samples.groups.status'),
      group: t('samples.groups.status'),
      width: 130, align: 'center',
      render: (r) => {
        const cfg = STATUS_MAP[r.status];
        return <StatusBadge variant={cfg.variant} dot>{t(cfg.key)}</StatusBadge>;
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={rows}
      getRowKey={(r) => r.id}
      stickyColumns={2}
    />
  );
}
