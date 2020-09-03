<template>
  <div class="strings" v-if="strings.g">
    <button class="strings__button" @click="toggleNotes">Show/hide notes</button>
    <div class="strings__container">
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

  toggleNotes() {
    this.showNotes = !this.showNotes;
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
.strings__button {
  background-color: #44c767;
  border-radius: 28px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-size: 17px;
  padding: 10px 25px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
  margin: 15px 0 25px 0;

  &:hover {
    background-color: #5cbf2a;
  }

  &:active {
    position: relative;
    top: 1px;
  }
}

.strings__container {
  overflow-x: auto;
  padding-top: 10px;
}
</style>
