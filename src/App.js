import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const baseUrl = 'http://localhost:4000';
  const [isLoading, setIsLoading] = useState(true);

  // Variable for new guest input
  const [newGuest, setNewGuest] = useState({
    id: ' ',
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
      setIsLoading(false);
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

  // Handle new guest creation

  function CreateGuest(props) {
    const firstName = props.firstName;
    const lastName = props.lastName;
    async function createGuest() {
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
      });
      const createdGuest = await response.json();
      setGuestList([...guestList, createdGuest]);
      console.log('Guest successfully created:', createdGuest);
    }
    createGuest().catch((error) => {
      console.log('Error when trying to create a guest:', error);
    });
  }

  // Handle change only after pressing Enter key
  const handleKeyDown = async (event) => {
    try {
      if (event.key === 'Enter') {
        await CreateGuest(newGuest);
        setNewGuest({
          ...newGuest,
          firstName: ' ',
          lastName: ' ',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle setting "attending" to true
  async function enableAttending(props) {
    try {
      const response = await fetch(`${baseUrl}/guests/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: true }),
      });
      const updatedGuest = await response.json();
      setGuestList((prevGuestList) =>
        prevGuestList.map((g) => (g.id === updatedGuest.id ? updatedGuest : g)),
      );
      console.log(
        'successfully updated status to "is attending"',
        updatedGuest,
      );
    } catch (error) {
      console.log('Error when updating attending status:', error);
    }
  }

  // Handle setting "attending" to false
  async function disableAttending(props) {
    try {
      const response = await fetch(`${baseUrl}/guests/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: false }),
      });
      const updatedGuest = await response.json();
      setGuestList((prevGuestList) =>
        prevGuestList.map((g) => (g.id === updatedGuest.id ? updatedGuest : g)),
      );
      console.log(
        'successfully updated status to "not attending"',
        updatedGuest,
      );
    } catch (error) {
      console.log('Error when updating attending status:', error);
    }
  }

  // Display Guest List
  return (
    <div title={`data-test-id="guest"`}>
      <h1> My Guest List</h1>
      <form>
        <label>
          First Name:
          <input
            className="textField"
            name="firstName"
            placeholder="Your First Name"
            disabled={isLoading}
            value={newGuest.firstName}
            onChange={handleFirstNameChange}
          />
        </label>
        <label>
          Last Name:
          <input
            className="textField"
            name="lastName"
            placeholder="Your Last Name"
            disabled={isLoading}
            value={newGuest.lastName}
            onChange={handleLastNameChange}
            onKeyDown={handleKeyDown}
          />
        </label>
      </form>
      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Is Attending</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {guestList.map((guest) => {
                // Handle remove guest function
                async function handleRemoveGuest() {
                  const response = await fetch(
                    `${baseUrl}/guests/${guest.id}`,
                    {
                      method: 'DELETE',
                    },
                  );
                  const deletedGuest = await response.json();
                  setGuestList(
                    guestList.filter(
                      (remainingGuest) => remainingGuest.id !== deletedGuest.id,
                    ),
                  );
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
          <button>Clear All</button>
        </div>
      )}
    </div>
  );
}
