import Changelog from '@/components/Changelog'
import DownloadSection from '@/components/DownloadSection'
import FAQSection from '@/components/FAQSection'
import FeatureComparison from '@/components/FeatureComparison'
import SystemRequirements from '@/components/SystemRequirements'
import React from 'react'

const page = () => {
    return (
        <main className='min-h-screen bg-gray-900 text-white'>
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center mb-8">Download Our School Management App</h1>
                <DownloadSection />
                <SystemRequirements />
                <Changelog />
                <FeatureComparison />
                <FAQSection />
                {/* <LiveChat /> */}
            </div>
        </main>
    )
}

export default page