'use client'

import { PropsWithChildren } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog"

type ModalProps = PropsWithChildren<{
    title: string,
    description: string,
    isOpen: boolean,
    onClose: () => void,
}>

export const Modal = (props: ModalProps) => {
    const { title, description, isOpen, onClose, children } = props

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
