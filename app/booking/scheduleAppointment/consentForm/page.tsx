import SignaturePad from '@/components/ui/signature-pad';
import { Eraser, Save } from 'lucide-react';

const ConsentForm: React.FC = () => {
  return (
    <div>
      <SignaturePad
        className="max-w-64"
        penColor="hsl(var(--foreground))"
        lineWidth={4}
        showButtons={true}
        saveButtonIcon={<Save />}
        clearButtonIcon={<Eraser />}
      />
    </div>
  )
}

export default ConsentForm;
