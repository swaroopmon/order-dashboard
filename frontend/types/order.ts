export interface Order {

    id: number;

    customer_name: string;

    amount: number;

    amount_usd?: number;

    status: string;

    created_at: string;
}