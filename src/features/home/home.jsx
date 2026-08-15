import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';
import EarningsSection from './EarningsSection'
import SuccessStories from './SuccessStories';
import Fotter from '../../App/Public/Layout/Fotter';
import Hedder from '../../App/Public/Layout/Hedder'
import SocialAndTabletSectionLight from '../../App/Public/HomePages/SocialAndTabletSection';
export default function HomeH() {
  return (
    <div className="bg-[#020617]">
      <Hedder />
      <HeroSection />
      <FeaturesSection />  
       <EarningsSection /> 
      <TestimonialsSection />   
      <SuccessStories />
      <SocialAndTabletSectionLight/> 
      <Fotter />
       
      {/* الأجزاء القادمة سنضيفها هنا */}
    </div>
  );
}