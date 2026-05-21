import { Card } from '@/components/ui/card'
import CopyButton from './CopyButton'

export default function CopyReferralCode({result }:any) {
    const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
  const referralUrl = `${NEXTAUTH_URL}/register?referral_code=${result?.referral_code_url}`
  return (
    <Card className="p-4">
      <div className="flex gap-2">
        <input 
          type="text"
          value={referralUrl}
          className="flex-1 p-2 border rounded-md bg-gray-50 text-sm"
          readOnly
        />
        <CopyButton textToCopy={referralUrl} />
      </div>
    </Card>
  )
}