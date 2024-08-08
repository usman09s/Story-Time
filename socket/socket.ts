import io, { Socket } from "socket.io-client";

const BASE_SOCKET_CONNECTION = "http://3.220.77.34:3021"; 

class WSService {
  private socket: Socket | null = null;

  initializeSocket = async (token: string): Promise<void> => {
    try {
      this.socket = io(BASE_SOCKET_CONNECTION, {
        extraHeaders:{
          "access-token": token
        }

      });

      this.socket.on("connection", () => {
        console.log("=== socket connected ====");
      });

      this.socket.on("disconnect", () => {
        console.log("=== socket disconnected ====");
      });

      this.socket.on("connect_error", (err: Error) => {
        console.log(err, "socket connection error");
      });

      this.socket.on("error", (data: any) => {
        console.log("socket error", data);
      });
    } catch (error) {
      console.log("socket is not initialized", error);
    }
  };

  emit(event: string, data: any = {}): void {
    this.socket?.emit(event, data);
  }

  on(event: string, cb: (...args: any[]) => void): void {
    this.socket?.on(event, cb);
  }

  removeListener(
    listenerName: string,
    listener: (...args: any[]) => void
  ): void {
    this.socket?.off(listenerName, listener);
  }

  removeAllListener(listenerName?: string): void {
    if (listenerName) {
      this.socket?.removeAllListeners(listenerName);
    } else {
      this.socket?.removeAllListeners();
    }
  }
  hasListeners(event: string): boolean {
    return this.socket ? this.socket.hasListeners(event) : false;
  }

  disconnect(): void {
    this.socket?.disconnect();
  }
}

const socketServcies = new WSService();

export default socketServcies;