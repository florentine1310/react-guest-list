export default function CreateGuest(props) {
  const firstName = props.firstName;
  const lastName = props.lastName;
  async function createGuest() {
    const baseUrl = 'http://localhost:4000';
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName }),
    });
    const createdGuest = await response.json();
    console.log('Guest successfully created:', createdGuest);
  }
  createGuest().catch((error) => {
    console.log('Error when trying to create a guest:', error);
  });
}
