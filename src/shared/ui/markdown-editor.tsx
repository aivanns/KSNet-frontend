'use client'

import MDEditor from '@uiw/react-md-editor'
import { useEffect, useState } from 'react'

interface MarkdownEditorProps {
    value?: string
    onChange?: (value: string) => void
    preview?: boolean
    label?: string
    error?: string
}

const MarkdownEditor = ({ value = '', onChange, preview = false, label, error }: MarkdownEditorProps) => {
    const [content, setContent] = useState(value)

    useEffect(() => {
        setContent(value)
    }, [value])

    const handleChange = (newValue: string | undefined) => {
        const updatedValue = newValue || ''
        setContent(updatedValue)
        onChange?.(updatedValue)
    }

    return (
        <div className="w-full" data-color-mode="light">
            {label && (
                <div className="mb-1.5 text-sm font-medium text-neutral-700">
                    {label}
                </div>
            )}
            <MDEditor
                value={content}
                onChange={handleChange}
                preview={preview ? 'preview' : 'edit'}
                className="w-full"
            />
            {error && (
                <div className="mt-1.5 text-xs text-danger">
                    {error}
                </div>
            )}
        </div>
    )
}

export default MarkdownEditor 