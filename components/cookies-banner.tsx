"use client"

import { useState, useEffect } from "react"

// Extend the Window interface to include the GA disable property
declare global {
    interface Window {
        ["ga-disable-UA-XXXXXXXX-X"]: boolean
    }
}
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { X, Settings, ChevronDown, ChevronUp, Info } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface CookiePreferences {
    essential: boolean
    functional: boolean
    analytics: boolean
    marketing: boolean
    lastUpdated: number
}

const defaultPreferences: CookiePreferences = {
    essential: true, // Essential cookies cannot be disabled
    functional: false,
    analytics: false,
    marketing: false,
    lastUpdated: 0,
}

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("cookies")

    // Load preferences from localStorage on mount
    useEffect(() => {
        const storedPreferences = localStorage.getItem("cookiePreferences")

        if (storedPreferences) {
            try {
                const parsedPreferences = JSON.parse(storedPreferences) as CookiePreferences
                setPreferences(parsedPreferences)

                // Check if preferences were set within the last 6 months (180 days)
                const sixMonthsAgo = Date.now() - 180 * 24 * 60 * 60 * 1000
                if (parsedPreferences.lastUpdated > sixMonthsAgo) {
                    setIsVisible(false)
                    return
                }
            } catch (e) {
                console.error("Error parsing cookie preferences:", e)
            }
        }

        // Show banner if no valid preferences found
        setIsVisible(true)
    }, [])

    const savePreferences = (newPreferences: Partial<CookiePreferences> = {}) => {
        const updatedPreferences = {
            ...preferences,
            ...newPreferences,
            lastUpdated: Date.now(),
        }

        localStorage.setItem("cookiePreferences", JSON.stringify(updatedPreferences))
        setPreferences(updatedPreferences)
        setIsVisible(false)

        // Apply cookie preferences
        applyCookiePreferences(updatedPreferences)
    }

    const acceptAll = () => {
        savePreferences({
            functional: true,
            analytics: true,
            marketing: true,
        })
    }

    const acceptEssential = () => {
        savePreferences({
            functional: false,
            analytics: false,
            marketing: false,
        })
    }

    const applyCookiePreferences = (prefs: CookiePreferences) => {
            window["ga-disable-UA-XXXXXXXX-X"] = true // Disable Google Analytics
        // For example, enabling/disabling Google Analytics, etc.
        console.log("Applied cookie preferences:", prefs)

        // Example: Google Analytics opt-out
        if (!prefs.analytics) {
            // Set GA opt-out cookie or disable GA
            window["ga-disable-UA-XXXXXXXX-X"] = true
        }
    }

    const openPreferenceCenter = () => {
        setIsDialogOpen(true)
    }

    if (!isVisible && !isDialogOpen) return null

    return (
        <>
            {/* Main Cookie Banner */}
            {isVisible && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 print:hidden">
                    <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-semibold text-muted">Cookie Preferences</h3>
                                <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)} className="h-8 w-8">
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Close</span>
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    CampusIQ uses cookies and similar technologies to enhance your experience, analyze traffic, and
                                    personalize content. We also share information about your use of our site with our analytics partners.
                                </p>

                                {showDetails ? (
                                    <div className="space-y-4 border rounded-md p-4 bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <div className="font-medium">Essential Cookies</div>
                                                <div className="text-xs text-gray-500">
                                                    Required for the website to function. Cannot be disabled.
                                                </div>
                                            </div>
                                            <Switch checked disabled />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <div className="font-medium">Functional Cookies</div>
                                                <div className="text-xs text-gray-500">
                                                    Enable personalized features and remember your preferences.
                                                </div>
                                            </div>
                                            <Switch
                                                checked={preferences.functional}
                                                onCheckedChange={(checked) => setPreferences({ ...preferences, functional: checked })}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <div className="font-medium">Analytics Cookies</div>
                                                <div className="text-xs text-gray-500">
                                                    Help us understand how visitors interact with our website.
                                                </div>
                                            </div>
                                            <Switch
                                                checked={preferences.analytics}
                                                onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <div className="font-medium">Marketing Cookies</div>
                                                <div className="text-xs text-gray-500">
                                                    Used to deliver relevant ads and track campaign performance.
                                                </div>
                                            </div>
                                            <Switch
                                                checked={preferences.marketing}
                                                onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-600">
                                        Click &quot;Accept All&quot; to consent to all cookies, or &quot;Customize&quot; to select your preferences. You can
                                        change your settings at any time by clicking the Cookie Preferences link in the footer.
                                    </p>
                                )}

                                <div className="flex items-center">
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="text-blue-600 p-0 h-auto"
                                        onClick={() => setShowDetails(!showDetails)}
                                    >
                                        {showDetails ? (
                                            <>
                                                <ChevronUp className="h-4 w-4 mr-1" />
                                                Hide Details
                                            </>
                                        ) : (
                                            <>
                                                <ChevronDown className="h-4 w-4 mr-1" />
                                                Customize Settings
                                            </>
                                        )}
                                    </Button>

                                    <div className="ml-auto flex gap-2">
                                        <Button variant="outline" size="sm" onClick={acceptEssential}>
                                            Essential Only
                                        </Button>
                                        {showDetails && (
                                            <Button variant="outline" size="sm" onClick={() => savePreferences()}>
                                                Save Preferences
                                            </Button>
                                        )}
                                        <Button size="sm" onClick={acceptAll}>
                                            Accept All
                                        </Button>
                                    </div>
                                </div>

                                <div className="text-xs text-gray-500 flex items-center">
                                    <Info className="h-3 w-3 mr-1" />
                                    <span>
                                        By using our website, you acknowledge that you have read and understand our{" "}
                                        <Link href="/privacy" className="text-blue-600 hover:underline">
                                            Privacy Policy
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/terms" className="text-blue-600 hover:underline">
                                            Terms of Service
                                        </Link>
                                        .
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cookie Preference Center Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Cookie Preference Center</DialogTitle>
                        <DialogDescription>
                            Manage your cookie preferences and learn more about how we use cookies.
                        </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="cookies" value={activeTab} onValueChange={setActiveTab} className="mt-4">
                        <TabsList className="grid grid-cols-3 mb-4">
                            <TabsTrigger value="cookies">Cookie Settings</TabsTrigger>
                            <TabsTrigger value="about">About Cookies</TabsTrigger>
                            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                        </TabsList>

                        <TabsContent value="cookies" className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="essential-cookies" className="font-medium">
                                            Essential Cookies
                                        </Label>
                                        <p className="text-xs text-gray-500">Required for the website to function. Cannot be disabled.</p>
                                    </div>
                                    <Switch id="essential-cookies" checked disabled />
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="functional-cookies" className="font-medium">
                                            Functional Cookies
                                        </Label>
                                        <p className="text-xs text-gray-500">Enable personalized features and remember your preferences.</p>
                                    </div>
                                    <Switch
                                        id="functional-cookies"
                                        checked={preferences.functional}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, functional: checked })}
                                    />
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="analytics-cookies" className="font-medium">
                                            Analytics Cookies
                                        </Label>
                                        <p className="text-xs text-gray-500">Help us understand how visitors interact with our website.</p>
                                    </div>
                                    <Switch
                                        id="analytics-cookies"
                                        checked={preferences.analytics}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
                                    />
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="marketing-cookies" className="font-medium">
                                            Marketing Cookies
                                        </Label>
                                        <p className="text-xs text-gray-500">
                                            Used to deliver relevant ads and track campaign performance.
                                        </p>
                                    </div>
                                    <Switch
                                        id="marketing-cookies"
                                        checked={preferences.marketing}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="about">
                            <div className="space-y-4 text-sm">
                                <h4 className="font-semibold">What Are Cookies?</h4>
                                <p>
                                    Cookies are small text files that are stored on your device when you visit a website. They are widely
                                    used to make websites work more efficiently and provide information to the website owners.
                                </p>

                                <h4 className="font-semibold">How We Use Cookies</h4>
                                <p>CampusIQ uses cookies for the following purposes:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>
                                        <strong>Essential:</strong> These cookies are necessary for the website to function properly.
                                    </li>
                                    <li>
                                        <strong>Functional:</strong> These cookies enable personalized features and remember your
                                        preferences.
                                    </li>
                                    <li>
                                        <strong>Analytics:</strong> These cookies help us understand how visitors interact with our website.
                                    </li>
                                    <li>
                                        <strong>Marketing:</strong> These cookies are used to deliver relevant ads and track campaign
                                        performance.
                                    </li>
                                </ul>

                                <h4 className="font-semibold">Managing Cookies</h4>
                                <p>
                                    Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse
                                    cookies, or to alert you when cookies are being sent. The Help function in your browser should provide
                                    information on how to manage your cookie settings.
                                </p>
                            </div>
                        </TabsContent>

                        <TabsContent value="privacy">
                            <div className="space-y-4 text-sm">
                                <h4 className="font-semibold">Cookie Policy and Privacy</h4>
                                <p>
                                    Our use of cookies is covered in our Privacy Policy. We are committed to protecting your privacy and
                                    complying with applicable data protection laws, including the General Data Protection Regulation
                                    (GDPR) and the California Consumer Privacy Act (CCPA).
                                </p>

                                <h4 className="font-semibold">Your Rights</h4>
                                <p>
                                    Depending on your location, you may have certain rights regarding your personal information, including
                                    the right to access, correct, delete, or restrict the processing of your data.
                                </p>

                                <div className="mt-4">
                                    <Link href="/privacy" className="text-blue-600 hover:underline">
                                        View our full Privacy Policy
                                    </Link>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <div className="flex gap-2 mb-2 sm:mb-0">
                            <Button variant="outline" onClick={acceptEssential}>
                                Essential Only
                            </Button>
                            <Button variant="outline" onClick={() => savePreferences()}>
                                Save Preferences
                            </Button>
                            <Button onClick={acceptAll}>Accept All</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Floating button to reopen cookie preferences */}
            {!isVisible && !isDialogOpen && (
                <Button
                    variant="outline"
                    size="sm"
                    className="fixed bottom-4 left-4 z-50 shadow-md print:hidden flex items-center gap-1"
                    onClick={openPreferenceCenter}
                >
                    <Settings className="h-4 w-4" />
                    Cookie Settings
                </Button>
            )}
        </>
    )
}

