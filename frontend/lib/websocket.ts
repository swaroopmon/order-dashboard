const WS_URL = "ws://127.0.0.1:8000/ws/orders";

let socket: WebSocket | null = null;

export function connectWebSocket(
    onMessage: (data: any) => void
) {

    socket = new WebSocket(WS_URL);

    socket.onopen = () => {

        console.log("✅ WebSocket Connected");

    };

    socket.onmessage = (event) => {

        const data = JSON.parse(event.data);

        console.log("📩", data);

        onMessage(data);

    };

    socket.onclose = () => {

        console.log("❌ WebSocket Disconnected");

    };

}

export function disconnectWebSocket() {

    if (socket) {

        socket.close();

    }

}