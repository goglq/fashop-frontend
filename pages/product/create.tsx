import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import CommonLayout from '../../components/CommonLayout'
import Loading from '../../components/Loading'
import { BrandDto } from '../../dtos/BrandDto'
import { CategoryDto } from '../../dtos/CategoryDto'
import { GetUserBrandsQuery } from '../../graphql/brand'
import { CreateProductMutation } from '../../graphql/products'
import { AllCatagoriesQuery } from '../../graphql/queries'

const CreateProductPage = () => {
  const router = useRouter()

  const BrandQuery = useQuery(GetUserBrandsQuery)
  const CategoryQuery = useQuery(AllCatagoriesQuery)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [brandId, setBrandId] = useState<number>()
  const [categoryId, setCategoryId] = useState<number>()
  const [price, setPrice] = useState<number>()
  const [sale, setSale] = useState<number>()

  const [urls, setUrls] = useState<{ id: number; url: string }[]>([])

  const [index, setIndex] = useState<number>(1)

  const [createProductFunction, { data, loading, error }] = useMutation(
    CreateProductMutation,
    {
      onError: (err) => {
        console.log(err)
      },
    }
  )

  const isAuth = useAppSelector((state) => state.user.isAuth)

  useEffect(() => {
    if (!isAuth) {
      router.push('/')
    }
  }, [router, isAuth])

  useEffect(() => {
    console.log('hello')
  }, [urls])

  useEffect(() => {
    BrandQuery.refetch()
    CategoryQuery.refetch()
  }, [])

  useEffect(() => {
    if (data) {
      router.push('/')
    }
  }, [data, router])

  if (BrandQuery.error || CategoryQuery.error)
    return (
      <div className="flex justify-center items-center h-rel-screen text-4xl">
        В настоящее время нельзя добавить товар
      </div>
    )

  return loading ? (
    <Loading />
  ) : (
    <form
      className="grid grid-cols-2 grid-rows-7 gap-5 h-rel-screen mt-5"
      onSubmit={(e) => {
        e.preventDefault()

        createProductFunction({
          variables: {
            name: name ?? '',
            description: description,
            price: price ?? 0,
            sale: sale ?? 0,
            categoryIds: [categoryId ?? -1],
            brandId: brandId ?? -1,
            imageUrls: urls.length <= 0 ? [] : urls.map((url) => url.url),
          },
        })
      }}
    >
      <div className="row-span-6 flex flex-col justify-between h-full space-y-3 rounded-lg bg-gray-200 p-5">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-medium">Создание товара</h2>
          {error && (
            <div className="px-2 py-1 rounded-md bg-red-500 text-white font-medium">
              {error.message}
            </div>
          )}
          <input
            className="px-3 py-2 rounded-md font-medium outline-none"
            type="text"
            placeholder="Название товара"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <textarea
            className="px-3 py-2 h-64 rounded-md font-medium outline-none"
            placeholder="Описание продукта"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          {BrandQuery.loading ? (
            <Loading />
          ) : (
            <select
              className="px-3 py-2 rounded-md font-medium outline-none"
              onChange={(e) => setBrandId(parseInt(e.target.value))}
            >
              <option value="-1">Бренд</option>
              {BrandQuery.data &&
                BrandQuery.data.userBrands.map((brand: BrandDto) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
            </select>
          )}
          <select
            className="px-3 py-2 rounded-md font-medium outline-none"
            onChange={(e) => setCategoryId(parseInt(e.target.value))}
          >
            <option value="-1">Категория</option>
            {CategoryQuery.data &&
              CategoryQuery.data.categories.map((category: CategoryDto) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
          <label className="ml-2 text-lg font-medium">Цена</label>
          <input
            value={price}
            onChange={(e) => setPrice(parseInt(e.currentTarget.value))}
            className="px-3 py-2 rounded-md font-medium outline-none"
            type="number"
            placeholder="цена товара"
          />
          <label className="ml-2 text-lg font-medium">Скидка</label>
          <div className="space-x-2">
            <input
              value={sale === 0 ? '' : sale}
              onChange={(e) => {
                if (e.currentTarget.value === '') {
                  setSale(0)
                }
                let saleValue = parseInt(e.currentTarget.value)
                if (saleValue >= 0 && saleValue <= 90) {
                  setSale(saleValue)
                }
              }}
              className="w-24 px-3 py-2 rounded-md font-medium outline-none"
              type="number"
              placeholder="скидка"
            />
            <span className="text-lg font-medium">от 0 до 90%</span>
          </div>
        </div>
      </div>
      <div className="row-span-6 flex flex-col justify-between h-full space-y-3 rounded-lg bg-gray-200 p-5">
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-medium">Картинки</h3>
          {urls &&
            urls.map((url) => (
              <div key={url.id} className="flex space-x-2">
                <input
                  value={url.url}
                  onChange={(e) => {
                    url.url = e.currentTarget.value
                    setUrls(Object.assign([], urls))
                  }}
                  type="url"
                  placeholder="ссылка на картинку"
                  className="flex-1 px-3 rounded-md outline-none"
                />
                <button
                  className="p-4 rounded-md bg-red-500 text-white font-extrabold"
                  onClick={(e) => setUrls(urls.filter((u) => u.id !== url.id))}
                >
                  &#10005;
                </button>
              </div>
            ))}
          <button
            className="py-2 rounded-lg bg-blue-500 text-white text-lg font-medium"
            onClick={(e) => {
              e.preventDefault()
              if (!urls) return
              console.log('hello')
              const tmp = Object.assign([], urls)
              tmp.push({ id: index, url: '' })
              setIndex(index + 1)
              setUrls(tmp)
            }}
          >
            Добавить картинку
          </button>
        </div>
      </div>
      <button className="mb-5 col-span-2 rounded-lg bg-green-500 text-2xl text-white font-medium">
        Создать
      </button>
    </form>
  )
}

CreateProductPage.PageLayout = CommonLayout

export default CreateProductPage
