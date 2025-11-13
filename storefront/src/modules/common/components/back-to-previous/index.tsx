"use client"

import React from "react"

const BackToPrevious: React.FC<{ label?: string }> = ({ label = "Powrót do poprzedniej strony" }) => {
    return (
        <button
            type="button"
            onClick={() => window.history.back()}
            className="text-sm text-ui-fg-interactive hover:underline"
        >
            {label}
        </button>
    )
}

export default BackToPrevious
