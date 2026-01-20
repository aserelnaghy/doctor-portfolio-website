import { useTranslation } from 'react-i18next'

export default function LanguageToggle() {
    const { i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'

    const toggleLanguage = () => {
        i18n.changeLanguage(isArabic ? 'en' : 'ar')
    }

    return (
        <button
            type="button"
            onClick={toggleLanguage}
            className="px-3 py-2 rounded border"
            aria-label="Toggle language"
        >
            {isArabic ? 'EN' : 'AR'}
        </button>
    )
}