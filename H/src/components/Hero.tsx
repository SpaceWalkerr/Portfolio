import ArcadeHero from './ui/arcade-hero';

interface HeroProps {
  introDone?: boolean;
}

const Hero = ({ introDone = true }: HeroProps) => {
  return <ArcadeHero introDone={introDone} />;
};

export default Hero;
