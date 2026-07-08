import { PressHero } from '@/components/ui/press-hero';

interface HeroProps {
  introDone?: boolean;
}

const Hero = ({ introDone = true }: HeroProps) => {
  return <PressHero introDone={introDone} />;
};

export default Hero;
