<template>
  <v-select v-model="selectedKey" @change="onKeyChanged" :items="allKeys" label="Select key"></v-select>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Key as KeyLib } from '@tonaljs/tonal';
import { MajorKey, MinorKey } from '@tonaljs/key';
import { keys } from '@/helper-functions';
import { Action } from 'vuex-class';

@Component
export default class KeyInfo extends Vue {
  selectedKey = '';
  allKeys = keys;

  @Action
  selectKey!: (key: MinorKey | MajorKey) => void;

  mounted(): void {
    const key = this.$store.state.selectedKey;
    this.selectedKey = key.tonic;
    this.selectKey(key);
  }

  onKeyChanged(): void {
    const key = this.getKey(this.selectedKey);
    this.selectKey(key);
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
