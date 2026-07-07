import MissionHero from './ui/mission-hero';

interface HeroProps {
  introDone?: boolean;
}

const Hero = ({ introDone = true }: HeroProps) => {
  return <MissionHero introDone={introDone} />;
};

export default Hero;
