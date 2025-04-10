'use client'

import { useHotkeys } from 'react-hotkeys-hook'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { logout } from '@/lib/helpers/logout'
import { toast } from './use-toast'

type Shortcut = {
    keys: string[]
    description: string
    action: () => void
}

export const Hotkeys = () => {
    const router = useRouter()
    const { schoolId, userId } = useParams()

    const [showHelp, setShowHelp] = useState(false)

    const loggingout = () => {
        logout()
        router.push('/')
        toast({
            title: 'Logged out',
            description: 'You have been logged out successfully.',
            // variant: 'success',
        })
    }

    const shortcuts: Shortcut[] = [
        // 🔄 Navigation
        {
            keys: ['ctrl+1', 'meta+1'],
            description: 'Go to Dashboard',
            action: () => router.push(`/${schoolId}/admin/${userId}`),
        },
        {
            keys: ['ctrl+2', 'meta+2'],
            description: 'Go to Students',
            action: () => router.push(`/${schoolId}/students`),
        },
        {
            keys: ['ctrl+3', 'meta+3'],
            description: 'Go to Teachers',
            action: () => router.push(`/${schoolId}/teachers`),
        },
        {
            keys: ['ctrl+4', 'meta+4'],
            description: 'Go to Classes',
            action: () => router.push(`/${schoolId}/classes`),
        },
        {
            keys: ['ctrl+5', 'meta+5'],
            description: 'Go to Exams',
            action: () => router.push(`/${schoolId}/exams`),
        },
        {
            keys: ['ctrl+alt+b', 'meta+alt+b'],
            description: 'Go to Back',
            action: () => router.back(),
        },

        // ➕ Create entries
        {
            keys: ['ctrl+alt+n', 'meta+alt+n'],
            description: 'New Student',
            action: () => router.push(`/${schoolId}/students/new`),
        },
        {
            keys: ['ctrl+alt+t', 'meta+alt+t'],
            description: 'New Teacher',
            action: () => router.push(`/${schoolId}/teachers/new`),
        },
        {
            keys: ['ctrl+alt+c', 'meta+alt+c'],
            description: 'New Class',
            action: () => router.push(`/${schoolId}/classes/new`),
        },
        {
            keys: ['ctrl+alt+e', 'meta+alt+e'],
            description: 'New Exam',
            action: () => router.push(`/${schoolId}/exams/new`),
        },

        // 🔒 Auth
        {
            keys: ['ctrl+s', 'meta+s'],
            description: 'Sign In',
            action: () => router.push('/sign-in'),
        },
        {
            keys: ['ctrl+shift+l', 'meta+shift+l'],
            description: 'Logout',
            action: () => loggingout(),
        },

        // ⚙️ Modals
        {
            keys: ['alt+shift+s'],
            description: 'Open Settings Modal',
            action: () => window.dispatchEvent(new CustomEvent('OPEN_SETTINGS_MODAL')),
        },
        {
            keys: ['alt+shift+f'],
            description: 'Open Search Modal',
            action: () => window.dispatchEvent(new CustomEvent('OPEN_SEARCH_MODAL')),
        },

        // 🌗 Theme
        {
            keys: ['ctrl+shift+d', 'meta+shift+d'],
            description: 'Toggle Dark Mode',
            action: () => document.body.classList.toggle('dark'),
        },

        // ❓ Help Overlay
        {
            keys: ['?'],
            description: 'Show/Hide Hotkey Help',
            action: () => setShowHelp((prev) => !prev),
        },
    ]

    // Register all hotkeys
    shortcuts.forEach(({ keys, action }) => {
        useHotkeys(keys, action, { enableOnFormTags: ['INPUT', 'TEXTAREA', 'SELECT'] }, [schoolId, userId])
    })

    // Cleanup and return the hotkey overlay
    return (
        <>
            {showHelp && (
                <div className="fixed top-10 right-10 z-[9999] bg-white dark:bg-black text-sm shadow-xl rounded-xl p-6 w-[320px] max-h-[80vh] overflow-auto border border-gray-300 dark:border-gray-700">
                    <h2 className="text-lg font-semibold mb-4">⌨️ Keyboard Shortcuts</h2>
                    <ul className="space-y-3">
                        {shortcuts.map((shortcut, i) => (
                            <li key={i} className="flex justify-between text-gray-700 dark:text-gray-300">
                                <span>{shortcut.description}</span>
                                <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                                    {shortcut.keys[0].replace('meta', '⌘')}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}
