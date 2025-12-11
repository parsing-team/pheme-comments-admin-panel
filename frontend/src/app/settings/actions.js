'use server'

import fs from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'

const CONFIG_PATH = path.join(process.cwd(), 'src', 'config', 'twitter-analysis.js')

export async function saveConfig(formData) {
    try {
        let fileContent = await fs.readFile(CONFIG_PATH, 'utf-8')

        for (const [key, value] of formData.entries()) {
            // Skip Next.js internal fields
            if (key.startsWith('$ACTION')) continue

            const pathSegments = key.split('.')
            fileContent = updateValueInText(fileContent, pathSegments, value)
        }

        await fs.writeFile(CONFIG_PATH, fileContent, 'utf-8')
        revalidatePath('/settings')
        return { success: true, message: 'Configuration saved successfully' }
    } catch (error) {
        console.error('Error saving config:', error)
        return { success: false, message: `Error saving config: ${error.message}` }
    }
}

function updateValueInText(content, pathSegments, newValue) {
    let cursor = 0

    // Navigate to the correct section
    for (let i = 0; i < pathSegments.length - 1; i++) {
        const segment = pathSegments[i]
        const regex = new RegExp(`${segment}\\s*:`, 'g')
        regex.lastIndex = cursor
        const match = regex.exec(content)

        if (match) {
            cursor = match.index + match[0].length
        } else {
            console.warn(`Could not find section ${segment} in config file`)
            return content // Abort if path not found
        }
    }

    // Find the key and replace the value
    const lastKey = pathSegments[pathSegments.length - 1]
    const keyRegex = new RegExp(`(${lastKey}\\s*:\\s*)([^,\\n\\r}]+)`, 'y') // 'y' for sticky matching? No, 'g' with lastIndex

    // We need to find the key AFTER the cursor
    const searchRegex = new RegExp(`${lastKey}\\s*:\\s*`, 'g')
    searchRegex.lastIndex = cursor
    const match = searchRegex.exec(content)

    if (match) {
        const valueStart = match.index + match[0].length
        const valueEndRegex = /[,}\n\r]/g
        valueEndRegex.lastIndex = valueStart
        const valueEndMatch = valueEndRegex.exec(content)

        const valueEnd = valueEndMatch ? valueEndMatch.index : content.length

        const before = content.substring(0, valueStart)
        const after = content.substring(valueEnd)

        // Determine if we need quotes (if original had quotes or if it's a string)
        // For simplicity, we'll assume the input type matches the config type (numbers vs strings)
        // But formData values are always strings.
        // We can check the original value to see if it was a number or string.
        const originalValue = content.substring(valueStart, valueEnd).trim()
        let formattedValue = newValue

        // Simple heuristic: if original was a number, keep it as number. 
        // If it was quoted, quote the new value.
        const isNumber = !isNaN(parseFloat(originalValue)) && isFinite(originalValue) && !originalValue.includes("'") && !originalValue.includes('"')

        if (!isNumber) {
            // It was likely a string, ensure quotes
            // But wait, the user input comes without quotes.
            // If the original had quotes, we should wrap the new value.
            if (originalValue.startsWith("'") || originalValue.startsWith('"')) {
                const quote = originalValue[0]
                formattedValue = `${quote}${newValue}${quote}`
            }
        }

        return before + formattedValue + after
    } else {
        console.warn(`Could not find key ${lastKey} in config file`)
        return content
    }
}
