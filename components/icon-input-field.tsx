'use client';

import { LucideIcon } from "lucide-react";
import { Input } from './ui/input';
import { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";

interface IconInputProps {
    placeholder: string;
    className: string;
    icon: LucideIcon
}

export const EmojiIconPickerInput = ({ className, placeholder, icon: Icon }: IconInputProps) => {

    const [emojiIcon, setEmojiIcon] = useState('😃');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    return (
        <div className='flex relative'>
            <div className="flex items-center justify-start">
                <Icon className='ml-2 cursor-pointer mr-2 hover:text-emerald-700' onClick={() => setOpenEmojiPicker(!openEmojiPicker)} />
                <Input
                    placeholder={placeholder}
                    className={className}
                />
            </div>
            <div className='absolute'>
                <EmojiPicker className='w-full' open={openEmojiPicker}
                    onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                    }} />
            </div>
        </div>
    )
}