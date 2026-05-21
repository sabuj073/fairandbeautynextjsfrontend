"use client";

import { EllipsisVertical, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog"; // Assuming you have a dialog component
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { routes } from "@/lib/routes";

function Dropdown({ id }: any) {
    const router = useRouter()
    const session = useSession()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    // Function to handle delete action
    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/shipping/delete', {
                id: id
            });
            const data = response.data;
            if (data.result) {
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
                setIsDeleteDialogOpen(false)
                router.push('/address')
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const handle_make_default = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/shipping/make_default', {
                id: id,
                user_id: session?.data?.user.id,
            });
            const data = response.data;
            if (data.result) {
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
                setIsDeleteDialogOpen(false)
                router.push(routes.user_address)
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
        <div className="dropdown absolute right-0 top-0 group">
            <button className="bg-gray-300 px-2 mt-2 rounded focus:outline-none">
                <EllipsisVertical />
            </button>

            {/* Dropdown menu opens on hover */}
            <div className="absolute right-0 mt-0 w-48 bg-white border rounded shadow-lg z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                <Link href={`${routes.user_address_edit}/${id}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Edit
                </Link>
                <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={handle_make_default}
                >
                    Make This Default
                </a>
                <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsDeleteDialogOpen(true)}
                >
                    Delete
                </a>
            </div>




            {/* Delete confirmation dialog */}
            {isDeleteDialogOpen && (
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent className=" bottom-0 left-0 bg-transparent flex items-center justify-center " >
                        <div className="w-96 bg-white p-4 text-center rounded-lg ">
                            <DialogHeader>
                                <h3 className="text-lg font-semibold text-center">Are you sure?</h3>
                            </DialogHeader>
                            <p className="text-gray-600 text-center">Do you really want to delete this address? This action cannot be undone.</p>
                            <DialogFooter className=" block my-3 w-full " >
                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="destructive" onClick={handleDelete}>
                                    Yes, Delete {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}
                                </Button>
                            </DialogFooter>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

export default Dropdown;
