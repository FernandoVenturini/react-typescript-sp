import logoImg from '../../assets/logoImg.svg'
import { Link } from 'react-router-dom'
import { Container } from '../../components/container'

import { Input } from '../../components/input'
import { useForm} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    name: z.string().nonempty("O campo nome e obrigatorio!"),
    email: z.string().email("Insira um email valido!").nonempty("O campo email e obrigatorio!"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres.").nonempty("O campo senha e obrigatorio!")
});

type FormData = z.infer<typeof schema>


export function Register() {
    const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    function onSubmit(data: FormData) {
        console.log(data);
    }

    return (
        <Container>
            <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
                <Link to="/" className='b-6 max-w-sm w-full'>
                    <img 
                        src={logoImg} 
                        alt="Logo do site"
                        className='w-full' 
                    />
                </Link>

                <form 
                    className="bg-white max-w-xl w-full rounded-lg p-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='mb-3'>
                        <Input
                            type="text"
                            placeholder="Digite seu nome..."
                            name="name"
                            error={errors.name?.message}
                            register={register}
                        />
                    </div>

                    <div className='mb-3'>
                        <Input
                            type="email"
                            placeholder="Digite seu email..."
                            name="email"
                            error={errors.email?.message}
                            register={register}
                        />
                    </div>

                    <div className='mb-3'>
                        <Input
                            type="password"
                            placeholder="Digite seu senha..."
                            name="password"
                            error={errors.password?.message}
                            register={register}
                        />
                    </div>
                    
                    <button type='submit' className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium hover:bg-zinc-700'>
                        Acessar
                    </button>
                </form>

                <Link to="/login">
                    Ja possui uma conta? Faca o login!
                </Link>
            </div>
        </Container>
    )
}