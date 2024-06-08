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
import {ArrowUturnLeftIcon, BellIcon, GlobeAltIcon, UserGroupIcon} from "@heroicons/react/24/solid";
import PinnedChats from "./Sidebar/PinnedChats.tsx";
import ProfileDropdown from "./Dropdown/ProfileDropdown.tsx";
import MobileDropdown from "./Dropdown/MobileDropdown.tsx";
import {ServerDropdown} from "./Dropdown/ServerDropdown.tsx";

import {Tab, TabGroup, TabList, TabPanel, TabPanels} from '@headlessui/react'
import {Fragment} from "react";
import {MediaObject} from "./MediaObject.tsx";
import {Input, InputGroup} from "../common/input.tsx";

function Layout({children}: { children: React.ReactNode }) {
    const sidebarItems = [
        {href: "/", label: "Home", icon: HomeIcon},
        {href: "/chat", label: "Notifications", icon: BellIcon},
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
                  <TabGroup vertical as={Fragment} defaultIndex={0}>
                      <TabList className="flex flex-col">
                          <SidebarHeader>
                              {/*Server dropdown*/}
                              <ServerDropdown/>
                              {/*Sidebar header items*/}
                              <SidebarSection className="max-lg:hidden">
                                  <Tab as={Fragment}>
                                      <SidebarItem>
                                          <ArrowUturnLeftIcon/>
                                          <SidebarLabel>Back</SidebarLabel>
                                      </SidebarItem>
                                  </Tab>
                                  
                                  <Tab as={Fragment}>
                                      <SidebarItem>
                                          <InboxIcon/>
                                          <SidebarLabel>Direct Messages</SidebarLabel>
                                      </SidebarItem>
                                  </Tab>
                              </SidebarSection>
                          </SidebarHeader>
                          <TabPanels className="overflow-y-scroll">
                              
                              <TabPanel className="">
                                  
                                  <SidebarBody className="overflow-y-scroll h-[65vh] 2xl:h-[75vh] ">
                                      {/*Default Sidebar Body items*/}
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
                              </TabPanel>
                              <TabPanel className="p-4">
                                  <InputGroup>
                                      <MagnifyingGlassIcon/>
                                      <Input name="search" placeholder="Search&hellip;" aria-label="Search"/>
                                  </InputGroup>
                                  <section className="flex flex-col  mt-4 divide-y divide-zinc-800">
                                      <MediaObject initials={'VY'}/>
                                      <MediaObject initials={'VY'}/>
                                      <MediaObject initials={'VY'}/>
                                  </section>
                              </TabPanel>
                              <TabPanel>Content 3</TabPanel>
                          </TabPanels>
                          <SidebarFooter className="max-lg:hidden absolute bottom-0">
                              {/*Profile dropdown*/}
                              <ProfileDropdown/>
                          </SidebarFooter>
                      </TabList>
                  
                  </TabGroup>
              
              </Sidebar>
          }
       >
           {/* The page content */}
           {children}
       </SidebarLayout>
    
    )
}


export default Layout;
