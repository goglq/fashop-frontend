import Link from 'next/link'

const Header = () => {
  return (
    <div className="grid px-5 grid-cols-8 grid-rows-1 items-center h-20">
      <div className="flex mt-5 h-full items-start col-span-1">
        <Link href="/">
          <a className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fashop-2 to-fashop-4">
            fashop
          </a>
        </Link>
      </div>
      <div className="flex items-center"></div>
      <div className="col-start-3 col-span-4">
        <div className="flex items-center justify-center p-1 border-2 border-fashop-3 rounded-full bg-white">
          <input
            className="flex-1 ml-4 outline-none font-medium"
            type="text"
            placeholder="Search"
          />
          <Link href="/search">
            <a className="px-10 py-2 rounded-full bg-fashop-3 text-white font-medium">
              Search
            </a>
          </Link>
        </div>
      </div>
      <div className="col-start-8 flex justify-end"></div>
    </div>
  )
}

export default Header
