import { PageLayout } from '@/components/custom/page-layout'
import { useReadConfiguration } from '@/hooks/use-read-configuration'
import { IConfigurationModel } from '@/models/configuration'
import {
  ArrowTopRightIcon,
  DesktopIcon,
  DrawingPinIcon,
  MobileIcon,
  ReloadIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'

export function InformationPage() {
  const readConfiguration = useReadConfiguration<IConfigurationModel[]>()
  const configuration = readConfiguration.data?.[0]

  function normalizeStringForGoogleMaps(input?: string): string {
    if (!input) return ''
    const normalized = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const sanitized = normalized.replace(/[^\w\s-]/g, '')
    const cleaned = sanitized.trim().replace(/\s+/g, '+')
    return cleaned.toLowerCase()
  }

  return (
    <PageLayout>
      <h2 className="text-xl font-semibold text-primary">
        Bem-vindo ao restaurante!
      </h2>
      <h3 className="text-base mt-5 text-gray-500">
        Aqui, você pode conferir as informações sobre o restaurante.
      </h3>
      <div className="mt-5">
        {configuration ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <DrawingPinIcon className="text-primary" />
              <p className="text-base text-gray-700 flex items-center gap-2">
                Endereço:{' '}
                <a
                  href={`https://www.google.com.br/maps/place/${normalizeStringForGoogleMaps(
                    configuration.address,
                  )}`}
                  className="underline text-red-400 flex items-center gap-2"
                  target="_blank"
                  rel="noreferrer"
                  title="Abrir no Google Maps"
                >
                  {configuration.address}
                  <ArrowTopRightIcon />
                </a>
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <MobileIcon className="text-primary" />
              <p className="text-base text-gray-700">
                Telefone: {configuration.phone}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <DesktopIcon className="text-primary" />
              <p className="text-base text-gray-700">
                Website: {configuration.website}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <StopwatchIcon className="text-primary h-5" />
              <p className="text-base text-gray-700">
                Horário de funcionamento: {configuration.workingHours}
              </p>
            </div>
          </div>
        ) : (
          <ReloadIcon className="w-6 h-6 animate-spin" />
        )}
      </div>
    </PageLayout>
  )
}
