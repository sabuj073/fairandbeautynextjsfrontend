
import { getShopByConcernCategory } from '@/lib/apiData';
import ConcernCategoryProduct from './ConcernCategoryProduct';
import TranslateHeading from '../TranslateHeading';
import clsx from 'clsx';

export default async function Serums() {
    const category = await getShopByConcernCategory();


    return (
        <div className="home-section">
            <div className='concern_section  flex flex-col mx-0 rounded-lg gap-[15px] sm:gap-6  bg-[#DFE8DE] py-[20px] md:py-[37px] px-[0px] sm:px-4 ' >
                {/* <div className="section_heading text-center flex items-center justify-center">
                                      <h2 className={clsx(' min-w-[70%]  relative text-[18px] sm:text-[28px] xl:text-[32px] text-neutral-black max-w-max font-semibold uppercase gap-1 flex items-center justify-center flex-wrap custom-border')} > <div className={clsx(' text-neutral-black  relative')}>Serums & Treatment</div> </h2>
                                    </div> */}
                                    

                <ConcernCategoryProduct category={category} />
            </div>
        </div>
    )
}
