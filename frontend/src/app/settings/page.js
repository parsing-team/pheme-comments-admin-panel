'use client'

import { useState } from 'react'
import { ANALYSIS_CONFIG } from '@/config/twitter-analysis'
import { saveConfig } from './actions'

export default function SettingsPage() {
    const [message, setMessage] = useState(null)
    const [isSaving, setIsSaving] = useState(false)

    const handleSubmit = async (formData) => {
        setIsSaving(true)
        setMessage(null)

        const result = await saveConfig(formData)

        setMessage({
            type: result.success ? 'success' : 'error',
            text: result.message
        })
        setIsSaving(false)
    }

    // Recursive function to render config fields
    const renderFields = (obj, prefix = '', depth = 0) => {
        return Object.entries(obj).map(([key, value]) => {
            const path = prefix ? `${prefix}.${key}` : key
            const isObject = typeof value === 'object' && value !== null && !Array.isArray(value)

            if (isObject) {
                return (
                    <div key={path} style={{ marginBottom: '1.5rem', marginLeft: depth * 20 + 'px' }}>
                        <h3 style={{
                            fontSize: `${1.2 - depth * 0.1}rem`,
                            fontWeight: '600',
                            marginBottom: '1rem',
                            color: 'var(--primary)',
                            textTransform: 'capitalize'
                        }}>
                            {key.replace(/_/g, ' ')}
                        </h3>
                        <div style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--border)' }}>
                            {renderFields(value, path, depth + 1)}
                        </div>
                    </div>
                )
            }

            return (
                <div key={path} style={{ marginBottom: '1rem', marginLeft: depth * 20 + 'px' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
                        {key.replace(/_/g, ' ')}
                    </label>
                    <input
                        type={typeof value === 'number' ? 'number' : 'text'}
                        name={path}
                        defaultValue={value}
                        step={typeof value === 'number' && !Number.isInteger(value) ? '0.01' : '1'}
                        className="input"
                        style={{ width: '100%', maxWidth: '400px' }}
                    />
                </div>
            )
        })
    }

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    ⚙️ Settings
                </h1>
                <p className="text-muted">
                    Configure analysis parameters and thresholds. Changes affect the `src/config/twitter-analysis.js` file.
                </p>
            </div>

            {message && (
                <div className={`card ${message.type === 'error' ? 'error' : ''}`} style={{
                    padding: '1rem',
                    marginBottom: '2rem',
                    backgroundColor: message.type === 'success' ? '#44ff4420' : '#ff444420',
                    border: `1px solid ${message.type === 'success' ? '#44ff44' : '#ff4444'}`,
                    color: message.type === 'success' ? '#44ff44' : '#ff4444'
                }}>
                    {message.text}
                </div>
            )}

            <form action={handleSubmit}>
                <div className="card" style={{ padding: '2rem' }}>
                    {renderFields(ANALYSIS_CONFIG)}

                    <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                        <button
                            type="submit"
                            className="btn"
                            disabled={isSaving}
                            style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}
                        >
                            {isSaving ? 'Saving...' : '💾 Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
