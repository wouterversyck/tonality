<template>
  <div class="strings" v-if="strings.g">
    <v-switch v-model="showNotes" label="Show / hide notes"></v-switch>
    <div class="strings__container" @touchend="stopTouch">
      <string :root="mKey.tonic" :position="1" :string="strings.e" :showNotes="showNotes"></string>
      <string :root="mKey.tonic" :position="2" :string="strings.b" :showNotes="showNotes"></string>
      <string :root="mKey.tonic" :position="3" :string="strings.g" :showNotes="showNotes"></string>
      <string :root="mKey.tonic" :position="4" :string="strings.d" :showNotes="showNotes"></string>
      <string :root="mKey.tonic" :position="5" :string="strings.a" :showNotes="showNotes"></string>
      <string :root="mKey.tonic" :position="6" :string="strings.e" :showNotes="showNotes"></string>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { createStringsForScale, isMajor, ScaleOnStrings } from '@/helper-functions';
import { MajorKey, MinorKey } from '@tonaljs/key';
import String from '@/components/String.vue';
@Component({
  components: { String },
})
export default class Strings extends Vue {
  @Prop()
  mKey!: MajorKey | MinorKey;

  showNotes = false;

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
    if (isMajor(this.mKey)) {
      return [...this.mKey.scale];
    }

    return [...this.mKey.natural.scale];
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
