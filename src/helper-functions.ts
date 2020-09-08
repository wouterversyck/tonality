import { MajorKey, MinorKey } from '@tonaljs/key';

export function isMajor(key?: MajorKey | MinorKey): key is MajorKey {
  return key?.type === 'major';
}

const chordToDiagramMappings = new Map([
  [
    'A',
    {
      chord: 'A',
      nrImages: 8,
      basePath: '/img/chords/a/',
      extension: '.png',
    },
  ],
  [
    'A#',
    {
      chord: 'A_sharp',
      nrImages: 5,
      basePath: '/img/chords/a_sharp/',
      extension: '.png',
    },
  ],
  [
    'Bb',
    {
      chord: 'A_sharp',
      nrImages: 5,
      basePath: '/img/chords/a_sharp/',
      extension: '.png',
    },
  ],
]);

export function getImagesForChord(chord: string) {
  const imageMap = chordToDiagramMappings.get(chord);

  if (!imageMap) {
    return [];
  }

  const images = [];
  for (let i = 0; i < imageMap.nrImages; i++) {
    images.push(`${imageMap.basePath}${imageMap.chord}-${i}${imageMap.extension}`);
  }

  return images;
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
  ['B#', 0],
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

function getStringWithStartingPoint(startingPoint: number, height: number, scale: string[]): NullableNote[] {
  const notes: NullableNote[] = [];

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
        break;
      }
    }
    if (!found) {
      notes[i] = null;
    }
  }

  return notes;
}

export interface StringNote {
  note: string;
  height: number;
}

export type NullableNote = StringNote | null;

export interface ScaleOnStrings {
  lowE: NullableNote[];
  b: NullableNote[];
  g: NullableNote[];
  d: NullableNote[];
  a: NullableNote[];
  highE: NullableNote[];
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

export function mapNotesUpward(notes: string[], startingHeight: number): string[] {
  const result = [...notes];
  for (let i = 0; i < result.length - 1; i++) {
    const a = numericKeys.get(result[i]) as number;
    const b = numericKeys.get(result[i + 1]) as number;

    result[i] += startingHeight;

    if (a > b) {
      startingHeight++;
    }
  }
  result[result.length - 1] += startingHeight;

  return result;
}
