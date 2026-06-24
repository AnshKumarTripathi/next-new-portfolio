"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

const translations = {
  en: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    blog: "Blog",
    resume: "RESUME",
    hero_title: "Ansh Kumar Tripathi",
    hero_subtitle: "Computer Engineering Student",
    hero_desc:
      "Computer engineering student focused on applied computer vision and learning-based image restoration — from SAR denoising at SAC-ISRO to ML-driven industrial safety systems and the Python tooling that supports them.",
    experience_title: "0. Experience",
    experience_subtitle: "Internships and industry training",
    exp_sac_role: "Research Intern",
    exp_sac_company:
      "Space Applications Centre, Indian Space Research Organisation (SAC-ISRO)",
    exp_sac_period: "Jan 2026 – Apr 2026",
    exp_sac_highlight_1:
      "Worked on image restoration and quality evaluation of SAR images.",
    exp_sac_highlight_2:
      "Researched and applied PPO reinforcement learning to develop a novel RL agent for SAR image denoising — a first in this domain.",
    exp_sac_highlight_3:
      "Combined classical and machine learning methods for image denoising.",
    exp_intel_role: "Skill Based Training (Intel AI for Manufacturing)",
    exp_intel_company: "Intel Corporation",
    exp_intel_period: "Feb 2025 – Jul 2025",
    exp_intel_highlight_1:
      "Developed a dual-approach AI accident prevention system for modular manufacturing with real-time helmet detection and a Unity 6 simulation for automated safety responses.",
    projects_title: "1. Projects",
    projects_subtitle: "A selection of my best work",
    view_all: "View All",
    blog_title: "2. Blog",
    blog_subtitle: "Latest thoughts and insights",
    maker_video_title: "3. Maker Video",
    maker_video_subtitle: "A glimpse into my creative process",
    maker_video_latest_update: "Latest Update",
    maker_video_last_updated: "Last updated 30 Nov 2025",
    maker_video_description:
      "Watch me build and explain my projects, sharing insights into my development process and problem-solving approach.",
    maker_video_click_to_load: "Click to load video",
    loading: "Loading...",
    modules: "MODULES",
    theme: "THEME",
    lang: "LANG",
    sys: "SYS",
    welcome_message: "Welcome to my portfolio",
    social_email: "EMAIL",
    social_github: "GITHUB",
    social_linkedin: "LINKEDIN",
    video: "Video",
    demo: "Demo",
    project_docsuite_name: "Doc Suite",
    project_docsuite_desc:
      "AI document automation hub with 20 PDF tools in one searchable platform — privacy-first, real-time processing with no server storage",
    project_docusplit_name: "DocuSplit",
    project_docusplit_desc:
      "Automated PDF document splitting and personalization tool",
    project_intel_name: "Intel Global Impact Fest Project",
    project_intel_desc:
      "AI-powered camera vision system for real-time hazard detection in manufacturing",
  },
  hi: {
    about: "मेरे बारे में",
    experience: "अनुभव",
    projects: "परियोजनाएं",
    blog: "ब्लॉग",
    resume: "बायोडेटा",
    hero_title: "अंश कुमार त्रिपाठी",
    hero_subtitle: "कंप्यूटर इंजीनियरिंग छात्र",
    hero_desc:
      "कंप्यूटर इंजीनियरिंग छात्र जो एप्लाइड कंप्यूटर विज़न और लर्निंग-आधारित इमेज रेस्टोरेशन पर केंद्रित हैं — SAC-ISRO में SAR डीनॉइज़िंग से लेकर ML-आधारित औद्योगिक सुरक्षा प्रणालियों और उन्हें सहायता देने वाले Python टूलिंग तक।",
    experience_title: "०. अनुभव",
    experience_subtitle: "इंटर्नशिप और उद्योग प्रशिक्षण",
    exp_sac_role: "रिसर्च इंटर्न",
    exp_sac_company:
      "स्पेस एप्लिकेशन सेंटर, भारतीय अंतरिक्ष अनुसंधान संगठन (SAC-ISRO)",
    exp_sac_period: "जन 2026 – अप्रै 2026",
    exp_sac_highlight_1:
      "SAR छवियों की पुनर्स्थापना और गुणवत्ता मूल्यांकन पर कार्य किया।",
    exp_sac_highlight_2:
      "SAR छवि डीनॉइज़िंग के लिए एक नवीन RL एजेंट विकसित करने हेतु PPO रीइन्फोर्समेंट लर्निंग का अनुसंधान और उपयोग किया।",
    exp_sac_highlight_3:
      "छवि डीनॉइज़िंग के लिए शास्त्रीय और मशीन लर्निंग विधियों का संयोजन किया।",
    exp_intel_role: "स्किल बेस्ड ट्रेनिंग (Intel AI for Manufacturing)",
    exp_intel_company: "Intel Corporation",
    exp_intel_period: "फ़र 2025 – जुल 2025",
    exp_intel_highlight_1:
      "मॉड्यूलर मैन्युफैक्चरिंग के लिए वास्तविक समय हेलमेट डिटेक्शन और Unity 6 सिमुलेशन के साथ AI दुर्घटना रोकथाम प्रणाली विकसित की।",
    projects_title: "१. परियोजनाएं",
    projects_subtitle: "मेरे सर्वोत्तम कार्यों का चयन",
    view_all: "सभी देखें",
    blog_title: "२. ब्लॉग",
    blog_subtitle: "नवीनतम विचार और अंतर्दृष्टि",
    maker_video_title: "३. निर्माता वीडियो",
    maker_video_subtitle: "मेरी रचनात्मक प्रक्रिया की एक झलक",
    maker_video_latest_update: "नवीनतम अपडेट",
    maker_video_last_updated: "अंतिम अपडेट 30 नवंबर 2025",
    maker_video_description:
      "मुझे अपनी परियोजनाओं को बनाते और समझाते हुए देखें, अपनी विकास प्रक्रिया और समस्या-समाधान दृष्टिकोण में अंतर्दृष्टि साझा करते हुए।",
    maker_video_click_to_load: "वीडियो लोड करने के लिए क्लिक करें",
    loading: "लोड हो रहा है...",
    modules: "मॉड्यूल",
    theme: "थीम",
    lang: "भाषा",
    sys: "सिस्टम",
    welcome_message: "मेरे पोर्टफोलियो में आपका स्वागत है",
    social_email: "ईमेल",
    social_github: "गिटहब",
    social_linkedin: "लिंक्डइन",
    video: "वीडियो",
    demo: "डेमो",
    project_docsuite_name: "Doc Suite",
    project_docsuite_desc:
      "20 PDF टूल वाला AI दस्तावेज़ ऑटोमेशन हब — एक खोज योग्य प्लेटफ़ॉर्म में, गोपनीयता-प्रथम, बिना सर्वर संग्रहण के रीयल-टाइम प्रसंस्करण",
    project_docusplit_name: "DocuSplit",
    project_docusplit_desc:
      "स्वचालित PDF दस्तावेज़ विभाजन और व्यक्तिगतकरण उपकरण",
    project_intel_name: "Intel Global Impact Fest Project",
    project_intel_desc:
      "विनिर्माण में वास्तविक समय खतरा पहचान के लिए AI-संचालित कैमरा दृष्टि प्रणाली",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer state updates to avoid cascading renders
    requestAnimationFrame(() => {
      setMounted(true);
      const savedLang = localStorage.getItem("language");
      if (savedLang) {
        setLanguage(savedLang);
      }
    });
  }, []);

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key) => {
    return translations[language][key] || translations["en"][key] || key;
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
