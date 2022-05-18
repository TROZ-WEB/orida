import i18n from '@translations/i18n';
// the next rule MUST be disable for this file or lint:fix will try to group the two imports but date-fns disallow it
/* eslint-disable */
import formatDistance from 'date-fns/formatDistance';
import { fr } from 'date-fns/locale';
/* eslint-enable */

// wrapper of the original function to inject locale
const formatRelative = (date: Date, baseDate: Date) => {
    return `${i18n.t('once')} ${formatDistance(date, baseDate, { locale: fr })}`;
};

export default formatRelative;
