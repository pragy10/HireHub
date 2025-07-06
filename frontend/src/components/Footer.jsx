import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
      color: 'white',
      padding: '40px 20px',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px'
        }}>
          {/* Company Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: 'white', padding: '8px', borderRadius: '8px' }}>
                <span style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '20px' }}>H</span>
              </div>
              <span style={{ fontSize: '24px', fontWeight: 'bold' }}>HireHub</span>
            </div>
            <p style={{ color: '#dbeafe' }}>
              Connecting talented professionals with amazing opportunities worldwide. Your career journey starts here.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{ 
                background: 'rgba(255,255,255,0.2)', 
                padding: '8px', 
                borderRadius: '8px',
                color: 'white',
                textDecoration: 'none'
              }}>
                <FaFacebook style={{ fontSize: '20px' }} />
              </a>
              <a href="#" style={{ 
                background: 'rgba(255,255,255,0.2)', 
                padding: '8px', 
                borderRadius: '8px',
                color: 'white',
                textDecoration: 'none'
              }}>
                <FaTwitter style={{ fontSize: '20px' }} />
              </a>
              <a href="#" style={{ 
                background: 'rgba(255,255,255,0.2)', 
                padding: '8px', 
                borderRadius: '8px',
                color: 'white',
                textDecoration: 'none'
              }}>
                <FaLinkedin style={{ fontSize: '20px' }} />
              </a>
              <a href="#" style={{ 
                background: 'rgba(255,255,255,0.2)', 
                padding: '8px', 
                borderRadius: '8px',
                color: 'white',
                textDecoration: 'none'
              }}>
                <FaInstagram style={{ fontSize: '20px' }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Quick Links</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <Link to="/" style={{ color: '#dbeafe', textDecoration: 'none' }}>Home</Link>
              </li>
              <li>
                <Link to="/jobs" style={{ color: '#dbeafe', textDecoration: 'none' }}>Browse Jobs</Link>
              </li>
              <li>
                <Link to="/register" style={{ color: '#dbeafe', textDecoration: 'none' }}>Create Account</Link>
              </li>
              <li>
                <Link to="/login" style={{ color: '#dbeafe', textDecoration: 'none' }}>Sign In</Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>For Employers</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <Link to="/post-job" style={{ color: '#dbeafe', textDecoration: 'none' }}>Post a Job</Link>
              </li>
              <li>
                <Link to="/employer-dashboard" style={{ color: '#dbeafe', textDecoration: 'none' }}>Employer Dashboard</Link>
              </li>
              <li>
                <a href="#" style={{ color: '#dbeafe', textDecoration: 'none' }}>Pricing Plans</a>
              </li>
              <li>
                <a href="#" style={{ color: '#dbeafe', textDecoration: 'none' }}>Recruitment Tools</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Contact Us</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FaEnvelope style={{ color: '#bfdbfe' }} />
                <span style={{ color: '#dbeafe' }}>support@hirehub.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FaPhone style={{ color: '#bfdbfe' }} />
                <span style={{ color: '#dbeafe' }}>+1 (555) 123-4567</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FaMapMarkerAlt style={{ color: '#bfdbfe' }} />
                <span style={{ color: '#dbeafe' }}>123 Job Street, Career City, CC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid #60a5fa', 
          marginTop: '32px', 
          paddingTop: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          alignItems: 'center'
        }}>
          <p style={{ color: '#dbeafe', fontSize: '14px' }}>
            © 2024 HireHub. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: '#dbeafe', fontSize: '14px', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#dbeafe', fontSize: '14px', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: '#dbeafe', fontSize: '14px', textDecoration: 'none' }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 