import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../store/LanguageContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [avatar, setAvatar] = useState(user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80');

  const mockHealthExtract = {
    steps: '8,432',
    heartRate: '64',
    activeMinutes: '45',
    focusRate: '78%',
    sleep: '7h 15m',
    score: '82/100'
  };

  const handleAvatarChange = () => {
    // Simulated upload - select a random avatar from unsplash to showcase the UI reactivity
    const avatars = [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80'
    ];
    const nextIdx = Math.floor(Math.random() * avatars.length);
    setAvatar(avatars[nextIdx]);
  };

  if (!user) return null;

  return (
    <div className="space-y-gutter animate-fade-in pb-xl">
      {/* Page Header */}
      <div>
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
          {t('candidateProfile')}
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-sm">
          {t('healthData')}
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-stretch">
        
        {/* Left Column: Avatar & Account Demographics */}
        <div className="space-y-gutter lg:col-span-1">
          <Card hoverable={false} className="flex flex-col items-center text-center p-xl">
            <div className="relative group cursor-pointer" onClick={handleAvatarChange}>
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 hover:border-primary transition-all duration-200">
                <img
                  src={avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="material-symbols-outlined text-white text-[24px]">photo_camera</span>
              </div>
            </div>
            
            <h3 className="mt-md font-headline-md text-[20px] text-on-surface font-bold leading-tight">
              {user.name}
            </h3>
            <p className="text-sm text-secondary font-semibold mt-1">
              {user.role || 'Senior Digital Health Researcher'}
            </p>
            <span className="mt-sm inline-block px-3 py-1 bg-surface-container-high text-xs font-bold text-on-surface rounded-full">
              {t('digitalWellnessScore')}: <strong className="text-primary">{mockHealthExtract.score}</strong>
            </span>

            <div className="w-full mt-xl border-t border-outline-variant/30 pt-lg space-y-md text-left">
              <div>
                <span className="block text-xs uppercase tracking-wider text-outline font-bold">{t('email')}</span>
                <span className="font-body-sm text-on-surface">{user.email}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-outline font-bold">{t('role')}</span>
                <span className="font-body-sm text-on-surface">{user.role || 'Senior Digital Health Researcher'}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-outline font-bold">{t('joinedDate')}</span>
                <span className="font-body-sm text-on-surface">{t('joinedMonthYear')}</span>
              </div>
            </div>

            <Button onClick={handleAvatarChange} className="mt-lg w-full flex items-center justify-center gap-xs" size="sm">
              <span className="material-symbols-outlined text-[16px]">upload_file</span>
              <span>{t('avatarUpload')}</span>
            </Button>
          </Card>
        </div>

        {/* Right Columns: Wearable health summaries & sensory logs */}
        <div className="lg:col-span-2 space-y-gutter">
          
          {/* Health Extracts from Sensors */}
          <Card hoverable={false} className="p-lg">
            <div className="flex items-center gap-sm mb-lg border-b border-outline-variant/30 pb-sm">
              <span className="material-symbols-outlined text-primary text-[24px]">sensors</span>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                {t('healthExtracts')}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
              {/* Daily Steps */}
              <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant/20 hover:border-primary/20 transition-colors flex flex-col justify-between h-28">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-outline">{t('steps')}</span>
                  <span className="material-symbols-outlined text-primary text-[20px]">directions_run</span>
                </div>
                <div className="mt-sm">
                  <span className="text-2xl font-bold text-on-surface leading-none">{mockHealthExtract.steps}</span>
                  <span className="text-xs text-outline ml-1">/ 10,000</span>
                </div>
              </div>

              {/* Heart Rate */}
              <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant/20 hover:border-primary/20 transition-colors flex flex-col justify-between h-28">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-outline">{t('heartRate')}</span>
                  <span className="material-symbols-outlined text-error text-[20px]">favorite</span>
                </div>
                <div className="mt-sm">
                  <span className="text-2xl font-bold text-on-surface leading-none">{mockHealthExtract.heartRate}</span>
                  <span className="text-xs text-outline ml-1">bpm</span>
                </div>
              </div>

              {/* Active Minutes */}
              <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant/20 hover:border-primary/20 transition-colors flex flex-col justify-between h-28">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-outline">{t('activeMinutes')}</span>
                  <span className="material-symbols-outlined text-secondary text-[20px]">bolt</span>
                </div>
                <div className="mt-sm">
                  <span className="text-2xl font-bold text-on-surface leading-none">{mockHealthExtract.activeMinutes}</span>
                  <span className="text-xs text-outline ml-1">mins</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Activity Metrics & Digital Wellness Summary */}
          <Card hoverable={false} className="p-lg">
            <div className="flex items-center gap-sm mb-lg border-b border-outline-variant/30 pb-sm">
              <span className="material-symbols-outlined text-secondary text-[24px]">assessment</span>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                {t('activityMetrics')}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
              {/* Focus Rate Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center gap-md">
                <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">track_changes</span>
                </div>
                <div>
                  <span className="block text-xs text-outline font-bold uppercase tracking-wider">{t('focusWindow')}</span>
                  <span className="text-lg font-bold text-on-surface">{mockHealthExtract.focusRate}</span>
                </div>
              </div>

              {/* Sleep Score Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center gap-md">
                <div className="w-12 h-12 bg-tertiary-container text-on-tertiary-container rounded-lg flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">bedtime</span>
                </div>
                <div>
                  <span className="block text-xs text-outline font-bold uppercase tracking-wider">{t('averageSleep')}</span>
                  <span className="text-lg font-bold text-on-surface">{mockHealthExtract.sleep}</span>
                </div>
              </div>
            </div>

            {/* Extra Informational Block */}
            <div className="mt-lg bg-surface-container p-md rounded-xl border border-outline-variant/30 flex items-start gap-sm">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">info</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                All sensory feeds listed are synced using local integrations. The biometric analytics engine maps these telemetry logs against screen schedules to evaluate your mental workload parameters.
              </p>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
