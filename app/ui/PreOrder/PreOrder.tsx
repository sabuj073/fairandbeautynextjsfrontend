
import { getShopByConcernCategory } from '@/lib/apiData';
import ConcernCategoryProduct from './ConcernCategoryProduct';
import TranslateHeading from '../TranslateHeading';
import clsx from 'clsx';

export default async function PreOrder() {
    const category = await getShopByConcernCategory();


    return (
        <div className="w-full pb-[18px] md:pb-[65px] sm:px-2 md:px-0 ">
            <div className='concern_section  flex flex-col md:mx-0 mx-2 rounded-lg gap-[15px] sm:gap-6  bg-[#DFE8DE] py-[20px] md:py-[37px] px-[0px] sm:px-4 ' >
                <div className="section_heading text-center flex items-center justify-center">
                                      <h2 className={clsx(' min-w-[70%]  relative text-[18px] sm:text-[28px] xl:text-[32px] text-neutral-black max-w-max font-semibold uppercase gap-1 flex items-center justify-center flex-wrap custom-border')} > <div className={clsx(' text-neutral-black  relative')}>Pre-Order Products</div></h2>
                                    </div>

                <ConcernCategoryProduct category={category} />
            </div>
        </div>
    )
}
