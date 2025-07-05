// Test connection to backend
const testBackendConnection = async () => {
  try {
    console.log('Testing backend connection...');
    const response = await fetch('http://localhost:5000/api/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Backend connection successful:', data);
      return true;
    } else {
      console.error('Backend responded with error:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Backend connection failed:', error.message);
    return false;
  }
};

export default testBackendConnection; 