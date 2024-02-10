import { StoreModal } from '@/components/modals/store-modal'
import { useIsMounted } from '@/hooks/use-is-mounted'
import React from 'react'

export const ModalProvider = () => {
    const isMounted = useIsMounted()

    if (!isMounted) {
        return null
    }

    return (
        <StoreModal />
    )
}
