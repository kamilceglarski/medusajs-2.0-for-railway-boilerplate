import { Metadata } from "next"
import ResetPassword from '@modules/account/components/reset-password'
import Nav from '@modules/layout/templates/nav'

export const metadata: Metadata = {
    title: 'Resetuj hasło',
    description: 'Wyślij link do zresetowania hasła lub ustaw nowe hasło z tokenem.',
}

export default function Page() {
    return (
        <>
            <Nav />
            <div className="content-container py-24">
                <div className="max-w-sm mx-auto bg-white">
                    <ResetPassword />
                </div>
            </div>
        </>
    )
}
