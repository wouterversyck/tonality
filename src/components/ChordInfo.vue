<template>
  <v-card v-if="chord">
    <v-card-title>{{ chord.name }} <v-icon @click="playChord(chord.notes)">mdi-play</v-icon></v-card-title>
    <v-card-text>
      <span class="chords__chord-item" v-for="note in chord.notes" :key="note">{{ note }}</span>
    </v-card-text>
    <v-card-text>
      <img alt="chord diagram" v-for="img in chordImages" :key="img" :src="img" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Chord } from '@tonaljs/chord';
import { getImagesForChord, mapNotesUpward } from '@/helper-functions';
import { $inject } from '@vanroeybe/vue-inversify-plugin';
import { AudioService } from '@/services/audio-service';

@Component
export default class ChordInfo extends Vue {
  @Prop()
  chord!: Chord;

  @$inject()
  private audioService!: AudioService;

  get chordImages(): string[] {
    return getImagesForChord(this.chord.symbol);
  }

  playChord(notes: string[]) {
    this.audioService.soundNotes(mapNotesUpward(notes, 3));
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
