'use client'
import { deleteGuideline, getGuideline } from "@/API/guideline.api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Trash } from "lucide-react";
import { toast } from "sonner";

export const ManageFAqs = () => {
    // Fetch FAQs using useQuery
    const { data, isLoading, error } = useQuery({
        queryKey: ['faqs'],
        queryFn: () => getGuideline('FAQs'),
    });

    const queryClient = useQueryClient();   
    const handleDeleteFAQ = async (id: string) => {
        const { success } = await deleteGuideline(id);
        if (!success) return toast.error('Failed to delete FAQ');
        toast.success('FAQ deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['faqs'] });
    }

    return (
        <div className='my-5'>
            <hr />
            <h1 className='text-3xl p-5 text-[#18243C]'>Manage FAQs</h1>
            {/* Check loading state */}
            {isLoading ? (
                <p className="text-center">Loading FAQs...</p>
            ) : error ? (
                <p className="text-center text-red-500">Error fetching FAQs: {error.message}</p>
            ) : data && data.response && data.response.guidelines && data.response.guidelines.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {data.response.guidelines.map((faq: any) => (
                        <div key={faq._id} className="bg-white p-4 rounded-lg shadow-md">
                            <div dangerouslySetInnerHTML={{ __html: faq.content }} />
                            <div className="flex items-center justify-end mt-4">
                                <button
                                    onClick={() => handleDeleteFAQ(faq._id)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No FAQs found.</p>
            )}
        </div>
    )
}
