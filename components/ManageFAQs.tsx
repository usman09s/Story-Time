'use client'
import { getGuideline } from "@/API/guideline.api"
import { useQuery } from "@tanstack/react-query"
import { Trash } from "lucide-react";
import { useState } from 'react'; // Import useState hook

export const ManageFAqs = () => {
    // Fetch FAQs using useQuery
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['faqs'],
        queryFn: () => getGuideline('FAQs'),
    });

    // const handleDeleteFAQ = (id) => {
    //     // Implement deletion logic here
    //     // Example: Call API to delete FAQ by ID and then refetch FAQs
    //     console.log(`Deleting FAQ with ID: ${id}`);
    //     // Example logic to update state or refetch data after deletion
    //     refetch(); // This will refetch FAQs after deletion
    // };

    return (
        <>
            <div className='my-5'>
                <hr />
                <h1 className='text-3xl p-5 text-[#18243C]'>Manage FAQs</h1>
                    {/* Check loading state */}
                    {isLoading ? (
                        <p className="text-center">Loading FAQs...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">Error fetching FAQs: {error.message}</p>
                    ) : data && data.response.guidelines.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {data.response.guidelines.map((faq: any) => (
                                <div key={faq.id} className="bg-white p-4 rounded-lg shadow-md">
                                    {/* Render HTML content safely */}
                                    <div dangerouslySetInnerHTML={{ __html: faq.content }} />
                                    <div className="flex items-center justify-end mt-4">
                                        <button
                                            // onClick={() => handleDeleteFAQ(faq.id)}
                                            className="text-red-500 hover:text-red-700 focus:outline-none"
                                        >
                                     <Trash/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">No FAQs found.</p>
                    )}
                </div>
        </>
    )
}
