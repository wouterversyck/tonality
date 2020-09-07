<template>
  <div class="scale">
    <span class="scale__scale-item" v-for="note in scale" :key="note">{{ note }}</span>
    <strings />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { MajorKey, MinorKey } from '@tonaljs/key';
import { isMajor } from '@/helper-functions';
import Strings from '@/components/Strings.vue';
import { State } from 'vuex-class';

@Component({
  components: { Strings },
})
export default class Scale extends Vue {
  @State
  selectedKey!: MajorKey | MinorKey;

  get scale(): string[] {
    if (isMajor(this.selectedKey)) {
      return [...this.selectedKey.scale];
    }

    return [...this.selectedKey.natural.scale];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.scale {
  margin: 15px;
  .scale__scale-item {
    margin: 5px;
  }
}
</style>
