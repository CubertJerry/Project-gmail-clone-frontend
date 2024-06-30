import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const Inbox = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await api.get('/emails');
      setEmails(response.data);
    } catch (error) {
      console.error('Error fetching emails:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>Inbox</h2>
      <div>
        {emails.map(email => (
          <div key={email._id}>
            <p>From: {email.sender}</p>
            <p>Subject: {email.subject}</p>
            <p>Body: {email.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;