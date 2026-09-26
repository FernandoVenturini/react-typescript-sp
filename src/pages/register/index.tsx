import { useEffect } from 'react'

// Importa a imagem da logo como se fosse um módulo.
// O Vite/bundler transforma essa importação no caminho final da imagem
// (ex: um hash tipo "/assets/logoImg-a1b2c3.png"), então "logoImg" aqui
// vira uma string com o caminho da imagem, pronta pra usar no src de uma <img>.
import logoImg from "../../assets/logoImg.png";

// Importa dois recursos do "react-router-dom":
// - "Link": componente que cria links de navegação SEM recarregar a página
//   (troca o <a href=""> tradicional por navegação interna do React).
// - "useNavigate": um hook que retorna uma função pra gente navegar
//   PROGRAMATICAMENTE (ou seja, via código, não só clicando num link),
//   útil pra redirecionar o usuário depois de uma ação (tipo após cadastro).
import { Link, useNavigate } from 'react-router-dom'

// Importa o componente "Container", que a gente criou em outro arquivo.
// Provavelmente ele só encapsula um estilo/layout padrão (largura máxima,
// centralização, etc) pra reaproveitar em várias páginas.
import { Container } from '../../components/container'

// Importa o componente "Input" customizado, que a gente também criou.
// Ele deve encapsular um <input> com estilo próprio e integração
// com o react-hook-form (por isso recebe "register" e "error" como props).
import { Input } from '../../components/input'

// Importa o hook "useForm" da biblioteca "react-hook-form".
// Essa biblioteca facilita o controle de formulários no React
// (captura de valores, validação, mensagens de erro, etc)
// sem a gente precisar criar um useState pra cada campo manualmente.
import { useForm } from 'react-hook-form'

// Importa o "z" da biblioteca "zod".
// Zod é uma biblioteca de validação de dados — a gente usa ela pra
// descrever o "formato esperado" dos dados do formulário
// (tipo, obrigatoriedade, mensagens de erro customizadas, etc).
import { z } from 'zod'

// Importa o "zodResolver", que é uma "ponte" entre o Zod e o react-hook-form.
// Ele traduz as regras de validação que a gente escrever com o Zod
// pro formato que o react-hook-form entende.
import { zodResolver } from '@hookform/resolvers/zod'

// Importa a instância "auth" que a gente configurou lá no arquivo
// de conexão com o Firebase. É essa instância que já está conectada
// ao nosso projeto específico, então a gente só usa ela direto aqui.
import { auth } from '../../services/firebaseConnection'

// Importa duas funções do pacote "firebase/auth":
// - "createUserWithEmailAndPassword": cria um novo usuário no Firebase
//   Authentication, usando email e senha.
// - "updateProfile": atualiza dados do perfil do usuário já criado
//   (tipo o nome de exibição, foto, etc) — usamos ela pra salvar o "nome"
//   digitado no formulário, já que o "createUserWithEmailAndPassword"
//   só aceita email e senha, não nome.
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'


// Aqui a gente monta o "schema" de validação com o Zod.
// Pensa nisso como "as regras que os dados do formulário TÊM que seguir".
// "z.object({...})" diz que esperamos um objeto com essas propriedades:
const schema = z.object({
	// "name" precisa ser uma string, e não pode ser vazia.
	// Se estiver vazia, mostra a mensagem customizada no lugar da genérica.
	name: z.string().nonempty("The name field is mandatory!"),

	// "email" precisa ser uma string em formato de email válido,
	// e também não pode ser vazio. Cada ".metodo()" encadeado
	// adiciona mais uma regra de validação.
	email: z.string().email("Please insert a valid email!").nonempty("The email field is mandatory!"),

	// "password" precisa ser uma string com pelo menos 6 caracteres,
	// e também não pode ser vazia.
	password: z.string().min(6, "The password must have at least 6 characters.").nonempty("The password field is mandatory.!")
});

// Aqui a gente cria um TIPO do TypeScript a partir do schema do Zod.
// "z.infer<typeof schema>" pega a estrutura que definimos ali em cima
// e "traduz" pra um tipo do TypeScript automaticamente.
// Assim, a gente não precisa escrever o tipo "na mão" duas vezes
// (uma pro Zod, outra pro TypeScript) — o tipo "FormData" já reflete
// exatamente o formato validado pelo schema.
type FormData = z.infer<typeof schema>


