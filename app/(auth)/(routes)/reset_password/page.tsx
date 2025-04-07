"use client"

import type React from "react"

import { use, useState } from "react"
import Link from "next/link"
import { KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { resetPassword } from "@/lib/actions/reset-password.actions"


type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default function ResetPasswordPage(props: {

    searchParams: SearchParams
}) {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const searchParams = use(props.searchParams)

    const token = searchParams.token

    console.log("Token:", token)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password.length < 8) {
            setError("Password must be at least 8 characters")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            await resetPassword(token as string, password)

            setSuccess(true)
        } catch (err) {
            setError("An error occurred. Please try again.")
            console.error(err)
        } finally {
            setIsLoading(false)
            setPassword("")
            setConfirmPassword("")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-primary/10 p-3">
                            <KeyRound className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
                    <CardDescription className="text-center">Create a new password for your account</CardDescription>
                </CardHeader>
                <CardContent>
                    {success ? (
                        <div className="space-y-4">
                            <Alert className="bg-green-50 border-green-200">
                                <AlertDescription className="text-green-800">
                                    Your password has been successfully reset!
                                </AlertDescription>
                            </Alert>
                            <Button className="w-full" asChild>
                                <Link href="/login">Return to Login</Link>
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>

                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Resetting..." : "Reset Password"}
                            </Button>
                        </form>
                    )}
                </CardContent>
                {!success && (
                    <CardFooter className="flex justify-center border-t pt-4">
                        <Button variant="link" asChild className="text-sm text-muted-foreground">
                            <Link href="/login">Back to login</Link>
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}

