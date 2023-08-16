"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "antd";

function Banner() {
	const [widthCurrent, setWidthCurrent] = useState(0);
	const [isClient, setIsClient] = useState(false);

	const handleResizeScreen = () => {
		setWidthCurrent(window.innerWidth);
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			setWidthCurrent(window.innerWidth);
		}

		window.addEventListener("resize", handleResizeScreen, { passive: true });
		setIsClient(true);
		return () => window.removeEventListener("resize", handleResizeScreen);
	}, []);

	function PrevArrow({ className, style, onClick }: { className?: string; style?: string; onClick?: () => void }) {
		return (
			<div onClick={onClick} className={twMerge(`bg-gray-500/70 w-max absolute z-[8] left-4 top-[50%] -translate-y-[50%] rounded-full  cursor-pointer p-2 hidden group-hover:block`)}>
				<MdNavigateBefore className="w-10 h-10" color="white" />
			</div>
		);
	}

	function NextArrow({ className, style, onClick }: { className?: string; style?: string; onClick?: () => void }) {
		return (
			<div onClick={onClick} className={twMerge(`bg-gray-500/70 w-max absolute z-[8] right-4 top-[50%] -translate-y-[50%] rounded-full cursor-pointer p-2 hidden group-hover:block`)}>
				<MdNavigateNext className="w-10 h-10" color="white" />
			</div>
		);
	}
	if (!isClient)
		return (
			<div className="mt-[56px] text-[var(--text-primary)] px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px]">
				<div className="flex h-[180px] gap-x-3 min-[800px]:h-[150px] lg:h-[240px] px-2 pt-8 pb-4 ">
					<Skeleton.Input
						rootClassName="flex-1 bg-gray-700/20"
						style={{
							width: "100%",
							height: "100%",
						}}
					/>
					<Skeleton.Input
						rootClassName="flex-1 bg-gray-700/20"
						style={{
							width: "100%",
							height: "100%",
						}}
					/>
					<Skeleton.Input
						rootClassName="flex-1 bg-gray-700/20 banner-load"
						style={{
							width: "100%",
							height: "100%",
						}}
					/>
				</div>
			</div>
		);

	return (
		<div className="mt-[56px] text-[var(--text-primary)] px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px]">
			<Slider
				slidesToShow={3}
				className="pt-[32px] pb-[50px] group"
				arrows={widthCurrent < 768 ? false : true}
				prevArrow={<PrevArrow />}
				nextArrow={<NextArrow />}
				swipeToSlide={true}
				lazyLoad="progressive"
				infinite={true}
				autoplay={true}
				responsive={[
					{
						breakpoint: 900,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						},
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						},
					},
				]}>
				<img src="/images/banner1.jpg" className="px-1 rounded-lg" alt="" />
				<img src="/images/banner2.jpg" className="px-1 rounded-lg" alt="" />
				<img src="/images/banner3.jpg" className="px-1 rounded-lg" alt="" />
				<img src="/images/banner4.jpg" className="px-1 rounded-lg" alt="" />
			</Slider>
		</div>
	);
}

export default Banner;
