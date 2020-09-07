import 'reflect-metadata';
import Vue from 'vue';
import { Container } from 'inversify';
import { vueInversifyPlugin } from '@vanroeybe/vue-inversify-plugin';
import { AudioServiceImpl, AudioService } from '@/services/audio-service';

// Create an inversify container
const container = new Container();
// Apply bindings to container
container.bind<AudioService>('IAudioService').to(AudioServiceImpl);

// Register the plugin
Vue.use(vueInversifyPlugin(container));
