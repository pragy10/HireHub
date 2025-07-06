import { FaBriefcase, FaBuilding, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  // Demo login functions for testing
  const handleDemoJobseekerLogin = () => {
    const demoUser = {
      id: "demo-jobseeker-1",
      name: "John Doe",
      email: "john@demo.com",
      role: "jobseeker"
    };
    localStorage.setItem("token", "demo-token-jobseeker");
    localStorage.setItem("user", JSON.stringify(demoUser));
    window.location.reload();
  };

  const handleDemoEmployerLogin = () => {
    const demoUser = {
      id: "demo-employer-1",
      name: "Jane Smith",
      email: "jane@demo.com",
      role: "employer",
      company: "TechCorp Inc."
    };
    localStorage.setItem("token", "demo-token-employer");
    localStorage.setItem("user", JSON.stringify(demoUser));
    window.location.reload();
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'white', 
      padding: '20px',
      color: 'black',
      fontSize: '18px'
    }}>
      <h1 style={{ color: 'blue', fontSize: '32px', marginBottom: '20px' }}>
        🎯 HireHub - Find Your Dream Job
      </h1>
      
      <div style={{ 
        background: 'lightblue', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: 'darkblue', marginBottom: '10px' }}>Welcome to HireHub!</h2>
        <p style={{ marginBottom: '15px' }}>
          Connect with top companies and opportunities worldwide. Your next career move starts here.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link to="/register" style={{
            background: 'blue',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Get Started
          </Link>
          <Link to="/jobs" style={{
            background: 'white',
            color: 'blue',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            border: '2px solid blue',
            fontWeight: 'bold'
          }}>
            Browse Jobs
          </Link>
        </div>
      </div>

      {/* Demo Login Section */}
      {!user && (
        <div style={{ 
          background: 'lightyellow', 
          padding: '20px', 
          borderRadius: '10px',
          marginBottom: '20px',
          border: '2px solid orange'
        }}>
          <h3 style={{ color: 'darkorange', marginBottom: '15px', fontSize: '20px' }}>
            🚀 Quick Demo Access
          </h3>
          <p style={{ marginBottom: '15px', color: 'darkgreen' }}>
            Test all features instantly with demo accounts (no backend required):
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={handleDemoJobseekerLogin}
              style={{
                background: 'green',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🧑‍💼 Job Seeker Demo
            </button>
            <button
              onClick={handleDemoEmployerLogin}
              style={{
                background: 'purple',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🏢 Employer Demo
            </button>
          </div>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        <div style={{ 
          background: 'lightgray', 
          padding: '20px', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <FaBriefcase style={{ fontSize: '40px', color: 'blue', marginBottom: '10px' }} />
          <h3 style={{ color: 'darkblue', marginBottom: '10px' }}>1250+ Active Jobs</h3>
          <p>Find opportunities that match your skills</p>
        </div>
        
        <div style={{ 
          background: 'lightgray', 
          padding: '20px', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <FaBuilding style={{ fontSize: '40px', color: 'blue', marginBottom: '10px' }} />
          <h3 style={{ color: 'darkblue', marginBottom: '10px' }}>500+ Companies</h3>
          <p>Connect with leading companies worldwide</p>
        </div>
        
        <div style={{ 
          background: 'lightgray', 
          padding: '20px', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <FaGlobe style={{ fontSize: '40px', color: 'blue', marginBottom: '10px' }} />
          <h3 style={{ color: 'darkblue', marginBottom: '10px' }}>250+ Industries</h3>
          <p>Explore opportunities across all sectors</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 