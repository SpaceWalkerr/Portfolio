import FieldHero from './ui/field-hero';

interface HeroProps {
  introDone?: boolean;
}

const Hero = ({ introDone = true }: HeroProps) => {
  return <FieldHero introDone={introDone} />;
};

export default Hero;
