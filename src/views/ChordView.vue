<template>
  <div class="chord-view">
    <div class="chord-view__chords">
      <p v-for="chord in chords" :key="chord">
        <button @click="selectChord(chord)">{{ chord }}</button>
      </p>
    </div>
    <div class="chord-view__chord-info">
      <chord-info v-if="selectedChord" :chord="selectedChord"></chord-info>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getAllChords } from '@/helper-functions';
import ChordInfo from '@/components/ChordInfo.vue';

@Component({
  components: { ChordInfo },
})
export default class ChordView extends Vue {
  chords = getAllChords().sort();

  selectedChord = '';

  selectChord(chord: string) {
    this.selectedChord = chord;
  }
}
</script>

<style lang="scss">
.chord-view {
  display: flex;
  overflow: hidden;

  .chord-view__chords {
    padding: 15px;
    height: 80vh;
    overflow: scroll;
    width: 25vw;
  }

  .chord-view__chord-info {
    height: 80vh;
    overflow: scroll;
    width: 75vw;
  }
}
</style>
