import React, { useState, useEffect } from 'react';
import { subscriptionService } from '../../services/subscriptionService';
import { SubscriptionPlan } from '../../types/subscription';
import { Card } from '../../components/common/Card';
import { Loader } from '../../components/common/Loader';
import { Button } from '../../components/common/Button';
import { useLanguage } from '../../store/LanguageContext';

export const SubscriptionPage: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  const { t, tText, language } = useLanguage();

  useEffect(() => {
    const loadPlans = async () => {
      setIsLoading(true);
      try {
        const data = await subscriptionService.getPlans();
        setPlans(data);
      } catch (error) {
        console.error('Failed to load plans', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPlans();
  }, []);

  const handleUpgrade = async (planId: string) => {
    try {
      const success = await subscriptionService.upgrade(planId);
      if (success) {
        alert(language === 'am' ? 'የክፍያ ፕሮቶኮል በተሳካ ሁኔታ ተሻሽሏል!' : `Successfully upgrading billing protocol!`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-gutter">
      {/* Page Header */}
      <div className="text-center mb-2xl">
        <h2 className="font-display-lg text-display-lg text-on-surface dark:text-on-surface mb-sm">
          {t('chooseProtocol')}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-on-surface-variant/80 max-w-2xl mx-auto leading-relaxed">
          {t('subscriptionDesc')}
        </p>
        
        {/* Billing Toggle */}
        <div className="mt-lg inline-flex items-center bg-surface-container dark:bg-surface-container p-1 rounded-full border border-outline-variant dark:border-outline-variant shadow-inner">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-lg py-2 rounded-full font-label-md text-label-md transition-all duration-200 focus:outline-none ${
              billingCycle === 'monthly'
                ? 'bg-surface-container-lowest dark:bg-surface-container-lowest text-on-surface dark:text-on-surface shadow-sm font-semibold'
                : 'text-on-surface-variant dark:text-on-surface-variant/80 hover:text-on-surface dark:hover:text-on-surface'
            }`}
          >
            {t('monthly')}
          </button>
          <button
            onClick={() => setBillingCycle('annually')}
            className={`px-lg py-2 rounded-full font-label-md text-label-md transition-all duration-200 focus:outline-none ${
              billingCycle === 'annually'
                ? 'bg-surface-container-lowest dark:bg-surface-container-lowest text-on-surface dark:text-on-surface shadow-sm font-semibold'
                : 'text-on-surface-variant dark:text-on-surface-variant/80 hover:text-on-surface dark:hover:text-on-surface'
            }`}
          >
            {t('annually')} <span className="text-primary dark:text-primary ml-1 font-bold">-20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg max-w-4xl mx-auto items-stretch">
        {plans.map((plan) => {
          const isPro = plan.id === 'sub_pro';
          
          // Calculate annual pricing display
          let displayPrice = plan.price;
          if (billingCycle === 'annually' && plan.price !== '$0') {
            const rawVal = parseInt(plan.price.replace('$', ''), 10);
            const discounted = Math.floor(rawVal * 0.8);
            displayPrice = `$${discounted}`;
          }

          return (
            <Card
              key={plan.id}
              accentColor={isPro ? 'primary' : 'none'}
              hoverable={true}
              className={`p-xl flex flex-col justify-between h-full relative dark:bg-surface-container-lowest dark:border-outline-variant ${
                isPro
                  ? 'border-2 border-primary shadow-[0_8px_24px_rgba(0,74,198,0.08)] md:-translate-y-2 dark:border-primary dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)]'
                  : 'shadow-[0_4px_12px_rgba(0,0,0,0.03)]'
              }`}
            >
              {/* Popular Tag badge */}
              {isPro && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-full tracking-wide shadow-sm flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[14px] icon-fill">star</span>
                  {t('mostPopular')}
                </div>
              )}

              <div>
                <div className="mb-lg">
                  <h3 className={`font-headline-md text-headline-md mb-xs font-bold ${isPro ? 'text-primary dark:text-primary' : 'text-on-surface dark:text-on-surface'}`}>
                    {tText(plan.name)}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant/80 h-10 leading-relaxed">
                    {tText(plan.description)}
                  </p>
                  <div className="mt-md flex items-baseline gap-1">
                    <span className="font-display-lg text-display-lg text-on-surface dark:text-on-surface font-bold">
                      {displayPrice}
                    </span>
                    <span className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80">
                      / {tText(plan.period)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-outline-variant dark:border-outline-variant/30 pt-md mb-lg">
                  <p className="font-label-md text-label-md text-on-surface dark:text-on-surface font-bold mb-md">
                    {isPro ? t('everythingInBase') : t('includedInBase')}
                  </p>
                  <ul className="space-y-sm">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-sm">
                        <span className="material-symbols-outlined text-[20px] text-primary dark:text-primary shrink-0 icon-fill">
                          check_circle
                        </span>
                        <span className="font-body-md text-body-md text-on-surface dark:text-on-surface/90 leading-relaxed">
                          {tText(feature)}
                        </span>
                      </li>
                    ))}
                    {!isPro && (
                      <>
                        <li className="flex items-start gap-sm opacity-50">
                          <span className="material-symbols-outlined text-[20px] text-outline dark:text-outline/80 shrink-0">
                            remove
                          </span>
                          <span className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80">
                            {t('advancedTrendAnalytics')}
                          </span>
                        </li>
                        <li className="flex items-start gap-sm opacity-50">
                          <span className="material-symbols-outlined text-[20px] text-outline dark:text-outline/80 shrink-0">
                            remove
                          </span>
                          <span className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80">
                            {t('pdfExportFunc')}
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <Button
                variant={isPro ? 'primary' : 'secondary'}
                onClick={() => handleUpgrade(plan.id)}
                disabled={!isPro}
                className="w-full py-3"
              >
                {tText(plan.buttonText)}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Trust Badging */}
      <div className="mt-2xl text-center flex flex-col items-center justify-center space-y-sm">
        <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant/80">
          {t('securePayment')}
        </p>
        <div className="flex gap-4 opacity-60 grayscale dark:invert">
          <span className="material-symbols-outlined text-[32px]">credit_card</span>
          <span className="material-symbols-outlined text-[32px]">account_balance</span>
          <span className="material-symbols-outlined text-[32px]">lock</span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
