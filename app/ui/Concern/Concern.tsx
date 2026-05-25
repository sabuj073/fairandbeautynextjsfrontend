
import { getShopByConcernCategory } from '@/lib/apiData';
import ConcernCategoryProduct from './ConcernCategoryProduct';
import TranslateHeading from '../TranslateHeading';

type Props = {
    fallbackTitle?: string;
    translateKey?: string;
};

export default async function Concern({
    fallbackTitle = "SHOP BY CONCERN",
    translateKey = "shop_by_concern",
}: Props = {}) {
    const category = await getShopByConcernCategory();


    return (
        <div className="home-section">
            <div className='concern_section mx-0 rounded-lg flex flex-col gap-[15px] sm:gap-6 bg-[#DFE8DE] py-[20px] md:py-[37px] px-[0px] sm:px-4 '>
                <TranslateHeading translateKey={translateKey} fallbackTitle={fallbackTitle}/>
                <ConcernCategoryProduct category={category}/>
            </div>
        </div>
    )
}
