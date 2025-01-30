import './App.css';
import { useState } from 'react';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);
  const guest = {
    firstName: { firstName },
    lastName: { lastName },
    isAttending: { isAttending },
  };
  console.log(guest);

  return (
    <div title={`data-test-id="guest"`}>
      <h1> My Guest List</h1>
      <label>
        First Name:
        <input
          name="firstName"
          placeholder="Your First Name"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.currentTarget.value);
          }}
        />
      </label>
      <label>
        Last Name:
        <input
          name="lastName"
          placeholder="Your Last Name"
          value={lastName}
          onChange={(event) => {
            setLastName(event.currentTarget.value);
          }}
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
          <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>
              <input
                name="isAttending"
                type="checkbox"
                checked={isAttending}
                onChange={(event) => {
                  setIsAttending(event.currentTarget.checked);
                }}
              />
            </td>
            <td>
              <button>Remove</button>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
}
