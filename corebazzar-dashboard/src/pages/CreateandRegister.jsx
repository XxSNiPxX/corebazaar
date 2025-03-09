// PLUGINS

// LAYOUTS
// COMPONENTS

// ICONS

import { GameServerForm } from "~/components/Forms/game-server-form.tsx";
import { ResourceRegistrationForm } from "~/components/Forms/resource-register-form.tsx";

import { ArrowRight, Code, Shield, Coins, Gamepad2, Layers, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function Home() {
	return (
		<>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GameServerForm />
            <ResourceRegistrationForm />
          </div>
		</>
	);
}

export default Home;
