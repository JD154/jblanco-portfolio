import React from 'react';
import { MinimalQuote } from './Quote';
import './styles.css';

export const AboutMeSection: React.FC = () => {
  return (
    <section className="about-me-section">
      <div className="py-20 px-4 max-w-6xl mx-auto relative z-10">
        <div className="about-me-section__main">
          <div>
            <h2 className="text-4xl mb-2">An Evolution, The Only Way</h2>
            <p className="max-w-2xl">
              From an early age, I have felt a deep curiosity about the world around me, which led me to develop a
              self-taught spirit and a constant passion for learning about everything. This intellectual curiosity found
              a clear purpose when I discovered programming in high school.
              <br />
              <br />
              From that moment on, I was able to focus my desire to learn into the vast universe of technology. Using my
              love for technology to always grow and to create increasingly innovative solutions.
              <br /> <br />I have always believed that the key to success is to never stop evolving, and I strive to
              apply this mindset in all my endeavors.
            </p>
          </div>
          <aside className="about-me-section__side">
            <MinimalQuote />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
