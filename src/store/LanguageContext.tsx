import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'am';

export type TranslationKeys = 
  | 'dashboard'
  | 'analytics'
  | 'reports'
  | 'sessions'
  | 'recommendations'
  | 'assistant'
  | 'subscription'
  | 'settings'
  | 'profile'
  | 'help'
  | 'signout'
  | 'welcome'
  | 'overallScore'
  | 'screenTime'
  | 'socialUsage'
  | 'positiveContent'
  | 'wellnessTrend'
  | 'appUsage'
  | 'contentCategories'
  | 'emotionalExposure'
  | 'recentInsights'
  | 'keyTakeaway'
  | 'specialists'
  | 'activeSpecialist'
  | 'expertise'
  | 'tips'
  | 'query'
  | 'send'
  | 'language'
  | 'candidateProfile'
  | 'healthData'
  | 'steps'
  | 'heartRate'
  | 'activeMinutes'
  | 'focusWindow'
  | 'joinedDate'
  | 'email'
  | 'role'
  | 'wellnessOverview'
  | 'theme'
  | 'personalInfo'
  | 'contactInfo'
  | 'healthExtracts'
  | 'activityMetrics'
  | 'mentalWellness'
  | 'focusRate'
  | 'averageSleep'
  | 'digitalWellnessScore'
  | 'avatarUpload'
  | 'avatarUploadDesc'
  | 'candidateDashboard'
  | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
  | 'education' | 'entertainment' | 'news' | 'passiveScrolling' | 'other' | 'total'
  | 'tiktok' | 'youtube' | 'instagram' | 'facebook' | 'x'
  | 'searchPlaceholder' | 'minutesMin' | 'queryPlaceholder'
  | 'notificationsTitle' | 'notif1Title' | 'notif1Desc' | 'notif2Title' | 'notif2Desc'
  | 'joinedMonthYear'
  // New Translation Keys for Subpages
  | 'exposureAnalytics' | 'exposureAnalyticsDesc' | 'contentExposureBreakdown' | 'exportCsv' | 'category' | 'exposureTime' | 'percentage' | 'impactScore' | 'trend'
  | 'emotionalExposureTrends' | 'sevenDays' | 'thirtyDays' | 'calmFocus' | 'stressFatigue' | 'semanticTopics' | 'semanticTopicsDesc'
  | 'topicResearchData' | 'topicMachineLearning' | 'topicUiDesign' | 'topicNewsHeadlines' | 'topicCognitiveScience' | 'topicEmailChains' | 'topicSystemConfig'
  | 'appImpactRanking' | 'labInsights' | 'generatePdfReport'
  | 'chooseProtocol' | 'subscriptionDesc' | 'monthly' | 'annually' | 'mostPopular' | 'everythingInBase' | 'includedInBase'
  | 'advancedTrendAnalytics' | 'pdfExportFunc' | 'securePayment'
  | 'recommendationsDesc' | 'positiveTrends' | 'focusBlocksImproving' | 'vsLastWeek' | 'suggestedAction' | 'riskIndicator'
  | 'lateNightScreenTime' | 'currentAvg' | 'targetLabel' | 'activeWellnessGoals' | 'manageGoals' | 'inProgress' | 'achieved' | 'daysRemaining' | 'ongoing'
  | 'settingsDesc' | 'researcherProfile' | 'fullName' | 'emailAddress' | 'labRole' | 'saveChanges' | 'privacySettings'
  | 'localProcessing' | 'localProcessingDesc' | 'allowSemantic' | 'allowSemanticDesc' | 'continuousLogging' | 'continuousLoggingDesc'
  | 'dataPortability' | 'dataPortabilityDesc' | 'exportCsvLogs' | 'exportJsonLogs' | 'purgeLogs'
  | 'wellnessReports' | 'reportsDesc' | 'historicalReports' | 'noReportsFound' | 'focusDisruption' | 'emotionalSplit'
  | 'calmFocused' | 'stressedRushed' | 'neutralPassive' | 'selectReport' | 'backToReports' | 'downloadPdf' | 'weekOf' | 'fatigueRisk' | 'specificRecs';

