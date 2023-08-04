import AlbumContent from "@/components/AlbumContent";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import MusicContent from "@/components/MusicContent";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import { hotAlbum, popularAlbum } from "@/dataAlbum";

export default function Home() {
	return (
		<>
			<NavbarMobile />
			<Navbar />
			<Banner />
			<MusicContent />
			<AlbumContent title="Nghệ Sĩ Thịnh Hành" data={popularAlbum} />
			<AlbumContent title="Album Hot" data={hotAlbum} />
			<Footer />
		</>
	);
}
