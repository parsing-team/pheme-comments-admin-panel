'use client'

import { useState, useRef } from 'react'
import { runUserAnalysis } from './actions'
import { getAnalysisBatch } from './batch-actions'
import { useRouter } from 'next/navigation'

export default function AnalyzeAllButton() {
    const [isRunning, setIsRunning] = useState(false)
    const [processed, setProcessed] = useState(0)
    const [remaining, setRemaining] = useState(null)
    const [currentBatch, setCurrentBatch] = useState([])
    const shouldStopRef = useRef(false)
    const router = useRouter()

    const startAnalysis = async () => {
        setIsRunning(true)
        shouldStopRef.current = false
        setProcessed(0)

        try {
            while (!shouldStopRef.current) {
                // 1. Get Batch
                const { userIds, remaining: rem } = await getAnalysisBatch(5) // Small concurrent batch
                setRemaining(rem)

                if (userIds.length === 0) {
                    alert('All users analyzed!')
                    break
                }

                setCurrentBatch(userIds)

                // 2. Process Batch in Parallel
                // We use Promise.allSettled to not break on one failure
                const results = await Promise.allSettled(
                    userIds.map(id => runUserAnalysis(id))
                )

                const successCount = results.filter(r => r.status === 'fulfilled' && r.value.success).length
                setProcessed(prev => prev + successCount)

                // Optional: Refresh list every N users to show progress on UI? 
                // Too many refreshes might be annoying.
            }
        } catch (error) {
            console.error('Batch analysis error:', error)
            alert('Analysis stopped due to error: ' + error.message)
        } finally {
            setIsRunning(false)
            setCurrentBatch([])
            router.refresh()
        }
    }

    const stopAnalysis = () => {
        shouldStopRef.current = true
        setIsRunning(false) // UI update immediately, loop will break next iteration
    }

    if (isRunning) {
        return (
            <div style={{ padding: '1rem', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem' }}>Analyzing All Users...</h3>
                    <button
                        onClick={stopAnalysis}
                        className="btn"
                        style={{ color: 'var(--error)', border: '1px solid var(--error)' }}
                    >
                        Stop
                    </button>
                </div>
                <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                    Processed in this session: <b>{processed}</b>
                    {remaining !== null && <span> | Remaining: {remaining}</span>}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Current batch: {currentBatch.join(', ')}
                </div>
            </div>
        )
    }

    return (
        <button
            onClick={startAnalysis}
            className="btn btn-primary"
            style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                marginBottom: '1rem',
                width: '100%',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
            }}
        >
            ▶ Check All Users
        </button>
    )
}