const translations: Record<Language, Record<TranslationKeys, string>> = {
  en: {
    dashboard: 'Dashboard',
    analytics: 'Analytics',
    reports: 'Reports',
    sessions: 'Session Explorer',
    recommendations: 'Recommendations',
    assistant: 'AI Lab Assistant',
    subscription: 'Subscription',
    settings: 'Settings',
    profile: 'Profile',
    help: 'Help',
    signout: 'Sign Out',
    welcome: 'Welcome back. Here is your wellness overview for today.',
    overallScore: 'Overall Wellness Score',
    screenTime: "Today's Screen Time",
    socialUsage: 'Social Media Usage',
    positiveContent: 'Positive Content',
    wellnessTrend: 'Wellness Trend',
    appUsage: 'App Usage',
    contentCategories: 'Content Categories',
    emotionalExposure: 'Emotional Exposure',
    recentInsights: 'Recent Insights',
    keyTakeaway: 'Key Takeaway',
    specialists: 'Wellness Specialists',
    activeSpecialist: 'Active Specialist',
    expertise: 'Expertise',
    tips: 'Specialist Tips',
    query: 'Query',
    send: 'Send',
    language: 'Language',
    candidateProfile: 'Candidate Profile',
    healthData: 'Health & Wellness Data Extract',
    steps: 'Daily Steps',
    heartRate: 'Resting Heart Rate',
    activeMinutes: 'Active Minutes',
    focusWindow: 'Focus Window Rate',
    joinedDate: 'Joined Date',
    email: 'Email',
    role: 'Role',
    wellnessOverview: 'Wellness Overview',
    theme: 'Theme',
    personalInfo: 'Personal Information',
    contactInfo: 'Contact Information',
    healthExtracts: 'Health Extracts (Sensors)',
    activityMetrics: 'Activity Metrics',
    mentalWellness: 'Mental Wellness & Sleep',
    focusRate: 'Focus Rate',
    averageSleep: 'Average Sleep',
    digitalWellnessScore: 'Digital Wellness Score',
    avatarUpload: 'Change Avatar',
    avatarUploadDesc: 'Upload a new profile picture. Supports PNG, JPG.',
    candidateDashboard: 'dwell et Digital Lab',
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    sun: 'Sun',
    education: 'Education',
    entertainment: 'Entertainment',
    news: 'News',
    passiveScrolling: 'Passive Scrolling',
    other: 'Other',
    total: 'Total',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    instagram: 'Instagram',
    facebook: 'Facebook',
    x: 'X',
    searchPlaceholder: 'Search sessions, apps, or metrics...',
    minutesMin: 'm',
    queryPlaceholder: 'Query specialist...',
    notificationsTitle: 'Notifications',
    notif1Title: 'Late Night Peak',
    notif1Desc: 'Screen time spiked at 9:30 PM yesterday.',
    notif2Title: 'Weekly Report Available',
    notif2Desc: 'Your wellness overview is ready.',
    joinedMonthYear: 'June 2026',
    
    // Subpage English translations
    exposureAnalytics: 'Exposure Analytics',
    exposureAnalyticsDesc: 'Deep dive into digital consumption patterns and cognitive impact.',
    contentExposureBreakdown: 'Content Exposure Breakdown',
    exportCsv: 'Export CSV',
    category: 'Category',
    exposureTime: 'Exposure Time',
    percentage: 'Percentage',
    impactScore: 'Impact Score',
    trend: 'Trend',
    emotionalExposureTrends: 'Emotional Exposure Trends',
    sevenDays: '7 Days',
    thirtyDays: '30 Days',
    calmFocus: 'Calm/Focus',
    stressFatigue: 'Stress/Fatigue',
    semanticTopics: 'Semantic Topics',
    semanticTopicsDesc: 'Dominant themes derived from textual and visual exposure during active sessions.',
    topicResearchData: 'Research Data',
    topicMachineLearning: 'Machine Learning',
    topicUiDesign: 'UI Design',
    topicNewsHeadlines: 'News Headlines',
    topicCognitiveScience: 'Cognitive Science',
    topicEmailChains: 'Email Chains',
    topicSystemConfig: 'System Config',
    appImpactRanking: 'App Impact Ranking',
    labInsights: 'Lab Insights',
    generatePdfReport: 'Generate Detailed PDF Report',
    chooseProtocol: 'Choose Your Protocol',
    subscriptionDesc: 'Select the data density and historical reach required for your digital wellness research. Upgrade or downgrade at any time.',
    monthly: 'Monthly',
    annually: 'Annually',
    mostPopular: 'Most Popular',
    everythingInBase: 'Everything in Base, plus:',
    includedInBase: 'Included in Base:',
    advancedTrendAnalytics: 'Advanced Trend Analytics',
    pdfExportFunc: 'PDF Export Functionality',
    securePayment: 'Secure payment processing. Cancel your protocol at any time.',
    recommendationsDesc: "Based on your recent digital footprint, we've identified key areas to optimize your cognitive load and enhance focus. Here are your personalized wellness insights.",
    positiveTrends: 'Positive Trends',
    focusBlocksImproving: 'Focus Blocks Improving',
    vsLastWeek: 'vs Last Wk',
    suggestedAction: 'Suggested Action',
    riskIndicator: 'Risk Indicator',
    lateNightScreenTime: 'Late-Night Screen Time',
    currentAvg: 'Current Avg (post 11PM)',
    targetLabel: 'Target',
    activeWellnessGoals: 'Active Wellness Goals',
    manageGoals: 'Manage Goals',
    inProgress: 'In Progress',
    achieved: 'Achieved',
    daysRemaining: 'Days Remaining',
    ongoing: 'Ongoing',
    settingsDesc: 'Manage your research profile, local privacy settings, and log data.',
    researcherProfile: 'Researcher Profile',
    fullName: 'Full Name',
    emailAddress: 'Email address',
    labRole: 'Lab Role / Position',
    saveChanges: 'Save Changes',
    privacySettings: 'Privacy & AI Settings',
    localProcessing: 'Local Processing Only',
    localProcessingDesc: 'Analyze all text and content metrics locally in-browser. Zero remote servers are contacted.',
    allowSemantic: 'Allow Semantic Summarization',
    allowSemanticDesc: 'Use local NLP transformers to extract themes and topic clouds from browser sessions.',
    continuousLogging: 'Continuous Context Logging',
    continuousLoggingDesc: 'Automatically capture contextual screenshots for active sessions to estimate physiological fatigue (Low/Medium/High).',
    dataPortability: 'Data Portability',
    dataPortabilityDesc: 'Export your historical research data at any time. Or purge your local database logs permanently.',
    exportCsvLogs: 'Export CSV Logs',
    exportJsonLogs: 'Export JSON Logs',
    purgeLogs: 'Purge All Lab Logs',
    wellnessReports: 'Wellness Reports',
    reportsDesc: 'Comprehensive analysis of your digital habits.',
    historicalReports: 'Historical Reports',
    noReportsFound: 'No reports found for this interval.',
    focusDisruption: 'Focus vs Disruption',
    emotionalSplit: 'Emotional Split',
    calmFocused: 'Calm & Focused',
    stressedRushed: 'Stressed / Rushed',
    neutralPassive: 'Neutral / Passive',
    selectReport: 'Select a report to see details.',
    backToReports: 'Back to Reports',
    downloadPdf: 'Download PDF',
    weekOf: 'Week of',
    fatigueRisk: 'Fatigue Risk',
    specificRecs: 'Specific Recommendations'
  },
  am: {
    dashboard: 'ዳሽቦርድ',
    analytics: 'ትንታኔ',
    reports: 'ሪፖርቶች',
    sessions: 'የአጠቃቀም መቃኛ',
    recommendations: 'ምክረ-ሃሳቦች',
    assistant: 'የአርቴፊሻል ኢንተለጀንስ ረዳት',
    subscription: 'ምዝገባ',
    settings: 'ቅንብሮች',
    profile: 'የግል ማህደር',
    help: 'እርዳታ',
    signout: 'ውጣ',
    welcome: 'እንኳን ደህና መጡ። የዛሬው የደህንነትዎ አጠቃላይ እይታ እዚህ አለ።',
    overallScore: 'አጠቃላይ የጤንነት ውጤት',
    screenTime: 'የዛሬ የኮምፒውተር/ስልክ ቆይታ',
    socialUsage: 'የማህበራዊ ሚዲያ አጠቃቀም',
    positiveContent: 'አዎንታዊ ይዘት',
    wellnessTrend: 'የደህንነት አዝማሚያ',
    appUsage: 'የመተግበሪያዎች አጠቃቀም',
    contentCategories: 'የይዘት ምድቦች',
    emotionalExposure: 'የስሜት ተጋላጭነት',
    recentInsights: 'የቅርብ ጊዜ ግንዛቤዎች',
    keyTakeaway: 'ዋናው ነጥብ',
    specialists: 'የደህንነት ባለሙያዎች',
    activeSpecialist: 'ንቁ ባለሙያ',
    expertise: 'ክህሎት',
    tips: 'የባለሙያ ምክሮች',
    query: 'ይጠይቁ',
    send: 'ላክ',
    language: 'ቋንቋ',
    candidateProfile: 'የእጩ የግል ማህደር',
    healthData: 'የጤና እና ደህንነት መረጃ ማጠቃለያ',
    steps: 'የቀን እርምጃዎች',
    heartRate: 'ዕረፍት ላይ ያለ የልብ ምት',
    activeMinutes: 'ንቁ ደቂቃዎች',
    focusWindow: 'የትኩረት ጊዜ መጠን',
    joinedDate: 'የተቀላቀሉበት ቀን',
    email: 'ኢሜይል',
    role: 'ሚና',
    wellnessOverview: 'የደህንነት አጠቃላይ እይታ',
    theme: 'ገጽታ',
    personalInfo: 'የግል መረጃ',
    contactInfo: 'የእውቂያ መረጃ',
    healthExtracts: 'የጤና መረጃዎች (ከሴንሰሮች)',
    activityMetrics: 'የእንቅስቃሴ መለኪያዎች',
    mentalWellness: 'የአእምሮ ደህንነት እና እንቅልፍ',
    focusRate: 'የትኩረት ፍጥነት',
    averageSleep: 'አማካይ እንቅልፍ',
    digitalWellnessScore: 'የዲጂታል ደህንነት ውጤት',
    avatarUpload: 'ፎቶ ቀይር',
    avatarUploadDesc: 'አዲስ የመገለጫ ምስል ይስቀሉ. PNG, JPG ይፈቀዳሉ።',
    candidateDashboard: 'dwell et ዲጂታል ላብራቶሪ',
    mon: 'ሰኞ',
    tue: 'ማክሰኞ',
    wed: 'ረቡዕ',
    thu: 'ሐሙስ',
    fri: 'አርብ',
    sat: 'ቅዳሜ',
    sun: 'እሑድ',
    education: 'ትምህርት',
    entertainment: 'መዝናኛ',
    news: 'ዜና',
    passiveScrolling: 'ተገብሮ ማሸብለል',
    other: 'ሌላ',
    total: 'አጠቃላይ',
    tiktok: 'ቲክቶክ',
    youtube: 'ዩቲዩብ',
    instagram: 'ኢንስታግራም',
    facebook: 'ፌስቡክ',
    x: 'ኤክስ',
    searchPlaceholder: 'ቆይታዎችን፣ መተግበሪያዎችን ወይም መለኪያዎችን ይፈልጉ...',
    minutesMin: 'ደ',
    queryPlaceholder: 'ባለሙያውን ይጠይቁ...',
    notificationsTitle: 'ማሳወቂያዎች',
    notif1Title: 'የሌሊት ሰዓት መብዛት',
    notif1Desc: 'ትናንት ምሽት 3:30 ላይ የስልክ ቆይታዎ ጨምሮ ነበር።',
    notif2Title: 'የሳምንት ሪፖርት ደርሷል',
    notif2Desc: 'የጤንነት አጠቃላይ እይታዎ ዝግጁ ነው።',
    joinedMonthYear: 'ሰኔ 2026',

    // Subpage Amharic translations
    exposureAnalytics: 'የተጋላጭነት ትንታኔ',
    exposureAnalyticsDesc: 'በዲጂታል ፍጆታ ቅጦች እና በእውቀት ተፅእኖ ላይ ጥልቅ ጥናት።',
    contentExposureBreakdown: 'የይዘት ተጋላጭነት ዝርዝር',
    exportCsv: 'CSV ላክ',
    category: 'ምድብ',
    exposureTime: 'የተጋላጭነት ጊዜ',
    percentage: 'መቶኛ',
    impactScore: 'የተፅእኖ ውጤት',
    trend: 'አዝማሚያ',
    emotionalExposureTrends: 'የስሜት ተጋላጭነት አዝማሚያዎች',
    sevenDays: '7 ቀናት',
    thirtyDays: '30 ቀናት',
    calmFocus: 'መረጋጋት/ትኩረት',
    stressFatigue: 'ጭንቀት/ድካም',
    semanticTopics: 'ትርጉማዊ ርዕሶች',
    semanticTopicsDesc: 'በትኩረት ክፍለ ጊዜዎች ከጽሑፍ እና ከምስል ተጋላጭነት የተገኙ ዋና ጭብጦች።',
    topicResearchData: 'የምርምር መረጃ',
    topicMachineLearning: 'ማሽን ለርኒንግ',
    topicUiDesign: 'የተጠቃሚ በይነገጽ ንድፍ',
    topicNewsHeadlines: 'የዜና ርዕሰ ዜናዎች',
    topicCognitiveScience: 'የእውቀት ሳይንስ',
    topicEmailChains: 'የኢሜይል ሰንሰለቶች',
    topicSystemConfig: 'የስርዓት ውቅር',
    appImpactRanking: 'የመተግበሪያዎች ተፅእኖ ደረጃ',
    labInsights: 'የላብራቶሪ ግንዛቤዎች',
    generatePdfReport: 'ዝርዝር የፒዲኤፍ ሪፖርት አውጣ',
    chooseProtocol: 'ዕቅድዎን ይምረጡ',
    subscriptionDesc: 'ለዲጂታል ደህንነት ምርምርዎ የሚፈለገውን የመረጃ ጥግግት እና ታሪካዊ ተደራሽነት ይምረጡ። በማንኛውም ጊዜ ማሳደግ ወይም መቀነስ ይችላሉ።',
    monthly: 'በየወሩ',
    annually: 'በየዓመቱ',
    mostPopular: 'በጣም ተወዳጅ',
    everythingInBase: 'በመሰረታዊው ላይ የተካተቱ እና ተጨማሪዎች፡',
    includedInBase: 'በመሰረታዊው ውስጥ የተካተቱ፡',
    advancedTrendAnalytics: 'የላቀ የአዝማሚያ ትንታኔ',
    pdfExportFunc: 'የፒዲኤፍ ኤክስፖርት ተግባር',
    securePayment: 'ደህንነቱ የተጠበቀ የክፍያ ሂደት። በማንኛውም ጊዜ ዕቅድዎን መሰረዝ ይችላሉ።',
    recommendationsDesc: 'በቅርብ ጊዜ የዲጂታል አጠቃቀምዎ ላይ በመመስረት፣ የእውቀት ጭነትዎን ለማመቻቸት እና ትኩረትን ለማሳደግ ቁልፍ ቦታዎችን ለይተናል። የእርስዎ ግላዊ የደህንነት ግንዛቤዎች እዚህ አሉ።',
    positiveTrends: 'አዎንታዊ አዝማሚያዎች',
    focusBlocksImproving: 'Focus Blocks Improving', // Handled by tText
    vsLastWeek: 'ከባለፈው ሳምንት አንጻር',
    suggestedAction: 'የተጠቆመ ተግባር',
    riskIndicator: 'የአደጋ ጠቋሚ',
    lateNightScreenTime: 'የእኩለ ሌሊት ስልክ/ኮምፒውተር ቆይታ',
    currentAvg: 'የአሁኑ አማካይ (ከምሽቱ 5 ሰዓት በኋላ)',
    targetLabel: 'ዒላማ',
    activeWellnessGoals: 'ንቁ የደህንነት ግቦች',
    manageGoals: 'ግቦችን ያስተዳድሩ',
    inProgress: 'በሂደት ላይ',
    achieved: 'የተሳካ',
    daysRemaining: 'የቀሩ ቀናት',
    ongoing: 'ቀጣይ',
    settingsDesc: 'የምርምር መገለጫዎን፣ የአካባቢ ግላዊነት ቅንብሮችን እና የመዝገብ መረጃን ያስተዳድሩ።',
    researcherProfile: 'የምርምር መገለጫ',
    fullName: 'ሙሉ ስም',
    emailAddress: 'የኢሜይል አድራሻ',
    labRole: 'የላብራቶሪ ሚና / የሥራ መደብ',
    saveChanges: 'ለውጦችን አስቀምጥ',
    privacySettings: 'የግላዊነት እና አርቴፊሻል ኢንተለጀንስ ቅንብሮች',
    localProcessing: 'የአካባቢ ሂደት ብቻ',
    localProcessingDesc: 'ሁሉንም የጽሑፍ እና የይዘት መለኪያዎች በአካባቢው በአሳሽ ውስጥ ይተንትኑ። ምንም የርቀት አገልጋዮች አይገናኙም።',
    allowSemantic: 'ትርጉማዊ ማጠቃለያን ፍቀድ',
    allowSemanticDesc: 'ከአሳሽ ክፍለ ጊዜዎች ጭብጦችን እና የርዕስ ደመናዎችን ለማውጣት የአካባቢ የኤንኤልፒ ትራንስፎርመሮችን ይጠቀሙ።',
    continuousLogging: 'ቀጣይነት ያለው አውድ መመዝገብ',
    continuousLoggingDesc: 'አካላዊ ድካምን (ዝቅተኛ/መካከለኛ/ከፍተኛ) ለመገመት ለንቁ ክፍለ ጊዜዎች የዐውደ-ጽሑፍ ቅጽበታዊ ገጽ እይታዎችን በራስ-ሰር ያንሱ።',
    dataPortability: 'የመረጃ ተንቀሳቃሽነት',
    dataPortabilityDesc: 'የታሪክ ምርምር መረጃዎን በማንኛውም ጊዜ ይላኩ። ወይም የአካባቢዎን የውሂብ ጎታ መዝገቦች በቋሚነት ያጥፉ።',
    exportCsvLogs: 'የCSV መዝገቦችን ላክ',
    exportJsonLogs: 'የJSON መዝገቦችን ላክ',
    purgeLogs: 'ሁሉንም የላብራቶሪ መዝገቦች አጥፋ',
    wellnessReports: 'የደህንነት ሪፖርቶች',
    reportsDesc: 'የዲጂታል ልምዶችዎ አጠቃላይ ትንታኔ።',
    historicalReports: 'የቀደሙ ሪፖርቶች',
    noReportsFound: 'ለዚህ ጊዜ የተገኘ ሪፖርት የለም።',
    focusDisruption: 'ትኩረት እና መስተጓጎል',
    emotionalSplit: 'የስሜት ክፍፍል',
    calmFocused: 'መረጋጋት እና ትኩረት',
    stressedRushed: 'ውጥረት / መጣደፍ',
    neutralPassive: 'ገለልተኛ / ተገብሮ',
    selectReport: 'ዝርዝሩን ለማየት ሪፖርት ይምረጡ።',
    backToReports: 'ወደ ሪፖርቶች ተመለስ',
    downloadPdf: 'ፒዲኤፍ አውርድ',
    weekOf: 'ሳምንት',
    fatigueRisk: 'የድካም ስጋት',
    specificRecs: 'ልዩ ምክረ-ሃሳቦች'
  }
};

