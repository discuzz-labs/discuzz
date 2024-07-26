import { MessageSquare, User, Settings, Plus } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";

interface SearchBoxProps {
    open: boolean;
    setOpen: (state: boolean) => void;
}

export default function SearchBox({
    open,
    setOpen
}: SearchBoxProps) {
  return (
    <div onClick={() => setOpen(false) } className={`${open ? "flex" : "hidden"} top-0 left-0 fixed backdrop-blur-sm bg-accent/30 w-full h-[100vh] items-center justify-center`}>
      <Command onClick={(e) => e.stopPropagation()} className="rounded-lg border shadow-md w-1/2 h-1/2">
        <CommandInput onClick={(e) => e.stopPropagation()} placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Profile">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>New Post</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Posts</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
