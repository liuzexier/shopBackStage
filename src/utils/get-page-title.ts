import defaultSettings from '@/settings.js'

const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle(pageTitle: any) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
