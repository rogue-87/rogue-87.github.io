import { writable, type Writable } from "svelte/store";
import type { Presence } from "$lib/types";
import { dev } from "$app/environment";

export const presenceData: Writable<Presence> = writable({} as Presence);

type OpCode = 0 | 1 | 2 | 3;
type EventType = "INIT_STATE" | "PRESENCE_UPDATE";
type Data = {
    op: OpCode;
    seq: 1 | 2;
    t: EventType;
    d: Presence;
};

export class LanyardSocket extends WebSocket {
    private readonly userId: string;
    private hearbeat?: NodeJS.Timeout;
    private heartbeatInterval: number;

    constructor(userId: string, heartbeatInterval?: number) {
        super("wss://api.lanyard.rest/socket");
        this.userId = userId;
        this.heartbeatInterval = heartbeatInterval ? heartbeatInterval : 30e3;
    }

    public connect() {
        this.onopen = () => {
            this.send(JSON.stringify({ op: 2, d: { subscribe_to_id: this.userId } }));

            this.hearbeat = setInterval(() => {
                if (this.readyState === WebSocket.OPEN) {
                    this.send(JSON.stringify({ op: 3 }));
                }
            }, this.heartbeatInterval);
        };

        this.onmessage = (event: MessageEvent) => {
            const data: Data = JSON.parse(event.data);
            if (data.t === "INIT_STATE" || data.t === "PRESENCE_UPDATE") {
                presenceData.update((v) => {
                    v = data.d;
                    return v;
                });
            }
        };

        this.onerror = (event: Event) => {
            if (dev) {
                console.error("WebSocket error:", event);
            }
            clearInterval(this.hearbeat);
        };

        this.onclose = (event: CloseEvent) => {
            if (dev) {
                console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
            }
        };
    }

    public disconnect() {
        clearInterval(this.hearbeat);
        this.close();
    }
}
