"use client";
import { useAuth } from "@/context/AuthProvider";
import { useFavorite } from "@/context/FavoriteProvider";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function FavoriteButton({ id }: { id: string }) {
	const [isFavorite, setIsFavorite] = useState(false);
	const { favoriteSongs, getFavoriteSongs, addFavoriteSong, removeFavoriteSong } = useFavorite();
	const { accessToken } = useAuth();

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
	}, [accessToken, favoriteSongs.length]);

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
				<Tooltip title="Thêm vào thư viện" color="black">
					<AiOutlineHeart
						color="var(--text-primary)"
						className="w-7 h-7 md:w-8 md:h-8 ml-auto hover:bg-[var(--border-color)] rounded-full p-1 group-hover:visible invisible"
						onClick={() => favoriteMusic()}
					/>
				</Tooltip>
			) : (
				<Tooltip title="Xóa khỏi thư viện" color="black">
					<AiFillHeart
						color="var(--purple-primary)"
						className="w-7 h-7 md:w-8 md:h-8 ml-auto hover:bg-[var(--border-color)] rounded-full p-1 group-hover:visible invisible"
						onClick={() => unFavoriteMusic()}
					/>
				</Tooltip>
			)}
		</>
	);
}

export default FavoriteButton;
