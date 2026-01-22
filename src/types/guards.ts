const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

export { isString }

// interface IDog {
//   name: string
//   voice: string
// }

// interface ICat {
//   name: string
//   numLive: string
// }

// const isCat = (animal: unknown): animal is ICat => {
//   return (animal as ICat).numLive !== undefined
// }

// const func = (animal: unknown) => {
//   if (isCat(animal)) {
//     return animal.numLive
//   }
// }
