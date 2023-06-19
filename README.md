Projeto Forum Fullstack
## Descrição

Foi feito uma API RESTful utilizando Laravel e PHP para gerenciar as operações do fórum, como criar posts, comentarnos posts, buscar posts por categoria e visualizar as mensagens de cada post.Para autenticação foi usado o Laravel Sanctum.O front-end dessa aplicação foi feito com React.js e para sua estilização foi usado o tailwind.


### Executando a aplicação

 - inicie fazendo o clone deste repositório usando o comando abaixo.

    git clone 'git@github.com:caren1994/project-laravel-react.git'
   
   ### Para o banco de dados vamos usar o mysql , então rode o comando abaixo para criar um container do mysql

...

### após esse comando abra seu workbench e crie um banco de dados chamado db_forum com o comando:

```bash
DROP DATABASE IF EXISTS db_forum; 
CREATE DATABASE db_forum;

```

- explicação: os comandos acima excluem o banco de dados caso exista e cria um novo.

## Back-end

#### Para a parte do back-end entre no diretório app e após entre no diretório projetoForum com os seguintes comandos:
``` bash
  
 cd app && cd projetoForum

```

- Instale o gerenciador de dependẽncias
```bash
  
composer install

```

- no arquivo .env troque os valores das variáveis de ambiente de acordo com a sua configuração do banco de dados e os dados da senha e do usuário informados no comando da criação do container mysql.

```bash
    
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_forum
DB_USERNAME=root
DB_PASSWORD=root

 ```

### populando o banco de dados

- Agora que a conexão foi feita podemos popular nosso banco de dados inserindo as tabelas e alguns seeders que já deixei prontos no arquivo app/database/seeders

```bash
  
php artisan migrate 

 ```
- explicação: faz a migração das tabelas para o banco de dados

```bash
   
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=CategorySeeder

```
   
   explicação: esse comando vai popular as tabelas users e categories respectivamente

### Antes de falarmos sobre as rotas , vamos dar uma olhada em como ficou nosso banco de dados e a relação das tabelas ?
|:--:|
|![DER](./app/frontend/public/diagrama-forum-laravel-react.png)|

### Agora que vocẽ ja sabe como é o nosso banco de dados , vou te mostrar quais são as rotas possíveis
#### Temos as rotas de register e login:
<details>
1- post ('/register) para criar um novo usuário
2- post ('login) para efetuar o login
</details>

vale resaltar que após o login um token é recebido e ele é enviado em todas as requisições para autorização da rotas.
#### Temos as rotas de Post , para buscar todos os posts, buscar 1 post específico, criar um novo post e de deletar um post
<details>
1-post ('/post') para a criar um novo post
2-get ('/post')  para buscar todos os pots
3-get('/post/{id}') para procurar um post específico
4-delete('/post/{id}') para deletar um post
</details>

- todas as rotas são acionadas pelos botões e useEffect na página forum

  #### Temos as rotas de comment para criar , buscar comentários específicos de um post e deletar um comentário
<details>
  1-get ('/comment/{id}') para buscar os comentários de acordo com o post
  2-post ('/comment') para criar um novo comentaŕio
  3-delete ('/comment/{id}') para deletar um ccomentário
</details>

 - E por último e não menos importante temos a rota de category  que  busca os posts de acordo com aquela categoria
 
<details>
  1-get ('/comment/{name}') recebe um name por param e retorna os posts de acordo com aquela categoria recebida
</details>

  #### Agora vamos subir o servidor do back-end com o comando:
```bash
    
    php artisan serve

```

- com isso estamos prontos para conhecer o front-end

  ## front-end

  ### Para a parte do front-end deixe o servidor do back-end rodando e abra um novo terminal  e entre no diretório do front-end com o comando:

  ```bash
    
    cd frontend
  ```
  logo após vamos subir a aplicação com o comando;

  ```bash
    
   npm run start

```

- Uau você está na página de login, você pode usar um user já existente que salvamos no banco de dados com o UserSeeder lembra? ou você pode criar um novo navegando para a página de criar usuário.

```bash
  
'email' : 'admin@gmail.com',
'senha': '12345678'

```

- caso tenha feito um novo usuário você estará novamente na página de login , realize seu login e navegue na página !!!

  

Desenvolvido por [Caren Pontes](https://www.linkedin.com/in/caren-oliveira-pontes/), © 2023.
