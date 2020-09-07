<template>
  <div class="chords">
    <v-card flat>
      <v-card-text>
        <table class="chords__table">
          <tr v-for="chord in chords" :key="chord[0]">
            <td @click="getChordInfo(chord[0])">{{ chord[0] }}</td>
            <td @click="getChordInfo(chord[1])">{{ chord[1] }}</td>
          </tr>
        </table>
      </v-card-text>
    </v-card>
    <div ref="chordInfo">
      <v-card v-if="chordInfo.name">
        <v-card-title>{{ chordInfo.name }} <v-icon @click="playChord(chordInfo.notes)">mdi-play</v-icon></v-card-title>
        <v-card-text>
          <span class="chords__chord-item" v-for="note in chordInfo.notes" :key="note">{{ note }}</span>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { MajorKey, MinorKey } from '@tonaljs/key';
import { Chord } from '@tonaljs/chord';
import { Chord as ChordLib } from '@tonaljs/tonal';
import { isMajor } from '@/helper-functions';
import { State } from 'vuex-class';
import { $inject } from '@vanroeybe/vue-inversify-plugin';
import { AudioService } from '@/services/audio-service';

@Component
export default class Scale extends Vue {
  chordInfo: Chord = {} as Chord;

  @State
  selectedKey!: MajorKey | MinorKey;

  @$inject()
  private audioService!: AudioService;

  getChordInfo(chord: string): void {
    this.chordInfo = ChordLib.get(chord);

    (this.$refs.chordInfo as HTMLElement).scrollIntoView();
  }

  get chords(): [string, string][] {
    if (isMajor(this.selectedKey)) {
      return this.selectedKey.chords.map(e => [this.removeSeventh(e), e]);
    }

    return this.selectedKey.natural.chords.map(e => [this.removeSeventh(e), e]);
  }

  playChord(notes: string[]) {
    this.audioService.soundNotes(notes.map(e => e + 3));
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
  .chords__table {
    td:first-child {
      padding-right: 50px;
    }
    td {
      cursor: pointer;
    }
    td:hover {
      font-weight: bold;
    }
    td:last-child {
      text-align: right;
    }
  }

  .chords__chord-item {
    margin-right: 15px;
  }
}
</style>
