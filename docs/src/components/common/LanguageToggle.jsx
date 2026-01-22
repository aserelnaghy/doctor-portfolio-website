import { useTranslation } from "../../../node_modules/react-i18next";
import Button from "../ui/Button";

export default function LanguageToggle({ size = "sm" }) {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language || "en";
  const isArabic = current.startsWith("ar");

  const onToggle = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  return (
    <Button type="button" onClick={onToggle} variant="secondary" size={size}>
      {isArabic ? "EN" : "AR"}
    </Button>
  );
}
