export default class Address {
    constructor(
        public state: string,
        public address: string,
        public city: string,
        public neighborhood: string,
        public zip: string,
        public region: string,
    ) {
    }
}