import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/hero.png';

export const LandingPage: React.FC = () => {
  return (
    <div className="landing-mesh text-on-background font-body-md antialiased min-h-screen flex flex-col">
      {/* TopNavBar */}
      <nav className="bg-surface-container-lowest/82 backdrop-blur-xl w-full sticky top-0 border-b border-outline-variant/80 shadow-[0_10px_28px_rgba(19,35,53,0.05)] z-50">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-md max-w-[1280px] mx-auto">
          <div className="flex items-center gap-gutter">
            <Link className="flex items-center gap-sm" to="/">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-on-primary font-headline-md text-headline-md font-bold shadow-[0_12px_28px_rgba(15,93,168,0.24)]">
                D
              </div>
              <span className="font-headline-md text-headline-md text-primary font-bold">dwell et</span>
            </Link>
            <div className="hidden md:flex items-center gap-lg ml-lg">
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#features">Features</a>
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200" href="#how-it-works">How it Works</a>
            </div>
          </div>
          <div className="flex items-center gap-sm md:gap-md">
            <Link className="hidden md:inline-flex font-label-md text-label-md text-primary hover:text-on-surface transition-colors duration-200" to="/login">Login</Link>
            <Link className="inline-flex items-center justify-center gap-xs px-lg py-sm bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 ease-in-out shadow-[0_12px_26px_rgba(15,93,168,0.22)]" to="/register">
              Get Started
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-margin-mobile md:px-margin-desktop pt-xl md:pt-2xl pb-xl">
          <div className="relative min-h-[560px] max-w-[1280px] mx-auto overflow-hidden rounded-lg border border-outline-variant surface-panel">
            <img
              alt="dwell et dashboard analytics preview"
              className="absolute inset-0 h-full w-full object-cover"
              src={heroImage}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/88 to-surface-container-lowest/32" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent" />
            <div className="relative z-10 flex min-h-[560px] max-w-3xl flex-col justify-center gap-lg p-lg md:p-3xl">
              <span className="inline-flex w-max items-center gap-xs px-sm py-xs bg-secondary-container/85 text-on-secondary-container font-label-sm text-label-sm rounded-full">
                <span className="material-symbols-outlined text-[16px] icon-fill">verified</span>
                Digital Wellness Lab Platform
              </span>
              <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface leading-tight">
                Understand How Digital Content Shapes Your Wellbeing
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Advanced analytics for researchers and individuals. Uncover the subtle connections between your digital consumption habits and your cognitive and emotional health.
              </p>
              <div className="flex flex-col sm:flex-row gap-md pt-sm">
                <Link className="inline-flex items-center justify-center gap-xs px-xl py-md bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 shadow-[0_12px_26px_rgba(15,93,168,0.22)]" to="/register">
                  Get Started
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <Link className="inline-flex items-center justify-center gap-xs px-xl py-md bg-surface-container-lowest/78 border border-outline-variant text-primary font-label-md text-label-md rounded-lg hover:bg-surface-container-low transition-all duration-200" to="/dashboard">
                  <span className="material-symbols-outlined text-[18px]">dashboard</span>
                  View Demo Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section (Bento Grid) */}
        <section className="py-3xl bg-surface-container-low/72 px-margin-mobile md:px-margin-desktop" id="features">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-2xl">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-sm">Comprehensive Wellness Analysis</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                Our clinical-grade tools dissect your digital footprint to provide actionable insights for a healthier mind.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[minmax(200px,auto)]">
              {/* Feature 1 */}
              <div className="md:col-span-8 surface-panel rounded-lg p-lg hover:shadow-[0_22px_54px_rgba(19,35,53,0.1)] transition-shadow duration-300 relative overflow-hidden group">
                <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined">troubleshoot</span>
                </div>
                <h3 className="font-label-md text-label-md text-on-surface mb-xs font-bold">Content Analysis</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant w-3/4">
                  Deep NLP processing of consumed text and media to gauge sentiment, toxicity, and cognitive load.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="md:col-span-4 surface-panel rounded-lg border-l-4 border-l-tertiary p-lg hover:shadow-[0_22px_54px_rgba(19,35,53,0.1)] transition-shadow duration-300">
                <div className="w-10 h-10 bg-tertiary-container text-on-tertiary-container rounded-lg flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined">mood</span>
                </div>
                <h3 className="font-label-md text-label-md text-on-surface mb-xs font-bold">Emotional Exposure Tracking</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Map your mood shifts against specific content types and platforms.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="md:col-span-4 surface-panel rounded-lg p-lg hover:shadow-[0_22px_54px_rgba(19,35,53,0.1)] transition-shadow duration-300">
                <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-lg flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <h3 className="font-label-md text-label-md text-on-surface mb-xs font-bold">Screen Time Insights</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Go beyond mere hours spent. Understand quality versus quantity of screen engagement.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="md:col-span-4 surface-panel rounded-lg border-l-4 border-l-secondary p-lg hover:shadow-[0_22px_54px_rgba(19,35,53,0.1)] transition-shadow duration-300">
                <div className="w-10 h-10 bg-surface-variant text-on-surface-variant rounded-lg flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined">summarize</span>
                </div>
                <h3 className="font-label-md text-label-md text-on-surface mb-xs font-bold">Weekly Wellness Reports</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Digestible summaries highlighting behavioral trends and recommended interventions.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="md:col-span-4 surface-panel rounded-lg p-lg hover:shadow-[0_22px_54px_rgba(19,35,53,0.1)] transition-shadow duration-300 relative overflow-hidden">
                <div className="w-10 h-10 bg-error-container text-on-error-container rounded-lg flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined">shield_lock</span>
                </div>
                <h3 className="font-label-md text-label-md text-on-surface mb-xs font-bold">Privacy-First Processing</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  All analysis is performed locally where possible, ensuring your data never leaves your control.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-3xl px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto" id="how-it-works">
          <div className="text-center mb-2xl">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-sm">How dwell et Works</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              A seamless, non-intrusive process from data collection to actionable insight.
            </p>
          </div>
          <div className="relative flex flex-col md:flex-row gap-xl md:gap-gutter justify-between items-start">
            <div className="hidden md:block absolute top-10 left-12 right-12 h-0.5 bg-outline-variant -z-10"></div>
            
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-surface rounded-full border-4 border-surface-container-low shadow-[0_12px_28px_rgba(19,35,53,0.08)] flex items-center justify-center mb-md relative z-10">
                <span className="material-symbols-outlined text-[32px] text-primary">data_usage</span>
              </div>
              <h3 className="font-label-md text-label-md font-bold text-on-surface mb-xs">Content Collection</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Securely aggregate browsing habits and content metadata across your devices.
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-surface rounded-full border-4 border-surface-container-low shadow-[0_12px_28px_rgba(19,35,53,0.08)] flex items-center justify-center mb-md relative z-10">
                <span className="material-symbols-outlined text-[32px] text-tertiary">psychology</span>
              </div>
              <h3 className="font-label-md text-label-md font-bold text-on-surface mb-xs">AI Analysis</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Proprietary models evaluate content for cognitive load, sentiment, and physiological triggers.
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-surface rounded-full border-4 border-surface-container-low shadow-[0_12px_28px_rgba(19,35,53,0.08)] flex items-center justify-center mb-md relative z-10">
                <span className="material-symbols-outlined text-[32px] text-secondary">insights</span>
              </div>
              <h3 className="font-label-md text-label-md font-bold text-on-surface mb-xs">Wellness Insights</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Review clear dashboards and receive personalized recommendations for a healthier digital life.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-lowest/82 backdrop-blur-xl w-full py-xl border-t border-outline-variant">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto gap-lg">
          <div className="font-label-md text-label-md font-bold text-primary">
            © {new Date().getFullYear()} dwell et
          </div>
          <div className="flex flex-wrap justify-center gap-md md:gap-lg">
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">About</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Privacy</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Contact</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
