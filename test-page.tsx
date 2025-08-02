'use client'

import { useLanguage } from './contexts/LanguageContext'

export default function TestPage() {
  const { language, setLanguage, t } = useLanguage()
  
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
    { code: "bn", name: "বাংলা" },
    { code: "te", name: "తెలుగు" },
    { code: "mr", name: "मराठी" },
    { code: "ta", name: "தமிழ்" },
    { code: "gu", name: "ગુજરાતી" },
    { code: "kn", name: "ಕನ್ನಡ" },
    { code: "ml", name: "മലയാളം" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
    { code: "or", name: "ଓଡ଼ିଆ" },
    { code: "as", name: "অসমীয়া" },
    { code: "ur", name: "اردو" },
  ]
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Translation Test Page</h1>
      <p className="mb-4">Current Language: {language}</p>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Test Translations:</h2>
        <div className="space-y-2">
          <p><strong>Welcome:</strong> {t('welcome_to')}</p>
          <p><strong>About Us:</strong> {t('about_us')}</p>
          <p><strong>Services:</strong> {t('services')}</p>
          <p><strong>Dashboard:</strong> {t('dashboard')}</p>
          <p><strong>Loading:</strong> {t('loading')}</p>
          <p><strong>Save:</strong> {t('save')}</p>
          <p><strong>Cancel:</strong> {t('cancel')}</p>
          <p><strong>Submit:</strong> {t('submit')}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Language Selector:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {languages.map((lang) => (
            <button 
              key={lang.code}
              onClick={() => setLanguage(lang.code)} 
              className={`px-4 py-2 rounded border transition-colors ${
                language === lang.code 
                  ? 'bg-blue-500 text-white border-blue-600' 
                  : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Translation Status:</h3>
        <p className="text-sm">
          {language === 'en' ? 'English (default)' : 
           language === 'hi' ? 'Hindi translations loaded' :
           language === 'bn' ? 'Bengali translations loaded' :
           language === 'te' ? 'Telugu translations loaded' :
           language === 'mr' ? 'Marathi translations loaded' :
           language === 'ta' ? 'Tamil translations loaded' :
           language === 'gu' ? 'Gujarati translations loaded' :
           language === 'kn' ? 'Kannada translations loaded' :
           language === 'ml' ? 'Malayalam translations loaded' :
           language === 'pa' ? 'Punjabi translations loaded' :
           language === 'or' ? 'Odia translations loaded' :
           language === 'as' ? 'Assamese translations loaded' :
           language === 'ur' ? 'Urdu translations loaded' :
           'Additional language translations loaded'}
        </p>
      </div>
    </div>
  )
}
