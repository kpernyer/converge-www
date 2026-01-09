import { Header } from './Header';
import { Hero } from './Hero';
import { Features } from './Features';
import { Axioms } from './Axioms';
import { Install } from './Install';
import { Footer } from './Footer';
import styles from './App.module.css';

export function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Hero />
        <Features />
        <Axioms />
        <Install />
      </main>
      <Footer />
    </>
  );
}
