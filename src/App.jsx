import './framer/styles.css'

import NavbarFramerComponent from './framer/navbar'
import HeroFramerComponent from './framer/hero'
import FeaturesFramerComponent from './framer/features'
import BenefitsFramerComponent from './framer/benefits'
import HowItWorksFramerComponent from './framer/how-it-works'
import IntegrationsFramerComponent from './framer/integrations'
import ComparisonFramerComponent from './framer/comparison'
import FaqFramerComponent from './framer/faq'
import NewsletterFramerComponent from './framer/newsletter'
import SeperatorFramerComponent from './framer/seperator'
import FooterFramerComponent from './framer/footer'
import TestimonialsFramerComponent from './framer D/testimonials-section'


// Import Framer B components
import AiAgentsSectionFramerComponent from './framer B/ai-agents-section'
import GrowSectionFramerComponent from './framer B/grow-section'

import AllInOneSolutionFramerComponent from './framer C/all-in-one-solution'

import PricingFramerComponent from './framer R/pricing'
import React from 'react';
import ROICalculator from './components/ROICalculator';
import './index.css'; // Ensure tailwind styles are imported
function App() {
  const sectionStyle = { width: '100%', maxWidth: 1200, margin: '0 auto' }

  return (
    <div style={{ backgroundColor: 'rgb(248, 248, 248)' }}>
      <NavbarFramerComponent.Responsive style={{ width: '100%', margin: '0 auto', maxWidth: 1200 }}/>
      <HeroFramerComponent.Responsive style={{ width: '100%', maxWidth: '100%', minHeight: '100vh' }}/>
      {/* Framer B Components */}
      <AiAgentsSectionFramerComponent.Responsive style={sectionStyle}/>
      <GrowSectionFramerComponent.Responsive style={sectionStyle}/>
      <AllInOneSolutionFramerComponent.Responsive style={sectionStyle}/>
      <FeaturesFramerComponent.Responsive style={sectionStyle}/>
      <BenefitsFramerComponent.Responsive style={sectionStyle}/>
      <HowItWorksFramerComponent.Responsive style={sectionStyle}/>
      <IntegrationsFramerComponent.Responsive style={sectionStyle}/>
      <ComparisonFramerComponent.Responsive style={sectionStyle}/>
      <PricingFramerComponent.Responsive style={sectionStyle}/>
      <TestimonialsFramerComponent.Responsive style={sectionStyle}/>
      <FaqFramerComponent.Responsive style={sectionStyle}/>
      <NewsletterFramerComponent.Responsive style={sectionStyle}/>
      <FooterFramerComponent.Responsive style={sectionStyle}/>
      <main>
        <ROICalculator />
      </main>
    </div>
  )
}

export default App
