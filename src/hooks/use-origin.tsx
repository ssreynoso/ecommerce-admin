import { useIsMounted } from './use-is-mounted'

export const useOrigin = () => {
    const isMounted = useIsMounted()

    if (!isMounted) return ''

    const origin = typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : ''

    return origin
}
