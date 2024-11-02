import { writable, type Writable } from "svelte/store";
import type { Presence } from "$lib/types";

type OpCode = 0 | 1 | 2 | 3;
type EventType = "INIT_STATE" | "PRESENCE_UPDATE";
interface Data {
	op: OpCode;
	seq: 1 | 2;
	t: EventType;
	d: Presence;
}
const WS_URL = "wss://api.lanyard.rest/socket";
const WS_HEARBEAT = 30e3;
export const USER_ID = "369982847496355841";

export const presenceData: Writable<Presence> = writable({} as Presence);

export function connect() {
	const socket = new WebSocket(WS_URL);
	let hearbeat: number | undefined;
	socket.onopen = () => {
		socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: USER_ID } }));

		hearbeat = setInterval(() => {
			if (socket.readyState === WebSocket.OPEN) {
				socket.send(JSON.stringify({ op: 3 }));
			}
		}, WS_HEARBEAT);
	};

	socket.onmessage = (event) => {
		const data: Data = JSON.parse(event.data);
		if (data.t === "INIT_STATE" || data.t === "PRESENCE_UPDATE") {
			presenceData.update((v) => {
				v = data.d;
				return v;
			});
		}
	};

	socket.onerror = (error) => {
		console.error("WebSocket error:", error);
		clearInterval(hearbeat);
	};

	socket.onclose = (event) => {
		console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
	};

	return {
		disconnect: () => {
			clearInterval(hearbeat);
			socket.close();
		}
	};
}
