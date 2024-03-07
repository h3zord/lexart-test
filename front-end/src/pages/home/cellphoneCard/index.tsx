interface ICellphoneData {
  name: string
  brand: string
  model: string
  color: string
  price: number
  thumbnail: string
}

export function CellphoneCard({
  name,
  brand,
  model,
  color,
  price,
  thumbnail,
}: ICellphoneData) {
  return (
    <>
      <img src={thumbnail} alt="" />
      <p>{name}</p>
      <p>{brand}</p>
      <p>{model}</p>
      <p>{color}</p>
      <p>{price}</p>
    </>
  )
}
