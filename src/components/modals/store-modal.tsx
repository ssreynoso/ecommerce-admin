import React, { useState } from 'react'
import axios from 'axios'
import { z } from 'zod'
import { Modal } from '../ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'

const formSchema = z.object({
    name: z.string().min(3, { message: 'The name must be at least 3 characters long' })
})

export const StoreModal = () => {
    const [loading, setLoading] = useState(false)
    const { isOpen, onClose } = useStoreModal((state) => ({
        isOpen: state.isOpen,
        onClose: state.onClose,
    }))
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        // Se necesita tener 'zod': '3.21.4' y @hookform/resolvers en 3.3.0 porque da error de tipos
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)

            const response = await axios.post('/api/stores', values)

            // Se usa window.location.assign para recargar la página por completo y que se cargue el nuevo store
            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            console.log(error)
            toast({
                title: 'Error',
                description: 'There was an error creating the store',
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title       = 'Create store'
            description = 'Add a new store to manage products and sales'
            isOpen      = { isOpen }
            onClose     = { onClose }
        >
            <div>
                <div className='space-y-4 py-2 pb-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control = { form.control }
                                name    = 'name'
                                render  = {({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder='E-Commerce' {...field} />
                                        </FormControl>
                                        {/* <FormDescription>Esta es una descripción del campo</FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='pt-6 space-x-2 flex items-center justify-end'>
                                <Button disabled={loading} type='button' variant='secondary' onClick={onClose}>Cancel</Button>
                                <Button disabled={loading} type='submit'>Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}
