import { useTranslation } from 'react-i18next'

const LanguageToggle = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="relative">
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="appearance-none p-2 pr-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white text-sm cursor-pointer"
      >
        <option value="en">EN</option>
        <option value="ur">UR</option>
      </select>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}

export default LanguageToggle