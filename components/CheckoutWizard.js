import React from 'react';

const CheckoutWizard = ({ activeStep = 1 }) => {
    const steps = ['User Login', 'Shipping Address', 'Payment Method', 'Place Order'];
    return (
        <div className="mb-5 flex flex-wrap">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`flex-1 border-b-2 ${
                        index <= activeStep
                            ? 'border-indigo-500 text-indigo-500'
                            : 'border-gray-400 text-gray-400'
                    }`}
                >
                    {step}
                </div>
            ))}
        </div>
    );
};

export default CheckoutWizard;
