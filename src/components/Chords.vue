<template>
  <div class="chords">
    <div class="chords__listing">
      <div v-for="chord in chords" :key="chord[0]">
        <span class="chords__chord-item" @click="getChordInfo(chord[0])">
          {{ chord[0] }}
        </span>
        <span class="chords__chord-item" @click="getChordInfo(chord[1])">
          {{ chord[1] }}
        </span>
      </div>
    </div>
    <div class="chords__details" v-if="chordInfo.name">
      <p>{{ chordInfo.name }}</p>
      <p>
        <span class="chords__chord-item" v-for="note in chordInfo.notes" :key="note">{{ note }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { MajorKey, MinorKey } from '@tonaljs/key';
import { Chord } from '@tonaljs/chord';
import { Chord as ChordLib } from '@tonaljs/tonal';
import { isMajor } from '@/helper-functions';

@Component
export default class Scale extends Vue {
  @Prop()
  mKey!: MajorKey | MinorKey;

  chordInfo: Chord = {} as Chord;

  getChordInfo(chord: string): void {
    this.chordInfo = ChordLib.get(chord);
  }

  get chords(): [string, string][] {
    if (isMajor(this.mKey)) {
      return this.mKey.chords.map(e => [this.removeSeventh(e), e]);
    }

    return this.mKey.natural.chords.map(e => [this.removeSeventh(e), e]);
  }

  @Watch('mKey')
  private clearChordInfo(): void {
    this.chordInfo = {} as Chord;
  }

  private removeSeventh(chordString: string): string {
    const chord = ChordLib.get(chordString);
    let name = '' + chord.tonic;
    if (chord.quality === 'Minor') {
      name += 'm';
    }
    if (chord.quality === 'Diminished') {
      name += 'dim';
    }

    return name;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chords {
  margin: 15px;
  .chords__chord-item {
    margin: 5px;
  }
}
</style>
