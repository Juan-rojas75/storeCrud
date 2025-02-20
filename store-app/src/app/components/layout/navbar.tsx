import Link from "next/link";


export default function Navbar() {
    const items = ['Articulos', 'Subida'];
    return (
        <nav className="flex flex-row justify-center gap-4 w-fit h-fit px-4 py-2 rounded-2xl bg-big-stone-950 backdrop-blur-none my-4">
            {items.map((item, index) => (
            <Link key={index} href={`/${item.toLowerCase()}`} className="p-2 rounded-md bg-charade-950 hover:bg-charade-700 text-white">
                {item}
            </Link>
            ))}
        </nav>
    );
  }
  