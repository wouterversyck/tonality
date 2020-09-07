import { now, PolySynth } from 'tone';
import { injectable } from 'inversify';

@injectable()
class AudioServiceImpl implements AudioService {
  synth?: PolySynth;

  constructor() {
    this.synth = new PolySynth().toDestination();
  }

  soundNote(note: string): void {
    this.synth?.triggerAttackRelease(note, 1);
  }

  soundNotes(notes: string[]) {
    const time = now();
    for (const [index, note] of notes.entries()) {
      this.synth?.triggerAttack(note, time + index / 2);
    }
    this.synth?.triggerRelease(notes, time + 3);
  }

  dispose(): void {
    this.synth?.dispose();
  }
}

interface AudioService {
  soundNote(note: string): void;
  soundNotes(note: string[]): void;
  dispose(): void;
}

export { AudioServiceImpl, AudioService };
