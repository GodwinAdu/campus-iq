"use client"

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const DangerZone = ({ school }:{school:ISchool}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [showDeactivateConfirmation, setShowDeactivateConfirmation] = useState(false)

   
    return (
                <div className="space-y-6">
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>
                            The actions in this section can have severe consequences. Proceed with extreme caution.
                        </AlertDescription>
                    </Alert>
                    <div className="grid gap-4">
                        
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-semibold mb-2">Deactivate School Account</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Temporarily disable this school. This will prevent any new orders or operations.
                                </p>
                                <Button variant="outline" onClick={() => setShowDeactivateConfirmation(true)}>
                                    Deactivate
                                </Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-semibold mb-2">Delete School Account</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Permanently delete this branch and all associated data. This action cannot be undone.
                                </p>
                                <Button variant="destructive" onClick={() => setShowDeleteConfirmation(true)}>
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

    )
}

export default DangerZone