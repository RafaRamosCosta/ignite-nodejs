# Requisitos do Projeto

## Cadastro de carros

**RF**

> - Deve ser possível cadastrar um novo carro;

**RN**

> - Não deve ser possível cadastrar um carro com uma placa já existente;
> - O carro deve ser cadastrado com disponibilidade por padrão;
> - Para cadastrar um carro o usuário deve ser um administrador.

## Listagem de carros

**RF**

> - Deve ser possível listar todos os carros disponíveis;
> - Deve ser possível listar todos os carros disponíveis pelo nome da categoria;
> - Deve ser possível listar todos os carros disponíveis pelo nome da marca;
> - Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**

> - Não é necessário que o usuário esteja logado para a listagem de carros.

## Alteração de carros

> - Não deve ser possível alterar a placa de um carro já cadastrado;

## Cadastro de especificação no carro

**RF**

> - Deve ser possível cadastrar uma especificação para um carro;
> - Deve ser possível listar todas as especificações;
> - Deve ser possível listar todos os carros;

**RN**

> - Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
> - O usuário responsável pelo cadastro deve ser um usuário administrador.
> - Não deve ser possível cadastrar uma mesma especificação já existente para o mesmo carro;

## Cadastro de imagens do carro

**RF**

> - Deve ser possível cadastrar a imagem do carro;
> - Deve ser possível listar todos os carros;

**RNF**

> - Utilizar o multer para upload dos arquivos;

**RN**

> - O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
> - O usuário responsável pelo cadastro deve ser um usuário administrador.

## Aluguel de carros

**RF**

> - Deve ser possível cadastrar um aluguel

**RN**

> - O aluguel deve ter duração mínima de 24 horas.
> - Não deve ser possível cadastrar um novo aluguel para um mesmo usuário;
> - Não deve ser possível cadastrar um novo aluguel para um carro que já está alugado;
