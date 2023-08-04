"use client";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineDownload } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { BsThreeDots, BsFillPlayFill } from "react-icons/bs";
import { Tooltip } from "antd";
import { useState } from "react";

function MusicSong() {
	const [checkHover, setCheckHover] = useState(false);
	const [showOther, setShowOther] = useState(false);

	return (
		<div
			className="grid grid-cols-4 items-center p-[10px] md:px-[10px] text-[#ffffff80] text-sm border-b-2 border-[#ffffff1a] cursor-pointer group hover:bg-[var(--border-player)] rounded-md relative"
			onMouseEnter={() => setCheckHover(true)}
			onMouseLeave={() => {
				setCheckHover(false);
				setShowOther(false);
			}}>
			<div className="col-span-3 flex gap-x-4 relative">
				<img
					src="https://res.cloudinary.com/phuockaito/image/upload/v1664964713/image_music/oam3yetbai0esn8gednk.jpg"
					className="w-[60px] h-[60px] object-cover auto-cols-[60px] rounded-md group-hover:brightness-[70%] transition-all duration-700"
					alt=""
				/>
				<BsFillPlayFill className="w-7 h-7 absolute top-[50%] translate-y-[-50%] left-5 hidden group-hover:block" color="white" />
				<div className="flex flex-col gap-y-[2px] text-[var(--text-primary)]">
					<h3 className="font-bold">Alone</h3>
					<p className="text-[var(--text-secondary)]">Alan Walker</p>
					<div className="flex items-center gap-x-2 text-[var(--text-secondary)]">
						<AiFillHeart />
						11.3M
					</div>
				</div>
			</div>
			<span className="ml-auto text-xs group-hover:hidden text-[var(--text-secondary)]">3:19</span>
			<div className="absolute right-4">
				<Tooltip title="Khác" color="black">
					<BsThreeDots
						className="w-8 h-8 ml-auto hover:bg-[var(--border-color)] rounded-full p-1 group-hover:visible invisible"
						color="var(--text-primary)"
						onClick={() => setShowOther(true)}
					/>
				</Tooltip>
				<div
					className={twMerge(
						`absolute right-0 top-0 translate-y-[-100%] bg-[var(--primary-bg)] w-[240px] flex-col rounded-md py-1 scale-0 transition-all duration-300 origin-bottom`,
						showOther && checkHover && `scale-100`
					)}>
					<div className="flex items-center gap-x-2 p-2">
						<img src="https://res.cloudinary.com/phuockaito/image/upload/v1664964713/image_music/oam3yetbai0esn8gednk.jpg" className="w-[45px] h-[45px] object-cover rounded-md" alt="" />
						<div className="text-[var(--text-primary)]">
							<h1 className="font-bold">Alone</h1>
							<div className="flex items-center gap-x-1 text-[var(--text-secondary)]">
								<AiOutlineHeart />
								<span>11.3M</span>
								<AiOutlineEye />
								<span>8.3M</span>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-x-2 py-4 px-2 border-t border-[var(--text-primary)] text-[var(--text-primary)] w-full justify-center font-semibold">
						<AiOutlineDownload className="w-5 h-5" />
						<span>Download</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MusicSong;
