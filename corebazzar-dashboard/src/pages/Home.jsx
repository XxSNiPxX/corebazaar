// PLUGINS

// LAYOUTS
// COMPONENTS

// ICONS

import { Button } from "~/components";
import { ArrowRight, Code, Shield, Coins, Gamepad2, Layers, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function Home() {
	return (
		<>
			<section className="relative py-20 overflow-hidden">
				<div className="absolute inset-0 z-0 opacity-20">
					<div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900"></div>
					<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
					<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
				</div>

				<div className="container relative  mx-auto px-4 py-16 text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
						Seamless In-Game P2P Exchanges for Developers
					</h1>
					<p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
						CoreBazaar is a plug-and-play infrastructure that allows game developers to integrate secure, low-overhead
						in-game P2P exchanges.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg">
							Get Started <ArrowRight className="ml-2 h-5 w-5" />
						</Button>
						<Button
							className="border-blue-600 text-blue-400 hover:bg-blue-950 px-8 py-6 text-lg rounded-lg"
							variant="outline"
						>
							See Demo
						</Button>
					</div>
				</div>
			</section>

			<section className="py-20 bg-gray-900">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-gray-800 p-8 rounded-xl border border-gray-700 text-center">
							<div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
								<Code className="h-8 w-8 text-blue-400" />
							</div>
							<h3 className="text-xl font-bold mb-4">1. Integrate</h3>
							<p className="text-gray-300">
								Game developers integrate CoreBazaar via our SDK and Smart Contracts with minimal code changes
							</p>
						</div>

						<div className="bg-gray-800 p-8 rounded-xl border border-gray-700 text-center">
							<div className="w-16 h-16 bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
								<Gamepad2 className="h-8 w-8 text-purple-400" />
							</div>
							<h3 className="text-xl font-bold mb-4">2. Players Trade</h3>
							<p className="text-gray-300">
								Players list and trade in-game assets directly with other players through your game interface
							</p>
						</div>

						<div className="bg-gray-800 p-8 rounded-xl border border-gray-700 text-center">
							<div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
								<Shield className="h-8 w-8 text-blue-400" />
							</div>
							<h3 className="text-xl font-bold mb-4">3. Secure Transactions</h3>
							<p className="text-gray-300">
								All exchanges are secured by blockchain technology with minimal overhead and gas fees
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 bg-black">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Features & Benefits</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						<div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700">
							<Zap className="h-10 w-10 text-blue-400 mb-4" />
							<h3 className="text-xl font-bold mb-2">Plug-and-Play Integration</h3>
							<p className="text-gray-300">No heavy backend work required. Integrate with just a few lines of code.</p>
						</div>

						<div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700">
							<Shield className="h-10 w-10 text-purple-400 mb-4" />
							<h3 className="text-xl font-bold mb-2">Decentralized & Secure</h3>
							<p className="text-gray-300">
								Blockchain-backed exchanges ensure security and transparency for all transactions.
							</p>
						</div>

						<div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700">
							<Coins className="h-10 w-10 text-blue-400 mb-4" />
							<h3 className="text-xl font-bold mb-2">Customizable Fees</h3>
							<p className="text-gray-300">
								Set your own exchange fees to create additional revenue streams for your game.
							</p>
						</div>

						<div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700">
							<Layers className="h-10 w-10 text-purple-400 mb-4" />
							<h3 className="text-xl font-bold mb-2">Multi-Game Support</h3>
							<p className="text-gray-300">
								Works across various game types and platforms with consistent performance.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 bg-gray-900">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Use Cases</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="relative group">
							<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="relative bg-gray-800 p-8 rounded-xl border border-gray-700 h-full transform group-hover:-translate-y-2 transition-transform duration-300">
								<h3 className="text-2xl font-bold mb-4">MMORPGs</h3>
								<p className="text-gray-300 mb-6">
									Enable players to trade weapons, skins, and in-game currency securely with other players.
								</p>
								<Image
									alt="MMORPG Trading"
									className="rounded-lg w-full object-cover"
									height={200}
									src="/placeholder.svg?height=200&width=300"
									width={300}
								/>
							</div>
						</div>

						<div className="relative group">
							<div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="relative bg-gray-800 p-8 rounded-xl border border-gray-700 h-full transform group-hover:-translate-y-2 transition-transform duration-300">
								<h3 className="text-2xl font-bold mb-4">Strategy Games</h3>
								<p className="text-gray-300 mb-6">
									Allow players to buy and sell resources, territories, and special items with each other.
								</p>
								<Image
									alt="Strategy Game Trading"
									className="rounded-lg w-full object-cover"
									height={200}
									src="/placeholder.svg?height=200&width=300"
									width={300}
								/>
							</div>
						</div>

						<div className="relative group">
							<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="relative bg-gray-800 p-8 rounded-xl border border-gray-700 h-full transform group-hover:-translate-y-2 transition-transform duration-300">
								<h3 className="text-2xl font-bold mb-4">NFT-Based Games</h3>
								<p className="text-gray-300 mb-6">
									Facilitate secure asset transfers and trading of NFT-based game items between players.
								</p>
								<Image
									alt="NFT Game Trading"
									className="rounded-lg w-full object-cover"
									height={200}
									src="/placeholder.svg?height=200&width=300"
									width={300}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Game&apos;s Economy?</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
						Join the growing number of developers using CoreBazaar to create secure, player-driven economies.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button className="bg-white text-blue-900 hover:bg-gray-200 px-8 py-6 text-lg rounded-lg">
							Start Integrating Now
						</Button>
						<Button
							className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg"
							variant="outline"
						>
							Request Demo
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}

export default Home;
