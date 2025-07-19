"use client"

import AuthenticationVideo from '@/components/AuthenticationVideo';
import React, { useState } from 'react'

const CaptureSample = () => {
    const [formData, setFormData] = useState<FormData | null>(null);
    const [base64, setBase64] = useState<string | null>(null);
    const [authenticationText, setAuthenticationText] = useState<string | null>(null);
    const [recordedURL, setRecordedURL] = useState<string | null>(null);

    const handleBase64 = (base64: string | null) => {
        console.log("base64:", base64);
        setBase64(base64);
    };

    const handleAuthenticationText = (authenticationText: string | null) => {
        console.log("authenticationText:", authenticationText);
        setAuthenticationText(authenticationText);
    };

    const handleFormData = (formData: FormData | null) => {
        console.log("formData:", formData);
        setFormData(formData);
    };

    const handleFinalize = (recordedURL: string) => {
        console.log("recordedURL:", recordedURL);
        setRecordedURL(recordedURL);
    }

    return (
        <div className="p-6 w-full h-screen flex items-center justify-center flex-col gap-12">
            <h1 className="text-5xl font-bold">Custom Video Player</h1>

            <AuthenticationVideo
                onBase64Ready={handleBase64}
                onAuthenticationTextReady={handleAuthenticationText}
                onFormDataReady={handleFormData}
                onFinalize={handleFinalize}
            />
        </div>
    )
}

export default CaptureSample