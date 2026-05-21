import React, { useEffect, useState } from "react";

const CustomDialog = ({ isOpen, onClose, children }: any) => {
    const [show, setShow] = useState(isOpen);
    const [animationClass, setAnimationClass] = useState(isOpen ? 'slide-in' : 'slide-out');

    useEffect(() => {
        if (isOpen) {
            setShow(true);
            setAnimationClass('slide-in');
        } else {
            setAnimationClass('slide-out');
            const timer = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <>
            {show && (
                <div className="dialog-overlay" onClick={onClose}>
                    <div
                        className={`dialog-content ${animationClass}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="dialog-close" onClick={onClose}>
                            &times;
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomDialog;
