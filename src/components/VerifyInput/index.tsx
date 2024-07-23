import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

interface VerifyFormProps {
  otp: string;
  setOTP: (state: string) => void;
}
export default function VerifyInput({ otp, setOTP }: VerifyFormProps) {
  return (
    <div>
      <InputOTP
        maxLength={6}
        value={otp}
        onChange={(value) => setOTP(value)}
        pattern={REGEXP_ONLY_DIGITS}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
