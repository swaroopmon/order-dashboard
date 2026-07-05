"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/api";

import { Order } from "@/types/order";

import OrderTable from "@/components/OrderTable";
import OrderModal from "@/components/OrderModal";

import {
    connectWebSocket,
    disconnectWebSocket
} from "@/lib/websocket";

export default function Dashboard() {

    const router = useRouter();

    const [orders, setOrders] = useState<Order[]>([]);

    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const [token, setToken] = useState("");

    useEffect(() => {

        const jwt = localStorage.getItem("token");

        if (!jwt) {

            router.push("/login");

            return;

        }

        setToken(jwt);

        loadOrders();

        connectWebSocket(() => {

            console.log("Refreshing Orders...");

            loadOrders();

        });

        return () => {

            disconnectWebSocket();

        };

    }, []);

    async function loadOrders() {

        try {

            const response = await api.get("/orders");

            setOrders(response.data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    function logout() {

        localStorage.removeItem("token");

        router.push("/login");

    }

    function createOrder() {

        setSelectedOrder(null);

        setModalOpen(true);

    }

    function editOrder(order: Order) {

        setSelectedOrder(order);

        setModalOpen(true);

    }

    async function deleteOrder(order: Order) {

        const ok = confirm(
            `Delete order #${order.id}?`
        );

        if (!ok) return;

        try {

            await api.delete(`/orders/${order.id}`);

            loadOrders();

        }

        catch (err) {

            console.error(err);

        }

    }

    return (

        <div className="min-h-screen bg-slate-100">

            <header className="bg-white shadow">

                <div className="max-w-7xl mx-auto p-5 flex justify-between items-center">

                    <h1 className="text-3xl font-bold">

                        Order Dashboard

                    </h1>

                    <button
                        onClick={logout}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                    >

                        Logout

                    </button>

                </div>

            </header>

            <main className="max-w-7xl mx-auto mt-8">

                <div className="bg-white rounded-xl shadow p-6">

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-2xl font-bold">

                            Orders

                        </h2>

                        <button
                            onClick={createOrder}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                        >

                            + New Order

                        </button>

                    </div>

                    {loading ? (

                        <div className="text-center py-10">

                            Loading...

                        </div>

                    ) : (

                        <OrderTable
                            orders={orders}
                            onEdit={editOrder}
                            onDelete={deleteOrder}
                        />

                    )}

                </div>

            </main>

            <OrderModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={loadOrders}
                order={selectedOrder}
                token={token}
            />

        </div>

    );

}