const textTranslations: Record<Language, Record<string, string>> = {
  en: {},
  am: {
    // Categories
    'Deep Work': 'ጥልቅ ሥራ',
    'Communication': 'መግባቢያ',
    'Passive Scrolling': 'ተገብሮ ማሸብለል',
    'Utility/Admin': 'አገልግሎት/አስተዳደር',
    
    // Apps & Labels
    'DataLab Pro': 'ዴታላብ ፕሮ',
    'TeamChat': 'ቲምቻት',
    'Social Feed': 'ሶሻል ፊድ',
    'High Focus': 'ከፍተኛ ትኩረት',
    'Fragmented': 'የተበታተነ',
    'High Drain': 'ከፍተኛ ፍሰት',
    
    // Insights
    'Optimal Focus Window': 'ምቹ የትኩረት ሰዓት',
    'Context Switching Threshold': 'የመተግበሪያ መቀያየር ደረጃ',
    'Your highest cognitive engagement occurs between 09:00 and 11:30. Consider scheduling complex analysis during this period.': 'ከፍተኛው የእውቀት ተሳትፎዎ ከጠዋቱ 3:00 እስከ 5:30 ባለው ጊዜ ውስጥ ይከሰታል። ውስብስብ ትንታኔዎችን በዚህ ጊዜ ውስጥ ለማቀድ ያስቡበት።',
    'You switched apps 42 times in the last hour of your session, correlating with a 15% drop in semantic depth.': 'ባለፈው አንድ ሰዓት ውስጥ መተግበሪያዎችን 42 ጊዜ ቀያይረዋል፣ ይህም ከ15% የስራ ጥራት መቀነስ ጋር ይዛመዳል።',

    // Reports - Titles
    'Weekly Executive Summary': 'ሳምንታዊ አጠቃላይ ማጠቃለያ',
    'Weekly Baseline Summary': 'ሳምንታዊ መሰረታዊ ማጠቃለያ',
    
    // Reports - Date Ranges
    'Oct 15 - Oct 21': 'ጥቅምት 5 - ጥቅምት 11',
    'Oct 08 - Oct 14': 'መስከረም 28 - ጥቅምት 4',

    // Reports - Summaries
    'Your digital wellness score improved by 8% this week. Focus sessions were more sustained, and late-night screen time decreased significantly. The primary detractor remains context switching during peak productivity hours.': 'በዚህ ሳምንት የዲጂታል ደህንነት ውጤትዎ በ8% አሻሽሏል። የትኩረት ክፍለ ጊዜዎች ይበልጥ የተረጋጉ ነበሩ፣ እና የሌሊት ስልክ/ኮምፒውተር አጠቃቀም በከፍተኛ ሁኔታ ቀንሷል። ዋናው እንቅፋት ግን በከፍተኛ ምርታማነት ሰዓታት ውስጥ መተግበሪያዎችን በተደጋጋሚ መቀያየርዎ ነው።',
    'Higher levels of notification disruptions were recorded. Screen time peaked during late evenings, leading to standard fatigue indicators. Deep work intervals were interrupted every 12 minutes on average.': 'ከፍተኛ የማሳወቂያ ረብሻዎች ተመዝግበዋል። የስልክ/ኮምፒውተር አጠቃቀም በምሽት ከፍተኛ ደረጃ ላይ ደርሷል፣ ይህም ወደ መደበኛ የድካም ጠቋሚዎች ይመራል። የጥልቅ ሥራ ክፍለ ጊዜዎች በአማካይ በየ12 ደቂቃው ይቋረጡ ነበር።',

    // Reports - Fatigue Risk Levels
    'Low': 'ዝቅተኛ',
    'Medium': 'መካከለኛ',
    'High': 'ከፍተኛ',

    // Reports - Recommendations
    'Implement a 10-min Evening Wind-down': 'የ10 ደቂቃ ምሽት ማረፊያ ይተግብሩ',
    'Data shows continued device usage right up to sleep time. Creating a buffer zone will improve sleep quality metrics.': 'መረጃዎች እንደሚያሳዩት እስከ መኝታ ሰዓት ድረስ ያለማቋረጥ ስልክ/ኮምፒውተር ይጠቀማሉ። የማረፊያ ጊዜ መፍጠር የዕንቅልፍ ጥራት መለኪያዎችን ያሻሽላል።',
    'Batch Email Checking': 'የኢሜይል ፍተሻን በቡድን ማድረግ',
    'You switched contexts to email 47 times during focus blocks. Try batching to 3 specific times daily.': 'በትኩረት ሰዓታት ውስጥ ወደ ኢሜይል 47 ጊዜ ቀይረዋል። በቀን ወደ 3 የተወሰኑ ጊዜያት ለመቀነስ ይሞክሩ።',
    'Silence Social Notifications': 'የማህበራዊ ማሳወቂያዎችን ጸጥ ያድርጉ',
    'Active distraction points occurred during high concentration blocks. Block non-essential notifications.': 'በትኩረት ሰዓታት ውስጥ ንቁ የማዘናጊያ ነጥቦች ተከስተዋል። አስፈላጊ ያልሆኑ ማሳወቂያዎችን ያግዱ።',

    // Subscriptions - Names
    'Base Explorer': 'መሰረታዊ መቃኛ',
    'Lab Professional': 'የላብራቶሪ ባለሙያ',
    'forever': 'ለዘላለም',
    'month': 'ወር',

    // Subscriptions - Descriptions
    'Essential tools for individual awareness and daily tracking.': 'ለግል ንቃተ-ህሊና እና ለዕለታዊ ክትትል አስፈላጊ መሣሪያዎች።',
    'Deep analytical tools and unlimited longitudinal data access.': 'ጥልቅ የትንታኔ መሣሪያዎች እና ያልተገደበ የረጅም ጊዜ መረጃ መዳረሻ።',

    // Subscriptions - Features
    'Daily Wellness Reports': 'ዕለታዊ የደህንነት ሪፖርቶች',
    '7-Day Historical Data Access': 'የ7-ቀን ታሪካዊ መረጃ መዳረሻ',
    'Basic Focus Metrics': 'መሰረታዊ የትኩረት መለኪያዎች',
    'Weekly & Monthly Meta-Reports': 'ሳምንታዊ እና ወርሃዊ ሜታ-ሪፖርቶች',
    'Unlimited History & Storage': 'ያልተገደበ ታሪክ እና ማከማቻ',
    'Advanced Predictive Analytics': 'የላቀ የትንበያ ትንታኔ',
    'Comprehensive PDF Exports': 'አጠቃላይ የፒዲኤፍ ኤክስፖርቶች',
    'Custom Goal Tracking Configurations': 'ብጁ የግብ ክትትል ውቅሮች',

    // Subscriptions - Buttons
    'Current Plan': 'የአሁኑ ዕቅድ',
    'Upgrade to Professional': 'ወደ ፕሮፌሽናል ያሳድጉ'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
  tText: (str: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'am' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (language === 'am') {
      root.classList.add('lang-am');
    } else {
      root.classList.remove('lang-am');
    }
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const tText = (str: string): string => {
    if (language === 'am') {
      return textTranslations['am'][str] || str;
    }
    return str;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
