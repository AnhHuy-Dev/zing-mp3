"use client";
import { useAuth } from "@/context/AuthProvider";
import { useFavorite } from "@/context/FavoriteProvider";
import { usePlayer } from "@/context/PlayProvider";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

function FavoriteButton({ id, play }: { id: string; play?: boolean }) {
	const [isFavorite, setIsFavorite] = useState(false);
	const { favoriteSongs, getFavoriteSongs, addFavoriteSong, removeFavoriteSong } = useFavorite();
	const { accessToken } = useAuth();
	const { songActive } = usePlayer();

	useEffect(() => {
		if (accessToken === "") {
			setIsFavorite(false);
			return;
		}

		const fetchData = async () => {
			getFavoriteSongs(accessToken);
			const index = favoriteSongs.findIndex((item) => item.id_music === id);
			if (index === -1) setIsFavorite(false);
			else setIsFavorite(true);
		};
		fetchData();
	}, [accessToken, favoriteSongs.length, songActive._id]);

	const favoriteMusic = async () => {
		if (accessToken === "") {
			toast.error("Vui lòng đăng nhập!");
			return;
		}
		await addFavoriteSong(accessToken, id);
		setIsFavorite(true);
	};

	const unFavoriteMusic = async () => {
		if (accessToken === "") return;
		await removeFavoriteSong(accessToken, id);
		setIsFavorite(false);
	};

	return (
		<>
			{!isFavorite ? (
				<>
					<div className="hidden lg:block">
						<Tooltip title="Thêm vào thư viện" color="black">
							<AiOutlineHeart
								color="var(--text-primary)"
								className={twMerge(`w-8 h-8 md:w-8 md:h-8 ml-auto hover:bg-[var(--border-color)] rounded-full p-1 group-hover:block hidden`, play && `block`)}
								onClick={() => favoriteMusic()}
							/>
						</Tooltip>
					</div>
					<AiOutlineHeart
						color="var(--text-primary)"
						className={twMerge(`w-8 h-8 md:w-8 md:h-8 ml-auto hover:bg-[var(--border-color)] rounded-full p-1 group-hover:block lg:group-hover:hidden hidden`)}
						onClick={() => favoriteMusic()}
					/>
				</>
			) : (
				<>
					<div className="hidden lg:block">
						<Tooltip title="Xóa khỏi thư viện" color="black">
							<AiFillHeart
								color="var(--purple-primary)"
								className={twMerge(`w-8 h-8 md:w-8 md:h-8 ml-auto hover:bg-[var(--border-color)] rounded-full p-1 group-hover:block hidden`, play && `block`)}
								onClick={() => unFavoriteMusic()}
							/>
						</Tooltip>
					</div>
					<AiFillHeart
						color="var(--purple-primary)"
						className={twMerge(`w-8 h-8 md:w-8 md:h-8 ml-auto hover:bg-[var(--border-color)] rounded-full p-1 group-hover:block lg:group-hover:hidden hidden`)}
						onClick={() => unFavoriteMusic()}
					/>
				</>
			)}
		</>
	);
}

export default FavoriteButton;
