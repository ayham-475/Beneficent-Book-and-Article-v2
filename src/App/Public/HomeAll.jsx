import React from 'react'
import Hedder from './Layout/Hedder'
import CosmicHero from './HomePages/CosmicHero'
import ContentGridSection from './HomePages/ContentGridSection'
import SocialAndTabletSection from './HomePages/SocialAndTabletSection'
import Fotter from './Layout/Fotter'
import Home from './Books/Home'
function HomeAll() {
  return (
    <div>
      <Hedder />
      <Home />
      <CosmicHero />
      <ContentGridSection />
      <SocialAndTabletSection />
      <Fotter />

    </div>
  )
}

export default HomeAll
