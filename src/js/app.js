import './plugins';
import '../css/style.css';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import favoriteTickets from './store/favoriteTickets';
import currencyUI from './views/currency';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUI.form;

  // Events
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });

  ticketsUI.addToFavoriteListener();
  ticketsUI.renderFavoriteTickets(favoriteTickets.favoriteList);
  ticketsUI.removeFromFavoriteListener();

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    // собрать данные из инпутов
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    // console.log(origin, destination, depart_date, return_date);
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });
    ticketsUI.renderTickets(locations.lastSearch);
  }
});
