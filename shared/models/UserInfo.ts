export default class UserInfo {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public phone: string,
        public acceptedTerms: boolean,
        public acceptedOffers: boolean,
    ) {
    }
}