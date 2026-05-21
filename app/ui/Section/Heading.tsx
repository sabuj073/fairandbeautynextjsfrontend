import clsx from 'clsx';
import React from 'react';

type Props = {
  title?: string;
  sub_title?: string;
  className1?: string;
  className?: string;
  rest?: any;
  isReason?: any;
};

const Heading: React.FC<Props> = ({ 
  title = "", 
  sub_title = "", 
  className1, 
  className, 
  isReason,
  ...rest 
}) => {
  return (
    <div className="section_heading text-center flex items-center justify-center">
      <h2 
        className={clsx(
          `min-w-[70%] relative text-[18px] sm:text-[28px] xl:text-[32px] text-neutral-black max-w-max font-semibold uppercase gap-1 flex items-center justify-center flex-wrap`,
          {
            'custom-border-reason': title === 'Reason to Shop',
            'custom-border': title !== 'Reason to Shop'
          },
          className1
        )} 
        {...rest}
      >
        <div className={clsx('text-neutral-black relative', className)}>
          {title}
        </div>
      </h2>
    </div>
  );
};

export default Heading;