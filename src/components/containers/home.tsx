import useLocalStorage from "@/hooks/useLocalStorage"
import ItemListContainer from "./itemListContainer"

const Home = () => {
  const [items] = useLocalStorage('items', []);
  console.log(items[0])
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <ItemListContainer items={items} />
      </div>
    </main>
  )
}

export default Home
