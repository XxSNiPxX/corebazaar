import { useState } from "react";
// PLUGINS
import clsx from "clsx";
// CONFIG
import { topMenu, bottomMenu } from "~/configs/menus";
// COMPONENTS
import { UserProfile, ColorModeSwitch } from "~/components";
// HOOKS
import { useColorMode } from "~/hooks";
// TYPES
import { ColorModes } from "~/hooks/useColorMode/types";
// IMAGES
import { ReactComponent as DarkLogo } from "~/assets/images/svg/dark-logo.svg";
import { ReactComponent as LightLogo } from "~/assets/images/svg/light-logo.svg";
// ICONS
import { ReactComponent as MenuIcon } from "~/assets/icons/menu.svg";
import { ReactComponent as OpenMenuIcon } from "~/assets/icons/menu-open.svg";

type Props = {
	className?: string;
};

const Sidebar = ({ className }: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const { colorMode, changeColorMode } = useColorMode();

	const classNames = clsx(
		className,
		"h-screen min-w-[var(--sidebar-width)] fixed top-0 left-0 z-50 flex flex-col justify-between pl-3 bg-[var(--light-color)] dark:bg-[var(--dark-color)] text-[#ebebf599] transition-transform md:sticky md:translate-x-0 md:transition-none",
		isMenuOpen ? "translate-x-0" : "-translate-x-full"
	);

	return <></>;
};

export default Sidebar;
