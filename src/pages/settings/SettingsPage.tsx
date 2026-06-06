import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useLanguage } from '../../store/LanguageContext';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  
  // Profile state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || '');

  // Privacy toggles state
  const [localProcessing, setLocalProcessing] = useState(true);
  const [semanticSummaries, setSemanticSummaries] = useState(true);
  const [contextDetection, setContextDetection] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert(language === 'am' ? 'የምርምር መገለጫ ለውጦች ተቀምጠዋል!' : 'Saving user profile modifications!');
  };

  const handleExportData = (format: 'json' | 'csv') => {
    alert(language === 'am' ? `${format.toUpperCase()} መዝገቦችን ወደ ውጭ በመላክ ላይ...` : `Exporting research logs as ${format.toUpperCase()}...`);
  };

  const handleDeleteData = () => {
    const confirmMsg = language === 'am' 
      ? 'ሁሉንም ያለፉ መዝገቦችን ማጥፋት እንደሚፈልጉ እርግጠኛ ነዎት? ይህ ድርጊት ሊቀለበስ አይችልም።' 
      : 'Are you absolutely sure you want to delete all historical logs? This cannot be undone.';
    if (window.confirm(confirmMsg)) {
      alert(language === 'am' ? 'የላብራቶሪ መዝገቦች ውሂብ ጎታዎች በመሰረዝ ላይ...' : 'Deleting lab logs databases...');
    }
  };

  return (
    <div className="space-y-gutter">
      {/* Page Header */}
      <div>
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface dark:text-on-surface">
          {t('settings')}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-on-surface-variant/80 mt-xs">
          {t('settingsDesc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Profile Card */}
        <div className="lg:col-span-6">
          <Card hoverable={false} accentColor="primary" className="h-full flex flex-col justify-between dark:bg-surface-container-lowest dark:border-outline-variant">
            <form onSubmit={handleSaveProfile} className="space-y-md">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-on-surface mb-md">{t('researcherProfile')}</h3>
              
              <Input
                label={t('fullName')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon="person"
              />

              <Input
                label={t('emailAddress')}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon="mail"
              />

              <Input
                label={t('labRole')}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                icon="work"
              />

              <div className="pt-md">
                <Button type="submit">{t('saveChanges')}</Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Privacy & Processing Card */}
        <div className="lg:col-span-6">
          <Card hoverable={false} accentColor="secondary" className="h-full flex flex-col justify-between dark:bg-surface-container-lowest dark:border-outline-variant">
            <div className="space-y-md">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-on-surface mb-md">{t('privacySettings')}</h3>

              <div className="space-y-lg pt-sm">
                {/* Toggle 1 */}
                <div className="flex items-start justify-between">
                  <div className="mr-md">
                    <p className="font-label-md text-label-md text-on-surface dark:text-on-surface font-bold">{t('localProcessing')}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant/80 mt-xs leading-relaxed">
                      {t('localProcessingDesc')}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={localProcessing}
                    onChange={(e) => setLocalProcessing(e.target.checked)}
                    className="h-5 w-10 text-primary border-outline-variant dark:border-outline-variant/30 rounded bg-surface-container-lowest dark:bg-surface-container-low cursor-pointer shrink-0"
                  />
                </div>

                {/* Toggle 2 */}
                <div className="flex items-start justify-between">
                  <div className="mr-md">
                    <p className="font-label-md text-label-md text-on-surface dark:text-on-surface font-bold">{t('allowSemantic')}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant/80 mt-xs leading-relaxed">
                      {t('allowSemanticDesc')}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={semanticSummaries}
                    onChange={(e) => setSemanticSummaries(e.target.checked)}
                    className="h-5 w-10 text-primary border-outline-variant dark:border-outline-variant/30 rounded bg-surface-container-lowest dark:bg-surface-container-low cursor-pointer shrink-0"
                  />
                </div>

                {/* Toggle 3 */}
                <div className="flex items-start justify-between">
                  <div className="mr-md">
                    <p className="font-label-md text-label-md text-on-surface dark:text-on-surface font-bold">{t('continuousLogging')}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant/80 mt-xs leading-relaxed">
                      {t('continuousLoggingDesc')}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={contextDetection}
                    onChange={(e) => setContextDetection(e.target.checked)}
                    className="h-5 w-10 text-primary border-outline-variant dark:border-outline-variant/30 rounded bg-surface-container-lowest dark:bg-surface-container-low cursor-pointer shrink-0"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Data Export & Danger Zone */}
        <div className="lg:col-span-12">
          <Card hoverable={false} className="p-lg dark:bg-surface-container-lowest dark:border-outline-variant">
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-on-surface mb-md">{t('dataPortability')}</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant/80 mb-lg max-w-2xl leading-relaxed">
              {t('dataPortabilityDesc')}
            </p>

            <div className="flex flex-wrap gap-md">
              <Button variant="secondary" onClick={() => handleExportData('csv')} className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-[18px]">download</span>
                {t('exportCsvLogs')}
              </Button>
              <Button variant="secondary" onClick={() => handleExportData('json')} className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-[18px]">download</span>
                {t('exportJsonLogs')}
              </Button>
              <Button variant="danger" onClick={handleDeleteData} className="flex items-center gap-sm md:ml-auto">
                <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                {t('purgeLogs')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
