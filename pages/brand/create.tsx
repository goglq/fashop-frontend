import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import CommonLayout from '../../components/CommonLayout'
import Loading from '../../components/Loading'
import { CreateBrandMutation } from '../../graphql/brand'

const CreateBrandPage = () => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [header, setHeader] = useState('')

  const [createBrandFunction, { data, loading, error }] =
    useMutation(CreateBrandMutation)

  const isAuth = useAppSelector((state) => state.user.isAuth)

  useEffect(() => {
    if (!isAuth) {
      router.push('/')
    }
  }, [router, isAuth])

  useEffect(() => {
    if (data) {
      router.push('/')
    }
  }, [data, router])

  if (loading)
    return (
      <div className="flex justify-center items-center h-rel-screen">
        <Loading />
      </div>
    )

  return (
    <div className="flex flex-col justify-center items-center h-rel-screen">
      <div className="space-y-3">
        <h2 className="text-2xl font-medium">Создание бренда</h2>
        <form
          className="flex flex-col w-100 p-5 rounded-lg bg-gray-200 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            createBrandFunction({
              variables: { name: name, thumbnail: thumbnail, header: header },
            })
          }}
        >
          {error && (
            <div className="px-2 py-1 rounded-md bg-red-500 text-white font-medium">
              {error.graphQLErrors[0].extensions.message}
            </div>
          )}
          <input
            className="px-3 py-2 rounded-md font-medium outline-none"
            type="text"
            placeholder="Название бренда"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <input
            className="px-3 py-2 rounded-md font-medium outline-none"
            type="url"
            placeholder="Ссылка на превью бренда"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.currentTarget.value)}
          />
          <input
            className="px-3 py-2 rounded-md font-medium outline-none"
            type="url"
            placeholder="Ссылка на баннер бренда"
            value={header}
            onChange={(e) => setHeader(e.currentTarget.value)}
          />
          <button className="py-2 rounded-md bg-green-500 text-white font-medium">
            Создать
          </button>
        </form>
      </div>
    </div>
  )
}

CreateBrandPage.PageLayout = CommonLayout

export default CreateBrandPage
