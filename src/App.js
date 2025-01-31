import './App.css';
import { useEffect, useState } from 'react';
import {
  disableAttending,
  enableAttending,
} from './components/ChangeAttendingStatus';
import CreateGuest from './components/CreateGuest';

export default function App() {
  const baseUrl = 'http://localhost:4000';

  // Variable for new guest input
  const [newGuest, setNewGuest] = useState({
    firstName: ' ',
    lastName: ' ',
    isAttending: false,
  });

  // Variable for fetched guest list data
  const [guestList, setGuestList] = useState([]);

  // Fetching the full guest list on first render
  useEffect(() => {
    async function fetchGuestList() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      console.log(allGuests);
      setGuestList([...allGuests]);
    }
    fetchGuestList().catch((error) => {
      console.error('Error when executing GetGuestList:', error);
    });
  }, []);

  // Handle input field for first name
  function handleFirstNameChange(event) {
    setNewGuest({
      ...newGuest,
      firstName: event.currentTarget.value,
    });
  }

  // Handle input field for last name
  function handleLastNameChange(event) {
    setNewGuest({
      ...newGuest,
      lastName: event.currentTarget.value,
    });
  }

  // Handle change only after pressing Enter key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      CreateGuest(newGuest);
      setNewGuest({
        ...newGuest,
        firstName: ' ',
        lastName: ' ',
      });
    }
  };

  // Display Guest List
  return (
    <div title={`data-test-id="guest"`}>
      <h1> My Guest List</h1>
      <label>
        First Name:
        <input
          name="firstName"
          placeholder="Your First Name"
          value={newGuest.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last Name:
        <input
          name="lastName"
          placeholder="Your Last Name"
          value={newGuest.lastName}
          onChange={handleLastNameChange}
          onKeyDown={handleKeyDown}
        />
      </label>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>is Attending</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {guestList.map((guest) => {
            // Handle remove guest function
            async function handleRemoveGuest() {
              const response = await fetch(`${baseUrl}/guests/${guest.id}`, {
                method: 'DELETE',
              });
              const deletedGuest = await response.json();
              console.log('Guest successfully deleted:', deletedGuest);
            }

            return (
              <tr key={`user-${guest.id}`}>
                <td>{guest.firstName}</td>
                <td>{guest.lastName}</td>
                <td>
                  <input
                    name="isAttending"
                    type="checkbox"
                    aria-label="isAttending"
                    checked={guest.attending}
                    onChange={async (event) =>
                      event.currentTarget.checked
                        ? await enableAttending(guest)
                        : await disableAttending(guest)
                    }
                  />
                </td>
                <td>
                  <button onClick={handleRemoveGuest}>Remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
