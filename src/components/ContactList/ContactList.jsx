import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  selectContacts,
  selectFilteredContacts,
  selectError,
  selectIsLoading,
} from 'redux/selectors';
import ContactItem from '../ContactItem/ContactItem';
import { fetchContacts } from 'redux/operations';
import { Loader } from '../Loader/Loader';
import css from './ContactList.module.css'

function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul className={css.listContainer}>
      {isLoading && !error ? (
        <div className={css.loaderWrap}>
        <Loader/>
        </div>
      ) : contacts.length === 0 && !error ? (
        <p>The Phonebook is empty. Add your first contact. 🫤</p>
      ) : (
        filteredContacts.map(({ id, name, number }) => (
          <ContactItem key={id} contact={{ id, name, number }} />
        ))
      )}
    </ul>
  );
}

export default ContactList;


