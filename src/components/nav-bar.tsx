'use client'

import Link from 'next/link'
// import Image from 'next/image'
// import Logo from '@/assets/logo.png'
import { useBoolean, useEventListener } from 'usehooks-ts'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
// import { useMediaQueryXl } from '@/hooks/use-media-queries'
import { ModeToggle } from '@/components/dark-mode-toggle-button'
import { DropdownNavbarMenu } from '@/components/dropdown-navbar-menu'
import { NavBarOption } from '@/types/utils'
import { AuthButton } from './auth/auth-button'
// import { ChangeTheme } from './change-theme'

const NavOptions = ({ options }: { options: NavBarOption[] }) => (
    <ul className={cn('hidden xl:flex xl:flex-row xl:gap-5')}>
        { options.map(op => (
            <li key={op.value}>
                <Button variant="link"> 
                    <Link href={op.value}>{op.label}</Link>
                </Button>
            </li>
        ))}
    </ul>
)


export const NavBar = () => {
    const { value: moved, setFalse: setMovedFalse, setTrue: setMovedTrue } = useBoolean(false)

    const navOptions = [
        { label: 'Home', value: '' },
        { label: 'About', value: '#about' },
        { label: 'Contact', value: '#contact' },
        { label: 'Etc...', value: '#etc' },
    ]

    const onScroll = () => {
        if (window.scrollY > 0) {
            setMovedTrue()
        } else {
            setMovedFalse()
        }
    }

    useEventListener('scroll', onScroll)

    return (
        <nav
            className={cn(
                'px-4 w-full h-nav-bar-height border-b border-b-transparent xl:px-0',
                'transition-all fixed z-50 top-0 backdrop-blur-md',
                moved && 'border-b-border'
            )}
        >
            <div className="w-full h-full mx-auto max-w-7xl flex justify-center items-center relative">
                {/* <Image src={Logo} alt='Logo' className='h-2/3 max-h-10 w-max absolute left-0' /> */}
                <NavOptions options={navOptions}/>
                <DropdownNavbarMenu options={navOptions} className='xl:hidden'/>
                <div className='absolute right-0 hidden xl:inline-flex gap-2'>
                    <AuthButton />
                    <ModeToggle />
                </div>
                {/* <ChangeTheme /> */}
            </div>
        </nav>
    )
}