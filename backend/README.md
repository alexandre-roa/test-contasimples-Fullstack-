# Backend - API

Todo backendo foi desenvolvido com typescript com typeORM, para desenvolvimento foi utilizado o docker e o banco de dados escolhido foi o mongodb

## RF(Requisitos funcionais)\*\*

- O usuário deve poder listar todassuas transações e filtrar por data, tipo de transação, numero do cartão e última transação realizada;

## Rotas e endpoints:

A url padrão da aplicação é:

```sh
http://localhost:3333
```

Vou dar o nome a essa url de <strong>baseUrl</strong>
<br></br>

## Rotas de usuário:

<br></br>
Criar usuário:

```sh
METHOD: POST => baseUrl/users

request body: {
	"full_name": string,
	"company_name": string,
	"cnpj": number,
	"password": string,
	"email": string
}

response body: {
  "full_name": string,
  "company_name": string,
  "cnpj": number,
  "email": string,
  "created_at": date_generate_column,
  "updated_at": date_generate_column,
  "id": ObjectId,
  "bank_data": {
    "bank_code": number,
    "bank_name": string,
    "bank_agency_number": number,
    "account_number": string,
    "digit_account_number": number
  }
}

```

<br></br>
Autenticação:

```sh
METHOD: POST => baseUrl/sessions

request body: {
	"full_name": string,
	"company_name": string,
	"cnpj": number,
	"password": string,
	"email": string
}

response body: {
  "user": {
  "id": ObjectId,
  "full_name": string,
  "company_name": string,
  "cnpj": number,
  "email": string,
  "created_at": date_generate_column,
  "updated_at": date_generate_column,
  },
  "token": JWT_token
}

```

<br></br>
Saldo da conta:

```sh
METHOD: GET => baseUrl/users/balance/{user_id}
[auth: Bearer token]

request body: {
	no body
}

response body: {
  "user_id": ObjectId,
  "user": string,
  "company": string,
  "cnpj": number,
  "balance": number
}
```

<br></br>

## Rotas de transação:

<br></br>
Criar transação:

```sh
METHOD: POST => baseUrl/transactions/create/{user_id}
[auth: Bearer token]

request body: {
	"title": string,
	"establishment": string,
	"value": number,
	"final_card": number,
	"transaction_date": date,
	"transaction_description": string,
	"transaction_type": string,
}

response body: {
  "title": string,
  "value": number,
  "type": string,
  "user_id": ObjectId,
  "final_card": number,
  "transaction_type": string,
  "transaction_description": string,
  "establishment": string,
  "transaction_date": date,
  "created_at": date_generate_column,
  "updated_at": date_generate_column,
  "id": ObjectId
}
```

<br></br>
Listar todas transações:

```sh
METHOD: GET => baseUrl/transactions/{user_id}

[auth: Bearer token]

request body: {
	no body
}

response body: [
  {
    "id": ObjectId,
    "title": string,
    "value": number,
    "type": string,
    "user_id": ObjectId,
    "card_id": ObjectId,
    "final_card": number,
    "transaction_type": string,
    "transaction_description": string,
    "establishment": string,
    "transaction_date": date,
    "created_at": date_generate_column,
    "updated_at": date_generate_column
  },
]
```

<br></br>
Listar transações por data:

```sh
METHOD: GET => baseUrl/transactions/{user_id}/day-transactions?{query_params}

[auth: Bearer token]
[query_params: {
  day,
  month,
  year,
}]

request body: {
	no body
}

response body: [
  {
    "id": ObjectId,
    "title": string,
    "value": number,
    "type": string,
    "user_id": ObjectId,
    "card_id": ObjectId,
    "final_card": number,
    "transaction_type": string,
    "transaction_description": string,
    "establishment": string,
    "transaction_date": date,
    "created_at": date_generate_column,
    "updated_at": date_generate_column
  },
]
```

<br></br>
Listar transações por tipo:

