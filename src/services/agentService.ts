import { Agent } from '../types/agent';
import { delay } from './api';

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'agt_focus',
    name: 'Coach Marcus',
    role: 'Focus & Productivity Coach',
    expertise: 'Deep Work intervals, reducing context switches, batching strategies.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD8C4gPIu1k7nsAamRGZOXlmcgDQEf1CXDr9QsRAEiATb02NlZNZ0dihZmFCPABtVe27rAPm42WfJJXQjlK3yXXbzlG7IdhuIUdoH3Au4fRdAOoTHwdndh8-RVBWDviGoletdo9uXN7xVaA3AbkAWPc587hkNZg9lz8O3tpRCrmolbMxCnBDUfcPjDzAjqxJfNe059T1BgmQ1jtnJ9XLoYYR9PCHuxDUIWzuQrwHntwn0ZzyHfUEeYMiBAltDzGHEAgAoH1tqrKY9z',
    bgColor: 'bg-tertiary-fixed text-on-tertiary-fixed',
    greeting: "Hi! I'm Coach Marcus. Let's optimize your work intervals. How can I help you eliminate distractions today?",
    tips: [
      'Batch communication (Slack/Email) to 3 set times daily.',
      'Protect your prime cognitive window (09:00 - 11:30 AM).',
      'Use fullscreen modes to avoid tab context switches.'
    ]
  },
  {
    id: 'agt_sleep',
    name: 'Dr. Serena Lyra',
    role: 'Sleep & Recovery Specialist',
    expertise: 'Circadian rhythms, screen buffers, blue light control, micro-breaks.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt2eN1IxWZfFjKQiYY1LA8pJsntzUjrd0LqZMWILzfX4-xJo7RkI8Y-syX6bI3NZfnhXRu5ak99I_2Kps8g5JjBhCJcQfrkuGRO8UX4cqmANP40HJYRws9-SlWDEmaK0_RVzAwkY3AybMLyqpMsBxqwJdsyQXjWDuNk4TP_lkbxZmjvxvR_me5J5SZo8tyIKa90HmSHz_MgDuavaaa5VOStwD0hRzdC5clW1aJUnJidIMY9ob_A3v52S8DebAZROca-yQimXuZOzjb',
    bgColor: 'bg-primary-fixed text-on-primary-fixed',
    greeting: "Hello, I am Dr. Serena. I track circadian habits. Ask me about wind-down routines or evening screen exposures.",
    tips: [
      'Avoid screen exposure for at least 30 minutes before bed.',
      'Implement a 10-minute digital wind-down routine at 10 PM.',
      'Ensure a dark, cool sleeping space to maximize recovery.'
    ]
  },
  {
    id: 'agt_psych',
    name: 'Dr. Evelyn Moss',
    role: 'Cognitive Psychologist',
    expertise: 'Cognitive fatigue, mood shifts, digital drainage, emotional resilience.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvCyhCAJcNAb9QimXQLsyCzcGCOc3AWL9v_3dVJ5l9woj_RYckeFpcBAGvFVbkiG279m7ICJflW4N_iHx4G-znes-Bd8g_A8HACLAqx0gbLt9NvxeTV4BdOCYJ3Vs4A-fFVS5hfmynGJ1i2gVp6ux-rqsV0Y4tlCJRMMFS_gM3tA--D5LyUBR3YQhVEpWe4jfjBmT_XwYukNFm0DNpbTOsz0z3SvMKMLnxp_aCWTYN0PhDq0QPsWulEeM7wPdcpfGITbp-w4KWcu7f',
    bgColor: 'bg-secondary-fixed text-on-secondary-fixed',
    greeting: "Hello. I am Dr. Moss. I analyze mood shifts against screen content. How are you feeling after your recent sessions?",
    tips: [
      'Take a 5-minute offline micro-break for every hour of screen time.',
      'Reflect on how passive scrolling affects your focus stability.',
      'Combine focus intervals with deep breathing transitions.'
    ]
  }
];

export const agentService = {
  getAgents: async (): Promise<Agent[]> => {
    await delay(100);
    return MOCK_AGENTS;
  },
  
  getReply: async (agentId: string, text: string): Promise<string> => {
    await delay(800); // realistic typing wait
    const query = text.toLowerCase();
    
    if (agentId === 'agt_focus') {
      if (query.includes('switch') || query.includes('distract') || query.includes('interrup')) {
        return "Your session explorer shows context switches are peaking during mid-afternoon. I suggest setting a strict 'no-browser-tabs' rule for 25-minute blocks.";
      }
      if (query.includes('deep') || query.includes('productive') || query.includes('work')) {
        return "Excellent goal. Protect your peak morning window (9:00 - 11:30 AM). Batching communication checks to 11:30 AM, 2 PM, and 5 PM will prevent continuous disruption.";
      }
      return "To optimize your productivity, let's review your app impact table. Reducing passive scrolling and batching communication is the fastest path to deep work focus.";
    }
    
    if (agentId === 'agt_sleep') {
      if (query.includes('night') || query.includes('evening') || query.includes('bed') || query.includes('sleep')) {
        return "Your screen log indicates usage past 11 PM for multiple nights. Try implementing a 10-minute digital wind-down buffer at 10 PM: put the phone away and read offline.";
      }
      return "Circadian health depends on morning sunlight and evening screen buffers. Let's aim to decrease screen time after 10 PM to increase your deep sleep score.";
    }
    
    if (agentId === 'agt_psych') {
      if (query.includes('stressed') || query.includes('tired') || query.includes('fatigue') || query.includes('drain')) {
        return "Cognitive fatigue is a natural response to high information density. Try taking a 5-minute offline walking break now, or do a simple breathing exercise before your next task.";
      }
      return "Your emotional exposure trends show high calm periods during development blocks. Balancing work with dedicated micro-breaks will protect your mental battery.";
    }
    
    return "I've received your query. Analyzing your digital wellness parameters. Let's focus on aligning your screen habits with your cognitive wellness goals.";
  }
};
