
import { createApp, ref } from 'vue';

const eventBusApp = createApp({});
const eventBus = ref(eventBusApp);

export default eventBus;
