'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useProviders } from '@/hooks/use-providers'
import { ProviderButton } from '@/components/auth/provider-button'
import { Skeleton } from '@/components/ui/skeleton'
// import LoadingAnimation from '@/assets/lottie/login-loading.json'
// import { Lottie } from '@/components/lottie'

const formSchema = z.object({
    email: z.string().email({ message: 'Ingrese un email válido'}),
    password: z.string()
        .min(3, { message: 'Ingrese más de 3 caracteres' })
        .max(30, { message: 'Ingrese menos de 30 caracteres' })
})

type Props = {
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const FormComponent = ({ loading, setLoading }: Props) => {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        // Se necesita tener 'zod': '3.21.4' y @hookform/resolvers en 3.3.0 porque da error de tipos
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)

        const email = values.email
        const password = values.password

        try {
            const signInResponse = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (signInResponse?.error) {
                toast({
                    title: signInResponse.error as string,
                    variant: 'destructive',
                })
                
                form.setError('email', {
                    type: 'server',
                    message: '',
                }, {
                    shouldFocus: true
                })

                form.setError('password', {
                    type: 'server',
                    message: '',
                })
            }

            if (signInResponse?.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
            toast({
                title: 'Error',
                description: 'Algo salió mal al iniciar sesión',
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <FormField
                    control = { form.control }
                    name    = 'email'
                    render  = {({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder = 'example@mail.com'
                                    className   = 'bg-secondary'
                                    {...field}
                                />
                            </FormControl>
                            {/* <FormDescription>Esta es una descripción del campo</FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control = { form.control }
                    name    = 'password'
                    render  = {({ field }) => {
                        const [showPassword, setShowPassword] = useState(false)

                        return (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <div className='relative'>
                                        <Input
                                            type        = {showPassword ? 'text' : 'password'}
                                            placeholder = '*********'
                                            className   = 'bg-secondary'
                                            {...field}
                                        />
                                        <Button
                                            size      = 'icon'
                                            variant   = 'ghost'
                                            type      = 'button'
                                            className = 'absolute right-2 top-1/2 transform -translate-y-1/2'
                                            onClick   = {(e) => {
                                                e.preventDefault()
                                                setShowPassword(!showPassword)
                                            }}
                                        >
                                            {field.value && (showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />)}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    }
                />
                <Button
                    type      = 'submit'
                    disabled  = { loading }
                >
                    Iniciar sesión
                </Button>
            </form>
        </Form>
    )
}

export const LoginPage = () => {
    const [ loading, setLoading ] = useState(false)

    const providers = useProviders()

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <Card className="w-[200px] md:w-[500px] min-w-fit max-h-[700px] bg-background shadow-lg rounded-xl">
                <CardHeader className='flex items-center'>
                    <CardTitle className='text-xl w-full'>Sign in</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormComponent loading={loading} setLoading={setLoading} />
                    <div className='flex flex-col gap-4 mt-4'>
                        { providers ? (
                            providers.map((provider) => (
                                <ProviderButton key={provider.id} provider={provider} />
                            ))
                        ) : (
                            <>
                                <Skeleton className='w-full h-10' />
                                <Skeleton className='w-full h-10' />
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage