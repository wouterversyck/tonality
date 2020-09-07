<template>
  <div class="strings" v-if="strings.g">
    <v-switch v-model="showNotes" label="Show notes"></v-switch>
    <div class="strings__container" @touchend="stopTouch">
      <string
        :root="selectedKey.tonic"
        :position="1"
        :string="strings.highE"
        :showNotes="showNotes"
        @noteClicked="soundNote"
      ></string>
      <string
        :root="selectedKey.tonic"
        :position="2"
        :string="strings.b"
        :showNotes="showNotes"
        @noteClicked="soundNote"
      ></string>
      <string
        :root="selectedKey.tonic"
        :position="3"
        :string="strings.g"
        :showNotes="showNotes"
        @noteClicked="soundNote"
      ></string>
      <string
        :root="selectedKey.tonic"
        :position="4"
        :string="strings.d"
        :showNotes="showNotes"
        @noteClicked="soundNote"
      ></string>
      <string
        :root="selectedKey.tonic"
        :position="5"
        :string="strings.a"
        :showNotes="showNotes"
        @noteClicked="soundNote"
      ></string>
      <string
        :root="selectedKey.tonic"
        :position="6"
        :string="strings.lowE"
        :showNotes="showNotes"
        @noteClicked="soundNote"
      ></string>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { createStringsForScale, isMajor, ScaleOnStrings } from '@/helper-functions';
import { MajorKey, MinorKey } from '@tonaljs/key';
import String from '@/components/String.vue';
import { State } from 'vuex-class';
import { PolySynth } from 'tone';
import { AudioService } from '@/services/audio-service';
import { $inject } from '@vanroeybe/vue-inversify-plugin';

@Component({
  components: { String },
})
export default class Strings extends Vue {
  showNotes = false;
  synth?: PolySynth;

  @State
  selectedKey!: MajorKey | MinorKey;

  @$inject()
  private audioService!: AudioService;
  /**
   * Prevent tabs from swiping
   * @param event
   */
  stopTouch(event: Event): void {
    event.stopPropagation();
  }

  get strings(): ScaleOnStrings {
    return createStringsForScale(this.scale);
  }

  get scale(): string[] {
    if (isMajor(this.selectedKey)) {
      return [...this.selectedKey.scale];
    }

    return [...this.selectedKey.natural.scale];
  }

  soundNote(note: string) {
    this.audioService.soundNote(note);
  }
}
</script>

<style scoped lang="scss">
.strings__container {
  overflow-x: auto;
  padding-top: 20px;
  overflow-y: hidden;
}
</style>
