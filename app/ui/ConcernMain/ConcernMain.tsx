
import { getShopByConcernCategory } from '@/lib/apiData';
import ConcernCategoryProduct from './ConcernCategoryProduct';
import TranslateHeading from '../TranslateHeading';

export default async function ConcernMain() {
    const category = await getShopByConcernCategory();


    return (
        <div className="home-section">
            <div className='concern_section  flex flex-col gap-[15px] sm:gap-6   rounded-[26px]  bg-white py-[20px] md:py-[37px] px-[0px] ' >
                <div className='text-[26px] flex flex-col w-full items-center justify-center gap-1'>
                    <h3>WHAT DO YOU HAVE</h3>
                <h3 className='font-semibold'>CONCERN WITH?</h3>
                </div>

                <ConcernCategoryProduct category={category} />
            </div>
        </div>
    )
}
