// ==================== PASSO 1 ====================
// Antes de tudo, importamos as ferramentas que vamos precisar.
// Isso é sempre o primeiro passo: "quais peças eu preciso pra montar isso?"

// Do React, importamos:
// - ReactNode: tipo que representa "qualquer coisa que o React pode renderizar"
//   (usado pra tipar a prop "children", que vai ser o conteúdo dentro do Provider).
// - createContext: função que cria um "contexto" — um jeito de compartilhar dados
//   (como "o usuário está logado?") com qualquer componente da árvore, sem
//   precisar passar isso via props manualmente em cada nível.
// - useState: hook pra guardar estado local dentro do componente.
// - useEffect: hook pra rodar código quando o componente é montado (ou quando
//   alguma dependência muda) — aqui vamos usar pra "escutar" o Firebase.
import { ReactNode, createContext, useState, useEffect } from "react";

// Do Firebase, importamos:
// - onAuthStateChanged: função que "escuta" mudanças no estado de autenticação
//   (login, logout, token expirado, etc) em tempo real.
// - User: tipo do TypeScript que representa o formato de um usuário do Firebase Auth.
import { onAuthStateChanged, User } from "firebase/auth";

// Importa a instância "auth" que já configuramos em outro arquivo
// (services/firebaseConnection.ts), a conexão já pronta com o Firebase.
import { auth } from "../services/firebaseConnection";


// ==================== PASSO 2 ====================
// Antes de escrever o componente, definimos os "formatos" (tipos) dos dados
// que vamos usar. Isso ajuda o TypeScript a nos avisar se a gente errar
// o tipo de algum dado mais na frente.

// Define o formato das props que o componente "AuthProvider" vai receber.
// Nesse caso, só recebe "children" — os componentes filhos que vão ficar
// "dentro" do Provider (ou seja, toda a aplicação).
interface AuthProviderProps {
    children: ReactNode;
};


// ==================== PASSO 3 ====================
// Define o formato dos dados que o CONTEXTO vai disponibilizar
// pra qualquer componente que "consumir" ele.
// Pensa nisso como "o que qualquer tela vai poder perguntar pro contexto":
// - "signed": booleano dizendo se tem usuário logado ou não.
// - "loadingAuth": booleano dizendo se ainda estamos verificando
//   o status de login (útil pra mostrar uma tela de carregamento
//   e não "piscar" a tela de login antes de confirmar que o usuário
//   já está autenticado).
type AuthContextData = {
    signed: boolean;
    loadingAuth: boolean;
};


// ==================== PASSO 4 ====================
// Define o formato de como A GENTE vai guardar os dados do usuário
// internamente nesse componente (não é o mesmo formato que o contexto expõe,
// repare que "user" nem aparece no AuthContextData acima).
interface UserProps {
    uid: string; // ID único do usuário, gerado pelo Firebase
    name: string | null; // nome de exibição (pode ser nulo, se o usuário não tiver definido)
    email: string | null; // email do usuário (também pode ser nulo em alguns casos)
};


// ==================== PASSO 5 ====================
// Aqui a gente EFETIVAMENTE cria o contexto, usando o tipo "AuthContextData"
// que definimos no Passo 3.
// "createContext({} as AuthContextData)" cria o contexto já com um valor
// inicial "fake" (um objeto vazio, mas "forçado" via "as" a ser tratado
// como AuthContextData pelo TypeScript). Isso é só um valor provisório —
// o valor real vai ser passado lá embaixo, no "<AuthContext.Provider value={...}>".
// "export" aqui permite que outros arquivos importem esse contexto
// (por exemplo: import { AuthContext } from "./AuthProvider"),
// pra poder "consumir" os dados dele via useContext.
export const AuthContext = createContext({} as AuthContextData);


