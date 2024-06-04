import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";
import {motion} from "framer-motion";
import {useState} from "react";
import {Button} from "../components/common/button.tsx";
import {Input, InputGroup} from "../components/common/input.tsx";
import {ChatBubbleLeftIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../components/common/table.tsx";
import {Avatar} from "../components/common/avatar.tsx";
import {Badge} from "../components/common/badge.tsx";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/solid";
import {Dropdown, DropdownButton, DropdownItem, DropdownMenu} from "../components/common/dropdown.tsx";

const tabs = [
    {name: "Online", current: true},
    {name: "All", current: false},
    {name: "Pending", current: false},
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <>
            <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <div className="border-b border-zinc-200 dark:border-zinc-700">
                    <div className="sm:flex sm:">
                        <div className="flex items-center space-x-2 mb-3">
                            {/* SVG icon */}
                            <svg x="0" y="0" className="size-5 fill-zinc-700 dark:fill-zinc-100" aria-hidden="true"
                                 role="img"
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path fill="Color" d="M13 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
                                <path fill="current"
                                      d="M3 5v-.75C3 3.56 3.56 3 4.25 3s1.24.56 1.33 1.25C6.12 8.65 9.46 12 13 12h1a8 8 0 0 1 8 8 2 2 0 0 1-2 2 .21.21 0 0 1-.2-.15 7.65 7.65 0 0 0-1.32-2.3c-.15-.2-.42-.06-.39.17l.25 2c.02.15-.1.28-.25.28H9a2 2 0 0 1-2-2v-2.22c0-1.57-.67-3.05-1.53-4.37A15.85 15.85 0 0 1 3 5Z"
                                      className=""></path>
                            </svg>
                            <h3 className="text-base font-semibold text-zinc-700 dark:text-zinc-100 leading-6">Friends</h3>
                        </div>
                        <div className="mt-4 sm:ml-8 sm:mt-0">
                            <TabList className="relative -mb-px flex space-x-8">
                                {tabs.map((tab, index) => (
                                    <Tab
                                        key={tab.name}
                                        className={({selected}) =>
                                            classNames(
                                                selected
                                                    ? "text-violet-600"
                                                    : "text-zinc-400 hover:text-zinc-500",
                                                "relative whitespace-nowrap px-1 pb-4 text-sm font-medium"
                                            )
                                        }
                                    >
                                        {({selected}) => (
                                            <>
                        <span className="relative">
                          {tab.name}
                            {selected && (
                                <motion.span
                                    layoutId="underline"
                                    className="absolute left-0 right-0 -bottom-5 h-0.5 bg-violet-500"
                                    initial={false}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.2}}
                                />
                            )}
                        </span>
                                            </>
                                        )}
                                    </Tab>
                                ))}
                                <Tab

                                >
                                    <Button color="violet" className="!mb-3 !py-0">Add Friend</Button>

                                </Tab>
                            </TabList>
                        </div>
                    </div>
                </div>
                <TabPanels className="mt-4">
                    <TabPanel>
                        <section>

                            <InputGroup>
                                <MagnifyingGlassIcon/>
                                <Input name="search" placeholder="Search&hellip;" aria-label="Search"/>
                            </InputGroup>
                            <div className="mt-4 text-zinc-500 dark:text-zinc-400">
                                <ComplexExample users={users}/>
                            </div>

                        </section>
                    </TabPanel>
                    <TabPanel>Content 2</TabPanel>
                    <TabPanel>Content 3</TabPanel>
                    <TabPanel>Content 4</TabPanel>
                </TabPanels>
            </TabGroup>
        </>
    );
}
const users = [
    {
        handle: 'User1',
        avatarUrl: 'https://cdn.discordapp.com/avatars/1226135412150505503/82a7ade64cd1bcc587db63be016376a0?size=1024',
        name: 'Mugi',
        email: 'Do Not Disturb',
        access: 'Admin',
        online: true
    },
    {
        handle: 'User2',
        avatarUrl: 'https://cdn.discordapp.com/avatars/911937892471959552/74d64ab57643aefc6b42276d36b88a77?size=1024',
        name: 'Vynxc',
        email: 'Do Not Disturb',
        access: 'User',
        online: false
    },

    // Add more users as needed
]

export function ComplexExample({users}) {
    return (
        <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
            <TableHead>
                <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader></TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.handle}>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <Avatar src={user.avatarUrl} className="size-12"/>
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-zinc-500">
                                        <a href="#" className="hover:text-zinc-700">
                                            {user.email}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            {user.online ? <Badge color="lime">Online</Badge> : <Badge color="zinc">Offline</Badge>}
                        </TableCell>
                        <TableCell className="text-zinc-500 space-x-2 flex justify-end">
                            <div className="-mx-3 my-1.5 sm:-mx-2.5 flex gap-4">
                                <Button color="light">
                                    <ChatBubbleLeftIcon/>
                                </Button>
                                <Dropdown>
                                    <DropdownButton color="light" aria-label="More options">
                                        <EllipsisHorizontalIcon/>
                                    </DropdownButton>
                                    <DropdownMenu anchor="bottom end">
                                        <DropdownItem>View</DropdownItem>
                                        <DropdownItem>Edit</DropdownItem>
                                        <DropdownItem>Delete</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                            </div>
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
