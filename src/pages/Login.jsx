import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (mode === 'register' && values.name.trim().length < 2) return setError('Enter your name.');
    if (!/^\S+@\S+\.\S+$/.test(values.email)) return setError('Enter a valid email address.');
    if (values.password.length < 6) return setError('Password must be at least 6 characters.');
    try {
      mode === 'login' ? login(values) : register(values);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth">
      <h1>{mode === 'login' ? 'Sign in' : 'Create account'}</h1>
      <form onSubmit={onSubmit} noValidate className="form">
        {mode === 'register' && (
          <label className="field"><span>Name</span><input name="name" value={values.name} onChange={onChange} autoComplete="name" /></label>
        )}
        <label className="field"><span>Email</span><input name="email" type="email" value={values.email} onChange={onChange} autoComplete="email" /></label>
        <label className="field"><span>Password</span><input name="password" type="password" value={values.password} onChange={onChange} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn" type="submit">{mode === 'login' ? 'Sign in' : 'Create account'}</button>
      </form>
      <button className="link-btn" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
        {mode === 'login' ? 'New here? Create an account' : 'Already have an account? Sign in'}
      </button>
    </div>
  );
}
