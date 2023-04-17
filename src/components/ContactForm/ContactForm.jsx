import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  updateState = event => {
    this.setState({
      name: event.target.elements.name.value,
      number: event.target.elements.number.value,
    });
  };

  render() {
    const {
      contactsForm,
      contactsFormLabel,
      contactsFormInput,
      contactsFormBtn,
    } = css;

    return (
      <form className={contactsForm} onSubmit={this.props.onSubmit}>
        <label className={contactsFormLabel}>
          Name
          <input
            className={contactsFormInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
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
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
