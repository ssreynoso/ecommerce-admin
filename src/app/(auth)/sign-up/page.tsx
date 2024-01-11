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
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { genres, genresArray } from '@/lib/genre'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getMonths } from '@/lib/date'
// import LoadingAnimation from '@/assets/lottie/login-loading.json'
// import { Lottie } from '@/components/lottie'

const formSchema = z.object({
    name:         z.string().min(3),
    surname:      z.string().min(3),
    email:        z.string().email(),
    password:     z.string().min(3).max(30),
    dayOfBirth:   z.string().min(1).max(2),
    monthOfBirth: z.string(),
    yearOfBirth:  z.string().max(4),
    genre:        genres,
})

type Props = {
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const FormComponent = ({ loading, setLoading }: Props) => {
    const { toast }    = useToast()
    const router       = useRouter()
    const selectMonths = getMonths()

    const form = useForm<z.infer<typeof formSchema>>({
        // Se necesita tener 'zod': '3.21.4' y @hookform/resolvers en 3.3.0 porque da error de tipos
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            surname: '',
            monthOfBirth: '1',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)

        // dateOfBirth: z.date()
        // .min(new Date('1900-01-01'), { message: 'Ingrese una fecha mayor a 01/01/1900' })
        // .max(getRegisterMinDate().date, { message: `Ingrese una fecha menor a ${getRegisterMinDate().formatedDate}` }),

        const email = values.email
        const password = values.password

        console.log(values)

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
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-2 max-h-[55vh] overflow-y-auto pretty-scrollbar-y px-4'
            >
                <div className='grid grid-cols-2 gap-4'>
                    <FormField
                        control = { form.control }
                        name    = 'name'
                        render  = {({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder = 'Juan'
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
                        name    = 'surname'
                        render  = {({ field }) => (
                            <FormItem>
                                <FormLabel>Surname</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder = 'Cobo'
                                        className   = 'bg-secondary'
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormDescription>Esta es una descripción del campo</FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <div className='relative'>
                                        <Input
                                            type        = {showPassword ? 'text' : 'password'}
                                            placeholder = '*********'
                                            className   = 'bg-secondary'
                                            {...field}
                                        />
                                        { field.value && (
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
                                                { showPassword ? <EyeOpenIcon /> : <EyeClosedIcon /> }
                                            </Button>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    }
                />
                <div className='grid gap-4 grid-cols-3 max-w-full'>
                    <FormField
                        control = { form.control }
                        name    = 'dayOfBirth'
                        render  = {({ field }) => (
                            <FormItem>
                                <FormLabel>Day of birth</FormLabel>
                                <FormControl>
                                    <Input
                                        type        = 'number'
                                        placeholder = 'DD'
                                        className   = 'bg-secondary'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control = { form.control }
                        name    = 'monthOfBirth'
                        render  = {({ field }) => (
                            <FormItem>
                                <FormLabel>Month of birth</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-secondary">
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent side='right'>
                                        <SelectGroup>
                                            {selectMonths.map((month) => (
                                                <SelectItem value={month.value} key={month.value}>
                                                    {`${month.label.charAt(0).toUpperCase()}${month.label.slice(1)}`}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control = { form.control }
                        name    = 'yearOfBirth'
                        render  = {({ field }) => (
                            <FormItem>
                                <FormLabel>Year of birth</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder = 'YYYY'
                                        className   = 'bg-secondary'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control = { form.control }
                    name    = 'genre'
                    render  = {({ field }) => (
                        <FormItem>
                            <FormLabel>Genre</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="bg-secondary w-full">
                                        <SelectValue placeholder='Select a genre'/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        {genresArray.map((genre) => (
                                            <SelectItem value={genre} key={genre}>
                                                {genre}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' disabled={loading} className='mt-2'>
                    Register
                </Button>
            </form>
        </Form>
    )
}

export const RegisterPage = () => {
    const [ loading, setLoading ] = useState(false)

    const providers = useProviders()

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <Card className='w-[200px] md:w-[500px] max-h-[700px] bg-background shadow-lg rounded-xl'>
                <CardHeader className='flex items-center'>
                    <CardTitle className='text-xl w-full'>Sign up</CardTitle>
                </CardHeader>
                <CardContent className='relative flex flex-col gap-4 px-2'>
                    <FormComponent
                        loading={loading}
                        setLoading={setLoading}
                    />
                    <div className='flex items-center justify-center gap-2 w-full relative h-2 px-4'>
                        <Separator className='w-1/2'/>
                        <span className='text-secondary'>o</span>
                        <Separator className='w-1/2'/>
                    </div>
                    <div className='flex flex-col justify-end px-4'>
                        { providers ? (
                            providers.map((provider) => (
                                <ProviderButton
                                    key        = { provider.id }
                                    provider   = { provider }
                                    buttonText = { (provider) => `Sign up with ${provider.name}` }
                                />
                            ))
                        ) : (
                            <>
                                <Skeleton className='w-full h-10' />
                            </>
                        )}
                        <div className='flex gap-2 items-center'>
                            <span className='text-sm text-muted-foreground'>Have an account?</span>
                            <Button variant='link' className='p-0 text-sm text-blue-500'>
                                <Link href='/sign-in'>Sign in</Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegisterPage