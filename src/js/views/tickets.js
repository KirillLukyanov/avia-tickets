// import currencyUI from '../views/currency';

import locations from '../store/locations';
import favoriteTickets from '../store/favoriteTickets';
// import getDropdownInstance from '../plugins/materialize';

class TicketsUI {
  constructor() {
    // currency
    this.container = document.querySelector('.tickets-section .row');
    this.favorites = document.querySelector('.favorites .dropdown-content');
    // this.getСurrencySymbol = currency.getСurrencySymbol.bind(currency);
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = '';
    // const currency = this.getСurrencySymbol();

    tickets.forEach(ticket => {
      const template = TicketsUI.ticketTemplate(ticket); // , currency
      fragment += template;
    });
    this.container.insertAdjacentHTML('afterbegin', fragment);
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static emptyMsgTemplate() {
    return `
      <div class="tickets-empty-res-msg">
        По вашему запросу билетов не найдено.
      </div>
    `;
  }

  static ticketTemplate(ticket) {
    // , currency
    return `
      <div class="col s12 m6">
        <div class="card ticket-card">
          <div class="ticket-airline d-flex align-items-center">
            <img
              src="${ticket.airline_logo}"
              class="ticket-airline-img"
            />
            <span class="ticket-airline-name"
              >${ticket.airline_name}</span
            >
          </div>
          <div class="ticket-destination d-flex align-items-center">
            <div class="d-flex align-items-center mr-auto">
              <span class="ticket-city">${ticket.origin_name}</span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="ticket-city">${ticket.destination_name}</span>
            </div>
          </div>
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${ticket.departure_at}</span>
            <span class="ticket-price ml-auto">${ticket.currencySymbol}${ticket.price}</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
            <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
          </div>
          <a
          class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto"
          >Add to favorites</a>
        </div>
      </div>
    `;
  }

  renderFavoriteTickets(favoriteTickets) {
    this.clearFavorites();

    if (!favoriteTickets.length) {
      this.showEmptyFavoretesMsg();
      return;
    }
    let fragment = '';
    // const currency = this.getСurrencySymbol();

    favoriteTickets.forEach(favoriteTicket => {
      const template = TicketsUI.favoriteTicketTemplate(favoriteTicket); // , currency
      fragment += template;
    });
    this.favorites.insertAdjacentHTML('afterbegin', fragment);
  }

  clearFavorites() {
    this.favorites.innerHTML = '';
  }

  showEmptyFavoretesMsg() {
    const template = TicketsUI.favoriteEmptyMsgTemplate();
    this.favorites.insertAdjacentHTML('afterbegin', template);
  }

  addToFavoriteListener() {
    this.container.addEventListener('click', e => this.addToFavoriteHandler(e));
  }

  addToFavoriteHandler(e) {
    if (!e.target.classList.contains('add-favorite')) {
      return;
    }
    e.preventDefault();
    const [...currentCards] = this.container.querySelectorAll('.ticket-card');

    if (
      favoriteTickets.favoriteList.includes(
        locations.lastSearch[currentCards.indexOf(e.target.parentElement)]
      )
    ) {
      return;
    }

    favoriteTickets.favoriteList.push(
      locations.lastSearch[currentCards.indexOf(e.target.parentElement)]
    );
    // console.log(
    //   locations.lastSearch[currentCards.indexOf(e.target.parentElement)]
    // );
    this.renderFavoriteTickets(favoriteTickets.favoriteList);
    // console.log(favoriteTickets.favoriteList);
  }

  removeFromFavoriteListener() {
    this.favorites.addEventListener('click', e =>
      this.removeFromFavoriteHandler(e)
    );
  }

  removeFromFavoriteHandler(e) {
    if (!e.target.classList.contains('delete-favorite')) {
      return;
    }
    e.preventDefault();
    const [...currentFavorites] =
      this.favorites.querySelectorAll('.favorite-item');
    const targetIndex = currentFavorites.indexOf(
      e.target.closest('.favorite-item')
    );
    favoriteTickets.favoriteList.splice(targetIndex, 1);
    this.renderFavoriteTickets(favoriteTickets.favoriteList);
  }

  static favoriteEmptyMsgTemplate() {
    return `
      <div class="tickets-empty-res-msg">
        Список пуст...
      </div>
    `;
  }

  static favoriteTicketTemplate(ticket) {
    return `
      <div class="favorite-item d-flex align-items-start">
        <img
          src="${ticket.airline_logo}"
          class="favorite-item-airline-img"
        />
        <div class="favorite-item-info d-flex flex-column">
          <div
            class="favorite-item-destination d-flex align-items-center"
          >
            <div class="d-flex align-items-center mr-auto">
              <span class="favorite-item-city">${ticket.origin_name}</span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="favorite-item-city">${ticket.destination_name}</span>
            </div>
          </div>
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${ticket.departure_at}</span>
            <span class="ticket-price ml-auto">${ticket.currencySymbol}${ticket.price}</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
            <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
          </div>
          <a
            class="
              waves-effect waves-light
              btn-small
              pink
              darken-3
              delete-favorite
              ml-auto
            "
            >Delete</a
          >
        </div>
      </div>
    `;
  }
}

const ticketsUI = new TicketsUI(); // currencyUI

export default ticketsUI;
