import Titlebar from "./TitleBar.tsx";
import {Avatar} from '../common/avatar'
import {
    Dropdown,
    DropdownButton,
    DropdownDivider,
    DropdownItem,
    DropdownLabel,
    DropdownMenu,
} from '../common/dropdown'
import {SidebarLayout} from '../common/sidebar-layout'
import {Navbar, NavbarItem, NavbarSection, NavbarSpacer} from '../common/navbar'
import {
    Sidebar,
    SidebarBody,
    SidebarFooter,
    SidebarHeader,
    SidebarHeading,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
    SidebarSpacer,
} from '../common/sidebar'
import * as Headless from '@headlessui/react'
import {
    ArrowRightStartOnRectangleIcon,
    ChevronUpIcon,
    Cog8ToothIcon,
    LightBulbIcon,
    PlusIcon,
    ShieldCheckIcon,
    UserIcon,
} from '@heroicons/react/16/solid'
import {
    ChevronDownIcon,
    Cog6ToothIcon,
    HomeIcon,
    InboxIcon,
    MagnifyingGlassIcon,
    MegaphoneIcon,
    QuestionMarkCircleIcon,
    SparklesIcon,
    Square2StackIcon,
    TicketIcon,
} from '@heroicons/react/20/solid'
import {BellIcon, GlobeAltIcon, UserGroupIcon} from "@heroicons/react/24/solid";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/react";
import {AnimatePresence, easeOut, motion} from "framer-motion";
import clsx from "clsx";
// const Layout2 = ({children}) => {
//     return (
//         // <div className={'overflow-hidden'}>
//         //     {/* Header */}
//         //     <Titlebar/>
//         //
//         //     {/* Main Content */}
//         //     <main id={'main'} className={'mt-13 h-dvh overflow-y-auto'}>{children}</main>
//         //
//         //     {/* Footer */}
//         //     {/*<footer>*/}
//         //     {/*    <p>&copy; 2023 My React App</p>*/}
//         //     {/*</footer>*/}
//         // </div>
//         <Example/>
//     );
// };


function Layout({children}) {
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
                    </NavbarSection>
                </Navbar>
            }
            sidebar={
                <Sidebar>
                    <SidebarHeader>
                        <Dropdown>
                            <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                                <Avatar src="/tailwind-logo.svg"/>
                                <SidebarLabel>Tailwind Labs</SidebarLabel>
                                <ChevronDownIcon/>
                            </DropdownButton>
                            <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                                <DropdownItem href="/teams/1/settings">
                                    <Cog8ToothIcon/>
                                    <DropdownLabel>Settings</DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider/>
                                <DropdownItem href="/teams/1">
                                    <Avatar slot="icon" src="/tailwind-logo.svg"/>
                                    <DropdownLabel>Tailwind Labs</DropdownLabel>
                                </DropdownItem>
                                <DropdownItem href="/teams/2">
                                    <Avatar slot="icon" initials="WC" className="bg-purple-500 text-white"/>
                                    <DropdownLabel>Workcation</DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider/>
                                <DropdownItem href="/teams/create">
                                    <PlusIcon/>
                                    <DropdownLabel>New team&hellip;</DropdownLabel>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <SidebarSection className="max-lg:hidden">
                            <SidebarItem current={true} href="/search">
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
                        <SidebarSection>
                            <SidebarItem href="/">
                                <HomeIcon/>
                                <SidebarLabel>Home</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem href="/events">
                                <BellIcon/>
                                <SidebarLabel>Notifications</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem href="/orders">
                                <UserGroupIcon/>
                                <SidebarLabel>Friends</SidebarLabel>
                            </SidebarItem>

                            <SidebarItem href="/broadcasts">
                                <GlobeAltIcon/>
                                <SidebarLabel>Discover</SidebarLabel>
                            </SidebarItem>
                        </SidebarSection>
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
                        <Dropdown>
                            <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar src="/profile-photo.jpg" className="size-10" square alt=""/>
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">Erica</span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      erica@example.com
                    </span>
                  </span>
                </span>
                                <ChevronUpIcon/>
                            </DropdownButton>
                            <DropdownMenu className="min-w-64" anchor="top start">
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
                    </SidebarFooter>
                </Sidebar>
            }
        >
            {/* The page content */}
            {children}
            {/*<main id={'main'} className={'mt-13 min-w-full h-dvh overflow-y-auto'}>    </main>*/}
        </SidebarLayout>

    )
}

function PinnedChats() {
    return (
        <Disclosure as="div" className="w-full max-w-md" defaultOpen={true}>
            {({open}) => (
                <>
                    <DisclosureButton className="group flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ChevronDownIcon
                                className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"/>
                            <SidebarHeading
                                className={'text-sm/6 mb-0 font-medium text-white group-data-[hover]:text-white/80'}>Pinned
                                Chats</SidebarHeading>
                        </div>
                        <PlusIcon
                            className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"/>
                    </DisclosureButton>
                    <div className="overflow-hidden py-2">
                        <AnimatePresence>
                            {open && (
                                <DisclosurePanel
                                    static
                                    as={motion.ul}
                                    initial={{opacity: 0, y: -24}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -24}}
                                    transition={{duration: 0.2, ease: easeOut}}
                                    className="origin-top flex flex-col gap-2"
                                >
                                    < MediaObjects initials={'VY'}/>
                                    < MediaObjects initials={'MU'}/>
                                    < MediaObjects initials={'NG'}/>
                                </DisclosurePanel>
                            )}
                        </AnimatePresence>
                    </div>
                </>
            )}
        </Disclosure>
    )
}

export function MediaObjects
({initials}) {
    return (
        <a className="flex cursor-pointer group items-center gap-4">
            <Avatar initials={initials} className="size-8 bg-zinc-500"/>
            <div>
                <div className="font-medium text-sm">{'Vynxc'}</div>
                <div className="text-zinc-400">
                    <span className="group-hover:text-zinc-500 text-xs line-clamp-1">
                        {'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                    </span>
                </div>
            </div>
        </a>

    )
}

export default Layout;
