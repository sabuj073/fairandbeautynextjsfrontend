"use client"
import React, { useState } from 'react';
import axios from 'axios';
import CustomInput from '../CustomInput';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const ProfileUpdateForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { data: session, update } = useSession() as any
    const [formData, setFormData] = useState({
        id: session?.user?.id,
        name: session?.user?.name || '',
        phone: session?.user?.phone || '',
        password: '',
        confirmPassword: '',
        photo: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, photo: e.target.files ? e.target.files[0] : null } as any);
    };
    console.log("session", session)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)

        try {
            const response: any = await axios.post('/api/profile-update', formData);
            console.log('Profile updated:', response.data);

            if (response?.data.result) {
                toast.success(response?.data.message)
                const newSession = {
                    ...session,
                    user: {
                        ...session?.user,
                        name: formData?.name,
                        phone: formData?.phone,
                    },
                }
                console.log("newSession", newSession)
                await update(newSession)
                setLoading(false)
            }


        } catch (error) {
            setLoading(false)
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="profile-form w-96 mx-auto shadow-lg border p-4 ">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Your name</label>
                    <CustomInput type="text"
                        name="name"
                        value={formData?.name}
                        onChange={handleInputChange}
                    />

                </div>
                <div className="form-group">
                    <label>Your Phone</label>
                    <CustomInput
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />

                </div>

                <div className="form-group">
                    <label>New Password</label>

                    <CustomInput
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}

                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>

                    <CustomInput
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}

                    />
                </div>
                <Button type="submit" className="btn btn-primary mt-3">Update Profile {loading ? '....' : ''} </Button>
            </form>
        </div>
    );
};

export default ProfileUpdateForm;
