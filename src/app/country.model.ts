export class Country {
    constructor(
        public iso3: string,
        public name: string,
        public confirmed: number,
        public deaths: number,
        public recovered: number,
        public lastUpdate: string,
        public isInBookmark: boolean
    ) {}
}
