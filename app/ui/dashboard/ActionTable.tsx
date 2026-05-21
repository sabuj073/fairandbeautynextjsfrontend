"use client"
import { Eye, Download, Trash2 } from 'lucide-react';
import OrderDetailsModal from './OrderDetailsModal';
import { useState } from 'react';
import Link from 'next/link';
import { routes } from '@/lib/routes';
export default function ActionTable({ purchase }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const openModal = (order: any) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex space-x-2">
                {purchase.payment_status === 'Un-Paid' && (
                    <button className="p-1 bg-red-100 text-red-600 rounded-full">
                        <Trash2 size={16} />
                    </button>
                )}
                <Link href={`${routes.user_purchase_details}/${purchase.id}`} className="p-1 bg-blue-100 text-blue-600 rounded-full" >
                    <Eye size={16} />
                </Link>
            </div>
        </div>
    )
}
