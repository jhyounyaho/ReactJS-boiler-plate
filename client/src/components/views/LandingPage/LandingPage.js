import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
  useEffect(() => {
    // server request, port: server 5000, client 3000 
    axios.get('/api/hello')
      .then(response => console.log(response.data))
  }, []) 

  return (
    <div>
      LandingPage 
    </div>
  )
}

export default LandingPage;