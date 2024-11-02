<script>
</script>

<section class="about-content">
	<p>
		ah! so you're actually interested in reading a random guy's web page that you know nothing
		about? cool!
	</p>

	<br />

	<p>
		My name is Ali. I'm a {new Date().getFullYear() - 2003} years old guy who happens to know a thing
		or two about computers. Currently, I'm learning front-end web development. My first programming language
		was Java, though I didn't do much with it, mainly because that was what my university offered. Later
		on, I learned JavaScript, and then Lua(because neovim, of course). I kinda lost track of where I
		was when I fell into the Linux rabbit hole, but now I'm back on track and resuming my web develpoment
		journey.
	</p>

	<br />

	<h2>What do you do?</h2>
	<hr />

	<br />

	<p>
		currently I'm an IT student at <a href="https://uob.edu.ly/">University of Benghazi</a>.
		Studying computer science. doing good so far, and hopefully I'll graduate in 2025!
	</p>

	<br />

	<h2>Hobbies?</h2>
	<hr />

	<br />

	<div class="hobbies-container">
		<div>
			<p>
				well not really, I used to have interest in pixel art, and it died the moment I got into
				University. Here's some cool biker art!
			</p>

			<br />

			<p>I made it using aseprite!</p>

			<br />
			<p>
				even tho I like aseprite, I've been transitioning to pixelorama. why leave aseprite for
				pixelorama? you may ask. Well, because I don't want to compile aseprite from source :p
			</p>

			<br />
		</div>
		<img src="/images/biker.png" alt="biker pixel" />
	</div>

	<br />
</section>

<style>
	p {
		font-size: 1.25rem;
	}

	.about-content {
		padding: 80px 0;
	}

	.hobbies-container {
		display: flex;
		& p {
			padding-right: 12px;
		}

		& img {
			border-radius: 16px;
			width: 350px;
			height: 350px;
		}
	}

	@media screen and (320px <= width <= 860px) {
		.hobbies-container {
			flex-direction: column;

			& img {
				width: auto;
				height: auto;
			}
		}
	}
</style>
