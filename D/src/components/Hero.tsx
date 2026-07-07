import NeonHero from './ui/neon-hero';

interface HeroProps {
  introDone?: boolean;
}

const Hero = ({ introDone = true }: HeroProps) => {
  return <NeonHero introDone={introDone} />;
};

export default Hero;
