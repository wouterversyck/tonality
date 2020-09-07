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

function getStringWithStartingPoint(startingPoint: number, height: number, scale: string[]): StringNote[] {
  const notes: StringNote[] = [];

  for (let i = 0; i < 17; i++) {
    let found = false;
    const numericNote = (i + startingPoint) % 12;
    if (numericNote === 0) {
      height++;
    }
    for (const note of scale) {
      if (numericKeys.get(note) === numericNote) {
        notes[i] = {
          note,
          height,
        };
        found = true;
      }
    }
    if (!found) {
      notes[i] = {};
    }
  }

  return notes;
}

export interface StringNote {
  note?: string;
  height?: number;
}

export interface ScaleOnStrings {
  lowE: StringNote[];
  b: StringNote[];
  g: StringNote[];
  d: StringNote[];
  a: StringNote[];
  highE: StringNote[];
}

export function createStringsForScale(scale: string[]): ScaleOnStrings {
  return {
    highE: getStringWithStartingPoint(5, 4, scale),
    b: getStringWithStartingPoint(0, 3, scale),
    g: getStringWithStartingPoint(8, 3, scale),
    d: getStringWithStartingPoint(3, 3, scale),
    a: getStringWithStartingPoint(10, 2, scale),
    lowE: getStringWithStartingPoint(5, 2, scale),
  };
}
