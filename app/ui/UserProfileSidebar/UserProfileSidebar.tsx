"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Heart, User, Navigation, DollarSign, ChevronUp, ChevronDown } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { routes } from '@/lib/routes';
import SignOutForm from '../SignOutForm';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import UserProfile from './UserProfile';

const UserProfileSidebar = ({user_data, verified }: any) => {
  const session = useSession() as any;
  const { translateValue } = cookieStore();
  const sign_out = translateValue?.sign_out
  // console.log(session)
  const affiliateDropdownItems = [
    { 
      href: routes.user_affiliate, 
      label: 'Affiliate Dashboard',
      isActive: false 
    },
    { 
      href: routes.payment_history, 
      label: 'Payment History ',
      isActive: false 
    },
    { 
      href: routes.withdraw_request_history, 
      label: 'Withdraw Request history',
      isActive: false 
    }
  ];
  console.log(user_data)
  return (
    <div className="w-full lg:w-64 bg-white rounded-lg shadow-md p-4">
      {/* <UserProfile/> */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-2">
          <User className="text-white" size={40} />
        </div>
        <h2 className="text-lg font-semibold">{session?.data?.user?.name}</h2>
        <p className="text-sm text-gray-600">{session?.data?.user?.phone}</p>
      </div>

      <nav>
        <ul className="space-y-2">
          {/* {
            verified !== null && */}

          <>
            <NavItem href={routes.user_dashboard} icon={<Home size={18} />} label="Dashboard" />
            <NavItem href={routes.user_purchase_history} icon={<ShoppingBag size={18} />} label="Purchase History" isNew />
            <NavItem href={routes.user_wish_list} icon={<Heart size={18} />} label="Wishlist" />
            {
              user_data?.affiliate_user_status  && 
            <NavItem 
            href="/affiliate"
            icon={<DollarSign size={18} />}
            label="Affiliate"
            dropdownItems={affiliateDropdownItems}
            isActive={false}
            />
          }

            <NavItem href={routes.user_earning_points} icon={<DollarSign size={18} />} label="Earning points" />
            <NavItem href={routes.user_profile} icon={<User size={18} />} label="Manage Profile" />
            <NavItem href={routes.user_address} icon={<Navigation size={18} />} label="Address" /></>

          {/* } */}
          <li>
            <SignOutForm sign_out={sign_out} />
          </li>
        </ul>
      </nav>
    </div>
  );
};

const NavItem = ({ href, icon, label, isNew = false,dropdownItems = [] }: any) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const [isExpanded, setIsExpanded] = useState(false);
  const hasDropdown = dropdownItems.length > 0;

  const toggleDropdown = (e:any) => {
    if (hasDropdown) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <li>
      <div className="relative">
        <Link
          href={href}
          onClick={toggleDropdown}
          className={`flex items-center justify-between rounded-md p-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-arival hover:text-black
            ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          <div className="flex items-center space-x-3">
            {icon}
            <span>{label}</span>
          </div>
          {hasDropdown && (
            <div className={`ml-2 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
              <ChevronDown size={16} />
            </div>
          )}
        </Link>
{
  isExpanded && <div className={`
    ${isExpanded ? 'block' : 'hidden'}`} >

        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out
            ${isExpanded ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="ml-8 mt-1 space-y-1 py-2">
            { dropdownItems.map((item:any, index:any) => (
              <Link
                key={index}
                href={item.href}
                className={`block hover:text-neutral-black rounded-md p-2 text-sm transform transition-all duration-300 ease-in-out
                  hover:translate-x-2
                  ${item.isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        </div>
        }
        
      </div>
    </li>
  );
};

export default UserProfileSidebar;