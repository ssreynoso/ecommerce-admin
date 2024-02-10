import { ModeToggle } from '@/components/dark-mode-toggle-button'
import { AuthButton } from './auth/auth-button'
import { MainNav } from './main-nav'
import { StoreSwitcher } from './store-switcher'
import { NavBarDynamicBackground } from './nav-bar-dynamic-background'
import { getServerSessionData } from '@/lib/server-session'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'

export const NavBar = async () => {
    const { authenticated, data } = await getServerSessionData()
    if (!authenticated || !data.userId) {
        redirect('/sign-in')
    }
    const { userId } = data
    const stores = await prismadb.store.findMany({
        where: { userId },
    })

    return (
        <NavBarDynamicBackground>
            <div className="container h-full flex items-center relative gap-8">
                {/* <Image src={Logo} alt='Logo' className='h-2/3 max-h-10 w-max absolute left-0' /> */}
                <StoreSwitcher items={stores} />
                <MainNav/>
                <div className='absolute right-0 hidden xl:inline-flex gap-2'>
                    <AuthButton />
                    <ModeToggle />
                </div>
                {/* <ChangeTheme /> */}
            </div>
        </NavBarDynamicBackground>
    )
}