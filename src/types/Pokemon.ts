export type Pokemon = {
    id: number,
    name: string,
    image: string,
    stats: {
        hp: number,
        attack: number,
        defense: number,
        speed: number
    },
    isSaved: boolean
}
