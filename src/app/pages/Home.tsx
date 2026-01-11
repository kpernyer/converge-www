import { Hero } from '../Hero';
import { Features } from '../Features';
import { Axioms } from '../Axioms';
import { Install } from '../Install';
import { FeaturedSignal } from '../FeaturedSignal';

export function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Axioms />
      <FeaturedSignal />
      <Install />
    </>
  );
}
