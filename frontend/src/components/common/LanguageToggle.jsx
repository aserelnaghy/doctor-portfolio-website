import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
    const { i18n } = useTranslation();
    const current = i18n.resolvedLanguage || i18n.language || "en";
    const isArabic = current.startsWith("ar");

    const onToggle = () => {
        i18n.changeLanguage(isArabic ? "en" : "ar");
    };

    return (
        <button type="button" onClick={onToggle} className="px-3 py-2 border rounded">
            {isArabic ? "EN" : "AR"}
        </button>
    );
}