import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const [controlMode, setControlMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPolicies, setShowPolicies] = useState(false);
  const handleToggle = () => {
    setControlMode(!controlMode);
    if (!controlMode) {
      // just turned on
      setShowPassword(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correct = '0000'; // set your password
    if (password === correct) {
      navigate('/notic');
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen bg-[#171212] text-white font-sans flex flex-col">
      {/* Header */}
      <header className="flex items-center bg-[#171212] p-4">
        <button onClick={() => navigate(-1)} className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
          </svg>
        </button>
        <h2 className="flex-1 text-center text-lg font-bold">Settings</h2>
        <div className="w-6" />
      </header>

      {/* Usage policies */}
      <div className="relative">
        <button 
          className="px-4 py-2 w-full flex justify-between items-center text-left"
          onClick={() => setShowPolicies(!showPolicies)}
        >
          <span className="text-lg font-bold">Usage Policies</span>
          <svg 
            className={`w-5 h-5 transition-transform ${showPolicies ? 'rotate-180' : ''}`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
        
        {showPolicies && (
          <section className="px-4 py-6 space-y-6 bg-[#171212] text-white">
            <div>
              <h3 className="text-xl font-bold">Terms of Service</h3>
              <p className="text-sm text-gray-400">Effective Date: July 25, 2025</p>
              <p className="mt-2 text-gray-200">
                Welcome to <strong>MySite</strong>. By using our service, you agree to these terms.
              </p>
              <ul className="list-disc list-inside text-gray-200 space-y-1 mt-2">
                <li>You may view and share content for personal, non-commercial use.</li>
                <li>All content is © YourCompany. Unauthorized reproduction is prohibited.</li>
                <li>We reserve the right to suspend access for violations.</li>
              </ul>
              <a href="/terms" className="text-pink-400 hover:underline">Read Full Terms →</a>
            </div>
            <br />
<hr />
<br />
            <div>
              <h3 className="text-xl font-bold">Privacy Policy</h3>
              <p className="text-sm text-gray-400">Last Updated: July 25, 2025</p>
              <p className="mt-2 text-gray-200">
                Your privacy is important to us. We collect minimal data to improve your experience.
              </p>
              <ul className="list-disc list-inside text-gray-200 space-y-1 mt-2">
                <li>Information collected: name, email, usage data.</li>
                <li>Used for: notifications, personalization, analytics.</li>
                <li>Your rights: request data deletion via support@yourdomain.com.</li>
              </ul>
              <a href="/privacy" className="text-pink-400 hover:underline">Read Full Privacy Policy →</a>
            </div>

            <p className="text-center text-gray-500 text-xs">
              For questions, contact us at <a href="mailto:support@yourdomain.com" className="underline">support@yourdomain.com</a>.
            </p>
          </section>
        )}
      </div>


      {/* Control Mode */}
      <section className="px-4 pt-6 flex-1">
        <h3 className="text-lg font-bold mb-2">Control Mode</h3>
        <div className="flex items-center justify-between py-3">
          <span>Control Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={controlMode} onChange={handleToggle} />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-500 rounded-full peer peer-checked:bg-pink-400 transition-all"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform"></div>
          </label>
        </div>
      </section>

      {/* Password modal */}
      {showPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-[#222] p-6 rounded-lg w-full max-w-sm">
            <h4 className="text-white text-lg font-bold mb-4">أدخل كلمة المرور</h4>
            <input
              type="password"
              className="w-full p-2 rounded-md mb-2 text-black"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="flex justify-end">
              <button type="button" onClick={() => { setShowPassword(false); setControlMode(false); }} className="px-4 py-2 mr-2">إلغاء</button>
              <button type="submit" className="px-4 py-2 bg-pink-400 rounded-md">تأكيد</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

