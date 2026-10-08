import { useState } from "react";
import loginService from '../services/login';
import noteService from '../services/note';

const LoginForm = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      );
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username</label>
        <input 
          id='username' 
          type="text" 
          value={username} 
          onChange={({target}) => setUsername(target.value)} 
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input 
          id='password' 
          type="password" 
          value={password} 
          onChange={({target}) => setPassword(target.value)} 
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
}

export default LoginForm;