```sh
METHOD: GET => baseUrl/transactions/{user_id}/{tipo_da_transação}

[auth: Bearer token]

request body: {
	no body
}

response body: [
  {
    "id": ObjectId,
    "title": string,
    "value": number,
    "type": string,
    "user_id": ObjectId,
    "card_id": ObjectId,
    "final_card": number,
    "transaction_type": string,
    "transaction_description": string,
    "establishment": string,
    "transaction_date": date,
    "created_at": date_generate_column,
    "updated_at": date_generate_column
  },
]
```

<br></br>
Listar transações por numero de cartão:

```sh
METHOD: GET => baseUrl/transactions/{user_id}/bycard/{final_card_number}

[auth: Bearer token]

request body: {
	no body
}

response body: [
  {
    "id": ObjectId,
    "title": string,
    "value": number,
    "type": string,
    "user_id": ObjectId,
    "card_id": ObjectId,
    "final_card": number,
    "transaction_type": string,
    "transaction_description": string,
    "establishment": string,
    "transaction_date": date,
    "created_at": date_generate_column,
    "updated_at": date_generate_column
  },
]
```

<br></br>
Listar a última transação:

```sh
METHOD: GET => baseUrl/transactions/{user_id}/last-transaction/me

[auth: Bearer token]

request body: {
	no body
}

response body: {

    "id": ObjectId,
    "title": string,
    "value": number,
    "type": string,
    "user_id": ObjectId,
    "card_id": ObjectId,
    "final_card": number,
    "transaction_type": string,
    "transaction_description": string,
    "establishment": string,
    "transaction_date": date,
    "created_at": date_generate_column,
    "updated_at": date_generate_column
  },

```

## Rotas de cartões

<br></br>
Criar cartão:

```sh
METHOD: POST => baseUrl/CARDS/{user_id}

request body: {
	"label_name": string,
   "card_limit": number,
   "card_number": number,
   "final_card_number": number,
   "due_date": date,
   "status": string,
   "cvv": number
}

response body: {
  "label_name": string,
  "card_limit": number,
  "card_number": number,
  "final_card_number": number,
  "due_date": date,
  "status": string,
  "cvv": number,
  "user_id": ObjectId,
  "created_at": date_generate_column,
  "updated_at": date_generate_column,
  "id": ObjectId
}

```

<br></br>
Listar todos os cartões:

```sh
METHOD: GET => baseUrl/cards/{user_id}

[auth: Bearer token]

request body: {
	no body
}

response body: [{
  "label_name": string,
  "card_limit": number,
  "card_number": number,
  "final_card_number": number,
  "due_date": date,
  "status": string,
  "cvv": number,
  "user_id": ObjectId,
  "created_at": date_generate_column,
  "updated_at": date_generate_column,
  "id": ObjectId
  "transactions": [{
    "id": ObjectId,
    "title": string,
    "value": number,
    "type": string,
    "user_id": ObjectId,
    "card_id": ObjectId,
    "final_card": number,
    "transaction_type": string,
    "transaction_description": string,
    "establishment": string,
    "transaction_date": date,
    "created_at": date_generate_column,
    "updated_at": date_generate_column
  }]
}]

```

<br></br>
Listar um cartão:

```sh
METHOD: GET => baseUrl/cards/{user_id}/{card_number}

[auth: Bearer token]

request body: {
	no body
}

response body: {
  "label_name": string,
  "card_limit": number,
  "card_number": number,
  "final_card_number": number,
  "due_date": date,
  "status": string,
  "cvv": number,
  "user_id": ObjectId,
  "created_at": date_generate_column,
  "updated_at": date_generate_column,
  "id": ObjectId
  "transactions": [{
    "id": ObjectId,
    "title": string,
    "value": number,
    "type": string,
    "user_id": ObjectId,
    "card_id": ObjectId,
    "final_card": number,
    "transaction_type": string,
    "transaction_description": string,
    "establishment": string,
    "transaction_date": date,
    "created_at": date_generate_column,
    "updated_at": date_generate_column
  }]
}

```
