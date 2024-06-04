import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {SidebarHeading} from "../../common/sidebar.tsx";
import {PlusIcon} from "@heroicons/react/16/solid";
import {AnimatePresence, easeOut, motion} from "framer-motion";
import {MediaObject} from "../MediaObject.tsx";

export default function PinnedChats() {
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
                                    < MediaObject initials={'VY'}/>
                                    < MediaObject initials={'MU'}/>
                                    < MediaObject initials={'NG'}/>
                                </DisclosurePanel>
                            )}
                        </AnimatePresence>
                    </div>
                </>
            )}
        </Disclosure>
    )
}