// Declara e exporta o componente da página de cadastro.
// "export" permite que outros arquivos (tipo as rotas) importem esse componente.
export function Register() {

	// Chama o hook "useNavigate" e guarda a função retornada na constante "navigate".
	// A gente vai usar ela mais pra frente pra redirecionar o usuário
	// depois que o cadastro der certo.
	const navigate = useNavigate();

	// Chama o hook "useForm", que vai controlar todo o estado do formulário.
	// Passamos um objeto de configuração:
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
		// "resolver": diz ao react-hook-form pra usar o Zod (via zodResolver)
		// como responsável por validar os dados, usando as regras do "schema".
		resolver: zodResolver(schema),

		// "mode: onChange": diz que a validação deve rodar A CADA MUDANÇA
		// nos campos (ou seja, valida em tempo real, enquanto o usuário digita),
		// em vez de validar só quando o formulário for enviado.
		mode: "onChange"
	});

	useEffect(() => {
			async function handleLogout() {
				await signOut(auth);
			}
			handleLogout();
		}, []);

	// Do objeto retornado pelo useForm, desestruturamos:
	// - "register": função que "conecta" cada input ao controle do formulário
	//   (é ela que o componente <Input> vai usar internamente).
	// - "handleSubmit": função que envolve nosso "onSubmit", cuidando de
	//   validar os dados antes de chamar a nossa função de fato.
	// - "errors" (de dentro de "formState"): objeto com as mensagens de erro
	//   de cada campo, caso a validação falhe.

	// Declara a função que vai rodar quando o formulário for enviado
	// E os dados passarem na validação do Zod.
	// "data" já vem tipado como "FormData", com "name", "email" e "password".
	async function onSubmit(data: FormData) {

		// Chama a função do Firebase pra criar um novo usuário,
		// passando a instância "auth", o email e a senha digitados.
		// Essa função retorna uma "Promise" (uma operação assíncrona),
		// então usamos ".then()" pra tratar o resultado quando ela terminar.
		createUserWithEmailAndPassword(auth, data.email, data.password)
			// A função dentro do ".then()" é declarada como "async"
			// porque vamos usar "await" lá dentro (pra esperar outra operação assíncrona).
			// "user" é o objeto retornado pelo Firebase, contendo os dados
			// do usuário recém-criado.
			.then(async (user) => {

				// Aguarda a atualização do perfil do usuário terminar
				// antes de continuar executando o código abaixo.
				// Aqui a gente está salvando o "nome" digitado no formulário
				// como o "displayName" (nome de exibição) do usuário no Firebase,
				// já que "createUserWithEmailAndPassword" não tem campo pra nome.
				await updateProfile(user.user, {
					displayName: data.name
				})

				// Só um log no console pra sabermos, durante o desenvolvimento,
				// que o cadastro funcionou como esperado.
				console.log("Successfully registered!");

				// Redireciona o usuário pra rota "/dashboard".
				// "{ replace: true }" faz com que essa navegação SUBSTITUA
				// a entrada atual no histórico do navegador, em vez de
				// empilhar uma nova — assim, se o usuário clicar em "voltar",
				// ele não volta pra tela de cadastro.
				navigate("/dashboard", { replace: true });
			})
			.catch((error) => {
				console.error("Error registering user:", error);
			})
	}

	// Início do JSX — o que efetivamente é renderizado na tela.
	return (
		// Envolve toda a página no componente "Container",
		// que deve aplicar um estilo/layout padrão.
		<Container>
			{/* Uma div que ocupa toda a largura e no mínimo a altura da tela,
			com os filhos organizados em coluna, centralizados
			(tanto horizontal quanto verticalmente), com espaçamento entre eles. */}
			<div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">

				{/* Um link que leva pra rota "/" (home), envolvendo a logo.
				Clicar na logo geralmente leva de volta pra página inicial. */}
				<Link to="/" className='b-6 max-w-sm w-full'>
					<img
						src={logoImg} // usa a imagem importada lá em cima — isso funciona pois está dentro de {} (JS puro)
						alt="Logo do site" // texto alternativo, importante pra acessibilidade
						className='w-full' // faz a imagem ocupar toda a largura do elemento pai
					/>
				</Link>

				{/* O elemento <form> em si. O "onSubmit" chama handleSubmit(onSubmit),
				que valida os dados com o Zod ANTES de rodar nossa função onSubmit. */}
				<form
					className="bg-white max-w-xl w-full rounded-lg p-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* Uma div com margem inferior, envolvendo o campo de nome. */}
					<div className='mb-3'>
						<Input
							type="text" // tipo do input HTML
							placeholder="Digite seu nome..." // texto de dica dentro do campo
							name="name" // nome do campo, tem que bater com a chave "name" do schema
							error={errors.name?.message} // passa a mensagem de erro (se existir) pro componente Input mostrar
							register={register} // passa a função "register" pro Input "se conectar" ao formulário
						/>
					</div>

					{/* Mesma lógica pro campo de email. */}
					<div className='mb-3'>
						<Input
							type="email"
							placeholder="Digite seu email..."
							name="email"
							error={errors.email?.message}
							register={register}
						/>
					</div>

					{/* Mesma lógica pro campo de senha. */}
					<div className='mb-3'>
						<Input
							type="password"
							placeholder="Digite seu senha..."
							name="password"
							error={errors.password?.message}
							register={register}
						/>
					</div>

					{/* Botão de envio do formulário.
					"type='submit'" faz com que, ao ser clicado, ele dispare
					o evento "onSubmit" do <form> (chamando handleSubmit(onSubmit)). */}
					<button type='submit' className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium hover:bg-zinc-700'>
						Sign up
					</button>
				</form>

				{/* Um link pra quem já tem conta, levando pra página de login. */}
				<Link to="/login">
					Already have an account? Log in!
				</Link>
			</div>
		</Container>
	)
}