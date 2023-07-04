import FormLogin from '@/components/login/Form'
import Image from 'next/image'

export default function Login() {
  return (
    <main className="flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="w-full">
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
