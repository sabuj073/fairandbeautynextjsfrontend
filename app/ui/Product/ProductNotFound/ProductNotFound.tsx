import React from 'react'

export default function ProductNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs text-center">

                <div className="flex justify-center mb-4 pt-5 ">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-5xl">🔍</div>
                        </div>
                    </div>
                </div>

                <h1 className="text-6xl font-bold text-primary mb-2">oops</h1>
                <p className="text-lg text-gray-700 mb-2">Product not found</p>
                <p className="text-lg text-red-700 mb-4">We're sorry. We cannot find any matches for your search term.</p>

                <button className="bg-primary text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-primary">
                    SEARCH AGAIN
                </button>
            </div>
        </div>

    )
}
