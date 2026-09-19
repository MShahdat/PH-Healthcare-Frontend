'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Button } from '../ui/button';
import { RefreshCwIcon } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp';
import { redirect, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useEmailVerify } from '@/hooks';
import { toast } from 'sonner';
import { Spinner } from '../ui/spinner';
import { REGEXP_ONLY_DIGITS } from 'input-otp';


const OtpPage = () => {
  const params = useSearchParams()
  console.log(params)
  const email = params.get("email")

  if (!email) {
    redirect('/register')
  }

  const [otp, setOtp] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)

  const { mutate, isPending } = useEmailVerify()

  const handleSubmit = () => {

    if (otp.length !== 6) {
      setIsInvalid(true)
      return;
    }
    const data = {
      email,
      otp
    }

    console.log(data)

    mutate(data, {
      onSuccess: (res) => {
        toast.success(res.message)
        redirect(`/patient-dashboard`)
      },
      onError: (err) => {
        console.log(err)
        toast.error(err.message)
      }
    })
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{" "}
          <span className="font-semibold text-black">{email}</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id='otp-form'
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation()
            handleSubmit()
          }}
        >
          <Field data-invalid={isInvalid}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="otp-verification">
                Verification code
              </FieldLabel>
              <Button type="button" variant="outline" size="xs">
                <RefreshCwIcon />
                Resend Code
              </Button>
            </div>
            <InputOTP
              onChange={(val) => {
                setOtp(val)
                if (isInvalid) {
                  setIsInvalid(false)
                }
              }}
              maxLength={6}
              id="otp-verification"
              name='otp'
              value={otp}
              pattern={REGEXP_ONLY_DIGITS}
              required>
              <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator className="mx-2" />
              <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {
              isInvalid && (
                <FieldError errors={[{ message: 'Must be 6 digit' }]} />
              )
            }
          </Field>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" disabled={isPending} form="otp-form" className="w-full">
            {isPending ? <>
              <Spinner /> Verify
            </>
              : 'Verify'
            }
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default OtpPage;