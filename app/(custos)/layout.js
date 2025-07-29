'use client';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import styles from './custos.module.css';
import Sidebar from '../../src/Components/Layout/Sidebar';
import Navbar from '../../src/Components/Layout/Navbar';
import { Card } from 'reactstrap';

export default function Layout({ children }) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const { token1 } = parseCookies();

  useEffect(() => {
    if (!token1) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Navbar showSidebar={showSidebar} />
      <div className={`${styles.contentArea} ${showSidebar ? styles.expanded : ''}`}>
        <Card className={styles.container}>
          {children}
        </Card>
      </div>
    </>
  );
}
