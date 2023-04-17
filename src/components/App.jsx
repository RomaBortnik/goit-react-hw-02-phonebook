import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const nameValue = event.target.elements.name.value;
    const numberValue = event.target.elements.number.value;
    const nameValueToLowerCase = nameValue.toLowerCase();

    const equalEl = this.state.contacts.find(
      contact => contact.name.toLowerCase() === nameValueToLowerCase
    );
    if (equalEl) {
      return alert(`${nameValue} is already in contacts`);
    }

    this.setState(prevState => {
      this.reset();
      return {
        contacts: [
          ...prevState.contacts,
          { id: nanoid(), name: nameValue, number: numberValue },
        ],
      };
    });
  };

  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  contactsListFilter = () => {
    const { contacts, filter } = this.state;

    if (filter === '') {
      return contacts;
    } else {
      const filterToLowerCase = filter.toLowerCase();
      const filteredContactsList = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filterToLowerCase)
      );
      return filteredContactsList;
    }
  };

  reset = () => {
    const form = document.querySelector('form');
    form.reset();
  };

  deleteContact = event => {
    const indexEl = this.state.contacts.findIndex(
      contact => contact.name === event.target.dataset.name
    );
    const arr = [...this.state.contacts];
    arr.splice(indexEl, 1);
    this.setState({ contacts: arr });
  };

  render() {
    const filteredContactsList = this.contactsListFilter();

    console.log(this.state);

    return (
      <>
        <h1 className="title">Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit}></ContactForm>
        <h2 className="title">Contacts</h2>
        <Filter onChange={this.handleChange}></Filter>
        <ContactList
          filteredContactsList={filteredContactsList}
          deleteContact={this.deleteContact}
        ></ContactList>
      </>
    );
  }
}
