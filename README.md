

## Funcionalidades
* Cadastro de usuário;
* Login (Autenticação e autorização com token JWT);
* Listagem de produtos;
* Cadastro de novos produtos;
* Busca de produtos pelo título;
* Venda de produtos (com controle e validação de estoque);
* Histórico de vendas (Bônus);
* Export dos dados das vendas e produtos para PDF e CSV (Bônus);
* Estatísticas das vendas (Bônus);
* Design responsivo (Bônus);

## Tecnologias utilizadas
### Front-end:
* React JS;
* SASS para estilos;
* Material table;
* Chart JS;
* Axios;

### Back-end (API Rest):
* .Net Core 3.1;
* Banco de dados InMemory;
* dotnet restore
* dotnet watch run

## Observações
* Para visualizar as estatísticas é necessário vender pelo menos 5 produtos diferentes;
* Não é possível vender um produto que não está disponível no estoque;
* Há uma opção nas tabelas pra exportar o contéudo em PDF ou CSV;
* Como a API foi construída utilizando um banco de dados InMemory, a reinicialização da mesma acarreta na perda dos dados registrados;



 
