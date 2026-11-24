type CheckoutStepperProps = {
  activeStep: 1 | 2 | 3;
};

const STEPS: Array<{ step: 1 | 2 | 3; code: string; label: string }> = [
  { step: 1, code: '01', label: 'Bolsa de compra' },
  { step: 2, code: '02', label: 'Datos y envío' },
  { step: 3, code: '03', label: 'Confirmación' },
];

export function CheckoutStepper({ activeStep }: CheckoutStepperProps) {
  return (
    <nav className="aty-stepper" aria-label="Progreso de compra">
      {STEPS.map((entry) => {
        const isCurrent = entry.step === activeStep;
        const isCompleted = entry.step < activeStep;
        return (
          <div
            key={entry.step}
            className={`aty-stepper__item ${isCurrent ? 'is-current' : ''} ${
              isCompleted ? 'is-completed' : ''
            }`}
            aria-current={isCurrent ? 'step' : undefined}
          >
            <span className="aty-stepper__num">{isCompleted ? '✓' : entry.code}</span>
            <span className="aty-stepper__label">{entry.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
