import CaseHero from './ui/case-hero';

interface HeroProps {
  introDone?: boolean;
}

const Hero = ({ introDone = true }: HeroProps) => {
  return <CaseHero introDone={introDone} />;
};

export default Hero;
