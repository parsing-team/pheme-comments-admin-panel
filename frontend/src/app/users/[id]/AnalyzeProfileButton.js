'use client'

import { useState, startTransition } from 'react'
import { runUserAnalysis } from '../../services/user-tracking/actions'
import { useRouter } from 'next/navigation'

export default function AnalyzeProfileButton({ userId }) {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const router = useRouter()

    const handleAnalyze = async () => {
        setIsAnalyzing(true)
        try {
            const result = await runUserAnalysis(userId)
            if (result.success) {
                startTransition(() => {
                    router.refresh()
                })
            } else {
                alert('Analysis failed: ' + result.error)
            }
        } catch (error) {
            console.error('Error running analysis:', error)
            alert('Analysis error')
        } finally {
            setIsAnalyzing(false)
        }
    }

    return (
        <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="btn btn-primary"
            style={{
                background: isAnalyzing ? 'var(--text-muted)' : 'var(--primary)',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: isAnalyzing ? 'not-allowed' : 'pointer'
            }}
        >
            {isAnalyzing ? 'Analyzing...' : '🔎 Run Suspicion Check'}
        </button>
    )
}
