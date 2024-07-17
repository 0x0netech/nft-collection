import Link from "next/link";

export default function Header() {
  return (
    <div className="z-20 fixed top-0  w-full backdrop-blur-lg bg-white/5">
      <header className="px-10 py-4 text-white">
        <div className="flex justify-between items-center py-4">
          <h3 className="text-[2rem] font-bold">Test NFT Market</h3>
          <div className="flex text-xl font-light gap-x-10">
            <Link href="/ ">Home</Link>
            <Link href="/mint">Mint</Link>
            <Link href="/nfts">NFTs</Link>
          </div>
          <w3m-button />
        </div>
      </header>
    </div>
  );
}
