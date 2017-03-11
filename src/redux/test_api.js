const people = [
  { id: 1, name: 'Nader', age: 36 },
  { id: 2, name: 'Amanda', age: 24 },
  { id: 3, name: 'Jason', age: 44 }
]

export default () => new Promise((resolve) => {
  setTimeout(() => resolve(people), 3000)
})
