import CustomImage from '@/app/ui/CustomImage/CustomImage'
import Image from 'next/image'
import React from 'react'

type PropType = {
    selected: boolean
    index: number
    onClick: () => void
    image?: any
}

export const ImageButton: React.FC<PropType> = (props) => {
    const { selected, index, onClick, image } = props

    return (
        <div
            className={'gallery-thumbs__slide shrink-0 rounded-sm shadow-sm p-1 pt-1 mr-4 py-1 relative h-fit w-full'.concat(
                selected ? ' gallery-thumbs__slide--selected' : ''
            )}
        >
            <button
                onClick={onClick}
                type="button"
                className="gallery-thumbs__slide__number  "
            >
                <CustomImage
                    src={image.path}
                    width={70}
                    height={70}
                    alt={`Slide ${index}`}
                    className="thumbnail-image w-full rounded-lg"
                />

            </button>
        </div>
    )
}
