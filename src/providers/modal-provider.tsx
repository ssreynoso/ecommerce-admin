import { StoreModal } from '@/components/modals/store-modal'
import { useIsRendered } from '@/hooks/use-is-rendered'
import React from 'react'

export const ModalProvider = () => {
    const isMounted = useIsRendered()

    if (!isMounted) {
        return null
    }

    return (
        <StoreModal />
    )
}
