import locations from './store/locations';
import './plugins';
import '../css/style.css';

locations.init().then(res => {
  console.log(res);
  console.log(locations);
  console.log(locations.getCitiesByCountryCode('PE'));
});
