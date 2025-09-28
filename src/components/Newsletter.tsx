import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { Mail, Check, AlertCircle, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Newsletter() {
    const { t } = useTranslation()
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState("")

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email.trim()) {
            setStatus('error')
            setMessage(t('newsletter.error_empty'))
            return
        }

        if (!validateEmail(email)) {
            setStatus('error')
            setMessage(t('newsletter.error_invalid'))
            return
        }

        setStatus('loading')

        try {
            // Simulate API call - replace with your actual newsletter API
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Here you would typically call your newsletter API
            // const response = await fetch('/api/newsletter/subscribe', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ email })
            // })

            setStatus('success')
            setMessage(t('newsletter.success_message'))
            setEmail("")

            // Reset success message after 5 seconds
            setTimeout(() => {
                setStatus('idle')
                setMessage("")
            }, 5000)

        } catch (error) {
            setStatus('error')
            setMessage(t('newsletter.error_general'))
        }
    }

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Background with Moroccan-inspired elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-orange/5 to-background">
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-orange/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="inline-block mb-6">
                            <span className="text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 px-4 py-2 rounded-full">
                                {t('newsletter.badge')}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            {t('newsletter.title')}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            {t('newsletter.description')}
                        </p>
                    </div>

                    {/* Newsletter Form */}
                    <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Input */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <Input
                                            type="email"
                                            placeholder={t('newsletter.email_placeholder')}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10 h-12 text-base border-2 focus:border-primary transition-colors"
                                            disabled={status === 'loading'}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={status === 'loading'}
                                        className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-semibold flex items-center space-x-2 transition-all duration-300 hover:shadow-lg"
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                                <span>{t('newsletter.subscribing')}</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                <span>{t('newsletter.subscribe_button')}</span>
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {/* Status Messages */}
                                {message && (
                                    <div className={`flex items-center justify-center space-x-2 p-4 rounded-lg transition-all duration-300 ${status === 'success'
                                            ? 'bg-green-50 text-green-700 border border-green-200'
                                            : 'bg-red-50 text-red-700 border border-red-200'
                                        }`}>
                                        {status === 'success' ? (
                                            <Check className="w-5 h-5 flex-shrink-0" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        )}
                                        <span className="text-sm font-medium">{message}</span>
                                    </div>
                                )}

                                {/* Benefits */}
                                <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Mail className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h4 className="font-semibold text-sm text-gray-900 mb-1">{t('newsletter.benefit1_title')}</h4>
                                        <p className="text-xs text-gray-600">{t('newsletter.benefit1_desc')}</p>
                                    </div>

                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Send className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <h4 className="font-semibold text-sm text-gray-900 mb-1">{t('newsletter.benefit2_title')}</h4>
                                        <p className="text-xs text-gray-600">{t('newsletter.benefit2_desc')}</p>
                                    </div>

                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Check className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <h4 className="font-semibold text-sm text-gray-900 mb-1">{t('newsletter.benefit3_title')}</h4>
                                        <p className="text-xs text-gray-600">{t('newsletter.benefit3_desc')}</p>
                                    </div>
                                </div>

                                {/* Privacy Notice */}
                                <p className="text-xs text-gray-500 text-center">
                                    {t('newsletter.privacy_notice')}
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}