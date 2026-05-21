'use client'
import CustomInput from '@/app/ui/CustomInput'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function EditAddressForm({ id, data }: any) {
    const router = useRouter()
    const session = useSession()
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState(data && data || {
        user_id: session?.data?.user?.id
    })
    const [country, setCountry] = useState<any[]>([])
    const [cities, setCities] = useState<any[]>([])
    const [state, setState] = useState<any[]>([])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    // getCountry 
    const getCountry = async () => {
        try {
            const response: any = await axios.get(
                `/api/country`);
            setCountry(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    // states-by-country 
    const states_by_country = async (id: any) => {
        try {
            const response: any = await axios.post(
                `/api/states-by-country/`, {
                id: id
            });
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }
    // getCountry 
    const getCities = async (id: any) => {
        try {
            const response: any = await axios.post(
                `/api/cities-by-state`, {
                id: id
            });
            return response.data.data

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCountry()
    }, [])
    // address form 
    useEffect(() => {
        const fetchStates = async () => {
            if (formData?.country_id) {
                const result = await states_by_country(formData?.country_id);
                setState(result as any);
            }
        };

        fetchStates();
    }, [formData?.country_id]);

    useEffect(() => {
        const fetchCities = async () => {
            if (formData?.country_id) {
                if (formData?.state_id) {
                    const result = await getCities(formData?.state_id)
                    setCities(result as any)
                }
            }
        };
        fetchCities()
    }, [formData?.state_id])

    const handleSelectChange = (value: string) => {
        const existCountry = country.find((item: any) => item.id === value)
        if (existCountry) {
            setFormData({
                ...formData,
                country_id: value,
                country_name: existCountry.name
            });
        }

    };
    const handleSelectCities = (value: string) => {
        const existCities = cities.find((item: any) => item.id === value)
        if (existCities) {
            setFormData({
                ...formData,
                city_id: value,
                city_name: existCities.name
            });
        }

    };
    const handleSelectState = (value: string) => {
        const existState = state.find((item: any) => item.id === value)
        if (existState) {
            setFormData({
                ...formData,
                state_id: value,
                state_name: existState.name
            });
        }

    };


    const handle_Address = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/shipping/update', formData);
            const data = response.data;
            if (data.result) {
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
                router.push('/user/address')
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }
    const handle_AddAddress = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/shipping/create', {
                user_id: session?.data?.user.id,
                ...formData
            });
            const data = response.data;
            if (data.result) {
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
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
    return (
        <>


            {/* Address */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Address</label>
                <Textarea
                    name="address"
                    placeholder="Address"
                    className="w-full"
                    value={formData?.address}
                    onChange={handleInputChange}
                />
            </div>
            {/* Phone Number */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <CustomInput
                    name="phone"
                    type="tel"
                    placeholder="018328434856"
                    className="w-full"
                    value={formData?.phone}
                    onChange={handleInputChange}
                />
            </div>
            {/* Phone Number */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Postal code</label>
                <CustomInput
                    name="postal_code"
                    type="tel"
                    placeholder="1212"
                    className="w-full"
                    value={formData?.postal_code}
                    onChange={handleInputChange}
                />
            </div>
            {/* Country/Region */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Country/Region</label>
                <Select value={formData?.country_id} onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            country.map((item: any) => (

                                <SelectItem key={item.id} value={item.id}  >{item.name}</SelectItem>
                            ))
                        }
                        {/* Add more options as needed */}
                    </SelectContent>
                </Select>

            </div>

            {/* state */}
            {
                state && state.length > 1 &&

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">State</label>

                    <Select value={formData?.state_id} onValueChange={handleSelectState}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                state.map((item: any) => (

                                    <SelectItem key={item.id} value={item.id}  >{item.name}</SelectItem>
                                ))
                            }
                            {/* Add more options as needed */}
                        </SelectContent>
                    </Select>
                </div>
            }
            {/* City */}
            {
                cities && cities.length > 0 &&

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">City</label>

                    <Select value={formData?.city_id} onValueChange={handleSelectCities}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a city" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                cities.map((item: any) => (

                                    <SelectItem key={item.id} value={item.id}  >{item.name}</SelectItem>
                                ))
                            }
                            {/* Add more options as needed */}
                        </SelectContent>
                    </Select>
                </div>
            }
            {
                id ? <Button onClick={handle_Address} type="button" className="btn btn-primary mt-3">Update address  {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />} </Button> :
                    <Button onClick={handle_AddAddress} type="button" className="btn btn-primary mt-3">Add address  {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />} </Button>
            }


        </>
    )
}
