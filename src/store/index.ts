import Vue from 'vue';
import Vuex from 'vuex';
import { Key } from '@tonaljs/tonal';
import { MajorKey, MinorKey } from '@tonaljs/key';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    selectedKey: Key.majorKey('c') as MajorKey | MinorKey,
  },
  mutations: {
    selectKey(state, key: MajorKey | MinorKey) {
      state.selectedKey = key;
    },
  },
  actions: {
    selectKey(context, key: MajorKey | MinorKey) {
      context.commit('selectKey', key);
    },
  },
  modules: {},
});
