export default interface ICreateCardDTO {
  label_name: string;
  card_limit: number;
  card_number: number;
  final_card_number: number;
  due_date: Date;
  status: string;
  cvv: number;
  user_id: string;
}
