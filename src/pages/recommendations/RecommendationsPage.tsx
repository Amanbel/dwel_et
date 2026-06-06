import React from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useLanguage } from '../../store/LanguageContext';

export const RecommendationsPage: React.FC = () => {
  const { t, language } = useLanguage();

  const formatTimeValue = (timeStr: string) => {
    if (language === 'am') {
      return timeStr.replace('h', 'ሰ').replace('m', 'ደ');
    }
    return timeStr;
  };

  return (
    <div className="space-y-gutter">
      {/* Page Header */}
      <div>
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface dark:text-on-surface">
          {t('recommendations')}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-on-surface-variant/80 mt-xs">
          {t('recommendationsDesc')}
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        {/* Positive Habits Card (Spans 8 cols) */}
        <div className="md:col-span-8">
          <Card accentColor="secondary" className="h-full flex flex-col justify-between p-lg relative overflow-hidden group dark:bg-surface-container-lowest dark:border-outline-variant">
            <div>
              <div className="flex items-start justify-between mb-md">
                <div>
                  <div className="flex items-center space-x-sm mb-xs">
                    <span className="material-symbols-outlined text-secondary">trending_up</span>
                    <h3 className="font-label-md text-label-md text-on-surface dark:text-on-surface uppercase tracking-wider font-semibold">
                      {t('positiveTrends')}
                    </h3>
                  </div>
                  <h4 className="font-headline-md text-headline-md text-on-surface dark:text-on-surface">
                    {language === 'am' ? 'የትኩረት ጊዜዎች ማሻሻል' : 'Focus Blocks Improving'}
                  </h4>
                </div>
                <Badge status="positive" className="flex items-center space-x-1">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                  <span>{language === 'am' ? '15% ከባለፈው ሳምንት አንጻር' : '15% vs Last Wk'}</span>
                </Badge>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/80 mb-md leading-relaxed">
                {language === 'am' 
                  ? 'ከጠዋቱ 3:00 እስከ 5:00 ባለው ጊዜ ውስጥ የሚያደርጉት ጥልቅ ሥራ በጣም ውጤታማ ነው። ባለፉት 4 ቀናት ውስጥ በአማካይ ለ90 ደቂቃዎች ያለማቋረጥ ትኩረት ሰጥተዋል።'
                  : "Your deep work sessions between 9 AM and 11 AM are highly effective. You've maintained an average of 90 minutes of uninterrupted focus over the last 4 days."}
              </p>
            </div>
            <div className="bg-surface dark:bg-surface-container-low p-md rounded-lg border border-outline-variant dark:border-outline-variant/30 flex items-center space-x-md">
              <div className="w-12 h-12 rounded-full bg-secondary-container dark:bg-secondary-container/50 flex items-center justify-center text-on-secondary-container shrink-0">
                <span className="material-symbols-outlined text-secondary">lightbulb</span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface dark:text-on-surface font-bold">{t('suggestedAction')}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant/80 mt-xs leading-relaxed">
                  {language === 'am'
                    ? 'ይህንን የጊዜ ገደብ ይጠብቁ። በየቀኑ ከጠዋቱ 3:00 እስከ 5:00 አስፈላጊ ያልሆኑ ማሳወቂያዎችን ድምጽ አልባ እንዲያደርጉ እንመክራለን።'
                    : 'Protect this time block. We recommend silencing non-essential notifications from 9 AM to 11 AM daily.'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Risk Indicators Card (Spans 4 cols) */}
        <div className="md:col-span-4">
          <Card accentColor="error" className="h-full flex flex-col justify-between p-lg relative overflow-hidden group dark:bg-surface-container-lowest dark:border-outline-variant">
            <div>
              <div className="flex items-center space-x-sm mb-md">
                <span className="material-symbols-outlined text-error">warning</span>
                <h3 className="font-label-md text-label-md text-on-surface dark:text-on-surface uppercase tracking-wider font-semibold">
                  {t('riskIndicator')}
                </h3>
              </div>
              <h4 className="font-headline-md text-headline-md text-on-surface dark:text-on-surface mb-xs">
                {t('lateNightScreenTime')}
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant/80 mb-lg leading-relaxed">
                {language === 'am'
                  ? 'ለ3 ተከታታይ ምሽቶች ከምሽቱ 5 ሰዓት በኋላ ከፍተኛ የስልክ/ኮምፒውተር አጠቃቀም ተገኝቷል። ይህ በቀጥታ በእንቅልፍ ዑደት እና በእውቀት ማገገም ላይ ተፅእኖ አለው።'
                  : 'Elevated device usage detected past 11 PM for 3 consecutive nights. This directly impacts REM sleep cycles and cognitive recovery.'}
              </p>
            </div>
            <div className="space-y-sm border-t border-outline-variant dark:border-outline-variant/30 pt-md">
              <div className="flex justify-between font-label-sm text-label-sm">
                <span className="text-on-surface-variant dark:text-on-surface-variant/80 font-medium">{t('currentAvg')}</span>
                <span className="text-error font-semibold">{formatTimeValue('1h 45m')}</span>
              </div>
              <div className="w-full bg-surface-variant dark:bg-surface-container-high rounded-full h-2 overflow-hidden">
                <div className="bg-error h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant/60 text-right">
                {language === 'am' ? 'ዒላማ: < 30ደ' : 'Target: < 30m'}
              </p>
            </div>
          </Card>
        </div>

        {/* Personalized Goals & Progress (Spans 12 cols) */}
        <div className="md:col-span-12">
          <Card accentColor="primary" className="p-lg relative overflow-hidden group dark:bg-surface-container-lowest dark:border-outline-variant">
            <div className="flex items-center justify-between mb-lg border-b border-outline-variant dark:border-outline-variant/30 pb-sm">
              <div className="flex items-center space-x-sm">
                <span className="material-symbols-outlined text-primary">flag</span>
                <h3 className="font-label-md text-label-md text-on-surface dark:text-on-surface uppercase tracking-wider font-semibold">
                  {t('activeWellnessGoals')}
                </h3>
              </div>
              <button className="font-label-sm text-label-sm text-primary hover:text-on-primary-fixed-variant transition-colors flex items-center focus:outline-none">
                <span>{t('manageGoals')}</span>
                <span className="material-symbols-outlined text-[16px] ml-xs">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              {/* Goal 1 */}
              <div className="bg-surface dark:bg-surface-container-low rounded-lg p-md border border-outline-variant dark:border-outline-variant/30">
                <div className="flex justify-between items-start mb-sm">
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface dark:text-on-surface font-bold">
                      {language === 'am' ? 'የእኩለ ሌሊት አጠቃቀምን መቀነስ' : 'Reduce Late-Night Usage'}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant/80 mt-xs">
                      {language === 'am' ? 'ከምሽቱ 5 ሰዓት በኋላ ያለውን የስክሪን ጊዜ በ20% መቀነስ' : 'Decrease post-11 PM screen time by 20%'}
                    </p>
                  </div>
                  <Badge status="neutral">{t('inProgress')}</Badge>
                </div>
                <div className="mt-md">
                  <div className="flex justify-between font-label-sm text-label-sm mb-xs">
                    <span className="text-primary font-bold">{language === 'am' ? '65% የተሳካ' : '65% Achieved'}</span>
                    <span className="text-on-surface-variant dark:text-on-surface-variant/80">{language === 'am' ? '4 ቀናት የቀሩ' : '4 Days Remaining'}</span>
                  </div>
                  <div className="w-full bg-surface-variant dark:bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>

              {/* Goal 2 */}
              <div className="bg-surface dark:bg-surface-container-low rounded-lg p-md border border-outline-variant dark:border-outline-variant/30">
                <div className="flex justify-between items-start mb-sm">
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface dark:text-on-surface font-bold">
                      {language === 'am' ? 'ትምህርታዊ ይዘቶችን ማሳደግ' : 'Increase Educational Content'}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant/80 mt-xs">
                      {language === 'am' ? '30ደ የማህበራዊ ሚዲያ ቆይታን ወደ ትምህርታዊ መተግበሪያዎች ማዛወር' : 'Shift 30m of social media to educational apps'}
                    </p>
                  </div>
                  <Badge status="neutral">{t('inProgress')}</Badge>
                </div>
                <div className="mt-md">
                  <div className="flex justify-between font-label-sm text-label-sm mb-xs">
                    <span className="text-tertiary font-bold">{language === 'am' ? '40% የተሳካ' : '40% Achieved'}</span>
                    <span className="text-on-surface-variant dark:text-on-surface-variant/80">{t('ongoing')}</span>
                  </div>
                  <div className="w-full bg-surface-variant dark:bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                    <div className="bg-tertiary h-1.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
