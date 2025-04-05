import Address from "../structures/Address";

export default class Reseller {
    constructor(
        public id: number,
        public groupName: string,
        public channel: string,
        public document: string,
        public email: string,
        public phone: string,
        public address: Address,
    ) {
    }
}