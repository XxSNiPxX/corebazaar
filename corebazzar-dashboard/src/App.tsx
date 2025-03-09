// LAYOUTS
import DarkLayout from "~/layouts/MainLayout";
// COMPONENTS
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "~/pages/Home";
import CreateandRegister from "~/pages/CreateandRegister";

// import CreateandRegister from "~/pages/CreateandRegister";

window.process = {
	env: {},
};

const items = [
	{ img: new URL("assets/images/png/image1.png", import.meta.url).href, text: "Fortnite" },
	{ img: new URL("assets/images/png/image2.png", import.meta.url).href, text: "Rocket League®" },
	{ img: new URL("assets/images/png/image3.png", import.meta.url).href, text: "The Escapists 2" },
	{ img: new URL("assets/images/png/image4.png", import.meta.url).href, text: "The Long Dark" },
	{ img: new URL("assets/images/png/image5.png", import.meta.url).href, text: "Yakuza: Like a Dragon" },
	{ img: new URL("assets/images/png/image6.png", import.meta.url).href, text: "Warhammer: Vermintide 2" },
];

const sliderItems = [
	{
		img: new URL("assets/images/webp/slider-img1.webp", import.meta.url).href,
		title: "Valheim",
		genre: "Action Games",
		price: 8.15,
	},
	{
		img: new URL("assets/images/webp/slider-img2.webp", import.meta.url).href,
		title: "BIOSHOCK: THE COLLECTION",
		genre: "Action, RPG",
		discount: 80,
		oldPrice: 50,
		price: 8.67,
	},
	{
		img: new URL("assets/images/webp/slider-img3.webp", import.meta.url).href,
		title: "Unravel Two",
		genre: "Adventure Games",
		price: 20.38,
	},
	{
		img: new URL("assets/images/webp/slider-img4.webp", import.meta.url).href,
		title: "Tick Tock: A Tale for Two",
		genre: "Indie Games",
		discount: 60,
		oldPrice: 3.47,
		price: 1.39,
	},
	{
		img: new URL("assets/images/webp/slider-img5.webp", import.meta.url).href,
		title: "HITMAN 3",
		genre: "Action Games",
		price: 23.99,
	},
	// ----------
	{
		img: new URL("assets/images/webp/slider-img1.webp", import.meta.url).href,
		title: "Valheim",
		genre: "Action Games",
		price: 8.15,
	},
	{
		img: new URL("assets/images/webp/slider-img2.webp", import.meta.url).href,
		title: "BIOSHOCK: THE COLLECTION",
		genre: "Action, RPG",
		discount: 80,
		oldPrice: 50,
		price: 8.67,
	},
	{
		img: new URL("assets/images/webp/slider-img3.webp", import.meta.url).href,
		title: "Unravel Two",
		genre: "Adventure Games",
		price: 20.38,
	},
	{
		img: new URL("assets/images/webp/slider-img4.webp", import.meta.url).href,
		title: "Tick Tock: A Tale for Two",
		genre: "Indie Games",
		discount: 60,
		oldPrice: 3.47,
		price: 1.39,
	},
	{
		img: new URL("assets/images/webp/slider-img5.webp", import.meta.url).href,
		title: "HITMAN 3",
		genre: "Action Games",
		price: 23.99,
	},
	{
		img: new URL("assets/images/webp/slider-img1.webp", import.meta.url).href,
		title: "Valheim",
		genre: "Action Games",
		price: 8.15,
	},
];

function App() {
	return (
		<Router>
			<DarkLayout>
				<Routes>
					<Route element={<Home />} path="/" />
					<Route element={<CreateandRegister />} path="/features" />


				</Routes>
			</DarkLayout>
		</Router>
	);
}

export default App;
