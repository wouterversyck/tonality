<template>
  <div class="string" :class="'string--nr-' + position">
    <div class="string__fret" v-for="(note, index) in string" :key="note + index">
      <span class="string__nr-indicator" v-if="calcIndicator(position, index)"></span>
      <div
        class="string__note"
        :class="{ 'string__note--present': note.length > 0, 'string__note--root': note === root }"
      >
        <span :hidden="!showNotes">{{ note }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class String extends Vue {
  @Prop()
  root!: boolean;
  @Prop()
  string!: string[];
  @Prop()
  position!: number;

  @Prop({
    default: false,
  })
  showNotes!: boolean;

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
  margin: auto;
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
    line-height: 1.5;

    &.string__note--present:not(.string__note--root) {
      background: black;
    }
    &.string__note--root {
      background: red;
    }
  }

  .string__fret {
    width: 40px;
    height: 20px;
    text-align: center;
    border-top: 1px solid black;
    box-sizing: border-box;
    position: relative;

    .string__nr-indicator {
      border-radius: 50%;
      border: 1px solid black;
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
