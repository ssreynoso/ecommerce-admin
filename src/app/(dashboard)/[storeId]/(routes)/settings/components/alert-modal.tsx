'use client'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useIsMounted } from '@/hooks/use-is-mounted'

interface AlertModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    loading: boolean
}

export const AlertModal = (props: AlertModalProps) => {
    const { isOpen, onClose, onConfirm, loading } = props

    const isMounted = useIsMounted()

    if (!isMounted) return null

    return (
        <Modal 
            title       = 'Are you sure?'
            description = 'This action cannot be undone.'
            isOpen      = { isOpen }
            onClose     = { onClose }
        >
            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button disabled={loading} onClick={onClose} variant='outline'>
                    Cancel
                </Button>
                <Button disabled={loading} onClick={onConfirm} variant='destructive'>
                    Delete
                </Button>
            </div>
        </Modal>
    )
}
