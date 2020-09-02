import { MajorKey, MinorKey } from '@tonaljs/key';

export function isMajor(key?: MajorKey | MinorKey): key is MajorKey {
  return key?.type === 'major';
}

export const keys = [
  'C',
  'C#',
  'Cm',
  'C#m',
  'D',
  'Dm',
  'Eb',
  'Ebm',
  'E',
  'Em',
  'F',
  'F#',
  'Fm',
  'F#m',
  'G',
  'Gm',
  'Ab',
  'A',
  'Abm',
  'Am',
  'Bb',
  'B',
  'Bbm',
  'Bm',
];

export const numericKeys = new Map([
  ['C', 0],
  ['C#', 1],
  ['Db', 1],
  ['D', 2],
  ['D#', 3],
  ['Eb', 3],
  ['E', 4],
  ['Fb', 4],
  ['F', 5],
  ['E#', 5],
  ['F#', 6],
  ['Gb', 6],
  ['G', 7],
  ['G#', 8],
  ['Ab', 8],
  ['A', 9],
  ['A#', 10],
  ['Bb', 10],
  ['B', 11],
]);

function getStringWithStartingPoint(startingPoint: number, scale: string[]): string[] {
  const notes: string[] = [];

  for (let i = 0; i < 17; i++) {
    let found = false;
    const numericNote = (i + startingPoint) % 12;
    for (const note of scale) {
      if (numericKeys.get(note) === numericNote) {
        notes[i] = note;
        found = true;
      }
    }
    if (!found) {
      notes[i] = '';
    }
  }

  return notes;
}

export interface ScaleOnStrings {
  e: string[];
  b: string[];
  g: string[];
  d: string[];
  a: string[];
}

export function createStringsForScale(scale: string[]): ScaleOnStrings {
  return {
    e: getStringWithStartingPoint(5, scale),
    b: getStringWithStartingPoint(0, scale),
    g: getStringWithStartingPoint(8, scale),
    d: getStringWithStartingPoint(3, scale),
    a: getStringWithStartingPoint(10, scale),
  };
}
