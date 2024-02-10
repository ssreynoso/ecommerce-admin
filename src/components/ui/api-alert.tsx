'use client'

import { CopyIcon, ServerIcon } from "lucide-react"

import { CopyToClipboard } from "@/lib/copy-to-clipboard"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge, BadgeProps } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

type ApiAlertVariants = 'public' | 'admin'

interface ApiAlertProps {
    title: string
    description: string
    variant?: ApiAlertVariants
}

const textMap: Record<ApiAlertVariants, string> = {
    public: 'Public',
    admin: 'Admin',
}

const variantMap: Record<ApiAlertVariants, BadgeProps['variant']> = {
    public: 'secondary',
    admin: 'destructive',
}

export const ApiAlert = ({ title, description, variant = 'public' }: ApiAlertProps) => {
    const { toast } = useToast()
    
    const onCopy = () => {
        CopyToClipboard(description, () => {
            toast({ title: 'Copied' })
        })
    }

    return (
        <Alert>
            <ServerIcon className="w-4 h-4" />
            <AlertTitle className="h-4 flex gap-2 items-center">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className='relative rounded bg-muted px-[0.3rem] py-[0.3rem] font-mono text-sm font-semibold'>
                    {description}
                </code>
                <Button variant='outline' size='icon' onClick={onCopy}>
                    <CopyIcon className="w-4 h-4" />
                </Button>
            </AlertDescription>
        </Alert>
    )
}
