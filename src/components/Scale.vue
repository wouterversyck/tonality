<template>
  <div class="scale">
    <span class="scale__scale-item" v-for="note in scale" :key="note">{{ note }}</span>
    <strings :m-key="mKey" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MajorKey, MinorKey } from '@tonaljs/key';
import { isMajor } from '@/helper-functions';
import Strings from '@/components/Strings.vue';
@Component({
  components: { Strings },
})
export default class Scale extends Vue {
  @Prop()
  mKey!: MajorKey | MinorKey;

  get scale(): string[] {
    if (isMajor(this.mKey)) {
      return [...this.mKey.scale];
    }

    return [...this.mKey.natural.scale];
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
