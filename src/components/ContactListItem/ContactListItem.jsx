import PropTypes from 'prop-types';

import css from './ContactListItem.module.css';

const ContactListItem = ({ name, number, onClick }) => {
  return (
    <li className={css.contactsListItem}>
      {name}: {number}
      <button
        className={css.contactsListBtn}
        onClick={onClick}
        type="button"
        data-name={name}
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContactListItem;
