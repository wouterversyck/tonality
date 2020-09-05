<template>
  <v-select v-model="selectedKey" @change="onKeyChanged" :items="allKeys" label="Select key"></v-select>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Key as KeyLib } from '@tonaljs/tonal';
import { MajorKey, MinorKey } from '@tonaljs/key';
import { keys } from '@/helper-functions';

@Component
export default class KeyInfo extends Vue {
  selectedKey = '';
  allKeys = keys;

  mounted(): void {
    const key = KeyLib.majorKey('c');
    this.emit(key);
  }

  onKeyChanged(): void {
    const key = this.getKey(this.selectedKey);
    this.emit(key);
  }

  private emit(key: MinorKey | MajorKey): void {
    this.$emit('key-selected', key);
  }

  private getKey(key: string): MajorKey | MinorKey {
    if (key.endsWith('m')) {
      const search = key[1].match('[#|b]') ? key.substr(0, 2) : key.substr(0, 1);
      return KeyLib.minorKey(search);
    }
    return KeyLib.majorKey(key);
  }
}
</script>
