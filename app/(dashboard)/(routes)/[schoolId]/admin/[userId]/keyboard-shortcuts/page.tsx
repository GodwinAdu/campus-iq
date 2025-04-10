import { KeyboardShortcuts } from "./_components/keyboard-shortcut";


export default function Shortcuts() {
    return (

        <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
            <main className="container mx-auto py-8">
                <KeyboardShortcuts />
            </main>
        </div>

    )
}
