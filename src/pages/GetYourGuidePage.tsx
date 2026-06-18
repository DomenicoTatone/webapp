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
import { getYourGuideHomepageUrl } from '@/data/affiliates'
import { generateGetYourGuideLink } from '@/services/linkGenerator'
import { usePageMeta } from '@/hooks/usePageMeta'

export function GetYourGuidePage() {
  const { t } = useTranslation()
  usePageMeta('GetYourGuideLink')

  return (
    <div>
      <PageHeader title={t('GetYourGuideLink')} />
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('homepageLinks')}</CardTitle>
          </CardHeader>
          <CardContent>
            <HomepageLinkCard getUrl={getYourGuideHomepageUrl} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('generateDeepLinkSection')}</CardTitle>
          </CardHeader>
          <CardContent>
            <DeepLinkGenerator
              labelKey="insertGetYourGuideLink"
              placeholder="https://www.getyourguide.com/..."
              emptyWarningKey="validGetYourGuideURL"
              generate={generateGetYourGuideLink}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
