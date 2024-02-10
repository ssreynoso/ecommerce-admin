'use client'

export const CopyToClipboard = function (value: string, callback: (text: string) => void) {
    // Copiar el texto al portapapeles usando la API Clipboard
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(value)
                .then(() => {
                    callback(`'${value}' copiado al portapapeles`)
                })
                .catch(() => {
                    // Manejar error de escritura en la API del portapapeles
                    fallbackCopyTextToClipboard(value, callback)
                })
        } else {
            // Navegador no compatible con la API del portapapeles
            fallbackCopyTextToClipboard(value, callback)
        }

    } catch (error) {
        console.error('Error al copiar al portapapeles:', error)
    }
}

// Solución alternativa utilizando document.execCommand para navegadores no compatibles
function fallbackCopyTextToClipboard(text: string, callback: (text: string) => void) {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)

    callback(`'${text}' copiado al portapapeles`)
}
