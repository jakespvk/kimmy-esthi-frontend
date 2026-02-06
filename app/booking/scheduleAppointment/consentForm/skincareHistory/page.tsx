import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { glassAntiqua } from '@/app/fonts';

export default function SkincareHistory() {
  return (
    <div>
      <div className="flex justify-center">
        <h3 id="consent-form--client-info" className={`subheading ${glassAntiqua.className}`}>Personal Information</h3>
      </div>
      <Label className='w-max justify-self-start my-2'>Full Name:</Label>
      <Input className="max-w-96 mb-2" type="text" name="full-name" />
      <Label className='w-max justify-self-start my-2'>Date of Birth:</Label>
      <Input className="max-w-96 mb-2" type="text" name="date-of-birth" />
      <Label className='w-max justify-self-start my-2'>Gender:</Label>
      <Input className="max-w-96 mb-2" type="text" name="gender" />
      <Label className='w-max justify-self-start my-2'>Phone Number:</Label>
      <Input className="max-w-96 mb-2" type="text" name="phone-number" />
      <Label className='w-max justify-self-start my-2'>Email Address:</Label>
      <Input className="max-w-96 mb-2" type="text" name="email" />
      <div className="flex justify-center">
        <Button className="my-2" type="submit">Next</Button>
      </div>
    </div>
  )
}
