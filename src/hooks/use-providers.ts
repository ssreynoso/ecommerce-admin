import { ClientSafeProvider, getProviders } from 'next-auth/react'
import { useEffect, useState } from 'react'

// type Providers = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>

export const useProviders = () => {
    const [providers, setProviders] = useState<ClientSafeProvider[] | null>(null)

    useEffect(() => {
        const fetchProviders = async () => {
            const fetchedProviders = await getProviders()
            const convertedProviders = fetchedProviders
                ? Object.values(fetchedProviders)
                    .filter(provider => provider.type === 'oauth')
                : null
            setProviders(convertedProviders)
        }

        fetchProviders()
    })

    return providers
}
