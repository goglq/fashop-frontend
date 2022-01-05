type Props = {
  img: string
}

const LargeCommercialCard = ({ img }: Props) => {
  return (
    <div className="rounded-lg bg-red-200 overflow-hidden cursor-pointer">
      <img
        className="h-64 xl:w-full object-none object-center"
        src="https://via.placeholder.com/900x315"
        alt=""
      />
    </div>
  )
}

export default LargeCommercialCard
