import * as React from 'react'
import { Text, Img, Section } from '@react-email/components'
import { Base } from './base'

export const RESET_PASSWORD = 'reset-password'

export interface ResetPasswordProps {
    email: string
    resetLink: string
    preview?: string
}

export const isResetPasswordData = (data: any): data is ResetPasswordProps =>
    !!data && typeof data.resetLink === 'string' && typeof data.email === 'string'

export const ResetPasswordEmail = ({ email, resetLink, preview = 'Reset your password' }: ResetPasswordProps) => (
    <Base preview={preview}>
        <Section className="mt-[24px] text-center">
            <Img
                src="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg"
                alt="Lumoria Studio"
                className="mx-auto w-28"
            />
        </Section>
        <Section className="text-center mt-[20px] px-[16px]">
            <Text className="text-black text-[18px] font-semibold">Resetowanie hasła</Text>
            <Text className="text-black text-[14px] leading-[22px] mt-4">Cześć {email},</Text>
            <Text className="text-black text-[14px] leading-[22px] mt-3">
                Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta. Kliknij przycisk poniżej, aby ustawić nowe hasło. Link wygasa po krótkim czasie.
            </Text>
            <Section className="mt-6 mb-4">
                <a
                    href={resetLink}
                    className="bg-[#000000] text-white no-underline px-6 py-3 rounded text-[14px] font-semibold inline-block"
                >
                    Zresetuj hasło
                </a>
            </Section>
            <Text className="text-[#666666] text-[12px] leading-[20px]">
                Jeśli nie prosiłeś o zmianę hasła, zignoruj tę wiadomość lub skontaktuj się z obsługą.
            </Text>
            <Text style={{ marginTop: 12, wordBreak: 'break-all' }}>
                <a href={resetLink} className="text-blue-600 no-underline">{resetLink}</a>
            </Text>
        </Section>
    </Base>
)

// Preview props for the email dev server
ResetPasswordEmail.PreviewProps = {
    email: 'customer@example.com',
    resetLink: 'https://example.com/reset-password?token=abc123',
    preview: 'Reset your password'
} as ResetPasswordProps
