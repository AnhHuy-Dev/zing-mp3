"use client";
import { useAuth } from "@/context/AuthProvider";
import { useHistory } from "@/context/HistoryProvider";
import { usePlayer } from "@/context/PlayProvider";
import React, { useEffect, useRef, useState } from "react";

function AudioElement() {
	const [isClient, setIsClient] = useState(false);
	const ref = React.useRef<HTMLAudioElement>(null);

	const { songActive, isPlayingSong, isRepeat, listSongData, handleSetNewActiveSong, handleSetPlaying, currentVolume, handleSetTime, timeCurrent, newTime, isRandom } = usePlayer();
	const { addHistorySong } = useHistory();
	const { accessToken } = useAuth();
	useEffect(() => {
		setIsClient(true);
		if (!ref.current) return;

		ref.current!.currentTime = timeCurrent;
		ref.current!.volume = currentVolume;
		if (isPlayingSong) {
			ref.current && ref.current.play();
		} else {
			ref.current && ref.current.pause();
		}
	}, []);

	const handleCanPlay = () => {
		ref.current!.volume = currentVolume;
		if (isPlayingSong) {
			ref.current && ref.current.play();
		} else {
			ref.current && ref.current.pause();
		}
	};

	useEffect(() => {
		if (!ref.current) return;
		ref.current!.currentTime = timeCurrent;
		if (isPlayingSong) {
			ref.current!.play();
		} else {
			ref.current!.pause();
		}
	}, [isPlayingSong]);

	const handleEnded = () => {
		if (listSongData.length === 1) {
			handleSetPlaying(false);
			ref.current?.pause();
			return;
		}
		if (!isRepeat) {
			if (isRandom) {
				let random = Math.floor(Math.random() * listSongData.length);
				const index = listSongData.findIndex((item) => item._id === songActive._id);
				while (random === index) {
					random = Math.floor(Math.random() * listSongData.length);
				}
				addHistorySong(accessToken, listSongData[random]._id);
				handleSetNewActiveSong(listSongData[random]);
				handleSetPlaying(true);
				return;
			}
			if (listSongData.length === 0) return;

			const index = listSongData.findIndex((item) => item._id === songActive._id);

			if (index === listSongData.length - 1) {
				addHistorySong(accessToken, listSongData[0]._id);

				handleSetNewActiveSong(listSongData[0]);
			} else {
				handleSetNewActiveSong(listSongData[index + 1]);
				addHistorySong(accessToken, listSongData[index + 1]._id);
			}
			handleSetPlaying(true);
		} else {
			ref.current?.play();
		}
	};

	const handleTimeUpdate = () => {
		if (!ref.current) return;
		handleSetTime(ref.current.currentTime);
	};

	useEffect(() => {
		if (!ref.current) return;
		handleSetTime(0);
		ref.current!.currentTime = 0;
	}, [songActive._id]);

	useEffect(() => {
		if (!ref.current) return;

		ref.current!.volume = currentVolume;
	}, [currentVolume]);

	useEffect(() => {
		if (!ref.current) return;
		if (newTime !== 0) ref.current!.currentTime = newTime;
	}, [newTime]);

	if (!isClient) return null;

	return <audio ref={ref} controls hidden src={songActive.src_music} autoPlay={isPlayingSong} onCanPlay={handleCanPlay} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} />;
}

export default AudioElement;
