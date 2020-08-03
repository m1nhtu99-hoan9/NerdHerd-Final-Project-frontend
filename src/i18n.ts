import i18n from 'i18n-js'

import en from './locale/en'
import vn from './locale/vn'

i18n.defaultLocale = 'vn'
/* current locale */
i18n.locale = 'vn'
/* if the secondary language misses some translations,
   display the ones from the default language
*/
i18n.fallbacks = true
i18n.translations = { vn, en }

export default i18n
