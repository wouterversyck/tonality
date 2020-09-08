<template>
  <v-card v-if="chordInfo" class="chord-info">
    <v-card-title>{{ chordInfo.name }} ({{ chordInfo.symbol }}) <v-icon @click="playChord(chordInfo.notes)">mdi-play</v-icon></v-card-title>
    <v-card-text>
      <span class="chords__chord-item" v-for="note in chordInfo.notes" :key="note">{{ note }}</span>
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
import { Chord as ChordLib } from '@tonaljs/tonal';

@Component
export default class ChordInfo extends Vue {
  @Prop()
  chord!: string;

  @$inject()
  private audioService!: AudioService;

  get chordInfo(): Chord {
    return ChordLib.get(this.chord);
  }

  get chordImages(): string[] {
    return getImagesForChord(this.chordInfo.symbol);
  }

  playChord(notes: string[]) {
    this.audioService.soundNotes(mapNotesUpward(notes, 3));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chord-info {
  .chords__chord-item {
    margin-right: 15px;
  }
}
</style>
