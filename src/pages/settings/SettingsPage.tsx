import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  
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
    alert('Saving user profile modifications!');
  };

  const handleExportData = (format: 'json' | 'csv') => {
    alert(`Exporting research logs as ${format.toUpperCase()}...`);
  };

  const handleDeleteData = () => {
    if (window.confirm('Are you absolutely sure you want to delete all historical logs? This cannot be undone.')) {
      alert('Deleting lab logs databases...');
    }
  };

  return (
    <div className="space-y-gutter">
      {/* Page Header */}
      <div>
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
          Settings
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
          Manage your research profile, local privacy settings, and log data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Profile Card */}
        <div className="lg:col-span-6">
          <Card hoverable={false} accentColor="primary" className="h-full flex flex-col justify-between">
            <form onSubmit={handleSaveProfile} className="space-y-md">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Researcher Profile</h3>
              
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon="person"
              />

              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon="mail"
              />

              <Input
                label="Lab Role / Position"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                icon="work"
              />

              <div className="pt-md">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Privacy & Processing Card */}
        <div className="lg:col-span-6">
          <Card hoverable={false} accentColor="secondary" className="h-full flex flex-col justify-between">
            <div className="space-y-md">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Privacy & AI Settings</h3>

              <div className="space-y-lg pt-sm">
                {/* Toggle 1 */}
                <div className="flex items-start justify-between">
                  <div className="mr-md">
                    <p className="font-label-md text-label-md text-on-surface font-bold">Local Processing Only</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs leading-relaxed">
                      Analyze all text and content metrics locally in-browser. Zero remote servers are contacted.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={localProcessing}
                    onChange={(e) => setLocalProcessing(e.target.checked)}
                    className="h-5 w-10 text-primary border-outline-variant rounded bg-surface-container-lowest cursor-pointer shrink-0"
                  />
                </div>

                {/* Toggle 2 */}
                <div className="flex items-start justify-between">
                  <div className="mr-md">
                    <p className="font-label-md text-label-md text-on-surface font-bold">Allow Semantic Summarization</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs leading-relaxed">
                      Use local NLP transformers to extract themes and topic clouds from browser sessions.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={semanticSummaries}
                    onChange={(e) => setSemanticSummaries(e.target.checked)}
                    className="h-5 w-10 text-primary border-outline-variant rounded bg-surface-container-lowest cursor-pointer shrink-0"
                  />
                </div>

                {/* Toggle 3 */}
                <div className="flex items-start justify-between">
                  <div className="mr-md">
                    <p className="font-label-md text-label-md text-on-surface font-bold">Continuous Context Logging</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs leading-relaxed">
                      Automatically capture contextual screenshots for active sessions to estimate physiological fatigue (Low/Medium/High).
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={contextDetection}
                    onChange={(e) => setContextDetection(e.target.checked)}
                    className="h-5 w-10 text-primary border-outline-variant rounded bg-surface-container-lowest cursor-pointer shrink-0"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Data Export & Danger Zone */}
        <div className="lg:col-span-12">
          <Card hoverable={false} className="p-lg">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Data Portability</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg max-w-2xl leading-relaxed">
              Export your historical research data at any time. Or purge your local database logs permanently.
            </p>

            <div className="flex flex-wrap gap-md">
              <Button variant="secondary" onClick={() => handleExportData('csv')} className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export CSV Logs
              </Button>
              <Button variant="secondary" onClick={() => handleExportData('json')} className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export JSON Logs
              </Button>
              <Button variant="danger" onClick={handleDeleteData} className="flex items-center gap-sm md:ml-auto">
                <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                Purge All Lab Logs
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
