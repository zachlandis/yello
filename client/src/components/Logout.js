import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';

function Logout() {
  const { setCurrentUser } = useContext(UserContext);
  const history = useHistory();

  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE',
    })
      .then((r) => {
        if (r.ok) {
          setCurrentUser(null); // Update authentication status
          history.push('/'); // Redirect to the desired page after logout
        } else {
          // Handle error response
          console.log('Logout failed');
        }
      })
      .catch((error) => {
        // Handle fetch error
        console.error('Error during logout:', error);
      });
  }

  return (
    <span onClick={handleLogout} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
        Logout
    </span>
  );
}

export default Logout;
