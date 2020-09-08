<template>
  <div class="key-info">
    <v-card flat>
      <v-card-text>
        <key-selector @key-selected="onKeySelected" />
      </v-card-text>
    </v-card>
    <v-tabs dark>
      <v-tab>
        Scale
      </v-tab>
      <v-tab>
        Chords
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <scale />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <chords />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { MajorKey, MinorKey } from '@tonaljs/key';
import KeySelector from '@/components/KeySelector.vue';
import Scale from '@/components/Scale.vue';
import Chords from '@/components/Chords.vue';
import Strings from '@/components/Strings.vue';

@Component({
  components: { Chords, Scale, KeySelector, Strings },
})
export default class KeyInfoView extends Vue {
  onKeySelected(key: MajorKey | MinorKey): void {
    this.$store.dispatch('selectKey', key);
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
