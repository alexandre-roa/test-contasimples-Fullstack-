export default async function generateData(user_id: string, api: any) {
  // CREATE CARDS

  await api.post(`cards/${user_id}`, {
    label_name: 'Conta Simples',
    card_limit: 50000,
    card_number: 5155420856891234,
    final_card_number: 1234,
    due_date: '2021-10',
    status: 'on',
    cvv: 123,
  });

  await api.post(`cards/${user_id}`, {
    label_name: 'Conta Simples',
    card_limit: 50000,
    card_number: 5155420856891235,
    final_card_number: 1235,
    due_date: '2021-10',
    status: 'on',
    cvv: 123,
  });

  await api.post(`cards/${user_id}`, {
    label_name: 'Conta Simples',
    card_limit: 50000,
    card_number: 5155420856891236,
    final_card_number: 1236,
    due_date: '2021-10',
    status: 'on',
    cvv: 123,
  });

  // CREATE CREDIT TRANSACTIONS

  await api.post(`/transactions/create/${user_id}`, {
    title: 'Freela',
    establishment: 'CONTA SIMPLES',
    value: 4550,
    final_card: 1236,
    transaction_date: '2020-10-20',
    transaction_description: 'API - REST',
    transaction_type: 'credit',
    type: 'credit',
  });

  await api.post(`/transactions/create/${user_id}`, {
    title: 'Freela',
    establishment: 'CONTA SIMPLES',
    value: 5000,
    final_card: 1236,
    transaction_date: '2020-10-20',
    transaction_description: 'FRONT-END',
    transaction_type: 'credit',
    type: 'credit',
  });

  await api.post(`/transactions/create/${user_id}`, {
    title: 'Freela',
    establishment: 'CONTA SIMPLES',
    value: 6000,
    final_card: 1236,
    transaction_date: '2020-10-20',
    transaction_description: 'MOBILE',
    transaction_type: 'credit',
    type: 'credit',
  });

  await api.post(`/transactions/create/${user_id}`, {
    title: 'Venda',
    establishment: 'DELL',
    value: 3500,
    final_card: 1234,
    transaction_date: '2020-10-20',
    transaction_description: 'VENDA NOTEBOOK',
    transaction_type: 'credit',
    type: 'credit',
  });

  await api.post(`/transactions/create/${user_id}`, {
    title: 'Venda',
    establishment: 'APPLE',
    value: 8500,
    final_card: 1235,
    transaction_date: '2020-10-20',
    transaction_description: 'VENDA MACBOOK',
    transaction_type: 'credit',
    type: 'credit',
  });

  // CREATE DEBIT TRANSACTIONS

  await api.post(`/transactions/create/${user_id}`, {
    title: 'Mouse',
    establishment: 'AMAZON',
    value: 250,
    final_card: 1234,
    transaction_date: '2020-10-20',
    transaction_description: 'Mouse Gamer',
    transaction_type: 'debit',
    type: 'debit',
  });

  await api.post(`/transactions/create/${user_id}`, {
    title: 'Teclado',
    establishment: 'AMAZON',
    value: 150,
    final_card: 1234,
    transaction_date: '2020-10-20',
    transaction_description: 'Teclado Gamer',
    transaction_type: 'debit',
    type: 'debit',
  });

  await api.post(`/transactions/create/${user_id}`, {
    title: 'Monitor',
    establishment: 'KABUM',
    value: 1150,
    final_card: 1235,
    transaction_date: '2020-10-20',
    transaction_description: 'Monitor 240hz',
    transaction_type: 'debit',
    type: 'debit',
  });

  await api.post(`/transactions/create/${user_id}`, {
    title: 'Placa de vídeo',
    establishment: 'NVIDIA',
    value: 4250,
    final_card: 1234,
    transaction_date: '2020-10-20',
    transaction_description: 'GTX 3080',
    transaction_type: 'debit',
    type: 'debit',
  });

  window.location.reload();
}
