import React from 'react'
import { Modal } from '../ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'

export const StoreModal = () => {
    const { isOpen, onClose } = useStoreModal()

    return (
        <Modal
            title       = 'Create store'
            description = 'Add a new store to manage products and sales'
            isOpen      = { isOpen }
            onClose     = { onClose }
        >
            Future Create Store Form
        </Modal>
    )
}
