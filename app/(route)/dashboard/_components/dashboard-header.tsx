import { UserButton } from "@clerk/nextjs"
import { Search } from "lucide-react"

const DashboardHeader = () => {
    return (
        <div className="w-full flex justify-between p-5 shadow-sm border-b">
            <div className='hidden md:flex md:w-[500px] gap-2 items-center border p-2 rounded-md max-w-lg justify-start'>
                <Search />
                <input type='text' placeholder='Search...' className='outline-none w-full' />
            </div>
            <UserButton />
        </div>
    )
}

export default DashboardHeader