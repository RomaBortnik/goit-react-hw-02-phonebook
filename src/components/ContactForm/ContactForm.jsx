import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { contacts, addContact } = this.props;
    const { name, number } = this.state;

    const nameValueToLowerCase = name.toLowerCase();
    const equalEl = contacts.find(
      contact => contact.name.toLowerCase() === nameValueToLowerCase
    );
    if (equalEl) {
      return alert(`${name} is already in contacts`);
    }

    addContact(name, number);
    this.reset();
  };

  reset() {
    this.setState({ name: '', number: '' });
  }

  render() {
    const {
      contactsForm,
      contactsFormLabel,
      contactsFormInput,
      contactsFormBtn,
    } = css;
    return (
      <form className={contactsForm} onSubmit={this.handleSubmit}>
        <label className={contactsFormLabel}>
          Name
          <input
            className={contactsFormInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label className={contactsFormLabel}>
          Number
          <input
            className={contactsFormInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleChange}
          />
        </label>

        <button className={contactsFormBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
