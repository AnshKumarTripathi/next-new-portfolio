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
    projects: "Projects",
    blog: "Blog",
    resume: "RESUME",
    hero_title: "Ansh Kumar Tripathi",
    hero_subtitle: "Software Engineering Student",
    hero_desc:
      "I build secure systems, intelligent models, and engaging games (according to my mom) — combining deep curiosity with hands-on engineering to solve real-world problems in Cybersecurity, AI/ML, and Game Dev.",
    projects_title: "0. Projects",
    projects_subtitle: "A selection of my best work",
    view_all: "View All",
    blog_title: "1. Blog",
    blog_subtitle: "Latest thoughts and insights",
    maker_video_title: "2. Maker Video",
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
    project_resumespace_name: "ResumeSpace",
    project_resumespace_desc:
      "Privacy-focused resume building tool with complete client-side processing",
    project_docusplit_name: "DocuSplit",
    project_docusplit_desc:
      "Automated PDF document splitting and personalization tool",
    project_intel_name: "Intel Global Impact Fest Project",
    project_intel_desc:
      "AI-powered camera vision system for real-time hazard detection in manufacturing",
  },
  hi: {
    about: "मेरे बारे में",
    projects: "परियोजनाएं",
    blog: "ब्लॉग",
    resume: "बायोडेटा",
    hero_title: "अंश कुमार त्रिपाठी",
    hero_subtitle: "सॉफ्टवेयर इंजीनियरिंग छात्र",
    hero_desc:
      "मैं सुरक्षित सिस्टम, बुद्धिमान मॉडल और आकर्षक गेम बनाता हूं (मेरी माँ के अनुसार) — साइबर सुरक्षा, एआई/एमएल और गेम डेवलपमेंट में वास्तविक दुनिया की समस्याओं को हल करने के लिए व्यावहारिक इंजीनियरिंग के साथ गहरी जिज्ञासा का संयोजन।",
    projects_title: "0. परियोजनाएं",
    projects_subtitle: "मेरे सर्वोत्तम कार्यों का चयन",
    view_all: "सभी देखें",
    blog_title: "१. ब्लॉग",
    blog_subtitle: "नवीनतम विचार और अंतर्दृष्टि",
    maker_video_title: "	२. निर्माता वीडियो",
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
    project_resumespace_name: "ResumeSpace",
    project_resumespace_desc:
      "पूर्ण क्लाइंट-साइड प्रसंस्करण के साथ गोपनीयता-केंद्रित रिज्यूम निर्माण उपकरण",
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
