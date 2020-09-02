<template>
  <div class="key-info">
    <h3>Key info</h3>
    <key-selector @key-selected="onKeySelected" />
    <scale :m-key="selectedKey" />
    <chords :m-key="selectedKey" />
    <strings :m-key="selectedKey" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { MajorKey, MinorKey } from '@tonaljs/key';
import KeySelector from '@/components/KeySelector.vue';
import Scale from '@/components/Scale.vue';
import Chords from '@/components/Chords.vue';
import Strings from '@/components/Strings.vue';
import { Key } from '@tonaljs/tonal';

@Component({
  components: { Chords, Scale, KeySelector, Strings },
})
export default class KeyInfo extends Vue {
  selectedKey: MajorKey | MinorKey = Key.majorKey('c');

  onKeySelected(key: MajorKey | MinorKey): void {
    this.selectedKey = key;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
