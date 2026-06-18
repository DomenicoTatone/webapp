import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PageHeader } from '@/components/shared/PageHeader'
import { HomepageLinkCard } from '@/components/shared/HomepageLinkCard'
import { DeepLinkGenerator } from '@/components/shared/DeepLinkGenerator'
import { civitatisHomepageUrl } from '@/data/affiliates'
import { generateCivitatisLink } from '@/services/linkGenerator'
import { usePageMeta } from '@/hooks/usePageMeta'

export function CivitatisPage() {
  const { t } = useTranslation()
  usePageMeta('CivitatisLink')

  return (
    <div>
      <PageHeader title={t('CivitatisLink')} />
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('homepageLinks')}</CardTitle>
          </CardHeader>
          <CardContent>
            <HomepageLinkCard getUrl={civitatisHomepageUrl} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('generateDeepLinkSection')}</CardTitle>
          </CardHeader>
          <CardContent>
            <DeepLinkGenerator
              labelKey="insertCivitatisLink"
              placeholder="https://www.civitatis.com/..."
              emptyWarningKey="validCivitatisURL"
              generate={generateCivitatisLink}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
