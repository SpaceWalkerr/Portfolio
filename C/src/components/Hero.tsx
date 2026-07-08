import BlueprintHero from './ui/blueprint-hero';

interface HeroProps {
  introDone?: boolean;
}

const Hero = ({ introDone = true }: HeroProps) => {
  return <BlueprintHero introDone={introDone} />;
};

export default Hero;
