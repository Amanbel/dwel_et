import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col">
      {/* TopNavBar */}
      <nav className="bg-background w-full sticky top-0 border-b border-outline-variant shadow-sm z-50">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-md max-w-[1280px] mx-auto">
          <div className="flex items-center gap-gutter">
            <Link className="flex items-center gap-sm" to="/">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-md text-headline-md font-bold">
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
            <Link className="hidden md:inline-flex font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors duration-200" to="/login">Login</Link>
            <Link className="inline-flex items-center justify-center px-lg py-sm bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary/90 hover:scale-[1.02] transition-all duration-200 ease-in-out shadow-sm" to="/register">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-3xl pb-2xl md:pt-[100px] md:pb-3xl px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
            <div className="md:col-span-7 flex flex-col gap-lg z-10">
              <span className="inline-block px-sm py-xs bg-primary-fixed text-primary font-label-sm text-label-sm rounded-full w-max">
                Digital Wellness Lab Platform
              </span>
              <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface leading-tight">
                Understand How Digital Content Shapes Your Wellbeing
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Advanced analytics for researchers and individuals. Uncover the subtle connections between your digital consumption habits and your cognitive and emotional health.
              </p>
              <div className="flex flex-col sm:flex-row gap-md pt-sm">
                <Link className="inline-flex items-center justify-center px-xl py-md bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary/90 hover:scale-[1.02] transition-all duration-200 shadow-sm" to="/register">
                  Get Started
                </Link>
                <Link className="inline-flex items-center justify-center px-xl py-md bg-transparent border border-outline text-primary font-label-md text-label-md rounded-lg hover:bg-surface-variant transition-all duration-200" to="/dashboard">
                  View Demo Dashboard
                </Link>
              </div>
            </div>
            <div className="md:col-span-5 relative mt-xl md:mt-0">
              <div className="absolute inset-0 bg-primary-fixed/20 blur-3xl rounded-full"></div>
              <img
                alt="dwell et Dashboard Preview"
                className="relative z-10 w-full h-auto rounded-xl border border-outline-variant shadow-[0_4px_24px_rgba(0,74,198,0.08)] object-cover aspect-[4/3]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7iS951ZF4WWX9TNgoxs1xcZhfQk94DxbYkPU5tSxCw-aVKtPb7eZ6rTKRs7W8A9N7vTpbPiQb3hSeVyMXfIlbOeAR08V6AjB9Z_S10gjgu_pSU8TXYacSYbF1raNMbC3LX5hmn1BTrBi1MTXr2sMEhKWc0VQsaw7a_XOtldLlo_GvlsBglxmSdHrS23lOvHvnzxDUiPZxQL-wIncF0GU9vlVQ2aC_UVQ8DOHWCYZ2F7rsuc6Ip2_P81vzB0nyOUm-JmQF0v8UnHa9"
              />
            </div>
          </div>
        </section>

        {/* Features Section (Bento Grid) */}
        <section className="py-3xl bg-surface-container-low px-margin-mobile md:px-margin-desktop" id="features">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-2xl">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-sm">Comprehensive Wellness Analysis</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                Our clinical-grade tools dissect your digital footprint to provide actionable insights for a healthier mind.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[minmax(200px,auto)]">
              {/* Feature 1 */}
              <div className="md:col-span-8 bg-surface rounded-xl border border-outline-variant p-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-64 h-64 bg-primary-fixed/30 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined">troubleshoot</span>
                </div>
                <h3 className="font-label-md text-label-md text-on-surface mb-xs font-bold">Content Analysis</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant w-3/4">
                  Deep NLP processing of consumed text and media to gauge sentiment, toxicity, and cognitive load.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="md:col-span-4 bg-surface rounded-xl border border-outline-variant border-l-4 border-l-tertiary p-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 bg-tertiary-container text-on-tertiary-container rounded-lg flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined">mood</span>
                </div>
                <h3 className="font-label-md text-label-md text-on-surface mb-xs font-bold">Emotional Exposure Tracking</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Map your mood shifts against specific content types and platforms.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="md:col-span-4 bg-surface rounded-xl border border-outline-variant p-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-lg flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <h3 className="font-label-md text-label-md text-on-surface mb-xs font-bold">Screen Time Insights</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Go beyond mere hours spent. Understand quality versus quantity of screen engagement.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="md:col-span-4 bg-surface rounded-xl border border-outline-variant border-l-4 border-l-secondary p-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 bg-surface-variant text-on-surface-variant rounded-lg flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined">summarize</span>
                </div>
                <h3 className="font-label-md text-label-md text-on-surface mb-xs font-bold">Weekly Wellness Reports</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Digestible summaries highlighting behavioral trends and recommended interventions.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="md:col-span-4 bg-surface rounded-xl border border-outline-variant p-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
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
              <div className="w-20 h-20 bg-surface rounded-full border-4 border-surface-container-low shadow-sm flex items-center justify-center mb-md relative z-10">
                <span className="material-symbols-outlined text-[32px] text-primary">data_usage</span>
              </div>
              <h3 className="font-label-md text-label-md font-bold text-on-surface mb-xs">Content Collection</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Securely aggregate browsing habits and content metadata across your devices.
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-surface rounded-full border-4 border-surface-container-low shadow-sm flex items-center justify-center mb-md relative z-10">
                <span className="material-symbols-outlined text-[32px] text-tertiary">psychology</span>
              </div>
              <h3 className="font-label-md text-label-md font-bold text-on-surface mb-xs">AI Analysis</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Proprietary models evaluate content for cognitive load, sentiment, and physiological triggers.
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-surface rounded-full border-4 border-surface-container-low shadow-sm flex items-center justify-center mb-md relative z-10">
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

      <footer className="bg-surface-container-high w-full py-xl border-t border-outline-variant">
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
