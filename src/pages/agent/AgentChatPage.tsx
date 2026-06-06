import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { agentService } from '../../services/agentService';
import { Agent, Message } from '../../types/agent';
import { cn } from '../../utils/helpers';

export const AgentChatPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load agents on mount
  useEffect(() => {
    const loadAgents = async () => {
      const data = await agentService.getAgents();
      setAgents(data);
      if (data.length > 0) {
        setSelectedAgent(data[0]);
      }
    };
    loadAgents();
  }, []);

  // Initialize greeting message when switching agent
  useEffect(() => {
    if (!selectedAgent) return;
    
    const currentAgentMessages = messages[selectedAgent.id] || [];
    if (currentAgentMessages.length === 0) {
      const greetingMsg: Message = {
        id: `msg_greet_${selectedAgent.id}`,
        sender: 'agent',
        text: selectedAgent.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => ({
        ...prev,
        [selectedAgent.id]: [greetingMsg]
      }));
    }
  }, [selectedAgent]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const activeMessages = selectedAgent ? messages[selectedAgent.id] || [] : [];

  const handleSendMessage = async (text: string) => {
    if (!selectedAgent || !text.trim()) return;

    const userMsg: Message = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update messages with user query
    setMessages((prev) => ({
      ...prev,
      [selectedAgent.id]: [...(prev[selectedAgent.id] || []), userMsg]
    }));
    setInputValue('');

    // Trigger typing state
    setIsTyping(true);

    try {
      const replyText = await agentService.getReply(selectedAgent.id, text);
      const agentMsg: Message = {
        id: `msg_agt_${Date.now()}`,
        sender: 'agent',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => ({
        ...prev,
        [selectedAgent.id]: [...(prev[selectedAgent.id] || []), agentMsg]
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePromptChipClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  // Preset chips depending on active agent
  const getPromptChips = (agentId: string) => {
    if (agentId === 'agt_focus') {
      return ['How can I reduce context switches?', 'Protect my focus window?', 'App impact feedback?'];
    }
    if (agentId === 'agt_sleep') {
      return ['How to limit late-night screen time?', 'Wind-down buffer routine?', 'Melatonin recovery?'];
    }
    if (agentId === 'agt_psych') {
      return ['Why do I feel cognitive fatigue?', 'Suggested micro-breaks?', 'Balance passive scrolling?'];
    }
    return [];
  };

  return (
    <div className="space-y-gutter flex-1 flex flex-col h-full overflow-hidden min-h-[500px]">
      {/* Page Header */}
      <div>
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
          AI Lab Assistant
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-sm">
          Discuss your wellness patterns, digital logs, and cognitive fatigue with specialized AI agents.
        </p>
      </div>

      {/* Main Grid Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter flex-1 items-stretch overflow-hidden min-h-[450px]">
        {/* Left Column: Agent Selector List */}
        <div className="lg:col-span-3 flex flex-col gap-md">
          <h3 className="font-label-md text-label-md font-bold uppercase tracking-wider text-outline px-xs">
            Wellness Specialists
          </h3>
          <div className="space-y-sm">
            {agents.map((agent) => {
              const isSelected = selectedAgent?.id === agent.id;
              return (
                <Card
                  key={agent.id}
                  accentColor={isSelected ? 'primary' : 'none'}
                  onClick={() => setSelectedAgent(agent)}
                  className={cn(
                    'cursor-pointer transition-all duration-200 flex items-center gap-sm p-sm border',
                    isSelected ? 'border-primary ring-2 ring-primary/10' : 'border-outline-variant'
                  )}
                >
                  <img
                    alt={agent.name}
                    className="w-10 h-10 rounded-full border border-outline-variant object-cover shrink-0"
                    src={agent.avatar}
                  />
                  <div className="overflow-hidden">
                    <h4 className="font-label-md text-label-md font-bold text-on-surface truncate">
                      {agent.name}
                    </h4>
                    <p className="text-[11px] text-outline truncate">{agent.role}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Center Column: Chat Canvas */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden h-[500px]">
          {/* Chat Header */}
          {selectedAgent && (
            <div className="px-md py-sm border-b border-outline-variant bg-surface flex items-center justify-between">
              <div className="flex items-center gap-sm">
                <img
                  alt={selectedAgent.name}
                  className="w-9 h-9 rounded-full border border-outline-variant object-cover"
                  src={selectedAgent.avatar}
                />
                <div>
                  <h4 className="font-label-md text-label-md font-bold text-on-surface">
                    {selectedAgent.name}
                  </h4>
                  <p className="text-[11px] text-secondary font-semibold">Active Specialist</p>
                </div>
              </div>
            </div>
          )}

          {/* Messages Window */}
          <div className="flex-1 overflow-y-auto p-md space-y-md bg-background/30">
            {activeMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={msg.id} className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}>
                  <div className={cn('flex gap-sm max-w-[80%]', isUser ? 'flex-row-reverse' : 'flex-row')}>
                    {!isUser && selectedAgent && (
                      <img
                        alt={selectedAgent.name}
                        className="w-6 h-6 rounded-full border border-outline-variant object-cover mt-1 shrink-0"
                        src={selectedAgent.avatar}
                      />
                    )}
                    <div className="space-y-xs">
                      <div
                        className={cn(
                          'p-md rounded-xl font-body-sm text-body-sm leading-relaxed shadow-xs',
                          isUser
                            ? 'bg-primary text-on-primary rounded-tr-none'
                            : 'bg-surface-container-lowest text-on-surface border border-outline-variant rounded-tl-none'
                        )}
                      >
                        {msg.text}
                      </div>
                      <p className={cn('text-[9px] text-outline', isUser ? 'text-right' : 'text-left')}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Simulated typing loading */}
            {isTyping && selectedAgent && (
              <div className="flex justify-start w-full">
                <div className="flex gap-sm max-w-[80%] flex-row">
                  <img
                    alt={selectedAgent.name}
                    className="w-6 h-6 rounded-full border border-outline-variant object-cover mt-1 shrink-0"
                    src={selectedAgent.avatar}
                  />
                  <div className="bg-surface-container-lowest text-on-surface border border-outline-variant p-sm rounded-xl rounded-tl-none flex items-center space-x-1 shadow-xs">
                    <span className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick-Prompt Chips & Input Block */}
          {selectedAgent && (
            <div className="p-sm bg-surface border-t border-outline-variant space-y-sm">
              {/* Prompt Chips */}
              <div className="flex flex-wrap gap-xs pb-xs">
                {getPromptChips(selectedAgent.id).map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handlePromptChipClick(chip)}
                    className="px-xs py-1 border border-outline text-[11px] font-semibold text-primary rounded-full hover:bg-primary-fixed hover:border-primary transition-all duration-150 focus:outline-none"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Text Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex items-center gap-xs"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Query ${selectedAgent.name}...`}
                  className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm font-body-sm text-body-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
                <Button type="submit" disabled={!inputValue.trim()} size="sm">
                  <span className="material-symbols-outlined text-[16px]">send</span>
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* Right Column: Specialist Profile Details */}
        {selectedAgent && (
          <div className="lg:col-span-3">
            <Card hoverable={false} accentColor="primary" className="h-full flex flex-col gap-md p-lg">
              <div className="flex flex-col items-center justify-center text-center space-y-xs pb-sm border-b border-outline-variant/30">
                <img
                  alt={selectedAgent.name}
                  className="w-16 h-16 rounded-full border-2 border-primary object-cover"
                  src={selectedAgent.avatar}
                />
                <div>
                  <h4 className="font-headline-md text-[18px] text-on-surface font-bold leading-none">
                    {selectedAgent.name}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{selectedAgent.role}</p>
                </div>
              </div>

              <div>
                <h4 className="font-label-md text-label-md font-bold uppercase tracking-wider text-outline mb-xs">
                  Expertise
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {selectedAgent.expertise}
                </p>
              </div>

              <div className="border-t border-outline-variant/30 pt-md">
                <h4 className="font-label-md text-label-md font-bold uppercase tracking-wider text-outline mb-sm">
                  Specialist Tips
                </h4>
                <ul className="space-y-sm">
                  {selectedAgent.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-xs">
                      <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5 select-none">
                        lightbulb
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
export default AgentChatPage;
