<template>
  <div class="string" :class="'string--nr-' + position">
    <div class="string__fret" v-for="(note, index) in string" :key="note.note ? note.note + index : 'empty-' + index">
      <span class="string__nr-indicator" v-if="calcIndicator(position, index)"></span>
      <div
        @click="soundNote(note)"
        class="string__note"
        :class="{ 'string__note--present': note.note, 'string__note--root': note.note === root }"
      >
        <span :hidden="!showNotes">{{ note.note }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Synth } from 'tone';
import { StringNote } from '@/helper-functions';

@Component
export default class String extends Vue {
  @Prop()
  root!: boolean;
  @Prop()
  string!: StringNote[];
  @Prop()
  position!: number;
  @Prop()
  synth?: Synth;

  @Prop({
    default: false,
  })
  showNotes!: boolean;

  soundNote(note: StringNote) {
    if (note.note && note.height) {
      this.$emit('noteClicked', note.note + note.height);
    }
  }

  calcIndicator(position: number, index: number): boolean {
    return (
      (position === 3 && (index === 2 || index === 4 || index === 6 || index === 8 || index === 14 || index === 16)) ||
      ((position == 2 || position == 4) && index === 11)
    );
  }
}
</script>

<style scoped lang="scss">
.string {
  display: flex;
  width: 690px;
  justify-content: center;

  .string__note {
    position: relative;
    top: -7.5px;
    width: 15px;
    height: 15px;
    font-size: smaller;
    border-radius: 50%;
    margin: auto;
    color: white;
    line-height: 1.4;
    cursor: pointer;

    &.string__note--present:not(.string__note--root) {
      background: black;
    }
    &.string__note--root {
      background: red;
    }
  }

  .string__fret {
    width: 45px;
    height: 25px;
    text-align: center;
    border-top: 1px solid black;
    box-sizing: border-box;
    position: relative;

    .string__nr-indicator {
      border-radius: 50%;
      background: darkgrey;
      width: 6px;
      height: 6px;
      position: absolute;
      top: calc(50% - 3px);
      left: calc(50% - 3px);
    }
  }

  &:not(.string--nr-6) {
    .string__fret {
      border-left: 1px solid black;

      &:last-child {
        border-right: 1px solid black;
      }
    }
  }

  .string__fret--root {
    color: red;
  }
}
</style>
