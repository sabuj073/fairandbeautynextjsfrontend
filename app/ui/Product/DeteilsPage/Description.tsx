import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

export default function Description({ data }: any) {

    return (
        <div className='product_description'>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="AccordionTrigger">Description</AccordionTrigger>
                    <AccordionContent>
                        <div className=' text-sm md:text-base text-neutral-black ' dangerouslySetInnerHTML={{
                            __html: data.description
                        }} />

                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="AccordionTrigger">Ingredient</AccordionTrigger>
                    <AccordionContent>
                        <div className=' text-sm md:text-base text-neutral-black ' dangerouslySetInnerHTML={{
                            __html: data.ingredient
                        }} />

                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="AccordionTrigger">Faq</AccordionTrigger>
                    <AccordionContent>
                        <div className=' text-sm md:text-base text-neutral-black ' dangerouslySetInnerHTML={{
                            __html: data.faq
                        }} />

                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
