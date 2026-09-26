// Importa a função "initializeApp" do pacote "firebase/app".
// É essa função que vai "ligar" o Firebase no nosso projeto,
// usando as configurações (chaves, IDs) que a gente vai passar pra ela.
import { initializeApp } from "firebase/app";

// Importa a função "getAuth" do pacote "firebase/auth".
// Ela é responsável por dar acesso ao módulo de AUTENTICAÇÃO do Firebase
// (login, cadastro, logout, etc). A gente vai usar ela mais pra frente.
import { getAuth } from "firebase/auth";

// Importa a função "getFirestore" do pacote "firebase/firestore".
// Ela dá acesso ao banco de dados do Firebase (o Firestore),
// que é onde vamos guardar/ler dados da aplicação (tipo os carros, no seu caso).
import { getFirestore } from "firebase/firestore";

// Importa a função "getStorage" do pacote "firebase/storage".
// Essa aqui dá acesso ao STORAGE do Firebase, que serve pra guardar arquivos
// (imagens, PDFs, etc) — diferente do Firestore, que guarda só dados/texto.
import { getStorage } from "firebase/storage";


// Aqui a gente cria um objeto chamado "firebaseConfig".
// Esse objeto guarda todas as "credenciais" do nosso projeto Firebase,
// ou seja, as informações que identificam QUAL projeto no Firebase
// a nossa aplicação está tentando se conectar.
// Essas informações a gente pega direto no console do Firebase (firebase.google.com/console),
// na parte de configurações do projeto.
const firebaseConfig = {
  apiKey: "AIzaSyBZyvCaCdhgn7LhHKdmBMIQZKZxAMTMedA", // chave da API — identifica a requisição como vinda do seu projeto
  authDomain: "webcars-c6cb1.firebaseapp.com",        // domínio usado pra autenticação (login)
  projectId: "webcars-c6cb1",                          // ID único do projeto no Firebase
  storageBucket: "webcars-c6cb1.firebasestorage.app",  // endereço do "bucket" onde ficam os arquivos (imagens etc)
  messagingSenderId: "668574144540",                   // ID usado pelo Firebase Cloud Messaging (notificações push)
  appId: "1:668574144540:web:03109e93c33e447b0967d9"   // ID único desse app específico dentro do projeto Firebase
};

// Initialize Firebase
// Aqui a gente efetivamente "inicializa" o Firebase.
// Chamamos a função "initializeApp", passando o objeto de configuração que criamos acima.
// O retorno dessa função é guardado na constante "app" — ela representa
// a nossa conexão/instância ativa com o projeto Firebase.
// É essa variável "app" que vamos usar nas próximas linhas pra "plugar"
// cada serviço do Firebase (auth, firestore, storage) nesse projeto específico.
const app = initializeApp(firebaseConfig);

// Chamamos "getFirestore", passando o "app" que acabamos de criar.
// Isso retorna uma instância do banco de dados Firestore,
// já conectada ao nosso projeto. Guardamos essa instância na constante "db"
// (nome comum pra "database") pra usar depois quando formos ler/escrever dados.
const db = getFirestore(app);

// Chamamos "getAuth", também passando o "app".
// Isso retorna uma instância do serviço de autenticação,
// já conectada ao nosso projeto. Guardamos na constante "auth"
// pra usar depois em funções de login, cadastro, logout, etc.
const auth = getAuth(app);

// Chamamos "getStorage", passando o "app" de novo.
// Isso retorna uma instância do serviço de armazenamento de arquivos,
// conectada ao nosso projeto. Guardamos na constante "storage"
// pra usar quando formos fazer upload/download de imagens, por exemplo.
const storage = getStorage(app);

// Por fim, exportamos as três constantes ("db", "auth", "storage").
// Isso permite que outros arquivos do projeto importem essas instâncias já prontas
// (por exemplo: import { db } from "./firebaseConfig")
// sem precisar inicializar o Firebase de novo em cada arquivo.
// Essa é a ideia de "configurar uma vez, usar em todo lugar".
export { db, auth, storage };