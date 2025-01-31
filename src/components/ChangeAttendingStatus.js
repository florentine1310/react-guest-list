export async function enableAttending(props) {
  const baseUrl = 'http://localhost:4000';
  try {
    const response = await fetch(`${baseUrl}/guests/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: true }),
    });
    const updatedGuest = await response.json();
    console.log('successfully updated status to "is attending"', updatedGuest);
  } catch (error) {
    console.log('Error when updating attending status:', error);
  }
}

export async function disableAttending(props) {
  const baseUrl = 'http://localhost:4000';
  try {
    const response = await fetch(`${baseUrl}/guests/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: false }),
    });
    const updatedGuest = await response.json();
    console.log('successfully updated status to "not attending"', updatedGuest);
  } catch (error) {
    console.log('Error when updating attending status:', error);
  }
}
