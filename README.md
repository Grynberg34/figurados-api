
# Figurados (API Node.js)

**Descrição:**  
API desenvolvida em Node.js integrada com aplicação React no front-end, de jogo para entusiastas do futebol brasileiro das décadas de 90 e 2000. O usuário deve tentar acertar quem é o jogador do dia a partir de palpites certos e errados sobre times, títulos e posição do jogador oculto do respectivo dia (um novo jogador a cada 24h). Caso o usuário acerte ele ganha uma figurinha virtual do jogador em questão e adiciona a figurinha em seu álbum. 

---

## 🛠 Tecnologias Utilizadas

- Node.js
- Express
- BCrypt
- Passport
- Sequelize
- Nodemailer
 
---

## 🚀 Funcionalidades

- Cadastro/Login utilizando Passport (com JSON e Google oAuth)
- Redefinição de senha utilizando Nodemailer com envio de email para redifinição de senha
- Comunicação com banco de dados MySQL utilizando Sequelize
- Checagem de dicas do usuário a partir dos dados registrados para cada jogador de futebol (time, posição, títulos)
- Checagem de palpite do usuário para nome do jogador oculto


---

## ⚙️ Como Rodar o Projeto

1. Clone o repositório:  
   ```
   git clone https://github.com/Grynberg34/figurados-api
   ```
2. Instale as dependências:  
   ```
   npm install
   ```
3. Inicie o servidor:  
   ```
   npm start
   ```
4. Acesse em: `http://localhost:8080`