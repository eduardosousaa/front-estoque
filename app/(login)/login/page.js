"use client"
import { useState, useContext } from 'react';
import { useRouter } from "next/navigation";
import styles from './login.module.css';
import { AuthContext } from '../../../src/Context/AuthContext';

export default function Page() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await signIn(username, password);

    } catch (err) {
      console.error('Erro ao fazer login:', err.message);
    }
  };

  return (

    <>
      <img src={"carrinho.png"} alt="" className={styles.chaveiro} />
      <form onSubmit={handleSubmit} className={styles.cabecaLogin}>
        <img src={"logo_SS.png"} alt="" />
        <h1>Bem vindo</h1>
        <label htmlFor="">
          <input type="" placeholder='Usuário: '
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />
        </label>
        <label htmlFor="">
          <input type={/* showPassword ? "text" :  */"password"}
            id="password"
            name="password"
            placeholder="Senha:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </label>
        <button type='submit' >Entrar</button>

      </form>
    </>
  );
}