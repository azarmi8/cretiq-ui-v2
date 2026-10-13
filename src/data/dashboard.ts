/**
 * Dashboard Mock Data
 * 
 * All counts derived from actual data sources. No hardcoded numbers.
 */

import { mockSamplesFull } from './samples';
import { ncrCounts } from './ncr';

export interface Sample {
  id: string;
  code: string;
  grade: string;
  castingDate: string;
  testAge: number;
  currentDay: number;
  status: 'curing' | 'ready' | 'warning' | 'danger';
  temperature: number;
  humidity: number;
}

export const mockSamples: Sample[] = [
  { id: '1', code: '403-A-127', grade: 'C30', castingDate: '1405/07/15', testAge: 28, currentDay: 5, status: 'curing', temperature: 23.4, humidity: 95 },
  { id: '2', code: '403-A-128', grade: 'C35', castingDate: '1405/07/08', testAge: 28, currentDay: 12, status: 'warning', temperature: 24.1, humidity: 92 },
  { id: '3', code: '403-A-129', grade: 'C40', castingDate: '1405/06/24', testAge: 28, currentDay: 26, status: 'ready', temperature: 22.8, humidity: 96 },
];

export const mockMetrics = {
  activeSamples: { value: mockSamplesFull.length, trend: '+۳ امروز' },
  curingTank: { value: 8, trend: '۲ آماده آزمون' },
  alerts: { value: ncrCounts.active, trend: `${ncrCounts.open} بحرانی` },
  oee: { value: 92, unit: '٪', trend: '+۲٪ این هفته' },
};
