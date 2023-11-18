import { makeApiAndCreate} from './createCountries.js';
import { declareEvents } from './events.js';

const init = () => {
    declareEvents();
    makeApiAndCreate("home","mini")
}


init();