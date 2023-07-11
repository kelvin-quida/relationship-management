import FormLogin from '@/components/login/Form'
import { RectangleStackIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

export default function Login() {
  return (
    <main className="flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <RectangleStackIcon className="h-16 w-12 cursor-pointer text-emerald-400 duration-300 ease-out hover:scale-110 hover:text-orange-400" />
          <h1 className="text-4xl font-semibold text-neutral-700 dark:text-neutral-300">Kapps</h1>
        </div>
        <FormLogin />
      </div>
      <div className="w-full overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?quality=100&cs=tinysrgb&w=4000&h=4000&dpr=1"
          alt="bg"
          className="object-contain saturate-0 transition-all duration-500 hover:scale-110 hover:saturate-100"
          width={1400}
          height={1400}
          quality={100}
          draggable={false}
        />
      </div>
    </main>
  )
}
