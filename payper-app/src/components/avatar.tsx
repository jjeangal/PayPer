import { Address } from '@/types'
import Image from 'next/image'
import {
  useEnsName,
  useEnsAvatar
} from 'wagmi'

export default function Avatar({ journalist }: { journalist: Address }) {

  const { data: ensName } = useEnsName({
    address: journalist,
    enabled: false,
  })

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    enabled: false,
  })

  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative mr-4">
        <Image
          src={ensAvatar || `https://effigy.im/a/${journalist}.svg`}
          layout="fill"
          className="rounded-full"
          alt={ensName || journalist}
        />
      </div>
      <div className="text-xl font-bold">{ensName || journalist}</div>
    </div>
  )
}