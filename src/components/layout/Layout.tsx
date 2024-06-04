import {SidebarLayout} from '../common/sidebar-layout'
import {Navbar, NavbarItem, NavbarSection, NavbarSpacer} from '../common/navbar'
import {
    Sidebar,
    SidebarBody,
    SidebarFooter,
    SidebarHeader,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
    SidebarSpacer,
} from '../common/sidebar'
import {
    HomeIcon,
    InboxIcon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    SparklesIcon,
} from '@heroicons/react/20/solid'
import {BellIcon, GlobeAltIcon, UserGroupIcon} from "@heroicons/react/24/solid";
import PinnedChats from "./Sidebar/PinnedChats.tsx";
import ProfileDropdown from "./Dropdown/ProfileDropdown.tsx";
import MobileDropdown from "./Dropdown/MobileDropdown.tsx";
import {ServerDropdown} from "./Dropdown/ServerDropdown.tsx";

function Layout({children}: { children: React.ReactNode }) {
    const sidebarItems = [
        {href: "/", label: "Home", icon: HomeIcon},
        {href: "/events", label: "Notifications", icon: BellIcon},
        {href: "/friends", label: "Friends", icon: UserGroupIcon},
        {href: "/broadcasts", label: "Discover", icon: GlobeAltIcon}
    ];

    return (
        <SidebarLayout
            navbar={
                <Navbar>
                    <NavbarSpacer/>
                    <NavbarSection>
                        <NavbarItem href="/search" aria-label="Search">
                            <MagnifyingGlassIcon/>
                        </NavbarItem>
                        <NavbarItem href="/inbox" aria-label="Inbox">
                            <InboxIcon/>
                        </NavbarItem>
                        {/* Mobile profile dropdown*/}
                        <MobileDropdown/>
                    </NavbarSection>
                </Navbar>
            }
            sidebar={
                <Sidebar>
                    <SidebarHeader>
                        {/*Server dropdown*/}
                        <ServerDropdown/>
                        {/*Sidebar header items*/}
                        <SidebarSection className="max-lg:hidden">
                            <SidebarItem href="/search">
                                <MagnifyingGlassIcon/>
                                <SidebarLabel>Search</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem href="/inbox">
                                <InboxIcon/>
                                <SidebarLabel>Direct Messages</SidebarLabel>
                            </SidebarItem>
                        </SidebarSection>
                    </SidebarHeader>
                    <SidebarBody>
                        {/*Sidebar Body items*/}
                        <SidebarSection>
                            {sidebarItems.map((item, index) => (
                                <SidebarItem key={index} href={item.href}>
                                    <item.icon/>
                                    <SidebarLabel>{item.label}</SidebarLabel>
                                </SidebarItem>
                            ))}
                        </SidebarSection>
                        {/*Pinned chats*/}
                        <SidebarSection className="max-lg:hidden">
                            <PinnedChats/>
                        </SidebarSection>
                        <SidebarSpacer/>
                        <SidebarSection>
                            <SidebarItem href="/support">
                                <QuestionMarkCircleIcon/>
                                <SidebarLabel>Support</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem href="/changelog">
                                <SparklesIcon/>
                                <SidebarLabel>Changelog</SidebarLabel>
                            </SidebarItem>
                        </SidebarSection>
                    </SidebarBody>
                    <SidebarFooter className="max-lg:hidden">
                        {/*Profile dropdown*/}
                        <ProfileDropdown/>
                    </SidebarFooter>
                </Sidebar>
            }
        >
            {/* The page content */}
            {children}
        </SidebarLayout>

    )
}


export default Layout;
