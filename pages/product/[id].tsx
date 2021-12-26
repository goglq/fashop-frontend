import Link from 'next/link'
import ProductCarousel from '../../components/ProductCarousel'

const ProductPage = () => {
  return (
    <div className="bg-pink-100 rounded-xl h-rel-screen m-5">
      <div className="p-10 space-y-10">
        <div className="flex justify-between ml-10">
          <div className="flex space-x-2 text-4xl font-bold">
            <Link href="/">
              <a className="px-3 rounded-md bg-white">Brand</a>
            </Link>
            <h2>Product Name</h2>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
          </svg>
        </div>
        <div className="grid grid-cols-2 ml-10">
          <ProductCarousel />
          <div className="flex flex-col space-y-8">
            <span className="text-4xl font-bold">9999$</span>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-md bg-blue-300 text-xl text-white font-extrabold">
                Добавить в корзину
              </button>
              <button className="p-4 rounded-md bg-pink-400 text-xl text-white font-extrabold">
                Экспресс покупка
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 ml-10 pr-32">
          <div className="space-y-5">
            <span className="text-4xl font-bold">Описание</span>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
              quasi itaque eos eum sit vero, temporibus unde ut consequuntur
              voluptate praesentium magni. Distinctio, est quos ut unde cum
              similique quisquam? Dicta possimus quo quae rem repellendus in
              molestias, eaque, numquam pariatur nam mollitia dolorem. Nemo
              veritatis a, ullam commodi ipsam repudiandae consequuntur natus
              esse neque alias totam exercitationem velit sunt. Et sint libero
              fugiat officiis mollitia, voluptatem suscipit natus atque eius
              ducimus pariatur eos enim dicta perspiciatis non quaerat placeat
              maiores minima expedita dolore. Ut aliquam sed dolores maiores
              quasi? Odit minima, distinctio molestiae ullam, nobis dolorum
              recusandae voluptas iure, doloremque ab amet placeat tempore
              possimus perferendis! Quaerat, harum quia blanditiis alias
              delectus reiciendis recusandae velit excepturi sint doloribus
              esse! Debitis, ipsa aliquid saepe dolor reprehenderit et
              recusandae eaque quas, vero eius ullam? Commodi quia sit
              repellendus eius vel, est reprehenderit facere atque quasi
              doloremque totam eum, necessitatibus consectetur voluptate. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Facilis
              reiciendis nostrum recusandae autem sunt corrupti ullam nesciunt
              voluptates explicabo quaerat maiores esse, repellat optio harum,
              cum fugit sint perspiciatis animi. Omnis dolorem fuga recusandae
              nemo, minus temporibus assumenda laudantium qui adipisci velit?
              Inventore molestiae odio quibusdam! Quis omnis modi sit.
              Repudiandae sed voluptatibus nostrum suscipit totam ab sint
              voluptatem? Non? Eaque quisquam odio voluptate eligendi libero
              aliquam doloribus voluptatem, numquam maxime excepturi. Accusamus
              voluptatum temporibus quo similique exercitationem voluptatem
              veritatis, fuga, eveniet, quisquam nesciunt itaque nemo
              perspiciatis dolor at. Obcaecati! Suscipit iure recusandae culpa
              fugit tempora, hic qui veniam temporibus dolor. Quaerat commodi
              possimus mollitia inventore sequi placeat eligendi aut tempore
              magnam necessitatibus, illo iure ipsum excepturi suscipit odit
              odio? Atque autem dicta ut veniam quibusdam obcaecati odio
              possimus, aliquid eligendi illum? Quisquam deserunt laboriosam,
              molestiae impedit velit, ipsum nemo obcaecati ipsa accusamus,
              dolor voluptas cum assumenda unde consequatur fuga.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
