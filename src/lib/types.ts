export type Post = {
	title: string;
	slug: string;
	desc: string;
	image?: string;
	date: string;
	categories: string[];
	published: boolean;
};

export interface Spotify {
	track_id: string;
	timestamps: {
		start: number;
		end: number;
	};
	song: string;
	artist: string;
	album_art_url: string;
	album: string;
}

export interface DiscordUser {
	id: string;
	username: string;
	avatar: string;
    discriminator: string;
	global_name: string;
	display_name: string;
}

export interface Presence {
	kv: object;
	spotify: Spotify | null;
	discord_user: DiscordUser;
	activities: Array<object>;
	discord_status: "online" | "idle" | "dnd" | "offline";
	active_on_discord_web: boolean;
	active_on_discord_desktop: boolean;
	active_on_discord_mobile: boolean;
	listening_to_spotify: boolean;
}
