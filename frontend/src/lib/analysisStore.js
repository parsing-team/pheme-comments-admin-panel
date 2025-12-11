// Simple in-memory store for analysis jobs
// In a production environment with multiple server instances, 
// this should be replaced with Redis or a database table.

const jobs = new Map()

export const analysisStore = {
    createJob: () => {
        const id = Math.random().toString(36).substring(7)
        jobs.set(id, {
            status: 'pending',
            progress: 0,
            message: 'Initializing...',
            result: null,
            error: null,
            createdAt: Date.now()
        })
        return id
    },

    updateJob: (id, updates) => {
        const job = jobs.get(id)
        if (job) {
            jobs.set(id, { ...job, ...updates })
        }
    },

    getJob: (id) => {
        return jobs.get(id)
    },

    // Cleanup old jobs (optional, to prevent memory leaks)
    cleanup: () => {
        const oneHourAgo = Date.now() - 3600000
        for (const [id, job] of jobs.entries()) {
            if (job.createdAt < oneHourAgo) {
                jobs.delete(id)
            }
        }
    }
}
