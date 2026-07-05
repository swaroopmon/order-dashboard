from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio

from app.websocket.connection_manager import manager

router = APIRouter()


@router.websocket("/ws/orders")
async def websocket_endpoint(websocket: WebSocket):

    await manager.connect(websocket)

    try:
        while True:
            # Keep the connection alive
            await asyncio.sleep(1)

    except WebSocketDisconnect:
        manager.disconnect(websocket)   