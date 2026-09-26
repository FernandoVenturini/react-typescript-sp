import { useEffect } from 'react'
import logoImg from "../../assets/logoImg.png";
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '../../components/container'

import { Input } from '../../components/input'
import { useForm} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../services/firebaseConnection'

const schema = z.object({
    email: z.string().email("Insira um email valido!").nonempty("O campo email e obrigatorio!"),
    password: z.string().nonempty("O campo senha e obrigatorio!")
})

type FormData = z.infer<typeof schema>


export function Login() {
    const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    const navigate = useNavigate();

    useEffect(() => {
        async function handleLogout() {
            await signOut(auth);
        }
        handleLogout();
    }, []);

    function onSubmit(data: FormData) {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((user) => {
                console.log("User successfully logged in!");
                navigate("/dashboard", { replace: true });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <Container>
            <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
                <Link to="/" className='b-6 max-w-sm w-full'>
                    <img 
                        src={logoImg} 
                        alt="Logo do site"
                        className='w-full h-60 rounded-lg object-cover' 
                    />
                </Link>

                <form 
                    className="bg-white max-w-xl w-full rounded-lg p-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
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

                <Link to="/register">
                    Ainda nao possui uma conta? Cadastre-se.
                </Link>
            </div>
        </Container>
    )
}