
import { getShopByConcernCategory } from '@/lib/apiData';
import ConcernCategoryProduct from './ConcernCategoryProduct';
import TranslateHeading from '../TranslateHeading';

export default async function Concern() {
    const category = await getShopByConcernCategory();


    return (
        <div className="pb-[18px] md:pb-[65px] w-full ">
            <div className='concern_section md:mx-0 mx-2 rounded-lg flex flex-col gap-[15px] sm:gap-6 bg-[#DFE8DE] py-[20px] md:py-[37px] px-[0px] sm:px-4 '>
                <TranslateHeading translateKey="shop_by_concern"/>
                <ConcernCategoryProduct category={category}/>
            </div>
        </div>
    )
}
