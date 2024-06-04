import {
    Dropdown,
    DropdownButton,
    DropdownDivider,
    DropdownItem,
    DropdownLabel,
    DropdownMenu
} from "../../common/dropdown.tsx";
import {NavbarItem} from "../../common/navbar.tsx";
import {Avatar} from "../../common/avatar.tsx";
import {
    ArrowRightStartOnRectangleIcon,
    Cog8ToothIcon,
    LightBulbIcon,
    ShieldCheckIcon,
    UserIcon
} from "@heroicons/react/16/solid";

export default function MobileDropdown() {
    return (
        <Dropdown>
            <DropdownButton as={NavbarItem}>
                <Avatar src="/profile-photo.jpg" square/>
            </DropdownButton>
            <DropdownMenu className="min-w-64" anchor="bottom end">
                <DropdownItem href="/my-profile">
                    <UserIcon/>
                    <DropdownLabel>My profile</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/settings">
                    <Cog8ToothIcon/>
                    <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider/>
                <DropdownItem href="/privacy-policy">
                    <ShieldCheckIcon/>
                    <DropdownLabel>Privacy policy</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/share-feedback">
                    <LightBulbIcon/>
                    <DropdownLabel>Share feedback</DropdownLabel>
                </DropdownItem>
                <DropdownDivider/>
                <DropdownItem href="/logout">
                    <ArrowRightStartOnRectangleIcon/>
                    <DropdownLabel>Sign out</DropdownLabel>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