// ==================== PASSO 6 ====================
// Declaramos o componente principal: o "AuthProvider".
// Ele recebe "children" como prop (desestruturado direto no parâmetro),
// já tipado com a interface "AuthProviderProps" do Passo 2.
function AuthProvider({ children }: AuthProviderProps) {

	// ==================== PASSO 7 ====================
	// Cria o estado "user", que vai guardar os dados do usuário logado
	// (no formato "UserProps" do Passo 4), ou "null" se ninguém estiver logado.
	// Começa como "null" porque, ao carregar a página, ainda não sabemos
	// se tem alguém logado ou não.
	const [user, setUser] = useState<UserProps | null>(null);

	// Cria o estado "loadingAuth", que começa em "true".
	// Isso representa "ainda estou verificando se tem usuário logado".
	// Vai virar "false" assim que o Firebase responder (com ou sem usuário).
	const [loadingAuth, setLoadingAuth] = useState(true);


	// ==================== PASSO 8 ====================
	// Usa "useEffect" pra rodar um código UMA VEZ, assim que o componente
	// for montado na tela (o array vazio "[]" no final é o que garante isso —
	// significa "não depende de nada, roda só uma vez").
	useEffect(() => {

		// Chama "onAuthStateChanged", passando a instância "auth" e uma função
		// de callback. Essa função vai ser chamada AUTOMATICAMENTE pelo Firebase
		// toda vez que o estado de login mudar (login, logout, ou até
		// quando a página carrega e o Firebase confirma uma sessão já existente).
		const unsub = onAuthStateChanged(auth, (user) => {

			// Se "user" existir (ou seja, tem alguém logado)...
			if (user) {
				// ...desestruturamos só os campos que a gente precisa
				// do objeto de usuário completo que o Firebase retorna.
				const { uid, email, displayName } = user;

				// Atualizamos nosso estado "user" (o nosso, do Passo 7)
				// com esses dados, já no formato "UserProps" que definimos.
				// Repare que "displayName" do Firebase vira "name" no nosso estado.
				setUser({
					uid,
					name: displayName,
					email,
				});

				// Marcamos que a verificação terminou.
				setLoadingAuth(false);

			} else {
				// Se não tiver usuário (ou seja, ninguém está logado
				// ou o usuário acabou de deslogar)...
				setUser(null); // limpamos o estado do usuário

				// Marcamos que a verificação terminou (mesmo sem usuário).
				setLoadingAuth(false);
			}
		});

		// "useEffect" pode retornar uma função de "limpeza" (cleanup),
		// que roda quando o componente é desmontado da tela.
		// Aqui, a gente "cancela a inscrição" no "onAuthStateChanged"
		// (usando a função "unsub" que ele mesmo retornou),
		// pra evitar vazamento de memória (o listener ficar rodando
		// mesmo depois que o componente não existe mais).
		return () => unsub();

	}, []); // array de dependências vazio = roda só uma vez, na montagem


	// ==================== PASSO 9 ====================
	// Por fim, o componente retorna o JSX.
	// "<AuthContext.Provider>" é o componente especial gerado pelo "createContext"
	// no Passo 5 — ele que efetivamente "distribui" os dados pra baixo,
	// pra qualquer componente filho que quiser "consumir" o contexto.
	return (
		<AuthContext.Provider
			// "value" é o que realmente fica disponível pra quem consumir
			// o contexto (via useContext(AuthContext) em outro arquivo).
			// - "signed: !!user": transforma "user" (que pode ser um objeto ou null)
			//   num booleano puro. "!!algumaCoisa" é um truque comum em JS:
			//   se "user" for null, "!!null" vira "false"; se for um objeto,
			//   vira "true". Ou seja, "signed" responde "tem usuário logado?".
			// - "loadingAuth": passamos o estado direto, sem transformação.
			value={{ signed: !!user, loadingAuth }}>

			{/* "children" é tudo que foi passado dentro de <AuthProvider>...</AuthProvider>
			    no arquivo onde ele for usado (normalmente, a aplicação inteira,
			    como vimos no seu App.tsx). Isso garante que TODOS os componentes
			    da aplicação tenham acesso ao AuthContext. */}
			{children}
		</AuthContext.Provider>
	)
};


// ==================== PASSO 10 ====================
// Exporta o componente como "default", pra poder ser importado
// em qualquer lugar com "import AuthProvider from './AuthProvider'"
// (foi exatamente assim que você importou ele no seu App.tsx).
export default AuthProvider;