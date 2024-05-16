import { CircleDollarSignIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Earth } from "lucide-react";
import { Input } from "./ui/input";
import Logo from "./logo";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Nav() {
  return (
    <>
      <div className="flex w-full justify-center items-center gap-5 mt-3 ">
        <Logo />
        <Input
          type="text"
          placeholder="Search"
          className="w-[80%] border-2 border-black"
        />
        <div className="flex justify-center items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Earth size={32} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <RadioGroup defaultValue="comfortable" className="p-3 gap-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">UR/URDU</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">EN/ENG</Label>
                </div>
              </RadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleDollarSignIcon size={32} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <RadioGroup defaultValue="comfortable" className="p-3 gap-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">USD</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Rupees (PAK)</Label>
                </div>
              </RadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserButton />
        </div>
      </div>
    </>
  );
}
