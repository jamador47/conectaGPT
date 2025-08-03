import { useTranslation as useI18nTranslation } from 'react-i18next'

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation()
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }
  
  const currentLanguage = i18n.language
  
  return {
    t,
    changeLanguage,
    currentLanguage,
    isSpanish: currentLanguage === 'es',
    isEnglish: currentLanguage === 'en'
  }
}

export default useTranslation