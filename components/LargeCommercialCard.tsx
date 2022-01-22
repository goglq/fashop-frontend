type Props = {
  img: string
}

const LargeCommercialCard = ({ img }: Props) => {
  return (
    <div className="flex justify-center items-center rounded-lg bg-red-200 overflow-hidden cursor-pointer">
      <img
        className="h-64 xl:w-full object-none object-center"
        src={img}
        alt=""
      />
    </div>
  )
}

export default LargeCommercialCard
