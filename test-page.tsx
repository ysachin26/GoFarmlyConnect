'use client'

import { useLanguage } from './contexts/LanguageContext'

export default function TestPage() {
  const { language, setLanguage, t } = useLanguage()
  
  return (
    <div className="p-8">
      <h1>Current Language: {language}</h1>
      <p>{t('welcome_to')}</p>
      
      <div className="flex gap-4 mt-4">
        <button onClick={() => setLanguage('en')} className="px-4 py-2 bg-blue-500 text-white rounded">
          English
        </button>
        <button onClick={() => setLanguage('hi')} className="px-4 py-2 bg-green-500 text-white rounded">
          Hindi
        </button>
        <button onClick={() => setLanguage('mr')} className="px-4 py-2 bg-red-500 text-white rounded">
          Marathi
        </button>
      </div>
    </div>
  )
}
