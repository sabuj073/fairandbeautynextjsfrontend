"use client"
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
export default function ActionPoint({ point }: any) {
    const router = useRouter()
    const session = useSession()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const handle_convert_wallet = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/clubpoint/convert-into-wallet', {
                id: point?.id,
                user_id: session?.data?.user.id,
            });
            const data = response.data;
            console.log(data)
            if (data.result) {
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
                setIsDeleteDialogOpen(false)
                router.push('/user/earning-points')
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="flex space-x-2">
                {
                    point?.convert_status == 0 ? <button
                        disabled={loading}
                        onClick={handle_convert_wallet}
                        className="btn btn-sm btn-styled bg-blue-500 text-white px-3 py-1 rounded-lg ">Convert Now</button> : <span
                            className="badge badge-inline bg-accent-lightPink text-white px-3 py-1 rounded-lg">Done</span>
                }

            </div>
        </div>
    )
}
