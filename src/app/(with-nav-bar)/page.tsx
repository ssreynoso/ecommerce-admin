'use client'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useEffect } from 'react'
 
const Home = () => {
    const { isOpen, onOpen } = useStoreModal((state) => ({
        isOpen: state.isOpen,
        onOpen: state.onOpen,
    }))

    useEffect(() => {
        if (!isOpen) {
            onOpen()
        }
    }, [isOpen, onOpen])

    return (
        <div className="w-full h-screen-nav-bar bg-background flex justify-center items-center">
            <h1 className="text-4xl">Hola bro</h1>
        </div>
    )
}

export default Home
